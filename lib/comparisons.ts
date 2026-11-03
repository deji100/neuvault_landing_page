import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebPageJsonLd, type SeoFaq } from "@/lib/seo";

/**
 * NeuVault vs <app> pages under /compare. One entry per alternative; the
 * index lists them and /compare/<slug> renders the full comparison.
 *
 * Competitor facts carry the date they were checked (`factsCheckedOn`); recheck
 * them against the linked sources before changing a page, and bump the date.
 * Paragraphs may contain inline links written as [label](https://url).
 */

/** One row of a two-column table: the alternative on the left, NeuVault on the right. */
export type CompareRow = {
  label: string;
  them: string;
  us: string;
};

export type ComparePoint = {
  title: string;
  body: string;
};

export type CompareSection = {
  id: string;
  title: string;
  lede: string;
  paragraphs: string[];
};

export type CompareSource = {
  label: string;
  url: string;
};

export type ComparisonPage = {
  slug: string;
  competitor: string;
  /** One line for the index card. */
  competitorSummary: string;
  /** Accent for the competitor's side of the page. */
  tone: string;
  metaTitle: string;
  metaDescription?: string;
  description: string;
  headline: string;
  subheadline: string;
  intro: string;
  /** "The short version" above the glance table. */
  verdict: string;
  glance: CompareRow[];
  theirStrengths: {
    lede: string;
    points: ComparePoint[];
    closing: string;
  };
  ourDifferences: {
    lede: string;
    points: ComparePoint[];
  };
  deepDives: CompareSection[];
  pricing: {
    lede: string;
    rows: CompareRow[];
    footnote: string;
  };
  choose: {
    lede: string;
    them: string[];
    us: string[];
    both: string;
  };
  closing: string;
  faqs: SeoFaq[];
  sources: CompareSource[];
  /** ISO date; shown on the page and used as dateModified. */
  factsCheckedOn: string;
};

