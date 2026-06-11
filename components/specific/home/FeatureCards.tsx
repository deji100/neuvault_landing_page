"use client";

import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
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
    pain:
      "The pain: important documents usually stay silent until the moment they become urgent. A receipt, ID, scanned form, renewal, or follow-up can be saved somewhere, but you still need a clear answer to: what changed, what needs review, and what should I do next?",
    solution:
      "NeuVault solves this with a dashboard that turns the vault into a clear starting point. On desktop, you see vault item counts, attention items, recent activity, quick intake, search, Nova, Vault Queue, and Backup & Restore shortcuts. On mobile, global search, restore, backup export, and auto-intake stay available from the app shell so you can act from context instead of hunting through folders.",
    desktopImage: DashboardImage,
    mobileImage: "/mobile-dashboard.jpeg",
    imageAlt: "NeuVault desktop dashboard screenshot",
    mobileImageAlt: "NeuVault mobile dashboard screenshot",
    icon: <Gauge size={22} />,
  },
  {
    eyebrow: "Vault",
    title: "Find records by context, not just perfect filenames.",
    pain:
      "The pain: saving a file is not the same as remembering it. People often remember the person, payment, school, trip, deadline, or reason the document mattered, but not the exact filename or where it was stored.",
    solution:
      "NeuVault turns each item into a searchable vault record with a useful title, summary, group, subgroup, tags, dates, related documents, and saved assets. On desktop, Vault search uses local indexes and opens matching records, previews, and queued items. On mobile, global vault search and restored indexes help you retrieve documents by meaning, group, or document context instead of relying on perfect filenames.",
    desktopImage: VaultImage,
    mobileImage: "/mobile-vault.jpeg",
    imageAlt: "NeuVault desktop vault screenshot",
    mobileImageAlt: "NeuVault mobile vault screenshot",
    icon: <Vault size={22} />,
  },
  {
    eyebrow: "Smart Document Handler",
    title: "Open a record and handle the full document story in one place.",
    pain:
      "The pain: finding a document is only half the job. You still need to preview it, remember why it mattered, check dates, connect related files, move it to the right group, share it, or ask what it means. When those actions live in different places, the context gets broken again.",
    solution:
      "NeuVault solves this with a dedicated Smart Document Handler for every record. On desktop, the preview opens from search, Vault, dashboard, linked documents, and notifications, then lets you edit the summary, review attention context, ask Nova about the document, link related records, move the item, share it, open the original asset, or delete it while vault indexes stay updated. On mobile, the same handler appears across Vault, Smart Suggestions, Home, linked groups, document routes, assistant messages, and global previews, so each saved item keeps its title, summary, tags, groups, extracted fields, assets, related documents, and Nova context together.",
    desktopImage: PreviewImage,
    mobileImage: "/mobile-preview.jpeg",
    imageAlt: "NeuVault desktop smart document handler screenshot",
    mobileImageAlt: "NeuVault mobile smart document handler screenshot",
    icon: <FileText size={22} />,
  },
  {
    eyebrow: "Nova",
    title: "Ask the vault when search is too narrow.",
    pain:
      "The pain: sometimes you do not know which document to open. You only know the question: what did this record say, which files relate to this issue, what was the latest document, or what still needs attention?",
    solution:
      "Nova is built around the vault, not a blank chat box. On desktop, Nova routes between attention questions, vault questions, metadata answers, deep document analysis, and normal chat, using recent documents, groups, and selected records when available. On mobile, Nova builds vault context from saved intake items and can search or narrow responses by groups and documents, so answers stay connected to what you actually saved.",
    desktopImage: NovaImage,
    mobileImage: "/mobile-nova.jpeg",
    imageAlt: "NeuVault desktop Nova assistant screenshot",
    mobileImageAlt: "NeuVault mobile Nova assistant screenshot",
    icon: <Sparkles size={22} />,
  },
  {
    eyebrow: "Smart Suggestions",
    title: "Bring dates and follow-ups back into view.",
    pain:
      "The pain: dates are easy to miss because they are buried inside the document. An expiry date, appointment, renewal window, payment deadline, or follow-up may be visible during upload, then disappear until it is too late.",
    solution:
      "NeuVault keeps reminders tied to the source record. On desktop, attention items appear on the dashboard, can be opened with their original document, and can be marked reviewed when handled. Nova can also answer attention questions from stored reminder context. On mobile, Smart Suggestions can be generated and synced, and backup restore brings smart suggestion state back with the vault.",
    desktopImage: SmartSuggestionsImage,
    mobileImage: "/mobile-smart-suggestion.jpeg",
    imageAlt: "NeuVault desktop smart suggestions screenshot",
    mobileImageAlt: "NeuVault mobile smart suggestions screenshot",
    icon: <Bell size={22} />,
  },
  {
    eyebrow: "Notes",
    title: "Keep the explanation beside the record it belongs to.",
    pain:
      "The pain: the file is only part of the memory. The reason it matters may be in a note, a voice thought, a Nova answer, a copied detail, or something you planned to remember later.",
    solution:
      "NeuVault keeps notes in the same document system as scans and uploads. On desktop, Nova can draft notes, notes can remain searchable, and document summaries can send you back to Nova when more context is needed. On mobile, notes and note assets are included in the vault backup model, so the explanation can travel with the record instead of living in a separate app.",
    desktopImage: NoteImage,
    mobileImage: "/mobile-note.jpeg",
    imageAlt: "NeuVault desktop notes screenshot",
    mobileImageAlt: "NeuVault mobile notes screenshot",
    icon: <NotebookPen size={22} />,
  },
  {
    eyebrow: "Settings, Backup, Restore",
    title: "Recover the vault without surrendering control.",
    pain:
      "The pain: a private document system is only useful if it survives device changes. Without a controlled backup and restore path, you risk losing documents, notes, previews, links, reminders, and the organization you already built.",
    solution:
      "NeuVault uses local-first storage with encrypted backup and restore controls. On desktop, Settings lets you choose backup destinations, export, preview restores, restore backups, keep background reminders active, and rebuild usable vault state. On mobile, encrypted bundle export and restore include vault records, assets, note assets, links, smart suggestions, and rebuilt search/group indexes, so the vault can move without becoming forced cloud storage.",
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
    <div className="overflow-hidden rounded-t-[1.65rem] border-b border-slate-200 bg-white">
      <Image
        src={image}
        alt={alt}
        className="h-auto w-full"
        quality={100}
        unoptimized
        sizes="(min-width: 1180px) 1120px, 100vw"
      />
    </div>
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
    <div className="flex justify-center rounded-t-[1.65rem] border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#eef5ff_100%)] px-6 py-10">
      <div className="w-full max-w-[390px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-[0_34px_100px_-56px_rgba(15,23,42,0.9)]">
        <Image
          src={image}
          alt={alt}
          width={936}
          height={2048}
          className="h-auto w-full"
          quality={100}
          unoptimized
          sizes="390px"
        />
      </div>
    </div>
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
    <div
      id="screenshots"
      className="mx-auto mt-10 flex w-fit rounded-2xl border border-slate-200 bg-slate-50 p-1 shadow-sm"
    >
      {tabs.map((tab) => {
        const active = activePlatform === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActivePlatform(tab.value)}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold ${
              active
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-950"
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

  return (
    <section id="features" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Product features
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            Every screen solves a real document problem.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            NeuVault is built around the moments that make paperwork stressful:
            not knowing what matters, losing context, forgetting dates, and
            rebuilding records when devices change.
          </p>
        </motion.div>

        <PlatformTabs
          activePlatform={activePlatform}
          setActivePlatform={setActivePlatform}
        />

        <div className="mt-10 space-y-12">
          {features.map((feature, index) => (
            <motion.article
              key={`${activePlatform}-${feature.title}`}
              className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_26px_90px_-58px_rgba(15,23,42,0.48)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              viewport={{ once: true }}
            >
              {activePlatform === "desktop" ? (
                <DesktopScreenshot image={feature.desktopImage} alt={feature.imageAlt} />
              ) : (
                <MobileScreenshot
                  image={feature.mobileImage}
                  alt={feature.mobileImageAlt}
                />
              )}

              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-3xl">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                      {feature.icon}
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                      {feature.eyebrow}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight text-slate-950 md:text-4xl">
                      {feature.title}
                    </h3>
                  </div>

                  <div className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600">
                    {activePlatform === "desktop" ? "Desktop App" : "Mobile App"}
                  </div>
                </div>

                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      The pain
                    </p>
                    <p className="mt-3 text-base leading-8 text-slate-700">
                      {feature.pain}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
                      NeuVault answer
                    </p>
                    <p className="mt-3 text-base leading-8 text-slate-700">
                      {feature.solution}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
