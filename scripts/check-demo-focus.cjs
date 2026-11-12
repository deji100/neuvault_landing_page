const assert=require('node:assert/strict'),WebSocket=require('next/dist/compiled/ws');
const preview=process.env.PREVIEW_URL||'http://127.0.0.1:3001',cdp=process.env.CDP_URL||'http://127.0.0.1:9334';
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
(async()=>{
 const targets=await(await fetch(cdp+'/json')).json(),socket=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
 await new Promise(resolve=>socket.once('open',resolve));let id=0;const pending=new Map(),errors=[];
 socket.on('message',data=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text)});
 const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))});
 const ev=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value};
 try{
  await send('Page.enable');await send('Page.navigate',{url:'about:blank'});await wait(100);await send('Runtime.enable');await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});await send('Page.navigate',{url:preview+'/?hero-nav-check='+Date.now()});
  for(let n=0;n<60;n++){if(await ev('!!document.querySelector("#reminders-demo")'))break;await wait(250)}
  const ids=['capture','planner-demo','vault-map-demo','reminders-demo'];
  const clocks=()=>ev('Array.from(document.querySelectorAll("#capture input[type=range],#planner-demo input[type=range],#vault-map-demo input[type=range],#reminders-demo input[type=range]")).map(i=>Number(i.value))');
  const nav=()=>ev('({hidden:document.querySelector("nav").getAttribute("data-demo-focused"),inert:document.querySelector("nav").inert,visibility:getComputedStyle(document.querySelector("nav")).visibility})');
  const center=async id=>{await ev(`document.querySelector('#${id} input[type=range]').parentElement.previousElementSibling.scrollIntoView({behavior:'instant',block:'center'})`);await wait(350)};
  await ev('window.scrollTo({top:0,behavior:"instant"})');await wait(700);
  assert.deepEqual(await clocks(),[0,0,0,0],'No demo starts at the hero');assert.equal((await nav()).hidden,'false');
  for(const [index,id] of ids.entries()){
   // Showing just the edge of a canvas must not start it.
   await ev(`(()=>{const v=document.querySelector('#${id} input[type=range]').parentElement.previousElementSibling;window.scrollTo({top:scrollY+v.getBoundingClientRect().top-innerHeight+60,behavior:'instant'})})()`);await wait(350);
   const edge=await clocks();await wait(350);assert.deepEqual(await clocks(),edge,'Canvas slivers stay paused');assert.equal((await nav()).hidden,'false');
   await center(id);const before=await clocks();await wait(650);const after=await clocks();
   assert.ok(after[index]>before[index],id+' plays in focus');
   after.forEach((time,i)=>{if(i!==index)assert.equal(time,before[i],'Other demos stay paused')});
   assert.deepEqual(await nav(),{hidden:'true',inert:true,visibility:'hidden'});
   await ev('window.scrollTo({top:0,behavior:"instant"})');await wait(350);const paused=await clocks();await wait(350);assert.deepEqual(await clocks(),paused,id+' pauses out of focus');assert.equal((await nav()).visibility,'visible');
   await center(id);const resume=await clocks();await wait(350);assert.ok((await clocks())[index]>resume[index],id+' resumes');
  }
  await center('capture');
  await ev(`(()=>{const i=document.querySelector('#capture input[type=range]'),set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;set.call(i,30000);i.dispatchEvent(new Event('input',{bubbles:true}))})()`);await wait(250);
  await ev(`document.querySelector('[aria-label="Play capture tour"]')?.click()`);await wait(650);
  assert.equal(await ev('document.querySelector("#capture audio").paused'),false,'Audio plays with the focused demo');
  await center('planner-demo');await wait(300);assert.equal(await ev('document.querySelector("#capture audio").paused'),true,'Audio pauses when another demo takes focus');
  await center('capture');await wait(300);assert.equal(await ev('document.querySelector("#capture audio").paused'),false,'Audio resumes with the focused demo');
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await wait(400);
  await center('planner-demo');assert.equal((await nav()).hidden,'true');const mobile=await clocks();await wait(350);assert.ok((await clocks())[1]>mobile[1]);
  await ev('window.scrollTo({top:0,behavior:"instant"})');await wait(350);assert.equal((await nav()).hidden,'false');
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await center('reminders-demo');const reduced=await clocks();await wait(350);assert.deepEqual(await clocks(),reduced,'Reduced motion stays paused');assert.equal((await nav()).visibility,'hidden');
  assert.deepEqual(errors,[]);console.log('Passed: all four demos wait for canvas focus, only one plays, off-focus pause/resume including transcription audio, navbar hides and restores without layout shifts, mobile and reduced motion, no browser errors.');
 }finally{socket.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
