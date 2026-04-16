import { motion } from "framer-motion";
import { Check, Shield, Sparkles, Clock, ArrowRight, Flame } from "lucide-react";

const coreStack = [
  {
    title: "Done-for-you conversion website",
    desc: "Custom-built, mobile-first, SEO-ready. Tested copy, trust signals, booking flow.",
    value: 4997,
  },
  {
    title: "Google Business Profile optimization",
    desc: "Full rebuild — categories, photos, posts, Q&A, NAP sync, review strategy.",
    value: 1497,
  },
  {
    title: "Meta & Google Ads launch",
    desc: "Creatives, audiences, funnels, pixel setup, first 90 days of campaigns managed.",
    value: 2997,
  },
  {
    title: "AI WhatsApp + Instagram auto-reply bot",
    desc: "Every inbound lead answered in under 60 seconds, 24/7. Books, qualifies, hands off.",
    value: 1997,
  },
  {
    title: "90-day review generation engine",
    desc: "Automated SMS + email review-ask flow that compounds your Google rating.",
    value: 997,
  },
  {
    title: "Full hosting, security & management",
    desc: "Uptime, backups, weekly updates, Core Web Vitals tuning. We own it all.",
    value: 1497,
  },
];

const bonuses = [
  {
    title: "Bonus #1: Competitor Intelligence Dashboard",
    why: "So you know exactly who's beating you — and why.",
    desc: "Monthly report on the top 3 competitors in your city: keywords, ads, reviews, pricing.",
    value: 997,
  },
  {
    title: "Bonus #2: 24/7 Priority Fix Hotline",
    why: "So a broken link on a Sunday doesn't cost you Monday's jobs.",
    desc: "WhatsApp direct line to our ops team. Most fixes live within 2 hours.",
    value: 497,
  },
  {
    title: "Bonus #3: Weekly Growth Reports",
    why: "So you always know what you paid for and what it returned.",
    desc: "Clean one-pager every Monday — calls booked, ad spend, ROAS, ranking changes.",
    value: 597,
  },
];

