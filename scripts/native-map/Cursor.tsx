import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {MousePointer2} from 'lucide-react';
const PATH:[number,string][]=[
 [0,'saved'],[2000,'saved'],[3500,'preview-edit'],[5000,'preview-edit'],[6500,'edit-in-map'],[8000,'saved-body'],[8500,'expand-tools'],[9000,'heading'],[10500,'bold'],[11500,'bullets'],[13000,'saved-body'],[17500,'saved-body'],[18700,'save-edit'],
 [20500,'add'],[21500,'menu-upload'],[22600,'upload-save'],[24000,'upload-save'],[26000,'kyoto'],[27400,'image-expand'],[28300,'image-close'],[30000,'pdf'],[31300,'preview-close'],
 [32300,'add'],[32800,'menu-youtube'],[33600,'link-save'],[38400,'link-save'],[39700,'video-play'],[40200,'video'],[44200,'video'],
 [46300,'add'],[46800,'menu-web'],[47600,'link-save'],[50900,'link-save'],[52100,'web'],[53100,'preview-expand'],[57800,'preview-close'],
 [60300,'add'],[61100,'menu-note'],[62500,'design-title'],[64000,'design-body'],[64500,'expand-tools'],[65000,'heading'],[67500,'bold'],[69000,'design-body'],[76000,'design-body'],[77000,'table'],[82000,'design-body'],[84700,'design-body'],
 [86400,'add'],[87200,'menu-sticky'],[88500,'milestone-title'],[90500,'expand-tools'],[92000,'milestone-body'],[94500,'milestone-body'],[95500,'note-green'],[96500,'milestone-body'],
 [99000,'pdf-handle'],[100000,'pdf-handle'],[102000,'design-target'],[104000,'design-handle'],[106000,'milestone-target'],
 [108400,'view'],[109200,'menu-split'],[110000,'video'],[110800,'design-card'],[112000,'split-video'],[114000,'split-note'],[115000,'bullets'],[118000,'split-note'],[127500,'split-close'],[128500,'travel-day'],[129000,'travel-day'],[129600,'merge-target'],[130000,'design-card'],[130400,'kyoto'],[130800,'kyoto'],[131400,'photo-target'],[132000,'design-body'],[133500,'research-note'],[134000,'research-web'],[135000,'group-name'],[137500,'group-color'],[138500,'group-save'],[139500,'design-card'],
 [140200,'nova-open'],[142000,'nova-compose'],[146700,'nova-send'],[151000,'nova-proposal'],[155600,'nova-confirm'],[158500,'nova-close'],[161000,'design-body'],
 [163400,'share'],[165500,'menu-export'],[169000,'export-scope'],[173000,'export-confirm'],[177000,'design-card'],[178000,'design-card'],
];

