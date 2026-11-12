import AppTour from "./AppTour";
import { ChevronDown } from "lucide-react";
import CaptureDemo from "./CaptureDemo";
import PlannerDemo from "./PlannerDemo";
import VaultMapDemo from "./VaultMapDemo";
import RemindersDemo from "./RemindersDemo";
import Closing from "./Closing";
import Features from "./Features";
import HomeHero from "./HomeHero";
import Problem from "./Problem";
import Signoff from "./Signoff";
import VideoCarousel from "./VideoCarousel";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <HomeHero />
      <CaptureDemo />
      <PlannerDemo />
      <VaultMapDemo />
      <RemindersDemo />

      <section id="problem" className={styles.problemSection}>
        <div className={styles.wrap}>
          <Problem />
          <details id="product-details" className={styles.productDetails}>
            <summary><span>More about privacy, backups and imports</span><ChevronDown size={18} aria-hidden="true"/></summary>
            <div className={styles.productDetailsBody}><Features /></div>
          </details>
        </div>
      </section>

      <section id="tour" className={styles.tour}>
        <div className={styles.wrap}>
          <AppTour />
        </div>
      </section>

      <section id="videos" className={styles.videos}>
        <div className={styles.wrap}>
          <VideoCarousel />
        </div>
      </section>

      <section id="download" className={styles.final}>
        <div className={styles.wrap}>
          <Closing />
        </div>
      </section>

      <Signoff />
    </div>
  );
}
