"use client";

import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  FileText,
  Gauge,
  Monitor,
  NotebookPen,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Vault,
} from "lucide-react";
import DashboardImage from "@/public/dashboard.png";
import VaultImage from "@/public/vault.png";
import PreviewImage from "@/public/preview.png";
import NovaImage from "@/public/nova.png";
import SmartSuggestionsImage from "@/public/smart-suggestions.png";
import NoteImage from "@/public/note.png";
import SettingsBackupRestoreImage from "@/public/settings-backup-restore.png";

type Platform = "desktop" | "mobile";

type Feature = {
  eyebrow: string;
  title: string;
  pain: string;
  solution: string;
  desktopImage: StaticImageData;
  mobileImage: string;
  imageAlt: string;
  mobileImageAlt: string;
  icon: ReactNode;
};

const features: Feature[] = [
  {
    eyebrow: "Dashboard",
    title: "Know what needs attention before paperwork becomes a problem.",
    pain: "Important documents usually stay silent until they become urgent. You saved the receipt, ID, form, or renewal notice, but still need to know what changed and what needs review.",
    solution: "The dashboard gives you a clear starting point: attention items, recent activity, quick intake, search, Nova, Vault Queue, and backup controls without digging through folders.",
    desktopImage: DashboardImage,
    mobileImage: "/mobile-dashboard.jpeg",
    imageAlt: "NeuVault desktop dashboard screenshot",
    mobileImageAlt: "NeuVault mobile dashboard screenshot",
    icon: <Gauge size={22} />,
  },
  {
    eyebrow: "Vault",
    title: "Find records by context, not just perfect filenames.",
    pain: "People remember the person, payment, school, trip, deadline, or reason a document mattered. They often do not remember the exact filename.",
    solution: "NeuVault turns files into searchable records with titles, summaries, groups, tags, dates, related documents, and saved assets, so retrieval has more paths than filename search.",
    desktopImage: VaultImage,
    mobileImage: "/mobile-vault.jpeg",
    imageAlt: "NeuVault desktop vault screenshot",
    mobileImageAlt: "NeuVault mobile vault screenshot",
    icon: <Vault size={22} />,
  },
  {
    eyebrow: "Smart Document Handler",
    title: "Open a record and handle the full document story in one place.",
    pain: "Finding a document is only half the job. You still need the preview, summary, dates, related files, location, share action, and explanation.",
    solution: "Each record opens into one working view where you can preview, edit context, review attention dates, ask Nova, link related records, move, share, or open the original asset.",
    desktopImage: PreviewImage,
    mobileImage: "/mobile-preview.jpeg",
    imageAlt: "NeuVault desktop smart document handler screenshot",
    mobileImageAlt: "NeuVault mobile smart document handler screenshot",
    icon: <FileText size={22} />,
  },
  {
    eyebrow: "Nova",
    title: "Ask the vault when search is too narrow.",
    pain: "Sometimes you do not know which document to open. You only know the question you need answered.",
    solution: "Nova works from vault context, selected records, groups, recent documents, and attention items, so answers stay connected to documents you actually saved.",
    desktopImage: NovaImage,
    mobileImage: "/mobile-nova.jpeg",
    imageAlt: "NeuVault desktop Nova assistant screenshot",
    mobileImageAlt: "NeuVault mobile Nova assistant screenshot",
    icon: <Sparkles size={22} />,
  },
  {
    eyebrow: "Smart Suggestions",
    title: "Bring dates and follow-ups back into view.",
    pain: "Expiry dates, appointments, renewal windows, payment deadlines, and follow-ups are easy to miss when they stay buried inside files.",
    solution: "Attention items stay tied to the source record. You can open the original document, review the context, ask Nova, and mark the item handled.",
    desktopImage: SmartSuggestionsImage,
    mobileImage: "/mobile-smart-suggestion.jpeg",
    imageAlt: "NeuVault desktop smart suggestions screenshot",
    mobileImageAlt: "NeuVault mobile smart suggestions screenshot",
    icon: <Bell size={22} />,
  },
  {
    eyebrow: "Notes",
    title: "Keep the explanation beside the record it belongs to.",
    pain: "The file is only part of the memory. The reason it matters may live in a note, voice thought, Nova answer, or copied detail.",
    solution: "NeuVault keeps notes in the same system as scans and uploads, making them searchable, exportable, and recoverable with the rest of the vault.",
    desktopImage: NoteImage,
    mobileImage: "/mobile-note.jpeg",
    imageAlt: "NeuVault desktop notes screenshot",
    mobileImageAlt: "NeuVault mobile notes screenshot",
    icon: <NotebookPen size={22} />,
  },
  {
    eyebrow: "Settings, Backup, Restore",
    title: "Recover the vault without surrendering control.",
    pain: "A private document system is only useful if it survives device changes. Without restore, you can lose the organization you already built.",
    solution: "Encrypted backup and restore move vault records, assets, notes, links, reminders, and indexes without turning NeuVault into forced cloud storage.",
    desktopImage: SettingsBackupRestoreImage,
    mobileImage: "/mobile-settings.jpeg",
    imageAlt: "NeuVault desktop settings backup and restore screenshot",
    mobileImageAlt: "NeuVault mobile settings backup and restore screenshot",
    icon: <ShieldCheck size={22} />,
  },
];

