export type DemoVideo = {
  title: string;
  summary: string;
  tag: string;
  url: string;
  uploadDate: string;
};

export const demoVideos: DemoVideo[] = [
  {
    title: "Smart Upload Intake",
    summary: "Drop in an existing file and let NeuVault organize key details for you.",
    tag: "Upload",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068982/Smart_Upload_Intake_wzikki.mp4",
    uploadDate: "2026-04-01T18:43:02Z",
  },
  {
    title: "Smart Scan Intake",
    summary: "Scan a physical document and turn it into a clean digital record.",
    tag: "Scan",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068971/smart-scan-intake_wccyli.mp4",
    uploadDate: "2026-04-01T18:42:51Z",
  },
  {
    title: "Smart Note Intake",
    summary: "Capture a quick note and convert it into a structured vault item.",
    tag: "Notes",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068920/Smart_Note_Intake_xamar0.mp4",
    uploadDate: "2026-04-01T18:42:00Z",
  },
  {
    title: "Smart Voice Note Intake",
    summary: "Turn voice into a searchable record that stays linked to the rest of your vault.",
    tag: "Voice",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068925/smart-voice-note-intake_pjddwd.mp4",
    uploadDate: "2026-04-01T18:42:05Z",
  },
  {
    title: "Smart Suggestions",
    summary: "Get context-aware prompts for summaries, reminders, and follow-up actions.",
    tag: "Suggestions",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068927/smart-suggestion_qlgpl4.mp4",
    uploadDate: "2026-04-01T18:42:07Z",
  },
  {
    title: "Document Resurfacing",
    summary: "Bring an important document back when the timing matters again.",
    tag: "Resurface",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068966/document-resurfacing_rb4zrx.mp4",
    uploadDate: "2026-04-01T18:42:46Z",
  },
  {
    title: "Document Linking",
    summary: "Connect related files so one issue can stay together as a usable set.",
    tag: "Links",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068949/document-linking_u4nkyd.mp4",
    uploadDate: "2026-04-01T18:42:29Z",
  },
  {
    title: "Nova Assistant",
    summary: "Ask natural questions and get answers from your vault in seconds.",
    tag: "Assistant",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068919/nova-assistant_lcmhuq.mp4",
    uploadDate: "2026-04-01T18:41:59Z",
  },
  {
    title: "Settings and Backup",
    summary: "Review privacy choices, backup flow, and restore behavior in one place.",
    tag: "Security",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068959/setting-and-backup_w5jfuz.mp4",
    uploadDate: "2026-04-01T18:42:39Z",
  },
  {
    title: "Offline Smart Intake",
    summary: "Capture while offline and process safely when your connection comes back.",
    tag: "Offline",
    url: "https://res.cloudinary.com/dfaiohpa6/video/upload/v1775068887/offline_smart_intake_rmhhc6.mp4",
    uploadDate: "2026-04-01T18:41:27Z",
  },
];

/**
 * Delivery for the Cloudinary demo clips.
 *
 * The originals are 50-100 MB HEVC (`codecs=hvc1`), which Chrome and Firefox
 * will not reliably play and no landing page should ship. Inserting a
 * transformation makes Cloudinary transcode on the fly: `f_auto` drops to
 * H.264 for browsers that need it, and the width cap takes the resurfacing
 * clip from 82.7 MB to 4.8 MB. Nothing needs re-uploading.
 */
function withTransform(url: string, transform: string, extension?: string) {
  const [base, rest] = url.split("/upload/");
  if (!rest) return url;
  const path = extension ? rest.replace(/\.[a-z0-9]+$/i, `.${extension}`) : rest;
  return `${base}/upload/${transform}/${path}`;
}

export type Trim = {
  /** Seconds into the clip to start. */
  start: number;
  /** Seconds into the clip to end. */
  end: number;
};

function trimParams(trim?: Trim) {
  return trim ? `so_${trim.start},eo_${trim.end},` : "";
}

/**
 * A web-deliverable version of a demo clip, capped at `width` px.
 *
 * These recordings run a full minute or more, which reads as motion rather
 * than meaning in a small strip frame. Pass a `trim` to cut one to a single
 * beat — Cloudinary does it on delivery, so no clip has to be re-recorded.
 */
export function demoVideoSrc(url: string, width: number, trim?: Trim) {
  return withTransform(url, `${trimParams(trim)}f_auto,q_auto,w_${width}`);
}

/** A still frame from the clip itself, so the poster always matches the video. */
export function demoPosterSrc(url: string, width: number, trim?: Trim) {
  const at = trim ? `so_${trim.start},` : "";
  return withTransform(url, `${at}w_${width}`, "jpg");
}

export type StripClip = {
  id: string;
  /** Two or three words under the clip. The video carries the rest. */
  label: string;
  /** Absent until the clip is recorded — the frame falls back to `image`. */
  url?: string;
  /** Intrinsic size, which is what gives each frame its width at a shared height. */
  width: number;
  height: number;
  /** Shown when there is no clip yet, and as the poster for one that exists. */
  image?: string;
  /** Cut the clip to one legible moment. Omit to play the whole recording. */
  trim?: Trim;
};

const voiceNote = demoVideos.find((video) => video.title === "Smart Voice Note Intake");
const resurfacing = demoVideos.find((video) => video.title === "Document Resurfacing");

/**
 * The home page strip: one landscape desktop capture beside two portrait phone
 * clips. Same height throughout, so the intrinsic aspect ratios are what make
 * the widths differ. The desktop clip is not recorded yet; until its `url` is
 * filled in, the slot shows `image` at the same size and the layout does not move.
 */
export const stripClips: StripClip[] = [
  {
    id: "map",
    label: "Connect it on a map",
    width: 3456,
    height: 2234,
    image: "/desktop-images/vault-map-overview.png",
  },
  {
    id: "voice",
    label: "Speak it, keep it",
    url: voiceNote?.url,
    width: 720,
    height: 1558,
  },
  {
    id: "dates",
    label: "Dates come back",
    url: resurfacing?.url,
    width: 720,
    height: 1558,
  },
];
