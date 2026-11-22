import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Use NeuVault with Claude and ChatGPT",
  description:
    "Connect Claude and ChatGPT to your NeuVault vault: search, read and save your files, notes and links from your AI app. Set up on your computer or on the web, choose what each app may do, and disconnect anytime.",
  path: "/connectors",
});

export default function ConnectorsLayout({ children }: { children: ReactNode }) {
  return children;
}
