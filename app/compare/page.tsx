import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { comparisonPages, comparisonPath } from "@/lib/comparisons";
import styles from "@/components/specific/compare/Compare.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Compare NeuVault With Notion, Evernote, Obsidian and More",
  description:
    "Honest, side-by-side comparisons of NeuVault with the apps you may already use. Where each one shines, where NeuVault is different, and which fits you.",
  path: "/compare",
});

function jsonLdScript(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export default function ComparePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
  ]);

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)} />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.wrap}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">Compare</span>
        </nav>

        <header className={styles.hero}>
          <p className={styles.kicker}>Compare</p>
          <h1>NeuVault, next to the apps you might already use.</h1>
          <p className={styles.lede}>
            One honest page per app: where it shines, where NeuVault is different, what each costs, and which one fits
            how you work. Pick an app to see the two side by side.
          </p>
        </header>

        <ul className={styles.grid}>
          {comparisonPages.map((page) => (
            <li key={page.slug}>
              <Link href={comparisonPath(page)} className={styles.card}>
                <span className={styles.versus} aria-hidden="true">
                  <span className={styles.versusUs}>NeuVault</span>
                  <span className={styles.versusVs}>vs</span>
                  <span className={styles.versusThem}>{page.competitor}</span>
                </span>
                <h2>{page.headline}</h2>
                <p>{page.subheadline}</p>
                <span className={styles.cardFoot}>
                  <span>{page.competitorSummary}</span>
                  <span>
                    Compare <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className={styles.soon}>
          Using an app that isn&apos;t here yet? <Link href="/feedback">Tell us which one</Link> and we&apos;ll add the
          comparison.
        </p>
      </div>
    </main>
  );
}
