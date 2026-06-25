import Link from "next/link";
import { Check, CreditCard, ShieldCheck, Sparkles } from "lucide-react";
import { includedPlanFeatures, pricingPlans } from "@/lib/pricing";

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
                Start with 500 credits for 14 days, then choose a monthly
                capacity when NeuVault becomes part of your document routine.
                Subscriptions are started and managed from the mobile app.
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
                  href="/#site-footer"
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
    <section
      id="subscription-plans"
      className="px-6 pb-24"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm lg:sticky lg:top-24">
            <p className="mb-3 text-sm font-semibold text-white">
              Plan summary
            </p>

            <nav className="space-y-2 text-sm">
              {pricingPlans.map((plan) => (
                <a
                  key={plan.id}
                  href={`#${plan.id}`}
                  className="block text-gray-300 transition hover:text-white"
                >
                  {plan.name}
                </a>
              ))}
              <a
                href="#included"
                className="block text-gray-300 transition hover:text-white"
              >
                Included across plans
              </a>
            </nav>

            <div className="mt-5 border-t border-white/10 pt-5 text-xs leading-relaxed text-gray-500">
              Prices are shown in USD. Final app-store pricing may vary by
              region.
            </div>
          </div>
        </aside>

        <div className="space-y-5 lg:col-span-8">
          {pricingPlans.map((plan) => {
            const featured = plan.id === "pro";
            return (
              <article
                id={plan.id}
                key={plan.id}
                className={`scroll-mt-28 rounded-2xl border p-5 backdrop-blur-sm md:p-6 ${
                  featured
                    ? "border-[#6DD1FF]/30 bg-[#3F8CFF]/10 shadow-[0_24px_70px_rgba(63,140,255,0.14)]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-semibold text-white">
                        {plan.name}
                      </h2>
                      {plan.highlight ? (
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6DD1FF]">
                          {plan.highlight}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-[#6DD1FF]">
                      {plan.audience}
                    </p>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-300">
                      {plan.summary}
                    </p>
                  </div>

                  <div className="min-w-[180px] rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-2xl font-bold text-white">{plan.price}</p>
                    <p className="mt-3 text-4xl font-black text-white">
                      {plan.allowance}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-400">
                      {plan.cadence}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-sm leading-6 text-gray-300"
                    >
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[#6DD1FF]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}

          <section
            id="included"
            className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:p-6"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 text-[#6DD1FF]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h2 className="mb-3 text-xl font-semibold text-white md:text-2xl">
                  Included across plans
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-gray-300">
                  The plan mainly changes your available AI credit capacity. The
                  vault experience stays centered on private document memory,
                  retrieval, reminders, and recovery.
                </p>

                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {includedPlanFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm font-medium text-gray-200"
                    >
                      <Check className="h-4 w-4 text-[#6DD1FF]" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/#site-footer"
                    className="inline-flex items-center justify-center rounded-full bg-[#3F8CFF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    Download NeuVault
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Back to home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
