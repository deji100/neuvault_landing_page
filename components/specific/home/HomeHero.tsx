"use client";

import { Laptop, Play, ServerOff, WifiOff, type LucideIcon } from "lucide-react";
import styles from "./HomeHero.module.css";
import { useStoreUrl } from "./useStoreUrl";

const trust: { label: string; icon: LucideIcon }[] = [
  { label: "Local-first: your vault lives on your device", icon: ServerOff },
  { label: "Works offline", icon: WifiOff },
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
          <h1>
            Your notes, files and plans.{" "}
            <span className={styles.accent}>Connected. Local-first.</span>
          </h1>

          <p className={styles.lede}>
            Keep notes, files, recordings, webpages, bookmarks and YouTube videos in one workspace.
            Let Nova organize them, connect ideas and turn action items into plans—with the source material attached.
          </p>

          <div className={styles.actions}>
            <a
              className={styles.primary}
              href={storeUrl}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              Download free
            </a>
            <a className={styles.secondary} href="#capture">
              <span className={styles.playDot} aria-hidden="true">
                <Play size={13} fill="currentColor" strokeWidth={0} />
              </span>
              Watch the demo
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
