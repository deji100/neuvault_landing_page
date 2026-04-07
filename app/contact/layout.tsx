import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact NeuVault about the private document vault for organizing files, reminders, scans, notes, voice capture, and secure backup.",
  path: "/contact",
  noindex: true,
  keywords: ["contact neuvault", "neuvault support", "document vault support"],
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}