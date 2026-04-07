import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions",
  description:
    "Read the NeuVault terms and conditions for the private document vault app across uploads, scans, notes, voice, reminders, assistant help, and secure backup.",
  path: "/terms-and-conditions",
  noindex: true,
  keywords: ["neuvault terms", "document vault terms", "neuvault terms and conditions"],
});

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children;
}