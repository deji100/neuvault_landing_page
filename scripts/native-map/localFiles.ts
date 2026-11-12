// @ts-nocheck -- browser implementation of the demo's read-only file bridge.
export function installLocalFiles(){
 const allowed=new Set(['/desktop-tour-media/kyoto-stay.pdf']);
 window.desktop={...window.desktop,system:{...window.desktop?.system,
  pathExists:async path=>allowed.has(path),
  fileStat:async path=>{
   if(!allowed.has(path))return null;
   const response=await fetch(path,{method:'HEAD'});
   return response.ok?{isFile:true,size:Number(response.headers.get('content-length'))||6946,mtimeMs:1794351600000}:null;
  },
  readFileBase64:async path=>{if(!allowed.has(path))return null;const bytes=new Uint8Array(await(await fetch(path)).arrayBuffer());return btoa(Array.from(bytes,value=>String.fromCharCode(value)).join(''))},
 }};
}
