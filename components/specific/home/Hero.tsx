"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFileExcel,
  FaFilePdf,
  FaFileWord,
  FaLock,
  FaRegNoteSticky,
} from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { PiNotePencilLight } from "react-icons/pi";
import { IoSparklesSharp } from "react-icons/io5";
import { SiDropbox, SiGoogledrive, SiIcloud } from "react-icons/si";
import { FaBell, FaSearch, FaShieldAlt } from "react-icons/fa";

const floatingIcons = [
  { icon: <FaFilePdf />, className: "text-red-400", top: "9%", left: "76%", delay: 0, mobile: true },
  { icon: <FaFileWord />, className: "text-blue-300", top: "34%", left: "67%", delay: 0.25, mobile: true },
  { icon: <FaFileExcel />, className: "text-emerald-300", top: "28%", left: "84%", delay: 0.45, mobile: false },
  { icon: <FaRegNoteSticky />, className: "text-amber-300", top: "63%", left: "71%", delay: 0.65, mobile: false },
  { icon: <FaLock />, className: "text-white/20", top: "72%", left: "82%", delay: 0.85, mobile: true },
  { icon: <BsStars />, className: "text-[#6DD1FF]", top: "17%", left: "7%", delay: 1.05, mobile: true },
  { icon: <PiNotePencilLight />, className: "text-[#6ce6b3]", top: "86%", left: "12%", delay: 1.25, mobile: true },
  { icon: <IoSparklesSharp />, className: "text-[#3F8CFF]", top: "58%", left: "43%", delay: 1.45, mobile: true },
];

const trustPills = [
  "Local-first by default",
  "Documents stay on your device",
  "Encrypted backups you control",
];

const outcomeCards = [
  {
    title: "Find the right document fast",
    body: "Search, summaries, tags, and linked items help you stop digging through clutter.",
    icon: <FaSearch className="text-[#6DD1FF]" size={18} />,
  },
  {
    title: "Stay ahead of deadlines",
    body: "Set reminders on documents and let NeuVault resurface them before they become urgent.",
    icon: <FaBell className="text-[#6ce6b3]" size={18} />,
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-32 text-white md:pb-28 md:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(63,140,255,0.24),transparent_34%),linear-gradient(180deg,#07101b_0%,#091321_38%,#08111d_100%)]" />
      <div className="section-grid absolute inset-0 opacity-[0.18]" />

      <motion.div
        className="absolute -left-28 top-12 h-[460px] w-[460px] rounded-full bg-[#3F8CFF]/12 blur-[120px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.46, 0.7, 0.46] }}
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
          className={`absolute pointer-events-none text-3xl md:text-5xl ${item.className} ${item.mobile ? "block" : "hidden md:block"}`}
          animate={{
            y: [0, -18, 0, 16, 0],
            x: [0, index % 2 === 0 ? 8 : -8, 0],
            rotate: [0, index % 2 === 0 ? 8 : -8, 0],
            opacity: [0.18, 0.34, 0.18],
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

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <motion.p
            className="mb-5 inline-flex rounded-full border border-[#6DD1FF]/25 bg-[#6DD1FF]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Private mobile vault for important documents
          </motion.p>

          <motion.h1
            className="max-w-3xl text-3xl font-bold leading-[0.98] tracking-tight sm:text-[3.4rem] md:text-[3.1rem]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.55 }}
          >
            Keep the documents that matter in one place you actually trust.
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.55 }}
          >
            NeuVault helps you capture the documents people panic about later,
            understand them quickly, find them fast, and get reminded before they matter.
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
            <Link
              href="#waitlist"
              className="inline-flex items-center justify-center rounded-full bg-[#3F8CFF] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_40px_-20px_rgba(63,140,255,0.9)] hover:bg-[#60aaff]"
            >
              Join the beta
            </Link>
            <Link
              href="#see-it-in-action"
              className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/5 px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
            >
              See NeuVault in action
            </Link>
          </motion.div>

          <motion.div
            className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm leading-7 text-white/52"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.45 }}
          >
            <p className="max-w-2xl">
              Not another generic file manager. NeuVault is built for the real-life documents,
              notes, and reminders people panic about when they need them fast.
            </p>
            <Link href="/privacy-policy" className="text-[#a8d8ff] hover:text-white">
              See how privacy works
            </Link>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.84, duration: 0.45 }}
          >
            <span className="text-white/46">Encrypted backup bundles work with:</span>
            <span className="flex items-center gap-2">
              <SiGoogledrive className="text-yellow-300" size={18} />
              Google Drive
            </span>
            <span className="flex items-center gap-2">
              <SiIcloud className="text-sky-300" size={18} />
              iCloud
            </span>
            <span className="flex items-center gap-2">
              <SiDropbox className="text-blue-300" size={18} />
              Dropbox
            </span>
          </motion.div>
        </div>

        <motion.div
          className="glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-7"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.55 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(63,140,255,0.24),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(108,230,179,0.12),transparent_32%)]" />
          <div className="relative">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
                  Why it feels different
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Store it. Understand it. Remember it.
                </h2>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-3 text-[#6DD1FF]">
                <FaShieldAlt size={22} />
              </div>
            </div>

            <div className="space-y-4">
              {outcomeCards.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-black/24 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-white/66">{item.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/44">
                  Intake support
                </p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  PDFs, photos, scans, uploads, and voice notes all enter the same vault.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/44">
                  Context together
                </p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Notes, scans, files, and voice stay together instead of across disconnected apps.
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-xs leading-6 text-white/48">
              On-device by default. AI only processes content in workflows you choose.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


