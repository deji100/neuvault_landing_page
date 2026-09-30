"use client";

import { useEffect, useRef, useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";

import styles from "./ScreenshotViewer.module.css";

/** Phones only: on larger screens the carousel already shows screenshots big enough. */
export const VIEWER_QUERY = "(max-width: 760px)";

export type ViewerShot = { src: string; alt: string; width: number; height: number };

/**
 * Tap-to-open props for a carousel slide. A tap opens the viewer; a swipe
 * (the carousel's own gesture) does not, because the pointer moved.
 */
export function useViewerTrigger(onOpen: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  return {
    onPointerDown: (event: React.PointerEvent) => {
      start.current = { x: event.clientX, y: event.clientY };
    },
    onClick: (event: React.MouseEvent) => {
      const origin = start.current;
      start.current = null;
      if (!window.matchMedia?.(VIEWER_QUERY).matches) return;
      if (origin && Math.hypot(event.clientX - origin.x, event.clientY - origin.y) > 10) return;
      onOpen();
    },
  };
}

/**
 * A full-screen, full-resolution view of one screenshot. Pinch to zoom works
 * as normal, and the zoom button (or a double tap) enlarges it so it can be
 * panned by scrolling. Escape, the close button or a tap outside closes it.
 */
export default function ScreenshotViewer({ shot, onClose }: { shot: ViewerShot | null; onClose: () => void }) {
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!shot) return undefined;
    setZoomed(false);
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [shot, onClose]);

  if (!shot) return null;

  return (
    <div className={styles.viewer} role="dialog" aria-modal="true" aria-label={shot.alt}>
      <div className={styles.bar}>
        <button type="button" className={styles.button} onClick={() => setZoomed((value) => !value)} aria-label={zoomed ? "Zoom out" : "Zoom in"}>
          {zoomed ? <ZoomOut size={18} aria-hidden="true" /> : <ZoomIn size={18} aria-hidden="true" />}
        </button>
        <button ref={closeRef} type="button" className={styles.button} onClick={onClose} aria-label="Close">
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      <div
        className={styles.scroller}
        data-zoomed={zoomed || undefined}
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        {/* The original file, not a resized copy, so text stays sharp when zoomed. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          className={styles.image}
          onDoubleClick={() => setZoomed((value) => !value)}
          draggable={false}
        />
      </div>
      <p className={styles.hint}>{zoomed ? "Scroll to look around" : "Pinch or tap + to zoom"}</p>
    </div>
  );
}
