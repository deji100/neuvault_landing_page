import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

// Feedback emails link here to hand off to the app; it is not a page for search.
export const metadata: Metadata = buildMetadata({
  title: "Open NeuVault to Give Feedback",
  description: "Opens the NeuVault app so you can send feedback.",
  path: "/open-feedback",
  noindex: true,
});

export default function OpenFeedbackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
