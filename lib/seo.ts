import type { Metadata } from "next";

export const SITE_NAME = "NeuVault";
export const SITE_URL = "https://neuvault.app";
export const SUPPORT_EMAIL = "support@neuvault.app";

export const IOS_APP_STORE_URL =
  "https://apps.apple.com/ng/app/neuvault/id6759370392";

export const ANDROID_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=app.neuvault";

export const WINDOWS_MICROSOFT_STORE_URL =
  "https://apps.microsoft.com/detail/9PNM0GXZPT8T?hl=en-us&gl=US&ocid=pdpshare";

export const DEFAULT_TITLE =
  "NeuVault | Private AI Vault for Documents, Notes, Scans, and Voice Notes";

export const DEFAULT_DESCRIPTION =
  "NeuVault is a private, local-first AI vault for the documents life will ask you for later. Capture documents, scans, notes, screenshots, and voice notes, organize them automatically, ask Nova, review important dates, and restore your vault across devices.";

export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

const BASE_KEYWORDS = [
  "private AI document vault",
  "private document vault",
  "AI document organizer",
  "document organization app",
  "scan and organize documents",
  "document reminder app",
  "document retrieval app",
  "secure document backup",
  "encrypted document backup",
  "local-first document app",
  "local-first document vault",
  "AI document assistant",
  "voice note transcription",
  "notes export",
  "organize important documents",
  "find documents faster",
  "document memory app",
  "private document assistant",
  "organize scans and notes",
  "cross-device document backup",
  "Windows document vault app",
];

export type SeoFaq = {
  question: string;
  answer: string;
};

export type SolutionPage = {
  slug: string;
  aliases?: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  ctaTitle: string;
  ctaDescription: string;
  relatedSlugs: string[];
  benefits: { title: string; description: string }[];
  appProof: string[];
  keywords: string[];
  faqs: SeoFaq[];
};

