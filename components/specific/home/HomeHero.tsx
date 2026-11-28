"use client";

import { ArrowRight, Laptop, LockKeyhole, ServerOff, WifiOff, type LucideIcon } from "lucide-react";
import styles from "./HomeHero.module.css";
import { useStoreUrl } from "./useStoreUrl";

const trust: { label: string; icon: LucideIcon }[] = [
  { label: "Local-first storage", icon: ServerOff },
  { label: "Works offline", icon: WifiOff },
  { label: "Encrypted backups you control", icon: LockKeyhole },
  { label: "Mac, Windows, iPhone & Android", icon: Laptop },
];

export default function HomeHero() {
  const storeUrl = useStoreUrl();
  const external = storeUrl.startsWith("http");

  return (
    <header className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.eyebrow}>Your local-first personal workspace</p>
          <h1>
            From scattered information{" "}
            <span className={styles.accent}>to a clear next step.</span>
          </h1>

          <p className={styles.lede}>
            Your smarter Finder for macOS and File Explorer for Windows — one that organizes itself.
          </p>
          <p className={styles.lede}>
            An intelligent, local-first personal information workspace that makes your files actionable without taking
            ownership or control away from you.
          </p>

          <p className={styles.privacyNote}><strong>Your files stay yours. Your originals stay untouched.</strong></p>

          <div className={styles.actions}>
            <a
              className={styles.primary}
              href={storeUrl}
              data-download-location="home_hero"
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              Download free
            </a>
            <a className={styles.secondary} href="#capture">
              <span className={styles.playDot} aria-hidden="true">
                <ArrowRight size={16} />
              </span>
              See it in action
            </a>
          </div>

          <ul className={styles.trust}>
            {trust.map(({ label, icon: Icon }) => (
              <li key={label}>
                <Icon size={15} strokeWidth={2} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </header>
  );
}
