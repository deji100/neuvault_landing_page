"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaLock,
  FaCloud,
  FaRobot,
  FaBell,
  FaBug,
  FaUserShield,
  FaFileAlt,
  FaWifi,
  FaTrash,
} from "react-icons/fa";

const EFFECTIVE_DATE = "February 11, 2026"; // update anytime
const PRIVACY_EMAIL = "support@neuvault.app";

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

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen bg-[#0B0F19] text-white overflow-hidden">
      {/* Background glow */}
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
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-10">
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
              Local-first • Privacy-first
            </span>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm md:text-base text-[#6DD1FF] tracking-wide uppercase mb-3">
            NeuVault Legal
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Privacy Policy
          </h1>

          <p className="text-gray-300 mt-5 max-w-3xl">
            NeuVault is built on a privacy-first, local-first philosophy. This
            policy explains what we collect, what we do not collect, and how AI,
            offline queues, encrypted exports, and App Store privacy disclosures
            work.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center text-sm text-gray-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <FaUserShield className="text-white/60" />
              Effective: <span className="text-white/90">{EFFECTIVE_DATE}</span>
            </span>

            <a
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10 transition"
              href={`mailto:${PRIVACY_EMAIL}`}
            >
              <FaLock className="text-white/60" />
              {PRIVACY_EMAIL}
            </a>
          </div>

          {/* Quick trust chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            <Chip icon={<FaFileAlt />} label="Vault stored on-device by default" />
            <Chip icon={<FaRobot />} label="AI processing is temporary & purpose-limited" />
            <Chip icon={<FaCloud />} label="Encrypted export before backup" />
            <Chip icon={<FaWifi />} label="Offline actions queue until online" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sticky TOC */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
              <p className="text-sm font-semibold text-white mb-3">On this page</p>

              <nav className="space-y-2 text-sm">
                {[
                  ["principles", "Core principles"],
                  ["collect", "What we collect"],
                  ["documents", "Your documents & local storage"],
                  ["ai", "AI & data processing"],
                  ["suggestions", "Smart Suggestions & Resurfacing"],
                  ["offline", "Offline queue & processing"],
                  ["backup", "Encrypted export & backup"],
                  ["analytics", "Analytics & diagnostics"],
                  ["admin-access", "Administrative access & support operations"],
                  ["appstore", "App Store privacy summary (iOS)"],
                  ["retention", "Data retention"],
                  ["account-deletion", "Account deletion"],
                  ["rights", "Your rights"],
                  ["children", "Children’s privacy"],
                  ["security", "Security"],
                  ["changes", "Changes to this policy"],
                  ["contact", "Contact"],
                ].map(([id, label]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="block text-gray-300 hover:text-white transition"
                  >
                    {label}
                  </a>
                ))}
              </nav>

              <div className="mt-5 pt-5 border-t border-white/10 text-xs text-gray-500 leading-relaxed">
                Tip: Use your browser find (Ctrl/Cmd + F) to search this policy.
              </div>
            </div>
          </aside>

          {/* Main sections */}
          <div className="lg:col-span-8 space-y-10">
            <Section
              id="principles"
              title="1. Core privacy principles"
              icon={<FaShieldAlt />}
            >
              <ul className="space-y-2">
                <Bullet>
                  <strong className="text-white">You own your data.</strong>
                </Bullet>
                <Bullet>
                  <strong className="text-white">
                    Your vault content is stored on your device by default.
                  </strong>
                </Bullet>
                <Bullet>
                  <strong className="text-white">
                    We do not permanently store your document files on our
                    servers.
                  </strong>
                </Bullet>
                <Bullet>
                  AI processing occurs only to provide specific app features and
                  is designed to be temporary and purpose-limited.
                </Bullet>
                <Bullet>
                  Encrypted export/backup is optional and controlled by you.
                </Bullet>
              </ul>
            </Section>

            <Section id="collect" title="2. What we collect" icon={<FaUserShield />}>
              <p className="text-gray-300">
                NeuVault collects <strong className="text-white">minimal account data</strong> required
                for authentication and basic support:
              </p>

              <ul className="space-y-2">
                <Bullet>Email address</Bullet>
                <Bullet>Username (optional)</Bullet>
                <Bullet>Authentication/session tokens</Bullet>
              </ul>

              <p className="text-gray-300">
                We do <strong className="text-white">not</strong> collect or permanently store your
                vault documents or your document files in our database.
              </p>
            </Section>

            <Section
              id="documents"
              title="3. Your documents & local storage"
              icon={<FaFileAlt />}
            >
              <p className="text-gray-300">
                Your vault content — including PDFs, Word/Excel files, scans,
                document images, notes, and audio recordings — is stored locally
                on your device.
              </p>

              <p className="text-gray-300">
                NeuVault is designed so we cannot browse your vault on our
                servers, because your vault files are not stored there.
              </p>

              <p className="text-gray-300">
                <strong className="text-white">Important:</strong> If you remove the app without exporting
                a backup, your local vault data may be permanently lost.
              </p>
            </Section>

            <Section id="ai" title="4. AI & data processing" icon={<FaRobot />}>
              <p className="text-gray-300">
                NeuVault includes AI-powered features such as Smart Intake
                (automatic summaries, tagging, grouping), Smart Suggestions, Nova
                Assistant, and voice transcription.
              </p>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                <p className="text-sm text-gray-200">
                  <strong className="text-white">Key point:</strong> AI processing may occur on secure third-party AI
                  infrastructure in order to provide these features.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-white mt-4">
                What is transmitted for processing
              </h3>

              <ul className="space-y-2 mt-2">
                <Bullet>
                  Only the content necessary to perform the feature is
                  transmitted (for example, extracted text for summarization or
                  an audio file for transcription).
                </Bullet>
                <Bullet>
                  We do not intentionally include unrelated vault items in a
                  processing request.
                </Bullet>
                <Bullet>
                  Processing is designed to be temporary and used only to return
                  outputs (summaries, tags, metadata, transcripts, or assistant
                  responses).
                </Bullet>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-4">
                Smart Intake (automatic processing)
              </h3>

              <p className="text-gray-300">
                Smart Intake automatically generates summaries, tags, and
                organization metadata when you add content (documents, scans,
                images, notes, or audio).
              </p>

              <ul className="space-y-2 mt-2">
                <Bullet>
                  If you are offline, the intake item is queued locally and
                  processed when you regain internet access.
                </Bullet>
                <Bullet>
                  Outputs are stored in your on-device vault database.
                </Bullet>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-4">
                Deep insights vs quick/limited mode
              </h3>
              <p className="text-gray-300">
                Some features allow you to control processing depth (for
                example, quick/limited mode vs deep insights). When enabled,
                deep insights may process more of a document in order to provide
                more detailed responses.
              </p>

              <h3 className="text-lg font-semibold text-white mt-4">
                No training on your vault content
              </h3>
              <p className="text-gray-300">
                Your vault content is <strong className="text-white">not used to train</strong> NeuVault models. We
                design our system so your vault content is processed only to
                provide app features.
              </p>
            </Section>

            <Section
              id="suggestions"
              title="5. Smart Suggestions & Resurfacing"
              icon={<FaBell />}
            >
              <ul className="space-y-2">
                <Bullet>
                  <strong className="text-white">Smart Suggestions runs only when you initiate it.</strong>
                </Bullet>
                <Bullet>
                  Deadline, event date, and renewal detection occurs only during
                  Smart Suggestions runs.
                </Bullet>
                <Bullet>
                  Resurfacing reminders trigger only if you explicitly set them
                  on a document or a linked group.
                </Bullet>
                <Bullet>
                  Notifications do not include your document contents.
                </Bullet>
              </ul>
            </Section>

            <Section id="offline" title="6. Offline queue & processing" icon={<FaWifi />}>
              <p className="text-gray-300">
                NeuVault supports offline-first capture. If you add content while
                offline (uploads, scans, images, notes, voice recordings, or
                audio uploads), NeuVault stores the item locally and queues it.
              </p>

              <ul className="space-y-2">
                <Bullet>Queued items are processed once internet access is available.</Bullet>
                <Bullet>
                  You can view status at any time (queued, processing, completed,
                  failed).
                </Bullet>
                <Bullet>
                  Retry behavior may apply for failed items (for example,
                  temporary network errors).
                </Bullet>
              </ul>
            </Section>

            <Section id="backup" title="7. Encrypted export & backup" icon={<FaCloud />}>
              <p className="text-gray-300">
                NeuVault supports optional encrypted export/backup to a cloud
                provider of your choice (e.g., Google Drive, iCloud, Dropbox, or
                other storage).
              </p>

              <h3 className="text-lg font-semibold text-white mt-4">
                Encryption and restore
              </h3>
              <ul className="space-y-2 mt-2">
                <Bullet>
                  Backups are encrypted <strong className="text-white">before</strong> they leave your device.
                </Bullet>
                <Bullet>
                  Encryption uses a per-user key derived from secure server
                  infrastructure.
                </Bullet>
                <Bullet>Cloud providers cannot read your encrypted backup.</Bullet>
                <Bullet>
                  Encrypted backups are intended to be restored{" "}
                  <strong className="text-white">inside NeuVault</strong>.
                </Bullet>
              </ul>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                <p className="text-sm text-gray-300">
                  <strong className="text-white">Note:</strong> NeuVault does not store your backup contents in a readable
                  form. If you lose access to your account/device and have no
                  exported backup, we may not be able to recover your vault
                  content.
                </p>
              </div>
            </Section>

            <Section id="analytics" title="8. Analytics & diagnostics" icon={<FaBug />}>
              <p className="text-gray-300">
                We may collect limited, non-content diagnostics (e.g., crash
                reports, performance metrics, and error logs) to improve
                reliability.
              </p>
              <p className="text-gray-300">
                These diagnostics are intended to avoid including your vault
                content. If an error report includes text, it is typically
                technical information needed to debug the issue.
              </p>
            </Section>

            <Section
              id="admin-access"
              title="9. Administrative access & support operations"
              icon={<FaUserShield />}
            >
              <p className="text-gray-300">
                NeuVault uses restricted internal administrative tools to
                operate the service, resolve support incidents, enforce security
                controls, and manage billing/account issues.
              </p>
              <ul className="space-y-2">
                <Bullet>
                  Administrative actions are limited to authorized personnel
                  with role-based access.
                </Bullet>
                <Bullet>
                  Administrative access is purpose-limited (for example:
                  account disable/re-enable, session revocation, notification
                  troubleshooting, and billing corrections).
                </Bullet>
                <Bullet>
                  High-risk actions require an internal reason and are recorded
                  in immutable audit logs (who, what, when, and before/after
                  state where applicable).
                </Bullet>
                <Bullet>
                  We do not use administrative access for advertising,
                  profiling, or unrelated processing.
                </Bullet>
              </ul>
            </Section>

            <Section
              id="appstore"
              title="10. App Store privacy summary (iOS)"
              icon={<FaShieldAlt />}
            >
              <p className="text-gray-300">
                This section summarizes NeuVault{"'"}s data handling in App Store
                privacy terms.
              </p>
              <ul className="space-y-2">
                <Bullet>
                  <strong className="text-white">No tracking:</strong> NeuVault does not
                  track you across third-party apps, websites, or services for
                  advertising.
                </Bullet>
                <Bullet>
                  <strong className="text-white">
                    Account-linked data we may process:
                  </strong>{" "}
                  email/contact info, account/session identifiers, subscription or
                  purchase status, and limited diagnostics.
                </Bullet>
                <Bullet>
                  <strong className="text-white">User content:</strong> documents,
                  notes, images, and audio you submit are processed only to deliver
                  requested features (for example intake, search, summaries, and
                  transcription).
                </Bullet>
                <Bullet>
                  <strong className="text-white">Third-party content rights:</strong>{" "}
                  users are responsible for ensuring they have the right to upload,
                  store, or share any third-party content in NeuVault.
                </Bullet>
              </ul>
            </Section>

            <Section id="retention" title="11. Data retention" icon={<FaLock />}>
              <ul className="space-y-2">
                <Bullet>Account data is retained while your account remains active.</Bullet>
                <Bullet>
                  You may request deletion of your account at any time.
                </Bullet>
                <Bullet>
                  Account deletion removes server-side account metadata (such as
                  email/username) and associated authentication records.
                </Bullet>
                <Bullet>
                  Deleting your account does not automatically delete local vault
                  content unless you remove the app or delete local data in-app.
                </Bullet>
              </ul>
            </Section>

            <Section id="account-deletion" title="12. Account deletion" icon={<FaTrash />}>
              <p className="text-gray-300">
                You can request account deletion directly in the app (Settings &gt; Delete
                Account) or by using our public account deletion page:
              </p>
              <p>
                <Link href="/account-deletion" className="text-[#6DD1FF] hover:underline">
                  neuvault.app/account-deletion
                </Link>
              </p>
              <ul className="space-y-2">
                <Bullet>
                  Account deletion removes server-side account metadata and authentication
                  records.
                </Bullet>
                <Bullet>
                  Local vault content on your device is not removed by server-side account
                  deletion.
                </Bullet>
              </ul>
            </Section>

            <Section id="rights" title="13. Your rights" icon={<FaUserShield />}>
              <p className="text-gray-300">
                Depending on your jurisdiction, you may have rights to access,
                correct, or delete your account data, and to withdraw consent
                for optional processing. Contact us at{" "}
                <a
                  className="text-[#6DD1FF] hover:underline"
                  href={`mailto:${PRIVACY_EMAIL}`}
                >
                  {PRIVACY_EMAIL}
                </a>
                .
              </p>
            </Section>

            <Section id="children" title="14. Children’s privacy" icon={<FaShieldAlt />}>
              <p className="text-gray-300">
                NeuVault is not intended for children under 13, and we do not
                knowingly collect personal data from children.
              </p>
            </Section>

            <Section id="security" title="15. Security" icon={<FaLock />}>
              <p className="text-gray-300">
                We use industry-standard security practices to protect account
                data and provide encrypted exports, including secure transport
                (TLS) and authenticated access controls.
              </p>
              <p className="text-gray-300">
                You are responsible for safeguarding your device, your account
                credentials, and access to your cloud backup location.
              </p>
            </Section>

            <Section id="changes" title="16. Changes to this policy" icon={<FaFileAlt />}>
              <p className="text-gray-300">
                We may update this policy to reflect product changes or legal
                requirements. When we do, we will update the effective date and
                communicate material changes clearly.
              </p>
            </Section>

            <Section id="contact" title="17. Contact" icon={<FaUserShield />}>
              <p className="text-gray-300">
                For privacy questions or requests, contact:
              </p>

              <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                <p className="text-sm text-gray-300">
                  Email:{" "}
                  <a
                    className="text-[#6DD1FF] hover:underline"
                    href={`mailto:${PRIVACY_EMAIL}`}
                  >
                    {PRIVACY_EMAIL}
                  </a>
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Chip icon={<FaTrash />} label="Request account deletion via email" />
                <Chip icon={<FaLock />} label="No document files stored in server DB" />
              </div>
            </Section>

            {/* Footer note */}
            <div className="pt-6 border-t border-white/10 text-sm text-gray-500">
              NeuVault — Your data. Your device. Your control.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

