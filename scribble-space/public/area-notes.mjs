export function selectionBox(a,b){return {x:Math.min(a[0],b[0]),y:Math.min(a[1],b[1]),width:Math.abs(a[0]-b[0]),height:Math.abs(a[1]-b[1])}}
export function hitRegion(m,p){return p[0]>=m.x-.012&&p[0]<=m.x+Math.max(m.width,.024)&&p[1]>=m.y-.012&&p[1]<=m.y+Math.max(m.height,.032)}
export function drawRegion(ctx,m,index,w,h,{draft=false}={}){
 const x=m.x*w,y=m.y*h,rw=m.width*w,rh=m.height*h,size=Math.max(14,Math.min(19,w*.014));
 let label=null;ctx.save();ctx.strokeStyle=m.color||'#de684b';ctx.fillStyle='#de684b14';ctx.lineWidth=Math.max(2,w*.0015);ctx.setLineDash([7,5]);ctx.fillRect(x,y,rw,rh);ctx.strokeRect(x,y,rw,rh);ctx.setLineDash([]);
 if(!draft){
  ctx.fillStyle=m.color;ctx.beginPath();ctx.arc(x,y,size*.75,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ffffff';ctx.font=`600 ${size}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String(index),x,y);ctx.textAlign='left';
  const bw=Math.min(290,w*.38),pad=10,maxWidth=bw-pad*2,words=m.text.split(/\s+/),lines=[];let line='';ctx.font=`500 ${size}px system-ui`;
  for(const word of words){if(line&&ctx.measureText(line+' '+word).width>maxWidth){lines.push(line);line=word}else line+=(line?' ':'')+word}if(line)lines.push(line);
  const visible=lines.slice(0,5);if(lines.length>5)visible[4]+='…';const bh=visible.length*size*1.35+pad*2;
  const bx=Math.max(2,Math.min(w-bw-2,x+10)),by=Math.max(2,Math.min(h-bh-2,y+rh+8));
  label={x:bx/w,y:by/h,width:bw/w,height:bh/h};
  ctx.fillStyle='#fffdf3f5';ctx.fillRect(bx,by,bw,bh);ctx.fillStyle=m.color;ctx.fillRect(bx,by,3,bh);ctx.fillStyle='#283a33';ctx.textBaseline='top';visible.forEach((l,i)=>ctx.fillText(l,bx+pad,by+pad+i*size*1.35,maxWidth));
 }
 ctx.restore();return label;
}
