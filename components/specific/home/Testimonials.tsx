"use client";

import { motion } from "framer-motion";

const feedback = [
  {
    name: "Ayo K.",
    role: "Small business owner",
    pain: "Receipts and invoices",
    text: "Invoices and receipts used to be chaos. Now I know where things are, and I can find them fast without throwing everything into a generic cloud folder.",
  },
  {
    name: "Sarah J.",
    role: "Graduate student",
    pain: "School PDFs and scans",
    text: "I scan handouts and upload PDFs, and NeuVault groups them in a way that actually makes sense later.",
  },
  {
    name: "Michael T.",
    role: "Healthcare worker",
    pain: "Private recovery",
    text: "The encrypted backup and restore flow matters because changing phones is usually where trust falls apart.",
  },
  {
    name: "Chris T.",
    role: "Working professional",
    pain: "Forgotten dates",
    text: "Setting reminders on actual documents is the part that stands out. It makes paperwork feel less reactive.",
  },
  {
    name: "Nneka A.",
    role: "Busy parent",
    pain: "Offline capture",
    text: "I added documents while offline and NeuVault processed them later without me managing the whole thing.",
  },
  {
    name: "Daniel O.",
    role: "Freelancer",
    pain: "Context",
    text: "The summaries are clear and practical. It feels less like storing files and more like using what I saved.",
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const IconQuote = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="opacity-20">
    <path d="M8 15c0 2.5-2 4.5-4.5 4.5S0 17.5 0 15c0-2.48 2-4.5 4.5-4.5h.5c-.27-2.61-1.42-4.83-3-6.5l1.5-1.5c2.3 2.12 4 4.88 4.5 8v4.5zm12 0c0 2.5-2 4.5-4.5 4.5S11 17.5 11 15c0-2.48 2-4.5 4.5-4.5h.5c-.27-2.61-1.42-4.83-3-6.5l1.5-1.5c2.3 2.12 4 4.88 4.5 8v4.5z" fill="currentColor" stroke="none"/>
  </svg>
);

export default function TestimonialsCarousel() {
  return (
    <section id="testimonials" className="px-6 py-24 bg-[#040810]">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
            Early signals
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
            People want relief when documents matter.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
            The strongest product story is less searching, less forgetting,
            clearer context, and more confidence when important records are
            needed again.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {feedback.map((item, index) => (
            <motion.article
              key={item.name}
              className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-[#0a101a] p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-[#111a28]"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div>
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300">
                    {item.pain}
                  </div>
                  <IconQuote />
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold tracking-wider text-white">
                  {getInitials(item.name)}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{item.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
