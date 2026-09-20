// Portable ZIP STORE writer/reader. No Node or DOM dependencies; no executable content.
const encoder=new TextEncoder(),decoder=new TextDecoder();
const crcTable=Uint32Array.from({length:256},(_,i)=>{for(let k=0;k<8;k++)i=(i&1)?0xedb88320^(i>>>1):i>>>1;return i>>>0});
export function crc32(bytes){let crc=0xffffffff;for(const b of bytes)crc=crcTable[(crc^b)&255]^(crc>>>8);return (crc^0xffffffff)>>>0}
function safePath(name){if(!name||name.length>240||name.startsWith('/')||name.includes('\\')||name.split('/').some(s=>s==='..'||s==='.'||!s)||/[:\x00-\x1f]/.test(name))throw Error('Unsafe package path.');return name}
export function zipStore(entries){
 let offset=0;const locals=[],central=[];
 for(const [name,input] of Object.entries(entries)){
  safePath(name);const filename=encoder.encode(name),data=typeof input==='string'?encoder.encode(input):new Uint8Array(input),crc=crc32(data);
  const header=new Uint8Array(30+filename.length),v=new DataView(header.buffer);v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x800,true);v.setUint32(14,crc,true);v.setUint32(18,data.length,true);v.setUint32(22,data.length,true);v.setUint16(26,filename.length,true);header.set(filename,30);
  const c=new Uint8Array(46+filename.length),cv=new DataView(c.buffer);cv.setUint32(0,0x02014b50,true);cv.setUint16(4,20,true);cv.setUint16(6,20,true);cv.setUint16(8,0x800,true);cv.setUint32(16,crc,true);cv.setUint32(20,data.length,true);cv.setUint32(24,data.length,true);cv.setUint16(28,filename.length,true);cv.setUint32(42,offset,true);c.set(filename,46);locals.push(header,data);central.push(c);offset+=header.length+data.length;
 }
 const size=central.reduce((s,a)=>s+a.length,0),end=new Uint8Array(22),ev=new DataView(end.buffer);ev.setUint32(0,0x06054b50,true);ev.setUint16(8,central.length,true);ev.setUint16(10,central.length,true);ev.setUint32(12,size,true);ev.setUint32(16,offset,true);
 return new Blob([...locals,...central,end],{type:'application/zip'});
}
export function unzipStore(buffer){
 const data=new Uint8Array(buffer);if(data.length>180e6)throw Error('Package exceeds 180 MB.');const v=new DataView(data.buffer,data.byteOffset,data.byteLength),files=Object.create(null);let p=0,count=0;
 while(p+4<=data.length&&v.getUint32(p,true)===0x04034b50){
  if(p+30>data.length)throw Error('Incomplete ZIP header.');const flags=v.getUint16(p+6,true),method=v.getUint16(p+8,true),crc=v.getUint32(p+14,true),size=v.getUint32(p+18,true),rawSize=v.getUint32(p+22,true),n=v.getUint16(p+26,true),extra=v.getUint16(p+28,true),start=p+30+n+extra,end=start+size;
  if(method!==0||flags&9)throw Error('Import a ZIP exported by Scribble Space (uncompressed STORE format).');
  if(++count>2000||size!==rawSize||end>data.length||size>64e6)throw Error('Invalid ZIP entry size.');const name=safePath(decoder.decode(data.subarray(p+30,p+30+n)));if(Object.hasOwn(files,name))throw Error('Duplicate ZIP path.');const bytes=data.slice(start,end);if(crc32(bytes)!==crc)throw Error('Package checksum failed.');files[name]=bytes;p=end;
 }
 if(!count||p+4>data.length||v.getUint32(p,true)!==0x02014b50)throw Error('Invalid ZIP package.');
 const end=data.length-22;if(end<p||v.getUint32(end,true)!==0x06054b50||v.getUint16(end+8,true)!==count||v.getUint16(end+10,true)!==count||v.getUint32(end+16,true)!==p||v.getUint32(end+12,true)+p!==end)throw Error('Incomplete ZIP directory.');
 let directory=p;const names=new Set();for(let i=0;i<count;i++){if(directory+46>end||v.getUint32(directory,true)!==0x02014b50)throw Error('Invalid ZIP directory.');const n=v.getUint16(directory+28,true),extra=v.getUint16(directory+30,true),comment=v.getUint16(directory+32,true),next=directory+46+n+extra+comment;if(next>end)throw Error('Invalid ZIP directory size.');const name=decoder.decode(data.subarray(directory+46,directory+46+n));if(!Object.hasOwn(files,name)||names.has(name)||v.getUint32(directory+24,true)!==files[name].length||v.getUint32(directory+16,true)!==crc32(files[name]))throw Error('ZIP directory mismatch.');names.add(name);directory=next}if(directory!==end)throw Error('Unexpected ZIP directory data.');return files;
}
export const digest=async bytes=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(v=>v.toString(16).padStart(2,'0')).join('');
