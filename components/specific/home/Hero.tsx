"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaLock,
  FaSearch,
  FaBell,
  FaShieldAlt,
} from "react-icons/fa";
import { FaRegNoteSticky } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { PiNotePencilLight } from "react-icons/pi";
import { IoSparklesSharp } from "react-icons/io5";
import { SiGoogledrive, SiIcloud, SiDropbox } from "react-icons/si";

const IOS_APP_STORE_URL = "https://apps.apple.com/ng/app/neuvault/id6759370392";
const ANDROID_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=app.neuvault";

type DevicePlatform = "ios" | "android" | "other";

const floatingIcons = [
  {
    icon: <FaFilePdf />,
    className: "text-red-400",
    top: "12%",
    left: "76%",
    delay: 0,
    mobile: true,
  },
  {
    icon: <FaFileWord />,
    className: "text-blue-300",
    top: "34%",
    left: "67%",
    delay: 0.25,
    mobile: true,
  },
  {
    icon: <FaFileExcel />,
    className: "text-emerald-300",
    top: "25%",
    left: "86%",
    delay: 0.45,
    mobile: false,
  },
  {
    icon: <FaRegNoteSticky />,
    className: "text-amber-300",
    top: "68%",
    left: "72%",
    delay: 0.65,
    mobile: false,
  },
  {
    icon: <FaLock />,
    className: "text-white/20",
    top: "76%",
    left: "84%",
    delay: 0.85,
    mobile: true,
  },
  {
    icon: <BsStars />,
    className: "text-[#6DD1FF]",
    top: "17%",
    left: "7%",
    delay: 1.05,
    mobile: true,
  },
  {
    icon: <PiNotePencilLight />,
    className: "text-[#6ce6b3]",
    top: "82%",
    left: "12%",
    delay: 1.25,
    mobile: true,
  },
  {
    icon: <IoSparklesSharp />,
    className: "text-[#3F8CFF]",
    top: "58%",
    left: "43%",
    delay: 1.45,
    mobile: true,
  },
];

const trustPills = [
  "Private AI vault",
  "Local-first by design",
  "Encrypted backups you control",
];

const painCards = [
  {
    icon: <FaSearch size={17} className="text-[#6DD1FF]" />,
    title: "Find it again",
    body: "Search documents by what you remember, not just the file name.",
  },
  {
    icon: <FaBell size={17} className="text-[#6ce6b3]" />,
    title: "Remember what matters",
    body: "Bring back dates, renewals, receipts, certificates, and follow-ups before they matter.",
  },
  {
    icon: <FaShieldAlt size={17} className="text-[#9dd9ff]" />,
    title: "Recover across devices",
    body: "Back up your vault privately and restore it when you move devices.",
  },
];

