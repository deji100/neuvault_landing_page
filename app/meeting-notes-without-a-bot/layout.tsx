import type { ReactNode } from "react";
import type { Metadata } from "next";

import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebPageJsonLd } from "@/lib/seo";
import { botFreeFaqs } from "./faqs";

const PATH = "/meeting-notes-without-a-bot";
const TITLE = "AI Meeting Notes Without a Bot";
const DESCRIPTION =
  "How NeuVault records meetings on your own device, so no notetaker joins the call, and turns them into an overview, key points, action items and a transcript that stay with the recording, on your device.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

function jsonLdScript(data: Record<string, unknown>) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export default function MeetingNotesWithoutABotLayout({ children }: { children: ReactNode }) {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
    { name: TITLE, path: PATH },
  ]);
  const webPage = buildWebPageJsonLd({ title: TITLE, description: DESCRIPTION, path: PATH });
  const faq = buildFaqJsonLd(botFreeFaqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(webPage)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faq)} />
      {children}
    </>
  );
}
