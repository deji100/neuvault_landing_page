"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "@/public/logo1.png"

export default function Navbar() {
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
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={Logo} // replace with your logo file in /public
              alt="NeuVault Logo"
              width={1000}
              height={1000}
              className="h-40 w-40"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white transition"
            >
              Testimonials
            </a>
            <a
              href="#waitlist"
              className="text-white bg-[#3F8CFF] px-4 py-2 rounded-lg hover:bg-[#60aaff] transition"
            >
              Join Beta
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
