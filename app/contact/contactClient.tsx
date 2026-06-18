"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import {
  FaBug,
  FaEnvelope,
  FaLock,
  FaPaperPlane,
  FaShieldAlt,
  FaSyncAlt,
} from "react-icons/fa";

import FloatingBlobs from "@/components/specific/home/FloatingBlobs";

const SUPPORT_EMAIL = "support@neuvault.app";

const contactReasons = [
  {
    title: "Product support",
    description:
      "Get help with documents, notes, scans, voice notes, search, reminders, or Nova.",
    icon: <FaEnvelope className="text-[#6DD1FF]" size={18} />,
  },
  {
    title: "Backup and restore",
    description:
      "Ask about encrypted backups, restoring on a new device, or moving your vault safely.",
    icon: <FaSyncAlt className="text-[#6ce6b3]" size={18} />,
  },
  {
    title: "Privacy questions",
    description:
      "Understand local-first storage, AI processing, and how NeuVault handles your documents.",
    icon: <FaShieldAlt className="text-sky-300" size={18} />,
  },
  {
    title: "Bug reports",
    description:
      "Report crashes, failed uploads, preview issues, extraction problems, or unexpected behavior.",
    icon: <FaBug className="text-amber-300" size={18} />,
  },
];

const faqs = [
  {
    q: "How fast do you respond?",
    a: "We typically respond within 24-48 hours. Security, billing, restore, and account-access issues are treated with higher priority.",
  },
  {
    q: "Where are my documents stored?",
    a: "NeuVault is local-first. Your documents live on your device by default. Optional encrypted backups are stored only where you choose to keep them.",
  },
  {
    q: "Does NeuVault store my documents on its servers?",
    a: "NeuVault is designed so your documents are not persisted on NeuVault servers. AI processing may temporarily handle content when you use intelligent workflows, but documents are not kept after processing.",
  },
  {
    q: "Does NeuVault train AI models on my documents?",
    a: "No. Your documents are not used to train AI models.",
  },
  {
    q: "Can I ask about backup or restore issues?",
    a: "Yes. Include your device type, what backup file you are trying to restore, and what error or behavior you see.",
  },
  {
    q: "Does NeuVault work offline?",
    a: "Core vault access and local document storage are designed around offline use. AI-powered processing requires connectivity when used.",
  },
  {
    q: "Can I report a security issue?",
    a: `Yes. Email ${SUPPORT_EMAIL} with details and include “Security report” in the subject if possible.`,
  },
  {
    q: "What should I include in a bug report?",
    a: "Include your device, app version if available, the steps you took, what you expected, what happened, and screenshots or a screen recording if possible.",
  },
];

