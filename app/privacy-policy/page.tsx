"use client";

import Link from "next/link";
import {
  Bell,
  Bot,
  CalendarDays,
  Clock,
  Cloud,
  CreditCard,
  FileText,
  KeyRound,
  Lock,
  Mail,
  Mic,
  Server,
  Share2,
  Shield,
  Trash2,
  UserCheck,
  Users,
} from "lucide-react";

import { Bullets, Callout, Chip, Chips, LegalPage, MetaPill, Section, type TocItem } from "@/components/specific/legal/Legal";

const EFFECTIVE_DATE = "October 3, 2026";
const PRIVACY_EMAIL = "support@neuvault.app";

const toc: TocItem[] = [
  { id: "summary", label: "The short version" },
  { id: "on-device", label: "What stays on your device" },
  { id: "processing", label: "How processing works" },
  { id: "server-data", label: "What we keep on our servers" },
  { id: "reminders", label: "Reminders & notifications" },
  { id: "email-integrations", label: "Email accounts & Google user data" },
  { id: "imports", label: "Imports, recordings & other people" },
  { id: "providers", label: "Service providers" },
  { id: "backup", label: "Encrypted backup" },
  { id: "sign-in", label: "Sign-in & device security" },
  { id: "payments", label: "Subscriptions & payments" },
  { id: "communications", label: "Emails we send" },
  { id: "feedback-board", label: "Feedback board" },
  { id: "diagnostics", label: "Diagnostics & no tracking" },
  { id: "staff-access", label: "Staff access" },
  { id: "retention", label: "How long we keep data" },
  { id: "account-deletion", label: "Deleting your account" },
  { id: "rights", label: "Your rights" },
  { id: "children", label: "Children" },
  { id: "security", label: "Security" },
  { id: "changes", label: "Changes & contact" },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lede={
        <>
          NeuVault keeps your documents, notes and recordings on your device. This policy explains exactly
          what is sent to our servers to process them, what we keep, for how long, and who helps us run the
          service. NeuVault is provided by NeuVault Technologies Limited.
        </>
      }
      meta={
        <>
          <MetaPill icon={CalendarDays}>Effective: {EFFECTIVE_DATE}</MetaPill>
          <MetaPill icon={Mail} href={`mailto:${PRIVACY_EMAIL}`}>
            {PRIVACY_EMAIL}
          </MetaPill>
          <MetaPill icon={Shield}>No ads • No tracking</MetaPill>
        </>
      }
      highlights={[
        { icon: FileText, label: "Your vault lives on your device" },
        { icon: Clock, label: "Processing results are deleted from our servers within an hour" },
        { icon: KeyRound, label: "Backups are sealed with a key only you hold" },
        { icon: Shield, label: "No advertising, no tracking, never sold" },
      ]}
      toc={toc}
      footnote="NeuVault — Your data. Your device. Your control."
    >
      <Section id="summary" title="1. The short version" icon={Shield}>
        <Bullets>
          <li>
            <strong>Your vault is stored on your device.</strong> Your documents, notes, recordings and the
            details NeuVault adds to them live in the app on your phone or computer.
          </li>
          <li>
            <strong>Some features need our servers.</strong> Reading a scan, writing a summary, transcribing a
            recording and answering Nova questions happen on our servers and with our service providers. We
            delete what we processed as soon as your device has it, and within an hour at most.
          </li>
          <li>
            <strong>We keep a small amount of account data</strong> so you can sign in, receive reminders and
            manage your subscription. Section 4 lists all of it.
          </li>
          <li>
            <strong>Backups are yours.</strong> They are sealed on your device with your Recovery Key, which we
            never receive, and saved wherever you choose.
          </li>
          <li>
            <strong>No ads, no tracking, no selling.</strong> We do not sell your data, use it for advertising,
            or use your content to train AI models.
          </li>
        </Bullets>
      </Section>

      <Section id="on-device" title="2. What stays on your device" icon={FileText}>
        <p>
          Your vault is stored locally in the NeuVault app: PDFs, Office files, scans, images, notes, voice notes
          and meeting recordings, along with their titles, summaries, tags, groups, links and reminders. Search runs
          on your device and works offline.
        </p>
        <Callout>
          <p>
            <strong>Important:</strong> because your vault lives on your device, removing the app or losing the
            device without a backup can permanently lose your vault. We cannot restore it for you.
          </p>
        </Callout>
      </Section>

      <Section id="processing" title="3. How processing works" icon={Bot}>
        <p>
          When you add something to NeuVault, it is sent securely to our servers so it can be understood and
          organized. Depending on what you add and the features you use, this can include:
        </p>
        <Bullets>
          <li>
            <strong>Organizing a document or image:</strong> the file, or the text read from it, is processed to
            produce a title, summary, tags, a group, key details such as names, amounts and dates, and any
            dates that may need a reminder. If the text cannot be read well, the whole file or page images may
            be processed.
          </li>
          <li>
            <strong>Transcribing a recording:</strong> the audio is processed into a structured note with an
            overview, key points and a transcript. In Meeting mode, speakers are labelled. A playable copy of the
            audio is prepared for your device.
          </li>
          <li>
            <strong>Nova, Vault Map suggestions and note writing:</strong> your question, the recent conversation
            and the details of the items you include are processed to answer. Deeper modes may include the full
            text of those items. Items you have marked as protected are shared only as basic details, not their
            contents.
          </li>
          <li>
            <strong>Web research:</strong> when you ask Nova to search the web, a search query based on your
            question is sent to a web search provider. Saving a web page fetches that page for you.
          </li>
          <li>
            <strong>Converting files:</strong> the content of a note or file you convert to PDF, Word or CSV is
            processed to create the new file.
          </li>
          <li>
            <strong>Password-protected PDFs:</strong> the password you enter is used only to open that file for
            processing. It is not stored.
          </li>
        </Bullets>

        <h3>Deleted within an hour</h3>
        <p>
          Once processing finishes, the result is sent back to your device and stored there. We then delete the
          file and its result from our servers automatically:
        </p>
        <Bullets>
          <li>Document results are deleted shortly after your device receives them.</li>
          <li>
            Recordings and transcripts are kept for up to an hour, so a large or interrupted audio download can be
            retried, then deleted.
          </li>
          <li>
            If your device cannot collect a result straight away, for example because it went offline or the app
            was closed during processing, we keep it briefly so your device can collect it when it reconnects
            without being charged again. In every case it is deleted within an hour.
          </li>
        </Bullets>
        <p>
          Adding content while offline is queued on your device and sent when you are back online.
        </p>
      </Section>

      <Section id="server-data" title="4. What we keep on our servers" icon={Server}>
        <p>To run your account and deliver reminders, our servers keep:</p>
        <Bullets>
          <li>
            <strong>Account details:</strong> your email address and optional username.
          </li>
          <li>
            <strong>Sign-in and devices:</strong> active sessions with the device name, platform and the IP
            address used to sign in; push notification tokens, an app-generated device identifier and app version
            for each device; your time zone and when you were last active.
          </li>
          <li>
            <strong>Reminders:</strong> for each date NeuVault finds or you set, the document&apos;s title, a short
            description, the date, the suggested action and its status. See section 5.
          </li>
          <li>
            <strong>Your organization settings:</strong> the areas of life you chose during setup and the names of
            your groups, so new items can be filed consistently across devices.
          </li>
          <li>
            <strong>Notification history and settings:</strong> the notifications we sent and your preferences.
          </li>
          <li>
            <strong>Subscription and credits:</strong> your plan, purchase status and a record of credit use per
            feature, such as pages read or minutes transcribed.
          </li>
          <li>
            <strong>Feedback and support messages</strong> you send us, with the app details you include.
          </li>
          <li>
            <strong>Server logs:</strong> IP address, device and browser type, the request made and when, used
            for security and to fix problems.
          </li>
        </Bullets>
        <p>
          We do not keep copies of your documents, recordings, notes, summaries or transcripts beyond the
          processing window described in section 3.
        </p>
      </Section>

      <Section id="reminders" title="5. Reminders & notifications" icon={Bell}>
        <Bullets>
          <li>
            When you add a document, NeuVault looks for dates that may need your attention, such as expiry,
            renewal or due dates, and adds them to Reminders automatically. You can also add your own and set
            items to resurface weekly, monthly or yearly.
          </li>
          <li>
            Reminder details are kept on our servers so we can notify you even when the app is closed. They are
            removed when you delete the reminder, when you delete the document on desktop, or when you delete
            your account.
          </li>
          <li>
            Push notifications and reminder emails can include the document&apos;s title, the date and a short
            suggested action. They never include the document itself or its full text.
          </li>
          <li>
            Push notifications are delivered through Apple and Google notification services. You can turn
            reminders off in the app&apos;s notification settings.
          </li>
          <li>
            Notification history is kept for 30 days, or up to 180 days for notifications you have not opened.
          </li>
        </Bullets>
      </Section>

      <Section id="email-integrations" title="6. Email accounts & Google user data" icon={Mail}>
        <p>
          You can choose to connect an email account so NeuVault can find and import document attachments.
          Connecting is optional, and NeuVault supports Gmail and Microsoft accounts (Outlook and Microsoft 365).
        </p>

        <h3>What NeuVault accesses</h3>
        <Bullets>
          <li>
            <strong>Gmail:</strong> read-only access (<code>gmail.readonly</code>) and your basic Google account
            identity.
          </li>
          <li>
            <strong>Microsoft:</strong> read-only mail access (<code>Mail.Read</code>) and basic profile
            information (<code>User.Read</code>).
          </li>
          <li>
            Message identifiers, sender, subject, received date, labels, and attachment names, types and sizes;
            and the content of attachments you choose to import or that match automatic import rules you set.
          </li>
        </Bullets>
        <p>
          NeuVault never sends, edits, moves or deletes your email, and does not import email bodies as
          documents.
        </p>

        <h3>How it is used and stored</h3>
        <Bullets>
          <li>To find messages with supported attachments and show them so you can decide what to import.</li>
          <li>
            Imported attachments are processed like any other document (section 3) and stored in your vault on
            your device.
          </li>
          <li>
            Sign-in tokens for connected accounts are stored on your device, in the system&apos;s secure storage
            where it is available, or otherwise in NeuVault&apos;s local app data.
          </li>
          <li>
            Google user data is not sold, used for advertising, used to determine creditworthiness, or used to
            train or improve generalized AI or machine-learning models.
          </li>
          <li>
            NeuVault staff do not read your email data except with your explicit permission for a support
            request, when needed for security, or when required by law.
          </li>
        </Bullets>

        <h3>Disconnecting</h3>
        <p>
          You can disconnect an account in NeuVault&apos;s email settings. NeuVault asks the provider to revoke
          access and removes the stored sign-in from your device. You can also revoke access from your Google or
          Microsoft account settings. Documents you already imported stay in your vault until you delete them.
        </p>
        <Callout>
          <p>
            NeuVault&apos;s use and transfer of information received from Google APIs adheres to the{" "}
            <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer">
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>
        </Callout>
      </Section>

      <Section id="imports" title="7. Imports, recordings & other people" icon={Users}>
        <Bullets>
          <li>
            <strong>Watched folders</strong> (Mac and Windows) and <strong>folder imports</strong> on mobile bring
            in new files from folders you choose, and those files are processed automatically.
          </li>
          <li>
            <strong>Shared and WhatsApp imports:</strong> when you share a chat export or files into NeuVault, the
            content can include other people&apos;s names, messages and files. It is processed like any other
            content.
          </li>
          <li>
            <strong>Recordings:</strong> if you record a meeting or call, please tell the people involved and get
            their permission where the law requires it.
          </li>
          <li>
            You are responsible for having the right to add other people&apos;s information or content to your
            vault.
          </li>
        </Bullets>
      </Section>

      <Section id="providers" title="8. Service providers" icon={Share2}>
        <p>
          We use trusted providers to run NeuVault. They receive only what is needed for their part of the
          service, and may not use it for their own purposes.
        </p>
        <Bullets>
          <li>
            <strong>AI model providers</strong> to organize documents, transcribe recordings and answer Nova
            questions. Content sent to them is not used to train their models. They may keep it for a limited
            period for abuse monitoring, as their terms allow.
          </li>
          <li>
            <strong>Text recognition</strong> to read text in scans and images.
          </li>
          <li>
            <strong>Web and research search providers</strong> for Nova&apos;s web research, which receive search
            queries only.
          </li>
          <li>
            <strong>Apple and Google</strong> for push notifications, app downloads and in-app purchases, and{" "}
            <strong>RevenueCat</strong> to manage subscriptions.
          </li>
          <li>
            <strong>Google and Microsoft</strong> when you connect an email account.
          </li>
          <li>
            <strong>Email delivery, cloud hosting and network security providers</strong> that send our emails,
            run our servers and protect them from attacks.
          </li>
        </Bullets>
        <p>
          These providers may process data in countries other than your own. Where the law requires it, we rely
          on appropriate safeguards for those transfers. You can ask us for more detail at any time.
        </p>
      </Section>

      <Section id="backup" title="9. Encrypted backup" icon={Cloud}>
        <Bullets>
          <li>
            A backup packs your vault into one file that is encrypted on your device before it is saved anywhere.
          </li>
          <li>
            It is sealed with your <strong>Recovery Key</strong>, which is created and kept on your device and is
            never sent to NeuVault. We cannot open your backups.
          </li>
          <li>
            You choose where to save it: any folder or synced cloud folder on desktop, the Files app on iPhone, or
            Files or Google Drive on Android. The storage provider cannot read it.
          </li>
          <li>
            Backups made by older versions of NeuVault used a key tied to your account and can still be restored
            while you are signed in.
          </li>
        </Bullets>
        <Callout>
          <p>
            <strong>Keep your Recovery Key safe.</strong> If it is lost, backups sealed with it cannot be opened,
            by you or by us.
          </p>
        </Callout>
      </Section>

      <Section id="sign-in" title="10. Sign-in & device security" icon={KeyRound}>
        <Bullets>
          <li>You sign in with your email address and a one-time code. We do not store a password.</li>
          <li>
            An app PIN and Face ID, Touch ID or fingerprint unlock are handled by your device. Your biometric data
            never reaches us.
          </li>
          <li>NeuVault does not collect your location.</li>
        </Bullets>
      </Section>

      <Section id="payments" title="11. Subscriptions & payments" icon={CreditCard}>
        <p>
          Subscriptions and credit packs are bought through the Apple App Store or Google Play. They handle your
          payment details, which we never see. We receive your purchase status, and a subscription identifier
          that may be linked to your account email, so your plan works on every device.
        </p>
      </Section>

      <Section id="communications" title="12. Emails we send" icon={Mail}>
        <Bullets>
          <li>Sign-in codes and important account, security and billing messages.</li>
          <li>Reminder emails for your dates, if reminders are turned on.</li>
          <li>Backup reminders, on the schedule you choose.</li>
          <li>
            Occasional requests for feedback if you have not used NeuVault for a while, which you can unsubscribe
            from.
          </li>
        </Bullets>
      </Section>

      <Section id="feedback-board" title="13. Feedback board" icon={Users}>
        <p>
          The feedback board at <Link href="/feedback">neuvault.app/feedback</Link> is public: anyone can read it.
          Posting, voting and commenting need a NeuVault account.
        </p>
        <Bullets>
          <li>
            What you post, your comments and your votes are stored on our servers and shown publicly. Your name
            appears as your first name and last initial. Your email address is never shown.
          </li>
          <li>
            Don&apos;t include document contents, ID numbers or other personal details in posts or comments. We hide
            anything that does.
          </li>
          <li>
            You sign in on the website with a code sent to your email. The sign-in is kept in your browser&apos;s
            storage, works only on the board, cannot reach your vault, backups or account settings, and ends after
            30 days, when you sign out, or when you sign out of all devices in the app.
          </li>
          <li>
            When you remove a post or comment, or we hide one, it leaves the board straight away. We keep the text,
            hidden, until your account is deleted, so we can deal with abuse.
          </li>
          <li>
            When the NeuVault team replies to your post or changes its status, we email you. The board uses no
            cookies for tracking and no analytics.
          </li>
        </Bullets>
      </Section>

      <Section id="diagnostics" title="14. Diagnostics & no tracking" icon={Shield}>
        <Bullets>
          <li>
            NeuVault contains no advertising or third-party analytics tools, and does not track you across other
            apps or websites.
          </li>
          <li>
            We use server logs and error reports to keep the service reliable and secure. They are designed not
            to contain your vault content.
          </li>
          <li>
            The mobile apps check for app updates with our app update provider, which receives basic device and
            app version information.
          </li>
        </Bullets>
      </Section>

      <Section id="staff-access" title="15. Staff access" icon={UserCheck}>
        <p>
          A small number of authorized staff can use internal tools to run the service, answer support requests,
          keep it secure and fix billing problems. They can see account details, sessions, subscription and credit
          records, notifications and, while a file is being processed, its name and status. They cannot see your
          vault, which is on your device.
        </p>
        <Bullets>
          <li>Access is limited by role and used only for those purposes.</li>
          <li>Sensitive actions, such as changing credits or deleting an account, require a reason and are logged.</li>
          <li>We never use staff access for advertising or profiling.</li>
        </Bullets>
      </Section>

      <Section id="retention" title="16. How long we keep data" icon={Lock}>
        <Bullets>
          <li>Files sent for processing and their results: deleted within an hour (section 3).</li>
          <li>Reminders: until you delete them or your account.</li>
          <li>Feedback board posts, comments and votes: until your account is deleted (section 13).</li>
          <li>Notification history: 30 days, or up to 180 days if unopened.</li>
          <li>Account, device, subscription and credit records: while your account is open.</li>
          <li>Server logs: for a limited period, for security and troubleshooting.</li>
          <li>Your vault and backups: on your device and in the places you save them, under your control.</li>
        </Bullets>
      </Section>

      <Section id="account-deletion" title="17. Deleting your account" icon={Trash2}>
        <p>
          You can delete your account in the app (Settings &gt; Delete Account) or from{" "}
          <Link href="/account-deletion">neuvault.app/account-deletion</Link>.
        </p>
        <Bullets>
          <li>
            Deleting your account removes your account, sessions, devices, reminders, notifications, organization
            settings, feedback (including your feedback board posts, comments and votes) and subscription and credit
            records from our servers.
          </li>
          <li>
            We keep a minimal record that an account was deleted, including its email address, in our internal
            security and audit logs, to protect against fraud and abuse.
          </li>
          <li>Purchase records held by Apple, Google and RevenueCat are kept under their own policies.</li>
          <li>
            Your vault stays on your device until you delete it in the app or remove the app. Backups you saved
            stay where you saved them.
          </li>
        </Bullets>
      </Section>

      <Section id="rights" title="18. Your rights" icon={UserCheck}>
        <p>
          Depending on where you live, you may have the right to access, correct, export or delete your personal
          data, to object to or restrict certain processing, and to withdraw consent. You can also complain to your
          local data protection authority. To make a request, email{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.
        </p>
      </Section>

      <Section id="children" title="19. Children" icon={Mic}>
        <p>
          NeuVault is not intended for children under 13, and we do not knowingly collect their personal data. If
          you believe a child has given us personal data, contact us and we will delete it.
        </p>
      </Section>

      <Section id="security" title="20. Security" icon={Lock}>
        <p>
          We protect data in transit with encryption (TLS), limit access to our systems, and encrypt backups on
          your device. No system is perfectly secure, so please keep your device, email account and Recovery Key
          safe.
        </p>
      </Section>

      <Section id="changes" title="21. Changes & contact" icon={FileText}>
        <p>
          We will update this policy when NeuVault changes, change the effective date above, and tell you in the
          app or by email about significant changes. For any privacy question or request, contact:
        </p>
        <Callout>
          <p>
            NeuVault Technologies Limited — <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
          </p>
        </Callout>
        <Chips>
          <Chip icon={Clock} label="Processing results deleted within an hour" />
          <Chip icon={KeyRound} label="Recovery Key never leaves your device" />
        </Chips>
      </Section>
    </LegalPage>
  );
}
