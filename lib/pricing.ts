/**
 * Plans as the apps sell them. Credit amounts and badges follow updv-desktop
 * (src/pages/CreditsPage.tsx BILLING_TIERS) and updv-server (app/core/config.py);
 * USD prices follow the US App Store listing. Keep all three in step.
 *
 * Starter (app.neuvault.starter.monthly) is not on the App Store yet; its
 * $4.99 price was set by the product owner (2026-09-29), so confirm it there
 * once the product is live.
 */
export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  /** Billing period for structured data; absent for the free plan. */
  billing?: "month" | "year";
  allowance: string;
  cadence: string;
  audience: string;
  summary: string;
  highlight?: string;
  features: string[];
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "explorer",
    name: "Explorer",
    price: "Free",
    allowance: "500",
    cadence: "free credits for 14 days",
    audience: "For trying NeuVault with a small vault.",
    summary:
      "Start with 500 free credits for 14 days. NeuVault remains usable afterward, and you can choose a plan whenever you want to use AI-powered features.",
    features: [
      "Private local-first vault on your device",
      "Scan or upload important documents",
      "AI summaries and organization for a small set of records",
      "Search saved records by title, group, tags, and context",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: "$4.99 / month",
    billing: "month",
    allowance: "2,000",
    cadence: "credits / month",
    audience: "For getting started with a light monthly vault.",
    summary: "The lightest monthly plan for getting started.",
    features: [
      "2,000 new credits each month",
      "Every NeuVault feature included",
      "Unused plan credits reset monthly",
    ],
  },
  {
    id: "personal",
    name: "Personal",
    price: "$9.99 / month",
    billing: "month",
    allowance: "4,000",
    cadence: "credits / month",
    audience: "For everyday personal documents and reminders.",
    summary: "A simple monthly plan for regular personal use.",
    features: [
      "4,000 new credits each month",
      "Priority AI and document processing",
      "Unused plan credits reset monthly",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$14.99 / month",
    billing: "month",
    allowance: "6,000",
    cadence: "credits / month",
    audience: "For frequent document work across desktop and mobile.",
    summary: "More capacity for frequent AI and document work.",
    highlight: "Popular",
    features: [
      "6,000 new credits each month",
      "Faster responses and deeper analysis",
      "Unused plan credits reset monthly",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$19.99 / month",
    billing: "month",
    allowance: "8,000",
    cadence: "credits / month",
    audience: "For heavier vaults and richer AI workflows.",
    summary: "Our highest monthly capacity for intensive document work.",
    features: [
      "8,000 new credits each month",
      "Highest processing priority",
      "Unused plan credits reset monthly",
    ],
  },
  {
    id: "premium-annual",
    name: "Premium Annual",
    price: "$200 / year",
    billing: "year",
    allowance: "96,000",
    cadence: "credits / year, 8,000 each month",
    audience: "For people building NeuVault into a long-term system.",
    summary: "Premium capacity with one payment each year.",
    highlight: "Best value",
    features: [
      "96,000 credits a year, 8,000 added each month",
      "Same features and priority as Premium",
      "One annual payment",
    ],
  },
];

/** Extra credits for paid plans (updv-server config: 15-day expiry, offered at 80% use). */
export const creditTopUps = [
  { credits: "2,000", price: "$5.99" },
  { credits: "4,000", price: "$11.99" },
];

/** How credits work, in the desktop app's own words (CreditsPage "How plans and credits work"). */
export const creditRules = [
  "Storage does not use credits. Your vault still works without credits.",
  "AI organization, scanned text recognition, transcription, Nova responses, and web searches use credits. Usage varies by task.",
  "Your plan allowance refreshes each billing cycle. Unused plan credits do not carry over.",
  "Paid plans can buy extra credits after 80% of their plan allowance is used. Extra credits are used after plan credits and expire after 15 days.",
];

export const includedPlanFeatures = [
  "Local-first document vault",
  "Document scanning and uploads",
  "Notes and voice-note context",
  "Nova assistant for vault-aware questions",
  "Attention for dates and follow-ups",
  "Linked Documents for related records",
  "Encrypted backup and restore",
  "iPhone, Android, macOS, and Windows apps",
];
