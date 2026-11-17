"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDemoFocus } from "@/components/general/demoFocus";
import { useDemoScale } from "../useDemoScale";
import { activeNovaBatch } from "./plannerProject";
import { plannerTime as at, PLANNER_DURATION } from "./plannerTiming";
export { PLANNER_DURATION } from "./plannerTiming";
export const PLANNER_CHAPTERS = [
    { at: at(0), view: "agenda", title: "Make a plan", copy: "Create a task, choose a date and time, and connect the note and PDF it’s about." },
    { at: at(14000), view: "week", title: "Shape your week", copy: "Drag the same task to another day when your schedule changes." },
    { at: at(23000), view: "month", title: "See the bigger picture", copy: "See tasks and events across the month, and reopen the task with its source material." },
    { at: at(31000), view: "board", title: "Move work forward", copy: "Move the task from To do to In progress, then Done. It’s the same plan in every view." },
    { at: at(43000), view: "board", title: "Ask for several changes", copy: "Create two tasks, add an event and reschedule a deployment. Review four changes and confirm them together." },
    { at: at(72500), view: "board", title: "Update several tasks at once", copy: "Move two tasks to In progress and complete another. Confirm once, then watch all three changes happen." },
    { at: at(100000), view: "month", title: "One updated plan", copy: "The new tasks, review event and rescheduled deployment appear together in the calendar." },
] as const;
export type PlannerView = typeof PLANNER_CHAPTERS[number]["view"];
const PATH: [
    number,
    string
][] = [
    [at(0), "nav-planner"], [at(1800), "new"], [at(2400), "new"], [at(3300), "title"], [at(5500), "title"],
    [at(6200), "date"], [at(7000), "time"], [at(7800), "attach"], [at(8500), "attach"], [at(9800), "pick-note"],
    [at(11100), "attach"], [at(11700), "pick-pdf"], [at(12500), "save"], [at(13200), "save"],
    [at(13800), "tab-week"], [at(14000), "tab-week"], [at(16200), "week-task"], [at(16800), "week-task"],
    [at(19000), "day-10"], [at(20500), "day-10"], [at(22500), "tab-month"], [at(23000), "tab-month"],
    [at(25100), "month-task"], [at(25900), "month-task"], [at(28300), "connected-note"],
    [at(29800), "sheet-close"], [at(30600), "tab-board"], [at(31000), "tab-board"],
    [at(32900), "board-task"], [at(33400), "board-task"], [at(35800), "stage-doing"],
    [at(37400), "board-task"], [at(38000), "board-task"], [at(40200), "stage-done"], [at(43000), "stage-done"], [at(44300), "nova-open"], [at(45500), "nova-compose"],
    [at(53800), "nova-send"], [at(57500), "nova-confirm-all"], [at(62000), "nova-confirm-all"],
    [at(66000), "nova-close"], [at(68000), "nova-close"], [at(73200), "nova-open"], [at(74700), "nova-compose"],
    [at(80800), "nova-send"], [at(85000), "nova-confirm-all"], [at(89000), "nova-confirm-all"],
    [at(92500), "nova-close"], [at(94000), "nova-close"], [at(98000), "stage-doing"],
    [at(99800), "tab-month"], [at(100000), "tab-month"], [at(106000), "tab-month"],
];
export function usePlannerTour() {
    const sectionRef = useRef<HTMLElement>(null), viewportRef = useRef<HTMLDivElement>(null), canvasRef = useRef<HTMLDivElement>(null);
    const clock = useRef(0), positions = useRef<Record<string, {
        x: number;
        y: number;
    }>>({});
    const [time, setTime] = useState(0), [playing, setPlaying] = useState(true), [reduced, setReduced] = useState(false);
    const scale = useDemoScale(viewportRef);
    const visible = useDemoFocus("planner-demo", viewportRef);
    const chapter = PLANNER_CHAPTERS.reduce((current, step, index) => time >= step.at ? index : current, 0);
    const view = PLANNER_CHAPTERS[chapter].view;
    const dialog: "create" | "edit" | null = time >= at(2600) && time < at(13200) ? "create" : time >= at(26000) && time < at(29900) ? "edit" : null;
    const picker: "note" | "pdf" | null = time >= at(8700) && time < at(10100) ? "note" : time >= at(11300) && time < at(11900) ? "pdf" : null;
    const moved = time >= at(19000), stage = time >= at(40200) ? "done" : time >= at(35800) ? "doing" : "open";
    useEffect(() => {
        const mq = matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => { setReduced(mq.matches); if (mq.matches) {
            clock.current = PLANNER_DURATION;
            setTime(PLANNER_DURATION);
            setPlaying(false);
        } };
        update();
        mq.addEventListener("change", update);
        return () => { mq.removeEventListener("change", update); };
    }, []);
    const scheduled = time >= at(6500);
    const batch = activeNovaBatch(time);
    const novaPhase = batch ? `${batch.id}:${time >= batch.sentAt}:${time >= batch.responseAt}:${time >= batch.confirmAt}:${batch.proposals.filter(p => time >= p.applyAt).length}` : "closed";
    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const rect = canvas.getBoundingClientRect(), ratio = rect.width / 1600;
        if (!ratio)
            return;
        canvas.querySelectorAll<HTMLElement>("[data-planner-target]").forEach(el => {
            const box = el.getBoundingClientRect();
            positions.current[el.dataset.plannerTarget!] = { x: (box.left - rect.left + Math.min(box.width / 2, 130 * ratio)) / ratio, y: (box.top - rect.top + Math.min(box.height / 2, 100 * ratio)) / ratio };
        });
        const nav = canvas.querySelector('[data-cursor="nav-planner"]');
        if (nav) {
            const box = nav.getBoundingClientRect();
            positions.current['nav-planner'] = { x: (box.left - rect.left + 60 * ratio) / ratio, y: (box.top - rect.top + box.height / 2) / ratio };
        }
    }, [view, dialog, picker, scale, moved, stage, scheduled, novaPhase]);
    useEffect(() => {
        if (!playing || !visible)
            return;
        let frame: number, previous = 0;
        const tick = (now: number) => { if (document.hidden)
            previous = 0;
        else {
            if (previous) {
                clock.current = Math.min(PLANNER_DURATION, clock.current + Math.min(now - previous, 80));
                setTime(clock.current);
            }
            previous = now;
        } if (clock.current >= PLANNER_DURATION) {
            setPlaying(false);
            return;
        } frame = requestAnimationFrame(tick); };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [playing, visible]);
    function seek(value: number, resume = false) { clock.current = value; setTime(value); setPlaying(resume); }
    function showView(next: PlannerView) { seek(PLANNER_CHAPTERS.find(c => c.view === next)!.at); }
    let next = PATH.findIndex(p => p[0] > time);
    if (next < 0)
        next = PATH.length - 1;
    const a = PATH[Math.max(0, next - 1)], b = PATH[next];
    const start = positions.current[a[1]] ?? { x: 1100, y: 230 }, end = positions.current[b[1]] ?? start;
    const travelMs = ["day-10", "stage-doing", "stage-done"].includes(b[1]) ? 300 : 250;
    const moveAt = Math.max(a[0], b[0] - travelMs);
    const p = moveAt === b[0] ? 1 : Math.max(0, Math.min(1, (time - moveAt) / (b[0] - moveAt))), ease = p * p * (3 - 2 * p);
    const cursor = { x: start.x + (end.x - start.x) * ease, y: start.y + (end.y - start.y) * ease };
    const dragging = (time >= at(18400) && time < at(19000)) || (time >= at(35200) && time < at(35800)) || (time >= at(39600) && time < at(40200));
    const clicking = [at(2400), at(8500), at(9800), at(11100), at(11700), at(13200), at(14000), at(23000), at(25900), at(29800), at(31000), at(44300), at(53800), at(62000), at(68000), at(73200), at(80800), at(89000), at(94000), at(100000)].some(at => Math.abs(at - time) < 170);
    return { sectionRef, viewportRef, canvasRef, time, active: playing && visible, playing, setPlaying, scale, reduced, chapter, view, dialog, picker, moved, stage, cursor, dragging, clicking, seek, showView };
}
