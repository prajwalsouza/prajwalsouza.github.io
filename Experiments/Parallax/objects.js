/* Optional local COCO-SSD inference. Only model assets are downloaded.
 * Pixels never leave the browser. No location API or speed inputs here. */
const TF='https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js';
const COCO='https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js';
function script(url){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=url;s.crossOrigin='anonymous';s.onload=resolve;s.onerror=()=>reject(new Error('Model download unavailable'));document.head.append(s);});}
function iou(a,b){const [x,y,w,h]=a,[u,v,z,t]=b,inter=Math.max(0,Math.min(x+w,u+z)-Math.max(x,u))*Math.max(0,Math.min(y+h,v+t)-Math.max(y,v));return inter/Math.max(1e-8,w*h+z*t-inter);}
export class ObjectClues{
 constructor(onStatus){this.onStatus=onStatus;this.model=null;this.loading=null;this.previous=[];this.serial=0;this.enabled=true;this.generation=0;}
 async load(){
  if(this.model)return this.model;if(this.loading)return this.loading;
  this.onStatus('Loading local object model');
  this.loading=(async()=>{if(!window.tf)await script(TF);await window.tf.ready();if(!window.cocoSsd)await script(COCO);this.model=await window.cocoSsd.load({base:'lite_mobilenet_v2'});this.onStatus('Local object model ready');return this.model;})().catch(e=>{this.loading=null;this.onStatus(e.message);throw e;});
  return this.loading;
 }
 reset(){this.previous=[];this.generation++;}
 async detect(canvas,time){
  if(!this.model||!this.enabled)return [];
  const generation=this.generation;const found=await this.model.detect(canvas,14,.60),w=canvas.width,h=canvas.height;
  if(generation!==this.generation||!this.enabled)return [];
  const objects=found.filter(o=>['person','car','bus','truck','motorcycle','bicycle','train'].includes(o.class)).map(o=>({...o,bbox:[o.bbox[0]/w,o.bbox[1]/h,o.bbox[2]/w,o.bbox[3]/h]}));
  const used=new Set();for(const o of objects){let best=null,score=.15;for(const old of this.previous){if(old.class!==o.class||used.has(old.id)||time-old.time>2.5)continue;const s=iou(o.bbox,old.bbox);if(s>score){score=s;best=old;}}o.id=best?best.id:++this.serial;o.time=time;used.add(o.id);}
  this.previous=objects;return objects;
 }
}
