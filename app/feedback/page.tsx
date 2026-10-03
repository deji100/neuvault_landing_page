import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import FeedbackBoard from "@/components/specific/feedback/FeedbackBoard";
import guideStyles from "@/components/specific/guides/Guides.module.css";
import styles from "@/components/specific/feedback/Feedback.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Feedback and Feature Requests",
  description:
    "Suggest features, report problems and vote on what NeuVault builds next. See what's planned, in progress and shipped.",
  path: "/feedback",
  keywords: ["NeuVault feedback", "NeuVault feature request", "NeuVault roadmap", "NeuVault bug report"],
});

function jsonLdScript(data: Record<string, unknown>) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export default function FeedbackPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Feedback", path: "/feedback" },
  ]);

  return (
    <main className={guideStyles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)} />
      <div className={guideStyles.glow} aria-hidden="true" />
      <div className={guideStyles.wrap}>
        <nav className={guideStyles.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">Feedback</span>
        </nav>
        <header className={guideStyles.hero}>
          <p className={guideStyles.kicker}>Feedback</p>
          <h1>Help shape what NeuVault does next.</h1>
          <p className={guideStyles.lede}>
            Suggest a feature, tell us what isn&apos;t working, and vote for the ideas you want most. The NeuVault team
            reads every post and replies here.
          </p>
        </header>
        <div className={styles.layout}>
          <Suspense fallback={null}>
            <FeedbackBoard />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
