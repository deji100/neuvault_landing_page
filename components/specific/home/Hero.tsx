"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import { FolderOpen, LockKeyhole, ShieldCheck } from "lucide-react";
import LoginImage from "@/public/login.png";

const IOS_APP_STORE_URL = "https://apps.apple.com/ng/app/neuvault/id6759370392";
const ANDROID_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=app.neuvault";
const WINDOWS_MICROSOFT_STORE_URL =
  "https://apps.microsoft.com/detail/9PNM0GXZPT8T?hl=en-us&gl=US&ocid=pdpshare";

type DevicePlatform = "ios" | "android" | "windows" | "other";

const trustPills = [
  "Local-first storage",
  "Private document search",
  "Encrypted backups",
  "iPhone, Android, and Windows",
];

function FadeImage({ className, ...props }: React.ComponentProps<typeof Image>) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      {...props}
      className={`${className || ""} transition-all duration-700 ease-out ${
        loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-[1.02]"
      }`}
      onLoad={(e) => {
        setLoaded(true);
        if (props.onLoad) props.onLoad(e);
      }}
    />
  );
}

export default function Hero() {
  const [devicePlatform, setDevicePlatform] =
    useState<DevicePlatform>("other");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedImage, setExpandedImage] = useState(false);

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
    const top =
      featuresSection.getBoundingClientRect().top + window.scrollY - navOffset;

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
        : devicePlatform === "windows"
          ? "Enjoy 500 free one-time Credit"
          : "Get NeuVault free";

  return (
    <section className="relative overflow-hidden bg-white px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:pb-24 md:pt-36 lg:pt-40">
      <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.10),transparent_38%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f7fbff] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          {/* <p className="mx-auto mb-5 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
            Private AI vault for documents life asks for later
          </p> */}

          <h1 className="text-4xl font-bold leading-[1.05] tracking-normal text-slate-950 sm:text-6xl md:text-7xl">
            Stop letting document chaos slow you down.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            NeuVault brings your scattered documents, notes, scans, receipts,
            screenshots, and voice memos into one private AI vault — so you can
            find what matters, connect related files, and never miss important
            dates.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="relative flex w-full flex-col sm:w-auto">
              <div className="flex w-full items-stretch shadow-[0_20px_42px_-22px_rgba(37,99,235,0.85)]">
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDownloadClick}
                  className="inline-flex flex-1 items-center justify-center rounded-l-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 sm:w-auto border-r border-blue-700/50"
                >
                  {downloadLabel}
                </a>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="inline-flex items-center justify-center rounded-r-xl bg-blue-600 px-3 py-3 text-white hover:bg-blue-700"
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
                    className="absolute left-0 top-full z-50 mt-2 w-full min-w-[220px] flex-col rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
                  >
                    <a href={IOS_APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">App Store (iOS)</a>
                    <a href={ANDROID_PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Google Play</a>
                    <a href={WINDOWS_MICROSOFT_STORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Windows Store</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="#features"
              className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-800 hover:border-blue-300 hover:text-blue-700 sm:w-auto"
            >
              See the pain it solves
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {trustPills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm"
              >
                {pill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* <motion.button
          type="button"
          onClick={() => setExpandedImage(true)}
          className="mx-auto mt-10 max-w-6xl w-full cursor-zoom-in overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_32px_90px_-48px_rgba(15,23,42,0.55)] transition-all hover:ring-2 hover:ring-blue-500/20 md:mt-14 lg:mt-16"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-5 py-4">
            <span className="h-3 w-3 rounded-full bg-red-300" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-emerald-300" />
            <span className="ml-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500">
              NeuVault login
            </span>
          </div>
          <FadeImage
            src={LoginImage}
            alt="NeuVault login screenshot"
            priority
            className="h-auto w-full object-cover"
            sizes="(min-width: 1280px) 1152px, 100vw"
          />
        </motion.button> */}

        <AnimatePresence>
          {expandedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedImage(false)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-12 cursor-zoom-out backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative max-h-full max-w-7xl overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-5 py-4">
                  <span className="h-3 w-3 rounded-full bg-red-300" />
                  <span className="h-3 w-3 rounded-full bg-amber-300" />
                  <span className="h-3 w-3 rounded-full bg-emerald-300" />
                </div>
                <FadeImage
                  src={LoginImage}
                  alt="NeuVault login screenshot"
                  className="h-auto max-h-[85vh] w-auto object-contain"
                  unoptimized
                />
                <button
                  type="button"
                  className="absolute top-3 right-4 rounded-full bg-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-300 hover:text-slate-900"
                  onClick={() => setExpandedImage(false)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-3">
          {[
            {
              icon: <FolderOpen size={19} />,
              title: "All records together",
              text: "Files, notes, scans, reminders, and voice context stay connected.",
            },
            {
              icon: <ShieldCheck size={19} />,
              title: "Private by design",
              text: "Local-first storage with user-controlled encrypted backup.",
            },
            {
              icon: <LockKeyhole size={19} />,
              title: "Recoverable vault",
              text: "Move devices without rebuilding your document system.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {item.icon}
              </div>
              <h2 className="text-base font-semibold text-slate-950">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.text}
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
