"use client";
import { useEffect, useState, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { AudioLines, CalendarPlus, ExternalLink, FileText, Info, Minus, Pencil, Plus, RotateCcw, Sun, X } from "lucide-react";
import { TRANSCRIPT_TITLE } from "./captureTimeline";
import styles from "./TranscriptDocumentModal.module.css";
import "./TranscriptModalNative.css";

// Note-only presentation from desktop/components/intake/DesktopFullscreenPreview.tsx.
// Keep its header, panel, zoom controls and preview host; adapt file IO and the
// article slot to the landing page's single persistent recording session.
export default function TranscriptDocumentModal({ children, followControl, editorRef, onClose, onEdit }: {
    children: ReactNode; followControl: ReactNode; editorRef: RefObject<HTMLDivElement | null>;
    onClose: () => void; onEdit: () => void;
}) {
    const [zoom, setZoom] = useState(1);
    useEffect(() => {
        const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
        document.addEventListener("keydown", onKey); return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);
    const modal = <div className={"native-transcript-modal audio-native-scope " + styles.layer} role="dialog" aria-modal="true" aria-label={TRANSCRIPT_TITLE}>
        <div className={styles.backdrop}/>
        <section data-nv-modal-panel="true" className={"desktop-fullscreen-document-layout desktop-fullscreen-document-preview " + styles.modal}>
            <div className="desktop-fullscreen-preview-header desktop-modal-header flex items-center justify-between border-b px-6 py-5">
                <div className="desktop-fullscreen-preview-title-wrap min-w-0"><div className="desktop-fullscreen-preview-title-row flex min-w-0 items-center gap-3"><h3 className="desktop-fullscreen-preview-title truncate text-xl font-medium">{TRANSCRIPT_TITLE}</h3><span className="desktop-fullscreen-preview-pill shrink-0 rounded-full border px-3 py-1 text-xs">Html</span><span className="nv-audio-source-badge shrink-0"><AudioLines/>Audio</span></div></div>
                <div className={"flex shrink-0 items-center gap-2 " + styles.actions}>
                    <button className="desktop-fullscreen-preview-action desktop-fullscreen-preview-icon-action" aria-label="Document appearance" type="button"><Sun/></button>
                    <a href="/desktop-tour-media/audio/transcript.txt" target="_blank" rel="noreferrer" className="desktop-fullscreen-preview-action desktop-fullscreen-preview-icon-action" aria-label="Open file"><ExternalLink/></a>
                    <button className="desktop-fullscreen-preview-action" type="button" onClick={onEdit}><Pencil/>Edit note</button>
                    <button className="desktop-fullscreen-preview-action desktop-fullscreen-preview-icon-action" type="button" aria-label="Plan document"><CalendarPlus/></button>
                    <button className="desktop-fullscreen-preview-action desktop-fullscreen-preview-icon-action" type="button" aria-label="Details" title="Audio transcript · Entertainment & Leisure / Podcasts"><Info/></button>
                    <button className="desktop-fullscreen-preview-close" type="button" onClick={onClose} aria-label="Close document preview"><X/></button>
                </div>
            </div>
            <div className="desktop-fullscreen-preview-body desktop-fullscreen-preview-body--map desktop-linked-page min-h-0 flex-1 overflow-hidden">
                <div className={"desktop-fullscreen-preview-document desktop-fullscreen-preview-document--map desktop-fullscreen-preview-document--zoom flex h-full min-h-0 flex-1 flex-col overflow-hidden " + styles.document}>
                    <div className="desktop-fullscreen-preview-panel-header flex items-center justify-between border-b px-5 py-4"><div className="desktop-fullscreen-preview-panel-heading flex min-w-0 items-center gap-3"><FileText/><p className="desktop-fullscreen-preview-panel-eyebrow">Note</p>{followControl}</div><div className="desktop-fullscreen-preview-zoom-controls flex items-center gap-1.5">
                        <button type="button" className="desktop-fullscreen-preview-zoom-button" aria-label="Zoom out" disabled={zoom <= .6} onClick={() => setZoom(value => Math.max(.6, value - .1))}><Minus/></button><button className="desktop-fullscreen-preview-zoom-value" type="button" onClick={() => setZoom(1)}>{Math.round(zoom * 100)}%</button><button type="button" className="desktop-fullscreen-preview-zoom-button" aria-label="Zoom in" disabled={zoom >= 1.6} onClick={() => setZoom(value => Math.min(1.6, value + .1))}><Plus/></button><button type="button" className="desktop-fullscreen-preview-zoom-button" aria-label="Reset zoom" onClick={() => setZoom(1)}><RotateCcw/></button>
                    </div></div>
                    <div ref={editorRef} className={"desktop-fullscreen-preview-scroll desktop-fullscreen-preview-map-scroll " + styles.scroll} tabIndex={0} aria-label="Audio summary and transcript">
                        <div className="desktop-preview-zoom-surface desktop-fullscreen-preview-map-surface"><div className="linked-document-map-view desktop-fullscreen-preview-map-host desktop-fullscreen-preview-map-host--zoom"><div className="linked-document-map-view document-view-modal desktop-fullscreen-preview-map-pane"><article className={"document-inline-scroll linked-map-html-note-preview note-inline-viewer " + styles.paper} style={{ fontSize: 16 * zoom }}>{children}</article></div></div></div>
                    </div>
                </div>
            </div>
        </section>
    </div>;
    const canvas = typeof document === "undefined" ? null : document.querySelector("#capture .nv-capture-desktop");
    return canvas ? createPortal(modal, canvas) : modal;
}
