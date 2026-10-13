"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Download, Puzzle } from "lucide-react";
import { SiArc, SiBrave, SiFirefoxbrowser, SiGooglechrome, SiOpera, SiSafari, SiVivaldi } from "react-icons/si";
import { TbBrandEdge } from "react-icons/tb";

import { detectBrowser, extensionTargetFor, isMobileBrowser, type BrowserKind, type ExtensionTarget } from "@/lib/browserExtension";

const ICONS: Partial<Record<BrowserKind, ComponentType<{ size?: number; "aria-hidden"?: boolean }>>> = {
  chrome: SiGooglechrome,
  edge: TbBrandEdge,
  brave: SiBrave,
  opera: SiOpera,
  vivaldi: SiVivaldi,
  arc: SiArc,
  firefox: SiFirefoxbrowser,
  safari: SiSafari,
};

const HELP_PAGES = new Set(["/save-from-browser", "/how-to-use-extension"]);

/**
 * A round extension button in the bottom-left corner of every page. Hover or
 * click opens it into "Download extension" (for the visitor's own browser) and
 * "Learn how to use it" (its own page). Hidden on phones (no extensions
 * there) and on the two help pages.
 */
export default function ExtensionFab() {
  const pathname = usePathname();
  const [target, setTarget] = useState<ExtensionTarget | null>(null);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isMobileBrowser()) return;
    setTarget(extensionTargetFor(detectBrowser()));
  }, []);

  // Close on Escape or a click elsewhere, for the click-opened state.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const onPointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  if (!target || HELP_PAGES.has(pathname)) return null;

  const Icon = ICONS[target.browser] || Puzzle;

  return (
    <div
      ref={rootRef}
      className="extension-fab"
      data-open={open ? "true" : "false"}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="extension-fab-trigger"
        aria-expanded={open}
        aria-controls="extension-fab-panel"
        aria-label={`Save to NeuVault for ${target.browserName}`}
        title="Save to NeuVault browser extension"
        onClick={() => setOpen((value) => !value)}
      >
        <Icon size={20} aria-hidden />
      </button>
      <div id="extension-fab-panel" className="extension-fab-panel" hidden={!open}>
        <p className="extension-fab-title">Save to NeuVault</p>
        <a
          className="extension-fab-action is-primary"
          href={target.href}
          {...(target.external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          <Download size={16} aria-hidden="true" />
          <span>
            <strong>Download extension</strong>
            <small>{target.action}</small>
          </span>
        </a>
        <Link className="extension-fab-action" href="/how-to-use-extension">
          <BookOpen size={16} aria-hidden="true" />
          <span>
            <strong>Learn how to use it</strong>
            <small>Save pages and links in one click</small>
          </span>
        </Link>
      </div>
    </div>
  );
}
