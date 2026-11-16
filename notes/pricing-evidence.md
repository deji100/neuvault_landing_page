# Pricing review evidence — November 16, 2026

Scope: website pricing copy and disclosures. Server and desktop repositories were
read as evidence; no billing policy, ledger, entitlement or application code was changed.

| Topic | Evidence | Website treatment |
| --- | --- | --- |
| Feature access | `updv-server/app/doc/pricing-billing-spec.md` says usage is charged rather than feature access. Searches for `subscription_plan`, `subscription.plan` and `plan_code` found billing/account logic, not tier-specific AI routing or queue priority. Model costs in `app/core/pricing.py` are independent of subscription tier. | Removed priority, faster-response and deeper-analysis promises. Paid plans differ by credit allowance and billing frequency. |
| Allowances | `app/core/config.py`: Explorer 500 / 14 days; Starter 2,000; Personal 4,000; Pro 6,000; Premium and Premium Annual 8,000 per monthly credit period. | Preserved the plan allowances. Annual prominently shows 8,000 monthly, with 96,000 across twelve allowances rather than upfront. |
| Annual allocation | `app/services/credit_billing.py`, `_annual_credit_cycle_bounds` and `_subscription_cycle_bounds`; regression examples in `app/tests/test_annual_credit_cycles.py`. Monthly boundaries retain the subscription anniversary, adjusting for month length. | Annual billing and monthly credit allocation are distinguished explicitly. |
| Rollover | `ensure_wallet_in_sync` writes a `cycle_expiry` ledger event for the remaining balance, zeroes it, then grants the new monthly allowance. The annual regression test explicitly asserts no rollover. | Unused plan credits expire each monthly credit period, including on the annual plan. |
| Top-up eligibility | `app/services/credit_topups.py`, `should_offer_topups`: spent/granted >= 0.8. `credit_billing.topup_purchase_allowed` requires an active paid entitlement; test accounts bypass the threshold. Desktop CreditsPage uses the server eligibility flag. | Top-ups unlock after at least 80% of the current plan allowance is used. Starter illustration: 1,600 / 2,000 credits. No earlier-purchase policy was invented. |
| Top-up expiry/order | `credit_billing.grant_topup_credits` uses purchase time + 15 days. `apply_credit_charge` consumes subscription balance before top-up balances. | Restrictions appear above the packs; each pack repeats its 15-day expiry. Unused extras can expire before they are spent. |
| Actual usage | `updv-desktop/src/pages/CreditsPage.tsx`, CreditsInfoModal and recent-usage modal show credit changes. | Users are directed to Credits → Usage to check their own charges. |
| Checkout | Desktop `src/lib/webBilling.ts` and CreditsPage support account-linked store checkout, and web checkout in supported direct-download distributions when enabled. | Direct users to Credits in their app; qualify available options by platform/distribution rather than promising a purchase path on every desktop build. |

## Reference usage calculations

These are deterministic examples of individual processing components, **not
production ledger observations, whole-task quotes or measured averages**.

- OCR: `app/services/billing_usage.py`, `record_ocr_usage` charges processed pages
  × `OCR_CREDITS_PER_PAGE` (default 2). Five processed pages = **10 credits**.
  This user charge is separate from provider free-page pricing. Further AI work
  adds usage.
- Transcription: `record_whisper_usage` uses `whisper_cost_usd` then
  `usd_to_credits` in `app/core/pricing.py`. Reference defaults are $0.006/minute
  and $0.001/credit; ten minutes = **60 credits** for that component. Calls/chunks
  round independently; structuring and summaries also record model usage in
  `app/api/v1/ai/transcribe.py`.
- Nova and PDF organization: usage may contain several model, OCR or search events.
  No representative production samples were available in this review. The page
  states what affects cost instead of publishing unverified per-task ranges.
- The intake minimum balance of 10 credits is a precheck, **not** a fixed charge;
  `precheck_required_credits_for_endpoint` explicitly distinguishes it from final
  measured billing. It is not marketed as a document price.

Verification executed the actual source functions with the configuration defaults,
using isolated in-memory usage contexts and no user ID. Assertions passed for
5-page OCR = 10, 10-minute transcription = 60, top-up eligibility at 1,600 of 2,000
(but not 1,599), and an annual January 31 → February 28 → March 31 credit boundary.
No database, customer ledger or AI provider request was made. The deployed
environment was not inspected; these rates remain environment-configurable.

## Store prices

The [US App Store listing](https://apps.apple.com/us/app/neuvault/id6759370392),
retrieved November 16, lists Starter $4.99, Personal $9.99, Pro $14.99, Premium
$19.99, Premium Annual $200, and extra-credit packs $5.99 / $11.99. Existing
website prices were retained. Starter's old “not yet on the App Store” source
comment was removed.

Server top-up reference prices default to $6 / $12, while the desktop displays
the store product's actual `displayPrice`. Those server reference values were not
used to overwrite the verified US storefront prices. The website discloses that
store, region and platform may affect final checkout prices.

## Follow-up outside website scope

`updv-desktop/src/pages/CreditsPage.tsx` still contains the same priority,
faster-response and deeper-analysis promotional strings in `BILLING_TIERS`.
They were not treated as proof of service-level enforcement. Application copy
should be reconciled separately with the website's corrected wording.
