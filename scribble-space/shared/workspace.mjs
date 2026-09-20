// Domain state: no browser, rendering or storage dependencies.
export const initialWorkspace = (template='blank') => ({template,walls:[],measurements:[]});
const vec = p => Array.isArray(p)&&p.length===3&&p.every(n=>Number.isFinite(n)&&Math.abs(n)<=10000);
const id = s => typeof s==='string'&&/^[a-z0-9-]{8,80}$/.test(s);
export function validateWorkspace(w) {
 if(!w||!['blank','room','courtyard','model'].includes(w.template)||!Array.isArray(w.walls)||w.walls.length>500||!Array.isArray(w.measurements)||w.measurements.length>500) throw Error('Invalid scene layout.');
 const ids=new Set();
 for(const item of [...w.walls,...w.measurements]){if(!id(item.id)||ids.has(item.id)||!vec(item.a)||!vec(item.b))throw Error('Invalid scene element.');ids.add(item.id)}
 for(const wall of w.walls) if(!Number.isFinite(wall.height)||wall.height<.1||wall.height>30||!Number.isFinite(wall.thickness)||wall.thickness<.02||wall.thickness>3||Math.abs(wall.a[1]-wall.b[1])>.001||distance(wall.a,wall.b)<.05||!['rough','snapped'].includes(wall.precision))throw Error('Invalid wall dimensions.');
 if(w.template==='model'&&(!w.model||!/^([a-f0-9]{64})\.glb$/.test(w.model.asset)||typeof w.model.name!=='string'||w.model.name.length>180))throw Error('Invalid model reference.');
 return structuredClone(w);
}
export const distance=(a,b)=>Math.hypot(...a.map((v,i)=>v-b[i]));
export const snapPoint=(p,step)=>step?p.map(v=>Math.round(v/step)*step):p;
export function newWall(a,b,{height=3,thickness=.18,snap=0}={}){
 a=snapPoint(a,snap);b=snapPoint(b,snap);b[1]=a[1];
 if(distance(a,b)<.05)throw Error('Choose two wall points at least 5 cm apart.');
 return {id:crypto.randomUUID(),a,b,height,thickness,precision:snap?'snapped':'rough',evidence:'user-estimated'};
}
