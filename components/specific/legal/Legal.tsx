"use client";

import Link from "next/link";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import styles from "./Legal.module.css";

export type TocItem = { id: string; label: string };

/** Keeps the contents list pointed at the section being read. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const nodes = ids.map((id) => document.getElementById(id)).filter((n): n is HTMLElement => Boolean(n));
    if (nodes.length === 0 || typeof IntersectionObserver === "undefined") return;
    // Callbacks only report sections that changed, so keep the full set in view.
    const inView = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target.id);
          else inView.delete(entry.target.id);
        }
        const first = ids.find((id) => inView.has(id));
        if (first) setActive(first);
      },
      // A section counts once its top passes the upper third of the window.
      { rootMargin: "-20% 0px -65% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function LegalPage({
  title,
  lede,
  meta,
  highlights,
  toc,
  footnote,
  children,
}: {
  title: string;
  lede: ReactNode;
  meta: ReactNode;
  highlights: { icon: LucideIcon; label: string }[];
  toc: TocItem[];
  footnote: string;
  children: ReactNode;
}) {
  const active = useActiveSection(toc.map((item) => item.id));

  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.hero}>
        <Link href="/" className={styles.back}>
          <ArrowLeft size={15} aria-hidden="true" /> Back to Home
        </Link>
        <p className={styles.kicker}>NeuVault Legal</p>
        <h1>{title}</h1>
        <p className={styles.lede}>{lede}</p>
        <div className={styles.meta}>{meta}</div>
        <ul className={styles.highlights}>
          {highlights.map(({ icon: Icon, label }) => (
            <li key={label}>
              <span aria-hidden="true">
                <Icon size={17} strokeWidth={2} />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </header>

      <div className={styles.body}>
        <aside className={styles.aside}>
          <details className={styles.toc} open>
            <summary>On this page</summary>
            <nav aria-label="On this page">
              {toc.map((item, i) => (
                <a key={item.id} href={`#${item.id}`} data-active={active === item.id} aria-current={active === item.id ? "location" : undefined}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </a>
              ))}
            </nav>
          </details>
        </aside>

        <div className={styles.content}>
          {children}
          <p className={styles.footnote}>{footnote}</p>
        </div>
      </div>
    </main>
  );
}

export function MetaPill({ icon: Icon, children, href }: { icon: LucideIcon; children: ReactNode; href?: string }) {
  const inner = (
    <>
      <Icon size={14} aria-hidden="true" />
      {children}
    </>
  );
  return href ? (
    <a className={styles.pill} href={href}>
      {inner}
    </a>
  ) : (
    <span className={styles.pill}>{inner}</span>
  );
}

export function Section({ id, title, icon: Icon, children }: { id: string; title: string; icon: LucideIcon; children: ReactNode }) {
  return (
    <section id={id} className={styles.section}>
      <h2>
        <span className={styles.sectionIcon} aria-hidden="true">
          <Icon size={17} strokeWidth={2} />
        </span>
        {title}
      </h2>
      <div className={styles.prose}>{children}</div>
    </section>
  );
}

export function Bullets({ children }: { children: ReactNode }) {
  return <ul className={styles.bullets}>{children}</ul>;
}

export function Callout({ children }: { children: ReactNode }) {
  return <div className={styles.callout}>{children}</div>;
}

export function Chips({ children }: { children: ReactNode }) {
  return <div className={styles.chips}>{children}</div>;
}

export function Chip({ icon: Icon, label }: { icon: LucideIcon; label: ReactNode }) {
  return (
    <span className={styles.chip}>
      <Icon size={13} aria-hidden="true" />
      {label}
    </span>
  );
}
