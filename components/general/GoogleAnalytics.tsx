"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ANALYTICS_CONSENT_KEY, analyticsEnabled, analyticsPath, privacySignalEnabled, readAnalyticsConsent, saveAnalyticsConsent, sendMarketingEvent, startAnalyticsPage, stopAnalytics, type AnalyticsConsent } from "@/lib/analytics";
import type { MarketingEvent } from "@/lib/marketing-events";
import styles from "./GoogleAnalytics.module.css";

export default function GoogleAnalytics({ publicPaths }: { publicPaths: string[] }) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<AnalyticsConsent>(null);
  const [available, setAvailable] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const enabled = analyticsEnabled();
    const saved = readAnalyticsConsent();
    setAvailable(enabled);
    setConsent(saved);
    setOpen(enabled && saved === null && analyticsPath(window.location.pathname, publicPaths) !== null);
    const preferences = () => setOpen(true);
    const sync = (event: StorageEvent) => {
      if (event.key !== ANALYTICS_CONSENT_KEY && event.key !== null) return;
      const next = readAnalyticsConsent();
      if (next !== "granted") stopAnalytics();
      setConsent(next);
    };
    window.addEventListener("neuvault:analytics-preferences", preferences);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("neuvault:analytics-preferences", preferences);
      window.removeEventListener("storage", sync);
    };
  }, [publicPaths]);

  useEffect(() => { startAnalyticsPage(pathname, consent, publicPaths); }, [pathname, consent, publicPaths]);
  useEffect(() => {
    if (available && consent === null && analyticsPath(pathname, publicPaths)) setOpen(true);
  }, [available, consent, pathname, publicPaths]);
  useEffect(() => {
    const forward = (event: Event) => sendMarketingEvent((event as CustomEvent<MarketingEvent>).detail, pathname, consent, publicPaths);
    window.addEventListener("neuvault:marketing", forward);
    return () => window.removeEventListener("neuvault:marketing", forward);
  }, [pathname, consent, publicPaths]);

  const choose = (choice: "granted" | "denied") => {
    const next = privacySignalEnabled() ? "denied" : choice;
    if (next === "denied") stopAnalytics();
    saveAnalyticsConsent(next);
    setConsent(next);
    setOpen(false);
  };

  if (!open) return null;
  const privacySignal = privacySignalEnabled();
  return (
    <aside className={styles.panel} aria-labelledby="analytics-consent-title" data-analytics-consent>
      <h2 id="analytics-consent-title">Optional website analytics</h2>
      <p>Allow Google Analytics to measure page visits, workflow exploration and download clicks? It uses analytics cookies. Your private vault content is never included.</p>
      {!available && <p>Analytics is disabled in this environment.</p>}
      {privacySignal && <p>Your browser’s privacy preference keeps analytics off.</p>}
      <p><Link href="/privacy-policy#website-analytics">How website analytics works</Link>. Change your choice anytime using Analytics preferences in the footer.</p>
      <div className={styles.actions}>
        <button type="button" onClick={() => choose("denied")}>Reject analytics</button>
        <button type="button" disabled={!available || privacySignal} onClick={() => choose("granted")}>Allow analytics</button>
        {consent !== null && <button type="button" onClick={() => setOpen(false)}>Close</button>}
      </div>
    </aside>
  );
}
