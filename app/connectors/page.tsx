"use client";

import Link from "next/link";
import { Globe, KeyRound, Laptop, Lightbulb, MessageSquare, Shield, Smartphone, Wrench } from "lucide-react";

import { Bullets, Callout, LegalPage, MetaPill, Section, type TocItem } from "@/components/specific/legal/Legal";

const SUPPORT_EMAIL = "support@neuvault.app";
const CONNECTOR_URL = "https://mcp.neuvault.app/mcp";

const toc: TocItem[] = [
  { id: "what", label: "What your AI app can do" },
  { id: "before", label: "Before you start" },
  { id: "computer", label: "Claude Desktop on your computer" },
  { id: "claude-web", label: "Claude on the web" },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "phone", label: "On your phone" },
  { id: "permissions", label: "Choose what apps may do" },
  { id: "try", label: "Things to ask" },
  { id: "privacy", label: "Privacy" },
  { id: "help", label: "If something doesn't work" },
];

const code: React.CSSProperties = { wordBreak: "break-all" };

export default function ConnectorsPage() {
  return (
    <LegalPage
      kicker="NeuVault Help"
      title="Use NeuVault with Claude and ChatGPT"
      lede={
        <>
          Ask Claude or ChatGPT about the files, notes and links in your NeuVault vault, and save new things into it,
          without uploading anything. Your vault stays on your computer; the AI app asks NeuVault for what it needs.
        </>
      }
      meta={
        <>
          <MetaPill icon={Globe} href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</MetaPill>
          <MetaPill icon={Shield} href="/privacy-policy#ai-apps">Privacy</MetaPill>
        </>
      }
      highlights={[
        { icon: MessageSquare, label: "Search, read and save from your AI app" },
        { icon: Laptop, label: "Your vault stays on your computer" },
        { icon: KeyRound, label: "You choose what each app may do" },
        { icon: Shield, label: "Protected items are never shared" },
      ]}
      toc={toc}
      footnote="NeuVault — Your data. Your device. Your control."
    >
      <Section id="what" title="1. What your AI app can do" icon={MessageSquare}>
        <Bullets>
          <li>
            <strong>Find and read:</strong> search your vault by title, summary, tags and group, count items (for
            example, how many receipts you saved this year), and read what&apos;s inside notes and documents: PDF, Word,
            PowerPoint, Excel, text and more, plus images and the saved details of links.
          </li>
          <li>
            <strong>Create and save:</strong> make a PDF, Word, Excel or PowerPoint file, or a note, and put it in your
            vault; keep web pages and YouTube videos; save a file you give it. NeuVault AI organizes what AI apps save
            into your groups using your credits; without credits it waits in your Inbox.
          </li>
          <li>
            <strong>Plan:</strong> tell you what&apos;s on today or this week, add tasks and events, reschedule them,
            move them to another board column, mark them done, and attach documents to them.
          </li>
          <li>
            <strong>Remind:</strong> set a reminder for a document, a Vault Map, or anything else, list what&apos;s
            coming up, and mark a reminder done.
          </li>
          <li>
            <strong>Vault Maps:</strong> make a new map from your documents, add documents, notes, checklists and
            lines, edit a note card or tick items on its checklist, group cards and rename a map.
          </li>
          <li>
            <strong>Open things in NeuVault:</strong> bring up a document, map, task or reminder in the NeuVault app on
            your computer.
          </li>
          <li>AI apps can&apos;t delete anything in your vault.</li>
          <li>In ChatGPT or Claude, you can do all of this by voice.</li>
        </Bullets>
      </Section>

      <Section id="before" title="2. Before you start" icon={Wrench}>
        <Bullets>
          <li>Install the NeuVault app on your Mac or Windows PC and sign in.</li>
          <li>
            In NeuVault, open <strong>Connectors</strong> in the sidebar. Connecting AI apps is free on every NeuVault
            plan.
          </li>
          <li>
            NeuVault answers while it is open, signed in and unlocked on your computer. If it is closed, your AI app
            will say so.
          </li>
        </Bullets>
      </Section>

      <Section id="computer" title="3. Claude Desktop on your computer" icon={Laptop}>
        <Bullets>
          <li>
            In NeuVault, open <strong>Connectors</strong>, choose the <strong>This computer</strong> tab and turn on{" "}
            <strong>Allow AI apps on this computer</strong>.
          </li>
          <li>
            Click <strong>Set up</strong> next to Claude Desktop, then quit and reopen Claude. NeuVault then appears
            in Claude.
          </li>
          <li>
            Other apps that support local MCP servers can connect too: <strong>More ways to connect</strong> shows the
            settings to copy.
          </li>
        </Bullets>
      </Section>

      <Section id="claude-web" title="4. Claude on the web (claude.ai)" icon={Globe}>
        <Bullets>
          <li>
            In NeuVault, open <strong>Connectors</strong>, choose the <strong>Web</strong> tab and turn on{" "}
            <strong>Allow AI apps on the web</strong>.
          </li>
          <li>
            In Claude, open <strong>Settings › Customize › Connectors</strong>, click <strong>+ Add</strong> and add a
            custom connector named NeuVault with this address:
            <br />
            <code style={code}>{CONNECTOR_URL}</code>
          </li>
          <li>Keep the sign-in options Claude picks, click Add, and sign in with your NeuVault email and the code we send.</li>
          <li>
            Optional: Claude asks before every search and save until you change it. In Claude, open{" "}
            <strong>Customize › Connectors › NeuVault</strong> and set both <strong>Read-only tools</strong> and{" "}
            <strong>Write/delete tools</strong> to <strong>Always allow</strong>. Some work plans only allow this in Chat.
          </li>
        </Bullets>
      </Section>

      <Section id="chatgpt" title="5. ChatGPT" icon={Globe}>
        <Bullets>
          <li>
            In NeuVault, turn on <strong>Allow AI apps on the web</strong> in the Web tab of Connectors.
          </li>
          <li>
            In ChatGPT, open <strong>Plugins</strong>, click <strong>Add</strong> and add a custom MCP server named
            NeuVault with the address above and OAuth sign-in. ChatGPT offers this on its paid plans.
          </li>
          <li>Sign in with your NeuVault email and the code we send, and choose what ChatGPT may do. Allow saving if you want it to save into your vault.</li>
          <li>
            Then install it: in <strong>Plugins</strong>, search for <strong>NeuVault</strong> and click{" "}
            <strong>+</strong>. It&apos;s ready when NeuVault shows under <strong>Installed</strong>, in the ChatGPT app
            and on chatgpt.com.
          </li>
        </Bullets>
      </Section>

      <Section id="phone" title="6. On your phone" icon={Smartphone}>
        <Bullets>
          <li>
            Once you add NeuVault in ChatGPT or Claude, it belongs to your ChatGPT or Claude account, so their phone
            apps can use it too.
          </li>
          <li>
            NeuVault is local-first: your files are stored on your devices, not on our servers. When you ask from your
            phone, the request goes to NeuVault on your computer, which finds what you asked for and sends back only
            that. Keep NeuVault open and unlocked on your computer.
          </li>
          <li>The NeuVault phone app doesn&apos;t connect to ChatGPT or Claude.</li>
        </Bullets>
      </Section>

      <Section id="permissions" title="7. Choose what apps may do" icon={KeyRound}>
        <Bullets>
          <li>
            When you sign in, choose whether the app may <strong>search</strong> your vault, <strong>read</strong>{" "}
            what&apos;s inside items, and <strong>save</strong> into it.
          </li>
          <li>
            NeuVault&apos;s Connectors page has the same switches for apps on your computer and on the web, a list of
            connected web apps with <strong>Disconnect</strong>, and <strong>Recent activity</strong>, which shows what
            apps did (never what they read).
          </li>
          <li>Items you mark as protected are never shared with any AI app.</li>
        </Bullets>
      </Section>

      <Section id="try" title="8. Things to ask" icon={Lightbulb}>
        <Bullets>
          <li>&ldquo;What groups do I have in NeuVault, and how many items are in each?&rdquo;</li>
          <li>&ldquo;Find my lease and tell me when I need to give notice.&rdquo;</li>
          <li>&ldquo;Summarize the documents I saved about the website project.&rdquo;</li>
          <li>&ldquo;Save a note to NeuVault with the action items from this conversation.&rdquo;</li>
          <li>&ldquo;Save this article to NeuVault: [link]&rdquo;</li>
          <li>&ldquo;Make a budget spreadsheet for my trip and save it in NeuVault.&rdquo;</li>
          <li>&ldquo;What&apos;s on my plan this week? Move the website task to In Review.&rdquo;</li>
          <li>&ldquo;Remind me to renew my passport on March 1.&rdquo;</li>
          <li>&ldquo;Make a Vault Map for my move, with a packing checklist.&rdquo;</li>
        </Bullets>
        <p>
          The more you save and organize in NeuVault (files, notes, web pages, YouTube links and social media
          posts), the more your AI app can help.
        </p>
      </Section>

      <Section id="privacy" title="9. Privacy" icon={Shield}>
        <Bullets>
          <li>Your vault stays on your computer. Apps on your computer talk to NeuVault directly.</li>
          <li>
            Apps on the web reach NeuVault on your computer through our secure connection. Requests and answers pass
            through it; we do not store what an app searches for, reads or saves.
          </li>
          <li>
            Whatever an AI app reads is shared with the company that runs it, under that company&apos;s privacy
            policy.
          </li>
        </Bullets>
        <p>
          Details are in our <Link href="/privacy-policy#ai-apps">Privacy Policy</Link>.
        </p>
      </Section>

      <Section id="help" title="10. If something doesn't work" icon={Wrench}>
        <Bullets>
          <li>
            <strong>&ldquo;NeuVault isn&apos;t open on your computer&rdquo;:</strong> open NeuVault, sign in and
            unlock it, then ask again.
          </li>
          <li>
            <strong>The app can&apos;t search or save:</strong> check the switches in NeuVault&apos;s Connectors page,
            and what you allowed when you signed in. Disconnect and connect again to change the latter.
          </li>
          <li>
            <strong>Sign-in fails:</strong> use the same email as the NeuVault app on your computer.
          </li>
          <li>
            <strong>Claude Desktop doesn&apos;t show NeuVault:</strong> quit Claude completely and reopen it, or click{" "}
            <strong>Refresh connection</strong> in NeuVault&apos;s Connectors page.
          </li>
        </Bullets>
        <Callout>
          <p>
            Still stuck? Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with the AI app you use and your
            computer type.
          </p>
        </Callout>
      </Section>
    </LegalPage>
  );
}
