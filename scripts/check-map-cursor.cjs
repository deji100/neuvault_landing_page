/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS browser check. */
// Browser integration checks. Start Next and Chrome with a remote-debugging
// port, then set PREVIEW_URL / CDP_URL if their defaults differ.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createHash} = require('node:crypto');
const manifest = require('../public/desktop-tour/vault-map/source-manifest.json');
assert.equal(manifest.jsxUnchanged,true,'Native JSX is preserved');
for(const [file,expected] of Object.entries(manifest.sources)){const source=path.resolve(__dirname,'../../updv-desktop',file);if(fs.existsSync(source))assert.equal(createHash('sha256').update(fs.readFileSync(source)).digest('hex'),expected,`Native source is current: ${file}`)}
const WebSocket = require('next/dist/compiled/ws');
const preview = process.env.PREVIEW_URL || 'http://127.0.0.1:3001';
const debug = process.env.CDP_URL || 'http://127.0.0.1:9334';
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const targets = await (await fetch(`${debug}/json`)).json();
  const target = targets.find(item => item.type === 'page');
  assert.ok(target, 'Chrome must have an open page');
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise(resolve => socket.once('open', resolve));
  let id = 0;
  const pending = new Map(), errors = [], requests = [];
  socket.on('message', data => {
    const message = JSON.parse(data);
    if (message.id) {
      const promise = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) promise.reject(message.error); else promise.resolve(message.result);
    } else if (message.method === 'Runtime.exceptionThrown') {
      errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    } else if (message.method === 'Network.requestWillBeSent') {
      requests.push(message.params.request.url);
    }
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    pending.set(++id, {resolve, reject});
    socket.send(JSON.stringify({id, method, params}));
  });
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', {expression, awaitPromise: true, returnByValue: true});
    if (result.exceptionDetails) throw Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  };
  const frame = expression => evaluate(`(()=>{const document=window.document.querySelector('#vault-map-demo iframe').contentDocument;return (${expression})})()`);
  const seek = async time => {
    await evaluate(`(()=>{const input=document.querySelector('#vault-map-demo input[type=range]');const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;set.call(input,${time}===0?100:0);input.dispatchEvent(new Event('input',{bubbles:true}));set.call(input,${time});input.dispatchEvent(new Event('input',{bubbles:true}));})()`);
    for(let attempt=0;attempt<40;attempt++){
      if(await frame('Number(document.querySelector("[data-tour-time]")?.getAttribute("data-tour-time"))')===time)break;
      await pause(100);
    }
    await pause(500);
    assert.equal(await frame('Number(document.querySelector("[data-tour-time]")?.getAttribute("data-tour-time"))'),time,'Frame follows the parent clock');
    assert.equal(await evaluate('Number(document.querySelector("#vault-map-demo input[type=range]").value)'), time);
  };
  try {
    await send('Page.enable');
    await send('Page.navigate',{url:'about:blank'});await pause(100);await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {width:1440,height:1000,deviceScaleFactor:1,mobile:false});
    await send('Emulation.setEmulatedMedia', {features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
    await send('Page.navigate', {url:`${preview}/?vault-map-check=${Date.now()}#vault-map-demo`});
    await send('Runtime.enable');
    for (let attempt=0;attempt<60;attempt++) {
      if (await evaluate('!!document.querySelector("#vault-map-demo input[type=range]")')) break;
      await pause(500);
    }
    await evaluate(`document.querySelector('#vault-map-demo').scrollIntoView({behavior:'instant'});document.querySelector('[aria-label="Pause Vault Map tour"]')?.click()`);
    for (let attempt=0;attempt<40;attempt++) {
      if (await frame('!!document.querySelector(".react-flow__node")')) break;
      await pause(250);
    }
    // The iframe can render from SSR before the parent page hydrates. Wait
    // until a real playback click changes its React state before sending input.
    for(let attempt=0;attempt<30;attempt++){
      await evaluate(`document.querySelector('[aria-label="Pause Vault Map tour"]')?.click()`);
      await pause(150);
      if(await evaluate(`!!document.querySelector('[aria-label="Play Vault Map tour"]')`))break;
    }
    assert.equal(await evaluate(`!!document.querySelector('[aria-label="Play Vault Map tour"]')`),true,'Playback is hydrated and paused');
    await send('Network.enable');
    assert.equal(await evaluate(`getComputedStyle(document.querySelector('#vault-map-demo iframe')).pointerEvents`),'none','Demo content cannot be manipulated');
    assert.equal(await evaluate(`document.querySelector('#vault-map-demo iframe').tabIndex`),-1);
    const actions=[
      [5000,'Edit note'],[6500,'Edit here in the map'],
      [20500,'Add tools'],[21500,'Upload files'],[24000,'Save without AI'],
      [32300,'Add tools'],[32800,'YouTube link'],[38400,'Save to Inbox'],
      [46300,'Add tools'],[46800,'Webpage bookmark'],[50900,'Save to Inbox'],
      [60300,'Add tools'],[61100,'Note'],[86400,'Add tools'],[87200,'Sticky note'],
      [109200,'Split view'],[175500,'Save as Vault Map file'],[183000,'Export'],
    ];
    for(const [time,label] of actions){
      await seek(time-100);
      assert.equal(await frame('!!document.querySelector(".nv-map-tour-cursor > span")'),false,'No click pulse while the arrow is still approaching '+label);
      for(const at of [time,time+100]){
        await seek(at);
        const hit=await frame(`(()=>{const c=document.querySelector('.nv-map-tour-cursor'),r=c.getBoundingClientRect(),hit=document.elementFromPoint(r.left+4,r.top+4),b=hit?.closest('button');return {label:b?.getAttribute('aria-label')||b?.textContent.trim(),pulse:!!c.querySelector('span')}})()`);
        assert.equal(hit.label,label,'The arrow lands on '+label+' at '+at);
        assert.equal(hit.pulse,true,'The click pulse starts after arrival on '+label);
      }
    }
    // Check the menu transitions during continuous playback as well as seeking.
    await evaluate(`document.querySelector('#vault-map-demo iframe').scrollIntoView({behavior:'instant',block:'center'})`);
    for(const [start,click,label] of [[19500,21500,'Upload files'],[45500,46800,'Webpage bookmark'],[59500,61100,'Note']]){
      await seek(start);
      await evaluate(`document.querySelector('[aria-label="Play Vault Map tour"]').click()`);
      let landed=false;
      for(let attempt=0;attempt<150;attempt++){
        const state=await frame(`(()=>{const time=Number(document.querySelector('[data-tour-time]').dataset.tourTime),c=document.querySelector('.nv-map-tour-cursor'),r=c.getBoundingClientRect(),b=document.elementFromPoint(r.left+4,r.top+4)?.closest('button');return {time,label:b?.getAttribute('aria-label')||b?.textContent.trim(),pulse:!!c.querySelector('span')}})()`);
        if(state.time>=click&&state.pulse){assert.equal(state.label,label,'Continuous playback clicks '+label);landed=true;break}
        if(state.time>click+200)break;
        await pause(20);
      }
      await evaluate(`document.querySelector('[aria-label="Pause Vault Map tour"]')?.click()`);
      assert.equal(landed,true,'Observed the live click for '+label);
    }
    assert.deepEqual(errors,[]);
    console.log('Passed: edit chooser, every Add option, upload/link dialogs, split/export menus; exact pointer hit targets; no premature click pulses; continuous menu playback.');
  }finally{socket.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
