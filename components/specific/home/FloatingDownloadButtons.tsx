"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGooglePlay, FaApple, FaDownload } from "react-icons/fa";

export default function FloatingDownloadButtons() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed left-4 bottom-16 z-50">
      {/* Desktop: always visible */}
      <div className="hidden md:flex flex-col gap-3">
        <motion.a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3F8CFF] text-white font-medium shadow-lg hover:bg-[#60aaff] transition"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          <FaGooglePlay /> Android
        </motion.a>
        <motion.a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-medium shadow-lg hover:bg-gray-200 transition"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
        >
          <FaApple /> iOS
        </motion.a>
      </div>

      {/* Mobile: expandable floating button */}
      <div className="md:hidden flex flex-col items-start gap-3">
        <AnimatePresence>
          {open && (
            <>
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#3F8CFF] text-white font-medium shadow-lg hover:bg-[#60aaff] transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <FaGooglePlay /> Android
              </motion.a>
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-black font-medium shadow-lg hover:bg-gray-200 transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <FaApple /> iOS
              </motion.a>
            </>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setOpen(!open)}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-[#3F8CFF] text-white shadow-lg hover:bg-[#60aaff] transition"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaDownload />
        </motion.button>
      </div>
    </div>
  );
}
