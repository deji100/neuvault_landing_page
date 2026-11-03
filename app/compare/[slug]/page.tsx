import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Check, ChevronRight, ExternalLink, Play, Sparkles, Star } from "lucide-react";

import {
  buildComparisonBreadcrumbJsonLd,
  buildComparisonFaqJsonLd,
  buildComparisonMetadata,
  buildComparisonWebPageJsonLd,
  comparisonPages,
  comparisonPath,
  getComparisonBySlug,
  howItFitsTogether,
  plannerDifference,
  type CompareRow,
} from "@/lib/comparisons";
import DownloadLink from "@/components/specific/compare/DownloadLink";
import InlineLinks from "@/components/specific/compare/InlineLinks";
import styles from "@/components/specific/compare/Compare.module.css";

type ComparePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return comparisonPages.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparisonBySlug(slug);
  if (!page) return { title: "Comparison not found" };
  return buildComparisonMetadata(page);
}

function jsonLdScript(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

/** Rows read as a table on wide screens and as stacked cards on phones (the cell names show only there). */
function CompareTable({ rows, competitor, caption }: { rows: CompareRow[]; competitor: string; caption: string }) {
  return (
    <div className={styles.table} role="table" aria-label={caption}>
      <div className={`${styles.row} ${styles.head}`} role="row">
        <span role="columnheader" />
        <span role="columnheader">{competitor}</span>
        <span role="columnheader" className={styles.us}>
          NeuVault
        </span>
      </div>
      {rows.map((row) => (
        <div key={row.label} className={styles.row} role="row">
          <span role="rowheader" className={styles.label}>
            {row.label}
          </span>
          <span role="cell" className={styles.them}>
            <span className={styles.cellName} aria-hidden="true">
              {competitor}
            </span>
            {row.them}
          </span>
          <span role="cell" className={styles.us}>
            <span className={styles.cellName} aria-hidden="true">
              NeuVault
            </span>
            {row.us}
          </span>
        </div>
      ))}
    </div>
  );
}

export default async function ComparisonPage({ params }: ComparePageProps) {
  const { slug } = await params;
  const page = getComparisonBySlug(slug);
  if (!page) notFound();

  const others = comparisonPages.filter((other) => other.slug !== page.slug);
  const updated = new Date(`${page.factsCheckedOn}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const toc = [
    { id: "glance", title: "At a glance" },
    { id: "their-strengths", title: `Where ${page.competitor} shines` },
    { id: "our-differences", title: "Where NeuVault is different" },
    { id: "fits-together", title: howItFitsTogether.title },
    ...page.deepDives.map((section) => ({ id: section.id, title: section.title })),
    { id: "pricing", title: "Pricing" },
    { id: "choose", title: "Which one is right for you?" },
    { id: "questions", title: "Questions" },
  ];

  return (
    <main className={`${styles.page} ${styles.article}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(buildComparisonBreadcrumbJsonLd(page))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(buildComparisonWebPageJsonLd(page))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(buildComparisonFaqJsonLd(page))} />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.wrap}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link href="/compare">Compare</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{page.headline}</span>
        </nav>

        <header className={styles.hero}>
          <p className={styles.kicker}>Compare</p>
          <h1>{page.headline}</h1>
          <p className={styles.lede}>{page.subheadline}</p>
          <p className={styles.intro}>{page.intro}</p>
          <div className={styles.heroActions}>
            <DownloadLink className={styles.primary}>Download NeuVault free</DownloadLink>
            <Link href="/#videos" className={styles.secondary}>
              <span className={styles.playDot} aria-hidden="true">
                <Play size={12} fill="currentColor" strokeWidth={0} />
              </span>
              Watch the 3-minute tour
            </Link>
          </div>
          <div className={styles.meta}>
            <span className={styles.pill}>
              <CalendarDays size={14} aria-hidden="true" /> Last updated {updated}
            </span>
          </div>
        </header>

        <div className={styles.body}>
          <aside className={styles.aside}>
            <details className={styles.toc} open>
              <summary>On this page</summary>
              <nav aria-label="On this page">
                {toc.map((item, index) => (
                  <a key={item.id} href={`#${item.id}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {item.title}
                  </a>
                ))}
              </nav>
            </details>
          </aside>

          <div className={styles.content}>
            <section id="glance" className={styles.section} aria-labelledby="glance-title">
              <h2 id="glance-title">At a glance</h2>
              <p className={styles.sectionLede}>
                <strong>The short version:</strong> {page.verdict}
              </p>
              <CompareTable rows={page.glance} competitor={page.competitor} caption={`${page.headline} at a glance`} />
            </section>

            <section id="their-strengths" className={styles.section} aria-labelledby="their-strengths-title">
              <h2 id="their-strengths-title">Where {page.competitor} shines</h2>
              <p className={styles.sectionLede}>{page.theirStrengths.lede}</p>
              <ul className={`${styles.points} ${styles.pointsThem}`}>
                {page.theirStrengths.points.map((point) => (
                  <li key={point.title} className={styles.point}>
                    <h3>
                      <Star size={16} aria-hidden="true" /> {point.title}
                    </h3>
                    <p>{point.body}</p>
                  </li>
                ))}
              </ul>
              <p className={styles.closingNote}>{page.theirStrengths.closing}</p>
            </section>

            <section id="our-differences" className={styles.section} aria-labelledby="our-differences-title">
              <h2 id="our-differences-title">Where NeuVault is different</h2>
              <p className={styles.sectionLede}>{page.ourDifferences.lede}</p>
              <ul className={styles.points}>
                {[...page.ourDifferences.points, plannerDifference].map((point) => (
                  <li key={point.title} className={styles.point}>
                    <h3>
                      <Sparkles size={16} aria-hidden="true" /> {point.title}
                    </h3>
                    <p>{point.body}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section id="fits-together" className={styles.section} aria-labelledby="fits-together-title">
              <h2 id="fits-together-title">{howItFitsTogether.title}</h2>
              <p className={styles.sectionLede}>{howItFitsTogether.lede}</p>
              <ol className={styles.flow}>
                {howItFitsTogether.steps.map((step, index) => (
                  <li key={step.title}>
                    <span className={styles.flowNumber} aria-hidden="true">
                      {index + 1}
                    </span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className={styles.closingNote}>
                <Link href="/guides/plan-tasks-from-notes-and-documents">
                  Learn how to plan tasks from notes and documents <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </p>
            </section>

            {page.deepDives.map((section) => (
              <section key={section.id} id={section.id} className={styles.section} aria-labelledby={`${section.id}-title`}>
                <h2 id={`${section.id}-title`}>{section.title}</h2>
                <p className={styles.sectionLede}>{section.lede}</p>
                <div className={styles.prose}>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>
                      <InlineLinks text={paragraph} />
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section id="pricing" className={styles.section} aria-labelledby="pricing-title">
              <h2 id="pricing-title">Pricing</h2>
              <p className={styles.sectionLede}>{page.pricing.lede}</p>
              <CompareTable rows={page.pricing.rows} competitor={page.competitor} caption={`${page.headline} pricing`} />
              <p className={styles.footnote}>{page.pricing.footnote}</p>
            </section>

            <section id="choose" className={styles.section} aria-labelledby="choose-title">
              <h2 id="choose-title">Which one is right for you?</h2>
              <p className={styles.sectionLede}>{page.choose.lede}</p>
              <div className={styles.choose}>
                <div className={styles.chooseCard}>
                  <h3>Choose {page.competitor} if you:</h3>
                  <ul>
                    {page.choose.them.map((item) => (
                      <li key={item}>
                        <span aria-hidden="true">
                          <Check size={13} strokeWidth={2.8} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${styles.chooseCard} ${styles.chooseUs}`}>
                  <h3>Choose NeuVault if you:</h3>
                  <ul>
                    {page.choose.us.map((item) => (
                      <li key={item}>
                        <span aria-hidden="true">
                          <Check size={13} strokeWidth={2.8} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className={styles.both}>{page.choose.both}</p>
            </section>

            <section className={styles.cta} aria-label="Get NeuVault">
              <h2>{page.closing}</h2>
              <div className={styles.ctaActions}>
                <DownloadLink className={styles.ctaPrimary}>
                  Download NeuVault free <ArrowRight size={15} aria-hidden="true" />
                </DownloadLink>
                <Link href="/#videos" className={styles.ctaSecondary}>
                  <Play size={13} fill="currentColor" strokeWidth={0} aria-hidden="true" /> Watch the 3-minute tour
                </Link>
              </div>
            </section>

            <section id="questions" className={styles.section} aria-labelledby="questions-title">
              <h2 id="questions-title">Frequently asked questions</h2>
              <div className={styles.faqList}>
                {page.faqs.map((faq) => (
                  <details key={faq.question} className={styles.faqItem}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            {others.length > 0 ? (
              <section className={styles.section} aria-labelledby="others-title">
                <h2 id="others-title">Other comparisons</h2>
                <ul className={styles.otherCompare}>
                  {others.map((other) => (
                    <li key={other.slug}>
                      <Link href={comparisonPath(other)} className={styles.card}>
                        <h2>{other.headline}</h2>
                        <p>{other.subheadline}</p>
                        <span className={styles.cardFoot}>
                          <span />
                          <span>
                            Compare <ArrowRight size={14} aria-hidden="true" />
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className={styles.sources} aria-labelledby="sources-title">
              <h2 id="sources-title">Sources</h2>
              <p>
                {page.competitor} facts were checked against {page.competitor}&apos;s own pages on {updated}. {page.competitor}{" "}
                is a trademark of its owner; NeuVault is not affiliated with or endorsed by {page.competitor}.
              </p>
              <ul>
                {page.sources.map((source) =>
                  source.url.startsWith("/") ? (
                    <li key={source.url}>
                      <Link href={source.url}>{source.label}</Link>
                    </li>
                  ) : (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        {source.label} <ExternalLink size={12} aria-hidden="true" />
                      </a>
                    </li>
                  )
                )}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
