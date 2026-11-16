# Homepage cards

The reference-inspired section now renders six factual product-benefit cards in both production and development when no approved testimonials are available. It uses the existing light/dark theme and responsive three/two/one-column layout after the four live demos.

`productHighlights` in `lib/testimonials.ts` covers capture, Vault Map, Reminders, Planner, transcription and offline access. Cards link to the corresponding product demonstration or privacy explanation. They contain no invented customer identities, first-person endorsements, ratings or social-proof claims. The earlier development-only sample quotes have been removed.

`testimonials` remains available for genuine customer feedback approved for publication. Adding entries replaces the benefit cards with the review layout. Preserve the reviewer's words/name and actual rating; do not infer ratings from praise. Optional original-review links appear on cards.

Production rendering must include all six benefit cards while the testimonials array is empty. No NODE_ENV condition hides the section.
