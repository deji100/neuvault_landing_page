"use client";

import { motion } from "framer-motion";
import {
  FaLock,
  FaMagic,
  FaTags,
  FaBell,
  FaShieldAlt,
  FaCalendarCheck,
  FaArrowUp,
  FaMicrophone,
  FaWifi,
} from "react-icons/fa";

import { BsStars } from "react-icons/bs";
import { PiVaultBold } from "react-icons/pi";

const features = [
  {
    title: "Local-First Document Storage",
    description:
      "Your documents are stored on your device by default. NeuVault does not store your files on its servers. No fee is charged for storage — you only pay for the AI processing you use.",
    context: "Your vault stays yours — always.",
    icon: <FaShieldAlt className="text-[#6DD1FF]" size={28} />,
  },
  {
    title: "Smart Intake (5 Ways)",
    description:
      "Upload documents, scan paper, write notes, capture images, or record/upload voice notes. Smart Intake securely processes text to generate summaries, tags, and structured organization.",
    context:
      "Supports PDFs, Word, Excel, scans, document photos, notes, and audio.",
    icon: <PiVaultBold className="text-pink-400" size={28} />,
  },
  {
    title: "Offline Capture & Queue",
    description:
      "Add documents, scans, notes, and voice even without internet. NeuVault stores everything locally and securely processes it when you're back online.",
    context:
      "Track every item in the Queue — pending, processing, completed, or failed.",
    icon: <FaWifi className="text-green-300" size={28} />,
  },
  {
    title: "Voice → Structured Notes",
    description:
      "Record or upload audio (lectures, WhatsApp notes, meetings). NeuVault transcribes and formats it into structured notes you can search or convert.",
    context: "Export to PDF, Word, or Excel when structure makes sense.",
    icon: <FaMicrophone className="text-green-300" size={28} />,
  },
  {
    title: "Instant Summaries & Auto-Tagging",
    description:
      "Understand documents in seconds. NeuVault extracts key information, assigns tags, and groups related files automatically.",
    context: "Skip the clutter. Keep the signal.",
    icon: <BsStars className="text-yellow-400" size={28} />,
  },
  {
    title: "Auto-Organization (Groups + Subgroups)",
    description:
      "NeuVault places each item into the right group and subgroup during intake, so your vault stays structured without manual sorting.",
    context: "Everything lands where it should, the moment you add it. You can also link documents together to create custom groups based on relationships you define.",
    icon: <FaTags className="text-green-400" size={28} />,
  },
  {
    title: "Smart Suggestions & Resurfacing",
    description:
      "Detect deadlines, renewals, and event dates — or set your own reminders on a document or linked group.",
    context: "NeuVault brings important documents back when they matter.",
    icon: <FaCalendarCheck className="text-[#6DD1FF]" size={28} />,
  },
  {
    title: "Nova Assistant (42+ Languages + Web)",
    description:
      "Chat naturally in your preferred language. Ask questions about your vault, find document(s), get deep document insights, and browse the web through normal conversation.",
    context:
      "From quick answers to deep analysis — Nova understands context.",
    icon: <FaMagic className="text-purple-400" size={28} />,
  },
  {
    title: "Encrypted Backup & Restore",
    description:
      "Export an encrypted backup to your preferred cloud storage and restore it on another device inside NeuVault.",
    context:
      "Backups are encrypted locally using a unique per-user key before export.",
    icon: <FaArrowUp className="text-sky-300" size={28} />,
  },
  {
    title: "Security by Design",
    description:
      "Secure transmission, per-user encryption keys for backup, optional deep insights, and full visibility into processing states.",
    context: "Transparency and control at every layer.",
    icon: <FaLock className="text-white/70" size={28} />,
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative px-6 py-24 bg-[#0B0F19] text-white overflow-hidden border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-left md:text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why NeuVault?
        </motion.h2>

        <motion.p
          className="text-gray-400 text-left md:text-center max-w-2xl md:mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          NeuVault is a private, local-first AI vault built for real-world
          documents and voice. Capture anything, organize automatically, and
          understand what matters — without storing your files on our servers.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:shadow-lg hover:shadow-[#3F8CFF]/30 transition-transform duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ y: [0, -4, 0], rotate: [0, 4, -4, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="mb-4"
              >
                {feature.icon}
              </motion.div>

              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm mb-2">
                {feature.description}
              </p>
              <p className="text-gray-500 text-xs italic">{feature.context}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
