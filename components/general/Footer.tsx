"use client";

import Image from "next/image";
import Link from "next/link";
import { guidePages } from "@/lib/guides";
import { ANDROID_PLAY_STORE_URL, IOS_APP_STORE_URL, solutionPages } from "@/lib/seo";

const scrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;

  const navOffset = 92;
  const top = element.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({ top, behavior: "smooth" });
};

export default function Footer() {
  const featuredGuides = guidePages.slice(0, 3);

  return (
    <footer id="site-footer" className="relative border-t border-white/10 bg-[#06101c] px-6 py-16 text-gray-400">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.7fr_0.95fr_0.95fr_0.8fr_1fr]">
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo2.png"
                alt="NeuVault logo"
                width={60}
                height={60}
                className="w-11 rounded-xl"
              />
              <div>
                <p className="text-lg font-semibold text-white">NeuVault</p>
                <p className="text-sm text-white/55">Private mobile vault for life&apos;s important documents</p>
              </div>
            </Link>

            <p className="max-w-md text-sm leading-7 text-white/70">
              Stop forgetting where your important documents are. NeuVault helps you keep files, notes, scans, and voice in one place you control.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
              Explore
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <button type="button" onClick={() => scrollToId("features")} className="hover:text-white">
                  Why NeuVault
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToId("how-it-works")} className="hover:text-white">
                  How it works
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToId("see-it-in-action")} className="hover:text-white">
                  Watch the 10 demos
                </button>
              </li>
              <li>
                <Link href="/guides" className="hover:text-white">
                  Guides
                </Link>
              </li>
              <li>
                <a href={IOS_APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  App Store
                </a>
              </li>
              <li>
                <a
                  href={ANDROID_PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Google Play
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
              Workflows
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              {solutionPages.map((page) => (
                <li key={page.slug}>
                  <Link href={`/${page.slug}`} className="hover:text-white">
                    {page.metaTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
              Guides
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              {featuredGuides.map((guide) => (
                <li key={guide.slug}>
                  <Link href={`/guides/${guide.slug}`} className="hover:text-white">
                    {guide.metaTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/guides" className="text-[#8ec0ff] hover:text-white">
                  View all guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
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

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
              Trust note
            </h3>
            <p className="text-sm leading-7 text-white/70">
              NeuVault is designed so your vault lives on your device by default. Your documents are not stored permanently on our servers.
            </p>
            <div className="hidden rounded-2xl border border-white/10 bg-white p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] md:block">
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

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            (c) {new Date().getFullYear()} <Link href="/" className="text-white hover:underline">NeuVault</Link>. All rights reserved.
          </p>
          <p>Private by default. Easier to trust when life gets noisy.</p>
        </div>
      </div>
    </footer>
  );
}