export const comparisonPages: ComparisonPage[] = [
  {
    slug: "notion",
    competitor: "Notion",
    competitorSummary: "A flexible workspace you build yourself, in Notion's cloud.",
    tone: "#1d1d1f",
    metaTitle: "NeuVault vs Notion: Local-First Notes & Plans",
    metaDescription: "Compare NeuVault with Notion. Explore NeuVault’s local-first notes, files, and Planner, with offline editing, task sync, and online AI assistance.",
    description:
      "Notion gives you building blocks. NeuVault organizes your notes for you, finds the dates inside them, and keeps everything on your device.",
    headline: "NeuVault vs Notion",
    subheadline: "Notion is a flexible workspace you build yourself. NeuVault organizes your notes for you, privately, on your device.",
    intro:
      "Notion is one of the most popular productivity tools in the world, and for good reason. But if you spend more time building your system than using it, or you'd rather your notes didn't live on someone else's servers, NeuVault takes a different approach. Here's an honest look at how the two compare, and which one fits you.",
    verdict:
      "Notion is built for teams and for people who enjoy designing their own system. NeuVault is built for individuals who want their notes organized for them and kept on their own device.",
    glance: [
      {
        label: "Best for",
        them: "Teams, and people who like building custom pages and databases",
        us: "Individuals who want notes, files, scans and dates organized for them, privately",
      },
      {
        label: "Where your notes live",
        them: "Notion's cloud, hosted on Amazon Web Services",
        us: "On your device; your files aren't kept on NeuVault's servers",
      },
      {
        label: "Working offline",
        them: "Pages you mark \"Available offline\" in the desktop and mobile apps, per device",
        us: "Your whole vault opens offline; AI features need a connection",
      },
      {
        label: "Organizing",
        them: "You design pages, databases and templates",
        us: "Nova summarizes, tags and sorts what you save into groups",
      },
      {
        label: "AI output",
        them: "Notion AI writing, summaries and answers across your workspace; full access on Business and Enterprise",
        us: "A summary, title, tags and group for everything you save; recordings also get an overview, key points, action items and a transcript",
      },
      {
        label: "Reminders",
        them: "Set manually with @remind or a date property",
        us: "Finds dates inside your notes, documents, scans and recordings, or set your own",
      },
      {
        label: "Seeing how things connect",
        them: "Linked pages and database relations",
        us: "Vault Map: one visual canvas per project, course or trip",
      },
      {
        label: "Meeting notes",
        them: "AI Meeting Notes on Business and Enterprise plans",
        us: "Record or upload: overview, key points, action items and full transcript, on every paid plan and the free trial (uses credits)",
      },
      {
        label: "Team collaboration",
        them: "Real-time editing, comments, permissions",
        us: "Not yet; you can export and share a Vault Map as a package",
      },
      {
        label: "Backup",
        them: "Managed by Notion in its cloud",
        us: "One encrypted backup file, opened only by your Recovery Key, saved where you choose",
      },
      {
        label: "Apps",
        them: "Web, Mac, Windows, iPhone, Android",
        us: "Mac, Windows, iPhone, Android (no web app)",
      },
      {
        label: "Price",
        them: "Free; Plus $10; Business $20 with full Notion AI (per member, per month, billed annually)",
        us: "Free to start with 500 credits; paid plans from $4.99 a month",
      },
    ],
    theirStrengths: {
      lede: "Notion is the better choice for teams, and for anyone who wants to build exactly the system they imagine.",
      points: [
        {
          title: "Flexibility",
          body: "Pages, databases, boards, calendars and templates can be combined into almost anything: a wiki, a CRM, a content calendar, a habit tracker.",
        },
        {
          title: "Team collaboration",
          body: "Several people can edit the same page at once, comment, assign tasks and control who sees what.",
        },
        {
          title: "A huge ecosystem",
          body: "Thousands of templates, integrations and community guides, built up over almost a decade.",
        },
        {
          title: "A web app",
          body: "Notion works in any browser, so you can use it on a computer where you can't install apps.",
        },
        {
          title: "A generous free plan",
          body: "The Free plan covers a lot for individuals, and the Plus plan is free for students and educators.",
        },
      ],
      closing: "If those are what you need most, Notion is hard to beat, and we'd recommend it.",
    },
    ourDifferences: {
      lede: "Notion gives you building blocks. NeuVault does the organizing for you, starting from your notes.",
      points: [
        {
          title: "It organizes itself",
          body: "In Notion, you decide where everything goes and build the structure first. In NeuVault, you write a note or save a file, and Nova summarizes it, tags it and sorts it into the right group. While you write, connect a note to the scans, PDFs, links and recordings it belongs with. Anything saved without AI waits in your Inbox until you're ready.",
        },
        {
          title: "It finds the dates for you",
          body: "Notion reminds you when you set a reminder yourself. NeuVault reads the notes, documents, scans and recordings you organize and finds the dates inside them, like a lease renewal, a payment deadline or an exam. You can be reminded a month before, two weeks before and on the day, or set your own reminder on anything.",
        },
        {
          title: "Everything for one project, on one canvas",
          body: "Vault Map puts a project, client, course or trip on a single canvas: your notes, PDFs, recordings, links and videos, grouped and connected with labeled links. Open any two cards side by side, ask Nova about the whole map, or set a weekly, monthly or yearly reminder for a group.",
        },
        {
          title: "Capture from anywhere",
          body: "Save from any app's share menu on your phone, including social apps like TikTok, Instagram and YouTube, or with the Save to NeuVault extension for Chrome, Edge and Firefox. Share files straight from WhatsApp, connect Gmail or Microsoft 365 and choose what comes in, or watch a folder on your computer. On your phone, scan a stack of pages in one go and keep them together as one document.",
        },
        {
          title: "Voice and meetings become notes",
          body: "Record a meeting or voice note, or upload one, and get back an overview, key points, action items and the full transcript, with speakers labeled. The transcript scrolls along as the audio plays.",
        },
      ],
    },
    deepDives: [
      {
        id: "privacy",
        title: "Privacy, offline and where your notes live",
        lede: "The biggest difference is where your notes live: in Notion's cloud, or on your own device.",
        paragraphs: [
          "Notion stores your workspace in its cloud, hosted on Amazon Web Services, encrypted at rest with AES-256 and in transit with TLS 1.2 or higher ([Notion security practices](https://www.notion.com/help/security-and-privacy)). That's what makes real-time collaboration possible. Notion also works offline, but you mark each page \"Available offline\" on each device, and sub-pages need marking individually; paid plans also download your recent and favorited pages automatically ([Notion offline guide](https://www.notion.com/help/use-pages-offline)).",
          "NeuVault keeps your vault on your device, so your files aren't kept on our servers and the whole vault opens without internet: notes, files, scans, recordings, search and backup. AI features (organizing, transcription and Nova) and signing in need a connection. When you use AI, the content you choose is sent to our AI provider to be processed; NeuVault doesn't store it, and it's never used to train AI models. Our provider may keep processing logs for up to 30 days for safety monitoring, then deletes them ([NeuVault privacy policy](/privacy-policy)).",
          "Your backup is one encrypted file, saved wherever you choose: Google Drive, iCloud, OneDrive, Dropbox, a USB drive or your own device. Only your Recovery Key opens it, and it restores on any of your devices. NeuVault's servers aren't involved.",
        ],
      },
      {
        id: "ai",
        title: "AI and meeting notes",
        lede: "Both apps can turn meetings into notes; the difference is which plan you need and what happens to the note afterwards.",
        paragraphs: [
          "Notion: full Notion AI, including Notion Agent and AI Meeting Notes, is included on the Business plan ($20 per member per month, billed annually) and Enterprise; Free and Plus get a trial of Notion AI ([Notion pricing](https://www.notion.com/pricing)). AI Meeting Notes needs the Business or Enterprise plan; you start it by typing /meet on a page, and the desktop app can label speakers ([Notion AI Meeting Notes](https://www.notion.com/help/ai-meeting-notes)).",
          "NeuVault: every paid plan includes every feature, including meeting and voice transcription, Nova and AI organizing. AI use draws on credits: you start with 500 free credits for 14 days, and paid plans add 2,000 to 8,000 each month. A recording becomes an overview, key points, action items and a full transcript with speakers labeled, then sits in your vault next to the files, links and reminders it relates to. Transcription works in many languages, so you can record in the language you speak.",
          "Asking questions: Notion Agent answers across your workspace on Business and Enterprise. Nova answers from your own vault, and can read a whole Vault Map, then summarize, compare or draft a document, adding it only when you confirm.",
        ],
      },
    ],
    pricing: {
      lede: "For one person who wants full AI, NeuVault starts at $4.99 a month; Notion's full AI starts at $20 per member a month on the Business plan.",
      rows: [
        {
          label: "Free",
          them: "$0, with a trial of Notion AI",
          us: "Explorer: 500 credits for 14 days, with every feature; your vault stays usable afterwards",
        },
        {
          label: "Entry paid plan",
          them: "Plus: $10 per member per month, with a trial of Notion AI",
          us: "Starter: $4.99 a month, 2,000 credits a month, every feature",
        },
        {
          label: "Plan with full AI",
          them: "Business: $20 per member per month",
          us: "Every paid plan: $4.99 to $19.99 a month, or $200 a year for Premium Annual",
        },
        {
          label: "How you pay",
          them: "Per member, per month (annual billing prices shown)",
          us: "Per person; credits refresh monthly and storage never uses credits",
        },
        {
          label: "Students",
          them: "Plus plan free for students and educators (one member)",
          us: "Same plans for everyone",
        },
      ],
      footnote:
        "Notion's prices are per member on annual billing; monthly billing costs more. NeuVault's prices are in US dollars and app-store pricing may vary by region.",
    },
    choose: {
      lede: "Pick by how you work: alone and private, or together in the cloud.",
      them: [
        "Work with a team that edits the same pages in real time",
        "Enjoy building your own databases, dashboards and templates",
        "Need a web app you can open in any browser",
        "Want a large library of templates and integrations",
      ],
      us: [
        "Want your notes, files and recordings organized for you, without setting up a system",
        "Lose track of due dates hidden in documents, scans and notes",
        "Want to see everything for one project, course or trip on one canvas",
        "Prefer your notes on your own device, with backups only you can open",
        "Want meeting and voice notes without paying for a team plan",
      ],
      both: "You can also use both: Notion for team work, NeuVault for your personal notes and important documents.",
    },
    closing: "Save it once. Find it when it matters. Keep it yours.",
    faqs: [
      {
        question: "Is NeuVault a Notion replacement?",
        answer:
          "For personal notes, documents and reminders, yes. For team wikis, shared databases and real-time collaboration, Notion is the better fit today.",
      },
      {
        question: "Can I use NeuVault with my team?",
        answer:
          "Not in real time yet. You can export a Vault Map, or just the groups you choose, as one package with every card, document and file, and share it with people you trust. Team collaboration is on our roadmap, shaped by what users ask for.",
      },
      {
        question: "Does NeuVault work offline?",
        answer:
          "Yes. Your whole vault lives on your device, so notes, files, scans, recordings, search and backup work without internet. AI features need a connection.",
      },
      {
        question: "Do I need to set anything up?",
        answer: "No templates or databases to build. Save something, and Nova summarizes, tags and files it into the right group.",
      },
      {
        question: "What happens if I lose my phone or computer?",
        answer:
          "Restore your encrypted backup on any of your devices with your Recovery Key. Keep the key somewhere safe: only you hold it.",
      },
      {
        question: "Which devices does NeuVault run on?",
        answer:
          "Mac, Windows, iPhone and Android. There's no web app; on a computer you can save pages with the Save to NeuVault extension for Chrome, Edge and Firefox, or from the Share button in Safari on a Mac.",
      },
      {
        question: "Is NeuVault free?",
        answer:
          "You start with 500 free credits for 14 days, with every feature available, and your vault stays usable afterwards. After the trial, AI features need a paid plan, from $4.99 a month; storage never uses credits.",
      },
    ],
    sources: [
      { label: "Notion pricing", url: "https://www.notion.com/pricing" },
      { label: "Notion security practices", url: "https://www.notion.com/help/security-and-privacy" },
      { label: "Notion offline guide", url: "https://www.notion.com/help/use-pages-offline" },
      { label: "Notion AI Meeting Notes", url: "https://www.notion.com/help/ai-meeting-notes" },
      { label: "Notion reminders", url: "https://www.notion.com/help/reminders" },
      { label: "NeuVault pricing", url: "/pricing" },
      { label: "NeuVault privacy policy", url: "/privacy-policy" },
    ],
    factsCheckedOn: "2026-10-27",
  },
  {
    slug: "hynote",
    competitor: "HyNote",
    competitorSummary: "Turns recordings and files into summaries, synced through HyNote's cloud.",
    tone: "#1d1d1f",
    metaTitle: "NeuVault vs HyNote: Local-First Notes & Plans",
    metaDescription: "Compare NeuVault with HyNote. Explore NeuVault’s local-first notes, files, and Planner, with offline editing, task sync, and online AI assistance.",
    description:
      "HyNote turns recordings and files into summaries. NeuVault connects your notes to everything around them, finds the dates inside, and keeps it on your device.",
    headline: "NeuVault vs HyNote",
    subheadline:
      "HyNote turns any recording or file into a summary. NeuVault connects each note to everything it belongs with, and reminds you when it matters.",
    intro:
      "HyNote and NeuVault both capture meetings, voice notes, PDFs, web pages and YouTube links, and both use AI to make sense of them. The difference is what happens next, and where your notes live. Here's an honest comparison to help you choose.",
    verdict:
      "HyNote is strongest at turning recordings and files into summaries, study material and exports. NeuVault is strongest at connecting your notes, finding the dates inside them and keeping them on your device.",
    glance: [
      {
        label: "Best for",
        them: "Summarizing meetings, lectures and files fast, with templates and study tools",
        us: "Keeping notes, files, scans and dates connected and organized, privately",
      },
      {
        label: "Where your notes live",
        them: "HyNote's cloud on Google Cloud Platform, synced across devices; the Mac app can keep notes \"On This Mac\"",
        us: "On your device; your files aren't kept on NeuVault's servers",
      },
      {
        label: "Sync",
        them: "Real-time sync across web, iPhone, Android, iPad, Apple Watch and Chrome",
        us: "No cloud sync; move your vault with an encrypted backup",
      },
      {
        label: "Capture",
        them: "Audio, video, PDFs, images (OCR), YouTube, web pages, phone calls, Apple Watch",
        us: "Share from any app on your phone, including social apps and WhatsApp, or save pages from your browser; plus notes, voice, meetings, documents, scans, Gmail and Microsoft 365, and watched folders. Organize with AI on the spot, or save to your Inbox for later",
      },
      {
        label: "AI output",
        them: "Summaries, key points, action items, 30+ templates, quizzes, flashcards, slides, podcasts",
        us: "A summary, title, tags and group for everything you save; recordings also get an overview, key points, action items and a transcript",
      },
      {
        label: "Languages",
        them: "Transcription in 50+ languages, with translation",
        us: "Transcription works in many languages; the overview and key points stay in the language you spoke",
      },
      {
        label: "Reminders",
        them: "To-do lists and Google or Apple Calendar sync",
        us: "Finds dates inside notes, documents, scans and recordings, or set your own",
      },
      {
        label: "Connecting information",
        them: "Tags, folders, chat with all notes, and an AI mind map generator",
        us: "Vault Map: one visual canvas per project, course or trip, built from your own items",
      },
      {
        label: "Apps",
        them: "Web, iPhone, iPad, Android, Mac, Apple Watch, Chrome extension",
        us: "Mac, Windows, iPhone, Android; browser extension for Chrome, Edge and Firefox",
      },
      {
        label: "Price",
        them: "Free plan; paid from $79.99 a year or $11.99 a month",
        us: "Free to start with 500 credits; paid from $4.99 a month",
      },
    ],
    theirStrengths: {
      lede: "HyNote is the better choice if you mainly want fast summaries and ready-made outputs from recordings and files, synced to every device.",
      points: [
        {
          title: "Lots of ways to turn content into something new",
          body: "30+ templates (SWOT, interviews, study notes, follow-up emails), plus quizzes, flashcards, study plans, slides, infographics and podcasts.",
        },
        {
          title: "Real-time sync everywhere",
          body: "Start on your phone, continue on the web, iPad, Apple Watch or Chrome.",
        },
        {
          title: "Many languages",
          body: "Transcription in 50+ languages, with translation.",
        },
        {
          title: "Free local transcription on Mac",
          body: "On supported Macs, HyNote for Mac transcribes on-device for free, and you can keep notes stored \"On This Mac\".",
        },
        {
          title: "Exports and integrations",
          body: "One-click export to Google Docs and Notion, plus PDF and TXT.",
        },
        {
          title: "A free plan and a team plan",
          body: "The free plan includes recording and transcription, up to 120 minutes per session, and there's a Teams plan for groups.",
        },
      ],
      closing: "If those matter most to you, HyNote is a strong choice.",
    },
    ourDifferences: {
      lede: "HyNote turns each recording or file into a summary. NeuVault treats everything you save as part of something bigger: your notes, your projects and your deadlines.",
      points: [
        {
          title: "Notes that connect to everything they belong with",
          body: "A meeting note in NeuVault doesn't sit alone. Connect it to the PDFs, scans, links, videos and recordings it relates to while you write, and Nova files each item into the right group.",
        },
        {
          title: "Vault Map: one canvas for each project",
          body: "Put everything about a project, client, course or trip on one canvas, grouped by topic and joined with labeled links. Open two cards side by side, like a lecture video next to its assignment. Ask Nova about the whole map, and it adds a summary or comparison only when you confirm. Set a weekly, monthly or yearly reminder for a group. Export the map, or chosen groups, as one package to share.",
        },
        {
          title: "It finds the dates for you",
          body: "Organize a document, scan, note or recording with AI, and NeuVault finds the dates inside, like a lease renewal, payment deadline or exam. Get reminded a month before, two weeks before and on the day, or set your own reminder on anything, including a whole Vault Map group.",
        },
        {
          title: "Built for what you save, not just what you record",
          body: "Capture happens almost anywhere. On your phone, tap Share in any app, including social apps like TikTok, Instagram and YouTube, or WhatsApp. On your computer, save pages with the Save to NeuVault extension for Chrome, Edge and Firefox, connect Gmail or Microsoft 365 and choose what comes in, or watch a folder. Then choose: organize it with AI on the spot, or save it to your Inbox and let Nova sort it when you're ready. Scan a stack of receipts or forms in one go on your phone and keep them together as one document.",
        },
        {
          title: "A Windows app",
          body: "NeuVault has native apps for Windows as well as Mac, iPhone and Android. HyNote lists apps for Mac, iPhone, iPad, Android and Apple Watch, plus a web app.",
        },
      ],
    },
    deepDives: [
      {
        id: "privacy",
        title: "Privacy, offline and where your notes live",
        lede: "Both take privacy seriously; the difference is that HyNote is cloud-first with a local option on Mac, while NeuVault is local-first on every device.",
        paragraphs: [
          "HyNote stores notes in its cloud, hosted on Google Cloud Platform, with AES-256 encryption at rest and TLS 1.2+ in transit, and says it never uses your content to train its models ([HyNote](https://hynote.ai)). That's what powers its real-time sync. On Mac, supported configurations can transcribe on-device for free. HyNote's own team notes that on-device transcription controls where speech is processed, but doesn't make a cloud note local: you choose \"On This Mac\" before recording to keep the note on your computer ([HyNote team walkthrough](https://community.deeplearning.ai/t/hynote-for-mac-a-walkthrough-of-local-meeting-transcription-and-notes/895008)).",
          "NeuVault keeps your whole vault on your device, on Mac, Windows, iPhone and Android, by default. Your files aren't kept on our servers, and notes, files, scans, recordings, search and backup all work without internet. AI features (organizing, transcription and Nova) and signing in need a connection. When you use AI, the content you choose is sent to our AI provider to be processed; NeuVault doesn't store it, and it's never used to train AI models. Our provider may keep processing logs for up to 30 days for safety monitoring, then deletes them ([NeuVault privacy policy](/privacy-policy)).",
          "Your backup is one encrypted file, saved where you choose: Google Drive, iCloud, OneDrive, Dropbox, a USB drive or your own device. Only your Recovery Key opens it, and it restores on any of your devices.",
        ],
      },
      {
        id: "meetings",
        title: "Capture and meeting notes",
        lede: "Both record meetings without a bot joining the call and turn them into structured notes; HyNote offers more output formats, NeuVault keeps each meeting connected to the rest of your work.",
        paragraphs: [
          "HyNote records Zoom, Google Meet, Teams and Webex from your device, with speaker identification for up to 10 people, timestamps and 50+ languages. It turns the result into summaries, key points, action items or meeting minutes, with templates and follow-up emails ([HyNote](https://hynote.ai)). Paid plans include a monthly allowance of transcription minutes; Pro includes 1,200 a month ([HyNote pricing](https://hynote.ai/pricing)).",
          "NeuVault records a meeting or voice note, or takes one you upload, and returns an overview, key points, action items and the full transcript, with speakers labeled. The transcript scrolls along as the audio plays, and you can write notes with the recording alongside. The note then sits in your vault next to the files, links and reminders it relates to, and can go on a Vault Map. Nova answers questions from your own vault, including that note. Transcription uses credits from your plan.",
        ],
      },
    ],
    pricing: {
      lede: "On monthly billing, NeuVault's entry plan costs less ($4.99 vs $11.99); on yearly billing, HyNote Pro is cheaper per month ($6.66) than NeuVault Starter.",
      rows: [
        {
          label: "Free",
          them: "Free forever: recording and transcription, up to 120 minutes per session",
          us: "Explorer: 500 credits for 14 days, with every feature; your vault stays usable afterwards",
        },
        {
          label: "Entry paid plan",
          them: "Pro: $11.99 a month, or $79.99 a year ($6.66 a month); 1,200 transcription minutes a month",
          us: "Starter: $4.99 a month; 2,000 credits a month, every feature",
        },
        {
          label: "Middle plans",
          them: "Plus: $18.99 a month or $129.99 a year",
          us: "Personal: $9.99 a month. Pro: $14.99 a month",
        },
        {
          label: "Top plan",
          them: "Unlimited: $24.99 a month or $189.99 a year",
          us: "Premium: $19.99 a month, or $200 a year",
        },
        {
          label: "Teams",
          them: "Teams: $20 per seat a month, or $180 per seat a year, from 2 seats",
          us: "No team plan yet",
        },
        {
          label: "How usage works",
          them: "Transcription minutes, plus credits for podcasts, slides and infographics",
          us: "Credits for AI organizing, scanned text, transcription and Nova; storage never uses credits",
        },
      ],
      footnote:
        "HyNote's app-store prices can differ from its website, and NeuVault's app-store prices may vary by region. Usage units aren't directly comparable: HyNote meters transcription in minutes, NeuVault meters AI work in credits.",
    },
    choose: {
      lede: "Pick by what you need afterwards: a summary to use now, or a connected system you'll come back to.",
      them: [
        "Mainly want quick summaries, meeting minutes and follow-up emails",
        "Want study tools like quizzes and flashcards, or to turn notes into slides and podcasts",
        "Need real-time sync across many devices, including the web and Apple Watch",
        "Transcribe in many languages",
        "Want a team plan today",
      ],
      us: [
        "Want each note connected to the files, links and recordings it belongs with",
        "Like seeing a whole project, course or trip on one canvas",
        "Lose track of due dates hidden in documents, scans and notes",
        "Want your vault on your own device by default, on every platform, with backups only you can open",
        "Use Windows",
      ],
      both: "You can also use both: HyNote for quick summaries and study material, NeuVault for the notes, documents and dates you'll come back to.",
    },
    closing: "Save it once. Find it when it matters. Keep it yours.",
    faqs: [
      {
        question: "Is NeuVault a HyNote alternative?",
        answer:
          "Yes, if you want your notes connected and kept on your device. If you mainly want summaries, templates and study tools synced to every device, HyNote may suit you better.",
      },
      {
        question: "Does NeuVault sync between my devices?",
        answer:
          "Not through the cloud. Your vault lives on each device, and you move or restore it with an encrypted backup, opened only by your Recovery Key.",
      },
      {
        question: "Can NeuVault record my meetings?",
        answer:
          "Yes. Record a meeting or voice note, or upload one, and get an overview, key points, action items and a full transcript with speakers labeled.",
      },
      {
        question: "Does NeuVault work offline?",
        answer:
          "Yes. Notes, files, scans, recordings, search and backup all work without internet. AI features need a connection.",
      },
      {
        question: "Does NeuVault have a Windows app?",
        answer:
          "Yes, alongside Mac, iPhone and Android, plus a browser extension for Chrome, Edge and Firefox for saving pages.",
      },
      {
        question: "Is NeuVault free?",
        answer:
          "You start with 500 free credits for 14 days, with every feature available, and your vault stays usable afterwards. After the trial, AI features need a paid plan, from $4.99 a month.",
      },
    ],
    sources: [
      { label: "HyNote home page", url: "https://hynote.ai" },
      { label: "HyNote pricing", url: "https://hynote.ai/pricing" },
      { label: "HyNote for Mac on Product Hunt", url: "https://www.producthunt.com/p/hynote-ai/hynote-for-mac" },
      {
        label: "HyNote team walkthrough of the Mac app",
        url: "https://community.deeplearning.ai/t/hynote-for-mac-a-walkthrough-of-local-meeting-transcription-and-notes/895008",
      },
      { label: "NeuVault pricing", url: "/pricing" },
      { label: "NeuVault privacy policy", url: "/privacy-policy" },
    ],
    factsCheckedOn: "2026-10-27",
  },
  {
    slug: "obsidian",
    competitor: "Obsidian",
    competitorSummary: "Local Markdown notes with a system you build yourself.",
    tone: "#1d1d1f",
    metaTitle: "NeuVault vs Obsidian: Local-First Notes & Plans",
    metaDescription: "Compare NeuVault with Obsidian. Explore NeuVault’s local-first notes, files, and Planner, with offline editing, task sync, and online AI assistance.",
    description:
      "Both keep your notes on your device. Obsidian lets you build your own system; NeuVault organizes it for you and finds the dates inside.",
    headline: "NeuVault vs Obsidian",
    subheadline:
      "Both keep your notes on your device. Obsidian gives you a powerful system to build yourself; NeuVault organizes everything for you, with AI built in.",
    intro:
      "Obsidian is one of the most loved note-taking apps, especially among people who care about owning their data. NeuVault shares that local-first belief, but takes a different approach to everything else. Here's an honest comparison to help you choose.",
    verdict:
      "Obsidian is free and endlessly customizable if you enjoy building your own system. NeuVault is ready to use, with AI that organizes, transcribes and finds dates for you.",
    glance: [
      {
        label: "Best for",
        them: "People who enjoy designing their own linked-notes system",
        us: "People who want notes, files, scans and dates organized for them",
      },
      {
        label: "Where your notes live",
        them: "Plain Markdown files in a folder on your device",
        us: "In a vault on your device; your files aren't kept on NeuVault's servers",
      },
      {
        label: "Setup",
        them: "You choose folders, links, plugins and themes",
        us: "Save something, and Nova sorts it into groups",
      },
      {
        label: "AI",
        them: "None built in; available through community plugins",
        us: "Built in: organizing, transcription, Nova answers from your vault",
      },
      {
        label: "Voice and meetings",
        them: "Core audio recorder saves recordings into a note; transcription needs a plugin",
        us: "Recordings become an overview, key points, action items and a transcript",
      },
      {
        label: "Reminders",
        them: "Through community plugins",
        us: "Finds dates inside notes, documents, scans and recordings, or set your own",
      },
      {
        label: "Visual canvas",
        them: "Canvas: an infinite space to lay out notes; graph view of links",
        us: "Vault Map: a canvas per project, with Nova, side-by-side cards and group reminders",
      },
      {
        label: "Capture",
        them: "Web Clipper, Markdown import, Importer for other apps",
        us: "Share from any app, including social apps and WhatsApp; browser extension for Chrome, Edge and Firefox; Gmail and Microsoft 365; watched folders; batch scanner",
      },
      {
        label: "Sync",
        them: "Obsidian Sync (paid, end-to-end encrypted) or your own sync service",
        us: "No cloud sync; move your vault with an encrypted backup",
      },
      {
        label: "Apps",
        them: "Mac, Windows, Linux, iPhone, Android",
        us: "Mac, Windows, iPhone, Android",
      },
      {
        label: "Price",
        them: "Free; Sync from $4 a month and Publish from $8 a month, both billed annually",
        us: "Free to start with 500 credits; paid from $4.99 a month",
      },
    ],
    theirStrengths: {
      lede: "Obsidian is the better choice if you want a free, endlessly customizable system and enjoy shaping it yourself.",
      points: [
        {
          title: "Free, including for work",
          body: "The app is free for personal use, and it's now free for work too; the Commercial license is optional.",
        },
        {
          title: "Plain Markdown files",
          body: "Your notes are ordinary text files in a folder you control, readable by many other apps, now and in the future.",
        },
        {
          title: "A huge plugin ecosystem",
          body: "Thousands of community plugins add almost anything, from task managers to AI assistants, plus themes to change how it looks.",
        },
        {
          title: "Powerful linking",
          body: "Backlinks, graph view, Bases for database-like views, and Canvas for laying out ideas on an infinite space.",
        },
        {
          title: "End-to-end encrypted sync",
          body: "If you choose Obsidian Sync, your notes are end-to-end encrypted, and shared vaults let you collaborate.",
        },
        {
          title: "Linux support",
          body: "Alongside Mac, Windows, iPhone and Android.",
        },
      ],
      closing: "If you love tinkering and want total control, Obsidian is hard to beat.",
    },
    ourDifferences: {
      lede: "Obsidian gives you the tools to build a system. NeuVault is the system, with AI built in, so you spend your time on your notes, not on setting them up.",
      points: [
        {
          title: "It organizes itself",
          body: "In Obsidian, you decide on folders, links, tags and plugins. In NeuVault, you write a note or save a file, then choose: organize it with AI on the spot, and Nova summarizes, tags and files it into the right group; or save it to your Inbox and let Nova sort it when you're ready. While you write, connect a note to the scans, PDFs, links and recordings it belongs with.",
        },
        {
          title: "Capture from almost anywhere",
          body: "On your phone, tap Share in any app, including social apps like TikTok, Instagram and YouTube, or WhatsApp. On your computer, save pages with the Save to NeuVault extension for Chrome, Edge and Firefox, connect Gmail or Microsoft 365, or watch a folder. Scan a stack of receipts or forms in one go on your phone and keep them together as one document.",
        },
        {
          title: "Voice and meetings become notes, no plugins needed",
          body: "Record a meeting or voice note, or upload one, and get back an overview, key points, action items and the full transcript, with speakers labeled. The transcript scrolls along as the audio plays.",
        },
        {
          title: "It finds the dates for you",
          body: "NeuVault reads the notes, documents, scans and recordings you organize and finds the dates inside, like a lease renewal, payment deadline or exam. Get reminded a month before, two weeks before and on the day, or set your own reminder on anything.",
        },
        {
          title: "Vault Map: a canvas that works for you",
          body: "Like Obsidian's Canvas, Vault Map lays out a project on one space. It also lets you open any two cards side by side, ask Nova about the whole map, set a weekly, monthly or yearly reminder for a group, and export the map as one package with every card and file.",
        },
      ],
    },
    deepDives: [
      {
        id: "privacy",
        title: "Privacy, offline, sync and backup",
        lede: "Both are local-first and work offline; the difference is how you move your notes between devices.",
        paragraphs: [
          "Obsidian stores your notes as Markdown files in a folder on your device, so everything works offline. To use them on several devices, you can pay for Obsidian Sync, which is end-to-end encrypted by default, so not even Obsidian can read your notes, and keeps version history: 1 month on Standard, 12 months on Plus ([Obsidian Sync plans](https://obsidian.md/sync)). Or you can use your own sync service, like iCloud or Dropbox.",
          "NeuVault keeps your vault on your device, and notes, files, scans, recordings, search and backup all work without internet. AI features (organizing, transcription and Nova) and signing in need a connection. When you use AI, the content you choose is sent to our AI provider to be processed; NeuVault doesn't store it, and it's never used to train AI models. Our provider may keep processing logs for up to 30 days for safety monitoring, then deletes them ([NeuVault privacy policy](/privacy-policy)). There's no cloud sync: to move your vault, you make one encrypted backup file, save it where you choose (Google Drive, iCloud, OneDrive, Dropbox, a USB drive or your device), and restore it on any of your devices with your Recovery Key.",
          "In short: if you want your notes always in sync across devices, Obsidian Sync does that today. If you mainly use one device at a time and want backups only you can open, NeuVault fits.",
        ],
      },
      {
        id: "ai",
        title: "AI, voice and meeting notes",
        lede: "Obsidian leaves AI to plugins you choose and set up; NeuVault builds it in.",
        paragraphs: [
          "Obsidian has no built-in AI. Its core Audio recorder plugin records audio and saves it into a note ([Obsidian core plugins](https://obsidian.md/help/plugins)). Transcription, summaries and AI chat come from community plugins, some of which need your own key from an AI service, such as Deepgram for transcription ([Audio Notes plugin](https://community.obsidian.md/plugins/obsidian-audio-notes)). That gives you choice and control, but you set it up and maintain it yourself.",
          "NeuVault includes AI in every paid plan and the free trial, using credits; storage never uses credits. Record or upload a meeting or voice note and get an overview, key points, action items and a full transcript with speakers labeled. Transcription works in many languages, so you can record in the language you speak. Nova organizes what you save, answers questions from your own vault, and can read a whole Vault Map, adding a summary or comparison only when you confirm.",
        ],
      },
    ],
    pricing: {
      lede: "Obsidian's app costs nothing, and you pay only for optional services; NeuVault's price pays for the built-in AI.",
      rows: [
        {
          label: "The app",
          them: "Free for personal use and for work",
          us: "Free to start: 500 credits for 14 days, with every feature; your vault stays usable afterwards",
        },
        {
          label: "Sync",
          them: "Optional. Standard: $4 a month billed annually or $5 monthly, 1 GB. Plus: $8 a month billed annually or $10 monthly, 10 GB",
          us: "No cloud sync; encrypted backups are included",
        },
        {
          label: "Publishing notes as a website",
          them: "Optional Publish: $8 a month per site, billed annually",
          us: "Not offered",
        },
        {
          label: "AI",
          them: "Not built in; plugins may need paid AI services",
          us: "Included in every paid plan: $4.99 to $19.99 a month, or $200 a year",
        },
        {
          label: "Discounts",
          them: "40% off Sync and Publish for students, educators and nonprofits",
          us: "Same plans for everyone",
        },
      ],
      footnote:
        "For someone who only wants free, local notes, Obsidian costs nothing. For someone who wants AI organizing, transcription and date reminders without setting up plugins, NeuVault starts at $4.99 a month. NeuVault's app-store prices may vary by region.",
    },
    choose: {
      lede: "Pick by how much you want to build yourself.",
      them: [
        "Want a free app and are happy to set up your own system",
        "Love plugins, themes and customizing every detail",
        "Want your notes as plain Markdown files",
        "Need notes synced across devices, or use Linux",
        "Want to publish notes as a website",
      ],
      us: [
        "Want notes, files and recordings organized for you, without plugins or setup",
        "Save things from many places, like social apps, WhatsApp, email and scans",
        "Want meetings and voice notes turned into structured notes automatically",
        "Lose track of due dates hidden in documents and notes",
        "Want local-first privacy with AI built in",
      ],
      both: "You can also use both: Obsidian for the notes you write and link by hand, NeuVault for everything you capture and the dates inside it.",
    },
    closing: "Save it once. Find it when it matters. Keep it yours.",
    faqs: [
      {
        question: "Is NeuVault an Obsidian alternative?",
        answer:
          "Yes, if you like Obsidian's local-first approach but want AI organizing, transcription and date reminders built in, without plugins. If you enjoy building and customizing your own system, Obsidian may suit you better.",
      },
      {
        question: "Are my notes local in both apps?",
        answer: "Yes. Both keep your notes on your device and work offline. In NeuVault, AI features need a connection.",
      },
      {
        question: "Can I bring my Obsidian notes into NeuVault?",
        answer:
          "Yes. Import your Markdown files and keep editing them, or paste Markdown straight into a note; NeuVault keeps its structure.",
      },
      {
        question: "Are NeuVault notes plain files I can take elsewhere?",
        answer:
          "Not in the way Obsidian's are. Notes live in NeuVault's vault on your device, not as files in a folder. Markdown files you import stay Markdown inside the vault and you keep editing them there. Any note exports as Markdown, PDF or Word, any file shares as its original, and a whole Vault Map, or chosen groups, exports as one package with every card and file. Your encrypted backup holds everything. A one-click export of every note as plain files isn't offered yet.",
      },
      {
        question: "Can I sync NeuVault between devices like Obsidian Sync?",
        answer: "Not yet. You move your vault with an encrypted backup, restored with your Recovery Key on any of your devices.",
      },
      {
        question: "Does NeuVault have something like Obsidian Canvas?",
        answer:
          "Yes: Vault Map puts a project, course or trip on one canvas, with side-by-side cards, Nova, group reminders and export.",
      },
      {
        question: "Do I need plugins for AI in NeuVault?",
        answer: "No. Organizing, transcription and Nova are built in, using credits from your plan.",
      },
      {
        question: "Is NeuVault free?",
        answer:
          "You start with 500 free credits for 14 days, with every feature available, and your vault stays usable afterwards. After the trial, AI features need a paid plan, from $4.99 a month.",
      },
    ],
    sources: [
      { label: "Obsidian is now free for work", url: "https://obsidian.md/blog/free-for-work/" },
      { label: "Obsidian pricing", url: "https://obsidian.md/pricing" },
      { label: "Obsidian Sync plans", url: "https://obsidian.md/sync" },
      { label: "Obsidian education and nonprofit discount", url: "https://obsidian.md/help/discounts" },
      { label: "Obsidian core plugins", url: "https://obsidian.md/help/plugins" },
      { label: "Audio Notes community plugin", url: "https://community.obsidian.md/plugins/obsidian-audio-notes" },
      { label: "NeuVault pricing", url: "/pricing" },
      { label: "NeuVault privacy policy", url: "/privacy-policy" },
    ],
    factsCheckedOn: "2026-10-27",
  },
  {
    slug: "octarine",
    competitor: "Octarine",
    competitorSummary: "A fast, local-first Markdown notebook with bring-your-own-key AI and a one-time price.",
    tone: "#1d1d1f",
    metaTitle: "NeuVault vs Octarine: Local-First Notes & Plans",
    metaDescription: "Compare NeuVault with Octarine. Explore NeuVault’s local-first notes, files, and Planner, with offline editing, task sync, and online AI assistance.",
    description:
      "Both keep your notes on your device. Octarine is a lean Markdown workspace where you bring your own AI key; NeuVault organizes files, scans and recordings for you, with AI included.",
    headline: "NeuVault vs Octarine",
    subheadline:
      "Both keep your notes on your device. Octarine is a lean Markdown workspace with AI you bring your own key for; NeuVault organizes everything for you, with AI included.",
    intro:
      "Octarine is a rising alternative for people who like Obsidian's local Markdown files but not its plugins. NeuVault shares the local-first belief and the built-in AI, then goes further into files, scans, recordings and dates. Here's an honest comparison to help you choose.",
    verdict:
      "Octarine is a fast, private Markdown notebook for writers who want built-in essentials and their own AI key. NeuVault is a vault for everything you save, organized for you, with AI included.",
    glance: [
      {
        label: "Best for",
        them: "Writing and linking Markdown notes in files you control, without plugins",
        us: "Keeping notes, files, scans and dates organized for you, privately",
      },
      {
        label: "Where your notes live",
        them: "Plain Markdown files in a workspace folder on your device",
        us: "In a vault on your device; your files aren't kept on NeuVault's servers",
      },
      {
        label: "Organizing",
        them: "Folders, tags, properties, saved views and daily notes you set up",
        us: "Save something, and Nova summarizes, tags and sorts it into groups",
      },
      {
        label: "AI",
        them: "Built in on Pro, with your own API key, a ChatGPT or Claude subscription, or a local model",
        us: "Built in and included: organizing, transcription, Nova answers from your vault",
      },
      {
        label: "Voice and meetings",
        them: "Minutes, recordings with transcription, announced for the iOS beta; none on desktop",
        us: "Recordings become an overview, key points, action items and a transcript, on desktop and phone",
      },
      {
        label: "Reminders",
        them: "Tasks and daily notes with natural-language dates",
        us: "Finds dates inside notes, documents, scans and recordings, or set your own",
      },
      {
        label: "Visual canvas",
        them: "Graph view; a freeform canvas is on the roadmap",
        us: "Vault Map: a canvas per project, with Nova, side-by-side cards and group reminders",
      },
      {
        label: "Capture",
        them: "Open-source Web Clipper for Chrome and Firefox, a bookmarklet, Inbox and Quick Capture, a CLI",
        us: "Share from any app, including social apps and WhatsApp; browser extension for Chrome, Edge and Firefox; Gmail and Microsoft 365; watched folders; batch scanner",
      },
      {
        label: "Sync",
        them: "Your own file sync (iCloud, Dropbox, OneDrive, Google Drive, Syncthing) or built-in Git sync",
        us: "No cloud sync; move your vault with an encrypted backup",
      },
      {
        label: "Apps",
        them: "Mac, Windows, Linux; iPhone as a TestFlight beta for Pro users; Android planned",
        us: "Mac, Windows, iPhone, Android",
      },
      {
        label: "Price",
        them: "Free core; Pro $79 once for 3 devices; Teams $129 a seat once",
        us: "Free to start with 500 credits; paid from $4.99 a month",
      },
    ],
    theirStrengths: {
      lede: "Octarine is the better choice if you want plain Markdown files, a light app, and AI on your own terms.",
      points: [
        {
          title: "Plain Markdown files, no lock-in",
          body: "Your notes are ordinary files in a folder you choose, readable by any Markdown app, and Octarine says it never uploads their content to its servers.",
        },
        {
          title: "Light and quick, with the essentials built in",
          body: "A true WYSIWYG editor, graph view, properties, saved views, templates, daily and weekly notes and themes, all without a plugin marketplace.",
        },
        {
          title: "AI on your own terms",
          body: "On Pro, Ask Octarine and the Writing Assistant work with your own key for Claude, OpenAI, Gemini and others, a ChatGPT or Claude subscription, or a local model through Ollama or LM Studio.",
        },
        {
          title: "Sync the way you already do",
          body: "Because notes are files, iCloud, Dropbox, OneDrive, Google Drive or Syncthing keep them in step, and built-in Git sync backs them up to GitHub or GitLab.",
        },
        {
          title: "Pay once",
          body: "The core app is free. Pro is $79 one time for three devices, with a 7-day trial, and Teams seats are $129 one time.",
        },
        {
          title: "Built for power users",
          body: "A CLI, a URI scheme, MCP integrations, skills, one-click publishing of a note on the web, and Linux support.",
        },
      ],
      closing: "If you want a fast Markdown workspace you fully control, Octarine is a strong pick.",
    },
    ourDifferences: {
      lede: "Octarine is a writing workspace you arrange. NeuVault is a vault for everything you save, where the sorting, the reminders and the meeting notes are done for you.",
      points: [
        {
          title: "AI is included, not assembled",
          body: "In Octarine, AI needs a Pro license plus your own API key, subscription or local model, and you watch your own usage. In NeuVault, organizing, transcription and Nova are part of every paid plan, using credits, with no keys to manage.",
        },
        {
          title: "It organizes itself",
          body: "In Octarine, you decide on folders, tags, properties and views. In NeuVault, you write a note or save a file, then choose: organize it with AI on the spot, and Nova summarizes, tags and files it into the right group; or save it to your Inbox and let Nova sort it when you're ready.",
        },
        {
          title: "Files, scans and recordings are first-class",
          body: "Octarine attaches files to notes. NeuVault treats a PDF, a scanned contract, a recording or a saved web page as its own item, with a summary, tags, a group and reminders, and lets you scan a stack of pages into one document from your phone.",
        },
        {
          title: "Voice and meetings become notes, on every platform",
          body: "Record a meeting or voice note from your device, or upload one, and get an overview, key points, action items and the full transcript with speakers labeled. Nothing joins the call, and the recording stays with the note.",
        },
        {
          title: "It finds the dates for you",
          body: "NeuVault reads the notes, documents, scans and recordings you organize and finds the dates inside, like a lease renewal, payment deadline or exam. Get reminded a month before, two weeks before and on the day, or set your own reminder on anything.",
        },
        {
          title: "Vault Map, today",
          body: "Octarine lists a freeform canvas on its roadmap. Vault Map already puts a project, course or trip on one canvas, with side-by-side cards, Nova across the whole map, group reminders and export as one package.",
        },
      ],
    },
    deepDives: [
      {
        id: "privacy",
        title: "Privacy, offline, sync and backup",
        lede: "Both are local-first and work offline; the difference is what AI sees and how you move between devices.",
        paragraphs: [
          "Octarine stores your notes as Markdown files in a workspace folder you choose, works fully offline, and says it does not upload note content to its servers; its network use is limited to update checks, an anonymous install count, license activation, sharing you ask for, and the AI providers you choose ([Octarine FAQ](https://octarine.app/faq)). To use notes on several devices, you sync the folder with iCloud, Dropbox, OneDrive, Google Drive or Syncthing, or use the built-in Git sync. The iPhone app is a TestFlight beta for Pro users; Android is on the roadmap ([Octarine roadmap](https://octarine.app/roadmap)).",
          "NeuVault keeps your vault on your device, and notes, files, scans, recordings, search and backup all work without internet. AI features (organizing, transcription and Nova) and signing in need a connection. When you use AI, the content you choose is sent to our AI provider to be processed; NeuVault doesn't store it, and it's never used to train AI models. Our provider may keep processing logs for up to 30 days for safety monitoring, then deletes them ([NeuVault privacy policy](/privacy-policy)). There's no cloud sync: to move your vault, you make one encrypted backup file, save it where you choose, and restore it on any of your devices with your Recovery Key.",
          "In short: if you want files you can sync any way you like, Octarine does that today. If you mainly use one device at a time and want backups only you can open, NeuVault fits.",
        ],
      },
      {
        id: "ai",
        title: "AI, voice and meeting notes",
        lede: "Octarine lets you plug in the AI you trust; NeuVault includes it and uses it for more than writing.",
        paragraphs: [
          "On Pro, Octarine's Writing Assistant and Ask Octarine chat with your notes, create and move notes, run reusable skills and connect to MCP servers. You choose the model: your own API key for Claude, OpenAI, Gemini, Groq or xAI, a ChatGPT or Claude Code subscription, or a local model through Ollama or LM Studio ([Octarine pricing](https://octarine.app/pricing)). A Weekly AI Recap summarizes your daily notes. Recordings with transcription, called Minutes, are announced for the iOS beta ([Octarine for iOS](https://octarine.app/testflight)).",
          "NeuVault includes AI in every paid plan and the free trial, using credits; storage never uses credits. Record or upload a meeting or voice note on Mac, Windows, iPhone or Android and get an overview, key points, action items and a full transcript with speakers labeled. Transcription works in many languages, so you can record in the language you speak. Nova organizes what you save, answers questions from your own vault, and can read a whole Vault Map, adding a summary or comparison only when you confirm.",
        ],
      },
      {
        id: "files",
        title: "Your files, in and out",
        lede: "Octarine's notes are files to begin with; NeuVault keeps a vault and exports from it.",
        paragraphs: [
          "Octarine's notes are Markdown files from the moment you write them, so there's nothing to export, and the free plan also exports a note as text while Pro adds PDF, HTML and DOCX ([Octarine pricing](https://octarine.app/pricing)). You can point it at a copy of an Obsidian vault and start writing.",
          "NeuVault keeps your notes in a vault on your device, not as a folder of files. Markdown files you import stay Markdown inside the vault and you keep editing them; paste Markdown into any note and the structure is kept. To get things out, export a note as PDF, Word or Markdown, share any file as its original, bundle a selection as a ZIP, or export a whole Vault Map as one package with every card, file and recording. Your encrypted backup holds everything. A one-click export of every note as plain files isn't offered yet.",
        ],
      },
    ],
    pricing: {
      lede: "Octarine is a one-time purchase and you pay your AI provider separately; NeuVault's plans include the AI.",
      rows: [
        {
          label: "Free",
          them: "Core editor, unlimited workspaces, graph view, search, 4 themes, text export",
          us: "Explorer: 500 credits for 14 days, with every feature; your vault stays usable afterwards",
        },
        {
          label: "Paid",
          them: "Pro: $79 once, 3 devices, all features and future updates; 7-day trial",
          us: "Starter: $4.99 a month; 2,000 credits a month, every feature",
        },
        {
          label: "AI",
          them: "Pro, plus your own API key, subscription or local model",
          us: "Included in every paid plan: $4.99 to $19.99 a month, or $200 a year",
        },
        {
          label: "Teams",
          them: "$129 a seat once, minimum 2 seats, company-owned seats",
          us: "Not yet; export a Vault Map as a package to share",
        },
        {
          label: "Phone apps",
          them: "iPhone beta included with Pro; Android planned",
          us: "iPhone and Android included",
        },
      ],
      footnote:
        "Prices are in US dollars. For someone who already pays for an AI subscription or runs a local model, Octarine's one-time price is hard to beat. For someone who wants AI organizing, transcription and date reminders without managing keys, NeuVault starts at $4.99 a month. NeuVault's app-store prices may vary by region.",
    },
    choose: {
      lede: "Pick by how much you want to set up, and what you keep.",
      them: [
        "Want your notes as plain Markdown files you sync yourself",
        "Already have an AI key, subscription or local model you prefer",
        "Want to pay once",
        "Mostly write and link text notes, and use Linux",
        "Like a CLI, a URI scheme and integrations",
      ],
      us: [
        "Keep files, scans and recordings, not just text",
        "Want notes, files and recordings organized for you, with no keys to manage",
        "Record meetings and voice notes on your phone and computer today",
        "Lose track of due dates hidden in documents and notes",
        "Want a project on one canvas, with Nova across it",
      ],
      both: "You can also use both: Octarine for the notes you write and link by hand, NeuVault for everything you capture and the dates inside it.",
    },
    closing: "Save it once. Find it when it matters. Keep it yours.",
    faqs: [
      {
        question: "Is NeuVault an Octarine alternative?",
        answer:
          "Yes, if you like local-first notes but want AI organizing, transcription and date reminders included, and you keep files, scans and recordings as well as notes. If you want plain Markdown files and your own AI key, Octarine may suit you better.",
      },
      {
        question: "Are my notes local in both apps?",
        answer: "Yes. Both keep your notes on your device and work offline. In NeuVault, AI features need a connection.",
      },
      {
        question: "Do I need my own AI key for NeuVault?",
        answer: "No. Organizing, transcription and Nova are built in and included in every paid plan, using credits.",
      },
      {
        question: "Can I bring my Octarine or Obsidian notes into NeuVault?",
        answer:
          "Yes. Import your Markdown files and keep editing them, or paste Markdown straight into a note; NeuVault keeps its structure.",
      },
      {
        question: "Are NeuVault notes plain files like Octarine's?",
        answer:
          "No. Notes live in NeuVault's vault on your device. Markdown you import stays Markdown inside the vault, and any note exports as Markdown, PDF or Word. A whole Vault Map exports as one package. A one-click export of every note as plain files isn't offered yet.",
      },
      {
        question: "Does NeuVault work on Linux?",
        answer: "No. NeuVault runs on Mac, Windows, iPhone and Android.",
      },
      {
        question: "Does NeuVault sync between devices?",
        answer: "Not through the cloud. You move your vault with an encrypted backup, restored with your Recovery Key on any of your devices.",
      },
      {
        question: "Is NeuVault free?",
        answer:
          "You start with 500 free credits for 14 days, with every feature available, and your vault stays usable afterwards. After the trial, AI features need a paid plan, from $4.99 a month.",
      },
    ],
    sources: [
      { label: "Octarine pricing and feature comparison", url: "https://octarine.app/pricing" },
      { label: "Octarine FAQ", url: "https://octarine.app/faq" },
      { label: "Octarine roadmap and release history", url: "https://octarine.app/roadmap" },
      { label: "Octarine for iOS (TestFlight)", url: "https://octarine.app/testflight" },
      { label: "Octarine Web Clipper", url: "https://octarine.app/extension" },
      { label: "Octarine vs Obsidian, by Octarine", url: "https://octarine.app/compare/obsidian" },
      { label: "NeuVault pricing", url: "/pricing" },
      { label: "NeuVault privacy policy", url: "/privacy-policy" },
    ],
    factsCheckedOn: "2026-10-29",
  },
  {
    slug: "evernote",
    competitor: "Evernote",
    competitorSummary: "A mature cloud notebook with strong search, and note limits below its top plan.",
    tone: "#1d1d1f",
    metaTitle: "NeuVault vs Evernote: Local-First Notes & Plans",
    metaDescription: "Compare NeuVault with Evernote. Explore NeuVault’s local-first notes, files, and Planner, with offline editing, task sync, and online AI assistance.",
    description:
      "Evernote now limits notes and devices on its cheaper plans. NeuVault keeps your notes on your device, organizes them with AI and finds the dates inside.",
    headline: "NeuVault vs Evernote",
    subheadline:
      "Evernote keeps your notes in its cloud, with limits on notes and devices below its top plan. NeuVault keeps them on your device and organizes them for you.",
    intro:
      "For many people, Evernote was their first notes app. It's still a capable, mature product, but its plans have changed a lot, and many long-time users are looking at alternatives. Here's an honest look at how NeuVault compares, and which one fits you.",
    verdict:
      "Evernote is a mature cloud notebook with excellent search and clipping. NeuVault keeps your notes on your device, with no note limits, and organizes them for you.",
    glance: [
      {
        label: "Best for",
        them: "Clipping, scanning and searching a large archive across many devices",
        us: "Keeping notes, files, scans and dates organized for you, privately",
      },
      {
        label: "Where your notes live",
        them: "Evernote's cloud on Google Cloud; local-only notebooks are no longer supported",
        us: "On your device; your files aren't kept on NeuVault's servers",
      },
      {
        label: "Note and device limits",
        them: "Free: 50 notes, 1 notebook, 1 device. Starter: 1,000 notes, 3 devices. Unlimited on Advanced",
        us: "No note limits on any plan",
      },
      {
        label: "Organizing",
        them: "Notebooks, tags and stacks you manage",
        us: "Nova summarizes, tags and sorts what you save into groups, or it waits in your Inbox",
      },
      {
        label: "Search",
        them: "Strong keyword search, including text inside images and PDFs",
        us: "Search your whole vault, offline",
      },
      {
        label: "Reminders",
        them: "Reminders you add to notes",
        us: "Finds dates inside notes, documents, scans and recordings, or set your own",
      },
      {
        label: "Seeing how things connect",
        them: "Notebooks and note links",
        us: "Vault Map: one visual canvas per project, course or trip",
      },
      {
        label: "Meetings",
        them: "AI Transcribe records, summarizes and transcribes meetings",
        us: "Overview, key points, action items and a transcript with speakers labeled",
      },
      {
        label: "Capture",
        them: "Web Clipper, email to Evernote, document scanning",
        us: "Share from any app, including social apps and WhatsApp; browser extension for Chrome, Edge and Firefox; Gmail and Microsoft 365; watched folders; batch scanner",
      },
      {
        label: "Apps",
        them: "Web, Mac, Windows, iPhone, Android",
        us: "Mac, Windows, iPhone, Android (no web app)",
      },
      {
        label: "Price",
        them: "Free; Starter $99 a year; Advanced $249.99 a year",
        us: "Free to start with 500 credits; paid from $4.99 a month",
      },
    ],
    theirStrengths: {
      lede: "Evernote is still a strong choice if you want a polished cloud notebook with excellent search, synced to many devices.",
      points: [
        {
          title: "Search that finds anything",
          body: "Boolean, geographic and filtered search, including text inside images, PDFs and scanned documents.",
        },
        {
          title: "Mature capture tools",
          body: "The Web Clipper, emailing content into Evernote, and document scanning from your phone have been refined over many years.",
        },
        {
          title: "Cloud sync and a web app",
          body: "Your notes are on every device and in any browser, on Advanced without a device limit.",
        },
        {
          title: "AI features on paid plans",
          body: "AI Transcribe records and summarizes meetings, and AI Edit writes, summarizes and translates. An AI Assistant that searches and organizes your notes from a chat, and Semantic Search, are announced.",
        },
        {
          title: "Calendar, tasks and sharing",
          body: "Create calendar events, add reminders to notes, and export notes and notebooks as PDFs.",
        },
      ],
      closing: "If you rely on those and are happy with your notes in the cloud, Evernote remains a capable option.",
    },
    ourDifferences: {
      lede: "Evernote stores and finds your notes. NeuVault also organizes them, connects them and tells you when something inside them is due.",
      points: [
        {
          title: "No note limits",
          body: "Evernote's Free plan stops at 50 notes and its Starter plan at 1,000. NeuVault doesn't cap how many notes or files you keep, and storage never uses credits.",
        },
        {
          title: "It organizes itself",
          body: "In Evernote, you decide which notebook and tags each note gets. In NeuVault, you save something and choose: organize it with AI on the spot, and Nova summarizes, tags and files it into the right group; or save it to your Inbox and sort it later. While you write, connect a note to the scans, PDFs, links and recordings it belongs with.",
        },
        {
          title: "It finds the dates for you",
          body: "Evernote reminds you when you add a reminder to a note. NeuVault reads the notes, documents, scans and recordings you organize and finds the dates inside, like a lease renewal, payment deadline or exam, then reminds you a month before, two weeks before and on the day.",
        },
        {
          title: "Everything for one project, on one canvas",
          body: "Vault Map puts a project, client, course or trip on one canvas: notes, PDFs, recordings, links and videos, grouped and connected. Open two cards side by side, ask Nova about the whole map, set a weekly, monthly or yearly reminder for a group, or export it as one package to share.",
        },
        {
          title: "Capture from almost anywhere",
          body: "On your phone, tap Share in any app, including social apps like TikTok, Instagram and YouTube, or WhatsApp. On your computer, save pages with the Save to NeuVault extension for Chrome, Edge and Firefox, connect Gmail or Microsoft 365, or watch a folder. Scan a stack of pages in one go and keep them together as one document.",
        },
      ],
    },
    deepDives: [
      {
        id: "privacy",
        title: "Privacy, offline and where your notes live",
        lede: "The biggest difference is where your notes live: Evernote syncs everything to its cloud, while NeuVault keeps your vault on your device.",
        paragraphs: [
          "Evernote stores your notes in its cloud, hosted on Google Cloud ([Evernote security](https://evernote.com/security)). Since version 10, local-only notebooks are no longer supported: new notebooks sync to your Evernote account ([Evernote on legacy versions](https://evernote.com/blog/legacy-decommissioning)). Data is encrypted in transit and at rest, and on desktop you can encrypt selected text inside a note with a passphrase that Evernote never receives.",
          "NeuVault keeps your vault on your device, so your files aren't kept on our servers, and notes, files, scans, recordings, search and backup all work without internet. AI features (organizing, transcription and Nova) and signing in need a connection. When you use AI, the content you choose is sent to our AI provider to be processed; NeuVault doesn't store it, and it's never used to train AI models. Our provider may keep processing logs for up to 30 days for safety monitoring, then deletes them ([NeuVault privacy policy](/privacy-policy)).",
          "Your backup is one encrypted file, saved where you choose: Google Drive, iCloud, OneDrive, Dropbox, a USB drive or your own device. Only your Recovery Key opens it, and it restores on any of your devices.",
          "The trade-off: Evernote syncs your notes to every device automatically; NeuVault doesn't sync through the cloud, so you move your vault with a backup.",
        ],
      },
      {
        id: "ai",
        title: "AI, voice and meeting notes",
        lede: "Both now offer AI meeting notes; the difference is which plan you need and what the AI does with the rest of your notes.",
        paragraphs: [
          "Evernote lists AI features including an AI Assistant to search, organize and enrich notes from a chat, Semantic Search, AI Transcribe to record, summarize and transcribe meetings, AI Edit to write, summarize, tidy and translate, and AI Cleanup ([Evernote compare plans](https://evernote.com/compare-plans)). Its help center lists AI Edit, AI Transcribe and the meeting recorder on both Starter and Advanced, and marks the AI Assistant and Semantic Search as coming soon ([Evernote Starter and Advanced FAQ](https://help.evernote.com/hc/en-us/articles/46317642175763-Discontinuing-Evernote-Personal-Professional-Introducing-Starter-Advanced-FAQ)).",
          "NeuVault includes every AI feature on every paid plan, from $4.99 a month, using credits. Record or upload a meeting or voice note and get an overview, key points, action items and a full transcript with speakers labeled; the transcript scrolls along as the audio plays. Transcription works in many languages, so you can record in the language you speak. Nova also organizes everything you save, finds the dates inside it, and answers questions from your own vault.",
        ],
      },
    ],
    pricing: {
      lede: "For unlimited notes with AI, Evernote Advanced costs $249.99 a year; NeuVault's plans run from $4.99 a month, with no note limits.",
      rows: [
        {
          label: "Free",
          them: "50 notes, 1 notebook, 1 device",
          us: "Explorer: 500 credits for 14 days, with every feature; your vault stays usable afterwards",
        },
        {
          label: "Entry paid plan",
          them: "Starter: $99 a year or $14.99 a month; 1,000 notes, 20 notebooks, 3 devices, 5 GB",
          us: "Starter: $4.99 a month; 2,000 credits a month, every feature",
        },
        {
          label: "Unlimited notes",
          them: "Advanced: $249.99 a year or $24.99 a month; unlimited notes, notebooks and devices",
          us: "Every plan; storage never uses credits",
        },
        {
          label: "Top plan",
          them: "Enterprise: custom pricing",
          us: "Premium: $19.99 a month, or $200 a year",
        },
        {
          label: "Students",
          them: "40% off one year of Starter for eligible college students",
          us: "Same plans for everyone",
        },
      ],
      footnote: "Prices are in US dollars. NeuVault's app-store prices may vary by region.",
    },
    choose: {
      lede: "Pick by where you want your notes and how much organizing you want to do yourself.",
      them: [
        "Want your notes synced to every device and a web app automatically",
        "Rely on Evernote's search, Web Clipper and email-to-Evernote",
        "Have years of notebooks set up the way you like",
        "Need team features or an Enterprise plan",
      ],
      us: [
        "Have more notes than Evernote's Free or Starter plans allow",
        "Want your notes on your own device, with backups only you can open",
        "Want notes, files and recordings organized for you",
        "Lose track of due dates hidden in documents, scans and notes",
        "Want AI included from $4.99 a month",
      ],
      both: "You can also use both: Evernote for the archive you've built over the years, NeuVault for what you save from now on and the dates inside it.",
    },
    closing: "Save it once. Find it when it matters. Keep it yours.",
    faqs: [
      {
        question: "Is NeuVault a good Evernote alternative?",
        answer:
          "Yes, if you want your notes on your own device, without note limits, and organized for you. If you rely on cloud sync to many devices or a web app, Evernote may suit you better.",
      },
      {
        question: "Does NeuVault limit how many notes I can keep?",
        answer: "No. There are no note limits, and storage never uses credits.",
      },
      {
        question: "Can I import my Evernote notes?",
        answer:
          "NeuVault doesn't read Evernote's ENEX export files yet. Export your notes or notebooks from Evernote as PDFs and save them into NeuVault, and Nova summarizes, tags and files each one. Text notes can also be pasted into a NeuVault note.",
      },
      {
        question: "Does NeuVault sync between devices like Evernote?",
        answer:
          "Not through the cloud. You move or restore your vault with an encrypted backup, opened only by your Recovery Key.",
      },
      {
        question: "Can NeuVault record and summarize meetings like Evernote's AI Transcribe?",
        answer:
          "Yes. Record or upload a meeting or voice note and get an overview, key points, action items and a full transcript with speakers labeled.",
      },
      {
        question: "Does NeuVault work offline?",
        answer: "Yes. Notes, files, scans, recordings, search and backup work without internet. AI features need a connection.",
      },
      {
        question: "Is NeuVault free?",
        answer:
          "You start with 500 free credits for 14 days, with every feature available, and your vault stays usable afterwards. After the trial, AI features need a paid plan, from $4.99 a month.",
      },
    ],
    sources: [
      { label: "Evernote compare plans", url: "https://evernote.com/compare-plans" },
      {
        label: "Evernote help: Starter and Advanced plans FAQ",
        url: "https://help.evernote.com/hc/en-us/articles/46317642175763-Discontinuing-Evernote-Personal-Professional-Introducing-Starter-Advanced-FAQ",
      },
      {
        label: "Evernote help: Free and Starter note limits",
        url: "https://help.evernote.com/hc/en-us/articles/23565231682323-Understanding-Evernote-Free-and-Starter-plans-limits-note-and-notebook-limits-explained",
      },
      {
        label: "Evernote help: AI features overview",
        url: "https://help.evernote.com/hc/en-us/articles/46594411188371-Evernote-s-AI-Features-Overview",
      },
      { label: "Evernote on legacy versions and local notebooks", url: "https://evernote.com/blog/legacy-decommissioning" },
      { label: "Evernote security", url: "https://evernote.com/security" },
      { label: "NeuVault pricing", url: "/pricing" },
      { label: "NeuVault privacy policy", url: "/privacy-policy" },
    ],
    factsCheckedOn: "2026-10-27",
  },
  {
    slug: "upnote",
    competitor: "UpNote",
    competitorSummary: "A clean, inexpensive cloud notebook with a lifetime plan, popular with people leaving Evernote.",
    tone: "#1d1d1f",
    metaTitle: "NeuVault vs UpNote: Local-First Notes & Plans",
    metaDescription: "Compare NeuVault with UpNote. Explore NeuVault’s local-first notes, files, and Planner, with offline editing, task sync, and online AI assistance.",
    description:
      "UpNote is a tidy, inexpensive notebook synced through its cloud. NeuVault keeps notes, files and scans on your device, organizes them for you and finds the dates inside.",
    headline: "NeuVault vs UpNote",
    subheadline:
      "UpNote is a clean notebook synced through its cloud, with a one-time price. NeuVault keeps everything on your device and organizes it for you, with AI built in.",
    intro:
      "UpNote has become a favorite for people leaving Evernote: it's fast, tidy, works on every platform and costs very little. NeuVault takes a different approach to where your notes live and how much organizing you do yourself. Here's an honest comparison to help you choose.",
    verdict:
      "UpNote is a polished, low-cost notebook that syncs through its cloud. NeuVault keeps notes, files and scans on your device, organizes them for you, and finds the dates inside.",
    glance: [
      {
        label: "Best for",
        them: "Writing and organizing text notes by hand, cheaply, on every platform",
        us: "Keeping notes, files, scans and dates organized for you, privately",
      },
      {
        label: "Where your notes live",
        them: "UpNote's central server, hosted on Firebase in the United States, so they can sync",
        us: "On your device; your files aren't kept on NeuVault's servers",
      },
      {
        label: "Note limits",
        them: "Free: 50 notes. Premium: unlimited, with 20,000 notes recommended for performance",
        us: "No note limits on any plan",
      },
      {
        label: "Organizing",
        them: "Notebooks, nested notebooks, hashtags and filters you manage",
        us: "Nova summarizes, tags and sorts what you save into groups, or it waits in your Inbox",
      },
      {
        label: "AI",
        them: "None",
        us: "Built in: organizing, transcription, Nova answers from your vault",
      },
      {
        label: "Voice and meetings",
        them: "Not offered",
        us: "Recordings become an overview, key points, action items and a transcript",
      },
      {
        label: "Reminders",
        them: "Not offered; checklists with a Todo filter",
        us: "Finds dates inside notes, documents, scans and recordings, or set your own",
      },
      {
        label: "Capture",
        them: "Web Clipper for Chrome, Firefox and Safari; document scanning into a note on phones",
        us: "Share from any app, including social apps and WhatsApp; browser extension for Chrome, Edge and Firefox; Gmail and Microsoft 365; watched folders; batch scanner",
      },
      {
        label: "Import and export",
        them: "Imports Evernote, Bear, Simplenote, Google Keep, Markdown and HTML; exports notes as PDF, text, HTML or Markdown, including all notes at once",
        us: "Imports Markdown and any file; exports a note as PDF, Word or Markdown, a set of files as a ZIP, and the whole vault as an encrypted backup",
      },
      {
        label: "Sync",
        them: "Automatic, through UpNote's cloud, on unlimited devices",
        us: "No cloud sync; move your vault with an encrypted backup",
      },
      {
        label: "Apps",
        them: "Mac, Windows, Linux, iPhone, Android (no web app)",
        us: "Mac, Windows, iPhone, Android (no web app)",
      },
      {
        label: "Price",
        them: "Free; Premium $1.99 a month or $39.99 once",
        us: "Free to start with 500 credits; paid from $4.99 a month",
      },
    ],
    theirStrengths: {
      lede: "UpNote is the better choice if you want a simple, fast notebook that syncs everywhere and costs almost nothing.",
      points: [
        {
          title: "A one-time price",
          body: "Premium is $1.99 a month or $39.99 once, for life, and UpNote has said lifetime users keep every Premium feature even if it ever moves to subscriptions.",
        },
        {
          title: "Clean and quick",
          body: "A clutter-free editor with Markdown shortcuts, tables, code blocks, attachments, templates, themes and a focus mode.",
        },
        {
          title: "Sync everywhere, including Linux",
          body: "Sign in on unlimited devices and your notes stay in sync, on Mac, Windows, Linux, iPhone and Android.",
        },
        {
          title: "Easy to move in and out",
          body: "Import from Evernote, Bear, Simplenote, Google Keep, Markdown or HTML, and export a note, a notebook or everything as PDF, text, HTML or Markdown.",
        },
        {
          title: "Locks and clipping",
          body: "Lock notebooks or the whole app, clip pages from Chrome, Firefox or Safari, and scan a document into a note from your phone.",
        },
      ],
      closing: "If you mainly write text notes and want them everywhere for a few dollars, UpNote is hard to argue with.",
    },
    ourDifferences: {
      lede: "UpNote is a place to write. NeuVault is a place to keep everything, where the organizing, the reminders and the meeting notes are done for you.",
      points: [
        {
          title: "Your notes stay on your device",
          body: "UpNote stores your notes on its server so they can sync; it encrypts them in transit and at rest, and says it never uses them for AI training. NeuVault keeps your vault on your device, so your files aren't kept on our servers, and everything except AI works offline.",
        },
        {
          title: "It organizes itself",
          body: "In UpNote, you choose the notebook and hashtags for every note. In NeuVault, you save something and choose: organize it with AI on the spot, and Nova summarizes, tags and files it into the right group; or save it to your Inbox and sort it later. While you write, connect a note to the scans, PDFs, links and recordings it belongs with.",
        },
        {
          title: "Files and scans, not just notes",
          body: "UpNote attaches files to notes. NeuVault treats a PDF, a scanned contract, a recording or a saved web page as a first-class item, with its own summary, tags, group and reminders.",
        },
        {
          title: "It finds the dates for you",
          body: "UpNote has no reminders. NeuVault reads the notes, documents, scans and recordings you organize and finds the dates inside, like a lease renewal, payment deadline or exam, then reminds you a month before, two weeks before and on the day.",
        },
        {
          title: "Voice and meetings become notes",
          body: "Record a meeting or voice note from your device, or upload one, and get an overview, key points, action items and the full transcript with speakers labeled. Nothing joins the call, and the recording stays with the note.",
        },
        {
          title: "Everything for one project, on one canvas",
          body: "Vault Map puts a project, client, course or trip on one canvas: notes, PDFs, recordings, links and videos, grouped and connected. Open two cards side by side, ask Nova about the whole map, or export it as one package to share.",
        },
      ],
    },
    deepDives: [
      {
        id: "privacy",
        title: "Privacy, offline and where your notes live",
        lede: "UpNote syncs through its own server; NeuVault keeps your vault on your device.",
        paragraphs: [
          "UpNote stores your notes on a central server so they can sync across your devices. Its privacy policy says the server is Firebase, located in the United States, that data is encrypted in transit and at rest, and that your notes are never sold or used for advertising or AI training ([UpNote privacy](https://getupnote.com/privacy.html)). Notes are not end-to-end encrypted, so the protection is the server's, not a key only you hold. You can lock notebooks or the app with a password, and the app works offline.",
          "NeuVault keeps your vault on your device, so your files aren't kept on our servers, and notes, files, scans, recordings, search and backup all work without internet. AI features (organizing, transcription and Nova) and signing in need a connection. When you use AI, the content you choose is sent to our AI provider to be processed; NeuVault doesn't store it, and it's never used to train AI models. Our provider may keep processing logs for up to 30 days for safety monitoring, then deletes them ([NeuVault privacy policy](/privacy-policy)).",
          "Your backup is one encrypted file, saved where you choose: Google Drive, iCloud, OneDrive, Dropbox, a USB drive or your own device. Only your Recovery Key opens it, and it restores on any of your devices.",
          "The trade-off: UpNote syncs your notes to every device automatically; NeuVault doesn't sync through the cloud, so you move your vault with a backup.",
        ],
      },
      {
        id: "moving",
        title: "Moving your notes in, and getting them out",
        lede: "UpNote is built for importing an old archive; NeuVault is built for everything you save from now on.",
        paragraphs: [
          "UpNote imports Evernote's ENEX files directly, keeping notebooks and turning tags into hashtags, and also imports from Bear, Simplenote, Google Keep, Markdown and HTML ([UpNote help: import](https://help.getupnote.com/import-and-export/import-content-to-upnote/import-from-evernote)). It exports a note, several notes, a notebook or your whole library as PDF, text, HTML or Markdown ([UpNote help: export](https://help.getupnote.com/import-and-export/export-notes)). Bulk imports are limited above 20,000 notes or 10 GB of attachments.",
          "NeuVault doesn't read ENEX files yet. Markdown files import and stay Markdown inside your vault, and you can paste Markdown straight into a note. Any PDF, image, scan or recording you save becomes its own item, and Nova summarizes, tags and files it. To get things out, export a note as PDF, Word or Markdown, share any file as its original, bundle a selection as a ZIP, or export a whole Vault Map as one package. Your encrypted backup holds everything. A one-click export of every note as plain files isn't offered yet.",
        ],
      },
      {
        id: "ai",
        title: "AI, voice and meeting notes",
        lede: "UpNote has no AI features; NeuVault's AI is the point.",
        paragraphs: [
          "UpNote is deliberately simple: there are no AI features, no voice recording and no transcription, which is part of why it's fast and inexpensive.",
          "NeuVault includes every AI feature on every paid plan, from $4.99 a month, using credits; storage never uses credits. Record or upload a meeting or voice note and get an overview, key points, action items and a full transcript with speakers labeled; the transcript scrolls along as the audio plays. Transcription works in many languages, so you can record in the language you speak. Nova also organizes everything you save, finds the dates inside it, and answers questions from your own vault.",
        ],
      },
    ],
    pricing: {
      lede: "UpNote is one of the cheapest notebooks there is; NeuVault's price pays for the built-in AI.",
      rows: [
        {
          label: "Free",
          them: "Up to 50 notes, with sync and the core editor",
          us: "Explorer: 500 credits for 14 days, with every feature; your vault stays usable afterwards",
        },
        {
          label: "Paid",
          them: "Premium: $1.99 a month or $39.99 once; unlimited notes, attachments, tables, locks, export",
          us: "Starter: $4.99 a month; 2,000 credits a month, every feature",
        },
        {
          label: "Where to buy",
          them: "From the iPhone, Android or Mac app; Windows and Linux users buy on one of those, then sign in",
          us: "App stores, or on the website for the Mac download and Windows",
        },
        {
          label: "Top plan",
          them: "Premium is the only paid plan",
          us: "Premium: $19.99 a month, or $200 a year",
        },
        {
          label: "AI",
          them: "Not offered",
          us: "Included in every paid plan",
        },
      ],
      footnote: "Prices are in US dollars. App-store prices for both apps may vary by region.",
    },
    choose: {
      lede: "Pick by what you keep, and how much you want done for you.",
      them: [
        "Mostly write text notes and want them synced everywhere",
        "Want a one-time price and nothing recurring",
        "Are moving an Evernote archive and need ENEX import today",
        "Use Linux",
        "Don't want AI anywhere near your notes",
      ],
      us: [
        "Keep files, scans and recordings, not just text",
        "Want your notes on your own device, with backups only you can open",
        "Want notes, files and recordings organized for you",
        "Lose track of due dates hidden in documents, scans and notes",
        "Record meetings and want notes, not just audio",
      ],
      both: "You can also use both: UpNote for the archive you brought over, NeuVault for what you save from now on and the dates inside it.",
    },
    closing: "Save it once. Find it when it matters. Keep it yours.",
    faqs: [
      {
        question: "Is NeuVault a good UpNote alternative?",
        answer:
          "Yes, if you keep files, scans and recordings as well as notes, want them on your own device, and want AI to organize them and find the dates inside. If you want a simple, cheap text notebook synced everywhere, UpNote may suit you better.",
      },
      {
        question: "Does UpNote keep my notes on its servers?",
        answer:
          "Yes. UpNote stores notes on a central server so they can sync, encrypted in transit and at rest. NeuVault keeps your vault on your device.",
      },
      {
        question: "Can I bring my UpNote notes into NeuVault?",
        answer:
          "Yes. Export them from UpNote as Markdown, then import the files into NeuVault; they stay Markdown and you can keep editing them. Nova can summarize, tag and file each one.",
      },
      {
        question: "Which one is better for leaving Evernote?",
        answer:
          "For an old archive, UpNote imports ENEX files directly today and NeuVault doesn't yet. For everything you save from now on, including PDFs, scans and recordings, NeuVault organizes it for you and finds the dates inside.",
      },
      {
        question: "Does NeuVault have a lifetime plan like UpNote?",
        answer:
          "No. NeuVault's plans are monthly or yearly because AI processing is an ongoing cost. Storage never uses credits, and your vault stays usable without a plan.",
      },
      {
        question: "Does NeuVault sync between devices like UpNote?",
        answer:
          "Not through the cloud. You move or restore your vault with an encrypted backup, opened only by your Recovery Key.",
      },
      {
        question: "Does NeuVault work offline?",
        answer: "Yes. Notes, files, scans, recordings, search and backup work without internet. AI features need a connection.",
      },
      {
        question: "Is NeuVault free?",
        answer:
          "You start with 500 free credits for 14 days, with every feature available, and your vault stays usable afterwards. After the trial, AI features need a paid plan, from $4.99 a month.",
      },
    ],
    sources: [
      { label: "UpNote: features and pricing", url: "https://getupnote.com" },
      { label: "UpNote help: Premium FAQs", url: "https://help.getupnote.com/resources/upnote-premium/premium-faqs" },
      { label: "UpNote help: upgrade to Premium", url: "https://help.getupnote.com/resources/upnote-premium/upgrade-to-premium" },
      { label: "UpNote help: import from Evernote", url: "https://help.getupnote.com/import-and-export/import-content-to-upnote/import-from-evernote" },
      { label: "UpNote help: export notes", url: "https://help.getupnote.com/import-and-export/export-notes" },
      { label: "UpNote privacy policy", url: "https://getupnote.com/privacy.html" },
      { label: "NeuVault pricing", url: "/pricing" },
      { label: "NeuVault privacy policy", url: "/privacy-policy" },
    ],
    factsCheckedOn: "2026-10-29",
  },
  {
    slug: "apple-notes",
    competitor: "Apple Notes",
    competitorSummary: "The quick, free notepad built into iPhone, iPad and Mac.",
    tone: "#1d1d1f",
    metaTitle: "NeuVault vs Apple Notes: Local-First Notes & Plans",
    metaDescription: "Compare NeuVault with Apple Notes. Explore NeuVault’s local-first notes, files, and Planner, with offline editing, task sync, and online AI assistance.",
    description:
      "Apple Notes is great for quick notes on Apple devices. NeuVault organizes your notes and files, finds the dates inside, and works on Windows and Android too.",
    headline: "NeuVault vs Apple Notes",
    subheadline:
      "Apple Notes is the easiest place to jot something down on an iPhone. NeuVault is where your notes, files and deadlines get organized for you, on any device.",
    intro:
      "Apple Notes is free, fast and already on your iPhone, and for quick notes it's hard to beat. But once your notes, PDFs, screenshots and recordings start piling up, or you use a Windows PC or Android phone, you may need more. Here's an honest comparison.",
    verdict:
      "Apple Notes is the quickest free notepad for Apple devices. NeuVault organizes notes, files and dates for you, on Apple, Windows and Android.",
    glance: [
      {
        label: "Best for",
        them: "Quick notes, lists and scans on iPhone, iPad and Mac",
        us: "Keeping notes, files, scans and dates organized for you, privately",
      },
      {
        label: "Where your notes live",
        them: "On your device and in iCloud, synced across Apple devices",
        us: "On your device; your files aren't kept on NeuVault's servers",
      },
      {
        label: "Apps",
        them: "iPhone, iPad, Mac; Windows and Android only through iCloud.com in a browser",
        us: "Native apps for Mac, Windows, iPhone and Android",
      },
      {
        label: "Organizing",
        them: "Folders, tags and Smart Folders you set up",
        us: "Nova summarizes, tags and sorts what you save into groups, or it waits in your Inbox",
      },
      {
        label: "Voice and calls",
        them: "Record audio or phone calls with a live transcript; summaries with Apple Intelligence on supported devices",
        us: "Overview, key points, action items and a transcript with speakers labeled",
      },
      {
        label: "Reminders",
        them: "Through the separate Reminders app",
        us: "Finds dates inside notes, documents, scans and recordings, or set your own",
      },
      {
        label: "Seeing how things connect",
        them: "Note links and folders",
        us: "Vault Map: one visual canvas per project, course or trip",
      },
      {
        label: "Capture",
        them: "Share sheet, document scanner, Quick Note",
        us: "Share from any app, including social apps and WhatsApp; browser extension for Chrome, Edge and Firefox; Gmail and Microsoft 365; watched folders; batch scanner",
      },
      {
        label: "Price",
        them: "Free with 5 GB of iCloud storage; iCloud+ from $0.99 a month",
        us: "Free to start with 500 credits; paid from $4.99 a month",
      },
    ],
    theirStrengths: {
      lede: "Apple Notes is the better choice if you live on Apple devices and mostly want a fast, free place for quick notes.",
      points: [
        {
          title: "Free and already installed",
          body: "No sign-up, no subscription, and it syncs across your iPhone, iPad and Mac through iCloud.",
        },
        {
          title: "Fast capture",
          body: "Quick Note, the document scanner, checklists, drawings and Math Notes, all built into the system.",
        },
        {
          title: "Recording and transcription",
          body: "Record audio in a note and see a live transcript; since iOS 18.1, you can also record a phone or FaceTime audio call and find the recording and transcript in Notes.",
        },
        {
          title: "AI summaries on supported devices",
          body: "With Apple Intelligence on supported devices, Notes can summarize recordings and call transcripts.",
        },
        {
          title: "Strong privacy options",
          body: "With Advanced Data Protection turned on, where it's available, Notes in iCloud is end-to-end encrypted.",
        },
        {
          title: "Easy sharing",
          body: "Share and collaborate on notes with other Apple users.",
        },
      ],
      closing: "If you mostly need quick notes on Apple devices, Apple Notes may be all you need.",
    },
    ourDifferences: {
      lede: "Apple Notes is a notepad. NeuVault is where your notes, documents and deadlines come together and get organized for you.",
      points: [
        {
          title: "Works on Windows and Android, too",
          body: "Apple Notes has apps only for Apple devices; on Windows or Android you use it through iCloud.com in a browser. NeuVault has native apps for Mac, Windows, iPhone and Android.",
        },
        {
          title: "It organizes itself",
          body: "In Apple Notes, you file notes into folders and add tags yourself. In NeuVault, you save something and choose: organize it with AI on the spot, and Nova summarizes, tags and files it into the right group; or save it to your Inbox and sort it later. While you write, connect a note to the scans, PDFs, links and recordings it belongs with.",
        },
        {
          title: "It finds the dates for you",
          body: "With Apple Notes, you set reminders yourself in the separate Reminders app. NeuVault reads the notes, documents, scans and recordings you organize and finds the dates inside, like a lease renewal, payment deadline or exam, then reminds you a month before, two weeks before and on the day.",
        },
        {
          title: "Everything for one project, on one canvas",
          body: "Vault Map puts a project, client, course or trip on one canvas: notes, PDFs, recordings, links and videos, grouped and connected. Open two cards side by side, ask Nova about the whole map, set a weekly, monthly or yearly reminder for a group, or export it as one package to share.",
        },
        {
          title: "Capture from almost anywhere",
          body: "On your phone, tap Share in any app, including social apps like TikTok, Instagram and YouTube, or WhatsApp. On your computer, save pages with the Save to NeuVault extension for Chrome, Edge and Firefox, connect Gmail or Microsoft 365, or watch a folder. Scan a stack of pages in one go and keep them together as one document.",
        },
      ],
    },
    deepDives: [
      {
        id: "privacy",
        title: "Privacy, sync and platforms",
        lede: "Apple Notes syncs through iCloud across Apple devices; NeuVault keeps your vault on each device and works across Apple, Windows and Android.",
        paragraphs: [
          "Apple Notes saves notes on your device and syncs them through iCloud. By default, Apple encrypts iCloud data but can access some categories, including Notes; turning on Advanced Data Protection, where it's available, extends end-to-end encryption to Notes, so only your trusted devices can read them ([Apple Support](https://support.apple.com/en-us/102651)). Outside Apple devices, you reach your notes through iCloud.com in a browser.",
          "NeuVault keeps your vault on your device, on Mac, Windows, iPhone and Android, so your files aren't kept on our servers, and notes, files, scans, recordings, search and backup all work without internet. AI features (organizing, transcription and Nova) and signing in need a connection. When you use AI, the content you choose is sent to our AI provider to be processed; NeuVault doesn't store it, and it's never used to train AI models. Our provider may keep processing logs for up to 30 days for safety monitoring, then deletes them ([NeuVault privacy policy](/privacy-policy)).",
          "Your backup is one encrypted file, saved where you choose: Google Drive, iCloud, OneDrive, Dropbox, a USB drive or your own device. Only your Recovery Key opens it, and it restores on any of your devices, including moving from iPhone to Android or Mac to Windows.",
          "The trade-off: Apple Notes syncs automatically across Apple devices; NeuVault doesn't sync through the cloud, so you move your vault with a backup.",
        ],
      },
      {
        id: "ai",
        title: "AI, voice and meeting notes",
        lede: "Both can record and transcribe; Apple Notes gives you a transcript and an optional summary, NeuVault turns the recording into a structured note connected to everything else.",
        paragraphs: [
          "Apple Notes records audio inside a note with a live transcript ([Apple Support](https://support.apple.com/guide/iphone/record-and-transcribe-audio-iphbe11247b5/ios)), and on iPhone can record phone and FaceTime audio calls, with participants notified, saving the recording and transcript in Notes ([Apple Support](https://support.apple.com/en-us/121583)). On devices that support Apple Intelligence, it can generate a summary. Transcription works in a set list of languages and regions, so check Apple's list for yours.",
          "NeuVault records a meeting or voice note, or takes one you upload, and returns an overview, key points, action items and the full transcript, with speakers labeled. Transcription works in many languages, so you can record in the language you speak. The transcript scrolls along as the audio plays. The note then sits in your vault next to the files, links and reminders it relates to, and Nova answers questions from your own vault, about that note or a whole Vault Map. AI features use credits from your plan.",
        ],
      },
    ],
    pricing: {
      lede: "Apple Notes is free, and you pay only if you need more iCloud storage; NeuVault's paid plans cover its built-in AI.",
      rows: [
        {
          label: "The app",
          them: "Free on iPhone, iPad and Mac",
          us: "Free to start: 500 credits for 14 days, with every feature; your vault stays usable afterwards",
        },
        {
          label: "Storage",
          them: "5 GB of iCloud storage free, shared with photos, backups and more; iCloud+ from $0.99 a month for 50 GB, $2.99 for 200 GB, $9.99 for 2 TB (US prices)",
          us: "On your own device; storage never uses credits",
        },
        {
          label: "AI",
          them: "Apple Intelligence features are free on supported devices",
          us: "Included in every paid plan: $4.99 to $19.99 a month, or $200 a year",
        },
      ],
      footnote:
        "If you only need quick notes on Apple devices, Apple Notes costs nothing. If you want your notes and files organized for you, with dates found automatically, on any device, NeuVault starts at $4.99 a month. NeuVault's app-store prices may vary by region.",
    },
    choose: {
      lede: "Pick by the devices you use and how much you want organized for you.",
      them: [
        "Use only Apple devices and want notes synced automatically",
        "Mostly write quick notes, lists and scans",
        "Want something free and built in",
        "Share notes with other Apple users",
      ],
      us: [
        "Use Windows or Android, or switch between platforms",
        "Want notes, files and recordings organized for you",
        "Lose track of due dates hidden in documents, scans and notes",
        "Want everything for a project, course or trip on one canvas",
        "Save things from many places, like social apps, WhatsApp and email",
      ],
      both: "Many people use both: Apple Notes for quick jots, NeuVault for the notes and documents that matter.",
    },
    closing: "Save it once. Find it when it matters. Keep it yours.",
    faqs: [
      {
        question: "Is NeuVault an Apple Notes alternative?",
        answer:
          "Yes, especially if you use Windows or Android, or want your notes and files organized for you. For quick jots on Apple devices, Apple Notes works well alongside it.",
      },
      {
        question: "Can I use NeuVault on Windows and Android?",
        answer: "Yes. NeuVault has native apps for Mac, Windows, iPhone and Android.",
      },
      {
        question: "Can I move my notes from Apple Notes?",
        answer:
          "There's no one-click import yet. On iPhone, iPad or Mac, share a note from Apple Notes to NeuVault, as text or as a PDF, and Nova summarizes, tags and files it. Scans in Apple Notes can be shared the same way.",
      },
      {
        question: "Does NeuVault sync like iCloud?",
        answer:
          "Not through the cloud. You move or restore your vault with an encrypted backup, which you can store in iCloud, Google Drive, OneDrive, Dropbox or a USB drive, opened only by your Recovery Key.",
      },
      {
        question: "Can NeuVault record and transcribe like Apple Notes?",
        answer:
          "Yes. Record or upload a meeting or voice note and get an overview, key points, action items and a full transcript with speakers labeled.",
      },
      {
        question: "Does NeuVault work offline?",
        answer: "Yes. Notes, files, scans, recordings, search and backup work without internet. AI features need a connection.",
      },
      {
        question: "Is NeuVault free?",
        answer:
          "You start with 500 free credits for 14 days, with every feature available, and your vault stays usable afterwards. After the trial, AI features need a paid plan, from $4.99 a month.",
      },
    ],
    sources: [
      { label: "Apple Support: record and transcribe a call on iPhone", url: "https://support.apple.com/en-us/121583" },
      {
        label: "Apple Support: record and transcribe audio in Notes",
        url: "https://support.apple.com/guide/iphone/record-and-transcribe-audio-iphbe11247b5/ios",
      },
      { label: "Apple Support: iCloud+ plans and pricing", url: "https://support.apple.com/en-us/108047" },
      { label: "Apple Support: iCloud data security and Advanced Data Protection", url: "https://support.apple.com/en-us/102651" },
      { label: "NeuVault pricing", url: "/pricing" },
      { label: "NeuVault privacy policy", url: "/privacy-policy" },
    ],
    factsCheckedOn: "2026-10-27",
  },
  {
    slug: "otter",
    competitor: "Otter",
    competitorSummary: "A meeting transcription specialist with live transcripts and team features.",
    tone: "#1d1d1f",
    metaTitle: "NeuVault vs Otter: Local-First Notes & Plans",
    metaDescription: "Compare NeuVault with Otter. Explore NeuVault’s local-first notes, files, and Planner, with offline editing, task sync, and online AI assistance.",
    description:
      "Otter sends a notetaker into your calls and keeps transcripts in its cloud. NeuVault records on your device, nothing joins the call, and each meeting connects to your files and deadlines.",
    headline: "NeuVault vs Otter",
    subheadline:
      "Otter sends a notetaker into your meetings. NeuVault records on your device, so nothing joins the call, and turns each meeting into a note connected to the files, links and deadlines around it.",
    intro:
      "Otter is one of the best-known meeting transcription tools. If meetings are your whole workflow, it's a strong choice. But if your meetings are one part of a bigger picture, with documents, links, recordings and deadlines, NeuVault takes a different approach. Here's an honest comparison.",
    verdict:
      "Otter is a meeting transcription specialist with team features. NeuVault treats meetings as one part of your notes and keeps them on your device.",
    glance: [
      {
        label: "Best for",
        them: "Transcribing lots of meetings, especially for teams",
        us: "Transcribing and keeping meeting recordings, with follow-ups highlighted, and keeping meetings, notes, files, scans and dates connected, privately",
      },
      {
        label: "How it joins meetings",
        them: "Otter's notetaker joins Zoom, Google Meet and Teams calls as a participant; the Mac and Windows app can also record without a bot",
        us: "Always records from your device, on desktop and phone; nothing ever joins the call",
      },
      {
        label: "Where recordings live",
        them: "Otter's cloud",
        us: "On your device; your files aren't kept on NeuVault's servers",
      },
      {
        label: "Live transcription",
        them: "Yes, in real time during the meeting",
        us: "Transcript after recording",
      },
      {
        label: "After the meeting",
        them: "Summary, action items, AI Chat across conversations",
        us: "Overview, key points, action items and transcript, connected to related files, links and reminders",
      },
      {
        label: "Beyond meetings",
        them: "Imported audio and video files",
        us: "Notes, documents, scans, web pages, social posts, WhatsApp, email, Vault Map",
      },
      {
        label: "Reminders",
        them: "Not a focus",
        us: "Finds dates inside notes, documents, scans and recordings, or set your own",
      },
      {
        label: "Limits",
        them: "Free: 300 minutes a month, 30 minutes per conversation. Pro: 1,200 minutes, 90 minutes per conversation",
        us: "Credits for AI work; no note limits; a single recording can run for about 2 to 3 hours",
      },
      {
        label: "Price",
        them: "Free; Pro $8.33 a month billed annually or $16.99 monthly; Business from $19.99 per user",
        us: "Free to start with 500 credits; paid from $4.99 a month",
      },
    ],
    theirStrengths: {
      lede: "Otter is the better choice if transcribing meetings is your main job, especially across a team.",
      points: [
        {
          title: "Live transcription",
          body: "Follow the transcript in real time while the meeting happens.",
        },
        {
          title: "Joins your calls for you",
          body: "Connect your calendar, and Otter's notetaker joins Zoom, Google Meet and Microsoft Teams meetings to record and take notes, even if you're not there.",
        },
        {
          title: "Built for teams",
          body: "Shared conversations, admin controls, and the Business plan's unlimited meeting minutes with meetings up to four hours.",
        },
        {
          title: "AI Chat across meetings",
          body: "Ask questions across your conversations and get answers from what was said.",
        },
        {
          title: "A free plan",
          body: "300 transcription minutes a month, with each conversation capped at 30 minutes.",
        },
        {
          title: "Integrations",
          body: "Connects with tools like Slack and CRMs, popular with sales teams.",
        },
      ],
      closing: "If you need a dedicated meeting assistant for you and your team, Otter is a proven choice.",
    },
    ourDifferences: {
      lede: "Otter ends with a transcript and summary. In NeuVault, that's where the meeting note starts.",
      points: [
        {
          title: "Meetings that connect to everything else",
          body: "A meeting about a project sits next to the project's documents, links, screenshots and earlier recordings. While you write, connect the note to the items it belongs with. Put it on a Vault Map with everything else for that client, course or trip, open it side by side with the proposal you discussed, ask Nova about the whole map, or set a weekly, monthly or yearly reminder for a group.",
        },
        {
          title: "Nothing ever joins the call",
          body: "NeuVault only records from your own device, on desktop and phone, so no notetaker appears in the participant list and nothing is scheduled to join. Otter's desktop app can also record without a bot, but its calendar-linked notetaker still joins as a participant when you use it. Whichever app you use, you're responsible for telling people you're recording and getting their consent where the law requires it.",
        },
        {
          title: "Deadlines from your meetings don't slip",
          body: "When you organize a recording with AI, NeuVault finds the dates mentioned, like \"send the draft by the 14th,\" and turns them into reminders, alongside dates found in your notes, documents and scans.",
        },
        {
          title: "Not just meetings",
          body: "Voice notes, documents, scans, web pages, social posts, WhatsApp files and email attachments all land in the same vault, from your phone's share sheet, the Save to NeuVault extension for Chrome, Edge and Firefox, Gmail or Microsoft 365, or a watched folder. Organize them with AI on the spot, and Nova summarizes, tags and files each one; or save them to your Inbox for later.",
        },
        {
          title: "No minute caps per conversation",
          body: "Otter caps each conversation at 30 minutes on its free plan and 90 on Pro. NeuVault meters AI work in credits rather than minutes. A single recording can run for about 2 to 3 hours, and the audio stays with the note for playback.",
        },
      ],
    },
    deepDives: [
      {
        id: "privacy",
        title: "Privacy and where your recordings live",
        lede: "Otter keeps your meetings in its cloud; NeuVault keeps them on your device.",
        paragraphs: [
          "Otter stores your conversations in its cloud so you and your team can access them anywhere. Its privacy policy lists training its proprietary AI on de-identified audio recordings and on transcriptions among the ways it uses your data, and says it keeps de-identified data in that form ([Otter privacy policy](https://otter.ai/privacy-policy)). You can turn off sharing your conversations for training in Otter's account settings ([Otter help](https://help.otter.ai/hc/en-us/articles/25352082563863-Provide-feedback-to-Otter)). When linked to your calendar, Otter's notetaker can join meetings automatically.",
          "NeuVault keeps your recordings, transcripts and notes on your device, so your files aren't kept on our servers, and everything opens without internet. Transcription and other AI features need a connection. When you use AI, the content you choose is sent to our AI provider to be processed; NeuVault doesn't store it, and it's never used to train AI models. Our provider may keep processing logs for up to 30 days for safety monitoring, then deletes them ([NeuVault privacy policy](/privacy-policy)).",
          "Your backup is one encrypted file, saved where you choose: Google Drive, iCloud, OneDrive, Dropbox, a USB drive or your own device. Only your Recovery Key opens it, and it restores on any of your devices.",
          "Whichever app you use, recording laws differ by country and state; tell people when you're recording and get consent where required. For how NeuVault records without anything joining the call, on each platform, see [meeting notes without a bot](/meeting-notes-without-a-bot).",
        ],
      },
      {
        id: "meetings",
        title: "Meeting capture compared",
        lede: "Otter is stronger for live and team meetings; NeuVault is stronger at what happens to the meeting afterwards.",
        paragraphs: [
          "Otter can join your scheduled calls automatically, transcribe live, identify speakers, and produce a summary and action items when the meeting ends. Its Mac and Windows app records from your computer without a bot ([Otter desktop app](https://otter.ai/desktop)). You can also import audio and video files, though the free plan allows only 3 imports in total and Pro allows 10 a month ([Otter pricing](https://otter.ai/pricing)).",
          "NeuVault records a meeting or voice note from your device, or takes one you upload, and returns an overview, key points, action items and the full transcript, with speakers labeled. Transcription works in many languages, so you can record in the language you speak. The transcript scrolls along as the audio plays, and you can write your own notes with the recording alongside. Then the note joins your vault: connected to related files and links, placed on a Vault Map, checked for dates that become reminders, and open to Nova, which answers questions from your own vault.",
        ],
      },
    ],
    pricing: {
      lede: "NeuVault's entry plan costs less: $4.99 a month, against Otter Pro's $8.33 billed annually or $16.99 monthly.",
      rows: [
        {
          label: "Free",
          them: "Basic: 300 minutes a month, 30 minutes per conversation, 3 file imports in total",
          us: "Explorer: 500 credits for 14 days, with every feature; your vault stays usable afterwards",
        },
        {
          label: "Entry paid plan",
          them: "Pro: $8.33 a month billed annually ($99.96 a year), or $16.99 monthly; 1,200 minutes a month, 90 minutes per conversation, 10 imports a month",
          us: "Starter: $4.99 a month; 2,000 credits a month, every feature",
        },
        {
          label: "Higher plans",
          them: "Business: $19.99 per user a month billed annually, or $30 monthly; unlimited meeting minutes, 4 hours per meeting",
          us: "Personal $9.99, Pro $14.99, Premium $19.99 a month, or $200 a year",
        },
        {
          label: "Teams",
          them: "Business and Enterprise plans",
          us: "No team plan yet",
        },
        {
          label: "How usage works",
          them: "Transcription minutes and file imports",
          us: "Credits for AI work; storage never uses credits",
        },
      ],
      footnote:
        "Usage units aren't directly comparable: Otter meters transcription in minutes, NeuVault meters AI work in credits. NeuVault's app-store prices may vary by region.",
    },
    choose: {
      lede: "Pick by whether meetings are your whole workflow, or one part of it.",
      them: [
        "Spend most of your day in meetings and want them transcribed automatically",
        "Need live transcription during the call",
        "Want a notetaker that can join meetings for you, even when you're absent",
        "Work in a team that shares meeting notes, or need CRM integrations",
      ],
      us: [
        "Want each meeting connected to the documents, links and recordings it relates to",
        "Prefer that nothing ever joins your calls, on any device",
        "Want deadlines mentioned in meetings turned into reminders",
        "Also need a home for notes, scans, web pages and files, not just meetings",
        "Want your recordings kept on your own device",
      ],
      both: "You can also use both: Otter for live team meetings, NeuVault for the meetings, notes and documents you'll come back to.",
    },
    closing: "Save it once. Find it when it matters. Keep it yours.",
    faqs: [
      {
        question: "Is NeuVault an Otter alternative?",
        answer:
          "Yes, if you want meeting notes that connect to the rest of your work and stay on your device. If you need live transcription or a notetaker that joins calls for your team, Otter may suit you better.",
      },
      {
        question: "Does a bot join my meetings with NeuVault?",
        answer:
          "No. NeuVault records from your own device. Let participants know you're recording, and get consent where the law requires it.",
      },
      {
        question: "Can NeuVault transcribe recordings I already have?",
        answer:
          "Yes. Upload a recording and get an overview, key points, action items and a full transcript with speakers labeled.",
      },
      {
        question: "Can my team share meeting notes in NeuVault?",
        answer: "Not in real time yet. You can export a Vault Map, or the groups you choose, as one package to share.",
      },
      {
        question: "Where are my recordings stored?",
        answer: "On your device. Your encrypted backup goes wherever you choose, opened only by your Recovery Key.",
      },
      {
        question: "Is NeuVault free?",
        answer:
          "You start with 500 free credits for 14 days, with every feature available, and your vault stays usable afterwards. After the trial, AI features, including transcription, need a paid plan from $4.99 a month.",
      },
    ],
    sources: [
      { label: "Otter pricing", url: "https://otter.ai/pricing" },
      { label: "Otter privacy policy", url: "https://otter.ai/privacy-policy" },
      { label: "Otter desktop app", url: "https://otter.ai/desktop" },
      {
        label: "Otter help: feedback and training setting",
        url: "https://help.otter.ai/hc/en-us/articles/25352082563863-Provide-feedback-to-Otter",
      },
      { label: "NeuVault pricing", url: "/pricing" },
      { label: "NeuVault privacy policy", url: "/privacy-policy" },
    ],
    factsCheckedOn: "2026-10-27",
  },
  {
    slug: "granola",
    competitor: "Granola",
    competitorSummary: "A bot-free AI notepad for people in back-to-back meetings.",
    tone: "#1d1d1f",
    metaTitle: "NeuVault vs Granola: Local-First Notes & Plans",
    metaDescription: "Compare NeuVault with Granola. Explore NeuVault’s local-first notes, files, and Planner, with offline editing, task sync, and online AI assistance.",
    description:
      "Both take meeting notes without a bot. Granola deletes the audio and keeps notes in its cloud; NeuVault keeps the recording with the note, on your device, connected to your files and deadlines.",
    headline: "NeuVault vs Granola",
    subheadline:
      "Granola is a great bot-free notepad for back-to-back meetings. NeuVault is bot-free too, keeps the recording with the note, connects each meeting to everything around it, and keeps it on your device.",
    intro:
      "Granola and NeuVault both capture meetings without a bot joining the call. Granola focuses on enhancing the notes you type during meetings; NeuVault treats each meeting as one part of a bigger vault of notes, files and deadlines. Here's an honest comparison.",
    verdict:
      "Granola is a specialist notepad for people in back-to-back meetings. NeuVault keeps each recording and connects it to the rest of your notes, files and deadlines, on your device.",
    glance: [
      {
        label: "Best for",
        them: "People in back-to-back meetings who type notes during calls",
        us: "Transcribing and keeping meeting recordings, with follow-ups highlighted, and keeping meetings, notes, files, scans and dates connected, privately",
      },
      {
        label: "How it captures",
        them: "Device audio, no bot joins the call",
        us: "Records on your device, no bot joins the call",
      },
      {
        label: "The recording",
        them: "Audio is deleted after transcription; only the transcript is kept",
        us: "The recording stays in your vault, with the transcript following along as it plays",
      },
      {
        label: "Where notes live",
        them: "Granola's encrypted cloud, hosted in the US",
        us: "On your device; your files aren't kept on NeuVault's servers",
      },
      {
        label: "After the meeting",
        them: "Your typed notes enhanced with AI, plus chat and ready-made prompts (Recipes)",
        us: "Overview, key points, action items and transcript, connected to related files, links and reminders",
      },
      {
        label: "Beyond meetings",
        them: "Not its focus",
        us: "Notes, documents, scans, web pages, social posts, WhatsApp, email, Vault Map",
      },
      {
        label: "Reminders",
        them: "Not a focus",
        us: "Finds dates inside notes, documents, scans and recordings, or set your own",
      },
      {
        label: "Team features",
        them: "Shared folders, integrations, team plans",
        us: "Not yet; export a Vault Map as a package to share",
      },
      {
        label: "Apps",
        them: "Mac, Windows, iPhone, Android, Apple Watch",
        us: "Mac, Windows, iPhone, Android",
      },
      {
        label: "Price",
        them: "Free with 30 days of history; Business $14 per user a month",
        us: "Free to start with 500 credits; paid from $4.99 a month",
      },
    ],
    theirStrengths: {
      lede: "Granola is the better choice if meetings fill your day and you like jotting rough notes as you go.",
      points: [
        {
          title: "Your notes, enhanced",
          body: "Type a few rough notes during the call, and Granola combines them with the transcript to write complete meeting notes in your structure.",
        },
        {
          title: "No bot in the call",
          body: "It captures your device's audio, so nothing joins the meeting.",
        },
        {
          title: "Unlimited meetings on the free plan",
          body: "No cap on meetings or transcription; the free plan shows the last 30 days of notes in the app.",
        },
        {
          title: "Chat and Recipes",
          body: "Ask questions within and across meetings, or use ready-made prompts like \"Coach me\" or \"List my todos.\"",
        },
        {
          title: "Phone calls on iPhone",
          body: "The iPhone app has a built-in dialer for one-to-one calls, the Android app captures in-person meetings, and there's an Apple Watch app.",
        },
        {
          title: "Built for teams",
          body: "Shared folders, and on paid plans, integrations with Notion, Slack, HubSpot and Zapier.",
        },
      ],
      closing: "If you want the best possible notepad for constant meetings, Granola is a strong pick.",
    },
    ourDifferences: {
      lede: "Granola is built around the meeting. NeuVault is built around your notes, and a meeting is one of the things that flows into them.",
      points: [
        {
          title: "You keep the recording",
          body: "Granola deletes the audio after transcribing it. NeuVault keeps the recording in your vault, so you can listen back to exactly how something was said, with the transcript scrolling along as it plays. You delete it only if you choose to.",
        },
        {
          title: "Meetings that connect to everything else",
          body: "A client call sits next to the client's contract, emails, screenshots and earlier calls. While you write, connect the note to the items it belongs with. Put them all on one Vault Map, open the call side by side with the proposal you discussed, ask Nova about the whole map, or set a weekly, monthly or yearly reminder for a group.",
        },
        {
          title: "Deadlines from your meetings don't slip",
          body: "When you organize a recording with AI, NeuVault finds the dates mentioned, like \"send the draft by the 14th,\" and turns them into reminders, alongside dates found in your notes, documents and scans.",
        },
        {
          title: "Not just meetings",
          body: "Voice notes, documents, scans, web pages, social posts, WhatsApp files and email attachments all land in the same vault, from your phone's share sheet, the Save to NeuVault extension for Chrome, Edge and Firefox, Gmail or Microsoft 365, or a watched folder. Organize them with AI on the spot, and Nova summarizes, tags and files each one; or save them to your Inbox for later.",
        },
        {
          title: "Your full history, on your device",
          body: "Granola's free plan shows only the last 30 days of notes in the app. Everything in NeuVault stays in your vault on your device, with no history window and no note limits.",
        },
      ],
    },
    deepDives: [
      {
        id: "privacy",
        title: "Privacy and where your notes live",
        lede: "Both avoid meeting bots; the difference is that Granola keeps your notes in its cloud, while NeuVault keeps them on your device.",
        paragraphs: [
          "Granola sends meeting audio to transcription providers, deletes the audio once transcription completes, and stores transcripts and notes in its encrypted cloud, hosted in the US ([Granola: where it runs](https://www.granola.ai/blog/local-first-ai-notetaker-vs-cloud)). Third-party AI providers are contractually prohibited from training on your data. Granola itself trains on your anonymized data by default on the Basic and Business plans unless you opt out in Settings; Enterprise accounts have training turned off by default ([Granola security](https://www.granola.ai/security)).",
          "NeuVault keeps your recordings, transcripts and notes on your device, so your files aren't kept on our servers, and everything opens without internet. Transcription and other AI features need a connection. When you use AI, the content you choose is sent to our AI provider to be processed; NeuVault doesn't store it, and it's never used to train AI models. Our provider may keep processing logs for up to 30 days for safety monitoring, then deletes them ([NeuVault privacy policy](/privacy-policy)). The copy in your vault stays.",
          "Your backup is one encrypted file, saved where you choose: Google Drive, iCloud, OneDrive, Dropbox, a USB drive or your own device. Only your Recovery Key opens it, and it restores on any of your devices.",
          "Whichever app you use, recording laws differ by country and state; tell people when you're recording and get consent where required. For how NeuVault records without anything joining the call, on each platform, see [meeting notes without a bot](/meeting-notes-without-a-bot).",
        ],
      },
      {
        id: "meetings",
        title: "Meeting capture compared",
        lede: "Granola is designed around writing during the meeting; NeuVault around what you do with the meeting afterwards.",
        paragraphs: [
          "Granola transcribes your device's audio during the call while you type rough notes. Afterwards, it merges your notes with the transcript into structured meeting notes, using templates you can customize, and lets you chat with the meeting or run Recipes. Video calls are captured on the Mac and Windows apps; the phone apps cover in-person meetings, plus one-to-one calls through the iPhone dialer ([Granola on phone calls](https://www.granola.ai/blog/best-ai-note-taker-for-phone-calls-on-android-and-iphone)).",
          "NeuVault records a meeting or voice note on your device, or takes one you upload, and returns an overview, key points, action items and the full transcript, with speakers labeled. Transcription works in many languages, so you can record in the language you speak. On Windows, and on Mac with macOS 14.2 or later, it hears both your microphone and the call's audio; otherwise it records your microphone and tells you so. On phones it records the room, like Granola. The recording stays with the note, and you can write your own notes alongside it. Then the meeting joins your vault: connected to related files and links, placed on a Vault Map, checked for dates that become reminders, and open to Nova, which answers questions from your own vault.",
        ],
      },
    ],
    pricing: {
      lede: "Granola's free plan is generous for meetings but limits history to 30 days; its paid plan starts at $14 per user a month. NeuVault's paid plans start at $4.99 a month.",
      rows: [
        {
          label: "Free",
          them: "Basic: unlimited meeting notes, but only the last 30 days of notes visible in the app",
          us: "Explorer: 500 credits for 14 days, with every feature; your vault stays usable afterwards",
        },
        {
          label: "Entry paid plan",
          them: "Business: $14 per user a month; unlimited history, advanced AI models, integrations",
          us: "Starter: $4.99 a month; 2,000 credits a month, every feature",
        },
        {
          label: "Higher plans",
          them: "Enterprise: $35 per user a month; SSO, admin controls, organization-wide training opt-out",
          us: "Personal $9.99, Pro $14.99, Premium $19.99 a month, or $200 a year",
        },
        {
          label: "Billing",
          them: "Basic and Business are billed monthly",
          us: "Monthly, or yearly on Premium",
        },
        {
          label: "How usage works",
          them: "No minute caps",
          us: "Credits for AI work; storage never uses credits",
        },
      ],
      footnote: "Prices are in US dollars. NeuVault's app-store prices may vary by region.",
    },
    choose: {
      lede: "Pick by whether meetings are your whole day, or one part of your work.",
      them: [
        "Spend most of your day in back-to-back meetings",
        "Like typing rough notes during calls and having AI complete them",
        "Want a generous free plan for meetings and don't need history older than 30 days",
        "Work in a team that shares meeting notes, or need integrations like HubSpot and Slack",
      ],
      us: [
        "Want to keep the actual recording, not just the transcript",
        "Want each meeting connected to the documents, links and recordings it relates to",
        "Want deadlines mentioned in meetings turned into reminders",
        "Also need a home for notes, scans, web pages and files, not just meetings",
        "Want your notes and recordings kept on your own device",
      ],
      both: "You can also use both: Granola for the notes you type during a packed day of calls, NeuVault for the meetings, documents and dates you'll come back to.",
    },
    closing: "Save it once. Find it when it matters. Keep it yours.",
    faqs: [
      {
        question: "Is NeuVault a Granola alternative?",
        answer:
          "Yes, if you want to keep your recordings, connect meetings to the rest of your work, and store everything on your device. If you mainly want AI to complete the notes you type during constant meetings, Granola may suit you better.",
      },
      {
        question: "Does a bot join my meetings with NeuVault?",
        answer:
          "No. Like Granola, NeuVault records from your own device. Let participants know you're recording, and get consent where the law requires it.",
      },
      {
        question: "Does NeuVault keep the audio?",
        answer: "Yes. The recording stays in your vault with its transcript, so you can listen back any time. You delete it only if you choose to.",
      },
      {
        question: "Can I see notes older than 30 days for free?",
        answer: "In NeuVault, everything you save stays in your vault, with no history window.",
      },
      {
        question: "Can my team share meeting notes in NeuVault?",
        answer: "Not in real time yet. You can export a Vault Map, or the groups you choose, as one package to share.",
      },
      {
        question: "Is NeuVault free?",
        answer:
          "You start with 500 free credits for 14 days, with every feature available, and your vault stays usable afterwards. After the trial, AI features, including transcription, need a paid plan from $4.99 a month.",
      },
    ],
    sources: [
      { label: "Granola pricing", url: "https://www.granola.ai/pricing" },
      { label: "Granola security", url: "https://www.granola.ai/security" },
      { label: "Granola: where it runs, on your device and in the cloud", url: "https://www.granola.ai/blog/local-first-ai-notetaker-vs-cloud" },
      {
        label: "Granola: model training policy by plan",
        url: "https://www.granola.ai/blog/does-granola-train-ai-models-on-your-meetings-model-training-policy-by-plan",
      },
      {
        label: "Granola: phone calls on iPhone and Android",
        url: "https://www.granola.ai/blog/best-ai-note-taker-for-phone-calls-on-android-and-iphone",
      },
      { label: "NeuVault pricing", url: "/pricing" },
      { label: "NeuVault privacy policy", url: "/privacy-policy" },
    ],
    factsCheckedOn: "2026-10-27",
  },
  {
    slug: "fathom",
    competitor: "Fathom",
    competitorSummary: "A polished AI notetaker for video calls, built for sales and customer teams.",
    tone: "#1d1d1f",
    metaTitle: "NeuVault vs Fathom: Local-First Notes & Plans",
    metaDescription: "Compare NeuVault with Fathom. Explore NeuVault’s local-first notes, files, and Planner, with offline editing, task sync, and online AI assistance.",
    description:
      "Fathom's bot joins your calls by default and stores video in its cloud. NeuVault records on your device, nothing joins the call, and each meeting connects to your files, links and deadlines.",
    headline: "NeuVault vs Fathom",
    subheadline:
      "Fathom is a polished AI notetaker that joins your video calls. NeuVault records on your device, so nothing joins the call, and turns every meeting into a note connected to the rest of your work.",
    intro:
      "Fathom is one of the most popular meeting notetakers, with a generous free plan and deep CRM integrations. If your work happens in video calls and sales pipelines, it's a strong choice. If meetings are one part of a bigger picture of notes, documents and deadlines, NeuVault takes a different approach. Here's an honest comparison.",
    verdict:
      "Fathom is a meeting notetaker built for video calls and sales teams. NeuVault treats meetings as one part of your notes and keeps them on your device.",
    glance: [
      {
        label: "Best for",
        them: "Recording video calls, especially for sales and customer teams",
        us: "Transcribing and keeping meeting recordings, with follow-ups highlighted, and keeping meetings, notes, files, scans and dates connected, privately",
      },
      {
        label: "How it captures",
        them: "A notetaker bot joins Zoom, Google Meet and Teams by default; bot-free capture in the Mac app, with Windows to follow",
        us: "Records on your device, no bot joins the call",
      },
      {
        label: "Where recordings live",
        them: "Fathom's cloud, stored in the United States",
        us: "On your device; your files aren't kept on NeuVault's servers",
      },
      {
        label: "After the meeting",
        them: "Summary, action items, follow-up emails, clips, Ask Fathom across calls",
        us: "Overview, key points, action items and transcript, connected to related files, links and reminders",
      },
      {
        label: "Beyond meetings",
        them: "Not its focus",
        us: "Notes, documents, scans, web pages, social posts, WhatsApp, email, Vault Map",
      },
      {
        label: "Reminders",
        them: "Not a focus",
        us: "Finds dates inside notes, documents, scans and recordings, or set your own",
      },
      {
        label: "Integrations",
        them: "CRMs like Salesforce and HubSpot, Slack, ChatGPT and Claude",
        us: "Gmail and Microsoft 365 for capture; browser extension for Chrome, Edge and Firefox",
      },
      {
        label: "Team features",
        them: "Shared libraries, comments, team plans",
        us: "Not yet; export a Vault Map as a package to share",
      },
      {
        label: "Price",
        them: "Free with unlimited recordings; Premium $16 a month billed annually or $20 monthly",
        us: "Free to start with 500 credits; paid from $4.99 a month",
      },
    ],
    theirStrengths: {
      lede: "Fathom is the better choice if your work happens in video calls, especially with customers.",
      points: [
        {
          title: "A generous free plan",
          body: "Unlimited recordings, transcripts and storage, with instant summaries; advanced summaries and Ask Fathom are limited on Free, and AI action items are paid.",
        },
        {
          title: "Records video, too",
          body: "The meeting bot captures video, so shared screens and slides are saved alongside the transcript, and you can share clips.",
        },
        {
          title: "Bot-free on Mac",
          body: "Fathom 3.0 for Mac can record without a bot, with modes for transcript only or audio as well; Windows support is listed as coming soon.",
        },
        {
          title: "Ask Fathom",
          body: "Ask questions across your calls, and connect your meeting history to ChatGPT and Claude.",
        },
        {
          title: "Built for sales and customer teams",
          body: "CRM field sync with Salesforce and HubSpot, deal views, coaching metrics and AI scorecards on the Business plan.",
        },
        {
          title: "Mature and well reviewed",
          body: "Highly rated on Product Hunt and G2, and now part of Superhuman.",
        },
      ],
      closing: "If you need a dedicated notetaker for client calls and sales pipelines, Fathom is hard to beat.",
    },
    ourDifferences: {
      lede: "Fathom is built around your calls. NeuVault is built around your notes, and a meeting is one of the things that flows into them.",
      points: [
        {
          title: "Meetings that connect to everything else",
          body: "A client call sits next to the client's contract, emails, screenshots and earlier calls. While you write, connect the note to the items it belongs with. Put them all on one Vault Map, open the call side by side with the proposal you discussed, ask Nova about the whole map, or set a weekly, monthly or yearly reminder for a group.",
        },
        {
          title: "Nothing joins the call, on any platform",
          body: "Fathom's bot joins calls by default, and its bot-free mode is in the Mac app. NeuVault records from your own device on Mac, Windows, iPhone and Android. You're still responsible for telling people you're recording and getting consent where the law requires it.",
        },
        {
          title: "Deadlines from your meetings don't slip",
          body: "When you organize a recording with AI, NeuVault finds the dates mentioned, like \"send the draft by the 14th,\" and turns them into reminders, alongside dates found in your notes, documents and scans.",
        },
        {
          title: "Not just video calls",
          body: "In-person conversations, voice notes, documents, scans, web pages, social posts, WhatsApp files and email attachments all land in the same vault, from your phone's share sheet, the Save to NeuVault extension for Chrome, Edge and Firefox, Gmail or Microsoft 365, or a watched folder. Organize them with AI on the spot, and Nova summarizes, tags and files each one; or save them to your Inbox for later.",
        },
        {
          title: "Kept on your device",
          body: "Fathom stores your calls in its US cloud. NeuVault keeps your recordings, transcripts and notes on your device, with no note limits, and backups only your Recovery Key can open.",
        },
      ],
    },
    deepDives: [
      {
        id: "privacy",
        title: "Privacy and where your recordings live",
        lede: "Fathom keeps your calls in its cloud; NeuVault keeps them on your device.",
        paragraphs: [
          "Fathom stores all data in the United States, encrypted in transit and at rest. Its help center says its AI providers (Anthropic, OpenAI and Google) aren't permitted to train on your data, while Fathom uses de-identified customer data to improve its own models; you can opt out in your settings, and Team Edition organizations can opt out everyone at once ([Fathom help: Is Fathom secure?](https://help.fathom.video/en/articles/296512)). When the meeting bot records, it captures video too, so faces, shared screens and slides are stored.",
          "NeuVault keeps your recordings, transcripts and notes on your device, so your files aren't kept on our servers, and everything opens without internet. Transcription and other AI features need a connection. When you use AI, the content you choose is sent to our AI provider to be processed; NeuVault doesn't store it, and it's never used to train AI models. Our provider may keep processing logs for up to 30 days for safety monitoring, then deletes them ([NeuVault privacy policy](/privacy-policy)). The copy in your vault stays.",
          "Your backup is one encrypted file, saved where you choose: Google Drive, iCloud, OneDrive, Dropbox, a USB drive or your own device. Only your Recovery Key opens it, and it restores on any of your devices.",
          "Whichever app you use, recording laws differ by country and state; tell people when you're recording and get consent where required. For how NeuVault records without anything joining the call, on each platform, see [meeting notes without a bot](/meeting-notes-without-a-bot).",
        ],
      },
      {
        id: "meetings",
        title: "Meeting capture compared",
        lede: "Fathom is stronger for video calls and sales workflows; NeuVault is stronger at what happens to the meeting afterwards.",
        paragraphs: [
          "Fathom joins Zoom, Google Meet and Microsoft Teams calls as a notetaker bot by default and records video, audio and transcript, or captures bot-free from the Mac app ([Fathom help: supported devices](https://help.fathom.video/en/articles/296576)). After the call, you get a summary, and on paid plans AI action items, follow-up email drafts, custom templates and Ask Fathom across all your calls ([Fathom pricing](https://www.fathom.ai/pricing)). Clips and playlists make it easy to share key moments, and CRM sync pushes notes into Salesforce or HubSpot.",
          "NeuVault records a meeting or voice note on your device, whether online or in person, or takes one you upload, and returns an overview, key points, action items and the full transcript, with speakers labeled. Transcription works in many languages, so you can record in the language you speak. On Windows, and on Mac with macOS 14.2 or later, it hears both your microphone and the call's audio; otherwise it records your microphone and tells you so. On phones it records the room. The transcript scrolls along as the audio plays, and you can write your own notes alongside it. Then the meeting joins your vault: connected to related files and links, placed on a Vault Map, checked for dates that become reminders, and open to Nova, which answers questions from your own vault.",
        ],
      },
    ],
    pricing: {
      lede: "Fathom's free plan is the most generous for recording calls; for full AI on every meeting, Fathom Premium costs $16 a month billed annually, and NeuVault starts at $4.99 a month.",
      rows: [
        {
          label: "Free",
          them: "Unlimited recordings, transcripts and storage; advanced summaries and Ask Fathom limited; no AI action items",
          us: "Explorer: 500 credits for 14 days, with every feature; your vault stays usable afterwards",
        },
        {
          label: "Individual paid plan",
          them: "Premium: $16 a month billed annually ($192 a year), or $20 monthly; unlimited advanced summaries, action items, Ask Fathom",
          us: "Starter: $4.99 a month; 2,000 credits a month, every feature",
        },
        {
          label: "Higher plans",
          them: "Team: $15 per user a month billed annually ($19 monthly), from 2 users. Business: $25 per user billed annually ($34 monthly), adds CRM sync",
          us: "Personal $9.99, Pro $14.99, Premium $19.99 a month, or $200 a year",
        },
        {
          label: "Enterprise",
          them: "Custom pricing: SSO, custom data retention",
          us: "Not offered",
        },
        {
          label: "How usage works",
          them: "No minute caps",
          us: "Credits for AI work; storage never uses credits",
        },
      ],
      footnote: "Prices are in US dollars. NeuVault's app-store prices may vary by region.",
    },
    choose: {
      lede: "Pick by whether your work lives in video calls, or across many kinds of information.",
      them: [
        "Spend your day on Zoom, Google Meet or Teams calls",
        "Want video recordings, clips and playlists of your calls",
        "Want a free plan with unlimited recordings",
        "Work in sales or customer success and need CRM sync",
        "Share calls across a team",
      ],
      us: [
        "Want each meeting connected to the documents, links and recordings it relates to",
        "Prefer that nothing joins your calls, on any platform",
        "Want deadlines mentioned in meetings turned into reminders",
        "Also need a home for notes, scans, web pages and files, not just calls",
        "Want your recordings kept on your own device",
      ],
      both: "You can also use both: Fathom for customer calls that feed your CRM, NeuVault for the meetings, documents and dates you'll come back to.",
    },
    closing: "Save it once. Find it when it matters. Keep it yours.",
    faqs: [
      {
        question: "Is NeuVault a Fathom alternative?",
        answer:
          "Yes, if you want meeting notes that connect to the rest of your work and stay on your device. If you need video recordings of calls, CRM sync or team libraries, Fathom may suit you better.",
      },
      {
        question: "Does a bot join my meetings with NeuVault?",
        answer:
          "No. NeuVault records from your own device. Let participants know you're recording, and get consent where the law requires it.",
      },
      {
        question: "Can NeuVault record in-person meetings?",
        answer:
          "Yes. Record on your phone or computer, or upload a recording, and get an overview, key points, action items and a full transcript with speakers labeled.",
      },
      {
        question: "Does NeuVault record video like Fathom?",
        answer: "No. NeuVault records audio and turns it into notes; it doesn't record the video of your calls.",
      },
      {
        question: "Can my team share meeting notes in NeuVault?",
        answer: "Not in real time yet. You can export a Vault Map, or the groups you choose, as one package to share.",
      },
      {
        question: "Is NeuVault free?",
        answer:
          "You start with 500 free credits for 14 days, with every feature available, and your vault stays usable afterwards. After the trial, AI features, including transcription, need a paid plan from $4.99 a month.",
      },
    ],
    sources: [
      { label: "Fathom pricing", url: "https://www.fathom.ai/pricing" },
      { label: "Fathom help: Is Fathom secure?", url: "https://help.fathom.video/en/articles/296512" },
      { label: "Fathom help: supported devices and bot-free recording", url: "https://help.fathom.video/en/articles/296576" },
      { label: "Superhuman acquires Fathom", url: "https://blog.superhuman.com/superhuman-acquires-fathom/" },
      { label: "NeuVault pricing", url: "/pricing" },
      { label: "NeuVault privacy policy", url: "/privacy-policy" },
    ],
    factsCheckedOn: "2026-10-27",
  },
];

