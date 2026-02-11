"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaPlusCircle,
  FaLightbulb,
  FaLayerGroup,
  FaSearch,
  FaCalendarCheck,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaRegStickyNote,
  FaMicrophone,
  FaTag,
  FaFolderOpen,
  FaArrowRight,
  FaWifi,
} from "react-icons/fa";
import { PiChatCircleDotsFill } from "react-icons/pi";
import { FaArrowUp, FaBell, FaLock } from "react-icons/fa6";

type Step = {
  title: string;
  description: string;
  icon: React.ReactNode;
  demo: React.ReactNode;
  wide?: boolean; // assistant card
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
  <div
    className={[
      "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
      tone,
    ].join(" ")}
  >
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
    <div className="text-xs font-semibold text-white/80 mb-2">{title}</div>
    <div className="space-y-1">
      {lines.map((l, i) => (
        <div key={i} className="text-xs text-white/60">
          {l}
        </div>
      ))}
    </div>
  </div>
);

const Arrow = () => (
  <div className="flex items-center justify-center my-3">
    <div className="hidden sm:flex items-center gap-2 text-white/30">
      <div className="h-px w-10 bg-white/10" />
      <FaArrowRight />
      <div className="h-px w-10 bg-white/10" />
    </div>
    <div className="sm:hidden text-white/25">
      <FaArrowRight />
    </div>
  </div>
);

