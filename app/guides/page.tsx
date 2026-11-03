import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";

import {
  buildBreadcrumbJsonLd,
  buildMetadata,
  buildWebSiteJsonLd,
} from "@/lib/seo";
import { guidePages } from "@/lib/guides";
import { guideIcon, guideReadingMinutes } from "@/components/specific/guides/guideIcons";
import styles from "@/components/specific/guides/Guides.module.css";

export const metadata: Metadata = buildMetadata({
  title: "NeuVault Guides: Local-First Notes, Documents & Planner",
  description:
    "Learn to capture and organize information, plan tasks from notes and documents, and work offline with NeuVault's local-first vault and Planner.",
  path: "/guides",
});

function jsonLdScript(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export default function GuidesPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
  ]);

  const websiteJsonLd = buildWebSiteJsonLd();

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd)} />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.wrap}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">Guides</span>
        </nav>

        <header className={styles.hero}>
          <p className={styles.kicker}>Help &amp; guides</p>
          <h1>Capture information. Keep it connected. Plan your next step.</h1>
          <p className={styles.lede}>
            Practical guides to your local-first workspace: notes, documents, scans, recordings,
            Planner tasks, reminders, and encrypted backups.
          </p>

          <ul className={styles.topics} aria-label="Guide topics">
            {guidePages.map((guide) => {
              const { icon: Icon, tone } = guideIcon(guide.slug);
              return (
                <li key={guide.slug} style={{ "--tone": tone } as React.CSSProperties}>
                  <span className={styles.topicIcon}>
                    <Icon size={13} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  {guide.primaryKeyword.replace(/^./, (c) => c.toUpperCase())}
                </li>
              );
            })}
          </ul>
        </header>

        <ul className={styles.grid}>
          {guidePages.map((guide) => {
            const { icon: Icon, tone } = guideIcon(guide.slug);
            const minutes = guideReadingMinutes(guide);
            return (
              <li key={guide.slug}>
                <Link href={`/guides/${guide.slug}`} className={styles.card} style={{ "--tone": tone } as React.CSSProperties}>
                  <span className={styles.cardIcon}>
                    <Icon size={21} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className={styles.cardLabel}>{guide.primaryKeyword}</span>
                  <h2>{guide.title}</h2>
                  <p>{guide.description}</p>
                  <span className={styles.cardFoot}>
                    <span>
                      <Clock size={13} aria-hidden="true" /> {minutes} min read
                    </span>
                    <span>
                      Read guide <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
