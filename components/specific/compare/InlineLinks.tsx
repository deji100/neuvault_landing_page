import Link from "next/link";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Renders a paragraph that may contain [label](url) links; site paths stay client-side links. */
export default function InlineLinks({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(LINK)) {
    const [whole, label, url] = match;
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      url.startsWith("/") ? (
        <Link key={start} href={url}>
          {label}
        </Link>
      ) : (
        <a key={start} href={url} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      )
    );
    last = start + whole.length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
