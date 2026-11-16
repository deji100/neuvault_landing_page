import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { workflows } from "@/lib/workflows";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import landing from "@/components/specific/home/LandingPage.module.css";
import styles from "./UseCases.module.css";

export const metadata: Metadata = buildMetadata({
  title: "NeuVault Use Cases: Study, Research, Work & Everyday Planning",
  description: "Explore eight ways to connect notes, files and saved material with actionable plans in NeuVault, from study and research to creative projects and personal life.",
  path: "/use-cases",
});

export default function UseCasesPage() {
  return (
    <main className={`${landing.page} ${styles.page}`}>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Use cases", path: "/use-cases" }])} />
      <div className={styles.wrap}>
        <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">Use cases</span></nav>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Many goals. One connected workspace.</p>
          <h1>What do you want to accomplish?</h1>
          <p>Start with a goal, then explore how capture, AI organization, Vault Map and Planner work together. These examples are starting points—you can adapt them to the way you study, work and live.</p>
        </header>
        <ul className={styles.grid}>
          {workflows.map((workflow) => <li key={workflow.id}><Link href={`/use-cases/${workflow.id}`} className={styles.card}>
            <p className={styles.eyebrow}>{workflow.audience}</p><h2>{workflow.label}</h2><p>{workflow.description}</p><span>Explore the workflow <ArrowRight size={16} aria-hidden="true" /></span>
          </Link></li>)}
        </ul>
      </div>
    </main>
  );
}
