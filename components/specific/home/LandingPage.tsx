import AppTour from "./AppTour";
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

      <section id="tour" className={styles.tour}>
        <div className={styles.wrap}>
          <AppTour />
        </div>
      </section>

      <section id="problem" className={styles.problemSection}>
        <div className={styles.wrap}>
          <Problem />
        </div>
      </section>

      <section id="features" className={styles.featuresSection}>
        <div className={styles.wrap}>
          <Features />
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
