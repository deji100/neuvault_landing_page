"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { MousePointer2, Pause, Play, RotateCcw } from "lucide-react";
import { useDemoFocus } from "@/components/general/demoFocus";
import DemoViewer from "./DemoViewer";
import { useDemoScale } from "./useDemoScale";
import DesktopInterface, { type DemoPage } from "./capture/DesktopInterface";
import styles from "./CaptureDemo.module.css";
import { CAPTURE_TIMELINE as T } from "./capture/captureTimeline";
const DURATION = T.duration;
const WIDTH = 1600;
const HEIGHT = 1080;
const STEPS = [
    { at: 0, page: "vault", title: "Start in your Vault", copy: "See where saved notes and files live, then open Home to import something new." },
    { at: T.homeStart, page: "home", title: "Import on Home", copy: "Watch your Podcasts folder. New recordings arrive automatically, ready for transcription." },
    { at: T.queueStart, page: "queue", title: "Follow the Queue", copy: "Follow the imported recording as NeuVault captures its transcript, then opens it in the editor." },
    { at: T.notesStart, page: "notes", title: "Transcribe and follow audio", copy: "Read the recording’s summary and follow the highlighted sentences as the audio plays." },
    { at: T.vaultStart, page: "vault", title: "Explore your Vault", copy: "See the transcribed interview join Entertainment & Leisure → Podcasts, with its audio and summary kept together." },
] as const;
// Targets are measured from the rendered desktop controls so the cursor lands
// on the real sidebar rows and editor actions, rather than estimated pixels.
const PATH: [
    number,
    string,
    number,
    number
][] = [
    [0, "nav-vault", 85, 400], [1600, "nav-home", 85, 350], [T.homeStart, "nav-home", 85, 350],
    [2200, "auto-open", 550, 700], [T.autoImportOpen, "auto-open", 550, 700], [3000, "auto-ai", 700, 650],
    [3800, "auto-folder", 650, 470], [5000, "auto-done", 1250, 850], [6200, "auto-done", 1250, 850],
    [7200, "nav-queue", 85, 650], [8000, "nav-queue", 85, 650],
    [10500, "", 800, 480], [13000, "queue-open-editor", 1100, 280], [T.notesStart, "queue-open-editor", 1100, 280],
    [16000, "", 800, 480],
    [T.summaryReady + 500, "audio-follow", 530, 70], [T.audioPlayback, "audio-play", 1400, 1010],
    [49000, "note-save", 1400, 180],
    [T.noteSaved, "note-save", 1400, 180],
    [53000, "group-1", 740, 300], [T.entertainmentOpen, "group-1", 740, 300],
    [57000, "podcasts-folder", 400, 300], [T.podcastsOpen, "podcasts-folder", 400, 300],
    [61000, "transcript-file", 400, 300], [T.documentOpen, "transcript-file", 400, 300], [DURATION, "", 1200, 700],
];
type Point = {
    x: number;
    y: number;
};
function cursorAt(time: number, targets: Record<string, Point>) {
    let index = PATH.findIndex(p => p[0] > time);
    if (index < 0)
        index = PATH.length - 1;
    const a = PATH[Math.max(0, index - 1)], b = PATH[index];
    const start = targets[a[1]] ?? { x: a[2], y: a[3] }, end = targets[b[1]] ?? { x: b[2], y: b[3] };
    const moveAt = Math.max(a[0], b[0] - 450);
    const p = b[0] === moveAt ? 1 : Math.max(0, Math.min(1, (time - moveAt) / (b[0] - moveAt)));
    const eased = p * p * (3 - 2 * p);
    return { x: start.x + (end.x - start.x) * eased, y: start.y + (end.y - start.y) * eased };
}
export default function CaptureDemo() {
    const sectionRef = useRef<HTMLElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const timeRef = useRef(0);
    const targetsRef = useRef<Record<string, Point>>({});
    const [time, setTime] = useState(0);
    const [audioSeekVersion, setAudioSeekVersion] = useState(0);
    const [playing, setPlaying] = useState(true);
    const visible = useDemoFocus("capture", viewportRef);
    const [reducedMotion, setReducedMotion] = useState(false);
    const scale = useDemoScale(viewportRef);
    const step = STEPS.reduce((current, chapter, index) => time >= chapter.at ? index : current, 0);
    const page = STEPS[step].page;
    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => { setReducedMotion(media.matches); if (media.matches) {
            setPlaying(false);
            timeRef.current = T.noteComplete + 1000;
            setTime(T.noteComplete + 1000);
        } };
        update();
        media.addEventListener("change", update);
        return () => { media.removeEventListener("change", update); };
    }, []);
    const onAudioInteract = useCallback(() => setPlaying(false), []);
    const audioPhase = time >= T.documentOpen ? "document" : time >= T.podcastsOpen ? "podcasts" : time >= T.entertainmentOpen ? "entertainment" : time < T.audioImported ? "idle" : time < T.transcriptReady ? "transcribing" : time < T.summaryReady ? "summary" : "ready";
    const autoImportOpen = time >= T.autoImportOpen && time < T.audioImported;
    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const rect = canvas.getBoundingClientRect();
        const actualScale = rect.width / WIDTH;
        if (!actualScale)
            return;
        canvas.querySelectorAll<HTMLElement>("[data-cursor]").forEach(el => {
            const box = el.getBoundingClientRect();
            targetsRef.current[el.dataset.cursor!] = { x: (box.left - rect.left + Math.min(box.width / 2, 120 * actualScale)) / actualScale, y: (box.top - rect.top + Math.min(box.height / 2, 120 * actualScale)) / actualScale };
        });
    }, [page, scale, autoImportOpen, audioPhase]);
    useEffect(() => {
        if (!playing || !visible)
            return;
        let frame: number;
        let previous = 0;
        const tick = (now: number) => {
            if (document.hidden)
                previous = 0;
            else {
                if (previous) {
                    timeRef.current = Math.min(DURATION, timeRef.current + Math.min(now - previous, 80));
                    setTime(timeRef.current);
                }
                previous = now;
            }
            if (timeRef.current >= DURATION) {
                setPlaying(false);
                return;
            }
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [playing, visible]);
    function seek(value: number, resume = false, preserveAudio = false) { if (!preserveAudio) setAudioSeekVersion(version => version + 1); timeRef.current = value; setTime(value); setPlaying(resume); }
    function navigate(next: DemoPage) { const chapter = next === "vault" && time >= T.notesStart ? STEPS[STEPS.length - 1] : STEPS.find(s => s.page === next)!; seek(chapter.at); }
    const cursor = cursorAt(time, targetsRef.current);
    const clicking = [T.homeStart, T.autoImportOpen, 3000, 6200, T.queueStart, T.notesStart, T.audioPlayback, T.noteSaved, T.entertainmentOpen, T.podcastsOpen, T.documentOpen].some(at => Math.abs(time - at) < 190);
    return <section className={styles.section} id="capture" ref={sectionRef} aria-labelledby="capture-title">
    <div className={styles.heading}><p className={styles.eyebrow}><span>01</span> CAPTURE &amp; ORGANIZE</p><h2 id="capture-title">Your notes and files.<br /><span>Organized for you.</span></h2><p>Save notes, files and links. Let AI summarize and sort them, or turn recordings into searchable transcripts.</p></div>
    <DemoViewer label="Note & Voice"><div className={styles.demoTop}><span><i className={styles.liveDot}/>Inside NeuVault Desktop</span><span className={styles.demoLabel}>Product tour</span></div>
      <div className={styles.viewport} ref={viewportRef} style={{ height: HEIGHT * scale }}>
        <div className={`nv-capture-desktop ${styles.canvas}`} ref={canvasRef} style={{ transform: `scale(${scale})`, "--demo-scale": scale } as CSSProperties}>
          <DesktopInterface page={page} time={time} reduced={reducedMotion} onNavigate={navigate} audioActive={playing && visible} audioVisible={visible} onAudioInteract={onAudioInteract} seekTour={seek} audioSeekVersion={audioSeekVersion}/>
          {!reducedMotion && <div className={styles.cursor} aria-hidden="true" style={{ left: cursor.x, top: cursor.y }}><MousePointer2 size={30} fill="white" stroke="#101113" strokeWidth={1.5}/>{clicking && <span />}</div>}
        </div>
      </div>
      <div className={styles.playback}><button type="button" onClick={() => time >= DURATION ? seek(0, true) : setPlaying(!playing)} aria-label={playing ? "Pause capture tour" : time >= DURATION ? "Restart capture tour" : "Play capture tour"}>{playing ? <Pause size={16}/> : <Play size={16}/>}</button><input type="range" aria-label="Capture tour progress" min={0} max={DURATION} step={100} value={time} onChange={e => seek(Number(e.target.value))}/><span>{Math.floor(time / 1000).toString().padStart(2, "0")} / {DURATION / 1000}s</span><button type="button" onClick={() => seek(0, true)} aria-label="Replay capture tour"><RotateCcw size={16}/></button></div>
    </DemoViewer>
  </section>;
}
