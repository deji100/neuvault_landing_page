import Link from "next/link";
import { solutionPages } from "@/lib/seo";

const workflowIntro = {
  eyebrow: "Find your problem",
  title: "Start with the document pain you want to fix.",
  description:
    "NeuVault is built around real moments: finding a file you saved, remembering a date, organizing scans, keeping notes with documents, and restoring your vault when you move devices.",
};

const workflowLabels: Record<
  string,
  {
    label: string;
    pain: string;
    action: string;
  }
> = {
  "document-organization": {
    label: "Scattered records",
    pain: "Documents, screenshots, notes, and scans are saved everywhere.",
    action: "Organize important records",
  },
  "document-reminder": {
    label: "Forgotten dates",
    pain: "Renewals, expiry dates, deadlines, and follow-ups get buried.",
    action: "Review important dates",
  },
  "document-retrieval": {
    label: "Lost files",
    pain: "You know you saved it, but you cannot remember the filename.",
    action: "Find documents faster",
  },
  "secure-document-backup": {
    label: "Device change",
    pain: "Important records are trapped on one phone, laptop, or folder.",
    action: "Back up and restore",
  },
  "notes-export": {
    label: "Notes without context",
    pain: "Thoughts, AI answers, and document notes disappear from the record.",
    action: "Keep notes useful",
  },
  "voice-note-transcription": {
    label: "Voice notes you forget",
    pain: "Audio captures the moment, but becomes hard to search later.",
    action: "Transcribe voice notes",
  },
  "scan-organization": {
    label: "Scans in camera roll",
    pain: "Paper scans become photos instead of usable records.",
    action: "Scan and organize",
  },
};

export default function WorkflowLinks() {
  return (
    <section className="relative border-t border-white/10 px-6 py-24 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[8%] top-10 h-56 w-56 rounded-full bg-[#3F8CFF]/12 blur-[110px]" />
        <div className="absolute bottom-0 right-[8%] h-64 w-64 rounded-full bg-[#6DD1FF]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
            {workflowIntro.eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
            {workflowIntro.title}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
            {workflowIntro.description}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {solutionPages.map((page) => {
            const workflow = workflowLabels[page.slug];

            return (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#6DD1FF]/30 hover:bg-white/8 hover:shadow-[0_24px_60px_-35px_rgba(63,140,255,0.7)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(63,140,255,0.14),transparent_34%)] opacity-0 transition group-hover:opacity-100" />

                <div className="relative">
                  <p className="inline-flex rounded-full border border-[#6DD1FF]/15 bg-[#6DD1FF]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9dd9ff]">
                    {workflow?.label ?? page.eyebrow}
                  </p>

                  <h3 className="mt-4 text-xl font-semibold leading-snug text-white transition group-hover:text-[#dff2ff]">
                    {workflow?.pain ?? page.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/62">
                    {page.description}
                  </p>

                  <span className="mt-5 inline-flex text-sm font-semibold text-[#8ec0ff] transition group-hover:text-white">
                    {workflow?.action ?? "View workflow"} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}