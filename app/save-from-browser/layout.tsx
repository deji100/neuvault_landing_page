import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Save pages from your browser",
  description:
    "Save any web page or link to NeuVault from Chrome, Edge, Brave, Safari or your phone: install the Save to NeuVault extension, turn on NeuVault in Safari's Share menu, or use the bookmark.",
  path: "/save-from-browser",
  keywords: [
    "save to neuvault",
    "neuvault chrome extension",
    "save web page to notes",
    "save links from browser",
    "safari share extension neuvault",
  ],
});

export default function SaveFromBrowserLayout({ children }: { children: ReactNode }) {
  return children;
}
