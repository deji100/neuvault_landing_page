"use client";

import { motion } from "framer-motion";
import {
  FaBell,
  FaGlobe,
  FaLayerGroup,
  FaSearch,
  FaShieldAlt,
  FaStickyNote,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { PiVaultBold } from "react-icons/pi";

const pillars = [
  {
    title: "One home for the documents you keep misplacing",
    description:
      "Receipts, IDs, agreements, warranties, medical files, school records, and personal notes stop living across screenshots, chats, downloads, and random folders.",
    icon: <PiVaultBold className="text-pink-300" size={26} />,
    accent: "from-pink-500/18 via-white/6 to-transparent",
  },
  {
    title: "Understanding, not just dumping",
    description:
      "Summaries, tags, structure, and linked context help you understand what a document says and why it matters without rereading everything from scratch.",
    icon: <BsStars className="text-yellow-300" size={24} />,
    accent: "from-yellow-500/16 via-white/6 to-transparent",
  },
  {
    title: "Reminders tied to the document itself",
    description:
      "NeuVault is built for renewal dates, deadlines, follow-ups, and moments that are easy to forget until the stress has already started.",
    icon: <FaBell className="text-sky-300" size={24} />,
    accent: "from-sky-500/16 via-white/6 to-transparent",
  },
  {
    title: "Notes, scans, uploads, and voice in one flow",
    description:
      "The thought and the file can stay together. Typed notes, scans, uploads, and voice transcripts do not need separate apps to remain useful.",
    icon: <FaStickyNote className="text-orange-300" size={24} />,
    accent: "from-orange-500/16 via-white/6 to-transparent",
  },
  {
    title: "Ask for help when you need it",
    description:
      "Nova can answer questions about your vault, summarize what you have, and move to web search when the question needs outside information too.",
    icon: <FaGlobe className="text-cyan-300" size={24} />,
    accent: "from-cyan-500/16 via-white/6 to-transparent",
  },
  {
    title: "Privacy is part of the product",
    description:
      "NeuVault is local-first by default, keeps documents on your device, and gives you encrypted export bundles so portability does not require surrendering control.",
    icon: <FaShieldAlt className="text-[#6DD1FF]" size={24} />,
    accent: "from-[#6DD1FF]/20 via-white/6 to-transparent",
  },
];

const supportPoints = [
  {
    title: "Organize automatically",
    desc: "Items can be grouped into the right bucket during intake so the vault stays usable as it grows.",
    icon: <FaLayerGroup className="text-[#6ce6b3]" size={18} />,
  },
  {
    title: "Search locally",
    desc: "Local-first search helps you find titles, tags, and summaries even when your connection is unstable.",
    icon: <FaSearch className="text-emerald-300" size={18} />,
  },
  {
    title: "Surface what matters later",
    desc: "Important documents do not stay buried until the worst possible time.",
    icon: <FaBell className="text-sky-300" size={18} />,
  },
  {
    title: "Keep connected context",
    desc: "Linked documents and mixed-content groups make one issue easier to revisit as a whole.",
    icon: <FaLayerGroup className="text-white/70" size={18} />,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden border-t border-white/10 px-6 py-24 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-75">
        <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#3F8CFF]/14 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#6ce6b3]/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
            Pain first, then relief
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
            Your files should not be this hard to find.
            <span className="block text-white/68">NeuVault turns scattered documents into a private vault you can actually use.</span>
          </h2>
          <p className="mt-5 text-base leading-8 text-white/68 md:text-lg">
            The goal is not to create one more dumping ground for PDFs. The goal is to help you capture what matters, understand it quickly, and stop losing time to document chaos.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              viewport={{ once: true }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.accent}`} aria-hidden="true" />
              <div className="relative flex items-start gap-4">
                <div className="mt-1">{pillar.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/68 md:text-[15px]">{pillar.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-14 rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(11,19,34,0.92),rgba(9,15,27,0.78))] p-6 sm:p-8"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-white">Useful in the quiet moments.</h3>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/66 md:text-base">
                NeuVault is strongest when life is busy: a renewal date is coming up, a form needs context, a document is buried, or you suddenly need something you thought you saved somewhere.
              </p>
            </div>
            <div className="rounded-full border border-[#6DD1FF]/18 bg-[#6DD1FF]/8 px-4 py-2 text-sm text-[#d7efff]">
              Built for real document memory, not generic storage
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {supportPoints.map((point, index) => (
              <motion.div
                key={point.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{point.icon}</div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{point.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-white/62">{point.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
