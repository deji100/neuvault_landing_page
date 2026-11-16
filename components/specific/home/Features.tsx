import Image from "next/image";
import {
  Activity,
  Bot,
  CalendarCheck,
  FileDown,
  FileText,
  FolderInput,
  HardDrive,
  Layers,
  Link2,
  ListChecks,
  Lock,
  Mic,
  MonitorSmartphone,
  Pin,
  ScanLine,
  ScanSearch,
  Share2,
  WifiOff,
  type LucideIcon,
} from "lucide-react";

import { DesktopCarousel, type Slide } from "./AppTour";
import { BackupFlow, CaptureFlow, OfflineSplit, ReminderTimeline, SendFromAnywhere, VaultMapShare } from "./FeatureDiagrams";
import styles from "./Features.module.css";

/** Every screenshot on this page is a 3456×2234 desktop capture. */
function Shot({ src, alt, sizes, className }: { src: string; alt: string; sizes: string; className?: string }) {
  return (
    <div className={`${styles.window} ${className ?? ""}`}>
      <div className={styles.chrome} aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <Image src={src} alt={alt} width={3456} height={2234} sizes={sizes} />
    </div>
  );
}

function PillarHead({ n, title, answers = [] }: { n: string; title: string; answers?: string[] }) {
  return (
    <div className={styles.pillarHead}>
      <span className={styles.number} aria-hidden="true">{n}</span>
      <div>
        {answers.length > 0 ? (
          <p className={styles.answers}>
            Answers{" "}
            {answers.map((answer, i) => (
              <span key={answer}>
                {i > 0 ? " and " : null}
                <a href="#problem">&ldquo;{answer}&rdquo;</a>
              </span>
            ))}
          </p>
        ) : null}
        <h2>{title}</h2>
      </div>
    </div>
  );
}

const capture: {
  title: string;
  icon: LucideIcon;
  tone: string;
  copy: string;
  shot?: string;
  /** Focus of the crop: object-position, then zoom. */
  focus?: [string, number];
  mobile?: boolean;
}[] = [
  {
    title: "NeuVault Notes",
    icon: FileText,
    tone: "#007aff",
    shot: "/desktop-images/note-voice-nova.png",
    focus: ["50% 42%", 2.1],
    copy: "Write notes with checklists, tables and images. Ask Nova to help draft or edit, and attach files from your vault.",
  },
  {
    title: "NeuVault Batch Scanner",
    icon: ScanLine,
    tone: "#34c759",
    mobile: true,
    copy: "Scan several pages on your phone and keep them together as one document.",
  },
  {
    title: "NeuVault Voice Transcription",
    icon: Mic,
    tone: "#ff9500",
    shot: "/desktop-images/structured-note.png",
    focus: ["50% 30%", 1.5],
    copy: "Turn a recording into a summary, key points and a searchable transcript. Follow the text as the audio plays.",
  },
  {
    title: "NeuVault Links",
    icon: Link2,
    tone: "#ff3b30",
    shot: "/desktop-images/map-doc-with-related-docs.png",
    focus: ["40% 35%", 1.12],
    copy: "Save webpages and YouTube links. AI can summarize and organize readable webpages; watch linked videos inside NeuVault.",
  },
  {
    title: "Automatic import",
    icon: FolderInput,
    tone: "#5e5ce6",
    shot: "/desktop-images/home.png",
    focus: ["55% 30%", 1.7],
    copy: "Watch a desktop folder for new files. Choose AI organization using credits, or save them to Inbox for later.",
  },
  {
    title: "Nova, your organizer",
    icon: Bot,
    tone: "#af52de",
    shot: "/desktop-images/inbox.png",
    focus: ["35% 20%", 1.45],
    copy: "Save to Inbox first, or use AI to summarize, tag and sort. Ask Nova questions about your saved material.",
  },
];

