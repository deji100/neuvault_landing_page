// Integration checks for the bundled native desktop Reminders UI.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto'),WebSocket=require('next/dist/compiled/ws');
const manifest=require('../public/desktop-tour/reminders/source-manifest.json');
assert.equal(manifest.jsxUnchanged,true);
for(const [file,hash] of Object.entries(manifest.sources))assert.equal(createHash('sha256').update(fs.readFileSync(path.resolve(__dirname,'../../updv-desktop',file))).digest('hex'),hash);
const preview=process.env.PREVIEW_URL||'http://127.0.0.1:3001',cdp=process.env.CDP_URL||'http://127.0.0.1:9334',wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const targets=await(await fetch(cdp+'/json')).json(),socket=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>socket.once('open',r));let id=0;const pending=new Map(),errors=[],logs=[];
 socket.on('message',data=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);else if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')logs.push(m.params.args.map(a=>a.value||a.description).join(' '))});
 const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))});
 const ev=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value};
 const frame=expression=>ev('(()=>{const document=window.document.querySelector("#reminders-demo iframe").contentDocument;return ('+expression+')})()');
 const seek=async time=>{await ev('(()=>{const i=document.querySelector("#reminders-demo input[type=range]"),s=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value").set;s.call(i,100);i.dispatchEvent(new Event("input",{bubbles:true}));s.call(i,'+time+');i.dispatchEvent(new Event("input",{bubbles:true}))})()');await wait(650)};
 const shot=async name=>{if(!process.env.SCREENSHOT_DIR)return;const r=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(process.env.SCREENSHOT_DIR,name+'.png'),Buffer.from(r.data,'base64'))};
 try{await send('Page.enable');await send('Page.navigate',{url:'about:blank'});await wait(150);await send('Runtime.enable');await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1100,deviceScaleFactor:1,mobile:false});await send('Emulation.setTimezoneOverride',{timezoneId:'Africa/Lagos'});await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});await send('Page.navigate',{url:preview+'/?reminders-check='+Date.now()+'#reminders-demo'});
  for(let n=0;n<80;n++){if(await ev('!!document.querySelector("#reminders-demo input[type=range]")'))break;await wait(250)}
  for(let n=0;n<60;n++){if(await frame('!!document.querySelector(".attention-v2-reminder")'))break;await wait(250)}
  await ev(`document.querySelector('#reminders-demo').scrollIntoView({behavior:'instant'});document.querySelector('[aria-label="Pause Reminders tour"]')?.click()`);await wait(200);
  await ev('document.querySelector("#reminders-demo iframe").scrollIntoView({behavior:"instant",block:"center"})');
  if(errors.length||logs.length)console.log('Initial browser diagnostics:',JSON.stringify({errors,logs}));
  for(const time of [0,4500,10000,14500,16500,17700,18300,20500,22500,24500,25500,26500,28500,30500,33000,35700,38000,0]){
   await seek(time);
   if(errors.length)throw Error(errors.join('\n'));
   assert.equal(await frame('Number(document.querySelector("[data-reminder-time]")?.dataset.reminderTime)'),time);
   if(time===0){assert.equal(await frame('document.querySelectorAll(".attention-v2-reminder").length'),4);assert.equal(await frame('document.querySelectorAll(".desktop-ai-badge").length'),2);assert.match(await frame('document.body.textContent'),/Passport renewal/);await shot('reminders-overview')}
   if(time===4500)assert.match(await frame('document.querySelector(".desktop-smartdoc-identity-card").textContent'),/Studio lease/);
   if(time===10000){assert.ok(await frame('!!document.querySelector("[data-tour-id=document-reminder-panel]")'));assert.equal(await frame('document.querySelector("input[type=date]").value'),'2026-11-20');assert.ok(await frame('Array.from(document.querySelectorAll(".desktop-resurface-pill")).some(b=>b.textContent.trim()==="yearly"&&b.dataset.active==="true")'));await shot('reminders-existing-manual')}
   if(time===14500){
    assert.equal(await frame('document.querySelectorAll(".desktop-vault-subgroup-document-grid .desktop-vault-gallery-document-card").length'),3);
    assert.equal(await frame('document.querySelectorAll(".reminder-demo-documents .desktop-vault-card-play").length'),0,'PDF cards do not show video controls');
    const cards=await frame('Array.from(document.querySelectorAll(".reminder-demo-documents article")).map(card=>{const a=card.querySelector(".desktop-vault-card-artwork"),image=a.querySelector("img"),title=card.querySelector(".desktop-linked-card-title"),c=card.getBoundingClientRect(),i=image.getBoundingClientRect(),t=title.getBoundingClientRect();return {title:title.textContent,artWidth:i.width,artHeight:i.height,titleVisible:t.height>0&&t.top>=c.top&&t.bottom<=c.bottom}})');
    assert.ok(cards.every(card=>card.artWidth<=84&&card.artHeight<=84&&card.titleVisible),'Native icon sizes and document titles fit within each card');
    assert.match(cards.map(card=>card.title).join(' '),/Japan travel bookings/);
    await shot('reminders-native-document-cards');
   }
   if(time===16500)assert.match(await frame('document.querySelector("[data-tour-id=smartdoc-reminders-button]").textContent'),/Not scheduled|No reminder|Not set|None/);
   if(time===17700)assert.equal(await frame('document.querySelector("input[type=date]").value'),'');
   if(time===18300)assert.ok(await frame('Array.from(document.querySelectorAll(".desktop-resurface-pill")).some(b=>b.textContent.trim()==="high"&&b.dataset.active==="true")'));
   if(time===20500)assert.ok(await frame('document.querySelector(".desktop-resurface-reason").value.length>30'));
   if(time===22500)assert.equal(await frame('document.querySelector("input[type=date]").value'),'2026-11-19');
   if(time===24500)assert.equal(await frame('document.querySelector("input[type=time]").value'),'15:30');
   if(time===26500){assert.match(await frame('document.querySelector(".desktop-resurface-save-status").textContent'),/Reminder set/);assert.equal(await frame('document.querySelectorAll(".desktop-resurface-pill[data-active=true]")[1]?.textContent.trim()'),'None','Custom dates keep the native one-off schedule');await shot('reminders-setup-saved')}
   if(time===30500||time===33000){assert.equal(await frame('document.querySelectorAll(".attention-v2-reminder").length'),5);assert.ok(await frame('Array.from(document.querySelectorAll(".attention-v2-reminder")).some(r=>r.textContent.includes("Japan travel bookings")&&!r.querySelector(".desktop-ai-badge"))'));await shot('reminders-new-entry')}
   if(time===35700||time===38000){assert.equal(await frame('document.querySelectorAll(".attention-v2-reminder").length'),4);assert.doesNotMatch(await frame('document.querySelector(".attention-v2-body").textContent'),/Pay the studio invoice/)}
  }
  await seek(16800);await ev(`document.querySelector('[aria-label="Play Reminders tour"]').click()`);
  for(let n=0;n<65;n++){if(await frame('Number(document.querySelector("[data-reminder-time]").dataset.reminderTime)')>=26500)break;await wait(200)}
  await ev(`document.querySelector('[aria-label="Pause Reminders tour"]')?.click()`);
  assert.equal(await frame('document.querySelector("input[type=date]").value'),'2026-11-19','Live playback sets the custom date');
  assert.equal(await frame('document.querySelector("input[type=time]").value'),'15:30','Live playback sets the custom time');
  assert.match(await frame('document.querySelector(".desktop-resurface-save-status").textContent'),/Reminder set/);
  assert.equal(await ev('document.querySelector("#reminders-demo iframe").tabIndex'),-1);assert.equal(await ev('getComputedStyle(document.querySelector("#reminders-demo iframe")).pointerEvents'),'none');
  await seek(32000);await ev(`document.querySelector('[aria-label="Play Reminders tour"]').click()`);await wait(350);const before=await ev('Number(document.querySelector("#reminders-demo input[type=range]").value)');assert.ok(before>32000);
  await ev('window.scrollTo({top:0,behavior:"instant"})');await wait(350);const stopped=await ev('Number(document.querySelector("#reminders-demo input[type=range]").value)');await wait(300);assert.equal(await ev('Number(document.querySelector("#reminders-demo input[type=range]").value)'),stopped);
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await wait(800);assert.equal(await ev('document.documentElement.scrollWidth'),390);assert.equal(await frame('!!document.querySelector(".reminder-demo-cursor")'),false);assert.equal(await frame('document.querySelectorAll(".attention-v2-reminder").length'),4);
  assert.deepEqual(errors,[]);assert.deepEqual(logs,[]);console.log('Passed: unchanged native desktop UI; AI and manual reminders; source details; existing manual schedule; existing yearly reminder; new reminder importance/reason/date/time and native one-off semantics; automatic saved state; new entry without AI badge; mark done; replay; playback/offscreen pause; mobile/reduced motion; no browser errors.');
 }finally{if(errors.length||logs.length)console.log('Browser diagnostics:',JSON.stringify({errors,logs}));socket.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
