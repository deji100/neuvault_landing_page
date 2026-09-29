"use client";

import { Play } from "lucide-react";

import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  MACOS_APP_STORE_URL,
  WINDOWS_MICROSOFT_STORE_URL,
} from "@/lib/seo";
import { visibleYouTubeVideos } from "@/lib/youtube-videos";

import styles from "./Closing.module.css";
import { useStoreUrl } from "./useStoreUrl";

const platforms = [
  ["iPhone", IOS_APP_STORE_URL],
  ["Android", ANDROID_PLAY_STORE_URL],
  ["macOS", MACOS_APP_STORE_URL],
  ["Windows", WINDOWS_MICROSOFT_STORE_URL],
];

/** The closing call to action; `#download` anchors from the hero and navbar land here. */
export default function Closing() {
  const storeUrl = useStoreUrl();
  const external = storeUrl.startsWith("http");
  const tourHref = visibleYouTubeVideos.length > 0 ? "#videos" : "#tour";

  return (
    <div className={styles.closing}>
      <h2>
        Save it once. <span>Find it when it matters.</span> Keep it yours.
      </h2>
      <div className={styles.actions}>
        <a className={styles.primary} href={storeUrl} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
          Download free
        </a>
        <a className={styles.secondary} href={tourHref}>
          <span className={styles.playDot} aria-hidden="true">
            <Play size={13} fill="currentColor" strokeWidth={0} />
          </span>
          Watch the 3-minute tour
        </a>
      </div>
      <ul className={styles.platforms}>
        {platforms.map(([label, href]) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noreferrer">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
