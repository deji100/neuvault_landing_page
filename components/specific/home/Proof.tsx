"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const scenarios = [
  {
    icon: <FaFileInvoiceDollar className="text-[#3F8CFF]" size={28} />,
    title: "Business & Finance",
    description:
      "Store invoices, receipts, and statements, then ask Nova to summarize, find totals, or export a clean PDF/Excel report when you need it.",
  },
  {
    icon: <FaMicrophone className="text-emerald-300" size={28} />,
    title: "Voice, Meetings & Lectures",
    description:
      "Record a voice note in NeuVault or upload existing audio (WhatsApp notes, recordings). Get a structured transcript you can search, keep, and convert.",
  },
  {
    icon: <FaHeartbeat className="text-pink-400" size={28} />,
    title: "Health & Medical",
    description:
      "Keep lab results, prescriptions, and hospital documents organized, searchable, summarized, and easy to retrieve when you need them again.",
  },
  {
    icon: <FaBookOpen className="text-yellow-400" size={28} />,
    title: "School & Research",
    description:
      "Organize course PDFs and scanned notes, summarized, tagged, and grouped so you can find what matters fast.",
  },
  {
    icon: <FaIdCard className="text-green-400" size={28} />,
    title: "Life Documents",
    description:
      "IDs, visas, warranties, and agreements stored on-device, backed up as encrypted export bundles, and restorable inside NeuVault.",
  },
];

const demoVideos: DemoVideo[] = [
  {
    title: "Smart Scan Intake",
    summary: "Scan physical documents and convert them into clean digital entries.",
    tag: "Scan",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1773013073/smart-scan-intake_e2unwg.mp4",
  },
  {
    title: "Smart Note Intake",
    summary:
      "Capture fast notes and instantly convert them into structured records.",
    tag: "Notes",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1772991960/Smart_Note_Intake_ryp2nt.mp4",
  },
  {
    title: "Smart Voice Note Intake",
    summary: "Turn voice notes into organized, searchable records automatically.",
    tag: "Voice",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1773013045/smart-voice-note-intake_m2mype.mp4",
  },
  {
    title: "Smart Upload Intake",
    summary:
      "Drop files and let NeuVault auto-categorize key details in seconds.",
    tag: "Intake",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1772991651/Smart_Upload_Intake_lloxab.mp4",
  },
  {
    title: "Smart Suggestions",
    summary:
      "Get context-aware prompts for summaries, reminders, and follow-ups.",
    tag: "AI Assist",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1773013022/smart-suggestion_yasmtv.mp4",
  },
  {
    title: "Document Resurfacing",
    summary: "Surface forgotten files exactly when they are relevant again.",
    tag: "Resurface",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1773013061/document-resurfacing_nddqkc.mp4",
  },
  {
    title: "Document Linking",
    summary: "Link related files together for faster retrieval and richer context.",
    tag: "Links",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1773013074/document-linking_llqage.mp4",
  },
  {
    title: "Nova Assistant",
    summary: "Ask Nova natural questions and get instant answers from your files.",
    tag: "Assistant",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1773013051/nova-assistant_jfn3am.mp4",
  },
  {
    title: "Settings & Backup",
    summary: "Control backup flow, privacy choices, and restore behavior in one place.",
    tag: "Security",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1773013053/setting-and-backup_fw3di5.mp4",
  },
  {
    title: "Offline Smart Intake",
    summary: "Capture offline and sync safely once your connection is back.",
    tag: "Offline",
    url: "https://res.cloudinary.com/dos5wwgty/video/upload/v1773042420/offline_smart_intake_og8tfk.mp4",
  },
];

type VideoPhoneOverlayProps = {
  video: DemoVideo | null;
  onClose: () => void;
};

