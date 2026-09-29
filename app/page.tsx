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
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebSiteJsonLd,
  solutionPages,
} from "@/lib/seo";

// The home page states the site-wide title and description; lib/seo.ts holds them.
export const metadata: Metadata = buildMetadata({
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
