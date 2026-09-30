export type YouTubeVideo = {
  /** The id from the watch URL: youtube.com/watch?v=<id>. Empty until the video is published. */
  id: string;
  title: string;
  /** One sentence under the title. */
  summary: string;
  /** ISO 8601, for the VideoObject structured data. */
  uploadDate: string;
  /** Shown on the thumbnail, e.g. "2:14". */
  duration?: string;
  /** Scale for thumbnails with black side bars baked in (a recording narrower than 16:9). */
  thumbZoom?: number;
};

/**
 * Home page walkthroughs, in page order. Entries without an `id` show as
 * placeholders in development and are left out of production builds, so the
 * section only goes live once a real video is filled in.
 */
export const youtubeVideos: YouTubeVideo[] = [
  {
    // YouTube title: "Notion keeps your files. Obsidian makes you sort them. NeuVault does neither."
    id: "pllDhJnnRt8",
    title: "Meet NeuVault",
    summary: "Five apps to keep your life in order. NeuVault makes it one: save anything, let it sort itself, and get it back when it matters.",
    uploadDate: "2026-09-30T02:47:55-07:00",
    duration: "3:38",
    thumbZoom: 1.15,
  },
  {
    // YouTube title: "The app that organizes itself. Here's the 60-second tour."
    id: "nLAeQd2HmMQ",
    title: "Quick-start guide",
    summary: "How NeuVault organizes itself, in about a minute and a half.",
    uploadDate: "2026-09-27T16:45:35-07:00",
    duration: "1:33",
    thumbZoom: 1.16,
  },
  {
    // YouTube title: "Notion exports a pile of files. NeuVault restores your whole workspace."
    id: "7K_2dVGhj4s",
    title: "Encrypted backup and restore",
    summary: "Back up your whole vault as one encrypted bundle and restore it exactly as you left it.",
    uploadDate: "2026-09-28T16:40:15-07:00",
    duration: "2:27",
    thumbZoom: 1.16,
  },
  {
    // YouTube title: "Your files come to you. Notion and Obsidian can't do this."
    id: "X5NXOh_vrdQ",
    title: "How your vault organizes itself",
    summary: "Files arrive on their own, and Nova sorts them into the right groups.",
    uploadDate: "2026-09-27T17:43:25-07:00",
    duration: "2:06",
    thumbZoom: 1.16,
  },
  {
    // YouTube title: "Notion saves your links. NeuVault files them for you."
    id: "48EyjvDwszo",
    title: "Bookmarks and YouTube links",
    summary: "Save a link once, and Nova summarizes it and files it for you.",
    uploadDate: "2026-09-27T23:13:52-07:00",
    duration: "1:44",
    thumbZoom: 1.16,
  },
  {
    // YouTube title: "Your meeting app gives you a transcript. NeuVault connects it to everything else."
    id: "GI9tpvkWKNk",
    title: "From a recording to a structured note",
    summary: "Record a meeting, get a structured note, and connect it to the rest of your vault.",
    uploadDate: "2026-09-28T15:51:07-07:00",
    duration: "2:02",
    thumbZoom: 1.16,
  },
  {
    // YouTube title: "Your calendar only knows what you type in. NeuVault finds the dates for you."
    id: "W-dSpJ9bl_w",
    title: "Dates that come back to you",
    summary: "Your calendar only knows what you type in. NeuVault finds the dates inside your documents and reminds you before they pass.",
    uploadDate: "2026-09-30T03:34:14-07:00",
    duration: "1:08",
    thumbZoom: 1.15,
  },
  {
    // YouTube title: "Every file for one project, on one canvas. And an AI that's read them all."
    id: "4fkAT0_JKL8",
    title: "Connect related documents on a map",
    summary: "Put everything for one project on one canvas, then ask Nova about all of it.",
    uploadDate: "2026-09-28T16:05:51-07:00",
    duration: "2:23",
    thumbZoom: 1.16,
  },
];

/** What the page actually shows: placeholders only outside production. */
export const visibleYouTubeVideos =
  process.env.NODE_ENV === "production" ? youtubeVideos.filter((video) => video.id) : youtubeVideos;
