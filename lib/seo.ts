import type { Metadata } from "next";

export const SITE_NAME = "NeuVault";
export const SITE_URL = "https://neuvault.app";
export const SUPPORT_EMAIL = "support@neuvault.app";
export const IOS_APP_STORE_URL = "https://apps.apple.com/ng/app/neuvault/id6759370392";
export const ANDROID_PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.neuvault";
export const DEFAULT_TITLE = "NeuVault | Private Document Vault for Search, Reminders, Backup, Notes, and Scans";
export const DEFAULT_DESCRIPTION =
  "NeuVault is a private, local-first document vault for organizing files, setting reminders, resurfacing important documents, backing up securely, creating notes, scanning paperwork, and turning voice notes into structured text.";
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

const BASE_KEYWORDS = [
  "private document vault",
  "document organization app",
  "document reminder app",
  "document retrieval app",
  "secure document backup",
  "scan organization app",
  "voice note transcription app",
  "notes export to pdf",
  "local-first document organizer",
  "offline document organizer",
  "encrypted document backup",
  "document search app",
];

export type SeoFaq = {
  question: string;
  answer: string;
};

export type SolutionPage = {
  slug: string;
  aliases?: string[];
  metaTitle: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  benefits: { title: string; description: string }[];
  appProof: string[];
  keywords: string[];
  faqs: SeoFaq[];
};

