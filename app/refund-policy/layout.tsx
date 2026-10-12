import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Refund Policy",
  description:
    "How refunds work for NeuVault plans and extra credits, whether you bought in the App Store, on Google Play, or on our website through Paddle.",
  path: "/refund-policy",
  noindex: true,
  keywords: ["neuvault refund policy", "neuvault refunds"],
});

export default function RefundPolicyLayout({ children }: { children: ReactNode }) {
  return children;
}
