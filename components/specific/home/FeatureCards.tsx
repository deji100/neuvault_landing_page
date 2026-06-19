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
  tabHint: string;
  title: string;
  pain: string;
  solution: string;
  outcome: string;
  desktopImage: StaticImageData;
  mobileImage: string;
  imageAlt: string;
  mobileImageAlt: string;
  icon: ReactNode;
};

const features: Feature[] = [
  {
    eyebrow: "Dashboard",
    tabHint: "What needs attention",
    title: "Know what needs attention before paperwork becomes a problem.",
    pain: "Important documents usually stay silent until they become urgent. You saved the receipt, ID, form, or renewal notice, but still need to know what changed and what needs review.",
    solution: "The dashboard gives you a clear starting point: attention items, recent activity, quick intake, search, Nova, Vault Queue, and backup controls without digging through folders.",
    outcome: "Start with what matters today.",
    desktopImage: DashboardImage,
    mobileImage: "/mobile-dashboard.jpeg",
    imageAlt: "NeuVault desktop dashboard screenshot",
    mobileImageAlt: "NeuVault mobile dashboard screenshot",
    icon: <Gauge size={22} />,
  },
  {
    eyebrow: "Vault",
    tabHint: "Find saved records",
    title: "Find records by context, not just perfect filenames.",
    pain: "People remember the person, payment, school, trip, deadline, or reason a document mattered. They often do not remember the exact filename.",
    solution: "NeuVault turns files into searchable records with titles, summaries, groups, tags, dates, related documents, and saved assets, so retrieval has more paths than filename search.",
    outcome: "Find records from partial memory.",
    desktopImage: VaultImage,
    mobileImage: "/mobile-vault.jpeg",
    imageAlt: "NeuVault desktop vault screenshot",
    mobileImageAlt: "NeuVault mobile vault screenshot",
    icon: <Vault size={22} />,
  },
  {
    eyebrow: "Document Overview",
    tabHint: "Preview and understand",
    title: "Open a document and see the important context in one place.",
    pain: "Finding a document is only half the job. You still need the preview, summary, dates, related files, location, share action, and explanation.",
    solution: "Each record opens into one working view where you can preview, edit context, review attention dates, ask Nova, link related records, move, share, or open the original asset.",
    outcome: "Handle the whole document story.",
    desktopImage: PreviewImage,
    mobileImage: "/mobile-preview.jpeg",
    imageAlt: "NeuVault desktop smart document handler screenshot",
    mobileImageAlt: "NeuVault mobile smart document handler screenshot",
    icon: <FileText size={22} />,
  },
  {
    eyebrow: "Nova",
    tabHint: "Ask your vault",
    title: "Ask the vault when search is too narrow.",
    pain: "Sometimes you do not know which document to open. You only know the question you need answered.",
    solution: "Nova works from vault context, selected records, groups, recent documents, and attention items, so answers stay connected to documents you actually saved.",
    outcome: "Ask the question you remember.",
    desktopImage: NovaImage,
    mobileImage: "/mobile-nova.jpeg",
    imageAlt: "NeuVault desktop Nova assistant screenshot",
    mobileImageAlt: "NeuVault mobile Nova assistant screenshot",
    icon: <Sparkles size={22} />,
  },
  {
    eyebrow: "Smart Reminders",
    tabHint: "Dates and follow-ups",
    title: "Bring dates and follow-ups back into view.",
    pain: "Expiry dates, appointments, renewal windows, payment deadlines, and follow-ups are easy to miss when they stay buried inside files.",
    solution: "Attention items stay tied to the source record. You can open the original document, review the context, ask Nova, and mark the item handled.",
    outcome: "See dates before they become stress.",
    desktopImage: SmartSuggestionsImage,
    mobileImage: "/mobile-smart-suggestion.jpeg",
    imageAlt: "NeuVault desktop smart suggestions screenshot",
    mobileImageAlt: "NeuVault mobile smart suggestions screenshot",
    icon: <Bell size={22} />,
  },
  {
    eyebrow: "Notes",
    tabHint: "Keep extra context",
    title: "Keep the explanation beside the record it belongs to.",
    pain: "The file is only part of the memory. The reason it matters may live in a note, voice thought, Nova answer, or copied detail.",
    solution: "NeuVault keeps notes in the same system as scans and uploads, making them searchable, exportable, and recoverable with the rest of the vault.",
    outcome: "Keep context beside the file.",
    desktopImage: NoteImage,
    mobileImage: "/mobile-note.jpeg",
    imageAlt: "NeuVault desktop notes screenshot",
    mobileImageAlt: "NeuVault mobile notes screenshot",
    icon: <NotebookPen size={22} />,
  },
  {
    eyebrow: "Backup & Restore",
    tabHint: "Move devices safely",
    title: "Recover the vault without surrendering control.",
    pain: "A private document system is only useful if it survives device changes. Without restore, you can lose the organization you already built.",
    solution: "Encrypted backup and restore move vault records, assets, notes, links, reminders, and indexes without turning NeuVault into forced cloud storage.",
    outcome: "Move devices without rebuilding memory.",
    desktopImage: SettingsBackupRestoreImage,
    mobileImage: "/mobile-settings.jpeg",
    imageAlt: "NeuVault desktop settings backup and restore screenshot",
    mobileImageAlt: "NeuVault mobile settings backup and restore screenshot",
    icon: <ShieldCheck size={22} />,
  },
];

