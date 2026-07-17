import type { Metadata } from "next";
import Link from "next/link";
import { Building2, CheckCircle2, CloudCog, Database, LockKeyhole, Network, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

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
  return <main className="min-h-screen bg-[#07111f] pt-24 text-white">
    <section className="px-5 py-20 sm:px-6 md:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.9fr] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[.16em] text-blue-300">NeuVault Business</p><h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">Private document intelligence on infrastructure your organization controls.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Bring email attachments, folder documents, notes and records into a connected workspace without requiring NeuVault to become your organization’s central document-storage provider.</p><Link href="/contact" className="mt-8 inline-flex rounded-xl bg-blue-500 px-6 py-3.5 font-semibold hover:bg-blue-400">Request an organizational demo</Link></div><div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6"><Building2 className="h-8 w-8 text-blue-300"/><h2 className="mt-8 text-2xl font-semibold">A deployment model built around control</h2><div className="mt-6 space-y-3">{[[Database,"Organization-controlled storage"],[CloudCog,"On-premises or organization-cloud models"],[LockKeyhole,"Organization-managed service credentials"],[ShieldCheck,"Private deployment architecture"]].map(([Icon,label]) => {const I=Icon as typeof Database; return <div key={label as string} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 p-4 text-sm text-slate-300"><I className="h-5 w-5 text-teal-300"/>{label as string}</div>})}</div></div></div></section>
    <section className="bg-[#f6f9fc] px-5 py-20 text-slate-900 sm:px-6 md:py-28"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[.16em] text-blue-600">Capability roadmap</p><h2 className="mt-4 text-3xl font-bold md:text-5xl">Clear about what is ready—and what comes next.</h2><p className="mt-5 text-lg leading-8 text-slate-600">Deployment scope and feature availability are confirmed during discovery. Planned capabilities are not represented as production-ready.</p></div><div className="mt-12 grid gap-4 md:grid-cols-2">{capabilities.map((item) => <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex items-start justify-between gap-4"><CheckCircle2 className="h-6 w-6 text-blue-600"/><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${item.status === "Available" ? "bg-emerald-100 text-emerald-700" : item.status === "In development" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}>{item.status}</span></div><h3 className="mt-6 text-xl font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p></article>)}</div></div></section>
    <section className="px-5 py-20 sm:px-6"><div className="mx-auto max-w-5xl rounded-[1.8rem] border border-white/10 bg-white/5 p-8 text-center md:p-12"><Network className="mx-auto h-8 w-8 text-blue-300"/><h2 className="mt-6 text-3xl font-bold">Discuss NeuVault for your organization.</h2><p className="mx-auto mt-4 max-w-2xl text-slate-300">Tell us about your document sources, deployment constraints, storage model and workflow requirements.</p><Link href="/contact" className="mt-7 inline-flex rounded-xl bg-blue-500 px-6 py-3.5 font-semibold hover:bg-blue-400">Request an organizational demo</Link></div></section>
  </main>;
}
