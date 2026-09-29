"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AppLogo from "./AppLogo";
import styles from "./Navbar.module.css";

/** The only destinations the header offers, on every page. */
const siteLinks = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-and-conditions" },
  { label: "Pricing", href: "/pricing" },
  { label: "B2B", href: "/business" },
  { label: "Help", href: "/guides" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const linksRef = useRef<HTMLDivElement | null>(null);
  const [lamp, setLamp] = useState<{ left: number; width: number } | null>(null);

  /** The highlight glides to whichever link the pointer or focus is on. */
  const moveLamp = (target: HTMLElement) => {
    const group = linksRef.current;
    if (!group) return;
    const box = group.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    setLamp({ left: rect.left - box.left, width: rect.width });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const downloadHref = pathname === "/" ? "#download" : "/#download";

  // The brand banner is a capture surface, so it shows no site chrome.
  if (pathname === "/banner") return null;

  return (
    <nav className={styles.nav} data-scrolled={scrolled}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} onClick={() => setMobileOpen(false)}>
          <AppLogo size={34} />
          <span>NeuVault</span>
        </Link>

        <div className={styles.links} ref={linksRef} onMouseLeave={() => setLamp(null)} onBlur={() => setLamp(null)}>
          <span
            className={styles.lamp}
            data-on={lamp !== null}
            style={lamp ? { transform: `translateX(${lamp.left}px)`, width: lamp.width } : undefined}
            aria-hidden="true"
          />
          {siteLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={styles.link}
              onMouseEnter={(event) => moveLamp(event.currentTarget)}
              onFocus={(event) => moveLamp(event.currentTarget)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.end}>
          <a href={downloadHref} className={styles.download}>
            Download
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className={styles.menu}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className={styles.panel}>
          {siteLinks.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className={styles.panelLink}>
              {item.label}
            </Link>
          ))}
          <a href={downloadHref} onClick={() => setMobileOpen(false)} className={styles.panelDownload}>
            Download NeuVault
          </a>
        </div>
      )}
    </nav>
  );
}
