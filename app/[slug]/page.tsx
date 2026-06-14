import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

import { LOGO_URL } from "@/lib/brand";
import { getGuidesForSolution } from "@/lib/guides";

import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  SITE_URL,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildSoftwareApplicationJsonLd,
  getSolutionPageBySlug,
  getSolutionPagesBySlugs,
  solutionPages,
} from "@/lib/seo";

type SolutionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type SupplementalContent = {
  useCases: { title: string; description: string }[];
  comparisons: {
    title: string;
    limitation: string;
    neuvaultAdvantage: string;
  }[];
  extraFaqs: { question: string; answer: string }[];
};

const supplementalContentBySlug: Record<string, SupplementalContent> = {
  "document-organization": {
    useCases: [
      {
        title: "Scattered personal records",
        description:
          "Bring IDs, receipts, warranties, agreements, travel files, and household paperwork into one private vault instead of leaving them across downloads, screenshots, and folders.",
      },
      {
        title: "Business admin without folder chaos",
        description:
          "Keep invoices, tax files, contracts, and proof-of-payment records organized without maintaining a complicated shared-drive system.",
      },
      {
        title: "School, research, and mixed records",
        description:
          "Keep PDFs, notes, scans, and voice capture tied to the same topic so retrieval still works later when memory is partial.",
      },
    ],
    comparisons: [
      {
        title: "Compared with generic cloud folders",
        limitation:
          "Cloud drives store files, but they usually leave the real organizing work to manual folders, filenames, and memory.",
        neuvaultAdvantage:
          "NeuVault adds automatic organization, manual grouping, summaries, tags, linked records, and follow-up actions around the file itself.",
      },
      {
        title: "Compared with a notes app plus attachments",
        limitation:
          "A notes app can describe a document, but the file, reminder, and surrounding context usually split across separate tools.",
        neuvaultAdvantage:
          "NeuVault keeps the note, upload, scan, reminder, and related records in one private workflow.",
      },
      {
        title: "Compared with manual folder cleanup",
        limitation:
          "Manual cleanup works briefly, then collapses once new uploads, scans, screenshots, and voice notes arrive from different places.",
        neuvaultAdvantage:
          "NeuVault is designed to organize during intake while still letting you group things manually as the vault grows.",
      },
    ],
    extraFaqs: [
      {
        question: "Can NeuVault organize documents without forcing strict folders first?",
        answer:
          "Yes. NeuVault combines automatic organization, manual grouping, summaries, and linked context so you do not need perfect folders before the vault becomes useful.",
      },
      {
        question: "Is this only for personal paperwork?",
        answer:
          "No. The same workflow works for personal records, school material, business admin files, and mixed document sets that need context to stay usable.",
      },
    ],
  },

  "document-reminder": {
    useCases: [
      {
        title: "Renewals and expirations",
        description:
          "Track passports, IDs, insurance, warranties, visas, subscriptions, and other documents that only matter again when the date approaches.",
      },
      {
        title: "Business follow-ups",
        description:
          "Stay on top of invoices, compliance tasks, agreement reviews, or customer paperwork without managing a disconnected reminder list.",
      },
      {
        title: "Family and household admin",
        description:
          "Keep reminders tied to the real document so important dates do not depend on someone remembering why the alert existed.",
      },
    ],
    comparisons: [
      {
        title: "Compared with a generic to-do app",
        limitation:
          "A to-do list can remind you that something is due, but it often drops the actual document and surrounding context.",
        neuvaultAdvantage:
          "NeuVault keeps the reminder attached to the source document or linked group, so the follow-up starts with the right information in view.",
      },
      {
        title: "Compared with calendar reminders",
        limitation:
          "Calendar reminders are strong for meetings, but weak for document-heavy follow-ups that require files, notes, and history.",
        neuvaultAdvantage:
          "NeuVault surfaces the relevant item inside the vault rather than forcing a second search when the reminder fires.",
      },
      {
        title: "Compared with manual date tracking",
        limitation:
          "Spreadsheets and manual reminders break when dates are buried inside many documents or scattered across multiple places.",
        neuvaultAdvantage:
          "NeuVault adds Attention and resurfacing flows designed around dates that live inside real paperwork.",
      },
    ],
    extraFaqs: [
      {
        question: "Can NeuVault handle both one-time and recurring reminders?",
        answer:
          "Yes. NeuVault supports future resurfacing workflows, including recurring cadence and one-time reminder behavior.",
      },
      {
        question: "Why use NeuVault instead of a calendar alert?",
        answer:
          "Because the reminder usually needs the actual document, note, or linked records beside it. NeuVault keeps that context attached instead of separating the alert from the source material.",
      },
    ],
  },

  "document-retrieval": {
    useCases: [
      {
        title: "Pressure moments when time is short",
        description:
          "Pull up the right agreement, receipt, ID, certificate, or medical file fast when you only remember part of the story.",
      },
      {
        title: "Large mixed vaults",
        description:
          "Find what matters in a vault that contains uploads, scans, screenshots, notes, and voice-derived records instead of only cleanly named files.",
      },
      {
        title: "Question-led retrieval",
        description:
          "Use Nova to narrow down results when asking what happened is faster than browsing folders manually.",
      },
    ],
    comparisons: [
      {
        title: "Compared with filename search",
        limitation:
          "Filename search depends on remembering exact wording, which breaks down when documents arrive from email, scans, WhatsApp, or old exports.",
        neuvaultAdvantage:
          "NeuVault supports retrieval through summaries, tags, groups, linked records, and Nova instead of relying on filenames alone.",
      },
      {
        title: "Compared with a plain document repository",
        limitation:
          "A repository can store many files but still leave retrieval slow when related context is missing.",
        neuvaultAdvantage:
          "NeuVault keeps adjacent records connected so retrieval can recover the whole issue, not just a single isolated file.",
      },
      {
        title: "Compared with searching across many apps",
        limitation:
          "Context gets fragmented when documents, notes, and reminders live in separate tools.",
        neuvaultAdvantage:
          "NeuVault reduces that fragmentation by letting more of the workflow live in one vault-aware system.",
      },
    ],
    extraFaqs: [
      {
        question: "Does retrieval work across notes and linked records too?",
        answer:
          "Yes. NeuVault is built so notes, grouped items, tags, and linked records all improve recall instead of staying isolated from retrieval.",
      },
      {
        question: "Why is NeuVault stronger than a standard search bar?",
        answer:
          "Because standard search usually depends on exact text matches. NeuVault adds document context, grouping, Nova, and linked records so you can retrieve what you need with less precision.",
      },
    ],
  },

  "secure-document-backup": {
    useCases: [
      {
        title: "Protecting irreplaceable records",
        description:
          "Keep a recoverable copy of IDs, contracts, receipts, health files, school records, and long-term notes without surrendering the vault to always-on cloud sync.",
      },
      {
        title: "Portable recovery planning",
        description:
          "Create backup routines that can move between devices, cloud providers, or offline storage options you already trust.",
      },
      {
        title: "Backup discipline without guesswork",
        description:
          "Use reminder settings so secure backup becomes a repeatable routine instead of something you remember only after a problem.",
      },
    ],
    comparisons: [
      {
        title: "Compared with leaving everything on one device",
        limitation:
          "Single-device storage is simple until loss, corruption, or replacement turns a local vault into a permanent gap.",
        neuvaultAdvantage:
          "NeuVault supports encrypted export bundles and reminder flows so backup becomes part of the product, not an afterthought.",
      },
      {
        title: "Compared with automatic cloud-only backup",
        limitation:
          "Automatic cloud backup can feel convenient, but it often reduces your control over where sensitive document archives live.",
        neuvaultAdvantage:
          "NeuVault is designed around user-controlled encrypted exports, so you choose the destination and keep ownership of the backup path.",
      },
      {
        title: "Compared with manual archive copies",
        limitation:
          "Manual copying is easy to postpone and hard to audit, especially when the vault changes over time.",
        neuvaultAdvantage:
          "NeuVault adds backup reminders and explicit recovery-oriented settings to make the process more reliable.",
      },
    ],
    extraFaqs: [
      {
        question: "Is secure backup different from always-on sync?",
        answer:
          "Yes. NeuVault emphasizes encrypted export and user-controlled backup destinations rather than assuming one permanent sync provider should hold the entire vault.",
      },
      {
        question: "Can I choose where the backup bundle is stored?",
        answer:
          "Yes. NeuVault is designed so you choose the storage location that fits your privacy and recovery preferences.",
      },
    ],
  },

  "notes-export": {
    useCases: [
      {
        title: "Notes with source documents",
        description:
          "Keep the note beside the contract, invoice, scan, AI response, or uploaded file it references, then export it when you need to share or archive the outcome.",
      },
      {
        title: "Reporting and spreadsheet workflows",
        description:
          "Export structured note content when your next step is analysis, handoff, or cleanup in another tool.",
      },
      {
        title: "Portable records for clients or teams",
        description:
          "Move note content into PDF or Word when someone needs a durable format outside the app.",
      },
    ],
    comparisons: [
      {
        title: "Compared with a standalone note app",
        limitation:
          "Standalone note apps are fine for writing, but they separate the note from the documents, reminders, and surrounding records it refers to.",
        neuvaultAdvantage:
          "NeuVault keeps note creation inside the same vault as the files and follow-up workflow, then still lets you export when needed.",
      },
      {
        title: "Compared with copy-paste export",
        limitation:
          "Manual copy-paste into Word or spreadsheets is slow, inconsistent, and easy to break once formatting matters.",
        neuvaultAdvantage:
          "NeuVault provides dedicated export flows so the output stays structured and usable.",
      },
      {
        title: "Compared with leaving notes trapped in one app",
        limitation:
          "Many note tools make capture easy but portability weak, especially when another format is required later.",
        neuvaultAdvantage:
          "NeuVault treats portability as part of the workflow rather than an afterthought.",
      },
    ],
    extraFaqs: [
      {
        question: "Which export formats does NeuVault support for notes?",
        answer:
          "NeuVault includes dedicated note export flows for PDF, Word, and CSV output.",
      },
      {
        question: "Can Nova responses become notes?",
        answer:
          "Yes. Useful Nova responses can become notes, helping important AI-generated context stay inside the vault instead of disappearing in chat history.",
      },
    ],
  },

  "voice-note-transcription": {
    useCases: [
      {
        title: "Fast capture during movement",
        description:
          "Save a thought, instruction, or reminder while walking, commuting, or handling paperwork without needing to stop and type.",
      },
      {
        title: "Meeting and field-note capture",
        description:
          "Turn spoken context into structured text that can sit beside documents, scans, and later follow-up actions.",
      },
      {
        title: "Memory support for document-heavy tasks",
        description:
          "Capture the why behind a file in the moment, then search or revisit it later as part of the same vault workflow.",
      },
    ],
    comparisons: [
      {
        title: "Compared with a generic voice memo app",
        limitation:
          "Voice memo apps capture sound, but the recording often remains an isolated audio file that is hard to revisit and search.",
        neuvaultAdvantage:
          "NeuVault turns voice into structured text that can live alongside documents, reminders, and other vault records.",
      },
      {
        title: "Compared with raw transcription tools",
        limitation:
          "Raw transcription tools often dump text without shaping it into something readable or connected to a larger workflow.",
        neuvaultAdvantage:
          "NeuVault is designed to format transcription into structured note output that remains usable later.",
      },
      {
        title: "Compared with typing everything later",
        limitation:
          "Waiting to type later usually means details are lost, delayed, or never captured at all.",
        neuvaultAdvantage:
          "NeuVault preserves the speed of voice capture while still moving the result into a searchable text workflow.",
      },
    ],
    extraFaqs: [
      {
        question: "Does the transcript become searchable in the vault?",
        answer:
          "Yes. The transcribed and structured result becomes part of the vault workflow so it can be revisited and searched later.",
      },
      {
        question: "Why use NeuVault instead of a standard recorder app?",
        answer:
          "Because NeuVault is built to turn the spoken note into structured, searchable text that lives beside the related document workflow instead of staying an isolated audio clip.",
      },
    ],
  },

  "scan-organization": {
    useCases: [
      {
        title: "Paper-to-vault intake",
        description:
          "Capture forms, receipts, letters, certificates, or signed pages and place them directly into an organized document workflow.",
      },
      {
        title: "Cleaning up camera-roll document chaos",
        description:
          "Move important scans out of a generic photo stream and into a system designed for retrieval, reminders, and linked context.",
      },
      {
        title: "Searchable records from physical paperwork",
        description:
          "Use OCR-backed scan intake when the goal is not just keeping an image, but turning paper into a usable digital record.",
      },
    ],
    comparisons: [
      {
        title: "Compared with a basic scanner app",
        limitation:
          "Scanner apps are good at capture, but many stop at producing a PDF or image with little help for long-term organization.",
        neuvaultAdvantage:
          "NeuVault continues after capture with OCR, grouping, summaries, tags, linked records, and vault-based retrieval.",
      },
      {
        title: "Compared with keeping scans in photos",
        limitation:
          "A camera roll can store a scan, but it does not behave like an organized document system once volume increases.",
        neuvaultAdvantage:
          "NeuVault is built for document retrieval and follow-up, not just image storage.",
      },
      {
        title: "Compared with manual scan filing",
        limitation:
          "Manual scan filing still depends on disciplined naming and folder habits that often break under pressure.",
        neuvaultAdvantage:
          "NeuVault helps classify and structure scanned records during intake so they stay usable later.",
      },
    ],
    extraFaqs: [
      {
        question: "Can scanned documents be linked to other vault items?",
        answer:
          "Yes. Scan items can be grouped, tagged, summarized, and linked like other NeuVault records.",
      },
      {
        question: "Why use NeuVault instead of a simple scanner?",
        answer:
          "Because NeuVault is built for what happens after capture: organization, retrieval, reminders, and keeping the scan connected to the rest of your document context.",
      },
    ],
  },
};

