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
  FaRobot,
  FaWifi,
  FaCreditCard,
  FaSyncAlt,
  FaShieldAlt,
  FaTrash,
} from "react-icons/fa";
import { FaBell } from "react-icons/fa6";

const EFFECTIVE_DATE = "February 11, 2026"; // update when needed
const SUPPORT_EMAIL = "support@neuvault.app";

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
        <div className="text-gray-300 leading-relaxed space-y-3">{children}</div>
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

const Chip = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: React.ReactNode;
}) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
    <span className="text-white/60">{icon}</span>
    <span>{label}</span>
  </span>
);

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-[#0B0F19] text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#121c2b] to-[#203B6E] -z-10" />
      <motion.div
        className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-[#3F8CFF]/10 blur-3xl -z-10"
        animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[460px] h-[460px] rounded-full bg-purple-500/10 blur-3xl -z-10"
        animate={{ scale: [1, 1.05, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-12">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition"
          >
            ← Back to Home
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <FaShieldAlt className="text-[#6DD1FF]" />
              Privacy-first • Local-first
            </span>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-[#6DD1FF] uppercase tracking-wide mb-3">
            NeuVault Legal
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Terms & Conditions
          </h1>

          <p className="text-gray-300 mt-5 max-w-3xl">
            These Terms govern your access to and use of NeuVault (“NeuVault”,
            “we”, “our”, “us”). By using the app, you agree to these Terms and
            our Privacy Policy.
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

          <div className="mt-5 flex flex-wrap gap-2">
            <Chip icon={<FaLock />} label="You own your vault content" />
            <Chip icon={<FaRobot />} label="AI outputs may be inaccurate" />
            <Chip icon={<FaWifi />} label="Offline actions may queue" />
            <Chip icon={<FaCloud />} label="Encrypted export before backup" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-24 space-y-12">
        <Section id="acceptance" title="1. Acceptance of Terms" icon={<FaFileAlt />}>
          <p>
            By downloading, accessing, or using NeuVault (the “App”), you agree
            to be bound by these Terms and our Privacy Policy.
          </p>
          <p>If you do not agree, do not use NeuVault.</p>
        </Section>

        <Section id="eligibility" title="2. Eligibility" icon={<FaUserShield />}>
          <ul className="space-y-2">
            <Bullet>You must be at least 13 years old to use NeuVault.</Bullet>
            <Bullet>
              If you are under 18, you confirm a parent/guardian has consented.
            </Bullet>
          </ul>
        </Section>

        <Section id="accounts" title="3. Accounts & security" icon={<FaLock />}>
          <ul className="space-y-2">
            <Bullet>
              You are responsible for maintaining the confidentiality of your
              account and access to your device.
            </Bullet>
            <Bullet>
              You agree not to access or attempt to access other users’ accounts
              or vaults.
            </Bullet>
            <Bullet>
              If you believe your account has been compromised, contact{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-[#6DD1FF] hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>
              .
            </Bullet>
          </ul>
        </Section>

        <Section id="your-data" title="4. Your data & ownership" icon={<FaShieldAlt />}>
          <p>
            You retain full ownership of the documents, files, notes, audio, and
            other content you store in NeuVault (“Your Content”).
          </p>
          <ul className="space-y-2">
            <Bullet>
              Your vault content is stored locally on your device by default.
            </Bullet>
            <Bullet>
              NeuVault does not claim ownership over Your Content.
            </Bullet>
            <Bullet>
              You are responsible for keeping your device secure and maintaining
              your own backups.
            </Bullet>
          </ul>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
            <p className="text-sm text-gray-200">
              <strong className="text-white">Backup responsibility:</strong> NeuVault provides tools for encrypted export,
              but NeuVault is not a guaranteed backup service. You are
              responsible for storing your exported backups safely.
            </p>
          </div>
        </Section>

        <Section id="ai" title="5. AI features & limitations" icon={<FaRobot />}>
          <p>
            NeuVault may offer AI-powered features such as Smart Intake
            (summaries/tags/grouping), voice transcription, Smart Suggestions,
            and the Nova Assistant.
          </p>

          <h3 className="text-lg font-semibold text-white mt-4">
            Smart Intake (automatic processing)
          </h3>
          <ul className="space-y-2 mt-2">
            <Bullet>
              Smart Intake may automatically process content you add to generate
              summaries, tags, and organization metadata.
            </Bullet>
            <Bullet>
              If you are offline, intake items may be queued and processed when
              you regain internet access.
            </Bullet>
          </ul>

          <h3 className="text-lg font-semibold text-white mt-4">
            AI output disclaimer
          </h3>
          <ul className="space-y-2 mt-2">
            <Bullet>
              AI-generated summaries, tags, suggestions, transcripts, and answers
              are provided for informational purposes and may be inaccurate,
              incomplete, or outdated.
            </Bullet>
            <Bullet>
              You are responsible for reviewing and verifying outputs before
              relying on them—especially for legal, medical, financial, or
              compliance decisions.
            </Bullet>
          </ul>

          <h3 className="text-lg font-semibold text-white mt-4">
            No guaranteed results
          </h3>
          <p>
            We do not guarantee that AI features will identify every deadline,
            renewal, event date, or relevant detail.
          </p>
        </Section>

        <Section id="suggestions" title="6. Smart Suggestions & reminders" icon={<FaBell />}>
          <ul className="space-y-2">
            <Bullet>
              Smart Suggestions runs only when you initiate it (where available).
            </Bullet>
            <Bullet>
              Deadline/renewal insights may be shown only during Smart
              Suggestions runs.
            </Bullet>
            <Bullet>
              Reminders and resurfacing notifications trigger only if you set
              them on a document or group.
            </Bullet>
            <Bullet>
              Notifications may not be delivered due to OS settings, device
              restrictions, network issues, or user configuration. You are
              responsible for keeping critical reminders elsewhere if needed.
            </Bullet>
          </ul>
        </Section>

        <Section id="export" title="7. Encrypted export & restore" icon={<FaCloud />}>
          <p>
            NeuVault may allow you to export an encrypted backup bundle to a
            storage provider you choose (e.g., Google Drive, iCloud, Dropbox, or
            other storage).
          </p>
          <ul className="space-y-2">
            <Bullet>
              Export bundles are encrypted before leaving your device.
            </Bullet>
            <Bullet>
              You are responsible for safeguarding access to your exported files
              and your cloud account(s).
            </Bullet>
            <Bullet>
              If you lose access to your account/device and do not have an
              exported backup, NeuVault may not be able to recover Your Content.
            </Bullet>
          </ul>
        </Section>

        <Section id="payments" title="8. Plans, billing, and credits" icon={<FaCreditCard />}>
          <p>
            NeuVault may offer subscriptions, usage-based credits, or both.
            Availability and pricing may vary by platform.
          </p>

          <ul className="space-y-2">
            <Bullet>
              Purchases made on iOS are processed through Apple In-App Purchase
              (IAP) where required.
            </Bullet>
            <Bullet>
              Credits (if offered) may be consumed when you use AI-powered
              processing features (e.g., summaries, transcription, assistant
              tasks).
            </Bullet>
            <Bullet>
              Credits are not legal tender, have no cash value, and are not
              transferable or resellable.
            </Bullet>
          </ul>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
            <p className="text-sm text-gray-200">
              <strong className="text-white">Refunds:</strong> If you purchase through Apple, refunds are handled under
              Apple’s policies. For other platforms, refunds (if any) follow the
              rules shown at purchase time.
            </p>
          </div>
        </Section>

        <Section id="acceptable-use" title="9. Acceptable use" icon={<FaBan />}>
          <p>You agree not to:</p>
          <ul className="space-y-2">
            <Bullet>Use NeuVault for illegal activities.</Bullet>
            <Bullet>
              Upload, store, or process content that you do not have the right
              to possess or use.
            </Bullet>
            <Bullet>
              Attempt to reverse engineer, bypass security, or interfere with
              the app’s integrity.
            </Bullet>
            <Bullet>
              Use AI features to generate or facilitate unlawful conduct.
            </Bullet>
            <Bullet>
              Abuse the service (e.g., automated scraping, excessive requests,
              or attempts to overload systems).
            </Bullet>
          </ul>
        </Section>

        <Section id="third-parties" title="10. Third-party services" icon={<FaCloud />}>
          <p>
            NeuVault may integrate with third-party services you choose to use,
            such as cloud storage providers (for export) and AI processing
            providers (to deliver AI features).
          </p>
          <ul className="space-y-2">
            <Bullet>
              Third-party services have their own terms and privacy policies.
            </Bullet>
            <Bullet>
              NeuVault is not responsible for outages, data loss, or policy
              changes of third-party providers.
            </Bullet>
          </ul>
        </Section>

        <Section id="availability" title="11. Availability & changes" icon={<FaSyncAlt />}>
          <p>NeuVault is provided “as is” and may change over time.</p>
          <ul className="space-y-2">
            <Bullet>Features may be added, modified, or removed.</Bullet>
            <Bullet>
              We do not guarantee uninterrupted availability or error-free
              operation.
            </Bullet>
            <Bullet>
              Some features may require internet access and may be unavailable
              offline.
            </Bullet>
          </ul>
        </Section>

        <Section id="termination" title="12. Termination" icon={<FaBan />}>
          <p>You may stop using NeuVault at any time.</p>
          <p>
            We may suspend or terminate your access if you violate these Terms
            or misuse the service, to the extent permitted by law.
          </p>
          <p>
            Termination does not automatically delete Your Content stored
            locally on your device.
          </p>
        </Section>

        <Section id="account-deletion" title="13. Account deletion" icon={<FaTrash />}>
          <p>
            You can request account deletion in-app from Settings &gt; Delete Account or
            through our account deletion page:
          </p>
          <p>
            <Link href="/account-deletion" className="text-[#6DD1FF] hover:underline">
              neuvault.app/account-deletion
            </Link>
          </p>
          <ul className="space-y-2">
            <Bullet>
              Account deletion removes server-side account records and authentication records.
            </Bullet>
            <Bullet>
              Account deletion does not automatically remove local vault content stored on
              your device.
            </Bullet>
          </ul>
        </Section>

        <Section id="liability" title="14. Disclaimers & limitation of liability" icon={<FaExclamationTriangle />}>
          <p>
            To the maximum extent permitted by law, NeuVault disclaims all
            warranties, express or implied, including fitness for a particular
            purpose and non-infringement.
          </p>
          <ul className="space-y-2">
            <Bullet>
              NeuVault is not liable for data loss caused by device failure,
              OS issues, user error, or loss of exported backups.
            </Bullet>
            <Bullet>
              NeuVault is not liable for decisions made based on AI outputs.
            </Bullet>
            <Bullet>
              NeuVault is not responsible for the third-party services you
              choose to use (including cloud storage providers).
            </Bullet>
          </ul>
        </Section>

        <Section id="law" title="15. Governing law" icon={<FaGavel />}>
          <p>
            These Terms are governed by applicable laws in your jurisdiction,
            without regard to conflict-of-law principles.
          </p>
        </Section>

        <Section id="changes" title="16. Changes to these Terms" icon={<FaFileAlt />}>
          <p>
            We may update these Terms to reflect product or legal changes. We
            will update the effective date above. Continued use after changes
            means acceptance.
          </p>
        </Section>

        <Section id="contact" title="17. Contact" icon={<FaUserShield />}>
          <p>For questions about these Terms, contact:</p>
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
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
