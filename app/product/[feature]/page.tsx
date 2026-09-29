import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import styles from "./FeaturePage.module.css";

type Props = { params: Promise<{ feature: string }> };

const pages = {
  "automatic-intake": {
    title: "Automatic Document Intake",
    description: "Watched folders and supported email imports with historical ranges and continued monitoring.",
    intro: "Bring documents into NeuVault from the places where they already arrive—without repeatedly downloading, renaming and filing every attachment.",
    sections: [["Watched folders", "Choose folders on Windows or macOS. NeuVault monitors them for new supported files."], ["Email providers", "Connect Gmail or Microsoft on desktop. Yahoo support is coming soon. Access is user-authorized and can be disconnected."], ["Historical ranges", "Choose fixed start and end dates, or a starting date through the present."], ["Continued monitoring", "After the initial import, choose whether NeuVault should monitor newly received attachments."], ["Manual and created intake", "Uploads, mobile scanning, written notes, live voice and imported recordings work alongside automatic intake."], ["Duplicate handling", "Supported source workflows apply import controls before documents enter the vault."]],
  },
  map: {
    title: "The NeuVault Map",
    description: "A spatial document workspace for connected nodes, notes, comparison and Nova actions.",
    intro: "The Map is a working environment for investigation, research, planning and comparison—not a decorative document graph.",
    sections: [["Document and note nodes", "Arrange connected documents and editable notes spatially."], ["Open and read", "Read documents while keeping surrounding records available."], ["Split-screen work", "Read a document beside a note, compare two documents or compare two notes."], ["Create and merge notes", "Create notes directly, draft with Nova and merge selected notes."], ["Nova actions", "Use supported organizational and note-related actions in context."]],
  },
  nova: {
    title: "Nova",
    description: "Vault-aware, general and web conversations, note assistance, Map actions and export.",
    intro: "Nova helps users ask, research, write and act without positioning NeuVault as a chatbot-first product.",
    sections: [["Vault-aware mode", "Ask using summaries, tags, extracted data, dates and linked-record context."], ["General and web modes", "Have ordinary conversations and use current web research where supported."], ["Note assistance", "Draft, rewrite, expand, summarize and organize editable notes."], ["Map assistance", "Perform supported note and organization actions in the spatial workspace."], ["Useful output", "Move a response into a note or export PDF, Word or CSV where supported."]],
  },
} as const;

export function generateStaticParams() { return Object.keys(pages).map((feature) => ({ feature })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { feature } = await params;
  const page = pages[feature as keyof typeof pages];
  return page ? buildMetadata({ title: `NeuVault ${page.title}`, description: page.description, path: `/product/${feature}` }) : {};
}

export default async function FeaturePage({ params }: Props) {
  const { feature } = await params;
  const page = pages[feature as keyof typeof pages];
  if (!page) notFound();
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <Link href="/product" className={styles.backLink}>← All product capabilities</Link>
          <div>
            <p className={styles.eyebrow}>NeuVault Product</p>
            <h1>{page.title}</h1>
            <p className={styles.intro}>{page.intro}</p>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionLabel}>What it includes</p>
            <h2>Designed to keep the work clear, connected and under your control.</h2>
          </div>

          <div className={styles.grid}>
            {page.sections.map(([title, copy], index) => (
              <article key={title} className={styles.card}>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>

          <div className={styles.downloadPanel}>
            <div>
              <h2>Bring it into your private workspace.</h2>
              <p>Available across iPhone, Android, Windows and macOS.</p>
            </div>
            <Link href="/#final-cta" className={styles.primaryButton}>Download NeuVault</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