export default function Offer({ onBookConsult }) {
  const coreValue = coreStack.reduce((s, x) => s + x.value, 0);
  const bonusValue = bonuses.reduce((s, x) => s + x.value, 0);
  const total = coreValue + bonusValue;
  const format = (n) => `$${n.toLocaleString()}`;

  return (
    <section
      id="offer"
      data-testid="offer-section"
      className="relative py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-orb-subtle pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        {/* Heading */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/30 px-3 py-1.5 mb-5">
            <Flame size={12} className="text-red-400" />
            <span className="text-[10px] uppercase tracking-widest text-red-300 font-mono font-semibold">
              Only 3 onboarding spots left · February
            </span>
          </div>
          <h2
            data-testid="offer-heading"
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter"
          >
            The <span className="gradient-text">Local-Lead Engine.</span>
          </h2>
          <p className="mt-5 text-white/60 text-lg leading-relaxed">
            A complete done-for-you growth system built, launched, and managed
            for your business in 14 days. Everything below is included — no add-ons,
            no upsells, no surprise invoices.
          </p>
        </div>

        {/* Value Stack Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative glass-strong rounded-2xl overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute -inset-8 bg-gradient-to-br from-violet-600/15 via-transparent to-fuchsia-500/10 blur-3xl pointer-events-none"
          />

          <div className="relative grid lg:grid-cols-12">
            {/* LEFT — What's included */}
            <div className="lg:col-span-7 p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
              <div className="text-xs uppercase tracking-widest text-violet-300 font-mono mb-4">
                What's inside
              </div>
              <h3 className="font-display font-bold text-2xl mb-6">
                Core system
              </h3>
              <ul className="space-y-4">
                {coreStack.map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    data-testid={`offer-core-${i}`}
                    className="flex items-start gap-4 pb-4 border-b border-white/[0.05] last:border-b-0"
                  >
                    <span className="h-6 w-6 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={13} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-4 flex-wrap">
                        <div className="font-semibold text-white">{item.title}</div>
                        <div className="text-sm text-white/40 font-mono whitespace-nowrap">
                          {format(item.value)} value
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-white/55 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <h3 className="font-display font-bold text-2xl mt-10 mb-6">
                Plus 3 bonuses
              </h3>
              <ul className="space-y-4">
                {bonuses.map((b, i) => (
                  <motion.li
                    key={b.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    data-testid={`offer-bonus-${i}`}
                    className="rounded-xl p-4 bg-violet-500/[0.06] border border-violet-400/20"
                  >
                    <div className="flex items-baseline justify-between gap-4 flex-wrap">
                      <div className="font-semibold text-violet-200">{b.title}</div>
                      <div className="text-sm text-violet-200/60 font-mono whitespace-nowrap">
                        {format(b.value)} value
                      </div>
                    </div>
                    <div className="mt-1 text-xs italic text-violet-300/70">
                      {b.why}
                    </div>
                    <p className="mt-2 text-sm text-white/55 leading-relaxed">
                      {b.desc}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* RIGHT — Price + Guarantee */}
            <div className="lg:col-span-5 p-8 md:p-10 bg-gradient-to-br from-violet-600/10 via-transparent to-transparent">
              <div className="text-xs uppercase tracking-widest text-white/40 font-mono">
                Total value
              </div>
              <div
                className="mt-2 font-display font-bold text-4xl text-white/30 line-through decoration-red-500/60 decoration-2"
                data-testid="offer-total-value"
              >
                {format(total)}
              </div>

              <div className="mt-8 text-xs uppercase tracking-widest text-emerald-300 font-mono">
                Your price today
              </div>
              <div className="mt-2 flex items-baseline gap-3 flex-wrap">
                <div className="font-display font-black text-6xl gradient-text">
                  $0
                </div>
                <div className="text-white/60">for 14 days</div>
              </div>
              <p className="mt-3 text-sm text-white/55 leading-relaxed">
                After your trial:{" "}
                <span className="text-white font-semibold">$497/mo</span> — locked
                in as a founding rate.{" "}
                <span className="text-white/40 line-through">$697/mo</span>{" "}
                starting March 1. Cancel anytime. No contracts. No setup fees.
              </p>

              {/* Guarantee */}
              <div
                data-testid="offer-guarantee"
                className="mt-8 rounded-xl p-5 bg-emerald-500/[0.06] border border-emerald-400/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Shield size={18} className="text-emerald-300" />
                  <div className="font-display font-bold text-lg text-emerald-100">
                    Our 20-Jobs Guarantee
                  </div>
                </div>
                <p className="text-sm text-white/65 leading-relaxed">
                  Live in 14 days — or your first month is free. Don't see{" "}
                  <span className="text-white font-semibold">
                    20 qualified booked jobs in your first 90 days
                  </span>
                  ? We keep working at no charge until you do. Zero risk to you.
                </p>
              </div>

              {/* Urgency bar */}
              <div
                data-testid="offer-urgency"
                className="mt-6 rounded-xl p-4 bg-red-500/[0.08] border border-red-500/25 flex items-start gap-3"
              >
                <Clock size={16} className="text-red-300 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="text-red-200 font-semibold">
                    3 of 8 February spots remain
                  </div>
                  <div className="text-white/55 mt-0.5">
                    We cap onboarding at 8 businesses/month to keep quality
                    tight. Founding pricing ends Feb 28.
                  </div>
                </div>
              </div>

              <button
                onClick={onBookConsult}
                data-testid="offer-claim-btn"
                className="mt-8 w-full group inline-flex items-center justify-center gap-2 rounded-full h-14 px-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 font-semibold text-white shadow-[0_12px_40px_rgba(139,92,246,0.35)] text-base"
              >
                <Sparkles size={18} />
                Claim my spot
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
              <p className="mt-3 text-center text-[11px] text-white/40">
                Takes 20 minutes · No commitment · Book live plan review
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
