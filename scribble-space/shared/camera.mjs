const vector=v=>Array.isArray(v)&&v.length===3&&v.every(n=>typeof n==='number'&&Number.isFinite(n)&&Math.abs(n)<=1e6);
export function validateViewpoint(raw){
 if(!raw||!vector(raw.position)||!vector(raw.target))throw Error('A viewpoint needs finite position and target coordinates.');
 const fov=raw.fov??55;if(!Number.isFinite(fov)||fov<10||fov>120||Math.hypot(...raw.position.map((n,i)=>n-raw.target[i]))<.01)throw Error('Invalid starting viewpoint.');
 return {position:[...raw.position],target:[...raw.target],fov};
}
export function frameBounds(min,max,aspect=1,fov=55,top=false){
 if(!vector(min)||!vector(max)||max.some((n,i)=>n<min[i])||!Number.isFinite(aspect)||aspect<=0)throw Error('The model has invalid bounds.');
 const target=min.map((n,i)=>(n+max[i])/2),radius=Math.max(.5,Math.hypot(...max.map((n,i)=>n-min[i]))/2);
 const halfV=fov*Math.PI/360,halfH=Math.atan(Math.tan(halfV)*aspect),distance=radius/Math.sin(Math.min(halfV,halfH))*1.08;
 const direction=top?[0,1,.0001]:[.8,.6,.9],length=Math.hypot(...direction);
 return {position:target.map((n,i)=>n+direction[i]/length*distance),target,fov};
}
export function farForBounds(position,min,max){
 // Include every corner, including when the camera moves outside the model.
 const reach=Math.hypot(...position.map((n,i)=>Math.max(Math.abs(n-min[i]),Math.abs(n-max[i]))));
 return Math.max(2000,reach*1.15+10);
}
