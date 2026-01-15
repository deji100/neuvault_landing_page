"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGooglePlay,
  FaApple,
  FaDownload,
  FaClock,
} from "react-icons/fa";

// Normalize env values (null / empty -> undefined)
const ANDROID_URL =
  process.env.NEXT_PUBLIC_ANDROID_URL?.trim() || undefined;

const IOS_URL =
  process.env.NEXT_PUBLIC_IOS_URL?.trim() || undefined;

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

  const base =
    "flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-lg transition w-full justify-center";
  const active =
    variant === "dark"
      ? "bg-[#3F8CFF] text-white hover:bg-[#60aaff]"
      : "bg-white text-black hover:bg-gray-200";
  const comingSoon =
    "bg-white/10 text-white/60 border border-white/20 cursor-not-allowed";

  if (!isAvailable) {
    return (
      <div className={`${base} ${comingSoon}`}>
        {icon}
        {platform}
        <span className="ml-1 flex items-center gap-1 text-xs opacity-70">
          <FaClock /> Coming Soon
        </span>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${active}`}
    >
      {icon}
      {platform}
    </a>
  );
}

export default function FloatingDownloadButtons() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed left-4 bottom-16 z-50">
      {/* Desktop */}
      <div className="hidden md:flex flex-col gap-3 w-[180px]">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          <DownloadCard
            platform="Android"
            icon={<FaGooglePlay />}
            url={ANDROID_URL}
          />
        </motion.div>

        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
        >
          <DownloadCard
            platform="iOS"
            icon={<FaApple />}
            url={IOS_URL}
            variant="light"
          />
        </motion.div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col items-start gap-3">
        <AnimatePresence>
          {open && (
            <motion.div
              className="flex flex-col gap-3 w-[180px]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
            >
              <DownloadCard
                platform="Android"
                icon={<FaGooglePlay />}
                url={ANDROID_URL}
              />
              <DownloadCard
                platform="iOS"
                icon={<FaApple />}
                url={IOS_URL}
                variant="light"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle FAB */}
        <motion.button
          onClick={() => setOpen(!open)}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-[#3F8CFF] text-white shadow-lg hover:bg-[#60aaff] transition"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Download NeuVault"
        >
          <FaDownload />
        </motion.button>
      </div>
    </div>
  );
}
