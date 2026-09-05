/* Original pyramidal Lucas–Kanade tracker with Shi–Tomasi-style corners.
 * No external dependencies. MIT license. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ParallaxTracker=api;})(typeof self!=='undefined'?self:globalThis,function(){
  'use strict';
  function gray(rgba,w,h){const a=new Float32Array(w*h);for(let i=0,j=0;i<a.length;i++,j+=4)a[i]=.299*rgba[j]+.587*rgba[j+1]+.114*rgba[j+2];return {data:a,w,h};}
  function pyramid(image){const out=[image];let p=image;for(let l=1;l<4;l++){
    const w=p.w>>1,h=p.h>>1;if(h<24||w<24)break;const data=new Float32Array(w*h);
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      let sum=0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)sum+=p.data[Math.max(0,Math.min(p.h-1,y*2+dy))*p.w+Math.max(0,Math.min(p.w-1,x*2+dx))]*(dx===0?2:1)*(dy===0?2:1);
      data[y*w+x]=sum/16;
    }p={data,w,h};out.push(p);
  }return out;}
  function bilinear(im,x,y){const ix=Math.floor(x),iy=Math.floor(y),dx=x-ix,dy=y-iy,i=iy*im.w+ix,d=im.data;return (1-dy)*((1-dx)*d[i]+dx*d[i+1])+dy*((1-dx)*d[i+im.w]+dx*d[i+im.w+1]);}
  function inside(x,y,polygon){let c=false;for(let i=0,j=polygon.length-1;i<polygon.length;j=i++)if(((polygon[i].y>y)!==(polygon[j].y>y))&&(x<(polygon[j].x-polygon[i].x)*(y-polygon[i].y)/(polygon[j].y-polygon[i].y)+polygon[i].x))c=!c;return c;}
  function corners(image,roi,max=200){
    const {data:d,w,h}=image,iw=w+1,size=iw*(h+1),xx=new Float64Array(size),yy=new Float64Array(size),xy=new Float64Array(size);
    for(let y=1;y<h-1;y++){let sx=0,sy=0,sxy=0;for(let x=1;x<w-1;x++){const i=y*w+x,gx=(d[i+1]-d[i-1])/2,gy=(d[i+w]-d[i-w])/2,j=(y+1)*iw+x+1;sx+=gx*gx;sy+=gy*gy;sxy+=gx*gy;xx[j]=xx[j-iw]+sx;yy[j]=yy[j-iw]+sy;xy[j]=xy[j-iw]+sxy;}}
    function area(a,x,y){const r=3,x0=x-r,y0=y-r,x1=x+r+1,y1=y+r+1;return a[y1*iw+x1]-a[y0*iw+x1]-a[y1*iw+x0]+a[y0*iw+x0];}
    const candidates=[];for(let y=12;y<h-12;y+=3)for(let x=12;x<w-12;x+=3){if(!inside(x/w,y/h,roi))continue;const a=area(xx,x,y),b=area(yy,x,y),c=area(xy,x,y),score=(a+b-Math.hypot(a-b,2*c))/2;if(score>180)candidates.push({x,y,score});}
    candidates.sort((a,b)=>b.score-a.score);const points=[],counts=new Map(),minDist=8;
    for(const p of candidates){const key=`${Math.floor(p.x/w*6)}:${Math.floor(p.y/h*6)}`;if((counts.get(key)||0)>=16)continue;if(points.every(q=>(p.x-q.x)**2+(p.y-q.y)**2>minDist*minDist)){points.push(p);counts.set(key,(counts.get(key)||0)+1);if(points.length>=max)break;}}
    return points;
  }
  function trackOne(A,B,p){
    let dx=0,dy=0,err=Infinity,used=false;const radius=4;
    let top=Math.min(A.length,B.length)-1;
    while(top>0){const z=2**top,x=p.x/z,y=p.y/z,im=A[top];if(x>radius+2&&y>radius+2&&x<im.w-radius-3&&y<im.h-radius-3)break;top--;}
    for(let l=top;l>=0;l--){const z=2**l,a=A[l],b=B[l],x=p.x/z,y=p.y/z;if(l!==top){dx*=2;dy*=2;}
      const template=[],gx=[],gy=[];let gxx=0,gyy=0,gxy=0;
      if(x<radius+2||y<radius+2||x>=a.w-radius-3||y>=a.h-radius-3)return null;
      for(let j=-radius;j<=radius;j++)for(let i=-radius;i<=radius;i++){const tx=x+i,ty=y+j,t=bilinear(a,tx,ty),ix=(bilinear(a,tx+1,ty)-bilinear(a,tx-1,ty))/2,iy=(bilinear(a,tx,ty+1)-bilinear(a,tx,ty-1))/2;template.push(t);gx.push(ix);gy.push(iy);gxx+=ix*ix;gyy+=iy*iy;gxy+=ix*iy;}
      const det=gxx*gyy-gxy*gxy;if(det<1e-3){if(l>0)continue;return null;}
      for(let it=0;it<14;it++){
        const qx=x+dx,qy=y+dy;if(qx<radius+1||qy<radius+1||qx>=b.w-radius-2||qy>=b.h-radius-2)return null;
        let bx=0,by=0,k=0,sum=0,mean=0;const diffs=[];
        for(let j=-radius;j<=radius;j++)for(let i=-radius;i<=radius;i++,k++){const e=bilinear(b,qx+i,qy+j)-template[k];diffs.push(e);mean+=e;}mean/=diffs.length;
        for(k=0;k<diffs.length;k++){const e=diffs[k]-mean;bx+=gx[k]*e;by+=gy[k]*e;sum+=e*e;}
        let ux=(-gyy*bx+gxy*by)/det,uy=(gxy*bx-gxx*by)/det;
        if(!Number.isFinite(ux)||!Number.isFinite(uy)||Math.hypot(ux,uy)>8)return null;
        dx+=ux;dy+=uy;err=Math.sqrt(sum/diffs.length);used=true;
        if(ux*ux+uy*uy<.0009)break;
      }
    }
    return used?{x:p.x+dx,y:p.y+dy,err}:null;
  }
  function track(A,B,points,roi){const out=[];for(const p of points){const q=trackOne(A,B,p);if(!q||q.err>24||!inside(q.x/B[0].w,q.y/B[0].h,roi))continue;const back=trackOne(B,A,q);if(!back||Math.hypot(back.x-p.x,back.y-p.y)>1.2)continue;out.push({x:p.x,y:p.y,u:q.x,v:q.y,error:q.err,fb:Math.hypot(back.x-p.x,back.y-p.y)});}return out;}
  return {gray,pyramid,bilinear,inside,corners,trackOne,track};
});
