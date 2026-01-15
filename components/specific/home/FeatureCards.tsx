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
  FaFileInvoice,
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
    title: "Smart Intake",
    description:
      "Upload files, scan notes, write, or record voice notes. NeuVault transcribes voice, formats it cleanly, and can convert it to Word, PDF, or Excel.",
    context:
      "Capture anything fast — NeuVault turns it into structured, usable information.",
    icon: <PiVaultBold className="text-pink-400" size={28} />,
  },
  {
    title: "Instant Summaries",
    description:
      "Get clear summaries for documents, scanned images and notes — so you understand what matters in seconds.",
    context: "Skip the fluff. Keep the signal.",
    icon: <BsStars className="text-yellow-400" size={28} />,
  },
  {
    title: "Auto-Tag & Group",
    description:
      "NeuVault detects document types, assigns tags, and groups related files automatically.",
    context: "Everything lands where it should, the moment you add it.",
    icon: <FaTags className="text-green-400" size={28} />,
  },
  {
    title: "Smart Suggestions",
    description:
      "Run Smart Suggestions when you choose. NeuVault uses AI to detect event dates, deadlines, reminders, and expiries inside documents.",
    context:
      "You control when it runs — NeuVault notifies you when it’s time, just like backups.",
    icon: <FaCalendarCheck className="text-[#6DD1FF]" size={28} />,
  },
  {
    title: "Resurfacing",
    description:
      "Manually bring important documents back at the right time by marking them as low, medium, or high priority.",
    context:
      "Set one-time or recurring reminders for a document or an entire linked group.",
    icon: <FaBell className="text-[#3F8CFF]" size={28} />,
  },
  {
    title: "Nova Assistant",
    description:
      "Chat naturally, ask questions about your vault, or browse the web — all from one assistant that understands context.",
    context:
      "From “summarize this contract” to “what did I save about X?” — Nova knows.",
    icon: <FaMagic className="text-purple-400" size={28} />,
  },
  {
    title: "Universal Document Support",
    description:
      "PDF, Word, Excel, scanned images, and document photos — everything important in one private vault.",
    context: "Built for documents, not random media.",
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
      "A calm, distraction-free experience designed for clarity, not clutter.",
    context: "Simple UI. Serious power underneath.",
    icon: <PiVaultBold className="text-[#6DD1FF]" size={28} />,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative px-6 py-24 bg-[#0B0F19] text-white overflow-hidden border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why NeuVault?
        </motion.h2>

        <motion.p
          className="text-gray-400 text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          NeuVault is a private, local-first AI vault built specifically for
          real-world documents — helping you organize, understand, and act on
          what matters.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:shadow-lg hover:shadow-[#3F8CFF]/30 transition-transform duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
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
