import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How NeuVault handles your data: your vault stays on your device, processing results are deleted from our servers within an hour, and backups are sealed with a key only you hold.",
  path: "/privacy-policy",
  noindex: true,
  keywords: ["neuvault privacy policy", "document vault privacy policy", "local-first privacy policy"],
});

export default function PrivacyPolicyLayout({ children }: { children: ReactNode }) {
  return children;
}
