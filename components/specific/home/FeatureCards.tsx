"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import DashboardImage from "@/public/dashboard.png";
import VaultImage from "@/public/vault.png";
import PreviewImage from "@/public/preview.png";
import NovaImage from "@/public/nova.png";
import SmartSuggestionsImage from "@/public/smart-suggestions.png";
import NoteImage from "@/public/note.png";
import SettingsBackupRestoreImage from "@/public/settings-backup-restore.png";

type Platform = "desktop" | "mobile";

// Custom Icons replacing Lucide for Tech-Noir aesthetic
const IconGrid = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const IconSearch = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>;
const IconLayers = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;
const IconSparkle = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2v20M17 7l-10 10M22 12H2M20 12l-1.5-1.5M4 12L5.5 13.5M12 4l1.5 1.5M12 20l-1.5-1.5"/></svg>;
const IconBell = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>;
const IconPen = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>;
const IconShield = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2l9 4v6c0 6-4 10-9 12-5-2-9-6-9-12V6z"/></svg>;
const IconMonitor = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8M12 17v4"/></svg>;
const IconPhone = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>;

function DeviceScreenshot({
  desktopImage,
  mobileImage,
  alt,
  platform,
}: {
  desktopImage: StaticImageData;
  mobileImage: string;
  alt: string;
  platform: Platform;
}) {
  return (
    <AnimatePresence mode="wait">
      {platform === "desktop" ? (
        <motion.div
          key="desktop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative h-full w-full overflow-hidden rounded-md border border-white/10 bg-[#0a101a]"
        >
          <Image
            src={desktopImage}
            alt={alt}
            className="h-full w-full object-cover object-top opacity-90 transition-opacity hover:opacity-100"
            unoptimized
          />
        </motion.div>
      ) : (
        <motion.div
          key="mobile"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-full w-full items-center justify-center rounded-md border border-white/10 bg-[#040810] p-4"
        >
          <div className="w-full max-w-[220px] overflow-hidden rounded-xl border border-white/20">
            <Image
              src={mobileImage}
              alt={alt}
              width={936}
              height={2048}
              className="h-auto w-full object-cover"
              unoptimized
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PlatformToggle({
  platform,
  setPlatform,
}: {
  platform: Platform;
  setPlatform: (p: Platform) => void;
}) {
  return (
    <div className="flex w-fit rounded-full border border-white/10 bg-[#0a101a] p-1">
      <button
        onClick={() => setPlatform("desktop")}
        className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
          platform === "desktop" ? "bg-white text-black" : "text-slate-400 hover:text-white"
        }`}
      >
        <IconMonitor /> Desktop
      </button>
      <button
        onClick={() => setPlatform("mobile")}
        className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
          platform === "mobile" ? "bg-white text-black" : "text-slate-400 hover:text-white"
        }`}
      >
        <IconPhone /> Mobile
      </button>
    </div>
  );
}

export default function FeaturesSection() {
  const [platform, setPlatform] = useState<Platform>("desktop");

  return (
    <section id="features" className="relative px-6 py-24 bg-[#040810]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end border-b border-white/10 pb-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Radical clarity for your records.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Strip away the chaos of scattered files. NeuVault consolidates your documents, notes, and context into structured, recoverable memory.
            </p>
          </div>
          <PlatformToggle platform={platform} setPlatform={setPlatform} />
        </div>

        {/* Layout Family 1: Bento Grid (Dashboard, Vault, Handler) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2 rounded-xl border border-white/10 bg-[#0a101a] p-6 flex flex-col gap-6">
            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded bg-white/5 text-white">
                <IconGrid />
              </div>
              <h3 className="text-xl font-bold text-white">Spot issues instantly.</h3>
              <p className="mt-2 text-sm text-slate-400 max-w-md">
                Review attention items, recent activity, and backups from one dashboard. Stop digging through nested folders to find what needs your focus today.
              </p>
            </div>
            <div className="flex-1 min-h-[300px]">
              <DeviceScreenshot platform={platform} desktopImage={DashboardImage} mobileImage="/mobile-dashboard.jpeg" alt="Dashboard" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-xl border border-white/10 bg-[#0a101a] p-6 flex flex-col">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded bg-white/5 text-white">
                <IconSearch />
              </div>
              <h3 className="text-lg font-bold text-white">Contextual search.</h3>
              <p className="mt-2 text-xs text-slate-400 mb-4">
                Find records by dates, tags, or related documents, not just exact filenames.
              </p>
              <div className="flex-1 min-h-[180px]">
                <DeviceScreenshot platform={platform} desktopImage={VaultImage} mobileImage="/mobile-vault.jpeg" alt="Vault Search" />
              </div>
            </div>
            <div className="flex-1 rounded-xl border border-white/10 bg-[#0a101a] p-6 flex flex-col">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded bg-white/5 text-white">
                <IconLayers />
              </div>
              <h3 className="text-lg font-bold text-white">Unified handler.</h3>
              <p className="mt-2 text-xs text-slate-400 mb-4">
                Preview, edit context, and link records from a single working view.
              </p>
              <div className="flex-1 min-h-[180px]">
                <DeviceScreenshot platform={platform} desktopImage={PreviewImage} mobileImage="/mobile-preview.jpeg" alt="Document Handler" />
              </div>
            </div>
          </div>
        </div>

        {/* Layout Family 2: Asymmetrical Split (Assistant & Suggestions) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
          <div className="lg:col-span-2 rounded-xl border border-white/10 bg-gradient-to-br from-[#0a101a] to-[#040810] p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded bg-white/5 text-white">
              <IconSparkle />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Ask your vault directly.</h3>
            <p className="text-sm text-slate-400 mb-6">
              When search is too narrow, ask direct questions. Get answers connected directly to the exact documents you saved.
            </p>
            <div className="h-[280px]">
              <DeviceScreenshot platform={platform} desktopImage={NovaImage} mobileImage="/mobile-nova.jpeg" alt="Assistant" />
            </div>
          </div>
          <div className="lg:col-span-3 rounded-xl border border-white/10 bg-[#0a101a] flex flex-col md:flex-row overflow-hidden">
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded bg-white/5 text-white">
                <IconBell />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Never miss a deadline.</h3>
              <p className="text-sm text-slate-400">
                Expirations, renewals, and follow-ups stay attached to their source document, bringing urgent dates back into view.
              </p>
            </div>
            <div className="md:w-1/2 min-h-[250px] p-4 bg-[#040810]">
              <DeviceScreenshot platform={platform} desktopImage={SmartSuggestionsImage} mobileImage="/mobile-smart-suggestion.jpeg" alt="Smart Suggestions" />
            </div>
          </div>
        </div>

        {/* Layout Family 3: Side-by-Side Cards (Notes & Recovery) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/10 bg-[#0a101a] p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-white/5 text-white">
                <IconPen />
              </div>
              <h3 className="text-lg font-bold text-white">Context beside the record.</h3>
            </div>
            <p className="text-sm text-slate-400 mb-6">
              Add typed or voice notes directly to scans so the explanation of why it matters never gets lost.
            </p>
            <div className="flex-1 min-h-[240px]">
              <DeviceScreenshot platform={platform} desktopImage={NoteImage} mobileImage="/mobile-note.jpeg" alt="Notes" />
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0a101a] p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-white/5 text-white">
                <IconShield />
              </div>
              <h3 className="text-lg font-bold text-white">Total recoverability.</h3>
            </div>
            <p className="text-sm text-slate-400 mb-6">
              Move between devices seamlessly with encrypted backups. Retain complete control with no forced cloud storage.
            </p>
            <div className="flex-1 min-h-[240px]">
              <DeviceScreenshot platform={platform} desktopImage={SettingsBackupRestoreImage} mobileImage="/mobile-settings.jpeg" alt="Backup" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
