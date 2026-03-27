"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaChevronLeft,
  FaChevronRight,
  FaFileInvoiceDollar,
  FaHeartbeat,
  FaIdCard,
  FaMicrophone,
  FaPause,
  FaPlay,
} from "react-icons/fa";
import Logo from "@/public/logo.png";

type DemoVideo = {
  title: string;
  summary: string;
  tag: string;
  url: string;
};

const demoHighlights = [
  "10 short demos",
  "Core product workflows",
  "Best way to understand the relief fast",
];

const scenarios = [
  {
    icon: <FaFileInvoiceDollar className="text-[#3F8CFF]" size={28} />,
    title: "Business and finance",
    description:
      "Keep invoices, receipts, and statements in one place, then ask NeuVault to summarize, find totals, or pull up what you need without the scramble.",
  },
  {
    icon: <FaMicrophone className="text-emerald-300" size={28} />,
    title: "Voice, meetings, and lectures",
    description:
      "Record voice notes or upload existing audio, then convert them into transcripts that are searchable and easier to act on.",
  },
  {
    icon: <FaHeartbeat className="text-pink-400" size={28} />,
    title: "Health and medical",
    description:
      "Store hospital documents, lab results, and prescriptions so they remain organized, searchable, and easier to revisit later.",
  },
  {
    icon: <FaBookOpen className="text-yellow-400" size={28} />,
    title: "School and research",
    description:
      "Keep course PDFs, scanned notes, and references together so you can stop losing study context across folders and note apps.",
  },
  {
    icon: <FaIdCard className="text-green-400" size={28} />,
    title: "Life documents",
    description:
      "IDs, visas, warranties, agreements, and personal records stay portable, encrypted, and much easier to find when they matter.",
  },
];

const demoVideos: DemoVideo[] = [
  {
    title: "Smart Upload Intake",
    summary: "Drop in an existing file and let NeuVault organize key details for you.",
    tag: "Upload",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1772991651/Smart_Upload_Intake_lloxab.mp4",
  },
  {
    title: "Smart Scan Intake",
    summary: "Scan a physical document and turn it into a clean digital record.",
    tag: "Scan",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1773013073/smart-scan-intake_e2unwg.mp4",
  },
  {
    title: "Smart Note Intake",
    summary: "Capture a quick note and convert it into a structured vault item.",
    tag: "Notes",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1772991960/Smart_Note_Intake_ryp2nt.mp4",
  },
  {
    title: "Smart Voice Note Intake",
    summary: "Turn voice into a searchable record that stays linked to the rest of your vault.",
    tag: "Voice",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1773013045/smart-voice-note-intake_m2mype.mp4",
  },
  {
    title: "Smart Suggestions",
    summary: "Get context-aware prompts for summaries, reminders, and follow-up actions.",
    tag: "Suggestions",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1773013022/smart-suggestion_yasmtv.mp4",
  },
  {
    title: "Document Resurfacing",
    summary: "Bring an important document back when the timing matters again.",
    tag: "Resurface",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1773013061/document-resurfacing_nddqkc.mp4",
  },
  {
    title: "Document Linking",
    summary: "Connect related files so one issue can stay together as a usable set.",
    tag: "Links",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1773013074/document-linking_llqage.mp4",
  },
  {
    title: "Nova Assistant",
    summary: "Ask natural questions and get answers from your vault in seconds.",
    tag: "Assistant",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1773013051/nova-assistant_jfn3am.mp4",
  },
  {
    title: "Settings and Backup",
    summary: "Review privacy choices, backup flow, and restore behavior in one place.",
    tag: "Security",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1773013053/setting-and-backup_fw3di5.mp4",
  },
  {
    title: "Offline Smart Intake",
    summary: "Capture while offline and process safely when your connection comes back.",
    tag: "Offline",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1773042420/offline_smart_intake_og8tfk.mp4",
  },
];

