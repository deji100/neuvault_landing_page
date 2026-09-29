"use client";

import Link from "next/link";
import {
  Bell,
  Bot,
  Bug,
  CalendarDays,
  Cloud,
  FileText,
  Lock,
  Mail,
  Shield,
  Trash2,
  UserCheck,
  Wifi,
} from "lucide-react";

import { Bullets, Callout, Chip, Chips, LegalPage, MetaPill, Section, type TocItem } from "@/components/specific/legal/Legal";

const EFFECTIVE_DATE = "July 14, 2026";
const PRIVACY_EMAIL = "support@neuvault.app";

const toc: TocItem[] = [
  { id: "principles", label: "Core principles" },
  { id: "collect", label: "What we collect" },
  { id: "documents", label: "Your documents & local storage" },
  { id: "email-integrations", label: "Email integrations & Google user data" },
  { id: "ai", label: "AI & data processing" },
  { id: "suggestions", label: "Smart Suggestions & Resurfacing" },
  { id: "offline", label: "Offline queue & processing" },
  { id: "backup", label: "Encrypted export & backup" },
  { id: "analytics", label: "Analytics & diagnostics" },
  { id: "admin-access", label: "Administrative access & support operations" },
  { id: "appstore", label: "App Store privacy summary (iOS)" },
  { id: "retention", label: "Data retention" },
  { id: "account-deletion", label: "Account deletion" },
  { id: "rights", label: "Your rights" },
  { id: "children", label: "Children’s privacy" },
  { id: "security", label: "Security" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lede={
        <>
          NeuVault is built on a privacy-first, local-first philosophy. This
          policy explains what we collect, what we do not collect, and how AI,
          connected email accounts, offline queues, encrypted exports, and
          platform privacy disclosures work.
        </>
      }
      meta={
        <>
          <MetaPill icon={CalendarDays}>Effective: {EFFECTIVE_DATE}</MetaPill>
          <MetaPill icon={Mail} href={`mailto:${PRIVACY_EMAIL}`}>
            {PRIVACY_EMAIL}
          </MetaPill>
          <MetaPill icon={Shield}>Local-first • Privacy-first</MetaPill>
        </>
      }
      highlights={[
        { icon: FileText, label: "Vault stored on-device by default" },
        { icon: Bot, label: "AI processing is temporary & purpose-limited" },
        { icon: Cloud, label: "Encrypted export before backup" },
        { icon: Wifi, label: "Offline actions queue until online" },
      ]}
      toc={toc}
      footnote="NeuVault — Your data. Your device. Your control."
    >
      <Section
        id="principles"
        title="1. Core privacy principles"
        icon={Shield}
      >
        <Bullets>
          <li>
            <strong>You own your data.</strong>
          </li>
          <li>
            <strong>
              Your vault content is stored on your device by default.
            </strong>
          </li>
          <li>
            <strong>
              We do not permanently store your document files on our
              servers.
            </strong>
          </li>
          <li>
            AI processing occurs only to provide specific app features and
            is designed to be temporary and purpose-limited.
          </li>
          <li>
            Encrypted export/backup is optional and controlled by you.
          </li>
        </Bullets>
      </Section>

      <Section id="collect" title="2. What we collect" icon={UserCheck}>
        <p>
          NeuVault collects <strong>minimal account data</strong> required
          for authentication and basic support:
        </p>

        <Bullets>
          <li>Email address</li>
          <li>Username (optional)</li>
          <li>Authentication/session tokens</li>
        </Bullets>

        <p>
          We do <strong>not</strong> collect or permanently store your
          vault documents or your document files in our database.
        </p>
      </Section>

      <Section
        id="documents"
        title="3. Your documents & local storage"
        icon={FileText}
      >
        <p>
          Your vault content — including PDFs, Word/Excel files, scans,
          document images, notes, and audio recordings — is stored locally
          on your device.
        </p>

        <p>
          NeuVault is designed so we cannot browse your vault on our
          servers, because your vault files are not stored there.
        </p>

        <p>
          <strong>Important:</strong> If you remove the app without exporting
          a backup, your local vault data may be permanently lost.
        </p>
      </Section>

      <Section
        id="email-integrations"
        title="4. Email integrations & Google user data"
        icon={Mail}
      >
        <p>
          NeuVault Desktop lets you optionally connect supported email
          accounts to find and import document attachments. Connecting an
          email account is optional and requires your affirmative consent.
        </p>

        <h3>
          Gmail data NeuVault accesses
        </h3>
        <p>
          If you connect Gmail, NeuVault requests the read-only{" "}
          <code>gmail.readonly</code> permission,
          together with basic Google account identity information needed
          to identify the connected account. Depending on how you use the
          feature, NeuVault may access:
        </p>
        <Bullets>
          <li>Your connected Google account identifier, name, and email address.</li>
          <li>
            Gmail message identifiers, sender, subject, received date,
            labels, and attachment filenames, types, and sizes.
          </li>
          <li>
            The Gmail message structure needed to locate attachments and
            the content of attachments you choose to import or that match
            Automatic import rules you enable.
          </li>
        </Bullets>
        <p>
          NeuVault does not request permission to send, edit, move, or
          delete Gmail messages. Email bodies are not imported as
          standalone vault documents.
        </p>

        <h3>
          How email data is used
        </h3>
        <Bullets>
          <li>Search for messages containing supported document attachments.</li>
          <li>
            Display attachment details so you can decide what to import.
          </li>
          <li>
            Import selected attachments, or matching attachments received
            within a start-and-end date range you choose when you enable
            Automatic import.
          </li>
          <li>
            Process imported documents for user-facing NeuVault features,
            such as searchable records, summaries, tags, reminders, and
            related-document suggestions.
          </li>
        </Bullets>

        <h3>
          Storage, sharing, and security
        </h3>
        <Bullets>
          <li>
            OAuth access and refresh tokens are stored locally on your
            device using operating-system-provided secure storage where
            available.
          </li>
          <li>
            Email attachment metadata and imported documents are stored in
            your local NeuVault data. Temporary attachment copies are used
            only to complete import and processing.
          </li>
          <li>
            Imported attachment content may be securely transmitted to
            purpose-limited service providers only as necessary to provide
            the NeuVault processing features you request.
          </li>
          <li>
            Google user data is not sold, used for advertising, used to
            determine creditworthiness, or used to train or improve a
            generalized AI or machine-learning model.
          </li>
          <li>
            NeuVault personnel do not read Google user data except with
            your explicit consent for specific support, when necessary for
            security, or when required by law.
          </li>
        </Bullets>

        <h3>
          Disconnecting Gmail and deleting imported data
        </h3>
        <p>
          You can disconnect Gmail from Email Documents &gt; Accounts &amp;
          rules. NeuVault will attempt to revoke Google access and removes
          the locally stored Gmail authorization for that account.
          Documents already imported into your vault remain under your
          control until you delete them from NeuVault. You can also revoke
          NeuVault from your Google Account permissions.
        </p>

        <Callout>
          <p>
            NeuVault&apos;s use and transfer of information received from
            Google APIs adheres to the{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noreferrer"

            >
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>
        </Callout>
      </Section>

      <Section id="ai" title="5. AI & data processing" icon={Bot}>
        <p>
          NeuVault includes AI-powered features such as Smart Intake
          (automatic summaries, tagging, grouping), Smart Suggestions, Nova
          Assistant, and voice transcription.
        </p>

        <Callout>
          <p>
            <strong>Key point:</strong> AI processing may occur on secure third-party AI
            infrastructure in order to provide these features.
          </p>
        </Callout>

        <h3>
          What is transmitted for processing
        </h3>

        <Bullets>
          <li>
            Only the content necessary to perform the feature is
            transmitted (for example, extracted text for summarization or
            an audio file for transcription).
          </li>
          <li>
            We do not intentionally include unrelated vault items in a
            processing request.
          </li>
          <li>
            Processing is designed to be temporary and used only to return
            outputs (summaries, tags, metadata, transcripts, or assistant
            responses).
          </li>
        </Bullets>

        <h3>
          Smart Intake (automatic processing)
        </h3>

        <p>
          Smart Intake automatically generates summaries, tags, and
          organization metadata when you add content (documents, scans,
          images, notes, or audio).
        </p>

        <Bullets>
          <li>
            If you are offline, the intake item is queued locally and
            processed when you regain internet access.
          </li>
          <li>
            Outputs are stored in your on-device vault database.
          </li>
        </Bullets>

        <h3>
          Deep insights vs quick/limited mode
        </h3>
        <p>
          Some features allow you to control processing depth (for
          example, quick/limited mode vs deep insights). When enabled,
          deep insights may process more of a document in order to provide
          more detailed responses.
        </p>

        <h3>
          No training on your vault content
        </h3>
        <p>
          Your vault content is <strong>not used to train</strong> NeuVault models. We
          design our system so your vault content is processed only to
          provide app features.
        </p>
      </Section>

      <Section
        id="suggestions"
        title="6. Smart Suggestions & Resurfacing"
        icon={Bell}
      >
        <Bullets>
          <li>
            <strong>Smart Suggestions runs only when you initiate it.</strong>
          </li>
          <li>
            Deadline, event date, and renewal detection occurs only during
            Smart Suggestions runs.
          </li>
          <li>
            Resurfacing reminders trigger only if you explicitly set them
            on a document or a linked group.
          </li>
          <li>
            Notifications do not include your document contents.
          </li>
        </Bullets>
      </Section>

      <Section id="offline" title="7. Offline queue & processing" icon={Wifi}>
        <p>
          NeuVault supports offline-first capture. If you add content while
          offline (uploads, scans, images, notes, voice recordings, or
          audio uploads), NeuVault stores the item locally and queues it.
        </p>

        <Bullets>
          <li>Queued items are processed once internet access is available.</li>
          <li>
            You can view status at any time (queued, processing, completed,
            failed).
          </li>
          <li>
            Retry behavior may apply for failed items (for example,
            temporary network errors).
          </li>
        </Bullets>
      </Section>

      <Section id="backup" title="8. Encrypted export & backup" icon={Cloud}>
        <p>
          NeuVault supports optional encrypted export/backup to a cloud
          provider of your choice (e.g., Google Drive, iCloud, Dropbox, or
          other storage).
        </p>

        <h3>
          Encryption and restore
        </h3>
        <Bullets>
          <li>
            Backups are encrypted <strong>before</strong> they leave your device.
          </li>
          <li>
            Encryption uses a per-user key derived from secure server
            infrastructure.
          </li>
          <li>Cloud providers cannot read your encrypted backup.</li>
          <li>
            Encrypted backups are intended to be restored{" "}
            <strong>inside NeuVault</strong>.
          </li>
        </Bullets>

        <Callout>
          <p>
            <strong>Note:</strong> NeuVault does not store your backup contents in a readable
            form. If you lose access to your account/device and have no
            exported backup, we may not be able to recover your vault
            content.
          </p>
        </Callout>
      </Section>

      <Section id="analytics" title="9. Analytics & diagnostics" icon={Bug}>
        <p>
          We may collect limited, non-content diagnostics (e.g., crash
          reports, performance metrics, and error logs) to improve
          reliability.
        </p>
        <p>
          These diagnostics are intended to avoid including your vault
          content. If an error report includes text, it is typically
          technical information needed to debug the issue.
        </p>
      </Section>

      <Section
        id="admin-access"
        title="10. Administrative access & support operations"
        icon={UserCheck}
      >
        <p>
          NeuVault uses restricted internal administrative tools to
          operate the service, resolve support incidents, enforce security
          controls, and manage billing/account issues.
        </p>
        <Bullets>
          <li>
            Administrative actions are limited to authorized personnel
            with role-based access.
          </li>
          <li>
            Administrative access is purpose-limited (for example:
            account disable/re-enable, session revocation, notification
            troubleshooting, and billing corrections).
          </li>
          <li>
            High-risk actions require an internal reason and are recorded
            in immutable audit logs (who, what, when, and before/after
            state where applicable).
          </li>
          <li>
            We do not use administrative access for advertising,
            profiling, or unrelated processing.
          </li>
        </Bullets>
      </Section>

      <Section
        id="appstore"
        title="11. Platform privacy summary"
        icon={Shield}
      >
        <p>
          This section summarizes NeuVault{"'"}s data handling across its
          mobile and desktop applications.
        </p>
        <Bullets>
          <li>
            <strong>No tracking:</strong> NeuVault does not
            track you across third-party apps, websites, or services for
            advertising.
          </li>
          <li>
            <strong>
              Account-linked data we may process:
            </strong>{" "}
            email/contact info, account/session identifiers, subscription or
            purchase status, and limited diagnostics.
          </li>
          <li>
            <strong>User content:</strong> documents,
            notes, images, audio, and email attachments you submit are
            processed only to deliver requested features (for example
            intake, search, summaries, and transcription).
          </li>
          <li>
            <strong>Third-party content rights:</strong>{" "}
            users are responsible for ensuring they have the right to upload,
            store, or share any third-party content in NeuVault.
          </li>
        </Bullets>
      </Section>

      <Section id="retention" title="12. Data retention" icon={Lock}>
        <Bullets>
          <li>Account data is retained while your account remains active.</li>
          <li>
            You may request deletion of your account at any time.
          </li>
          <li>
            Account deletion removes server-side account metadata (such as
            email/username) and associated authentication records.
          </li>
          <li>
            Deleting your account does not automatically delete local vault
            content unless you remove the app or delete local data in-app.
          </li>
          <li>
            Disconnecting Gmail revokes or removes NeuVault&apos;s stored
            authorization, but does not automatically delete documents you
            already imported into your local vault.
          </li>
        </Bullets>
      </Section>

      <Section id="account-deletion" title="13. Account deletion" icon={Trash2}>
        <p>
          You can request account deletion directly in the app (Settings &gt; Delete
          Account) or by using our public account deletion page:
        </p>
        <p>
          <Link href="/account-deletion">
            neuvault.app/account-deletion
          </Link>
        </p>
        <Bullets>
          <li>
            Account deletion removes server-side account metadata and authentication
            records.
          </li>
          <li>
            Local vault content on your device is not removed by server-side account
            deletion.
          </li>
        </Bullets>
      </Section>

      <Section id="rights" title="14. Your rights" icon={UserCheck}>
        <p>
          Depending on your jurisdiction, you may have rights to access,
          correct, or delete your account data, and to withdraw consent
          for optional processing. Contact us at{" "}
          <a

            href={`mailto:${PRIVACY_EMAIL}`}
          >
            {PRIVACY_EMAIL}
          </a>
          .
        </p>
      </Section>

      <Section id="children" title="15. Children’s privacy" icon={Shield}>
        <p>
          NeuVault is not intended for children under 13, and we do not
          knowingly collect personal data from children.
        </p>
      </Section>

      <Section id="security" title="16. Security" icon={Lock}>
        <p>
          We use industry-standard security practices to protect account
          data and provide encrypted exports, including secure transport
          (TLS) and authenticated access controls.
        </p>
        <p>
          You are responsible for safeguarding your device, your account
          credentials, and access to your cloud backup location.
        </p>
      </Section>

      <Section id="changes" title="17. Changes to this policy" icon={FileText}>
        <p>
          We may update this policy to reflect product changes or legal
          requirements. When we do, we will update the effective date and
          communicate material changes clearly.
        </p>
      </Section>

      <Section id="contact" title="18. Contact" icon={UserCheck}>
        <p>
          For privacy questions or requests, contact:
        </p>

        <Callout>
          <p>
            Email:{" "}
            <a

              href={`mailto:${PRIVACY_EMAIL}`}
            >
              {PRIVACY_EMAIL}
            </a>
          </p>
        </Callout>

        <Chips>
          <Chip icon={Trash2} label="Request account deletion via email" />
          <Chip icon={Lock} label="No document files stored in server DB" />
        </Chips>
      </Section>
    </LegalPage>
  );
}
