import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  getSolutionPageBySlug,
  SITE_NAME,
} from "@/lib/seo";

export type GuideStep = {
  title: string;
  description: string;
};

export type GuidePage = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  parentSolutionSlug: string;
  relatedGuideSlugs: string[];
  keyTakeaways: string[];
  sections: GuideStep[];
  faqs: { question: string; answer: string }[];
  ctaLabel: string;
};

export const guidePages: GuidePage[] = [
  {
    slug: "how-to-scan-and-organize-documents",
    title: "How to scan and organize documents without losing them later",
    metaTitle: "How to Scan and Organize Documents",
    description:
      "Learn how to scan and organize documents in one workflow so paperwork stays searchable, grouped, and ready for reminders and secure backup.",
    intro:
      "Scanning a document is easy. Keeping it useful later is harder. This guide shows how to move from simple capture into a system where scanned paperwork stays organized, searchable, and connected to the next action you need to take.",
    primaryKeyword: "scan and organize documents",
    secondaryKeywords: [
      "organize scanned documents",
      "scan and store documents",
      "document scanning and organizing software",
      "store scanned documents securely",
    ],
    parentSolutionSlug: "scan-organization",
    relatedGuideSlugs: ["organize-important-documents-digitally", "search-old-documents-without-folder-chaos"],
    keyTakeaways: [
      "Capture is only step one. The real value comes from OCR, flexible grouping, and retrieval.",
      "Scans should land in a document system, not a camera roll or random folder.",
      "The best workflow links scans to reminders, search, and backup from the start.",
    ],
    sections: [
      {
        title: "Capture into one destination",
        description:
          "Choose a single intake path for paper records so receipts, forms, letters, and IDs do not scatter across photos, downloads, and messaging apps.",
      },
      {
        title: "Run OCR and keep the extracted meaning",
        description:
          "A scan is more useful when the text is searchable. OCR-backed extraction helps you recover names, dates, and context without reopening every file later.",
      },
      {
        title: "Group the scan with the right document set",
        description:
          "Store the scan next to the rest of the issue it belongs to, such as a visa file, insurance claim, lease, or household paperwork bundle.",
      },
      {
        title: "Add the future action while the context is fresh",
        description:
          "If the document has a renewal date, due date, or follow-up step, attach the reminder before you leave the workflow. That is how scans stay useful instead of archived and forgotten.",
      },
    ],
    faqs: [
      {
        question: "What is the best way to organize scanned documents?",
        answer:
          "The best way is to scan into one document system, run OCR, group each file with related records, and attach any reminder or follow-up before the context fades.",
      },
      {
        question: "Should I keep scanned documents in photo folders?",
        answer:
          "Only temporarily. Camera rolls and generic folders work for storage, but they are weak for retrieval, document context, and future reminders.",
      },
    ],
    ctaLabel: "See NeuVault scan organization",
  },
  {
    slug: "organize-important-documents-digitally",
    title: "How to organize important documents digitally at home or work",
    metaTitle: "Organize Important Documents Digitally",
    description:
      "A practical guide to organizing important documents digitally without relying on endless folder cleanup or memory-heavy naming systems.",
    intro:
      "Digital paperwork gets messy fast because the same document problem usually spans uploads, scans, notes, dates, and follow-up tasks. This guide shows how to build a document organization system that stays usable after the first cleanup week.",
    primaryKeyword: "organize important documents",
    secondaryKeywords: [
      "document organization",
      "organize personal documents digitally",
      "digital paperwork organization",
      "family document organizer",
    ],
    parentSolutionSlug: "document-organization",
    relatedGuideSlugs: ["how-to-scan-and-organize-documents", "track-passport-visa-and-id-expiry-dates"],
    keyTakeaways: [
      "Organize by real-life issue or document set, not by abstract folder perfection.",
      "Keep files, notes, and reminders in the same workflow whenever possible.",
      "A good document system reduces future searching, not just present clutter.",
    ],
    sections: [
      {
        title: "Start with categories you will actually remember",
        description:
          "Use categories like travel, insurance, housing, school, taxes, and business admin rather than dozens of low-value subfolders that only make sense during setup.",
      },
      {
        title: "Keep document context attached",
        description:
          "Notes, summaries, scans, receipts, and linked records should stay with the file they explain. That is how the system remains understandable later.",
      },
      {
        title: "Separate active paperwork from archived reference",
        description:
          "Some items need reminders and resurfacing while others are reference-only. That distinction helps you prioritize what the vault should bring back to you later.",
      },
      {
        title: "Review the system through retrieval, not just storage",
        description:
          "If you cannot find a document quickly from partial memory, the organization is not done yet. The real test is future retrieval under pressure.",
      },
    ],
    faqs: [
      {
        question: "How should I organize important documents digitally?",
        answer:
          "Use broader categories, attach notes and reminders to the source document, and organize around real-life issues so the system stays retrievable later.",
      },
      {
        question: "What kinds of documents should go into one digital vault?",
        answer:
          "IDs, receipts, leases, insurance records, travel files, school paperwork, contracts, and other important records that benefit from search, reminders, and linked context.",
      },
    ],
    ctaLabel: "See NeuVault document organization",
  },
  {
    slug: "track-passport-visa-and-id-expiry-dates",
    title: "How to track passport, visa, and ID expiry dates without missing them",
    metaTitle: "Track Passport, Visa, and ID Expiry Dates",
    description:
      "Use a document-based reminder workflow to track passport, visa, and ID expiry dates so the alert stays attached to the paperwork you actually need.",
    intro:
      "Expiry dates are easy to miss because the document disappears until it suddenly matters. This guide explains how to keep renewals tied to the real paperwork so reminders are useful when they appear.",
    primaryKeyword: "track document expiry dates",
    secondaryKeywords: [
      "passport expiry reminder",
      "visa renewal reminder",
      "ID expiry tracker",
      "document renewal reminder",
    ],
    parentSolutionSlug: "document-reminder",
    relatedGuideSlugs: ["organize-important-documents-digitally", "back-up-important-documents-securely"],
    keyTakeaways: [
      "Expiry tracking works best when the reminder stays attached to the source document.",
      "Renewal workflows need the file, not just the alert.",
      "Recurring document checks are more reliable than one-off memory-based reminders.",
    ],
    sections: [
      {
        title: "Store the document where it can be resurfaced later",
        description:
          "A renewal reminder is weak if the passport, visa, or ID is still buried in photos, downloads, or email threads. Start with one searchable document home.",
      },
      {
        title: "Record the date and the buffer window",
        description:
          "Many documents need attention before the final expiry date. Track the renewal window as well as the expiration itself so you are not working at the last minute.",
      },
      {
        title: "Attach context for the follow-up",
        description:
          "Keep notes, required supporting files, and past application records linked to the expiring document so the reminder leads directly into action.",
      },
      {
        title: "Use recurring resurfacing for critical IDs",
        description:
          "For passports, insurance, permits, and licenses, recurring reminders reduce the odds that one missed alert becomes a major problem.",
      },
    ],
    faqs: [
      {
        question: "What is the best way to track passport expiry dates?",
        answer:
          "Store the passport in one document system, attach the expiry and renewal window, and keep any related notes or supporting records with it so the reminder is actionable.",
      },
      {
        question: "Why not just use a calendar reminder?",
        answer:
          "A calendar alert may tell you something is due, but it usually does not carry the actual document and related context you need to complete the renewal.",
      },
    ],
    ctaLabel: "See NeuVault document reminders",
  },
  {
    slug: "search-old-documents-without-folder-chaos",
    title: "How to search old documents without digging through folder chaos",
    metaTitle: "Search Old Documents Without Folder Chaos",
    description:
      "A practical workflow for finding old documents faster using summaries, tags, dates, and related context instead of relying only on exact filenames.",
    intro:
      "Searching old documents gets hard when you remember the situation but not the filename. This guide shows how to improve retrieval by storing more useful context than the file name alone.",
    primaryKeyword: "search old documents",
    secondaryKeywords: [
      "document retrieval",
      "find important documents faster",
      "searchable document vault",
      "retrieve important documents",
    ],
    parentSolutionSlug: "document-retrieval",
    relatedGuideSlugs: ["how-to-scan-and-organize-documents", "organize-important-documents-digitally"],
    keyTakeaways: [
      "Exact-filename search is too weak for real-world document recall.",
      "Summaries, tags, dates, and linked records improve retrieval from partial memory.",
      "The best retrieval systems start during intake and still let you reorganize things later when you need to.",
    ],
    sections: [
      {
        title: "Stop depending on filenames alone",
        description:
          "Old files often arrive with inconsistent names from scanners, downloads, or email exports. Summaries, categories, and tags give retrieval more paths to success.",
      },
      {
        title: "Use type, date, and issue context together",
        description:
          "You may remember that a file was a receipt from a move or a contract from a visa process, even when the exact filename is gone. Store enough context to search that way.",
      },
      {
        title: "Keep linked records together",
        description:
          "When one document is part of a larger issue, linked files help you recover the whole set rather than one isolated record that still leaves you guessing.",
      },
      {
        title: "Review retrieval during quiet moments",
        description:
          "Test whether you can recover important documents from partial memory. That is the fastest way to see whether your system will work under pressure.",
      },
    ],
    faqs: [
      {
        question: "How can I find old documents faster?",
        answer:
          "Use a searchable vault that stores summaries, tags, dates, and linked context, not just filenames and folders.",
      },
      {
        question: "What makes a document vault searchable?",
        answer:
          "Searchable vaults combine OCR, tags, summaries, type and date filters, and related-item linking so retrieval does not depend on exact words alone.",
      },
    ],
    ctaLabel: "See NeuVault document retrieval",
  },
  {
    slug: "back-up-important-documents-securely",
    title: "How to back up important documents securely without losing control",
    metaTitle: "Back Up Important Documents Securely",
    description:
      "Learn how to back up important documents securely using encrypted export bundles and user-controlled storage instead of relying on one cloud provider by default.",
    intro:
      "The safest document backup is not just a copy. It is a copy you can recover, trust, and store in a place you control. This guide explains how to build that backup habit without turning privacy into an afterthought.",
    primaryKeyword: "back up important documents",
    secondaryKeywords: [
      "secure document backup",
      "private document backup",
      "document vault backup",
      "restore important documents",
    ],
    parentSolutionSlug: "secure-document-backup",
    relatedGuideSlugs: ["track-passport-visa-and-id-expiry-dates", "search-old-documents-without-folder-chaos"],
    keyTakeaways: [
      "Document backup should be encrypted, recoverable, and under your control.",
      "Backup reminders matter because good backup habits rarely happen by accident.",
      "Recovery is part of backup quality, not a separate concern.",
    ],
    sections: [
      {
        title: "Choose a backup format built for recovery",
        description:
          "A useful backup should restore into a working document system later. Export bundles are stronger than scattered copies because they preserve structure and portability.",
      },
      {
        title: "Encrypt before the backup leaves your device",
        description:
          "For sensitive records, encryption should happen before storage so your cloud destination acts as a storage layer, not a trust requirement.",
      },
      {
        title: "Use storage you control",
        description:
          "Store backups in the provider or location that fits your privacy needs, whether that is iCloud, Google Drive, Dropbox, or offline storage you manage yourself.",
      },
      {
        title: "Set reminders and test restore paths",
        description:
          "A backup you never refresh or cannot restore is weak protection. Schedule reminders and confirm the restore path before a device failure forces the issue.",
      },
    ],
    faqs: [
      {
        question: "What is the safest way to back up important documents?",
        answer:
          "Use encrypted export bundles, store them in a destination you control, and keep a repeatable reminder schedule so the backup stays current.",
      },
      {
        question: "Should I trust automatic cloud sync as my only backup?",
        answer:
          "Not by itself. Automatic sync can be convenient, but a recovery-focused encrypted backup gives you more control and a cleaner restore path.",
      },
    ],
    ctaLabel: "See NeuVault secure backup",
  },
  {
    slug: "turn-voice-notes-into-searchable-records",
    title: "How to turn voice notes into searchable records you can actually use",
    metaTitle: "Turn Voice Notes Into Searchable Records",
    description:
      "Learn how to capture voice notes quickly, transcribe them into structured text, and keep them searchable alongside your documents and notes.",
    intro:
      "Voice notes are powerful when speed matters, but they become hard to use when they stay as isolated recordings. This guide shows how to turn spoken context into records you can search, revisit, and connect to the rest of your document workflow.",
    primaryKeyword: "voice note transcription",
    secondaryKeywords: [
      "transcribe voice notes",
      "organize voice notes",
      "voice notes and documents app",
      "voice notes for reminders",
    ],
    parentSolutionSlug: "voice-note-transcription",
    relatedGuideSlugs: ["search-old-documents-without-folder-chaos", "organize-important-documents-digitally"],
    keyTakeaways: [
      "Voice capture is most useful when it becomes structured text you can search later.",
      "Spoken context should live near the documents and reminders it explains.",
      "Structured transcripts are stronger than raw transcription dumps.",
    ],
    sections: [
      {
        title: "Capture the thought while it is fresh",
        description:
          "Use voice when typing would slow you down, especially during movement, document review, or follow-up planning.",
      },
      {
        title: "Transcribe into readable structure",
        description:
          "Plain transcripts are better than audio alone, but structured notes are stronger because they remain easy to scan and understand later.",
      },
      {
        title: "Link the voice note to the document issue",
        description:
          "A voice note explaining a receipt, contract, or travel file should stay with that record so the meaning is not lost when you return later.",
      },
      {
        title: "Keep voice-derived notes searchable and exportable",
        description:
          "Once the spoken note becomes structured text, it should participate in search, reminders, and export workflows like the rest of your vault.",
      },
    ],
    faqs: [
      {
        question: "How do I organize voice notes so I can find them later?",
        answer:
          "Transcribe them into structured text, attach them to the related document issue, and store them in the same searchable system as your files and notes.",
      },
      {
        question: "Why is voice note transcription useful for document workflows?",
        answer:
          "Because it captures context fast, then turns that context into searchable text that can support retrieval, reminders, and decision-making later.",
      },
    ],
    ctaLabel: "See NeuVault voice note transcription",
  },
];

