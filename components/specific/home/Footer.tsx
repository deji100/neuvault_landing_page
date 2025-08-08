"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import Logo from "@/public/logo2.png"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0B0F19] to-black text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* NeuVault Logo + Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center md:items-start"
        >
          {/* Placeholder Logo */}
          <div className="w-12 h-12 rounded-full bg-[#3F8CFF] flex items-center justify-center text-xl font-bold">
            <Image src={Logo} width={50} height={50} alt="NeuVault Logo" />
          </div>
          <p className="mt-4 text-gray-400 text-sm max-w-xs text-center md:text-left">
            NeuVault — Your private, AI-powered vault for all your files, notes,
            and ideas.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#features" className="hover:text-white transition">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-white transition">
                How It Works
              </a>
            </li>
            <li>
              <a href="#waitlist" className="hover:text-white transition">
                Join Waitlist
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-gray-400 text-lg">
            <a href="#" className="hover:text-[#3F8CFF] transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-[#3F8CFF] transition">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-[#3F8CFF] transition">
              <FaGithub />
            </a>
          </div>
        </motion.div>

        {/* Legal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} NeuVault. All rights reserved.
      </div>
    </footer>
  );
}
