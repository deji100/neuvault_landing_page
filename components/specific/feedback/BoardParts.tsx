"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronUp, Loader2, MessageCircle } from "lucide-react";

import {
  BoardError,
  KIND_LABELS,
  type Member,
  type Post,
  type PostKind,
  type PostStatus,
  type PostSummary,
  STATUS_LABELS,
  createPost,
  setVote,
  timeAgo,
} from "@/lib/community";

import styles from "./Feedback.module.css";

export function StatusBadge({ status }: { status: PostStatus }) {
  return (
    <span className={styles.status} data-status={status}>
      {STATUS_LABELS[status]}
    </span>
  );
}

export function KindBadge({ kind }: { kind: PostKind }) {
  return (
    <span className={styles.kind} data-kind={kind}>
      {KIND_LABELS[kind]}
    </span>
  );
}

/** Upvote. Signed out, it sends the visitor to the join panel instead. */
export function VoteButton({
  post,
  member,
  onChange,
  large = false,
}: {
  post: Pick<PostSummary, "id" | "vote_count" | "voted_by_me">;
  member: Member | null;
  onChange: (next: { voted_by_me: boolean; vote_count: number }) => void;
  large?: boolean;
}) {
  const [busy, setBusy] = useState(false);

  async function toggle() {
    if (!member) {
      document.getElementById("join")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const next = !post.voted_by_me;
    // Shown at once, put back if the server says no.
    onChange({ voted_by_me: next, vote_count: post.vote_count + (next ? 1 : -1) });
    setBusy(true);
    try {
      const result = await setVote(post.id, next);
      onChange({ voted_by_me: result.voted, vote_count: result.vote_count });
    } catch {
      onChange({ voted_by_me: post.voted_by_me, vote_count: post.vote_count });
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      className={large ? `${styles.vote} ${styles.voteLarge}` : styles.vote}
      data-voted={post.voted_by_me || undefined}
      aria-pressed={post.voted_by_me}
      aria-label={`${post.voted_by_me ? "Remove your vote" : "Vote for this"} (${post.vote_count} votes)`}
      title={member ? undefined : "Sign in to vote"}
      onClick={toggle}
      disabled={busy}
    >
      <ChevronUp size={large ? 20 : 17} strokeWidth={2.4} aria-hidden="true" />
      <span>{post.vote_count}</span>
    </button>
  );
}

export function PostCard({
  post,
  member,
  onChange,
}: {
  post: PostSummary;
  member: Member | null;
  onChange: (next: PostSummary) => void;
}) {
  return (
    <li className={styles.post}>
      <VoteButton post={post} member={member} onChange={(vote) => onChange({ ...post, ...vote })} />
      <Link href={`/feedback/${post.id}`} className={styles.postLink}>
        <span className={styles.badges}>
          <KindBadge kind={post.kind} />
          {post.status !== "open" && <StatusBadge status={post.status} />}
        </span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className={styles.postMeta}>
          <span>{post.is_mine ? "You" : post.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.created_at}>{timeAgo(post.created_at)}</time>
          <span className={styles.comments}>
            <MessageCircle size={14} aria-hidden="true" /> {post.comment_count}
            <span className={styles.srOnly}> comments</span>
          </span>
        </span>
      </Link>
    </li>
  );
}

export function Composer({ onPosted }: { onPosted: (post: Post) => void }) {
  const [kind, setKind] = useState<PostKind>("idea");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const post = await createPost({ kind, title: title.trim(), body: body.trim() });
      setTitle("");
      setBody("");
      setOpen(false);
      onPosted(post);
    } catch (err) {
      setError(err instanceof BoardError ? err.message : "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button type="button" className={styles.composerPrompt} onClick={() => setOpen(true)}>
        Share an idea or report a problem…
      </button>
    );
  }

  return (
    <form className={styles.composer} onSubmit={submit}>
      <div className={styles.segment} role="radiogroup" aria-label="What is it?">
        {(["idea", "problem"] as const).map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={kind === value}
            data-active={kind === value || undefined}
            onClick={() => setKind(value)}
          >
            {value === "idea" ? "Feature idea" : "Something isn't working"}
          </button>
        ))}
      </div>
      <label className={styles.field}>
        <span>Title</span>
        <input
          required
          minLength={6}
          maxLength={140}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder={kind === "idea" ? "Let me group scans by trip" : "Reminders don't show on my Mac"}
          autoFocus
        />
      </label>
      <label className={styles.field}>
        <span>Details</span>
        <textarea
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder={
            kind === "idea"
              ? "What would you like NeuVault to do, and how would it help you?"
              : "What happened, what you expected, and which device and app version you use."
          }
        />
      </label>
      <p className={styles.privacyNote}>
        Posts are public. Don&apos;t include document contents, ID numbers, or anything personal.
      </p>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <div className={styles.formRow}>
        <button type="submit" className={styles.primary} disabled={busy}>
          {busy && <Loader2 size={15} className={styles.spin} aria-hidden="true" />}
          Post
        </button>
        <button type="button" className={styles.ghost} onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}

/** Numbered pages with previous/next; long runs collapse to "…". */
export function Pagination({ page, pages, onPage }: { page: number; pages: number; onPage: (page: number) => void }) {
  if (pages <= 1) return null;
  const shown = new Set([1, pages, page - 1, page, page + 1].filter((n) => n >= 1 && n <= pages));
  const numbers = [...shown].sort((a, b) => a - b);
  const items: (number | "gap")[] = [];
  numbers.forEach((n, i) => {
    if (i > 0 && n - numbers[i - 1] > 1) items.push("gap");
    items.push(n);
  });

  return (
    <nav className={styles.pagination} aria-label="Pages">
      <button type="button" onClick={() => onPage(page - 1)} disabled={page <= 1}>
        Previous
      </button>
      {items.map((item, i) =>
        item === "gap" ? (
          <span key={`gap-${i}`} aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPage(item)}
            aria-current={item === page ? "page" : undefined}
            data-current={item === page || undefined}
          >
            {item}
          </button>
        ),
      )}
      <button type="button" onClick={() => onPage(page + 1)} disabled={page >= pages}>
        Next
      </button>
    </nav>
  );
}
