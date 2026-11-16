import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, ShieldCheck } from "lucide-react";

import PricingPlans from "@/components/specific/pricing/PricingPlans";
import { pricingFaqs, pricingPlans } from "@/lib/pricing";
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

  const faqJsonLd = buildFaqJsonLd(pricingFaqs);

  const offerCatalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "NeuVault subscription plans",
    url: `${SITE_URL}/pricing`,
    itemListElement: pricingPlans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: `${plan.price}. ${plan.allowance} ${plan.cadence}. ${plan.summary}${plan.billingNote ? ` ${plan.billingNote}` : ""}`,
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
            <ShieldCheck size={14} /> Local-first • Account-linked subscriptions
          </span>
        </div>

        <p className={styles.eyebrow}>NeuVault Pricing</p>
        <h1>One workspace. Every feature. A plan that fits.</h1>

        <p className={styles.intro}>
          Start free and choose the AI credits you need. Every paid plan includes
          the same connected workspace: files, notes, Vault Map, Planner and reminders.
        </p>

        <div className={styles.facts}>
          <span className={styles.fact}><CreditCard size={15} /> Explorer includes 500 free credits available for 14 days</span>
          <span className={styles.fact}><ShieldCheck size={15} /> Same features across paid plans · More credits when you need them</span>
        </div>
      </div>

      <PricingPlans variant="page" />
    </main>
  );
}
