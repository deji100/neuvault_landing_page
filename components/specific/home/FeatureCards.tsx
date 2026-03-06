"use client";

import { motion } from "framer-motion";
import {
  FaMagic,
  FaBell,
  FaShieldAlt,
  FaArrowUp,
  FaSearch,
  FaLayerGroup,
  FaRegEye,
  FaGlobe,
  FaStickyNote,
  FaRegFileAlt,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { PiVaultBold } from "react-icons/pi";

const painToRelief = [
  {
    painTitle: "Your life is scattered across places that were never built to hold it",
    pain:
      "Receipts in screenshots. IDs in WhatsApp. Contracts in email. PDFs in Downloads. Notes in random apps. You know your important information exists — but it’s spread across too many places to feel usable.",
    reliefTitle: "NeuVault gives everything important one home",
    relief:
      "Upload, scan, create and save notes, and bring your personal documents into one private vault. Everything stays structured, searchable, and easy to revisit when you actually need it.",
    icon: <PiVaultBold className="text-pink-400" size={26} />,
    accent: "from-pink-500/20 via-sky-500/10 to-transparent",
  },
  {
    painTitle: "You don’t lose files — you lose time, clarity, and calm",
    pain:
      "The real frustration isn’t that a document disappeared. It’s opening folder after folder, app after app, trying to remember what it was called, where you saved it, and why you needed it in the first place.",
    reliefTitle: "NeuVault turns searching into finding",
    relief:
      "Smart summaries, tags, grouping, and search help you locate and understand what matters fast. Instead of digging through clutter, you get straight to the right document and the right context.",
    icon: <BsStars className="text-yellow-400" size={24} />,
    accent: "from-yellow-500/15 via-white/5 to-transparent",
  },
  {
    painTitle: "Some documents matter later — and later is exactly when people forget",
    pain:
      "Deadlines, renewals, appointments, expiring IDs, follow-ups, and one-time documents usually go quiet until the worst possible moment. By then, the stress has already started.",
    reliefTitle: "Smart Suggestions & Resurfacing keeps important things alive",
    relief:
      "NeuVault helps resurface what matters before it becomes urgent. With reminders, smart suggestions, and resurfacing built around your documents, important items don’t stay buried until it’s too late.",
    icon: <FaBell className="text-sky-300" size={24} />,
    accent: "from-sky-500/15 via-white/5 to-transparent",
  },
  {
    painTitle: "A file is useless when you still have to decode it",
    pain:
      "A document can be right in front of you and still not help. Long PDFs, forms, letters, statements, and records often take too much effort to understand when you’re already busy or under pressure.",
    reliefTitle: "NeuVault helps you understand before you react",
    relief:
      "Summaries, extracted context, and structured organization make documents easier to grasp at a glance. You spend less time interpreting and more time acting on what matters.",
    icon: <FaRegFileAlt className="text-violet-300" size={24} />,
    accent: "from-violet-500/15 via-white/5 to-transparent",
  },
  {
    painTitle: "Your notes and documents live in separate worlds",
    pain:
      "You write something down in one place, save the related file somewhere else, and later the connection is gone. Context breaks when the thought and the document never stay together.",
    reliefTitle: "NeuVault keeps notes and documents in one intelligent flow",
    relief:
      "Typed notes, scanned files, uploaded documents, images, PDFs, markdown, and other supported files can live together in one vault, so context doesn’t disappear between apps.",
    icon: <FaStickyNote className="text-orange-300" size={24} />,
    accent: "from-orange-500/15 via-white/5 to-transparent",
  },
  {
    painTitle: "The internet has answers, but your own information matters too",
    pain:
      "Sometimes you need help from the web. Other times you need answers from your own stored files. Most tools force you to choose one or the other, so your workflow keeps breaking.",
    reliefTitle: "NeuVault’s Assistant helps with your vault and the web",
    relief:
      "Ask NeuVault about your documents, your notes, or broader questions that need web search. The assistant helps you move between your personal vault and outside information without losing flow.",
    icon: <FaGlobe className="text-cyan-300" size={24} />,
    accent: "from-cyan-500/15 via-white/5 to-transparent",
  },
  {
    painTitle: "You can preview some things — but not everything fits neatly into memory",
    pain:
      "When files pile up, even opening them one by one becomes friction. People stop revisiting what they saved because it feels like work just to inspect what’s inside.",
    reliefTitle: "NeuVault makes stored content easier to revisit",
    relief:
      "Preview support for images, PDFs, documents, markdown, and other supported document types helps reduce friction, so reviewing what you saved feels lighter and faster.",
    icon: <FaRegEye className="text-emerald-300" size={24} />,
    accent: "from-emerald-500/15 via-white/5 to-transparent",
  },
  {
    painTitle: "The cloud feels convenient — until it starts to feel uncertain",
    pain:
      "You don’t always know where your files are, what gets stored, what gets processed, or how exposed your information really is. Convenience can start to feel like giving up control.",
    reliefTitle: "NeuVault is local-first, private, and intentional",
    relief:
      "Your vault lives on your device by default. NeuVault is designed around privacy, user control, and trust — so your important information feels owned, not borrowed.",
    icon: <FaShieldAlt className="text-[#6DD1FF]" size={24} />,
    accent: "from-[#6DD1FF]/20 via-white/5 to-transparent",
  },
];

const quietProof = [
  {
    title: "Auto-organization that actually sticks",
    desc: "Items are grouped into the right group and subgroup during intake, and you can link related documents so context stays connected.",
    icon: <FaLayerGroup className="text-green-300" size={20} />,
  },
  {
    title: "Search that works even offline",
    desc: "Find by title, tags, summary keywords, type, or date, with fast local search when your internet is unstable or unavailable.",
    icon: <FaSearch className="text-emerald-300" size={20} />,
  },
  {
    title: "Ask in plain language",
    desc: "Talk to Nova in 42+ languages to find documents, pull details, summarize, explain, and browse the web when needed.",
    icon: <FaMagic className="text-purple-400" size={20} />,
  },
  {
    title: "Encrypted backup and restore",
    desc: "Export an encrypted backup to your preferred cloud and restore on another device without exposing your vault in plain text.",
    icon: <FaArrowUp className="text-sky-300" size={20} />,
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative px-6 py-24 bg-[#0B0F19] text-white overflow-hidden border-t border-white/10"
    >
      {/* subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
      >
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#3F8CFF]/20 blur-3xl" />
        <div className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-[#6DD1FF]/15 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-left md:text-center mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          It’s not “files.”
          <span className="block text-white/70 font-semibold">
            It’s your life — and it deserves to feel held.
          </span>
        </motion.h2>

        <motion.p
          className="text-gray-400 text-left md:text-center max-w-3xl md:mx-auto mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          viewport={{ once: true }}
        >
          NeuVault exists for the quiet moments people don’t talk about — the
          anxiety of not finding a document, the exhaustion of re-checking, the
          feeling of being unprepared. It replaces chaos with calm, and
          searching with certainty.
        </motion.p>

        {/* Pain -> Relief story cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {painToRelief.map((s, idx) => (
            <motion.div
              key={idx}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.06 }}
              viewport={{ once: true }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${s.accent}`}
                aria-hidden="true"
              />

              <div className="relative p-6 md:p-7">
                <div className="flex items-start gap-3 mb-4">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }}
                    className="mt-0.5"
                  >
                    {s.icon}
                  </motion.div>

                  <div className="flex-1">
                    <p className="text-xs tracking-wide text-white/50 uppercase">
                      The pain
                    </p>
                    <h3 className="text-lg md:text-xl font-semibold text-white">
                      {s.painTitle}
                    </h3>
                  </div>
                </div>

                <p className="text-sm md:text-[15px] leading-relaxed text-gray-300">
                  {s.pain}
                </p>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-xs tracking-wide text-white/50 uppercase">
                    The relief
                  </p>
                  <h4 className="text-base md:text-lg font-semibold text-white mt-1">
                    {s.reliefTitle}
                  </h4>
                  <p className="text-sm md:text-[15px] leading-relaxed text-gray-300 mt-2">
                    {s.relief}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quiet proof / supporting pillars */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                Built for the real world.
                <span className="text-white/60 font-semibold">
                  {" "}
                  Quietly.
                </span>
              </h3>
              <p className="text-gray-400 mt-2 max-w-2xl">
                Practical protections that reduce stress: automatic grouping, offline-capable search, plain-language assistant help, and encrypted portability when you switch devices.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              <span className="inline-block h-2 w-2 rounded-full bg-[#6DD1FF]" />
              Local-first by default
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quietProof.map((p, idx) => (
              <motion.div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 hover:shadow-lg hover:shadow-[#3F8CFF]/20 transition-transform duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{p.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{p.title}</p>
                    <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing emotional CTA-ish line (no button; keeps your structure flexible) */}
        <motion.div
          className="mt-14 text-left md:text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-white/80 text-lg md:text-xl font-semibold">
            When your documents feel held,
            <span className="text-white/60 font-semibold">
              {" "}
              you feel held.
            </span>
          </p>
          <p className="text-gray-400 mt-3 max-w-3xl md:mx-auto">
            NeuVault isn’t trying to impress you. It’s trying to remove the
            hidden stress you’ve normalized — and replace it with calm you can
            finally trust.
          </p>
        </motion.div>
      </div>
    </section>
  );
}