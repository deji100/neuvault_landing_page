/** Enable only after the matching billing policy is deployed and verified. */
export const paidCreditPolicyLive = process.env.NEXT_PUBLIC_PAID_CREDIT_POLICY_LIVE === "true";
export const creditPolicyNotice = paidCreditPolicyLive
  ? "Unused paid credits roll over. Purchased extras have no routine expiry."
  : "Coming soon: paid-credit rollover and non-expiring extras. Current in-app purchase terms apply until rollout.";
/**
 * Until the paid-credit policy is live the site shows only what is true today: no "coming soon" rollover
 * lines anywhere (Deji 2026-11-23). Each pre-launch line below is left out, not reworded as a promise.
 */
const rolloverFeature: string[] = paidCreditPolicyLive ? ["Unused paid credits roll over"] : [];

/**
 * Plans as the apps sell them. Credit amounts and badges follow updv-desktop
 * (src/pages/CreditsPage.tsx BILLING_TIERS) and updv-server (app/core/config.py);
 * USD prices follow the US App Store listing. Keep all three in step.
 * USD plan/top-up prices verified against the US App Store listing on 2026-11-16:
 * https://apps.apple.com/us/app/neuvault/id6759370392
 * Revised paid-credit policy approved 2026-11-17. It stays marked upcoming
 * until the matching production billing behavior is separately verified.
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
      ...rolloverFeature,
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
      ...rolloverFeature,
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
      ...rolloverFeature,
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
      ...rolloverFeature,
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
    billingNote: `8,000 credits each month, totaling 96,000 a year—not upfront.${paidCreditPolicyLive ? " Unused allocated credits carry forward." : ""}`,
    highlight: "Best value",
    features: [
      "8,000 credits each monthly credit period",
      "Every NeuVault feature included",
      ...rolloverFeature,
      "One annual payment",
    ],
  },
];

/** Package prices and quantities are unchanged by the revised credit policy. */
export const creditTopUps = [
  { credits: "2,000", price: "$5.99" },
  { credits: "4,000", price: "$11.99" },
];

/** How credits work, in the desktop app's own words (CreditsPage "How plans and credits work"). */
export const creditRules: string[] = [
  "No NeuVault cloud storage fees. Your local vault works without AI credits.",
  "AI organization, text recognition, transcription, Nova and web searches use credits. Usage varies by task.",
  "Explorer includes 500 introductory credits for 14 days. Unused free credits expire; your local vault stays accessible.",
  ...(paidCreditPolicyLive ? [
    "Paid credits roll over across successful renewals and remain usable after cancellation or failed renewal. New grants stop when paid access ends.",
    "Eligible paid customers can buy extra credits when needed, with no usage threshold or routine time-based expiry.",
  ] : []),
  "Premium Annual provides 8,000 credits monthly, totaling 96,000 yearly—not an upfront pool.",
  "Open Credits → Usage in NeuVault for your actual charges. Completed AI processing can use credits even if the overall task stops.",
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
    question: "Do I pay NeuVault for cloud storage?",
    answer: "No. Your files and notes stay on your devices. Plans pay for AI processing credits, not NeuVault cloud storage. You choose where to save encrypted backups and secure your Recovery Key; third-party storage providers may charge their own fees. AI sends relevant content for online processing, and supported account, Planner and reminder information syncs through NeuVault’s services.",
  },
  {
    question: "What changes between paid plans?",
    answer: "Every paid plan includes the same NeuVault features. Choose a plan for its monthly AI credit allowance and billing frequency. Higher plans provide more credits, rather than unlocking additional features or promising faster or deeper AI responses.",
  },
  {
    question: "Do I receive all 96,000 annual credits at once?",
    answer: `No. Premium Annual costs $200 a year and provides 8,000 credits each month.${paidCreditPolicyLive ? " Unused allocated credits carry forward." : ""}`,
  },
  ...(paidCreditPolicyLive ? [{
    question: "Do unused credits roll over?",
    answer: "Yes. Unused paid credits carry forward across successful renewals and remain usable after cancellation, expiry or failed renewal. New grants stop when paid access ends. Explorer’s 500 free credits still expire after 14 days.",
  }] : []),
  {
    question: "When can I buy extra credits?",
    answer: paidCreditPolicyLive
      ? "Eligible paid customers can buy extras when needed, without a usage threshold or routine expiry. Packs are 2,000 credits for $5.99 or 4,000 for $11.99 at US App Store prices."
      : "Packs are 2,000 credits for $5.99 or 4,000 for $11.99 at US App Store prices. Open Credits in NeuVault to see the options available to you.",
  },
  {
    question: "Where can I see what I actually spent?",
    answer: "Open Credits in NeuVault and choose Usage to review your credit changes. The examples on this page illustrate individual processing steps; they are not fixed total prices for complete documents, recordings or Nova conversations.",
  },
  ...(paidCreditPolicyLive ? [{
    question: "What happens to credits after a refund?",
    answer: "Under the paid-credit policy, only unused credits from the refunded purchase are revoked. Unrelated paid credits and your spending history are preserved; your balance does not become negative.",
  }] : []),
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
