import Link from "next/link";
import { guidePages } from "@/lib/guides";

export default function GuidesPreview() {
  const featuredGuides = guidePages.slice(0, 3);

  return (
    <section className="relative border-t border-white/10 px-6 py-24 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[10%] top-8 h-56 w-56 rounded-full bg-[#3F8CFF]/10 blur-[110px]" />
        <div className="absolute bottom-0 right-[10%] h-64 w-64 rounded-full bg-[#6DD1FF]/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">Support guides</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Helpful guides for scanning, organizing, and tracking important documents.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/68 md:text-lg">
              Explore practical guides for scanning, organization, reminders, retrieval, backup, and voice-note workflows. Each page is designed to be useful, distinct, and easy to navigate.
            </p>
          </div>
          <Link
            href="/guides"
            className="inline-flex rounded-full border border-white/14 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            View all guides
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featuredGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-[#6DD1FF]/30 hover:bg-white/8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9dd9ff]">
                {guide.primaryKeyword}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white transition group-hover:text-[#dff2ff]">
                {guide.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/68">{guide.description}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-[#8ec0ff]">
                Read guide
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}