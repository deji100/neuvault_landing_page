import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AudioLines, Bell, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, Coins, FileText, Folder, FolderOpen, Globe2, History, Images, Inbox, Info, Link2, LogOut, Mail, MoreHorizontal, Pin, Play, Pause, LoaderCircle, RotateCw, Search, Settings2, Share2, Sparkles, Sun, Upload, X, LockKeyhole, Lightbulb, House, type LucideIcon } from "lucide-react";
import { CAPTURE_TIMELINE as T, TRANSCRIPT_TITLE, RECORDING_FILE } from "./captureTimeline";
import "./DesktopApp.css";
import "./SidebarMotion.css";
import { installIconAnimationSync } from "./sidebarIconSync";
import styles from "./DesktopInterface.module.css";
const AudioNotesDemo = dynamic(() => import("./AudioNotesDemo"));
export type DemoPage = "home" | "queue" | "notes" | "vault";
const ENTERTAINMENT_SUBGROUPS = [
    { title: "Films & Series", count: 12, subgroups: 0, color: "purple" },
    { title: "Music", count: 9, subgroups: 0, color: "pink" },
    { title: "Books & Reviews", count: 8, subgroups: 0, color: "blue" },
    { title: "Games", count: 6, subgroups: 0, color: "green" },
    { title: "Live Events", count: 5, subgroups: 0, color: "orange" },
];
// Fictional populated vault for the product tour. The imported podcast adds
// one subgroup and one document only after Organize with AI completes.
export const GROUPS = [
    { title: "Inbox", count: 26, subgroups: 0, color: "slate" },
    { title: "Business Strategy & Planning", count: 84, subgroups: 11, color: "pink" },
    { title: "Information Management", count: 43, subgroups: 6, color: "blue" },
    { title: "Politics & International Relations", count: 51, subgroups: 7, color: "purple" },
    { title: "Entertainment & Leisure", count: ENTERTAINMENT_SUBGROUPS.reduce((sum, group) => sum + group.count, 0), subgroups: ENTERTAINMENT_SUBGROUPS.length, color: "blue" },
    { title: "Personal & Family", count: 67, subgroups: 8, color: "blue" },
    { title: "Media & Communication", count: 58, subgroups: 6, color: "orange" },
    { title: "Meetings & Events", count: 73, subgroups: 9, color: "green" },
    { title: "Travel & Tourism", count: 36, subgroups: 5, color: "blue" },
    { title: "Travel & Immigration", count: 29, subgroups: 6, color: "purple" },
    { title: "Education & Research", count: 112, subgroups: 8, color: "slate" },
    { title: "Finance & Banking", count: 96, subgroups: 9, color: "pink" },
    { title: "Health & Wellness", count: 64, subgroups: 8, color: "green" },
    { title: "Legal & Compliance", count: 48, subgroups: 7, color: "slate" },
    { title: "Technology & Engineering", count: 126, subgroups: 10, color: "blue" },
    { title: "Creative Ideas", count: 53, subgroups: 7, color: "purple" },
    { title: "Home & Property", count: 69, subgroups: 8, color: "orange" },
    { title: "Career & Learning", count: 82, subgroups: 9, color: "blue" },
    { title: "Shopping & Purchases", count: 44, subgroups: 6, color: "pink" },
    { title: "Sports & Fitness", count: 38, subgroups: 6, color: "green" },
];
const SECTIONS: {
    title: string;
    items: [
        string,
        LucideIcon,
        DemoPage?
    ][];
}[] = [
    { title: "Vault", items: [["Home", House, "home"], ["Vault", Folder, "vault"], ["Vault Map", Link2], ["Note & Voice", FileText, "notes"]] },
    { title: "Intelligence", items: [["Nova", Sparkles], ["Planner", CalendarDays], ["Reminders", Clock3], ["Queue", Upload, "queue"], ["Media Review", Images]] },
    { title: "System", items: [["Alerts", Bell], ["Plans", Coins], ["Settings", Settings2]] },
];
function SidebarRow({ label, Icon, navKey, count = 0, selected = false, onClick, cursor }: {
    label: string; Icon: LucideIcon; navKey?: string; count?: number;
    selected?: boolean; onClick?: () => void; cursor?: string;
}) {
    const Row = onClick ? "button" : "div";
    return <Row type={onClick ? "button" : undefined} className="nv-finder-row" data-nav-key={navKey} data-alerting={count > 0 ? "true" : undefined} data-active={selected ? "true" : "false"} data-cursor={cursor} onClick={onClick} aria-label={onClick ? `Show ${label} in product tour` : undefined}>
        <span className="nv-finder-icon"><Icon/></span>
        <span className="nv-finder-label">{label}</span>
        {count > 0 && <span className={`nv-finder-count ${styles.queueCount}`} data-queue-count={label === "Queue" ? count : undefined} aria-label={`${count} ${label} items`}>{count}</span>}
        {selected && <span className={`nv-finder-active-marker ${styles.navMarker}`} data-visible="true"/>}
    </Row>;
}

