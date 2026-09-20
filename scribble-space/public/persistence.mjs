import {validateShot,immutableCapture,referencedAssets} from '../shared/document.mjs';
import {digest} from '../shared/archive.mjs';
import {inspectGLB} from '../shared/model.mjs';
export async function request(url,options={}){const response=await fetch(url,options);if(!response.ok){let message;try{message=(await response.json()).error}catch{message=response.statusText}const error=new Error(message||'Local server unavailable.');error.status=response.status;throw error}return response.json()}
export async function openStorage(){
 let health=null,server=false;if(['localhost','127.0.0.1','[::1]'].includes(location.hostname))try{health=await request('./api/health');server=health.app==='scribble-space'}catch{}
 if(server)return new ServerStorage(health);
 const db=await new Promise((resolve,reject)=>{const r=indexedDB.open('scribble-space-v1',1);r.onupgradeneeded=()=>{r.result.createObjectStore('assets');r.result.createObjectStore('shots',{keyPath:'id'})};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});return new BrowserStorage(db);
}
class ServerStorage{
 mode='Local server';
 constructor(health){this.mcp=health.mcp===true}
 async session(id){return request('./api/session?session='+encodeURIComponent(id))}
 async submit(session,doc){return request('./api/submissions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({session,id:doc.id,revision:doc.revision})})}
 async receipt(session,id){return request('./api/submissions/'+id+'?session='+encodeURIComponent(session))}
 async put(blob){const type=blob.type==='model/gltf-binary'?'model/gltf-binary':'image/png';return request('./api/assets',{method:'POST',headers:{'Content-Type':type},body:blob})}
 async blob(id){const r=await fetch('./api/assets/'+id);if(!r.ok)throw Error('Missing saved asset.');return r.blob()}
 async url(id){return './api/assets/'+id}
 async save(doc,revision){return request('./api/shots/'+doc.id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({document:doc,revision})})}
 async list(){return (await request('./api/shots')).shots}
 async get(id){return request('./api/shots/'+id)}
}
class BrowserStorage{
 mode='This browser';
 constructor(db){this.db=db;this.urls=new Map()}
 async transact(store,mode,fn){return new Promise((resolve,reject)=>{const t=this.db.transaction(store,mode);let request;try{request=fn(t.objectStore(store))}catch(e){t.abort();reject(e);return}t.oncomplete=()=>resolve(request?.result);t.onerror=()=>reject(t.error);t.onabort=()=>reject(t.error||Error('Storage transaction cancelled.'))})}
 async put(blob){if(blob.size>64e6)throw Error('File is too large.');const bytes=await blob.arrayBuffer(),isModel=blob.type==='model/gltf-binary';if(isModel)inspectGLB(bytes);const id=await digest(bytes)+(isModel?'.glb':'.png');await this.transact('assets','readwrite',s=>s.put(blob,id));return {id}}
 async blob(id){const b=await this.transact('assets','readonly',s=>s.get(id));if(!b)throw Error('Missing saved asset.');return b}
 async url(id){if(!this.urls.has(id))this.urls.set(id,URL.createObjectURL(await this.blob(id)));return this.urls.get(id)}
 async get(id){const d=await this.transact('shots','readonly',s=>s.get(id));if(!d)throw Error('View not found.');return d}
 async list(){return (await this.transact('shots','readonly',s=>s.getAll())).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt))}
 async save(raw,revision){const doc=validateShot(raw);for(const id of referencedAssets(doc))await this.blob(id);
  return new Promise((resolve,reject)=>{const t=this.db.transaction('shots','readwrite'),s=t.objectStore('shots'),r=s.get(doc.id);let saved,problem;r.onsuccess=()=>{const old=r.result;if(old&&old.revision!==revision||!old&&revision){problem=Error('This view changed in another tab. Reload it or save a copy.');t.abort();return}if(old&&immutableCapture(old)!==immutableCapture(doc)){problem=Error('A saved view keeps its original camera. Capture a new view.');t.abort();return}const now=new Date().toISOString();saved={...doc,revision:crypto.randomUUID(),createdAt:old?.createdAt||now,updatedAt:now};s.put(saved)};t.oncomplete=()=>resolve(saved);t.onerror=()=>reject(t.error);t.onabort=()=>reject(problem||t.error)});
 }
}
export function download(blob,name){const a=document.createElement('a'),url=URL.createObjectURL(blob);a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000)}
export async function normalizeImage(file){if(file.size>16e6)throw Error('Use an image smaller than 16 MB.');if(!['image/png','image/jpeg','image/webp'].includes(file.type))throw Error('Use PNG, JPEG or WebP.');const bitmap=await createImageBitmap(file);try{if(bitmap.width*bitmap.height>64e6)throw Error('Resize this image before adding it.');const scale=Math.min(1,1600/Math.max(bitmap.width,bitmap.height)),canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));return {blob,width:canvas.width,height:canvas.height}}finally{bitmap.close()}}
export async function readDroppedImages(event){const files=[...event.dataTransfer.files].filter(f=>f.type.startsWith('image/'));if(files.length)return files;const html=event.dataTransfer.getData('text/html'),parsed=new DOMParser().parseFromString(html,'text/html'),src=parsed.querySelector('img')?.getAttribute('src')||event.dataTransfer.getData('text/uri-list').split('\n').find(s=>s&&!s.startsWith('#'));if(!src)return [];const url=new URL(src);if(url.protocol!=='https:')throw Error('Drop a local image file or use an HTTPS image URL.');try{const response=await fetch(url,{mode:'cors',credentials:'omit'});if(!response.ok)throw Error();const blob=await response.blob();return [new File([blob],'Reference image',{type:blob.type})]}catch{throw Error('That site blocks image sharing. Save the image and drop the file here.')}}
