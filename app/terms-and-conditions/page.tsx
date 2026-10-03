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
  KeyRound,
  Lock,
  Mail,
  RefreshCw,
  Shield,
  Trash2,
  TriangleAlert,
  UserCheck,
  Users,
} from "lucide-react";

import { Bullets, Callout, LegalPage, MetaPill, Section, type TocItem } from "@/components/specific/legal/Legal";

const EFFECTIVE_DATE = "October 3, 2026";
const SUPPORT_EMAIL = "support@neuvault.app";

const toc: TocItem[] = [
  { id: "acceptance", label: "Agreeing to these Terms" },
  { id: "eligibility", label: "Who can use NeuVault" },
  { id: "accounts", label: "Your account" },
  { id: "your-content", label: "Your content" },
  { id: "ai", label: "AI features" },
  { id: "reminders", label: "Reminders" },
  { id: "backup", label: "Backups & your Recovery Key" },
  { id: "payments", label: "Plans, billing & credits" },
  { id: "acceptable-use", label: "Acceptable use" },
  { id: "third-parties", label: "Connected services" },
  { id: "availability", label: "Changes to the service" },
  { id: "termination", label: "Ending your use" },
  { id: "account-deletion", label: "Deleting your account" },
  { id: "liability", label: "Disclaimers & liability" },
  { id: "law", label: "Governing law & disputes" },
  { id: "changes", label: "Changes & contact" },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lede={
        <>
          These Terms are the agreement between you and NeuVault Technologies Limited (“NeuVault”, “we”, “us”)
          for using the NeuVault apps and website. Please read them together with our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </>
      }
      meta={
        <>
          <MetaPill icon={Gavel}>Effective: {EFFECTIVE_DATE}</MetaPill>
          <MetaPill icon={Mail} href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </MetaPill>
          <MetaPill icon={Shield}>Your content stays yours</MetaPill>
        </>
      }
      highlights={[
        { icon: Lock, label: "You own everything you put in your vault" },
        { icon: Bot, label: "Check AI results before relying on them" },
        { icon: KeyRound, label: "Keep your Recovery Key safe" },
        { icon: CreditCard, label: "Subscriptions are managed in your app store" },
      ]}
      toc={toc}
      footnote="NeuVault — Your data. Your device. Your control."
    >
      <Section id="acceptance" title="1. Agreeing to these Terms" icon={FileText}>
        <p>
          By downloading, opening or using NeuVault, you agree to these Terms. If you do not agree, please do not
          use NeuVault.
        </p>
      </Section>

      <Section id="eligibility" title="2. Who can use NeuVault" icon={UserCheck}>
        <Bullets>
          <li>You must be at least 13 years old.</li>
          <li>If you are under 18, a parent or guardian must agree to these Terms for you.</li>
          <li>You must be allowed to use NeuVault under the laws that apply to you.</li>
        </Bullets>
      </Section>

      <Section id="accounts" title="3. Your account" icon={Lock}>
        <Bullets>
          <li>You sign in with your email address and a one-time code. Keep access to that email account secure.</li>
          <li>You are responsible for activity on your account and for keeping your devices secure.</li>
          <li>Do not access, or try to access, anyone else&apos;s account or vault.</li>
          <li>
            If you think your account has been compromised, contact{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> straight away.
          </li>
        </Bullets>
      </Section>

      <Section id="your-content" title="4. Your content" icon={Shield}>
        <p>
          You own the documents, files, notes, recordings and other content you add to NeuVault (“Your Content”).
          We claim no ownership of it.
        </p>
        <Bullets>
          <li>Your vault is stored on your device.</li>
          <li>
            You give us permission to process Your Content only as needed to provide the features you use, as
            described in the Privacy Policy. This permission ends when the processing is done.
          </li>
          <li>
            You are responsible for having the right to add Your Content, including other people&apos;s
            information, messages or files, for example in chat imports or shared files.
          </li>
          <li>
            If you record other people, such as in a meeting or call, you are responsible for telling them and
            getting their consent where the law requires it.
          </li>
          <li>
            The <Link href="/feedback">feedback board</Link> is different: what you post there is public. You still
            own it, and you give us permission to show it on the board and to use your suggestions to improve
            NeuVault, without owing you anything for them. You can remove your posts and comments at any time.
          </li>
        </Bullets>
      </Section>

      <Section id="ai" title="5. AI features" icon={Bot}>
        <p>
          NeuVault uses AI to organize documents, write summaries and tags, find dates, transcribe recordings and
          answer questions in Nova. Content you add is processed automatically when you add it.
        </p>
        <Bullets>
          <li>
            AI results can be wrong, incomplete or out of date. Check them before relying on them, especially for
            legal, medical, financial, immigration or other important decisions.
          </li>
          <li>AI results are not professional advice.</li>
          <li>
            We do not guarantee that NeuVault will find every date, deadline or detail in your documents.
          </li>
          <li>Some features need an internet connection and credits.</li>
        </Bullets>
      </Section>

      <Section id="reminders" title="6. Reminders" icon={Bell}>
        <Bullets>
          <li>
            NeuVault adds dates it finds in your documents to Reminders automatically, and you can add your own or
            set items to resurface on a schedule.
          </li>
          <li>
            Notifications can be delayed or missed because of device settings, operating system limits, network
            problems or app settings. Do not rely on NeuVault as the only reminder for anything critical, such as a
            visa, passport or legal deadline.
          </li>
          <li>You can turn reminders off in the app&apos;s notification settings.</li>
        </Bullets>
      </Section>

      <Section id="backup" title="7. Backups & your Recovery Key" icon={KeyRound}>
        <Bullets>
          <li>
            NeuVault lets you create encrypted backups and save them wherever you choose. NeuVault is not a backup
            service: making backups and keeping them safe is up to you.
          </li>
          <li>
            Backups are sealed with your Recovery Key, which stays on your device and is never sent to us. You are
            responsible for keeping your Recovery Key safe.
          </li>
          <li>
            If you lose your Recovery Key, backups sealed with it cannot be opened, and we cannot recover them.
          </li>
          <li>
            If you lose or reset your device, or remove the app, without a backup you can open, Your Content may be
            lost permanently.
          </li>
        </Bullets>
      </Section>

      <Section id="payments" title="8. Plans, billing & credits" icon={CreditCard}>
        <h3>Subscriptions</h3>
        <Bullets>
          <li>
            Plans are bought through the Apple App Store (on iPhone, iPad and Mac) or Google Play. Your purchase is
            also subject to their terms, and they handle payment.
          </li>
          <li>
            Subscriptions renew automatically at the end of each billing period unless you cancel at least 24 hours
            before it ends. You can cancel in your App Store or Google Play account settings.
          </li>
          <li>
            Refunds are handled by Apple or Google under their policies. Deleting the app or your account does not
            cancel a subscription.
          </li>
          <li>
            Prices can vary by country and may change. We will tell you in advance, and your app store will ask for
            your consent where required.
          </li>
        </Bullets>

        <h3>Credits</h3>
        <Bullets>
          <li>
            AI features such as organizing documents, reading scanned text, transcription, Nova answers and web
            searches use credits. How many depends on the task. Storing and searching your vault never uses credits,
            and your vault keeps working without them.
          </li>
          <li>The free Explorer plan includes 500 credits, which expire after 14 days.</li>
          <li>
            Paid plans add a credit allowance each billing period. Unused plan credits do not carry over.
          </li>
          <li>
            On a paid plan, you can buy extra credits once you have used 80% of your allowance. Extra credits are
            used after your plan credits and expire 15 days after purchase.
          </li>
          <li>
            If a request fails after processing has started, it may use up to half of the credits it would have
            cost.
          </li>
          <li>Credits have no cash value, cannot be transferred or sold, and are not refundable except where the law requires.</li>
        </Bullets>
        <p>
          Current plans and prices are on our <Link href="/pricing">pricing page</Link> and in the app.
        </p>
      </Section>

      <Section id="acceptable-use" title="9. Acceptable use" icon={Ban}>
        <p>You agree not to:</p>
        <Bullets>
          <li>Use NeuVault for anything illegal, or to harm, harass or deceive others.</li>
          <li>Add content you do not have the right to possess or use.</li>
          <li>Use AI features to create or help with unlawful content or activity.</li>
          <li>Reverse engineer NeuVault, get around its security or credit limits, or interfere with how it works.</li>
          <li>Overload our systems, for example with automated or excessive requests or scraping.</li>
          <li>Resell NeuVault or access it except through our apps and website.</li>
          <li>
            Post on the feedback board anything abusive, misleading, off-topic or promotional, anyone&apos;s personal
            details, or anything that pretends to come from the NeuVault team. We may hide such posts and comments
            and remove access to the board.
          </li>
        </Bullets>
      </Section>

      <Section id="third-parties" title="10. Connected services" icon={Users}>
        <p>
          NeuVault works with services you choose to use, such as Gmail and Microsoft email, cloud storage for your
          backups, and Apple or Google for purchases and notifications. Those services have their own terms and
          privacy policies. We are not responsible for their availability, changes or loss of data held by them.
        </p>
      </Section>

      <Section id="availability" title="11. Changes to the service" icon={RefreshCw}>
        <Bullets>
          <li>We regularly improve NeuVault and may add, change or remove features.</li>
          <li>We aim to keep NeuVault available, but cannot promise it will always be uninterrupted or error-free.</li>
          <li>Features that use our servers are not available offline.</li>
        </Bullets>
      </Section>

      <Section id="termination" title="12. Ending your use" icon={Ban}>
        <p>
          You can stop using NeuVault at any time. We may suspend or close your account if you seriously or
          repeatedly break these Terms, or where the law requires it. Where reasonable, we will tell you first.
          Closing an account does not delete Your Content on your device.
        </p>
      </Section>

      <Section id="account-deletion" title="13. Deleting your account" icon={Trash2}>
        <p>
          You can delete your account in the app (Settings &gt; Delete Account) or from{" "}
          <Link href="/account-deletion">neuvault.app/account-deletion</Link>. What is deleted, and the minimal
          record we keep, is described in the <Link href="/privacy-policy">Privacy Policy</Link>. Your vault stays on
          your device until you delete it there, and any subscription must be cancelled in your app store.
        </p>
      </Section>

      <Section id="liability" title="14. Disclaimers & liability" icon={TriangleAlert}>
        <p>
          NeuVault is provided “as is” and “as available”. To the fullest extent the law allows, we make no
          promises beyond those in these Terms, including about fitness for a particular purpose.
        </p>
        <Bullets>
          <li>
            We are not responsible for loss of data caused by device failure, operating system problems, removing the
            app, losing your Recovery Key, or backups you did not make or keep.
          </li>
          <li>We are not responsible for decisions made using AI results or for missed reminders.</li>
          <li>
            To the fullest extent the law allows, our total liability to you is limited to the amount you paid us in
            the 12 months before the claim.
          </li>
        </Bullets>
        <Callout>
          <p>
            Nothing in these Terms limits rights you have as a consumer that cannot be limited by law.
          </p>
        </Callout>
      </Section>

      <Section id="law" title="15. Governing law & disputes" icon={Gavel}>
        <p>
          These Terms are governed by the laws of the country where NeuVault Technologies Limited is registered. If
          you live elsewhere, you keep the protection of any mandatory consumer laws where you live. If you have a
          problem, please contact us first at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>, and we will
          try to resolve it.
        </p>
      </Section>

      <Section id="changes" title="16. Changes & contact" icon={Cloud}>
        <p>
          We may update these Terms as NeuVault changes. We will change the effective date above and tell you about
          significant changes in the app or by email. If you keep using NeuVault after that, you accept the updated
          Terms.
        </p>
        <Callout>
          <p>
            NeuVault Technologies Limited — <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </p>
        </Callout>
      </Section>
    </LegalPage>
  );
}
