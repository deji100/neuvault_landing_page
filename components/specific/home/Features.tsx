import Image from "next/image";
import {
  Activity,
  Bot,
  CalendarCheck,
  Clock,
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
  type LucideIcon,
} from "lucide-react";

import { DesktopCarousel, type Slide } from "./AppTour";
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

const destinations = ["Google Drive", "iCloud", "OneDrive", "Dropbox", "USB drive"];

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
    copy: "A full editor for your ideas, with headings, checklists, tables and images. Stuck? Write with Nova, and it drafts or reshapes what you have. Connect documents from your vault while you're still writing.",
  },
  {
    title: "NeuVault Batch Scanner",
    icon: ScanLine,
    tone: "#34c759",
    mobile: true,
    copy: "Scan a stack of receipts, forms or pages in one go on your phone, and they stay together as one document instead of scattering across your camera roll.",
  },
  {
    title: "NeuVault Voice Transcription",
    icon: Mic,
    tone: "#ff9500",
    shot: "/desktop-images/note-audio-1.png",
    focus: ["50% 30%", 1.5],
    copy: "Record a meeting or a voice note, or upload one you already have. Get back an overview, key points, action items and the full transcript. NeuVault even labels who said what, and the transcript scrolls along as the audio plays.",
  },
  {
    title: "NeuVault Links",
    icon: Link2,
    tone: "#ff3b30",
    shot: "/desktop-images/map-doc-with-related-docs.png",
    focus: ["40% 35%", 1.12],
    copy: "Save bookmarks and YouTube links once. Nova reads each page, writes a summary and files it, so you know what it is before you open it. YouTube videos play right inside NeuVault.",
  },
  {
    title: "Automatic import",
    icon: FolderInput,
    tone: "#5e5ce6",
    shot: "/desktop-images/home.png",
    focus: ["55% 30%", 1.7],
    copy: "Watch a folder on your computer, connect Gmail or Microsoft 365, or share straight from WhatsApp on your phone, and new files arrive on their own.",
  },
  {
    title: "Nova, your organizer",
    icon: Bot,
    tone: "#af52de",
    shot: "/desktop-images/inbox.png",
    focus: ["35% 20%", 1.45],
    copy: "Everything lands in your Inbox untouched. When you're ready, Nova summarizes, tags and sorts it into the right group. Ask Nova anything about your files, and it answers from your own vault.",
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
    title: "Groups, colours and labelled links.",
    copy: "Sort cards into coloured groups and label each connection, so the map explains itself when you come back to it.",
  },
  {
    src: "/desktop-images/vault-map-3.png",
    title: "Write right on the map.",
    copy: "Every note card is a full editor, with headings, lists, tables and code, and you can recolour it or move it between groups.",
  },
  {
    src: "/desktop-images/vault-map-nova.png",
    title: "Ask Nova about the whole map.",
    copy: "Nova reads every card, then summarizes, compares or drafts a revision document, and adds it only when you confirm.",
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
        <PillarHead n="01" title="Yours, everywhere." answers={["Your data isn't really yours"]} />
        <div className={styles.split}>
          <div className={styles.copy}>
            <div className={styles.block}>
              <h3>
                <HardDrive size={18} aria-hidden="true" /> NeuVault Backup &amp; Recovery Key
              </h3>
              <p>
                Back up your entire vault as one encrypted bundle and keep it wherever you like: Google
                Drive, iCloud, OneDrive, Dropbox or a USB drive. It&rsquo;s unlocked by a Recovery Key
                that never leaves your device, and each backup can only be restored into the account
                that created it.
              </p>
              <ul className={styles.destinations} aria-label="Backup destinations">
                {destinations.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <p>
                Switch from Mac to Windows or Android to iPhone, restore your bundle, and everything
                comes back exactly as you left it, with every group, note and map intact.
              </p>
            </div>
            <div className={styles.block}>
              <h3>
                <Lock size={18} aria-hidden="true" /> Local-first by design
              </h3>
              <p>
                Your vault lives on your device, not on our servers. Nova only processes what you
                choose, when you choose, and nothing is stored on our servers.
              </p>
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
      <article className={styles.pillar} id="capture">
        <PillarHead n="02" title="Save anything. Find it again." answers={["Saved, then lost", "One goal, five apps"]} />
        <div className={styles.oneApp}>
          <h3>
            <Layers size={18} aria-hidden="true" /> One app instead of five
          </h3>
          <p>
            Notes, scanning, transcription, links, reminders and backup, all connected in one place, so
            everything you save for the same project finds its way together.
          </p>
        </div>
        <p className={styles.intro}>Bring everything in, however it arrives. NeuVault takes it from there.</p>
        <div className={styles.bento}>
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
      <article className={styles.pillar} id="reminders">
        <PillarHead n="03" title="Never miss what matters." answers={["Deadlines hiding in plain sight"]} />
        <div className={`${styles.split} ${styles.splitReverse}`}>
          <div className={styles.copy}>
            <div className={styles.block}>
              <h3>
                <CalendarCheck size={18} aria-hidden="true" /> NeuVault Reminders
              </h3>
              <p>
                NeuVault reads your documents and notes for important dates, like renewals, payments
                and events, and sets the reminder for you. Or set your own on any document or a whole
                group of related files.
              </p>
              <p>
                Get notified on your phone and desktop before the day and on the day, with an email if
                it slips past. Add any reminder to your calendar in one tap. Small dots on groups and
                documents show exactly where something needs your attention.
              </p>
            </div>
            <ul className={styles.timeline} aria-label="When you hear about it">
              <li><Clock size={14} aria-hidden="true" /> Before the day</li>
              <li><Clock size={14} aria-hidden="true" /> On the day</li>
              <li><Clock size={14} aria-hidden="true" /> Email if it slips past</li>
            </ul>
          </div>
          <Shot
            src="/desktop-images/reminder.png"
            alt="NeuVault Reminders: due and upcoming dates found in documents"
            sizes="(min-width: 960px) 560px, calc(100vw - 48px)"
          />
        </div>
      </article>

      {/* 4 */}
      <article className={styles.pillar} id="map">
        <PillarHead n="04" title="Connect the dots." />
        <div className={styles.mapCopy}>
          <div className={styles.block}>
            <h3>NeuVault Vault Map</h3>
            <p>
              Real work comes in clusters, not single files. Pull everything about one project, client,
              course or trip onto one canvas: documents, notes, links and videos. Draw connections
              between them, group and colour them, and read two side by side.
            </p>
          </div>
          <p className={styles.mapSecond}>
            Then ask Nova about the whole map. It can summarize, compare, find what&rsquo;s missing or
            build a timeline, and it only changes your map when you confirm. When it&rsquo;s ready,
            export the whole map and share it with a classmate, client, colleague or family member.
          </p>
        </div>
        <DesktopCarousel slides={mapSlides} label="NeuVault Vault Map" controlsLabel="Vault Map" />
      </article>

      {/* 5 */}
      <article className={styles.pillar} id="more">
        <PillarHead n="05" title="And everything in between" />
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
