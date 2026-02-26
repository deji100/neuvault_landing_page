"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { FileText, StickyNote, Mic, ScanText, Keyboard, UploadCloud } from "lucide-react";

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
    <section className="relative overflow-hidden bg-[#070B14] py-20 sm:py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_20%_30%,rgba(59,130,246,0.28),transparent_60%),radial-gradient(800px_500px_at_80%_60%,rgba(109,209,255,0.18),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070B14]/40 to-[#070B14]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Logo + floating icons */}
        <div className="relative mt-10 flex items-center justify-center sm:mt-14">
          {/* Soft glow */}
          <div className="pointer-events-none absolute h-[380px] w-[380px] rounded-full bg-[#3B82F6]/20 blur-3xl sm:h-[420px] sm:w-[420px]" />

          {/* Floating Icons */}
          <FloatingIcon className="-left-2 top-6 sm:left-10" icon={<FileText className="h-5 w-5" />} />
          <FloatingIcon className="-right-2 top-6 sm:right-10" icon={<StickyNote className="h-5 w-5" />} />
          <FloatingIcon className="-left-2 bottom-10 sm:left-10" icon={<Mic className="h-5 w-5" />} />
          <FloatingIcon className="-right-2 bottom-10 sm:right-10" icon={<ScanText className="h-5 w-5" />} />
          <FloatingIcon
            className="left-1/2 -translate-x-1/2 -top-10"
            icon={<Keyboard className="h-5 w-5" />}
          />
          {/* <FloatingIcon
            className="left-1/2 -translate-x-1/2 -bottom-12"
            icon={<UploadCloud className="h-5 w-5" />}
          /> */}

          {/* NeuVault Logo */}
          <div className="relative z-10 aspect-square w-[200px] sm:w-[260px] lg:w-[300px]">
            <Image src="/logo.png" alt="NeuVault logo" fill priority className="object-contain" />
          </div>
        </div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-6xl"
        >
          Everything important.
          <br />
          <span className="text-white/80">Understood. Organized. Yours.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg"
        >
          Documents, notes, voice, and scans — structured and easy to find, with privacy by design and control in your hands.
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
        "absolute rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-[#6DD1FF]",
        "backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.4)]",
        "animate-[float_6s_ease-in-out_infinite]",
        className,
      ].join(" ")}
    >
      {icon}
    </div>
  );
}