// Requires a local Next preview and Chrome's remote-debugging endpoint.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const WebSocket = require('next/dist/compiled/ws');
const preview = process.env.PREVIEW_URL || 'http://127.0.0.1:3107';
const cdp = process.env.CDP_URL || 'http://127.0.0.1:9334';
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
  const targets = await (await fetch(`${cdp}/json`)).json();
  const socket = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
  await new Promise(resolve => socket.once('open', resolve));
  let id = 0;
  const pending = new Map(), errors = [], requests = [];
  socket.on('message', data => {
    const message = JSON.parse(data);
    if (message.id) {
      const call = pending.get(message.id); pending.delete(message.id);
      if (message.error) call.reject(message.error); else call.resolve(message.result);
    } else if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    else if (message.method === 'Network.requestWillBeSent') requests.push(message.params.request.url);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => { pending.set(++id, {resolve, reject}); socket.send(JSON.stringify({id, method, params})); });
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', {expression, awaitPromise:true, returnByValue:true});
    if (result.exceptionDetails) throw Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  };
  const query = selector => `document.querySelector(${JSON.stringify(`#planner-demo ${selector}`)})`;
  const seek = async time => {
    await evaluate(`(()=>{const i=${query('input[type=range]')},set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;set.call(i,${time}===0?100:0);i.dispatchEvent(new Event('input',{bubbles:true}));set.call(i,${time});i.dispatchEvent(new Event('input',{bubbles:true}));})()`);
    await pause(200);
    assert.equal(await evaluate(`Number(${query('input[type=range]')}.value)`),time);
  };
  const itemText = item => evaluate(`${query(`[data-planner-item="${item}"]`)}?.textContent`);
  const itemStage = item => evaluate(`${query(`[data-planner-item="${item}"]`)}?.closest('[data-board-stage]')?.dataset.boardStage`);
  const count = selector => evaluate(`document.querySelectorAll(${JSON.stringify(`#planner-demo ${selector}`)}).length`);
  const screenshot = async name => { if (!process.env.SCREENSHOT_DIR) return; const result = await send('Page.captureScreenshot',{format:'png'}); fs.writeFileSync(`${process.env.SCREENSHOT_DIR}/${name}.png`,Buffer.from(result.data,'base64')); };
  try {
    await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
    await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1100,deviceScaleFactor:1,mobile:false});
    await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
    await send('Page.navigate',{url:`${preview}/?planner-check=${Date.now()}#planner-demo`});
    for(let n=0;n<60;n++){if(await evaluate(`!!${query('input[type=range]')}`))break;await pause(250)}
    await evaluate(`${query('')}.scrollIntoView({behavior:'instant',block:'start'})`);
    for(let n=0;n<40;n++){await evaluate(`${query('[aria-label="Pause Planner tour"]')}?.click()`);await pause(150);if(await evaluate(`!!${query('[aria-label="Play Planner tour"]')}`))break}
    assert.equal(await evaluate(`!!${query('[aria-label="Play Planner tour"]')}`),true,'Tour is hydrated and paused');
    await seek(17000);
    assert.equal(await count('div[class*="dragCard"]'),0,'The drag begins close to the move rather than floating slowly for seconds');
    await seek(18500);assert.equal(await count('div[class*="dragCard"]'),1);
    const early=await evaluate(`parseFloat(${query('div[class*="dragCard"]')}.style.left)`);
    await seek(18900);
    const late=await evaluate(`parseFloat(${query('div[class*="dragCard"]')}.style.left)`);
    assert.ok(Math.abs(late-early)>20,'The card travels promptly across the calendar');
    await seek(19000);assert.equal(await count('div[class*="dragCard"]'),0);assert.match(await itemText('review'),/Review API architecture/);
    await seek(59000);
    assert.equal(await count('.nv-planner-nova__proposal.is-pending'),4);
    assert.match(await evaluate(`${query('[data-planner-target="nova-confirm-all"]')}.textContent`),/Confirm all 4/);
    assert.equal(await count('[data-planner-item^="nova-"]'),0,'No proposed item exists before confirmation');
    assert.match(await itemText('staging'),/Nov 13.*3:00 PM/);
    await screenshot('planner-four-proposals');
    // One real batch confirmation starts the clock; no item-by-item clicks.
    await evaluate(`${query('[data-planner-target="nova-confirm-all"]')}.click()`);
    await pause(1050);
    assert.equal(await evaluate(`!!${query('[aria-label="Pause Planner tour"]')}`),true,'Confirm all continues the automated sequence');
    assert.ok(await count('[data-planner-item="nova-tests"]'));
    await evaluate(`${query('[aria-label="Pause Planner tour"]')}.click()`);
    for(const [time,created] of [[62500,0],[63100,1],[63900,2],[64700,3],[66000,3]]){
      await seek(time);assert.equal(await count('[data-planner-item^="nova-"]'),created);
      assert.equal(await count('.nv-planner-nova__proposal.is-applied'),time>=65200?4:created);
      if(time<65200)assert.match(await itemText('staging'),/Nov 13/);else assert.match(await itemText('staging'),/Nov 16.*10:00 AM/);
    }
    await seek(68500);
    assert.equal(await count('[data-nova-batch]'),0);
    assert.equal(await evaluate(`${query('[data-planner-item="nova-readiness"]')}.dataset.kind`),'event');
    assert.match(await itemText('nova-readiness'),/4:00 PM – 4:30 PM/);
    assert.equal(await itemStage('review'),'done','The original completed task stays intact');
    await screenshot('planner-batch-created');
    await seek(85000);
    assert.equal(await count('.nv-planner-nova__proposal.is-pending'),3);
    assert.equal(await itemStage('nova-tests'),'open');assert.equal(await itemStage('nova-logs'),'open');assert.equal(await itemStage('tests'),'open');
    assert.match(await evaluate(`${query('[data-planner-target="nova-confirm-all"]')}.textContent`),/Confirm all 3/);
    await screenshot('planner-three-proposals');
    for(const [time,done] of [[89500,0],[90100,1],[90900,2],[92000,3]]){
      await seek(time);assert.equal(await count('.nv-planner-nova__proposal.is-applied'),done);
      assert.equal(await itemStage('nova-tests'),done>=1?'doing':'open');
      assert.equal(await itemStage('nova-logs'),done>=2?'doing':'open');
      assert.equal(await itemStage('tests'),done>=3?'done':'open');
    }
    await seek(95000);
    assert.equal(await count('[data-board-stage="doing"] [data-planner-item]'),2);
    assert.equal(await itemStage('tests'),'done');assert.equal(await itemStage('review'),'done');
    assert.match(await itemText('review'),/2/,'Original attachments are preserved');
    await screenshot('planner-batch-progress');
    await seek(103000);
    assert.equal(await evaluate(`${query('[data-planner-view]')}.dataset.plannerView`),'month');
    assert.equal(await count('.nv-planner-month__day:not(.is-outside) .nv-planner-month__chip'),6);
    assert.equal(await evaluate(`(()=>{const days=[...document.querySelectorAll('#planner-demo .nv-planner-month__day:not(.is-outside)')];return days.find(d=>d.querySelector('.nv-planner-month__date').textContent==='16').textContent.includes('Deploy the API to staging')})()`),true);
    await screenshot('planner-calendar-results');
    await seek(59000);assert.equal(await count('[data-planner-item^="nova-"]'),0);assert.match(await itemText('staging'),/Nov 13/);
    await seek(85000);assert.equal(await itemStage('nova-tests'),'open');assert.equal(await itemStage('tests'),'open');
    await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
    await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await pause(400);
    assert.equal(await evaluate('document.documentElement.scrollWidth'),390);
    assert.equal(await evaluate(`Number(${query('input[type=range]')}.value)`),106000);
    assert.equal(await evaluate(`!!${query('[aria-label="Pause Planner tour"]')}`),false);
    assert.equal(await evaluate(`${query('[data-planner-view]')}.dataset.plannerView`),'month');
    assert.equal(requests.some(url=>url.startsWith(preview)&&/\/(?:api|v1|v2)\//.test(url)),false,'Demo does not call real APIs');
    assert.deepEqual(errors,[],'No browser exceptions');
    console.log('Passed: four mixed proposals from one request; one confirmation starts automatic application; no changes before confirmation; two tasks and one event created; existing deployment rescheduled; second batch moves two tasks and completes a third; final board and calendar agree; source connections preserved; reversible seeking; mobile and reduced motion; no real API calls or browser exceptions.');
  } finally { socket.close(); }
})().catch(error=>{console.error(error);process.exitCode=1});
