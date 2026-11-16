"use client";
import { memo, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrowDown, Check, ChevronDown, ChevronUp, Files, GripVertical, Info, Mic, Pause, Play, Sparkles, Volume2, VolumeX } from "lucide-react";
import source from "./audioTranscript.json";
import NoteEditorToolbar from "./NoteEditorToolbar";
import TranscriptDocumentModal from "./TranscriptDocumentModal";
import { CAPTURE_TIMELINE as T } from "./captureTimeline";
import styles from "./AudioNotesDemo.module.css";
import "./AudioNative.css";

type Word = { text: string; start: number | null; end: number | null };
type Passage = { id: string; speaker: string; text: string; start: number | null; end: number | null; words: Word[] };
const transcript = source as { title: string; subtitle: string; audioSrc: string; duration: number; overview: string[]; keyPoints: string[]; blocks: Passage[] };
const stamp = (seconds: number) => Math.floor(seconds / 60) + ":" + Math.floor(seconds % 60).toString().padStart(2, "0");
const sentenceSegmenter = new Intl.Segmenter("en", { granularity: "sentence" });

const SpeakerPassage = memo(function SpeakerPassage({ block, activeWord, seek }: { block: Passage; activeWord: number; seek: (seconds: number) => void }) {
    const sentences = useMemo(() => Array.from(sentenceSegmenter.segment(block.text)), [block.text]);
    const wordOffset = activeWord >= 0 ? block.words.slice(0, activeWord).reduce((offset, word) => offset + word.text.length, 0) : -1;
    return <blockquote data-audio-passage={block.id} className={activeWord >= 0 ? "transcript-speaker-active" : undefined}>
        <header><h3>{block.speaker}</h3>{block.start !== null && <button type="button" onClick={() => seek(block.start!)} aria-label={"Play from " + stamp(block.start)}>{stamp(block.start)}</button>}</header>
        <p>{sentences.map(({ segment, index }) => {
            const selected = wordOffset >= index && wordOffset < index + segment.length;
            return <span key={index} className={selected ? "transcript-audio-active" : undefined} data-audio-active={selected ? "true" : undefined}>{segment}</span>;
        })}</p>
    </blockquote>;
});

