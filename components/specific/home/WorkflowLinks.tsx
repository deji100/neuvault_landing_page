"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { solutionPages } from "@/lib/seo";

const workflowLabels: Record<
  string,
  {
    label: string;
    pain: string;
    action: string;
  }
> = {
  "document-organization": {
    label: "Organize",
    pain: "Documents, screenshots, notes, and scans are saved everywhere.",
    action: "Organize important records",
  },
  "document-reminder": {
    label: "Remember",
    pain: "Renewals, expiry dates, deadlines, and follow-ups get buried.",
    action: "Review important dates",
  },
  "document-retrieval": {
    label: "Find",
    pain: "You know you saved it, but you cannot remember the filename.",
    action: "Find documents faster",
  },
  "secure-document-backup": {
    label: "Recover",
    pain: "Important records are trapped on one phone, laptop, or folder.",
    action: "Back up and restore",
  },
  "notes-export": {
    label: "Notes",
    pain: "Thoughts, answers, and document notes disappear from the record.",
    action: "Keep notes useful",
  },
  "voice-note-transcription": {
    label: "Voice",
    pain: "Audio captures the moment, but becomes hard to search later.",
    action: "Transcribe voice notes",
  },
  "scan-organization": {
    label: "Scan",
    pain: "Paper scans become photos instead of usable records.",
    action: "Scan and organize",
  },
};

const IconArrowRight = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function WorkflowLinks() {
  return (
    <section className="px-6 py-24 bg-[#040810]">
      <div className="mx-auto max-w-6xl">
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
            Feature workflows
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
            Every feature maps to a real document problem.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
            NeuVault is organized around the moments that make document storage
            stressful: finding files, remembering dates, keeping context, and
            restoring records when devices change.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {solutionPages.map((page, index) => {
            const workflow = workflowLabels[page.slug];

            return (
              <motion.div
                key={page.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/${page.slug}`}
                  className="group block h-full rounded-xl border border-white/10 bg-[#0a101a] p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-[#111a28] hover:shadow-[0_24px_70px_-50px_rgba(255,255,255,0.05)]"
                >
                  <div className="mb-5 inline-flex rounded-full border border-white/5 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
                    {workflow?.label ?? page.eyebrow}
                  </div>
                  <h3 className="text-xl font-bold leading-snug text-white">
                    {workflow?.pain ?? page.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">
                    {page.description.replace(/AI/g, "").replace(/Nova, your vault-aware/g, "your vault-aware").replace(/Nova/g, "assistant")}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors group-hover:text-white">
                    {workflow?.action ?? "View workflow"}
                    <IconArrowRight />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
