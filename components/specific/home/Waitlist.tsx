"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";

type Status = "idle" | "sending" | "success" | "error";

const trustNotes = [
  "Private by default",
  "10 product demos available above",
  "No spam. Beta invites only.",
];

export default function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isEmailValid = useMemo(() => {
    const value = email.trim().toLowerCase();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }, [email]);

  const isBusy = status === "sending";
  const submitted = status === "success";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !isEmailValid) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_WAITLIST_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setErrorMessage("Email service is not configured yet. Please try again later.");
      return;
    }

    setStatus("sending");

    try {
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
    } catch (error) {
      console.error("EmailJS send failed:", error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="waitlist" className="relative overflow-hidden border-t border-white/10 px-6 py-24 text-white">
      <motion.div
        className="absolute left-1/2 top-0 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-[#3F8CFF]/10 blur-[140px]"
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.82, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(11,19,35,0.94),rgba(7,13,24,0.86))] p-8 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              viewport={{ once: true }}
            >
              Join the beta
            </motion.p>
            <motion.h2
              className="mt-4 text-3xl font-bold leading-tight md:text-4xl"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.45 }}
              viewport={{ once: true }}
            >
              Get early access to the private document vault people actually need.
            </motion.h2>
            <motion.p
              className="mt-5 text-base leading-8 text-white/68 md:text-lg"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.45 }}
              viewport={{ once: true }}
            >
              If NeuVault solves a real problem for you, join the list. The product is already demo-ready, and beta access opens in controlled waves so the experience stays tight.
            </motion.p>

            <div className="mt-6 flex flex-wrap gap-3">
              {trustNotes.map((note) => (
                <span key={note} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/76">
                  {note}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/64">
              <Link href="#see-it-in-action" className="text-[#a8d8ff] hover:text-white">
                Rewatch the demos
              </Link>
              <Link href="/privacy-policy" className="text-[#a8d8ff] hover:text-white">
                Review privacy details
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-[1.7rem] p-6 sm:p-7">
            {!submitted ? (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.45 }}
                viewport={{ once: true }}
              >
                <div>
                  <label htmlFor="waitlist-email" className="mb-2 block text-sm font-medium text-white/74">
                    Work or personal email
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status === "error") {
                        setStatus("idle");
                        setErrorMessage("");
                      }
                    }}
                    required
                    placeholder="support@neuvault.app"
                    className="w-full rounded-2xl border border-white/12 bg-white/92 px-4 py-3 text-base text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3F8CFF]"
                    aria-label="Email address"
                    disabled={isBusy}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isBusy}
                  className={`inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-base font-semibold text-white shadow-[0_18px_40px_-20px_rgba(63,140,255,0.85)] ${
                    isBusy ? "cursor-not-allowed bg-[#3F8CFF]/60" : "bg-[#3F8CFF] hover:bg-[#60aaff]"
                  }`}
                >
                  {isBusy ? "Joining..." : "Join waitlist"}
                </button>

                <p className="text-sm leading-7 text-white/56">
                  You will only hear from us about beta access and important NeuVault updates.
                </p>
              </motion.form>
            ) : (
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xl font-semibold text-[#6ce6b3]">You are on the list.</p>
                <p className="text-sm leading-7 text-white/66">
                  We will email you when the next beta wave opens.
                </p>
              </motion.div>
            )}

            {status === "error" && errorMessage ? (
              <motion.p
                className="mt-4 text-sm text-red-300"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                role="alert"
              >
                {errorMessage}
              </motion.p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
