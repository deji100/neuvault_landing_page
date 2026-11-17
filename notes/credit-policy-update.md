# Website pricing and ownership update — 17 November 2026

## Scope

Website only, following the user's clarification. No changes to `updv-server`, `updv-desktop` or `updv-ui`; no billing deployment, balance changes or database migration. Demos, workflows, analytics and download behavior are unchanged. The previously removed testimonial section stays removed.

## Approved policy copy

- Explorer: 500 introductory credits for 14 days; the local vault remains usable afterward.
- Monthly paid credits carry forward across successful renewals. Existing paid credits remain usable after cancellation, expiry or failed renewal; no further grants once paid access ends.
- Premium Annual stays $200/year, allocated as 8,000 monthly / 96,000 annually, never upfront.
- Purchased extras have no routine expiry or usage threshold. Prices/quantities are unchanged.
- Refunds revoke only the refunded purchase's unused credits, preserving unrelated credits and transaction history without negative balances.

## Release status

The audited billing implementation still resets subscription balances and expires top-ups. Therefore the website labels the revised credit rules **upcoming** by default. `NEXT_PUBLIC_PAID_CREDIT_POLICY_LIVE=false` is documented in `.env.example`. Set true and rebuild only after the corresponding production billing behavior is implemented and verified. Until then, in-app purchase terms apply. The website flag changes copy only; it cannot change entitlements.

The homepage and pricing ownership messaging applies now: local files, no NeuVault cloud storage fees, user-controlled encrypted backups and recovery information. Relevant content is sent for AI processing; account/Planner/reminder information may sync. Optional third-party storage fees are disclosed.

## Audit evidence (read-only)

| Area | Files / finding |
| --- | --- |
| Wallet and rollover | `updv-server/app/services/credit_billing.py`, `credit_wallet.py`: cycle resets expire pooled subscription balances; annual cycles remain monthly and anniversary anchored. |
| Top-ups | `credit_topups.py`, `credit_topup.py`: configured 80% threshold and 15-day expiry; expiry column is non-nullable. |
| Transactions | `credit_ledger_event.py`, `billing_provider_event.py`, `revenuecat_receipts.py`: append-only ledger, unique request/event keys, durable receipts and account/wallet locking. |
| Refunds | `refund_credit_topup`: currently may claw unrelated subscription balance; requires separate billing work to implement the approved policy. |
| Consumption | `apply_credit_charge`: currently subscription → top-ups → manual grants; changing priority and tracking monthly/annual allocations requires separately tested billing work. |
| App copy | Desktop `src/pages/CreditsPage.tsx`; mobile `components/Plans/PlansCreditsInfoModal.tsx`, `app/(app)/extra-credits.tsx`, `hooks/useCreditSummary.ts`: existing policies remain unchanged per scope. |

Review of store/provider requirements:

- [Apple App Review Guidelines, 3.1.1](https://developer.apple.com/app-store/review/guidelines/): purchased credits generally may not expire. Apple also has a separate, permissioned [expiring generative-AI consumables program](https://developer.apple.com/in-app-purchase/expiring-consumables/); no assumption is made that NeuVault participates.
- [Google Play Payments policy](https://support.google.com/googleplay/android-developer/answer/9858738?hl=en): digital purchases and applicable billing rules must still be respected. No checkout channel changes were made.
- [RevenueCat event types](https://www.revenuecat.com/docs/integrations/webhooks/event-types-and-fields): cancellation, expiry, billing issues and refunds are distinct provider events; updating website text does not implement those lifecycle changes.

## Validation

- Production build and responsive website checks recorded with the implementation report.
- Existing backend billing baseline ran in `updv:test` with networking disabled, read-only source and disposable SQLite, covering user credits, annual cycles, RevenueCat webhooks, web billing and concurrency. This validates only existing behavior, not implementation of the new policy. SQLite cannot prove PostgreSQL row-lock behavior; the database-specific tests are skipped there.
- No migration was generated or applied. Historical balances and ledger entries were not touched.

Validation results: production build passed; homepage/pricing passed at 1440, 820 and 390 px in light and dark modes, with the mobile download CTA visible on the first screen. Data checks passed for both release-flag values, unchanged plan prices/allocations, unchanged top-up packages and the 14-day trial. Read-only billing baseline: 39 passed, 2 database-specific concurrency tests skipped. No claim is made that rollover billing was implemented or tested as new behavior.
