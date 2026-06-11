"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { FileText, StickyNote, Mic, ScanText, Keyboard } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function NeuVaultBanner() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_52%,#eef6ff_100%)] py-20 text-slate-950 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 section-grid opacity-70" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-white/80" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="relative mt-10 flex items-center justify-center sm:mt-14">
          <div className="pointer-events-none absolute h-[360px] w-[360px] rounded-full border border-blue-100 bg-blue-50/70 sm:h-[420px] sm:w-[420px]" />

          <FloatingIcon className="-left-2 top-6 sm:left-10" icon={<FileText className="h-5 w-5" />} />
          <FloatingIcon className="-right-2 top-6 sm:right-10" icon={<StickyNote className="h-5 w-5" />} />
          <FloatingIcon className="-left-2 bottom-10 sm:left-10" icon={<Mic className="h-5 w-5" />} />
          <FloatingIcon className="-right-2 bottom-10 sm:right-10" icon={<ScanText className="h-5 w-5" />} />
          <FloatingIcon
            className="left-1/2 -top-10 -translate-x-1/2"
            icon={<Keyboard className="h-5 w-5" />}
          />

          <div className="relative z-10 aspect-square w-[200px] sm:w-[260px] lg:w-[300px]">
            <Image src="/logo.png" alt="NeuVault logo" fill priority className="object-contain" />
          </div>
        </div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-4xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl"
        >
          Everything important.
          <br />
          <span className="text-slate-600">Understood. Organized. Yours.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg"
        >
          Documents, notes, voice, and scans, structured and easy to find, with privacy by design and control in your hands.
        </motion.p>
      </div>
    </section>
  );
}

function FloatingIcon({
  className,
  icon,
}: {
  className: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={[
        "absolute rounded-2xl border border-slate-200 bg-white p-3 text-blue-600",
        "shadow-[0_18px_50px_-32px_rgba(37,99,235,0.6)]",
        "animate-[float_6s_ease-in-out_infinite]",
        className,
      ].join(" ")}
    >
      {icon}
    </div>
  );
}
