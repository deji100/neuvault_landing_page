import type { Metadata } from "next";

import FeaturesPage from "@/components/specific/features/FeaturesPage";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Features — 1 App, 11 Ways to Use Your Notes and Files | NeuVault",
  description:
    "Everything NeuVault does today: notes and voice, scanning and imports, bookmarks, Vault Maps, Nova, reminders that read your own dates, conversion, sharing and encrypted backup — on iPhone, Android, Mac and Windows.",
  path: "/features",
  keywords: [
    "note taking app features",
    "voice note transcription",
    "meeting notes app",
    "document reminder app",
    "private note app with AI",
    "encrypted note backup",
    "note and file organizer",
    "offline note app",
  ],
});

function jsonLdScript(data: Record<string, unknown>) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export default function Features() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
  ]);

  return (
    <main className="overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)} />
      <FeaturesPage />
    </main>
  );
}
