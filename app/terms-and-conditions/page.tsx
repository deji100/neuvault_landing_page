"use client";

import Link from "next/link";
import {
  Ban,
  Bell,
  Bot,
  Cloud,
  CreditCard,
  FileText,
  Gavel,
  Lock,
  Mail,
  RefreshCw,
  Shield,
  Trash2,
  TriangleAlert,
  UserCheck,
  Wifi,
} from "lucide-react";

import { Bullets, Callout, LegalPage, MetaPill, Section, type TocItem } from "@/components/specific/legal/Legal";

const EFFECTIVE_DATE = "February 11, 2026"; // update when needed
const SUPPORT_EMAIL = "support@neuvault.app";

const toc: TocItem[] = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "eligibility", label: "Eligibility" },
  { id: "accounts", label: "Accounts & security" },
  { id: "your-data", label: "Your data & ownership" },
  { id: "ai", label: "AI features & limitations" },
  { id: "suggestions", label: "Smart Suggestions & reminders" },
  { id: "export", label: "Encrypted export & restore" },
  { id: "payments", label: "Plans, billing, and credits" },
  { id: "acceptable-use", label: "Acceptable use" },
  { id: "third-parties", label: "Third-party services" },
  { id: "availability", label: "Availability & changes" },
  { id: "termination", label: "Termination" },
  { id: "account-deletion", label: "Account deletion" },
  { id: "liability", label: "Disclaimers & limitation of liability" },
  { id: "law", label: "Governing law" },
  { id: "changes", label: "Changes to these Terms" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lede={
        <>
          These Terms govern your access to and use of NeuVault (“NeuVault”,
          “we”, “our”, “us”). By using the app, you agree to these Terms and
          our Privacy Policy.
        </>
      }
      meta={
        <>
          <MetaPill icon={Gavel}>Effective: {EFFECTIVE_DATE}</MetaPill>
          <MetaPill icon={Mail} href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </MetaPill>
          <MetaPill icon={Shield}>Privacy-first • Local-first</MetaPill>
        </>
      }
      highlights={[
        { icon: Lock, label: "You own your vault content" },
        { icon: Bot, label: "AI outputs may be inaccurate" },
        { icon: Wifi, label: "Offline actions may queue" },
        { icon: Cloud, label: "Encrypted export before backup" },
      ]}
      toc={toc}
      footnote="NeuVault — Privacy first. Ownership always."
    >
      <Section id="acceptance" title="1. Acceptance of Terms" icon={FileText}>
        <p>
          By downloading, accessing, or using NeuVault (the “App”), you agree
          to be bound by these Terms and our Privacy Policy.
        </p>
        <p>If you do not agree, do not use NeuVault.</p>
      </Section>

      <Section id="eligibility" title="2. Eligibility" icon={UserCheck}>
        <Bullets>
          <li>You must be at least 13 years old to use NeuVault.</li>
          <li>
            If you are under 18, you confirm a parent/guardian has consented.
          </li>
        </Bullets>
      </Section>

      <Section id="accounts" title="3. Accounts & security" icon={Lock}>
        <Bullets>
          <li>
            You are responsible for maintaining the confidentiality of your
            account and access to your device.
          </li>
          <li>
            You agree not to access or attempt to access other users’ accounts
            or vaults.
          </li>
          <li>
            If you believe your account has been compromised, contact{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}

            >
              {SUPPORT_EMAIL}
            </a>
            .
          </li>
        </Bullets>
      </Section>

      <Section id="your-data" title="4. Your data & ownership" icon={Shield}>
        <p>
          You retain full ownership of the documents, files, notes, audio, and
          other content you store in NeuVault (“Your Content”).
        </p>
        <Bullets>
          <li>
            Your vault content is stored locally on your device by default.
          </li>
          <li>
            NeuVault does not claim ownership over Your Content.
          </li>
          <li>
            You are responsible for keeping your device secure and maintaining
            your own backups.
          </li>
        </Bullets>

        <Callout>
          <p>
            <strong>Backup responsibility:</strong> NeuVault provides tools for encrypted export,
            but NeuVault is not a guaranteed backup service. You are
            responsible for storing your exported backups safely.
          </p>
        </Callout>
      </Section>

      <Section id="ai" title="5. AI features & limitations" icon={Bot}>
        <p>
          NeuVault may offer AI-powered features such as Smart Intake
          (summaries/tags/grouping), voice transcription, Smart Suggestions,
          and the Nova Assistant.
        </p>

        <h3>
          Smart Intake (automatic processing)
        </h3>
        <Bullets>
          <li>
            Smart Intake may automatically process content you add to generate
            summaries, tags, and organization metadata.
          </li>
          <li>
            If you are offline, intake items may be queued and processed when
            you regain internet access.
          </li>
        </Bullets>

        <h3>
          AI output disclaimer
        </h3>
        <Bullets>
          <li>
            AI-generated summaries, tags, suggestions, transcripts, and answers
            are provided for informational purposes and may be inaccurate,
            incomplete, or outdated.
          </li>
          <li>
            You are responsible for reviewing and verifying outputs before
            relying on them—especially for legal, medical, financial, or
            compliance decisions.
          </li>
        </Bullets>

        <h3>
          No guaranteed results
        </h3>
        <p>
          We do not guarantee that AI features will identify every deadline,
          renewal, event date, or relevant detail.
        </p>
      </Section>

      <Section id="suggestions" title="6. Smart Suggestions & reminders" icon={Bell}>
        <Bullets>
          <li>
            Smart Suggestions runs only when you initiate it (where available).
          </li>
          <li>
            Deadline/renewal insights may be shown only during Smart
            Suggestions runs.
          </li>
          <li>
            Reminders and resurfacing notifications trigger only if you set
            them on a document or group.
          </li>
          <li>
            Notifications may not be delivered due to OS settings, device
            restrictions, network issues, or user configuration. You are
            responsible for keeping critical reminders elsewhere if needed.
          </li>
        </Bullets>
      </Section>

      <Section id="export" title="7. Encrypted export & restore" icon={Cloud}>
        <p>
          NeuVault may allow you to export an encrypted backup bundle to a
          storage provider you choose (e.g., Google Drive, iCloud, Dropbox, or
          other storage).
        </p>
        <Bullets>
          <li>
            Export bundles are encrypted before leaving your device.
          </li>
          <li>
            You are responsible for safeguarding access to your exported files
            and your cloud account(s).
          </li>
          <li>
            If you lose access to your account/device and do not have an
            exported backup, NeuVault may not be able to recover Your Content.
          </li>
        </Bullets>
      </Section>

      <Section id="payments" title="8. Plans, billing, and credits" icon={CreditCard}>
        <p>
          NeuVault may offer subscriptions, usage-based credits, or both.
          Availability and pricing may vary by platform.
        </p>

        <Bullets>
          <li>
            Purchases made on iOS are processed through Apple In-App Purchase
            (IAP) where required.
          </li>
          <li>
            Credits (if offered) may be consumed when you use AI-powered
            processing features (e.g., summaries, transcription, assistant
            tasks).
          </li>
          <li>
            Credits are not legal tender, have no cash value, and are not
            transferable or resellable.
          </li>
        </Bullets>

        <Callout>
          <p>
            <strong>Refunds:</strong> If you purchase through Apple, refunds are handled under
            Apple’s policies. For other platforms, refunds (if any) follow the
            rules shown at purchase time.
          </p>
        </Callout>
      </Section>

      <Section id="acceptable-use" title="9. Acceptable use" icon={Ban}>
        <p>You agree not to:</p>
        <Bullets>
          <li>Use NeuVault for illegal activities.</li>
          <li>
            Upload, store, or process content that you do not have the right
            to possess or use.
          </li>
          <li>
            Attempt to reverse engineer, bypass security, or interfere with
            the app’s integrity.
          </li>
          <li>
            Use AI features to generate or facilitate unlawful conduct.
          </li>
          <li>
            Abuse the service (e.g., automated scraping, excessive requests,
            or attempts to overload systems).
          </li>
        </Bullets>
      </Section>

      <Section id="third-parties" title="10. Third-party services" icon={Cloud}>
        <p>
          NeuVault may integrate with third-party services you choose to use,
          such as cloud storage providers (for export) and AI processing
          providers (to deliver AI features).
        </p>
        <Bullets>
          <li>
            Third-party services have their own terms and privacy policies.
          </li>
          <li>
            NeuVault is not responsible for outages, data loss, or policy
            changes of third-party providers.
          </li>
        </Bullets>
      </Section>

      <Section id="availability" title="11. Availability & changes" icon={RefreshCw}>
        <p>NeuVault is provided “as is” and may change over time.</p>
        <Bullets>
          <li>Features may be added, modified, or removed.</li>
          <li>
            We do not guarantee uninterrupted availability or error-free
            operation.
          </li>
          <li>
            Some features may require internet access and may be unavailable
            offline.
          </li>
        </Bullets>
      </Section>

      <Section id="termination" title="12. Termination" icon={Ban}>
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

      <Section id="account-deletion" title="13. Account deletion" icon={Trash2}>
        <p>
          You can request account deletion in-app from Settings &gt; Delete Account or
          through our account deletion page:
        </p>
        <p>
          <Link href="/account-deletion">
            neuvault.app/account-deletion
          </Link>
        </p>
        <Bullets>
          <li>
            Account deletion removes server-side account records and authentication records.
          </li>
          <li>
            Account deletion does not automatically remove local vault content stored on
            your device.
          </li>
        </Bullets>
      </Section>

      <Section id="liability" title="14. Disclaimers & limitation of liability" icon={TriangleAlert}>
        <p>
          To the maximum extent permitted by law, NeuVault disclaims all
          warranties, express or implied, including fitness for a particular
          purpose and non-infringement.
        </p>
        <Bullets>
          <li>
            NeuVault is not liable for data loss caused by device failure,
            OS issues, user error, or loss of exported backups.
          </li>
          <li>
            NeuVault is not liable for decisions made based on AI outputs.
          </li>
          <li>
            NeuVault is not responsible for the third-party services you
            choose to use (including cloud storage providers).
          </li>
        </Bullets>
      </Section>

      <Section id="law" title="15. Governing law" icon={Gavel}>
        <p>
          These Terms are governed by applicable laws in your jurisdiction,
          without regard to conflict-of-law principles.
        </p>
      </Section>

      <Section id="changes" title="16. Changes to these Terms" icon={FileText}>
        <p>
          We may update these Terms to reflect product or legal changes. We
          will update the effective date above. Continued use after changes
          means acceptance.
        </p>
      </Section>

      <Section id="contact" title="17. Contact" icon={UserCheck}>
        <p>For questions about these Terms, contact:</p>
        <Callout>
          <p>
            Email:{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}

            >
              {SUPPORT_EMAIL}
            </a>
          </p>
        </Callout>
      </Section>
    </LegalPage>
  );
}
