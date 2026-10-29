import type { SeoFaq } from "@/lib/seo";

/** Shared by the page body and the FAQ structured data so the two never drift. */
export const botFreeFaqs: SeoFaq[] = [
  {
    question: "Does anything join my meeting when NeuVault records it?",
    answer:
      "No. NeuVault records from your own device, on Mac, Windows, iPhone and Android. Nothing appears in the participant list, nothing is scheduled through your calendar, and the other people's apps don't need anything installed.",
  },
  {
    question: "Does NeuVault hear the other side of a video call?",
    answer:
      "On Windows, and on Mac with macOS 14.2 or later, it records your microphone and the call's audio together; otherwise it records your microphone and tells you so. On iPhone and Android it records the room through the phone's microphone, which suits in-person meetings and calls on speaker.",
  },
  {
    question: "Does NeuVault transcribe live during the meeting?",
    answer:
      "No. The transcript, overview, key points and action items are written after the recording ends, and the transcript scrolls along with the audio when you play it back.",
  },
  {
    question: "Is the recording kept?",
    answer:
      "Yes. The audio stays with the note on your device. A single recording can run for about 2 to 3 hours.",
  },
  {
    question: "Where do my recordings and transcripts live?",
    answer:
      "On your device. Your files aren't kept on NeuVault's servers. The audio is sent to our AI provider to be transcribed; NeuVault doesn't store it, it's never used to train AI models, and our provider may keep processing logs for up to 30 days for safety monitoring, then deletes them.",
  },
  {
    question: "Do I still need to tell people I'm recording?",
    answer:
      "Yes. Recording laws differ by country and state. Whichever app you use, tell people when you're recording and get consent where the law requires it. Recording from your device doesn't change that.",
  },
  {
    question: "Which meeting apps does this work with?",
    answer:
      "Any of them. Because NeuVault records what your device hears rather than joining the call, it works the same with Zoom, Google Meet, Microsoft Teams, a phone call on speaker, or a conversation across a table.",
  },
];
