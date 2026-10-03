"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BadgeCheck, Loader2, Trash2 } from "lucide-react";

import { BoardError, type Post, addComment, deleteComment, deletePost, fetchPost, timeAgo } from "@/lib/community";

import { KindBadge, StatusBadge, VoteButton } from "./BoardParts";
import { JoinPanel, MemberBar, useMember } from "./JoinPanel";
import { LIVE_REFRESH_MS, useLiveRefresh } from "./useLiveRefresh";
import styles from "./Feedback.module.css";

export default function PostThread({ id }: { id: string }) {
  const router = useRouter();
  const { member, ready } = useMember();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState("");
  const [missing, setMissing] = useState(false);
  // Comments that arrived through a refresh, so they can slide in.
  const [fresh, setFresh] = useState<Set<string>>(new Set());
  const seen = useRef<Set<string> | null>(null);

  const load = useCallback(
    async ({ silent = false } = {}) => {
      if (!silent) setError("");
      try {
        const next = await fetchPost(id);
        const known = seen.current;
        if (known) {
          const added = next.comments.filter((comment) => !known.has(comment.id)).map((comment) => comment.id);
          if (added.length) setFresh(new Set(added));
        }
        seen.current = new Set(next.comments.map((comment) => comment.id));
        setPost(next);
      } catch (err) {
        if (err instanceof BoardError && err.status === 404) setMissing(true);
        // A failed background check keeps what's on screen; the next one retries.
        else if (!silent) setError(err instanceof BoardError ? err.message : "Couldn't load this post.");
      }
    },
    [id],
  );

  useEffect(() => {
    if (ready) void load();
  }, [load, ready, member?.token]);

  useLiveRefresh(() => void load({ silent: true }), LIVE_REFRESH_MS, ready && !missing);

  if (missing) {
    return (
      <div className={styles.empty}>
        <p>This post isn&apos;t available. It may have been removed.</p>
        <Link href="/feedback" className={styles.ghost}>
          Back to the board
        </Link>
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.empty}>
        <p>{error}</p>
        <button type="button" className={styles.ghost} onClick={() => void load()}>
          Try again
        </button>
      </div>
    );
  }
  if (!post) {
    return (
      <div className={styles.empty}>
        <Loader2 size={20} className={styles.spin} aria-label="Loading" />
      </div>
    );
  }

  async function removePost() {
    if (!post || !window.confirm("Remove your post? Its comments will go with it.")) return;
    try {
      await deletePost(post.id);
      router.push("/feedback");
    } catch (err) {
      setError(err instanceof BoardError ? err.message : "Couldn't remove the post.");
    }
  }

  return (
    <article className={styles.thread}>
      <header className={styles.threadHead}>
        <VoteButton post={post} member={member} large onChange={(vote) => setPost({ ...post, ...vote })} />
        <div>
          <span className={styles.badges}>
            <KindBadge kind={post.kind} />
            <StatusBadge status={post.status} />
          </span>
          <h1>{post.title}</h1>
          <p className={styles.postMeta}>
            <span>{post.is_mine ? "You" : post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.created_at}>{timeAgo(post.created_at)}</time>
            {post.is_mine && (
              <button type="button" className={styles.linkButton} onClick={removePost}>
                <Trash2 size={13} aria-hidden="true" /> Remove
              </button>
            )}
          </p>
        </div>
      </header>

      <div className={styles.threadBody}>{post.body}</div>

      <section className={styles.discussion} aria-labelledby="comments-title">
        <h2 id="comments-title">
          {post.comment_count} {post.comment_count === 1 ? "comment" : "comments"}
        </h2>
        <ol className={styles.commentList}>
          {post.comments.map((comment) => (
            <li
              key={comment.id}
              className={styles.comment}
              data-team={comment.is_team || undefined}
              data-fresh={fresh.has(comment.id) || undefined}
            >
              <p className={styles.commentHead}>
                <strong>
                  {comment.is_team && <BadgeCheck size={15} aria-hidden="true" />}
                  {comment.is_mine ? "You" : comment.author}
                </strong>
                <time dateTime={comment.created_at}>{timeAgo(comment.created_at)}</time>
                {comment.is_mine && (
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={async () => {
                      if (!window.confirm("Remove your comment?")) return;
                      try {
                        await deleteComment(comment.id);
                        await load();
                      } catch (err) {
                        setError(err instanceof BoardError ? err.message : "Couldn't remove the comment.");
                      }
                    }}
                  >
                    Remove
                  </button>
                )}
              </p>
              <p className={styles.commentBody}>{comment.body}</p>
            </li>
          ))}
        </ol>

        {!ready ? null : member ? (
          <>
            <MemberBar member={member} />
            <CommentBox
              postId={post.id}
              onAdded={(comment) => {
                seen.current?.add(comment.id);
                setPost({ ...post, comments: [...post.comments, comment], comment_count: post.comment_count + 1 });
              }}
            />
          </>
        ) : (
          <JoinPanel action="vote or comment" />
        )}
      </section>
    </article>
  );
}

function CommentBox({ postId, onAdded }: { postId: string; onAdded: (comment: Post["comments"][number]) => void }) {
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      onAdded(await addComment(postId, body.trim()));
      setBody("");
    } catch (err) {
      setError(err instanceof BoardError ? err.message : "Couldn't add your comment.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className={styles.composer} onSubmit={submit}>
      <label className={styles.field}>
        <span className={styles.srOnly}>Add a comment</span>
        <textarea
          required
          minLength={2}
          maxLength={2000}
          rows={3}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Add to the conversation. Keep personal details out."
        />
      </label>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <div className={styles.formRow}>
        <button type="submit" className={styles.primary} disabled={busy || body.trim().length < 2}>
          {busy && <Loader2 size={15} className={styles.spin} aria-hidden="true" />}
          Comment
        </button>
      </div>
    </form>
  );
}
