// Shared by the animation and desktop presentation so submission, the Queue
// badge and the resulting folder count change at the same moment.
export const CAPTURE_TIMELINE = {
  duration: 86000,
  homeStart: 2000,
  autoImportOpen: 2400,
  queueStart: 8000,
  notesStart: 14000,
  titleStart: 15500,
  bodyStart: 17800,
  audioImported: 6500,
  // This is a scripted demo, not a live transcription request. Keep the full
  // visible loading sequence within two seconds of opening Note & Voice.
  transcriptReady: 15500,
  summaryReady: 16000,
  audioPlayback: 17000,
  noteSaved: 50000,
  vaultStart: 50000,
  noteComplete: 50000,
  entertainmentOpen: 54000,
  podcastsOpen: 58000,
  documentOpen: 62000,
} as const;

export const DEVELOPMENT_NOTE_TITLE = "Reliable API delivery";
export const DEVELOPMENT_NOTE = `Goal
Build a reliable API that keeps customer data consistent and makes failures easy to diagnose.

Architecture
Use React and TypeScript for the client, a versioned REST API, and PostgreSQL for durable records. Run slow imports in background workers so requests stay responsive.

Implementation plan
• Validate requests and return clear error messages.
• Make retries safe with idempotency keys.
• Add integration tests for timeouts and duplicate requests.
• Track request IDs, queue depth, and processing failures.

Release checklist
Review the migration, test the rollback, and deploy to staging before production.`;

export const TRANSCRIPT_TITLE = "Reality Life Interview: The Dynasty UConn Huskies";
export const RECORDING_FILE = TRANSCRIPT_TITLE + ".mp3";
