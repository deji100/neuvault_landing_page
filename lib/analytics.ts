import { getWorkflow } from "./workflows";
import type { MarketingEvent } from "./marketing-events";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const ANALYTICS_CONSENT_KEY = "neuvault-analytics-consent-v1";
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
export type AnalyticsConsent = "granted" | "denied" | null;
const debug = process.env.NEXT_PUBLIC_GA_DEBUG === "true";
const adConsent = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
let initialized = false;
let lastPage: string | null = null;

export function privacySignalEnabled() {
  return typeof navigator !== "undefined" && (navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true);
}

export function analyticsEnabled() {
  if (typeof window === "undefined" || !/^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID)) return false;
  if (process.env.NEXT_PUBLIC_GA_ENABLED === "false") return false;
  const localEnabled = process.env.NEXT_PUBLIC_GA_ENABLE_LOCAL === "true";
  if (process.env.NODE_ENV !== "production" && !localEnabled) return false;
  if (!["neuvault.app", "www.neuvault.app"].includes(window.location.hostname) && !localEnabled) return false;
  if ((navigator.webdriver || /HeadlessChrome|Playwright|Puppeteer/i.test(navigator.userAgent)) && process.env.NEXT_PUBLIC_GA_ENABLE_AUTOMATION !== "true") return false;
  return true;
}

export function readAnalyticsConsent(): AnalyticsConsent {
  if (privacySignalEnabled()) return "denied";
  try {
    const saved = JSON.parse(localStorage.getItem(ANALYTICS_CONSENT_KEY) || "null");
    if (saved && ["granted", "denied"].includes(saved.value) && typeof saved.at === "number" && Date.now() - saved.at < 180 * 86400_000) return saved.value;
  } catch { /* Unavailable storage leaves collection off. */ }
  return null;
}

export function saveAnalyticsConsent(value: Exclude<AnalyticsConsent, null>) {
  try { localStorage.setItem(ANALYTICS_CONSENT_KEY, JSON.stringify({ value, at: Date.now() })); } catch { /* The choice still applies for this page. */ }
}

/** Only public marketing routes; never send URL queries, fragments or account routes. */
export function analyticsPath(path: string, additionalPublicPaths: readonly string[] = []): string | null {
  const publicPaths = ["/", "/pricing", "/compare", "/guides", "/business", "/use-cases", "/privacy-policy", "/terms-and-conditions", "/refund-policy", "/save-from-browser", "/how-to-use-extension", "/connectors", "/meeting-notes-without-a-bot"];
  if (publicPaths.includes(path) || additionalPublicPaths.includes(path)) return path;
  if (path.startsWith("/use-cases/") && getWorkflow(path.slice("/use-cases/".length))) return path;
  return null;
}

function disableGoogle(disabled: boolean) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = disabled;
}

function pageFields(path: string) {
  return { page_location: `${window.location.origin}${path}`, page_referrer: "", page_title: path === "/" ? "NeuVault" : `NeuVault · ${path}` };
}

function tagSettings(path: string) {
  return {
    send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
    user_data: {}, cookie_expires: 180 * 86400, cookie_update: false,
    ...pageFields(path), ...(debug ? { debug_mode: true } : {}),
  };
}

export function stopAnalytics() {
  if (typeof window === "undefined") return;
  disableGoogle(true);
  if (initialized) window.gtag?.("consent", "update", { analytics_storage: "denied", ...adConsent });
  lastPage = null;
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!/^_ga(?:_|$)/.test(name)) continue;
    const domains = ["", window.location.hostname, `.${window.location.hostname}`, ".neuvault.app"];
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""}`;
  }
}

export function startAnalyticsPage(pathname: string, consent: AnalyticsConsent, publicPaths: readonly string[]) {
  const path = analyticsPath(pathname, publicPaths);
  if (!analyticsEnabled() || privacySignalEnabled() || consent !== "granted" || !path) {
    // No consent pings or Google script are loaded before the visitor opts in.
    if (initialized) disableGoogle(true);
    lastPage = null;
    return;
  }
  disableGoogle(false);
  if (!initialized) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      // Google's documented queue format uses the arguments object.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("consent", "default", { analytics_storage: "denied", ...adConsent });
    window.gtag("consent", "update", { analytics_storage: "granted", ...adConsent });
    // Set defaults before the linked Google tag can auto-configure its destination.
    window.gtag("set", tagSettings(path));
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, tagSettings(path));
    const script = document.createElement("script");
    script.id = "neuvault-ga4";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    if (!document.getElementById(script.id)) document.head.appendChild(script);
    initialized = true;
  } else {
    window.gtag?.("consent", "update", { analytics_storage: "granted", ...adConsent });
  }
  window.gtag?.("set", { ...pageFields(path), send_page_view: false, user_data: {} });
  if (lastPage !== path) {
    lastPage = path;
    window.gtag?.("event", "page_view", { send_to: GA_MEASUREMENT_ID, user_data: {}, ...pageFields(path), ...(debug ? { debug_mode: true } : {}) });
  }
}

/** Explicitly select fields so document text and arbitrary DOM attributes cannot leak. */
export function sendMarketingEvent(event: MarketingEvent, pathname: string, consent: AnalyticsConsent, publicPaths: readonly string[]) {
  const path = analyticsPath(pathname, publicPaths);
  if (!initialized || !analyticsEnabled() || privacySignalEnabled() || consent !== "granted" || !path) return;
  const workflow = event.workflow_id ? getWorkflow(event.workflow_id) : undefined;
  const parameters: Record<string, string | number | boolean | Record<string, never>> = {
    send_to: GA_MEASUREMENT_ID, user_data: {}, ...pageFields(path), ...(debug ? { debug_mode: true } : {}),
  };
  if (workflow) { parameters.workflow_id = workflow.id; parameters.workflow_category = workflow.id; }
  if ("surface" in event) parameters.surface = event.surface;
  if (event.event === "workflow_step_viewed") { parameters.step_name = event.step; parameters.step_number = event.step_number; }
  if (event.event === "download_clicked" || event.event === "platform_selected") {
    parameters.platform = event.platform;
    parameters.location = ["home_hero", "home_closing", "home_platforms", "use_case", "comparison"].includes(event.location) ? event.location : "site";
  }
  window.gtag?.("event", event.event, parameters);
}
