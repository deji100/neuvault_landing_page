import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How to use Save to NeuVault",
  description:
    "Save the page you're reading or any link to NeuVault in one click: the toolbar button, the keyboard shortcut, right-click, Safari's Share menu, and what happens once it arrives.",
  path: "/how-to-use-extension",
  keywords: [
    "how to use save to neuvault",
    "save web page to neuvault",
    "neuvault extension shortcut",
    "save link to notes",
  ],
});

export default function HowToUseExtensionLayout({ children }: { children: ReactNode }) {
  return children;
}
