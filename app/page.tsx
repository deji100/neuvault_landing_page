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
  buildMetadata,
  buildSoftwareApplicationJsonLd,
  solutionPages,
} from "@/lib/seo";

// The home page states the site-wide title and description; lib/seo.ts holds them.
export const metadata: Metadata = buildMetadata({
  path: "/",
});

function jsonLdScript(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export default function Home() {
  const softwareJsonLd = {
    ...buildSoftwareApplicationJsonLd(),
    image: LOGO_URL,
    applicationSubCategory: "Notes, document organization, and planning",
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
      "Reminders for important dates and follow-ups",
      "Vault Map for related records",
      "Local-first Planner with Agenda, Week, Month, and Board views",
      "Turn note action items into tasks with source documents attached",
      "Cross-device sync for Planner tasks, columns, and reminder settings",
      "Encrypted cross-device backup and restore",
      "Mobile apps for iPhone and Android",
      "Windows desktop app",
      "macOS desktop app",
    ],
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }]);

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
        dangerouslySetInnerHTML={jsonLdScript(softwareJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)}
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
