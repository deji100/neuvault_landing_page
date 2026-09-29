"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { demoPosterSrc, demoVideoSrc, stripClips } from "@/lib/demo-videos";

import styles from "./VideoStrip.module.css";

/** Shared height for every frame; the aspect ratios decide the widths. */
const FRAME_HEIGHT = 380;

/**
 * Clips only start downloading once the strip is actually on screen. Three
 * autoplaying clips is several megabytes that visitors who never scroll this
 * far should not pay for.
 */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export default function VideoStrip() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div className={styles.strip} ref={ref}>
      {stripClips.map((clip) => {
        const width = Math.round((clip.width / clip.height) * FRAME_HEIGHT);
        const poster = clip.url ? demoPosterSrc(clip.url, 480, clip.trim) : undefined;

        return (
          <figure key={clip.id} className={styles.frame} style={{ width }}>
            <div
              className={styles.screen}
              style={{ aspectRatio: `${clip.width} / ${clip.height}` }}
            >
              {clip.url ? (
                inView ? (
                  <video
                    src={demoVideoSrc(clip.url, 480, clip.trim)}
                    poster={poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-label={clip.label}
                  />
                ) : (
                  /* Plain img: the poster is a Cloudinary URL, not a configured
                     next/image remote pattern. */
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={poster} alt="" />
                )
              ) : (
                clip.image && (
                  <Image
                    src={clip.image}
                    alt={clip.label}
                    width={clip.width}
                    height={clip.height}
                    sizes="(min-width: 900px) 620px, 92vw"
                  />
                )
              )}
            </div>
            <figcaption>{clip.label}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
