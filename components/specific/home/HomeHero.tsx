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

const ASSISTANTS = [
  { name: "ChatGPT", tone: "blue" },
  { name: "Claude", tone: "purple" },
  { name: "Nova AI", tone: "green" },
] as const;

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
            Your smarter Finder for macOS and File Explorer for Windows, one that organizes itself. Save your files,
            notes, recordings, links, YouTube videos and social media posts, and NeuVault&apos;s AI puts each one in the
            right place. Link related items, or let ChatGPT and Claude do it, so everything about an event, a project or anything
            else comes together on a Vault Map. Connect ChatGPT and Claude and just ask, by voice or text:
            they search your vault, answer from your documents, create files and notes and save them, plan your week,
            set reminders and build Vault Maps. Let your AI assistants do more than answer questions; let them help get
            things done.
          </p>

          <p className={styles.privacyNote}><strong>Your files stay on your devices. No NeuVault cloud storage fees. Your backups, your choice.</strong></p>
          {/* Plain-text names only, in NeuVault's own tints: no logos (SHOW_AI_APP_LOGOS is off), no partner styling. */}
          <ul className={styles.assistants} aria-label="Works with">
            {ASSISTANTS.map(({ name, tone }) => <li key={name} data-tone={tone}>{name}</li>)}
          </ul>
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
