import type { Metadata } from "next";

import Hero from "@/components/specific/home/Hero";
import PainRecognition from "@/components/specific/home/PainRecognition";
import FeaturesSection from "@/components/specific/home/FeatureCards";
import HowItWorks from "@/components/specific/home/HowITWorks";
import SeeItInAction from "@/components/specific/home/Proof";
import TestimonialsSection from "@/components/specific/home/Testimonials";
import FloatingDownloadButtons from "@/components/specific/home/FloatingDownloadButtons";

import { LOGO_URL } from "@/lib/brand";
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
  title: "NeuVault — Scan, Organize & Find Important Documents",
  description:
    "Scan, organize, retrieve, and get expiry reminders for important documents. NeuVault turns scanned documents, notes, voice memos, and files into a private AI vault with smart search and encrypted backup.",
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
        "NeuVault is a private, local-first AI vault for important documents, scans, notes, screenshots, and voice notes. It helps you organize records automatically, understand what they mean, ask Nova questions, review important dates, and restore your vault across devices.",
    },
    {
      question: "How is NeuVault different from cloud storage?",
      answer:
        "Cloud storage mainly stores files. NeuVault is built around document memory: it helps you capture records, organize them, keep useful context, review dates, ask questions, and back up your vault under your control.",
    },
    {
      question: "Can NeuVault help me scan and organize documents?",
      answer:
        "Yes. NeuVault supports document scanning, OCR-backed extraction, automatic organization, summaries, tags, manual grouping, and searchable retrieval so scanned paperwork does not get lost after capture.",
    },
    {
      question: "Can NeuVault watch folders for new files?",
      answer:
        "On desktop, NeuVault can help monitor selected folders so new files can enter the vault workflow without repeated manual uploads.",
    },
    {
      question: "Does NeuVault support notes and voice notes?",
      answer:
        "Yes. NeuVault supports typed notes and voice notes alongside documents and scans, so important context can live in the same private vault.",
    },
    {
      question: "Does NeuVault support iPhone, Android, Windows, and macOS?",
      answer:
        "Yes. NeuVault is available for iPhone and macOS on the App Store, for Android on Google Play, and for Windows on the Microsoft Store.",
    },
    {
      question: "Does NeuVault store my documents in the cloud?",
      answer:
        "NeuVault is designed around local-first storage and user-controlled backup. Documents are stored on your device, and encrypted backups can be created under your control.",
    },
    {
      question: "Why do app stores mention user content?",
      answer:
        "NeuVault may process content when you use OCR, AI summaries, transcription, Nova, or related workflows. The vault is designed around local-first storage, and NeuVault does not permanently store your vault documents as a cloud drive.",
    },
  ]);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(workflowsJsonLd)}
      />

      <Hero />
      <PainRecognition />

      <section className="relative overflow-hidden bg-transparent">
        <FeaturesSection />
        <SeeItInAction />
        <HowItWorks />
        <TestimonialsSection />
        <FloatingDownloadButtons />
      </section>
    </main>
  );
}