export function generateStaticParams() {
  return solutionPages.flatMap((page) => [
    { slug: page.slug },
    ...(page.aliases ?? []).map((alias) => ({ slug: alias })),
  ]);
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = getSolutionPageBySlug(slug);

  if (!resolved) {
    return buildMetadata({
      title: "Page Not Found",
      description: "NeuVault page not found.",
      path: "/",
      noindex: true,
    });
  }

  return buildMetadata({
    title: resolved.page.metaTitle,
    description: resolved.page.description,
    path: `/${resolved.canonicalSlug}`,
    keywords: [
      resolved.page.primaryKeyword,
      ...resolved.page.secondaryKeywords,
      ...resolved.page.keywords,
      "document memory",
      "private AI document vault",
      "local-first document app",
      "NeuVault",
    ],
  });
}

function jsonLdScript(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const resolved = getSolutionPageBySlug(slug);

  if (!resolved) {
    notFound();
  }

  if (slug !== resolved.canonicalSlug) {
    permanentRedirect(`/${resolved.canonicalSlug}`);
  }

  const page = resolved.page;
  const supplemental = supplementalContentBySlug[page.slug];

  if (!supplemental) {
    notFound();
  }

  const pageFaqs = [...page.faqs, ...supplemental.extraFaqs];
  const relatedPages = getSolutionPagesBySlugs(page.relatedSlugs);
  const relatedGuides = getGuidesForSolution(page.slug).slice(0, 2);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: page.metaTitle, path: `/${page.slug}` },
  ]);

  const faqJsonLd = buildFaqJsonLd(pageFaqs);

  const softwareJsonLd = {
    ...buildSoftwareApplicationJsonLd(),
    image: LOGO_URL,
    name: `NeuVault ${page.metaTitle}`,
    url: `${SITE_URL}/${page.slug}`,
    description: page.description,
  };

  return (
    <main className="legacy-light-page relative overflow-hidden px-6 pb-24 pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(softwareJsonLd)}
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
          <span>{page.metaTitle}</span>
        </nav>

        <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(63,140,255,0.18),transparent_34%)]"
            aria-hidden="true"
          />

          <div className="relative">
            <p className="inline-flex rounded-full border border-[#6DD1FF]/15 bg-[#6DD1FF]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9dd9ff]">
              {page.eyebrow}
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              {page.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              {page.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <a
                href={IOS_APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#3F8CFF] px-5 py-3 font-semibold text-white hover:bg-[#60aaff]"
              >
                Get NeuVault on the App Store
              </a>

              <a
                href={ANDROID_PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/14 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                Get NeuVault on Google Play
              </a>

            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-3">
          {page.benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#6DD1FF]/20 bg-[#6DD1FF]/10 text-sm font-semibold text-[#9dd9ff]">
                {index + 1}
              </span>

              <h2 className="text-xl font-semibold text-white">
                {benefit.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/68">
                {benefit.description}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-14 rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
              Best fit
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              Where this workflow helps most
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/68">
              These are the moments where this part of NeuVault becomes useful
              in everyday life, not just in a polished demo.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {supplemental.useCases.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/68">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
              Product support
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              How NeuVault supports this
            </h2>

            <div className="mt-5 space-y-4">
              {page.appProof.map((proof) => (
                <div
                  key={proof}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <p className="text-sm leading-7 text-white/72">{proof}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-white p-7 shadow-[0_24px_70px_-52px_rgba(37,99,235,0.45)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
              Why it matters
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              Useful records need more than storage.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/70">
              NeuVault is strongest when a record is not just saved, but
              retrievable, understandable, connected, remembered, and
              recoverable. That is why the product combines intake, summaries,
              reminders, linked context, Nova, and private backup instead of
              solving only one narrow part of the workflow.
            </p>

            <div className="mt-6 rounded-2xl border border-[#6DD1FF]/16 bg-[#6DD1FF]/8 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#cce8ff]">
                Also useful with
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {relatedPages.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/12"
                  >
                    {item.metaTitle}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
              Comparison
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              How NeuVault compares
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/68">
              NeuVault avoids competing as a generic cloud drive, scanner, note
              app, or chatbot. It focuses on the document memory layer around
              important records.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {supplemental.comparisons.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/62">
                  {item.limitation}
                </p>

                <div className="mt-4 rounded-2xl border border-[#6DD1FF]/16 bg-[#6DD1FF]/8 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#cce8ff]">
                    NeuVault advantage
                  </p>

                  <p className="mt-2 text-sm leading-7 text-white/78">
                    {item.neuvaultAdvantage}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {relatedGuides.length ? (
          <section className="mt-14 rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
                  Learn more
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Helpful guides for this workflow
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">
                  These guides go deeper into the real document problems behind
                  this workflow.
                </p>
              </div>

              <Link
                href="/guides"
                className="hidden text-sm font-semibold text-[#9dd9ff] hover:text-white md:inline-flex"
              >
                View all guides →
              </Link>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/20 p-5 transition hover:-translate-y-1 hover:border-[#6DD1FF]/28 hover:bg-white/8"
                >
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(63,140,255,0.12),transparent_34%)] opacity-0 transition group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  <div className="relative">
                    <p className="inline-flex rounded-full border border-[#6DD1FF]/15 bg-[#6DD1FF]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9dd9ff]">
                      {guide.primaryKeyword}
                    </p>

                    <h3 className="mt-4 text-lg font-semibold text-white">
                      {guide.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/66">
                      {guide.description}
                    </p>

                    <span className="mt-5 inline-flex text-sm font-semibold text-[#8ec0ff] transition group-hover:text-white">
                      Read guide →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-14 rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
            Questions
          </p>

          <h2 className="mt-3 text-2xl font-semibold text-white">
            Frequently asked questions
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {pageFaqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <h3 className="text-base font-semibold text-white">
                  {faq.question}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/68">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[1.8rem] border border-white/10 bg-white p-7 shadow-[0_24px_70px_-52px_rgba(37,99,235,0.45)]">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
                Take the next step
              </p>

              <h2 className="mt-4 text-2xl font-semibold text-white">
                {page.ctaTitle}
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70">
                {page.ctaDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href={IOS_APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#3F8CFF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#60aaff]"
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
          </div>
        </section>

        <section className="mt-14">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
                Related workflows
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-white">
                More ways NeuVault helps important records
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">
                Explore nearby NeuVault workflows without going back to a
                generic overview page.
              </p>
            </div>

            <Link
              href="/"
              className="hidden text-sm font-semibold text-[#9dd9ff] hover:text-white md:inline-flex"
            >
              Back to homepage →
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {relatedPages.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-[#6DD1FF]/28 hover:bg-white/8"
              >
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(63,140,255,0.12),transparent_34%)] opacity-0 transition group-hover:opacity-100"
                  aria-hidden="true"
                />

                <div className="relative">
                  <p className="inline-flex rounded-full border border-[#6DD1FF]/15 bg-[#6DD1FF]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9dd9ff]">
                    {item.eyebrow}
                  </p>

                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {item.metaTitle}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/66">
                    {item.description}
                  </p>

                  <span className="mt-5 inline-flex text-sm font-semibold text-[#8ec0ff] transition group-hover:text-white">
                    View workflow →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
