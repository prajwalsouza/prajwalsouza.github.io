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
function demoFixture(){
 const f=fixture();f.run(slice('function demoHeightXY(', '/* Native WebGL.'));
 f.run('S.demo=true');return f;
}
test('distinct route choices include longer lower-effort alternatives without duplicate paths',async()=>{
 const {run}=demoFixture();await run('buildGraph(DEMO_DATA,demoElevation,defaultSettings).then(g=>graph=g)');
 const routes=await run("routeOptions(graph,demoEnds(),'energy').then(r=>choices=r)");
 assert.ok(routes.length>=3&&routes.length<=6);
 const direct=routes.find(r=>r.goal==='distance');assert.ok(direct);
 assert.ok(routes[0].metrics.distance>direct.metrics.distance);
 assert.ok(routes[0].metrics.kcal<direct.metrics.kcal);
 assert.ok(routes[0].metrics.maxGrade<direct.metrics.maxGrade);
 assert.equal(new Set(routes.map(r=>r.points.map(p=>p.id).join(','))).size,routes.length);
 assert.ok(routes.every(r=>r.plan.length===2&&r.snaps.every(s=>Number.isFinite(s.id))));
});
test('return search respects one-way roads and can find a separate return path',async()=>{
 const {run}=fixture();run(`data={elements:[
 {type:'node',id:1,lat:0,lon:0},{type:'node',id:2,lat:0,lon:.01},{type:'node',id:3,lat:.003,lon:.005},
 {type:'way',id:10,nodes:[1,2],tags:{highway:'cycleway',oneway:'yes'}},
 {type:'way',id:20,nodes:[2,3,1],tags:{highway:'cycleway',oneway:'yes'}}]}`);
 await run('buildGraph(data,{at:p=>p.lon*1000},defaultSettings).then(g=>graph=g)');
 const out=await run("routeOptions(graph,[start,finish],'energy',undefined,[{node:graph.nodes.get(1),distance:0},{node:graph.nodes.get(2),distance:0}]).then(r=>out=r)");
 const back=await run("routeOptions(graph,[finish,start],'energy',undefined,[{node:graph.nodes.get(2),distance:0},{node:graph.nodes.get(1),distance:0}])");
 assert.equal(out[0].reversible,false);assert.deepEqual([...out[0].wayIds],[10]);
 assert.deepEqual([...back[0].wayIds],[20]);assert.equal(back[0].points[0].id,out[0].points.at(-1).id);assert.equal(back[0].points.at(-1).id,out[0].points[0].id);
 assert.ok(back[0].metrics.descent>0);assert.ok(back[0].metrics.kcal!==out[0].metrics.kcal);
});
test('no-return network fails explicitly without jumping to a different endpoint',async()=>{
 const {run}=fixture();await run('buildGraph(data,{at:()=>0},defaultSettings).then(g=>graph=g)');
 await assert.rejects(run("routeOptions(graph,[finish,start],'energy',undefined,[{node:graph.nodes.get(4),distance:0},{node:graph.nodes.get(3),distance:0}])"),/No legal route/);
});
test('all both-ways alternatives remain reversible and cancellation stops searches',async()=>{
 const {run}=demoFixture();await run('buildGraph(DEMO_DATA,demoElevation,defaultSettings).then(g=>graph=g)');
 const routes=await run("routeOptions(graph,demoEnds(),'both')");assert.ok(routes.every(r=>r.reversible));
 await assert.rejects(run("(()=>{const c=new AbortController();c.abort();return routeOptions(graph,demoEnds(),'energy',c.signal)})()"),{name:'AbortError'});
});
test('return options visit intermediate stops in reverse order',async()=>{
 const {run}=demoFixture();await run('buildGraph(DEMO_DATA,demoElevation,defaultSettings).then(g=>graph=g)');
 await run("routeOptions(graph,[demoEnds()[0],demoPoint(-1200,-1200,'Stop'),demoEnds()[1]],'energy').then(r=>out=r[0])");
 const back=await run("routeOptions(graph,[...out.snaps].reverse(),'energy',undefined,[...out.snaps].reverse().map(s=>({node:graph.nodes.get(s.id),distance:0})))");
 assert.equal(back[0].snaps[1].name,'Stop');assert.ok(back[0].points.some(p=>p.id===back[0].snaps[1].id));
});
test('slope preference penalizes steep descents and can choose a longer gradual path',async()=>{
 const {run}=fixture();run(`var edges=[null,
 {id:1,from:1,to:3,way:10,physical:{len:100,dh:-20,grade:-.2,work:0}},
 {id:2,from:1,to:2,way:20,physical:{len:300,dh:-10,grade:-1/30,work:0}},
 {id:3,from:2,to:3,way:20,physical:{len:300,dh:-10,grade:-1/30,work:0}}];
 var graph={edges,adj:new Map([[1,[edges[1],edges[2]]],[2,[edges[3]]]]),restrictions:new Map(),settings:defaultSettings};`);
 assert.deepEqual([...(await run("shortestPath(graph,1,3,'distance')"))].map(e=>e.id),[1]);
 assert.deepEqual([...(await run("shortestPath(graph,1,3,'smooth')"))].map(e=>e.id),[2,3]);
});
test('return grades swap uphill and downhill on the same roads',async()=>{
 const {run}=demoFixture();await run('buildGraph(DEMO_DATA,demoElevation,defaultSettings).then(g=>graph=g)');
 const out=await run("routeOptions(graph,demoEnds(),'energy').then(r=>out=r[0])");
 const back=await run("routeOptions(graph,[...out.snaps].reverse(),'energy',undefined,[...out.snaps].reverse().map(s=>({node:graph.nodes.get(s.id),distance:0}))).then(r=>back=r[0])");
 assert.equal(run('sameRoadsBack(out,back)'),true);
 assert.ok(Math.abs(out.metrics.maxUphillGrade-back.metrics.maxDownhillGrade)<1e-9);
 assert.ok(Math.abs(out.metrics.maxDownhillGrade-back.metrics.maxUphillGrade)<1e-9);
 assert.equal(run('returnTitle(out,back,0,[back])'),'Same roads back');
});
test('return labels compare to legal retracing effort, never the outgoing calories',()=>{
 const {run}=fixture();run(`var out={points:[{lon:0,lat:0},{lon:1,lat:0}],reversible:true,metrics:{kcal:200,returnKcal:30}};
 var back={points:[{lon:1,lat:0},{lon:.5,lat:1},{lon:0,lat:0}],metrics:{kcal:40}}`);
 assert.equal(run('returnTitle(out,back,0,[back])'),'Lowest effort back');
 run('back.metrics.kcal=20');assert.equal(run('returnTitle(out,back,0,[back])'),'Lower-effort way back');
 run('out.reversible=false');assert.equal(run('returnTitle(out,back,0,[back])'),'Lowest effort back');
});
