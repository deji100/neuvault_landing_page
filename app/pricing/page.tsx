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

export const metadata: Metadata = buildMetadata({
  title: "NeuVault Pricing and Subscription Plans",
  description:
    "Compare NeuVault subscription plans and AI credit allowances for document organization, Nova assistant, Attention, notes, voice context, and encrypted backup workflows.",
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
        "NeuVault plans mainly change the available AI credit capacity for intelligent workflows such as Nova, summaries, organization, Attention, transcription, and related document work.",
    },
    {
      question: "Where do I manage my subscription?",
      answer:
        "Subscriptions are started and managed from the NeuVault mobile app.",
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
    })),
  };

  return (
    <main className="legacy-light-page relative min-h-screen overflow-hidden">
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

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_46%)]" />
      <div className="absolute -top-40 -left-40 -z-10 h-[520px] w-[520px] rounded-full bg-[#3F8CFF]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-10 h-[460px] w-[460px] rounded-full bg-purple-500/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 pb-8 pt-28">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            ← Back to Home
          </Link>

          <div className="hidden items-center gap-2 text-xs text-gray-400 sm:flex">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5 text-[#6DD1FF]" />
              Local-first • Mobile subscription
            </span>
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-3 text-sm uppercase tracking-wide text-[#6DD1FF] md:text-base">
            NeuVault Pricing
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Plans for every document routine.
          </h1>

          <p className="mt-5 max-w-3xl text-gray-300">
            Compare NeuVault credit allowances for Nova, summaries,
            organization, Attention, notes, voice context, and encrypted backup
            workflows.
          </p>

          <div className="mt-6 flex flex-col gap-3 text-sm text-gray-400 sm:flex-row sm:items-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <CreditCard className="h-3.5 w-3.5 text-white/60" />
              Explorer includes 500 credits for 14 days
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5 text-white/60" />
              Subscriptions are managed in the mobile app
            </span>
          </div>
        </div>
      </div>

      <PricingPlans variant="page" />
    </main>
  );
}
