"use client";

import { useEffect } from "react";

import {
  normalizeRefCode,
  rememberRef,
  reportReferral,
  storedRef,
  storeForHref,
  withPlayReferrer,
} from "@/lib/referral";

/**
 * Records ?ref=<code> visits and the store buttons those visitors press.
 * One document-level listener covers every store link on every page, so
 * pages need no changes when a new download button is added.
 */
export default function ReferralTracker() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const fromLink = normalizeRefCode(url.searchParams.get("ref"));
    if (fromLink) {
      rememberRef(fromLink);
      reportReferral("visit", fromLink);
      // Keep shared and bookmarked URLs clean; the code is remembered.
      url.searchParams.delete("ref");
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    }

    const onClick = (event: MouseEvent) => {
      const code = storedRef();
      if (!code) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const store = storeForHref(anchor.href);
      if (!store) return;
      if (store === "android") anchor.href = withPlayReferrer(anchor.href, code);
      reportReferral("store_click", code, store);
    };
    // Capture phase, so the report goes out before the browser follows the link.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
