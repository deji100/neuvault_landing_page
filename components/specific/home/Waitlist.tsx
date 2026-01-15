"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";

type Status = "idle" | "sending" | "success" | "error";

export default function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isEmailValid = useMemo(() => {
    // Simple, reliable email check (not perfect, but good UX)
    const v = email.trim().toLowerCase();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }, [email]);

  const isBusy = status === "sending";
  const submitted = status === "success";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !isEmailValid) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setErrorMessage(
        "Email service is not configured yet. Please try again later."
      );
      return;
    }

    setStatus("sending");

    try {
      // Send to YOU (admin notify). Template should use variables like:
      // {{subscriber_email}} and {{source}}
      await emailjs.send(
        serviceId,
        templateId,
        {
          subscriber_email: trimmedEmail,
          source: "NeuVault Waitlist",
        },
        { publicKey }
      );

      setStatus("success");
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="waitlist" className="relative bg-[#0B0F19] px-6 py-24 text-white overflow-hidden">
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
          viewport={{ once: true }}
        >
          Get Early Access to NeuVault
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-300 mb-6 text-base md:text-lg"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Be among the first to try NeuVault — your private AI vault that reads
          your documents, organizes them automatically, and reminds you before
          they matter.
        </motion.p>

        {/* Form */}
        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") {
                  setStatus("idle");
                  setErrorMessage("");
                }
              }}
              required
              placeholder="you@email.com"
              className="px-4 py-3 rounded-lg w-full sm:w-auto flex-1
                bg-white/90 text-black placeholder-gray-500 text-base
                focus:outline-none focus:ring-2 focus:ring-[#3F8CFF]
                transition-all duration-300 ease-in-out"
              whileFocus={{ scale: 1.02 }}
              aria-label="Email address"
              disabled={isBusy}
            />

            <motion.button
              type="submit"
              disabled={isBusy}
              className={`px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 ease-in-out shadow-lg
                ${
                  isBusy
                    ? "bg-[#3F8CFF]/60 cursor-not-allowed shadow-[#3F8CFF]/10"
                    : "bg-[#3F8CFF] hover:bg-[#60aaff] shadow-[#3F8CFF]/30"
                }`}
              whileHover={isBusy ? undefined : { scale: 1.05 }}
              whileTap={isBusy ? undefined : { scale: 0.95 }}
            >
              {isBusy ? "Joining..." : "Join Waitlist"}
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

        {/* Error */}
        {status === "error" && !!errorMessage && (
          <motion.p
            className="mt-3 text-sm text-red-300"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            role="alert"
          >
            {errorMessage}
          </motion.p>
        )}

        {/* Small reassurance note */}
        <motion.p
          className="text-xs text-gray-500 mt-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          No spam — ever. Unsubscribe anytime.
        </motion.p>
      </div>
    </section>
  );
}
