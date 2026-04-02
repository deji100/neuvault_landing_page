import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read the NeuVault privacy policy for the local-first mobile document vault, including data handling, backup, reminders, notes, scans, and assistant workflows.",
  path: "/privacy-policy",
  keywords: ["neuvault privacy policy", "document vault privacy policy", "local-first privacy policy"],
});

export default function PrivacyPolicyLayout({ children }: { children: ReactNode }) {
  return children;
}
