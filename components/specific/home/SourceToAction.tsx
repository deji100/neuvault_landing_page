"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, BriefcaseBusiness, Code2, FolderHeart, Lightbulb, Link2, Pause, Play, Search, type LucideIcon } from "lucide-react";
import { featuredWorkflows, type Workflow } from "@/lib/workflows";
import { emitMarketingEvent, setMarketingWorkflow } from "@/lib/marketing-events";
import WorkflowIllustration, { workflowHeadlines } from "./WorkflowIllustration";
import styles from "./SourceToAction.module.css";

const outcomeIcons: Record<string, LucideIcon> = {
  "study-smarter": BookOpen, "organize-research": Search, "manage-work": BriefcaseBusiness,
  "develop-ideas": Lightbulb, "organize-my-life": FolderHeart, "build-projects": Code2,
};
const demoLabels = { capture: "capture", "vault-map-demo": "Vault Map", "planner-demo": "Planner", "reminders-demo": "reminders" };
const SLIDE_DURATION = 7200;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Automatic playback is presentation only; analytics counts deliberate navigation. */
function WorkflowCarousel({ workflow, surface }: { workflow: Workflow; surface: "home" | "use_case" }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const elapsed = useRef(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const visibleRecorded = useRef(false);
  const visited = useRef(new Set<number>());
  const completed = useRef(false);
  const inView = useInView(carouselRef, { amount: 0.25 });
  const reducedMotion = usePrefersReducedMotion();
  const step = workflow.steps[active];
  const animate = playing && inView && pageVisible && !reducedMotion;
  const advance = animate && !hovered && !focused;

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (!inView || visibleRecorded.current) return;
    visibleRecorded.current = true;
    emitMarketingEvent({ event: "workflow_visible", workflow_id: workflow.id, surface });
  }, [inView, surface, workflow.id]);

  useEffect(() => {
    elapsed.current = 0;
    progressRef.current?.style.setProperty("transform", "scaleX(0)");
  }, [active]);

  useEffect(() => {
    if (!advance) return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      elapsed.current += now - previous;
      previous = now;
      progressRef.current?.style.setProperty("transform", `scaleX(${Math.min(elapsed.current / SLIDE_DURATION, 1)})`);
      if (elapsed.current >= SLIDE_DURATION) {
        elapsed.current = 0;
        setActive(index => (index + 1) % workflow.steps.length);
      }
    }, 50);
    return () => window.clearInterval(timer);
  }, [advance, active, workflow.steps.length]);

  const recordStep = (index: number) => {
    if (visited.current.has(index)) return;
    visited.current.add(index);
    setMarketingWorkflow(workflow.id);
    emitMarketingEvent({ event: "workflow_step_viewed", workflow_id: workflow.id, step: workflow.steps[index].stage, step_number: index + 1, surface });
    if (visited.current.size === workflow.steps.length && !completed.current) {
      completed.current = true;
      emitMarketingEvent({ event: "workflow_completed", workflow_id: workflow.id, surface });
    }
  };
  const navigate = (index: number) => {
    recordStep(active);
    recordStep(index);
    elapsed.current = 0;
    progressRef.current?.style.setProperty("transform", "scaleX(0)");
    setActive(index);
  };
  const move = (direction: number) => navigate((active + direction + workflow.steps.length) % workflow.steps.length);
  const keyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
    if (event.key === "Home") { event.preventDefault(); navigate(0); }
    if (event.key === "End") { event.preventDefault(); navigate(workflow.steps.length - 1); }
  };
  const swipe = (event: TouchEvent<HTMLDivElement>) => {
    const origin = touch.current;
    touch.current = null;
    const end = event.changedTouches[0];
    if (!origin || !end) return;
    const dx = end.clientX - origin.x, dy = end.clientY - origin.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
  };

  return (
    <div id="selected-workflow" ref={carouselRef} className={styles.carousel} role="region" aria-roledescription="carousel" aria-label={`${workflow.label}: from capture to action`} onKeyDown={keyboard} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }} data-carousel-playing={advance} data-active-step={active + 1}>
      <div className={styles.carouselTop}><span><i /> {workflow.label}</span><span>ONE CONNECTED WORKFLOW</span></div>
      <div className={styles.stage} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onTouchStart={event => { const first = event.touches[0]; touch.current = { x: first.clientX, y: first.clientY }; }} onTouchEnd={swipe}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div id="workflow-detail" className={styles.slide} key={`${workflow.id}-${active}`} initial={reducedMotion ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }} transition={{ duration: reducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }} role="group" aria-roledescription="slide" aria-label={`${active + 1} of 5: ${step.stage}`}>
            <div className={styles.copy} aria-live={advance ? "off" : "polite"} aria-atomic="true">
              <p className={styles.stepLabel}><span>0{active + 1}</span> {step.stage}</p>
              <h3>{workflowHeadlines[workflow.id][active].split("\n").map((line, index) => <span key={index}>{line}</span>)}</h3>
              <p className={styles.description}>{step.copy}</p>
              {workflow.reminder && active === 3 && <p className={styles.reminderNote}>Reminders bring important dates back. Planner tasks organize work you choose to do.</p>}
              <div className={styles.demoLinks}>
                {workflow.reminder && active === 3 && <Link href="/#reminders-demo">See Reminders <ArrowRight size={15} aria-hidden="true" /></Link>}
                <Link href={`/#${step.demo}`}>See {demoLabels[step.demo]} in NeuVault <ArrowRight size={15} aria-hidden="true" /></Link>
              </div>
            </div>
            <div className={styles.visual}><WorkflowIllustration workflow={workflow} stage={active} animate={animate} /></div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.carouselBottom}>
        <ol className={styles.steps} aria-label={`${workflow.label} workflow steps`}>
          {workflow.steps.map(({ stage }, index) => <li key={stage}><button type="button" aria-current={active === index ? "step" : undefined} aria-controls="workflow-detail" onClick={() => navigate(index)}><span className={styles.stepDot}>{active > index ? "✓" : index + 1}</span><span>{stage}</span></button></li>)}
        </ol>
        <div className={styles.controls}>
          <button type="button" aria-label="Previous workflow step" onClick={() => move(-1)}><ArrowLeft size={18} aria-hidden="true" /></button>
          <button type="button" aria-label={playing && !reducedMotion ? "Pause workflow animation" : "Play workflow animation"} aria-pressed={playing && !reducedMotion} disabled={Boolean(reducedMotion)} onClick={() => { setPlaying(!playing); setFocused(false); }}>{playing && !reducedMotion ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}</button>
          <button type="button" aria-label="Next workflow step" onClick={() => move(1)}><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
      <div className={styles.track} aria-hidden="true"><span ref={progressRef} /></div>
      <div className={styles.caption}><span><Link2 size={12} aria-hidden="true" /> {workflow.project}</span><span>Illustrative workflow · {active + 1} / 5</span></div>
    </div>
  );
}

