import type { Metadata } from "next";

import LandingPage from "@/components/specific/home/LandingPage";

import { LOGO_URL } from "@/lib/brand";
import { youtubeVideos } from "@/lib/youtube-videos";
import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  MACOS_APP_STORE_URL,
  SITE_URL,
  WINDOWS_MICROSOFT_STORE_URL,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebSiteJsonLd,
  solutionPages,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "NeuVault — Your Notes, and Everything Behind Them",
  description:
    "Write it, say it, or drop it in. NeuVault keeps your notes, recordings and files together in one private workspace — and tells you when a date is coming. iPhone, Android, Mac and Windows, local-first, with encrypted backups only you can open.",
  path: "/",
  keywords: [
    "scan and organize documents",
    "document expiry reminder app",
    "organize scanned documents",
    "digital personal document vault",
    "document storage app",
    "document retrieval software",
    "important documents app",
    "scan and store documents",
    "passport expiry reminder",
    "visa expiry tracker",
    "secure document storage",
    "private AI document vault",
    "private AI document search",
    "AI PDF summarizer",
    "private document vault app",
    "local-first document app",
    "AI document organizer",
    "AI file organizer",
    "document memory app",
    "scan and organize documents app",
    "document reminder app",
    "find deadlines in documents",
    "search PDFs with AI",
    "document retrieval app",
    "secure document backup app",
    "voice note transcription app",
    "encrypted document backup",
    "cross-device document restore",
    "automatic folder monitoring",
    "Windows document vault app",
    "Nova document assistant",
    "documents life will ask you for later",
  ],
});

function jsonLdScript(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export default function Home() {
  const organizationJsonLd = {
    ...buildOrganizationJsonLd(),
    logo: LOGO_URL,
  };

  const websiteJsonLd = buildWebSiteJsonLd();

  const softwareJsonLd = {
    ...buildSoftwareApplicationJsonLd(),
    image: LOGO_URL,
    applicationSubCategory: "Document organization",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    downloadUrl: [
      IOS_APP_STORE_URL,
      MACOS_APP_STORE_URL,
      ANDROID_PLAY_STORE_URL,
      WINDOWS_MICROSOFT_STORE_URL,
    ],
    featureList: [
      "Deadline and renewal dates extracted from document content",
      "Resurfacing schedules and Memory Trail for important records",
      "Capture that still saves when credits run out or you are offline",
      "Private local-first document vault",
      "AI document organization",
      "Document scanning",
      "Automatic folder watching on desktop",
      "Voice note transcription",
      "Notes and note export",
      "Nova AI document assistant",
      "Attention for important dates and follow-ups",
      "Linked Documents for related records",
      "Encrypted cross-device backup and restore",
      "Mobile apps for iPhone and Android",
      "Windows desktop app",
      "macOS desktop app",
    ],
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }]);

  const faqJsonLd = buildFaqJsonLd([
    {
      question: "What kind of app is NeuVault?",
      answer:
        "NeuVault is a private workspace for your notes and the files behind them. Write or record a note, bring in files, scans and links, connect what belongs together — and let it surface the dates it finds in your own material, before they pass.",
    },
    {
      question: "How is NeuVault different from cloud storage?",
      answer:
        "Cloud storage mainly stores files. NeuVault is built around what you meant to do with them: notes and recordings alongside the files, connections between related things, reminders from the dates in your own material, and encrypted backups under your control.",
    },
    {
      question: "Can NeuVault import email attachments?",
      answer:
        "Yes. Connect a Microsoft 365 mailbox with read-only access, choose a historical date range and file-type rules, and decide whether NeuVault keeps watching for new attachments. Every attachment is scanned for dangerous content before it enters the vault. Gmail and Yahoo support are built and awaiting provider review.",
    },
    {
      question: "Can NeuVault watch folders for new files?",
      answer:
        "On desktop, NeuVault can help monitor selected folders so new files can enter the vault workflow without repeated manual uploads.",
    },
    {
      question: "Can NeuVault transcribe meetings?",
      answer:
        "Yes. NeuVault can transcribe live voice recordings and imported audio into structured, editable text that can remain connected to related documents.",
    },
    {
      question: "Does NeuVault support iPhone, Android, Windows, and macOS?",
      answer:
        "Yes. NeuVault is available for iPhone and macOS on the App Store, for Android on Google Play, and for Windows on the Microsoft Store.",
    },
    {
      question: "Does NeuVault store my documents in the cloud?",
      answer:
        "NeuVault is designed around local-first storage. Original documents remain on your device by default unless you choose a supported backup or integration workflow. Encrypted backups remain under your control.",
    },
    {
      question: "What happens when my credits run out?",
      answer:
        "Capture still works. The item saves to your Inbox and organizes itself automatically once credits or your connection return. Searching, viewing, exporting and encrypted backup never cost credits, so the vault keeps working either way.",
    },
    {
      question: "Can NeuVault read dates out of my documents?",
      answer:
        "Yes. NeuVault extracts renewal, expiry and deadline dates from document content and sorts them into Overdue, Due today, Due soon, Upcoming and Monitor. Any document or map can also be set to resurface weekly, monthly or yearly.",
    },
    {
      question: "Can I use NeuVault without AI?",
      answer:
        "Yes. Storage and non-AI vault functionality remain available after credits are exhausted. Credits are used only when you choose a supported AI or OCR action.",
    },
    {
      question: "Can I link and compare related documents?",
      answer:
        "Yes. NeuVault supports direct links, linked-document groups, notes connected to documents, and side-by-side comparison inside the spatial Map workspace.",
    },
    {
      question: "Can NeuVault convert documents and responses?",
      answer:
        "NeuVault can convert supported documents, notes, extracted information, and Nova responses into practical formats including PDF, Word, CSV, and editable notes where applicable.",
    },
  ]);

  // uploadDate is required for a valid VideoObject, so a video without one is left out.
  const videoJsonLd = youtubeVideos
    .filter((video) => video.id && video.uploadDate)
    .map((video) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: `NeuVault — ${video.title}`,
      description: video.summary,
      embedUrl: `https://www.youtube.com/embed/${video.id}`,
      contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
      uploadDate: video.uploadDate,
      thumbnailUrl: [`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`],
    }));

  const workflowsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NeuVault document workflows",
    description:
      "Core NeuVault workflows for organizing, finding, reviewing, asking about, and backing up important records.",
    itemListElement: solutionPages.map((page, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/${page.slug}`,
      name: page.metaTitle,
      description: page.description,
    })),
  };

  return (
    <main className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(softwareJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd)}
      />
      {videoJsonLd.map((video) => (
        <script
          key={video.embedUrl}
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(video)}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(workflowsJsonLd)}
      />

      <LandingPage />
    </main>
  );
}
