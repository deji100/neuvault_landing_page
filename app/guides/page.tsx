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
  title: "Help and Guides for Organizing Important Documents",
  description:
    "Practical guides to scanning, organizing, finding and backing up important documents, tracking expiry dates, and turning voice notes into searchable records.",
  path: "/guides",
  keywords: [
    "document organization guides",
    "organize important documents",
    "scan and organize documents",
    "document reminder guide",
    "document retrieval guide",
    "secure document backup guide",
    "voice note transcription guide",
    "private document vault guide",
    "local-first document app",
  ],
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
          <h1>Better ways to stop losing, forgetting, and digging for important documents.</h1>
          <p className={styles.lede}>
            Practical guides for the records life asks for later: scans, receipts, forms, IDs, certificates, school
            files, contracts, notes, voice notes, reminders, and private backups.
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
