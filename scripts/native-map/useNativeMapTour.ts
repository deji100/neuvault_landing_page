// @ts-nocheck -- the controller uses the desktop component's state setters.
import {createContext,useContext,useEffect,useRef} from 'react';
import {projectAt,messagesAt,savedItem,pdfItem,videoItem,webItem,notePlan,typed,documentsAt,setProjectTime} from './project';
import {VIDEO,WEBPAGE,NOVA_PROMPT} from '../../components/specific/home/vault-map/mapProject';
export const TourContext=createContext({time:0,reduced:false,active:false});
const sameIds=(a,b)=>a.length===b.length&&a.every((value,index)=>value===b[index]);

function cameraAt(time){
 if(time<7000)return {x:360,y:150,zoom:1.25};
 // Keep the source card, edited copy, floating tools and guide in frame.
 if(time<19000)return {x:60,y:120-30*1.05,zoom:1.05};
 if(time>=26000&&time<32000)return {x:120-30*.95,y:180-1150*.95,zoom:.95};
 if(time>=39000&&time<46000)return {x:110-30*1.15,y:160-410*1.15,zoom:1.15};
 if(time>=61500&&time<85000)return {x:80-30*.9,y:120-410*.9,zoom:.9};
 if(time>=87500&&time<97000)return {x:80-940*1.05,y:130-410*1.05,zoom:1.05};
 if(time>=97000&&time<99000)return {x:75,y:65,zoom:.56};
 // Both connection gestures share one frame for the complete related chain.
 if(time>=99000&&time<108000)return {x:80-30*.9,y:130-500*.9,zoom:.9};
 if(time>=128000&&time<129700)return {x:40-450*.65,y:100-450*.65,zoom:.65};
 if(time>=129700&&time<140000)return {x:80-30*.82,y:130-470*.82,zoom:.82};
 if(time>=140000&&time<142700)return {x:80-450*.72,y:120-30*.72,zoom:.72};
 if(time>=142700&&time<150000)return {x:80-30*.8,y:130-450*.8,zoom:.8};
 if(time>=150000&&time<169000)return {x:30,y:40,zoom:.4};
 if(time>=169000&&time<173000)return {x:80-30*.8,y:130-450*.8,zoom:.8};
 if(time>=142700)return {x:75,y:65,zoom:.53};
 if(time>=97000)return {x:75,y:65,zoom:.56};
 return {x:75,y:65,zoom:.67};
}

// Match the native insertion boundaries, then use that same point for the
// pointer, card trajectory and drop handler so the result does not relocate.
function dropPoint(target,append){
 const scroller=target.querySelector('.linked-map-note-content');
 if(scroller)scroller.scrollTop=append?scroller.scrollHeight:0;
 const rect=target.getBoundingClientRect();
 const blocks=Array.from(target.querySelector('.linked-map-note-content-render')?.children||[]);
 const last=blocks[blocks.length-1]?.getBoundingClientRect();
 const heading=blocks[0]?.getBoundingClientRect(),next=blocks[1]?.getBoundingClientRect();
 const y=append?last?.bottom:heading&&next?(heading.bottom+next.top)/2:heading?.bottom;
 return {clientX:rect.left+rect.width/2,clientY:Math.max(rect.top+12,Math.min(rect.bottom-12,y??rect.bottom-16))};
}
function dragPointer(id,point){
 const node=document.querySelector(`.react-flow__node[data-id="${id}"]`);
 if(!node)return;
 if(point){node.dataset.tourDragX=String(point.x);node.dataset.tourDragY=String(point.y)}
 else{delete node.dataset.tourDragX;delete node.dataset.tourDragY}
}

