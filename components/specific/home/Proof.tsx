"use client";

import { motion } from "framer-motion";
import {
  FaFileInvoiceDollar,
  FaHeartbeat,
  FaBookOpen,
  FaReceipt,
  FaIdCard,
  FaShieldAlt,
} from "react-icons/fa";

const scenarios = [
  {
    icon: <FaFileInvoiceDollar className="text-[#3F8CFF]" size={28} />,
    title: "Business & Finance",
    description:
      "Store invoices, receipts, contracts, and statements — then ask Nova to summarize, find totals, or export a clean report.",
  },
  {
    icon: <FaHeartbeat className="text-pink-400" size={28} />,
    title: "Health & Medical",
    description:
      "Keep lab results, prescriptions, and hospital documents organized — searchable, summarized, and easy to resurface when needed.",
  },
  {
    icon: <FaBookOpen className="text-yellow-400" size={28} />,
    title: "School & Research",
    description:
      "Organize course documents, PDFs, and scanned notes — grouped by topic so you can find what you need fast.",
  },
  {
    icon: <FaIdCard className="text-green-400" size={28} />,
    title: "Life Documents",
    description:
      "IDs, visas, warranties, agreements, and important forms — stored locally and backed up as encrypted export bundles.",
  },
];

export default function SeeItInAction() {
  return (
    <section
      id="see-it-in-action"
      className="relative px-6 py-24 bg-[#0B0F19] text-white border-t border-white/10"
    >
      {/* Background glow */}
      <motion.div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#3F8CFF]/10 blur-[140px] -z-10"
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Section header */}
      <div className="text-center mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          See NeuVault in Action
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          NeuVault is built for real-world documents — the ones you actually
          need to find again, understand fast, and stay ahead of.
        </motion.p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center max-w-6xl mx-auto">
        {/* Left scenarios */}
        <div className="space-y-6">
          {scenarios.slice(0, 2).map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:shadow-lg hover:shadow-[#3F8CFF]/10 transition"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Middle: demo placeholder */}
        <motion.div
          className="relative w-full aspect-[9/18] bg-black/30 rounded-[2rem] border border-white/10 overflow-hidden shadow-lg shadow-black/40 flex items-center justify-center transform-gpu transition-transform duration-300 hover:rotate-1 hover:-rotate-y-3 hover:scale-[1.02]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          viewport={{ once: true }}
          aria-label="NeuVault demo placeholder"
        >
          {/* subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />

          {/* Placeholder play button */}
          <motion.div
            className="w-20 h-20 rounded-full bg-[#3F8CFF]/20 flex items-center justify-center cursor-pointer"
            animate={{ scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#3F8CFF"
              viewBox="0 0 24 24"
              stroke="none"
              className="w-10 h-10"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <FaShieldAlt className="text-white/50" />
              Local-first • Encrypted export backups • No document server storage
            </div>
          </div>
        </motion.div>

        {/* Right scenarios */}
        <div className="space-y-6">
          {scenarios.slice(2).map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:shadow-lg hover:shadow-[#3F8CFF]/10 transition"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
