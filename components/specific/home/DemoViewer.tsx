"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import styles from "./CaptureDemo.module.css";

export default function DemoViewer({ label, children }: { label: string; children: ReactNode }) {
    const container = useRef<HTMLDivElement>(null), button = useRef<HTMLButtonElement>(null);
    const fullscreenOwned = useRef(false), priorFocus = useRef<HTMLElement | null>(null);
    const [expanded, setExpanded] = useState(false), [height, setHeight] = useState(0);
    function close() {
        setExpanded(false);
        if (document.fullscreenElement === container.current) void document.exitFullscreen().catch(() => {});
    }
    function open() {
        priorFocus.current = document.activeElement as HTMLElement | null;
        setHeight(container.current?.getBoundingClientRect().height ?? 0);
        setExpanded(true);
        // Fullscreen/orientation locking is optional; the fixed viewer also works on iOS.
        const element = container.current;
        if (element?.requestFullscreen) void element.requestFullscreen().then(() => {
            fullscreenOwned.current = true;
            const orientation = screen.orientation as ScreenOrientation & { lock?: (value: string) => Promise<void> };
            void orientation?.lock?.("landscape").catch(() => {});
        }).catch(() => {});
    }
    useEffect(() => {
        if (!expanded) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        button.current?.focus({ preventScroll: true });
        const keyboard = (event: KeyboardEvent) => {
            if (event.key === "Escape") { event.preventDefault(); setExpanded(false); if (document.fullscreenElement === container.current) void document.exitFullscreen().catch(() => {}); }
            if (event.key === "Tab") {
                const controls = Array.from(container.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), [tabindex="0"]') ?? []).filter(element => !element.closest('[inert]') && element.getClientRects().length > 0);
                const first = controls[0], last = controls.at(-1);
                if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
                else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
            }
        };
        const fullscreen = () => { if (fullscreenOwned.current && document.fullscreenElement !== container.current) setExpanded(false); };
        document.addEventListener("keydown", keyboard);
        document.addEventListener("fullscreenchange", fullscreen);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", keyboard);
            document.removeEventListener("fullscreenchange", fullscreen);
            if (fullscreenOwned.current) screen.orientation?.unlock?.();
            fullscreenOwned.current = false;
            priorFocus.current?.focus({ preventScroll: true });
        };
    }, [expanded]);
    return <div style={expanded ? { height } : undefined}>
        <div ref={container} className={`${styles.demo} ${expanded ? styles.expanded : ""}`} data-demo-expanded={expanded} role={expanded ? "dialog" : undefined} aria-modal={expanded || undefined} aria-label={expanded ? `${label} demo` : undefined}>
            {children}
            {expanded && <span className={styles.rotateHint}>Turn your phone sideways for a wider view</span>}
            <button ref={button} className={styles.expandButton} type="button" onClick={expanded ? close : open} aria-label={`${expanded ? "Exit expanded" : "Expand"} ${label} demo`} title={expanded ? "Exit expanded view" : "Expand demo"}>{expanded ? <Minimize2 size={18}/> : <Maximize2 size={18}/>}</button>
        </div>
    </div>;
}
