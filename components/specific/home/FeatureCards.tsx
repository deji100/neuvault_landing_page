"use client";

import { motion } from "framer-motion";
import {
  FaLock,
  FaMagic,
  FaFileAlt,
  FaTags,
  FaBell,
  FaShieldAlt,
  FaCalendarCheck,
  FaArrowUp,
  FaMicrophone,
  FaGlobe,
} from "react-icons/fa";

import { BsStars } from "react-icons/bs";
import { PiVaultBold } from "react-icons/pi";

const features = [
  {
    title: "Local-First Privacy",
    description:
      "Your vault lives on your device by default — we don’t store your documents on our servers.",
    context:
      "Back up an encrypted bundle to your cloud and restore only inside NeuVault.",
    icon: <FaShieldAlt className="text-[#6DD1FF]" size={28} />,
  },
  {
    title: "Smart Intake (5 Ways)",
    description:
      "Upload documents, scan paper, upload scanned files, write notes, or record or upload voice notes — NeuVault turns everything into structured, searchable information.",
    context: "Capture anything fast, without changing how you already work.",
    icon: <PiVaultBold className="text-pink-400" size={28} />,
  },
  {
    title: "Voice Notes → Notes",
    description:
      "Record or upload audio (WhatsApp notes, recordings, lectures). NeuVault transcribes and formats it cleanly into a note you can keep or convert.",
    context:
      "Optionally convert voice notes to PDF, Word, or Excel when structure makes sense.",
    icon: <FaMicrophone className="text-green-300" size={28} />,
  },
  {
    title: "Instant Summaries",
    description:
      "Get clear summaries for documents, scans, and notes — so you understand what matters in seconds.",
    context: "Skip the fluff. Keep the signal.",
    icon: <BsStars className="text-yellow-400" size={28} />,
  },
  {
    title: "Auto-Tag & Group",
    description:
      "NeuVault detects document types, assigns tags, and groups related files automatically during intake.",
    context: "Everything lands where it should, the moment you add it.",
    icon: <FaTags className="text-green-400" size={28} />,
  },
  {
    title: "Smart Suggestions",
    description:
      "Run Smart Suggestions when you choose. NeuVault can detect deadlines, event dates, renewals, and expiries inside documents.",
    context:
      "You control when it runs — NeuVault can notify you when it’s time to review.",
    icon: <FaCalendarCheck className="text-[#6DD1FF]" size={28} />,
  },
  {
    title: "Resurfacing & Reminders",
    description:
      "Bring important documents back at the right time with one-time or recurring reminders — on a document or a linked group.",
    context: "Set it once. NeuVault reminds you when it matters.",
    icon: <FaBell className="text-[#3F8CFF]" size={28} />,
  },
  {
    title: "Nova Assistant (42+ Languages)",
    description:
      "Chat naturally in your preferred language. Ask questions about your vault, get insights, or explore the web — all in one place.",
    context:
      "From “summarize this contract” to “what did I save about X?” — Nova knows.",
    icon: <FaMagic className="text-purple-400" size={28} />,
  },
  {
    title: "Web Browsing (Conversational)",
    description:
      "Nova can browse the web through normal conversation — not just keywords — and help you connect outside info with what’s in your vault.",
    context: "Ask like a human. Get answers like a researcher.",
    icon: <FaGlobe className="text-[#6DD1FF]" size={28} />,
  },
  {
    title: "Encrypted Export & Restore",
    description:
      "Export an encrypted backup to your cloud (Drive, iCloud, Dropbox, or any storage) and restore on another device inside NeuVault.",
    context:
      "Your backup can’t be decrypted by third parties — only NeuVault can restore it.",
    icon: <FaArrowUp className="text-sky-300" size={28} />,
  },
  {
    title: "Universal Document Support",
    description:
      "PDF, Word, Excel, scanned images, document photos, and audio notes — everything important in one private vault.",
    context: "Built for real life, not just text.",
    icon: <FaFileAlt className="text-white" size={28} />,
  },
  {
    title: "Secure by Design",
    description:
      "Encrypted exports, optional deep insights, and privacy controls that keep you in charge of what’s processed.",
    context: "You decide what gets analyzed — and when.",
    icon: <FaLock className="text-white/70" size={28} />,
  },
  {
    title: "Beautifully Minimal",
    description:
      "A calm, distraction-free experience designed for clarity — with serious power underneath.",
    context: "Simple UI. Real intelligence.",
    icon: <PiVaultBold className="text-[#6DD1FF]" size={28} />,
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
          documents and voice — helping you organize, understand, and act on
          what matters, without storing your files on our servers.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:shadow-lg hover:shadow-[#3F8CFF]/30 transition-transform duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.06 }}
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
