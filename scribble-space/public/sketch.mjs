import {UndoHistory,moveSticker,resizeSticker} from '../shared/document.mjs';
export class SketchLayer {
 constructor(canvas,{changed=()=>{},anchor=()=>null}={}){
  this.canvas=canvas;this.ctx=canvas.getContext('2d');this.changed=changed;this.anchor=anchor;this.tool='pen';this.color='#de684b';this.width=4;this.text='';this.images=new Map();this.history=new UndoHistory();
  canvas.addEventListener('pointerdown',e=>this.down(e));canvas.addEventListener('pointermove',e=>this.move(e));canvas.addEventListener('pointerup',e=>this.up(e));canvas.addEventListener('pointercancel',()=>{if(this.before){this.doc.marks=this.before;this.before=null;this.active=null;this.render()}});
 }
 async open(doc,storage){this.doc=doc;this.history=new UndoHistory();this.selected=null;this.canvas.width=doc.capture.width;this.canvas.height=doc.capture.height;this.images.clear();for(const id of new Set([doc.capture.asset,...doc.marks.filter(m=>m.type==='image').map(m=>m.asset)])){const image=await createImageBitmap(await storage.blob(id));this.images.set(id,image)}this.render()}
 close(){for(const im of this.images.values())im.close();this.images.clear();this.doc=null}
 position(e){const r=this.canvas.getBoundingClientRect();return [Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),Math.max(0,Math.min(1,(e.clientY-r.top)/r.height))]}
 down(e){if(!this.doc||e.button!==0)return;e.preventDefault();this.canvas.setPointerCapture(e.pointerId);const p=this.position(e);this.before=structuredClone(this.doc.marks);
  if(this.tool==='select'){this.selected=[...this.doc.marks].reverse().find(m=>m.type==='image'&&p[0]>=m.x&&p[0]<=m.x+m.width&&p[1]>=m.y&&p[1]<=m.y+m.height)?.id;const m=this.doc.marks.find(m=>m.id===this.selected);this.active=m?{id:m.id,start:p,original:structuredClone(m),resize:Math.abs(p[0]-m.x-m.width)<.025&&Math.abs(p[1]-m.y-m.height)<.04}:null;this.render();return}
  if(this.tool==='text'){if(!this.text.trim())return;this.doc.marks.push({id:crypto.randomUUID(),type:'text',x:p[0],y:p[1],text:this.text.slice(0,1000),size:.022,color:this.color,anchor:this.anchor(...p)});this.commit();return}
  const mark={id:crypto.randomUUID(),type:this.tool,color:this.color,width:(this.tool==='eraser'?this.width*5:this.width)/this.canvas.width,points:this.tool==='arrow'?[p,p]:[p]};this.doc.marks.push(mark);this.active={id:mark.id};this.render();
 }
 move(e){if(!this.active)return;const p=this.position(e),i=this.doc.marks.findIndex(m=>m.id===this.active.id),m=this.doc.marks[i];if(!m)return;
  if(m.type==='image'){const a=this.active,o=a.original;this.doc.marks[i]=a.resize?resizeSticker(o,o.width+p[0]-a.start[0],o.height+p[1]-a.start[1]):moveSticker(o,o.x+p[0]-a.start[0],o.y+p[1]-a.start[1])}
  else if(m.type==='arrow')m.points[1]=p;else if(m.points.length<20000)m.points.push(p);this.render();
 }
 up(){if(!this.before)return;if(this.active){const m=this.doc.marks.find(m=>m.id===this.active.id);if(m&&m.type!=='image')m.anchor=this.anchor(...m.points.at(-1))}this.commit()}
 commit(){if(this.before&&JSON.stringify(this.before)!==JSON.stringify(this.doc.marks)){this.history.push(this.before);this.changed()}this.before=null;this.active=null;this.render()}
 async addImage(asset,blob,name){const im=await createImageBitmap(blob);this.images.set(asset,im);const width=.24,height=Math.min(.5,width*this.canvas.width/im.width*im.height/this.canvas.height);this.history.push(this.doc.marks);const m={id:crypto.randomUUID(),type:'image',asset,name:name.slice(0,180),x:.68,y:.12,width,height};this.doc.marks.push(m);this.selected=m.id;this.tool='select';this.render();this.changed()}
 undo(){const next=this.history.undo(this.doc.marks);if(next){this.doc.marks=next;this.selected=null;this.render();this.changed()}}
 redo(){const next=this.history.redo(this.doc.marks);if(next){this.doc.marks=next;this.render();this.changed()}}
 remove(){if(!this.selected)return;this.history.push(this.doc.marks);this.doc.marks=this.doc.marks.filter(m=>m.id!==this.selected);this.selected=null;this.render();this.changed()}
 render(selection=true){if(!this.doc)return;const ctx=this.ctx,w=this.canvas.width,h=this.canvas.height;ctx.clearRect(0,0,w,h);const clean=this.images.get(this.doc.capture.asset);if(clean)ctx.drawImage(clean,0,0,w,h);
  // Erasing removes ink, never the underlying screenshot.
  const layer=document.createElement('canvas');layer.width=w;layer.height=h;const c=layer.getContext('2d');c.lineCap='round';c.lineJoin='round';
  for(const m of this.doc.marks){c.save();if(['pen','arrow','eraser'].includes(m.type)){c.globalCompositeOperation=m.type==='eraser'?'destination-out':'source-over';c.strokeStyle=m.color;c.fillStyle=m.color;c.lineWidth=m.width*w;c.beginPath();m.points.forEach((p,i)=>i?c.lineTo(p[0]*w,p[1]*h):c.moveTo(p[0]*w,p[1]*h));if(m.points.length===1)c.lineTo(m.points[0][0]*w+.1,m.points[0][1]*h);c.stroke();if(m.type==='arrow'){const a=m.points[0],b=m.points[1],angle=Math.atan2((b[1]-a[1])*h,(b[0]-a[0])*w),len=Math.max(13,m.width*w*4);c.beginPath();c.moveTo(b[0]*w,b[1]*h);c.lineTo(b[0]*w-len*Math.cos(angle-.45),b[1]*h-len*Math.sin(angle-.45));c.lineTo(b[0]*w-len*Math.cos(angle+.45),b[1]*h-len*Math.sin(angle+.45));c.closePath();c.fill()}}
   else if(m.type==='image'){const im=this.images.get(m.asset);if(im)c.drawImage(im,m.x*w,m.y*h,m.width*w,m.height*h)}else if(m.type==='text'){c.font=`600 ${m.size*w}px system-ui`;c.fillStyle=m.color;c.textBaseline='top';m.text.split('\n').forEach((line,i)=>c.fillText(line,m.x*w,m.y*h+i*m.size*w*1.3))}c.restore();
  }ctx.drawImage(layer,0,0);if(selection){const m=this.doc.marks.find(m=>m.id===this.selected);if(m){ctx.strokeStyle='#315d56';ctx.lineWidth=2;ctx.strokeRect(m.x*w,m.y*h,m.width*w,m.height*h);ctx.fillStyle='#315d56';ctx.fillRect((m.x+m.width)*w-7,(m.y+m.height)*h-7,14,14)}}
 }
 async preview(){this.render(false);const blob=await new Promise(resolve=>this.canvas.toBlob(resolve,'image/png'));this.render();return blob}
}
