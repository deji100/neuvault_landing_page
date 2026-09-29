/**
 * The practical half of each guide: what to do in NeuVault for every step, a
 * checklist, and extra questions. Wording follows the apps' own labels; keep it
 * to what a user sees and can do, never how it works underneath.
 */
export type GuideStepDepth = {
  /** Further explanation shown under the step's summary. */
  details?: string[];
  /** "In NeuVault" steps, in the order a user would do them. */
  inApp?: string[];
};

export type GuideDepth = {
  steps: Record<string, GuideStepDepth>;
  checklist: string[];
  faqs: { question: string; answer: string }[];
  dateModified: string;
};

export const guideDepth: Record<string, GuideDepth> = {
  "how-to-scan-and-organize-documents": {
    dateModified: "2026-09-29",
    steps: {
      "Capture into one destination": {
        details: [
          "The rule is simple: if it is paper and you might need it again, it goes into the vault the day it arrives. Scanning a stack once a month sounds tidy, but it is how letters end up half in a drawer and half in your camera roll.",
        ],
        inApp: [
          "On iPhone or Android, tap Open scanner. NeuVault finds the page edges, straightens each page and crops it for you.",
          "Add every page of a document before you finish, and use Scan batch to capture several documents in one session.",
          "On Mac or Windows, choose Add files or scans to bring in scans and PDFs you already have.",
          "NeuVault recognises files that are already in your vault, so the same letter is not stored twice.",
        ],
      },
      "Run OCR and keep the extracted meaning": {
        details: [
          "A picture of a page tells you nothing until you open it. What makes a scan useful later is a short, accurate description of what it is and the few details you will actually look for: who it is from, how much, and by when.",
        ],
        inApp: [
          "Open the document to see the summary, tags and key details NeuVault picked up, such as names, amounts and dates.",
          "If something is off, use Edit summary or change the Tags. Your wording is what search will use, so write it the way you would look for it.",
        ],
      },
      "Group the scan with the right document story": {
        details: [
          "A single receipt rarely matters on its own. It matters as part of the insurance claim, the move, or the tax return it belongs to, and that is where you will look for it.",
        ],
        inApp: [
          "NeuVault files each scan into a group and subgroup for you, such as Identity, Insurance or Property & Housing.",
          "Anything it is not sure about waits in your Inbox. Open the Inbox and choose Organize with AI, or move the item yourself.",
          "Use Link documents to connect the scan to related records. They then appear together under Related documents.",
        ],
      },
      "Add the future action while the context is fresh": {
        inApp: [
          "When NeuVault finds a date such as an expiry, renewal or due date, it shows up in Reminders on its own.",
          "To add your own, open the document, go to Resurface this later? and pick a date, or set it to Recurring.",
        ],
      },
    },
    checklist: [
      "Scan paper on the day it arrives",
      "Check the summary and tags read the way you would search",
      "Confirm the scan landed in the right group, or move it",
      "Link it to the records it belongs with",
      "Make sure any date on it has a reminder",
    ],
    faqs: [
      {
        question: "Can I scan several documents at once?",
        answer:
          "Yes. On iPhone and Android, Scan batch lets you capture several documents in one session, and each document can have as many pages as it needs.",
      },
      {
        question: "Can I scan documents on my computer?",
        answer:
          "The camera scanner is on iPhone and Android. On Mac and Windows, use Add files or scans to bring in scans and PDFs you already have, and NeuVault organizes them the same way.",
      },
    ],
  },

  "organize-important-documents-digitally": {
    dateModified: "2026-09-29",
    steps: {
      "Start with categories you will actually remember": {
        details: [
          "Folders fail when they are designed on a quiet Sunday and used on a busy Tuesday. Broad areas of life survive because you never have to think about which one a document belongs to.",
        ],
        inApp: [
          "When you set up NeuVault, you choose the areas of life that matter to you, and your vault starts with matching groups.",
          "New files are filed into those groups and their subgroups automatically, so you do not have to sort as you go.",
          "Rename a group or create a new one when your life does not fit the defaults.",
        ],
      },
      "Keep document context attached": {
        inApp: [
          "Each document keeps its summary, tags, notes and reminders together, so opening it tells you what it is and what happens next.",
          "Use Link documents to connect records that belong together and find them under Related documents.",
          "On Mac and Windows, lay related records out in a Vault Map to see a whole issue, such as a house move or a visa application, at a glance.",
        ],
      },
      "Give active paperwork a reminder, and let reference stay quiet": {
        details: [
          "Most documents are reference: you keep them in case. A few are active: something has to happen by a date. Treating them the same is why important deadlines get buried under old receipts.",
        ],
        inApp: [
          "Give active items a reminder, or set Resurfacing to Recurring so they come back on a schedule.",
          "Pin the documents you open often so they stay one tap away in your pinned documents.",
          "Reference items need nothing more. They stay in their group and in search.",
        ],
      },
      "Review the system through retrieval, not just storage": {
        inApp: [
          "Every few weeks, try to find something from memory using search. If it takes more than one try, add a tag or improve the summary so it is easier next time.",
          "Let new files come to you. On Mac and Windows, Watch folder imports new files from folders you choose, including ones your cloud drive syncs.",
          "Use Import Email Attachments to bring in attachments from Gmail or Microsoft, and approve what goes into your vault.",
        ],
      },
    },
    checklist: [
      "Pick the few areas of life your paperwork belongs to",
      "Let new files be filed for you, and correct only what is wrong",
      "Link records that belong to the same issue",
      "Put reminders on active paperwork and pin what you open often",
      "Test your system by searching from memory",
    ],
    faqs: [
      {
        question: "Do I have to create folders myself?",
        answer:
          "No. NeuVault files new documents into groups and subgroups for you. You can still rename groups, create your own and move anything that landed in the wrong place.",
      },
      {
        question: "Can NeuVault bring in files automatically?",
        answer:
          "Yes. On Mac and Windows it can watch folders you choose and import new files, including folders your cloud drive syncs. It can also import email attachments from Gmail and Microsoft accounts.",
      },
    ],
  },

  "track-passport-visa-and-id-expiry-dates": {
    dateModified: "2026-09-29",
    steps: {
      "Store the document where it can be resurfaced later": {
        inApp: [
          "Scan the passport, visa, permit or ID with Open scanner on your phone, or add the file you already have with Add files or scans.",
          "NeuVault files it with your other identity and travel documents and reads the expiry date from the page.",
        ],
      },
      "Record the date and plan for the lead time": {
        details: [
          "Many renewals take weeks, and some travel rules require months of validity left on a passport. The date that matters is often not the expiry date itself but the last sensible day to start the renewal.",
        ],
        inApp: [
          "Dates NeuVault finds appear in Reminders, sorted into Overdue, Due today, Due soon, Upcoming and Monitor.",
          "You are reminded a month before, two weeks before and on the day.",
          "If your renewal takes longer, open the document, go to Resurface this later? and set an earlier date of your own.",
        ],
      },
      "Attach context for the follow-up": {
        inApp: [
          "Use Link documents to connect the passport to the photos, forms, receipts and past applications you will need.",
          "Write down what the renewal needs in a note, and use Connect files to attach it to the document.",
        ],
      },
      "Use recurring resurfacing for critical IDs": {
        inApp: [
          "Set Resurfacing to Recurring and choose Yearly for passports and IDs, or Monthly while an application is in progress.",
          "When a reminder comes up and you have dealt with it, choose Mark reviewed.",
          "On Mac and Windows, you can also Add to calendar.",
        ],
      },
    },
    checklist: [
      "Scan every passport, visa, permit and ID in the household",
      "Check each one shows its expiry date in Reminders",
      "Add an earlier reminder for renewals that take time",
      "Link the supporting documents each renewal needs",
      "Set recurring reminders for the documents you cannot afford to miss",
    ],
    faqs: [
      {
        question: "When will NeuVault remind me about an expiry date?",
        answer:
          "For dates it finds in your documents, NeuVault reminds you a month before, two weeks before and on the day, and the item stays in Reminders until you mark it reviewed.",
      },
      {
        question: "Can I be reminded earlier than a month before?",
        answer:
          "Yes. Open the document and set your own date under Resurface this later?, or make it recurring. Your own reminder comes up alongside the automatic ones.",
      },
    ],
  },

  "search-old-documents-without-folder-chaos": {
    dateModified: "2026-09-29",
    steps: {
      "Stop depending on filenames alone": {
        inApp: [
          "NeuVault gives every file a readable title, a summary and tags when it comes in, so you are not stuck searching for names like IMG_4821.",
        ],
      },
      "Use type, date, and issue context together": {
        details: [
          "People remember documents by situation: the landlord, the move, the time the car broke down. A good search setup lets you start from that memory instead of from a filename.",
        ],
        inApp: [
          "Search looks through titles, summaries, notes, groups and tags, and it works offline.",
          "On Mac and Windows, the Vault can filter by document type and by date.",
          "On iPhone and Android, sort by most recent, oldest or A to Z to narrow things down.",
        ],
      },
      "Keep linked records together": {
        inApp: [
          "Use Link documents to connect records from the same issue, then open any one of them to see the rest under Related documents.",
          "On Mac and Windows, a Vault Map shows the whole set on one canvas.",
        ],
      },
      "Review retrieval during quiet moments": {
        inApp: [
          "Ask Nova when you only remember the situation, for example the receipt for the sofa from when you moved. Nova answers from what is in your vault.",
          "If a search misses, open the document and improve its summary or tags so it turns up next time.",
        ],
      },
    },
    checklist: [
      "Let every new file get a readable title, summary and tags",
      "Search by what you remember, not the filename",
      "Use type and date filters on desktop to narrow results",
      "Link documents that belong to the same issue",
      "Ask Nova when you only remember the situation",
    ],
    faqs: [
      {
        question: "Does NeuVault search work offline?",
        answer:
          "Yes. Searching your vault happens on your device, so it works without a connection. Asking Nova needs one.",
      },
      {
        question: "Can I find a document when I only remember roughly what it was?",
        answer:
          "Yes. Search matches the summary and tags NeuVault writes for each file, not just its name, and you can ask Nova in plain words when you only remember the situation.",
      },
    ],
  },

  "back-up-important-documents-securely": {
    dateModified: "2026-09-29",
    steps: {
      "Choose a backup format built for recovery": {
        inApp: [
          "NeuVault packs your vault, including documents, notes and recordings, into one backup file you can restore later.",
        ],
      },
      "Encrypt before the backup leaves your device": {
        inApp: [
          "Each backup is sealed on your device with your Recovery Key before it is saved anywhere.",
          "Set up your Recovery Key the first time you back up, and keep it somewhere safe, such as a password manager. NeuVault cannot recover it for you.",
        ],
      },
      "Use storage you control": {
        inApp: [
          "On Mac and Windows, go to Settings and choose Export backup, then pick any folder, including a synced cloud folder.",
          "On iPhone and Android, open Settings, go to Backup & Restore and back up your vault, then save it where you want: the Files app on iPhone, or Files or Google Drive on Android.",
        ],
      },
      "Set reminders and test restore paths": {
        inApp: [
          "Turn on Backup reminders and choose how often: weekly, every two weeks, monthly, every two months or yearly.",
          "Restore backup shows you what a backup contains and checks it before anything is written back.",
          "A backup made on your phone can be restored on your computer, and the other way round.",
        ],
      },
    },
    checklist: [
      "Set up your Recovery Key and store it safely",
      "Make your first backup today",
      "Save it somewhere you control, ideally in two places",
      "Turn on Backup reminders",
      "Try a restore preview so you know the path works",
    ],
    faqs: [
      {
        question: "What happens if I lose my Recovery Key?",
        answer:
          "Backups sealed with that key cannot be opened. Keep the key somewhere safe, and if you think it is lost, set up a new one and make a fresh backup straight away.",
      },
      {
        question: "Can I restore a phone backup on my computer?",
        answer:
          "Yes. NeuVault backups restore across iPhone, Android, Mac and Windows, and you see what is inside before anything is restored.",
      },
    ],
  },

  "turn-voice-notes-into-searchable-records": {
    dateModified: "2026-09-29",
    steps: {
      "Capture the thought while it is fresh": {
        details: [
          "If you are recording other people, such as in a meeting or a call, let them know and ask first.",
        ],
        inApp: [
          "Open Note & Voice and choose Voice note for one speaker or Meeting for several.",
          "Record in the app, or upload a recording you already have.",
        ],
      },
      "Transcribe into readable structure": {
        inApp: [
          "NeuVault writes the result into the note itself: an overview, key points, action items and the full transcript.",
          "In Meeting mode, each speaker is named in the transcript.",
          "The original recording stays with the note, so you can play back any part of it.",
        ],
      },
      "Link the voice note to the document issue": {
        inApp: [
          "Use Connect files in the note to attach the documents it talks about, such as the contract you were discussing.",
        ],
      },
      "Keep voice-derived notes searchable and exportable": {
        inApp: [
          "Voice notes are searchable like the rest of your vault, and can carry reminders like any document.",
          "Convert a note to PDF or Word to share it. On iPhone and Android you can also export it as Markdown.",
        ],
      },
    },
    checklist: [
      "Choose Voice note or Meeting before you start",
      "Ask permission before recording other people",
      "Check the overview and action items after transcription",
      "Connect the note to the documents it explains",
      "Add a reminder for any action item with a date",
    ],
    faqs: [
      {
        question: "Can NeuVault tell different speakers apart?",
        answer:
          "Yes. Choose Meeting before you record or upload, and the transcript names each speaker.",
      },
      {
        question: "Can I transcribe a recording I already have?",
        answer:
          "Yes. In Note & Voice, upload an existing audio file instead of recording, and NeuVault turns it into a structured note the same way.",
      },
    ],
  },
};
