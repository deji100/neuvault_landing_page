import type { Metadata } from "next";

import ContactClient from "./contactClient";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildWebSiteJsonLd,
  SUPPORT_EMAIL,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact NeuVault Support",
  description:
    "Contact NeuVault for support, feedback, privacy questions, bug reports, backup and restore help, or questions about your private document vault.",
  path: "/contact",
  keywords: [
    "contact NeuVault",
    "NeuVault support",
    "document vault support",
    "private document vault help",
    "NeuVault privacy support",
    "NeuVault backup support",
  ],
});

function jsonLdScript(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export default function ContactPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  const websiteJsonLd = buildWebSiteJsonLd();

  const faqJsonLd = buildFaqJsonLd([
    {
      question: "How can I contact NeuVault support?",
      answer: `You can contact NeuVault support through the contact form or by emailing ${SUPPORT_EMAIL}.`,
    },
    {
      question: "Can I ask privacy or backup questions?",
      answer:
        "Yes. NeuVault support can help with questions about local-first storage, encrypted backup, restore, AI processing, and account-related concerns.",
    },
    {
      question: "What should I include in a support request?",
      answer:
        "Include a short description of the issue, the device you are using, what you expected to happen, what actually happened, and screenshots or screen recordings if helpful.",
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd)}
      />

      <ContactClient />
    </>
  );
}