function FadeImage({ className, ...props }: React.ComponentProps<typeof Image>) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      {...props}
      className={`${className || ""} transition-all duration-700 ease-out ${
        loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-[1.02]"
      }`}
      onLoad={(e) => {
        setLoaded(true);
        if (props.onLoad) props.onLoad(e);
      }}
    />
  );
}

function DesktopScreenshot({
  image,
  alt,
}: {
  image: StaticImageData;
  alt: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setExpanded(true)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="w-full cursor-zoom-in overflow-hidden rounded-[1.65rem] border border-white/10 bg-[#08111d] shadow-[0_0_40px_rgba(59,130,246,0.15)] ring-1 ring-white/5 transition-all hover:ring-white/20"
      >
        <FadeImage
          src={image}
          alt={alt}
          className="h-auto w-full object-cover"
          quality={100}
          unoptimized
          sizes="(min-width: 1180px) 1120px, 100vw"
        />
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-12 cursor-zoom-out backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-h-full max-w-7xl overflow-hidden rounded-xl bg-[#08111d] shadow-2xl ring-1 ring-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <FadeImage
                src={image}
                alt={alt}
                className="h-auto max-h-[85vh] w-auto object-contain"
                quality={100}
                unoptimized
              />
              <button
                type="button"
                className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white/70 transition-colors hover:bg-black/80 hover:text-white"
                onClick={() => setExpanded(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileScreenshot({
  image,
  alt,
}: {
  image: string;
  alt: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setExpanded(true)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="group flex h-full w-full cursor-zoom-in items-center justify-center rounded-[1.65rem] border border-white/10 bg-gradient-to-b from-[#0f172a] to-[#08111d] p-6 shadow-[0_0_40px_rgba(59,130,246,0.15)] ring-1 ring-white/5 transition-all hover:ring-white/20"
      >
        <div className="w-full max-w-[320px] overflow-hidden rounded-[2rem] border border-white/20 bg-black shadow-2xl transition-transform group-hover:scale-[1.02]">
          <FadeImage
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
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 cursor-zoom-out backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-h-full max-w-md overflow-hidden rounded-[2.5rem] border-4 border-slate-800 bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <FadeImage
                src={image}
                alt={alt}
                width={936}
                height={2048}
                className="h-auto max-h-[85vh] w-auto object-contain"
                quality={100}
                unoptimized
              />
              <button
                type="button"
                className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white/70 transition-colors hover:bg-black/80 hover:text-white"
                onClick={() => setExpanded(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${active
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

const featureStories: Record<
  string,
  {
    before: string;
    after: string;
    description: string;
  }
> = {
  Dashboard: {
    before: "Important items sit quietly until they become urgent.",
    after: "NeuVault opens with what needs attention now.",
    description:
      "A calm starting point for recent records, attention items, quick capture, search, and backup status.",
  },
  Vault: {
    before: "You remember the situation, not the file name.",
    after: "Search by context, tags, dates, groups, and summaries.",
    description:
      "Your documents become searchable records, so retrieval does not depend on perfect folders or filenames.",
  },
  "Document Overview": {
    before: "Opening a file still leaves you rebuilding the story.",
    after: "Preview, summary, dates, notes, and related files stay together.",
    description:
      "Each record becomes a working view for understanding, sharing, linking, and acting on the document.",
  },
  Nova: {
    before: "Sometimes you only know the question, not the document.",
    after: "Ask the vault and get answers tied to saved records.",
    description:
      "Nova helps you move from memory to the right document without digging through every file yourself.",
  },
  "Smart Reminders": {
    before: "Renewals, expiry dates, and follow-ups hide inside PDFs.",
    after: "NeuVault brings important dates back into view.",
    description:
      "Attention items stay connected to the source record, so reminders still have context when they surface.",
  },
  Notes: {
    before: "The reason a document matters lives somewhere else.",
    after: "Notes stay beside the records they explain.",
    description:
      "Keep extra context searchable and recoverable with the rest of the vault, instead of scattered across apps.",
  },
  "Backup & Restore": {
    before: "A useful vault can disappear with one device change.",
    after: "Encrypted backup and restore keeps the system portable.",
    description:
      "Move your vault without rebuilding your document memory from scratch.",
  },
};

export default function FeaturesSection() {
  const [activePlatform, setActivePlatform] = useState<Platform>("desktop");
  const [activeIndex, setActiveIndex] = useState(0);

  const activeFeature = features[activeIndex];
  const activeStory = featureStories[activeFeature.eyebrow];

  return (
    <section id="features" className="relative bg-[#06101a] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">
            See the product
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
            From scattered files to answers you can use.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            NeuVault turns documents, scans, notes, and voice memos into a
            private vault you can search, understand, remember, and restore.
          </p>
        </motion.div>

        <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-4 md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Choose a workflow to preview
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Tap any option below to see how NeuVault handles that moment.
              </p>
            </div>
            <PlatformTabs
              activePlatform={activePlatform}
              setActivePlatform={setActivePlatform}
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={feature.eyebrow}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  className={`group rounded-2xl border p-4 text-left transition-all ${
                    isActive
                      ? "border-blue-300 bg-blue-500 text-white shadow-[0_18px_42px_-26px_rgba(59,130,246,0.95)]"
                      : "border-white/10 bg-[#0b1623] text-slate-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#101d2c]"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        isActive
                          ? "bg-white/18 text-white"
                          : "bg-white/5 text-slate-400 group-hover:text-white"
                      }`}
                    >
                      {feature.icon}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                        isActive
                          ? "bg-white/18 text-white"
                          : "bg-white/5 text-slate-500 group-hover:text-slate-300"
                      }`}
                    >
                      {isActive ? "Selected" : "Preview"}
                    </span>
                  </span>
                  <span className="mt-4 block text-base font-semibold leading-5">
                    {feature.eyebrow}
                  </span>
                  <span
                    className={`mt-1 block text-sm leading-5 ${
                      isActive ? "text-blue-50" : "text-slate-500"
                    }`}
                  >
                    {feature.tabHint}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1623] shadow-2xl">
          <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="bg-[#07111d] p-4 md:p-6 lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activePlatform}-${activeIndex}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24 }}
                >
                  {activePlatform === "desktop" ? (
                    <DesktopScreenshot
                      image={activeFeature.desktopImage}
                      alt={activeFeature.imageAlt}
                    />
                  ) : (
                    <MobileScreenshot
                      image={activeFeature.mobileImage}
                      alt={activeFeature.mobileImageAlt}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col justify-center border-t border-white/10 p-7 md:p-10 lg:border-l lg:border-t-0">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white">
                {activeFeature.icon}
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-200">
                {activeFeature.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-white md:text-4xl">
                {activeFeature.outcome}
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-300">
                {activeStory.description}
              </p>

              <div className="mt-8 space-y-3">
                <div className="rounded-2xl border border-rose-300/20 bg-rose-300/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-100">
                    Before
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {activeStory.before}
                  </p>
                </div>
                <div className="rounded-2xl border border-teal-300/20 bg-teal-300/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-100">
                    With NeuVault
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-100">
                    {activeStory.after}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