export function useNativeMapTour(context){
 const {time,reduced,active}=useContext(TourContext);
 const latest=useRef(context);latest.current=context;
 const previous=useRef(-1),snapshotKey=useRef(''),docKey=useRef(''),cameraKey=useRef('');
 const entryFrame=useRef(0),cameraReadyAt=useRef(0);
 useEffect(()=>{
  setProjectTime(time);
  const c=latest.current,snapshot=projectAt(time);
  c.editFocusAtRef.current=Date.now();
  const key=JSON.stringify(snapshot.nodes)+JSON.stringify(snapshot.edges);
  if(snapshotKey.current!==key){c.applySnapshot(snapshot);snapshotKey.current=key}
  const documents=documentsAt(time),nextDocKey=time>=19000?'saved':'initial';
  if(docKey.current!==nextDocKey){c.setLiveDocuments(documents);docKey.current=nextDocKey}
  c.setLoading(false);c.setError(null);
  if(time<129000||time>=140000)c.setMergeRestructureSuggestion(null);
  c.setReplayNoteId('saved-note');
  c.setMapCoachEditCardId('saved-edit');
  const coach=time<2500?'open':time<7000?'edit':time<19000?'editing':time<22000?'add':null;
  c.setMapCoachStep(coach);
  c.setMapUploadChoice(time>=22000&&time<26000?{filePaths:['Kyoto · old streets.jpg','Tokyo · city lights.jpg','Kyoto stay · accommodation plan.pdf'],position:{x:30,y:1150}}:null);
  c.setYoutubeLinkOpen(time>=33000&&time<39000);
  c.setYoutubeLinkDraft(typed(VIDEO.url,time,34000,70));
  c.setWebBookmarkOpen(time>=47000&&time<51500);
  c.setWebBookmarkDraft(typed(WEBPAGE.url,time,47500,55));
  const menu=time>=20000&&time<22000||time>=32000&&time<33000||time>=46000&&time<47000||time>=60000&&time<61500||time>=86000&&time<87500?'add':time>=108000&&time<109500?'view':time>=173000&&time<176000?'transfer':null;
  c.setOpenToolbarCategory(menu);
  c.setPreviewDocument(time>=28800&&time<31800?pdfItem:time>=2500&&time<7000?savedItem:time>=52500&&time<59000?webItem:null);
  c.setPlayingMediaNodeId(time>=39700&&time<46000?'video':null);
  const split=time>=111000&&time<128000;
  c.setSplitScreenActive(time>=109500&&time<128000);
  const design=snapshot.nodes.find(node=>node.id==='design');
  const splitItems=split?[{kind:'document',id:'video',title:VIDEO.title,document:videoItem},{kind:'note',id:'design',title:'Tokyo + Kyoto itinerary',note:design}]:time>=110000&&time<111000?[{kind:'document',id:'video',title:VIDEO.title,document:videoItem}]:[];
  c.setSplitScreenItems(current=>JSON.stringify(current)===JSON.stringify(splitItems)?current:splitItems);
  c.setExpandedSplitPane(null);
  c.setNovaOpen(time>=150500&&time<169000);
  c.setNovaDraft(time>=157000?'':typed(NOVA_PROMPT,time,151500,25));
  const phase=time>=166000?'applied':time>=160000?'response':time>=157000?'sent':'draft';
  const old=previous.current>=166000?'applied':previous.current>=160000?'response':previous.current>=157000?'sent':'draft';
  if(phase!==old||previous.current<0){c.setNovaMessages(messagesAt(time));c.setExecutedNovaProposalIds(new Set(time>=166000?['answer:edit-itinerary']:[]))}
  c.setNovaSending(time>=157000&&time<160000);c.setNovaScopeChoice('whole_map');
  c.setMapExportOpen(time>=176000&&time<184000);
  const editing=time>=7000&&time<19000?'saved-edit':time>=64000&&time<85000||time>=142700&&time<150000||time>=169000&&time<172000?'design':time>=89000&&time<97000?'milestones':null;
  const selected=editing?[editing]:time>=26800&&time<28500?['kyoto']:time>=39500&&time<46000?['video']:time>=51800&&time<52500?['web']:time>=61500&&time<64000?['design']:[];
  c.setSelectedNodeIds(current=>sameIds(current,selected)?current:selected);
  c.setNodes(nodes=>nodes.some(node=>Boolean(node.selected)!==selected.includes(node.id))?nodes.map(node=>({...node,selected:selected.includes(node.id)})):nodes);
  c.setSelection(current=>current?.id===editing?current:editing?{kind:'node',id:editing}:null);
  cancelAnimationFrame(entryFrame.current);
  entryFrame.current=requestAnimationFrame(()=>{
   document.querySelectorAll('.linked-map-note-node.is-editing .ProseMirror').forEach(editor=>{if(editor.closest('[data-map-note-id]')?.getAttribute('data-map-note-id')!==editing)editor.dispatchEvent(new FocusEvent('blur',{relatedTarget:document.body}))});
   if(editing){const node=document.querySelector(`[data-map-note-id="${editing}"]`);if(node&&!node.classList.contains('is-editing'))node.dispatchEvent(new MouseEvent('dblclick',{bubbles:true}))}
   if(time>=27000&&time<28500){if(!document.querySelector('.linked-map-image-lightbox'))document.querySelector('.react-flow__node[data-id=kyoto] button[title="Expand image"]')?.click()}else document.querySelector('[aria-label="Close expanded image"]')?.click();
   if(time>=5000&&time<7000){const button=document.querySelector('.document-view-modal [aria-label="Edit note"]');if(button&&button.getAttribute('aria-expanded')!=='true')button.click()}
   if(time>=53500&&time<59000){document.querySelector('[aria-label="Expand document view"]')?.click()}
   if(time>=162000&&time<169000){const thread=document.querySelector('.map-ai-thread');thread?.scrollTo({top:thread.scrollHeight,behavior:'instant'})}
   const noteContent=document.querySelector('[data-map-note-id="design"] .linked-map-note-content');
   if(noteContent&&time>=140000&&time<142700)noteContent.scrollTop=0;
  });
  previous.current=time;
 },[time,reduced]);
 const cameraTarget=cameraAt(time),cameraTargetKey=JSON.stringify(cameraTarget);
 useEffect(()=>{
  let frame=0,second=0,settleUntil=0;
  if(!context.wrapperElement)return;
  if(cameraKey.current!==cameraTargetKey)cameraReadyAt.current=Date.now()+(reduced?0:420);
  const keepFramed=()=>{
   if(Date.now()<settleUntil)return;
   const actual=latest.current.getViewport();
   if(Math.abs(actual.x-cameraTarget.x)>1||Math.abs(actual.y-cameraTarget.y)>1||Math.abs(actual.zoom-cameraTarget.zoom)>.002){
    void latest.current.setViewport(cameraTarget,{duration:0});
   }
  };
  window.addEventListener('linked-map-viewport-changed',keepFramed);
  frame=requestAnimationFrame(()=>{second=requestAnimationFrame(()=>{
   if(cameraKey.current!==cameraTargetKey){
    settleUntil=Date.now()+(reduced?0:370);
    latest.current.setViewport(cameraTarget,{duration:reduced?0:350});
    cameraKey.current=cameraTargetKey;
   }
  })});
  const settled=setTimeout(keepFramed,430);
  return()=>{cancelAnimationFrame(frame);cancelAnimationFrame(second);clearTimeout(settled);window.removeEventListener('linked-map-viewport-changed',keepFramed)};
 },[cameraTargetKey,reduced,context.wrapperElement]);
 // Scroll the note's own reading surface, never the canvas or landing page.
 // Start at the top after each resize, then reveal the combined lower blocks.
 useEffect(()=>{
  const range=time>=129700&&time<140000?[130000,133000]:time>=142700&&time<150000?[143200,145000]:time>=169000&&time<173000?[169800,172500]:null;
  if(!range)return;
  let second=0;
  const frame=requestAnimationFrame(()=>{second=requestAnimationFrame(()=>{
   const scroller=document.querySelector('[data-map-note-id="design"] .linked-map-note-editor-frame, [data-map-note-id="design"] .linked-map-note-content');
   if(!scroller)return;
   const progress=Math.max(0,Math.min(1,(time-range[0])/(range[1]-range[0])));
   const eased=progress*progress*(3-2*progress);
   scroller.scrollTop=Math.max(0,scroller.scrollHeight-scroller.clientHeight)*eased;
  })});
  return()=>{cancelAnimationFrame(frame);cancelAnimationFrame(second)};
 },[time]);
 const noteColorStep=time>=95500&&time<97000;
 useEffect(()=>{
  if(!noteColorStep){
   const note=document.querySelector('[data-map-note-id="milestones"]');
   if(note)delete note.dataset.tourColorClicked;
   return;
  }
  const apply=()=>{
   const note=document.querySelector('[data-map-note-id="milestones"]');
   if(!note||note.dataset.tourColorClicked==='true')return;
   const swatch=note.querySelector('[aria-label="Use note color #dff6e8"]');
   if(swatch){swatch.click();note.dataset.tourColorClicked='true'}
  };
  apply();const retry=setInterval(apply,100);return()=>clearInterval(retry);
 },[noteColorStep]);
 const noteDrag=useRef({started:false,dropped:false});
 useEffect(()=>{
  if(time<129000||time>=129700){noteDrag.current={started:false,dropped:false};dragPointer('travel-day',null);return}
  const sync=()=>{
   if(Date.now()<cameraReadyAt.current)return;
   const c=latest.current,source=c.nodesRef.current.find(node=>node.id==='travel-day');
   const target=document.querySelector('[data-map-note-id="design"]');
   if(!source||!target)return;
   const aim=dropPoint(target,true),destination=c.screenToFlowPosition({x:aim.clientX,y:aim.clientY});
   if(!noteDrag.current.started){const start=c.flowToScreenPosition({x:1890,y:1120});c.handleNodeDragStart({clientX:start.x,clientY:start.y},source);noteDrag.current.started=true}
   const progress=Math.max(0,Math.min(1,(time-129000)/500));
   const eased=progress*progress*(3-2*progress);
   const node={...source,position:{x:1650+(destination.x-240-1650)*eased,y:1100+(destination.y-20-1100)*eased}};
   const point=c.flowToScreenPosition({x:node.position.x+240,y:node.position.y+20});
   const event={clientX:point.x,clientY:point.y};
   if(!noteDrag.current.dropped){
    c.setNodes(nodes=>nodes.map(item=>item.id==='travel-day'?node:item));
    dragPointer('travel-day',point);c.handleNodeDrag(event,node);
    if(time>=129600){noteDrag.current.dropped=true;void c.handleNodeDragStop(event,node)}
   }
  };
  const frame=requestAnimationFrame(sync),retry=setInterval(sync,50);
  return()=>{cancelAnimationFrame(frame);clearInterval(retry)};
 },[time]);
 const photoDrag=useRef({started:false,dropped:false});
 useEffect(()=>{
  if(time<142000||time>=142700){photoDrag.current={started:false,dropped:false};dragPointer('kyoto',null);return}
  const sync=()=>{
   if(Date.now()<cameraReadyAt.current)return;
   const c=latest.current,source=c.nodesRef.current.find(node=>node.id==='kyoto');
   const target=document.querySelector('[data-map-note-id="design"]');
   if(!source||!target)return;
   const aim=dropPoint(target,false),destination=c.screenToFlowPosition({x:aim.clientX,y:aim.clientY});
   if(!photoDrag.current.started){const start=c.flowToScreenPosition({x:1050,y:150});c.handleNodeDragStart({clientX:start.x,clientY:start.y},source);photoDrag.current.started=true}
   const progress=Math.max(0,Math.min(1,(time-142000)/500));
   const eased=progress*progress*(3-2*progress);
   const node={...source,position:{x:800+(destination.x-250-800)*eased,y:30+(destination.y-120-30)*eased}};
   const point=c.flowToScreenPosition({x:node.position.x+250,y:node.position.y+120});
   const event={clientX:point.x,clientY:point.y};
   if(!photoDrag.current.dropped){
    c.setNodes(nodes=>nodes.map(item=>item.id==='kyoto'?node:item));
    dragPointer('kyoto',point);c.handleNodeDrag(event,node);
    if(time>=142600){photoDrag.current.dropped=true;void c.handleNodeDragStop(event,node)}
   }
  };
  const frame=requestAnimationFrame(sync),retry=setInterval(sync,50);
  return()=>{cancelAnimationFrame(frame);clearInterval(retry)};
 },[time]);
 const editTarget=time>=7000&&time<19000?'saved-edit':time>=64000&&time<85000||time>=142700&&time<150000||time>=169000&&time<172000?'design':time>=89000&&time<97000?'milestones':null;
 const guideChoice=time>=5000&&time<7000,webFullscreen=time>=53500&&time<59000;
 useEffect(()=>{
  let attempts=0;
  const apply=()=>{
   if(editTarget){const node=document.querySelector(`[data-map-note-id="${editTarget}"]`);if(node&&!node.classList.contains('is-editing'))node.dispatchEvent(new MouseEvent('dblclick',{bubbles:true}))}
   if(guideChoice){const button=document.querySelector('.document-view-modal [aria-label="Edit note"]');if(button&&button.getAttribute('aria-expanded')!=='true')button.click()}
   if(webFullscreen)document.querySelector('[aria-label="Expand document view"]')?.click();
   if(++attempts>20)clearInterval(timer);
  };
  const timer=setInterval(apply,100);apply();return()=>clearInterval(timer);
 },[editTarget,guideChoice,webFullscreen]);
 useEffect(()=>()=>cancelAnimationFrame(entryFrame.current),[]);
 // YouTube's normal embedded player stays mounted while the clock pauses.
 // Mute before autoplay, so browsers can start playback without a user gesture.
 const playbackScene=time>=39700&&time<46000?'canvas':time>=111000&&time<128000?'split':null;
 useEffect(()=>{
  if(!playbackScene)return;
  const selector=playbackScene==='canvas'?'.react-flow__node[data-id=video] .linked-map-canvas-player iframe':'.linked-map-split-document-pane .youtube-inline-viewer iframe';
  const command=(frame,func,args=[])=>frame.contentWindow?.postMessage(JSON.stringify({event:'command',func,args}),'https://www.youtube.com');
  const sync=()=>{
   const frame=document.querySelector(selector);
   if(!frame)return;
   if(!frame.dataset.tourAutoplay||active&&!frame.dataset.tourStarted){
    const url=new URL(frame.src);url.searchParams.set('mute','1');url.searchParams.set('autoplay',active?'1':'0');url.searchParams.set('origin',location.origin);frame.src=url.href;frame.dataset.tourAutoplay='true';if(active)frame.dataset.tourStarted='true';
   }
   frame.contentWindow?.postMessage(JSON.stringify({event:'listening',id:'tour-video'}),'https://www.youtube.com');
   command(frame,'addEventListener',['onStateChange']);command(frame,'mute');command(frame,active?'playVideo':'pauseVideo');
  };
  const report=event=>{
   const frame=document.querySelector(selector);
   if(!frame||event.source!==frame.contentWindow||event.origin!=='https://www.youtube.com')return;
   try{const data=typeof event.data==='string'?JSON.parse(event.data):event.data;const state=data.event==='onStateChange'?data.info:data.info?.playerState;if(typeof state==='number')frame.dataset.tourPlayerState=String(state)}catch{}
  };
  window.addEventListener('message',report);sync();const timer=setInterval(sync,800);
  return()=>{clearInterval(timer);window.removeEventListener('message',report)};
 },[playbackScene,active]);
}
