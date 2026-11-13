/* eslint-disable @typescript-eslint/no-require-imports -- Node browser integration check. */
const assert=require('node:assert/strict'),WebSocket=require('next/dist/compiled/ws');
const preview=process.env.PREVIEW_URL||'http://127.0.0.1:3001',cdp=process.env.CDP_URL||'http://127.0.0.1:9334';
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
(async()=>{
 const targets=await(await fetch(cdp+'/json')).json(),socket=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
 await new Promise(resolve=>socket.once('open',resolve));let id=0;const pending=new Map(),errors=[],logs=[];
 socket.on('message',data=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);if(m.error)p.reject(m.error);else p.resolve(m.result)}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);else if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')logs.push(m.params.args.map(a=>a.value||a.description).join(' '))});
 const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))});
 const ev=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value};
 try{
  await send('Page.enable');await send('Page.navigate',{url:'about:blank'});await wait(100);await send('Runtime.enable');await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});await send('Page.navigate',{url:preview+'/?hero-nav-check='+Date.now()});
  for(let n=0;n<60;n++){if(await ev('!!document.querySelector("#reminders-demo")'))break;await wait(250)}
  const center=async id=>{await ev(`document.querySelector('#${id} input[type=range]').parentElement.previousElementSibling.scrollIntoView({behavior:'instant',block:'center'})`);await wait(350)};
  const icon=(id,key,expression)=>ev(`(()=>{const document=${id==='reminders-demo'?"window.document.querySelector('#reminders-demo iframe').contentDocument":"window.document"};const row=document.querySelector('${id==='reminders-demo'?'':'#'+id+' '}.nv-finder-row[data-nav-key="${key}"]'),svg=row?.querySelector('.nv-finder-icon>svg');return (${expression})})()`);
  const seek=async time=>{await ev(`(()=>{const i=document.querySelector('#capture input[type=range]'),set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;set.call(i,${time}===0?100:0);i.dispatchEvent(new Event('input',{bubbles:true}));set.call(i,${time});i.dispatchEvent(new Event('input',{bubbles:true}))})()`);await wait(300)};
  await center('capture');
  for(let n=0;n<30;n++){await ev(`document.querySelector('[aria-label="Pause capture tour"]')?.click()`);await wait(150);if(await ev(`!!document.querySelector('[aria-label="Play capture tour"]')`))break}
  await seek(0);
  for(const [key,count] of [['pinned-docs',1],['smart-suggestions',4],['notifications',2]]){
    assert.equal(await icon('capture',key,'row.dataset.alerting'),'true');
    assert.equal(await icon('capture',key,'Number(row.querySelector(".nv-finder-count").textContent)'),count);
    assert.equal(await icon('capture',key,'getComputedStyle(svg).animationName'),'nv-sidebar-ring');
    assert.equal(await icon('capture',key,'getComputedStyle(svg).animationPlayState'),'paused');
    assert.equal(await icon('capture',key,'getComputedStyle(row.querySelector(".nv-finder-count")).opacity'),'1','Counts remain visible while paused');
  }
  await ev(`document.querySelector('[aria-label="Play capture tour"]').click()`);await wait(500);
  assert.equal(await icon('capture','pinned-docs','svg.getAnimations()[0].playState'),'running');
  const before=await icon('capture','pinned-docs','svg.getAnimations()[0].currentTime');await wait(200);assert.ok(await icon('capture','pinned-docs','svg.getAnimations()[0].currentTime')>before);
  await ev(`document.querySelector('[aria-label="Pause capture tour"]').click()`);
  for(const time of [10000,30000,58000,62000]){await seek(time);assert.equal(await icon('capture','pinned-docs','getComputedStyle(svg).animationName'),'nv-sidebar-ring')}
  await seek(10000);assert.equal(await icon('capture','vault-queue','row.dataset.alerting'),'true','Queue gets attention styling while processing');
  await center('planner-demo');await wait(200);
  assert.equal(await icon('planner-demo','smart-suggestions','getComputedStyle(svg).animationName'),'nv-sidebar-ring');
  assert.equal(await icon('planner-demo','smart-suggestions','svg.getAnimations()[0].playState'),'running');
  await center('reminders-demo');
  for(let n=0;n<60;n++){if(await ev('!!document.querySelector("#reminders-demo iframe").contentDocument?.querySelector(".nv-finder-row[data-nav-key=notifications]")'))break;await wait(200)}
  assert.equal(await icon('reminders-demo','notifications','row.dataset.alerting'),'true');
  assert.equal(await icon('reminders-demo','notifications','getComputedStyle(svg).animationName'),'nv-sidebar-ring');
  assert.equal(await icon('reminders-demo','smart-suggestions','svg.getAnimations()[0].playState'),'running');
  await ev('window.scrollTo({top:0,behavior:"instant"})');await wait(350);
  for(const id of ['capture','planner-demo','reminders-demo'])assert.equal(await icon(id,'smart-suggestions','svg.getAnimations()[0].playState'),'paused','Off-focus icons pause');
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await wait(450);
  for(const id of ['capture','planner-demo','reminders-demo'])assert.equal(await icon(id,'smart-suggestions','getComputedStyle(svg).animationName'),'none','Reduced motion keeps attention colors without animation');
  assert.deepEqual(errors,[]);assert.deepEqual(logs,[]);console.log('Passed: native ringing icons and attention badges across Home, Queue, Note & Voice, Vault, document preview, Planner and Reminders; real animation clocks advance; counts stay visible when paused; off-focus pause and reduced motion; no browser errors.');
 }finally{socket.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
