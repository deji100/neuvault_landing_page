"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

const primaryLinks = [
  { label: "Features", action: () => scrollToId("features") },
  { label: "Screenshots", action: () => scrollToId("screenshots") },
  { label: "YouTube videos", action: () => scrollToId("youtube-videos") },
  { label: "How it works", action: () => scrollToId("how-it-works") },
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
      className="border-t border-slate-200 bg-white px-6 py-16 text-slate-700"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Link href="/" className="inline-flex items-center gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-white shadow-[0_16px_36px_-24px_rgba(37,99,235,0.7)] ring-1 ring-blue-50">
                  <Image
                    src="/logo.png"
                    alt="NeuVault logo"
                    width={44}
                    height={44}
                    className="h-11 w-11 object-contain"
                  />
                </span>
                <div>
                  <p className="text-2xl font-black tracking-normal text-slate-950">NeuVault</p>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    Private document memory for records life asks for later
                  </p>
                </div>
              </Link>

              <h2 className="mt-6 max-w-3xl text-2xl font-semibold leading-tight text-slate-950 md:text-3xl">
                Keep documents, scans, notes, and voice context in one private
                vault that is easy to find, remember, and recover.
              </h2>
            </div>

            <div className="rounded-[1.4rem] border border-blue-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                Download NeuVault
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Available now on iPhone, Android, and Windows. macOS is coming
                soon.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={IOS_APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  App Store
                </a>
                <a
                  href={ANDROID_PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:border-blue-300 hover:text-blue-700"
                >
                  Google Play
                </a>
                <a
                  href={WINDOWS_MICROSOFT_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:border-blue-300 hover:text-blue-700"
                >
                  Microsoft Store
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr_1fr_0.85fr_1fr]">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-950">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              {primaryLinks.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={item.action}
                    className="text-slate-600 hover:text-blue-700"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <Link href="/guides" className="text-slate-600 hover:text-blue-700">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-blue-700">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-950">
              Document problems
            </h3>
            <ul className="space-y-3 text-sm">
              {solutionPages.map((page) => (
                <li key={page.slug}>
                  <Link href={`/${page.slug}`} className="text-slate-600 hover:text-blue-700">
                    {workflowLabels[page.slug] ?? page.metaTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-950">
              Helpful guides
            </h3>
            <ul className="space-y-3 text-sm">
              {featuredGuides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="text-slate-600 hover:text-blue-700"
                  >
                    {guide.metaTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/guides" className="inline-flex items-center gap-1 font-semibold text-blue-700">
                  View all guides
                  <ArrowUpRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-950">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                ["Contact", "/contact"],
                ["Press", "/press"],
                ["Privacy policy", "/privacy-policy"],
                ["Terms of service", "/terms-and-conditions"],
                ["Account deletion", "/account-deletion"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-600 hover:text-blue-700">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-950">
              Trust note
            </h3>
            <p className="text-sm leading-7 text-slate-600">
              NeuVault is designed around local-first storage. Your documents
              live on your device by default, and encrypted backups stay under
              your control.
            </p>
            <p className="mt-4 text-xs leading-6 text-slate-500">
              AI processing may temporarily handle content when you use
              intelligent workflows, but documents are not kept after
              processing.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            Copyright {new Date().getFullYear()}{" "}
            <Link href="/" className="text-slate-900 hover:underline">
              NeuVault
            </Link>
            . All rights reserved.
          </p>
          <p>Private by default. Built for documents life asks for later.</p>
        </div>
      </div>
    </footer>
  );
}
