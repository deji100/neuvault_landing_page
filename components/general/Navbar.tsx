"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AppLogo from "./AppLogo";
import styles from "./Navbar.module.css";

/** The only destinations the header offers, on every page. */
const siteLinks = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-and-conditions" },
  { label: "Pricing", href: "/pricing" },
  { label: "B2B", href: "/business" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isProductRoute = pathname.startsWith("/product");
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

  const openDownloads = () => {
    setMobileOpen(false);
    if (window.innerWidth < 640) {
      const finalCta = document.getElementById("final-cta");
      if (finalCta) {
        finalCta.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.dispatchEvent(new Event("neuvault:open-downloads"));
  };

  // Pages that share the home page's glossy capsule navbar.
  const capsule = ["/", "/privacy-policy", "/terms-and-conditions", "/contact"].includes(pathname);
  const downloadHref = pathname === "/" ? "#download" : "/#download";

  if (capsule) {
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

  const desktopLinks = isProductRoute
    ? [
        { label: "Overview", href: "/product" },
        { label: "Capabilities", href: "/product#capabilities" },
        { label: "Pricing", href: "/pricing" },
        { label: "B2B", href: "/business" },
        { label: "Contact", href: "/contact" },
      ]
    : siteLinks;

  return (
    <motion.nav
      className="site-nav fixed inset-x-0 top-0 z-[1000] border-b backdrop-blur-xl"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mx-auto grid h-[74px] max-w-[1360px] grid-cols-[1fr_auto] items-center gap-4 px-5 sm:px-8 md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          className="site-nav-brand flex w-fit items-center gap-2.5"
          onClick={() => setMobileOpen(false)}
        >
          <AppLogo size={32} />
          <span className="font-[family-name:var(--font-bricolage)] text-[1.15rem] font-bold tracking-[-.01em]">NeuVault</span>
          {isProductRoute ? <span className="site-nav-product-label">Product</span> : null}
        </Link>

        <div className="site-nav-links hidden items-center justify-center gap-5 md:flex">
          {desktopLinks.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-medium">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center justify-self-end gap-2 md:flex">
          <button
            type="button"
            onClick={openDownloads}
            className="site-nav-download rounded-full px-[18px] py-[9px] text-sm font-semibold text-white"
          >
            Download
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="site-nav-menu inline-flex h-10 w-10 items-center justify-center rounded-full border"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="site-mobile-panel border-t px-4 py-5 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {desktopLinks.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium">
                {item.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={openDownloads}
              className="site-nav-download rounded-xl px-4 py-3 text-sm font-semibold text-white"
            >
              Download
            </button>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
