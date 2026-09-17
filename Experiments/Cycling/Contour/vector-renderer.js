/* Rendering only: consumes the same decoded vector tiles as the terrain renderer.
   No routing, storage or network access. SVG paths are built once and transformed
   as a group while moving the camera. */
(function(root){
'use strict';
const NS='http://www.w3.org/2000/svg',WORLD=40075016.68557849;
const layers=['landcover','landuse','park','water','waterway','building','transportation'];
function featureStyle(layer,feature,z){
 const cl=feature.props.class,sc=feature.props.subclass;let fill=null,stroke=null,width=1;
 if(layer==='landcover')fill={wood:'#bdcbb1',grass:'#d2ddc5',farmland:'#dce0c8',ice:'#f1f0e8'}[cl]||null;
 else if(layer==='park')fill='#c9d6bc';
 else if(layer==='landuse')fill=['forest','wood','nature_reserve'].includes(cl)?'#c3d0b5':['residential','commercial','industrial','retail'].includes(cl)?'#e8e8df':['grass','meadow','recreation_ground','village_green'].includes(cl)?'#d0dbbf':null;
 else if(layer==='water')fill='#bacbd0';
 else if(layer==='waterway'){stroke='#b5c8cb';width=1.5}
 else if(layer==='building'){if(z>=14)fill='#d7d9ce'}
 else if(layer==='transportation'){
  if(['rail','transit','ferry','aerialway'].includes(cl))return null;
  if(feature.type===3)fill='#f0f0e8';
  else {stroke=['motorway','trunk','primary'].includes(cl)?'#f4f1e4':'#f8f8ef';width=['motorway','trunk'].includes(cl)?5:['primary','secondary'].includes(cl)?3.5:['minor','tertiary'].includes(cl)?2.6:1.4;if(cl==='path'||sc==='cycleway'){width=1;stroke='#f7f7ef'}}
 }
 return fill||stroke?{fill,stroke,width}:null;
}
const tileKey=t=>`${t.z}/${t.x}/${t.y}`;
function tileRange(bounds,z){
 const size=WORLD/2**z,n=2**z,cap=v=>Math.max(0,Math.min(n-1,v));
 return {minX:cap(Math.floor((bounds.minX+WORLD/2)/size)),maxX:cap(Math.floor((bounds.maxX+WORLD/2)/size)),minY:cap(Math.floor((WORLD/2-bounds.maxY)/size)),maxY:cap(Math.floor((WORLD/2-bounds.minY)/size))};
}
// Keep the current detail level while it is useful; refine only after more
// than 2x overzoom. Zooming out is bounded to 36 tiles, rather than one huge SVG.
function planView(bounds,tiles,maxzoom=14){
 const span=Math.max(bounds.maxX-bounds.minX,bounds.maxY-bounds.minY);
 const ideal=Math.max(0,Math.min(maxzoom,Math.floor(Math.log2(WORLD/span*3))));
 const current=tiles.length?Math.max(...tiles.map(tile=>tile.t.z)):ideal;
 let z=ideal>current+1?ideal:Math.min(current,maxzoom),r=tileRange(bounds,z);
 while(z>0&&(r.maxX-r.minX+1)*(r.maxY-r.minY+1)>36)r=tileRange(bounds,--z);
 const existing=new Map(tiles.map(tile=>[tileKey(tile.t),tile])),wanted=[],missing=[];
 for(let y=r.minY;y<=r.maxY;y++)for(let x=r.minX;x<=r.maxX;x++){const t={z,x,y},tile=existing.get(tileKey(t));wanted.push(tile||{t});if(!tile?.layers)missing.push(t)}
 return {z,tiles:wanted,missing};
}
function pathData(paths,polygon){
 let d='';for(const path of paths){if(!path.length)continue;for(let i=0;i<path.length;i++){const [x,y]=path[i];if(!Number.isFinite(x)||!Number.isFinite(y))continue;d+=(i?'L':'M')+x+','+y}if(polygon)d+='Z'}return d;
}
class PathRecorder{
 constructor(){this.records=[];this.d='';this.fillStyle='#000';this.strokeStyle='#000';this.lineWidth=1}
 beginPath(){this.d=''} moveTo(x,y){this.d+=`M${x},${y}`} lineTo(x,y){this.d+=`L${x},${y}`}
 bezierCurveTo(...p){this.d+='C'+p.join(',')} closePath(){this.d+='Z'}
 fill(){if(this.d)this.records.push({d:this.d,fill:this.fillStyle})}
 stroke(){if(this.d)this.records.push({d:this.d,stroke:this.strokeStyle,width:this.lineWidth})}
 fillRect(x,y,w,h){this.records.push({d:`M${x},${y}h${w}v${h}h${-w}Z`,fill:this.fillStyle})}
}
class SvgMapRenderer{
 constructor(svg){this.svg=svg;this.doc=svg.ownerDocument;this.compiled=new WeakMap();this.revision=0;this.transform='';this.svg.style.background='#e4e8dd'}
 element(tag,attrs={}){const el=this.doc.createElementNS(NS,tag);for(const [name,value] of Object.entries(attrs))el.setAttribute(name,String(value));return el}
 compile(tile){
  let cached=this.compiled.get(tile.layers);if(cached)return cached;
  cached=[];for(const layer of layers){const data=tile.layers[layer];if(!data)continue;const batches=new Map();
   for(const feature of data.features){const style=featureStyle(layer,feature,tile.t.z);if(!style)continue;const key=JSON.stringify(style);let group=batches.get(key);if(!group){group={...style,d:''};batches.set(key,group)}group.d+=pathData(feature.paths,feature.type===3)}
   cached.push({layer,extent:data.extent,paths:[...batches.values()]});
  }
  this.compiled.set(tile.layers,cached);return cached;
 }
 path(record){
  const el=this.element('path',{d:record.d});
  // Inline paint overrides the application's generic icon SVG styles.
  el.style.fill=record.fill||'none';el.style.stroke=record.stroke||'none';el.style.strokeWidth=String((record.width||1)*.65);
  el.setAttribute('vector-effect','non-scaling-stroke');el.setAttribute('fill-rule','nonzero');return el;
 }
 setScene({tiles=[],bounds,span,extra=[]}){
  const defs=this.element('defs'),scene=this.element('g',{'data-vector-scene':''}),groups=new Map();let count=0;
  for(const name of layers){const g=this.element('g',{'data-layer':name});groups.set(name,g);scene.appendChild(g)}
  for(const tile of tiles){if(!tile.layers)continue;const size=WORLD/2**tile.t.z,left=(tile.t.x*size-WORLD/2-bounds.minX)/span*2048,top=(bounds.maxY-(WORLD/2-tile.t.y*size))/span*2048;
   for(const layer of this.compile(tile)){
    const id=`vector-${this.revision}-${count++}`,clip=this.element('clipPath',{id,clipPathUnits:'userSpaceOnUse'});clip.appendChild(this.element('rect',{width:layer.extent,height:layer.extent}));defs.appendChild(clip);
    const g=this.element('g',{transform:`translate(${left} ${top}) scale(${size/span*2048/layer.extent})`,'clip-path':`url(#${id})`});
    for(const path of layer.paths)g.appendChild(this.path(path));groups.get(layer.layer).appendChild(g);
   }
  }
  for(const record of extra)scene.appendChild(this.path(record));
  this.svg.replaceChildren(defs,scene);this.scene=scene;this.transform='';this.revision++;
  this.svg.dataset.tiles=String(tiles.length);this.svg.dataset.paths=String(scene.querySelectorAll('path').length);
 }
 draw(matrix,width,height){
  if(!this.scene)return;const m=matrix;
  const values=[m[0]*width/2048,-m[1]*height/2048,m[8]*width/2048,-m[9]*height/2048,width/2*(1+m[12]-m[0]-m[8]),height/2*(1-m[13]+m[1]+m[9])];
  const transform=`matrix(${values.join(' ')})`;
  if(this.transform!==transform){this.scene.setAttribute('transform',transform);this.transform=transform}
 }
}
const api={SvgMapRenderer,PathRecorder,featureStyle,planView,tileKey,pathData};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ContourVector=api;
})(typeof window==='undefined'?globalThis:window);
