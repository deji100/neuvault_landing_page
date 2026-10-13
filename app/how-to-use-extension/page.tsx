"use client";

import Link from "next/link";
import { Bot, Globe, Inbox, Keyboard, Lightbulb, MousePointerClick, Puzzle } from "lucide-react";

import { Bullets, Callout, LegalPage, MetaPill, Section, type TocItem } from "@/components/specific/legal/Legal";

const SUPPORT_EMAIL = "support@neuvault.app";

const toc: TocItem[] = [
  { id: "page", label: "Save the page you're on" },
  { id: "link", label: "Save a link without opening it" },
  { id: "after", label: "What happens next" },
  { id: "tips", label: "Tips" },
  { id: "help", label: "If nothing happens" },
];

function Kbd({ children }: { children: string }) {
  return (
    <kbd style={{ border: "1px solid var(--line)", borderRadius: 6, padding: "1px 6px", fontSize: "0.85em", fontFamily: "inherit" }}>
      {children}
    </kbd>
  );
}

export default function HowToUseExtensionPage() {
  return (
    <LegalPage
      kicker="NeuVault Help"
      title="How to use Save to NeuVault"
      lede={
        <>
          Keep any web page or link in NeuVault in one click, without copy and paste. Haven&apos;t set it up yet?{" "}
          <Link href="/save-from-browser">Get the extension for your browser</Link> first.
        </>
      }
      meta={
        <>
          <MetaPill icon={Puzzle} href="/save-from-browser">Set it up</MetaPill>
          <MetaPill icon={Globe} href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</MetaPill>
        </>
      }
      highlights={[
        { icon: Puzzle, label: "Click the NeuVault button, or press the shortcut" },
        { icon: MousePointerClick, label: "Right-click a link to save it without opening it" },
        { icon: Inbox, label: "Save to Inbox, or let Nova organize it" },
        { icon: Bot, label: "Saving is free; organizing with AI uses credits" },
      ]}
      toc={toc}
      footnote="NeuVault — Your data. Your device. Your control."
    >
      <Section id="page" title="1. Save the page you're on" icon={Puzzle}>
        <Bullets>
          <li>
            <strong>Chrome, Edge, Brave and Arc:</strong> click the NeuVault button in the toolbar, or press{" "}
            <Kbd>Option+Shift+S</Kbd> on a Mac (<Kbd>Alt+Shift+S</Kbd> on Windows). You can also right-click
            anywhere on the page and choose <strong>Save page to NeuVault</strong>.
          </li>
          <li>
            <strong>Safari:</strong> click the <strong>Share</strong> button and choose <strong>NeuVault</strong>.
          </li>
          <li>
            <strong>Firefox and other browsers:</strong> click your <strong>Save to NeuVault</strong> bookmark.
          </li>
          <li>
            <strong>iPhone and Android:</strong> tap <strong>Share</strong> in Safari, Chrome or any app and choose{" "}
            <strong>NeuVault</strong>.
          </li>
        </Bullets>
      </Section>

      <Section id="link" title="2. Save a link without opening it" icon={MousePointerClick}>
        <Bullets>
          <li>
            In Chrome, Edge, Brave and Arc, <strong>right-click</strong> the link and choose{" "}
            <strong>Save link to NeuVault</strong>. Handy for search results, newsletters and reading lists.
          </li>
          <li>
            In Safari, right-click the link, choose <strong>Share</strong>, then <strong>NeuVault</strong>.
          </li>
        </Bullets>
      </Section>

      <Section id="after" title="3. What happens next" icon={Inbox}>
        <Bullets>
          <li>
            NeuVault comes forward and asks <strong>Save this page to NeuVault?</strong>, showing the page&apos;s
            title and address. Nothing is saved until you choose.
          </li>
          <li>
            <strong>Save to Inbox</strong> keeps it as it is, in your Inbox, ready for later. Saving never uses
            credits.
          </li>
          <li>
            <strong>Organize with AI</strong> (web pages) lets Nova read the page, write a short summary, add tags and
            file it into the right group, so you know what it is before you open it again. This uses AI credits.
          </li>
          <li>YouTube links play right inside NeuVault.</li>
          <li>Close the card to save nothing.</li>
        </Bullets>
        <p>NeuVault saves web pages and YouTube links. Saved pages are searchable like everything else in your vault.</p>
      </Section>

      <Section id="tips" title="4. Tips" icon={Lightbulb}>
        <Bullets>
          <li>
            Pin the extension so the button is always in view: puzzle-piece icon in the toolbar, then the pin next to
            Save to NeuVault.
          </li>
          <li>
            <Keyboard size={14} aria-hidden="true" style={{ display: "inline", verticalAlign: "-2px" }} /> Change the
            shortcut at <code>chrome://extensions/shortcuts</code> (or <code>edge://extensions/shortcuts</code>).
          </li>
          <li>
            The first time you save, your browser asks whether to open NeuVault. Tick <strong>Always allow</strong>{" "}
            and it won&apos;t ask again.
          </li>
          <li>Saving the same page twice is fine: NeuVault spots the duplicate, skips it and tells you.</li>
        </Bullets>
      </Section>

      <Section id="help" title="5. If nothing happens" icon={Globe}>
        <Bullets>
          <li>Make sure the NeuVault desktop app is installed on this computer and you&apos;ve opened it once.</li>
          <li>
            If your browser asked whether to open NeuVault and you chose Cancel, save again and choose{" "}
            <strong>Open</strong>.
          </li>
          <li>
            Safari: check that NeuVault is turned on in the Share menu (see{" "}
            <Link href="/save-from-browser#safari">setting up Safari</Link>).
          </li>
        </Bullets>
        <Callout>
          <p>
            Still stuck? Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with your browser and computer
            type.
          </p>
        </Callout>
      </Section>
    </LegalPage>
  );
}
