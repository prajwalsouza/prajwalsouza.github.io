// Validate a self-contained GLB without invoking its renderer or fetching URLs.
export function inspectGLB(buffer){
 const bytes=new Uint8Array(buffer),v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
 if(bytes.length<24||bytes.length>64e6||v.getUint32(0,true)!==0x46546c67||v.getUint32(4,true)!==2||v.getUint32(8,true)!==bytes.length||v.getUint32(16,true)!==0x4e4f534a)throw Error('Use a self-contained GLB 2.0 file smaller than 64 MB.');
 const length=v.getUint32(12,true);if(length>bytes.length-20)throw Error('Invalid GLB metadata.');let json;try{json=JSON.parse(new TextDecoder().decode(bytes.subarray(20,20+length)).trim())}catch{throw Error('Invalid GLB JSON.')}
 for(const item of [...(json.buffers||[]),...(json.images||[])])if(item.uri&&!item.uri.startsWith('data:'))throw Error('This GLB references external files. Embed textures and buffers before loading.');
 if((json.extensionsRequired||[]).some(e=>['KHR_draco_mesh_compression','KHR_texture_basisu'].includes(e)))throw Error('This file needs Draco or KTX2 decoding. Export a standard or Meshopt GLB for this version.');return json;
}
