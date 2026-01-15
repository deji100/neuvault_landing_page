"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaGavel,
  FaUserShield,
  FaLock,
  FaFileAlt,
  FaBan,
  FaCloud,
  FaExclamationTriangle,
} from "react-icons/fa";

const EFFECTIVE_DATE = "January 15, 2026"; // update when needed
const SUPPORT_EMAIL = "legal@neuvault.app";

const Section = ({
  id,
  title,
  icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-28">
    <div className="flex items-start gap-3">
      <div className="mt-1 text-[#6DD1FF]">{icon}</div>
      <div className="flex-1">
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
          {title}
        </h2>
        <div className="text-gray-300 leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </div>
  </section>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-3">
    <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-white/30 shrink-0" />
    <span>{children}</span>
  </li>
);

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-[#0B0F19] text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#121c2b] to-[#203B6E] -z-10" />

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-12">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-white transition"
        >
          ← Back to Home
        </Link>

        <div className="mt-8">
          <p className="text-sm text-[#6DD1FF] uppercase tracking-wide mb-3">
            NeuVault Legal
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Terms & Conditions
          </h1>

          <p className="text-gray-300 mt-5 max-w-3xl">
            These Terms govern your access to and use of NeuVault. By using the
            app, you agree to these Terms.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <FaGavel />
              Effective: <span className="text-white">{EFFECTIVE_DATE}</span>
            </span>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10 transition"
            >
              <FaUserShield />
              {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-24 space-y-12">
        <Section id="acceptance" title="1. Acceptance of Terms" icon={<FaFileAlt />}>
          <p>
            By downloading, accessing, or using NeuVault (“the App”), you agree
            to be bound by these Terms and our Privacy Policy.
          </p>
          <p>
            If you do not agree, do not use NeuVault.
          </p>
        </Section>

        <Section id="eligibility" title="2. Eligibility" icon={<FaUserShield />}>
          <ul className="space-y-2">
            <Bullet>You must be at least 13 years old to use NeuVault.</Bullet>
            <Bullet>
              If you are under 18, you confirm that a parent or guardian has
              consented.
            </Bullet>
          </ul>
        </Section>

        <Section id="your-data" title="3. Your Data & Ownership" icon={<FaLock />}>
          <p>
            You retain full ownership of all documents, files, and content you
            store in NeuVault.
          </p>
          <p>
            NeuVault does <strong>not</strong> claim ownership over your data.
          </p>
          <ul className="space-y-2">
            <Bullet>Your documents are stored locally on your device.</Bullet>
            <Bullet>
              We do not store, view, sell, or access your documents.
            </Bullet>
          </ul>
        </Section>

        <Section id="ai" title="4. AI Features" icon={<FaFileAlt />}>
          <p>
            NeuVault provides optional AI features such as summaries, tagging,
            smart suggestions, and the Nova assistant.
          </p>
          <ul className="space-y-2">
            <Bullet>
              AI runs only when you initiate or enable it.
            </Bullet>
            <Bullet>
              You control whether processing is quick (metadata) or deep
              (full document).
            </Bullet>
            <Bullet>
              Your data is never used to train AI models.
            </Bullet>
          </ul>
        </Section>

        <Section id="backup" title="5. Cloud Backup & Export" icon={<FaCloud />}>
          <p>
            NeuVault allows optional encrypted export or backup to a cloud
            provider of your choice.
          </p>
          <ul className="space-y-2">
            <Bullet>
              Backups are encrypted before leaving your device.
            </Bullet>
            <Bullet>
              NeuVault cannot decrypt or access your backups.
            </Bullet>
            <Bullet>
              You are responsible for safeguarding your backup keys.
            </Bullet>
          </ul>
        </Section>

        <Section id="acceptable-use" title="6. Acceptable Use" icon={<FaBan />}>
          <p>You agree not to:</p>
          <ul className="space-y-2">
            <Bullet>Use NeuVault for illegal activities.</Bullet>
            <Bullet>Attempt to reverse engineer the app.</Bullet>
            <Bullet>Interfere with app security or integrity.</Bullet>
            <Bullet>Misuse AI features for unlawful purposes.</Bullet>
          </ul>
        </Section>

        <Section id="availability" title="7. Availability & Changes" icon={<FaExclamationTriangle />}>
          <p>
            NeuVault is provided “as is” and may change over time.
          </p>
          <ul className="space-y-2">
            <Bullet>Features may evolve, be added, or removed.</Bullet>
            <Bullet>
              We do not guarantee uninterrupted availability.
            </Bullet>
          </ul>
        </Section>

        <Section id="termination" title="8. Account Termination" icon={<FaBan />}>
          <p>
            You may stop using NeuVault at any time.
          </p>
          <p>
            We may suspend access if these Terms are violated, but we do not
            delete your local documents.
          </p>
        </Section>

        <Section id="liability" title="9. Limitation of Liability" icon={<FaExclamationTriangle />}>
          <p>
            To the maximum extent permitted by law:
          </p>
          <ul className="space-y-2">
            <Bullet>
              NeuVault is not liable for data loss caused by device failure,
              user error, or loss of encryption keys.
            </Bullet>
            <Bullet>
              NeuVault is not responsible for third-party cloud providers you
              choose to use.
            </Bullet>
          </ul>
        </Section>

        <Section id="law" title="10. Governing Law" icon={<FaGavel />}>
          <p>
            These Terms are governed by applicable laws in your jurisdiction,
            without regard to conflict of law principles.
          </p>
        </Section>

        <Section id="changes" title="11. Changes to These Terms" icon={<FaFileAlt />}>
          <p>
            We may update these Terms to reflect legal or product changes.
            Continued use after updates means acceptance.
          </p>
        </Section>

        <Section id="contact" title="12. Contact" icon={<FaUserShield />}>
          <p>
            For questions about these Terms, contact:
          </p>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm">
              Email:{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-[#6DD1FF] hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>
            </p>
          </div>
        </Section>

        <div className="pt-6 border-t border-white/10 text-sm text-gray-500">
          NeuVault — Privacy first. Ownership always.
        </div>
      </div>
    </main>
  );
}
