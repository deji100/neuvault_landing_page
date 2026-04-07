import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LOGO_URL } from "@/lib/brand";
import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  SUPPORT_EMAIL,
  buildBreadcrumbJsonLd,
  buildMetadata,
  buildOrganizationJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Press Kit and Product Resources",
  description:
    "NeuVault press kit, product facts, brand assets, app-store links, and contact details for writers, directories, and product roundups.",
  path: "/press",
  keywords: [
    "neuvault press kit",
    "neuvault brand assets",
    "neuvault product resources",
    "neuvault media kit",
  ],
});

const productFacts = [
  "Private, local-first mobile document vault",
  "Scan and organize documents in one workflow",
  "Search and retrieve documents with context, tags, and summaries",
  "Attach reminders to document dates and renewal windows",
  "Back up vaults with encrypted export bundles you control",
  "Turn voice notes into searchable structured records",
];

const quickLinks = [
  { label: "Homepage", href: "/" },
  { label: "Guides hub", href: "/guides" },
  { label: "Scan organization", href: "/scan-organization" },
  { label: "Document reminders", href: "/document-reminder" },
  { label: "Document retrieval", href: "/document-retrieval" },
  { label: "Secure backup", href: "/secure-document-backup" },
];

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
    <main className="relative overflow-hidden bg-[#08111d] px-6 pb-24 pt-28 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
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
          <span>Press</span>
        </nav>

        <section className="mt-8 grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:grid-cols-[0.95fr_1.05fr] md:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">Press kit</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              NeuVault brand and product resources for directories, press, and roundups
            </h1>
            <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
              This page gives writers, product directories, and review sites a clean way to describe NeuVault, link to the right pages, and understand the product without guessing.
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
                href={`mailto:${SUPPORT_EMAIL}`}
                className="rounded-full border border-white/14 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Contact support
              </a>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-6">
            <div className="flex items-center gap-4">
              <Image src="/logo2.png" alt="NeuVault logo" width={72} height={72} className="rounded-2xl" />
              <div>
                <p className="text-xl font-semibold text-white">NeuVault</p>
                <p className="text-sm text-white/65">Private mobile vault for important documents</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-white/72">
              {productFacts.map((fact) => (
                <div key={fact} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  {fact}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white">Suggested one-sentence description</h2>
            <p className="mt-4 text-sm leading-8 text-white/72">
              NeuVault is a private, local-first mobile document vault for scanning, organizing, retrieving, reminding, and securely backing up important records.
            </p>
          </article>

          <article className="rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white">Suggested expanded description</h2>
            <p className="mt-4 text-sm leading-8 text-white/72">
              NeuVault helps users capture scans, PDFs, notes, photos, and voice notes in one private system. It organizes records with summaries, tags, and linked context, makes document retrieval faster, supports document reminders for future dates, and offers encrypted backup bundles that users store in destinations they control.
            </p>
          </article>
        </section>

        <section className="mt-14 rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
          <div className="flex items-end justify-between gap-5">
            <div>
              <h2 className="text-2xl font-semibold text-white">Best pages to link to</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">
                Use the page that matches the audience and intent of the article or directory entry. That keeps links contextually relevant instead of forcing everything to the homepage.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm font-semibold text-white/80 hover:bg-white/8 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-white">Asset references</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9dd9ff]">Primary logo</p>
              <p className="mt-3 text-sm leading-7 text-white/72">Use the NeuVault logo from the website header or footer assets.</p>
              <p className="mt-3 text-sm text-white/55">Current file: `/public/logo2.png`</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9dd9ff]">Contact</p>
              <p className="mt-3 text-sm leading-7 text-white/72">For corrections, listing updates, or media questions, use the support contact below.</p>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="mt-3 inline-flex text-sm font-semibold text-[#9dd9ff] hover:text-white">
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}