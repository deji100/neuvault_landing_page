// @ts-nocheck -- native desktop types and IO are supplied by the bundle adapter.
import {useEffect,useRef,useState} from 'react';import {createRoot} from 'react-dom/client';
import SmartSuggestionsPage from '@desktop/src/pages/SmartSuggestionsPage';
import AppSidebar from '@desktop/src/components/layout/AppSidebar';
import GlobalIntakePreview from '@desktop/src/components/intake/GlobalIntakePreview';
import VaultSubgroupDocumentCard from '@desktop/src/components/vault/VaultSubgroupDocumentCard';
import DesktopVaultBrowserHeader from '@desktop/src/components/layout/DesktopVaultBrowserHeader';
import {DesktopThemeProvider} from '@desktop/src/lib/desktopTheme';
import {installIconAnimationSync} from '../../components/specific/home/capture/sidebarIconSync';
installIconAnimationSync();
import '@desktop/src/styles.css';import '@desktop/src/document-preview.css';import '@desktop/src/isolated-controls.css';import '@desktop/src/notes-voice-workspace.css';
import {REMINDER_DURATION,REMINDER_BASE_TIME,reminderDocumentAt,reminderPageAt} from '../../components/specific/home/reminders/reminderProject';
import {ReminderContext} from './controllers';import {dataAt,setTime} from './project';import Cursor from './Cursor';import './frame.css';
const user={id:'tour',name:'Alex',username:'Alex',email:'reminder-tour@example.invalid'};
const RealDate=Date,base=new RealDate(REMINDER_BASE_TIME).getTime();let clock=0;
class TourDate extends RealDate{constructor(...args){super(...(args.length?args:[base+clock]))}static now(){return base+clock}}
window.Date=TourDate;
localStorage.setItem('updv-desktop:sidebar-collapsed','false');localStorage.setItem('neuvault:reminders-info:v1:reminder-tour','seen');
for(const name of ['pointerdown','mousedown','click','dblclick','keydown','beforeinput','dragstart','drop'])window.addEventListener(name,event=>{if(event.isTrusted){event.preventDefault();event.stopImmediatePropagation()}},{capture:true});
function App(){
 const [state,setState]=useState({time:0,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,active:false});
 const [page,setPage]=useState('smart-suggestions'),[openDoc,setOpenDoc]=useState(null);const latest=useRef(state);latest.current=state;
 useEffect(()=>{const receive=event=>{if(event.source!==parent||event.origin!==location.origin||event.data?.type!=='nv-reminder-time'||!Number.isFinite(event.data.time))return;const time=Math.max(0,Math.min(REMINDER_DURATION,event.data.time));clock=time;setTime(time);setState({time,reduced:Boolean(event.data.reduced),active:Boolean(event.data.active)})};window.addEventListener('message',receive);parent.postMessage({type:'nv-reminder-ready'},location.origin);return()=>window.removeEventListener('message',receive)},[]);
 const docId=reminderDocumentAt(state.time),nextPage=reminderPageAt(state.time);
 useEffect(()=>{setOpenDoc(docId?dataAt(state.time).records.find(record=>record.id===docId):null)},[docId]);
 useEffect(()=>setPage(nextPage),[nextPage]);
 useEffect(()=>{const open=event=>setOpenDoc(event.detail);window.addEventListener('tour-open-document',open);return()=>window.removeEventListener('tour-open-document',open)},[]);
 return <ReminderContext.Provider value={state}><DesktopThemeProvider><div className="desktop-app-root relative h-screen overflow-hidden" data-demo-active={state.active} data-reminder-time={state.time} data-reminder-page={page}><main className="relative z-10 flex h-screen overflow-hidden"><AppSidebar user={user} onSignOut={()=>{}} activeKey={page} onNavigate={setPage}/><section className="desktop-shell-content min-w-0 h-screen flex-1 overflow-hidden">
  {page==='smart-suggestions'?<SmartSuggestionsPage user={user} onSignOut={()=>{}} onNavigate={setPage} shellless/>:<div className="desktop-vault-page reminder-demo-vault"><DesktopVaultBrowserHeader title="Japan" summary="Your travel documents, kept together."/><div className="desktop-vault-subgroup-document-grid grid gap-4 xl:grid-cols-2 reminder-demo-documents">{dataAt(state.time).records.filter(record=>['japan','insurance','passport'].includes(record.id)).map(record=><VaultSubgroupDocumentCard key={record.id} documentId={record.id} title={record.title} documentTypeLabel="PDF" onOpen={()=>setOpenDoc(record)} onDetails={()=>setOpenDoc(record)}/>)}</div></div>}
 </section></main><GlobalIntakePreview item={openDoc} open={Boolean(openDoc)} onClose={()=>setOpenDoc(null)}/></div><Cursor {...state}/></DesktopThemeProvider></ReminderContext.Provider>
}
createRoot(document.getElementById('root')!).render(<App/>);