export default function SourceToAction({ workflow: fixedWorkflow }: { workflow?: Workflow }) {
  const reducedMotion = usePrefersReducedMotion();
  const [selected, setSelected] = useState(featuredWorkflows[0]);
  const lastSelected = useRef<string | null>(null);
  const workflow = fixedWorkflow || selected;
  const surface = fixedWorkflow ? "use_case" : "home";
  const selectWorkflow = (next: Workflow) => {
    setSelected(next);
    setMarketingWorkflow(next.id);
    if (lastSelected.current !== next.id) {
      lastSelected.current = next.id;
      emitMarketingEvent({ event: "workflow_selected", workflow_id: next.id, surface });
    }
  };

  return (
    <section id="source-to-action" className={styles.section} aria-labelledby="workflow-title">
      <div className={styles.wrap}>
        <div className={styles.heading}><p className={styles.eyebrow}>A little less scattered. A lot more possible.</p><h2 id="workflow-title">{fixedWorkflow ? "From the first spark to the next step." : "Your world. Brought together."}</h2><p className={styles.intro}>{fixedWorkflow ? workflow.summary : "Choose what matters to you. See how the pieces become a plan."}</p></div>
        {!fixedWorkflow && <ul className={styles.outcomes} aria-label="Choose a workflow">
          {featuredWorkflows.map(option => {
            const Icon = outcomeIcons[option.id];
            return <li key={option.id}><button type="button" title={option.summary} aria-pressed={workflow.id === option.id} aria-controls="selected-workflow" onClick={() => selectWorkflow(option)}><Icon size={18} aria-hidden="true" /><span>{option.label}</span>{workflow.id === option.id && <motion.span className={styles.categoryGlow} layoutId={reducedMotion ? undefined : "workflow-category"} transition={{ type: "spring", stiffness: 380, damping: 34 }} />}</button></li>;
          })}
        </ul>}
        <div id="workflow-journey"><WorkflowCarousel key={workflow.id} workflow={workflow} surface={surface} /></div>
        <div className={styles.more}><Link href={`/use-cases/${workflow.id}`}>Explore the {workflow.label.toLowerCase()} use case <ArrowRight size={15} aria-hidden="true" /></Link><Link href="/use-cases">See more use cases <ArrowRight size={15} aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}
