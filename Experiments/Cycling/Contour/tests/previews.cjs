const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const section=(a,b)=>html.slice(html.indexOf(a),html.indexOf(b));
function fixture(){
 const key={innerHTML:'Chosen return',hidden:false},classes=new Set(),card={classList:{add:v=>classes.add(v),remove:v=>classes.delete(v)}};
 const events={},context={S:{selected:0},document:{addEventListener:(type,fn)=>events[type]=fn},$ :()=>key,esc:s=>String(s)};
 const ctx=vm.createContext(context);
 vm.runInContext(section('class TerrainMap{','function pointSegment2(')+section('function sameRoadsBack(','function previewReturn(')+section('function routePreviewCard(',"document.addEventListener('click',async e=>"),ctx);
 vm.runInContext(`var map=Object.create(TerrainMap.prototype);var out={label:'Outbound',points:[{lon:0,lat:0,h:0},{lon:1,lat:1,h:1}],metrics:{kcal:100}};
 var alt={label:'Alternative',points:[{lon:0,lat:0,h:0},{lon:2,lat:1,h:1}],metrics:{kcal:110}};
 var back={label:'Return',points:[{lon:1,lat:1,h:1},{lon:2,lat:0,h:0}],metrics:{kcal:50}};
 map.routeDisplay=[out,alt];map.comparisonRoute=back;S.routes=[out,alt];`,ctx);
 return {key,classes,card,ctx,events,run:code=>vm.runInContext(code,ctx)};
}
test('mouse and keyboard card previews restore the selected route and comparison',()=>{
 const {ctx,run,key,classes,card,events}=fixture();card.dataset={index:'1'};card.closest=()=>card;ctx.card=card;
 for(const [enter,leave,event] of [['pointerover','pointerout',{pointerType:'mouse'}],['focusin','focusout',{}]]){
  events[enter]({...event,target:card,relatedTarget:null});
  assert.equal(run('map.preview.route===alt'),true);assert.match(key.innerHTML,/Alternative/);assert.ok(classes.has('is-map-preview'));
  assert.equal(run('S.selected'),0);assert.equal(run('map.routeDisplay[0]===out'),true);
  events[leave]({...event,target:card,relatedTarget:null});
  assert.equal(run('map.preview'),null);assert.equal(key.innerHTML,'Chosen return');assert.equal(key.hidden,false);assert.equal(classes.size,0);
 }
 events.pointerover({target:card,pointerType:'touch'});assert.equal(run('map.preview'),null);
});
test('moving between children of a card does not clear its highlight',()=>{
 const {events,card,run}=fixture();card.dataset={index:'1'};card.closest=()=>card;
 events.pointerover({target:card,pointerType:'mouse'});
 events.pointerout({target:card,relatedTarget:{closest:()=>card},pointerType:'mouse'});
 assert.equal(run('map.preview.route===alt'),true);
});
test('committing a new route clears preview and cannot restore stale comparison labels',()=>{
 const {ctx,run,key,card}=fixture();ctx.card=card;
 run("map.previewRoute(alt,'outbound',card,'Alternative');map.setRoutes([alt]);map.clearPreview()");
 assert.equal(run('map.routeDisplay[0]===alt'),true);assert.equal(run('map.preview'),null);assert.equal(key.hidden,true);
});
test('outbound preview draws on top and return preview keeps outbound colored',()=>{
 const {ctx,run}=fixture(),drawn=[],comparisons=[];
 ctx.renderContext=new Proxy({setTransform(){},clearRect(){},setLineDash(){},beginPath(){},moveTo(){},lineTo(){},stroke(){}},{set:(obj,k,v)=>(obj[k]=v,true)});
 ctx.record=p=>drawn.push(p);ctx.compare=r=>comparisons.push(r.label);
 run('map.ctx=renderContext;map.dpr=1;map.w=500;map.h=500;map.project=p=>{record(p.lon);return {x:p.lon,y:p.lat}};map.drawPin=()=>{};map.drawComparison=compare');
 run("map.previewRoute(alt,'outbound',null,'Alternative');map.drawOverlay()");
 assert.deepEqual(drawn,[0,1,0,2]);assert.deepEqual(comparisons,[]);
 drawn.length=0;run("map.clearPreview();map.routeDisplay=[out];map.previewRoute(back,'return',null,'Return');map.drawOverlay()");
 assert.deepEqual(drawn,[0,1]);assert.deepEqual(comparisons,['Return']);
});
