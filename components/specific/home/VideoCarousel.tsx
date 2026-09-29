"use client";

import { ExternalLink, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { visibleYouTubeVideos as videos, type YouTubeVideo } from "@/lib/youtube-videos";

import { CarouselControls, useCarousel } from "./carousel";
import styles from "./VideoCarousel.module.css";

const INTERVAL = 6000;

function VideoCard({ video, onPlay }: { video: YouTubeVideo; onPlay: () => void }) {
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`);

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {!video.id ? (
          <div className={styles.placeholder} aria-hidden="true">
            <span className={styles.playBadge}><Play size={20} fill="currentColor" strokeWidth={0} /></span>
            <span className={styles.soon}>Video coming soon</span>
          </div>
        ) : (
          <button type="button" className={styles.poster} onClick={onPlay} aria-label={`Play video: ${video.title}`}>
            {/* Plain img: YouTube thumbnails are not a configured next/image remote pattern. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt=""
              loading="lazy"
              draggable={false}
              style={video.thumbZoom ? { transform: `scale(${video.thumbZoom})` } : undefined}
              // maxresdefault is missing for some uploads; YouTube serves a 120px grey stub instead.
              onLoad={(event) => {
                if (event.currentTarget.naturalWidth <= 120) setThumb(`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`);
              }}
            />
            <span className={styles.playBadge}><Play size={20} fill="currentColor" strokeWidth={0} /></span>
            {video.duration && <span className={styles.duration}>{video.duration}</span>}
          </button>
        )}
      </div>
      <div className={styles.body}>
        <p className={styles.source}>YouTube</p>
        <h3>{video.title}</h3>
        <p>{video.summary}</p>
      </div>
    </article>
  );
}

/** Plays one walkthrough in a native modal dialog: Esc, focus trapping and the backdrop come free. */
function VideoModal({ video, onClose }: { video: YouTubeVideo | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (video && !dialog.open) dialog.showModal();
    if (!video && dialog.open) dialog.close();
  }, [video]);

  // The page behind stays put while the dialog is open.
  useEffect(() => {
    if (!video) return;
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = overflow;
    };
  }, [video]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      aria-label={video ? `Video: ${video.title}` : undefined}
      onClose={onClose}
      // A click on the backdrop lands on the dialog element itself.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {video && (
        <div className={styles.modalInner}>
          <div className={styles.modalBar}>
            <div>
              <p className={styles.source}>NeuVault walkthrough{video.duration ? ` · ${video.duration}` : ""}</p>
              <h3>{video.title}</h3>
            </div>
            <button type="button" className={styles.close} onClick={onClose} aria-label="Close video">
              <X size={18} strokeWidth={2.4} aria-hidden="true" />
            </button>
          </div>
          <div className={styles.player}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className={styles.modalFoot}>
            <p>{video.summary}</p>
            <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
              Watch on YouTube <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}

/**
 * Walkthrough cards on a native scroll-snap track, so touch swipes and
 * trackpads feel right. Autoplay steps one card at a time, pauses while a
 * video is open, and picks up again when it closes.
 */
export default function VideoCarousel() {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [stops, setStops] = useState(videos.length);
  const [open, setOpen] = useState<YouTubeVideo | null>(null);
  const resumeRef = useRef(false);
  const carousel = useCarousel(stops, INTERVAL);
  const { index, go, rootProps, playing, setPlaying } = carousel;

  // How many start positions the track has, given how many cards fit at once.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const card = track.children[0] as HTMLElement | undefined;
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const perView = Math.max(1, Math.round((track.clientWidth + gap) / (card.offsetWidth + gap)));
      setStops(Math.max(1, videos.length - perView + 1));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  // Index drives the scroll position...
  useEffect(() => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    const left = card.offsetLeft - track.offsetLeft;
    if (Math.abs(track.scrollLeft - left) > 2) track.scrollTo({ left, behavior: "smooth" });
  }, [index]);

  // ...and a manual swipe or scroll feeds back into the index once it settles.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let timer: number | undefined;
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const cards = Array.from(track.children) as HTMLElement[];
        let nearest = 0;
        cards.forEach((card, i) => {
          const distance = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
          const best = Math.abs(cards[nearest].offsetLeft - track.offsetLeft - track.scrollLeft);
          if (distance < best) nearest = i;
        });
        go(Math.min(nearest, stops - 1));
      }, 140);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, [go, stops]);

  if (videos.length === 0) return null;

  return (
    <div className={styles.carousel} aria-roledescription="carousel" aria-label="NeuVault video walkthroughs" {...rootProps}>
      <div className={styles.head}>
        <div>
          <p className={styles.kicker}>Walkthroughs</p>
          <h2>Watch it work.</h2>
          <p>Short videos of the real app, start to finish.</p>
        </div>
        {stops > 1 && (
          <CarouselControls
            carousel={carousel}
            items={videos.slice(0, stops).map((video) => video.title)}
            interval={INTERVAL}
            label="video"
          />
        )}
      </div>

      <ul className={styles.track} ref={trackRef}>
        {videos.map((video, i) => (
          <li key={`${video.title}-${i}`} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${videos.length}`}>
            <VideoCard
              video={video}
              onPlay={() => {
                resumeRef.current = playing;
                setPlaying(false);
                setOpen(video);
              }}
            />
          </li>
        ))}
      </ul>

      <VideoModal
        video={open}
        onClose={() => {
          setOpen(null);
          if (resumeRef.current) setPlaying(true);
          resumeRef.current = false;
        }}
      />
    </div>
  );
}