export const solutionPages: SolutionPage[] = [
  {
    slug: "document-organization",
    primaryKeyword: "document organization app",
    secondaryKeywords: [
      "organize important documents",
      "digital paperwork organization",
      "organize personal documents digitally",
      "private document organizer",
      "AI document organizer",
    ],
    metaTitle: "Document Organization App for Important Files",
    title: "Organize important documents, scans, notes, and voice records in one private vault",
    description:
      "NeuVault is a private document organization app for important files, scans, notes, screenshots, PDFs, and voice notes. Capture records, organize them automatically, keep useful context, and find them faster when life asks.",
    eyebrow: "Document organization",
    intro:
      "NeuVault is built for the moment when your important files are technically saved, but practically lost. Instead of another generic file dump, it gives you one private place to organize documents, scans, notes, voice records, summaries, tags, reminders, and linked context.",
    ctaTitle: "Build a document system you can trust later",
    ctaDescription:
      "Use NeuVault when you need more than folders. Keep scans, uploads, notes, voice records, reminders, and linked documents together so important records stay understandable and retrievable.",
    relatedSlugs: [
      "scan-organization",
      "document-retrieval",
      "secure-document-backup",
    ],
    benefits: [
      {
        title: "Organize documents automatically",
        description:
          "NeuVault can summarize, tag, classify, and structure documents during intake so your vault does not become another messy folder.",
      },
      {
        title: "Keep document context attached",
        description:
          "Documents, summaries, notes, extracted details, tags, and linked records stay together so you do not need to rebuild the story from memory.",
      },
      {
        title: "Handle real-life paperwork",
        description:
          "Receipts, IDs, agreements, school files, travel records, scans, business records, and screenshots can live inside one private vault.",
      },
    ],
    appProof: [
      "NeuVault organizes intake items into groups and subgroups inside the vault.",
      "NeuVault supports documents, scans, notes, voice notes, and screenshots.",
      "Linked Documents lets users group related records around real-life context.",
    ],
    keywords: [
      "document organization app",
      "organize important documents",
      "AI document organizer",
      "private document organizer",
      "digital paperwork organization",
    ],
    faqs: [
      {
        question: "What makes NeuVault different from a normal folder app?",
        answer:
          "NeuVault is built around document context. It keeps summaries, tags, notes, reminders, linked records, and vault search together instead of leaving you with flat folders.",
      },
      {
        question: "Can NeuVault organize notes, voice notes, scans, and files together?",
        answer:
          "Yes. NeuVault supports documents, scans, notes, screenshots, and voice notes so your important records can live in one private vault.",
      },
    ],
  },
  {
    slug: "document-reminder",
    primaryKeyword: "document reminder app",
    secondaryKeywords: [
      "reminders for important documents",
      "renewal date tracker",
      "document deadline reminder",
      "track document expiry dates",
      "document attention app",
    ],
    metaTitle: "Document Reminder App for Expiry Dates, Renewals, and Follow-ups",
    title: "Review important document dates before they become urgent",
    description:
      "NeuVault helps you review important document dates, renewals, expiry dates, deadlines, and follow-ups. Keep reminders attached to the records they belong to.",
    eyebrow: "Attention",
    intro:
      "A reminder only helps when it stays attached to the document you need to revisit. NeuVault keeps important dates and follow-ups tied to the source record or linked group, so future actions are easier to trust.",
    ctaTitle: "Keep deadlines attached to the document they belong to",
    ctaDescription:
      "Review renewal windows, expiry dates, due dates, and follow-up actions without separating the reminder from the real document context.",
    relatedSlugs: [
      "scan-organization",
      "document-retrieval",
      "secure-document-backup",
    ],
    benefits: [
      {
        title: "Review future dates found in documents",
        description:
          "NeuVault can surface dates like expirations, renewals, due dates, and follow-ups so important records do not stay buried.",
      },
      {
        title: "Bring important records back later",
        description:
          "Use reminders and resurfacing to revisit documents at the right time instead of hoping you remember later.",
      },
      {
        title: "Keep reminders connected to source records",
        description:
          "When a document needs attention, NeuVault points you back to the record or linked group behind it.",
      },
    ],
    appProof: [
      "NeuVault includes Attention and resurfacing flows for important records.",
      "Users can set document-level reminders and backup reminders.",
      "Attention items can point back to the relevant record context.",
    ],
    keywords: [
      "document reminder app",
      "document attention app",
      "reminders for important documents",
      "renewal date tracker",
      "track document expiry dates",
    ],
    faqs: [
      {
        question: "What kinds of document reminders can NeuVault help with?",
        answer:
          "NeuVault is designed for expiration dates, renewals, due dates, follow-ups, and other future dates that live inside important records.",
      },
      {
        question: "Do reminders link back to the source document?",
        answer:
          "Yes. NeuVault keeps reminders connected to the relevant document or linked group so the surrounding context is still there when you need it.",
      },
    ],
  },
  {
    slug: "document-retrieval",
    aliases: ["smart-document-retrival", "smart-document-retrieval"],
    primaryKeyword: "document retrieval app",
    secondaryKeywords: [
      "find important documents faster",
      "searchable document vault",
      "search old documents",
      "AI document search",
      "private document search",
    ],
    metaTitle: "Document Retrieval App for Fast Private Search",
    title: "Find important documents faster with a searchable private vault",
    description:
      "NeuVault improves document retrieval with local-first organization, summaries, tags, linked context, and Nova, your vault-aware AI assistant.",
    eyebrow: "Document retrieval",
    intro:
      "The hard part is rarely saving a file. The hard part is finding it again when the pressure is on. NeuVault is designed so retrieval feels fast even when you only remember part of the story, a date, or a related item.",
    ctaTitle: "Make document retrieval faster than digging through folders",
    ctaDescription:
      "Search by title, summary, type, date, tags, and related context so old scans, receipts, IDs, and agreements are easier to recover when you need them.",
    relatedSlugs: [
      "document-organization",
      "scan-organization",
      "secure-document-backup",
    ],
    benefits: [
      {
        title: "Search by meaning, not only filenames",
        description:
          "Titles, summaries, tags, groups, and related records make retrieval easier when you do not remember the exact file name.",
      },
      {
        title: "Find documents from partial memory",
        description:
          "Search by type, date, summary, tag, or related context when you remember the situation but not the filename.",
      },
      {
        title: "Ask Nova when search is not enough",
        description:
          "Nova can help answer questions from your vault context and guide you toward the record you need.",
      },
    ],
    appProof: [
      "Nova is designed to answer document-grounded questions from the vault.",
      "NeuVault uses grouped organization, summaries, tags, and linked context to improve retrieval.",
      "Linked Documents helps users recover related records from one place.",
    ],
    keywords: [
      "document retrieval app",
      "find important documents faster",
      "AI document search",
      "searchable document vault",
      "private document search",
    ],
    faqs: [
      {
        question: "Is NeuVault only keyword search?",
        answer:
          "No. NeuVault combines grouped organization, summaries, tags, linked context, and Nova assistant workflows so retrieval is not limited to exact filenames.",
      },
      {
        question: "Can NeuVault help when I only remember part of the document?",
        answer:
          "Yes. You can use summaries, tags, document types, dates, linked records, and Nova to recover documents from partial memory.",
      },
    ],
  },
  {
    slug: "secure-document-backup",
    primaryKeyword: "secure document backup",
    secondaryKeywords: [
      "private document backup",
      "back up important documents",
      "document vault backup",
      "restore important documents",
      "cross-device document backup",
    ],
    metaTitle: "Secure Document Backup and Cross-Device Restore",
    title: "Back up important documents securely without giving up control",
    description:
      "NeuVault supports encrypted document backup and cross-device restore with user-controlled storage choices, so your vault can move with you across mobile and desktop.",
    eyebrow: "Secure backup",
    intro:
      "Backup only works when it is both secure and practical. NeuVault is built so you can export encrypted vault backups, choose where they live, and restore your vault across devices without handing your records to one permanent cloud archive.",
    ctaTitle: "Protect your vault with backup that stays under your control",
    ctaDescription:
      "Create encrypted backup bundles, choose your own storage destination, and restore important documents on another device when you need them.",
    relatedSlugs: [
      "document-retrieval",
      "document-organization",
      "document-reminder",
    ],
    benefits: [
      {
        title: "Create encrypted vault backups",
        description:
          "NeuVault supports encrypted backup bundles designed to be stored in cloud storage or offline storage you control.",
      },
      {
        title: "Choose where your backup lives",
        description:
          "You decide whether backups live in Google Drive, iCloud, Dropbox, another cloud provider, or another location you trust.",
      },
      {
        title: "Restore across devices",
        description:
          "NeuVault is designed around cross-device recovery, so your vault can move between mobile and desktop workflows.",
      },
    ],
    appProof: [
      "NeuVault supports encrypted backup and restore flows.",
      "The backup model is user-controlled rather than forced permanent cloud storage.",
      "NeuVault is built for mobile and desktop compatibility.",
    ],
    keywords: [
      "secure document backup",
      "private document backup",
      "cross-device document backup",
      "back up important documents",
      "restore important documents",
    ],
    faqs: [
      {
        question: "Does NeuVault store my backups for me?",
        answer:
          "NeuVault is designed around user-controlled backup. You create encrypted backups and choose where they are stored.",
      },
      {
        question: "Can I restore my vault on another device?",
        answer:
          "Yes. NeuVault is designed to support encrypted restore across devices, including mobile and desktop workflows.",
      },
    ],
  },
  {
    slug: "notes-export",
    primaryKeyword: "notes export",
    secondaryKeywords: [
      "export scans and notes",
      "export notes to pdf",
      "export notes to word",
      "portable notes and records",
      "document notes app",
    ],
    metaTitle: "Notes Export to PDF, Word, or CSV",
    title: "Export notes, scans, and records without locking them into one app",
    description:
      "NeuVault lets you create rich notes inside your vault and export notes to PDF, Word, or CSV so your records stay portable, shareable, and useful.",
    eyebrow: "Notes export",
    intro:
      "Sometimes the important thing is not just the document. It is the note you wrote about it. NeuVault lets you keep notes inside the same private vault and export them into useful formats when you need to share, archive, or process them elsewhere.",
    ctaTitle: "Keep notes portable without breaking their document context",
    ctaDescription:
      "Capture notes next to your files, then export them to the format your next workflow needs, from PDF handoffs to Word editing and CSV analysis.",
    relatedSlugs: [
      "voice-note-transcription",
      "document-retrieval",
      "document-organization",
    ],
    benefits: [
      {
        title: "Keep notes next to document context",
        description:
          "Instead of writing separate notes in another app, NeuVault keeps note capture close to the files, scans, reminders, and linked records they belong with.",
      },
      {
        title: "Export notes into useful formats",
        description:
          "NeuVault supports note export to PDF, Word, and CSV so a note can move into reporting, filing, or editing workflows.",
      },
      {
        title: "Turn useful AI responses into notes",
        description:
          "When Nova gives a helpful answer, that response can become part of your vault instead of disappearing inside a chat.",
      },
    ],
    appProof: [
      "NeuVault supports note creation inside the vault.",
      "NeuVault supports note export workflows.",
      "Nova responses can become notes inside the product loop.",
    ],
    keywords: [
      "notes export",
      "export notes to pdf",
      "export notes to word",
      "document notes app",
      "portable notes and records",
    ],
    faqs: [
      {
        question: "Can NeuVault export notes to more than one format?",
        answer:
          "Yes. NeuVault supports useful note export workflows including PDF, Word, and CSV.",
      },
      {
        question: "Why keep notes inside NeuVault instead of a separate notes app?",
        answer:
          "Because notes often need surrounding document context. NeuVault keeps notes, files, reminders, and linked records together.",
      },
    ],
  },
  {
    slug: "voice-note-transcription",
    primaryKeyword: "voice note transcription",
    secondaryKeywords: [
      "transcribe voice notes",
      "organize voice notes",
      "voice notes and documents app",
      "voice notes for reminders",
      "voice note to structured note",
    ],
    metaTitle: "Voice Note Transcription App",
    title: "Turn voice notes into structured, searchable records you can keep",
    description:
      "NeuVault records or accepts voice notes, transcribes them, and turns them into structured notes that fit into the rest of your private vault.",
    eyebrow: "Voice note transcription",
    intro:
      "Voice capture is useful because it is fast. It becomes truly useful when it turns into text you can search, revisit, and connect to other records. NeuVault helps move voice notes into structured notes that stay useful later.",
    ctaTitle: "Capture voice notes fast and keep them useful later",
    ctaDescription:
      "Record spoken context when typing is inconvenient, then turn it into structured notes you can search, export, and connect to the rest of your vault.",
    relatedSlugs: [
      "notes-export",
      "document-retrieval",
      "document-organization",
    ],
    benefits: [
      {
        title: "Capture voice notes quickly",
        description:
          "Voice notes help you save context in the moment without opening a second workflow just to remember something later.",
      },
      {
        title: "Transcribe voice into structured text",
        description:
          "NeuVault can turn voice capture into readable note content that is easier to revisit.",
      },
      {
        title: "Keep voice notes searchable",
        description:
          "Once transcribed, voice notes become part of the same private vault as your documents, scans, and notes.",
      },
    ],
    appProof: [
      "NeuVault supports voice note capture and transcription.",
      "Voice notes are part of the same vault workflow as documents and notes.",
      "Transcribed voice notes can become searchable records.",
    ],
    keywords: [
      "voice note transcription",
      "transcribe voice notes",
      "organize voice notes",
      "voice notes and documents app",
      "voice note to structured note",
    ],
    faqs: [
      {
        question: "Does NeuVault only save raw audio?",
        answer:
          "No. NeuVault is designed to transcribe voice notes into structured text so they become easier to read, search, and keep.",
      },
      {
        question: "Can voice notes live next to other documents?",
        answer:
          "Yes. Voice notes are part of the same NeuVault system as notes, uploads, scans, and linked document context.",
      },
    ],
  },
  {
    slug: "scan-organization",
    primaryKeyword: "scan and organize documents",
    secondaryKeywords: [
      "organize scanned documents",
      "scan and store documents",
      "document scanning and organizing software",
      "store scanned documents securely",
      "scan documents into private vault",
    ],
    metaTitle: "Scan and Organize Documents App",
    title: "Scan and organize documents without losing them later",
    description:
      "NeuVault helps you scan and organize documents, extract structure from paperwork, and store scanned files in one private vault you can search, review, and back up later.",
    eyebrow: "Scan organization",
    intro:
      "Scanning is only the first step. The real problem starts when the scan lands in a camera roll, random folder, or cloud drive with no context. NeuVault helps turn scans into usable records that remain organized, searchable, and ready for retrieval later.",
    ctaTitle: "Move from simple scanning to real document organization",
    ctaDescription:
      "Capture paperwork, run OCR when needed, group scanned files with the right records, and keep everything ready for reminders, retrieval, and secure backup.",
    relatedSlugs: [
      "document-organization",
      "document-retrieval",
      "secure-document-backup",
    ],
    benefits: [
      {
        title: "Scan and organize documents in one workflow",
        description:
          "Scanned paperwork moves into NeuVault instead of sitting forgotten in a generic photo stream or download folder.",
      },
      {
        title: "Use OCR and extraction to make scans useful",
        description:
          "NeuVault can extract meaning from scanned content so it becomes easier to classify, summarize, and search.",
      },
      {
        title: "Store scanned paperwork where you can retrieve it",
        description:
          "A scan can be summarized, tagged, grouped, linked, searched, and backed up as part of a bigger vault story.",
      },
    ],
    appProof: [
      "NeuVault includes document scanning intake flows.",
      "Scanned items can be grouped, tagged, summarized, and linked like other vault records.",
      "NeuVault is designed for private document storage and retrieval.",
    ],
    keywords: [
      "scan and organize documents",
      "organize scanned documents",
      "scan and store documents",
      "document scanning and organizing software",
      "store scanned documents securely",
    ],
    faqs: [
      {
        question: "Can NeuVault organize scans after capture?",
        answer:
          "Yes. NeuVault is built to classify, summarize, group, link, and search scanned documents after intake so they remain useful later.",
      },
      {
        question: "Does NeuVault support OCR for scans?",
        answer:
          "Yes. NeuVault can use OCR and extraction workflows to turn scanned content into useful vault data.",
      },
    ],
  },
];

