import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { guidePages } from "@/lib/guides";

export default function GuidesPreview() {
  const featuredGuides = guidePages.slice(0, 3);

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Guides
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
              Practical guidance for the records people actually lose.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Help users understand how NeuVault fits receipts, school records,
              IDs, contracts, scans, voice notes, reminders, and private backup.
            </p>
          </div>

          <Link
            href="/guides"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:border-blue-300 hover:text-blue-700"
          >
            View all guides
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featuredGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group rounded-[1.45rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_24px_70px_-52px_rgba(37,99,235,0.5)]"
            >
              <p className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700 shadow-sm">
                {guide.primaryKeyword}
              </p>
              <h3 className="mt-4 text-xl font-semibold leading-snug text-slate-950">
                {guide.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {guide.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                Read guide
                <ArrowUpRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
