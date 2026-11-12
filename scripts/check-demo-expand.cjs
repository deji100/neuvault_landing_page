/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS browser check. */
const assert=require('node:assert/strict'),WebSocket=require('next/dist/compiled/ws');
const preview=process.env.PREVIEW_URL||'http://127.0.0.1:3001',cdp=process.env.CDP_URL||'http://127.0.0.1:9334';
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
(async()=>{
 const targets=await(await fetch(cdp+'/json')).json(),socket=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
 await new Promise(resolve=>socket.once('open',resolve));let id=0;const pending=new Map(),errors=[];
 socket.on('message',data=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);if(m.error)p.reject(m.error);else p.resolve(m.result)}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text)});
 const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))});
 const ev=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value};
 try{
  await send('Page.enable');await send('Page.navigate',{url:'about:blank'});await wait(100);await send('Runtime.enable');await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});await send('Page.navigate',{url:preview+'/?hero-nav-check='+Date.now()});
  for(let n=0;n<60;n++){if(await ev('!!document.querySelector("#reminders-demo")'))break;await wait(250)}
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await wait(350);
  const demos=[['capture','Note & Voice'],['planner-demo','Planner'],['vault-map-demo','Vault Map'],['reminders-demo','Reminders']];
  // Emulate browsers without the element Fullscreen API (including iOS versions).
  await ev('window.__nativeFullscreen=HTMLElement.prototype.requestFullscreen;HTMLElement.prototype.requestFullscreen=undefined');
  for(const [id,label] of demos){
    await ev(`document.querySelector('#${id} input[type=range]').parentElement.previousElementSibling.scrollIntoView({behavior:'instant',block:'center'});window.__sameDemo=document.querySelector('#${id} [data-demo-expanded]');window.__sameMedia=window.__sameDemo.querySelector('audio,iframe');document.querySelector('#${id} [aria-label="Expand ${label} demo"]').click()`);await wait(400);
    assert.equal(await ev(`document.querySelector('#${id} [data-demo-expanded]').dataset.demoExpanded`),'true');
    assert.equal(await ev('document.body.style.overflow'),'hidden');
    const fits=()=>ev(`(()=>{const d=window.__sameDemo,r=d.getBoundingClientRect(),viewport=d.querySelector('input[type=range]').parentElement.previousElementSibling,c=viewport.firstElementChild.getBoundingClientRect(),v=viewport.getBoundingClientRect();return r.width<=innerWidth+1&&r.height<=innerHeight+1&&c.left>=v.left-1&&c.right<=v.right+1&&c.top>=v.top-1&&c.bottom<=v.bottom+1})()`);
    assert.equal(await fits(),true,'Portrait expanded canvas fits '+label);
    await send('Emulation.setDeviceMetricsOverride',{width:844,height:390,deviceScaleFactor:1,mobile:true});await wait(450);
    assert.equal(await fits(),true,'Landscape canvas fits '+label);
    const time=()=>ev(`Number(document.querySelector('#${id} input[type=range]').value)`);
    const before=await time();await wait(350);assert.ok((await time())>before,'Expanded demo keeps playing '+label);
    assert.equal(await ev('window.__sameMedia===window.__sameDemo.querySelector("audio,iframe")'),true,'No media remount');
    await ev(`document.querySelector('#${id} [aria-label="Exit expanded ${label} demo"]').click()`);await wait(350);
    assert.equal(await ev(`document.querySelector('#${id} [data-demo-expanded]').dataset.demoExpanded`),'false');
    assert.equal(await ev('document.body.style.overflow'),'');
    assert.equal(await ev(`window.__sameDemo===document.querySelector('#${id} [data-demo-expanded]')`),true,'The demo is preserved on close');
    await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await wait(300);
  }
  await ev(`document.querySelector('[aria-label="Expand Planner demo"]').click()`);await wait(250);
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await wait(250);
  assert.equal(await ev('document.querySelector("#planner-demo [data-demo-expanded]").dataset.demoExpanded'),'false','Escape closes the viewer');
  await ev('HTMLElement.prototype.requestFullscreen=window.__nativeFullscreen');
  if(await ev('!!window.__nativeFullscreen')){
    await ev(`document.querySelector('[aria-label="Expand Planner demo"]').click()`);await wait(450);
    assert.equal(await ev('document.fullscreenElement===document.querySelector("#planner-demo [data-demo-expanded]")'),true,'The supported fullscreen path opens the same demo');
    await ev(`document.querySelector('[aria-label="Exit expanded Planner demo"]').click()`);await wait(350);
    assert.equal(await ev('document.fullscreenElement'),null,'Fullscreen exits cleanly');
  }
  assert.deepEqual(errors,[]);console.log('Passed: all four mobile expand controls; portrait/landscape canvas sizing; native fullscreen and unavailable fallback; preserved media and playback; close/Escape restores scrolling; no browser errors.');
 }finally{socket.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