export const solutionPages: SolutionPage[] = [
  {
    slug: "document-organization",
    metaTitle: "Document Organization App",
    title: "Organize important documents without building a folder maze",
    description:
      "NeuVault helps you organize uploads, scans, notes, and voice capture into one private document vault with smart grouping, summaries, tags, and linked context.",
    eyebrow: "Document organization",
    intro:
      "NeuVault is built for the moment when your important files are technically saved, but practically lost. Instead of another generic file dump, it gives you one private place to organize documents, related notes, scans, and voice capture in a way you can actually revisit later.",
    benefits: [
      {
        title: "Smart grouping from intake",
        description:
          "Uploads, scans, and notes can be classified into the right document bucket during intake so the vault stays usable as it grows.",
      },
      {
        title: "Context stays attached",
        description:
          "Documents, summaries, tags, and linked items stay together so you do not need to reconstruct the story from scattered apps.",
      },
      {
        title: "Built for real-life document mess",
        description:
          "Receipts, IDs, agreements, school files, travel records, and business paperwork can live inside one system instead of screenshots, downloads, and chat attachments.",
      },
    ],
    appProof: [
      "The mobile app organizes intake items into smart groups and subgroups inside the vault.",
      "NeuVault supports uploads, scans, notes, and cloud or email-style document intake flows.",
      "Linked groups let one issue keep its surrounding context instead of becoming isolated files.",
    ],
    keywords: [
      "document organization app",
      "organize important documents",
      "smart document organizer",
      "private document organizer",
    ],
    faqs: [
      {
        question: "What makes NeuVault different from a normal folder app?",
        answer:
          "NeuVault is built around document context. It keeps summaries, tags, linked items, reminders, notes, and scans connected instead of leaving you with flat folders.",
      },
      {
        question: "Can NeuVault organize both typed notes and files?",
        answer:
          "Yes. NeuVault supports typed notes, uploads, scans, and voice-based capture so one workflow does not need multiple apps.",
      },
    ],
  },
  {
    slug: "document-reminder",
    metaTitle: "Document Reminder App",
    title: "Set reminders on the document itself, not in a separate to-do list",
    description:
      "NeuVault helps you track deadlines, renewals, follow-ups, and important future dates with smart document reminders, suggestions, and resurfacing flows.",
    eyebrow: "Document reminder",
    intro:
      "A reminder only helps when it stays attached to the thing you need to revisit. NeuVault keeps reminders tied to the actual document, note, or linked set, so renewal dates and follow-ups are easier to trust.",
    benefits: [
      {
        title: "Smart suggestions for upcoming dates",
        description:
          "NeuVault scans vault context for future dates like expirations, renewals, due dates, and follow-ups so important items do not stay buried.",
      },
      {
        title: "Resurfacing for important items",
        description:
          "You can resurface documents on a cadence or as a one-time future revisit instead of hoping you remember later.",
      },
      {
        title: "Reminder context stays visible",
        description:
          "When a reminder surfaces, it points back to the related document or linked group rather than sending you into another search loop.",
      },
    ],
    appProof: [
      "NeuVault has dedicated smart suggestions and resurfacing flows in the product.",
      "The backend schedules both smart suggestion notifications and backup reminders.",
      "Document-level resurfacing supports recurring cadence and one-time future reminders.",
    ],
    keywords: [
      "document reminder app",
      "renewal reminder app",
      "document expiration reminder",
      "deadline reminder for documents",
    ],
    faqs: [
      {
        question: "What kinds of reminders can NeuVault handle?",
        answer:
          "NeuVault is designed for expiration dates, renewals, due dates, follow-ups, and other future dates that live inside documents.",
      },
      {
        question: "Do reminders link back to the source document?",
        answer:
          "Yes. NeuVault reminders and resurfacing flows are attached to the relevant item or linked group so the surrounding context is still there when you need it.",
      },
    ],
  },
  {
    slug: "document-retrieval",
    aliases: ["smart-document-retrival", "smart-document-retrieval"],
    metaTitle: "Smart Document Retrieval",
    title: "Find the right document faster with smart retrieval",
    description:
      "NeuVault improves document retrieval with local-first search, smart grouping, summaries, tags, linked context, and vault-aware assistant workflows.",
    eyebrow: "Smart document retrieval",
    intro:
      "The hard part is rarely saving a file. The hard part is finding it again when the pressure is on. NeuVault is designed so retrieval feels fast even when you only remember part of the story, a date, or a related item.",
    benefits: [
      {
        title: "Search by meaning, not only filenames",
        description:
          "Titles, summaries, tags, groups, and related items make retrieval easier when you do not remember the exact file name.",
      },
      {
        title: "Vault-aware assistant support",
        description:
          "Nova can search your vault, explain documents, and help narrow down what actually matters.",
      },
      {
        title: "Linked documents improve recall",
        description:
          "Connected items help you retrieve the full issue, not just one isolated file that still leaves you guessing.",
      },
    ],
    appProof: [
      "The assistant is designed to search the vault, explain documents, and answer document-grounded questions.",
      "The vault UI uses grouped organization, summaries, tags, and linked groups to improve retrieval.",
      "NeuVault supports opening related document sets and linked groups directly from the app.",
    ],
    keywords: [
      "document retrieval app",
      "smart document retrieval",
      "find documents faster",
      "document search app",
    ],
    faqs: [
      {
        question: "Is NeuVault only keyword search?",
        answer:
          "No. NeuVault combines grouped organization, summaries, tags, linked context, and vault-aware assistant help so retrieval is not limited to exact filenames.",
      },
      {
        question: "Can NeuVault help when I only remember part of the document context?",
        answer:
          "Yes. Related items, document summaries, tags, and assistant prompts make it easier to recover the right file from partial memory.",
      },
    ],
  },
  {
    slug: "secure-document-backup",
    metaTitle: "Secure Document Backup",
    title: "Back up your document vault without giving up control",
    description:
      "NeuVault supports secure document backup with encrypted export bundles, user-controlled storage choices, and backup reminders that help you stay protected.",
    eyebrow: "Secure backup",
    intro:
      "Backup only works when it is both secure and practical. NeuVault is built so you can export encrypted vault backups, choose where they live, and keep the process under your control instead of handing the whole vault to a permanent cloud archive.",
    benefits: [
      {
        title: "Encrypted export bundles",
        description:
          "NeuVault supports encrypted vault backup bundles designed to be stored in cloud storage or offline storage you control.",
      },
      {
        title: "User-controlled backup destination",
        description:
          "You decide whether backups live in Google Drive, iCloud, Dropbox, or another storage location you trust.",
      },
      {
        title: "Backup reminders built in",
        description:
          "NeuVault includes backup reminder settings and scheduled prompts so protection does not depend on memory alone.",
      },
    ],
    appProof: [
      "The backend derives a per-account backup key for encrypted vault backups.",
      "NeuVault includes backup reminder settings, frequencies, and notification scheduling.",
      "The app help content explicitly describes encrypted backup and recovery controlled by the user.",
    ],
    keywords: [
      "secure document backup",
      "encrypted document backup",
      "private document backup",
      "local-first backup app",
    ],
    faqs: [
      {
        question: "Does NeuVault store my backups for me?",
        answer:
          "NeuVault is designed around user-controlled backup. You export encrypted backups and choose where they are stored.",
      },
      {
        question: "Can NeuVault remind me to back up my vault?",
        answer:
          "Yes. NeuVault includes backup reminder settings and scheduled reminder flows in the product.",
      },
    ],
  },
  {
    slug: "notes-export",
    metaTitle: "Notes Export to PDF, Word, or CSV",
    title: "Create notes and export them to PDF, Word, or CSV",
    description:
      "NeuVault lets you create rich notes inside your vault and export note content to PDF, Word, or CSV so your context stays portable and usable.",
    eyebrow: "Notes export",
    intro:
      "Sometimes the important thing is not just the document. It is the note you wrote about it. NeuVault lets you create notes inside the same vault and export those notes into useful formats when you need to share, archive, or process them elsewhere.",
    benefits: [
      {
        title: "Notes stay next to the document context",
        description:
          "Instead of writing separate notes in another app, NeuVault keeps note capture close to the files, scans, and reminders they belong with.",
      },
      {
        title: "Export formats for real workflows",
        description:
          "NeuVault supports note export to PDF, Word, and CSV so a note can move into reporting, filing, or spreadsheet workflows when needed.",
      },
      {
        title: "Structured outputs preserve usefulness",
        description:
          "Formatting and structure help notes remain readable after export rather than collapsing into plain text blobs.",
      },
    ],
    appProof: [
      "The backend exposes dedicated note conversion endpoints for PDF, CSV, and Word exports.",
      "NeuVault note conversion flows generate structured output instead of dumping raw text.",
      "The note editor tracks meaningful note content and supports richer note capture inside the vault.",
    ],
    keywords: [
      "notes export to pdf",
      "export notes to word",
      "notes to csv",
      "document notes app",
    ],
    faqs: [
      {
        question: "Can NeuVault export the same note to more than one format?",
        answer:
          "Yes. NeuVault includes dedicated note export flows for PDF, Word, and CSV output.",
      },
      {
        question: "Why keep notes inside NeuVault instead of a separate notes app?",
        answer:
          "Because the note usually needs the surrounding file, reminder, or document history. NeuVault keeps that context together.",
      },
    ],
  },
  {
    slug: "voice-note-transcription",
    metaTitle: "Voice Note Transcription to Structured Text",
    title: "Turn voice notes into structured text you can keep and use",
    description:
      "NeuVault records or accepts voice notes, transcribes them, and shapes the result into structured text that fits into the rest of your vault.",
    eyebrow: "Voice note transcription",
    intro:
      "Voice capture is useful because it is fast. It becomes truly useful when it turns into text you can search, revisit, and connect to other records. NeuVault is built to move voice notes into structured text that still feels like your note, not a disconnected transcript dump.",
    benefits: [
      {
        title: "Fast capture when typing is inconvenient",
        description:
          "Voice notes help you save context in the moment without opening a second workflow just to remember something later.",
      },
      {
        title: "Structured transcription",
        description:
          "NeuVault transcribes voice and formats it into structured notes so the result is easier to read and use later.",
      },
      {
        title: "Searchable inside the vault",
        description:
          "Once transcribed, the note becomes part of the same private document system rather than disappearing into a separate voice app.",
      },
    ],
    appProof: [
      "The voice recorder transcribes audio and saves the result back into the vault workflow.",
      "The transcription service explicitly formats plain text into structured HTML notes.",
      "Offline-aware handling keeps voice capture usable even when connectivity is unstable.",
    ],
    keywords: [
      "voice note transcription app",
      "voice notes to structured text",
      "voice transcription for notes",
      "transcribe voice memo to text",
    ],
    faqs: [
      {
        question: "Does NeuVault just transcribe voice word-for-word?",
        answer:
          "NeuVault is designed to produce structured note output, which makes the result easier to read, scan, and keep inside your vault.",
      },
      {
        question: "Can voice notes live next to other documents?",
        answer:
          "Yes. Voice capture is part of the same NeuVault system as notes, uploads, scans, and related document context.",
      },
    ],
  },
  {
    slug: "scan-organization",
    metaTitle: "Scan Organization App",
    title: "Scan documents and keep them organized from the start",
    description:
      "NeuVault helps you scan paperwork, extract structure, organize scanned documents, and keep them searchable inside one private vault.",
    eyebrow: "Scan organization",
    intro:
      "Scanning is only the first step. The real problem starts when the scan lands in a camera roll, a random folder, or a cloud drive with no context. NeuVault is built to turn scans into usable records that remain organized and searchable.",
    benefits: [
      {
        title: "Scan directly into the vault",
        description:
          "Scanned paperwork moves into NeuVault instead of sitting in a generic photo stream or download folder.",
      },
      {
        title: "OCR and structured extraction",
        description:
          "NeuVault uses OCR and extraction flows to pull meaning out of scanned content so it is easier to classify and search.",
      },
      {
        title: "Better than raw image storage",
        description:
          "A scanned file can be summarized, tagged, grouped, linked, and revisited later as part of a bigger story.",
      },
    ],
    appProof: [
      "The app includes a dedicated scan-document intake flow.",
      "The backend supports OCR for images and PDFs during intake.",
      "Scan items can be grouped, tagged, summarized, and linked like other vault records.",
    ],
    keywords: [
      "scan organization app",
      "organize scanned documents",
      "scan and organize documents",
      "ocr document organizer",
    ],
    faqs: [
      {
        question: "Can NeuVault organize scans after capture?",
        answer:
          "Yes. NeuVault is built to classify, summarize, group, and link scanned documents after intake so they remain useful later.",
      },
      {
        question: "Does NeuVault support OCR for scans?",
        answer:
          "Yes. NeuVault uses OCR and extraction flows to turn scanned content into searchable vault data.",
      },
    ],
  },
];