export default function AudioNotesDemo({ time, active, visible, reduced, onInteract, seekTour, page, vaultContent, seekVersion }: {
    time: number; active: boolean; visible: boolean; reduced: boolean; onInteract: () => void;
    seekTour: (time: number, resume?: boolean, preserveAudio?: boolean) => void;
    page: "notes" | "vault"; vaultContent: ReactNode; seekVersion: number;
}) {
    const audio = useRef<HTMLAudioElement>(null), editor = useRef<HTMLDivElement>(null);
    const lastSeekVersion = useRef<number | null>(null), lastScrolled = useRef(""), playPending = useRef(false);
    const [currentTime, setCurrentTime] = useState(0), [playing, setPlaying] = useState(false), [muted, setMuted] = useState(false);
    const [follow, setFollow] = useState(true), [expanded, setExpanded] = useState(false), [manual, setManual] = useState(false), [error, setError] = useState("");
    const [needsSoundPermission, setNeedsSoundPermission] = useState(false);
    const modalOpen = page === "vault" && time >= T.documentOpen;
    const imported = time >= T.audioImported, textReady = time >= T.transcriptReady, ready = time >= T.summaryReady;
    const phase = !imported ? "Waiting to start" : !textReady ? "Transcribing" : !ready ? "Writing the summary" : "";
    const cues = useMemo(() => transcript.blocks.flatMap((block, blockIndex) => {
        let offset = 0;
        const words = block.words.map((word, wordIndex) => {
            const item = { ...word, wordIndex, offset }; offset += word.text.length; return item;
        });
        return Array.from(sentenceSegmenter.segment(block.text)).flatMap(({ segment, index }) => {
            const timed = words.filter(word => word.offset >= index && word.offset < index + segment.length && word.start !== null && word.end !== null);
            if (!timed.length) return [];
            return [{ block: blockIndex, word: timed[0].wordIndex, start: Math.min(...timed.map(word => word.start!)), end: Math.max(...timed.map(word => word.end!)) }];
        });
    }).sort((a, b) => a.start - b.start), []);
    const spoken = useMemo(() => {
        let lo = 0, hi = cues.length - 1, result = -1;
        while (lo <= hi) { const mid = (lo + hi) >>> 1; if (cues[mid].start <= currentTime) { result = mid; lo = mid + 1; } else hi = mid - 1; }
        return result >= 0 && currentTime < cues[result].end ? cues[result] : null;
    }, [cues, currentTime]);
    const activeKey = spoken ? spoken.block + ":" + spoken.word : "";
    const takeControl = useCallback(() => { setManual(true); onInteract(); }, [onInteract]);
    const play = useCallback(() => {
        const element = audio.current;
        if (!element || !element.paused || playPending.current) return;
        playPending.current = true;
        setError("");
        void element.play().catch(async (reason: unknown) => {
            if (reason instanceof DOMException && reason.name === "AbortError") return;
            if (reason instanceof DOMException && reason.name === "NotAllowedError" && !element.muted) {
                if (!window.matchMedia("(max-width: 960px)").matches) {
                    setNeedsSoundPermission(true); setPlaying(false); setManual(true); onInteract();
                    return;
                }
                // Keep the mobile tour and transcript moving when sound needs a gesture.
                element.muted = true;
                setMuted(true); setNeedsSoundPermission(true);
                try { await element.play(); }
                catch { setPlaying(false); setError("Tap Sound on to hear the recording."); }
                return;
            }
            setPlaying(false); setError("Press play to start the audio.");
        }).finally(() => { playPending.current = false; });
    }, [onInteract]);
    const seekAudio = useCallback((seconds: number) => {
        takeControl(); setMuted(false);
        if (audio.current) { audio.current.muted = false; audio.current.currentTime = Math.max(0, Math.min(transcript.duration, seconds)); setCurrentTime(audio.current.currentTime); }
        play();
    }, [takeControl, play]);
    useEffect(() => {
        const element = audio.current;
        if (!element) return;
        const jumped = lastSeekVersion.current === null || lastSeekVersion.current !== seekVersion;
        lastSeekVersion.current = seekVersion;
        if (jumped) { setManual(false); element.currentTime = Math.max(0, Math.min(transcript.duration, (time - T.audioPlayback) / 1000)); setCurrentTime(element.currentTime); lastScrolled.current = ""; }
        if (!visible) { element.pause(); return; }
        if (manual && !jumped) return;
        if ((active || time >= T.duration) && time >= T.audioPlayback) play(); else element.pause();
    }, [time, active, visible, manual, play, seekVersion]);
    useEffect(() => {
        const element = audio.current;
        if (!element || !playing) return;
        let frame = 0, previous = -1;
        const tick = () => { const now = Math.floor(element.currentTime * 25) / 25; if (now !== previous) { previous = now; setCurrentTime(element.currentTime); } frame = requestAnimationFrame(tick); };
        frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame);
    }, [playing]);
    useEffect(() => {
        const element = audio.current;
        const pause = () => { if (document.hidden) element?.pause(); };
        document.addEventListener("visibilitychange", pause);
        return () => { document.removeEventListener("visibilitychange", pause); element?.pause(); };
    }, []);
    useEffect(() => {
        const surfaceKey = page + ":" + modalOpen + ":" + activeKey;
        if (!follow || !activeKey || surfaceKey === lastScrolled.current || !editor.current) return;
        const element = editor.current.querySelector<HTMLElement>('[data-audio-active="true"]');
        if (!element) return;
        const bounds = editor.current.getBoundingClientRect(), rect = element.getBoundingClientRect();
        if (rect.top < bounds.top + 65 || rect.bottom > bounds.bottom - 65) {
            const scale = bounds.height / editor.current.clientHeight;
            editor.current.scrollTo({ top: editor.current.scrollTop + (rect.top - bounds.top) / scale - editor.current.clientHeight * .4, behavior: reduced ? "instant" : "smooth" });
        }
        lastScrolled.current = surfaceKey;
    }, [follow, activeKey, reduced, page, modalOpen]);
    const togglePlayback = () => {
        takeControl();
        if (playing) audio.current?.pause(); else { setMuted(false); if (audio.current) audio.current.muted = false; play(); }
    };
    const toggleSound = () => {
        takeControl(); setMuted(!muted);
        if (audio.current) audio.current.muted = !muted;
        if (muted && ready) play();
    };
    const playWithSound = () => {
        if (!audio.current) return;
        audio.current.muted = false; audio.current.volume = 1;
        setMuted(false); setNeedsSoundPermission(false); setManual(false);
        play();
        seekTour(Math.max(T.audioPlayback, time), true, true);
    };
    const followControl = <span className="transcript-follow-audio-wrap"><button type="button" role="switch" aria-checked={follow} className={"transcript-follow-audio" + (follow ? " is-on" : "") + (follow && playing ? " is-live" : "")} data-cursor="audio-follow" onClick={() => { if (follow && editor.current) editor.current.scrollTo({ top: editor.current.scrollTop, behavior: "instant" }); setFollow(!follow); lastScrolled.current = ""; }}><span className="transcript-follow-audio__bars" aria-hidden="true"><i/><i/><i/></span>Follow audio<span className="transcript-follow-audio__switch" aria-hidden="true"><i/></span></button></span>;
    const transcriptContent = <div className={"notes-editor-content " + styles.content}>
                    <h1>{transcript.title}</h1><p className={styles.subtitle}>{transcript.subtitle}</p>
                    <h2>Overview</h2>{modalOpen ? transcript.overview.map(line=><p key={line}>{line}</p>) : <ul>{transcript.overview.map(line=><li key={line}>{line}</li>)}</ul>}
                    <h2>Key points</h2><ul>{transcript.keyPoints.map(line=><li key={line}>{line}</li>)}</ul>
                    <h2>Transcript</h2>{transcript.blocks.map((block,index)=><SpeakerPassage key={block.id} block={block} activeWord={spoken?.block===index?spoken.word:-1} seek={seekAudio}/>)}

                </div>;
    return <div className={"notes-voice-page " + styles.page} data-notes-voice-page="true" data-audio-phase={phase || "ready"}>
        <audio ref={audio} src={transcript.audioSrc} preload="metadata" muted={muted} onLoadedMetadata={() => { if (!manual && audio.current) { audio.current.currentTime = Math.max(0, Math.min(transcript.duration, (time - T.audioPlayback) / 1000)); setCurrentTime(audio.current.currentTime); } }} onPlay={() => { setPlaying(true); if (!audio.current?.muted) setNeedsSoundPermission(false); }} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onTimeUpdate={() => setCurrentTime(audio.current?.currentTime ?? 0)} onError={() => setError("Audio could not be loaded. Try playing it again.")} aria-label="Reality Life with Kate Casey recording"/>
        {page === "notes" ? <div className="notes-voice-layout"><div className="notes-voice-workspace"><section className="notes-voice-compose">
            <div className="notes-voice-header"><div className="notes-voice-header-bar"><div className="notes-voice-header-status">
                <span className={styles.meeting}><i/>Meeting detection on</span>
                {phase && <div className="nv-transcribe-pill" role="status"><span className="nv-transcribe-pill__bars" aria-hidden="true"><i/><i/><i/><i/></span><span className="nv-transcribe-pill__label">{phase}</span>{imported && <span className="nv-transcribe-pill__track"><span style={{ width: Math.min(100, (time - T.audioImported) / (T.summaryReady - T.audioImported) * 100) + "%" }}/></span>}</div>}
            </div><div className="notes-voice-header-actions">
                <button type="button" className={styles.info} aria-label="Audio transcription information"><Info/></button>
                <button type="button" disabled={!ready} className="notes-voice-button notes-voice-button-secondary"><Files/>Connect files</button>
                <button type="button" disabled={!ready} className="notes-voice-button notes-voice-button-secondary"><Sparkles/>{textReady ? "Edit with Nova" : "Write with Nova"}</button>
                <div className="notes-voice-record-menu"><button type="button" disabled className="notes-voice-button notes-voice-button-primary"><Mic/>Record<ChevronDown className="notes-voice-record-chevron"/></button></div>
            </div></div></div>
            {ready && <NoteEditorToolbar className={styles.toolbar} followControl={followControl}><div className="notes-voice-submit-wrap has-save-choices"><button type="button" className="notes-voice-button notes-voice-button-secondary notes-voice-save-inbox" onClick={()=>seekTour(T.vaultStart,true,true)}>Save to Inbox</button><button type="button" className="notes-voice-button notes-voice-button-primary notes-voice-organize-ai" data-cursor="note-save" onClick={()=>seekTour(T.vaultStart,true,true)}>{time>=T.noteSaved?<Check/>:<Sparkles/>}{time>=T.noteSaved?"Added to Queue":"Organize with AI"}</button></div></NoteEditorToolbar>}
            <div className={"notes-voice-editor " + styles.editor} ref={editor} data-notes-voice-editor="true" tabIndex={0} aria-label="Audio summary and transcript">
                {!textReady ? <div className="nv-transcript-shimmer" role="status" aria-label={imported ? "Transcribing. Text appears here as it is ready." : "Ready to transcribe an audio recording."}>{[[92,84,60],[88,90,76,48],[94,86,91,82,88,64]].map((lines,block)=><div className="nv-transcript-shimmer__block" key={block}><i className="nv-transcript-shimmer__heading"/>{lines.map((width,index)=><i key={index} style={{width:width+"%"}}/>)}</div>)}</div> : transcriptContent}
            </div>
        </section></div></div> : vaultContent}
        {modalOpen && <TranscriptDocumentModal editorRef={editor} followControl={followControl} onClose={() => { takeControl(); seekTour(T.podcastsOpen, false, true); }} onEdit={() => { takeControl(); seekTour(T.summaryReady, false, true); }}>{transcriptContent}</TranscriptDocumentModal>}
        {imported && <div className={styles.playerDock}><aside className={"nv-global-audio-bar " + styles.player + (modalOpen ? " " + styles.modalPlayer : "") + (needsSoundPermission ? " " + styles.awaitingPlay : "")} data-collapsed={expanded?undefined:"true"} role="region" aria-label="Audio player">
            <span className="nv-global-audio-bar-handle" aria-hidden="true"><GripVertical/></span><span className={styles.playControl}>
                {needsSoundPermission && <span className={styles.playPrompt} id="capture-play-hint" role="status"><strong>{muted ? "Playing muted" : "Click Play to hear the recording"}</strong><span>{muted ? "Tap Sound on to hear the recording." : "Follow along with the highlighted transcript."}</span><ArrowDown className={styles.playArrow} aria-hidden="true"/></span>}
                <button type="button" className="nv-global-audio-bar-toggle" onClick={needsSoundPermission && !muted ? playWithSound : togglePlayback} disabled={!ready} data-cursor="audio-play" aria-label={playing?"Pause recording":"Play recording"} aria-describedby={needsSoundPermission && !muted ? "capture-play-hint" : undefined}>{playing?<Pause/>:<Play/>}</button>
            </span>
            {expanded?<div className="nv-global-audio-bar-body"><div className="nv-global-audio-bar-copy"><strong>{transcript.title}</strong><small>{transcript.subtitle}</small></div><div className="nv-global-audio-bar-scrub"><span>{stamp(currentTime)}</span><input type="range" min={0} max={transcript.duration} step={.1} value={currentTime} aria-label="Seek recording" onChange={e=>seekAudio(Number(e.target.value))}/><span>{stamp(transcript.duration)}</span></div></div>:<span className="nv-global-audio-bar-mini-time">{stamp(currentTime)}</span>}
            <button type="button" className={"nv-global-audio-bar-close" + (muted ? " " + styles.enableSound : "")} onClick={needsSoundPermission && muted ? playWithSound : toggleSound} aria-describedby={needsSoundPermission ? "capture-play-hint" : undefined} aria-label={muted?"Unmute recording":"Mute recording"}>{muted?<><VolumeX/><span>Sound on</span></>:<Volume2/>}</button>
            <button type="button" className="nv-global-audio-bar-close" onClick={()=>setExpanded(!expanded)} aria-label={expanded?"Collapse audio player":"Expand audio player"}>{expanded?<ChevronDown/>:<ChevronUp/>}</button>
        </aside></div>}
        {error && <p className={styles.error} role="status">{error}</p>}
    </div>;
}
