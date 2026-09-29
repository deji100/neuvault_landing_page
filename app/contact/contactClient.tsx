"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { ArrowLeft, Bug, LifeBuoy, Lock, Mail, RefreshCw, Send, ShieldCheck } from "lucide-react";

import styles from "./Contact.module.css";

const SUPPORT_EMAIL = "support@neuvault.app";

const contactReasons = [
  {
    title: "Product support",
    description:
      "Get help with documents, notes, scans, voice notes, search, reminders, or Nova.",
    icon: LifeBuoy,
    tone: "#007aff",
  },
  {
    title: "Backup and restore",
    description:
      "Ask about encrypted backups, restoring on a new device, or moving your vault safely.",
    icon: RefreshCw,
    tone: "#34c759",
  },
  {
    title: "Privacy questions",
    description:
      "Understand local-first storage, AI processing, and how NeuVault handles your documents.",
    icon: ShieldCheck,
    tone: "#5e5ce6",
  },
  {
    title: "Bug reports",
    description:
      "Report crashes, failed uploads, preview issues, extraction problems, or unexpected behavior.",
    icon: Bug,
    tone: "#ff9500",
  },
];

const faqs = [
  {
    q: "How fast do you respond?",
    a: "We typically respond within 24–48 hours. Security, billing, restore, and account-access issues are treated with higher priority.",
  },
  {
    q: "Where are my documents stored?",
    a: "NeuVault is local-first. Your documents live on your device by default. Optional encrypted backups are stored only where you choose to keep them.",
  },
  {
    q: "Does NeuVault store my documents on its servers?",
    a: "No. Your vault lives on your device. When a feature needs our servers, such as reading a scan or transcribing a recording, the file and its result are deleted as soon as your device receives them, and within an hour at most. We keep reminder details so we can notify you about your dates.",
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
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.wrap}>
        <Link href="/" className={styles.back}>
          <ArrowLeft size={15} aria-hidden="true" /> Back to Home
        </Link>

        <section className={styles.top}>
          <div>
            <p className={styles.kicker}>Contact NeuVault</p>
            <h1>Need help with your private document vault?</h1>
            <p className={styles.lede}>
              Send a message about support, feedback, privacy, backup,
              restore, billing, bugs, or feature ideas. NeuVault is built for
              important records, so trust and clarity matter.
            </p>

            <div className={styles.reasons}>
              {contactReasons.map(({ title, description, icon: Icon, tone }) => (
                <div key={title} className={styles.reason} style={{ "--tone": tone } as React.CSSProperties}>
                  <span className={styles.reasonIcon} aria-hidden="true">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
              ))}
            </div>

            <div className={styles.direct}>
              <span className={styles.directIcon} aria-hidden="true">
                <Mail size={18} />
              </span>
              <div>
                <p className={styles.directLabel}>Prefer direct email?</p>
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                <p className={styles.directNote}>Typical response time: 24–48 hours.</p>
              </div>
            </div>
          </div>

          <div className={styles.formCard}>
            <div className={styles.formHead}>
              <div>
                <h2>Send a message</h2>
                <p>We will reply to the email address you provide.</p>
              </div>
              <span className={styles.formIcon} aria-hidden="true">
                <Send size={18} />
              </span>
            </div>

            {submitted ? (
              <div className={styles.success} role="status">
                <p className={styles.successTitle}>Message received.</p>
                <p>Thanks for reaching out. We will reply as soon as possible.</p>
                <button type="button" onClick={() => setStatus("idle")} className={styles.again}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.field}>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      resetError();
                    }}
                    disabled={isBusy}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      resetError();
                    }}
                    disabled={isBusy}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="topic">Topic</label>
                  <select
                    id="topic"
                    name="topic"
                    value={topic}
                    onChange={(event) => {
                      setTopic(event.target.value);
                      resetError();
                    }}
                    disabled={isBusy}
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

                <div className={styles.field}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Tell us what happened, what you expected, and how we can help..."
                    value={message}
                    onChange={(event) => {
                      setMessage(event.target.value);
                      resetError();
                    }}
                    disabled={isBusy}
                  />
                </div>

                <button type="submit" className={styles.submit} disabled={isBusy}>
                  <Send size={14} aria-hidden="true" />
                  {isBusy ? "Sending..." : "Send message"}
                </button>

                {status === "error" && !!errorMessage && (
                  <p className={styles.error} role="alert">
                    {errorMessage}
                  </p>
                )}

                <p className={styles.formNote}>
                  Prefer email? Reach us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                </p>
              </form>
            )}
          </div>
        </section>

        <section className={styles.faq}>
          <div className={styles.faqHead}>
            <div>
              <p className={styles.kicker}>Quick answers</p>
              <h2>Before you contact us</h2>
            </div>
            <span className={styles.privatePill}>
              <Lock size={13} aria-hidden="true" />
              Private by default. Local-first by design.
            </span>
          </div>

          <div className={styles.faqGrid}>
            {faqs.map((item) => (
              <details key={item.q} className={styles.faqItem}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
