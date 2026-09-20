import {validateWorkspace} from './workspace.mjs';
export const FORMAT='scribble-space-shot';
export const ID=/^[a-z0-9][a-z0-9-]{7,79}$/;
export const ASSET=/^[a-f0-9]{64}\.(png|glb)$/;
export const clone=value=>structuredClone(value);
const fail=message=>{throw new Error(message)};
const finite=(n,min=-1e6,max=1e6)=>typeof n==='number'&&Number.isFinite(n)&&n>=min&&n<=max;
const vector=(v,length,min=-1e6,max=1e6)=>Array.isArray(v)&&v.length===length&&v.every(n=>finite(n,min,max));
const text=(s,max)=>typeof s==='string'&&s.length<=max;
const asset=id=>typeof id==='string'&&/^[a-f0-9]{64}\.png$/.test(id);
export function validateCamera(c){
 if(!c||!vector(c.position,3)||!vector(c.quaternion,4,-1.001,1.001)||!finite(c.fov,10,120)||!finite(c.near,.001,10)||!finite(c.far,10,1e9)||c.far<=c.near||!finite(c.aspect,.1,10)||!vector(c.projectionMatrix,16)||!vector(c.matrixWorld,16))fail('Invalid saved camera.');
 const norm=Math.hypot(...c.quaternion);if(Math.abs(norm-1)>.005)fail('Invalid camera orientation.');return clone(c);
}
export function validateShot(raw){
 if(!raw||raw.format!==FORMAT||raw.version!==1||(typeof raw.id!=='string'||!ID.test(raw.id)))fail('Invalid sketch document.');
 if(!text(raw.title,120)||!text(raw.note,12000)||!text(raw.scene?.id,120)||!text(raw.scene?.revision,120)||!text(raw.scene?.sha256,64)||!/^[a-f0-9]{64}$/.test(raw.scene.sha256))fail('Invalid sketch details.');
 const workspace=validateWorkspace(raw.workspace);
 const capture=raw.capture;if(!capture||!asset(capture.asset)||!Number.isInteger(capture.width)||!Number.isInteger(capture.height)||capture.width<32||capture.height<32||capture.width>4096||capture.height>4096||capture.width*capture.height>12e6)fail('Invalid screenshot.');
 const camera=validateCamera(raw.camera);if(Math.abs(camera.aspect-capture.width/capture.height)>.005)fail('Screenshot and camera aspect do not match.');
 if(!Array.isArray(raw.marks)||raw.marks.length>4000)fail('Too many annotations.');let points=0;const ids=new Set();
 const marks=raw.marks.map(m=>{
  if(!m||(typeof m.id!=='string'||!ID.test(m.id))||ids.has(m.id)||!['pen','arrow','eraser','image','text','region'].includes(m.type))fail('Invalid annotation.');ids.add(m.id);
  const result={id:m.id,type:m.type};
  if(['pen','arrow','eraser'].includes(m.type)){
   if(!/^#[a-f0-9]{6}$/i.test(m.color||'')||!finite(m.width,.0001,.1)||!Array.isArray(m.points)||!m.points.length||m.type==='arrow'&&m.points.length!==2)fail('Invalid pencil stroke.');
   for(const p of m.points)if(++points>200000||!vector(p,2,0,1))fail('Invalid drawing coordinates.');Object.assign(result,{color:m.color,width:m.width,points:clone(m.points)});
  }else{
   if(!finite(m.x,0,1)||!finite(m.y,0,1))fail('Invalid annotation position.');Object.assign(result,{x:m.x,y:m.y});
   if(m.type==='image'){
    if(!asset(m.asset)||!finite(m.width,.015,1)||!finite(m.height,.015,1)||m.x+m.width>1.001||m.y+m.height>1.001||!text(m.name,180))fail('Invalid reference image.');Object.assign(result,{asset:m.asset,width:m.width,height:m.height,name:m.name});
   }else if(m.type==='region'){
    if(!finite(m.width,0,1)||!finite(m.height,0,1)||m.x+m.width>1.001||m.y+m.height>1.001||!text(m.text,1000)||!m.text.trim()||!/^#[a-f0-9]{6}$/i.test(m.color||''))fail('Invalid area annotation.');Object.assign(result,{width:m.width,height:m.height,text:m.text,color:m.color});
   }else{
    if(!text(m.text,1000)||!finite(m.size,.005,.15)||!/^#[a-f0-9]{6}$/i.test(m.color||''))fail('Invalid text annotation.');Object.assign(result,{text:m.text,size:m.size,color:m.color});
   }
  }
  if(m.anchor!==undefined){if(m.anchor!==null&&(!vector(m.anchor.point,3)||!vector(m.anchor.normal,3,-1.001,1.001)||!text(m.anchor.mesh,180)))fail('Invalid surface anchor.');result.anchor=clone(m.anchor)}
  return result;
 });
 if(raw.preview!==null&&raw.preview!==undefined&&!asset(raw.preview))fail('Invalid preview image.');
 return {format:FORMAT,version:1,id:raw.id,title:raw.title.trim()||'Untitled view',note:raw.note,scene:{id:raw.scene.id,revision:raw.scene.revision,sha256:raw.scene.sha256},capture:{asset:capture.asset,width:capture.width,height:capture.height},camera,workspace,marks,preview:raw.preview||null};
}
export function immutableCapture(shot){return JSON.stringify([shot.scene,shot.capture,shot.camera,shot.workspace])}
export function referencedAssets(shot){return [...new Set([shot.capture.asset,shot.preview,shot.workspace?.model?.asset,...shot.marks.filter(m=>m.type==='image').map(m=>m.asset)].filter(Boolean))]}
export function fitFrame(containerWidth,containerHeight,imageWidth,imageHeight){const scale=Math.min(containerWidth/imageWidth,containerHeight/imageHeight);const width=imageWidth*scale,height=imageHeight*scale;return {x:(containerWidth-width)/2,y:(containerHeight-height)/2,width,height,scale}}
export function screenToImage(x,y,frame){return [Math.max(0,Math.min(1,(x-frame.x)/frame.width)),Math.max(0,Math.min(1,(y-frame.y)/frame.height))]}
export function moveSticker(sticker,x,y){return {...sticker,x:Math.max(0,Math.min(1-sticker.width,x)),y:Math.max(0,Math.min(1-sticker.height,y))}}
export function resizeSticker(sticker,width,height){return {...sticker,width:Math.max(.015,Math.min(1-sticker.x,width)),height:Math.max(.015,Math.min(1-sticker.y,height))}}
export class UndoHistory {
 constructor(limit=80){this.limit=limit;this.past=[];this.future=[]}
 push(marks){this.past.push(clone(marks));if(this.past.length>this.limit)this.past.shift();this.future=[]}
 undo(marks){if(!this.past.length)return null;this.future.push(clone(marks));return this.past.pop()}
 redo(marks){if(!this.future.length)return null;this.past.push(clone(marks));return this.future.pop()}
}