const solutionLookup = new Map<
  string,
  { page: SolutionPage; canonicalSlug: string }
>();

for (const page of solutionPages) {
  solutionLookup.set(page.slug, { page, canonicalSlug: page.slug });

  for (const alias of page.aliases ?? []) {
    solutionLookup.set(alias, { page, canonicalSlug: page.slug });
  }
}

export function getSolutionPageBySlug(slug: string) {
  return solutionLookup.get(slug) ?? null;
}

export function getSolutionPagesBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => solutionPages.find((page) => page.slug === slug))
    .filter((page): page is SolutionPage => Boolean(page));
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
  image?: string;
};

export function buildMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  keywords = [],
  noindex = false,
  image = DEFAULT_OG_IMAGE_PATH,
}: BuildMetadataInput = {}): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = absoluteUrl(canonicalPath);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: Array.from(new Set([...BASE_KEYWORDS, ...keywords])),
    alternates: {
      canonical: canonicalPath,
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
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: image,
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
      images: [image],
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    email: SUPPORT_EMAIL,
    sameAs: [
      IOS_APP_STORE_URL,
      ANDROID_PLAY_STORE_URL,
      WINDOWS_MICROSOFT_STORE_URL,
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: SUPPORT_EMAIL,
        contactType: "customer support",
        availableLanguage: ["English"],
      },
    ],
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#app`,
    name: SITE_NAME,
    url: SITE_URL,
    operatingSystem: "iOS, Android, Windows",
    applicationCategory: "ProductivityApplication",
    description: DEFAULT_DESCRIPTION,
    downloadUrl: [
      IOS_APP_STORE_URL,
      ANDROID_PLAY_STORE_URL,
      WINDOWS_MICROSOFT_STORE_URL,
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "Private local-first document vault",
      "AI document organization",
      "Document scanning",
      "Voice note transcription",
      "Notes export",
      "Nova AI assistant",
      "Document reminders and Attention",
      "Encrypted cross-device backup and restore",
      "Linked Documents",
      ...solutionPages.map((page) => page.metaTitle),
    ],
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
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

export function buildWebPageJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}
