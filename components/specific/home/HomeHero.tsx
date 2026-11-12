"use client";

import { Laptop, LockKeyhole, Play, ServerOff, WifiOff, type LucideIcon } from "lucide-react";
import styles from "./HomeHero.module.css";
import { useStoreUrl } from "./useStoreUrl";

const trust: { label: string; icon: LucideIcon }[] = [
  { label: "Notes, files and saved links stay on your device", icon: ServerOff },
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
            Your notes, files and links.{" "}
            <span className={styles.accent}>Organized by AI. Kept on your device.</span>
          </h1>

          <p className={styles.lede}>
            Bring notes, files, recordings, webpages, bookmarks and YouTube videos together.
            Organize with AI, connect related items, set reminders and turn action items into plans—with the source material attached.
          </p>

          <p className={styles.privacyNote}><strong>NeuVault doesn’t keep your files on its servers.</strong></p>
          <p className={styles.syncNote}>AI features use temporary online processing. Planner and reminder data sync through your account when online.</p>

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
