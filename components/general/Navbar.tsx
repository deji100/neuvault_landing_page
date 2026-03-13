"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Logo from "@/public/logo1.png";

const navItems = [
  { label: "Why NeuVault", id: "features" },
  { label: "How It Works", id: "how-it-works" },
  { label: "Demos", id: "see-it-in-action" },
  { label: "Testimonials", id: "testimonials" },
];

const scrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;

  const navOffset = 92;
  const top = element.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({ top, behavior: "smooth" });
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-[1000] border-b border-white/10 bg-[#07101c]/78 backdrop-blur-xl"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={Logo}
            alt="NeuVault logo"
            width={220}
            height={60}
            className="h-46 w-auto md:h-50"
            priority
          />
          {/* <p className="hidden text-base font-semibold text-white md:block">NeuVault</p> */}
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToId(item.id)}
              className="text-sm text-white/72 hover:text-white"
            >
              {item.label}
            </button>
          ))}

          <Link href="/privacy-policy" className="text-sm text-white/72 hover:text-white">
            Privacy
          </Link>

          <button
            type="button"
            onClick={() => scrollToId("see-it-in-action")}
            className="rounded-full border border-white/14 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            Watch demo
          </button>

          <button
            type="button"
            onClick={() => scrollToId("waitlist")}
            className="rounded-full bg-[#3F8CFF] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(63,140,255,0.7)] hover:bg-[#60aaff]"
          >
            Join beta
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <span className="space-y-1.5">
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#07101c]/96 px-4 py-5 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  scrollToId(item.id);
                  closeMobile();
                }}
                className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-left text-sm text-white/80"
              >
                {item.label}
              </button>
            ))}

            <Link
              href="/privacy-policy"
              onClick={closeMobile}
              className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-white/80"
            >
              Privacy
            </Link>

            <button
              type="button"
              onClick={() => {
                scrollToId("waitlist");
                closeMobile();
              }}
              className="rounded-2xl bg-[#3F8CFF] px-4 py-3 text-left text-sm font-semibold text-white"
            >
              Join beta
            </button>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
