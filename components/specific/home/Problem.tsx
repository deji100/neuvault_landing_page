import { ArrowRight, ArrowUpRight, CalendarClock, FolderOpen, KeyRound, Search, type LucideIcon } from "lucide-react";
import styles from "./Problem.module.css";

const pairs: {
  icon: LucideIcon;
  problem: string;
  friction: string;
  solution: string;
  outcome: string;
  links?: { label: string; href: string }[];
}[] = [
  {
    icon: FolderOpen,
    problem: "Saved in too many places.",
    friction: "Notes, files and links end up in different apps.",
    solution: "Keep them in one vault.",
    outcome: "Bring documents, scans, notes, recordings and links into one place.",
    links: [{ label: "See capture and organization", href: "#capture" }],
  },
  {
    icon: Search,
    problem: "Hard to find again.",
    friction: "You remember saving it, but not where.",
    solution: "Find it with its context.",
    outcome: "Search your vault or ask Nova. Put related files and notes together on a Vault Map.",
    links: [{ label: "See Vault Map", href: "#vault-map-demo" }],
  },
  {
    icon: CalendarClock,
    problem: "Easy to miss a date.",
    friction: "Renewals and deadlines stay buried in documents.",
    solution: "Bring dates into view.",
    outcome: "See AI-detected dates and reminders you set. Plan the next step with the source attached.",
    links: [{ label: "See Reminders", href: "#reminders-demo" }, { label: "See Planner", href: "#planner-demo" }],
  },
  {
    icon: KeyRound,
    problem: "You want more control.",
    friction: "Your notes and files should stay available to you.",
    solution: "Keep your files on your device.",
    outcome: "Read saved files, edit notes and manage tasks offline. Back them up with your Recovery Key.",
  },
];

export default function Problem() {
  return <div className={styles.problem}>
    <header className={styles.head}>
      <p className={styles.kicker}>The problem &amp; the solution</p>
      <h2>Everything you save.<br/><span>Easier to find and use.</span></h2>
      <p>Your work gets scattered across apps. NeuVault keeps the pieces together, with the context and dates you need.</p>
    </header>
    <div id="features" className={styles.comparison} aria-label="Everyday problems and how NeuVault helps">
      <div className={styles.columnLabels} aria-hidden="true"><span>The problem</span><span/><span>With NeuVault</span></div>
      <ul className={styles.pairs}>
        {pairs.map(({ icon: Icon, problem, friction, solution, outcome, links }) => <li className={styles.pair} key={problem}>
          <div className={styles.friction}><span className={styles.icon} aria-hidden="true"><Icon size={20}/></span><div><span className={styles.mobileLabel}>The problem</span><h3>{problem}</h3><p>{friction}</p></div></div>
          <ArrowRight className={styles.arrow} aria-hidden="true" size={20}/>
          <div className={styles.solution}><span className={styles.mobileLabel}>With NeuVault</span><h3>{solution}</h3><p>{outcome}</p>{links && <div className={styles.links}>{links.map(({ label, href }) => <a key={href} href={href}>{label}<ArrowUpRight size={14} aria-hidden="true"/></a>)}</div>}</div>
        </li>)}
      </ul>
    </div>
    <p className={styles.connectionNote}>AI features and Planner sync need an internet connection.</p>
  </div>;
}
