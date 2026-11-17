import Link from "next/link";
import { pricingPlans } from "@/lib/pricing";
import styles from "./GettingStarted.module.css";

export default function GettingStarted() {
  const explorer = pricingPlans.find((plan) => plan.id === "explorer")!;

  return (
    <div className={styles.section}>
      <section id="privacy-at-a-glance" className={styles.privacy} aria-labelledby="privacy-title">
        <h2 id="privacy-title">Local-first, explained.</h2>
        <dl>
          <div><dt>Stored on your device</dt><dd>Your files and notes live locally. Browse saved material, edit notes and manage Planner tasks offline.</dd></div>
          <div><dt>Processed online for AI</dt><dd>Relevant content is sent for processing when you use AI organization, transcription or Nova. These features need an internet connection.</dd></div>
          <div><dt>Synced through your account</dt><dd>Planner and reminder data sync when connected. Reminder metadata is stored server-side to deliver notifications.</dd></div>
          <div><dt>Backups you control</dt><dd>No NeuVault cloud storage fees. Choose where to save encrypted backups and secure your Recovery Key. Third-party storage providers may charge their own fees.</dd></div>
        </dl>
        <Link href="/privacy-policy">Read the privacy policy</Link>
      </section>
      <section className={styles.start} aria-labelledby="first-step-title">
        <p className={styles.eyebrow}>Your first useful moment</p>
        <h2 id="first-step-title">Start with one item.</h2>
        <p>Save a note or document. Try AI organization, check any dates it finds and choose what to do next.</p>
        <p className={styles.allowance}>Explorer includes {explorer.allowance} free credits for 14 days. Storage uses no credits, and your vault remains usable when credits run out.</p>
        <Link href="/pricing">See plans and how credits work</Link>
      </section>
    </div>
  );
}
