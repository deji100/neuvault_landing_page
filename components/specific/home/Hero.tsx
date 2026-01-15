"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaLock,
  FaRegNoteSticky,
} from "react-icons/fa6";
import { PiNotePencilLight } from "react-icons/pi";
import { BsStars } from "react-icons/bs";
import { IoSparklesSharp } from "react-icons/io5";
import { SiGoogledrive, SiIcloud, SiDropbox } from "react-icons/si";

const floatingIcons = [
  {
    icon: <FaFilePdf />,
    class: "text-red-400",
    top: "8%",
    left: "75%",
    delay: 0,
    showOnMobile: true,
  },
  {
    icon: <FaFileWord />,
    class: "text-blue-400",
    top: "35%",
    left: "65%",
    delay: 0.2,
    showOnMobile: true,
  },
  {
    icon: <FaFileExcel />,
    class: "text-green-400",
    top: "30%",
    left: "82%",
    delay: 0.4,
    showOnMobile: false,
  },
  {
    icon: <FaRegNoteSticky />,
    class: "text-yellow-300",
    top: "60%",
    left: "70%",
    delay: 0.6,
    showOnMobile: false,
  },
  {
    icon: <FaLock />,
    class: "text-white/20",
    top: "70%",
    left: "80%",
    delay: 0.8,
    showOnMobile: true,
  },
  {
    icon: <BsStars />,
    class: "text-[#6DD1FF]",
    top: "18%",
    left: "7%",
    delay: 1.0,
    showOnMobile: true,
  },
  {
    icon: <PiNotePencilLight />,
    class: "text-green-300",
    top: "87%",
    left: "12%",
    delay: 1.2,
    showOnMobile: true,
  },
  {
    icon: <IoSparklesSharp />,
    class: "text-[#3F8CFF]",
    top: "60%",
    left: "40%",
    delay: 1.4,
    showOnMobile: true,
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] pt-40 px-6 py-24 md:py-32 bg-[#0B0F19] text-white overflow-hidden">
      {/* Subtle gradient background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#1a2536] to-[#203B6E] z-0" />
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#3F8CFF]/10 blur-3xl z-0"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-3xl z-0"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Floating magical icons with smoother drift */}
      {floatingIcons.map((item, idx) => (
        <motion.div
          key={idx}
          className={`absolute pointer-events-none ${
            item.showOnMobile ? "block" : "hidden md:block"
          } text-3xl md:text-5xl lg:text-6xl ${item.class}`}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, idx % 2 === 0 ? 10 : -10, 0],
            rotate: [0, idx % 2 === 0 ? 8 : -8, 0],
            opacity: [0.25, 0.35, 0.25],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
          style={{
            top: item.top,
            left: item.left,
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto -mt-5 lg:mt-10 text-center md:text-left">
        <motion.p
          className="text-sm md:text-base text-[#6DD1FF] mb-3 tracking-wide uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          Stored on your device. Encrypted backups you control.
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
        >
          Your private AI vault for life documents.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-4 leading-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
        >
          Upload files, scan notes, record voice notes, or write anything. Voice
          notes are transcribed and structured automatically, with easy
          conversion to Word, PDF, or Excel. NeuVault summarizes, tags, links
          related documents, and surfaces deadlines from invoices, renewals,
          school docs, IDs, and more, all processed privately, with no documents
          stored on our servers.
        </motion.p>
        {/* 
        <motion.p
          className="text-sm md:text-base text-gray-400 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.92, duration: 0.8 }}
        >
          You control when AI runs (quick vs deep insights).
        </motion.p> */}

        <motion.div
          className="flex flex-wrap items-center gap-3 text-sm text-gray-400 max-w-2xl mb-8 justify-center md:justify-start"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="text-[#6DD1FF]">Smart Intake</span>
            <span className="text-white/20">•</span>
            Summaries + tags on import
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="text-[#6DD1FF]">Resurfacing</span>
            <span className="text-white/20">•</span>
            Reminders from your docs
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="text-[#6DD1FF]">Nova Assistant</span>
            <span className="text-white/20">•</span>
            Chat freely, search your vault, explore the web
          </span>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {/* Primary CTA */}
          <Link href="#waitlist" className="inline-flex">
            <motion.span
              className="px-6 py-3 rounded-lg bg-[#3F8CFF] text-white font-medium hover:bg-[#60aaff] transition shadow-lg text-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              Join the Beta
            </motion.span>
          </Link>

          {/* Secondary CTA */}
          <Link href="#see-it-in-action" className="inline-flex">
            <span className="px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white hover:text-[#0B0F19] transition text-center">
              Watch 60s Demo
            </span>
          </Link>

          {/* Tertiary CTA (trust) */}
          <Link href="/privacy-policy" className="inline-flex">
            <span className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 transition text-center">
              See how privacy works
            </span>
          </Link>
        </motion.div>

        {/* Encrypted backup note */}
        <motion.div
          className="text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35 }}
        >
          Encrypted export / backup to:
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-6 mt-2 justify-center md:justify-start text-white/80 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.45 }}
        >
          <span className="flex items-center gap-2">
            <SiGoogledrive className="text-yellow-400" size={20} />
            Google Drive
          </span>
          <span className="flex items-center gap-2">
            <SiIcloud className="text-sky-300" size={20} />
            iCloud
          </span>
          <span className="flex items-center gap-2">
            <SiDropbox className="text-blue-400" size={20} />
            Dropbox
          </span>

          {/* Tail statement */}
          <span className="text-white/40 hidden sm:inline">•</span>
          <span className="text-white/70">
            or any cloud storage of your choice
          </span>
        </motion.div>

        <motion.p
          className="mt-3 text-xs md:text-sm text-gray-500 max-w-2xl"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.6 }}
        >
          Your backup is encrypted and cannot be decrypted by third parties — it
          can only be restored inside NeuVault.
        </motion.p>
      </div>
    </section>
  );
}
