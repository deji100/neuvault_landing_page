/**
 * The public feedback board (neuvault.app/feedback), served by updv-server.
 * Reading needs nothing. Posting, voting and commenting need a NeuVault
 * account: the person signs in with an emailed code and gets a token that
 * only works on the board, kept in this browser.
 */

export const API_URL = (process.env.NEXT_PUBLIC_NEUVAULT_API_URL || "https://api.neuvault.app").replace(/\/$/, "");

export type PostKind = "idea" | "problem";
export type PostStatus = "open" | "planned" | "in_progress" | "shipped" | "declined";
export type BoardSort = "latest" | "top";

export type PostSummary = {
  id: string;
  kind: PostKind;
  title: string;
  excerpt: string;
  status: PostStatus;
  author: string;
  vote_count: number;
  comment_count: number;
  created_at: string;
  status_changed_at: string | null;
  voted_by_me: boolean;
  is_mine: boolean;
};

export type PostPage = { items: PostSummary[]; page: number; page_size: number; total: number; pages: number };

export type Comment = { id: string; author: string; is_team: boolean; body: string; created_at: string; is_mine: boolean };

export type Post = PostSummary & { body: string; comments: Comment[] };

export type Member = { displayName: string; token: string; expiresAt: string };

export const PAGE_SIZE = 15;

export const STATUS_LABELS: Record<PostStatus, string> = {
  open: "Under review",
  planned: "Planned",
  in_progress: "In progress",
  shipped: "Shipped",
  declined: "Not planned",
};

export const KIND_LABELS: Record<PostKind, string> = { idea: "Idea", problem: "Problem" };

// ---------- the signed-in member, kept in this browser ----------
const MEMBER_KEY = "neuvault.community.member";
const listeners = new Set<() => void>();

export function readMember(): Member | null {
  try {
    const raw = window.localStorage.getItem(MEMBER_KEY);
    if (!raw) return null;
    const member = JSON.parse(raw) as Member;
    if (!member.token || new Date(member.expiresAt).getTime() <= Date.now()) {
      window.localStorage.removeItem(MEMBER_KEY);
      return null;
    }
    return member;
  } catch {
    return null;
  }
}

function writeMember(member: Member | null) {
  try {
    if (member) window.localStorage.setItem(MEMBER_KEY, JSON.stringify(member));
    else window.localStorage.removeItem(MEMBER_KEY);
  } catch {
    // Private windows can refuse storage; the session then lasts for this page only.
  }
  listeners.forEach((listener) => listener());
}

export function onMemberChange(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => event.key === MEMBER_KEY && listener();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function signOut() {
  writeMember(null);
}

// ---------- requests ----------
export class BoardError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

async function request<T>(path: string, init: RequestInit = {}, { auth = false } = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body) headers.set("Content-Type", "application/json");
  const member = typeof window !== "undefined" ? readMember() : null;
  if (member) headers.set("Authorization", `Bearer ${member.token}`);
  else if (auth) throw new BoardError("Sign in to continue.", 401);

  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/v1/community${path}`, { ...init, headers, cache: "no-store" });
  } catch {
    throw new BoardError("Can't reach NeuVault right now. Check your connection and try again.", 0);
  }
  if (response.status === 401 && member) {
    writeMember(null);
    throw new BoardError("Your sign-in has expired. Sign in again to continue.", 401);
  }
  if (!response.ok) {
    let message = "Something went wrong. Try again.";
    try {
      const body = (await response.json()) as { detail?: unknown };
      if (typeof body.detail === "string") message = body.detail;
      else if (Array.isArray(body.detail)) message = "Check what you wrote and try again.";
    } catch {
      // keep the generic message
    }
    throw new BoardError(message, response.status);
  }
  return (await response.json()) as T;
}

export function fetchBoard(params: { page: number; sort: BoardSort; kind?: PostKind | null }) {
  const query = new URLSearchParams({ page: String(params.page), page_size: String(PAGE_SIZE), sort: params.sort });
  if (params.kind) query.set("kind", params.kind);
  return request<PostPage>(`/board?${query}`);
}

export function fetchPost(id: string) {
  return request<Post>(`/board/${encodeURIComponent(id)}`);
}

export function requestCode(email: string) {
  return request<{ sent: boolean; message: string }>("/auth/request-code", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function verifyCode(email: string, otp: string) {
  const session = await request<{ access_token: string; expires_at: string; member: { display_name: string } }>(
    "/auth/verify",
    { method: "POST", body: JSON.stringify({ email, otp }) },
  );
  writeMember({ token: session.access_token, expiresAt: session.expires_at, displayName: session.member.display_name });
}

export function createPost(input: { kind: PostKind; title: string; body: string }) {
  return request<Post>("/posts", { method: "POST", body: JSON.stringify(input) }, { auth: true });
}

export function deletePost(id: string) {
  return request<{ removed: boolean }>(`/posts/${encodeURIComponent(id)}`, { method: "DELETE" }, { auth: true });
}

export function setVote(id: string, on: boolean) {
  return request<{ voted: boolean; vote_count: number }>(
    `/posts/${encodeURIComponent(id)}/vote`,
    { method: on ? "PUT" : "DELETE" },
    { auth: true },
  );
}

export function addComment(id: string, body: string) {
  return request<Comment>(
    `/posts/${encodeURIComponent(id)}/comments`,
    { method: "POST", body: JSON.stringify({ body }) },
    { auth: true },
  );
}

export function deleteComment(id: string) {
  return request<{ removed: boolean }>(`/comments/${encodeURIComponent(id)}`, { method: "DELETE" }, { auth: true });
}

export function timeAgo(iso: string): string {
  // The server stores naive UTC.
  const then = new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(iso) ? iso : `${iso}Z`).getTime();
  const seconds = Math.max(0, Math.round((Date.now() - then) / 1000));
  if (seconds < 60) return "just now";
  const units: [number, string][] = [
    [60 * 60 * 24 * 365, "y"],
    [60 * 60 * 24 * 30, "mo"],
    [60 * 60 * 24 * 7, "w"],
    [60 * 60 * 24, "d"],
    [60 * 60, "h"],
    [60, "m"],
  ];
  for (const [size, label] of units) {
    if (seconds >= size) return `${Math.floor(seconds / size)}${label} ago`;
  }
  return "just now";
}
