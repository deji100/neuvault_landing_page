"use client";
import { useDemoFocus } from "@/components/general/demoFocus";
import { useDemoScale } from "../useDemoScale";
import { useCallback, useEffect, useRef, useState } from "react";
import { REMINDER_DURATION } from "./reminderProject";

export function useReminderTour() {
 const sectionRef=useRef<HTMLElement>(null), viewportRef=useRef<HTMLDivElement>(null), canvasRef=useRef<HTMLDivElement>(null);
 const scale=useDemoScale(viewportRef);
 const visible=useDemoFocus("reminders-demo",viewportRef);
 const clock=useRef(0);
 const [time,setTime]=useState(0), [playing,setPlaying]=useState(true), [reduced,setReduced]=useState(false);
 const [tabVisible,setTabVisible]=useState(true);
 const active=playing&&visible&&tabVisible;
 const seek=useCallback((value:number,resume=false)=>{
  if(!Number.isFinite(value)) return;
  clock.current=Math.max(0,Math.min(REMINDER_DURATION,value));
  setTime(clock.current);
  setPlaying(resume);
 },[]);
 useEffect(()=>{
  const visibility=()=>setTabVisible(!document.hidden);
  visibility();document.addEventListener("visibilitychange",visibility);
  const mq=matchMedia("(prefers-reduced-motion: reduce)");
  const update=()=>{setReduced(mq.matches);if(mq.matches) seek(REMINDER_DURATION)};
  update();mq.addEventListener("change",update);
  return()=>{document.removeEventListener("visibilitychange",visibility);mq.removeEventListener("change",update);};
 },[seek]);
 useEffect(()=>{
  if(!playing||!visible) return;
  let frame:number,previous=0;
  const tick=(now:number)=>{
   if(document.hidden) previous=0;
   else {
    if(previous){clock.current=Math.min(REMINDER_DURATION,clock.current+Math.min(now-previous,80));setTime(clock.current)}
    previous=now;
   }
   if(clock.current>=REMINDER_DURATION){setPlaying(false);return}
   frame=requestAnimationFrame(tick);
  };
  frame=requestAnimationFrame(tick);
  return()=>cancelAnimationFrame(frame);
 },[playing,visible]);
 return {sectionRef,viewportRef,canvasRef,time,playing,setPlaying,scale,reduced,seek,active};
}
export type ReminderTourState=ReturnType<typeof useReminderTour>;
