"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaFileExcel,
  FaFilePdf,
  FaFileWord,
  FaFolderOpen,
  FaLightbulb,
  FaMicrophone,
  FaPlusCircle,
  FaRegStickyNote,
  FaSearch,
  FaTag,
  FaWifi,
} from "react-icons/fa";
import { FaArrowUp, FaBell, FaLock } from "react-icons/fa6";
import { FaLayerGroup } from "react-icons/fa";
import { PiChatCircleDotsFill } from "react-icons/pi";

type Step = {
  title: string;
  description: string;
  icon: React.ReactNode;
  demo: React.ReactNode;
};

const Chip = ({
  icon,
  label,
  tone = "bg-white/5 border-white/10 text-white/80",
}: {
  icon: React.ReactNode;
  label: string;
  tone?: string;
}) => (
  <div className={["inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs", tone].join(" ")}>
    <span className="opacity-90">{icon}</span>
    <span className="leading-none">{label}</span>
  </div>
);

const MiniCard = ({
  title,
  lines,
}: {
  title: string;
  lines: string[];
}) => (
  <div className="rounded-xl border border-white/10 bg-black/25 p-4">
    <div className="mb-2 text-xs font-semibold text-white/82">{title}</div>
    <div className="space-y-1">
      {lines.map((line) => (
        <div key={line} className="text-xs text-white/60">
          {line}
        </div>
      ))}
    </div>
  </div>
);

const Arrow = () => (
  <div className="my-3 flex items-center justify-center text-white/28">
    <div className="hidden items-center gap-2 sm:flex">
      <div className="h-px w-10 bg-white/10" />
      <FaArrowRight />
      <div className="h-px w-10 bg-white/10" />
    </div>
    <div className="sm:hidden">
      <FaArrowRight />
    </div>
  </div>
);

