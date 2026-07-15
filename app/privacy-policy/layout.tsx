import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read the NeuVault privacy policy, including local-first document handling, Gmail and Google user data, AI processing, backup, and account deletion.",
  path: "/privacy-policy",
  noindex: true,
  keywords: ["neuvault privacy policy", "document vault privacy policy", "local-first privacy policy"],
});

export default function PrivacyPolicyLayout({ children }: { children: ReactNode }) {
  return children;
}
