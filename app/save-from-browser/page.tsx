"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bookmark, Compass, Globe, HelpCircle, Keyboard, MousePointerClick, Puzzle, Smartphone } from "lucide-react";

import { Bullets, Callout, LegalPage, MetaPill, Section, type TocItem } from "@/components/specific/legal/Legal";
import { CHROME_EXTENSION_URL, FIREFOX_EXTENSION_URL, MACOS_APP_STORE_URL } from "@/lib/seo";

const SUPPORT_EMAIL = "support@neuvault.app";

// Same bookmark as the desktop app's Settings → Save from browser.
const SAVE_TO_NEUVAULT_BOOKMARKLET =
  "javascript:(()=>{location.href='neuvault://save?source=bookmarklet&url='"
  + "+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title)})()";

const toc: TocItem[] = [
  { id: "chrome", label: "Chrome, Edge, Brave and Arc" },
  { id: "safari", label: "Safari on Mac" },
  { id: "phone", label: "iPhone and Android" },
  { id: "bookmark", label: "Any browser: the bookmark" },
  { id: "help", label: "If nothing happens" },
];

function Kbd({ children }: { children: string }) {
  return (
    <kbd style={{ border: "1px solid var(--line)", borderRadius: 6, padding: "1px 6px", fontSize: "0.85em", fontFamily: "inherit" }}>
      {children}
    </kbd>
  );
}

