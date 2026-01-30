"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Logo from "@/public/logo1.png";

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const yOffset = -80; // height of fixed navbar
  const y =
    el.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/5 border-b border-white/10"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 p-2 -ml-2 sm:p-0 sm:ml-0"
          >
            <Image
              src={Logo}
              alt="NeuVault Logo"
              width={160}
              height={40}
              className="h-50 w-auto"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToId("features")}
              className="text-gray-300 hover:text-white transition"
            >
              Features
            </button>

            <button
              onClick={() => scrollToId("how-it-works")}
              className="text-gray-300 hover:text-white transition"
            >
              How It Works
            </button>

            <button
              onClick={() => scrollToId("see-it-in-action")}
              className="text-gray-300 hover:text-white transition"
            >
              Demo
            </button>

            <button
              onClick={() => scrollToId("testimonials")}
              className="text-gray-300 hover:text-white transition"
            >
              Testimonials
            </button>

            <Link
              href="/contact"
              className="text-gray-300 hover:text-white transition"
            >
              Contact
            </Link>

            <button
              onClick={() => scrollToId("waitlist")}
              className="text-white bg-[#3F8CFF] px-4 py-2 rounded-lg hover:bg-[#60aaff] transition"
            >
              Join Beta
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 text-gray-300 hover:text-white transition"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <span className="block w-6 h-0.5 bg-current mb-1" />
            <span className="block w-6 h-0.5 bg-current mb-1" />
            <span className="block w-6 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0B0F19]/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
            <button
              onClick={() => {
                scrollToId("features");
                closeMobile();
              }}
              className="text-gray-300 hover:text-white transition text-left"
            >
              Features
            </button>
            <button
              onClick={() => {
                scrollToId("how-it-works");
                closeMobile();
              }}
              className="text-gray-300 hover:text-white transition text-left"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                scrollToId("see-it-in-action");
                closeMobile();
              }}
              className="text-gray-300 hover:text-white transition text-left"
            >
              Demo
            </button>
            <button
              onClick={() => {
                scrollToId("testimonials");
                closeMobile();
              }}
              className="text-gray-300 hover:text-white transition text-left"
            >
              Testimonials
            </button>
            <Link
              href="/contact"
              onClick={closeMobile}
              className="text-gray-300 hover:text-white transition"
            >
              Contact
            </Link>
            <button
              onClick={() => {
                scrollToId("waitlist");
                closeMobile();
              }}
              className="text-white bg-[#3F8CFF] px-4 py-2 rounded-lg hover:bg-[#60aaff] transition text-left"
            >
              Join Beta
            </button>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
