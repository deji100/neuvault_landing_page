// "use client";

// import { motion } from "framer-motion";
// import {
//   FaLock,
//   FaMagic,
//   FaTags,
//   FaBell,
//   FaShieldAlt,
//   FaCalendarCheck,
//   FaArrowUp,
//   FaMicrophone,
//   FaWifi,
// } from "react-icons/fa";

// import { BsStars } from "react-icons/bs";
// import { PiVaultBold } from "react-icons/pi";

// const features = [
//   {
//     title: "Local-First Document Storage",
//     description:
//       "Your documents are stored on your device by default. NeuVault does not store your files on its servers. No fee is charged for storage — you only pay for the AI processing you use.",
//     context: "Your vault stays yours — always.",
//     icon: <FaShieldAlt className="text-[#6DD1FF]" size={28} />,
//   },
//   {
//     title: "Smart Intake (5 Ways)",
//     description:
//       "Upload documents, scan paper, write notes, capture images, or record/upload voice notes. Smart Intake securely processes text to generate summaries, tags, and structured organization.",
//     context:
//       "Supports PDFs, Word, Excel, scans, document photos, notes, and audio.",
//     icon: <PiVaultBold className="text-pink-400" size={28} />,
//   },
//   {
//     title: "Offline Capture & Queue",
//     description:
//       "Add documents, scans, notes, and voice even without internet. NeuVault stores everything locally and securely processes it when you're back online.",
//     context:
//       "Track every item in the Queue — pending, processing, completed, or failed.",
//     icon: <FaWifi className="text-green-300" size={28} />,
//   },
//   {
//     title: "Voice → Structured Notes",
//     description:
//       "Record or upload audio (lectures, WhatsApp notes, meetings). NeuVault transcribes and formats it into structured notes you can search or convert.",
//     context: "Export to PDF, Word, or Excel when structure makes sense.",
//     icon: <FaMicrophone className="text-green-300" size={28} />,
//   },
//   {
//     title: "Instant Summaries & Auto-Tagging",
//     description:
//       "Understand documents in seconds. NeuVault extracts key information, assigns tags, and groups related files automatically.",
//     context: "Skip the clutter. Keep the signal.",
//     icon: <BsStars className="text-yellow-400" size={28} />,
//   },
//   {
//     title: "Auto-Organization (Groups + Subgroups)",
//     description:
//       "NeuVault places each item into the right group and subgroup during intake, so your vault stays structured without manual sorting.",
//     context: "Everything lands where it should, the moment you add it. You can also link documents together to create custom groups based on relationships you define.",
//     icon: <FaTags className="text-green-400" size={28} />,
//   },
//   {
//     title: "Smart Suggestions & Resurfacing",
//     description:
//       "Detect deadlines, renewals, and event dates — or set your own reminders on a document or linked group.",
//     context: "NeuVault brings important documents back when they matter.",
//     icon: <FaCalendarCheck className="text-[#6DD1FF]" size={28} />,
//   },
//   {
//     title: "Nova Assistant (42+ Languages + Web)",
//     description:
//       "Chat naturally in your preferred language. Ask questions about your vault, find document(s), get deep document insights, and browse the web through normal conversation.",
//     context:
//       "From quick answers to deep analysis — Nova understands context.",
//     icon: <FaMagic className="text-purple-400" size={28} />,
//   },
//   {
//     title: "Encrypted Backup & Restore",
//     description:
//       "Export an encrypted backup to your preferred cloud storage and restore it on another device inside NeuVault.",
//     context:
//       "Backups are encrypted locally using a unique per-user key before export.",
//     icon: <FaArrowUp className="text-sky-300" size={28} />,
//   },
//   {
//     title: "Security by Design",
//     description:
//       "Secure transmission, per-user encryption keys for backup, optional deep insights, and full visibility into processing states.",
//     context: "Transparency and control at every layer.",
//     icon: <FaLock className="text-white/70" size={28} />,
//   },
// ];

// export default function FeaturesSection() {
//   return (
//     <section
//       id="features"
//       className="relative px-6 py-24 bg-[#0B0F19] text-white overflow-hidden border-t border-white/10"
//     >
//       <div className="max-w-6xl mx-auto">
//         <motion.h2
//           className="text-3xl md:text-4xl font-bold text-left md:text-center mb-4"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           Why NeuVault?
//         </motion.h2>

//         <motion.p
//           className="text-gray-400 text-left md:text-center max-w-2xl md:mx-auto mb-12"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           viewport={{ once: true }}
//         >
//           NeuVault is a private, local-first AI vault built for real-world
//           documents and voice. Capture anything, organize automatically, and
//           understand what matters — without storing your files on our servers.
//         </motion.p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, idx) => (
//             <motion.div
//               key={idx}
//               className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:shadow-lg hover:shadow-[#3F8CFF]/30 transition-transform duration-300 hover:-translate-y-2"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: idx * 0.05 }}
//               viewport={{ once: true }}
//             >
//               <motion.div
//                 animate={{ y: [0, -4, 0], rotate: [0, 4, -4, 0] }}
//                 transition={{
//                   duration: 4,
//                   repeat: Infinity,
//                   repeatType: "mirror",
//                   ease: "easeInOut",
//                 }}
//                 className="mb-4"
//               >
//                 {feature.icon}
//               </motion.div>

