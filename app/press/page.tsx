import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LOGO_URL } from "@/lib/brand";
import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  SUPPORT_EMAIL,
  WINDOWS_MICROSOFT_STORE_URL,
  buildBreadcrumbJsonLd,
  buildMetadata,
  buildOrganizationJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "NeuVault Press Kit and Product Resources",
  description:
    "NeuVault press kit, product facts, brand assets, app-store links, positioning, and contact details for writers, directories, product roundups, and reviewers.",
  path: "/press",
  keywords: [
    "neuvault press kit",
    "neuvault brand assets",
    "neuvault product resources",
    "neuvault media kit",
    "private document vault app",
    "AI document organizer press kit",
    "local-first document app",
  ],
});

const productFacts = [
  "Private AI vault for documents, scans, notes, screenshots, and voice notes",
  "Local-first by design, with documents stored on the user’s device by default",
  "Organizes important records with summaries, tags, groups, and useful context",
  "Helps users find documents from partial memory, not only exact filenames",
  "Supports reminders and Attention for dates, renewals, and follow-ups",
  "Offers encrypted backup bundles users store in locations they control",
  "Available now on iPhone, Android, and Windows, with macOS coming soon",
];

const positioningPoints = [
  {
    title: "Not another cloud drive",
    description:
      "NeuVault does not compete by becoming a bigger file bucket. It focuses on the memory layer around important records: what they are, why they matter, where they belong, and when they need attention.",
  },
  {
    title: "Not just a scanner",
    description:
      "Scanning is only the beginning. NeuVault helps turn scans into searchable, organized, contextual records that can be linked, remembered, and backed up.",
  },
  {
    title: "Not a generic chatbot",
    description:
      "Nova is designed around the user’s private vault context, helping users understand and retrieve what they already saved instead of starting from a blank conversation.",
  },
];

const quickLinks = [
  { label: "Homepage", href: "/" },
  { label: "Guides hub", href: "/guides" },
  { label: "Document organization", href: "/document-organization" },
  { label: "Document reminders", href: "/document-reminder" },
  { label: "Document retrieval", href: "/document-retrieval" },
  { label: "Secure backup", href: "/secure-document-backup" },
  { label: "Voice note transcription", href: "/voice-note-transcription" },
  { label: "Scan organization", href: "/scan-organization" },
];

function jsonLdScript(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export default function PressPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Press", path: "/press" },
  ]);

  const organizationJsonLd = {
    ...buildOrganizationJsonLd(),
    logo: LOGO_URL,
  };

  return (
    <main className="legacy-light-page relative overflow-hidden px-6 pb-24 pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd)}
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
          <span>Press</span>
        </nav>

        <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(63,140,255,0.18),transparent_34%)]"
            aria-hidden="true"
          />

          <div className="relative grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-start">
            <div>
              <p className="inline-flex rounded-full border border-[#6DD1FF]/15 bg-[#6DD1FF]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9dd9ff]">
                Press kit
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
                NeuVault brand and product resources.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
                NeuVault is a private, local-first AI vault for the documents
                life asks for later. This page gives writers, directories,
                reviewers, and product roundups a clear way to describe the
                product without guessing.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={IOS_APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#3F8CFF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#60aaff]"
                >
                  App Store
                </a>

                <a
                  href={ANDROID_PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/14 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Google Play
                </a>

                <a
                  href={WINDOWS_MICROSOFT_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/14 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Microsoft Store
                </a>

                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="rounded-full border border-white/14 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Media contact
                </a>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/logo2.png"
                  alt="NeuVault logo"
                  width={72}
                  height={72}
                  className="rounded-2xl"
                />

                <div>
                  <p className="text-xl font-semibold text-white">NeuVault</p>
                  <p className="text-sm text-white/65">
                    Private document memory for records life asks for later
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 text-sm text-white/72">
                {productFacts.map((fact) => (
                  <div
                    key={fact}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    {fact}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
              One-sentence description
            </p>

            <h2 className="mt-4 text-2xl font-semibold text-white">
              Suggested short description
            </h2>

            <p className="mt-4 text-sm leading-8 text-white/72">
              NeuVault is a private, local-first AI vault that helps people
              capture, organize, understand, remember, find, and recover the
              documents life asks for later.
            </p>
          </article>

          <article className="rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
              Expanded description
            </p>

            <h2 className="mt-4 text-2xl font-semibold text-white">
              Suggested product description
            </h2>

            <p className="mt-4 text-sm leading-8 text-white/72">
              NeuVault helps users keep important documents, scans,
              screenshots, notes, and voice notes in one private vault. It
              organizes records with summaries, tags, groups, and linked
              context, helps users review important dates, lets them ask Nova
              across their vault, and supports encrypted backup bundles stored
              in destinations the user controls.
            </p>
          </article>
        </section>

        <section className="mt-14 rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
              Positioning
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              How to describe NeuVault correctly
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/68">
              NeuVault should not be described as only a scanner, cloud drive,
              or AI PDF summarizer. The clearest framing is private document
              memory for important records.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {positioningPoints.map((item) => (
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

        <section className="mt-14 rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
                Link references
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-white">
                Best pages to link to
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">
                Use the page that matches the audience and intent of the
                article, directory entry, or product roundup. Contextual links
                are more useful than sending every reader to the homepage.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-5 text-sm font-semibold text-white/80 transition hover:-translate-y-1 hover:border-[#6DD1FF]/28 hover:bg-white/8 hover:text-white"
              >
                <span className="relative">{item.label} →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
              Brand assets
            </p>

            <h2 className="mt-4 text-2xl font-semibold text-white">
              Logo reference
            </h2>

            <div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-5">
              <Image
                src="/logo2.png"
                alt="NeuVault logo"
                width={72}
                height={72}
                className="rounded-2xl"
              />

              <div>
                <p className="text-sm font-semibold text-white">
                  Primary logo
                </p>
                <p className="mt-1 text-sm text-white/55">
                  Current file:{" "}
                  <code className="rounded-md bg-black/30 px-2 py-1 text-white/70">
                    /public/logo2.png
                  </code>
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-white/68">
              Use the NeuVault logo from the website header, footer, or the
              asset path above. Do not alter proportions, crop the mark, or
              place it on low-contrast backgrounds.
            </p>
          </article>

          <article className="rounded-[1.8rem] border border-white/10 bg-white p-7 shadow-[0_24px_70px_-52px_rgba(37,99,235,0.45)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
              Contact
            </p>

            <h2 className="mt-4 text-2xl font-semibold text-white">
              Press, listing, and correction requests
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/70">
              For product listings, directory updates, media questions,
              corrections, or partnership requests, contact NeuVault through
              the support email.
            </p>

            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-5 inline-flex rounded-full bg-[#3F8CFF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#60aaff]"
            >
              {SUPPORT_EMAIL}
            </a>

            <div className="mt-6 rounded-2xl border border-[#6DD1FF]/16 bg-[#6DD1FF]/8 p-5">
              <p className="text-sm font-semibold text-white">
                Privacy-safe wording
              </p>

              <p className="mt-2 text-sm leading-7 text-white/66">
                Recommended wording: NeuVault is local-first by design.
                Documents live on the user’s device by default. AI processing
                may temporarily handle content when intelligent workflows are
                used, but documents are not kept after processing.
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
