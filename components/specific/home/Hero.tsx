"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  BellRing,
  FileCheck2,
  FileText,
  FolderInput,
  Mail,
  Mic2,
  Network,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import PlatformIconRow from "@/components/general/PlatformIconRow";
import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  MACOS_APP_STORE_URL,
  WINDOWS_MICROSOFT_STORE_URL,
} from "@/lib/seo";

const sources = [
  { label: "Email attachment", icon: Mail },
  { label: "Watched folder", icon: FolderInput },
  { label: "Scanned document", icon: ScanLine },
  { label: "Voice recording", icon: Mic2 },
];

const proof = [
  { label: "Automatic folder and email intake", icon: FolderInput },
  { label: "Connected document intelligence", icon: Network },
  { label: "Private, local-first storage", icon: ShieldCheck },
];

const platforms = [
  { label: "iPhone", href: IOS_APP_STORE_URL },
  { label: "Android", href: ANDROID_PLAY_STORE_URL },
  { label: "Windows", href: WINDOWS_MICROSOFT_STORE_URL },
  { label: "macOS", href: MACOS_APP_STORE_URL },
];

export default function Hero() {
  const [downloadsOpen, setDownloadsOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#07111f] px-5 pb-20 pt-32 text-white sm:px-6 md:pb-28 md:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_5%,rgba(59,130,246,.2),transparent_32rem),radial-gradient(circle_at_85%_65%,rgba(15,159,154,.12),transparent_28rem)]" />
      <div className="relative mx-auto grid w-full min-w-0 max-w-7xl gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,.98fr)] lg:items-center">
        <motion.div className="min-w-0" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
          <p className="inline-flex rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] text-blue-200">
            Private document intelligence
          </p>
          <h1 className="mt-6 max-w-4xl break-words text-4xl font-bold leading-[1.04] tracking-[-.035em] sm:text-6xl lg:text-7xl">
            Bring your document chaos into one private, intelligent workspace.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            NeuVault brings in documents from selected folders, email attachments, scans and uploads. It organizes and connects them, helps you find what matters and tracks what needs attention—across iPhone, Android, Windows and macOS.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <button onClick={() => { setDownloadsOpen((value) => !value); window.dispatchEvent(new CustomEvent("neuvault:analytics", { detail: { name: "hero_download_clicked" } })); }} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 font-semibold text-white shadow-[0_20px_45px_-20px_rgba(59,130,246,.8)] hover:bg-blue-400 sm:w-auto" aria-expanded={downloadsOpen}>
                Download NeuVault <ArrowDown size={17} />
              </button>
              <AnimatePresence>
                {downloadsOpen && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute left-0 top-full z-30 mt-2 w-full min-w-64 rounded-xl border border-white/10 bg-[#101b2b] p-2 shadow-2xl">
                    {platforms.map((platform) => <a key={platform.label} href={platform.href} target="_blank" rel="noreferrer" className="block rounded-lg px-4 py-3 text-sm text-slate-200 hover:bg-white/10">{platform.label}</a>)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="#how-it-works" onClick={() => window.dispatchEvent(new CustomEvent("neuvault:analytics", { detail: { name: "see_how_it_works_clicked" } }))} className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white hover:bg-white/10">See how it works</Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {proof.map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2 text-sm leading-5 text-slate-300"><Icon className="h-4 w-4 shrink-0 text-blue-300" />{label}</div>
            ))}
          </div>
          <PlatformIconRow className="mt-7 text-slate-400" links={platforms} />
        </motion.div>

        <motion.div className="relative min-w-0" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .12, duration: .6 }}>
          <div className="min-w-0 rounded-[2rem] border border-white/10 bg-white/[.055] p-4 shadow-[0_40px_100px_-45px_rgba(0,0,0,.9)] backdrop-blur md:p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[.15em] text-slate-400">From scattered to usable</p>
            <div className="grid min-w-0 gap-3 sm:grid-cols-2">
              {sources.map(({ label, icon: Icon }) => <div key={label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0c1726] p-3 text-sm text-slate-200"><Icon className="h-5 w-5 text-blue-300" />{label}</div>)}
            </div>
            <div className="my-4 flex items-center gap-3 text-xs uppercase tracking-[.14em] text-slate-500"><span className="h-px flex-1 bg-white/10" />NeuVault understands<span className="h-px flex-1 bg-white/10" /></div>
            <div className="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3"><div className="rounded-xl bg-blue-500 p-2.5"><FileText size={21} /></div><div><p className="font-semibold">Supplier agreement</p><p className="mt-1 text-xs text-slate-400">Organized moments ago</p></div></div>
                <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">Connected</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-[#08131f]/70 p-3"><p className="text-xs text-slate-500">Summary</p><p className="mt-1 text-sm text-slate-200">12-month supplier term with a 30-day renewal notice.</p></div>
                <div className="rounded-xl bg-[#08131f]/70 p-3"><p className="text-xs text-slate-500">Important date</p><p className="mt-1 flex items-center gap-2 text-sm text-slate-200"><BellRing size={14} className="text-amber-300" />Renewal due 14 Sep</p></div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300"><span className="rounded-full bg-white/5 px-3 py-1.5">#supplier</span><span className="rounded-full bg-white/5 px-3 py-1.5">Related: 3 files</span><span className="rounded-full bg-white/5 px-3 py-1.5">Attention</span></div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-medium text-slate-300">
              <div className="rounded-lg border border-white/10 p-2"><FileCheck2 className="mx-auto mb-1 h-4 w-4 text-teal-300" />Organized</div>
              <div className="rounded-lg border border-white/10 p-2"><Network className="mx-auto mb-1 h-4 w-4 text-teal-300" />Connected</div>
              <div className="rounded-lg border border-white/10 p-2"><BellRing className="mx-auto mb-1 h-4 w-4 text-teal-300" />Actionable</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