export default function ContactClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Support");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isEmailValid = useMemo(() => {
    const value = email.trim().toLowerCase();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }, [email]);

  const isBusy = status === "sending";
  const submitted = status === "success";

  const resetError = () => {
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage || !isEmailValid) {
      setStatus("error");
      setErrorMessage("Please fill all fields with a valid email address.");
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setErrorMessage(
        `Email service is not configured yet. Please email ${SUPPORT_EMAIL}.`,
      );
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          sender_name: trimmedName,
          sender_email: trimmedEmail,
          topic,
          message: trimmedMessage,
          source: "NeuVault Contact Form",
        },
        { publicKey },
      );

      setStatus("success");
      setName("");
      setEmail("");
      setTopic("Support");
      setMessage("");
    } catch (error) {
      console.error("EmailJS send failed:", error);
      setStatus("error");
      setErrorMessage(
        `Something went wrong. Please try again or email ${SUPPORT_EMAIL}.`,
      );
    }
  };

  return (
    <main className="legacy-light-page relative overflow-hidden px-6 pb-24 pt-28">
      <FloatingBlobs />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-10 h-64 w-64 rounded-full bg-[#3F8CFF]/14 blur-[130px]" />
        <div className="absolute bottom-0 right-[8%] h-72 w-72 rounded-full bg-[#6DD1FF]/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <nav className="text-sm text-white/55" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="px-2 text-white/30">/</span>
          <span>Contact</span>
        </nav>

        <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(63,140,255,0.18),transparent_34%)]"
            aria-hidden="true"
          />

          <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="inline-flex rounded-full border border-[#6DD1FF]/15 bg-[#6DD1FF]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9dd9ff]">
                Contact NeuVault
              </p>

              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                Need help with your private document vault?
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
                Send a message about support, feedback, privacy, backup,
                restore, billing, bugs, or feature ideas. NeuVault is built for
                important records, so trust and clarity matter.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {contactReasons.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5"
                  >
                    <div className="mb-3 inline-flex rounded-2xl border border-white/10 bg-white/6 p-3">
                      {item.icon}
                    </div>

                    <h2 className="text-base font-semibold text-white">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-white/62">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-[#6DD1FF]/16 bg-[#6DD1FF]/8 p-5">
                <p className="text-sm font-semibold text-white">
                  Prefer direct email?
                </p>

                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="mt-2 inline-flex text-lg font-semibold text-[#9dd9ff] hover:text-white"
                >
                  {SUPPORT_EMAIL}
                </a>

                <p className="mt-2 text-xs leading-6 text-white/48">
                  Typical response time: 24-48 hours.
                </p>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-black/22 p-6 backdrop-blur-sm sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    Send a message
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-white/56">
                    We will reply to the email address you provide.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/6 p-3 text-[#6DD1FF]">
                  <FaPaperPlane size={18} />
                </div>
              </div>

              {submitted ? (
                <div className="mt-7 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                  <p className="text-base font-semibold text-emerald-200">
                    Message received.
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/66">
                    Thanks for reaching out. We will reply as soon as possible.
                  </p>

                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-5 rounded-full border border-white/14 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold uppercase tracking-[0.14em] text-white/46"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                        resetError();
                      }}
                      disabled={isBusy}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold uppercase tracking-[0.14em] text-white/46"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        resetError();
                      }}
                      disabled={isBusy}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="topic"
                      className="text-xs font-semibold uppercase tracking-[0.14em] text-white/46"
                    >
                      Topic
                    </label>

                    <select
                      id="topic"
                      name="topic"
                      value={topic}
                      onChange={(event) => {
                        setTopic(event.target.value);
                        resetError();
                      }}
                      disabled={isBusy}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    >
                      <option>Support</option>
                      <option>Backup or restore</option>
                      <option>Privacy question</option>
                      <option>Bug report</option>
                      <option>Billing or credits</option>
                      <option>Feature idea</option>
                      <option>Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="text-xs font-semibold uppercase tracking-[0.14em] text-white/46"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Tell us what happened, what you expected, and how we can help..."
                      className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                      value={message}
                      onChange={(event) => {
                        setMessage(event.target.value);
                        resetError();
                      }}
                      disabled={isBusy}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition ${
                      isBusy
                        ? "cursor-not-allowed bg-[#3F8CFF]/60"
                        : "bg-[#3F8CFF] hover:bg-[#60aaff]"
                    }`}
                    disabled={isBusy}
                  >
                    <FaPaperPlane size={13} />
                    {isBusy ? "Sending..." : "Send message"}
                  </button>

                  <p className="text-center text-[11px] leading-5 text-white/38">
                    Prefer email? Reach us at{" "}
                    <a
                      href={`mailto:${SUPPORT_EMAIL}`}
                      className="text-[#9dd9ff] hover:text-white"
                    >
                      {SUPPORT_EMAIL}
                    </a>
                  </p>

                  {status === "error" && !!errorMessage && (
                    <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                      {errorMessage}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
                Quick answers
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-white">
                Before you contact us
              </h2>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#6DD1FF]/18 bg-[#6DD1FF]/8 px-4 py-2 text-sm text-[#d7efff]">
              <FaLock size={13} />
              Private by default. Local-first by design.
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((item) => (
              <article
                key={item.q}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <h3 className="text-sm font-semibold text-white">{item.q}</h3>
                <p className="mt-2 text-sm leading-7 text-white/62">
                  {item.a}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
