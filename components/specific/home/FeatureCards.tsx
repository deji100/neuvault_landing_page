"use client";

import { motion } from "framer-motion";
import {
  FaBell,
  FaCloud,
  FaLayerGroup,
  FaSearch,
  FaShieldAlt,
  FaStickyNote,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { PiVaultBold } from "react-icons/pi";

const pillars = [
  {
    title: "Not another place to dump files",
    description:
      "Cloud drives store documents. NeuVault helps you remember what they are, why they matter, where they belong, and when you may need them again.",
    icon: <PiVaultBold className="text-pink-300" size={26} />,
    accent: "from-pink-500/18 via-white/6 to-transparent",
  },
  {
    title: "Context stays with the record",
    description:
      "Summaries, tags, dates, notes, linked records, and extracted details stay close to the document so future-you does not have to reconstruct the story.",
    icon: <BsStars className="text-yellow-300" size={24} />,
    accent: "from-yellow-500/16 via-white/6 to-transparent",
  },
  {
    title: "Important dates do not stay buried",
    description:
      "Renewals, expiry dates, deadlines, follow-ups, and records that need review can come back to your attention before they become urgent.",
    icon: <FaBell className="text-sky-300" size={24} />,
    accent: "from-sky-500/16 via-white/6 to-transparent",
  },
  {
    title: "Documents, notes, scans, and voice belong together",
    description:
      "The file and the thought around it should not live in separate apps. NeuVault keeps written notes, scans, uploads, screenshots, and voice records in one private flow.",
    icon: <FaStickyNote className="text-orange-300" size={24} />,
    accent: "from-orange-500/16 via-white/6 to-transparent",
  },
  {
    title: "Ask Nova when search is not enough",
    description:
      "Sometimes you do not remember the filename. Ask Nova about your vault, summarize related records, and find what you saved by meaning and context.",
    icon: <FaSearch className="text-cyan-300" size={24} />,
    accent: "from-cyan-500/16 via-white/6 to-transparent",
  },
  {
    title: "Private by default, recoverable by design",
    description:
      "NeuVault is local-first and gives you encrypted backups you control, so your important records can move across devices without turning into forced cloud storage.",
    icon: <FaShieldAlt className="text-[#6DD1FF]" size={24} />,
    accent: "from-[#6DD1FF]/20 via-white/6 to-transparent",
  },
];

const supportPoints = [
  {
    title: "Built around document memory",
    desc: "NeuVault helps preserve what the document means, not just where the file sits.",
    icon: <BsStars className="text-yellow-300" size={18} />,
  },
  {
    title: "Find from partial memory",
    desc: "Search by title, tags, summaries, dates, type, or related context when the filename is forgotten.",
    icon: <FaSearch className="text-emerald-300" size={18} />,
  },
  {
    title: "Connect related records",
    desc: "Group documents, notes, scans, and voice records around the real-life issue they belong to.",
    icon: <FaLayerGroup className="text-[#6ce6b3]" size={18} />,
  },
  {
    title: "Back up without surrendering control",
    desc: "Create encrypted backups you control and restore your vault across devices when you need to move.",
    icon: <FaCloud className="text-sky-300" size={18} />,
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-t border-white/10 px-6 py-24 text-white"
    >
      <div className="pointer-events-none absolute inset-0 opacity-75">
        <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#3F8CFF]/14 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#6ce6b3]/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
            Why NeuVault is different
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
            Storage saves the file.
            <span className="block text-white/68">
              NeuVault helps you remember why it matters.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
            NeuVault is built for the records people save but struggle to find,
            understand, connect, revisit, or recover later.
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
              <div
                className={`absolute inset-0 bg-gradient-to-br ${pillar.accent}`}
                aria-hidden="true"
              />

              <div className="relative flex items-start gap-4">
                <div className="mt-1">{pillar.icon}</div>

                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {pillar.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/68 md:text-[15px]">
                    {pillar.description}
                  </p>
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
              <h3 className="text-2xl font-semibold text-white">
                Built for the moment you suddenly need it.
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/66 md:text-base">
                A receipt, form, certificate, school record, contract, ID, note,
                or renewal can sit quietly for months — until the day it matters.
                NeuVault keeps that record ready.
              </p>
            </div>

            <div className="rounded-full border border-[#6DD1FF]/18 bg-[#6DD1FF]/8 px-4 py-2 text-sm text-[#d7efff]">
              Document memory, not generic storage
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
                    <h4 className="text-sm font-semibold text-white">
                      {point.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-white/62">
                      {point.desc}
                    </p>
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