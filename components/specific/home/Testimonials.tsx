"use client";

import { motion } from "framer-motion";
import {
  FaBell,
  FaBriefcase,
  FaCloudUploadAlt,
  FaFileInvoiceDollar,
  FaGraduationCap,
  FaHeartbeat,
  FaQuoteLeft,
  FaSearch,
  FaShieldAlt,
  FaWifi,
} from "react-icons/fa";

const feedback = [
  {
    name: "Ayo K.",
    role: "Small business owner",
    pain: "Receipts and invoices",
    text: "Invoices and receipts used to be chaos. Now I know where things are, and I can find them fast without throwing everything into a generic cloud folder.",
    icon: <FaFileInvoiceDollar className="text-[#6DD1FF]" size={18} />,
  },
  {
    name: "Sarah J.",
    role: "Graduate student",
    pain: "School PDFs and scans",
    text: "I scan handouts and upload PDFs, and NeuVault groups them in a way that actually makes sense later. It feels like I finally stopped losing track of my study materials.",
    icon: <FaGraduationCap className="text-yellow-300" size={18} />,
  },
  {
    name: "Daniel O.",
    role: "Freelancer",
    pain: "Saved files with no context",
    text: "The summaries are clear and practical. It feels less like storing files and more like finally being able to use what I saved.",
    icon: <FaBriefcase className="text-emerald-300" size={18} />,
  },
  {
    name: "Michael T.",
    role: "Healthcare worker",
    pain: "Private recovery",
    text: "I keep personal medical documents in NeuVault. The encrypted backup and restore flow matters because changing phones is usually where trust falls apart.",
    icon: <FaHeartbeat className="text-pink-300" size={18} />,
  },
  {
    name: "Chris T.",
    role: "Working professional",
    pain: "Forgotten dates",
    text: "Setting reminders on actual documents is the part that stands out. It is the first app that makes my paperwork feel less reactive and less easy to forget.",
    icon: <FaBell className="text-sky-300" size={18} />,
  },
  {
    name: "Nneka A.",
    role: "Busy parent",
    pain: "Offline capture",
    text: "I added documents while offline and NeuVault processed them later without me babysitting the whole thing. That flow feels built for real life.",
    icon: <FaWifi className="text-[#6ce6b3]" size={18} />,
  },
];

const proofPoints = [
  {
    title: "Less panic searching",
    description:
      "NeuVault is built for the moment when you know you saved something, but cannot remember where.",
    icon: <FaSearch className="text-[#6DD1FF]" size={20} />,
  },
  {
    title: "More document memory",
    description:
      "Summaries, tags, dates, notes, and linked records help preserve the meaning around a file.",
    icon: <FaQuoteLeft className="text-yellow-300" size={20} />,
  },
  {
    title: "Private recovery",
    description:
      "Encrypted backups stay under your control so moving devices does not mean losing your vault.",
    icon: <FaShieldAlt className="text-emerald-300" size={20} />,
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function TestimonialsCarousel() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-t border-white/10 px-6 py-24 text-white"
    >
      <motion.div
        className="absolute -top-32 left-1/2 h-[780px] w-[780px] -translate-x-1/2 rounded-full bg-[#3F8CFF]/10 blur-[140px]"
        animate={{ scale: [1, 1.05, 1], opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
            Early signals
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
            People do not want another folder.
            <span className="block text-white/68">
              They want relief when documents matter.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
            The strongest feedback is not about novelty. It is about less
            searching, less forgetting, clearer context, and more confidence
            when important records are needed again.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {proofPoints.map((point, index) => (
            <motion.div
              key={point.title}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/6 p-3">
                {point.icon}
              </div>

              <h3 className="text-lg font-semibold text-white">
                {point.title}
              </h3>

              <p className="mt-2 text-sm leading-7 text-white/62">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {feedback.map((item, index) => (
            <motion.article
              key={item.name}
              className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#6DD1FF]/30 hover:bg-white/8 hover:shadow-[0_24px_60px_-35px_rgba(63,140,255,0.7)]"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(63,140,255,0.14),transparent_34%)] opacity-0 transition group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#6DD1FF]/15 bg-[#6DD1FF]/8 px-3 py-1 text-xs font-semibold text-[#9dd9ff]">
                    {item.icon}
                    {item.pain}
                  </div>

                  <FaQuoteLeft className="mt-1 text-white/18" size={22} />
                </div>

                <p className="text-base leading-8 text-white/84">
                  &ldquo;{item.text}&rdquo;
                </p>

                <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/8 text-sm font-semibold text-white">
                    {getInitials(item.name)}
                  </div>

                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-white/52">{item.role}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-14 overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(11,19,34,0.92),rgba(9,15,27,0.78))] p-6 sm:p-8"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
                Built for real life
              </p>

              <h3 className="mt-4 text-2xl font-semibold leading-tight text-white md:text-3xl">
                NeuVault is for the records that sit quietly until the day they
                suddenly matter.
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/66 md:text-base">
                Receipts, forms, IDs, certificates, contracts, school records,
                medical files, scanned papers, voice notes, and reminders all
                become easier to keep, understand, find, and recover.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Receipts and invoices",
                "IDs and certificates",
                "School and study records",
                "Contracts and agreements",
                "Medical documents",
                "Voice notes and quick notes",
                "Renewals and follow-ups",
                "Device backup and restore",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white/70"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/54">
              Available now on iPhone, Android, and Windows. macOS coming soon.
            </p>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#6DD1FF]/18 bg-[#6DD1FF]/8 px-4 py-2 text-sm text-[#d7efff]">
              <FaCloudUploadAlt size={15} />
              Encrypted backups stay under your control
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
