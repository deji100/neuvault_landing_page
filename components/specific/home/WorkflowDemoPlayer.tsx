"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { FaExpand, FaPause, FaPlay } from "react-icons/fa";
import Logo from "@/public/logo.png";

type WorkflowDemoPlayerProps = {
  tag: string;
  url: string;
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
};

export default function WorkflowDemoPlayer({ tag, url }: WorkflowDemoPlayerProps) {
  const overlayVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const frameWidth = "min(300vw, 440px, calc(86dvh * 9 / 20))";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    const player = overlayVideoRef.current;
    if (player) {
      player.currentTime = 0;

      const autoplay = async () => {
        try {
          await player.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      };

      void autoplay();
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = previousOverflow;
      player?.pause();
    };
  }, [isOpen]);

  const togglePlayback = async () => {
    const player = overlayVideoRef.current;
    if (!player) return;

    if (player.paused || player.ended) {
      try {
        await player.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    player.pause();
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    const player = overlayVideoRef.current;
    const nextTime = Number(event.target.value);

    setCurrentTime(nextTime);
    if (player) {
      player.currentTime = nextTime;
    }
  };

  return (
    <>
      <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(11,19,34,0.92),rgba(9,15,27,0.78))] p-5 shadow-[0_30px_80px_-30px_rgba(63,140,255,0.45)]">
        <div className="mx-auto w-full max-w-[340px]">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[1.9rem] border border-white/15 bg-black shadow-[0_25px_60px_-25px_rgba(63,140,255,0.65)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(63,140,255,0.42),transparent_44%),radial-gradient(circle_at_80%_75%,rgba(16,185,129,0.26),transparent_42%),linear-gradient(180deg,#020611_0%,#050a16_100%)]" />
            <div className="absolute inset-x-5 bottom-[34%] top-14 rounded-[1.5rem] border border-white/10 bg-white/5 backdrop-blur-sm" />
            <div className="absolute left-1/2 top-[22%] h-1.5 w-20 -translate-x-1/2 rounded-full bg-white/20" />
            <div className="pointer-events-none absolute inset-x-0 top-[40%] flex -translate-y-1/2 justify-center">
              <Image
                src={Logo}
                alt="NeuVault"
                width={1600}
                height={1000}
                className="w-40 opacity-90"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
              <div className="inline-flex rounded-full bg-[#3F8CFF]/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8ec0ff]">
                {tag}
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-black/45 px-3 py-2 text-xs font-semibold text-white hover:bg-black/60"
              >
                <FaExpand size={10} />
                Open full demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-[1020] flex items-center justify-center p-2 sm:p-4">
          <button
            type="button"
            aria-label="Close demo overlay"
            className="absolute inset-0 bg-[#030714]/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative z-10" style={{ width: frameWidth }} onClick={(event) => event.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between px-1">
              <div className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9cc9ff] backdrop-blur-md">
                {tag}
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs text-white/90 hover:bg-black/55"
              >
                Close
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative aspect-[9/20] w-full overflow-hidden rounded-[2.2rem] border border-white/25 bg-white/10 shadow-[0_30px_80px_-25px_rgba(63,140,255,0.55)] backdrop-blur-2xl"
            >
              <div className="group relative h-full w-full bg-black">
                <video
                  ref={overlayVideoRef}
                  src={url}
                  className="absolute inset-0 h-full w-full scale-[0.99] object-cover"
                  preload="metadata"
                  playsInline
                  onLoadedMetadata={(event) => {
                    setDuration(event.currentTarget.duration || 0);
                    setCurrentTime(event.currentTarget.currentTime || 0);
                  }}
                  onTimeUpdate={(event) => {
                    setCurrentTime(event.currentTarget.currentTime || 0);
                  }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="pointer-events-none absolute left-1/2 top-1/2 z-20 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white opacity-0 backdrop-blur-lg transition group-hover:pointer-events-auto group-hover:opacity-100 hover:bg-black/55"
                  aria-label={isPlaying ? "Pause demo video" : "Play demo video"}
                >
                  {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
                </button>
              </div>
            </motion.div>

            <div className="mt-3 rounded-[1.2rem] border border-white/15 bg-black/45 px-4 py-2 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/8 text-white hover:bg-white/14"
                  aria-label={isPlaying ? "Pause demo video" : "Play demo video"}
                >
                  {isPlaying ? <FaPause size={10} /> : <FaPlay size={10} />}
                </button>
                <span className="w-10 shrink-0 text-xs text-white/60">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={Math.min(currentTime, duration || 0)}
                  onChange={handleSeek}
                  className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#3F8CFF]"
                  aria-label="Seek demo video"
                />
                <span className="w-10 shrink-0 text-right text-xs text-white/60">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

