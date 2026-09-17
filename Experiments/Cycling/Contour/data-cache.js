/* Persistent, bounded cache. No networking or UI dependencies. */
class ContourDataCache {
  constructor(name = 'contour-data-v1', { budget = 128 * 1024 * 1024, indexedDB = globalThis.indexedDB } = {}) {
    this.name = name;
    this.budget = budget;
    this.factory = indexedDB;
    this.available = true;
    this.epoch = 0;
    this.pending = Promise.resolve();
    this.ready = this.open();
  }
  open() {
    return new Promise(resolve => {
      if (!this.factory) { this.available = false; resolve(null); return; }
      let done = false;
      const finish = db => { if (done) { db?.close(); return; } done = true; clearTimeout(timer); this.available = !!db; resolve(db); };
      const timer = setTimeout(() => finish(null), 2500);
      try {
        const request = this.factory.open(this.name, 1);
        request.onupgradeneeded = () => {
          const db = request.result;
          db.createObjectStore('values', { keyPath: 'key' });
          const meta = db.createObjectStore('meta', { keyPath: 'key' });
          meta.createIndex('kind', 'kind');
        };
        request.onsuccess = () => { request.result.onversionchange = () => request.result.close(); finish(request.result); };
        request.onerror = request.onblocked = () => finish(null);
      } catch { finish(null); }
    });
  }
  async transaction(mode, action) {
    const db = await this.ready;
    if (!db) return null;
    return new Promise(resolve => {
      try {
        const tx = db.transaction(['values', 'meta'], mode);
        let value = null;
        action(tx.objectStore('values'), tx.objectStore('meta'), result => { value = result; });
        tx.oncomplete = () => resolve(value);
        tx.onerror = tx.onabort = () => { this.available = false; resolve(null); };
      } catch { this.available = false; resolve(null); }
    });
  }
  async get(key, maxAge = Infinity, allowStale = false) {
    return this.transaction('readonly', (values, meta, result) => {
      const request = meta.get(key);
      request.onsuccess = () => {
        const info = request.result;
        if (!info) return;
        const stale = Date.now() - info.time > maxAge;
        if (stale && !allowStale) return;
        const data = values.get(key);
        data.onsuccess = () => { if (data.result) result({ ...info, value: data.result.value, stale }); };
      };
    });
  }
  async list(kind) {
    return await this.transaction('readonly', (_values, meta, result) => {
      const request = kind ? meta.index('kind').getAll(kind) : meta.getAll();
      request.onsuccess = () => result(request.result);
    }) || [];
  }
  put(key, kind, value, { bytes, bounds, time = Date.now(), epoch = this.epoch } = {}) {
    // Serialize writes so pruning and clearing cannot race each other.
    const operation = async () => {
      if (epoch !== this.epoch) return false;
      const size = bytes ?? (value?.byteLength || new Blob([JSON.stringify(value)]).size);
      if (size > this.budget / 2) return false;
      const entries = (await this.list()).filter(e => e.key !== key).sort((a,b) => a.time - b.time);
      let total = entries.reduce((sum,e) => sum + e.bytes, 0) + size;
      const limit = { roads: 12, vector: 180, elevation: 160, place: 150, source: 2 }[kind] || 100;
      let count = entries.filter(e => e.kind === kind).length + 1;
      const remove = [];
      for (const entry of entries) {
        if (total > this.budget || (entry.kind === kind && count > limit)) {
          remove.push(entry.key); total -= entry.bytes; if (entry.kind === kind) count--;
        }
      }
      if (epoch !== this.epoch) return false;
      const ok = await this.transaction('readwrite', (values, meta, result) => {
        for (const id of remove) { values.delete(id); meta.delete(id); }
        values.put({ key, value }); meta.put({ key, kind, bounds, bytes: size, time }); result(true);
      });
      if (ok) this.available = true;
      return !!ok;
    };
    const result = this.pending.then(operation, operation);
    this.pending = result.catch(() => false);
    return result;
  }
  clear() {
    this.epoch++;
    const operation = () => this.transaction('readwrite', (values, meta, result) => { values.clear(); meta.clear(); result(true); });
    const result = this.pending.then(operation, operation);
    this.pending = result.catch(() => false);
    return result;
  }
}
if (typeof module !== 'undefined') module.exports = { ContourDataCache };
