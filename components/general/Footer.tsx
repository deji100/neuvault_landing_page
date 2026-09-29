"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import AppLogo from "./AppLogo";

/** One slim footer on every page; downloads live in the home page's #download section. */
export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname === "/banner") return null;

  return (
    <footer className="home-site-footer border-t border-[#e4e2da] bg-[#fbfaf7] px-5 py-9 font-[family-name:var(--font-instrument)] text-sm text-[#8b9096] sm:px-6">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-5">
        <Link href="/" className="flex items-center gap-2.5 font-[family-name:var(--font-bricolage)] font-bold text-[#12161b]">
          <AppLogo size={28} />
          NeuVault
        </Link>
        <span>© {year} NeuVault</span>
        <div className="ml-auto flex flex-wrap gap-5">
          <Link href="/pricing" className="hover:text-[#12161b]">Pricing</Link>
          <Link href="/guides" className="hover:text-[#12161b]">Help</Link>
          <Link href="/privacy-policy" className="hover:text-[#12161b]">Privacy</Link>
          <Link href="/terms-and-conditions" className="hover:text-[#12161b]">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