const steps: Step[] = [
  {
    title: "1. Add",
    description:
      "Capture things the way you already do. NeuVault accepts real-life inputs — documents, scans, notes, and voice.",
    icon: <FaPlusCircle className="text-[#3F8CFF]" size={28} />,
    demo: (
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          <Chip
            icon={<FaFilePdf className="text-red-400" />}
            label="Visa_Application.pdf"
            tone="bg-red-500/10 border-red-500/20 text-red-100"
          />
          <Chip
            icon={<FaFileWord className="text-blue-400" />}
            label="Lease_Agreement.docx"
            tone="bg-blue-500/10 border-blue-500/20 text-blue-100"
          />
          <Chip
            icon={<FaFileExcel className="text-green-400" />}
            label="Invoices_Feb.xlsx"
            tone="bg-green-500/10 border-green-500/20 text-green-100"
          />
          <Chip
            icon={<FaRegStickyNote className="text-yellow-300" />}
            label="Quick note"
            tone="bg-yellow-500/10 border-yellow-500/20 text-yellow-100"
          />
          <Chip
            icon={<FaMicrophone className="text-emerald-300" />}
            label="Voice note (02:14)"
            tone="bg-emerald-500/10 border-emerald-500/20 text-emerald-100"
          />
        </div>

        <div className="mt-3 text-xs text-white/45 flex items-center gap-2">
          <FaWifi className="opacity-80" />
          Works offline — items queue for processing when you&apos;re back online.
        </div>
      </div>
    ),
  },
  {
    title: "2. Understand",
    description:
      "Smart Intake securely processes text to generate summaries, tags, and key details — so every item makes sense at a glance.",
    icon: <FaLightbulb className="text-yellow-400" size={28} />,
    demo: (
      <div className="mt-4">
        <MiniCard
          title="Auto summary"
          lines={[
            "• 12-month lease agreement",
            "• Rent due: 1st of every month",
            "• Renewal window: Nov 1 – Dec 1",
          ]}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip
            icon={<FaTag className="text-[#6DD1FF]" />}
            label="Lease"
          />
          <Chip
            icon={<FaTag className="text-[#6DD1FF]" />}
            label="Renewal"
          />
          <Chip
            icon={<FaTag className="text-[#6DD1FF]" />}
            label="Important"
          />
        </div>
      </div>
    ),
  },
  {
    title: "3. Organize",
    description:
      "NeuVault places each item into the right group + subgroup automatically. You can also link related items when they belong together.",
    icon: <FaLayerGroup className="text-green-400" size={28} />,
    demo: (
      <div className="mt-4">
        <div className="rounded-xl border border-white/10 bg-black/25 p-4">
          <div className="flex items-center gap-2 text-xs text-white/80 font-semibold mb-3">
            <FaFolderOpen className="text-white/60" />
            Immigration
            <span className="text-white/30">/</span>
            Canada
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip
              icon={<FaFilePdf className="text-red-400" />}
              label="Visa_Application.pdf"
              tone="bg-white/5 border-white/10 text-white/80"
            />
            <Chip
              icon={<FaFilePdf className="text-red-400" />}
              label="Passport_Scan.pdf"
              tone="bg-white/5 border-white/10 text-white/80"
            />
            <Chip
              icon={<FaMicrophone className="text-emerald-300" />}
              label="Canada checklist"
              tone="bg-white/5 border-white/10 text-white/80"
            />
          </div>

          <div className="mt-3 text-xs text-white/45">
            Linked: “Proof of funds” • “Admission letter” • “Medical receipt”
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "4. Find",
    description:
      "Search by title, tags, summary keywords, type, or date. Filters are fast and work offline because your vault is local-first.",
    icon: <FaSearch className="text-emerald-400" size={28} />,
    demo: (
      <div className="mt-4">
        <div className="rounded-xl border border-white/10 bg-black/25 p-4">
          <div className="text-xs text-white/55 mb-2">Search</div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80">
            canada proof of funds
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between text-xs text-white/70">
              <span className="flex items-center gap-2">
                <FaFilePdf className="text-red-400" />
                Proof_of_Funds.pdf
              </span>
              <span className="text-white/35">Feb 2026</span>
            </div>
            <div className="flex items-center justify-between text-xs text-white/70">
              <span className="flex items-center gap-2">
                <FaFilePdf className="text-red-400" />
                Visa_Application.pdf
              </span>
              <span className="text-white/35">Jan 2026</span>
            </div>
            <div className="flex items-center justify-between text-xs text-white/70">
              <span className="flex items-center gap-2">
                <FaMicrophone className="text-emerald-300" />
                Canada checklist (voice)
              </span>
              <span className="text-white/35">Today</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "5. Act",
    description:
      "Run Smart Suggestions to detect deadlines and renewals, or set your own reminders on a document or linked group.",
    icon: <FaCalendarCheck className="text-[#6DD1FF]" size={28} />,
    demo: (
      <div className="mt-4">
        <MiniCard
          title="Detected dates"
          lines={[
            "• Renewal window: Nov 1",
            "• Lease ends: Dec 1",
            "• Payment due: 1st monthly",
          ]}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip
            icon={<FaBell className="text-[#3F8CFF]" />}
            label="Set reminder"
            tone="bg-[#3F8CFF]/10 border-[#3F8CFF]/20 text-[#cfe5ff]"
          />
          <Chip
            icon={<FaBell className="text-[#3F8CFF]" />}
            label="Recurring"
            tone="bg-white/5 border-white/10 text-white/80"
          />
        </div>
      </div>
    ),
  },
  {
    title: "6. Export & Restore",
    description:
      "Export an encrypted backup to your cloud storage and restore on another device inside NeuVault.",
    icon: <FaArrowUp className="text-sky-300" size={28} />,
    demo: (
      <div className="mt-4">
        <div className="rounded-xl border border-white/10 bg-black/25 p-4">
          <div className="flex flex-wrap gap-2">
            <Chip label="Encrypted .nvaultbundle" icon={<FaLock className="text-white/60" />} />
            <Chip label="Drive / iCloud / Dropbox" icon={<FaFolderOpen className="text-white/60" />} />
          </div>
          <div className="mt-3 text-xs text-white/45">
            Encrypted locally using a unique per-user key before export.
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Nova Assistant",
    description:
      "Chat naturally in 42+ languages. Ask questions about your vault, generate summaries, export reports, and browse the web through normal conversation.",
    icon: <PiChatCircleDotsFill className="text-purple-400" size={28} />,
    wide: true,
    demo: (
      <div className="mt-4">
        <div className="bg-black/30 p-4 rounded-xl text-sm space-y-4 border border-white/10">
          {/* User */}
          <div className="flex justify-end items-start gap-2">
            <span className="bg-[#3F8CFF]/20 px-3 py-2 rounded-lg max-w-[80%]">
              Do I have anything related to my move to Canada — and what should I do next?
            </span>
            <span className="text-xs text-gray-400 self-center">You</span>
          </div>

          {/* Assistant */}
          <div className="flex justify-start items-start gap-2">
            <span className="text-xs text-gray-400 self-center">Nova</span>
            <span className="bg-purple-400/20 px-3 py-2 rounded-lg max-w-[80%]">
              🌍 I found 6 related items: visa application, passport scan, proof
              of funds, admission letter, medical receipt, and a voice note
              titled “Canada checklist.” Want a timeline summary, a checklist,
              or reminders for key dates?
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/45 pt-2">
            <FaCalendarCheck className="opacity-80" />
            Ask across documents → get insight → act (optional)
          </div>
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  // 3 / 3 / 2 layout: first 6 cards (3 rows), last row has one card + assistant
  const firstSix = steps.slice(0, 6);
  const assistant = steps[6];

  return (
    <section
      id="how-it-works"
      className="relative z-10 px-6 py-24 bg-transparent text-white border-t border-white/10"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto text-left md:text-center mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How NeuVault Fits Into Your Life
        </motion.h2>

        <motion.p
          className="text-gray-400 max-w-2xl md:mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          A visual flow — capture, understand, organize, find, and act — with a
          private assistant that understands your vault.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto">
        {/* First 6 cards: 3 / 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {firstSix.map((step, idx) => (
            <motion.div
              key={idx}
              className={[
                "p-6 rounded-2xl border border-white/10 backdrop-blur-sm bg-white/5",
                "hover:shadow-lg hover:shadow-[#3F8CFF]/10 transition-transform duration-300 hover:-translate-y-1",
                "text-left",
              ].join(" ")}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06, duration: 0.55 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between">
                <div className="mb-4">{step.icon}</div>
              </div>

              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.description}</p>

              {/* visual demo */}
              {step.demo}

              {/* subtle arrow for flow */}
              {idx < firstSix.length - 1 && <Arrow />}
            </motion.div>
          ))}
        </div>

        {/* Last row: 1 card + assistant */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* spacer card (optional) - if you want another non-assistant card here later */}
          <div className="lg:col-span-1 hidden lg:block opacity-0 pointer-events-none select-none">
            spacer
          </div>

          <motion.div
            className={[
              "p-6 rounded-2xl border border-white/10 backdrop-blur-sm bg-white/5",
              "hover:shadow-lg hover:shadow-[#3F8CFF]/10 transition-transform duration-300 hover:-translate-y-1",
              "text-left lg:col-span-2",
            ].join(" ")}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">{assistant.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{assistant.title}</h3>
            <p className="text-gray-400 text-sm">{assistant.description}</p>
            {assistant.demo}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
