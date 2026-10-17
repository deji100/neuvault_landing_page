/**
 * Animated diagrams for the home page features. Pure SVG + CSS: colors come
 * from the landing tokens (--ink, --soft, --surface, --line, --teal, --amber),
 * so they follow light and dark mode, and every animation stops under
 * prefers-reduced-motion. Each diagram is one labeled image to assistive tech.
 */
import Image from "next/image";
import { FileText, Film, Globe, HardDrive, LogIn, Mic, Search, Share, Sparkles, StickyNote, Wifi, WifiOff } from "lucide-react";
import {
  SiFacebook,
  SiGooglechrome,
  SiInstagram,
  SiPinterest,
  SiReddit,
  SiSafari,
  SiTiktok,
  SiWhatsapp,
  SiX,
  SiYoutube,
} from "react-icons/si";

import styles from "./FeatureDiagrams.module.css";

const INPUTS = [
  { label: "Document", tone: "#007aff" },
  { label: "Scan", tone: "#34c759" },
  { label: "Note", tone: "#af52de" },
  { label: "Recording", tone: "#ff2d55" },
];

/** Inputs flow into "Organize with AI", which returns details and a reminder date. */
export function CaptureFlow() {
  return (
    <figure className={`${styles.figure} ${styles.capture}`}>
      <svg
        className={`${styles.svg} ${styles.wide}`}
        viewBox="0 0 960 300"
        role="img"
        aria-label="Documents, scans, notes and recordings you organize with AI come back with a title, tags, a group and any reminder dates."
      >
        {INPUTS.map(({ label, tone }, i) => {
          const y = 42 + i * 72;
          return (
            <g key={label}>
              <path
                className={styles.flow}
                style={{ animationDelay: `${i * -0.6}s`, stroke: tone }}
                d={`M206 ${y} C 300 ${y}, 300 150, 384 150`}
              />
              <g className={styles.chip}>
                <rect x="24" y={y - 24} width="182" height="48" rx="24" />
                <circle cx="52" cy={y} r="11" style={{ fill: tone }} />
                <text x="74" y={y + 5}>{label}</text>
              </g>
            </g>
          );
        })}

        <g className={styles.core}>
          <rect className={styles.coreHalo} x="378" y="96" width="204" height="108" rx="26" />
          <rect x="384" y="102" width="192" height="96" rx="22" />
          <path className={styles.spark} d="M420 134 l5 12 12 5 -12 5 -5 12 -5 -12 -12 -5 12 -5z" />
          <text x="446" y="146" className={styles.coreTitle}>Organize</text>
          <text x="446" y="168" className={styles.coreTitle}>with AI</text>
        </g>

        <path className={styles.flow} d="M576 132 C 640 132, 640 86, 716 86" />
        <path className={`${styles.flow} ${styles.flowAmber}`} d="M576 168 C 640 168, 640 214, 716 214" />

        <g className={styles.chip}>
          <rect x="716" y="58" width="220" height="56" rx="14" />
          <text x="738" y="82" className={styles.small}>Title · tags · group</text>
          <rect className={styles.bar} x="738" y="92" width="150" height="7" rx="3.5" />
        </g>
        <g className={`${styles.chip} ${styles.chipAmber}`}>
          <rect x="716" y="186" width="220" height="56" rx="14" />
          <text x="738" y="210" className={styles.small}>Reminder</text>
          <text x="738" y="230" className={styles.amberText}>Renews 12 Mar</text>
        </g>
      </svg>

      <svg
        className={`${styles.svg} ${styles.tall}`}
        viewBox="0 0 360 520"
        role="img"
        aria-label="Documents, scans, notes and recordings you organize with AI come back with a title, tags, a group and any reminder dates."
      >
        {INPUTS.map(({ label, tone }, i) => {
          const x = 22 + (i % 2) * 166;
          const y = 20 + Math.floor(i / 2) * 64;
          return (
            <g key={label}>
              <path
                className={styles.flow}
                style={{ animationDelay: `${i * -0.6}s`, stroke: tone }}
                d={`M${x + 75} ${y + 48} C ${x + 75} 200, 180 170, 180 236`}
              />
              <g className={styles.chip}>
                <rect x={x} y={y} width="150" height="48" rx="24" />
                <circle cx={x + 26} cy={y + 24} r="10" style={{ fill: tone }} />
                <text x={x + 46} y={y + 29}>{label}</text>
              </g>
            </g>
          );
        })}
        <g className={styles.core}>
          <rect className={styles.coreHalo} x="54" y="230" width="252" height="84" rx="24" />
          <rect x="60" y="236" width="240" height="72" rx="20" />
          <path className={styles.spark} d="M92 260 l5 12 12 5 -12 5 -5 12 -5 -12 -12 -5 12 -5z" />
          <text x="118" y="279" className={styles.coreTitle}>Organize with AI</text>
        </g>
        <path className={styles.flow} d="M150 308 C 150 350, 92 350, 92 384" />
        <path className={`${styles.flow} ${styles.flowAmber}`} d="M210 308 C 210 350, 268 350, 268 384" />
        <g className={styles.chip}>
          <rect x="14" y="384" width="160" height="70" rx="14" />
          <text x="30" y="412" className={styles.small}>Title · tags</text>
          <rect className={styles.bar} x="30" y="426" width="110" height="7" rx="3.5" />
        </g>
        <g className={`${styles.chip} ${styles.chipAmber}`}>
          <rect x="186" y="384" width="160" height="70" rx="14" />
          <text x="202" y="412" className={styles.small}>Reminder</text>
          <text x="202" y="436" className={styles.amberText}>Renews 12 Mar</text>
        </g>
      </svg>

      <figcaption className={styles.caption}>Saved without AI? It waits in your Inbox, unread.</figcaption>
    </figure>
  );
}

