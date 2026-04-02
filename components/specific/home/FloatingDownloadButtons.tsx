"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaApple, FaClock, FaDownload, FaGooglePlay } from "react-icons/fa";

const ANDROID_URL =
  process.env.NEXT_PUBLIC_ANDROID_URL?.trim() ||
  "https://play.google.com/store/apps/details?id=app.neuvault";
const IOS_URL =
  process.env.NEXT_PUBLIC_IOS_URL?.trim() || "https://apps.apple.com/ng/app/neuvault/id6759370392";
const DESKTOP_TRIGGER_OFFSET = 140;
const MOBILE_TRIGGER_OFFSET = 120;

type DevicePlatform = "ios" | "android" | "other";

function DownloadCard({
  platform,
  icon,
  url,
  variant = "dark",
}: {
  platform: string;
  icon: React.ReactNode;
  url?: string;
  variant?: "dark" | "light";
}) {
  const isAvailable = typeof url === "string" && url.length > 0;

  const baseClassName = "flex w-full items-center rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg";
  const activeClassName =
    variant === "dark"
      ? "justify-center gap-2 bg-[#3F8CFF] text-white hover:bg-[#60aaff]"
      : "justify-center gap-2 bg-white text-black hover:bg-slate-200";
  const inactiveClassName = "justify-between gap-3 cursor-not-allowed border border-white/16 bg-white/8 text-white/60";
  const iconClassName = isAvailable
    ? variant === "dark"
      ? "text-white"
      : "text-black"
    : "text-white/70";

  if (!isAvailable) {
    return (
      <div className={`${baseClassName} ${inactiveClassName}`}>
        <span className="inline-flex min-w-0 items-center gap-2">
          <span className={`${iconClassName} shrink-0`}>{icon}</span>
          <span>{platform}</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-white/12 bg-white/6 px-2 py-1 text-[11px] opacity-80">
          <FaClock /> Coming soon
        </span>
      </div>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`${baseClassName} ${activeClassName}`}>
      <span className={iconClassName}>{icon}</span>
      {platform}
    </a>
  );
}

export default function FloatingDownloadButtons() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [devicePlatform, setDevicePlatform] = useState<DevicePlatform>("other");

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || "";
    const isAndroid = /android/i.test(userAgent);
    const isIOS =
      /iPad|iPhone|iPod/i.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isAndroid) {
      setDevicePlatform("android");
      return;
    }

    if (isIOS) {
      setDevicePlatform("ios");
      return;
    }

    setDevicePlatform("other");
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      const desktopTrigger = document.getElementById("features");
      const mobileTrigger = document.getElementById("see-it-in-action");
      const footer = document.getElementById("site-footer");
      const triggerSection = window.innerWidth >= 700 ? desktopTrigger : mobileTrigger;

      if (!triggerSection || !footer) {
        setIsVisible(false);
        setOpen(false);
        return;
      }

      const triggerOffset = window.innerWidth >= 700 ? DESKTOP_TRIGGER_OFFSET : MOBILE_TRIGGER_OFFSET;
      const isPastTriggerSection = triggerSection.getBoundingClientRect().top <= triggerOffset;
      const isFooterVisible = footer.getBoundingClientRect().top <= window.innerHeight;
      const shouldShow = isPastTriggerSection && !isFooterVisible;

      setIsVisible(shouldShow);

      if (!shouldShow) {
        setOpen(false);
      }
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  const mobileDownloadCards = [];

  if (devicePlatform !== "android") {
    mobileDownloadCards.push(
      <DownloadCard key="ios" platform="iOS" icon={<FaApple />} url={IOS_URL} variant="light" />
    );
  }

  if (devicePlatform !== "ios") {
    mobileDownloadCards.push(
      <DownloadCard key="android" platform="Android" icon={<FaGooglePlay />} url={ANDROID_URL} />
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-5000">
      <div className="hidden min-[700px]:block">
        <motion.div
          className="glass-panel w-[240px] rounded-[1.5rem] p-3"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#9dd9ff]">
            Download NeuVault
          </p>
          <p className="mt-2 px-1 text-sm leading-6 text-white/72">
            Stop searching through document chaos. Start with 500 free credits and explore NeuVault.
          </p>
          <div className="mt-3 space-y-3">
            <DownloadCard platform="iOS" icon={<FaApple />} url={IOS_URL} variant="light" />
            <DownloadCard platform="Android" icon={<FaGooglePlay />} url={ANDROID_URL} />
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col items-end gap-3 min-[700px]:hidden">
        <AnimatePresence>
          {open ? (
            <motion.div
              className="glass-panel w-[220px] rounded-[1.4rem] p-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
            >
              <div className="space-y-3">{mobileDownloadCards}</div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#3F8CFF] text-white shadow-[0_22px_50px_-20px_rgba(63,140,255,0.85)] hover:bg-[#60aaff]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Download NeuVault"
        >
          <FaDownload />
        </motion.button>
      </div>
    </div>
  );
}
