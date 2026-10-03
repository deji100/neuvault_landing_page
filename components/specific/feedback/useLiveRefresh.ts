"use client";

import { useEffect, useRef } from "react";

/** How often an open board or post page checks for new posts, votes and comments. */
export const LIVE_REFRESH_MS = 60_000;

/**
 * Calls `refresh` every `intervalMs`, only while this page is mounted and its
 * tab is in front. Leaving the page or switching tabs stops it. Coming back
 * refreshes at once if a full interval has passed, so it never runs more
 * often than once per interval.
 */
export function useLiveRefresh(refresh: () => void, intervalMs = LIVE_REFRESH_MS, enabled = true) {
  const latest = useRef(refresh);
  latest.current = refresh;

  useEffect(() => {
    if (!enabled) return undefined;
    let timer: number | undefined;
    // The page has just loaded its data, which counts as the first check.
    let lastRun = Date.now();
    const run = () => {
      lastRun = Date.now();
      latest.current();
    };
    const stop = () => window.clearTimeout(timer);
    const schedule = () => {
      stop();
      timer = window.setTimeout(() => {
        run();
        schedule();
      }, Math.max(0, intervalMs - (Date.now() - lastRun)));
    };
    const onVisibility = () => (document.visibilityState === "visible" ? schedule() : stop());

    if (document.visibilityState === "visible") schedule();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [intervalMs, enabled]);
}
