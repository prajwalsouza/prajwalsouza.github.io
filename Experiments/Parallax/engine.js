/* Parallax v0.2 — automatic planar-motion hypotheses and conditional scale.
 * Original implementation, MIT. No GPS, network, DOM or accelerometer inputs.
 * Intervals are model intervals, NOT validated frequentist coverage.
 */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./math.js'):root.ParallaxCore);if(typeof module==='object'&&module.exports)module.exports=api;else root.ParallaxAuto=api;})(typeof self!=='undefined'?self:globalThis,function(C){
'use strict';
const {clamp,dot,norm,unit,mul,sub,mv,mm,transpose,random,normal,quantile}=C;
const ID=[1,0,0,0,1,0,0,0,1];
function eigenSymmetric(input){
 const a=[...input],v=[...ID];
 for(let k=0;k<40;k++){
  let p=0,q=1;for(const [i,j] of [[0,2],[1,2]])if(Math.abs(a[3*i+j])>Math.abs(a[3*p+q])){p=i;q=j;}
  const apq=a[p*3+q];if(Math.abs(apq)<1e-13)break;
  const tau=(a[q*3+q]-a[p*3+p])/(2*apq),t=(tau>=0?1:-1)/(Math.abs(tau)+Math.hypot(1,tau)),c=1/Math.hypot(1,t),s=t*c;
  a[p*3+p]-=t*apq;a[q*3+q]+=t*apq;a[p*3+q]=a[q*3+p]=0;
  for(let r=0;r<3;r++)if(r!==p&&r!==q){const x=a[r*3+p],y=a[r*3+q];a[r*3+p]=a[p*3+r]=c*x-s*y;a[r*3+q]=a[q*3+r]=s*x+c*y;}
  for(let r=0;r<3;r++){const x=v[r*3+p],y=v[r*3+q];v[r*3+p]=c*x-s*y;v[r*3+q]=s*x+c*y;}
 }
 const ids=[0,1,2].sort((i,j)=>a[j*3+j]-a[i*3+i]);return {values:ids.map(i=>a[i*3+i]),vectors:ids.map(i=>[v[i],v[i+3],v[i+6]])};
}
function determinant(a){return a[0]*(a[4]*a[8]-a[5]*a[7])-a[1]*(a[3]*a[8]-a[5]*a[6])+a[2]*(a[3]*a[7]-a[4]*a[6]);}
// H = R + t n^T. Extreme eigenvectors give two candidate plane normals.
function decompose(H){
 const e=eigenSymmetric(mm(transpose(H),H));if(e.values[1]<1e-12)return [];
 const sign=determinant(H)<0?-1:1,A=mul(H,sign/Math.sqrt(e.values[1]));
 const a=Math.sqrt(Math.max(0,e.values[0]/e.values[1]-1)),b=Math.sqrt(Math.max(0,1-e.values[2]/e.values[1]));
 if(Math.hypot(a,b)<1e-5)return [{R:A,t:[0,0,0],n:null,normal:null,angle:Math.acos(clamp((A[0]+A[4]+A[8]-1)/2,-1,1)),stretch:0,pureRotation:true}];
 const out=[];for(const s of [-1,1]){
  const n=unit(e.vectors[0].map((x,i)=>a*x+s*b*e.vectors[2][i]));
  for(const flip of [1,-1]){const nn=mul(n,flip),d=C.decomposeKnownNormal(A,nn);if(d&&d.stretch<.03&&Number.isFinite(norm(d.t)))out.push({...d,n:nn,pureRotation:false});}
 }return out;
}
function ray(x,y,w,h,fov){const k=C.intrinsics(w,h,fov);return [(x*w-k.cx)/k.f,(y*h-k.cy)/k.f,1];}
function groundCandidates(H,points,w,h,fov,previousNormal=null){
 const ds=decompose(C.calibratedHomography(H,w,h,fov));
 return ds.filter(d=>!d.pureRotation&&d.n[1]>.38&&d.n[2]>-.55&&d.n[2]<.94&&Math.abs(d.n[0])<.78)
 .map(d=>{
  const positive=points.filter(p=>dot(d.n,ray(p.x,p.y,w,h,fov))>.025).length/Math.max(1,points.length);
  const vertical=Math.abs(dot(d.normal,d.t))/Math.max(.001,norm(d.t));
  const continuity=previousNormal?clamp(dot(previousNormal,d.n),-1,1):1;
  return {...d,positive,vertical,score:3*d.n[1]+2*positive-2*vertical+.5*continuity};
 }).filter(d=>d.positive>.85&&d.vertical<.5).sort((a,b)=>b.score-a.score);
}
function coverage(ps,w,h){if(!ps.length)return 0;const xs=ps.map(p=>p.x/w),ys=ps.map(p=>p.y/h);return (quantile(xs,.95)-quantile(xs,.05))*(quantile(ys,.95)-quantile(ys,.05));}
function objectHeightRatio(box,n,w,h,fov){
 const [x,y,bw,bh]=box,rt=unit(ray(x+bw/2,y,w,h,fov)),rb=ray(x+bw/2,y+bh,w,h,fov),den=dot(n,rb);
 if(den<.07||bh<.045||y<.015||y+bh>.985||x<.008||x+bw>.992)return NaN;
 const B=mul(sub(rb,mul(rt,dot(rt,rb))),1/den),N=sub(n,mul(rt,dot(rt,n))),bb=dot(B,B);
 const ratio=dot(B,N)/bb;
 const residual=norm(sub(mul(B,ratio),N))/Math.max(.01,norm(N));
 return ratio>.1&&ratio<5&&residual<.4?ratio:NaN;
}
// Broad engineering assumptions, not fitted population statistics.
const SIZE_PRIORS={person:{median:1.55,logSD:.38},car:{median:1.50,logSD:.32},bus:{median:3.10,logSD:.28}};
class ScaleBank{
 constructor(){this.refs=new Map();this.serial=0;}
 clear(){this.refs.clear();}
 observe(objects,geometry,time){
  if(!geometry)return;
  for(const o of objects){
   if(!SIZE_PRIORS[o.class]||o.score<.65)continue;
   const ratio=objectHeightRatio(o.bbox,geometry.n,geometry.w,geometry.h,geometry.fov);if(!Number.isFinite(ratio))continue;
   const id=o.id??`${o.class}-${++this.serial}`,old=this.refs.get(id),quality=o.score*o.bbox[3];
   // One persistent size observation per tracked object.
   if(!old||quality>old.quality*1.05||time-old.time>3)this.refs.set(id,{...o,geometry:{...geometry},ratio,quality,time});
   else old.seen=time;
  }
  for(const [id,o] of this.refs)if(time-(o.seen??o.time)>25)this.refs.delete(id);
  while(this.refs.size>12)this.refs.delete(this.refs.keys().next().value);
 }
 distribution(fov,time){
  const logs=Array.from({length:100},(_,i)=>Math.log(.20)+i/99*Math.log(40)),prior=logs.map(x=>-.5*((x-Math.log(1.5))/.55)**2),groups={};
  for(const o of this.refs.values()){
   const age=time-(o.seen??o.time);if(age>25)continue;
   const g=o.geometry,k0=C.intrinsics(g.w,g.h,g.fov),k=C.intrinsics(g.w,g.h,fov);
   const line=mv(transpose(k0.Ki),g.n),n=unit(mv(transpose(k.K),line));
   const ratio=objectHeightRatio(o.bbox,n,g.w,g.h,fov);if(!Number.isFinite(ratio))continue;
   const sp=SIZE_PRIORS[o.class],mu=Math.log(ratio*sp.median),sd=Math.hypot(sp.logSD,.22);
   (groups[o.class]??=[]).push(logs.map(x=>Math.log(.75*Math.exp(-.5*((x-mu)/sd)**2)+.25/Math.log(40))*Math.exp(-age/25)));
  }
  // Shared class biases: average rather than multiply within-class evidence.
  for(const group of Object.values(groups))for(let j=0;j<logs.length;j++)prior[j]+=group.reduce((s,g)=>s+g[j],0)/group.length;
  const max=Math.max(...prior),weights=prior.map(x=>Math.exp(x-max)),sum=weights.reduce((s,x)=>s+x,0);
  return {logs,weights:weights.map(x=>x/sum),classes:Object.keys(groups),references:this.refs.size};
 }
 sample(dist,q){let total=0;for(let i=0;i<dist.logs.length;i++){total+=dist.weights[i];if(total>=q)return Math.exp(dist.logs[i]);}return Math.exp(dist.logs.at(-1));}
}
class AutoEstimator{
 constructor(w,h,options={}){this.w=w;this.h=h;this.fov=options.fov??76;this.fovSD=options.fovSD??12;this.rng=random(73219);this.bank=new ScaleBank();this.history=[];this.lastNormal=null;this.lastTime=null;this.geometry=null;this.good=0;this.lastGoodTime=null;this.particles=Array.from({length:48},(_,i)=>({fov:clamp(this.fov+normal(this.rng)*this.fovSD,42,110),q:(i+.5)/48,bias:Math.exp(.2*normal(this.rng))}));}
 reset(){this.history=[];this.lastNormal=null;this.geometry=null;this.good=0;this.bank.clear();}
 objects(observations,time){this.bank.observe(observations,this.geometry,time);}
 fail(reason,extra={}){this.history=[];this.good=0;this.geometry=null;return {ok:false,status:'unavailable',reason,...extra};}
 process(matches,dt,time,epoch){
  const w=this.w,h=this.h,s=Math.max(w,h);if(!Number.isFinite(dt)||dt<.015||dt>.7){this.reset();return this.fail('Reacquiring after a frame gap');}
  if(this.lastGoodTime!==null&&time-this.lastGoodTime>2){this.reset();this.lastGoodTime=null;}this.lastTime=time;
  if(matches.length<24)return this.fail('Not enough stationary scene detail',{tracks:matches.length});
  const movement=quantile(matches.map(p=>Math.hypot(p.u-p.x,p.v-p.y)),.5);
  if(movement<.20)return this.fail('Translation is not visually resolved',{tracks:matches.length,status:'unresolved'});
  const usable=matches.filter(p=>Math.hypot(p.u-p.x,p.v-p.y)>.15);
  const regions=[usable,usable.filter(p=>p.y>h*.44),usable.filter(p=>p.x<w*.58&&p.y>h*.25),usable.filter(p=>p.x>w*.42&&p.y>h*.25)];
  let best=null;
  for(const region of regions){
   if(region.length<24)continue;
   const normalized=region.map(p=>({x:(p.x-w/2)/s,y:(p.y-h/2)/s,u:(p.u-w/2)/s,v:(p.v-h/2)/s}));
   const fit=C.robustHomography(normalized,1.5/s,this.rng);if(!fit||fit.points.length<22||fit.ratio<.52)continue;
   const px=fit.indices.map(i=>region[i]),cov=coverage(px,w,h);if(cov<.035||quantile(px.map(p=>p.y/h),.5)<.32)continue;
   const rays=px.map(p=>({x:p.x/w,y:p.y/h})),solutions=groundCandidates(fit.H,rays,w,h,this.fov,this.lastNormal);if(!solutions.length)continue;
   const d=solutions[0],rate=norm(d.t)/dt;
   if(rate<.005||d.angle/dt>2.8||rate>100)continue;
   const score=Math.log(px.length)+2*cov+d.score-fit.rms*s;
   if(!best||score>best.score)best={fit,px,rays,d,score,cov,solutions};
  }
  if(!best)return this.fail('No consistent ground-motion hypothesis',{tracks:matches.length});
  const {fit,px,rays,d,solutions}=best;
  const ambiguous=solutions[1]&&Math.abs(solutions[1].score-d.score)<.45&&Math.abs(norm(solutions[1].t)/Math.max(.001,norm(d.t))-1)>.4;
  if(ambiguous)return this.fail('Several scene geometries fit; keeping speed unresolved',{tracks:matches.length});
  if(this.lastNormal&&dot(this.lastNormal,d.n)<.65){this.reset();return this.fail('View changed; reacquiring geometry');}
  // Spatial block resampling rather than iid feature-noise resampling.
  const blocks=new Map();for(const p of fit.points){const key=`${Math.floor((p.x*s+w/2)/w*4)}:${Math.floor((p.y*s+h/2)/h*4)}`;(blocks.get(key)||blocks.set(key,[]).get(key)).push(p);}
  const blockList=[...blocks.values()],boot=[fit.H];
  for(let j=0;j<12;j++){const ps=[];for(let k=0;k<blockList.length;k++)ps.push(...blockList[Math.floor(this.rng()*blockList.length)]);const H=C.fitHomography(ps);if(H)boot.push(H);}
  const ratios=[],speeds=[],heights=[];let refCount=0,refClasses=[];
  for(let i=0;i<this.particles.length;i++){
   const p=this.particles[i],H=boot[i%boot.length],ds=groundCandidates(H,rays,w,h,p.fov,d.n);let sol=ds.sort((a,b)=>dot(b.n,d.n)-dot(a.n,d.n))[0];
   if(!sol||dot(sol.n,d.n)<.65||sol.angle/dt>3)continue;
   const rate=norm(sol.t)/dt;if(!Number.isFinite(rate)||rate>120)continue;
   const dist=this.bank.distribution(p.fov,time),height=this.bank.sample(dist,p.q);refCount=dist.references;refClasses=dist.classes;
   ratios.push({id:i,value:rate});speeds.push({id:i,value:rate*height*p.bias});heights.push(height);
  }
  if(speeds.length<32)return this.fail('Geometry is too sensitive to lens uncertainty',{tracks:matches.length,inliers:px.length});
  this.lastGoodTime=time;this.lastNormal=d.normal;this.geometry={n:d.normal,w,h,fov:this.fov};this.good++;
  const current={speeds,dt,time,epoch};this.history.push(current);while(this.history.length>1&&time-this.history[0].time>.55)this.history.shift();
  const samples=[];for(let i=0;i<48;i++){let total=0,weight=0;for(const a of this.history){const v=a.speeds.find(x=>x.id===i);if(v){total+=v.value*a.dt;weight+=a.dt;}}if(weight)samples.push(total/weight);}
  const median=quantile(samples,.5),low=quantile(samples,.025),high=quantile(samples,.975);
  if(!Number.isFinite(median)||median>110||high>220)return this.fail('Estimated scale or motion is outside the supported range');
  const direction=unit(mul(mv(transpose(d.R),d.t),-1)),view=Math.abs(direction[2])>.78?'Forward / rear':Math.abs(direction[0])>.7?'Side view':'Oblique view';
  const first=this.history[0],intervalStartEpoch=first.epoch-first.dt*1000;
  return {ok:true,metric:true,status:this.good<2?'acquiring':'tracking',reason:refClasses.length?'Tentative object-size support; conditional on a ground plane':'Metric scale is assumed, not measured',median,low,high,samples,relativeMedian:quantile(ratios.map(x=>x.value),.5),heightMedian:quantile(heights,.5),heightLow:quantile(heights,.025),heightHigh:quantile(heights,.975),scaleMode:refClasses.length?'object-priors':'broad-height-prior',references:refCount,referenceClasses:refClasses,view,direction,normal:d.normal,tracks:matches.length,inliers:px.length,inlierRatio:fit.ratio,reprojectionPx:fit.rms*s,rotationDeg:d.angle*180/Math.PI,windowSeconds:this.history.reduce((s,x)=>s+x.dt,0),time,epoch,midEpoch:(intervalStartEpoch+epoch)/2,intervalStartEpoch,intervalEndEpoch:epoch,vectors:px,homography:fit.H,uncertainty:'conditional_model_95_uncalibrated'};
 }
}
return {eigenSymmetric,decompose,groundCandidates,objectHeightRatio,SIZE_PRIORS,ScaleBank,AutoEstimator};
});
