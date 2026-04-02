import type { Metadata } from "next";
import Hero from "@/components/specific/home/Hero";
import FeaturesSection from "@/components/specific/home/FeatureCards";
import HowItWorks from "@/components/specific/home/HowITWorks";
import SeeItInAction from "@/components/specific/home/Proof";
import TestimonialsSection from "@/components/specific/home/Testimonials";
import FloatingDownloadButtons from "@/components/specific/home/FloatingDownloadButtons";
import FloatingBlobs from "@/components/specific/home/FloatingBlobs";
import WorkflowLinks from "@/components/specific/home/WorkflowLinks";
import { LOGO_URL } from "@/lib/brand";
import {
  ANDROID_PLAY_STORE_URL,
  DEFAULT_DESCRIPTION,
  IOS_APP_STORE_URL,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebSiteJsonLd,
  solutionPages,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Private Document Vault for Search, Reminders, Backup, Notes, and Scans",
  description: DEFAULT_DESCRIPTION,
  path: "/",
  keywords: [
    "private document vault app",
    "organize scans notes and uploads",
    "voice note transcription",
    "document reminders and resurfacing",
    "encrypted vault backup",
  ],
});

export default function Home() {
  const organizationJsonLd = {
    ...buildOrganizationJsonLd(),
    logo: LOGO_URL,
  };
  const websiteJsonLd = buildWebSiteJsonLd();
  const softwareJsonLd = {
    ...buildSoftwareApplicationJsonLd(),
    image: LOGO_URL,
  };
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }]);
  const faqJsonLd = buildFaqJsonLd([
    {
      question: "What kind of app is NeuVault?",
      answer:
        "NeuVault is a private, local-first mobile document vault for organizing files, scans, notes, voice capture, reminders, and encrypted backups.",
    },
    {
      question: "Does NeuVault support both iPhone and Android?",
      answer: `Yes. NeuVault is available on the App Store and Google Play at ${IOS_APP_STORE_URL} and ${ANDROID_PLAY_STORE_URL}.`,
    },
  ]);

  return (
    <main className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "NeuVault workflows",
            itemListElement: solutionPages.map((page, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `https://neuvault.app/${page.slug}`,
              name: page.metaTitle,
            })),
          }),
        }}
      />

      <Hero />

      <section className="relative overflow-hidden bg-transparent">
        <FloatingBlobs />
        <SeeItInAction />
        <FeaturesSection />
        <WorkflowLinks />
        <HowItWorks />
        <TestimonialsSection />
        <FloatingDownloadButtons />
      </section>
    </main>
  );
}




