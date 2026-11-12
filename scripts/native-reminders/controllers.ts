// @ts-nocheck -- adapters only: desktop JSX remains byte-for-byte unchanged.
import {createContext,useContext,useEffect,useRef} from 'react';
import {dataAt,setTime} from './project';
import {REMINDER_REASON,REMINDER_DATE} from '../../components/specific/home/reminders/reminderProject';
export const ReminderContext=createContext({time:0,active:false,reduced:false});
export function useReminderPageTour(c){
 const {time}=useContext(ReminderContext),phase=time>=35800?'done':time>=26000?'saved':'initial';
 useEffect(()=>{setTime(time)},[time]);
 useEffect(()=>{const data=dataAt(time);c.setSuggestions(data.suggestions);c.setManualSuggestions(data.manual);c.setIntakeRecords(new Map(data.records.map(record=>[record.id,record])));c.setIsLoadingData(false);c.setCandidateCount(5);c.setCandidatesWithFutureCount(2);c.setError(null);c.setShowRemindersInfo(false);c.setDueExpanded(true);
  if(time>=30000&&time<35800){requestAnimationFrame(()=>requestAnimationFrame(()=>{
   const row=Array.from(document.querySelectorAll('.attention-v2-reminder')).find(row=>row.textContent.includes('Japan travel bookings'));
   if(!row)return;let parent=row.parentElement;
   while(parent&&parent!==document.body){if(parent.scrollHeight>parent.clientHeight+5&&/auto|scroll/.test(getComputedStyle(parent).overflowY)){const a=row.getBoundingClientRect(),b=parent.getBoundingClientRect();parent.scrollTo({top:parent.scrollTop+a.top-b.top-90,behavior:'smooth'});break}parent=parent.parentElement}
  }))}
 },[phase,time>=30000]);
 useEffect(()=>{
  if(time<35000||time>=35800)return;
  let parent=document.querySelector('.attention-v2-reminder')?.parentElement;
  while(parent&&parent!==document.body){if(parent.scrollHeight>parent.clientHeight+5&&/auto|scroll/.test(getComputedStyle(parent).overflowY)){parent.scrollTo({top:0,behavior:'smooth'});break}parent=parent.parentElement}
 },[time>=35000]);
 useEffect(()=>{
  if(time<35600||time>=35800)return;
  const row=Array.from(document.querySelectorAll('.attention-v2-reminder')).find(row=>row.textContent.includes('Pay the studio invoice'));
  const button=Array.from(row?.querySelectorAll('button')||[]).find(button=>button.textContent.trim()==='Mark done');
  button?.click();
 },[time]);
}
export function useReminderDetailsTour(c){
 const {time}=useContext(ReminderContext),previous=useRef(-1);
 useEffect(()=>{
  if(c.item.id==='passport'){c.setActiveSection(time>=9500?'resurface':null);return}
  if(c.item.id!=='japan')return;
  c.setActiveSection(time>=17500&&time<28000?'resurface':null);
  c.setImportance(time>=18000?'high':null);
  c.setImportanceReason(time>=19000?REMINDER_REASON.slice(0,Math.max(0,Math.floor((time-19000)/24))):'');
  c.setResurfaceCadence(null);
  c.setResurfaceType(time>=22000?'once':null);
   for(const [at,type,value] of [[22000,'date','2026-11-19'],[24000,'time','15:30']]){
    if(previous.current<at&&time>=at&&time<at+300){
     const input=document.querySelector('.desktop-resurface-date-field input[type="'+type+'"]');
     if(input){input.focus({preventScroll:true});Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,value);input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}))}
    }
   }
  c.setNextResurfaceAt(time>=24000?REMINDER_DATE:time>=22000?'2026-11-19T09:00:00+01:00':null);
  c.setReminderSaveState(time>=24000&&time<24400?'saving':'saved');
  const frame=requestAnimationFrame(()=>{
   const reason=document.querySelector('.desktop-resurface-reason');
   if(time>=19000&&time<22000)reason?.focus({preventScroll:true});
   if(time>=22000&&time<22300)reason?.blur();
   const clicks=[[18000,'high']];
   for(const [at,label] of clicks)if(previous.current<at&&time>=at&&time<at+300){const button=Array.from(document.querySelectorAll('.desktop-resurface-pill')).find(b=>b.textContent.trim().toLowerCase()===label);button?.click()}
   previous.current=time;
  });return()=>cancelAnimationFrame(frame);
 },[time,c.item.id]);
}
