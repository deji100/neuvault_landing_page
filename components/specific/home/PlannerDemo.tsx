"use client";
import { FileText, MousePointer2, Pause, Play, RotateCcw } from "lucide-react";
import PlannerInterface from "./planner/PlannerInterface";
import { PLANNER_DURATION, usePlannerTour } from "./planner/usePlannerTour";
import DemoViewer from "./DemoViewer";
import styles from "./CaptureDemo.module.css";
import plannerStyles from "./planner/PlannerDemo.module.css";
export default function PlannerDemo() {
    const tour = usePlannerTour();
    return <section className={styles.section} id="planner-demo" ref={tour.sectionRef} aria-labelledby="planner-demo-title">
  <div className={styles.heading}><p className={styles.eyebrow}><span>02</span> PLANNER</p><h2 id="planner-demo-title">Plan your next step.<br /><span>Keep the files attached.</span></h2><p>Schedule tasks and events with notes and files attached. Ask Nova to help update your plan; you confirm the changes.</p></div>
  <DemoViewer label="Planner"><div className={styles.demoTop}><span><i className={styles.liveDot}/>Inside NeuVault Planner</span><span className={styles.demoLabel}>One request · Several changes</span></div><div className={styles.viewport} ref={tour.viewportRef} style={{ height: 1080 * tour.scale }}><div className={`nv-capture-desktop ${styles.canvas}`} ref={tour.canvasRef} style={{ transform: `scale(${tour.scale})` }}>
   <PlannerInterface active={tour.active} time={tour.time} view={tour.view} dialog={tour.dialog} picker={tour.picker} moved={tour.moved} stage={tour.stage} dragging={tour.dragging} showView={tour.showView} seek={tour.seek}/>
   {tour.dragging && <div className={plannerStyles.dragCard} aria-hidden="true" style={{ left: tour.cursor.x + 14, top: tour.cursor.y + 14 }}><strong>Review API architecture</strong><span>Nov {tour.moved ? 10 : 9} · 10:00 AM</span><small><FileText size={13}/>2 connected items</small></div>}
   {!tour.reduced && <div className={styles.cursor} aria-hidden="true" style={{ left: tour.cursor.x, top: tour.cursor.y }}><MousePointer2 size={30} fill="white" stroke="#101113" strokeWidth={1.5}/>{tour.clicking && <span />}</div>}
  </div></div><div className={styles.playback}><button type="button" onClick={() => tour.time >= PLANNER_DURATION ? tour.seek(0, true) : tour.setPlaying(!tour.playing)} aria-label={tour.playing ? "Pause Planner tour" : tour.time >= PLANNER_DURATION ? "Restart Planner tour" : "Play Planner tour"}>{tour.playing ? <Pause size={16}/> : <Play size={16}/>}</button><input type="range" aria-label="Planner tour progress" min={0} max={PLANNER_DURATION} step={100} value={tour.time} onChange={e => tour.seek(Number(e.target.value))}/><span>{Math.floor(tour.time / 1000).toString().padStart(2, "0")} / {PLANNER_DURATION / 1000}s</span><button type="button" onClick={() => tour.seek(0, true)} aria-label="Replay Planner tour"><RotateCcw size={16}/></button></div></DemoViewer>
 </section>;
}
