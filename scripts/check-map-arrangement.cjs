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
    await seek(96600);
    await evaluate(`document.querySelector('#vault-map-demo iframe').scrollIntoView({behavior:'instant',block:'center'})`);
    const read=()=>frame(`(()=>{const nodes=Array.from(document.querySelectorAll('.react-flow__node')).map(n=>{const m=new DOMMatrix(getComputedStyle(n).transform),r=n.getBoundingClientRect();return {id:n.dataset.id,x:m.m41,y:m.m42,width:r.width,height:r.height,visible:getComputedStyle(n).visibility==='visible'&&getComputedStyle(n).opacity==='1'}});return {nodes,camera:document.querySelector('.react-flow__viewport').style.transform}})()`);
    let baseline=null,previous=null;
    const directions={'saved-note':[0,0],pdf:[-1,1],web:[-1,0],kyoto:[1,-1],tokyo:[1,-1],video:[1,1],design:[-1,1],milestones:[-1,1],'travel-day':[0,0]};
    for(let time=97040;time<=98960;time+=40){
      await evaluate(`document.querySelector('#vault-map-demo iframe').contentWindow.postMessage({type:'nv-map-time',time:${time},reduced:false,active:false},location.origin)`);await pause(45);
      const state=await read();
      if(!baseline){baseline=state;await evaluate(`window.__arrangementCards=new Map(Array.from(document.querySelector('#vault-map-demo iframe').contentDocument.querySelectorAll('.react-flow__node')).map(n=>[n.dataset.id,n]))`)}
      assert.equal(state.camera,baseline.camera,'Camera stays still while cards rearrange');
      for(const card of state.nodes){
        const initial=baseline.nodes.find(n=>n.id===card.id),last=previous?.nodes.find(n=>n.id===card.id);
        assert.ok(initial,'No replacement cards appear mid-arrangement');assert.equal(card.visible,true,'Cards stay visible');
        assert.ok(Math.abs(card.width-initial.width)<1&&Math.abs(card.height-initial.height)<1,'Card dimensions stay measured: '+card.id);
        if(last){const [dx,dy]=directions[card.id];assert.ok(dx?(card.x-last.x)*dx>=-.1:Math.abs(card.x-last.x)<.1,'No horizontal jump backwards: '+card.id);assert.ok(dy?(card.y-last.y)*dy>=-.1:Math.abs(card.y-last.y)<.1,'No vertical jump backwards: '+card.id)}
      }
      assert.equal(await frame('Array.from(document.querySelectorAll(".react-flow__node")).every(n=>parent.__arrangementCards.get(n.dataset.id)===n)'),true,'Card elements remain mounted');
      previous=state;
    }
    await evaluate(`document.querySelector('#vault-map-demo iframe').contentWindow.postMessage({type:'nv-map-time',time:99100,reduced:false,active:false},location.origin)`);await pause(100);
    assert.equal((await read()).camera,baseline.camera,'The settled layout does not snap the camera');
    await seek(106500);assert.equal(await frame('document.querySelectorAll(".react-flow__edge").length'),2,'Connections still join the arranged cards');
    assert.deepEqual(errors,[]);
    console.log('Passed: every arrangement frame preserves visible card sizes and DOM instances; movement never jumps backwards; camera stays fixed through settling; connected layout is intact.');
  }finally{socket.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
