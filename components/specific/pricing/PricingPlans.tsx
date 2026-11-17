import Link from "next/link";
import { Check, Coins, CreditCard, HardDrive, KeyRound, ShieldCheck, Sparkles } from "lucide-react";
import { creditPolicyNotice, paidCreditPolicyLive, creditRules, creditTopUps, creditUsageExamples, includedPlanFeatures, pricingFaqs, pricingPlans } from "@/lib/pricing";
import styles from "./PricingPlans.module.css";

type PricingPlansProps = {
  variant?: "home" | "page";
};

export default function PricingPlans({ variant = "home" }: PricingPlansProps) {
  const isPage = variant === "page";

  if (!isPage) {
    return (
      <section
        id="subscription-plans"
        className="relative overflow-hidden bg-white px-5 py-16 sm:px-6 sm:py-20 lg:py-24"
      >
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.10),transparent_42%)]" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#f7fbff] to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                Subscription plans
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
                Simple credit plans for the way your vault grows.
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                Free to store documents. Credits only when you choose to use AI.
                Explorer includes 500 free credits available for 14 days, and
                NeuVault remains usable after the trial ends.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-slate-700">
                {[
                  { label: "Private vault", icon: ShieldCheck },
                  { label: "AI credits", icon: CreditCard },
                  { label: "Nova ready", icon: Sparkles },
                ].map(({ label, icon: Icon }) => (
                  <span key={label} className="inline-flex items-center gap-2">
                    <Icon className="h-4 w-4 text-blue-600" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white/92 shadow-[0_32px_90px_-58px_rgba(15,23,42,0.45)]">
            <div className="hidden grid-cols-[1fr_0.7fr_0.85fr_1.25fr] gap-5 border-b border-slate-200 bg-slate-50/80 px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 md:grid">
              <span>Plan</span>
              <span>Price</span>
              <span>Credits</span>
              <span>Best for</span>
            </div>

            <div className="divide-y divide-slate-200">
              {pricingPlans.map((plan) => {
                const featured = plan.id === "pro";
                return (
                  <div
                    key={plan.id}
                    className={`grid gap-4 px-5 py-5 md:grid-cols-[1fr_0.7fr_0.85fr_1.25fr] md:items-center md:px-6 ${
                      featured ? "bg-blue-50/80" : "bg-white/70"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 md:block">
                      <div>
                        <h3 className="text-lg font-bold text-slate-950">
                          {plan.name}
                        </h3>
                        {plan.highlight ? (
                          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
                            {plan.highlight}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <p className="text-lg font-bold text-slate-950">
                      {plan.price}
                    </p>

                    <div>
                      <p className="text-2xl font-black text-slate-950">
                        {plan.allowance}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        {plan.cadence}
                      </p>
                    </div>

                    <p className="text-sm leading-6 text-slate-600">
                      {plan.audience}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-5 border-t border-slate-200 bg-[#f7fbff] px-5 py-5 md:grid-cols-[1fr_auto] md:items-center md:px-6">
              <div>
                <h3 className="text-base font-bold text-slate-950">
                  Every plan keeps the same private vault foundation.
                </h3>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-slate-600">
                  {includedPlanFeatures.slice(0, 5).map((feature) => (
                    <span key={feature} className="inline-flex items-center gap-2">
                      <Check className="h-4 w-4 text-blue-600" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_-22px_rgba(37,99,235,0.9)] hover:bg-blue-700"
                >
                  View full pricing
                </Link>
                <Link
                  href="/#download"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:border-blue-200 hover:text-blue-700"
                >
                  Download app
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="subscription-plans" className={styles.pageSection}>
      <div className={styles.pageLayout}>
        <aside>
          <div className={styles.summary}>
            <p className={styles.summaryTitle}>Plan summary</p>

            <nav className={styles.summaryNav}>
              {pricingPlans.map((plan) => (
                <a key={plan.id} href={`#${plan.id}`}>{plan.name}</a>
              ))}
              <a href="#credits">How credits work</a>
              <a href="#storage-ownership">Storage and ownership</a>
              <a href="#credit-usage">What can credits do?</a>
              <a href="#included">Included across plans</a>
              <a href="#pricing-questions">Pricing questions</a>
            </nav>

            <div className={styles.regionNote}>
              USD prices reflect the US App Store. Final prices and available
              purchase options may vary by store, platform and region. Confirm
              the price at checkout.
            </div>
          </div>
        </aside>

        <div className={styles.plans}>
          <p className={styles.policyNotice} role="note">{creditPolicyNotice}</p>
          {pricingPlans.map((plan) => {
            const featured = plan.id === "pro";
            return (
              <article
                id={plan.id}
                key={plan.id}
                className={`${styles.plan} ${featured ? styles.featured : ""}`}
              >
                <div className={styles.planHead}>
                  <div>
                    <div className={styles.titleRow}>
                      <h2>{plan.name}</h2>
                      {plan.highlight ? (
                        <span className={styles.highlight}>{plan.highlight}</span>
                      ) : null}
                    </div>
                    <p className={styles.audience}>{plan.audience}</p>
                    <p className={styles.summaryCopy}>{plan.summary}</p>
                  </div>

                  <div className={styles.priceBox}>
                    <p className={styles.price}>{plan.price}</p>
                    <p className={styles.allowance}>{plan.allowance}</p>
                    <p className={styles.cadence}>{plan.cadence}</p>
                  </div>
                </div>

                <ul className={styles.features}>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={15} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.billingNote && <p className={styles.billingNote}>{plan.billingNote}</p>}
              </article>
            );
          })}

          <section id="storage-ownership" className={styles.included} aria-labelledby="storage-ownership-title">
            <h2 id="storage-ownership-title">Your files. Your devices. No cloud storage fees.</h2>
            <p className={styles.includedCopy}>Your files stay on your devices. You pay NeuVault for AI processing, not cloud storage. Choose where to save encrypted backups and keep your Recovery Key.</p>
            <div className={styles.ownershipGrid}>
              <article><ShieldCheck size={20} aria-hidden="true" /><h3>No NeuVault Cloud Storage Fees</h3><p>Pay for AI processing, not cloud storage of your files.</p></article>
              <article><HardDrive size={20} aria-hidden="true" /><h3>Your Files Stay on Your Devices</h3><p>Keep files and notes locally. Choose when and how to transfer them.</p></article>
              <article><KeyRound size={20} aria-hidden="true" /><h3>Backups and Recovery Under Your Control</h3><p>Save encrypted backups where you choose. Keep your Recovery Key secure.</p></article>
            </div>
            <p className={styles.usageNote}>Third-party storage fees may apply. AI processes relevant content online; account, Planner and reminder data may sync.</p>
          </section>

          <section id="credit-usage" className={styles.included} aria-labelledby="credit-usage-title">
            <h2 id="credit-usage-title">What can my credits do?</h2>
            <p className={styles.includedCopy}>A few reference examples to make credits more concrete. These show individual processing steps, not a fixed total for an entire workflow.</p>
            <div className={styles.usageExamples}>
              {creditUsageExamples.map((example) => <article key={example.title} className={styles.usageExample}>
                <p className={styles.usageContext}>{example.example}</p>
                <h3>{example.title}</h3>
                <p className={styles.usageCredits}>{example.credits}</p>
                <p className={styles.usageDetail}>{example.detail}</p>
              </article>)}
            </div>
            <p className={styles.usageNote}>A recording can involve transcription and AI note-writing; a scanned PDF can involve text recognition and AI organization. Those steps add together. Check Credits → Usage in NeuVault for your actual charges.</p>
          </section>

          <section id="credits" className={styles.included}>
            <div className={styles.includedHead}>
              <div className={styles.includedIcon}><Coins size={19} /></div>
              <div className="flex-1">
                <h2>How credits work</h2>
                <div className={styles.includedGrid}>
                  {creditRules.map((rule) => (
                    <div key={rule} className={styles.includedItem}>
                      <Check size={15} />
                      {rule}
                    </div>
                  ))}
                </div>

                <h3 className={styles.topUpTitle}>Extra credits for paid plans</h3>
                <p className={styles.topUpPolicy}>{paidCreditPolicyLive ? "Buy extra credits when needed. No routine expiry." : "Coming soon: buy extras when needed, with no usage threshold or routine expiry."}</p>
                <div className={styles.topUps}>
                  {creditTopUps.map((pack) => (
                    <div key={pack.credits} className={styles.topUp}>
                      <p className={styles.topUpCredits}>{pack.credits}</p>
                      <p className={styles.topUpLabel}>extra credits</p>
                      <p className={styles.topUpPrice}>{pack.price}</p>
                      <p className={styles.topUpExpiry}>{paidCreditPolicyLive ? "No routine expiry" : "No expiry under the upcoming policy"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            id="included"
            className={styles.included}
          >
            <div className={styles.includedHead}>
              <div className={styles.includedIcon}><ShieldCheck size={19} /></div>
              <div className="flex-1">
                <h2>Included across plans</h2>
                <p className={styles.includedCopy}>
                  Every paid plan includes the same features. Choose your monthly
                  AI credit allowance and billing frequency; your connected
                  workspace stays the same.
                </p>

                <div className={styles.includedGrid}>
                  {includedPlanFeatures.map((feature) => (
                    <div key={feature} className={styles.includedItem}>
                      <Check size={15} />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className={styles.actions}>
                  <Link
                    href="/#download"
                    className={styles.primary}
                  >
                    Download NeuVault
                  </Link>
                  <Link
                    href="/"
                    className={styles.secondary}
                  >
                    Back to home
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section id="pricing-questions" className={styles.included} aria-labelledby="pricing-questions-title">
            <h2 id="pricing-questions-title">Pricing questions, answered.</h2>
            <div className={styles.faqs}>
              {pricingFaqs.map((faq) => <details key={faq.question} className={styles.faq}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>)}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
