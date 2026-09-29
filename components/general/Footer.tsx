"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Smartphone } from "lucide-react";
import { FaAndroid, FaApple, FaWindows } from "react-icons/fa";
import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  MACOS_APP_STORE_URL,
  WINDOWS_MICROSOFT_STORE_URL,
} from "@/lib/seo";
import styles from "./Footer.module.css";

const downloadLinks = [
  { label: "iPhone", href: IOS_APP_STORE_URL, icon: Smartphone },
  { label: "Android", href: ANDROID_PLAY_STORE_URL, icon: FaAndroid },
  { label: "macOS", href: MACOS_APP_STORE_URL, icon: FaApple },
  { label: "Windows", href: WINDOWS_MICROSOFT_STORE_URL, icon: FaWindows },
];

const footerLinks = [
  ["Product", "/product"],
  ["Pricing", "/pricing"],
  ["Business", "/business"],
  ["Guides", "/guides"],
  ["Contact", "/contact"],
  ["Privacy", "/privacy-policy"],
  ["Terms", "/terms-and-conditions"],
] as const;

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname === "/") {
    return (
      <footer className="home-site-footer border-t border-[#e4e2da] bg-[#fbfaf7] px-5 py-9 font-[family-name:var(--font-instrument)] text-sm text-[#8b9096] sm:px-6">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-5">
          <Link href="/" className="flex items-center gap-2.5 font-[family-name:var(--font-bricolage)] font-bold text-[#12161b]">
            <span className="home-site-logo-mark grid h-7 w-7 place-items-center rounded-[9px] bg-gradient-to-br from-[#12806e] to-[#0a5a4d] text-[10px] text-white">N</span>
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

  return (
    <footer id="site-footer" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className={styles.brandBlock}>
            <Link href="/" className={styles.brand}>
              <Image src="/logo.png" alt="NeuVault logo" width={32} height={32} className={styles.logo} />
              <span>NeuVault</span>
            </Link>
            <p>Private document intelligence across every device.</p>
          </div>

          <div className={styles.downloads} aria-label="Download NeuVault">
            {downloadLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                <Icon aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          {footerLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>

        <div className={styles.bottomRow}>
          <p>© {year} NeuVault. All rights reserved.</p>
          <p>Local-first by default. Encrypted backups stay under your control.</p>
        </div>
      </div>
    </footer>
  );
}
