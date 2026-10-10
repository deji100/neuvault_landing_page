import { API_URL } from "@/lib/community";

/**
 * Referral links: neuvault.app/?ref=<code>.
 *
 * A visitor who arrives with a code keeps it in this browser for 30 days, and
 * the site reports two things to the NeuVault server: the visit, and any
 * store button they press afterwards. Sign-ups happen in the apps after a
 * store install, where the code cannot follow, so the store press is what a
 * referrer is measured by. Visitors who did not arrive through a referral
 * link are never reported, and nothing here is a cookie.
 */

const CODE_RE = /^[a-z0-9][a-z0-9_-]{0,39}$/;
const REF_KEY = "nv_ref";
const VISITOR_KEY = "nv_ref_visitor";
const KEEP_MS = 30 * 24 * 60 * 60 * 1000;

export type Store = "ios" | "mac" | "android" | "windows";

export function normalizeRefCode(value: string | null | undefined): string | null {
  const code = String(value ?? "").trim().toLowerCase();
  return CODE_RE.test(code) ? code : null;
}

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Private windows can refuse storage; the visit is still reported once.
  }
}

export function rememberRef(code: string) {
  write(REF_KEY, JSON.stringify({ code, at: Date.now() }));
}

export function storedRef(): string | null {
  const raw = read(REF_KEY);
  if (!raw) return null;
  try {
    const { code, at } = JSON.parse(raw) as { code?: string; at?: number };
    if (!at || Date.now() - at > KEEP_MS) return null;
    return normalizeRefCode(code);
  } catch {
    return null;
  }
}

function visitorId(): string {
  let id = read(VISITOR_KEY);
  if (!id || !/^[A-Za-z0-9-]{8,64}$/.test(id)) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
    write(VISITOR_KEY, id);
  }
  return id;
}

/** Fire-and-forget; sendBeacon survives the page leaving for the store. */
export function reportReferral(event: "visit" | "store_click", code: string, store?: Store) {
  const body = JSON.stringify({
    code,
    event,
    store,
    visitor_id: visitorId(),
    path: window.location.pathname.slice(0, 200),
  });
  const url = `${API_URL}/api/v1/referrals/events`;
  try {
    if (navigator.sendBeacon?.(url, new Blob([body], { type: "text/plain" }))) return;
  } catch {
    // fall through to fetch
  }
  void fetch(url, { method: "POST", body, keepalive: true, mode: "no-cors" }).catch(() => {});
}

/** Which store a link goes to, or null for any other link. */
export function storeForHref(href: string): Store | null {
  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return null;
  }
  if (url.hostname === "apps.apple.com") return url.searchParams.get("platform") === "mac" ? "mac" : "ios";
  if (url.hostname === "play.google.com") return "android";
  if (url.hostname === "apps.microsoft.com") return "windows";
  return null;
}

/** Google Play keeps a referrer on the install, so Play Console can confirm the count. */
export function withPlayReferrer(href: string, code: string): string {
  try {
    const url = new URL(href);
    url.searchParams.set("referrer", `utm_source=neuvault.app&utm_medium=referral&utm_campaign=${code}`);
    return url.toString();
  } catch {
    return href;
  }
}