type VideoPhoneOverlayProps = {
  videoIndex: number | null;
  videos: DemoVideo[];
  onClose: () => void;
  onSelectVideo: (index: number) => void;
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

function VideoPhoneOverlay({ videoIndex, videos, onClose, onSelectVideo }: VideoPhoneOverlayProps) {
  const video = videoIndex !== null ? videos[videoIndex] : null;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const frameWidth = "min(300vw, 440px, calc(86dvh * 9 / 20))";

  const togglePlayback = async () => {
    const player = videoRef.current;
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
    const player = videoRef.current;
    const nextTime = Number(event.target.value);

    setCurrentTime(nextTime);
    if (player) {
      player.currentTime = nextTime;
    }
  };

  const goToNextVideo = useCallback(() => {
    if (videoIndex === null || videos.length === 0) {
      return;
    }

    onSelectVideo((videoIndex + 1) % videos.length);
  }, [onSelectVideo, videoIndex, videos.length]);

  useEffect(() => {
    if (!video) return;

    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    const player = videoRef.current;
    if (player) {
      player.currentTime = 0;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    const autoplay = async () => {
      if (!player) return;
      try {
        await player.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    void autoplay();

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = previousOverflow;
      player?.pause();
    };
  }, [video, onClose]);

  if (!video) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1020] flex items-center justify-center p-2 sm:p-4">
      <button
        type="button"
        aria-label="Close demo overlay"
        className="absolute inset-0 bg-[#030714]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10" style={{ width: frameWidth }} onClick={(event) => event.stopPropagation()}>
        <div className="mb-2 flex items-center justify-between px-1">
          <div className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9cc9ff] backdrop-blur-md">
            {video.tag}
          </div>
          <button
            type="button"
            onClick={onClose}
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
              key={video.url}
              ref={videoRef}
              src={video.url}
              className="absolute inset-0 h-full w-full scale-[0.99] object-cover"
              preload="auto"
              playsInline
              onLoadedMetadata={(event) => {
                setDuration(event.currentTarget.duration || 0);
              }}
              onTimeUpdate={(event) => {
                setCurrentTime(event.currentTarget.currentTime || 0);
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={goToNextVideo}
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
  );
}

export default function SeeItInAction() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [overlayIndex, setOverlayIndex] = useState<number | null>(null);
  const totalVideos = demoVideos.length;
  const swipeThreshold = 60;

  const getWrappedIndex = useCallback(
    (value: number) => (value + totalVideos) % totalVideos,
    [totalVideos]
  );

  const slideOffsets = useMemo(() => {
    const half = totalVideos / 2;
    return demoVideos.map((_, index) => {
      let offset = index - activeIndex;
      if (offset > half) offset -= totalVideos;
      if (offset < -half) offset += totalVideos;
      return offset;
    });
  }, [activeIndex, totalVideos]);

  const goToSlide = (index: number) => {
    setActiveIndex(getWrappedIndex(index));
  };

  return (
    <section id="see-it-in-action" className="relative border-t border-white/10 px-6 py-24 text-white">
      <motion.div
        className="absolute -top-40 left-1/2 h-[780px] w-[780px] -translate-x-1/2 rounded-full bg-[#3F8CFF]/10 blur-[140px]"
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
            See the relief in action
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
            Watch scattered information become usable.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
            The fastest way to understand NeuVault is to watch the moments that usually create friction: capture, organization, reminders, assistant help, offline intake, and encrypted backup.
          </p>
        </motion.div>

        <div className="mt-8 flex flex-wrap gap-3">
          {demoHighlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/76"
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => goToSlide(activeIndex - 1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm text-white/90 hover:bg-white/10 sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-2"
            aria-label="Previous demo video"
          >
            <FaChevronLeft size={12} />
            <span className="hidden sm:inline">Prev</span>
          </button>
          <p className="text-xs text-white/60 sm:text-sm">
            {activeIndex + 1}/{totalVideos} demos
          </p>
          <button
            type="button"
            onClick={() => goToSlide(activeIndex + 1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm text-white/90 hover:bg-white/10 sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-2"
            aria-label="Next demo video"
          >
            <span className="hidden sm:inline">Next</span>
            <FaChevronRight size={12} />
          </button>
        </div>

        <motion.div
          className="relative mt-4 h-[520px] cursor-grab touch-pan-y active:cursor-grabbing sm:h-[610px]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x >= swipeThreshold) {
              goToSlide(activeIndex - 1);
              return;
            }

            if (info.offset.x <= -swipeThreshold) {
              goToSlide(activeIndex + 1);
            }
          }}
        >
          {demoVideos.map((video, index) => {
            const offset = slideOffsets[index];
            const distance = Math.abs(offset);
            const isActive = index === activeIndex;

            if (distance > 2) return null;

            return (
              <motion.div
                key={video.url}
                initial={false}
                animate={{
                  x: offset * 200,
                  scale: isActive ? 1 : distance === 1 ? 0.92 : 0.84,
                  opacity: 1,
                  zIndex: 100 - distance,
                }}
                transition={{ type: "spring", stiffness: 240, damping: 28 }}
                className="absolute left-1/2 top-1/2 w-[65vw] min-w-[240px] max-w-[340px] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => goToSlide(index)}
              >
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
                      {video.tag}
                    </div>
                    <h3 className="mt-2 text-base font-semibold leading-tight text-white">
                      {video.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/75">
                      {video.summary}
                    </p>
                    <button
                      type="button"
                      className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/45 px-3 py-2 text-xs font-semibold text-white hover:bg-black/60"
                      onClick={(event) => {
                        event.stopPropagation();
                        setOverlayIndex(index);
                      }}
                      aria-label={`Open ${video.title} in overlay`}
                    >
                      <FaPlay size={10} />
                      Watch demo
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {demoVideos.map((video, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={video.title}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to ${video.title}`}
                className={`h-2.5 rounded-full transition-all ${
                  isActive ? "w-7 bg-[#3F8CFF]" : "w-2.5 bg-white/35 hover:bg-white/55"
                }`}
              />
            );
          })}
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {scenarios.map((item, index) => (
            <motion.div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              viewport={{ once: true }}
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/62">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <VideoPhoneOverlay
        videoIndex={overlayIndex}
        videos={demoVideos}
        onClose={() => setOverlayIndex(null)}
        onSelectVideo={setOverlayIndex}
      />
    </section>
  );
}
