"use client";

import Link from "next/link";
import { CalendarCheck, CreditCard, Mail, ReceiptText, RotateCcw, Store } from "lucide-react";

import { Bullets, Callout, LegalPage, MetaPill, Section, type TocItem } from "@/components/specific/legal/Legal";

const EFFECTIVE_DATE = "October 12, 2026";
const SUPPORT_EMAIL = "support@neuvault.app";
// The window for purchases made through Paddle. Keep in step with the Terms.
const REFUND_DAYS = 14;

const toc: TocItem[] = [
  { id: "where", label: "Where you bought decides who refunds" },
  { id: "app-stores", label: "App Store and Google Play" },
  { id: "paddle", label: "Website and desktop app purchases" },
  { id: "after", label: "After a refund" },
  { id: "cancelling", label: "Cancelling" },
  { id: "contact", label: "Contact" },
];

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      lede={
        <>
          How refunds work for NeuVault plans and extra credits. This policy is part of our{" "}
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>.
        </>
      }
      meta={
        <>
          <MetaPill icon={CalendarCheck}>Effective: {EFFECTIVE_DATE}</MetaPill>
          <MetaPill icon={Mail} href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </MetaPill>
        </>
      }
      highlights={[
        { icon: Store, label: "App Store and Google Play purchases are refunded by Apple or Google" },
        { icon: RotateCcw, label: `Website and desktop app purchases: full refund within ${REFUND_DAYS} days` },
        { icon: ReceiptText, label: "Paddle is our reseller for website and desktop app purchases" },
        { icon: CreditCard, label: "Cancelling stops renewals; your plan runs to the end of the period" },
      ]}
      toc={toc}
      footnote="NeuVault — Your data. Your device. Your control."
    >
      <Section id="where" title="1. Where you bought decides who refunds" icon={Store}>
        <p>
          You can buy a NeuVault plan or extra credits in three places, and the refund comes from whoever took the
          payment:
        </p>
        <Bullets>
          <li>
            <strong>Apple App Store</strong> (iPhone, iPad, and the Mac App Store version): Apple.
          </li>
          <li>
            <strong>Google Play</strong> (Android): Google.
          </li>
          <li>
            <strong>Our website, or the desktop app downloaded from our website</strong>: Paddle, our authorized
            reseller and merchant of record (Paddle.com).
          </li>
        </Bullets>
        <p>Your receipt shows which one it was.</p>
      </Section>

      <Section id="app-stores" title="2. App Store and Google Play" icon={Store}>
        <Bullets>
          <li>
            Apple and Google handle these refunds under their own policies, and we cannot issue them ourselves.
          </li>
          <li>
            Apple: request a refund at{" "}
            <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">
              reportaproblem.apple.com
            </a>
            .
          </li>
          <li>
            Google Play: request a refund from your{" "}
            <a href="https://play.google.com/store/account/orderhistory" target="_blank" rel="noopener noreferrer">
              Google Play order history
            </a>
            .
          </li>
          <li>If you are unsure what to do, email us and we will point you the right way.</li>
        </Bullets>
      </Section>

      <Section id="paddle" title="3. Website and desktop app purchases" icon={RotateCcw}>
        <Bullets>
          <li>
            Ask within <strong>{REFUND_DAYS} days</strong> of a charge and you get a full refund, no questions asked.
            This covers a new subscription, a renewal and an extra-credit pack.
          </li>
          <li>
            To ask, use the link in your Paddle receipt, or email{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the email address on your account and tell
            us which charge it is.
          </li>
          <li>
            Refunds go back to the original payment method. When the money appears depends on your bank or card
            provider.
          </li>
          <li>
            After {REFUND_DAYS} days, charges are not refundable, except where the law gives you a right to a
            refund.
          </li>
        </Bullets>
      </Section>

      <Section id="after" title="4. After a refund" icon={ReceiptText}>
        <Bullets>
          <li>A refunded subscription ends straight away, and its plan credits are removed.</li>
          <li>Refunded extra credits are removed from your balance.</li>
          <li>Your vault, notes and documents stay on your device either way.</li>
        </Bullets>
      </Section>

      <Section id="cancelling" title="5. Cancelling" icon={CreditCard}>
        <Bullets>
          <li>
            Cancelling stops future renewals. Your plan stays active until the end of the period you paid for.
          </li>
          <li>
            Cancel where you subscribed: in your App Store or Google Play account settings, or, for website and
            desktop app purchases, from <em>Manage subscription</em> on the Plans page in the app or the link in your
            Paddle receipt.
          </li>
          <li>Deleting the app or your account does not cancel a subscription.</li>
        </Bullets>
      </Section>

      <Section id="contact" title="6. Contact" icon={Mail}>
        <Callout>
          <p>
            NeuVault Technologies Limited — <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </p>
        </Callout>
      </Section>
    </LegalPage>
  );
}
