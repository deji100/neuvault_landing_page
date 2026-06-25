export type PricingPlan = {
  id: string;
  name: string;
  price: string;
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
    cadence: "credits for 14 days",
    audience: "For trying NeuVault with a small vault.",
    summary:
      "Start with scans, uploads, notes, local organization, and a 14-day credit window to understand how NeuVault fits your paperwork.",
    features: [
      "Private local-first vault on your device",
      "Scan or upload important documents",
      "AI summaries and organization for a small set of records",
      "Search saved records by title, group, tags, and context",
    ],
  },
  {
    id: "personal",
    name: "Personal",
    price: "$10 / month",
    allowance: "4,000",
    cadence: "credits / month",
    audience: "For everyday personal documents and reminders.",
    summary:
      "A comfortable monthly allowance for household paperwork, renewals, receipts, IDs, notes, and occasional Nova questions.",
    features: [
      "Nova questions for saved vault context",
      "Attention items for dates and follow-ups",
      "Typed notes and voice-note workflows",
      "Encrypted backup and restore for your private vault",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$15 / month",
    allowance: "6,000",
    cadence: "credits / month",
    audience: "For frequent document work across desktop and mobile.",
    summary:
      "More room for regular AI organization, deeper vault questions, linked records, folder monitoring, and document-heavy weeks.",
    highlight: "Most flexible",
    features: [
      "More Nova room for document-grounded answers",
      "Linked Documents for related records and projects",
      "Desktop folder monitoring for new files",
      "Export useful notes and responses when work needs to move",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$20 / month",
    allowance: "8,000",
    cadence: "credits / month",
    audience: "For heavier vaults and richer AI workflows.",
    summary:
      "Built for larger personal or work vaults with frequent scans, more voice context, deeper Nova usage, and ongoing Attention reviews.",
    features: [
      "Higher monthly capacity for scans, notes, and AI review",
      "More room for meeting or voice-note transcription",
      "Better fit for multi-device vault maintenance",
      "Strongest monthly plan for active document-heavy workflows",
    ],
  },
  {
    id: "premium-annual",
    name: "Premium Annual",
    price: "$200 / year",
    allowance: "8,000",
    cadence: "credits / month",
    audience: "For people building NeuVault into a long-term system.",
    summary:
      "The Premium monthly capacity with an annual billing rhythm for users who want one dependable document memory system.",
    highlight: "Best long-term fit",
    features: [
      "Same Premium monthly credit allowance",
      "Annual plan for long-term vault building",
      "Good fit for family, school, property, or business records",
      "Designed for ongoing backup, retrieval, and Attention workflows",
    ],
  },
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
