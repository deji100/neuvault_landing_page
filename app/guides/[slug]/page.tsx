import type { Metadata } from "next";
import Link from "next/link";
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
import { IOS_APP_STORE_URL, ANDROID_PLAY_STORE_URL, getSolutionPageBySlug } from "@/lib/seo";

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return guidePages.map((guide) => ({ slug: guide.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
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

  return (
    <main className="relative overflow-hidden bg-[#08111d] px-6 pb-24 pt-28 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-10 h-64 w-64 rounded-full bg-[#3F8CFF]/14 blur-[130px]" />
        <div className="absolute bottom-0 right-[8%] h-72 w-72 rounded-full bg-[#6DD1FF]/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <nav className="text-sm text-white/55">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="px-2 text-white/30">/</span>
          <Link href="/guides" className="hover:text-white">
            Guides
          </Link>
          <span className="px-2 text-white/30">/</span>
          <span>{guide.metaTitle}</span>
        </nav>

        <article className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">{guide.primaryKeyword}</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">{guide.title}</h1>
          <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">{guide.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/74">
            {guide.secondaryKeywords.map((keyword) => (
              <span key={keyword} className="rounded-full border border-white/12 bg-white/6 px-3 py-2">
                {keyword}
              </span>
            ))}
          </div>
        </article>

        <section className="mt-14 rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-white">Key takeaways</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {guide.keyTakeaways.map((takeaway) => (
              <article key={takeaway} className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm leading-7 text-white/72">
                {takeaway}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 space-y-5">
          {guide.sections.map((section, index) => (
            <article key={section.title} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9dd9ff]">Step {index + 1}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{section.title}</h2>
              <p className="mt-4 text-sm leading-8 text-white/72 md:text-base">{section.description}</p>
            </article>
          ))}
        </section>

        {parentSolution ? (
          <section className="mt-14 rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(11,19,34,0.94),rgba(9,15,27,0.82))] p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">Related product workflow</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">{parentSolution.title}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70">{parentSolution.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/${parentSolution.slug}`}
                className="rounded-full bg-[#3F8CFF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#60aaff]"
              >
                {guide.ctaLabel}
              </Link>
              <a
                href={IOS_APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/14 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Get NeuVault on the App Store
              </a>
              <a
                href={ANDROID_PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/14 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Get NeuVault on Google Play
              </a>
            </div>
          </section>
        ) : null}

        <section className="mt-14 rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-white">Frequently asked questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {guide.faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="flex items-end justify-between gap-5">
            <div>
              <h2 className="text-2xl font-semibold text-white">Related guides</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">
                These guides explore closely related document tasks so you can keep learning without losing the thread.
              </p>
            </div>
            <Link href="/guides" className="hidden text-sm font-semibold text-[#9dd9ff] hover:text-white md:inline-flex">
              View all guides
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {relatedGuides.map((item) => (
              <Link
                key={item.slug}
                href={`/guides/${item.slug}`}
                className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5 transition hover:border-[#6DD1FF]/28 hover:bg-white/8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9dd9ff]">{item.primaryKeyword}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/66">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}