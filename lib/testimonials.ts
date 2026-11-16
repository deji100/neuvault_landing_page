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

// Layout samples are rendered only by the development server, never in production.
export const previewTestimonials: Testimonial[] = [
  {
    id: "preview-capture", feature: "Less sorting", rating: 5,
    quote: "My notes, files and links are finally in one place. I spend less time sorting and more time using what I saved.",
    name: "Sample reviewer", role: "Capture & organization",
  },
  {
    id: "preview-map", feature: "Seeing the connections", rating: 5,
    quote: "Putting my research and working notes on one map makes it easier to see how the ideas fit together.",
    name: "Sample reviewer", role: "Vault Map",
  },
  {
    id: "preview-reminders", feature: "Remembering the date", rating: 5,
    quote: "The date was buried in a document I had already saved. Having it brought back to my attention is the useful part.",
    name: "Sample reviewer", role: "Reminders",
  },
  {
    id: "preview-planner", feature: "A clearer next step", rating: 5,
    quote: "Keeping the original notes attached to a task means I can pick up the work without searching for the details again.",
    name: "Sample reviewer", role: "Planner",
  },
  {
    id: "preview-audio", feature: "Back to the conversation", rating: 5,
    quote: "I can return to the transcript and find what was said without playing the whole recording again.",
    name: "Sample reviewer", role: "Voice transcription",
  },
  {
    id: "preview-local", feature: "My files, close at hand", rating: 5,
    quote: "I like being able to open my saved files and keep working on notes when I am offline.",
    name: "Sample reviewer", role: "Local-first workspace",
  },
];