// Measure in the embedded document: desktop body portals and React Flow transforms
// have already been applied here, so cursor and controls share one coordinate space.
const selectors: Record<string,string> = {
 'research-note':'.react-flow__node[data-id="saved-note"]','research-web':'.react-flow__node[data-id="web"]',
 'group-name':'.linked-map-group-composer-input','group-color':'[aria-label="Use group color #42a5b3"]','group-save':'[aria-label="Create group"]',
 saved:'.react-flow__node[data-id="saved-note"]',
 'preview-edit':'.document-view-modal [aria-label="Edit note"]',
 'saved-body':'[data-map-note-id="saved-edit"] .ProseMirror',
 'save-edit':'[data-map-note-id="saved-edit"] [aria-label="Save edited note"]',
 'expand-tools':'[aria-label="Expand note tools"], [aria-label="Collapse note tools"]',
 heading:'[aria-label="Heading 2"]',bold:'[aria-label="Bold"]',table:'[aria-label="Insert table"]',bullets:'[aria-label="Bullet list"]',
 'upload-save':'.linked-map-upload-dialog .is-primary',
 kyoto:'.react-flow__node[data-id="kyoto"]',pdf:'.react-flow__node[data-id="pdf"]',
 'image-expand':'.react-flow__node[data-id="kyoto"] button[title="Expand image"]',
 'image-close':'[aria-label="Close expanded image"]',
 'preview-expand':'[aria-label="Expand document view"]',
 'design-card':'.react-flow__node[data-id="design"]',
 'travel-day':'.react-flow__node[data-id="travel-day"]',
 'merge-target':'[data-map-note-id="design"] .linked-map-note-content-render',
 'photo-target':'[data-map-note-id="design"] .linked-map-note-content-render h2',
 'split-video':'.linked-map-split-document-pane .youtube-inline-viewer',
 'nova-proposal':'.map-ai-proposal-preview',
 add:'[aria-label="Add tools"]',
 'note-green':'[data-map-note-id="milestones"] [aria-label="Use note color #dff6e8"]',
 url:'.linked-map-youtube-dialog input',
 'link-save':'.linked-map-youtube-dialog button[type="submit"]',
 video:'.react-flow__node[data-id="video"]',web:'.react-flow__node[data-id="web"]',
 'video-play':'.react-flow__node[data-id="video"] .desktop-vault-card-play',
 'preview-close':'[aria-label="Close preview"]',
 'design-title':'[data-map-note-id="design"] [aria-label="Note title"]',
 'design-body':'[data-map-note-id="design"] .tiptap, [data-map-note-id="design"] .linked-map-note-content-render',
 'milestone-title':'[data-map-note-id="milestones"] [aria-label="Note title"]',
 'milestone-body':'[data-map-note-id="milestones"] .tiptap, [data-map-note-id="milestones"] .linked-map-note-content-render',
 'pdf-handle':'.react-flow__node[data-id="pdf"] .source',
 'design-target':'.react-flow__node[data-id="design"] .target',
 'design-handle':'.react-flow__node[data-id="design"] .source',
 'milestone-target':'.react-flow__node[data-id="milestones"] .target',
 view:'[aria-label="View tools"]','menu-split':'[data-map-split-action]',
 milestones:'.react-flow__node[data-id="milestones"]',
 'split-note':'.linked-map-split-note-pane', 'split-close':'[aria-label="Close split mode"]',
 'nova-open':'[aria-label="Ask Nova"]','nova-compose':'.map-ai-composer textarea',
 'nova-send':'[aria-label="Send to Nova"]','nova-confirm':'.map-ai-action-confirm .is-primary',
 'nova-close':'[aria-label="Close Nova Map"]',share:'[aria-label="Import and export tools"]',
 'menu-export':'[data-map-export-action]','export-scope':'.linked-map-export-scope button',
 'export-confirm':'.linked-map-export-actions .is-export','ai-card':'.linked-map-ai-output-node',
};
// Resolve menu actions by their visible intent. Icon aliases and option order
// can change in the desktop app without changing what the tour demonstrates.
const menuLabels: Record<string,string> = {
 'edit-in-map':'Edit here in the map',
 'menu-upload':'Upload files', 'menu-youtube':'YouTube link',
 'menu-web':'Webpage bookmark', 'menu-note':'Note', 'menu-sticky':'Sticky note',
};
function targetElement(name:string, selector?:string) {
 const label=menuLabels[name];
 if(label)return Array.from(document.querySelectorAll<HTMLElement>('[role="menuitem"]')).find(element=>element.textContent?.trim()===label&&element.getClientRects().length>0);
 return selector?document.querySelector<HTMLElement>(selector):null;
}
export default function Cursor({time, reduced}:{time:number; reduced:boolean}) {
 const positions=useRef<Record<string,{x:number;y:number}>>({});
 const [point,setPoint]=useState({x:1000,y:40});
 const drag=useRef<{source:string;point:{x:number;y:number}}|null>(null);
 const connecting=time>=101400&&time<102000||time>=105400&&time<106000;
 useEffect(()=>{
  const source=time<103000?'pdf-handle':'design-handle';
  const mouse=(name:string,point:{x:number;y:number})=>new MouseEvent(name,{bubbles:true,cancelable:true,view:window,button:0,buttons:name==='mouseup'?0:1,clientX:point.x,clientY:point.y});
  if(!reduced&&connecting){
   if(drag.current?.source!==source){
    if(drag.current)document.dispatchEvent(mouse('mouseup',drag.current.point));
    const handle=document.querySelector(selectors[source]);
    if(handle){const rect=handle.getBoundingClientRect();handle.dispatchEvent(mouse('mousedown',{x:rect.left+rect.width/2,y:rect.top+rect.height/2}));drag.current={source,point}}
   }
   document.dispatchEvent(mouse('mousemove',point));
   if(drag.current)drag.current.point=point;
  }else if(drag.current){document.dispatchEvent(mouse('mouseup',drag.current.point));drag.current=null}
 },[connecting,time,point,reduced]);
 useLayoutEffect(()=>{
  const measure=()=>{
   for(const name of [...Object.keys(selectors),...Object.keys(menuLabels)]) {
    if((name==='merge-target'||name==='photo-target')&&positions.current[name])continue;
    const element=targetElement(name,selectors[name]);
    if(!element) continue;
    const rect=element.getBoundingClientRect();
    if(rect.width && rect.height) positions.current[name]={x:rect.left+Math.min(rect.width/2,130),y:rect.top+Math.min(rect.height/2,80)};
   }
   const dragged=time>=129000&&time<129700?document.querySelector<HTMLElement>('.react-flow__node[data-id="travel-day"]'):time>=130800&&time<131500?document.querySelector<HTMLElement>('.react-flow__node[data-id="kyoto"]'):null;
   if(dragged?.dataset.tourDragX&&dragged.dataset.tourDragY){const point={x:Number(dragged.dataset.tourDragX),y:Number(dragged.dataset.tourDragY)};positions.current[time<129700?'merge-target':'photo-target']=point;setPoint(point);return}
   let index=PATH.findIndex(([at])=>at>time);
   if(index<0) index=PATH.length-1;
   const a=PATH[Math.max(0,index-1)],b=PATH[index];
   const start=positions.current[a[1]]??positions.current[b[1]]??{x:1000,y:40};
   const end=positions.current[b[1]]??start;
   const travelMs=['design-target','milestone-target'].includes(b[1])?600:450;
   const moveAt=Math.max(a[0],b[0]-travelMs);
   const progress=moveAt===b[0]?1:Math.max(0,Math.min(1,(time-moveAt)/(b[0]-moveAt)));
   const eased=progress*progress*(3-2*progress);
   setPoint({x:start.x+(end.x-start.x)*eased,y:start.y+(end.y-start.y)*eased});
  };
  measure();
  let frame=requestAnimationFrame(measure);
  const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(measure)};
  const observer=new MutationObserver(schedule);
  observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['data-tour-drag-x','data-tour-drag-y']});
  window.addEventListener('linked-map-viewport-changed',schedule);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('linked-map-viewport-changed',schedule)};
 },[time]);
 const clicking=[2000,5000,6500,8500,9000,10500,11500,18700,20500,21500,24000,27400,28300,31300,32300,32800,38400,39700,46300,46800,50900,53100,57800,60300,61100,64500,65000,67500,77000,86400,87200,90500,95500,108400,109200,110000,110800,115000,127500,133500,134000,137500,138500,139500,140200,146700,155600,158500,163400,165500,173000].some(at=>time>=at&&time<at+170);
 if(reduced) return null;
 return <div className="nv-map-tour-cursor" aria-hidden="true" style={{left:point.x,top:point.y}}><MousePointer2 size={30} fill="white" stroke="#101113" strokeWidth={1.5}/>{clicking&&<span/>}</div>;
}