export default function SaveFromBrowserPage() {
  const bookmarkRef = useRef<HTMLAnchorElement | null>(null);
  const [copied, setCopied] = useState(false);

  // React refuses javascript: URLs in href; this one is the bookmark itself.
  useEffect(() => {
    bookmarkRef.current?.setAttribute("href", SAVE_TO_NEUVAULT_BOOKMARKLET);
  }, []);

  const copyBookmark = async () => {
    try {
      await navigator.clipboard.writeText(SAVE_TO_NEUVAULT_BOOKMARKLET);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <LegalPage
      kicker="NeuVault Help"
      title="Save pages from your browser"
      lede={
        <>
          Send the page you&apos;re reading, or any link, straight into NeuVault without copy and paste. It arrives in
          NeuVault for you to confirm, then Nova can summarize and file it. You need the{" "}
          <Link href="/#download">NeuVault desktop app</Link> on the same computer. Already set up? See{" "}
          <Link href="/how-to-use-extension">how to use it</Link>.
        </>
      }
      meta={
        <>
          <MetaPill icon={Puzzle} href={CHROME_EXTENSION_URL}>Add to Chrome</MetaPill>
          <MetaPill icon={HelpCircle} href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</MetaPill>
        </>
      }
      highlights={[
        { icon: Puzzle, label: "One click or a shortcut in Chrome, Edge, Brave and Arc" },
        { icon: MousePointerClick, label: "Right-click any link to save it" },
        { icon: Compass, label: "Safari: Share button, then NeuVault" },
        { icon: Smartphone, label: "Phones: share to NeuVault from any app" },
      ]}
      toc={toc}
      footnote="NeuVault — Your data. Your device. Your control."
    >
      <Section id="chrome" title="1. Chrome, Edge, Brave and Arc" icon={Puzzle}>
        <h3>Install</h3>
        <Bullets>
          <li>
            Open{" "}
            <a href={CHROME_EXTENSION_URL} target="_blank" rel="noopener noreferrer">
              Save to NeuVault on the Chrome Web Store
            </a>{" "}
            and click <strong>Add to Chrome</strong>, then <strong>Add extension</strong>. Edge, Brave, Opera, Vivaldi
            and Arc install it from the same page.
          </li>
          <li>
            Pin it so it stays in view: click the puzzle-piece icon in the toolbar, then the pin next to{" "}
            <strong>Save to NeuVault</strong>.
          </li>
          <li>
            <strong>Firefox:</strong> open{" "}
            <a href={FIREFOX_EXTENSION_URL} target="_blank" rel="noopener noreferrer">
              Save to NeuVault on Firefox Add-ons
            </a>{" "}
            and click <strong>Add to Firefox</strong>, then <strong>Add</strong>.
          </li>
        </Bullets>
        <h3>Save</h3>
        <Bullets>
          <li>
            <strong>This page:</strong> click the NeuVault icon in the toolbar, or press <Kbd>Option+Shift+S</Kbd> on
            a Mac (<Kbd>Alt+Shift+S</Kbd> on Windows).
          </li>
          <li>
            <strong>A link:</strong> right-click it and choose <strong>Save link to NeuVault</strong>. Right-click
            the page itself for <strong>Save page to NeuVault</strong>.
          </li>
          <li>
            The first time, your browser asks whether to open NeuVault. Choose <strong>Open</strong>, and tick{" "}
            <strong>Always allow</strong> so it doesn&apos;t ask again.
          </li>
        </Bullets>
        <p>
          <Keyboard size={15} aria-hidden="true" style={{ display: "inline", verticalAlign: "-2px" }} /> To change the
          shortcut, open <code>chrome://extensions/shortcuts</code> (or <code>edge://extensions/shortcuts</code>).
        </p>
      </Section>

      <Section id="safari" title="2. Safari on Mac" icon={Compass}>
        <p>
          Safari uses its Share button instead of an extension. It comes with{" "}
          <a href={MACOS_APP_STORE_URL} target="_blank" rel="noopener noreferrer">
            NeuVault for Mac
          </a>
          ; update to the latest version first.
        </p>
        <h3>Turn it on (once)</h3>
        <Bullets>
          <li>
            In Safari, click the <strong>Share</strong> button (the square with an arrow, at the top right).
          </li>
          <li>
            If <strong>NeuVault</strong> isn&apos;t in the list, choose <strong>Edit Extensions…</strong> at the
            bottom of that menu and turn on <strong>NeuVault</strong>.
          </li>
          <li>
            You can also switch it on in <strong>System Settings</strong>: on macOS Sequoia, go to General → Login
            Items &amp; Extensions → Sharing; on earlier versions, Privacy &amp; Security → Extensions → Sharing.
          </li>
        </Bullets>
        <h3>Save</h3>
        <Bullets>
          <li>
            On any page, click <strong>Share</strong> → <strong>NeuVault</strong>. The page opens in NeuVault for you
            to confirm.
          </li>
          <li>
            No Share button in your toolbar? Choose <strong>View → Customize Toolbar</strong> in Safari and drag it
            in, or use <strong>File → Share</strong>.
          </li>
        </Bullets>
      </Section>

      <Section id="phone" title="3. iPhone and Android" icon={Smartphone}>
        <Bullets>
          <li>
            In Safari, Chrome or any app, tap <strong>Share</strong> and choose <strong>NeuVault</strong>. The link is
            saved the next time you open NeuVault.
          </li>
          <li>
            iPhone: if NeuVault isn&apos;t in the row of apps, scroll to the end, tap <strong>More</strong>, and add
            NeuVault to your favourites.
          </li>
        </Bullets>
      </Section>

      <Section id="bookmark" title="4. Any browser: the bookmark" icon={Bookmark}>
        <p>Works in every desktop browser, including Firefox and Safari, without installing anything.</p>
        <Callout>
          <p style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
            <a
              ref={bookmarkRef}
              href="#bookmark"
              onClick={(event) => event.preventDefault()}
              title="Drag me to your bookmarks bar"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid var(--line)", borderRadius: 999, padding: "6px 14px", fontWeight: 600 }}
            >
              <Bookmark size={15} aria-hidden="true" /> Save to NeuVault
            </a>
            <button type="button" onClick={() => void copyBookmark()} style={{ textDecoration: "underline" }}>
              {copied ? "Copied" : "Copy instead"}
            </button>
          </p>
        </Callout>
        <Bullets>
          <li>
            <strong>Drag</strong> the <em>Save to NeuVault</em> button above onto your bookmarks bar. Show the bar
            with <Kbd>Cmd+Shift+B</Kbd> on a Mac (<Kbd>Ctrl+Shift+B</Kbd> on Windows) if it&apos;s hidden.
          </li>
          <li>
            Or choose <strong>Copy instead</strong>, bookmark any page, edit that bookmark, name it{" "}
            <em>Save to NeuVault</em> and paste into the address (URL) field.
          </li>
          <li>On any page you want to keep, click the bookmark.</li>
        </Bullets>
      </Section>

      <Section id="help" title="5. If nothing happens" icon={Globe}>
        <Bullets>
          <li>Make sure the NeuVault desktop app is installed and you&apos;ve opened it at least once.</li>
          <li>
            If your browser asked whether to open NeuVault and you chose Cancel, save again and choose{" "}
            <strong>Open</strong>.
          </li>
          <li>Safari: check that NeuVault is turned on under Edit Extensions in the Share menu.</li>
          <li>
            Still stuck? Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with your browser and computer
            type.
          </li>
        </Bullets>
      </Section>
    </LegalPage>
  );
}
