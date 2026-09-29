import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, ShieldCheck } from "lucide-react";

import PricingPlans from "@/components/specific/pricing/PricingPlans";
import { pricingPlans } from "@/lib/pricing";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildWebSiteJsonLd,
  SITE_URL,
} from "@/lib/seo";
import styles from "./PricingPage.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Pricing and Plans",
  description:
    "Start free with 500 credits. Paid plans from $4.99 a month add 2,000 to 8,000 AI credits monthly, and storage never uses credits. Compare every NeuVault plan.",
  path: "/pricing",
  keywords: [
    "NeuVault pricing",
    "NeuVault subscription",
    "document vault pricing",
    "AI document assistant pricing",
    "document organization app pricing",
    "private document vault subscription",
  ],
});

function jsonLdScript(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

function getSchemaPrice(price: string) {
  if (price.toLowerCase() === "free") return "0";
  const match = price.match(/\$([\d.]+)/);
  return match?.[1] ?? undefined;
}

export default function PricingPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
  ]);

  const websiteJsonLd = buildWebSiteJsonLd();

  const faqJsonLd = buildFaqJsonLd([
    {
      question: "What do NeuVault plans change?",
      answer:
        "Every paid plan includes all NeuVault features. Plans differ by their monthly AI credits, used for Nova, summaries, organization, scanned text recognition, transcription, and web searches. Unused plan credits do not carry over.",
    },
    {
      question: "Where do I manage my subscription?",
      answer:
        "Subscribe in the NeuVault mobile app, or in the Mac app through the App Store. Subscriptions stay synced with your NeuVault account, including on Windows.",
    },
    {
      question: "Can I buy extra credits?",
      answer:
        "Yes. Paid plans can buy 2,000 extra credits for $5.99 or 4,000 for $11.99 after 80% of the plan allowance is used. Extra credits are used after plan credits and expire after 15 days.",
    },
    {
      question: "Does NeuVault still store my vault locally?",
      answer:
        "Yes. NeuVault is designed around local-first storage, with encrypted backup and restore options under your control.",
    },
  ]);

  const offerCatalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "NeuVault subscription plans",
    url: `${SITE_URL}/pricing`,
    itemListElement: pricingPlans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: `${plan.price}. ${plan.allowance} ${plan.cadence}. ${plan.summary}`,
      availability: "https://schema.org/InStock",
      price: getSchemaPrice(plan.price),
      priceCurrency: "USD",
      ...(plan.billing
        ? {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: getSchemaPrice(plan.price),
              priceCurrency: "USD",
              billingDuration: plan.billing === "year" ? "P1Y" : "P1M",
            },
          }
        : {}),
    })),
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(offerCatalogJsonLd)}
      />

      <div className={styles.hero}>
        <div className={styles.topRow}>
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>

          <span className={styles.privacyNote}>
            <ShieldCheck size={14} /> Local-first • In-app subscriptions
          </span>
        </div>

        <p className={styles.eyebrow}>NeuVault Pricing</p>
        <h1>Plans for every notes and documents routine.</h1>

        <p className={styles.intro}>
          Compare NeuVault credit allowances for Nova, summaries,
          organization, Attention, notes, voice context, and encrypted backup
          workflows.
        </p>

        <div className={styles.facts}>
          <span className={styles.fact}><CreditCard size={15} /> Explorer includes 500 free credits available for 14 days</span>
          <span className={styles.fact}><ShieldCheck size={15} /> Subscribe in the mobile app or the Mac app</span>
        </div>
      </div>

      <PricingPlans variant="page" />
    </main>
  );
}
