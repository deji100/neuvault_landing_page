"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Logo from "@/public/logo.png";

const navItems = [
  { label: "Features", id: "features" },
  { label: "Videos", id: "youtube-videos" },
  { label: "How it works", id: "how-it-works" },
  { label: "Stories", id: "testimonials" },
];

const scrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;

  const navOffset = 88;
  const top = element.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({ top, behavior: "smooth" });
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navigateToSection = (id: string) => {
    setMobileOpen(false);

    if (pathname === "/") {
      scrollToId(id);
      return;
    }

    router.push(`/#${id}`);
  };

  const openDownloads = () => {
    setMobileOpen(false);
    window.dispatchEvent(new Event("neuvault:open-downloads"));
  };

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-[1000] border-b border-slate-200/80 bg-white/90 shadow-[0_12px_40px_-32px_rgba(15,23,42,0.45)] backdrop-blur-xl"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mx-auto grid h-[74px] max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Link
          href="/"
          className="flex w-fit items-center gap-2"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src={Logo}
            alt="NeuVault logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-xl"
            priority
          />
          <span className="text-lg font-black tracking-normal text-slate-950">NeuVault</span>
        </Link>

        <div className="hidden items-center justify-center gap-1 rounded-full border border-slate-200 bg-slate-50/85 p-1 shadow-sm md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigateToSection(item.id)}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-950 hover:shadow-sm"
            >
              {item.label}
            </button>
          ))}

          <Link
            href="/privacy-policy"
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-950 hover:shadow-sm"
          >
            Privacy
          </Link>
        </div>

        <div className="hidden justify-self-end md:block">
          <button
            type="button"
            onClick={openDownloads}
            className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_32px_-20px_rgba(37,99,235,0.75)] hover:bg-blue-700"
          >
            Download
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-5 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateToSection(item.id)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700"
              >
                {item.label}
              </button>
            ))}

            <Link
              href="/privacy-policy"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
            >
              Privacy
            </Link>

            <button
              type="button"
              onClick={openDownloads}
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
            >
              Download
            </button>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
