const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const slice=(a,b)=>html.slice(html.indexOf(a),html.indexOf(b));
function fixture(){
 const ctx=vm.createContext({console,setTimeout,AbortController,DOMException,clamp:(x,a,b)=>Math.max(a,Math.min(b,x)),delay:()=>Promise.resolve(),S:{demo:false}});
 vm.runInContext(slice('const defaultSettings=','const S=')+slice('const EARTH=','async function fetchTimed(')+slice('function rollingCoefficient(','const roadCache=')+slice('async function buildGraph(','let loadingStarted='),ctx);
 vm.runInContext(`var start={lat:0,lon:0},finish={lat:0,lon:.01};var data={elements:[
  {type:'node',id:1,lat:0,lon:0},{type:'node',id:2,lat:0,lon:.00002},
  {type:'node',id:3,lat:.0001,lon:0},{type:'node',id:4,lat:0,lon:.01},
  {type:'way',id:10,nodes:[1,2],tags:{highway:'cycleway',oneway:'yes'}},
  {type:'way',id:20,nodes:[3,4],tags:{highway:'cycleway',oneway:'yes'}}]};`,ctx);
 return {ctx,run:code=>vm.runInContext(code,ctx)};
}
test('nearby connected start replaces a one-way dead end; destination may be a sink',async()=>{
 const {run}=fixture();await run('buildGraph(data,{at:()=>0},defaultSettings).then(g=>graph=g)');
 assert.equal(run('nearestNode(graph,start).node.id'),1);
 const result=await run("routeWithSnaps(graph,[start,finish],'energy')");
 assert.equal(result.snapped[0].node.id,3);assert.equal(result.snapped[1].node.id,4);
 assert.ok(result.snapped[0].distance>10&&result.snapped[0].distance<12);
 assert.ok(result.path.length>0);assert.equal(result.path[0].way,20);
});
test('both-ways routing never relaxes one-way restrictions while trying alternate snaps',async()=>{
 const {run}=fixture();await run('buildGraph(data,{at:()=>0},defaultSettings).then(g=>graph=g)');
 await assert.rejects(run("routeWithSnaps(graph,[start,finish],'both')"),/No fully reversible route/);
});
test('endpoint candidates never exceed the existing 450 m snapping limit',async()=>{
 const {run}=fixture();await run('buildGraph(data,{at:()=>0},defaultSettings).then(g=>graph=g)');
 assert.throws(()=>run("snapCandidates(graph,{lat:1,lon:1},'start')"),/450 m/);
});
