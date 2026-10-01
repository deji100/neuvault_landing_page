"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import styles from "./carousel.module.css";

const SWIPE_THRESHOLD = 40;
/** Share of the carousel (or of the window, for tall ones) that must be showing for autoplay. */
const IN_VIEW = 0.6;

/**
 * Auto-advancing carousel state. Autoplay keeps going under the pointer (people
 * should not have to know that hovering stops it); it stops for keyboard focus,
 * the pause button, a hidden tab or an off-screen carousel, and resumes where it
 * left off.
 * It starts paused for visitors who ask for reduced motion.
 */
export function useCarousel(count: number, interval: number) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const remaining = useRef(interval);
  const timedIndex = useRef(0);

  const running = playing && !focused && visible && pageVisible;

  const go = useCallback((target: number) => setIndex(((target % count) + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  // Stops can shrink (the video track measures how many cards fit).
  useEffect(() => setIndex((i) => Math.min(i, count - 1)), [count]);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) setPlaying(false);

    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);

    const node = rootRef.current;
    let observer: IntersectionObserver | undefined;
    if (node && typeof IntersectionObserver !== "undefined") {
      // "In view" means most of the carousel is on screen, or, for one taller than the
      // window, that it fills most of the window. A sliver at the edge never counts.
      observer = new IntersectionObserver(
        ([entry]) => {
          const viewport = entry.rootBounds?.height ?? window.innerHeight;
          const shown = entry.intersectionRect.height;
          setVisible(entry.isIntersecting && (entry.intersectionRatio >= IN_VIEW || shown >= viewport * IN_VIEW));
        },
        { threshold: [0, 0.2, 0.4, 0.6, 0.7, 0.8, 1] },
      );
      observer.observe(node);
    } else {
      setVisible(true);
    }

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    // A new slide gets a full interval; a resumed one keeps what was left.
    if (timedIndex.current !== index) {
      timedIndex.current = index;
      remaining.current = interval;
    }
    if (!running) return;
    const started = performance.now();
    const timer = window.setTimeout(next, remaining.current);
    return () => {
      window.clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (performance.now() - started));
    };
  }, [running, index, next, interval]);

  const swipeStart = useRef<number | null>(null);

  const rootProps = {
    ref: rootRef,
    // Only keyboard focus pauses: a mouse click on an arrow or dot focuses it too,
    // and that should not freeze the carousel.
    onFocus: (event: React.FocusEvent<HTMLDivElement>) => {
      if ((event.target as HTMLElement).matches?.(":focus-visible")) setFocused(true);
    },
    onBlur: (event: React.FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
    },
    onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
      }
    },
  };

  const swipeProps = {
    onPointerDown: (event: React.PointerEvent) => {
      swipeStart.current = event.clientX;
    },
    onPointerUp: (event: React.PointerEvent) => {
      if (swipeStart.current === null) return;
      const delta = event.clientX - swipeStart.current;
      swipeStart.current = null;
      if (delta <= -SWIPE_THRESHOLD) next();
      else if (delta >= SWIPE_THRESHOLD) prev();
    },
    onPointerCancel: () => {
      swipeStart.current = null;
    },
  };

  return { index, go, next, prev, playing, setPlaying, running, rootProps, swipeProps };
}

export type Carousel = ReturnType<typeof useCarousel>;

/** Prev / segmented progress / next / play-pause, shared by every home carousel. */
export function CarouselControls({
  carousel,
  items,
  interval,
  label,
}: {
  carousel: Carousel;
  /** One accessible name per stop. */
  items: string[];
  interval: number;
  label: string;
}) {
  const { index, go, next, prev, playing, setPlaying, running } = carousel;

  return (
    <div className={styles.controls}>
      <button type="button" className={styles.arrow} onClick={prev} aria-label={`Previous ${label} screen`}>
        <ChevronLeft size={18} strokeWidth={2.2} aria-hidden="true" />
      </button>

      <div className={styles.segments} role="group" aria-label={`Choose a ${label} screen`}>
        {items.map((item, i) => (
          <button
            key={item}
            type="button"
            className={styles.segment}
            data-state={i === index ? "active" : i < index ? "done" : "next"}
            onClick={() => go(i)}
            aria-label={`${i + 1} of ${items.length}: ${item}`}
            aria-current={i === index ? "true" : undefined}
          >
            <span
              key={i === index ? `active-${index}` : "idle"}
              className={styles.fill}
              style={
                i === index
                  ? ({
                      animationDuration: `${interval}ms`,
                      animationPlayState: running ? "running" : "paused",
                    } as CSSProperties)
                  : undefined
              }
            />
          </button>
        ))}
      </div>

      <button type="button" className={styles.arrow} onClick={next} aria-label={`Next ${label} screen`}>
        <ChevronRight size={18} strokeWidth={2.2} aria-hidden="true" />
      </button>

      <button
        type="button"
        className={styles.play}
        onClick={() => setPlaying(!playing)}
        aria-label={playing ? `Pause ${label} slideshow` : `Play ${label} slideshow`}
        aria-pressed={!playing}
      >
        {playing ? <Pause size={14} strokeWidth={2.4} aria-hidden="true" /> : <Play size={14} strokeWidth={2.4} aria-hidden="true" />}
      </button>
    </div>
  );
}
