const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const V=require('../vector-renderer.js'),W=40075016.68557849;
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const section=(a,b)=>html.slice(html.indexOf(a),html.indexOf(b));
function bounds(t){const size=W/2**t.z;return {minX:t.x*size-W/2,maxX:(t.x+1)*size-W/2,minY:W/2-(t.y+1)*size,maxY:W/2-t.y*size}}
function inset(b,f=.2){const x=(b.maxX-b.minX)*f,y=(b.maxY-b.minY)*f;return {minX:b.minX+x,maxX:b.maxX-x,minY:b.minY+y,maxY:b.maxY-y}}
const tile={t:{z:12,x:2200,y:1100},layers:{transportation:{extent:4096,features:[{type:2,props:{class:'minor'},paths:[[[0,0],[4096,4096]]]}]}}};
test('small zooms reuse the same geometry, with no missing tiles',()=>{
 const b=inset(bounds(tile.t),.01);const plan=V.planView(b,[tile],14);assert.equal(plan.z,12);assert.equal(plan.missing.length,0);assert.equal(plan.tiles[0],tile);
});
test('new area fetches only uncovered tiles and distant zoom levels have a bounded working set',()=>{
 const b=inset(bounds(tile.t),.01),size=b.maxX-b.minX;b.maxX+=size;
 const plan=V.planView(b,[tile],14);assert.equal(plan.missing.length,1);assert.equal(plan.tiles.filter(t=>t.layers).length,1);
 const world=V.planView({minX:-W/2,minY:-W/2,maxX:W/2,maxY:W/2},[tile],14);assert.ok(world.tiles.length<=36);
});
test('large overzoom requests added detail, bounded by provider maxzoom',()=>{
 const b=inset(bounds(tile.t),.45);const plan=V.planView(b,[tile],14);assert.equal(plan.z,14);assert.ok(plan.missing.length>0);
 const max=V.planView(b,[{...tile,t:{z:14,x:8800,y:4400}}],14);assert.ok(max.z<=14);
});
test('path compilation preserves polygon rings and batches matching road styles',()=>{
 const renderer=new V.SvgMapRenderer(fakeDOM());
 const layers={transportation:{extent:4096,features:[...tile.layers.transportation.features,...tile.layers.transportation.features]}};
 const compiled=renderer.compile({t:tile.t,layers});assert.equal(compiled[0].paths.length,1);assert.equal(compiled[0].paths[0].d.match(/M/g).length,2);
 assert.equal(renderer.compile({t:tile.t,layers}),compiled);
 assert.equal(V.pathData([[[0,0],[10,0],[10,10],[0,10]],[[2,2],[2,8],[8,8],[8,2]]],true).match(/Z/g).length,2);
});
function fakeDOM(){
 const doc={createElementNS(_ns,name){const el={name,attrs:{},style:{},dataset:{},children:[],ownerDocument:doc,writes:0,setAttribute(k,v){this.attrs[k]=v;this.writes++},appendChild(n){this.children.push(n)},replaceChildren(...n){this.children=n},querySelectorAll(tag){return this.children.flatMap(c=>[...(c.name===tag?[c]:[]),...c.querySelectorAll(tag)])}};return el}};
 return doc.createElementNS('','svg');
}
test('camera frames update one SVG transform without rebuilding paths or embedding images',()=>{
 const svg=fakeDOM(),r=new V.SvgMapRenderer(svg);r.setScene({tiles:[tile],bounds:bounds(tile.t),span:W/2**12});
 const p=svg.querySelectorAll('path')[0],m=new Float32Array(16);m[0]=1;m[9]=-1;r.draw(m,800,600);
 const first=r.scene.attrs.transform;r.draw(m,800,600);assert.equal(r.scene.writes,2);
 m[12]=.1;r.draw(m,800,600);assert.notEqual(r.scene.attrs.transform,first);assert.equal(svg.querySelectorAll('path')[0],p);assert.equal(svg.querySelectorAll('image').length,0);
});
test('renderer defaults to terrain and sanitizes persisted choices',()=>{
 const ctx=vm.createContext({clamp:(v,a,b)=>Math.min(b,Math.max(a,v))});vm.runInContext(section('const defaultSettings=','const S=')+section('function sanitizeSettings(','function validRoute('),ctx);
 assert.equal(vm.runInContext('sanitizeSettings({}).renderer',ctx),'terrain');assert.equal(vm.runInContext("sanitizeSettings({renderer:'svg'}).renderer",ctx),'svg');assert.equal(vm.runInContext("sanitizeSettings({renderer:'unknown'}).renderer",ctx),'terrain');
});
test('switching renderer preserves routes, camera location and data without network access',()=>{
 const controls=new Map(),get=id=>{if(!controls.has(id))controls.set(id,{style:{},toggleAttribute(k,v){this[k]=v},setAttribute(){}});return controls.get(id)};
 const ctx=vm.createContext({$:get,clearTimeout,ContourVector:{SvgMapRenderer:class{}},fetch(){throw Error('Renderer switch must not fetch')}});
 vm.runInContext(section('class TerrainMap{','function pointSegment2('),ctx);
 vm.runInContext(`var map=Object.create(TerrainMap.prototype);Object.assign(map,{renderer:'terrain',canvas:{},pitch:.88,zoom:.7,tx:.1,tz:.2,routeDisplay:[{id:'chosen'}],mapTiles:[{id:'cached'}],bounds:{},updateSVG(){this.svgPainted=true},paintTexture(){return {}},makeMesh(){this.meshPainted=true}});map.setRenderer('svg');`,ctx);
 assert.equal(get('#vector-map').hidden,false);assert.equal(get('#tilt-button').disabled,true);assert.equal(vm.runInContext('map.pitch',ctx),Math.PI/2);
 vm.runInContext("map.setRenderer('terrain')",ctx);assert.equal(get('#vector-map').hidden,true);assert.equal(get('#tilt-button').disabled,false);assert.equal(vm.runInContext('map.pitch',ctx),.88);assert.equal(vm.runInContext('map.routeDisplay[0].id',ctx),'chosen');assert.equal(vm.runInContext('map.zoom',ctx),.7);assert.equal(vm.runInContext('map.mapTiles[0].id',ctx),'cached');
});
function coverageFixture(fetchTile){
 const b=inset(bounds(tile.t),.01);b.maxX+=b.maxX-b.minX;const statuses=[];
 const ctx=vm.createContext({ContourVector:V,vectorMaxZoom:14,merc:(lon,lat)=>({x:lon,y:lat}),vectorTile:fetchTile,pool:(items,_n,fn)=>Promise.all(items.map(fn)),status:(...args)=>statuses.push(args),b,tile});
 vm.runInContext(`var map={renderer:'svg',available:true,w:100,h:100,generation:1,vectorJob:0,mapTiles:[tile],rebaseSVG(){},screenToGeo(x,y){return {lon:b.minX+x/100*(b.maxX-b.minX),lat:b.maxY-y/100*(b.maxY-b.minY)}},updateSVG(){this.painted=true},${section(' async extendSVG(){','\n clearMap()')}}`,ctx);
 return {statuses,run:code=>vm.runInContext(code,ctx)};
}
test('extending SVG coverage uses stored tiles without requesting roads or elevation',async()=>{
 const calls=[];const {run}=coverageFixture(async(t,{cacheOnly}={})=>{calls.push(cacheOnly);return tile.layers});
 await run('map.extendSVG()');assert.deepEqual(calls,[true]);assert.equal(run('map.mapTiles.length'),2);assert.equal(run('map.painted'),true);assert.equal(run('map.vectorLoading'),false);
});
test('failed SVG detail download preserves saved geometry',async()=>{
 const {run,statuses}=coverageFixture(async(_t,{cacheOnly}={})=>{if(cacheOnly)return null;throw Error('offline')});
 await run('map.extendSVG()');assert.equal(run('map.mapTiles[0]===tile'),true);assert.ok(statuses.some(s=>s[1]===true));
});
test('switching engines during an in-flight detail request cannot replace the scene',async()=>{
 let finish;const pending=new Promise(r=>finish=r);const {run}=coverageFixture(async()=>pending);
 const loading=run('map.extendSVG()');run("map.renderer='terrain';map.vectorJob++;map.vectorLoading=false");finish(tile.layers);await loading;
 assert.equal(run('map.mapTiles.length'),1);assert.equal(run('map.painted'),undefined);
});
test('SVG geometry and route overlays project to the same screen positions',()=>{
 const svg=fakeDOM(),r=new V.SvgMapRenderer(svg);r.setScene({tiles:[],bounds:{},span:100});
 const ctx=vm.createContext({merc:(lon,lat)=>({x:lon,y:lat})});vm.runInContext(section('class TerrainMap{','function pointSegment2('),ctx);
 const m=[.8,.12,0,0,0,0,0,0,.25,-.7,0,0,.1,-.2,0,1];ctx.m=m;
 vm.runInContext("var map=Object.create(TerrainMap.prototype);Object.assign(map,{renderer:'svg',center:{x:200,y:400},span:100,w:1200,h:800,m});",ctx);
 r.draw(m,1200,800);const [a,b,c,d,e,f]=r.scene.attrs.transform.slice(7,-1).split(' ').map(Number);
 for(const [lon,lat] of [[200,400],[220,390],[170,430]]){
  const p=vm.runInContext(`map.project({lon:${lon},lat:${lat},h:300})`,ctx),u=(lon-150)/100*2048,v=(450-lat)/100*2048;
  assert.ok(Math.abs(p.x-(a*u+c*v+e))<1e-8);assert.ok(Math.abs(p.y-(b*u+d*v+f))<1e-8);
 }
});
test('camera rebasing allows continued zoom without changing visible geography',()=>{
 const ctx=vm.createContext({merc:(lon,lat)=>({x:lon,y:lat}),unmerc:()=>({lat:45}),Math});
 vm.runInContext(section('class TerrainMap{','function pointSegment2(')+section('function matMul(','class TerrainMap{'),ctx);
 vm.runInContext("var map=Object.create(TerrainMap.prototype);Object.assign(map,{renderer:'svg',gl:{},center:{x:200,y:400},bounds:{},span:10000,zoom:.25,tx:.3,tz:-.2,yaw:.2,pitch:Math.PI/2,w:1200,h:800,updateSVG(){}});map.matrix();var before=map.project({lon:500,lat:800});map.rebaseSVG();map.matrix();var after=map.project({lon:500,lat:800});",ctx);
 assert.ok(vm.runInContext('Math.abs(before.x-after.x)<.001&&Math.abs(before.y-after.y)<.001',ctx));assert.equal(vm.runInContext('map.zoom',ctx),.86);
});
test('moving while detail loads keeps the old scene and schedules the newest view',async()=>{
 let finish;const pending=new Promise(r=>finish=r);const {run}=coverageFixture(async()=>pending);
 const loading=run('map.extendSVG()');run('map.vectorViewPending=true;map.scheduleReload=()=>map.rescheduled=true');finish(tile.layers);await loading;
 assert.equal(run('map.mapTiles.length'),1);assert.equal(run('map.painted'),undefined);assert.equal(run('map.rescheduled'),true);assert.equal(run('map.vectorLoading'),false);
});

test('flat map picking inverts projection at rotated and rebased camera positions',()=>{
 const ctx=vm.createContext({merc:(lon,lat)=>({x:lon,y:lat}),unmerc:(x,y)=>({lon:x,lat:y}),Math});
 vm.runInContext(section('class TerrainMap{','function pointSegment2('),ctx);
 vm.runInContext("var map=Object.create(TerrainMap.prototype);Object.assign(map,{renderer:'svg',center:{x:200,y:400},span:5000,zoom:.3,tx:.7,tz:-.4,yaw:1.1,w:1200,h:800});map.matrix();",ctx);
 for(const [lon,lat] of [[200,400],[2500,1800],[-1900,-800]]){
  const p=vm.runInContext(`var q=map.project({lon:${lon},lat:${lat}});map.screenToGeo(q.x,q.y)`,ctx);
  assert.ok(Math.abs(p.lon-lon)<.001);assert.ok(Math.abs(p.lat-lat)<.001);
 }
});