/**
 * How the features form one system. Shared by every comparison page so the
 * story stays identical wherever a reader lands.
 */
export const plannerDifference: ComparePoint = {
  title: "A local-first Planner connected to your sources",
  body: "Turn action items from notes, documents, Vault Maps, and Nova answers into tasks with the source material attached. Set dates, priorities, reminders, and recurring tasks, then work in Agenda, Week, Month, or Board view. Create and edit tasks offline. When connected, Planner tasks, board columns, and reminder settings sync through your account; attached files transfer separately. Nova can help plan your day, with changes reviewed before you confirm.",
};

export const howItFitsTogether = {
  title: "How NeuVault fits together",
  lede: "Capture information, connect it to its context, and plan the next step in one local-first workspace.",
  steps: [
    {
      title: "Write it or save it",
      body: "Write a note, or save a scan, PDF, recording, link or screenshot from almost anywhere: your phone's share sheet, your browser, email, WhatsApp or a watched folder. While you write, connect a note to the items it belongs with.",
    },
    {
      title: "Nova files it",
      body: "Organize with AI on the spot, or leave it in your Inbox for later. Nova writes a summary, title and tags and files it into the right group, so every item lands next to the ones it relates to. Recordings come back as an overview, key points, action items and a transcript.",
    },
    {
      title: "The dates inside become reminders",
      body: "A lease renewal, a payment deadline or an exam found inside a document, scan, note or recording becomes a reminder a month before, two weeks before and on the day. Add your own reminder to anything, or a weekly, monthly or yearly one to a whole group.",
    },
    {
      title: "The project lives on one map",
      body: "Vault Map puts a project, course or trip on one canvas: those same notes, files, recordings and links, grouped and joined with labeled links. Open two cards side by side, ask Nova about the whole map, or export it as one package to share.",
    },
    {
      title: "The next step goes into Planner",
      body: "Plan action items from a note, document, Vault Map, or Nova answer, or choose Plan from reminders. Keep the source attached and add a date, priority, or repeat. Review work in Agenda, Week, Month, or Board view. Ask Nova what is due or have it propose a plan, then confirm the changes you want.",
    },
    {
      title: "Local-first, with clear online boundaries",
      body: "Vault files and notes stay on your device. Read saved material, edit notes, search, and manage Planner tasks offline. When connected, Planner tasks, board columns, and reminder settings sync through your account; files transfer separately through backups or bundles. AI features need internet and credits, and send relevant content for processing. Encrypted backups are saved where you choose and opened with your Recovery Key. Storage never uses credits.",
    },
  ],
};

const lookup = new Map(comparisonPages.map((page) => [page.slug, page]));

export function getComparisonBySlug(slug: string) {
  return lookup.get(slug);
}

export function comparisonPath(page: Pick<ComparisonPage, "slug">) {
  return `/compare/${page.slug}`;
}

export function buildComparisonMetadata(page: ComparisonPage) {
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription ?? page.description,
    path: comparisonPath(page),
    // Every comparison title already starts with "NeuVault vs", so the site-name suffix would repeat it.
    absoluteTitle: true,
  });
}

export function buildComparisonBreadcrumbJsonLd(page: ComparisonPage) {
  return buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
    { name: page.headline, path: comparisonPath(page) },
  ]);
}

export function buildComparisonFaqJsonLd(page: ComparisonPage) {
  return buildFaqJsonLd(page.faqs);
}

export function buildComparisonWebPageJsonLd(page: ComparisonPage) {
  return {
    ...buildWebPageJsonLd({
      title: page.metaTitle,
      description: page.description,
      path: comparisonPath(page),
    }),
    dateModified: page.factsCheckedOn,
  };
}
