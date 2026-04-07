import Link from "next/link";
import { solutionPages } from "@/lib/seo";

export default function WorkflowLinks() {
  return (
    <section className="relative border-t border-white/10 px-6 py-24 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[8%] top-10 h-56 w-56 rounded-full bg-[#3F8CFF]/12 blur-[110px]" />
        <div className="absolute bottom-0 right-[8%] h-64 w-64 rounded-full bg-[#6DD1FF]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
            Explore by workflow
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
            Explore the document workflows NeuVault is built for.
          </h2>
          <p className="mt-5 text-base leading-8 text-white/68 md:text-lg">
            If you are comparing document apps by problem, not by brand, start with the workflow that
            matters most to you.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {solutionPages.map((page) => (
            <Link
              key={page.slug}
              href={`/${page.slug}`}
              className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-[#6DD1FF]/30 hover:bg-white/8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9dd9ff]">
                {page.eyebrow}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white transition group-hover:text-[#dff2ff]">
                {page.metaTitle}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/68">{page.description}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-[#8ec0ff]">
                View page
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