function DesktopScreenshot({
  image,
  alt,
}: {
  image: StaticImageData;
  alt: string;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-[1.65rem] border border-white/10 bg-[#08111d] shadow-[0_0_40px_rgba(59,130,246,0.15)] ring-1 ring-white/5"
    >
      <Image
        src={image}
        alt={alt}
        className="h-auto w-full object-cover"
        quality={100}
        unoptimized
        sizes="(min-width: 1180px) 1120px, 100vw"
      />
    </motion.div>
  );
}

function MobileScreenshot({
  image,
  alt,
}: {
  image: string;
  alt: string;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex h-full w-full items-center justify-center rounded-[1.65rem] border border-white/10 bg-gradient-to-b from-[#0f172a] to-[#08111d] p-6 shadow-[0_0_40px_rgba(59,130,246,0.15)] ring-1 ring-white/5"
    >
      <div className="w-full max-w-[320px] overflow-hidden rounded-[2rem] border border-white/20 bg-black shadow-2xl">
        <Image
          src={image}
          alt={alt}
          width={936}
          height={2048}
          className="h-auto w-full object-cover"
          quality={100}
          unoptimized
          sizes="320px"
        />
      </div>
    </motion.div>
  );
}

function PlatformTabs({
  activePlatform,
  setActivePlatform,
}: {
  activePlatform: Platform;
  setActivePlatform: (platform: Platform) => void;
}) {
  const tabs: Array<{ value: Platform; label: string; icon: ReactNode }> = [
    { value: "desktop", label: "Desktop App", icon: <Monitor size={16} /> },
    { value: "mobile", label: "Mobile App", icon: <Smartphone size={16} /> },
  ];

  return (
    <div className="flex w-fit rounded-full border border-white/10 bg-[#0f172a] p-1 shadow-inner">
      {tabs.map((tab) => {
        const active = activePlatform === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActivePlatform(tab.value)}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              active
                ? "bg-blue-600 text-white shadow-md shadow-blue-900/50"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default function FeaturesSection() {
  const [activePlatform, setActivePlatform] = useState<Platform>("desktop");
  const [activeIndex, setActiveIndex] = useState(0);

  const activeFeature = features[activeIndex];

  return (
    <section id="features" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">
              Every screen solves a real document problem.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              NeuVault keeps the product story focused: capture records, preserve
              context, remember dates, ask questions, and recover the vault when
              devices change.
            </p>
          </div>
          <PlatformTabs
            activePlatform={activePlatform}
            setActivePlatform={setActivePlatform}
          />
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr]">
          {/* Tabs Menu */}
          <div className="flex flex-col gap-2">
            {features.map((feature, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={feature.eyebrow}
                  onClick={() => setActiveIndex(index)}
                  className={`group flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                    isActive
                      ? "border-blue-500/50 bg-blue-500/10 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)] ring-1 ring-blue-500/20"
                      : "border-transparent bg-transparent hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 group-hover:text-white"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <div className={`font-semibold transition-colors ${isActive ? "text-white" : "text-slate-300"}`}>
                      {feature.eyebrow}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Feature Display */}
          <div className="relative flex flex-col gap-8 rounded-3xl border border-white/10 bg-[#111a28] p-6 lg:p-10 shadow-2xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-bold text-white md:text-3xl">
                  {activeFeature.title}
                </h3>
                
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-red-400">The Friction</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeFeature.pain}</p>
                  </div>
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">NeuVault Solution</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeFeature.solution}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex-1">
              <AnimatePresence mode="wait">
                <div key={`${activePlatform}-${activeIndex}`} className="h-full">
                  {activePlatform === "desktop" ? (
                    <DesktopScreenshot image={activeFeature.desktopImage} alt={activeFeature.imageAlt} />
                  ) : (
                    <MobileScreenshot image={activeFeature.mobileImage} alt={activeFeature.mobileImageAlt} />
                  )}
                </div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
