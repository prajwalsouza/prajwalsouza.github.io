import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';
import {initialWorkspace,distance} from '../shared/workspace.mjs';
const V=a=>new THREE.Vector3(...a);
export class WorldView{
 constructor(canvas,{onMove=()=>{},onError=()=>{}}={}){
  this.canvas=canvas;this.onMove=onMove;this.keys=new Set();this.flying=true;this.ready=true;this.speed=6;this.meshes=[];this.pointer=null;this.workspace=initialWorkspace();
  this.renderer=new THREE.WebGLRenderer({canvas,antialias:true,preserveDrawingBuffer:true});this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.05;
  this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#e7e8e0');this.scene.add(new THREE.HemisphereLight(0xfffaf0,0x889b8c,1.8));const sun=new THREE.DirectionalLight(0xfff2d5,2.2);sun.position.set(-8,18,12);this.scene.add(sun);
  this.content=new THREE.Group();this.scene.add(this.content);this.labels=new THREE.Group();this.scene.add(this.labels);this.grid=new THREE.GridHelper(24,24,0xaeb9a9,0xc2cabb);this.grid.position.y=.004;this.scene.add(this.grid);this.camera=new THREE.PerspectiveCamera(55,1,.05,2000);this.ray=new THREE.Raycaster();this.resize();this.home();
  this.observer=new ResizeObserver(()=>{if(this.flying)this.resize()});this.observer.observe(canvas.parentElement);
  canvas.addEventListener('pointerdown',e=>{if(!this.flying||![0,2].includes(e.button))return;e.preventDefault();canvas.focus();canvas.setPointerCapture(e.pointerId);this.pointer={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.classList.add('looking')});
  canvas.addEventListener('pointermove',e=>{if(!this.flying||this.pointer?.id!==e.pointerId)return;this.look(e.clientX-this.pointer.x,e.clientY-this.pointer.y);this.pointer.x=e.clientX;this.pointer.y=e.clientY});
  const release=()=>{this.pointer=null;canvas.classList.remove('looking')};canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',release);canvas.addEventListener('contextmenu',e=>e.preventDefault());
  canvas.addEventListener('wheel',e=>{if(!this.flying)return;e.preventDefault();this.camera.translateZ(Math.sign(e.deltaY)*Math.min(5,Math.abs(e.deltaY)*.015));this.changed()},{passive:false});
  window.addEventListener('keydown',e=>{if(!this.flying||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)||e.metaKey||e.ctrlKey||e.altKey||document.querySelector('dialog[open]'))return;const key=e.key.toLowerCase();if(['w','a','s','d','q','e','shift','arrowup','arrowdown','arrowleft','arrowright'].includes(key)){e.preventDefault();this.keys.add(key)}});
  window.addEventListener('keyup',e=>this.keys.delete(e.key.toLowerCase()));window.addEventListener('blur',()=>{this.keys.clear();release()});document.addEventListener('visibilitychange',()=>{this.keys.clear();this.last=0});
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();this.setFlying(false);onError('Graphics were interrupted. Reload to continue; saved views remain available.')});
  this.renderer.setAnimationLoop(time=>this.animate(time));
 }
 box(size,position,color,id,parent=this.content){const o=new THREE.Mesh(new THREE.BoxGeometry(...size),new THREE.MeshStandardMaterial({color,roughness:.88}));o.position.fromArray(position);o.name=id;o.userData.sm3dlId=id;parent.add(o);return o}
 dispose(group){group.traverse(o=>{o.geometry?.dispose();for(const m of o.material?(Array.isArray(o.material)?o.material:[o.material]):[]){m.map?.dispose();m.dispose()}});group.clear()}
 async setWorkspace(w,modelBytes=null){
  const sourceSame=this.workspace?.template===w.template&&this.workspace?.model?.asset===w.model?.asset&&this.loaded;
  if(!sourceSame){this.dispose(this.content);this.base=new THREE.Group();this.content.add(this.base);this.additions=new THREE.Group();this.content.add(this.additions);
   if(w.template==='model'){
    if(!modelBytes)throw Error('Load the model for this view first.');const gltf=await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).parseAsync(modelBytes,'');this.base.add(gltf.scene);let n=0;gltf.scene.traverse(o=>{if(o.isMesh){o.userData.sm3dlId=`node-${n++}:${o.name}`;for(const m of Array.isArray(o.material)?o.material:[o.material])m.side=THREE.DoubleSide}});
   }else{
    this.box([24,.15,24],[0,-.08,0],'#c9cec2','ground',this.base);
    if(w.template==='room'){
     this.box([10,3,.18],[0,1.5,-4],'#f2e5cd','room-north',this.base);this.box([.18,3,8],[-5,1.5,0],'#ecddc4','room-west',this.base);this.box([.18,3,8],[5,1.5,0],'#ecddc4','room-east',this.base);this.box([10,3,.18],[0,1.5,4],'#f2e5cd','room-south',this.base);
    }
    if(w.template==='courtyard'){
     this.box([13,.2,10],[0,.04,-1],'#e6dac0','terrace',this.base);this.box([13,3,.22],[0,1.6,-6],'#ebe1ce','back-wall',this.base);this.box([.22,3,10],[-6.5,1.6,-1],'#ebe1ce','side-wall',this.base);
     for(let i=0;i<5;i++)this.box([.28,3,.28],[-5+i*2.5,1.6,3],'#f9f1dd',`column-${i}`,this.base);
     this.box([13,.25,2],[0,3.1,3],'#dbc9ad','canopy',this.base);
     for(const [i,x] of [-3,1,4].entries()){this.box([1.8,.14,.85],[x,.86,-2],'#bd7957',`desk-${i}`,this.base);for(const dx of [-.7,.7])this.box([.1,.85,.6],[x+dx,.42,-2],'#69776b',`desk-leg-${i}-${dx}`,this.base)}
     this.box([1.5,.65,.65],[-3,.35,1],'#778c70','planter',this.base);for(let i=0;i<5;i++){const leaf=new THREE.Mesh(new THREE.IcosahedronGeometry(.42,0),new THREE.MeshStandardMaterial({color:'#567761'}));leaf.position.set(-3.6+i*.3,.9+(i%2)*.2,1);leaf.name=`plant-${i}`;this.base.add(leaf)}
     for(let i=0;i<4;i++)this.box([2.4,.18*(i+1),.45],[4,.09*(i+1),4.1-i*.45],'#b4b89f',`step-${i}`,this.base);
    }
   }this.loaded=true;
  }
  this.grid.visible=w.template==='blank';this.workspace=structuredClone(w);this.dispose(this.additions);this.dispose(this.labels);
  for(const wall of w.walls){const len=distance(wall.a,wall.b),mid=V(wall.a).add(V(wall.b)).multiplyScalar(.5);const o=this.box([len,wall.height,wall.thickness],[mid.x,mid.y+wall.height/2,mid.z],'#b0c2b2',wall.id,this.additions);o.rotation.y=-Math.atan2(wall.b[2]-wall.a[2],wall.b[0]-wall.a[0]);this.label(`${len.toFixed(2)} m`,mid.add(new THREE.Vector3(0,wall.height+.25,0)))}
  for(const m of w.measurements){const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([V(m.a),V(m.b)]),new THREE.LineBasicMaterial({color:'#d95c40',depthTest:false}));line.renderOrder=10;this.labels.add(line);this.label(`${distance(m.a,m.b).toFixed(2)} m`,V(m.a).add(V(m.b)).multiplyScalar(.5).add(new THREE.Vector3(0,.2,0)))}
  this.scene.updateMatrixWorld(true);this.meshes=[];this.content.traverse(o=>{if(o.isMesh)this.meshes.push(o)});this.render();
 }
 label(text,position){const c=document.createElement('canvas');c.width=256;c.height=64;const ctx=c.getContext('2d');ctx.fillStyle='#fffdf5';ctx.fillRect(0,0,256,64);ctx.fillStyle='#304639';ctx.font='bold 32px system-ui';ctx.textAlign='center';ctx.fillText(text,128,44);const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false}));sprite.position.copy(position);sprite.scale.set(1.7,.425,1);this.labels.add(sprite)}
 resize(){const rect=this.canvas.parentElement.getBoundingClientRect();if(rect.width<1||rect.height<1)return;this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5,4096/Math.max(rect.width,rect.height),Math.sqrt(12e6/(rect.width*rect.height))));this.renderer.setSize(rect.width,rect.height,false);this.camera.aspect=this.canvas.width/this.canvas.height;this.camera.updateProjectionMatrix();this.render()}
 render(){this.camera.updateMatrixWorld();this.renderer.render(this.scene,this.camera)}
 changed(){this.onMove(this.camera.position);this.render()}
 look(dx,dy){if(!dx&&!dy)return;const e=new THREE.Euler().setFromQuaternion(this.camera.quaternion,'YXZ');e.y-=dx*.003;e.x=THREE.MathUtils.clamp(e.x-dy*.003,-1.55,1.55);this.camera.quaternion.setFromEuler(e);this.changed()}
 animate(time){const dt=Math.min(.05,(time-(this.last||time))/1000);this.last=time;if(!this.flying||document.hidden)return;const k=this.keys,d=new THREE.Vector3();if(k.has('w')||k.has('arrowup'))d.z--;if(k.has('s')||k.has('arrowdown'))d.z++;if(k.has('a')||k.has('arrowleft'))d.x--;if(k.has('d')||k.has('arrowright'))d.x++;if(d.lengthSq())d.applyQuaternion(this.camera.quaternion);if(k.has('e'))d.y++;if(k.has('q'))d.y--;if(d.lengthSq()){this.camera.position.add(d.normalize().multiplyScalar(dt*this.speed*(k.has('shift')?3:1)));this.changed()}}
 setFlying(value){this.flying=value;this.keys.clear();this.pointer=null;if(value)this.resize()}
 home(){this.camera.position.set(13,11,16);this.camera.lookAt(0,0,0);this.changed()}
 frameModel(){const b=new THREE.Box3().setFromObject(this.base),s=b.getSize(new THREE.Vector3()),c=b.getCenter(new THREE.Vector3()),d=Math.max(s.x,s.y,s.z,1);this.camera.position.copy(c).add(new THREE.Vector3(d*.8,d*.6,d*.9));this.camera.lookAt(c);this.changed()}
 top(){this.camera.position.set(0,24,.01);this.camera.lookAt(0,0,0);this.changed()}
 saveCamera(){this.camera.updateProjectionMatrix();this.camera.updateMatrixWorld();return {position:this.camera.position.toArray(),quaternion:this.camera.quaternion.toArray(),fov:this.camera.fov,near:this.camera.near,far:this.camera.far,aspect:this.camera.aspect,projectionMatrix:this.camera.projectionMatrix.toArray(),matrixWorld:this.camera.matrixWorld.toArray()}}
 restoreCamera(saved){this.camera.position.fromArray(saved.position);this.camera.quaternion.fromArray(saved.quaternion);Object.assign(this.camera,{fov:saved.fov,near:saved.near,far:saved.far,aspect:saved.aspect});this.camera.updateProjectionMatrix();this.render()}
 async capture(){this.setFlying(false);this.render();const camera=this.saveCamera(),blob=await new Promise((resolve,reject)=>this.canvas.toBlob(b=>b?resolve(b):reject(Error('Could not capture view.')),'image/png'));return {blob,camera,width:this.canvas.width,height:this.canvas.height}}
 point(u,v,planeY=null){this.ray.setFromCamera(new THREE.Vector2(u*2-1,1-v*2),this.camera);if(planeY!==null){const p=new THREE.Vector3();return this.ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),-planeY),p)?{point:p.toArray(),normal:[0,1,0],mesh:'construction-plane'}:null}const hit=this.ray.intersectObjects(this.meshes,false)[0];if(!hit)return null;const n=hit.face.normal.clone().applyNormalMatrix(new THREE.Matrix3().getNormalMatrix(hit.object.matrixWorld));return {point:hit.point.toArray(),normal:n.toArray(),mesh:String(hit.object.userData.sm3dlId||hit.object.name).slice(0,180)}}
 async exportGLB(){return new GLTFExporter().parseAsync(this.content,{binary:true,onlyVisible:true})}
}
