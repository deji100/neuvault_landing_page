import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, ChevronRight, Clock, ListChecks, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

import {
  buildGuideArticleJsonLd,
  buildGuideBreadcrumbJsonLd,
  buildGuideFaqJsonLd,
  buildGuideMetadata,
  getGuidePageBySlug,
  getGuidePagesBySlugs,
  guidePages,
} from "@/lib/guides";

import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  getSolutionPageBySlug,
} from "@/lib/seo";
import { guideIcon, readingMinutes } from "@/components/specific/guides/guideIcons";
import styles from "@/components/specific/guides/Guides.module.css";

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return guidePages.map((guide) => ({ slug: guide.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuidePageBySlug(slug);

  if (!guide) {
    return buildGuideMetadata({
      slug: "not-found",
      title: "Guide not found",
      metaTitle: "Guide Not Found",
      description: "NeuVault guide not found.",
      intro: "",
      primaryKeyword: "",
      secondaryKeywords: [],
      parentSolutionSlug: "scan-organization",
      relatedGuideSlugs: [],
      keyTakeaways: [],
      sections: [],
      faqs: [],
      ctaLabel: "",
    });
  }

  return buildGuideMetadata(guide);
}

function jsonLdScript(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

const qualities = ["Organized", "Searchable", "Remembered", "Connected", "Backed up", "Recoverable"];

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuidePageBySlug(slug);

  if (!guide) {
    notFound();
  }

  const parentSolution = getSolutionPageBySlug(guide.parentSolutionSlug)?.page;
  const relatedGuides = getGuidePagesBySlugs(guide.relatedGuideSlugs);

  const breadcrumbJsonLd = buildGuideBreadcrumbJsonLd(guide);
  const articleJsonLd = buildGuideArticleJsonLd(guide);
  const faqJsonLd = buildGuideFaqJsonLd(guide);

  const { icon: Icon, tone } = guideIcon(guide.slug);
  const minutes = readingMinutes([
    guide.intro,
    ...guide.keyTakeaways,
    ...guide.sections.flatMap((section) => [section.title, section.description]),
    ...guide.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ]);
  // The visible date is the one the Article structured data states.
  const updated = new Date(`${String(articleJsonLd.dateModified)}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <main className={`${styles.page} ${styles.article}`} style={{ "--tone": tone } as React.CSSProperties}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(articleJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd)} />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.wrap}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link href="/guides">Guides</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{guide.metaTitle}</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.heroIcon}>
            <Icon size={25} strokeWidth={2} aria-hidden="true" />
          </span>
          <p className={styles.kicker} style={{ color: tone }}>
            {guide.primaryKeyword}
          </p>
          <h1>{guide.title}</h1>
          <p className={styles.lede}>{guide.intro}</p>
          <div className={styles.meta}>
            <span className={styles.pill}>
              <Clock size={14} aria-hidden="true" /> {minutes} min read
            </span>
            <span className={styles.pill}>
              <ListChecks size={14} aria-hidden="true" /> {guide.sections.length} steps
            </span>
            <span className={styles.pill}>
              <CalendarDays size={14} aria-hidden="true" /> Updated {updated}
            </span>
          </div>
        </header>

        <div className={styles.body}>
          <aside className={styles.aside}>
            <details className={styles.toc} open>
              <summary>In this guide</summary>
              <nav aria-label="In this guide">
                {guide.sections.map((section, index) => (
                  <a key={section.title} href={`#step-${index + 1}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.title}
                  </a>
                ))}
                <a href="#questions">
                  <span>?</span>
                  Questions
                </a>
              </nav>
            </details>
          </aside>

          <div className={styles.content}>
            <section className={styles.takeaways} aria-labelledby="takeaways">
              <h2 id="takeaways">
                <Sparkles size={18} aria-hidden="true" /> What to remember before you start
              </h2>
              <ol>
                {guide.keyTakeaways.map((takeaway) => (
                  <li key={takeaway}>{takeaway}</li>
                ))}
              </ol>
            </section>

            <ol className={styles.steps}>
              {guide.sections.map((section, index) => (
                <li key={section.title} id={`step-${index + 1}`} className={styles.step}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    {index + 1}
                  </span>
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                </li>
              ))}
            </ol>

            {parentSolution ? (
              <section className={styles.cta}>
                <div>
                  <p className={styles.kicker}>Turn this into a system</p>
                  <h2>{parentSolution.title}</h2>
                  <p>{parentSolution.description}</p>
                </div>
                <ul className={styles.qualities} aria-label="NeuVault helps important records become">
                  {qualities.map((item) => (
                    <li key={item}>
                      <Check size={13} strokeWidth={2.6} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className={styles.ctaActions}>
                  <Link href={`/${parentSolution.slug}`} className={styles.ctaPrimary}>
                    {guide.ctaLabel} <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                  <a href={IOS_APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>
                    App Store
                  </a>
                  <a href={ANDROID_PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>
                    Google Play
                  </a>
                </div>
              </section>
            ) : null}

            <section id="questions" aria-labelledby="questions-title">
              <div className={styles.sectionHead}>
                <h2 id="questions-title">Frequently asked questions</h2>
              </div>
              <div className={styles.faqList}>
                {guide.faqs.map((faq) => (
                  <details key={faq.question} className={styles.faqItem}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            {relatedGuides.length > 0 ? (
              <section aria-labelledby="related-title">
                <div className={styles.sectionHead}>
                  <h2 id="related-title">Related guides</h2>
                  <Link href="/guides">
                    All guides <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
                <ul className={styles.related}>
                  {relatedGuides.map((item) => {
                    const related = guideIcon(item.slug);
                    const RelatedIcon = related.icon;
                    return (
                      <li key={item.slug}>
                        <Link href={`/guides/${item.slug}`} className={styles.card} style={{ "--tone": related.tone } as React.CSSProperties}>
                          <span className={styles.cardIcon}>
                            <RelatedIcon size={18} strokeWidth={2} aria-hidden="true" />
                          </span>
                          <span className={styles.cardLabel}>{item.primaryKeyword}</span>
                          <h2>{item.title}</h2>
                          <span className={styles.cardFoot}>
                            <span />
                            <span>
                              Read next <ArrowRight size={14} aria-hidden="true" />
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : null}

            <ul className={styles.keywords} aria-label="Topics in this guide">
              {guide.secondaryKeywords.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
