"use client";

import { motion } from "framer-motion";
import {
  Archive,
  ArrowRight,
  Brain,
  CheckCircle2,
  CloudUpload,
  ScanLine,
  Search,
} from "lucide-react";

const steps = [
  {
    title: "Capture",
    description:
      "Scan paper, upload documents, save notes, record voice context, or add screenshots.",
    icon: <ScanLine size={22} />,
  },
  {
    title: "Understand",
    description:
      "NeuVault creates summaries, tags, document types, extracted details, and dates.",
    icon: <Brain size={22} />,
  },
  {
    title: "Connect",
    description:
      "Group related records around a trip, application, client job, school file, or personal issue.",
    icon: <Archive size={22} />,
  },
  {
    title: "Find",
    description:
      "Search by what you remember, not only by the exact file name.",
    icon: <Search size={22} />,
  },
  {
    title: "Recover",
    description:
      "Create encrypted backups you control and restore your vault across devices.",
    icon: <CloudUpload size={22} />,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            How NeuVault works
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            A simple loop for documents you cannot afford to lose.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            The product is built around one repeatable workflow: capture the
            record, preserve the meaning, find it when needed, and recover the
            vault when devices change.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative rounded-[1.4rem] border border-slate-200 bg-slate-50 p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
                {step.icon}
              </div>
              <p className="text-sm font-semibold text-blue-700">
                Step {index + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {step.description}
              </p>

              {index < steps.length - 1 ? (
                <div className="absolute -right-3 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-700 md:flex">
                  <ArrowRight size={15} />
                </div>
              ) : null}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 grid gap-6 rounded-[1.75rem] border border-blue-100 bg-blue-50 p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
              Nova example
            </p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-slate-950 md:text-3xl">
              Ask from memory when a filename is not enough.
            </h3>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Nova can work across saved summaries, tags, dates, and linked
              records so the vault answers practical questions, not just keyword
              searches.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex justify-end">
              <div className="max-w-[82%] rounded-2xl bg-blue-600 px-4 py-3 text-sm text-white">
                What documents do I have for my renewal, and what needs attention?
              </div>
            </div>
            <div className="max-w-[88%] rounded-2xl bg-slate-100 px-4 py-3 text-sm leading-6 text-slate-700">
              I found your passport scan, renewal receipt, photo checklist, and
              appointment note. The passport expiry and appointment date should
              be reviewed this week.
            </div>
            <div className="mt-5 flex items-center gap-2 border-t border-slate-200 pt-4 text-sm text-slate-500">
              <CheckCircle2 size={16} className="text-teal-600" />
              Context, dates, and related records stay connected.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
