import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import WorkflowDemoPlayer from "@/components/specific/home/WorkflowDemoPlayer";
import { LOGO_URL } from "@/lib/brand";
import { demoVideos } from "@/lib/demo-videos";
import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildSoftwareApplicationJsonLd,
  getSolutionPageBySlug,
  solutionPages,
} from "@/lib/seo";

type SolutionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type SupplementalContent = {
  useCases: { title: string; description: string }[];
  comparisons: { title: string; limitation: string; neuvaultAdvantage: string }[];
  extraFaqs: { question: string; answer: string }[];
};

const demoVideoTitleBySlug: Record<string, string> = {
  "document-organization": "Smart Upload Intake",
  "document-reminder": "Document Resurfacing",
  "document-retrieval": "Nova Assistant",
  "secure-document-backup": "Settings and Backup",
  "notes-export": "Smart Note Intake",
  "voice-note-transcription": "Smart Voice Note Intake",
  "scan-organization": "Smart Scan Intake",
};

const supplementalContentBySlug: Record<string, SupplementalContent> = {
  "document-organization": {
    useCases: [
      {
        title: "Personal records that keep multiplying",
        description:
          "Keep IDs, warranties, receipts, travel paperwork, and household records inside one structure instead of scattered downloads and screenshots.",
      },
      {
        title: "Business admin without a document team",
        description:
          "Organize invoices, tax files, contracts, and proof-of-payment records without maintaining a complicated shared-drive system.",
      },
      {
        title: "School, research, and mixed-reference folders",
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
          "NeuVault adds smart grouping, summaries, tags, linked items, and document-aware follow-up actions around the file itself.",
      },
      {
        title: "Compared with a notes app plus attachments",
        limitation:
          "A notes app can describe a document, but the file, reminder, and surrounding context usually split across separate tools.",
        neuvaultAdvantage:
          "NeuVault keeps the note, upload, scan, reminder, and related records in one private workflow instead of making you stitch them back together.",
      },
      {
        title: "Compared with manual folder cleanup",
        limitation:
          "Manual cleanup works briefly, then collapses once new uploads, scans, and voice notes arrive from different places.",
        neuvaultAdvantage:
          "NeuVault is designed to organize during intake so the vault stays usable as volume grows.",
      },
    ],
    extraFaqs: [
      {
        question: "Can NeuVault organize documents without forcing strict folders first?",
        answer:
          "Yes. NeuVault is designed so intake, grouping, summaries, and linked context reduce how much manual folder maintenance you need upfront.",
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
          "Spreadsheets and manual reminders break when dates are buried inside many documents or scattered across multiple people.",
        neuvaultAdvantage:
          "NeuVault adds smart suggestions and resurfacing flows designed around dates that live inside real paperwork.",
      },
    ],
    extraFaqs: [
      {
        question: "Can NeuVault handle both one-time and recurring reminders?",
        answer:
          "Yes. NeuVault supports resurfacing for future revisit workflows, including recurring cadence and one-time reminder behavior.",
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
          "Pull up the right agreement, receipt, ID, or medical file fast when you only remember part of the story and need it now.",
      },
      {
        title: "Large mixed vaults",
        description:
          "Find what matters in a vault that contains uploads, scans, notes, and voice-derived records instead of only cleanly named files.",
      },
      {
        title: "Question-led retrieval",
        description:
          "Use assistant-style prompts to narrow down results when the faster route is asking what happened rather than browsing folders manually.",
      },
    ],
    comparisons: [
      {
        title: "Compared with filename search",
        limitation:
          "Filename search depends on remembering exact wording, which breaks down when documents arrive from email, scans, or old exports.",
        neuvaultAdvantage:
          "NeuVault supports retrieval through summaries, tags, groups, linked items, and assistant-guided search instead of relying on filenames alone.",
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
          "Context gets fragmented when documents, notes, and reminders live in separate tools, making every retrieval attempt partial.",
        neuvaultAdvantage:
          "NeuVault reduces that fragmentation by letting more of the workflow live in one vault-aware system.",
      },
    ],
    extraFaqs: [
      {
        question: "Does retrieval work across notes and linked records too?",
        answer:
          "Yes. NeuVault is built so notes, grouped items, tags, and linked records all improve recall instead of staying isolated from the retrieval flow.",
      },
      {
        question: "Why is NeuVault stronger than a standard search bar?",
        answer:
          "Because standard search usually depends on exact text matches. NeuVault adds document context, grouping, assistant help, and linked items so you can retrieve what you need with less precision.",
      },
    ],
  },
  "secure-document-backup": {
    useCases: [
      {
        title: "Protecting irreplaceable records",
        description:
          "Keep a recoverable copy of IDs, contracts, receipts, health files, and long-term notes without surrendering the vault to always-on cloud sync.",
      },
      {
        title: "Portable recovery planning",
        description:
          "Create backup routines that can move between devices, cloud providers, or offline storage options you already trust.",
      },
      {
        title: "Backup discipline without guesswork",
        description:
          "Use reminder settings so secure backup becomes a repeatable routine instead of a task you remember only after a problem.",
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
        title: "Meeting and follow-up notes with source files",
        description:
          "Keep the note beside the contract, invoice, scan, or uploaded file it references, then export it when you need to share or archive the outcome.",
      },
      {
        title: "Reporting and spreadsheet workflows",
        description:
          "Export structured note content to CSV when your next step is analysis, handoff, or data cleanup in another tool.",
      },
      {
        title: "Portable records for clients or teams",
        description:
          "Move note content into PDF or Word when a stakeholder needs a durable format outside the app.",
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
          "NeuVault provides dedicated export flows for PDF, Word, and CSV so the output stays structured and usable.",
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
        question: "Is the exported note still structured or just plain text?",
        answer:
          "NeuVault is built to preserve useful structure during export so the result is easier to read, share, and process elsewhere.",
      },
    ],
  },
  "voice-note-transcription": {
    useCases: [
      {
        title: "Fast capture during movement",
        description:
          "Save a thought, instruction, or reminder while walking, driving, or handling paperwork without needing to stop and type.",
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
          "NeuVault continues after capture with OCR, grouping, summaries, tags, linked items, and vault-based retrieval.",
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

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = getSolutionPageBySlug(slug);

  if (!resolved) {
    return buildMetadata({
      title: "Page Not Found",
      description: "NeuVault workflow page not found.",
      path: "/",
      noindex: true,
    });
  }

  return buildMetadata({
    title: resolved.page.metaTitle,
    description: resolved.page.description,
    path: `/${resolved.canonicalSlug}`,
    keywords: resolved.page.keywords,
  });
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
  const pageFaqs = [...page.faqs, ...supplemental.extraFaqs];
  const demoVideo = demoVideos.find((item) => item.title === demoVideoTitleBySlug[page.slug]) ?? null;
  const relatedPages = solutionPages.filter((item) => item.slug !== page.slug).slice(0, 3);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: page.metaTitle, path: `/${page.slug}` },
  ]);
  const faqJsonLd = buildFaqJsonLd(pageFaqs);
  const softwareJsonLd = {
    ...buildSoftwareApplicationJsonLd(),
    image: LOGO_URL,
  };

  return (
    <main className="relative overflow-hidden bg-[#08111d] px-6 pb-24 pt-28 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...softwareJsonLd,
            name: `NeuVault ${page.metaTitle}`,
            url: `https://neuvault.app/${page.slug}`,
            description: page.description,
          }),
        }}
      />
      {demoVideo ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: demoVideo.title,
              description: demoVideo.summary,
              contentUrl: demoVideo.url,
              embedUrl: demoVideo.url,
              thumbnailUrl: LOGO_URL,
              publisher: {
                "@type": "Organization",
                name: "NeuVault",
                logo: {
                  "@type": "ImageObject",
                  url: LOGO_URL,
                },
              },
            }),
          }}
        />
      ) : null}

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
          <span>{page.metaTitle}</span>
        </nav>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">{page.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">{page.intro}</p>

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
              className="rounded-full bg-[#3F8CFF] px-5 py-3 font-semibold text-white hover:bg-[#60aaff]"
            >
              Get NeuVault on Google Play
            </a>
            <Link
              href="/#see-it-in-action"
              className="rounded-full border border-white/14 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
            >
              Watch all product demos
            </Link>
          </div>
        </section>

        {demoVideo ? (
          <section className="mt-14 grid items-start gap-6 lg:grid-cols-[1.06fr_0.94fr]">
            <WorkflowDemoPlayer tag={demoVideo.tag} url={demoVideo.url} />

            <div className="self-start rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
                Matching product demo
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-white">{demoVideo.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/70">{demoVideo.summary}</p>
              <div className="mt-6 inline-flex rounded-full border border-white/12 bg-white/8 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/76">
                {demoVideo.tag}
              </div>
              <p className="mt-6 text-sm leading-7 text-white/68">
                This page now shows the most relevant NeuVault demo directly in context instead of making visitors bounce back to the homepage carousel.
              </p>
            </div>
          </section>
        ) : null}

        <section className="mt-14 grid gap-6 lg:grid-cols-3">
          {page.benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <h2 className="text-xl font-semibold text-white">{benefit.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/68">{benefit.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-14 rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold text-white">Where this workflow fits best</h2>
            <p className="mt-4 text-sm leading-7 text-white/68">
              These are the real situations where this NeuVault workflow is stronger than a generic document page with broad marketing copy.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {supplemental.useCases.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white">How NeuVault supports this workflow</h2>
            <div className="mt-5 space-y-4">
              {page.appProof.map((proof) => (
                <div key={proof} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm leading-7 text-white/72">{proof}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(11,19,34,0.92),rgba(9,15,27,0.78))] p-7">
            <h2 className="text-2xl font-semibold text-white">Why this matters</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              NeuVault is strongest when the document is not just stored, but retrievable, understandable,
              and connected to the follow-up actions around it. That is why the product combines intake,
              reminders, linked context, structured outputs, and private backup rather than solving only one
              narrow part of the workflow.
            </p>

            <div className="mt-6 rounded-2xl border border-[#6DD1FF]/16 bg-[#6DD1FF]/8 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#cce8ff]">
                Also useful with
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {solutionPages
                  .filter((item) => item.slug !== page.slug)
                  .slice(0, 5)
                  .map((item) => (
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
            <h2 className="text-2xl font-semibold text-white">How NeuVault compares</h2>
            <p className="mt-4 text-sm leading-7 text-white/68">
              Search engines need topical depth, and visitors need a clear answer to why this workflow should live in NeuVault instead of a generic alternative.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {supplemental.comparisons.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">{item.limitation}</p>
                <div className="mt-4 rounded-2xl border border-[#6DD1FF]/16 bg-[#6DD1FF]/8 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#cce8ff]">Why NeuVault is stronger</p>
                  <p className="mt-2 text-sm leading-7 text-white/78">{item.neuvaultAdvantage}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="mt-14 rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-white">Frequently asked questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {pageFaqs.map((faq) => (
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
              <h2 className="text-2xl font-semibold text-white">Related NeuVault workflows</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">
                Use these pages to compare the rest of NeuVault&apos;s document workflows without going back
                to a generic overview page.
              </p>
            </div>
            <Link href="/" className="hidden text-sm font-semibold text-[#9dd9ff] hover:text-white md:inline-flex">
              Back to homepage
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {relatedPages.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5 transition hover:border-[#6DD1FF]/28 hover:bg-white/8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9dd9ff]">{item.eyebrow}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.metaTitle}</h3>
                <p className="mt-3 text-sm leading-7 text-white/66">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
