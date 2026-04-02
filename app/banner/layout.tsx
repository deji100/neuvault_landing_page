import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "NeuVault Banner",
  description: "NeuVault banner preview.",
  path: "/banner",
  noindex: true,
});

export default function BannerLayout({ children }: { children: ReactNode }) {
  return children;
}
