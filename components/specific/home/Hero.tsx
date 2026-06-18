"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import LoginImage from "@/public/login.png";

const IOS_APP_STORE_URL = "https://apps.apple.com/ng/app/neuvault/id6759370392";
const ANDROID_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=app.neuvault";
const WINDOWS_MICROSOFT_STORE_URL =
  "https://apps.microsoft.com/detail/9PNM0GXZPT8T?hl=en-us&gl=US&ocid=pdpshare";

type DevicePlatform = "ios" | "android" | "windows" | "other";

const trustPills = [
  "Local-first storage",
  "Private workflows",
  "Encrypted backups",
  "Cross-platform sync",
];

const IconFolder = () => (
  <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" viewBox="0 0 24 24">
    <path d="M3 4h6l2 2h10v14H3z" />
  </svg>
);

const IconShield = () => (
  <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" viewBox="0 0 24 24">
    <path d="M12 2l9 4v6c0 6-4 10-9 12-5-2-9-6-9-12V6z" />
  </svg>
);

const IconLock = () => (
  <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" viewBox="0 0 24 24">
    <rect x="5" y="11" width="14" height="10" />
    <path d="M8 11V7a4 4 0 018 0v4" />
  </svg>
);

export default function Hero() {
  const [devicePlatform, setDevicePlatform] = useState<DevicePlatform>("other");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || "";
    const isAndroid = /android/i.test(userAgent);
    const isWindows = /windows/i.test(userAgent);
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
    if (isWindows) {
      setDevicePlatform("windows");
      return;
    }
    setDevicePlatform("other");
  }, []);

  const handleDownloadClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (devicePlatform === "windows") {
      event.preventDefault();
      window.dispatchEvent(new Event("neuvault:open-downloads"));
      return;
    }

    if (window.innerWidth < 700) {
      return;
    }

    const featuresSection = document.getElementById("features");
    if (!featuresSection) return;

    event.preventDefault();
    const navOffset = 92;
    const top = featuresSection.getBoundingClientRect().top + window.scrollY - navOffset;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const downloadUrl =
    devicePlatform === "android"
      ? ANDROID_PLAY_STORE_URL
      : devicePlatform === "windows"
        ? WINDOWS_MICROSOFT_STORE_URL
        : IOS_APP_STORE_URL;

  const downloadLabel =
    devicePlatform === "android"
      ? "Download on Google Play"
      : devicePlatform === "ios"
        ? "Download on the App Store"
        : "Get NeuVault free";

  return (
    <section className="relative overflow-hidden bg-[#040810] px-6 pb-24 pt-32 md:pb-28 md:pt-40 min-h-screen flex flex-col justify-center">
      <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.05),transparent_38%)]" />

      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="mx-auto mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
            The vault for documents life asks for later
          </p>

          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl max-w-[800px] mx-auto">
            Meet your intelligent document memory.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-400">
            Capture, organize, and recover documents that usually disappear across downloads, camera rolls, and old devices.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="relative flex w-full flex-col sm:w-auto">
              <div className="flex w-full items-center shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDownloadClick}
                  className="inline-flex flex-1 items-center justify-center rounded-l-md bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-slate-200 sm:w-auto border-r border-black/10 transition-colors"
                >
                  {downloadLabel}
                </a>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="inline-flex items-center justify-center rounded-r-md bg-white px-3 py-3 text-black hover:bg-slate-200 transition-colors"
                  aria-label="More platforms"
                >
                  <svg className={`h-5 w-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full z-50 mt-2 w-full min-w-[220px] flex-col rounded-md border border-white/10 bg-[#0a101a] p-1.5 shadow-2xl"
                  >
                    <a href={IOS_APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center rounded px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white">App Store (iOS)</a>
                    <a href={ANDROID_PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center rounded px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white">Google Play</a>
                    <a href={WINDOWS_MICROSOFT_STORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center rounded px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white">Windows Store</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="#features"
              className="inline-flex w-full items-center justify-center rounded-md border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:border-white/40 transition-colors sm:w-auto"
            >
              Explore features
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {trustPills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[13px] text-slate-400"
              >
                {pill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_0_60px_-15px_rgba(255,255,255,0.05)]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <Image
            src={LoginImage}
            alt="NeuVault login interface"
            priority
            className="h-auto w-full opacity-90"
            sizes="(min-width: 1280px) 1152px, 100vw"
          />
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          {[
            {
              icon: <IconFolder />,
              title: "Unified context",
              text: "Keep files, notes, and scans connected together.",
            },
            {
              icon: <IconShield />,
              title: "Private by design",
              text: "Local storage with secure user-controlled backups.",
            },
            {
              icon: <IconLock />,
              title: "Durable records",
              text: "Easily transfer your vault when upgrading devices.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded bg-white/10 text-white">
                {item.icon}
              </div>
              <h2 className="text-sm font-semibold text-white">
                {item.title}
              </h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
