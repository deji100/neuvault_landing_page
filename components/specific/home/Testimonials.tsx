"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    name: "Chris T.",
    role: "Working professional",
    pain: "Forgotten dates",
    text: "Setting reminders on actual documents is the part that stands out. It makes paperwork feel less reactive.",
  },
  {
    name: "Michael T.",
    role: "Private recovery",
    pain: "Backup and restore",
    text: "The encrypted backup and restore flow matters because changing devices is usually where trust falls apart.",
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const active = feedback[activeIndex];

  const goTo = (index: number) => {
    setActiveIndex((index + feedback.length) % feedback.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % feedback.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section id="testimonials" className="bg-[#040810] px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl">
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
            Less searching, fewer missed dates, clearer context, and more
            confidence when important records are needed again.
          </p>
        </motion.div>

        <div
          className="relative mx-auto mt-8 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0a101a] p-5 shadow-[0_24px_80px_-56px_rgba(255,255,255,0.25)] sm:mt-12 sm:p-8 md:rounded-[2rem]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />

          <AnimatePresence mode="wait">
            <motion.article
              key={active.name}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28 }}
              className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center"
            >
              <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500 text-sm font-bold tracking-wider text-white">
                    {getInitials(active.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{active.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{active.role}</p>
                  </div>
                </div>
                <div className="mt-5 inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
                  {active.pain}
                </div>
              </div>

              <blockquote className="text-xl font-semibold leading-9 text-white md:text-2xl md:leading-10">
                &ldquo;{active.text}&rdquo;
              </blockquote>
            </motion.article>
          </AnimatePresence>

          <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              {feedback.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeIndex === index
                      ? "w-8 bg-blue-400"
                      : "w-2.5 bg-white/25 hover:bg-white/45"
                  }`}
                  aria-label={`Show testimonial from ${item.name}`}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
