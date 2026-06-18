import type { Metadata } from "next";

import Hero from "@/components/specific/home/Hero";
import FeaturesSection from "@/components/specific/home/FeatureCards";
import HowItWorks from "@/components/specific/home/HowITWorks";
import SeeItInAction from "@/components/specific/home/Proof";
import TestimonialsSection from "@/components/specific/home/Testimonials";
import FloatingDownloadButtons from "@/components/specific/home/FloatingDownloadButtons";
import WorkflowLinks from "@/components/specific/home/WorkflowLinks";
import GuidesPreview from "@/components/specific/home/GuidesPreview";
import AutomaticIntake from "@/components/specific/home/AutomaticIntake";
import AudienceUseCases from "@/components/specific/home/AudienceUseCases";
import TrustExplainer from "@/components/specific/home/TrustExplainer";

import { LOGO_URL } from "@/lib/brand";
import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
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
  title:
    "NeuVault | Private Vault for Documents, Notes, Scans, and Voice Notes",
  description:
    "NeuVault is a private, local-first vault for the documents life will ask you for later. Capture documents, scans, notes, screenshots, and voice notes, organize them automatically, watch important folders, ask questions, review dates, and restore your vault across iPhone, Android, and Windows.",
  path: "/",
  keywords: [
    "private document vault",
    "private document vault app",
    "local-first document app",
    "document organizer",
    "document memory app",
    "scan and organize documents app",
    "document reminder app",
    "document retrieval app",
    "secure document backup app",
    "voice note transcription app",
    "encrypted document backup",
    "cross-device document restore",
    "automatic folder monitoring",
    "Windows document vault app",
    "document assistant",
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
      ANDROID_PLAY_STORE_URL,
      WINDOWS_MICROSOFT_STORE_URL,
    ],
    featureList: [
      "Private local-first document vault",
      "Document organization",
      "Document scanning",
      "Automatic folder watching on desktop",
      "Voice note transcription",
      "Notes and note export",
      "Document assistant",
      "Attention for important dates and follow-ups",
      "Linked Documents for related records",
      "Encrypted cross-device backup and restore",
      "Mobile apps for iPhone and Android",
      "Windows desktop app",
      "macOS coming soon",
    ],
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }]);

  const faqJsonLd = buildFaqJsonLd([
    {
      question: "What kind of app is NeuVault?",
      answer:
        "NeuVault is a private, local-first vault for important documents, scans, notes, screenshots, and voice notes. It helps you organize records automatically, understand what they mean, ask questions, review important dates, and restore your vault across devices.",
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
      question: "Does NeuVault support iPhone, Android, and Windows?",
      answer:
        "Yes. NeuVault is available on the App Store, Google Play, and Microsoft Store for Windows. macOS is coming soon.",
    },
    {
      question: "Does NeuVault store my documents in the cloud?",
      answer:
        "NeuVault is designed around local-first storage and user-controlled backup. Documents are stored on your device, and encrypted backups can be created under your control.",
    },
    {
      question: "Why do app stores mention user content?",
      answer:
        "NeuVault may process content when you use OCR, summaries, transcription, the assistant, or related workflows. The vault is designed around local-first storage, and NeuVault does not permanently store your vault documents as a cloud drive.",
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

      <section className="relative overflow-hidden bg-transparent">
        <FeaturesSection />
        <SeeItInAction />
        <HowItWorks />
        <WorkflowLinks />
        <GuidesPreview />
        <TestimonialsSection />
        <FloatingDownloadButtons />
      </section>
    </main>
  );
}
