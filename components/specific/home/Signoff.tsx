import localFont from "next/font/local";

import styles from "./Signoff.module.css";

// Bundled like the other site fonts: a Google Fonts fetch at build time
// failed the 2026-11-28 deploy.
const serif = localFont({
  src: [
    { path: "../../../app/fonts/baskervville-400-latin.woff2", weight: "400", style: "normal" },
    { path: "../../../app/fonts/baskervville-500-latin.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
});

/** The page's last word: a quiet two-line statement, then the line it leaves you with, edge to edge. */
export default function Signoff() {
  return (
    <section className={`${styles.signoff} ${serif.className}`} aria-labelledby="signoff-line">
      <span className={styles.rule} aria-hidden="true" />
      <p className={styles.statement}>
        Folders keep what you save.
        <br />
        They never tell you when it matters.
      </p>
      <p id="signoff-line" className={styles.giant}>
        Save it for later.
      </p>
    </section>
  );
}
