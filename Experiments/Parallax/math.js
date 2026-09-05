/* Parallax — dependency-free projective geometry utilities.
 * No location, GPS, networking or DOM input is accepted in this module.
 * MIT license. Model-based intervals are NOT empirically calibrated coverage.
 */
(function(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ParallaxCore = api;
})(typeof self !== 'undefined' ? self : globalThis, function() {
  'use strict';
  const clamp = (x,a,b) => Math.min(b,Math.max(a,x));
  const dot = (a,b) => a.reduce((s,x,i)=>s+x*b[i],0);
  const norm = a => Math.hypot(...a);
  const mul = (a,s) => a.map(x=>x*s);
  const sub = (a,b) => a.map((x,i)=>x-b[i]);
  const unit = a => mul(a,1/(norm(a)||1));
  const cross = (a,b) => [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const mv = (m,v) => [dot(m.slice(0,3),v),dot(m.slice(3,6),v),dot(m.slice(6,9),v)];
  function mm(a,b) { const r = Array(9).fill(0); for(let i=0;i<3;i++)for(let j=0;j<3;j++)for(let k=0;k<3;k++)r[i*3+j]+=a[i*3+k]*b[k*3+j]; return r; }
  function transpose(m) {return [m[0],m[3],m[6],m[1],m[4],m[7],m[2],m[5],m[8]];}
  function quantile(a,q) { if(!a.length)return NaN; const s=[...a].sort((a,b)=>a-b),i=(s.length-1)*q,l=Math.floor(i);return s[l]+(s[Math.ceil(i)]-s[l])*(i-l); }
  function random(seed=1729) {let a=seed>>>0;return ()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
  function normal(rng) {return Math.sqrt(-2*Math.log(Math.max(1e-12,rng())))*Math.cos(2*Math.PI*rng());}
  function solve(A,b) {
    const n=b.length,m=A.map((r,i)=>[...r,b[i]]);let maxPivot=0,minPivot=Infinity;
    for(let c=0;c<n;c++) {let p=c;for(let r=c+1;r<n;r++)if(Math.abs(m[r][c])>Math.abs(m[p][c]))p=r;
      const z=Math.abs(m[p][c]);if(z<1e-11||!Number.isFinite(z))return null;
      maxPivot=Math.max(maxPivot,z);minPivot=Math.min(minPivot,z);[m[p],m[c]]=[m[c],m[p]];
      const v=m[c][c];for(let j=c;j<=n;j++)m[c][j]/=v;
      for(let r=0;r<n;r++){if(r===c)continue;const f=m[r][c];for(let j=c;j<=n;j++)m[r][j]-=f*m[c][j];}
    }
    if(maxPivot/minPivot>1e13)return null;
    return m.map(r=>r[n]);
  }
  function fitHomography(points, weights=null) {
    if(points.length<4)return null;
    const A=Array.from({length:8},()=>Array(8).fill(0)),b=Array(8).fill(0);
    for(let k=0;k<points.length;k++) {
      const p=points[k],x=p.x,y=p.y,u=p.u,v=p.v,w=weights?weights[k]:1;
      const rows=[[x,y,1,0,0,0,-u*x,-u*y],[0,0,0,x,y,1,-v*x,-v*y]];
      for(let z=0;z<2;z++){const a=rows[z],target=z?v:u;for(let i=0;i<8;i++){b[i]+=w*a[i]*target;for(let j=i;j<8;j++)A[i][j]+=w*a[i]*a[j];}}
    }
    for(let i=0;i<8;i++)for(let j=0;j<i;j++)A[i][j]=A[j][i];
    const h=solve(A,b);return h?[...h,1]:null;
  }
  function project(h,x,y) {const d=h[6]*x+h[7]*y+h[8];if(Math.abs(d)<1e-9)return [1e6,1e6];return [(h[0]*x+h[1]*y+h[2])/d,(h[3]*x+h[4]*y+h[5])/d];}
  function reprojection(h,p) {const q=project(h,p.x,p.y);return Math.hypot(q[0]-p.u,q[1]-p.v);}
  function robustHomography(points, threshold, rng=random()) {
    if(points.length<12)return null;
    let best=[],bestError=Infinity,bestH=null;
    for(let it=0;it<180;it++) {
      const ids=new Set();while(ids.size<4)ids.add(Math.floor(rng()*points.length));
      const h=fitHomography([...ids].map(i=>points[i]));if(!h)continue;
      let idsIn=[],err=0;for(let i=0;i<points.length;i++){const e=reprojection(h,points[i]);if(e<threshold){idsIn.push(i);err+=e*e;}}
      if(idsIn.length>best.length||(idsIn.length===best.length&&err<bestError)){best=idsIn;bestError=err;bestH=h;}
      if(it>25&&best.length>points.length*.93)break;
    }
    if(best.length<12)return null;
    for(let it=0;it<3;it++) {
      const ps=best.map(i=>points[i]);
      const w=ps.map(p=>Math.min(1,threshold*.6/Math.max(1e-8,reprojection(bestH,p))));
      const h=fitHomography(ps,w);if(!h)break;bestH=h;
      best=points.map((p,i)=>reprojection(h,p)<threshold?i:-1).filter(i=>i>=0);
      if(best.length<12)return null;
    }
    return {H:bestH, indices:best, points:best.map(i=>points[i]), rms:Math.sqrt(best.reduce((s,i)=>s+reprojection(bestH,points[i])**2,0)/best.length),ratio:best.length/points.length};
  }
  function intrinsics(width,height,diagonalFov) {
    const f=Math.hypot(width,height)/(2*Math.tan(diagonalFov*Math.PI/360));
    return {f,cx:width/2,cy:height/2,K:[f,0,width/2,0,f,height/2,0,0,1],Ki:[1/f,0,-width/(2*f),0,1/f,-height/(2*f),0,0,1]};
  }
  function groundNormal(width,height,fov,horizon,roll) {
    const k=intrinsics(width,height,fov),slope=Math.tan(roll*Math.PI/180);
    return unit([-slope*k.f,k.f,k.cy-horizon*height]);
  }
  function normalHorizon(n,k) {return Math.abs(n[1])<.05?NaN:(k.cy-k.f*n[2]/n[1]);}
  function calibratedHomography(h,width,height,fov) {
    const s=Math.max(width,height),D=[s,0,width/2,0,s,height/2,0,0,1],Di=[1/s,0,-width/(2*s),0,1/s,-height/(2*s),0,0,1],k=intrinsics(width,height,fov);
    return mm(mm(k.Ki,mm(mm(D,h),Di)),k.K);
  }
  function decomposeKnownNormal(H,n) {
    // H ~ R + (t / plane_distance) n^T. Tangent directions remove translation.
    const a=unit(cross(Math.abs(n[2])<.9?[0,0,1]:[0,1,0],n)),b=cross(n,a);
    let u=mv(H,a),v=mv(H,b);const s=(norm(u)+norm(v))/2;
    if(s<1e-7||!Number.isFinite(s))return null;
    u=mul(u,1/s);v=mul(v,1/s);
    const corr=dot(u,v),su=norm(u),sv=norm(v);
    const stretch=Math.max(Math.abs(su-1),Math.abs(sv-1),Math.abs(corr));
    const q1=unit(sub(u,mul(v,corr/2))),q2=unit(sub(v,mul(q1,dot(q1,v)))),q3=unit(cross(q1,q2));
    const Q=[q1[0],q2[0],q3[0],q1[1],q2[1],q3[1],q1[2],q2[2],q3[2]],E=[a[0],b[0],n[0],a[1],b[1],n[1],a[2],b[2],n[2]];
    const R=mm(Q,transpose(E)),t=sub(mul(mv(H,n),1/s),q3);
    const angle=Math.acos(clamp((R[0]+R[4]+R[8]-1)/2,-1,1));
    return {R,t,normal:q3,stretch,angle,vertical:dot(q3,t)};
  }
  return {clamp,dot,norm,mul,sub,unit,cross,mv,mm,transpose,quantile,random,normal,solve,fitHomography,project,robustHomography,intrinsics,calibratedHomography,decomposeKnownNormal};
});
