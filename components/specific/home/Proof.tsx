"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { motion } from "framer-motion";
import {
  FaBell,
  FaChevronLeft,
  FaChevronRight,
  FaFileAlt,
  FaLink,
  FaLock,
  FaMicrophone,
  FaPause,
  FaPlay,
  FaSearch,
} from "react-icons/fa";
import Logo from "@/public/logo.png";

type DemoVideo = {
  title: string;
  summary: string;
  tag: string;
  url: string;
};

const proofPills = [
  "Capture",
  "Organize",
  "Ask Nova",
  "Remember dates",
  "Back up privately",
];

const painProofCards = [
  {
    icon: <FaSearch className="text-[#6DD1FF]" size={18} />,
    title: "You do not remember the filename",
    description:
      "NeuVault keeps summaries, tags, dates, and context close to the document so retrieval does not depend on perfect memory.",
  },
  {
    icon: <FaBell className="text-[#6ce6b3]" size={18} />,
    title: "The document matters later",
    description:
      "Renewals, expiry dates, follow-ups, and important records can come back to your attention before they become urgent.",
  },
  {
    icon: <FaLink className="text-amber-300" size={18} />,
    title: "One issue has many records",
    description:
      "Link related documents, notes, scans, and voice records so a trip, school file, client job, or personal record stays together.",
  },
  {
    icon: <FaLock className="text-[#9dd9ff]" size={18} />,
    title: "You want recovery without surrendering control",
    description:
      "Create encrypted backups you control and restore your vault across devices when you need to move.",
  },
];

const demoVideos: DemoVideo[] = [
  {
    title: "Upload a file",
    summary:
      "Bring in an existing document and let NeuVault turn it into an organized vault record.",
    tag: "Upload",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068982/Smart_Upload_Intake_wzikki.mp4",
  },
  {
    title: "Scan paper",
    summary:
      "Capture a physical document and keep it searchable instead of losing it in your camera roll.",
    tag: "Scan",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068971/smart-scan-intake_wccyli.mp4",
  },
  {
    title: "Save a note",
    summary:
      "Turn quick thoughts into structured records that can live beside related documents.",
    tag: "Notes",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068920/Smart_Note_Intake_xamar0.mp4",
  },
  {
    title: "Record voice",
    summary:
      "Turn spoken context into a searchable record inside the same private vault.",
    tag: "Voice",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068925/smart-voice-note-intake_pjddwd.mp4",
  },
  {
    title: "Review what needs attention",
    summary:
      "Surface dates, reminders, follow-ups, and records that should not stay buried.",
    tag: "Attention",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068927/smart-suggestion_qlgpl4.mp4",
  },
  {
    title: "Bring it back later",
    summary:
      "Resurface an important document when the timing matters again.",
    tag: "Resurface",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068966/document-resurfacing_rb4zrx.mp4",
  },
  {
    title: "Link related records",
    summary:
      "Keep documents, notes, scans, and records connected around one real-life context.",
    tag: "Linked",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068949/document-linking_u4nkyd.mp4",
  },
  {
    title: "Ask Nova",
    summary:
      "Ask questions across your vault instead of digging through scattered files.",
    tag: "Nova",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068919/nova-assistant_lcmhuq.mp4",
  },
  {
    title: "Back up privately",
    summary:
      "Review backup and restore settings so your vault can move with you.",
    tag: "Backup",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068959/setting-and-backup_w5jfuz.mp4",
  },
  {
    title: "Capture offline",
    summary:
      "Save records while offline and process them when your connection returns.",
    tag: "Offline",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068887/offline_smart_intake_rmhhc6.mp4",
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

function VideoPhoneOverlay({
  videoIndex,
  videos,
  onClose,
  onSelectVideo,
}: VideoPhoneOverlayProps) {
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

      <div
        className="relative z-10"
        style={{ width: frameWidth }}
        onClick={(event) => event.stopPropagation()}
      >
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
              preload="metadata"
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

            <span className="w-10 shrink-0 text-xs text-white/60">
              {formatTime(currentTime)}
            </span>

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

            <span className="w-10 shrink-0 text-right text-xs text-white/60">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SeeItInAction() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [overlayIndex, setOverlayIndex] = useState<number | null>(null);
  const dragMovedRef = useRef(false);
  const dragResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const totalVideos = demoVideos.length;
  const swipeThreshold = 60;
  const tapCancelThreshold = 12;

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

  const resetDragMoved = useCallback(() => {
    if (dragResetTimeoutRef.current !== null) {
      clearTimeout(dragResetTimeoutRef.current);
    }

    dragResetTimeoutRef.current = setTimeout(() => {
      dragMovedRef.current = false;
      dragResetTimeoutRef.current = null;
    }, 0);
  }, []);

  useEffect(() => {
    return () => {
      if (dragResetTimeoutRef.current !== null) {
        clearTimeout(dragResetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      id="see-it-in-action"
      className="relative border-t border-white/10 px-6 py-24 text-white"
    >
      <motion.div
        className="absolute -top-40 left-1/2 h-[780px] w-[780px] -translate-x-1/2 rounded-full bg-[#3F8CFF]/10 blur-[140px]"
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
            Watch the pain disappear
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
            From scattered files to usable memory.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
            See how NeuVault captures the records people usually lose across
            downloads, screenshots, notes, scans, folders, and old devices.
          </p>
        </motion.div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {proofPills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/76"
            >
              {pill}
            </span>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
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
          className="relative mt-4 h-[520px] cursor-grab select-none touch-pan-y active:cursor-grabbing sm:h-[610px]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          dragMomentum={false}
          dragDirectionLock
          onDragStart={() => {
            dragMovedRef.current = false;
          }}
          onDrag={(_, info) => {
            if (Math.abs(info.offset.x) > tapCancelThreshold) {
              dragMovedRef.current = true;
            }
          }}
          onDragEnd={(_, info) => {
            if (info.offset.x >= swipeThreshold) {
              goToSlide(activeIndex - 1);
              resetDragMoved();
              return;
            }

            if (info.offset.x <= -swipeThreshold) {
              goToSlide(activeIndex + 1);
              resetDragMoved();
              return;
            }

            resetDragMoved();
          }}
        >
          {demoVideos.map((video, index) => {
            const offset = slideOffsets[index];
            const distance = Math.abs(offset);
            const isActive = index === activeIndex;

            if (distance > 2) return null;

            return (
              <div
                key={video.url}
                className="absolute left-1/2 top-1/2 w-[65vw] min-w-[240px] max-w-[340px] -translate-x-1/2 -translate-y-1/2"
                style={{ zIndex: 100 - distance }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    x: offset * 200,
                    scale: isActive ? 1 : distance === 1 ? 0.92 : 0.84,
                    opacity: 1,
                  }}
                  transition={{ type: "spring", stiffness: 240, damping: 28 }}
                  className="cursor-pointer transform-gpu will-change-transform"
                  onClick={() => {
                    if (dragMovedRef.current) return;
                    goToSlide(index);
                  }}
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

                          if (dragMovedRef.current) return;

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
              </div>
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
                  isActive
                    ? "w-7 bg-[#3F8CFF]"
                    : "w-2.5 bg-white/35 hover:bg-white/55"
                }`}
              />
            );
          })}
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {painProofCards.map((item, index) => (
            <motion.div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/6 p-3">
                {item.icon}
              </div>

              <h3 className="text-base font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/62">
                {item.description}
              </p>
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