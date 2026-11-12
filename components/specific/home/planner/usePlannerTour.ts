"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDemoFocus } from "@/components/general/demoFocus";
import { activeNovaBatch } from "./plannerProject";
export const PLANNER_DURATION = 106000;
export const PLANNER_CHAPTERS = [
    { at: 0, view: "agenda", title: "Make a plan", copy: "Create a task, choose a date and time, and connect the note and PDF it’s about." },
    { at: 14000, view: "week", title: "Shape your week", copy: "Drag the same task to another day when your schedule changes." },
    { at: 23000, view: "month", title: "See the bigger picture", copy: "See tasks and events across the month, and reopen the task with its source material." },
    { at: 31000, view: "board", title: "Move work forward", copy: "Move the task from To do to In progress, then Done. It’s the same plan in every view." },
    { at: 43000, view: "board", title: "Ask for several changes", copy: "Create two tasks, add an event and reschedule a deployment. Review four changes and confirm them together." },
    { at: 72500, view: "board", title: "Update several tasks at once", copy: "Move two tasks to In progress and complete another. Confirm once, then watch all three changes happen." },
    { at: 100000, view: "month", title: "One updated plan", copy: "The new tasks, review event and rescheduled deployment appear together in the calendar." },
] as const;
export type PlannerView = typeof PLANNER_CHAPTERS[number]["view"];
const PATH: [
    number,
    string
][] = [
    [0, "nav-planner"], [1800, "new"], [2400, "new"], [3300, "title"], [5500, "title"],
    [6200, "date"], [7000, "time"], [7800, "attach"], [8500, "attach"], [9800, "pick-note"],
    [11100, "attach"], [11700, "pick-pdf"], [12500, "save"], [13200, "save"],
    [13800, "tab-week"], [14000, "tab-week"], [16200, "week-task"], [16800, "week-task"],
    [19000, "day-10"], [20500, "day-10"], [22500, "tab-month"], [23000, "tab-month"],
    [25100, "month-task"], [25900, "month-task"], [28300, "connected-note"],
    [29800, "sheet-close"], [30600, "tab-board"], [31000, "tab-board"],
    [32900, "board-task"], [33400, "board-task"], [35800, "stage-doing"],
    [37400, "board-task"], [38000, "board-task"], [40200, "stage-done"], [43000, "stage-done"], [44300, "nova-open"], [45500, "nova-compose"],
    [53800, "nova-send"], [57500, "nova-confirm-all"], [62000, "nova-confirm-all"],
    [66000, "nova-close"], [68000, "nova-close"], [73200, "nova-open"], [74700, "nova-compose"],
    [80800, "nova-send"], [85000, "nova-confirm-all"], [89000, "nova-confirm-all"],
    [92500, "nova-close"], [94000, "nova-close"], [98000, "stage-doing"],
    [99800, "tab-month"], [100000, "tab-month"], [106000, "tab-month"],
];
export function usePlannerTour() {
    const sectionRef = useRef<HTMLElement>(null), viewportRef = useRef<HTMLDivElement>(null), canvasRef = useRef<HTMLDivElement>(null);
    const clock = useRef(0), positions = useRef<Record<string, {
        x: number;
        y: number;
    }>>({});
    const [time, setTime] = useState(0), [playing, setPlaying] = useState(true), [scale, setScale] = useState(1), [reduced, setReduced] = useState(false);
    const visible = useDemoFocus("planner-demo", viewportRef);
    const chapter = PLANNER_CHAPTERS.reduce((current, step, index) => time >= step.at ? index : current, 0);
    const view = PLANNER_CHAPTERS[chapter].view;
    const dialog: "create" | "edit" | null = time >= 2600 && time < 13200 ? "create" : time >= 26000 && time < 29900 ? "edit" : null;
    const picker: "note" | "pdf" | null = time >= 8700 && time < 10100 ? "note" : time >= 11300 && time < 11900 ? "pdf" : null;
    const moved = time >= 19000, stage = time >= 40200 ? "done" : time >= 35800 ? "doing" : "open";
    useEffect(() => {
        const mq = matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => { setReduced(mq.matches); if (mq.matches) {
            clock.current = PLANNER_DURATION;
            setTime(PLANNER_DURATION);
            setPlaying(false);
        } };
        update();
        mq.addEventListener("change", update);
        const resize = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1600));
        if (viewportRef.current)
            resize.observe(viewportRef.current);
        return () => { mq.removeEventListener("change", update); resize.disconnect(); };
    }, []);
    const scheduled = time >= 6500;
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
    const travelMs = ["day-10", "stage-doing", "stage-done"].includes(b[1]) ? 600 : 450;
    const moveAt = Math.max(a[0], b[0] - travelMs);
    const p = moveAt === b[0] ? 1 : Math.max(0, Math.min(1, (time - moveAt) / (b[0] - moveAt))), ease = p * p * (3 - 2 * p);
    const cursor = { x: start.x + (end.x - start.x) * ease, y: start.y + (end.y - start.y) * ease };
    const dragging = (time >= 18400 && time < 19000) || (time >= 35200 && time < 35800) || (time >= 39600 && time < 40200);
    const clicking = [2400, 8500, 9800, 11100, 11700, 13200, 14000, 23000, 25900, 29800, 31000, 44300, 53800, 62000, 68000, 73200, 80800, 89000, 94000, 100000].some(at => Math.abs(at - time) < 170);
    return { sectionRef, viewportRef, canvasRef, time, playing, setPlaying, scale, reduced, chapter, view, dialog, picker, moved, stage, cursor, dragging, clicking, seek, showView };
}
