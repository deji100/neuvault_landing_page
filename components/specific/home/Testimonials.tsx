"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Briefcase,
  FileSearch,
  GraduationCap,
  HeartPulse,
  Quote,
  ShieldCheck,
  Wifi,
} from "lucide-react";

const feedback = [
  {
    name: "Ayo K.",
    role: "Small business owner",
    pain: "Receipts and invoices",
    text: "Invoices and receipts used to be chaos. Now I know where things are, and I can find them fast without throwing everything into a generic cloud folder.",
    icon: <Briefcase size={17} />,
  },
  {
    name: "Sarah J.",
    role: "Graduate student",
    pain: "School PDFs and scans",
    text: "I scan handouts and upload PDFs, and NeuVault groups them in a way that actually makes sense later.",
    icon: <GraduationCap size={17} />,
  },
  {
    name: "Michael T.",
    role: "Healthcare worker",
    pain: "Private recovery",
    text: "The encrypted backup and restore flow matters because changing phones is usually where trust falls apart.",
    icon: <HeartPulse size={17} />,
  },
  {
    name: "Chris T.",
    role: "Working professional",
    pain: "Forgotten dates",
    text: "Setting reminders on actual documents is the part that stands out. It makes paperwork feel less reactive.",
    icon: <Bell size={17} />,
  },
  {
    name: "Nneka A.",
    role: "Busy parent",
    pain: "Offline capture",
    text: "I added documents while offline and NeuVault processed them later without me managing the whole thing.",
    icon: <Wifi size={17} />,
  },
  {
    name: "Daniel O.",
    role: "Freelancer",
    pain: "Saved files with no context",
    text: "The summaries are clear and practical. It feels less like storing files and more like using what I saved.",
    icon: <FileSearch size={17} />,
  },
];

const proofPoints = [
  {
    title: "Less panic searching",
    description:
      "NeuVault is built for the moment when you know you saved something, but cannot remember where.",
    icon: <FileSearch size={20} />,
  },
  {
    title: "More document memory",
    description:
      "Summaries, tags, dates, notes, and linked records preserve the meaning around a file.",
    icon: <Quote size={20} />,
  },
  {
    title: "Private recovery",
    description:
      "Encrypted backups stay under your control so moving devices does not mean losing your vault.",
    icon: <ShieldCheck size={20} />,
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
    <section id="testimonials" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Early signals
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            People want relief when documents matter.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            The strongest product story is less searching, less forgetting,
            clearer context, and more confidence when important records are
            needed again.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {proofPoints.map((point, index) => (
            <motion.div
              key={point.title}
              className="rounded-[1.45rem] border border-slate-200 bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                {point.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-950">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {feedback.map((item, index) => (
            <motion.article
              key={item.name}
              className="rounded-[1.45rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_70px_-52px_rgba(37,99,235,0.5)]"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {item.icon}
                  {item.pain}
                </div>
                <Quote className="mt-1 text-slate-300" size={22} />
              </div>

              <p className="text-base leading-8 text-slate-700">
                &ldquo;{item.text}&rdquo;
              </p>

              <div className="mt-8 flex items-center gap-3 border-t border-slate-200 pt-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                  {getInitials(item.name)}
                </div>
                <div>
                  <p className="font-semibold text-slate-950">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
