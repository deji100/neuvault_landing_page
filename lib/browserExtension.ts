import { CHROME_EXTENSION_URL, EDGE_EXTENSION_URL, FIREFOX_EXTENSION_URL } from "@/lib/seo";

export type BrowserKind = "chrome" | "edge" | "brave" | "opera" | "vivaldi" | "arc" | "firefox" | "safari" | "other";

export type ExtensionTarget = {
  browser: BrowserKind;
  /** "Chrome", "Edge", … as shown to the visitor. */
  browserName: string;
  href: string;
  external: boolean;
  /** Short call to action, e.g. "Add to Chrome". */
  action: string;
};

const NAMES: Record<BrowserKind, string> = {
  chrome: "Chrome",
  edge: "Edge",
  brave: "Brave",
  opera: "Opera",
  vivaldi: "Vivaldi",
  arc: "Arc",
  firefox: "Firefox",
  safari: "Safari",
  other: "your browser",
};

/** Phones and tablets cannot install browser extensions. */
export function isMobileBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const touchMac = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1; // iPad asking for desktop pages
  return /Android|iPhone|iPad|iPod|Mobile/.test(ua) || touchMac;
}

export function detectBrowser(): BrowserKind {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent;
  const nav = navigator as Navigator & { brave?: unknown };
  if (/Edg\//.test(ua)) return "edge";
  if (/OPR\/|Opera/.test(ua)) return "opera";
  if (/Vivaldi/.test(ua)) return "vivaldi";
  if (nav.brave) return "brave";
  if (/Firefox\//.test(ua)) return "firefox";
  // Arc identifies as Chrome; its stylesheet variable is the only reliable tell.
  if (typeof document !== "undefined" && getComputedStyle(document.documentElement).getPropertyValue("--arc-palette-title")) {
    return "arc";
  }
  if (/Chrome\/|CriOS\//.test(ua)) return "chrome";
  if (/Safari\//.test(ua)) return "safari";
  return "other";
}

/** Where this visitor installs Save to NeuVault, and what to call the button. */
export function extensionTargetFor(browser: BrowserKind): ExtensionTarget {
  const browserName = NAMES[browser];
  if (browser === "safari") {
    return { browser, browserName, href: "/save-from-browser#safari", external: false, action: "Turn on in Safari" };
  }
  if (browser === "firefox") {
    return FIREFOX_EXTENSION_URL
      ? { browser, browserName, href: FIREFOX_EXTENSION_URL, external: true, action: "Add to Firefox" }
      : { browser, browserName, href: "/save-from-browser#bookmark", external: false, action: "Get it for Firefox" };
  }
  if (browser === "edge" && EDGE_EXTENSION_URL) {
    return { browser, browserName, href: EDGE_EXTENSION_URL, external: true, action: "Add to Edge" };
  }
  if (browser === "other") {
    return { browser, browserName, href: "/save-from-browser", external: false, action: "Get the extension" };
  }
  // Chrome, Brave, Opera, Vivaldi, Arc, and Edge until its listing is live.
  return { browser, browserName, href: CHROME_EXTENSION_URL, external: true, action: `Add to ${browserName}` };
}
