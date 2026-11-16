/**
 * Plans as the apps sell them. Credit amounts and badges follow updv-desktop
 * (src/pages/CreditsPage.tsx BILLING_TIERS) and updv-server (app/core/config.py);
 * USD prices follow the US App Store listing. Keep all three in step.
 * USD plan/top-up prices verified against the US App Store listing on 2026-11-16:
 * https://apps.apple.com/us/app/neuvault/id6759370392
 * Billing rules verified against credit_billing.py and credit_topups.py.
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
  billingNote?: string;
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
    audience: "For occasional AI assistance.",
    summary: "A light monthly allowance for organizing information and getting started with Nova.",
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
    audience: "For regular AI use.",
    summary: "More credits for everyday notes, documents and connected planning.",
    features: [
      "4,000 new credits each month",
      "Every NeuVault feature included",
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
    audience: "For frequent AI-powered work.",
    summary: "More capacity for frequent AI and document work.",
    highlight: "Popular",
    features: [
      "6,000 new credits each month",
      "Every NeuVault feature included",
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
    audience: "For intensive AI use.",
    summary: "Our largest monthly allowance for processing more material and asking more questions.",
    features: [
      "8,000 new credits each month",
      "Every NeuVault feature included",
      "Unused plan credits reset monthly",
    ],
  },
  {
    id: "premium-annual",
    name: "Premium Annual",
    price: "$200 / year",
    billing: "year",
    allowance: "8,000",
    cadence: "credits / month · billed yearly",
    audience: "For Premium usage with annual billing.",
    summary: "The same monthly allowance as Premium, paid once a year.",
    billingNote: "8,000 credits become available each month: 96,000 across 12 monthly allowances. They are not issued upfront. Unused credits expire at the end of each monthly credit period and do not roll over.",
    highlight: "Best value",
    features: [
      "8,000 credits each monthly credit period",
      "Every NeuVault feature included",
      "Unused plan credits expire monthly",
      "One annual payment",
    ],
  },
];

/** Extra credits for paid plans (updv-server config: 15-day expiration, offered at 80% use). */
export const creditTopUps = [
  { credits: "2,000", price: "$5.99" },
  { credits: "4,000", price: "$11.99" },
];

/** How credits work, in the desktop app's own words (CreditsPage "How plans and credits work"). */
export const creditRules = [
  "Storage does not use credits. Your vault still works without credits.",
  "AI organization, scanned text recognition, transcription, Nova responses, and web searches use credits. Usage varies by task.",
  "Paid plan credits refresh each monthly credit period, including on Premium Annual. Unused plan credits expire and do not roll over.",
  "Paid plans can buy extra credits after using at least 80% of their current plan allowance. Extra credits are spent after plan credits and expire 15 days after purchase, even if unused.",
  "Review your actual charges in NeuVault: open Credits, then Usage. AI work already completed can use credits even if the overall task stops before it finishes.",
];

/**
 * Reference processing components, not observed averages or full-task quotes.
 * billing_usage.record_ocr_usage: pages * OCR_CREDITS_PER_PAGE (default 2).
 * record_whisper_usage: ceil(minutes * .006 / .001), rounded per call/chunk.
 * Verified by executing the server's usage-recording functions, 2026-11-16.
 * Organization/Nova perform variable model calls; do not invent per-task ranges.
 */
export const creditUsageExamples = [
  {
    title: "Read text from a scan",
    example: "5 scanned pages",
    credits: "10 credits",
    detail: "Text recognition only, at 2 credits per processed page. AI organization and summaries add to this amount.",
  },
  {
    title: "Transcribe a recording",
    example: "10 minutes of audio",
    credits: "About 60 credits",
    detail: "Transcription only, at about 6 credits per minute. Creating a structured note or summary uses additional credits; longer recordings may be processed in parts.",
  },
  {
    title: "Organize a PDF",
    example: "A document you import",
    credits: "Varies by document",
    detail: "The amount of content, scanned pages and AI processing steps affect the total. A PDF with selectable text may not need text recognition.",
  },
  {
    title: "Ask Nova a question",
    example: "An answer using your context",
    credits: "Varies by question",
    detail: "Usage depends on the source material considered and the response. Web searches, when used, add to the total.",
  },
];

export const pricingFaqs = [
  {
    question: "What changes between paid plans?",
    answer: "Every paid plan includes the same NeuVault features. Choose a plan for its monthly AI credit allowance and billing frequency. Higher plans provide more credits, rather than unlocking additional features or promising faster or deeper AI responses.",
  },
  {
    question: "Do I receive all 96,000 annual credits at once?",
    answer: "No. Premium Annual is billed once a year and provides 8,000 credits each month, for 96,000 across 12 monthly allowances. Unused credits expire at the end of each monthly credit period; they do not accumulate into an annual pool.",
  },
  {
    question: "Do unused credits roll over?",
    answer: "Unused paid-plan credits expire when the monthly credit period ends, including on Premium Annual. Explorer's 500 free credits expire after 14 days. Purchased extra credits have a separate expiry: 15 days after purchase.",
  },
  {
    question: "When can I buy extra credits?",
    answer: "Extra credits become available on an active paid plan after at least 80% of the current plan allowance has been used. On Starter, that means using 1,600 of your 2,000 plan credits. Packs provide 2,000 credits for $5.99 or 4,000 for $11.99 at US App Store prices. Extra credits are spent after plan credits and expire 15 days after purchase, even if unused.",
  },
  {
    question: "Where can I see what I actually spent?",
    answer: "Open Credits in NeuVault and choose Usage to review your credit changes. The examples on this page illustrate individual processing steps; they are not fixed total prices for complete documents, recordings or Nova conversations.",
  },
  {
    question: "Where do I subscribe or manage my plan?",
    answer: "Open Credits in NeuVault to see the purchase and management options available to you. Options depend on your platform and where you downloaded the app; supported direct desktop downloads may offer web checkout. Your subscription is linked to your NeuVault account across devices. Store purchases are managed through the store where you subscribed.",
  },
  {
    question: "Can I still use NeuVault without credits?",
    answer: "Yes. Your local vault remains usable for saving, browsing, searching and managing your material. AI features need available credits, and online AI processing requires an internet connection.",
  },
];

export const includedPlanFeatures = [
  "Local-first document vault",
  "Document scanning and uploads",
  "Notes and voice-note context",
  "Nova assistant for vault-aware questions",
  "Reminders for dates and follow-ups",
  "Vault Map for related records",
  "Planner with source-linked tasks and events",
  "Encrypted backup and restore",
  "iPhone, Android, macOS, and Windows apps",
];