const mapSlides: Slide[] = [
  {
    src: "/desktop-images/vault-map-overview.png",
    title: "One canvas for the whole project.",
    copy: "Documents, notes, PDFs and videos about one subject, grouped by topic and connected so you can see how they fit.",
  },
  {
    src: "/desktop-images/vault-map-2.png",
    title: "Groups, colors and labeled links.",
    copy: "Sort cards into colored groups and label each connection, so the map explains itself when you come back to it.",
  },
  {
    src: "/desktop-images/vault-map-3.png",
    title: "Write right on the map.",
    copy: "Every note card is a full editor, with headings, lists, tables and code, and you can recolor it or move it between groups.",
  },
  {
    src: "/desktop-images/vault-map-nova.png",
    title: "Ask Nova about the whole map.",
    copy: "Ask Nova to compare selected material or draft a note. Confirm before it adds anything to your map.",
  },
  {
    src: "/desktop-images/vault-map-split.png",
    title: "Read two side by side.",
    copy: "Open any two cards in split screen, like a lecture video next to the assignment it explains.",
  },
  {
    src: "/desktop-images/vault-map-reminder.png",
    title: "Bring it back when it matters.",
    copy: "Set a reminder for the whole group, with a date or a weekly, monthly or yearly return.",
  },
  {
    src: "/desktop-images/vault-map-share.png",
    title: "Export and share the map.",
    copy: "Send the whole map, or just the groups you choose, as one package with every card, document and file.",
  },
];

const plannerSlides: Slide[] = [
  {
    src: "/desktop-images/planner-agenda.png",
    title: "See what needs you next.",
    copy: "Agenda brings tasks and events into one list. Keep supporting notes and documents attached to the work.",
  },
  {
    src: "/desktop-images/planner-weekly.png",
    title: "Make room for your week.",
    copy: "See your schedule in Week view and move tasks to another day as your plans change.",
  },
  {
    src: "/desktop-images/planner-monthly.png",
    title: "Look ahead without losing the details.",
    copy: "Month view keeps upcoming tasks and events in sight, with dates, priorities, and recurring tasks.",
  },
  {
    src: "/desktop-images/planner-board.png",
    title: "Move work from To do to Done.",
    copy: "Name your Board columns and move tasks between them as work progresses.",
  },
];

const extras: { title: string; copy: string; icon: LucideIcon }[] = [
  { title: "Media Review", copy: "check scans, images and audio before anything is processed", icon: ScanSearch },
  { title: "Queue", copy: "watch files process while you keep working", icon: ListChecks },
  { title: "Recent Activity", copy: "see what changed and when", icon: Activity },
  { title: "Pinned Docs", copy: "keep what you use most within reach", icon: Pin },
  { title: "Export", copy: "turn any note into a Word document or PDF", icon: FileDown },
  { title: "Offline PIN", copy: "lock NeuVault on your device", icon: Lock },
  { title: "Everywhere you are", copy: "Mac, Windows, iPhone and Android", icon: MonitorSmartphone },
];

