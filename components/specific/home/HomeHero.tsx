"use client";

import Image from "next/image";
import {
  AtSign,
  Bookmark,
  Camera,
  FileScan,
  Laptop,
  MessageCircle,
  Mic,
  Play,
  ServerOff,
  StickyNote,
  Users,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { visibleYouTubeVideos } from "@/lib/youtube-videos";

import styles from "./HomeHero.module.css";
import { useStoreUrl } from "./useStoreUrl";

/** The things people save "for later", placed around the phone. Notes lead: they are the core of the app. */
const sources: { label: string; icon: LucideIcon; tone: string }[] = [
  { label: "Notes", icon: StickyNote, tone: "#007aff" },
  { label: "Meeting recording", icon: Users, tone: "#5e5ce6" },
  { label: "Screenshot", icon: Camera, tone: "#007aff" },
  { label: "Scan", icon: FileScan, tone: "#34c759" },
  { label: "Voice note", icon: Mic, tone: "#ff9500" },
  { label: "Import from WhatsApp chat", icon: MessageCircle, tone: "#25d366" },
  { label: "YouTube link", icon: Youtube, tone: "#ff3b30" },
  { label: "Import email attachments", icon: AtSign, tone: "#0a84ff" },
  { label: "Bookmark", icon: Bookmark, tone: "#af52de" },
];

/** Phone widths: Notes leads on its own, the rest drift past in two lanes (widths balanced by label length). */
const lanes = [
  ["Meeting recording", "Import from WhatsApp chat", "Scan", "Bookmark"],
  ["Screenshot", "Import email attachments", "Voice note", "YouTube link"],
].map((labels) => labels.map((label) => sources.find((source) => source.label === label)!));

function SourceChip({ label, icon: Icon, tone, i }: (typeof sources)[number] & { i: number }) {
  return (
    <li style={{ "--tone": tone, "--i": i } as React.CSSProperties}>
      <span className={styles.sourceIcon}>
        <Icon size={14} strokeWidth={2.2} />
      </span>
      {label}
    </li>
  );
}

/** The "later" arriving: what a resurfaced item looks like when it comes back. */
const reminders = [
  { title: "Lease renewal is due in 14 days", from: "From a scan you saved in March" },
  { title: "Follow up on Tuesday's meeting", from: "From a meeting recording" },
  { title: "Laptop warranty ends next week", from: "From an email attachment" },
];

const trust: { label: string; icon: LucideIcon }[] = [
  { label: "Nothing stored on our servers", icon: ServerOff },
  { label: "Mac, Windows, iPhone & Android", icon: Laptop },
];

function useCycle(count: number, interval: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") setIndex((i) => (i + 1) % count);
    }, interval);
    return () => window.clearInterval(timer);
  }, [count, interval]);

  return index;
}

export default function HomeHero() {
  const storeUrl = useStoreUrl();
  const reminderIndex = useCycle(reminders.length, 4200);
  const reminder = reminders[reminderIndex];
  // Until the tour video is published, the button goes to the screenshot tour.
  const tourHref = visibleYouTubeVideos.length > 0 ? "#videos" : "#tour";
  const external = storeUrl.startsWith("http");

  return (
    <header className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.text}>
          <h1>
            Five apps to keep your life in order.{" "}
            <span className={styles.accent}>NeuVault makes it one.</span>
          </h1>

          <p className={styles.lede}>
            Your notes, screenshots, scans, recordings and links, in one private app that sorts and remembers them
            for you.
          </p>

          <div className={styles.actions}>
            <a
              className={styles.primary}
              href={storeUrl}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              Download free
            </a>
            <a className={styles.secondary} href={tourHref}>
              <span className={styles.playDot} aria-hidden="true">
                <Play size={13} fill="currentColor" strokeWidth={0} />
              </span>
              Watch the 3-minute tour
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

        <div className={styles.visual} aria-hidden="true">
          <ul className={styles.sources}>
            {sources.map((source, i) => (
              <SourceChip key={source.label} {...source} i={i} />
            ))}
          </ul>

          <div className={styles.rail}>
            <ul className={styles.railLead}>
              <SourceChip {...sources[0]} i={0} />
            </ul>
            {lanes.map((lane, row) => (
              <div key={row} className={styles.lane}>
                {/* Two copies so the loop is seamless; the track moves exactly one copy's width. */}
                <ul className={styles.track} data-reverse={row % 2 === 1}>
                  {[...lane, ...lane].map((source, i) => (
                    <SourceChip key={`${source.label}-${i}`} {...source} i={i} />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.device}>
            <div className={styles.phone}>
              <div className={styles.screen}>
                <Image
                  src="/mobile-images/attention-m.png"
                  alt=""
                  width={1320}
                  height={2868}
                  priority
                  sizes="(min-width: 960px) 290px, 230px"
                />
              </div>
            </div>

            <div className={styles.notice} key={reminderIndex}>
              <Image src="/logo.png" alt="" width={36} height={36} className={styles.noticeIcon} />
              <div>
                <p className={styles.noticeMeta}>
                  <strong>NeuVault</strong> <span>now</span>
                </p>
                <p className={styles.noticeTitle}>{reminder.title}</p>
                <p className={styles.noticeFrom}>{reminder.from}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
