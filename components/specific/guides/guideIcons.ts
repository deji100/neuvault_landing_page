import type { LucideIcon } from "lucide-react";
import type { GuidePage } from "@/lib/guides";
import { CalendarClock, FileScan, FolderTree, Mic, Search, ShieldCheck, BookOpen } from "lucide-react";

/** One icon and tint per guide, so a guide looks the same on the index and on its own page. */
const guideIcons: Record<string, { icon: LucideIcon; tone: string }> = {
  "how-to-scan-and-organize-documents": { icon: FileScan, tone: "#34c759" },
  "organize-important-documents-digitally": { icon: FolderTree, tone: "#007aff" },
  "track-passport-visa-and-id-expiry-dates": { icon: CalendarClock, tone: "#ff9500" },
  "search-old-documents-without-folder-chaos": { icon: Search, tone: "#5e5ce6" },
  "back-up-important-documents-securely": { icon: ShieldCheck, tone: "#30b0c7" },
  "turn-voice-notes-into-searchable-records": { icon: Mic, tone: "#af52de" },
};

export function guideIcon(slug: string) {
  return guideIcons[slug] ?? { icon: BookOpen, tone: "#007aff" };
}

/** Roughly 220 words a minute across the intro, steps, takeaways and answers. */
export function readingMinutes(parts: string[]) {
  const words = parts.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Every piece of text a reader works through in a guide. */
export function guideReadingMinutes(guide: GuidePage) {
  return readingMinutes([
    guide.intro,
    ...guide.keyTakeaways,
    ...guide.sections.flatMap((section) => [
      section.title,
      section.description,
      ...(section.details ?? []),
      ...(section.inApp ?? []),
    ]),
    ...(guide.checklist ?? []),
    ...guide.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ]);
}