const steps: Step[] = [
  {
    title: "1. Capture",
    description:
      "Bring things in the way you already work: upload a file, scan a page, write a note, or record voice.",
    icon: <FaPlusCircle className="text-[#3F8CFF]" size={28} />,
    demo: (
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          <Chip icon={<FaFilePdf className="text-red-400" />} label="Passport scan" tone="bg-red-500/10 border-red-500/20 text-red-100" />
          <Chip icon={<FaFileWord className="text-blue-400" />} label="Lease agreement" tone="bg-blue-500/10 border-blue-500/20 text-blue-100" />
          <Chip icon={<FaFileExcel className="text-green-400" />} label="Monthly invoices" tone="bg-green-500/10 border-green-500/20 text-green-100" />
          <Chip icon={<FaRegStickyNote className="text-yellow-300" />} label="Quick note" tone="bg-yellow-500/10 border-yellow-500/20 text-yellow-100" />
          <Chip icon={<FaMicrophone className="text-emerald-300" />} label="Voice memo" tone="bg-emerald-500/10 border-emerald-500/20 text-emerald-100" />
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-white/45">
          <FaWifi className="opacity-80" />
          Capture offline and queue items for processing later.
        </div>
      </div>
    ),
  },
  {
    title: "2. Understand",
    description:
      "Smart intake turns raw files into something usable with summaries, tags, and key details you can scan quickly.",
    icon: <FaLightbulb className="text-yellow-400" size={28} />,
    demo: (
      <div className="mt-4">
        <MiniCard
          title="Auto summary"
          lines={[
            "- 12-month lease agreement",
            "- Rent due on the 1st of each month",
            "- Renewal window opens on Nov 1",
          ]}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip icon={<FaTag className="text-[#6DD1FF]" />} label="Lease" />
          <Chip icon={<FaTag className="text-[#6DD1FF]" />} label="Renewal" />
          <Chip icon={<FaTag className="text-[#6DD1FF]" />} label="Important" />
        </div>
      </div>
    ),
  },
  {
    title: "3. Organize",
    description:
      "Documents can land in the right group automatically, and related items can stay linked instead of drifting apart.",
    icon: <FaLayerGroup className="text-[#6ce6b3]" size={28} />,
    demo: (
      <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-white/82">
          <FaFolderOpen className="text-white/60" />
          Immigration / Canada
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip icon={<FaFilePdf className="text-red-400" />} label="Visa application" />
          <Chip icon={<FaFilePdf className="text-red-400" />} label="Passport scan" />
          <Chip icon={<FaMicrophone className="text-emerald-300" />} label="Canada checklist" />
        </div>
        <div className="mt-3 text-xs text-white/45">
          Linked items: proof of funds, admission letter, medical receipt
        </div>
      </div>
    ),
  },
  {
    title: "4. Find",
    description:
      "Search by title, tags, summary keywords, type, or date, with local-first retrieval that stays fast when you need it.",
    icon: <FaSearch className="text-emerald-400" size={28} />,
    demo: (
      <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4">
        <div className="mb-2 text-xs text-white/55">Search</div>
        <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/82">
          canada proof of funds
        </div>
        <div className="mt-3 space-y-2 text-xs text-white/70">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2"><FaFilePdf className="text-red-400" /> Proof_of_Funds.pdf</span>
            <span className="text-white/35">Feb 2026</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2"><FaFilePdf className="text-red-400" /> Visa_Application.pdf</span>
            <span className="text-white/35">Jan 2026</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2"><FaMicrophone className="text-emerald-300" /> Canada checklist</span>
            <span className="text-white/35">Today</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "5. Stay ahead",
    description:
      "Run smart suggestions to detect useful dates and prompts, or set your own reminders on a document or linked group.",
    icon: <FaCalendarCheck className="text-[#6DD1FF]" size={28} />,
    demo: (
      <div className="mt-4">
        <MiniCard
          title="Detected dates"
          lines={[
            "- Renewal window: Nov 1",
            "- Lease ends: Dec 1",
            "- Payment due: 1st monthly",
          ]}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip icon={<FaBell className="text-[#3F8CFF]" />} label="Set reminder" tone="bg-[#3F8CFF]/10 border-[#3F8CFF]/20 text-[#d5e7ff]" />
          <Chip icon={<FaBell className="text-[#3F8CFF]" />} label="Recurring" />
        </div>
      </div>
    ),
  },
  {
    title: "6. Move safely",
    description:
      "Export an encrypted backup bundle to your cloud storage and restore it inside NeuVault on another device.",
    icon: <FaArrowUp className="text-sky-300" size={28} />,
    demo: (
      <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4">
        <div className="flex flex-wrap gap-2">
          <Chip icon={<FaLock className="text-white/60" />} label="Encrypted .nvaultbundle" />
          <Chip icon={<FaFolderOpen className="text-white/60" />} label="Drive / iCloud / Dropbox" />
        </div>
        <div className="mt-3 text-xs text-white/45">
          Encrypted locally using a unique per-user key before export.
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 border-t border-white/10 px-6 py-24 text-white">
      <div className="mx-auto mb-16 max-w-6xl">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
            How it works
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
            From scattered inputs to one organized vault.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
            NeuVault does not ask you to reorganize your whole life first. It accepts messy real-world inputs, gives them structure, and keeps them easy to find later.
          </p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-35px_rgba(63,140,255,0.6)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-white/66">{step.description}</p>
              {step.demo}
              {index < steps.length - 1 && <Arrow />}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,20,39,0.94),rgba(10,14,28,0.82))] p-6 lg:p-7"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <div className="mb-4"><PiChatCircleDotsFill className="text-purple-300" size={30} /></div>
              <h3 className="text-2xl font-semibold text-white">Nova Assistant</h3>
              <p className="mt-3 text-sm leading-7 text-white/66 md:text-base">
                Ask questions in natural language about your vault, get summaries, export reports, or get help finding what you forgot you already saved.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/28 p-4 text-sm">
              <div className="space-y-4">
                <div className="flex justify-end gap-2">
                  <span className="max-w-[82%] rounded-2xl bg-[#3F8CFF]/20 px-3 py-2 text-white/92">
                    Do I have everything related to my move to Canada, and what should I do next?
                  </span>
                  <span className="self-center text-xs text-white/38">You</span>
                </div>

                <div className="flex justify-start gap-2">
                  <span className="self-center text-xs text-white/38">Nova</span>
                  <span className="max-w-[82%] rounded-2xl bg-purple-400/18 px-3 py-2 text-white/90">
                    I found 6 related items: visa application, passport scan, proof of funds, admission letter, medical receipt, and your voice checklist. Want a timeline, summary, or reminders for the key dates?
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/45">
                <FaCalendarCheck className="opacity-80" />
                Ask across documents, get clarity, then act if needed.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

