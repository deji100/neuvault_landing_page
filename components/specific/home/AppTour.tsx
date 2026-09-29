"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

import { CarouselControls, useCarousel } from "./carousel";
import styles from "./AppTour.module.css";

type Slide = {
  src: string;
  title: string;
  copy: string;
  /** Pixel size, when it differs from the default capture size of its carousel. */
  size?: [number, number];
};

/** Titles reuse the app's own welcome-carousel wording where one fits. */
const desktopSlides: Slide[] = [
  {
    src: "/desktop-images/home.png",
    title: "Bring the rest with you.",
    copy: "Drop in files, scans and chat exports, or watch a folder and let new files come to you.",
  },
  {
    src: "/desktop-images/vault.png",
    title: "Sorted before you look.",
    copy: "Everything lands in groups by what it is, not by where you happened to save it.",
  },
  {
    src: "/desktop-images/doc-info.png",
    title: "Know a file at a glance.",
    copy: "A summary, tags, dates and related documents sit beside every file.",
  },
  {
    src: "/desktop-images/note-audio-2.png",
    title: "From voice to structured notes.",
    copy: "A recording becomes an overview, key points and the full transcript, all in the note itself.",
  },
  {
    src: "/desktop-images/reminder.png",
    title: "Keep important dates in sight.",
    copy: "Dates found inside your documents show up here, overdue first, before they pass.",
  },
  {
    src: "/desktop-images/vault-map-overview.png",
    title: "Give everything a connection.",
    copy: "Lay related documents out on a map, and open them side by side.",
  },
  {
    src: "/desktop-images/nova-assistant-1.png",
    title: "Find it. Ask about it.",
    copy: "Ask Nova what needs you, and get answers drawn from your own vault.",
  },
  {
    src: "/desktop-images/backup.png",
    title: "Your backup. Your control.",
    copy: "Encrypted backups to the place you choose, sealed with a key only you hold.",
  },
];

const mobileSlides: Slide[] = [
  {
    src: "/mobile-images/attention-m.png",
    title: "What needs you, first.",
    copy: "Deadlines and follow-ups that need a look, waiting on your home screen.",
  },
  {
    src: "/mobile-images/vault-m.png",
    title: "The whole vault, in your pocket.",
    copy: "The same groups as on your desktop, ready wherever you are.",
  },
  {
    src: "/mobile-images/scan3.jpg",
    title: "Scan the whole stack at once.",
    copy: "Scan document after document in one batch, then bring them all in together.",
    size: [1080, 2364],
  },
  {
    src: "/mobile-images/whatsapp.jpg",
    title: "Share straight from WhatsApp.",
    copy: "Pick NeuVault in WhatsApp's share sheet and the file comes straight in.",
    size: [1080, 2364],
  },
  {
    src: "/mobile-images/whatsapp2.jpg",
    title: "Choose what comes in.",
    copy: "Preview what you shared, pick what to keep, and organize it now or save it to your Inbox.",
    size: [1080, 2364],
  },
  {
    src: "/mobile-images/smart-doc-view.png",
    title: "Understood, not just stored.",
    copy: "Open any document to its summary, tags, notes and reminders.",
  },
  {
    src: "/mobile-images/viewer.png",
    title: "Read it properly.",
    copy: "A clean reader view for long documents and transcripts.",
  },
  {
    src: "/mobile-images/text-editor.png",
    title: "Say it, keep it.",
    copy: "Write notes with the recording playing right alongside them.",
  },
  {
    src: "/mobile-images/share.png",
    title: "Share what matters.",
    copy: "Pick several documents and send them together.",
  },
];

const DESKTOP_INTERVAL = 5500;
const MOBILE_INTERVAL = 4500;
function Caption({ slides, index, live }: { slides: Slide[]; index: number; live: boolean }) {
  const slide = slides[index];
  return (
    <div className={styles.caption} aria-live={live ? "polite" : "off"}>
      <p className={styles.count}>
        {String(index + 1).padStart(2, "0")} <span>/ {String(slides.length).padStart(2, "0")}</span>
      </p>
      <div key={slide.src} className={styles.captionText}>
        <h3>{slide.title}</h3>
        <p>{slide.copy}</p>
      </div>
    </div>
  );
}

function DesktopCarousel() {
  const carousel = useCarousel(desktopSlides.length, DESKTOP_INTERVAL);
  const { index, rootProps, swipeProps, running } = carousel;

  return (
    <div className={styles.carousel} aria-roledescription="carousel" aria-label="NeuVault on desktop" {...rootProps}>
      <div className={styles.window} {...swipeProps}>
        <div className={styles.chrome} aria-hidden="true">
          <i />
          <i />
          <i />
          <span>NeuVault</span>
        </div>
        <div className={styles.desktopStage}>
          {desktopSlides.map((slide, i) => (
            <div
              key={slide.src}
              className={styles.desktopSlide}
              data-active={i === index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${desktopSlides.length}`}
              aria-hidden={i !== index}
            >
              <Image
                src={slide.src}
                alt={`NeuVault desktop: ${slide.title} ${slide.copy}`}
                width={3456}
                height={2234}
                sizes="(min-width: 1140px) 1072px, calc(100vw - 48px)"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <Caption slides={desktopSlides} index={index} live={!running} />
        <CarouselControls carousel={carousel} items={desktopSlides.map((s) => s.title)} interval={DESKTOP_INTERVAL} label="desktop" />
      </div>
    </div>
  );
}

function MobileCarousel() {
  const carousel = useCarousel(mobileSlides.length, MOBILE_INTERVAL);
  const { index, go, rootProps, swipeProps, running } = carousel;
  const count = mobileSlides.length;

  return (
    <div className={styles.carousel} aria-roledescription="carousel" aria-label="NeuVault on mobile" {...rootProps}>
      <div className={styles.phoneStage} {...swipeProps}>
        {mobileSlides.map((slide, i) => {
          // Shortest signed distance around the loop, so the ring wraps both ways.
          let offset = i - index;
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;
          const distance = Math.abs(offset);

          return (
            <div
              key={slide.src}
              className={styles.phone}
              data-active={offset === 0}
              data-far={distance > 2}
              style={{ "--offset": offset, "--distance": distance } as CSSProperties}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={offset !== 0}
              onClick={offset === 0 ? undefined : () => go(i)}
            >
              <div className={styles.phoneScreen}>
                <Image
                  src={slide.src}
                  alt={`NeuVault mobile: ${slide.title} ${slide.copy}`}
                  width={slide.size?.[0] ?? 1320}
                  height={slide.size?.[1] ?? 2868}
                  sizes="300px"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className={`${styles.footer} ${styles.footerCentered}`}>
        <Caption slides={mobileSlides} index={index} live={!running} />
        <CarouselControls carousel={carousel} items={mobileSlides.map((s) => s.title)} interval={MOBILE_INTERVAL} label="mobile" />
      </div>
    </div>
  );
}

export default function AppTour() {
  return (
    <div className={styles.tour}>
      <div className={styles.block}>
        <div className={styles.head}>
          <p className={styles.kicker}>Mac · Windows</p>
          <h2>On your desktop.</h2>
          <p>Room to sort, read and connect everything you keep.</p>
        </div>
        <DesktopCarousel />
      </div>

      <div className={styles.block}>
        <div className={`${styles.head} ${styles.headCentered}`}>
          <p className={styles.kicker}>iPhone · Android</p>
          <h2>In your pocket.</h2>
          <p>Capture it the moment it arrives, and check what is due wherever you are.</p>
        </div>
        <MobileCarousel />
      </div>
    </div>
  );
}
