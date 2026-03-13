"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaApple, FaClock, FaDownload, FaGooglePlay } from "react-icons/fa";

const ANDROID_URL = process.env.NEXT_PUBLIC_ANDROID_URL?.trim() || undefined;
const IOS_URL = process.env.NEXT_PUBLIC_IOS_URL?.trim() || undefined;

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

  const baseClassName = "flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg";
  const activeClassName =
    variant === "dark"
      ? "bg-[#3F8CFF] text-white hover:bg-[#60aaff]"
      : "bg-white text-black hover:bg-slate-200";
  const inactiveClassName = "cursor-not-allowed border border-white/16 bg-white/8 text-white/60";

  if (!isAvailable) {
    return (
      <div className={`${baseClassName} ${inactiveClassName}`}>
        {icon}
        {platform}
        <span className="ml-1 inline-flex items-center gap-1 text-xs opacity-70">
          <FaClock /> Coming soon
        </span>
      </div>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`${baseClassName} ${activeClassName}`}>
      {icon}
      {platform}
    </a>
  );
}

export default function FloatingDownloadButtons() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const demoSection = document.getElementById("see-it-in-action");
      if (!demoSection) {
        setIsVisible(false);
        setOpen(false);
        return;
      }

      const isPastDemoSection = demoSection.getBoundingClientRect().bottom <= 0;
      setIsVisible(isPastDemoSection);

      if (!isPastDemoSection) {
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

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="hidden md:block">
        <motion.div
          className="glass-panel w-[240px] rounded-[1.5rem] p-3"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#9dd9ff]">
            Mobile beta
          </p>
          <p className="mt-2 px-1 text-sm leading-6 text-white/72">
            Get NeuVault on your phone when the beta links are live.
          </p>
          <div className="mt-3 space-y-3">
            <DownloadCard platform="Android" icon={<FaGooglePlay />} url={ANDROID_URL} />
            <DownloadCard platform="iOS" icon={<FaApple />} url={IOS_URL} variant="light" />
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col items-end gap-3 md:hidden">
        <AnimatePresence>
          {open ? (
            <motion.div
              className="glass-panel w-[220px] rounded-[1.4rem] p-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
            >
              <div className="space-y-3">
                <DownloadCard platform="Android" icon={<FaGooglePlay />} url={ANDROID_URL} />
                <DownloadCard platform="iOS" icon={<FaApple />} url={IOS_URL} variant="light" />
              </div>
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
