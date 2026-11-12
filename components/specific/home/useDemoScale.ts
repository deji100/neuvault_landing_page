"use client";
import { useEffect, useState, type RefObject } from "react";

export function useDemoScale(viewport: RefObject<HTMLDivElement | null>) {
    const [scale, setScale] = useState(1);
    useEffect(() => {
        const element = viewport.current;
        if (!element) return;
        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            const expanded = !!element.closest('[data-demo-expanded="true"]');
            setScale(expanded ? Math.min(width / 1600, height / 1080) : width / 1600);
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, [viewport]);
    return scale;
}
