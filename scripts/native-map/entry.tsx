import {useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import LinkedDocumentMapView from '@desktop/src/features/linked-document-map/LinkedDocumentMapView';
import {DesktopThemeProvider} from '@desktop/src/lib/desktopTheme';
import '@desktop/src/styles.css';
import '@desktop/src/document-preview.css';
import '@desktop/src/linked-share-help.css';
import '@desktop/src/isolated-controls.css';
import '@desktop/src/notes-voice-workspace.css';
import '@desktop/src/build-with-us.css';
import '@desktop/src/nova-assistant-workspace.css';
import {MAP_DURATION} from '../../components/specific/home/vault-map/mapProject';
import {projectGroup} from './project';
import {TourContext} from './useNativeMapTour';
import Cursor from './Cursor';
import '../../.native-map-build/editor-parity.css';
import './frame.css';
import {installBrowserWebview} from './browserWebview';
import {installLocalFiles} from './localFiles';
installLocalFiles();
installBrowserWebview();
// Only the parent playback controls are interactive. Scripted native clicks,
// editor commands and drag events remain available to the tour controller.
for(const name of ['pointerdown','mousedown','click','dblclick','keydown','beforeinput','dragstart','drop']){
 window.addEventListener(name,event=>{if(event.isTrusted){event.preventDefault();event.stopImmediatePropagation()}},{capture:true});
}

function App(){
 const [state,setState]=useState({time:0,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,active:false});
 useEffect(()=>{
  const receive=(event:MessageEvent)=>{
   if(event.source!==parent||event.origin!==location.origin||event.data?.type!=='nv-map-time'||!Number.isFinite(event.data.time))return;
   setState({time:Math.max(0,Math.min(MAP_DURATION,event.data.time)),reduced:Boolean(event.data.reduced),active:Boolean(event.data.active)});
  };
  window.addEventListener('message',receive);
  parent.postMessage({type:'nv-map-ready'},location.origin);
  return()=>window.removeEventListener('message',receive);
 },[]);
 return <TourContext.Provider value={state}><DesktopThemeProvider>
  <div data-tour-time={state.time} className="desktop-linked-page linked-map-workspace fixed inset-0 z-[500] flex h-screen w-screen">
   <LinkedDocumentMapView group={projectGroup} userEmail="landing-tour@example.invalid" onBack={()=>{}} onAddLinkedDocuments={()=>{}}/>
  </div>
  <Cursor {...state}/>
 </DesktopThemeProvider></TourContext.Provider>;
}
createRoot(document.getElementById('root')!).render(<App/>);