//               <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-300 text-sm mb-2">
//                 {feature.description}
//               </p>
//               <p className="text-gray-500 text-xs italic">{feature.context}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }












"use client";

import { motion } from "framer-motion";
import {
  FaLock,
  FaMagic,
  FaBell,
  FaMicrophone,
  FaWifi,
  FaShieldAlt,
  FaArrowUp,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { PiVaultBold } from "react-icons/pi";

const painToRelief = [
  {
    painTitle: "Your life is spread across files you can’t feel",
    pain:
      "Receipts in screenshots. IDs in WhatsApp. Contracts in email. A PDF you downloaded once and never found again. You *know* it exists — but it’s not *present*. And when you need it, your mind goes blank.",
    reliefTitle: "NeuVault brings your documents back into your hands",
    relief:
      "Everything lives on your device by default — organized, searchable, and understandable at a glance. Not another cloud folder. A private vault that feels like control.",
    icon: <PiVaultBold className="text-pink-400" size={26} />,
    accent: "from-pink-500/20 via-sky-500/10 to-transparent",
  },
  {
    painTitle: "You don’t lose documents — you lose time and peace",
    pain:
      "The panic isn’t the missing file. It’s the moment you realize you’re late, stuck, or exposed because you couldn’t find one thing fast enough.",
    reliefTitle: "NeuVault turns “searching” into “knowing”",
    relief:
      "Instant summaries, auto-tagging, and smart grouping means you don’t open ten files to understand one. You see what matters in seconds — and move on.",
    icon: <BsStars className="text-yellow-400" size={24} />,
    accent: "from-yellow-500/15 via-white/5 to-transparent",
  },
  {
    painTitle: "Deadlines don’t announce themselves until it’s painful",
    pain:
      "Renewals. Expirations. Appointments. Follow-ups. They don’t hurt when they’re far away — they hurt when they’re due and you’re unprepared.",
    reliefTitle: "NeuVault resurfaces what matters before it hurts",
    relief:
      "Dates get detected. Reminders can live on the document itself. And when the moment comes, NeuVault brings it back — quietly, on time.",
    icon: <FaBell className="text-sky-300" size={24} />,
    accent: "from-sky-500/15 via-white/5 to-transparent",
  },
  {
    painTitle: "You can’t always type what you’re carrying",
    pain:
      "Meetings. Lectures. Voice notes. Random thoughts at 2am. You record them, then they disappear into a graveyard of audio you’ll never revisit.",
    reliefTitle: "NeuVault turns voice into structured memory",
    relief:
      "Record or upload audio. Get clean, structured notes you can search, export, and actually use — not just listen to later (never).",
    icon: <FaMicrophone className="text-green-300" size={24} />,
    accent: "from-green-500/15 via-white/5 to-transparent",
  },
  {
    painTitle: "The cloud feels convenient… until it feels unsafe",
    pain:
      "You don’t know where your files are. Who can access them. What gets stored. What gets scanned. Convenience starts to feel like surrender.",
    reliefTitle: "NeuVault is local-first — trust, by design",
    relief:
      "Your documents stay on your device by default. Processing is on-demand. You keep control — not as a setting, but as the foundation.",
    icon: <FaShieldAlt className="text-[#6DD1FF]" size={24} />,
    accent: "from-[#6DD1FF]/20 via-white/5 to-transparent",
  },
];

const quietProof = [
  {
    title: "Offline doesn’t stop your life",
    desc: "Capture scans, uploads, notes, and voice even with no internet. NeuVault keeps everything safe locally and processes when you’re back online.",
    icon: <FaWifi className="text-green-300" size={20} />,
  },
  {
    title: "Ask in plain language, get real answers",
    desc: "Talk to Nova about your vault like you’d talk to a person — find documents, pull details, summarize, explain, and even browse the web when needed.",
    icon: <FaMagic className="text-purple-400" size={20} />,
  },
  {
    title: "Backups without betrayal",
    desc: "Export an encrypted backup to your preferred cloud storage and restore on another device — without handing us your vault.",
    icon: <FaArrowUp className="text-sky-300" size={20} />,
  },
  {
    title: "Security that doesn’t require trust",
    desc: "Local-first storage, secure transmission, and transparency in what’s processing — so you’re never guessing what’s happening.",
    icon: <FaLock className="text-white/70" size={20} />,
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
                Not more “features.” Just the small protections that make you
                feel safe: offline capture, plain-language answers, encrypted
                portability, and security you don’t have to overthink.
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