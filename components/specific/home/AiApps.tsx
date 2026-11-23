import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BellRing, CalendarCheck, FilePlus2, Network, Search, type LucideIcon } from "lucide-react";
import styles from "./AiApps.module.css";

/**
 * ChatGPT and Claude on the home page. Every line is something the NeuVault connector does
 * (updv-desktop electron/mcpProtocol.cjs); the sample prompts match the app's own help.
 */
const abilities: Array<{ icon: LucideIcon; title: string; body: string; prompt: string }> = [
  { icon: Search, title: "Find and read", body: "Search your vault, read what a document says, and answer from your own files.", prompt: "What does my car insurance say about windshield damage?" },
  { icon: FilePlus2, title: "Create and save", body: "Make a PDF, Word, Excel, or PowerPoint file, or a note, and put it in your vault. Keep web pages and YouTube videos too.", prompt: "Make a budget spreadsheet for my trip and save it in NeuVault." },
  { icon: CalendarCheck, title: "Plan", body: "Tell you what’s on today, add tasks and events, reschedule them, move them across your board, or mark them done.", prompt: "What’s on my plan this week? Move the website task to In Review." },
  { icon: BellRing, title: "Remind", body: "Set a reminder for a document, a Vault Map, or anything else, and tell you what’s coming up.", prompt: "Remind me to renew my passport on March 1." },
  { icon: Network, title: "Vault Maps", body: "Build a map from your documents, add notes and checklists, connect the pieces, and tick items off.", prompt: "Make a Vault Map for my move, with a packing checklist." },
];

export default function AiApps() {
  return (
    <section id="ai-apps" className={styles.section} aria-labelledby="ai-apps-title">
      <div className={styles.wrap}>
        <div className={styles.heading}>
          <div className={styles.logos} aria-label="Works with ChatGPT and Claude">
            <span className={styles.logo}><Image src="/connectors/chatgpt.png" alt="ChatGPT" width={40} height={40} /></span>
            <span className={styles.logo}><Image src="/connectors/claude.png" alt="Claude" width={40} height={40} /></span>
          </div>
          <p className={styles.eyebrow}>Works with ChatGPT and Claude</p>
          <h2 id="ai-apps-title">Your vault. Your AI. Just ask.</h2>
          <p className={styles.intro}>
            Connect ChatGPT or Claude to create documents, find files, update checklists, manage tasks, and organize your
            Vault Maps, all through natural conversation. Type it or just say it.
          </p>
        </div>

        <ul className={styles.grid}>
          {abilities.map(({ icon: Icon, title, body, prompt }) => (
            <li key={title} className={styles.card}>
              <span className={styles.icon} aria-hidden="true"><Icon size={18} /></span>
              <h3>{title}</h3>
              <p>{body}</p>
              <p className={styles.prompt}>“{prompt}”</p>
            </li>
          ))}
        </ul>

        <div className={styles.note}>
          <p>
            <strong>Your files stay on your computer.</strong> NeuVault is local-first, so ChatGPT and Claude reach your
            vault through the NeuVault app while it’s open, from the web, their desktop apps, or their phone apps. What
            they read is shared with the AI app you use, under its own privacy terms. They can’t delete anything, and you
            choose what each one may do.
          </p>
          <Link href="/connectors" className={styles.cta}>
            How to connect <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <p className={styles.trademarks}>ChatGPT is a trademark of OpenAI. Claude is a trademark of Anthropic.</p>
      </div>
    </section>
  );
}