export function DesktopSidebar({ page, onNavigate, queueCount = 0, onOpenPlanner, active = false }: {
    active?: boolean;
    page: DemoPage | "planner";
    onNavigate?: (page: DemoPage) => void;
    queueCount?: number;
    onOpenPlanner?: () => void;
}) {
    useEffect(() => { installIconAnimationSync(); }, []);
    return <aside data-demo-active={active} className={`desktop-sidebar-layout nv-finder-sidebar ${styles.sidebar}`}><div className="nv-finder-sidebar-scroll">
        <div className="nv-finder-brand-row"><div className="nv-finder-brand"><span className="nv-finder-brand-icon"><Image src="/desktop-images/app-logo.png" alt="" width={29} height={29}/></span><span className="nv-finder-brand-copy"><small>NEUVAULT</small><strong>Alex</strong></span></div><span className={styles.themeButton}><Sun size={19}/></span></div>
        <SidebarRow label="Recent Activity" Icon={History}/>
        <SidebarRow label="Pinned docs" Icon={Pin} navKey="pinned-docs" count={1}/>
        <SidebarRow label="Search" Icon={Search}/>
        <SidebarRow label="Share" Icon={Share2}/>
        <nav className="nv-finder-navigation" aria-label="Desktop tour navigation">{SECTIONS.map(section => <section className="nv-finder-section" key={section.title}><h2>{section.title}</h2><div className="nv-finder-list">{section.items.map(([label, Icon, target]) => {
            const navKey = ({ "Reminders": "smart-suggestions", "Queue": "vault-queue", "Alerts": "notifications", "Planner": "planner", "Media Review": "media-review" } as Record<string,string>)[label] ?? target;
            const count = label === "Queue" ? queueCount : label === "Reminders" ? 4 : label === "Alerts" ? 2 : label === "Planner" ? 1 : 0;
            const selected = label === "Planner" ? page === "planner" : page === target;
            const onClick = label === "Planner" ? onOpenPlanner : target && onNavigate ? () => onNavigate(target) : undefined;
            return <SidebarRow key={label} label={label} Icon={Icon} navKey={navKey} count={count} selected={selected} onClick={onClick} cursor={label === "Planner" && onOpenPlanner ? "nav-planner" : target && onNavigate ? `nav-${target}` : undefined}/>;
        })}</div></section>)}</nav>
        <div className="nv-finder-footer"><SidebarRow label="Help" Icon={CircleHelp}/><SidebarRow label="Build with us" Icon={Lightbulb}/><SidebarRow label="Sign out" Icon={LogOut}/></div>
    </div></aside>;
}
function HomePage({ time }: {
    time: number;
}) {
    return <div className={`nv-dashboard-page ${styles.home}`}>
    <header className="nv-dashboard-header"><div className="nv-dashboard-greeting"><h1>Good afternoon, Alex</h1><p>Your private vault is ready.</p></div><div className="nv-dashboard-actions"><span className={styles.infoButton}><Info size={19}/></span><span className="nv-dashboard-notifications"><Bell size={20}/></span></div></header>
    <main className="nv-dashboard-main"><div className="nv-dashboard-dropzone-frame"><section className="nv-dashboard-dropzone" data-cursor="home-drop">
      <div className="nv-home-features"><div className="nv-home-feature-scene"><div className="nv-home-feature-art"><span className="nv-home-feature-halo"/><span className="nv-home-feature-trail"/><div className="nv-home-feature-icon"><FolderOpen /></div><span className="nv-home-feature-companion"><FileText /></span><i className="nv-home-feature-dot dot-one"/><i className="nv-home-feature-dot dot-two"/></div><div className="nv-home-feature-copy"><span className="nv-home-feature-label">Auto-import</span><h2>Import new files automatically.</h2><p>Choose folders on your computer. Files arrive in your vault.</p></div></div><div className="nv-home-feature-controls"><ChevronLeft size={16}/>{Array.from({ length: 12 }, (_, i) => <span className={`${styles.reelDot} ${i === 2 ? styles.reelActive : ""}`} key={i}/>)}<ChevronRight size={16}/></div></div>
      <p className="nv-dashboard-drop-copy"><strong>Drag and drop</strong> files, scans, or audio anywhere in this area</p>
      <div className="nv-dashboard-intake-buttons"><div className="nv-dashboard-primary"><Upload /><span>Import files or scans</span></div><span className="nv-dashboard-link-button"><Globe2 /></span></div>
      <div className="nv-dashboard-quick-actions"><div data-cursor="auto-open"><RotateCw /><span><strong>Set up auto-import</strong><small>Add new files from folders automatically</small></span></div><div><Mail /><span><strong>Import from email</strong><small>Connect and review email imports</small></span></div><div><AudioLines /><span><strong>Import audio for transcription</strong><small>Choose one or more audio files</small></span></div></div>
      <div className="nv-dashboard-private-pill"><LockKeyhole /><span>Your vault is private and local</span></div>
      {time >= 6500 && <p className="nv-dashboard-message">{RECORDING_FILE} added from Podcasts.</p>}
    </section></div><div className="nv-dashboard-privacy-note"><LockKeyhole /><p><strong>Everything stays private and local.</strong><span>You’re in control of your data, always.</span></p></div></main>
    {time >= T.autoImportOpen && time < T.audioImported && <AutoImportPanel />}
  </div>;
}
function AutoImportPanel() { return <div className={styles.autoLayer}><div className="nv-auto-ingestion-backdrop"/><section className={`nv-auto-ingestion-modal ${styles.autoModal}`}><header className="nv-auto-ingestion-header"><div><p className="nv-auto-ingestion-eyebrow">Automatic file import</p><h2>Automatically add files from folders</h2><p className="nv-auto-ingestion-description">Choose folders to watch and decide how new files are saved.</p></div><div className="nv-auto-ingestion-header-actions"><Info size={20}/><X size={20}/></div></header><div className={styles.autoBody}><div className="nv-auto-ingestion-grid"><section className="nv-auto-ingestion-panel nv-auto-ingestion-watch-panel"><div className="nv-auto-ingestion-panel-heading"><span className="nv-auto-ingestion-heading-icon"><FolderOpen /></span><div><h3>Auto-import folders</h3><p>NeuVault adds new files you put in these folders.</p></div></div><div className="nv-auto-ingestion-dropzone"><FolderOpen /><span><strong>Drop a folder here</strong><small>or click to browse</small></span></div><div className="nv-auto-ingestion-folders"><div className="nv-auto-ingestion-list-heading"><h4>Watched folders</h4><span>1 folder</span></div><div className="nv-auto-ingestion-folder-row" data-cursor="auto-folder"><span className="nv-auto-ingestion-folder-icon"><FolderOpen /></span><span className="nv-auto-ingestion-folder-copy"><strong>Podcasts</strong><small>~/Documents/Podcasts</small><small className="nv-auto-ingestion-folder-usage">No files organized with AI this month</small></span><span className="nv-auto-ingestion-pause">Pause</span><span className="nv-auto-ingestion-remove">Remove</span></div></div><div className="nv-auto-ingestion-processing"><div className="nv-auto-ingestion-processing-head"><strong>New files</strong><small>Organized with AI in the background. Uses credits.</small></div><div className="nv-auto-ingestion-processing-options"><button tabIndex={-1} type="button" data-on="true" data-cursor="auto-ai"><Sparkles /><span>Organize with AI</span></button><button tabIndex={-1} type="button" data-on="false"><Inbox /><span>Save to Inbox</span></button></div><small className="nv-auto-ingestion-processing-note">Audio goes to Media Review. Videos go to Inbox.</small></div><div className="nv-auto-ingestion-types"><h4>Supported files</h4><div>{["MP3", "WAV", "M4A", "PDF", "Word", "Text", "Markdown", "+ more"].map(x => <span key={x}>{x}</span>)}</div></div><p className="nv-auto-ingestion-recursive">Subfolders are included automatically.</p></section><section className="nv-auto-ingestion-panel nv-auto-ingestion-how-panel"><p className="nv-auto-ingestion-panel-label">How it works</p><div className="nv-auto-ingestion-steps">{[["1. Watch", "Choose folders on this device."], ["2. Import", "New supported files are added automatically."], ["3. Organize", "Choose Save to Inbox or Organize with AI under New files. Only AI processing uses credits."]].map(([title, copy], i) => <div className="nv-auto-ingestion-step" key={title}><span>{i === 0 ? <FolderOpen /> : i === 1 ? <FileText /> : <Sparkles />}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div><div className="nv-auto-ingestion-private"><LockKeyhole /><div><h3>Private by default</h3><p>Your folders stay on your device. NeuVault only processes the files you choose to import.</p></div></div></section></div></div><footer className="nv-auto-ingestion-footer"><button type="button" tabIndex={-1}>Cancel</button><button type="button" tabIndex={-1} data-cursor="auto-done">Done</button></footer></section></div>; }
function QueuePage({ time, onOpenEditor, onAudioInteract }: { time: number; onOpenEditor: () => void; onAudioInteract: () => void }) {
    const progress = Math.min(95, 65 + (time - T.queueStart) / (T.notesStart - T.queueStart) * 30);
    const audio = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false), [showNotice, setShowNotice] = useState(true), [currentTime, setCurrentTime] = useState(0);
    useEffect(() => { const element = audio.current; return () => element?.pause(); }, []);
    const toggleAudio = () => {
        onAudioInteract();
        if (!audio.current) return;
        if (audio.current.paused) void audio.current.play().catch(() => setPlaying(false)); else audio.current.pause();
    };
    return <div className={`desktop-queue-page desktop-dashboard-page ${styles.queuePage}`}>
        <audio ref={audio} src="/desktop-tour-media/audio/kate-casey-uconn.mp3" preload="none" onTimeUpdate={() => setCurrentTime(audio.current?.currentTime ?? 0)} onEnded={() => setPlaying(false)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}/>
        <header className={styles.pageHeader}><div><h1>Queue</h1><p>Monitor files as they move into your vault.</p></div></header>
        {showNotice && <aside className={`nv-global-review-toast ${styles.transcriptNotice}`} role="status"><span className={styles.noticeIcon}><AudioLines/></span><div><strong>Finishing your transcript</strong><small>{TRANSCRIPT_TITLE}</small></div><button type="button" onClick={onOpenEditor}>Open editor</button><button type="button" aria-label="Dismiss transcription notification" onClick={() => setShowNotice(false)}><X size={16}/></button></aside>}
        <div className={styles.filters}>{["All", "Active", "Failed", "Completed"].map((label, i) => <span className={i === 0 ? styles.filterActive : ""} key={label}>{label}<small>{i < 2 ? 1 : 0}</small></span>)}</div>
        <div className={styles.queueColumns}>
            <section className={styles.queueSection}><div className={styles.queueSectionTitle}><span>Processing</span><small>1 ITEM</small></div>
                <article className={`desktop-queue-item desktop-dashboard-row ${styles.queueItem}`}>
                    <div className={styles.queueItemHead}><div className={styles.queueItemTitle}><h2>{RECORDING_FILE}</h2><span>PROCESSING</span></div><div className={styles.queueItemActions}><button type="button" onClick={toggleAudio}>{playing ? <Pause size={14}/> : <Play size={14}/>}{playing ? "Pause audio" : "Play audio"}</button><button type="button" data-cursor="queue-open-editor" onClick={onOpenEditor}>Open editor</button></div></div>
                    <p>Transcript captured. Organizing your notes.</p><small>VAULT QUEUE ADDED JUST NOW</small><p className={styles.filePath}>~/Documents/Podcasts/{RECORDING_FILE}</p>
                    <div className={styles.progressTrack}><span style={{ width: `${progress}%` }}/></div><div className={styles.progressLabels}><span><LoaderCircle size={14}/>Transcript captured. Organizing your notes.</span></div><footer className={styles.queueTags}>MP3 <span>AUDIO</span></footer>
                </article>
            </section>
            <aside className={`desktop-queue-side-card desktop-dashboard-card ${styles.queueStatus}`}><div><small>QUEUE STATUS</small><Sparkles size={20}/></div><h2>Healthy</h2><p>Files are being uploaded and processed.</p><p>Nothing is blocked right now.</p><div className={styles.queueStatusActions}><button disabled>Retry failed</button><button disabled>Clear completed</button></div></aside>
        </div>
        <aside className={styles.queueMiniPlayer} aria-label="Queue audio player"><AudioLines size={15}/><button type="button" onClick={toggleAudio} aria-label={playing ? "Pause queue audio" : "Play queue audio"}>{playing ? <Pause size={16}/> : <Play size={16}/>}</button><span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, "0")}</span><FileText size={14}/><ChevronDown size={14}/></aside>
    </div>;
}
function VaultPage({ time, seekTour, seekVersion }: { time: number; seekTour: (time: number, resume?: boolean, preserveAudio?: boolean) => void; seekVersion: number }) {
    const organized = time >= T.noteComplete;
    const [browse, setBrowse] = useState<{ time: number; version: number; location: "root" | "entertainment" } | null>(null);
    const viewport = useRef<HTMLDivElement>(null);
    const scriptedLocation = time >= T.podcastsOpen ? "podcasts" : time >= T.entertainmentOpen ? "entertainment" : "root";
    const location = browse?.time === time && browse.version === seekVersion ? browse.location : scriptedLocation;
    const inEntertainment = location === "entertainment", inPodcasts = location === "podcasts";
    useEffect(() => { viewport.current?.scrollTo({ top: 0, behavior: "instant" }); }, [location, seekVersion]);
    const title = inPodcasts ? "Podcasts" : inEntertainment ? "Entertainment & Leisure" : "";
    const openEntertainment = () => {
        if (organized) seekTour(T.entertainmentOpen, true, true);
        else { setBrowse({ time, version: seekVersion, location: "entertainment" }); seekTour(time, false, true); }
    };
    const back = () => {
        if (organized) seekTour(inPodcasts ? T.entertainmentOpen : T.vaultStart, false, true);
        else { setBrowse({ time, version: seekVersion, location: "root" }); seekTour(time, false, true); }
    };
    const folder = (group: typeof GROUPS[number], index: number, kind: "group" | "subgroup" | "podcasts" = "group") => {
        const isInbox = kind === "group" && group.title === "Inbox";
        const open = kind === "podcasts" ? () => seekTour(T.podcastsOpen, true, true) : kind === "group" && group.title === "Entertainment & Leisure" ? openEntertainment : undefined;
        return <article className={`desktop-vault-folder-card is-compact ${styles.groupCard}`} data-cursor={kind === "podcasts" ? "podcasts-folder" : kind === "group" ? group.title === "Entertainment & Leisure" ? "group-1" : isInbox ? "group-0" : `group-${index + 2}` : undefined} data-group-title={group.title} key={group.title} role={open ? "button" : undefined} tabIndex={open ? 0 : undefined} onClick={open} onKeyDown={event => { if (open && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); open(); } }}>
            {isInbox ? <span className={`nv-inbox-count-badge ${styles.inboxCount}`}>{group.count}</span> : <span className={styles.folderMenu}><MoreHorizontal size={19}/></span>}
            <div className="desktop-vault-folder-card-content"><div className="desktop-vault-folder-art" data-folder-color={group.color}><span className="desktop-vault-folder-tab"/><span className="desktop-vault-folder-back"/><span className="desktop-vault-folder-front"/>{isInbox && <span className="nv-inbox-folder-glyph"><Inbox/></span>}</div><h3 title={group.title}>{group.title}</h3><p>{isInbox ? `${group.count} items ready to organize` : kind !== "group" ? `${group.count} document${group.count === 1 ? "" : "s"}` : <>{group.subgroups} subgroup{group.subgroups === 1 ? "" : "s"}<span>•</span>{group.count} doc{group.count === 1 ? "" : "s"}</>}</p></div>
        </article>;
    };
    const populatedGroups = GROUPS.map(group => group.title === "Entertainment & Leisure" && organized ? { ...group, count: group.count + 1, subgroups: group.subgroups + 1 } : group);
    const groups = organized ? [
        ...populatedGroups.filter(group => group.title === "Inbox"),
        ...populatedGroups.filter(group => group.title === "Entertainment & Leisure"),
        ...populatedGroups.filter(group => group.title !== "Inbox" && group.title !== "Entertainment & Leisure"),
    ] : populatedGroups;
    return <div ref={viewport} className={`desktop-vault-page ${styles.mapsPage}`} data-vault-location={location} data-vault-organized={organized}>
        <header className={styles.mapHeader}>{title ? <div className={styles.vaultTitleRow}><h1>{title}</h1><button type="button" onClick={back}><ChevronLeft size={17}/>Back</button></div> : <p>Browse your files by group.</p>}
            <div className={styles.mapToolbar}><div><Search size={17}/><span>{inPodcasts ? "Search documents" : inEntertainment ? "Search subgroups or document titles" : "Search groups or document titles"}</span><X size={14}/></div><span className={styles.segment}><strong>Grid</strong><span>List</span></span><span className={styles.sort}>Newest first<ChevronDown size={15}/></span>{inPodcasts ? <><span className={styles.sort}>Document type<ChevronDown size={15}/></span><span className={styles.sort}>Any time<ChevronDown size={15}/></span></> : <span className={styles.infoButton}><Info size={18}/></span>}</div>
        </header>
        <div className={styles.groupGrid}>{inPodcasts ? <button type="button" className={styles.transcriptFile} data-cursor="transcript-file" onClick={() => seekTour(T.documentOpen, true, true)}><div><span className={styles.documentInfo}><Info size={17}/></span><Image src="/desktop-tour/vault-map/markdown.png" alt="Markdown document" width={74} height={86}/></div><h2>{TRANSCRIPT_TITLE}</h2></button> : inEntertainment ? <>{organized && folder({ title: "Podcasts", count: 1, subgroups: 0, color: "blue" }, 0, "podcasts")}{ENTERTAINMENT_SUBGROUPS.map((group, index) => folder(group, index, "subgroup"))}</> : groups.map((group, index) => folder(group, index))}</div>
    </div>;
}
export default function DesktopInterface({ page, time, reduced, onNavigate, audioActive, audioVisible, onAudioInteract, seekTour, audioSeekVersion }: {
    page: DemoPage;
    time: number;
    reduced: boolean;
    onNavigate: (page: DemoPage) => void;
    audioActive: boolean;
    audioVisible: boolean;
    onAudioInteract: () => void;
    seekTour: (time: number, resume?: boolean, preserveAudio?: boolean) => void;
    audioSeekVersion: number;
}) {
    const queueCount = (time >= T.audioImported && time < T.summaryReady) || (time >= T.noteSaved && time < T.noteComplete) ? 1 : 0;
    return <div className={`updv-dark ${styles.shell}`} data-demo-page={page}><DesktopSidebar page={page} onNavigate={onNavigate} queueCount={queueCount} active={audioActive}/><div className={styles.page}>{page === "home" ? <HomePage time={time}/> : page === "queue" ? <QueuePage time={time} onOpenEditor={() => seekTour(T.notesStart, true)} onAudioInteract={onAudioInteract}/> : <div className="audio-native-scope"><AudioNotesDemo time={time} page={page} vaultContent={<VaultPage time={time} seekTour={seekTour} seekVersion={audioSeekVersion}/>} seekVersion={audioSeekVersion} active={audioActive} visible={audioVisible} reduced={reduced} onInteract={onAudioInteract} seekTour={seekTour}/></div>}</div></div>;
}
