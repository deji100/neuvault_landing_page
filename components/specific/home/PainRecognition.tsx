"use client";

import { motion } from "framer-motion";
import { BellRing, FileQuestion, FolderSearch, ShieldAlert } from "lucide-react";

const pains = [
  {
    title: "You know you saved it, but not where.",
    description:
      "The file is somewhere in Downloads, WhatsApp, Photos, Drive, Notes, or an old device. The problem is not storage. It is retrieval.",
    icon: <FolderSearch size={22} />,
  },
  {
    title: "The document has the answer, but you do not remember the detail.",
    description:
      "Contracts, statements, receipts, IDs, letters, and PDFs hold useful context. NeuVault turns them into searchable memory instead of silent files.",
    icon: <FileQuestion size={22} />,
  },
  {
    title: "Deadlines hide inside files until they become urgent.",
    description:
      "Renewals, appointments, expiry dates, payments, and follow-ups are easy to miss when they stay buried in a scan or PDF.",
    icon: <BellRing size={22} />,
  },
  {
    title: "Private documents should not become random AI uploads.",
    description:
      "NeuVault is built for people who want AI help with sensitive documents while keeping their vault local-first and backed up under their control.",
    icon: <ShieldAlert size={22} />,
  },
];

export default function PainRecognition() {
  return (
    <section className="bg-[#f7fbff] px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            The hidden document tax
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            Your files are not missing. They are buried.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            Most people do not think they need a document vault until a school
            form, receipt, statement, ID, renewal, or agreement suddenly matters.
            NeuVault makes that future moment less stressful.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5">
          {pains.map((pain, index) => (
            <motion.article
              key={pain.title}
              className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                {pain.icon}
              </div>
              <h3 className="text-xl font-semibold leading-snug text-slate-950">
                {pain.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {pain.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
