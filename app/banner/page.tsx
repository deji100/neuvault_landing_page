import type { LucideIcon } from "lucide-react";
import {
  AtSign,
  Camera,
  FileScan,
  MessageCircle,
  Mic,
  StickyNote,
  Users,
  Youtube,
} from "lucide-react";

import AppLogo from "@/components/general/AppLogo";

import styles from "./Banner.module.css";

/**
 * Brand banner for screenshots and store art: the home hero's sources circling the
 * app icon, then the hero line. Positions are percentages of the stage, so the orbit
 * holds its shape at any width.
 */
const sources: { label: string; icon: LucideIcon; tone: string; x: number; y: number }[] = [
  { label: "Notes", icon: StickyNote, tone: "#007aff", x: 50, y: 4 },
  { label: "Meeting recording", icon: Users, tone: "#5e5ce6", x: 84, y: 16 },
  { label: "Screenshot", icon: Camera, tone: "#007aff", x: 95, y: 50 },
  { label: "Scan", icon: FileScan, tone: "#34c759", x: 84, y: 84 },
  { label: "Voice note", icon: Mic, tone: "#ff9500", x: 50, y: 96 },
  { label: "WhatsApp chat", icon: MessageCircle, tone: "#25d366", x: 16, y: 84 },
  { label: "YouTube link", icon: Youtube, tone: "#ff3b30", x: 5, y: 50 },
  { label: "Email attachment", icon: AtSign, tone: "#0a84ff", x: 16, y: 16 },
];

export default function NeuVaultBanner() {
  return (
    <main className={styles.banner}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.stage}>
        <div className={styles.rings} aria-hidden="true">
          <span />
          <span />
        </div>

        <div className={styles.icon}>
          <AppLogo size={168} />
        </div>

        <ul className={styles.orbit} aria-label="What NeuVault keeps">
          {sources.map(({ label, icon: Icon, tone, x, y }, i) => (
            <li
              key={label}
              style={{ "--tone": tone, "--x": `${x}%`, "--y": `${y}%`, "--i": i } as React.CSSProperties}
            >
              <span className={styles.chipIcon}>
                <Icon size={15} strokeWidth={2.2} aria-hidden="true" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.copy}>
        <h1>
          Five apps to keep your life in order.
          <span>NeuVault makes it one, and does the organizing.</span>
        </h1>
        <p>Your notes, screenshots, scans, recordings and links, in one private app that sorts and remembers them for you.</p>
        <p className={styles.platforms}>iPhone · Android · Mac · Windows</p>
      </div>
    </main>
  );
}
