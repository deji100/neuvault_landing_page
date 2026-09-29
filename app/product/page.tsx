import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BellRing, Bot, FileOutput, FolderInput, Map, Mic2, Network, Search,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import styles from "./ProductPage.module.css";

export const metadata: Metadata = buildMetadata({
  title: "NeuVault Product — The Complete Document Intelligence Workspace",
  description: "Explore NeuVault automatic intake, document intelligence, linked documents, Map, notes and voice, Nova, Attention and conversion workflows.",
  path: "/product",
});

const features = [
  { id: "automatic-intake", title: "Automatic Intake", icon: FolderInput, copy: "Monitor selected folders on Windows and macOS. Connect Gmail or Microsoft email on desktop, choose a fixed historical range or a start date, and optionally continue monitoring future attachments. Yahoo support is coming soon.", details: ["Watched desktop folders", "Historical and continued email imports", "Manual uploads and mobile scanning", "Written notes and voice recordings"] },
  { id: "document-intelligence", title: "Document Intelligence", icon: Search, copy: "Turn unstructured files into organized, searchable information. NeuVault can create summaries and tags, assign groups and subgroups, identify document types, extract structured details and surface important dates.", details: ["Summaries and tags", "Groups and subgroups", "Extracted data and dates", "Attention signals"] },
  { id: "linked-documents", title: "Linked Documents", icon: Network, copy: "Connect agreements, invoices, notes and supporting records around every context where they matter. Review relationship suggestions, including relevant attachments from the same sender.", details: ["Direct document links", "Linked-document groups", "Document-to-note connections", "Suggested relationships"] },
  { id: "map", title: "The NeuVault Map", icon: Map, copy: "Use a spatial document workspace to arrange nodes, open and read documents, edit notes, compare information side by side and ask Nova to perform supported organizational actions.", details: ["Document and note nodes", "Split-screen reading and editing", "Document and note comparison", "Nova actions and note merging"] },
  { id: "notes-voice", title: "Notes and Voice", icon: Mic2, copy: "Write notes manually or with Nova, select supporting files before creating a note, record voice live, import audio and turn meeting transcripts into structured editable text.", details: ["Document-first note creation", "Live and imported recordings", "Meeting transcription", "Rewrite, expand and organize"] },
  { id: "nova", title: "Nova", icon: Bot, copy: "Ask questions from vault context, have general conversations, research the web where supported, improve notes and perform supported Map actions. Move useful answers into continued work instead of leaving them in chat.", details: ["Vault-aware conversations", "General and web modes", "Note assistance", "Map assistance"] },
  { id: "attention", title: "Attention", icon: BellRing, copy: "Track upcoming, due-soon, overdue and completed items across individual documents and linked groups. Keep renewals, expirations and follow-ups attached to their source context.", details: ["Document reminders", "Linked-group reminders", "Upcoming and due-soon views", "Overdue and completed actions"] },
  { id: "conversion", title: "Conversion and Output", icon: FileOutput, copy: "Turn supported documents, notes, extracted information and Nova responses into formats you can continue using, including editable notes, PDF, Word and CSV where applicable.", details: ["Nova response to note", "Notes to PDF or Word", "Extracted tables to CSV", "Supported document conversion"] },
];

export default function ProductPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div>
            <p className={styles.eyebrow}>NeuVault Product</p>
            <h1>One connected system for the full document lifecycle.</h1>
            <p className={styles.heroCopy}>Bring documents in, understand what they contain, connect related context, track what needs attention and turn information into useful work.</p>
            <Link href="/#features" className={styles.primaryButton}>See the end-to-end workflow</Link>
          </div>

          <div className={styles.productFrame}>
            <div className={styles.frameChrome} aria-hidden="true"><i /><i /><i /></div>
            <Image src="/desktop-images/doc-info.png" alt="NeuVault document intelligence workspace" fill priority className={styles.productImage} sizes="(min-width: 1024px) 52vw, 92vw" />
          </div>
        </div>
      </section>

      <nav className={styles.featureNav} aria-label="Product capabilities">
        <div className={styles.featureNavInner}>
          {features.map((feature) => <a key={feature.id} href={`#${feature.id}`}>{feature.title}</a>)}
        </div>
      </nav>

      <section id="capabilities" className={styles.features}>
        <div className={styles.wrap}>
          <div className={styles.featuresIntro}>
            <p className={styles.sectionLabel}>Everything stays connected</p>
            <h2>From capture to the moment a document matters again.</h2>
          </div>

          <div className={styles.featureList}>
            {features.map(({ id, title, icon: Icon, copy, details }, index) => (
              <article id={id} key={id} className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}><Icon size={21} /></div>
                  <p className={styles.capability}>Capability {index + 1}</p>
                  <h3>{title}</h3>
                </div>
                <div>
                  <p className={styles.featureCopy}>{copy}</p>
                  <div className={styles.detailGrid}>
                    {details.map((detail) => <div key={detail} className={styles.detail}>{detail}</div>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Ready to bring your documents together?</h2>
        <p>Download NeuVault across iPhone, Android, Windows and macOS.</p>
        <Link href="/#final-cta" className={styles.primaryButton}>Choose your platform</Link>
      </section>
    </main>
  );
}
