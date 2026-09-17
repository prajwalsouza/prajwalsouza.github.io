// Run with: node --test Experiments/Cycling/Contour/tests/network.cjs
const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const ContourRoadData=require('../road-data.js');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const section=(start,end)=>html.slice(html.indexOf(start),html.indexOf(end));
function app(fetch){
 const progress=[],records=new Map();
 const dataCache={available:true,epoch:0,list:async kind=>[...records.values()].filter(r=>r.kind===kind),get:async key=>records.get(key)||null,put:async(key,kind,value,extra={})=>{records.set(key,{key,kind,value,time:Date.now(),...extra});return true}};
 const ctx=vm.createContext({fetch,AbortController,DOMException,setTimeout,clearTimeout,TextDecoder,URL,console,S:{},dataCache,ContourRoadData,CACHE_AGE:{roads:604800000,source:86400000},
  clamp:(x,a,b)=>Math.max(a,Math.min(b,x)),unmerc:(x,y)=>({lon:x,lat:y}),setLoading:x=>progress.push(x)});
 vm.runInContext(section('async function fetchTimed(', '/* Minimal Mapbox')+section('class PBF{','class Elevation{')+section('const roadCache=', 'async function buildGraph('),ctx);
 return {ctx,progress,records,run:code=>vm.runInContext(code,ctx)};
}
const bounds='{minX:0,minY:0,maxX:100,maxY:100}';
const roads={elements:[{type:'way',id:1,tags:{highway:'cycleway'},nodes:[1,2]}]};
test('timeouts are visible errors, including a stalled body',async()=>{
 const {run}=app(async(_url,{signal})=>({ok:true,json:()=>new Promise((_,reject)=>signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError'))))}));
 await assert.rejects(run("fetchTimed('test',{},5,'json')"),e=>e.name!=='AbortError'&&/timed out/.test(e.message));
});
test('explicit cancellation stays cancellation and never retries',async()=>{
 let calls=0;const {run}=app(async()=>{calls++;throw Error('should not fetch')});
 await assert.rejects(run(`(()=>{const c=new AbortController();c.abort();return fetchRoads(${bounds},c.signal)})()`),{name:'AbortError'});
 assert.equal(calls,0);
});
test('Overpass retries an outage, reports backup, and caches across preferences',async()=>{
 const calls=[];const {run,progress}=app(async(url,options)=>{calls.push({url,options});return calls.length===1?{ok:false,status:504}:{ok:true,json:async()=>roads}});
 await run(`fetchRoads(${bounds},undefined,{report:setLoading})`);await run(`fetchRoads(${bounds})`);
 assert.equal(calls.length,2);assert.match(calls[1].url,/overpass-api\.de/);assert.ok(progress.some(p=>/backup/.test(p)));
 const query=new URL(calls[1].url).searchParams.get('data');
 assert.match(query,/node\(w.roads\)/);assert.match(query,/rel\(bw.roads\)/);assert.doesNotMatch(query,/\.\_;>;/);
});
test('incomplete Overpass results are rejected, never cached',async()=>{
 let calls=0;const {run}=app(async()=>{calls++;return {ok:true,json:async()=>({...roads,remark:'runtime error: timed out'})}});
 await assert.rejects(run(`fetchRoads(${bounds})`),/incomplete/);assert.equal(calls,3);
});
test('valid empty response is not retried as a server outage',async()=>{
 let calls=0;const {run}=app(async()=>{calls++;return {ok:true,json:async()=>({elements:[]})}});
 await assert.rejects(run(`fetchRoads(${bounds})`),/No roads/);assert.equal(calls,1);
});
test('tile metadata controls zoom and failed metadata can be retried',async()=>{
 let calls=0;const {run}=app(async()=>{calls++;if(calls===1)throw Error('offline');return {ok:true,json:async()=>({tiles:['https://tiles.test/{z}/{x}/{y}.pbf'],maxzoom:12})}});
 await assert.rejects(run('vectorTemplate()'),/offline/);await run('vectorTemplate()');assert.equal(run('vectorMaxZoom'),12);
 assert.match(html,/clamp\(Math.floor\(Math.log2\(WORLD\/span\*3\)\),0,vectorMaxZoom\)/);
});
test('all inline JavaScript parses',()=>{new vm.Script(html.match(/<script>([\s\S]*?)<\/script>/)[1])});
test('cancelling an active Overpass download stops without fallback',async()=>{
 let calls=0;const {run,ctx}=app(async(_url,{signal})=>{calls++;return {ok:true,json:()=>new Promise((_,reject)=>signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError'))))}});
 const controller=new AbortController();ctx.signal=controller.signal;
 const pending=run(`fetchRoads(${bounds},signal)`);setTimeout(()=>controller.abort(),5);
 await assert.rejects(pending,{name:'AbortError'});assert.equal(calls,1);
});
test('map tile outage still sets current map bounds and preserves its warning',async()=>{
 const runMap=async(fetchFailure)=>{
  const statuses=[];const ctx=vm.createContext({merc:(lon,lat)=>({x:lon,y:lat}),status:(...x)=>statuses.push(x),S:{},
   dataCache:{get:async()=>null},CACHE_AGE:{source:1},setTimeout,clearTimeout,vectorTile:async(_t,{cacheOnly}={})=>{if(cacheOnly)return null;if(fetchFailure)throw Error('offline');return {}},vectorMaxZoom:14,clamp:(x,a,b)=>Math.max(a,Math.min(b,x)),WORLD:40075016,
   tileList:()=>[{z:14,x:1,y:1}],Elevation:{load:async()=>({xy:()=>10})},pool:async(items,_n,fn)=>Promise.all(items.map(fn)),
   $:()=>({classList:{add(){}}}),console});
  const method=section(' async load(lon,lat,','\n setRenderer(');
  vm.runInContext(`var map={generation:0,w:900,paintTexture:()=>({}),makeMesh(){},clearMap(){},${method}}`,ctx);
  await vm.runInContext('map.load(23.76,61.498,6000)',ctx);
  return vm.runInContext('map',ctx);
 };
 const map=await runMap(true);assert.equal(map.center.x,23.76);assert.equal(map.available,true);assert.match(map.warning,/map tiles unavailable/);
 assert.match(html,/status\(map.warning\|\|/);
});

test('a contained route reuses disk roads after the in-memory cache is emptied',async()=>{
 let calls=0;const {run}=app(async()=>{calls++;return {ok:true,json:async()=>roads}});
 await run(`fetchRoads(${bounds})`);run('roadCache.clear()');
 await run('fetchRoads({minX:10,minY:10,maxX:90,maxY:90})');assert.equal(calls,1);
});
test('overlapping area only fetches uncovered patches, without duplicate OSM IDs',async()=>{
 let calls=0;const {run}=app(async()=>{calls++;return {ok:true,json:async()=>roads}});
 await run(`fetchRoads(${bounds})`);const result=await run('fetchRoads({minX:0,minY:0,maxX:150,maxY:100})');
 assert.equal(calls,2);assert.equal(result.elements.length,1);
});
test('explicit road refresh bypasses saved areas',async()=>{
 let calls=0;const {run}=app(async()=>{calls++;return {ok:true,json:async()=>roads}});
 await run(`fetchRoads(${bounds})`);await run(`fetchRoads(${bounds},undefined,{refresh:true})`);assert.equal(calls,2);
});
test('failed endpoints cool down instead of being hammered by Try again',async()=>{
 let calls=0;const {run}=app(async()=>{calls++;return {ok:false,status:429}});
 await assert.rejects(run(`fetchRoads(${bounds})`),/Road download failed/);
 await assert.rejects(run(`fetchRoads(${bounds})`),/cooling down/);assert.equal(calls,3);
});
test('coverage subtraction preserves area and never includes already-covered interior',()=>{
 const b={minX:0,minY:0,maxX:100,maxY:100},c={minX:20,minY:20,maxX:80,maxY:80};
 const patches=ContourRoadData.subtract(b,c);assert.equal(patches.length,4);
 assert.equal(patches.reduce((sum,p)=>sum+(p.maxX-p.minX)*(p.maxY-p.minY),0),6400);
 assert.equal(ContourRoadData.subtract(b,b).length,0);
});
test('cached map tiles paint before missing tiles and elevation finish',async()=>{
 let finishTiles,finishElevation;const paints=[];
 const waitingTiles=new Promise(r=>finishTiles=r),waitingElevation=new Promise(r=>finishElevation=r);
 const ctx=vm.createContext({merc:(lon,lat)=>({x:lon,y:lat}),status(){},S:{},dataCache:{get:async()=>null},CACHE_AGE:{source:1},setTimeout,clearTimeout,
  vectorMaxZoom:14,clamp:(x,a,b)=>Math.max(a,Math.min(b,x)),WORLD:40075016,tileList:()=>[{z:14,x:1,y:1},{z:14,x:2,y:1}],
  vectorTile:async(t,{cacheOnly}={})=>t.x===1?{cached:true}:cacheOnly?null:waitingTiles,
  Elevation:{load:()=>waitingElevation},pool:async(items,_n,fn)=>Promise.all(items.map(fn)),console,paints});
 vm.runInContext(`var map={generation:0,w:900,paintTexture(tiles){paints.push(tiles.length);return {}},makeMesh(){},${section(' async load(lon,lat,','\n setRenderer(')}}`,ctx);
 const pending=vm.runInContext('map.load(23.76,61.498,6000)',ctx);
 await new Promise(r=>setTimeout(r,0));assert.deepEqual(paints,[1]);
 finishTiles({fresh:true});finishElevation({xy:()=>10});await pending;
 assert.equal(paints.at(-1),2);
});
test('large initial areas use bounded patches that exactly cover the request',()=>{
 const b={minX:0,minY:0,maxX:20000,maxY:16000},patches=ContourRoadData.patches(b,10000);
 assert.equal(patches.length,4);assert.equal(patches.reduce((s,p)=>s+(p.maxX-p.minX)*(p.maxY-p.minY),0),320000000);
});
