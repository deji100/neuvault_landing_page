"use client";

import { motion } from "framer-motion";
import { FolderOpen, RefreshCw, Search, ShieldCheck } from "lucide-react";

const points = [
  {
    title: "Choose important folders",
    body: "Point NeuVault at the locations where records already arrive, such as downloads, scans, work files, or admin folders.",
    icon: <FolderOpen size={20} />,
  },
  {
    title: "Capture new files faster",
    body: "New files can move into the vault workflow without forcing you to remember a manual upload every time.",
    icon: <RefreshCw size={20} />,
  },
  {
    title: "Keep context searchable",
    body: "Summaries, tags, groups, dates, and related records make new documents easier to find later.",
    icon: <Search size={20} />,
  },
  {
    title: "Stay local-first",
    body: "Folder watching supports the same privacy model: local vault storage, controlled processing, and encrypted backup options.",
    icon: <ShieldCheck size={20} />,
  },
];

export default function AutomaticIntake() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 rounded-[1.75rem] border border-blue-100 bg-blue-50 p-6 md:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Automatic intake
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
              Choose folders once. NeuVault watches for new files.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-700 md:text-lg">
              Stop treating every document like a separate chore. On desktop,
              NeuVault can help watch the folders you already use, then bring
              new files into the same document memory system as scans, notes,
              screenshots, and voice context.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {points.map((point, index) => (
              <motion.article
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-[1.35rem] border border-blue-100 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  {point.icon}
                </div>
                <h3 className="text-lg font-semibold leading-snug text-slate-950">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {point.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
