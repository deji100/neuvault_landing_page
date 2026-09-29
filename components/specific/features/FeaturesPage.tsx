import Image from "next/image";
import Link from "next/link";

import { IOS_APP_STORE_URL } from "@/lib/seo";

import styles from "./FeaturesPage.module.css";

/**
 * The eleven ways, expanded. Titles and the first line of each body are the
 * app's own words from the desktop welcome carousel (updv-desktop
 * `introModel.ts`); the detail after them is what the feature actually does.
 */
type Way = {
  title: string;
  copy: string;
  /** Set only where a capability is not on both platforms. */
  platform?: string;
  image?: string;
  alt?: string;
};

const ways: Way[] = [
  {
    title: "Start with a thought.",
    copy: "Write a note, capture an idea, or import and edit a Markdown file you have already written. Rich text throughout — headings, checklists, tables, code blocks and images — with drafts that survive a restart.",
    image: "/desktop-images/structured-note.png",
    alt: "The NeuVault note editor",
  },
  {
    title: "Bring the rest with you.",
    copy: "Import files or scan a page — or a batch of up to 50 — to keep together. 60+ file types: PDFs, Office and OpenDocument files, images, audio, video, ebooks, CSV and more. Duplicates are caught by content before you spend anything on them.",
    image: "/desktop-images/vault.png",
    alt: "Files organized into groups in the NeuVault vault",
  },
  {
    title: "From voice to structured notes.",
    copy: "Record a thought or a whole meeting. The transcript lands in the note itself as an overview, key points and action items — with each speaker named in meeting mode, and the original recording playable behind it.",
    image: "/desktop-images/note-audio-1.png",
    alt: "A recording turned into a structured note",
  },
  {
    title: "Keep useful links close.",
    copy: "Bookmark web pages and YouTube links beside your notes and files. A saved page is fetched as readable text and becomes a real, searchable item rather than a dead URL.",
  },
  {
    title: "Give everything a connection.",
    platform: "Canvas on desktop",
    copy: "Connect related notes and files in Vault Maps. On desktop that is an infinite canvas with labelled relationships, note cards and split view; Nova can propose checklists, timelines, key dates and risks — and nothing is applied until you confirm it.",
    image: "/desktop-images/vault-map-overview.png",
    alt: "A Vault Map connecting related items",
  },
  {
    title: "Let new files come to you.",
    copy: "Connect a mailbox and approve attachments into the vault, with date-range and file-type rules. On desktop, watch folders so new files arrive on their own — including folders your cloud drive syncs. Every email attachment is scanned for dangerous content first.",
  },
  {
    title: "Find it. Ask about it.",
    copy: "Search runs on your device: instant, offline and never billed. When you want more, ask Nova — across your vault or the web with citations, in 20+ languages — and turn any answer into a PDF, Word file or spreadsheet.",
    image: "/desktop-images/nova-assistant-1.png",
    alt: "Nova answering a question about the vault",
  },
  {
    title: "Keep important dates in sight.",
    copy: "Set reminders on a single item or a whole Vault Map group, and let AI find the dates already sitting inside what you saved. Reminders sorts them into Overdue, Due today, Due soon, Upcoming and Monitor, and anything can resurface weekly, monthly or yearly.",
    image: "/desktop-images/reminder.png",
    alt: "The Reminders view sorted by how soon items are due",
  },
  {
    title: "The format you need.",
    copy: "Convert notes to PDF, Word or CSV, and supported files between formats — a Word file to PDF, a note to Markdown on desktop.",
  },
  {
    title: "Share what matters.",
    copy: "Send notes and files on, or hand over a whole Vault Map group as a package. On desktop you can wrap a share in a password-protected zip; prepared files clean themselves up after 24 hours.",
    image: "/desktop-images/vault-map-share.png",
    alt: "Sharing options in NeuVault",
  },
  {
    title: "Your backup. Your control.",
    copy: "One encrypted bundle of everything, sealed with a Recovery Key only you hold — AES-256-GCM, and no key means no backup rather than a quieter one. Restores preview what is inside and check it before writing anything back.",
    image: "/desktop-images/backup.png",
    alt: "Backup and restore in NeuVault",
  },
];

export default function FeaturesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <div className={styles.wrap}>
          <Link className={styles.back} href="/">← Back to home</Link>
          <h1>1 app. 11 ways.</h1>
          <p>
            To do more with your notes and files. Everything below is in the apps today, on iPhone,
            Android, Mac and Windows unless a note says otherwise.
          </p>
        </div>
      </header>

      <div className={styles.list}>
        {ways.map((way, index) => (
          <section key={way.title} className={styles.way}>
            <div className={`${styles.wrap} ${styles.wayInner}`}>
              <div className={styles.wayText}>
                <p className={styles.num}>{String(index + 1).padStart(2, "0")}</p>
                <h2>
                  {way.title}
                  {way.platform && <span className={styles.platform}>{way.platform}</span>}
                </h2>
                <p>{way.copy}</p>
              </div>
              {way.image && (
                <div className={styles.shot}>
                  <Image
                    src={way.image}
                    alt={way.alt ?? way.title}
                    width={2880}
                    height={1800}
                    sizes="(min-width: 900px) 560px, 92vw"
                  />
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      <section className={styles.privacy}>
        <div className={styles.wrap}>
          <h2>Your vault. Your device&rsquo;s storage.</h2>
          <p>
            NeuVault keeps your vault on your device rather than hosting it on our servers. Backups
            are encrypted and you choose where they go. AI features process the content you send
            them online — and anything you mark protected stays metadata-only, even to Nova.
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href={IOS_APP_STORE_URL} target="_blank" rel="noreferrer">Download NeuVault</a>
            <Link className={styles.ghost} href="/pricing">See pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
