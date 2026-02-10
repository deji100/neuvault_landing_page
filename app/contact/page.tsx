"use client";

import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import FloatingBlobs from "@/components/specific/home/FloatingBlobs";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isEmailValid = useMemo(() => {
    const v = email.trim().toLowerCase();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }, [email]);

  const isBusy = status === "sending";
  const submitted = status === "success";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage || !isEmailValid) {
      setStatus("error");
      setErrorMessage("Please fill all fields with a valid email.");
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setErrorMessage(
        "Email service is not configured yet. Please try again later.",
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
          message: trimmedMessage,
          source: "NeuVault Contact Form",
        },
        { publicKey },
      );

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="relative overflow-hidden bg-[#0B0F19] text-white">
      <FloatingBlobs />

      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: intro + contact info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                  Contact
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mt-3">
                  Talk to the NeuVault team
                </h1>
                <p className="text-gray-300 mt-4 leading-relaxed">
                  Have a question, feedback, or a feature idea? We are happy
                  to help. Tell us a bit about what you need and we will get
                  back to you.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Email us</p>
                  <p className="text-lg font-semibold text-white">
                    support@neuvault.app
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Typical response: within 24-48 hours
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">What to include</p>
                  <ul className="text-sm text-gray-300 mt-2 space-y-2">
                    <li>- A brief summary of the issue</li>
                    <li>- Steps to reproduce (if applicable)</li>
                    <li>- Screenshots or screen recording</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: contact form */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white">
                Send a message
              </h2>
              <p className="text-sm text-gray-400 mt-2">
                We will reply to the email address you provide.
              </p>

              {submitted ? (
                <p className="mt-6 text-green-400">
                  ✅ Thanks! We have received your message.
                </p>
              ) : (
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="text-xs text-gray-400">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B0F19] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3F8CFF]/50"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      disabled={isBusy}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your email"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B0F19] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3F8CFF]/50"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      disabled={isBusy}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B0F19] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3F8CFF]/50"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      disabled={isBusy}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full rounded-xl py-3 text-sm font-semibold text-white transition ${
                      isBusy
                        ? "bg-[#3F8CFF]/60 cursor-not-allowed"
                        : "bg-[#3F8CFF] hover:bg-[#60aaff]"
                    }`}
                    disabled={isBusy}
                  >
                    {isBusy ? "Sending..." : "Send message"}
                  </button>
                  <p className="text-[11px] text-gray-500 text-center">
                    Prefer email? Reach us at support@neuvault.app
                  </p>
                  {status === "error" && !!errorMessage && (
                    <p className="text-sm text-red-300" role="alert">
                      {errorMessage}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* FAQ */}
          <section className="mt-16">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">FAQ</h2>
              <span className="text-xs text-gray-500">
                Quick answers to common questions
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  q: "How fast do you respond to support requests?",
                  a: "We typically respond within 24–48 hours. During active testing phases, responses are often faster.",
                },
                {
                  q: "Where is my data stored?",
                  a: "Your documents live on your device by default. NeuVault does not store your files on its servers. Backups are optional and only stored in cloud locations you personally choose.",
                },
                {
                  q: "Does NeuVault upload my documents to the cloud?",
                  a: "No. NeuVault is local-first. Your documents stay on your device unless you explicitly export or back them up yourself.",
                },
                {
                  q: "Does NeuVault train AI models on my data?",
                  a: "No. Your documents are never used for training models and are not retained after analysis.",
                },
                {
                  q: "Can I control what gets analyzed by AI?",
                  a: "Yes. You decide when analysis happens, which documents are included, and whether deep document analysis is enabled.",
                },
                {
                  q: "Does NeuVault work offline?",
                  a: "Yes. Core vault access and document storage work offline. AI features require connectivity only when explicitly used.",
                },
                {
                  q: "How does backup and recovery work?",
                  a: "You can export an encrypted version of your vault and store it in your own cloud or offline storage. Backups are encrypted on-device and can only be restored by your account in the app.",
                },
                {
                  q: "Can I move my vault to a new device?",
                  a: "Yes. NeuVault supports device portability by allowing you to import your encrypted vault on a new device.",
                },
                {
                  q: "What kinds of files does NeuVault support?",
                  a: "NeuVault supports PDFs, Word documents, spreadsheets, CSVs, scanned documents, notes, and voice notes converted to text.",
                },
                {
                  q: "Can I report a security issue?",
                  a: "Absolutely. Please email support@neuvault.app with details. Security reports are treated with priority.",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="text-sm font-semibold text-white">{item.q}</h3>
                  <p className="text-sm text-gray-300 mt-2">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
