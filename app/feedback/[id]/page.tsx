import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { API_URL } from "@/lib/community";
import { buildMetadata } from "@/lib/seo";
import PostThread from "@/components/specific/feedback/PostThread";
import guideStyles from "@/components/specific/guides/Guides.module.css";

type PostPageProps = { params: Promise<{ id: string }> };

/** The post's title for search and link previews. The page itself loads in the browser. */
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const path = `/feedback/${encodeURIComponent(id)}`;
  try {
    const response = await fetch(`${API_URL}/api/v1/community/board/${encodeURIComponent(id)}`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(3000),
    });
    if (response.ok) {
      const post = (await response.json()) as { title: string; excerpt: string };
      return buildMetadata({ title: post.title, description: post.excerpt, path });
    }
  } catch {
    // Fall through to a generic title; the page still works.
  }
  return buildMetadata({ title: "NeuVault Feedback", description: "A post on the NeuVault feedback board.", path, noindex: true });
}

export default async function FeedbackPostPage({ params }: PostPageProps) {
  const { id } = await params;
  return (
    <main className={guideStyles.page}>
      <div className={guideStyles.glow} aria-hidden="true" />
      <div className={guideStyles.wrap}>
        <nav className={guideStyles.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link href="/feedback">Feedback</Link>
        </nav>
        <PostThread id={id} />
      </div>
    </main>
  );
}
