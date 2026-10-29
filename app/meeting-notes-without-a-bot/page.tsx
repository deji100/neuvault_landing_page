"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, FileText, HelpCircle, Mic, ShieldCheck, Smartphone, UserX } from "lucide-react";

import { Bullets, Callout, LegalPage, MetaPill, Section, type TocItem } from "@/components/specific/legal/Legal";
import { botFreeFaqs } from "./faqs";

const SUPPORT_EMAIL = "support@neuvault.app";

const toc: TocItem[] = [
  { id: "why", label: "Why people look for this" },
  { id: "how", label: "How NeuVault records" },
  { id: "after", label: "What you get afterwards" },
  { id: "where", label: "Where it all lives" },
  { id: "consent", label: "Consent still applies" },
  { id: "compare", label: "Compared with Otter, Granola and Fathom" },
  { id: "faq", label: "Questions" },
];

export default function MeetingNotesWithoutABotPage() {
  return (
    <LegalPage
      kicker="NeuVault Help"
      title="AI meeting notes without a bot"
      lede={
        <>
          NeuVault records meetings from your own device, so nothing joins the call, and writes the notes afterwards:
          an overview, key points, action items and a transcript that stay with the recording, on your device. Here is
          exactly how that works on each platform, and what it doesn&apos;t do.
        </>
      }
      meta={
        <>
          <MetaPill icon={Mic}>Mac, Windows, iPhone, Android</MetaPill>
          <MetaPill icon={HelpCircle} href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</MetaPill>
        </>
      }
      highlights={[
        { icon: UserX, label: "No notetaker in the participant list, ever" },
        { icon: FileText, label: "Overview, key points, action items, transcript" },
        { icon: ShieldCheck, label: "Recording and notes stay on your device" },
        { icon: CalendarDays, label: "Dates in the meeting become reminders" },
      ]}
      toc={toc}
      footnote="NeuVault — Your data. Your device. Your control."
    >
      <Section id="why" title="1. Why people look for this" icon={UserX}>
        <p>
          Most AI notetakers work by joining the meeting. A bot appears in the participant list, often invited
          automatically from your calendar, and the recording, the video and the transcript go to the notetaker&apos;s
          cloud. That is convenient, and it is also why people ask for an alternative:
        </p>
        <Bullets>
          <li>
            <strong>The bot is visible.</strong> Everyone on the call sees it, and some people, and some companies,
            don&apos;t want it there.
          </li>
          <li>
            <strong>It joins on its own.</strong> Calendar-linked bots can turn up at meetings you forgot were being
            recorded, or that you didn&apos;t attend.
          </li>
          <li>
            <strong>The recording leaves your hands.</strong> Audio, video and transcripts live on the vendor&apos;s
            servers, under the vendor&apos;s retention and training rules.
          </li>
          <li>
            <strong>It only works for video calls.</strong> A bot can&apos;t sit in on a conversation across a table or
            a phone call.
          </li>
        </Bullets>
      </Section>

      <Section id="how" title="2. How NeuVault records" icon={Mic}>
        <p>
          NeuVault never joins anything. It records what your device hears, the way a voice recorder would, so it works
          the same with Zoom, Google Meet, Microsoft Teams, a phone call on speaker, or a meeting in a room.
        </p>
        <h3>On Mac and Windows</h3>
        <Bullets>
          <li>
            Start a recording from the Notes page. NeuVault records your microphone and the call&apos;s audio together,
            so both sides of a video call are captured. On Mac this needs macOS 14.2 or later and your permission to
            record system audio; if either is missing, it records your microphone only and says so on screen.
          </li>
          <li>
            When a meeting app starts using your microphone, NeuVault can notice and offer to record. You decide each
            time; nothing starts on its own.
          </li>
          <li>Write your own notes while it records. The note and the recording stay together.</li>
        </Bullets>
        <h3>On iPhone and Android</h3>
        <Bullets>
          <li>
            Tap record. The phone&apos;s microphone captures the room, which suits in-person meetings, lectures,
            interviews and calls on speaker.
          </li>
          <li>Or record in any other app and share the audio file to NeuVault; it is transcribed the same way.</li>
        </Bullets>
        <Callout>
          <strong>What it doesn&apos;t do:</strong> NeuVault doesn&apos;t transcribe live during the meeting, doesn&apos;t
          connect to your calendar, and doesn&apos;t capture video or shared screens. The notes are written when the
          recording ends.
        </Callout>
      </Section>

      <Section id="after" title="3. What you get afterwards" icon={FileText}>
        <p>When the recording ends, NeuVault writes a meeting-style note from it:</p>
        <Bullets>
          <li>
            <strong>Overview:</strong> what the meeting was about, in a few lines.
          </li>
          <li>
            <strong>Key points:</strong> the decisions and the things worth remembering.
          </li>
          <li>
            <strong>Action items:</strong> the follow-ups, highlighted so they don&apos;t get lost.
          </li>
          <li>
            <strong>Transcript:</strong> the full text, with speakers labeled, that scrolls along as the audio plays.
          </li>
        </Bullets>
        <p>
          Transcription works in many languages, so you can record in the language you speak. The recording stays with
          the note, and a single recording can run for about 2 to 3 hours. Then the meeting joins the rest of your
          vault: Nova gives it a title, tags and a group, connects it to related files and links, and any date mentioned
          in it, like a deadline agreed on the call, becomes a reminder a month before, two weeks before and on the
          day.
        </p>
      </Section>

      <Section id="where" title="4. Where it all lives" icon={ShieldCheck}>
        <Bullets>
          <li>
            <strong>The recording, the note and the transcript live on your device.</strong> Your files aren&apos;t kept
            on NeuVault&apos;s servers.
          </li>
          <li>
            <strong>Transcription uses AI.</strong> The audio is sent to our AI provider to be transcribed; NeuVault
            doesn&apos;t store it, and it&apos;s never used to train AI models. Our provider may keep processing logs for
            up to 30 days for safety monitoring, then deletes them. See the{" "}
            <Link href="/privacy-policy">privacy policy</Link>.
          </li>
          <li>
            <strong>Backups are yours alone.</strong> One encrypted backup, opened only by your Recovery Key, moves your
            vault, recordings included, to any of your devices.
          </li>
          <li>
            <strong>Getting a meeting out:</strong> export the note as PDF, Word or Markdown, share the audio file as it
            is, or export a whole Vault Map as one package.
          </li>
        </Bullets>
      </Section>

      <Section id="consent" title="5. Consent still applies" icon={Smartphone}>
        <p>
          Recording from your own device doesn&apos;t change the law. Recording rules differ by country and state, and
          some require everyone on the call to agree. Whichever app you use, tell people when you&apos;re recording and
          get consent where the law requires it. The difference with NeuVault is that the choice to record is yours,
          each time, and the recording never leaves your device except for transcription.
        </p>
      </Section>

      <Section id="compare" title="6. Compared with Otter, Granola and Fathom" icon={ArrowRight}>
        <p>Each comparison page states the other app&apos;s strengths plainly, with prices and sources checked on the day:</p>
        <Bullets>
          <li>
            <Link href="/compare/otter">NeuVault vs Otter</Link>: Otter&apos;s notetaker joins calls from your calendar
            and transcribes live; its desktop app can also record without a bot.
          </li>
          <li>
            <Link href="/compare/granola">NeuVault vs Granola</Link>: Granola is bot-free too, but deletes the audio
            after transcription and keeps your notes in its cloud.
          </li>
          <li>
            <Link href="/compare/fathom">NeuVault vs Fathom</Link>: Fathom&apos;s bot joins by default and records video;
            bot-free capture is in its Mac app.
          </li>
        </Bullets>
        <p>
          Or see <Link href="/compare">every comparison</Link>.
        </p>
      </Section>

      <Section id="faq" title="7. Questions" icon={HelpCircle}>
        {botFreeFaqs.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </Section>
    </LegalPage>
  );
}