function VideoPhoneOverlay({ video, onClose }: VideoPhoneOverlayProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
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

  useEffect(() => {
    if (!video) return;

    setIsPlaying(false);
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
        className="absolute inset-0 bg-[#030714]/78 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative z-10"
        style={{ width: frameWidth }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-2 flex items-center justify-between px-1">
          <div className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9cc9ff] backdrop-blur-md">
            {video.tag}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs text-white/90 hover:bg-black/55 transition"
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
              className="absolute inset-0 h-full w-full object-cover scale-[0.99]"
              preload="auto"
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            <button
              type="button"
              onClick={togglePlayback}
              className="absolute left-1/2 top-1/2 z-20 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white opacity-0 backdrop-blur-lg transition hover:bg-black/55 group-hover:pointer-events-auto group-hover:opacity-100 pointer-events-none"
              aria-label={isPlaying ? "Pause demo video" : "Play demo video"}
            >
              {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SeeItInAction() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [overlayIndex, setOverlayIndex] = useState<number | null>(null);
  const totalVideos = demoVideos.length;

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

  const selectedVideo = overlayIndex !== null ? demoVideos[overlayIndex] : null;

  return (
    <section
      id="see-it-in-action"
      className="relative px-6 py-24 bg-[#0B0F19] text-white border-t border-white/10"
    >
      <motion.div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#3F8CFF]/10 blur-[140px] -z-10"
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="text-left md:text-center mb-16 max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          See NeuVault in Action
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-2xl md:mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Browse the product workflows below, then open any demo in the phone
          overlay to watch with full controls.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={() => goToSlide(activeIndex - 1)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition"
            aria-label="Previous demo video"
          >
            <FaChevronLeft size={12} />
            Prev
          </button>
          <p className="text-xs sm:text-sm text-white/60">
            {activeIndex + 1}/{totalVideos} demos
          </p>
          <button
            type="button"
            onClick={() => goToSlide(activeIndex + 1)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition"
            aria-label="Next demo video"
          >
            Next
            <FaChevronRight size={12} />
          </button>
        </div>

        <div className="relative h-[520px] sm:h-[610px]">
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
                  rotate: 0,
                  scale: isActive ? 1 : distance === 1 ? 0.92 : 0.84,
                  opacity: 1,
                  zIndex: 100 - distance,
                }}
                transition={{ type: "spring", stiffness: 240, damping: 28 }}
                className="absolute left-1/2 top-1/2 w-[65vw] max-w-[340px] min-w-[240px] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => goToSlide(index)}
              >
                <div className="relative aspect-[9/16] overflow-hidden rounded-[1.9rem] border border-white/15 bg-black shadow-[0_25px_60px_-25px_rgba(63,140,255,0.65)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(63,140,255,0.42),transparent_44%),radial-gradient(circle_at_80%_75%,rgba(16,185,129,0.26),transparent_42%),linear-gradient(180deg,#020611_0%,#050a16_100%)]" />
                  <div className="absolute inset-x-5 top-14 bottom-[34%] rounded-[1.5rem] border border-white/10 bg-white/5 backdrop-blur-sm" />
                  <div className="absolute left-1/2 top-[22%] h-1.5 w-20 -translate-x-1/2 rounded-full bg-white/20" />
                  <div className="pointer-events-none absolute inset-x-0 top-[40%] flex -translate-y-1/2 justify-center">
                    <Image
                      src={Logo}
                      alt="NeuVault"
                      width={1600}
                      height={1000}
                      className="w-50 opacity-90"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                  <div className="absolute left-4 right-4 bottom-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
                    <div className="inline-flex rounded-full bg-[#3F8CFF]/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8ec0ff]">
                      {video.tag}
                    </div>
                    <h3 className="mt-2 text-base font-semibold leading-tight">
                      {video.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/75">
                      {video.summary}
                    </p>
                    <button
                      type="button"
                      className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/45 px-3 py-2 text-xs font-semibold text-white hover:bg-black/60 transition"
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
        </div>

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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {scenarios.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 hover:shadow-lg hover:shadow-[#3F8CFF]/10 transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              viewport={{ once: true }}
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-base font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <VideoPhoneOverlay
        video={selectedVideo}
        onClose={() => setOverlayIndex(null)}
      />
    </section>
  );
}
