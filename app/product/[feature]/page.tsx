import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";

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
  return <main className="min-h-screen bg-white pt-24 text-slate-900"><section className="bg-[#07111f] px-5 py-20 text-white sm:px-6 md:py-28"><div className="mx-auto max-w-5xl"><Link href="/product" className="text-sm text-blue-300">← All product capabilities</Link><p className="mt-10 text-sm font-semibold uppercase tracking-[.16em] text-blue-300">NeuVault Product</p><h1 className="mt-5 text-4xl font-bold sm:text-6xl">{page.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{page.intro}</p></div></section><section className="px-5 py-16 sm:px-6 md:py-20"><div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">{page.sections.map(([title,copy]) => <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6"><h2 className="text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{copy}</p></article>)}</div><div className="mx-auto mt-10 max-w-5xl"><Link href="/#final-cta" className="inline-flex rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white">Download NeuVault</Link></div></section></main>;
}
