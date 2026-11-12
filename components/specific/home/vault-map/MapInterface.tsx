"use client";
import {useEffect,useRef} from "react";
import nativeBuild from "@/public/desktop-tour/vault-map/source-manifest.json";
import {frameCamera,MAP_DURATION} from "./mapProject";
import type {MapTourState} from "./useMapTour";

export default function MapInterface({tour}:{tour:MapTourState}){
 const {time,reduced,seek,active}=tour;
 const frame=useRef<HTMLIFrameElement>(null);
 const latest=useRef({time,reduced,active});latest.current={time,reduced,active};
 useEffect(()=>{frame.current?.contentWindow?.postMessage({type:"nv-map-time",time,reduced,active},location.origin)},[time,reduced,active]);
 useEffect(()=>{
  const receive=(event:MessageEvent)=>{
   if(event.origin!==location.origin||event.source!==frame.current?.contentWindow)return;
   if(event.data?.type==="nv-map-ready")frame.current?.contentWindow?.postMessage({type:"nv-map-time",...latest.current},location.origin);
   if(event.data?.type==="nv-map-seek"&&Number.isFinite(event.data.time))seek(Math.max(0,Math.min(MAP_DURATION,event.data.time)));
  };
  window.addEventListener("message",receive);return()=>window.removeEventListener("message",receive);
 },[seek]);
 const camera=frameCamera(time,reduced);
 return <iframe tabIndex={-1} allow="autoplay; fullscreen; picture-in-picture" ref={frame} title="NeuVault desktop Vault Map demonstration" src={`/desktop-tour/vault-map/index.html?v=${nativeBuild.version}`} loading="lazy" style={{width:1600,height:1080,border:0,display:"block",pointerEvents:"none",transformOrigin:"0 0",transform:`translate(${camera.x}px,${camera.y}px) scale(${camera.zoom})`,transition:reduced?"none":"transform 350ms cubic-bezier(.2,.7,.2,1)"}}/>;
}
