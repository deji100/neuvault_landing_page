import { Baskervville } from "next/font/google";
import { CalendarClock, KeyRound, Puzzle, SearchX, type LucideIcon } from "lucide-react";

import styles from "./Problem.module.css";

const serif = Baskervville({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-baskervville",
});

const SURVEY_URL = "https://web.archive.org/web/20241112204740/https://www.summithosting.com/digital-hoarders/";

const problems: { title: string; icon: LucideIcon; tone: string; copy: React.ReactNode }[] = [
  {
    title: "Your data isn't really yours",
    icon: KeyRound,
    tone: "#5e5ce6",
    copy: "Most apps keep your work on their servers. Try leaving with everything intact, and it's rarely simple.",
  },
  {
    title: "Saved, then lost",
    icon: SearchX,
    tone: "#007aff",
    copy: (
      <>
        The average American has around 83 bookmarked websites and 582 saved phone photos.
        <sup>
          <a href="#problem-note-1" aria-describedby="problem-notes-label" id="problem-ref-1">
            1
          </a>
        </sup>{" "}
        It isn&rsquo;t that you don&rsquo;t save things. It&rsquo;s that you can never find them again.
      </>
    ),
  },
  {
    title: "One goal, five apps",
    icon: Puzzle,
    tone: "#34c759",
    copy: "A scanner app for receipts. A notes app for ideas. A recorder for meetings. Bookmarks for links. A calendar for deadlines. A cloud drive for backups. None of them talk to each other, so you end up being the one who connects everything.",
  },
  {
    title: "Deadlines hiding in plain sight",
    icon: CalendarClock,
    tone: "#ff9500",
    copy: "Renewal dates, payment deadlines and event dates sit inside documents you'll never reopen, until it's too late.",
  },
];

const quotes = [
  {
    text: "879 tabs open on my phone. 1,501 screenshots. 4,026 videos in Watch Later.",
    by: "Sal's Typewriter, Substack",
    href: "https://salstypewriter.substack.com/p/curse-the-bookmarks-saves-and-screenshots",
  },
  {
    text: "My desktop is covered in screenshots I meant to sort last week (or possibly last year).",
    by: "Reader's Digest",
  },
  {
    text: "I know I saved that somewhere.",
    by: "Almost everyone, at some point",
  },
];

export default function Problem() {
  return (
    <div className={`${styles.problem} ${serif.variable}`}>
      <div className={styles.head}>
        <p className={styles.kicker}>The problem</p>
        <h2>You saved it for later. Later never came.</h2>
        <p>
          Screenshots in your camera roll. Invoices in WhatsApp chats. Contracts buried in email. Forty
          tabs &ldquo;for later.&rdquo; A Watch Later list you&rsquo;ll never finish.
        </p>
      </div>

      <div className={styles.cards}>
        {problems.map(({ title, icon: Icon, tone, copy }) => (
          <article key={title} style={{ "--tone": tone } as React.CSSProperties}>
            <span className={styles.icon} aria-hidden="true">
              <Icon size={20} strokeWidth={2} />
            </span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>

      <ul className={styles.quotes}>
        {quotes.map((quote) => (
          <li key={quote.text}>
            <blockquote>&ldquo;{quote.text}&rdquo;</blockquote>
            <p>
              &mdash;{" "}
              {quote.href ? (
                <a href={quote.href} target="_blank" rel="noreferrer">
                  {quote.by}
                </a>
              ) : (
                quote.by
              )}
            </p>
          </li>
        ))}
      </ul>

      <p className={styles.turn}>NeuVault brings it all into one app, and fixes all four.</p>

      <footer className={styles.notes}>
        <h3 id="problem-notes-label" className={styles.srOnly}>
          Footnotes
        </h3>
        <p id="problem-note-1">
          <a href="#problem-ref-1" aria-label="Back to text">
            ¹
          </a>{" "}
          Summit Hosting survey of 1,000 Americans.{" "}
          <a href={SURVEY_URL} target="_blank" rel="noreferrer">
            Source
          </a>
        </p>
      </footer>
    </div>
  );
}