const STEPS = [
  { label: "A month before", when: "Push" },
  { label: "Two weeks before", when: "Push" },
  { label: "On the day", when: "Push" },
  { label: "If it slips past", when: "Email" },
];

/** A reminder date traveling down its notifications. */
export function ReminderTimeline() {
  return (
    <figure className={styles.figure}>
      <svg
        className={styles.svg}
        viewBox="0 0 480 300"
        role="img"
        aria-label="NeuVault reminds you a month before, two weeks before and on the day, and emails you if the date slips past."
      >
        <g className={`${styles.chip} ${styles.chipAmber}`}>
          <rect x="16" y="16" width="232" height="60" rx="14" />
          <text x="36" y="42" className={styles.small}>Lease</text>
          <text x="36" y="62" className={styles.amberText}>Renews 12 Mar</text>
        </g>
        <line className={styles.track} x1="44" y1="92" x2="44" y2="276" />
        <line className={styles.trackFill} x1="44" y1="92" x2="44" y2="276" />
        {STEPS.map(({ label, when }, i) => {
          const y = 112 + i * 52;
          return (
            <g key={label} className={styles.step} style={{ animationDelay: `${i * 1.1}s` }}>
              <circle className={styles.stepRing} cx="44" cy={y} r="13" />
              <circle className={i === 3 ? styles.stepDotMuted : styles.stepDot} cx="44" cy={y} r="7" />
              <text x="72" y={y + 5}>{label}</text>
              <g className={styles.pill}>
                <rect x="292" y={y - 14} width="78" height="28" rx="14" />
                <text x="331" y={y + 5} textAnchor="middle" className={styles.small}>{when}</text>
              </g>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

const PLACES = ["Google Drive", "iCloud", "OneDrive", "Dropbox", "USB drive"];

/** Encrypted on the device, saved where you choose, with no NeuVault server in the path. */
export function BackupFlow() {
  return (
    <figure className={styles.figure}>
      <svg
        className={styles.svg}
        viewBox="0 0 480 300"
        role="img"
        aria-label="Your backup is encrypted on your device with your Recovery Key and saved where you choose. NeuVault's servers are not involved."
      >
        <g className={styles.chip}>
          <rect x="16" y="92" width="150" height="112" rx="18" />
          <rect className={styles.screen} x="44" y="112" width="94" height="58" rx="6" />
          <text x="91" y="190" textAnchor="middle" className={styles.small}>Your device</text>
        </g>
        <g className={styles.key}>
          <circle cx="146" cy="100" r="16" />
          <path d="M140 100a5 5 0 1 0 10 0a5 5 0 1 0-10 0m10 0h9m-3 0v5" />
        </g>

        <path className={styles.flow} d="M166 148 C 214 148, 214 148, 246 148" />
        <g className={styles.lock}>
          <rect x="246" y="124" width="48" height="48" rx="14" />
          <path d="M260 146v-6a10 10 0 0 1 20 0v6M258 146h24v14h-24z" />
        </g>
        {PLACES.map((place, i) => {
          const y = 40 + i * 54;
          return (
            <g key={place}>
              <path
                className={styles.flow}
                style={{ animationDelay: `${i * -0.45}s` }}
                d={`M294 148 C 330 148, 320 ${y}, 352 ${y}`}
              />
              <g className={styles.chip}>
                <rect x="352" y={y - 18} width="116" height="36" rx="18" />
                <text x="410" y={y + 5} textAnchor="middle" className={styles.small}>{place}</text>
              </g>
            </g>
          );
        })}

        <g className={styles.offline}>
          <rect x="16" y="236" width="262" height="44" rx="12" />
          <path d="M34 250h22v16h-22zM34 258h22M70 249l-10 18" />
          <text x="84" y="263" className={styles.small}>Our servers: not involved</text>
        </g>
      </svg>
    </figure>
  );
}

const SOURCES = [
  { label: "Instagram", Icon: SiInstagram, tone: "#e1306c" },
  { label: "TikTok", Icon: SiTiktok, tone: "var(--ink)" },
  { label: "X", Icon: SiX, tone: "var(--ink)" },
  { label: "Facebook", Icon: SiFacebook, tone: "#1877f2" },
  { label: "YouTube", Icon: SiYoutube, tone: "#ff0000" },
  { label: "Pinterest", Icon: SiPinterest, tone: "#e60023" },
  { label: "Reddit", Icon: SiReddit, tone: "#ff4500" },
  { label: "WhatsApp", Icon: SiWhatsapp, tone: "#25d366" },
  { label: "Chrome", Icon: SiGooglechrome, tone: "#4285f4" },
  { label: "Safari", Icon: SiSafari, tone: "#0a84ff" },
];

/** Any app's Share button, or the browser extension, hands the page to NeuVault. */
export function SendFromAnywhere() {
  return (
    <figure
      className={styles.send}
      role="img"
      aria-label="Share from Instagram, TikTok, X, Facebook, YouTube, Pinterest, Reddit, WhatsApp or any browser straight into NeuVault, then save it to your Inbox or organize it with AI."
    >
      <ul className={styles.sendSources} aria-hidden="true">
        {SOURCES.map(({ label, Icon, tone }, i) => (
          <li key={label} style={{ "--tone": tone, animationDelay: `${i * 0.18}s` } as React.CSSProperties}>
            <Icon size={20} />
          </li>
        ))}
      </ul>
      <span className={styles.sendLine} aria-hidden="true" />
      <span className={styles.sendShare} aria-hidden="true">
        <Share size={16} strokeWidth={2.4} /> Share
      </span>
      <span className={styles.sendLine} aria-hidden="true" />
      <span className={styles.sendApp} aria-hidden="true">
        <Image src="/logo.png" alt="" width={40} height={40} />
        <span className={styles.sendOut}>
          <span>Inbox</span>
          <span className={styles.sendAi}>
            <Sparkles size={12} strokeWidth={2.4} /> Organize
          </span>
        </span>
      </span>
    </figure>
  );
}

// One map's canvas, drawn at the same coordinates on both computers.
// An engineering project with every kind of item a map holds, drawn at the same
// coordinates on both computers. The dashed group holds the design documents.
const MAP_NODES = [
  { x: 6, y: 10, w: 94, tone: "#ff3b30", label: "Spec.pdf" },
  { x: 6, y: 54, w: 94, tone: "#007aff", label: "Report.docx" },
  { x: 6, y: 98, w: 94, tone: "#ff9500", label: "Review.pptx" },
  { x: 110, y: 0, w: 94, tone: "#34c759", label: "Site scan" },
  { x: 110, y: 44, w: 94, tone: "#5856d6", label: "Site video" },
  { x: 110, y: 88, w: 94, tone: "#ff0000", label: "YouTube" },
  { x: 110, y: 132, w: 94, tone: "#ff2d55", label: "Standup" },
  { x: 214, y: 54, w: 94, tone: "#af52de", label: "Notes" },
];
const MAP_LINKS: [number, number][] = [[0, 7], [1, 3], [2, 6], [3, 4], [5, 7], [6, 7], [4, 7]];

function MiniMap({ x, y, title }: { x: number; y: number; title: string }) {
  const mid = (i: number) => ({ cx: MAP_NODES[i].x + MAP_NODES[i].w / 2, cy: MAP_NODES[i].y + 15 });
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={styles.chip}>
        <rect x="0" y="0" width="330" height="214" rx="16" />
      </g>
      <circle cx="18" cy="16" r="4" fill="#ff5f57" />
      <circle cx="31" cy="16" r="4" fill="#febc2e" />
      <circle cx="44" cy="16" r="4" fill="#28c840" />
      <text x="165" y="21" textAnchor="middle" className={styles.small}>{title}</text>
      <g transform="translate(10 36)">
        <rect className={styles.mapGroup} x="0" y="2" width="106" height="134" rx="12" />
        {MAP_LINKS.map(([a, b]) => (
          <line key={`${a}-${b}`} className={styles.mapLink} x1={mid(a).cx} y1={mid(a).cy} x2={mid(b).cx} y2={mid(b).cy} />
        ))}
        {MAP_NODES.map((n, i) => (
          <g key={n.label} className={styles.mapNode} style={{ animationDelay: `${i * 0.7}s` }}>
            <rect x={n.x} y={n.y} width={n.w} height="30" rx="8" style={{ stroke: n.tone }} />
            <circle cx={n.x + 12} cy={n.y + 15} r="4" style={{ fill: n.tone }} />
            <text x={n.x + 21} y={n.y + 20} className={styles.mapLabel}>{n.label}</text>
          </g>
        ))}
      </g>
    </g>
  );
}

/** A map file, drawn as a document with a folded corner, so it never reads as a button. */
function MapFile({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path className={styles.fileBody} d="M0 4a4 4 0 0 1 4-4h24l12 12v36a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4z" />
      <path className={styles.fileFold} d="M28 0v8a4 4 0 0 0 4 4h8" />
      <circle className={styles.fileDot} cx="11" cy="24" r="3.2" />
      <circle className={styles.fileDot} cx="27" cy="30" r="3.2" />
      <circle className={styles.fileDot} cx="13" cy="40" r="3.2" />
      <path className={styles.fileLink} d="M11 24L27 30L13 40" />
    </g>
  );
}

/** A map exported on one computer and imported on another keeps the same canvas. */
export function VaultMapShare() {
  return (
    <figure className={`${styles.figure} ${styles.capture}`}>
      <svg
        className={`${styles.svg} ${styles.wide}`}
        viewBox="0 0 960 250"
        role="img"
        aria-label="Export an engineering project's Vault Map as a file on your Mac and a teammate imports it on Windows, with the same PDFs, Word and PowerPoint files, scans, videos, YouTube links, recordings, notes, groups, links and layout."
      >
        <MiniMap x={16} y={16} title="You · Mac" />
        <line className={styles.track} x1="362" y1="123" x2="598" y2="123" />
        <text x="366" y="108" className={styles.flowLabel}>Export</text>
        <text x="594" y="108" textAnchor="end" className={styles.flowLabel}>Import</text>
        <g className={styles.packet}>
          <MapFile x={406} y={97} />
          <text x="426" y="172" textAnchor="middle" className={styles.fileName}>Bridge project.nvmap</text>
        </g>
        <MiniMap x={614} y={16} title="Teammate · Windows" />
      </svg>
      <svg
        className={`${styles.svg} ${styles.tall}`}
        viewBox="0 0 360 560"
        role="img"
        aria-label="Export an engineering project's Vault Map as a file on your Mac and a teammate imports it on Windows, with the same PDFs, Word and PowerPoint files, scans, videos, YouTube links, recordings, notes, groups, links and layout."
      >
        <MiniMap x={15} y={8} title="You · Mac" />
        <line className={styles.track} x1="180" y1="230" x2="180" y2="330" />
        <text x="164" y="250" textAnchor="end" className={styles.flowLabel}>Export</text>
        <text x="164" y="312" textAnchor="end" className={styles.flowLabel}>Import</text>
        <g className={styles.packetDown}>
          <MapFile x={160} y={246} />
          <text x="210" y="276" className={styles.fileName}>Bridge project.nvmap</text>
        </g>
        <MiniMap x={15} y={338} title="Teammate · Windows" />
      </svg>
      <figcaption className={styles.caption}>Same layout, groups and links. Share it only with people you trust.</figcaption>
    </figure>
  );
}

const OFFLINE = [
  { label: "Notes", Icon: StickyNote },
  { label: "Files and scans", Icon: FileText },
  { label: "Recordings", Icon: Mic },
  { label: "Imported videos", Icon: Film },
  { label: "Search", Icon: Search },
  { label: "Backup", Icon: HardDrive },
];
const ONLINE = [
  { label: "NeuVault AI: organize, transcribe, Nova", Icon: Sparkles },
  { label: "YouTube videos and web pages", Icon: Globe },
  { label: "Signing in", Icon: LogIn },
];

/** What opens without internet, and what needs a connection. */
export function OfflineSplit() {
  return (
    <div className={styles.offline2}>
      <section className={styles.offCard} aria-labelledby="offline-yes">
        <h4 className={styles.offHead} id="offline-yes">
          <span className={styles.offBadge}>
            <WifiOff size={14} strokeWidth={2.4} aria-hidden="true" />
            <span className={styles.offPulse} aria-hidden="true" />
          </span>
          Without internet
        </h4>
        <ul>
          {OFFLINE.map(({ label, Icon }) => (
            <li key={label}>
              <Icon size={15} aria-hidden="true" /> {label}
            </li>
          ))}
        </ul>
      </section>
      <section className={`${styles.offCard} ${styles.onCard}`} aria-labelledby="offline-no">
        <h4 className={styles.offHead} id="offline-no">
          <span className={`${styles.offBadge} ${styles.onBadge}`}>
            <Wifi size={14} strokeWidth={2.4} aria-hidden="true" />
          </span>
          Needs internet
        </h4>
        <ul>
          {ONLINE.map(({ label, Icon }) => (
            <li key={label}>
              <Icon size={15} aria-hidden="true" /> {label}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
