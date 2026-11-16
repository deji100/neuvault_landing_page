# Workflows and GA4

## Configuration

No pre-existing GA4 or Google Tag Manager installation was found in the source.
The single consent-controlled tag lives in `components/general/GoogleAnalytics.tsx`
and `lib/analytics.ts`.

Set this **build-time** variable in the production hosting environment (Next.js
inlines public variables when building):

```dotenv
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-RV4D6WPEXH
```

`.env.example` documents the public settings. The local checkout also has the
measurement ID in ignored `.env.local`. Do not put server credentials or GA API
secrets in any `NEXT_PUBLIC_` variable.

Production collection requires the `neuvault.app` or `www.neuvault.app` hostname,
explicit consent, and a normal browser. Development, preview hosts and automated
browsers are disabled by default. These build-time flags explicitly enable QA:

```dotenv
NEXT_PUBLIC_GA_ENABLE_LOCAL=true
NEXT_PUBLIC_GA_ENABLE_AUTOMATION=true
NEXT_PUBLIC_GA_DEBUG=true
```

Keep those flags off in production. `NEXT_PUBLIC_GA_ENABLED=false` is a kill switch.

## GA4 property setup

The public Google tag for this stream is linked to `GTM-WBHSGHRD`. Do not install
its separate snippet alongside this integration. The live collector check confirmed
that its current configuration enables automatic measurement and user-provided
data capabilities. An initial debug smoke test received HTTP 204 for every requested
custom event type and exposed an additional automatic page view. Queuing global
settings before Google-tag initialization resolved that initial duplicate; the real
Google library was retested with collection intercepted and produced one initial
page view. A follow-up real-collector smoke test confirmed HTTP 204 for that one
page view and all five requested custom event types with debug mode supplied.
Property-level history, outbound-click and form measurement still need to be
disabled: the real tag also generated an automatic outbound `click` event.

Update, November 16, 2026: the owner disabled GA4 Enhanced measurement. The
subsequently fetched public tag no longer includes its GA4 enhanced-measurement
destination listeners. User-provided data capabilities remain enabled in the
served tag configuration and are awaiting the owner's settings change.

In the Web stream's **Enhanced measurement** settings, disable automatic events,
including page views based on browser history, form interactions and outbound
clicks. This integration sends sanitized page views and download events itself;
leaving auto-measurement enabled can produce duplicates or automatically collected
URLs outside the explicit event schema. This is a property setting, not a source
code setting. It has not been changed by this implementation.

Also turn off **Google tag → Configure tag settings → Allow user-provided data
capabilities**. This website does not use enhanced conversions or user-provided
data. The integration sets an empty `user_data` object globally and on every
manual event and leaves advertising consent denied. Defaults are queued before
the linked tag can initialize its destination.
For the newer linked-container interface, open **GTM-WBHSGHRD → Settings → Show
all → Allow user-provided data capabilities** and switch it off.

Register event-scoped custom dimensions for `workflow_category`, `workflow_id`,
`step_name`, `surface`, `platform` and `location` if you want them in reports, and a
custom metric for `step_number` if needed. `workflow_completed` means exploration
of the website example, not completion of an in-app task. Mark `download_clicked`
as a key event if this is your intended website conversion.

## Consent and data boundaries

- The tag is not requested until consent is granted. Pre-consent events are dropped
  and never replayed. Advertising consent stays denied; Google signals and ad
  personalization are disabled.
- Consent is saved locally for 180 days. Do Not Track and Global Privacy Control
  override an accepted preference. The footer reopens Analytics preferences.
- Withdrawal disables the measurement ID and removes accessible `_ga` cookies.
  Storage changes in other tabs also update consent.
- Only explicitly allowed public marketing routes are measured. Contact, feedback,
  sign-in and account pages are excluded. Manual page locations omit query strings
  and fragments. Page titles are generated from public routes; referrers are empty.
- Events contain only fixed workflow and platform fields. No user ID, email,
  document, note or vault content is read or sent. Google still receives ordinary
  browser/connection metadata and analytics cookie identifiers after consent.

## Event semantics

Events are first emitted as `neuvault:marketing` CustomEvents and forwarded only
while analytics is enabled and consented:

