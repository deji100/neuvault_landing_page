"use client";
import { useEffect, useSyncExternalStore, type RefObject } from "react";

// One shared focus decision keeps the tour clocks, media and site chrome in sync.
const demos = new Map<string, HTMLElement>();
const listeners = new Set<() => void>();
let focused: string | null = null;
let frame = 0;
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
const snapshot = () => focused;
const serverSnapshot = () => null;

function measure() {
    frame = 0;
    let next: string | null = null;
    let closest = Infinity;
    if (!document.hidden) {
        const center = window.innerHeight / 2;
        for (const [id, element] of demos) {
            const rect = element.getBoundingClientRect();
            const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
            // A heading or a sliver of the canvas must not start the demo.
            if (rect.width <= 0 || rect.height <= 0 || rect.right <= 0 || rect.left >= window.innerWidth ||
                rect.top > center || rect.bottom < center ||
                visibleHeight < Math.min(rect.height, window.innerHeight) * 0.5) continue;
            const distance = Math.abs((rect.top + rect.bottom) / 2 - center);
            if (distance < closest) { closest = distance; next = id; }
        }
    }
    if (focused !== next) {
        focused = next;
        listeners.forEach(listener => listener());
    }
}
function schedule() { if (!frame) frame = requestAnimationFrame(measure); }

export function useDemoFocus(id: string, viewport: RefObject<HTMLElement | null>) {
    const current = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
    useEffect(() => {
        const element = viewport.current;
        if (!element) return;
        demos.set(id, element);
        window.addEventListener("scroll", schedule, { passive: true, capture: true });
        window.addEventListener("resize", schedule);
        document.addEventListener("visibilitychange", schedule);
        const resize = new ResizeObserver(schedule);
        resize.observe(element);
        schedule();
        return () => {
            demos.delete(id);
            resize.disconnect();
            // Shared listeners are only removed when the last demo unmounts.
            if (!demos.size) {
                window.removeEventListener("scroll", schedule, true);
                window.removeEventListener("resize", schedule);
                document.removeEventListener("visibilitychange", schedule);
            }
            schedule();
        };
    }, [id, viewport]);
    return current === id;
}

export function useAnyDemoFocused() {
    return useSyncExternalStore(subscribe, snapshot, serverSnapshot) !== null;
}
