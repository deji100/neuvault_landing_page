export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  feature: string;
  role?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  sourceUrl?: string;
};

// Add real customer quotes here only after approval to publish their words/name.
// An individual rating must come from the reviewer; do not infer one from praise.
export const testimonials: Testimonial[] = [];

export const productHighlights = [
  { id: "capture", feature: "Less sorting", title: "Everything in one place.", copy: "Save notes, files and links together. Use AI to summarize and sort them when you choose.", product: "Capture & organization", href: "/#capture" },
  { id: "map", feature: "See the connections", title: "Make the ideas fit.", copy: "Connect related files and notes on a desktop canvas. Compare sources with Nova and read them side by side.", product: "Vault Map", href: "/#vault-map-demo" },
  { id: "reminders", feature: "Remember the date", title: "Bring deadlines into view.", copy: "Review important dates AI finds in your documents, or set your own reminders to return when it matters.", product: "Reminders", href: "/#reminders-demo" },
  { id: "planner", feature: "A clearer next step", title: "Keep the details with the task.", copy: "Plan tasks and events with the original notes and files attached, ready when you pick up the work.", product: "Planner", href: "/#planner-demo" },
  { id: "audio", feature: "Back to the conversation", title: "Find what was said.", copy: "Turn recordings into summaries and searchable transcripts. Follow the text as the audio plays.", product: "Voice transcription", href: "/#capture" },
  { id: "local", feature: "Your files, close at hand", title: "Keep working offline.", copy: "Open saved files, edit notes and manage tasks on your device. AI processing needs an internet connection.", product: "Local-first workspace", href: "/#privacy-at-a-glance" },
];