| Event | Trigger | Public fields |
| --- | --- | --- |
| `workflow_selected` | Explicitly select an outcome, including the default on its first click | `workflow_id`, `workflow_category`, `surface` |
| `workflow_visible` | First visible panel, separate from interaction | workflow fields, `surface` |
| `workflow_step_viewed` | Use step or navigation controls; first interaction also acknowledges the current step | workflow fields, `step_name`, `step_number`, `surface` |
| `workflow_completed` | All five distinct steps explored manually, once per selected example | workflow fields, `surface` |
| `platform_selected` | Click a named operating-system download choice | workflow fields when applicable, `platform`, `location` |
| `download_clicked` | Click an actual app-store link, including middle click | workflow fields when applicable, `platform`, `location` |

Opening `#download` is not counted as a download. Automatic OS detection is not a
platform selection. Rerenders and repeated clicks on the current step do not emit
additional step events. Attribution is in memory; it resets on a full page load.
The illustrated carousel is visible immediately. Automatic slide progression and
SVG animations never emit step or completion events. Playback pauses offscreen,
in background tabs, on hover/focus, or when requested by the visitor; reduced-motion
preferences disable automatic playback and decorative animation.

## Reminder storytelling

The six featured workflows keep five stages. Their typed reminder examples carry
the source document, detected date, reminder date and lead time. Capture saves the
document; Organize identifies a date for review; Connect retains the source context.
Plan explicitly separates reviewing the document date, choosing a reminder and
optionally creating a source-linked Planner task. Act shows the document returning
before the commitment, without requiring a task or claiming that a task was completed.
The dates are illustrative, and no real reminder or account record is created.

Examples: assignment due, research submission, contract renewal, creative review,
passport expiry and a target release. All retain the established blue/neutral
palette, carousel controls and motion preferences. Plan links to both Reminders
and Planner; Act links to the Reminders walkthrough. The four live demonstrations
are preserved.

## Verification

Build and run the browser check with an isolated Chrome remote-debugging profile.
The check intercepts the Google script and collection endpoints: it never submits
automated traffic to the live GA4 property.

For a real smoke test after deployment, temporarily use a debug build, allow
analytics in a normal browser, and open the property's **Realtime** and
**Admin → Data display → DebugView**. Select an outcome, explore all five steps,
choose an OS and click a download. Confirm one `page_view` per route and the five
requested custom events, then withdraw consent and confirm subsequent actions no
longer send requests. Remove debug mode afterward. Property-side verification
requires authenticated access to the GA4 property; a measurement ID alone does
not grant read access.

References: [Google consent mode](https://developers.google.com/tag-platform/security/guides/consent),
[configuration](https://developers.google.com/analytics/devguides/collection/ga4/reference/config),
[SPA measurement and DebugView](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications).

## Brief, source-checked product copy (16 November 2026)

Reviewed the desktop and server implementation before simplifying the homepage, all eight workflow examples, feature descriptions and use-case introductions. Carousel paragraphs now contain 9–18 words, with concrete actions in the headings. The illustrations retain the exact example dates and separate optional Planner task. Demo introductions use one or two sentences; playback code and embedded demonstrations are unchanged.

Evidence checked in sibling repositories:

- `updv-desktop/src/lib/captureApi.ts`: local Inbox saves without processing; AI processing is a separate path with a credit check.
- `updv-desktop/src/lib/desktopQueue.ts`: watched folders support AI processing or Inbox saving; audio goes through media review.
- `updv-server/app/services/intake/schemas.py`: structured summaries, groups, subgroups, tags and future-date detection.
- `updv-server/app/services/smart_suggestions_service.py`: upcoming dates generate document-linked suggestions, including recommended reminder timing. This is distinct from a manually scheduled reminder.
- `updv-desktop/src/components/intake/DesktopResurfaceSection.tsx`: user-selected reminder date/time and repeat options.
- `updv-desktop/src/pages/PlannerPage.tsx`: “Plan from reminders,” attached documents, Agenda/Week/Month/Board and confirmation of Nova changes.
- `updv-server/app/services/planner_ai_service.py`: Nova proposes Planner changes; the client applies them after confirmation.
- `updv-desktop/src/features/linked-document-map/README.md` and `NOVA_MAP_AI_README.md`: desktop canvas, source cards and notes, side-by-side reading, export, scoped Nova context and confirmed map actions. Avoided the earlier claim that Nova reads every card in full.

The deadline and renewal stories are illustrative examples of these general capabilities, not separate industry-specific automation. AI date extraction is reviewed against the source. Reminders work without a Planner task; creating a task remains an explicit choice. Privacy and online-processing explanations remain visible.
