// @ts-nocheck -- uses the desktop TipTap instance and editor state setters.
import {useContext,useEffect,useLayoutEffect,useRef} from 'react';
import {TourContext} from './useNativeMapTour';
import {DOMParser as SchemaDOMParser} from '@tiptap/pm/model';
import {TextSelection} from '@tiptap/pm/state';
import {notePlan} from './project';
export {canCommitTourNote} from './project';

export function useTourEditor(editor,noteId,setToolsExpanded,dirtyRef){
 const {time}=useContext(TourContext);
 const applied=useRef({editor:null,body:'',action:'',expanded:false});
 const plan=notePlan(noteId,time);
 useLayoutEffect(()=>{if(!plan)dirtyRef.current=false},[Boolean(plan),dirtyRef]);
 // Editor focus must never scroll the React Flow viewport or its ancestors.
 useEffect(()=>{
  if(!editor)return;
  const previous=editor.view.props.handleScrollToSelection;
  editor.view.setProps({handleScrollToSelection:()=>true});
  return()=>{if(!editor.isDestroyed)editor.view.setProps({handleScrollToSelection:previous})};
 },[editor]);
 useEffect(()=>{
  if(!editor||!plan)return;
  if(applied.current.editor!==editor)applied.current={editor,body:'',action:'',expanded:false};
  const state=applied.current;
  // The record and node remain stable throughout typing. Only TipTap updates;
  // no snapshot replacement, editor remount, focus loop, or camera reset.
  const syncBody=()=>{
   const source=document.createElement('div');source.innerHTML=plan.body;
   const next=SchemaDOMParser.fromSchema(editor.schema).parse(source);
   const current=editor.state.doc;
   const from=current.content.findDiffStart(next.content);
   if(from!==null){
    const end=current.content.findDiffEnd(next.content)||{a:from,b:from};
    const overlap=from-Math.min(end.a,end.b);
    if(overlap>0){end.a+=overlap;end.b+=overlap}
    const transaction=editor.state.tr.replace(from,end.a,next.slice(from,end.b));
    transaction.setSelection(TextSelection.near(transaction.doc.resolve(Math.min(end.b,transaction.doc.content.size))));
    editor.view.dispatch(transaction);
   }
   state.body=plan.body;
  };
  if(state.body!==plan.body)syncBody();
  const frame=requestAnimationFrame(()=>{
   if(editor.isDestroyed)return;
   if(state.expanded!==plan.expanded){
    const label=plan.expanded?'Expand note tools':'Collapse note tools';
    const button=document.querySelector(`[aria-label="${label}"]`);
    if(button)button.click();else setToolsExpanded(plan.expanded);
    state.expanded=plan.expanded;
   }
   if(!plan.action)state.action='';
   if(plan.action&&state.action!==plan.action){
    const button=document.querySelector(`[aria-label="${plan.action}"]`);
    if(button){button.click();syncBody();state.action=plan.action;editor.view.dom.dataset.tourLastTool=plan.action}
   }
  });
  return()=>cancelAnimationFrame(frame);
 },[editor,noteId,plan?.body,plan?.expanded,plan?.action,setToolsExpanded]);
}
