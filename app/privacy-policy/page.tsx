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
} from "react-icons/fa";

const EFFECTIVE_DATE = "January 15, 2026"; // change anytime
const PRIVACY_EMAIL = "privacy@neuvault.app"; // change to your real inbox

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
            policy explains what we collect, what we do not collect, and how
            your data is handled.
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
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sticky TOC */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
              <p className="text-sm font-semibold text-white mb-3">
                On this page
              </p>
              <nav className="space-y-2 text-sm">
                {[
                  ["principles", "Core principles"],
                  ["collect", "What we collect"],
                  ["documents", "Your documents & content"],
                  ["ai", "AI & data processing"],
                  ["backup", "Encrypted export & backup"],
                  ["notifications", "Notifications"],
                  ["analytics", "Analytics & diagnostics"],
                  ["retention", "Data retention"],
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
            <Section id="principles" title="1. Core privacy principles" icon={<FaShieldAlt />}>
              <ul className="space-y-2">
                <Bullet>
                  <strong className="text-white">You own your data.</strong>
                </Bullet>
                <Bullet>
                  <strong className="text-white">Your documents stay on your device by default.</strong>
                </Bullet>
                <Bullet>
                  <strong className="text-white">
                    We do not store or read your documents on our servers.
                  </strong>
                </Bullet>
                <Bullet>
                  Cloud backup is optional, encrypted, and controlled by you.
                </Bullet>
                <Bullet>
                  AI runs only when you choose and only on the data required.
                </Bullet>
              </ul>
            </Section>

            <Section id="collect" title="2. What we collect" icon={<FaUserShield />}>
              <p className="text-gray-300">
                NeuVault collects <strong className="text-white">minimal account data</strong> required
                for authentication and essential communication:
              </p>
              <ul className="space-y-2">
                <Bullet>Email address</Bullet>
                <Bullet>Username (if you choose to provide one)</Bullet>
              </ul>
              <p className="text-gray-300">
                We do <strong className="text-white">not</strong> collect your documents, document content,
                or private vault data.
              </p>
            </Section>

            <Section id="documents" title="3. Your documents & content" icon={<FaFileAlt />}>
              <p className="text-gray-300">
                <strong className="text-white">NeuVault does not store your documents on our servers.</strong>
              </p>
              <p className="text-gray-300">
                Your PDFs, Word/Excel files, scans, document images, and notes are stored locally on your device.
                We cannot see, access, or recover your vault content.
              </p>
            </Section>

            <Section id="ai" title="4. AI & data processing" icon={<FaRobot />}>
              <p className="text-gray-300">
                NeuVault includes AI features such as smart intake (summaries/tags/grouping),
                smart suggestions (deadlines and event detection), and the Nova assistant.
              </p>
              <h3 className="text-lg font-semibold text-white mt-4">How AI access works</h3>
              <ul className="space-y-2 mt-2">
                <Bullet>
                  AI processes <strong className="text-white">only the content required</strong> for your requested task.
                </Bullet>
                <Bullet>
                  You can choose <strong className="text-white">quick/limited</strong> processing (metadata only)
                  or <strong className="text-white">deep insights</strong> (full document), depending on your settings.
                </Bullet>
                <Bullet>You can disable or restrict AI features at any time.</Bullet>
              </ul>
              <h3 className="text-lg font-semibold text-white mt-4">No training on your data</h3>
              <p className="text-gray-300">
                Your vault content is <strong className="text-white">never used to train AI models</strong>.
              </p>
            </Section>

            <Section id="backup" title="5. Encrypted export & backup" icon={<FaCloud />}>
              <p className="text-gray-300">
                NeuVault supports optional encrypted export/backup to a cloud provider of your choice
                (e.g., Google Drive, iCloud, Dropbox, or other storage).
              </p>
              <h3 className="text-lg font-semibold text-white mt-4">Encryption</h3>
              <ul className="space-y-2 mt-2">
                <Bullet>Backups are encrypted before leaving your device.</Bullet>
                <Bullet>Cloud providers cannot read your encrypted backup.</Bullet>
                <Bullet>
                  Encrypted backups are intended to be restored <strong className="text-white">inside NeuVault</strong>.
                </Bullet>
              </ul>
            </Section>

            <Section id="notifications" title="6. Notifications" icon={<FaBell />}>
              <p className="text-gray-300">
                NeuVault may send notifications for backup reminders, smart suggestion prompts, and resurfacing
                reminders you configure. Notifications do not include your document contents.
              </p>
            </Section>

            <Section id="analytics" title="7. Analytics & diagnostics" icon={<FaBug />}>
              <p className="text-gray-300">
                We may collect limited, non-content diagnostics (e.g., crash reports) to improve performance
                and reliability. These logs do not include your document content.
              </p>
            </Section>

            <Section id="retention" title="8. Data retention" icon={<FaLock />}>
              <ul className="space-y-2">
                <Bullet>Account data is retained while your account remains active.</Bullet>
                <Bullet>You may request deletion of your account at any time.</Bullet>
                <Bullet>
                  Deleting your account does not automatically delete local vault content unless you remove the app.
                </Bullet>
              </ul>
            </Section>

            <Section id="rights" title="9. Your rights" icon={<FaUserShield />}>
              <p className="text-gray-300">
                Depending on your jurisdiction, you may have rights to access, correct, or delete your account data,
                and to withdraw consent for optional processing. Contact us at{" "}
                <a className="text-[#6DD1FF] hover:underline" href={`mailto:${PRIVACY_EMAIL}`}>
                  {PRIVACY_EMAIL}
                </a>
                .
              </p>
            </Section>

            <Section id="children" title="10. Children’s privacy" icon={<FaShieldAlt />}>
              <p className="text-gray-300">
                NeuVault is not intended for children under 13, and we do not knowingly collect data from children.
              </p>
            </Section>

            <Section id="security" title="11. Security" icon={<FaLock />}>
              <p className="text-gray-300">
                We use industry-standard security practices to protect account data and support encryption integrity.
                You are responsible for safeguarding your device and any backup keys you control.
              </p>
            </Section>

            <Section id="changes" title="12. Changes to this policy" icon={<FaFileAlt />}>
              <p className="text-gray-300">
                We may update this policy to reflect product changes or legal requirements. When we do, we will update
                the effective date and communicate material changes clearly.
              </p>
            </Section>

            <Section id="contact" title="13. Contact" icon={<FaUserShield />}>
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
