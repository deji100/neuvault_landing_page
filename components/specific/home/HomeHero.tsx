"use client";

import { ArrowRight, Laptop, LockKeyhole, ServerOff, WifiOff, type LucideIcon } from "lucide-react";
import styles from "./HomeHero.module.css";
import { useStoreUrl } from "./useStoreUrl";

const trust: { label: string; icon: LucideIcon }[] = [
  { label: "Local storage for notes, files and saved links", icon: ServerOff },
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
          <p className={styles.eyebrow}>Your local-first workspace</p>
          <h1>
            From scattered information{" "}
            <span className={styles.accent}>to a clear next step.</span>
          </h1>

          <p className={styles.lede}>
            Save notes, files and recordings. Let AI organize them and find important dates.
            Connect your ideas, set reminders and plan what to do next.
          </p>

          <p className={styles.privacyNote}><strong>Your files and notes are stored locally on your device.</strong></p>
          <p className={styles.syncNote}>AI features send relevant content for online processing. Planner and reminder data sync through your account. <a href="#privacy-at-a-glance">How local-first works</a></p>

          <div className={styles.actions}>
            <a
              className={styles.primary}
              href={storeUrl}
              data-download-location="home_hero"
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              Download free
            </a>
            <a className={styles.secondary} href="#source-to-action">
              <span className={styles.playDot} aria-hidden="true">
                <ArrowRight size={16} />
              </span>
              Find your workflow
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