const solutionLookup = new Map<string, { page: SolutionPage; canonicalSlug: string }>();

for (const page of solutionPages) {
  solutionLookup.set(page.slug, { page, canonicalSlug: page.slug });

  for (const alias of page.aliases ?? []) {
    solutionLookup.set(alias, { page, canonicalSlug: page.slug });
  }
}

export function getSolutionPageBySlug(slug: string) {
  return solutionLookup.get(slug) ?? null;
}

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noindex?: boolean;
};

export function buildMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  keywords = [],
  noindex = false,
}: BuildMetadataInput = {}): Metadata {
  return {
    title,
    description,
    keywords: [...BASE_KEYWORDS, ...keywords],
    alternates: {
      canonical: path,
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: DEFAULT_OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: `${title} | ${SITE_NAME}`,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE_PATH],
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: SUPPORT_EMAIL,
    sameAs: [IOS_APP_STORE_URL, ANDROID_PLAY_STORE_URL],
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
  };
}

export function buildSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: SITE_NAME,
    url: SITE_URL,
    operatingSystem: "iOS, Android",
    applicationCategory: "ProductivityApplication",
    description: DEFAULT_DESCRIPTION,
    downloadUrl: [IOS_APP_STORE_URL, ANDROID_PLAY_STORE_URL],
    featureList: solutionPages.map((page) => page.metaTitle),
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{
    name: string;
    path: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqJsonLd(faqs: SeoFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
