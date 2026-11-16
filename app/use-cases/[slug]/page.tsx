import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getWorkflow, workflows } from "@/lib/workflows";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import SourceToAction from "@/components/specific/home/SourceToAction";
import DownloadLink from "@/components/specific/compare/DownloadLink";
import landing from "@/components/specific/home/LandingPage.module.css";
import styles from "../UseCases.module.css";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return workflows.map((workflow) => ({ slug: workflow.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const workflow = getWorkflow((await params).slug);
  if (!workflow) notFound();
  return buildMetadata({ title: `${workflow.label} with NeuVault — ${workflow.audience}`, description: workflow.description, path: `/use-cases/${workflow.id}` });
}

export default async function UseCasePage({ params }: Props) {
  const workflow = getWorkflow((await params).slug);
  if (!workflow) notFound();
  return (
    <main className={`${landing.page} ${styles.page}`}>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Use cases", path: "/use-cases" }, { name: workflow.label, path: `/use-cases/${workflow.id}` }])} />
      <div className={styles.wrap}>
        <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight size={14} aria-hidden="true" /><Link href="/use-cases">Use cases</Link><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">{workflow.label}</span></nav>
        <header className={styles.hero}><p className={styles.eyebrow}>{workflow.audience}</p><h1>{workflow.label}, with the context connected.</h1><p>{workflow.description}</p></header>
        <div className={styles.context}>
          <section><h2>Try it with your own material</h2><ul>{workflow.materials.map((material) => <li key={material}>{material}</li>)}</ul></section>
          <section><h2>A practical next step</h2><p>{workflow.steps[3].artifact}</p><p>This example uses your personal workspace. You choose what to save, connect and schedule.</p>{workflow.id === "run-a-business" && <Link href="/business">Explore NeuVault Business deployment options</Link>}</section>
        </div>
      </div>
      <SourceToAction workflow={workflow} />
      <div className={styles.wrap}>
        <details className={styles.transcript}><summary>Read the full {workflow.label.toLowerCase()} workflow</summary><ol>{workflow.steps.map((step) => <li key={step.stage}><h2>{step.stage}: {step.title}</h2><p>{step.copy}</p></li>)}</ol></details>
        <section className={styles.cta}><h2>Start with one useful item.</h2><p>Import a note or document, organize it with AI, and review any dates it finds. Choose a reminder, a source-linked Planner task, or both when useful. Files and notes are stored locally; AI uses online processing, and Planner and reminder data sync through your account.</p><DownloadLink location="use_case" workflowId={workflow.id}>Download NeuVault free</DownloadLink></section>
      </div>
    </main>
  );
}
