"use client";

import { useEffect } from "react";
import { ANDROID_PLAY_STORE_URL, IOS_APP_STORE_URL, MACOS_APP_STORE_URL, WINDOWS_MICROSOFT_STORE_URL } from "@/lib/seo";
import { recordDownload, setMarketingWorkflow, type DownloadPlatform } from "@/lib/marketing-events";

const platforms = new Map<string, DownloadPlatform>([
  [IOS_APP_STORE_URL, "ios"], [ANDROID_PLAY_STORE_URL, "android"],
  [MACOS_APP_STORE_URL, "macos"], [WINDOWS_MICROSOFT_STORE_URL, "windows"],
]);

/** Observe actual store-link clicks; opening the platform picker is not a download. */
export default function MarketingEvents() {
  useEffect(() => {
    const track = (event: MouseEvent) => {
      if (event.defaultPrevented || (event.type === "auxclick" && event.button !== 1)) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link) return;
      const destination = new URL(link.href);
      // The existing referral tracker appends this before the click reaches us.
      destination.searchParams.delete("referrer");
      const platform = platforms.get(destination.href);
      if (platform) {
        if (link.dataset.workflowId) setMarketingWorkflow(link.dataset.workflowId);
        recordDownload(platform, link.dataset.downloadLocation || "site", link.hasAttribute("data-platform-choice"));
      }
    };
    document.addEventListener("click", track);
    document.addEventListener("auxclick", track);
    return () => {
      document.removeEventListener("click", track);
      document.removeEventListener("auxclick", track);
    };
  }, []);
  return null;
}
