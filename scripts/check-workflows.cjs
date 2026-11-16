// Run against a local production preview and an isolated Chrome debugging profile.
// Google endpoints are intercepted: this check never sends test traffic to GA4.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const WebSocket = require('next/dist/compiled/ws');
const preview = process.env.PREVIEW_URL || 'http://127.0.0.1:3126';
const cdp = process.env.CDP_URL || 'http://127.0.0.1:9346';
const gaEnabled = process.env.EXPECT_GA === 'on';
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const cases = ['study-smarter', 'organize-research', 'manage-work', 'develop-ideas', 'organize-my-life', 'build-projects', 'run-a-business', 'keep-learning'];

(async () => {
  const targets = await (await fetch(`${cdp}/json`)).json();
  const target = targets.find(item => item.type === 'page');
  assert.ok(target, 'Isolated Chrome must have a page');
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise(resolve => socket.once('open', resolve));
  let id = 0;
  const pending = new Map(), errors = [], googleRequests = [];
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(Error(`CDP timeout: ${method}`)), 15000);
    pending.set(++id, { resolve: value => { clearTimeout(timeout); resolve(value); }, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
  socket.on('message', async data => {
    const message = JSON.parse(data);
    if (message.id) {
      const call = pending.get(message.id); pending.delete(message.id);
      if (call) message.error ? call.reject(message.error) : call.resolve(message.result);
    } else if (message.method === 'Runtime.exceptionThrown') {
      errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    } else if (message.method === 'Fetch.requestPaused') {
      const { requestId, request } = message.params;
      googleRequests.push(request.url);
      const body = request.url.includes('/gtag/js') ? 'window.__gaScriptLoads=(window.__gaScriptLoads||0)+1;' : '';
      await send('Fetch.fulfillRequest', { requestId, responseCode: 200, responseHeaders: [{ name: 'Content-Type', value: 'application/javascript' }], body: Buffer.from(body).toString('base64') });
    }
  });
  const ev = async expression => {
    const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true, userGesture: true });
    if (result.exceptionDetails) throw Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  };
  const until = async (expression, message) => {
    for (let n = 0; n < 60; n++) { if (await ev(expression)) return; await wait(100); }
    throw Error(message || `Timed out: ${expression}`);
  };
  const navigate = async path => {
    await send('Page.navigate', { url: preview + path });
    await until(`location.pathname === ${JSON.stringify(path.split('?')[0].split('#')[0])} && document.readyState === 'complete'`, 'Page loaded: ' + path);
    await wait(250);
  };
  const click = async selector => {
    await ev(`document.querySelector(${JSON.stringify(selector)}).focus();document.querySelector(${JSON.stringify(selector)}).click()`);
    await wait(100);
  };
  const events = name => ev(`window.__marketing.filter(item=>item.event===${JSON.stringify(name)})`);
  const gaEvents = name => ev(`(window.dataLayer||[]).map(item=>Array.from(item)).filter(item=>item[0]==='event'&&item[1]===${JSON.stringify(name)})`);
  const screenshot = async name => {
    if (!process.env.SCREENSHOT_DIR) return;
    const result = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${process.env.SCREENSHOT_DIR}/${name}.png`, Buffer.from(result.data, 'base64'));
  };
  try {
    await send('Page.enable'); await send('Runtime.enable');
    await send('Fetch.enable', { patterns: [{ urlPattern: '*googletagmanager.com/*' }, { urlPattern: '*google-analytics.com/*' }] });
    await send('Page.addScriptToEvaluateOnNewDocument', { source: `
      window.__marketing=[];
      window.addEventListener('neuvault:marketing',e=>window.__marketing.push(e.detail));
      window.addEventListener('click',e=>{const a=e.target.closest?.('a');if(a&&/apps.apple.com|play.google.com|apps.microsoft.com/.test(a.href))e.preventDefault()});
    ` });
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
    await navigate('/');
    await ev(`localStorage.removeItem('neuvault-analytics-consent-v1')`);
    googleRequests.length = 0;
    await navigate('/?email=never-send@example.test#source-to-action');
    assert.equal(await ev(`document.querySelectorAll('[aria-label="Choose a workflow"] button').length`), 6);
    for (const demo of ['capture', 'planner-demo', 'vault-map-demo', 'reminders-demo']) {
      assert.equal(await ev(`document.querySelectorAll('#${demo}').length`), 1, 'Original live demo preserved: ' + demo);
      assert.equal(await ev(`!!document.querySelector('#${demo} input[type="range"]')`), true);
    }
    assert.equal(await ev(`document.querySelectorAll('#workflow-journey [aria-roledescription="carousel"]').length`), 1, 'Illustrated carousel is visible immediately');
    assert.equal(googleRequests.length, 0, 'No Google requests before consent');
    assert.equal((await events('workflow_step_viewed')).length, 0, 'No step interaction on mount');
    await click('[aria-label="Choose a workflow"] button');
    assert.equal(await ev(`document.querySelector('#workflow-journey').hidden`), false);
    assert.equal((await events('workflow_step_viewed')).length, 0, 'Opening example is not a step-control interaction');
    if (gaEnabled) {
      await until(`!!document.querySelector('[data-analytics-consent]')`);
      await click('[data-analytics-consent] button:first-child');
      await click('#workflow-journey li:nth-child(2) button');
      assert.equal(googleRequests.length, 0, 'Rejecting consent blocks tag and events');
      await ev(`window.dispatchEvent(new Event('neuvault:analytics-preferences'))`);
      await click('[data-analytics-consent] button:nth-child(2)');
      await until(`window.__gaScriptLoads===1`, 'Google tag loads once after consent');
      assert.equal((await gaEvents('page_view')).length, 1);
      assert.equal((await gaEvents('workflow_step_viewed')).length, 0, 'No replay of pre-consent actions');
      const page = (await gaEvents('page_view'))[0][2];
      assert.equal(page.page_location, preview + '/');
      assert.equal(page.page_referrer, '');
      assert.ok(!JSON.stringify(page).includes('never-send'));
      const consentCalls = await ev(`window.dataLayer.map(x=>Array.from(x)).filter(x=>x[0]==='consent')`);
      assert.equal(consentCalls[0][1], 'default');
      assert.equal(consentCalls[0][2].analytics_storage, 'denied');
      assert.equal(consentCalls[1][2].ad_user_data, 'denied');
    }
    await click('[aria-label="Choose a workflow"] li:nth-child(2) button');
    for (let index = 0; index < 6; index++) {
      await click(`[aria-label="Choose a workflow"] li:nth-child(${index + 1}) button`);
      assert.equal(await ev(`document.querySelector('#selected-workflow').dataset.activeStep`), '1');
      assert.equal(await ev(`document.querySelectorAll('[aria-label="Choose a workflow"] [aria-pressed="true"]').length`), 1);
      for (let step = 1; step <= 5; step++) {
        await click(`#workflow-journey li:nth-child(${step}) button`);
        await until(`document.querySelector('#workflow-detail')?.getAttribute('aria-label')===${JSON.stringify(`${step} of 5: ${['Capture','Organize','Connect','Plan','Act'][step-1]}`)}`);
        assert.equal(await ev(`document.querySelector('[data-workflow-scene]').getAttribute('data-workflow-scene')`), String(step - 1), 'Each stage has its own SVG scene');
        if (step === 2) assert.ok(await ev(`document.querySelector('[data-reminder-state="detected-date"]')?.textContent.includes('AI-DETECTED DATE')`), 'Organization exposes a document date');
        if (step === 4) {
          const plan = await ev(`document.querySelector('[data-reminder-state="review-and-set"]').textContent`);
          assert.match(plan, /AI-DETECTED DOCUMENT DATE/);
          assert.match(plan, /REMINDER · YOU SET THE TIMING/);
          assert.match(plan, /OPTIONAL · CREATE A PLANNER TASK/);
          assert.equal(await ev(`!!document.querySelector('#workflow-detail a[href="/#reminders-demo"]')&&!!document.querySelector('#workflow-detail a[href="/#planner-demo"]')`), true, 'Both distinct features link to their live demonstrations');
        }
        if (step === 5) {
          const act = await ev(`document.querySelector('[data-reminder-state="upcoming-commitment"]').textContent`);
          assert.match(act, /NO PLANNER TASK REQUIRED/);
          assert.equal(await ev(`!!document.querySelector('#workflow-detail a[href="/#reminders-demo"]')`), true);
        }
      }
      const complete = (await events('workflow_completed')).filter(item => item.workflow_id === cases[index]);
      assert.equal(complete.length, 1, 'One completion after all five distinct steps: ' + cases[index]);
      const count = (await events('workflow_step_viewed')).length;
      await click('#workflow-journey li:nth-child(5) button');
      assert.equal((await events('workflow_step_viewed')).length, count, 'Repeated controls do not inflate step counts');
    }
    await ev(`document.querySelector('#source-to-action').scrollIntoView({behavior:'instant'})`);
    await screenshot('workflows-desktop-dark');
    await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    for (const theme of ['dark', 'light']) {
      await ev(`document.documentElement.dataset.theme=${JSON.stringify(theme)};document.documentElement.style.colorScheme=${JSON.stringify(theme)}`);
      await wait(450);
      assert.equal(await ev(`document.documentElement.scrollWidth<=innerWidth`), true, 'No horizontal overflow: ' + theme);
      await screenshot('workflows-mobile-' + theme);
    }
    await ev(`document.querySelector('[aria-label="Choose a workflow"] li:nth-child(2) button').focus()`);
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', text: '\r', unmodifiedText: '\r', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
    await wait(150);
    assert.equal(await ev(`document.querySelector('[aria-label="Choose a workflow"] [aria-pressed="true"]').textContent`), 'Organize research', 'Keyboard selects outcome');
    assert.equal(await ev(`document.querySelector('#selected-workflow').dataset.activeStep`), '1', 'Switching workflows resets stage');
    await ev(`document.querySelector('#selected-workflow').scrollIntoView({behavior:'instant',block:'center'});const stage=document.querySelector('[aria-roledescription="slide"]').parentElement;const start=new Touch({identifier:1,target:stage,clientX:300,clientY:300});const end=new Touch({identifier:1,target:stage,clientX:140,clientY:303});stage.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[start]}));stage.dispatchEvent(new TouchEvent('touchend',{bubbles:true,changedTouches:[end]}))`);
    await until(`document.querySelector('#selected-workflow').dataset.activeStep==='2'`, 'Horizontal swipe advances the carousel');
    await click('[aria-label="Pause workflow animation"]');
    await until(`document.querySelector('[data-workflow-scene]').getAttribute('data-animate')==='false'`, 'Pause stops SVG motion');
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await wait(200);
    assert.equal(await ev(`document.querySelector('[aria-label="Play workflow animation"]').disabled`), true, 'Reduced motion disables automatic playback');
    await click('#workflow-journey li:nth-child(3) button');
    await until(`document.querySelector('[data-workflow-scene]').getAttribute('data-workflow-scene')==='2'`);
    assert.equal(await ev(`Array.from(document.querySelector('[data-workflow-scene]').querySelectorAll('*')).some(node=>getComputedStyle(node).animationName!=='none')`), false, 'Reduced motion keeps every SVG scene static');
    await screenshot('workflows-mobile-connected');
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
    await wait(200);
    await click('[aria-label="Play workflow animation"]');
    await ev(`document.activeElement.blur();document.querySelector('#selected-workflow').scrollIntoView({behavior:'instant',block:'center'})`);
    await until(`document.querySelector('#selected-workflow').dataset.carouselPlaying==='true'`);
    const passiveEvents = (await events('workflow_step_viewed')).length;
    await wait(7600);
    assert.notEqual(await ev(`document.querySelector('#selected-workflow').dataset.activeStep`), '3', 'Visible carousel advances automatically');
    assert.equal((await events('workflow_step_viewed')).length, passiveEvents, 'Autoplay never counts as deliberate exploration');
    await ev(`window.scrollTo({top:0,behavior:'instant'})`);
    await until(`document.querySelector('#selected-workflow').dataset.carouselPlaying==='false'`, 'Offscreen playback stops');
    // One named OS click emits both events; automatic OS detection emits neither.
    const beforeDownload = (await events('download_clicked')).length;
    const beforePlatform = (await events('platform_selected')).length;
    await click('#download a[data-platform-choice][href*="play.google.com"]');
    assert.equal((await events('download_clicked')).length, beforeDownload + 1);
    assert.equal((await events('platform_selected')).length, beforePlatform + 1);
    assert.equal((await events('download_clicked')).at(-1).workflow_id, 'organize-research');
    if (gaEnabled) {
      const params = (await gaEvents('platform_selected')).at(-1)[2];
      assert.equal(params.platform, 'android'); assert.equal(params.workflow_category, 'organize-research');
      assert.equal(params.debug_mode, true);
      assert.equal((await gaEvents('workflow_completed')).length, 6, 'GA receives one completion per explored example');
      assert.equal(googleRequests.filter(url => url.includes('/gtag/js')).length, 1, 'Rerenders do not duplicate tag');
      const pageViews = (await gaEvents('page_view')).length;
      await click('#source-to-action a[href="/use-cases"]');
      await until(`location.pathname==='/use-cases'`);
      await until(`(window.dataLayer||[]).filter(x=>x[0]==='event'&&x[1]==='page_view').length===${pageViews + 1}`);
      assert.equal(googleRequests.filter(url => url.includes('/gtag/js')).length, 1, 'SPA navigation keeps one tag');
      await ev(`history.back()`);
      await until(`location.pathname==='/'`);
      await until(`(window.dataLayer||[]).filter(x=>x[0]==='event'&&x[1]==='page_view').length===${pageViews + 2}`);
      await ev(`document.cookie='_ga=qa-only; path=/';window.dispatchEvent(new Event('neuvault:analytics-preferences'))`);
      await click('[data-analytics-consent] button:first-child');
      const gaCount = (await gaEvents('download_clicked')).length;
      await click('#download a[data-platform-choice][href*="play.google.com"]');
      assert.equal((await gaEvents('download_clicked')).length, gaCount, 'Consent withdrawal blocks subsequent events');
      assert.ok(!(await ev('document.cookie')).includes('_ga='));
    } else {
      assert.equal(googleRequests.length, 0, 'Local and automated traffic disabled by default');
      await ev(`localStorage.setItem('neuvault-analytics-consent-v1',JSON.stringify({value:'granted',at:Date.now()}))`);
      await navigate('/');
      assert.equal(googleRequests.length, 0, 'Local and automated traffic stays disabled even with saved opt-in');
      assert.equal(await ev(`!!document.querySelector('#neuvault-ga4')`), false);
    }

    // Referral attribution modifies the Play URL before the analytics listener.
    const referralCount = (await events('download_clicked')).length;
    await ev(`const play=document.querySelector('#download a[href*="play.google.com"]');const url=new URL(play.href);url.searchParams.set('referrer','private-referral-value');play.href=url.toString()`);
    await click('#download a[href*="play.google.com"]');
    assert.equal((await events('download_clicked')).length, referralCount + 1);
    assert.ok(!JSON.stringify((await events('download_clicked')).at(-1)).includes('private-referral-value'));

    await navigate('/use-cases');
    assert.equal(await ev(`document.querySelectorAll('main a[href^="/use-cases/"]').length`), 8);
    for (const slug of cases) {
      await navigate('/use-cases/' + slug);
      assert.equal(await ev(`document.querySelector('link[rel="canonical"]').href`), 'https://neuvault.app/use-cases/' + slug);
      assert.equal(await ev(`document.querySelectorAll('#workflow-journey li').length`), 5);
      assert.equal(await ev(`document.querySelectorAll('main details ol li').length`), 5, 'Full workflow available in server-rendered content');
      assert.equal((await events('workflow_completed')).length, 0, 'No completion on page load');
    }
    assert.equal((await fetch(preview + '/use-cases/not-a-workflow')).status, 404);
    const sitemap = await (await fetch(preview + '/sitemap.xml')).text();
    for (const slug of cases) assert.ok(sitemap.includes('/use-cases/' + slug));
    if (gaEnabled) {
      // Even a saved opt-in does not enable collection on sensitive pages.
      await ev(`localStorage.setItem('neuvault-analytics-consent-v1',JSON.stringify({value:'granted',at:Date.now()}))`);
      const beforeSensitive = googleRequests.length;
      await navigate('/contact');
      assert.equal(googleRequests.length, beforeSensitive, 'No tag on contact page, even with saved consent');
      const signal = await send('Page.addScriptToEvaluateOnNewDocument', { source: `Object.defineProperty(navigator,'globalPrivacyControl',{value:true,configurable:true})` });
      await navigate('/');
      assert.equal(googleRequests.length, beforeSensitive, 'Browser privacy signal overrides saved consent');
      await send('Page.removeScriptToEvaluateOnNewDocument', { identifier: signal.identifier });
      await navigate('/');
      await until(`window.__gaScriptLoads===1`, 'Saved consent restores one tag');
      await ev(`localStorage.setItem('neuvault-analytics-consent-v1',JSON.stringify({value:'denied',at:Date.now()}));window.dispatchEvent(new StorageEvent('storage',{key:'neuvault-analytics-consent-v1'}))`);
      await until(`window['ga-disable-G-RV4D6WPEXH']===true`, 'Cross-tab consent withdrawal takes effect');
    }
    assert.deepEqual(errors, []);
    console.log(`Passed: six outcomes and five SVG scenes; reset, keyboard, swipe, autoplay, pause, offscreen stopping and reduced motion; mobile light/dark; eight SEO pages and sitemap; download/platform attribution; ${gaEnabled ? 'consent, tag deduplication, sanitized GA payloads and withdrawal' : 'analytics disabled by default'}. No live GA traffic sent.`);
  } finally { socket.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
