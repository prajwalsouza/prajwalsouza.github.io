'use strict';
importScripts('./math.js','./tracker.js','./engine.js');
const C=ParallaxCore,T=ParallaxTracker,A=ParallaxAuto;
const ROI=[{x:.03,y:.03},{x:.97,y:.03},{x:.97,y:.97},{x:.03,y:.97}];
let engine=null,previous=null,runId=0,objects=[],geometries=[];
self.onmessage=e=>{
 const m=e.data;
 try{
  if(m.type==='configure'){runId=m.runId;engine=new A.AutoEstimator(m.width,m.height);previous=null;objects=[];geometries=[];self.postMessage({type:'ready',runId});return;}
  if(m.runId!==runId)return;
  if(m.type==='objects'&&engine){
   if(!Array.isArray(m.objects))return;
   objects=m.objects.map(o=>({...o,time:m.time}));
   const near=geometries.reduce((a,g)=>!a||Math.abs(g.time-m.time)<Math.abs(a.time-m.time)?g:a,null);
   if(near&&Math.abs(near.time-m.time)<.22)engine.bank.observe(m.objects,near.geometry,m.time);
   return;
  }
  if(m.type==='clear-objects'){objects=[];engine?.bank.clear();return;}
  if(m.type!=='frame'||!engine)return;
  const start=performance.now(),im=T.gray(new Uint8ClampedArray(m.buffer),m.width,m.height),pyr=T.pyramid(im);
  function blocked(p){return objects.some(o=>m.time-o.time<1.0&&m.time>=o.time&&p.x/im.w>o.bbox[0]-.015&&p.x/im.w<o.bbox[0]+o.bbox[2]+.015&&p.y/im.h>o.bbox[1]-.015&&p.y/im.h<o.bbox[1]+o.bbox[3]+.015);}
  function next(){previous={pyr,time:m.time,epoch:m.epoch,points:T.corners(im,ROI,270).filter(p=>!blocked(p))};}
  if(!previous){next();self.postMessage({type:'result',runId,ok:false,status:'warming',reason:'Looking for scene motion',tracks:previous.points.length,epoch:m.epoch,time:m.time});return;}
  const dt=m.time-previous.time;if(dt<=0){self.postMessage({type:'skip',runId});return;}
  const matches=dt<.7?T.track(previous.pyr,pyr,previous.points,ROI).filter(p=>!blocked({x:p.u,y:p.v})):[];
  const flow=matches.length?C.quantile(matches.map(p=>Math.hypot(p.u-p.x,p.v-p.y)),.5):0;
  if(matches.length>24&&flow<1.0&&dt<.35){self.postMessage({type:'skip',runId,tracks:matches.length});return;}
  const out=engine.process(matches,dt,m.time,m.epoch);next();
  if(out.ok){geometries.push({time:m.time,geometry:{...engine.geometry}});geometries=geometries.filter(g=>m.time-g.time<3);}
  self.postMessage({type:'result',runId,...out,epoch:m.epoch,time:m.time,computeMs:performance.now()-start,baseline:dt});
 }catch(error){previous=null;self.postMessage({type:'error',runId,message:String(error.message||error)});}
};
