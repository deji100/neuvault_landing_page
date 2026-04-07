import type { Metadata } from "next";
import Link from "next/link";
import {
  buildBreadcrumbJsonLd,
  buildMetadata,
  buildWebSiteJsonLd,
} from "@/lib/seo";
import { guidePages } from "@/lib/guides";

export const metadata: Metadata = buildMetadata({
  title: "Document Guides for Scanning, Organization, Retrieval, and Backup",
  description:
    "NeuVault guides for scanning documents, organizing important files, tracking expiry dates, retrieving old paperwork, secure backup, and searchable voice notes.",
  path: "/guides",
  keywords: [
    "document organization guides",
    "scan and organize documents",
    "document reminder guide",
    "document retrieval guide",
    "secure document backup guide",
  ],
});

export default function GuidesPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
  ]);
  const websiteJsonLd = buildWebSiteJsonLd();

  return (
    <main className="relative overflow-hidden bg-[#08111d] px-6 pb-24 pt-28 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-10 h-64 w-64 rounded-full bg-[#3F8CFF]/14 blur-[130px]" />
        <div className="absolute bottom-0 right-[8%] h-72 w-72 rounded-full bg-[#6DD1FF]/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <nav className="text-sm text-white/55">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="px-2 text-white/30">/</span>
          <span>Guides</span>
        </nav>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">Document guides</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
            Practical guides for scanning, organizing, finding, and backing up important documents
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
            These guides are built around real document tasks, from scanning and organization to reminders, retrieval, backup, and voice notes. Each one is written to be genuinely useful and easy to follow.
          </p>
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {guidePages.map((guide) => (
            <article
              key={guide.slug}
              className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9dd9ff]">
                {guide.primaryKeyword}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{guide.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/68">{guide.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-white/70">
                {guide.keyTakeaways.slice(0, 2).map((takeaway) => (
                  <li key={takeaway}>{takeaway}</li>
                ))}
              </ul>
              <Link
                href={`/guides/${guide.slug}`}
                className="mt-6 inline-flex rounded-full border border-white/14 bg-white/6 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Read guide
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}