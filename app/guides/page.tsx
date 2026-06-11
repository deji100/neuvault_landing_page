import type { Metadata } from "next";
import Link from "next/link";

import {
  buildBreadcrumbJsonLd,
  buildMetadata,
  buildWebSiteJsonLd,
} from "@/lib/seo";
import { guidePages } from "@/lib/guides";

export const metadata: Metadata = buildMetadata({
  title: "Document Guides for Organizing, Finding, Remembering, and Backing Up Important Records",
  description:
    "Practical NeuVault guides for organizing important documents, scanning paperwork, finding old files, remembering document dates, backing up records privately, and turning notes or voice notes into searchable records.",
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
    <main className="legacy-light-page relative overflow-hidden px-6 pb-24 pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd)}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-10 h-64 w-64 rounded-full bg-[#3F8CFF]/14 blur-[130px]" />
        <div className="absolute bottom-0 right-[8%] h-72 w-72 rounded-full bg-[#6DD1FF]/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <nav className="text-sm text-white/55" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="px-2 text-white/30">/</span>
          <span>Guides</span>
        </nav>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(63,140,255,0.18),transparent_34%)]" />

          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
              Document memory guides
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              Better ways to stop losing, forgetting, and digging for important
              documents.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              Practical guides for the records life asks for later: scans,
              receipts, forms, IDs, certificates, school files, contracts,
              notes, voice notes, reminders, and private backups.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {[
                "Organize",
                "Find",
                "Remember",
                "Scan",
                "Back up",
                "Transcribe",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/70"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {guidePages.map((guide) => (
            <article
              key={guide.slug}
              className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#6DD1FF]/30 hover:bg-white/8 hover:shadow-[0_24px_60px_-35px_rgba(63,140,255,0.7)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(63,140,255,0.14),transparent_34%)] opacity-0 transition group-hover:opacity-100" />

              <div className="relative">
                <p className="inline-flex rounded-full border border-[#6DD1FF]/15 bg-[#6DD1FF]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9dd9ff]">
                  {guide.primaryKeyword}
                </p>

                <h2 className="mt-4 text-2xl font-semibold leading-snug text-white transition group-hover:text-[#dff2ff]">
                  {guide.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/68">
                  {guide.description}
                </p>

                <ul className="mt-5 space-y-2 text-sm text-white/70">
                  {guide.keyTakeaways.slice(0, 2).map((takeaway) => (
                    <li key={takeaway} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6DD1FF]" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/guides/${guide.slug}`}
                  className="mt-6 inline-flex rounded-full border border-white/14 bg-white/6 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Read guide →
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