export default function Features() {
  return (
    <div className={styles.features}>
      {/* 1 */}
      <article className={styles.pillar} id="yours">
        <PillarHead n="01" title="Local-first. Yours to keep." />
        <div className={styles.split}>
          <div className={styles.copy}>
            <div className={styles.block}>
              <h3>
                <HardDrive size={18} aria-hidden="true" /> NeuVault Backup &amp; Recovery Key
              </h3>
              <p>
                One encrypted file, saved where you choose. Open it with your Recovery Key
                when you need to restore.
              </p>
              <BackupFlow />
            </div>
            <div className={styles.block}>
              <h3>
                <WifiOff size={18} aria-hidden="true" /> Local-first, with offline access
              </h3>
              <p>
                Read files, edit notes and manage tasks offline. AI sends relevant content for online processing;
                Planner and reminder data sync when connected.
              </p>
              <OfflineSplit />
            </div>
          </div>
          <Shot
            src="/desktop-images/backup.png"
            alt="NeuVault backup settings, with Google Drive, OneDrive, Dropbox and iCloud Drive as destinations"
            sizes="(min-width: 960px) 560px, calc(100vw - 48px)"
          />
        </div>
      </article>

      {/* 2 */}
      <article className={styles.pillar} id="capture-details">
        <PillarHead n="02" title="Save anything. Find it again." />
        <div className={styles.oneApp}>
          <h3>
            <Layers size={18} aria-hidden="true" /> One app instead of five
          </h3>
          <p>Documents, scans, notes, recordings and links, sorted together in one place.</p>
        </div>
        <CaptureFlow />
        <div className={styles.block}>
          <h3>
            <Share2 size={18} aria-hidden="true" /> Send it in from anywhere
          </h3>
          <p>On your phone, tap Share in any app. On your computer, use the Save to NeuVault extension.</p>
        </div>
        <SendFromAnywhere />
        {/* Retain the older feature cards without displaying them. */}
        <div className={styles.bento} hidden>
          {capture.map(({ title, icon: Icon, tone, copy, shot, focus, mobile }) => (
            <section key={title} className={styles.card} style={{ "--tone": tone } as React.CSSProperties}>
              <div className={styles.cardMedia}>
                {shot ? (
                  <Image
                    src={shot}
                    alt={`${title} in NeuVault`}
                    width={3456}
                    height={2234}
                    sizes="(min-width: 960px) 720px, 100vw"
                    style={focus ? ({ "--pos": focus[0], "--zoom": focus[1] } as React.CSSProperties) : undefined}
                  />
                ) : (
                  <div className={styles.scanArt} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                )}
              </div>
              <div className={styles.cardBody}>
                <h3>
                  <span className={styles.cardIcon} aria-hidden="true">
                    <Icon size={16} strokeWidth={2.2} />
                  </span>
                  {title}
                  {mobile ? <span className={styles.badge}>Mobile</span> : null}
                </h3>
                <p>{copy}</p>
              </div>
            </section>
          ))}
        </div>
      </article>

      {/* 3 */}
      <article className={styles.pillar} id="reminders" hidden>
        <PillarHead n="03" title="Keep important dates in view." answers={["Deadlines hiding in plain sight"]} />
        <div className={`${styles.split} ${styles.splitReverse}`}>
          <div className={styles.copy}>
            <div className={styles.block}>
              <h3>
                <CalendarCheck size={18} aria-hidden="true" /> NeuVault Reminders
              </h3>
              <p>
                AI can find upcoming dates in saved material. Review them, or set your own reminder.
              </p>
            </div>
            <ReminderTimeline />
          </div>
          <Shot
            src="/desktop-images/reminder.png"
            alt="NeuVault Reminders: due and upcoming dates found in documents"
            sizes="(min-width: 960px) 560px, calc(100vw - 48px)"
          />
        </div>
      </article>

      {/* 4 */}
      <article className={styles.pillar} id="planner" hidden>
        <PillarHead n="04" title="Turn what you know into what you do." />
        <div className={styles.mapCopy}>
          <div className={styles.block}>
            <h3>NeuVault Planner</h3>
            <p>
              Schedule tasks and events with dates, priorities and supporting files attached.
            </p>
          </div>
          <p className={styles.mapSecond}>
            Ask Nova to help plan your day; confirm its changes. Tasks work offline and sync when connected.
            Attached files transfer separately.
          </p>
        </div>
        <DesktopCarousel slides={plannerSlides} label="NeuVault Planner" controlsLabel="Planner" />
      </article>

      {/* 5 */}
      <article className={styles.pillar} id="map" hidden>
        <PillarHead n="05" title="Connect the dots." />
        <div className={styles.mapCopy}>
          <div className={styles.block}>
            <h3>NeuVault Vault Map</h3>
            <p>
              Put everything about one project, client, course or trip on one canvas, and connect it.
            </p>
          </div>
          <p className={styles.mapSecond}>
            Ask Nova about the whole map. It changes the map only when you confirm.
          </p>
        </div>
        <DesktopCarousel slides={mapSlides} label="NeuVault Vault Map" controlsLabel="Vault Map" />
        <VaultMapShare />
      </article>

      {/* 6 */}
      <article className={styles.pillar} id="more" hidden>
        <PillarHead n="06" title="And everything in between" />
        <ul className={styles.extras}>
          {extras.map(({ title, copy, icon: Icon }) => (
            <li key={title}>
              <Icon size={18} aria-hidden="true" />
              <div>
                <strong>{title}</strong>
                <span>{copy}</span>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
