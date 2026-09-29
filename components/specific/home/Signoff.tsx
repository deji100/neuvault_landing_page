import { Baskervville } from "next/font/google";

import styles from "./Signoff.module.css";

const serif = Baskervville({
  weight: ["400", "500"],
  subsets: ["latin"],
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
