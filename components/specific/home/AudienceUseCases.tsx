"use client";

import { motion } from "framer-motion";

const audiences = [
  {
    label: "Students",
    detail: "Handouts, PDFs, lecture notes, transcripts, forms, and scans.",
  },
  {
    label: "Professionals",
    detail: "Contracts, receipts, meeting notes, IDs, renewals, and work records.",
  },
  {
    label: "HR and admin teams",
    detail: "Onboarding documents, employee IDs, policy files, and follow-ups.",
  },
  {
    label: "Freelancers",
    detail: "Invoices, client files, agreements, receipts, and project notes.",
  },
  {
    label: "Teachers",
    detail: "Lesson notes, scanned materials, student records, and reference files.",
  },
  {
    label: "Travelers and immigrants",
    detail: "Passports, visas, appointments, permits, applications, and renewals.",
  },
];

export default function AudienceUseCases() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Who it is for
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            Built for people who cannot afford to lose context.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            NeuVault is useful when documents are tied to real-life outcomes:
            school, work, travel, family admin, client work, health, finance, or
            compliance.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {audiences.map((audience, index) => (
            <motion.article
              key={audience.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-950">
                {audience.label}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {audience.detail}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
