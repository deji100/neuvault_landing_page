import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { solutionPages } from "@/lib/seo";

const workflowLabels: Record<
  string,
  {
    label: string;
    pain: string;
    action: string;
  }
> = {
  "document-organization": {
    label: "Organize",
    pain: "Documents, screenshots, notes, and scans are saved everywhere.",
    action: "Organize important records",
  },
  "document-reminder": {
    label: "Remember",
    pain: "Renewals, expiry dates, deadlines, and follow-ups get buried.",
    action: "Review important dates",
  },
  "document-retrieval": {
    label: "Find",
    pain: "You know you saved it, but you cannot remember the filename.",
    action: "Find documents faster",
  },
  "secure-document-backup": {
    label: "Recover",
    pain: "Important records are trapped on one phone, laptop, or folder.",
    action: "Back up and restore",
  },
  "notes-export": {
    label: "Notes",
    pain: "Thoughts, AI answers, and document notes disappear from the record.",
    action: "Keep notes useful",
  },
  "voice-note-transcription": {
    label: "Voice",
    pain: "Audio captures the moment, but becomes hard to search later.",
    action: "Transcribe voice notes",
  },
  "scan-organization": {
    label: "Scan",
    pain: "Paper scans become photos instead of usable records.",
    action: "Scan and organize",
  },
};

export default function WorkflowLinks() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Feature workflows
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            Every feature maps to a real document problem.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            NeuVault is organized around the moments that make document storage
            stressful: finding files, remembering dates, keeping context, and
            restoring records when devices change.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {solutionPages.map((page) => {
            const workflow = workflowLabels[page.slug];

            return (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="group rounded-[1.45rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_70px_-50px_rgba(37,99,235,0.55)]"
              >
                <div className="mb-5 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
                  {workflow?.label ?? page.eyebrow}
                </div>
                <h3 className="text-xl font-semibold leading-snug text-slate-950">
                  {workflow?.pain ?? page.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {page.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                  {workflow?.action ?? "View workflow"}
                  <ArrowUpRight size={15} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
