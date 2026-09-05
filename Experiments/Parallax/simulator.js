/* Render a textured world into images. Truth is never an estimator input. */
export class RoadSimulator{
 constructor(width=384,height=288){this.width=width;this.height=height;this.fov=76;this.heightM=1.5;this.scenario='forward';this.image=new ImageData(width,height);}
 hash(x,y){let n=Math.imul(x,374761393)+Math.imul(y,668265263);n=Math.imul(n^(n>>>13),1274126177);return ((n^(n>>>16))>>>0)/4294967295;}
 noise(x,y){const i=Math.floor(x),j=Math.floor(y);let u=x-i,v=y-j;u=u*u*(3-2*u);v=v*v*(3-2*v);return (1-v)*((1-u)*this.hash(i,j)+u*this.hash(i+1,j))+v*((1-u)*this.hash(i,j+1)+u*this.hash(i+1,j+1));}
 render(time){
  const w=this.width,h=this.height,d=this.image.data,f=Math.hypot(w,h)/(2*Math.tan(this.fov*Math.PI/360));
  const speed=this.scenario==='rotation'?0:10,yaw=this.scenario==='side'?Math.PI/2:this.scenario==='rotation'?.16*Math.sin(time*.7):0;
  const pitch=.20,cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch),travel=speed*time;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
   const k=(y*w+x)*4,rx=(x-w/2)/f,ry=(y-h/2)/f,Y=cp*ry+sp;
   if(Y<.05){const a=y/h;d[k]=26+40*a;d[k+1]=45+50*a;d[k+2]=63+55*a;d[k+3]=255;continue;}
   const r=this.heightM/Y,X=(cy*rx-sp*sy*ry+cp*sy)*r,Z=(-sy*rx-sp*cy*ry+cp*cy)*r+travel;
   let v=45+115*this.noise(X*4,Z*4)+50*this.noise(X*12,Z*12);
   if(Math.abs(Math.abs(X)-1.7)<.05&&((Z%5+5)%5)<2.7)v=225;
   d[k]=v*.84;d[k+1]=v*.90;d[k+2]=v;d[k+3]=255;
  }return {image:this.image,truthMps:speed};
 }
}
