"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, RefreshCw } from "lucide-react";

import { BoardError, type BoardSort, type PostKind, type PostPage, fetchBoard } from "@/lib/community";

import { Composer, Pagination, PostCard } from "./BoardParts";
import { JoinPanel, MemberBar, useMember } from "./JoinPanel";
import { LIVE_REFRESH_MS, useLiveRefresh } from "./useLiveRefresh";
import styles from "./Feedback.module.css";

const SORTS: { value: BoardSort; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "top", label: "Most voted" },
];
const KINDS: { value: PostKind | null; label: string }[] = [
  { value: null, label: "All" },
  { value: "idea", label: "Ideas" },
  { value: "problem", label: "Problems" },
];

function readParams(params: URLSearchParams) {
  const page = Math.max(1, Number.parseInt(params.get("page") || "1", 10) || 1);
  const sort: BoardSort = params.get("sort") === "top" ? "top" : "latest";
  const rawKind = params.get("kind");
  const kind: PostKind | null = rawKind === "idea" || rawKind === "problem" ? rawKind : null;
  return { page, sort, kind };
}

/** The board: newest posts first on page one, then older pages. State lives in the URL. */
export default function FeedbackBoard() {
  const router = useRouter();
  const params = useSearchParams();
  const { page, sort, kind } = readParams(params);
  const { member, ready } = useMember();
  const [data, setData] = useState<PostPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(
    async ({ silent = false } = {}) => {
      if (!silent) {
        setLoading(true);
        setError("");
      }
      try {
        setData(await fetchBoard({ page, sort, kind }));
      } catch (err) {
        // A failed background check keeps what's on screen; the next one retries.
        if (!silent) setError(err instanceof BoardError ? err.message : "Couldn't load the board.");
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [page, sort, kind],
  );

  // Reloaded on sign-in or out too, so "voted by me" is right for whoever is here.
  useEffect(() => {
    if (ready) void load();
  }, [load, ready, member?.token]);

  useLiveRefresh(() => void load({ silent: true }), LIVE_REFRESH_MS, ready);

  function go(next: Partial<{ page: number; sort: BoardSort; kind: PostKind | null }>) {
    const merged = { page, sort, kind, ...next };
    const query = new URLSearchParams();
    if (merged.page > 1) query.set("page", String(merged.page));
    if (merged.sort !== "latest") query.set("sort", merged.sort);
    if (merged.kind) query.set("kind", merged.kind);
    const search = query.toString();
    router.push(search ? `/feedback?${search}` : "/feedback", { scroll: false });
    document.getElementById("board")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div className={styles.compose}>
        {!ready ? null : member ? (
          <>
            <MemberBar member={member} />
            <Composer
              onPosted={(post) => {
                if (page === 1 && sort === "latest" && (!kind || kind === post.kind)) {
                  setData((current) =>
                    current
                      ? { ...current, total: current.total + 1, items: [post, ...current.items].slice(0, current.page_size) }
                      : current,
                  );
                } else {
                  go({ page: 1, sort: "latest", kind: null });
                }
              }}
            />
          </>
        ) : (
          <JoinPanel />
        )}
      </div>

      <section id="board" className={styles.board} aria-label="Posts">
        <div className={styles.toolbar}>
          <div className={styles.tabs} role="tablist" aria-label="Sort">
            {SORTS.map((option) => (
              <button
                key={option.value}
                type="button"
                role="tab"
                aria-selected={sort === option.value}
                data-active={sort === option.value || undefined}
                onClick={() => go({ sort: option.value, page: 1 })}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className={styles.filters} aria-label="Show">
            {KINDS.map((option) => (
              <button
                key={option.label}
                type="button"
                aria-pressed={kind === option.value}
                data-active={kind === option.value || undefined}
                onClick={() => go({ kind: option.value, page: 1 })}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {error ? (
          <div className={styles.empty}>
            <p>{error}</p>
            <button type="button" className={styles.ghost} onClick={() => void load()}>
              <RefreshCw size={14} aria-hidden="true" /> Try again
            </button>
          </div>
        ) : !data ? (
          <div className={styles.empty}>
            <Loader2 size={20} className={styles.spin} aria-label="Loading" />
          </div>
        ) : data.items.length === 0 ? (
          <div className={styles.empty}>
            <p>{page > 1 ? "There's nothing on this page." : "No posts yet. Be the first to share an idea."}</p>
          </div>
        ) : (
          <>
            <p className={styles.count} aria-live="polite">
              <span>
                {`${data.total} ${data.total === 1 ? "post" : "posts"}`}
                {data.pages > 1 && ` · page ${data.page} of ${data.pages}`}
              </span>
              {loading && <Loader2 size={13} className={styles.spin} aria-label="Updating" />}
            </p>
            <ul className={styles.posts}>
              {data.items.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  member={member}
                  onChange={(next) =>
                    setData((current) =>
                      current ? { ...current, items: current.items.map((item) => (item.id === next.id ? next : item)) } : current,
                    )
                  }
                />
              ))}
            </ul>
            <Pagination page={data.page} pages={data.pages} onPage={(next) => go({ page: next })} />
          </>
        )}
      </section>
    </>
  );
}
