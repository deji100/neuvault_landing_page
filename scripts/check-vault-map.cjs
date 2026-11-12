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
const preview = process.env.PREVIEW_URL || 'http://127.0.0.1:3107';
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
    let canvasFormatting;
    assert.equal(await evaluate(`getComputedStyle(document.querySelector('#vault-map-demo iframe')).pointerEvents`),'none','Demo content cannot be manipulated');
    assert.equal(await evaluate(`document.querySelector('#vault-map-demo iframe').tabIndex`),-1);
    for(const time of [0,5500,9000,10500,11500,14000,24000,27000,30000,36000,40000,49000,55000,62500,65000,67500,72000,77500,82500,92000,95500,95600,101700,106500,114000,115500,125000,130000,129200,129500,129600,129700,130000,133100,142000,142200,142500,142600,142700,143200,145100,163000,167000,170000,179000,188000,72000,0]){
      await seek(time);
      assert.equal(await frame('!!document.querySelector(".react-flow__node")'),true,`Map exists at ${time}`);
      assert.equal(await frame('!!document.querySelector(".react-flow__minimap")'),false,'Native map has no extra minimap');
      if(time===0){assert.equal(await frame('document.querySelectorAll(".react-flow__node").length'),1);assert.match(await frame('document.querySelector(".nv-map-chat-coach").textContent'),/Open your saved note/)}
      const visibleCards=time===14000?['saved-note','saved-edit']:time===82500?['video','design']:time===92000?['design','milestones']:time===106500||time===143200||time===170000?['pdf','design','milestones']:[];
      if(visibleCards.length){
        const bounds=await frame(`JSON.parse('${JSON.stringify(visibleCards)}').map(id=>{const r=document.querySelector('.react-flow__node[data-id="'+id+'"]').getBoundingClientRect();return {id,left:r.left,right:r.right,top:r.top,bottom:r.bottom}})`);
        for(const r of bounds)assert.ok(r.left>=16&&r.right<=1584&&r.top>=68&&r.bottom<=1010,`Related card stays fully framed at ${time}: ${r.id} ${JSON.stringify(r)}`);
        if(time===14000){
          const clear=await frame('(()=>{const note=document.querySelector("[data-map-note-id=saved-edit]").getBoundingClientRect(),guide=document.querySelector(".nv-map-chat-coach").getBoundingClientRect();return guide.right<=note.left||guide.left>=note.right||guide.bottom<=note.top||guide.top>=note.bottom})()');
          assert.equal(clear,true,'The guide has its own lane beside the note');
        }
      }
      if(time===5500)assert.match(await frame('document.querySelector(".document-view-modal__edit-chooser").textContent'),/Edit here in the map/);
      if([9000,10500,11500].includes(time)){
        const tools={9000:'Heading 2',10500:'Bold',11500:'Bullet list'};
        assert.equal(await frame('document.querySelector("[data-map-note-id=saved-edit] .ProseMirror").dataset.tourLastTool'),tools[time]);
        assert.equal(await frame('document.querySelector("[data-map-note-id=saved-edit] h2").textContent'),'Japan trip brief');
        if(time===11500)assert.equal(await frame('document.querySelectorAll("[data-map-note-id=saved-edit] li").length'),4);
      }
      if(time===14000){assert.ok(await frame('!!document.querySelector(".linked-map-note-side-tools.is-expanded")'));assert.match(await frame('document.querySelector("[data-map-note-id=saved-edit] .ProseMirror").textContent'),/Our priorities/)}
      if(time===24000)assert.match(await frame('document.querySelector(".linked-map-upload-dialog").textContent'),/3 files/);
      if(time===27000){assert.equal(await frame('document.querySelectorAll(".linked-map-image-node").length'),2);assert.ok(await frame('!!document.querySelector(".linked-map-image-lightbox")'))}
      if(time===30000){for(let n=0;n<20;n++){if(await frame('!!document.querySelector(".document-pdf-page canvas, .pdf-page canvas, canvas")'))break;await pause(100)}assert.match(await frame('document.querySelector(".document-view-modal").textContent'),/accommodation plan/);const pdf=await evaluate(`fetch('/desktop-tour-media/kyoto-stay.pdf').then(r=>r.text())`);assert.ok(pdf.startsWith('%PDF-1.4'));assert.doesNotMatch(pdf,/neuvault|sample|NV-DEMO|fictional|animated product tour/i);assert.match(pdf,/Booking and budget checks/);assert.match(pdf,/Departure and offline checklist/)}
      if(time===40000){
        assert.equal(await frame('document.querySelector(".react-flow__node[data-id=video]").style.width'),'820px','Use the desktop media default');
        for(let n=0;n<25;n++){if(await frame('!!document.querySelector(".linked-map-canvas-player iframe")'))break;await pause(100)}
        assert.ok(await frame('!!document.querySelector(".linked-map-canvas-player iframe")'),'First video opens on the canvas');
        assert.equal(await frame('!!document.querySelector(".document-view-modal")'),false,'Video does not open a modal');
      }
      if(time===55000){
        for(let n=0;n<25;n++){if(await frame('!!document.querySelector(".document-view-modal--expanded webview iframe")'))break;await pause(100)}
        assert.match(await frame('document.querySelector(".document-view-modal--expanded webview iframe").src'),/en\.wikivoyage\.org\/wiki\/Kyoto/);
      }
      if(time===65000)assert.equal(await frame('document.querySelector("[data-map-note-id=design] .ProseMirror").dataset.tourLastTool'),'Heading 2');
      if(time===67500)assert.equal(await frame('document.querySelector("[data-map-note-id=design] .ProseMirror").dataset.tourLastTool'),'Bold');
      if(time===72000)assert.ok(await frame('!!document.querySelector("[data-map-note-id=design] .ProseMirror strong")'));
      if(time===77500)assert.equal(await frame('document.querySelector("[data-map-note-id=design] .ProseMirror").dataset.tourLastTool'),'Insert table');
      if(time===82500){
        assert.match(await frame('document.querySelector("[data-map-note-id=design] table").textContent'),/Tokyo/);
        canvasFormatting=await frame('(()=>{const e=document.querySelector("[data-map-note-id=design] .ProseMirror"),h=getComputedStyle(e.querySelector("h2"));return {size:h.fontSize,weight:h.fontWeight,bold:getComputedStyle(e.querySelector("strong")).fontWeight}})()');
        assert.equal(await frame('getComputedStyle(document.querySelector("[data-map-note-id=design] table")).borderTopWidth'),'0px','Only the wrapper draws the table frame');
        assert.equal(await frame('getComputedStyle(document.querySelector("[data-map-note-id=design] .tableWrapper")).borderTopWidth'),'1px');
      }
      if(time===92000)assert.ok(await frame('!!document.querySelector("[data-map-note-id=milestones] .ProseMirror")'));
      if(time===92000){
        assert.match(await frame('document.querySelector("[data-map-note-id=milestones]").className'),/is-sticky/);
        assert.equal(await frame('getComputedStyle(document.querySelector("[data-map-note-id=milestones]")).backgroundColor'),'rgb(230, 220, 255)');
      }
      if(time===95500||time===95600){
        assert.equal(await frame('document.querySelector("[data-map-note-id=milestones]").dataset.tourColorClicked'),'true','The native color swatch is clicked');
        assert.equal(await frame('getComputedStyle(document.querySelector("[data-map-note-id=milestones]")).backgroundColor'),'rgb(223, 246, 232)');
        assert.ok(await frame(`document.querySelector('[data-map-note-id=milestones] [aria-label="Use note color #dff6e8"]').classList.contains('is-selected')`));
      }
      if([92000,95500,106500,188000].includes(time)){
        const surfaces=await frame('Array.from(document.querySelectorAll("[data-map-note-id=milestones] :is(.linked-map-note-content,.linked-map-note-rich,.linked-map-note-inline-shell,.linked-map-note-editor-frame,.linked-map-note-inline-editor)")).map(e=>({className:e.className,color:getComputedStyle(e).backgroundColor,image:getComputedStyle(e).backgroundImage}))');
        assert.ok(surfaces.length>0,'Sticky content is rendered');
        for(const surface of surfaces){
          assert.equal(surface.color,'rgba(0, 0, 0, 0)',`Sticky content must let the selected paper color show through: ${surface.className}`);
          assert.equal(surface.image,'none');
        }
      }
      if(time===101700)assert.ok(await frame('!!document.querySelector(".react-flow__connection-path")'));
      if(time===106500){
        assert.equal(await frame('document.querySelectorAll(".react-flow__edge").length'),2);
        const cards=await frame('Array.from(document.querySelectorAll(".react-flow__node")).map(e=>{const r=e.getBoundingClientRect();return {id:e.dataset.id,x:r.x,y:r.y,right:r.right,bottom:r.bottom,centreY:r.y+r.height/2}})');
        for(let a=0;a<cards.length;a++)for(let b=a+1;b<cards.length;b++){
          const left=cards[a],right=cards[b];
          assert.ok(left.right<=right.x||right.right<=left.x||left.bottom<=right.y||right.bottom<=left.y,`Arranged cards do not overlap: ${left.id}, ${right.id}`);
        }
        const chain=['pdf','design','milestones'].map(id=>cards.find(card=>card.id===id));
        for(let n=1;n<chain.length;n++){
          assert.ok(chain[n].x-chain[n-1].right>=100,'Connected cards keep a clear gap');
          assert.ok(Math.abs(chain[n].centreY-chain[n-1].centreY)<2,'Connected card centres line up');
        }
      }
      if(time===114000||time===125000){assert.equal(await frame('document.querySelectorAll(".linked-map-split-pane").length'),2);assert.ok(await frame('!!document.querySelector(".linked-map-split-document-pane .youtube-inline-viewer iframe")'));assert.ok(await frame('!!document.querySelector(".linked-map-split-note-pane .ProseMirror")'))}
      if(time===125000){
        const splitFormatting=await frame('(()=>{const e=document.querySelector(".linked-map-split-note-pane .ProseMirror"),h=getComputedStyle(e.querySelector("h2"));return {size:h.fontSize,weight:h.fontWeight,bold:getComputedStyle(e.querySelector("strong")).fontWeight}})()');
        assert.deepEqual(splitFormatting,canvasFormatting,'Native formatting applies equally in split and canvas editors');
        assert.equal(await frame('getComputedStyle(document.querySelector(".linked-map-split-note-pane table")).borderTopWidth'),'0px');
      }
      if(time===129200){assert.notEqual(await frame('document.querySelector(".react-flow__node[data-id=travel-day]").style.transform'),'translate(1650px, 1100px)')}
      if(time===129500||time===142500){
        const drop=await frame(`(()=>{const source=document.querySelector('.react-flow__node[data-id="${time===129500?'travel-day':'kyoto'}"]'),note=document.querySelector('[data-map-note-id=design]'),line=note.querySelector('.linked-map-note-insert-line').getBoundingClientRect(),body=note.querySelector('.linked-map-note-content-render'),blocks=[...body.children],a=blocks[0].getBoundingClientRect(),b=blocks[1].getBoundingClientRect(),last=blocks.at(-1).getBoundingClientRect(),s=source.getBoundingClientRect();return {pointer:Number(source.dataset.tourDragY),line:line.top,expected:${time===129500?'last.bottom':'(a.bottom+b.top)/2'},sourceTop:s.top,noteTop:note.getBoundingClientRect().top,noteHeight:note.getBoundingClientRect().height,cursor:parseFloat(document.querySelector('.nv-map-tour-cursor').style.top)}})()`);
        assert.ok(Math.abs(drop.pointer-drop.line)<3,'Pointer and native insertion line agree');
        assert.ok(Math.abs(drop.pointer-drop.expected)<3,'Drop uses the intended document boundary');
        assert.ok(Math.abs(drop.cursor-drop.pointer)<3,'The visible cursor follows the actual drag point');
        if(time===129500)assert.ok(drop.sourceTop>drop.noteTop+drop.noteHeight*.7,'The source note is dragged to the bottom of the destination');
      }
      if(time===129600||time===129700||time===130000){

        assert.equal(await frame('!!document.querySelector("[data-map-note-id=travel-day]")'),false,'Native note drop removes the source card');
        assert.match(await frame('document.querySelector("[data-map-note-id=design]").textContent'),/Travel-day checklist/);
        assert.match(await frame('document.querySelector("[data-map-note-id=design]").textContent'),/departure station/);
      }
      if(time===133100||time===143200||time===145100){
        const size=await frame('(()=>{const n=document.querySelector(".react-flow__node[data-id=design]");return {width:n.style.width,height:n.style.height}})()');
        assert.deepEqual(size,time===133100?{width:'640px',height:'680px'}:{width:'720px',height:'720px'},'The note grows as content is combined');
        if(time===145100){
          const scroll=await frame('(()=>{const n=document.querySelector("[data-map-note-id=design] .linked-map-note-editor-frame");return {top:n.scrollTop,max:n.scrollHeight-n.clientHeight,view:document.querySelector(".react-flow__viewport").style.transform}})()');
          assert.ok(scroll.max<1||Math.abs(scroll.top-scroll.max)<3,'Automatic internal scrolling reveals the merged checklist');
          assert.match(await frame('document.querySelector("[data-map-note-id=design]").textContent'),/Share the Kyoto address/);
        }
      }
      if(time===142200){assert.notEqual(await frame('document.querySelector(".react-flow__node[data-id=kyoto]").style.transform'),'translate(800px, 30px)')}
      if(time===142600||time===142700||time===143200){

        assert.ok(await frame('!!document.querySelector("[data-map-note-id=design] img")'),'Native image drop inserts the photo');
        assert.equal(await frame('(()=>{const e=document.querySelector("[data-map-note-id=design] .linked-map-note-content-render, [data-map-note-id=design] .ProseMirror");const blocks=[...e.children].filter(b=>b.textContent.trim()||b.matches("h2,img")||b.querySelector("img"));return Boolean(blocks[0].matches("h2")&&(blocks[1].matches("img")||blocks[1].querySelector("img")))})()'),true,'The native image drop lands immediately below the heading');
        assert.equal(await frame('document.querySelector(".react-flow__node[data-id=kyoto]").style.transform'),'translate(800px, 30px)','The original photo returns to its clean position');
      }
      if(time===125000)assert.match(await frame('document.querySelector(".linked-map-split-note-pane .ProseMirror").textContent'),/Group nearby ideas/);
      if(time===163000){assert.match(await frame('document.querySelector(".map-ai-action-confirm").textContent'),/Update the selected note/);assert.equal(await frame('document.querySelectorAll("[data-map-note-id=design] tr").length'),3,'Nova edit waits for confirmation')}
      if(time===167000||time===188000){assert.ok(await frame('!!document.querySelector("[data-map-note-id=design] img")'),'Nova preserves the inserted photo');assert.equal(await frame('(()=>{const e=document.querySelector("[data-map-note-id=design]"),i=e.querySelector("img"),t=e.querySelector("table");return Boolean(i.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)})()'),true,'The photo stays above the table after Nova edits');assert.match(await frame('document.querySelector("[data-map-note-id=design]").textContent'),/Travel-day checklist/);assert.equal(await frame('document.querySelectorAll("[data-map-note-id=design] tr").length'),5);assert.match(await frame('document.querySelector("[data-map-note-id=design]").textContent'),/Three nights for two adults/)}
      if(time===170000){
        const widths=await frame('(()=>{const t=document.querySelector("[data-map-note-id=design] table");return {table:t.getBoundingClientRect().width,frame:t.parentElement.getBoundingClientRect().width,layout:getComputedStyle(t).tableLayout}})()');
        assert.ok(widths.table<=widths.frame+1,'Detailed table text wraps within the note');
        assert.equal(widths.layout,'fixed');
      }
      if(time===179000)assert.match(await frame('document.querySelector(".linked-map-export-modal").textContent'),/Entire map/);
    }
    await seek(188000);
    const lockedPosition=await frame('document.querySelector(".react-flow__node[data-id=kyoto]").style.transform');
    const dragPoint=await evaluate(`(()=>{const f=document.querySelector('#vault-map-demo iframe'),r=f.getBoundingClientRect(),n=f.contentDocument.querySelector('.react-flow__node[data-id=kyoto]').getBoundingClientRect(),scale=r.width/f.clientWidth;return {x:r.x+(n.x+40)*scale,y:r.y+(n.y+40)*scale}})()`);
    await send('Input.dispatchMouseEvent',{type:'mousePressed',...dragPoint,button:'left',buttons:1,clickCount:1});
    await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:dragPoint.x+120,y:dragPoint.y+80,button:'left',buttons:1});
    await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:dragPoint.x+120,y:dragPoint.y+80,button:'left',buttons:0,clickCount:1});
    assert.equal(await frame('document.querySelector(".react-flow__node[data-id=kyoto]").style.transform'),lockedPosition,'A visitor drag cannot move a card');
    // Exercise every typing update, rather than checking only chapter endpoints.
    await seek(69000);
    await evaluate(`window.__tourEditor=document.querySelector('#vault-map-demo iframe').contentDocument.querySelector('[data-map-note-id=design] .ProseMirror');true`);
    const origin=await frame('(()=>{const r=document.querySelector("[data-map-note-id=design]").getBoundingClientRect();return {x:r.x,y:r.y,transform:document.querySelector(".react-flow__viewport").style.transform}})()');
    for(let time=69040;time<=73000;time+=40){
      await evaluate(`document.querySelector('#vault-map-demo iframe').contentWindow.postMessage({type:'nv-map-time',time:${time},reduced:false,active:false},location.origin)`);
      await pause(40);
      const state=await frame('(()=>{const e=document.querySelector("[data-map-note-id=design] .ProseMirror"),r=e?.closest("[data-map-note-id]").getBoundingClientRect();return {same:e===parent.__tourEditor,connected:e?.isConnected,x:r?.x,y:r?.y,transform:document.querySelector(".react-flow__viewport").style.transform}})()');
      assert.equal(state.same,true,'Typing must retain the native editor instance');assert.equal(state.connected,true);
      assert.ok(Math.abs(state.x-origin.x)<2&&Math.abs(state.y-origin.y)<2,'Typing must not scroll or move the note');
      assert.equal(state.transform,origin.transform,'Typing must not reset the camera');
    }
    // Muted autoplay must reach YouTube's actual playing state; a poster alone
    // does not satisfy the watch-and-take-notes scene.
    await seek(111500);
    await evaluate('document.querySelector("#vault-map-demo iframe").scrollIntoView({behavior:"instant",block:"center"})');
    await pause(200);
    await evaluate(`document.querySelector('[aria-label="Play Vault Map tour"]').click()`);
    let playing=false;
    for(let n=0;n<75;n++){if(await frame('document.querySelector(".linked-map-split-document-pane iframe")?.dataset.tourPlayerState')==='1'){playing=true;break}await pause(250)}
    assert.equal(playing,true,'The embedded video must actually play');
    await evaluate('window.scrollTo({top:0,behavior:"instant"})');await pause(300);
    const offscreen=await evaluate('Number(document.querySelector("#vault-map-demo input[type=range]").value)');
    await pause(400);assert.equal(await evaluate('Number(document.querySelector("#vault-map-demo input[type=range]").value)'),offscreen);
    await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
    await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await pause(700);
    assert.equal(await evaluate('document.documentElement.scrollWidth'),390);
    assert.equal(await evaluate('Number(document.querySelector("#vault-map-demo input[type=range]").value)'),188000);
    assert.equal(await frame('!!document.querySelector(".nv-map-tour-cursor")'),false);
    assert.equal(await frame('!!document.querySelector(".is-editing")'),false);
    assert.equal(await frame('document.querySelectorAll("[data-map-note-id=design] tr").length'),5);
    assert.equal(requests.some(url=>/\/(?:api|v1|v2)\//.test(url)&&url.startsWith(preview)),false);
    assert.deepEqual(errors,[],'No browser exceptions');
    if(process.env.SCREENSHOT_PATH){const shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(process.env.SCREENSHOT_PATH,Buffer.from(shot.data,'base64'))}
    console.log('Passed: native guide and edit flow; photos/PDF; desktop video size; live fullscreen web; real toolbar actions; tables; continuous typing without editor remount or camera movement; video playback while taking notes; confirmed Nova edit preserving the inserted photo; native note merge and photo drag; stable photo position; single table frame; matching split formatting; locked demo content; native sticky color change; related cards fully framed; automatic note growth and internal scrolling; replay; offscreen pause; mobile and reduced motion; native JSX/style fidelity.');
  }finally{socket.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
