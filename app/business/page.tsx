import type { Metadata } from "next";
import Link from "next/link";
import { Building2, CheckCircle2, CloudCog, Database, LockKeyhole, Network, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import styles from "./BusinessPage.module.css";

export const metadata: Metadata = buildMetadata({
  title: "NeuVault Business — Private Document Intelligence for Organizations",
  description: "Explore organization-controlled storage, private deployment and connected document workflows with NeuVault Business.",
  path: "/business",
});

const capabilities = [
  { title: "Email and folder ingestion", description: "Bring new documents into controlled workflows from the places where teams already receive them.", status: "Available" },
  { title: "Document intelligence", description: "Summaries, classifications, extracted information, dates and linked context make records usable.", status: "Available" },
  { title: "Linked-document workspaces", description: "Connect related documents and notes around a client, case, project or compliance requirement.", status: "Available" },
  { title: "Organization-controlled storage", description: "Deploy around organization-owned storage rather than a NeuVault-hosted document repository.", status: "In development" },
  { title: "Organization-provided services", description: "Use organization-managed credentials for supported AI, OCR and web-search workflows.", status: "In development" },
  { title: "Roles and administration", description: "Role-based access, administrative controls and shared document workflows for managed teams.", status: "Planned" },
  { title: "Audit logging", description: "Review supported activity for governance, oversight and operational accountability.", status: "Planned" },
  { title: "Compliance and Attention", description: "Track renewals, expirations, evidence and follow-ups across linked document groups.", status: "In development" },
];

export default function BusinessPage() {
  const controls = [
    [Database, "Organization-controlled storage"],
    [CloudCog, "On-premises or organization-cloud models"],
    [LockKeyhole, "Organization-managed service credentials"],
    [ShieldCheck, "Private deployment architecture"],
  ] as const;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div>
            <p className={styles.eyebrow}>NeuVault Business</p>
            <h1>Private document intelligence on infrastructure your organization controls.</h1>
            <p className={styles.heroCopy}>Bring email attachments, folder documents, notes and records into a connected workspace without requiring NeuVault to become your organization’s central document-storage provider.</p>
            <Link href="/contact" className={styles.primaryButton}>Request an organizational demo</Link>
          </div>

          <div className={styles.controlCard}>
            <span className={styles.buildingIcon}><Building2 size={23} /></span>
            <h2>A deployment model built around control</h2>
            <div className={styles.controlList}>
              {controls.map(([Icon, label]) => <div key={label} className={styles.controlItem}><Icon size={18} />{label}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.roadmap}>
        <div className={styles.wrap}>
          <div className={styles.roadmapIntro}>
            <p className={styles.sectionLabel}>Capability roadmap</p>
            <h2>Clear about what is ready—and what comes next.</h2>
            <p className={styles.roadmapCopy}>Deployment scope and feature availability are confirmed during discovery. Planned capabilities are not represented as production-ready.</p>
          </div>

          <div className={styles.capabilityGrid}>
            {capabilities.map((item) => {
              const statusClass = item.status === "Available" ? styles.available : item.status === "In development" ? styles.development : styles.planned;
              return (
                <article key={item.title} className={styles.capability}>
                  <div className={styles.capabilityTop}>
                    <CheckCircle2 size={22} />
                    <span className={`${styles.status} ${statusClass}`}>{item.status}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.contact}>
        <div className={styles.contactInner}>
          <span className={styles.contactIcon}><Network size={22} /></span>
          <h2>Discuss NeuVault for your organization.</h2>
          <p>Tell us about your document sources, deployment constraints, storage model and workflow requirements.</p>
          <Link href="/contact" className={styles.primaryButton}>Request an organizational demo</Link>
        </div>
      </section>
    </main>
  );
}
