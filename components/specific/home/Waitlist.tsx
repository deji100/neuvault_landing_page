"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== "") {
      console.log("Email submitted:", email);
      setSubmitted(true);
    }
  };

  return (
    <section className="relative bg-[#0B0F19] px-6 py-24 text-white overflow-hidden">
      {/* Soft animated background glow */}
      <motion.div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#3F8CFF]/10 blur-[140px] -z-10"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 text-[#6DD1FF]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Get Early Access to NeuVault
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-300 mb-6 text-base md:text-lg"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        >
          Be among the first to try NeuVault — your private, AI-powered second
          brain.
        </motion.p>

        {/* Form */}
        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
          >
            <motion.input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@email.com"
              className="px-4 py-3 rounded-lg w-full sm:w-auto flex-1
                bg-white/90 text-black placeholder-gray-500 text-base
                focus:outline-none focus:ring-2 focus:ring-[#3F8CFF]
                transition-all duration-300 ease-in-out"
              whileFocus={{ scale: 1.02 }}
            />

            <motion.button
              type="submit"
              className="px-6 py-3 rounded-lg bg-[#3F8CFF] text-white font-medium hover:bg-[#60aaff] transition-all duration-300 ease-in-out shadow-lg shadow-[#3F8CFF]/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Waitlist
            </motion.button>
          </motion.form>
        ) : (
          <motion.p
            className="text-green-400 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ✅ {"You're on the list! We’ll keep you updated."}
          </motion.p>
        )}

        {/* Small reassurance note */}
        <motion.p
          className="text-xs text-gray-500 mt-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          No spam — ever. Unsubscribe anytime.
        </motion.p>
      </div>
    </section>
  );
}
