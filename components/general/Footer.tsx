"use client";

import Image from "next/image";
import Link from "next/link";
import { guidePages } from "@/lib/guides";
import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  WINDOWS_MICROSOFT_STORE_URL,
  solutionPages,
} from "@/lib/seo";

const scrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;

  const navOffset = 92;
  const top = element.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({ top, behavior: "smooth" });
};

const footerPills = [
  "Private AI vault",
  "Local-first by design",
  "Encrypted backups you control",
  "iPhone + Android + Windows",
  "macOS coming soon",
];

const primaryLinks = [
  {
    label: "Why NeuVault",
    action: () => scrollToId("features"),
  },
  {
    label: "How it works",
    action: () => scrollToId("how-it-works"),
  },
  {
    label: "Product demos",
    action: () => scrollToId("see-it-in-action"),
  },
];

const workflowLabels: Record<string, string> = {
  "document-organization": "Organize important records",
  "document-reminder": "Remember dates and renewals",
  "document-retrieval": "Find documents faster",
  "secure-document-backup": "Back up and restore privately",
  "notes-export": "Keep notes portable",
  "voice-note-transcription": "Turn voice notes searchable",
  "scan-organization": "Scan and organize documents",
};

export default function Footer() {
  const featuredGuides = guidePages.slice(0, 3);

  return (
    <footer
      id="site-footer"
      className="relative overflow-hidden border-t border-white/10 bg-[#06101c] px-6 py-16 text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-8 h-64 w-64 rounded-full bg-[#3F8CFF]/12 blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] h-72 w-72 rounded-full bg-[#6DD1FF]/8 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <Image
                  src="/logo2.png"
                  alt="NeuVault logo"
                  width={60}
                  height={60}
                  className="w-12 rounded-xl"
                />

                <div>
                  <p className="text-xl font-semibold text-white">NeuVault</p>
                  <p className="text-sm text-white/55">
                    Private document memory for records life asks for later
                  </p>
                </div>
              </Link>

              <h2 className="mt-6 max-w-3xl text-2xl font-semibold leading-tight text-white md:text-3xl">
                You saved it somewhere. NeuVault helps you find, understand,
                remember, and recover it.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/66 md:text-base">
                Keep documents, scans, screenshots, notes, and voice notes in a
                private vault that preserves context — not just files.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {footerPills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/68"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#6DD1FF]/16 bg-[#6DD1FF]/8 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9dd9ff]">
                Download NeuVault
              </p>

              <p className="mt-3 text-sm leading-7 text-white/66">
                NeuVault is available now on iPhone, Android, and Windows.
                macOS is coming soon for users who want the same vault
                experience across Apple desktop workflows.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
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
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr_1fr_0.85fr_1fr]">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
              Explore
            </h3>

            <ul className="space-y-3 text-sm text-white/64">
              {primaryLinks.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={item.action}
                    className="hover:text-white"
                  >
                    {item.label}
                  </button>
                </li>
              ))}

              <li>
                <Link href="/guides" className="hover:text-white">
                  Guides
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
              Document problems
            </h3>

            <ul className="space-y-3 text-sm text-white/64">
              {solutionPages.map((page) => (
                <li key={page.slug}>
                  <Link href={`/${page.slug}`} className="hover:text-white">
                    {workflowLabels[page.slug] ?? page.metaTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
              Helpful guides
            </h3>

            <ul className="space-y-3 text-sm text-white/64">
              {featuredGuides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="hover:text-white"
                  >
                    {guide.metaTitle}
                  </Link>
                </li>
              ))}

              <li>
                <Link href="/guides" className="text-[#8ec0ff] hover:text-white">
                  View all guides →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
              Company
            </h3>

            <ul className="space-y-3 text-sm text-white/64">
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/press" className="hover:text-white">
                  Press
                </Link>
              </li>

              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy policy
                </Link>
              </li>

              <li>
                <Link href="/terms-and-conditions" className="hover:text-white">
                  Terms of service
                </Link>
              </li>

              <li>
                <Link href="/account-deletion" className="hover:text-white">
                  Account deletion
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
              Trust note
            </h3>

            <p className="text-sm leading-7 text-white/64">
              NeuVault is designed around local-first storage. Your documents
              live on your device by default, and encrypted backups stay under
              your control.
            </p>

            <p className="mt-4 text-xs leading-6 text-white/42">
              AI processing may temporarily handle content when you use
              intelligent workflows, but documents are not kept after
              processing.
            </p>

            <div className="mt-5 hidden rounded-2xl border border-white/10 bg-white p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] md:block">
              <a
                href="https://saasbrowser.com/en/saas/1019052/neuvault"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Image
                  src="https://static-files.saasbrowser.com/saas-browser-badge-13.svg"
                  alt="Listed on SaaS Browser"
                  width={200}
                  height={52}
                  unoptimized
                  className="h-auto w-[200px]"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            <Link href="/" className="text-white hover:underline">
              NeuVault
            </Link>
            . All rights reserved.
          </p>

          <p>
            Private by default. Built for the documents life asks for later.
          </p>
        </div>
      </div>
    </footer>
  );
}