const guideLookup = new Map(guidePages.map((guide) => [guide.slug, guide]));

export function getGuidePageBySlug(slug: string) {
  return guideLookup.get(slug) ?? null;
}

export function getGuidePagesBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => guideLookup.get(slug))
    .filter((guide): guide is GuidePage => Boolean(guide));
}

export function getGuidesForSolution(slug: string) {
  return guidePages.filter((guide) => guide.parentSolutionSlug === slug);
}

export function buildGuideMetadata(guide: GuidePage) {
  return buildMetadata({
    title: guide.metaTitle,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    keywords: [guide.primaryKeyword, ...guide.secondaryKeywords],
  });
}

export function buildGuideBreadcrumbJsonLd(guide: GuidePage) {
  return buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: guide.metaTitle, path: `/guides/${guide.slug}` },
  ]);
}

export function buildGuideArticleJsonLd(guide: GuidePage) {
  const parentSolution = getSolutionPageBySlug(guide.parentSolutionSlug)?.page;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    about: [guide.primaryKeyword, ...guide.secondaryKeywords],
    mentions: parentSolution
      ? [
          {
            "@type": "SoftwareApplication",
            name: `${SITE_NAME} ${parentSolution.metaTitle}`,
            url: absoluteUrl(`/${parentSolution.slug}`),
          },
        ]
      : [],
  };
}

export function buildGuideFaqJsonLd(guide: GuidePage) {
  return buildFaqJsonLd(guide.faqs);
}