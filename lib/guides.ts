import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  getSolutionPageBySlug,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import { guideDepth } from "@/lib/guideDepth";

export type GuideStep = {
  title: string;
  description: string;
  details?: string[];
  inApp?: string[];
};

export type GuidePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription?: string;
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
  checklist?: string[];
  datePublished?: string;
  dateModified?: string;
};

const DEFAULT_GUIDE_DATE = "2026-05-02";

const baseGuides: GuidePage[] = [
  {
    slug: "plan-tasks-from-notes-and-documents",
    title: "How to plan tasks from notes and documents in NeuVault",
    metaTitle: "Local-First Planner: Turn Notes and Documents Into Tasks",
    metaDescription: "Plan tasks from notes, documents, and reminders in NeuVault’s local-first Planner. Work offline and sync task changes when connected.",
    description: "Turn notes, documents, and reminders into tasks with their sources attached. Use NeuVault's local-first Planner offline and sync when connected.",
    intro: "A meeting note, a renewal letter, and a project brief all contain work to do. NeuVault Planner keeps that work connected to its source, so you can see what is next and open the information behind it. This guide walks through capturing tasks, choosing a view, and working offline.",
    primaryKeyword: "plan tasks from notes",
    secondaryKeywords: ["local-first planner", "tasks with documents attached", "meeting action items", "offline task planning"],
    parentSolutionSlug: "document-reminder",
    relatedGuideSlugs: ["turn-voice-notes-into-searchable-records", "organize-important-documents-digitally", "track-passport-visa-and-id-expiry-dates"],
    keyTakeaways: [
      "Keep each task attached to the note or document that explains it.",
      "Use Agenda, Week, Month, or Board to view the same plan in different ways.",
      "Create and edit tasks locally while offline. Sync and Nova need internet.",
    ],
    sections: [
      {
        title: "Start with the information behind the task",
        description: "Review the note, document, or recording before planning the work. Check that an action item says what you actually intend to do.",
        inApp: [
          "Open a note with action items and choose Plan action items from this note. The button shows how many action items are available.",
          "You can also plan from a document, a Vault Map card or group, or a Nova answer. Keep the supporting material attached to the task.",
          "Review the proposed tasks and their dates before saving them to Planner.",
        ],
      },
      {
        title: "Bring reminders into your plan",
        description: "A reminder identifies something that needs attention. A Planner task records the work you will do about it, such as preparing a renewal application before the expiry date.",
        inApp: [
          "Open Planner and choose Plan from reminders to review document dates and reminders you have set.",
          "Plan an item to put it on your schedule with its document attached.",
          "Choose a realistic action date. For a renewal, allow time to gather forms and submit the application.",
        ],
      },
      {
        title: "Add dates, priorities, and repeats",
        description: "Give each task enough detail to make the next action clear. Use a repeat for work that returns on a regular schedule.",
        inApp: [
          "For a new task, type a short instruction such as Pay rent Friday. NeuVault reads the date on your device without using AI credits.",
          "Open the item to review its date, priority, notes, and supporting files. Set a repeat when needed.",
          "Mark a repeating item done when you finish it. NeuVault keeps the completed item and creates its next occurrence.",
        ],
      },
      {
        title: "Choose the view that helps you work",
        description: "The four views show the same tasks and events. Changing views does not create a separate plan.",
        inApp: [
          "Use Agenda for work in time order, including overdue and upcoming items.",
          "Use Week or Month to see your schedule. On desktop, drag an item to another day to move it.",
          "Use Board to organize work in columns you name, such as To do and Done. Move cards as work progresses.",
        ],
      },
      {
        title: "Ask Nova for help, then review the changes",
        description: "Nova can answer questions about your plan or propose changes. You decide which changes to apply.",
        inApp: [
          "Open Nova in Planner and ask what is due today, what is overdue, or what is coming this week.",
          "Ask it to add or update tasks, move work to a Board column, or find supporting documents to attach.",
          "Review the proposal before confirming. Nova needs internet and uses credits.",
        ],
      },
      {
        title: "Understand what local-first means for Planner",
        description: "Your tasks save on your device, so you can keep working without a connection. Online sync brings Planner changes to your other signed-in devices.",
        details: [
          "Create, view, edit, and complete tasks offline. Planner sync sends task information, including titles, notes, dates, board columns, and reminder settings, through your account when connected.",
          "Attached files do not upload through Planner sync. Bring them to another device using an encrypted backup or a supported bundle. Nova and server-delivered reminders need internet.",
        ],
      },
    ],
    faqs: [
      { question: "Is NeuVault Planner local-first?", answer: "Yes. Tasks save on your device and can be viewed, created, edited, and completed offline. Planner information syncs through your account when connected; attached files transfer separately." },
      { question: "Does adding a task use AI credits?", answer: "Manually adding and editing tasks does not use AI credits. Reading a date from a quick-add instruction happens on your device. Asking Nova to help uses credits and requires internet." },
      { question: "Do attached documents sync with Planner tasks?", answer: "The task and its document references sync, but the files themselves do not. Use encrypted backup and restore or a supported bundle to bring the files to another device." },
    ],
    checklist: ["Review the action before creating a task", "Keep the source note or document attached", "Check dates, priorities, and repeats", "Choose a view for today's work", "Review Nova proposals before confirming", "Bring supporting files to other devices separately"],
    ctaLabel: "Explore document reminders",
    datePublished: "2026-11-02",
    dateModified: "2026-11-02",
  },

  {
    slug: "how-to-scan-and-organize-documents",
    title: "How to scan and organize documents without losing them later",
    metaTitle: "Scan and Organize Documents in a Local-First Vault",
    metaDescription: "Learn to scan, group, and find documents in NeuVault’s local-first vault, with optional online AI organization, reminders, and encrypted backups.",
    description:
      "Learn how to scan and organize documents so paperwork becomes searchable, grouped, remembered, and ready for reminders or private backup later.",
    intro:
      "Scanning a document is easy. Keeping it useful later is harder. This guide shows how to move from simple capture into a system where scanned paperwork stays organized, searchable, connected, and ready when life asks for it again.",
    primaryKeyword: "scan and organize documents",
    secondaryKeywords: [
      "organize scanned documents",
      "scan and store documents",
      "document scanning and organizing software",
      "store scanned documents securely",
      "scan documents into private vault",
    ],
    parentSolutionSlug: "scan-organization",
    relatedGuideSlugs: [
      "plan-tasks-from-notes-and-documents",
      "organize-important-documents-digitally",
      "search-old-documents-without-folder-chaos",
    ],
    keyTakeaways: [
      "Capture is only step one. The value comes from what gets read out of the scan: a summary, tags, key details and dates, and the group it lands in.",
      "Scans should land in a document system, not disappear into a camera roll or random folder.",
      "The best workflow connects scans to search, reminders, linked records, and private backup from the start.",
    ],
    sections: [
      {
        title: "Capture into one destination",
        description:
          "Choose a single intake path for paper records so receipts, forms, letters, IDs, certificates, and agreements do not scatter across photos, downloads, chats, and messaging apps.",
      },
      {
        title: "Run OCR and keep the extracted meaning",
        description:
          "A scan is more useful when its meaning is written down. Names, dates, amounts and a short summary let you find and understand the record without reopening the file.",
      },
      {
        title: "Group the scan with the right document story",
        description:
          "Store the scan next to the rest of the issue it belongs to, such as a visa file, insurance claim, lease, school application, tax folder, or household paperwork set.",
      },
      {
        title: "Add the future action while the context is fresh",
        description:
          "If the document has a renewal date, due date, expiration date, or follow-up step, make sure a reminder is attached before you move on. That is how scans stay useful instead of being forgotten.",
      },
    ],
    faqs: [
      {
        question: "What is the best way to organize scanned documents?",
        answer:
          "Scan into one document system that reads the text and pulls out the key details, keep each file in the right group with its related records, and attach any reminder or follow-up before the context fades.",
      },
      {
        question: "Should I keep scanned documents in photo folders?",
        answer:
          "Only temporarily. Camera rolls and generic folders can store images, but they are weak for retrieval, document context, reminders, and long-term recovery.",
      },
    ],
    ctaLabel: "See NeuVault scan organization",
  },
  {
    slug: "organize-important-documents-digitally",
    title: "How to organize important documents digitally at home or work",
    metaTitle: "Organize Important Documents With a Local-First Vault",
    metaDescription: "Organize files and notes in a local-first workspace. Keep related records together, plan follow-ups, and find important documents when you need them.",
    description:
      "A practical guide to organizing important documents digitally without relying on endless folder cleanup, perfect filenames, or memory-heavy systems.",
    intro:
      "Digital paperwork gets messy fast because the same document problem usually spans uploads, scans, screenshots, notes, dates, and follow-up tasks. This guide shows how to build a document memory system that stays usable after the first cleanup week.",
    primaryKeyword: "organize important documents",
    secondaryKeywords: [
      "document organization",
      "organize personal documents digitally",
      "digital paperwork organization",
      "family document organizer",
      "private document vault",
    ],
    parentSolutionSlug: "document-organization",
    relatedGuideSlugs: [
      "plan-tasks-from-notes-and-documents",
      "how-to-scan-and-organize-documents",
      "track-passport-visa-and-id-expiry-dates",
    ],
    keyTakeaways: [
      "Organize by real-life issue or document set, not by abstract folder perfection.",
      "Keep files, notes, summaries, dates, and reminders in the same workflow whenever possible.",
      "A good document system reduces future searching, not just present clutter.",
    ],
    sections: [
      {
        title: "Start with categories you will actually remember",
        description:
          "Use broad categories like travel, insurance, housing, school, taxes, health, family records, and business admin rather than dozens of low-value subfolders that only make sense during setup.",
      },
      {
        title: "Keep document context attached",
        description:
          "Notes, summaries, scans, receipts, linked records, and reminders should stay with the file they explain. That is how the system remains understandable months later.",
      },
      {
        title: "Give active paperwork a reminder, and let reference stay quiet",
        description:
          "Some items need reminders and resurfacing while others are reference-only. Set a reminder or resurfacing on the active ones and pin what you open often, so your vault brings back what needs you and leaves the rest in place.",
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
          "Use broad categories, attach notes and reminders to the source document, and organize around real-life issues so the system stays retrievable later.",
      },
      {
        question: "What kinds of documents should go into one digital vault?",
        answer:
          "IDs, receipts, leases, insurance records, travel files, school paperwork, contracts, certificates, medical files, and other important records that benefit from search, reminders, and linked context.",
      },
    ],
    ctaLabel: "See NeuVault document organization",
  },
  {
    slug: "track-passport-visa-and-id-expiry-dates",
    title: "How to track passport, visa, and ID expiration dates without missing them",
    metaTitle: "Track ID and Passport Dates With a Local-First Vault",
    metaDescription: "Keep travel records in NeuVault’s local-first vault. Track passport, visa, and ID dates and plan renewal tasks with supporting documents attached.",
    description:
      "Use a document-based reminder workflow to track passport, visa, ID, permit, and renewal dates so the alert stays attached to the paperwork you need.",
    intro:
      "Expiration dates are easy to miss because the document disappears until it suddenly matters. This guide explains how to keep renewals tied to the real paperwork so reminders are useful when they appear.",
    primaryKeyword: "track document expiration dates",
    secondaryKeywords: [
      "passport expiration reminder",
      "visa renewal reminder",
      "ID expiration tracker",
      "document renewal reminder",
      "document deadline reminder",
    ],
    parentSolutionSlug: "document-reminder",
    relatedGuideSlugs: [
      "plan-tasks-from-notes-and-documents",
      "organize-important-documents-digitally",
      "back-up-important-documents-securely",
    ],
    keyTakeaways: [
      "Expiration tracking works best when the reminder stays attached to the source document.",
      "Renewal workflows need the file and supporting context, not just the alert.",
      "Recurring document checks are more reliable than one-off memory-based reminders.",
    ],
    sections: [
      {
        title: "Store the document where it can be resurfaced later",
        description:
          "A renewal reminder is weak if the passport, visa, ID, permit, or license is still buried in photos, downloads, or email threads. Start with one searchable document home.",
      },
      {
        title: "Record the date and plan for the lead time",
        description:
          "Many documents need attention well before the final expiration date. Know how long the renewal takes, and plan the reminder for when you need to start, not just for the expiration itself.",
      },
      {
        title: "Attach context for the follow-up",
        description:
          "Keep notes, required supporting files, past applications, receipts, and appointment records linked to the expiring document so the reminder leads directly into action.",
      },
      {
        title: "Use recurring resurfacing for critical IDs",
        description:
          "For passports, insurance, permits, licenses, visas, and work documents, recurring reminders reduce the odds that one missed alert becomes a major problem.",
      },
    ],
    faqs: [
      {
        question: "What is the best way to track passport expiration dates?",
        answer:
          "Store the passport in one document system, make sure its expiration date has a reminder, add an earlier one if the renewal takes time, and keep related notes or supporting records with it so the reminder is actionable.",
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
    metaTitle: "Find Old Documents in Your Local-First Vault",
    metaDescription: "Find saved documents in NeuVault’s local-first vault using titles, tags, summaries, and related records. Use online Nova when you need AI assistance.",
    description:
      "A practical workflow for finding old documents faster using summaries, tags, dates, OCR, and related context instead of relying only on exact filenames.",
    intro:
      "Searching old documents gets hard when you remember the situation but not the filename. This guide shows how to improve retrieval by storing more useful context than the file name alone.",
    primaryKeyword: "search old documents",
    secondaryKeywords: [
      "document retrieval",
      "find important documents faster",
      "searchable document vault",
      "retrieve important documents",
      "AI document search",
    ],
    parentSolutionSlug: "document-retrieval",
    relatedGuideSlugs: [
      "how-to-scan-and-organize-documents",
      "organize-important-documents-digitally",
    ],
    keyTakeaways: [
      "Exact-filename search is too weak for real-world document recall.",
      "Summaries, tags, document types, dates, and linked records improve retrieval from partial memory.",
      "The best retrieval systems start during intake and still let you reorganize things later when you need to.",
    ],
    sections: [
      {
        title: "Stop depending on filenames alone",
        description:
          "Old files often arrive with inconsistent names from scanners, downloads, email exports, WhatsApp attachments, and cloud folders. Summaries, categories, and tags give retrieval more paths to success.",
      },
      {
        title: "Use type, date, and issue context together",
        description:
          "You may remember that a file was a receipt from a move, a certificate from school, or a contract from a client process even when the exact filename is gone. Store enough context to search that way.",
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
          "Use a searchable vault that stores summaries, tags, dates, and linked context for every file, not just filenames and folders.",
      },
      {
        question: "What makes a document vault searchable?",
        answer:
          "Searchable vaults combine text recognition that pulls out key details, summaries and tags, type and date filters, and related-item linking so retrieval does not depend on the exact filename.",
      },
    ],
    ctaLabel: "See NeuVault document retrieval",
  },
  {
    slug: "back-up-important-documents-securely",
    title: "How to back up important documents securely without losing control",
    metaTitle: "Back Up Your Local-First Vault Securely",
    metaDescription: "Back up NeuVault’s local-first vault with encrypted bundles. Choose where to store your backup and restore files using your Recovery Key.",
    description:
      "Learn how to back up important documents securely using encrypted export bundles and user-controlled storage instead of depending on one cloud provider by default.",
    intro:
      "The safest document backup is not just a copy. It is a copy you can recover, trust, and store in a place you control. This guide explains how to build that backup habit without turning privacy into an afterthought.",
    primaryKeyword: "back up important documents",
    secondaryKeywords: [
      "secure document backup",
      "private document backup",
      "document vault backup",
      "restore important documents",
      "encrypted document backup",
    ],
    parentSolutionSlug: "secure-document-backup",
    relatedGuideSlugs: [
      "track-passport-visa-and-id-expiry-dates",
      "search-old-documents-without-folder-chaos",
    ],
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
          "For sensitive records, encryption should happen before storage so your cloud destination acts as a storage layer, not a trust requirement. Keep that key somewhere safe: without it, the backup cannot be opened.",
      },
      {
        title: "Use storage you control",
        description:
          "Store backups in the provider or location that fits your privacy needs, whether that is a cloud drive you already use or an external drive you manage yourself.",
      },
      {
        title: "Set reminders and test restore paths",
        description:
          "A backup you never refresh or cannot restore is weak protection. Schedule reminders, and confirm you can restore before a device failure forces the issue.",
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
    metaTitle: "Voice Notes to Searchable Records in a Local-First Vault",
    metaDescription: "Use online transcription to turn recordings into searchable notes in NeuVault’s local-first vault, then connect documents and plan action items.",
    description:
      "Learn how to capture voice notes quickly, transcribe them into structured text, and keep them searchable alongside your documents, notes, reminders, and vault context.",
    intro:
      "Voice notes are powerful when speed matters, but they become hard to use when they stay as isolated recordings. This guide shows how to turn spoken context into records you can search, revisit, and connect to the rest of your document workflow.",
    primaryKeyword: "voice note transcription",
    secondaryKeywords: [
      "transcribe voice notes",
      "organize voice notes",
      "voice notes and documents app",
      "voice notes for reminders",
      "voice note to structured note",
    ],
    parentSolutionSlug: "voice-note-transcription",
    relatedGuideSlugs: [
      "plan-tasks-from-notes-and-documents",
      "search-old-documents-without-folder-chaos",
      "organize-important-documents-digitally",
    ],
    keyTakeaways: [
      "Voice capture is most useful when it becomes structured text you can search later.",
      "Spoken context should live near the documents, notes, and reminders it explains.",
      "Structured transcripts are stronger than raw transcription dumps.",
    ],
    sections: [
      {
        title: "Capture the thought while it is fresh",
        description:
          "Use voice when typing would slow you down, especially during movement, document review, meetings, lectures, or follow-up planning.",
      },
      {
        title: "Transcribe into readable structure",
        description:
          "Plain transcripts are better than audio alone, but structured notes are stronger because they remain easy to scan, search, and understand later.",
      },
      {
        title: "Link the voice note to the document issue",
        description:
          "A voice note explaining a receipt, contract, school file, or travel document should stay with that record so the meaning is not lost when you return later.",
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

// Each guide gains its practical depth (in-app steps, checklist, extra questions) from guideDepth.
export const guidePages: GuidePage[] = baseGuides.map((guide) => {
  const depth = guideDepth[guide.slug];
  if (!depth) return guide;
  return {
    ...guide,
    sections: guide.sections.map((section) => ({ ...section, ...depth.steps[section.title] })),
    checklist: depth.checklist,
    faqs: [...guide.faqs, ...depth.faqs],
    dateModified: depth.dateModified,
  };
});

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
    description: guide.metaDescription ?? guide.description,
    path: `/guides/${guide.slug}`,
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
  const published = guide.datePublished ?? DEFAULT_GUIDE_DATE;
  const modified = guide.dateModified ?? DEFAULT_GUIDE_DATE;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(`/guides/${guide.slug}`)}#article`,
    headline: guide.title,
    name: guide.metaTitle,
    description: guide.description,
    image: absoluteUrl("/opengraph-image"),
    datePublished: published,
    dateModified: modified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/guides/${guide.slug}`),
    },
    url: absoluteUrl(`/guides/${guide.slug}`),
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
    about: [guide.primaryKeyword, ...guide.secondaryKeywords],
    keywords: [guide.primaryKeyword, ...guide.secondaryKeywords].join(", "),
    articleSection: "Document organization",
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