export default function Hero() {
  const [devicePlatform, setDevicePlatform] =
    useState<DevicePlatform>("other");

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

  const handleDownloadClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth < 700) {
      return;
    }

    const featuresSection = document.getElementById("features");

    if (!featuresSection) {
      return;
    }

    event.preventDefault();

    const navOffset = 92;
    const top =
      featuresSection.getBoundingClientRect().top + window.scrollY - navOffset;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const downloadUrl =
    devicePlatform === "android" ? ANDROID_PLAY_STORE_URL : IOS_APP_STORE_URL;

  const downloadLabel =
    devicePlatform === "android"
      ? "Download on Google Play"
      : devicePlatform === "ios"
        ? "Download on the App Store"
        : "Get NeuVault free";

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-32 text-white md:pb-28 md:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(63,140,255,0.26),transparent_34%),linear-gradient(180deg,#07101b_0%,#091321_42%,#08111d_100%)]" />
      <div className="section-grid absolute inset-0 opacity-[0.16]" />

      <motion.div
        className="absolute -left-28 top-12 h-[460px] w-[460px] rounded-full bg-[#3F8CFF]/12 blur-[120px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-0 right-[-6%] h-[420px] w-[420px] rounded-full bg-[#6DD1FF]/12 blur-[120px]"
        animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.58, 0.35] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {floatingIcons.map((item, index) => (
        <motion.div
          key={`${item.top}-${item.left}`}
          className={`pointer-events-none absolute text-3xl md:text-5xl ${
            item.className
          } ${item.mobile ? "block" : "hidden md:block"}`}
          animate={{
            y: [0, -18, 0, 16, 0],
            x: [0, index % 2 === 0 ? 8 : -8, 0],
            rotate: [0, index % 2 === 0 ? 8 : -8, 0],
            opacity: [0.16, 0.32, 0.16],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
          style={{ top: item.top, left: item.left }}
          aria-hidden
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <motion.p
            className="mb-5 inline-flex rounded-full border border-[#6DD1FF]/25 bg-[#6DD1FF]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Private AI vault for documents life asks for later
          </motion.p>

          <motion.h1
            className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-[4rem] md:text-[4.55rem]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.55 }}
          >
            You saved it somewhere. Now you need it.
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.55 }}
          >
            NeuVault keeps important documents, scans, screenshots, notes, and
            voice notes organized, searchable, remembered, and recoverable —
            privately.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.45 }}
          >
            {trustPills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/76 backdrop-blur-md"
              >
                {pill}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.45 }}
          >
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDownloadClick}
              className="inline-flex items-center justify-center rounded-full bg-[#3F8CFF] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_40px_-20px_rgba(63,140,255,0.9)] hover:bg-[#60aaff]"
            >
              {downloadLabel}
            </a>

            <Link
              href="#see-it-in-action"
              className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/5 px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
            >
              See how it works
            </Link>
          </motion.div>

          <motion.div
            className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm leading-7 text-white/52"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.45 }}
          >
            <p className="max-w-2xl">
              Built for receipts, IDs, certificates, forms, contracts, school
              records, travel files, and notes you cannot afford to lose.
            </p>

            <Link
              href="/privacy-policy"
              className="text-[#a8d8ff] hover:text-white"
            >
              See how privacy works
            </Link>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.84, duration: 0.45 }}
          >
            <span className="text-white/46">
              Available now on iPhone and Android.
            </span>

            <span className="text-white/46">
              Desktop version coming soon.
            </span>
          </motion.div>
        </div>

        <motion.div
          className="glass-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-6"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.55 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(63,140,255,0.24),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(108,230,179,0.12),transparent_32%)]" />

          <div className="relative">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
                The real problem
              </p>

              <h2 className="mt-2 text-2xl font-semibold leading-snug text-white">
                Your files are saved. Your context is not.
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/60">
                Downloads, screenshots, notes, scans, and voice records get
                scattered. NeuVault brings the meaning back together.
              </p>
            </div>

            <div className="space-y-3">
              {painCards.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-black/24 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-xl border border-white/10 bg-white/6 p-2">
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-white/62">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-[#6DD1FF]/15 bg-[#6DD1FF]/8 p-4">
              <p className="text-sm font-semibold text-white">
                Not another cloud drive.
              </p>

              <p className="mt-1 text-sm leading-6 text-white/60">
                NeuVault is built for document memory: what it is, why it
                matters, where it belongs, and when you need it again.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <SiGoogledrive className="text-yellow-300" size={17} />
                Drive
              </span>

              <span className="flex items-center gap-2">
                <SiIcloud className="text-sky-300" size={17} />
                iCloud
              </span>

              <span className="flex items-center gap-2">
                <SiDropbox className="text-blue-300" size={17} />
                Dropbox
              </span>

              <span className="text-white/42">or any storage you trust</span>
            </div>

            <p className="mt-5 text-xs leading-6 text-white/42">
              Encrypted backups stay under your control. AI helps with
              organization, extraction, summaries, and Nova when you choose
              intelligent workflows.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}