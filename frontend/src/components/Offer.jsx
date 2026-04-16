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
      className="relative py-28 md:py-36"
    >
      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        {/* Heading */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-[#c8ac82]/40 px-4 py-1.5 mb-6">
            <Flame size={11} className="text-[#c8ac82]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c8ac82] font-mono">
              Only 3 onboarding spots left · February
            </span>
          </div>
          <h2
            data-testid="offer-heading"
            className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-[-0.025em] text-[#f4ebe0] leading-[0.95]"
          >
            The{" "}
            <span className="font-display-italic champagne-text">
              Local-Lead
            </span>{" "}
            Engine.
          </h2>
          <p className="mt-6 text-[#a39b92] text-lg leading-relaxed font-body">
            A complete done-for-you growth system built, launched, and managed
            for your business in 14 days. Everything below is included — no
            add-ons, no upsells, no surprise invoices.
          </p>
        </div>

        {/* Value Stack Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-[#141211] border border-[#282522] champagne-top-border overflow-hidden"
        >
          <div className="relative grid lg:grid-cols-12">
            {/* LEFT — What's included */}
            <div className="lg:col-span-7 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#282522]">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#c8ac82] font-mono mb-5">
                — What's inside
              </div>
              <h3 className="font-display text-3xl text-[#f4ebe0] mb-8">
                Core <span className="font-display-italic">system</span>
              </h3>
              <ul className="space-y-5">
                {coreStack.map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.6 }}
                    data-testid={`offer-core-${i}`}
                    className="flex items-start gap-4 pb-5 border-b border-[#282522] last:border-b-0 last:pb-0"
                  >
                    <span className="h-5 w-5 border border-[#c8ac82]/50 text-[#c8ac82] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={11} strokeWidth={2} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-4 flex-wrap">
                        <div className="font-medium text-[#f4ebe0] text-[15px]">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-[#a39b92] font-mono whitespace-nowrap">
                          {format(item.value)} value
                        </div>
                      </div>
                      <p className="mt-1.5 text-sm text-[#a39b92] leading-relaxed font-body">
                        {item.desc}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <h3 className="font-display text-3xl text-[#f4ebe0] mt-12 mb-8">
                Plus 3 <span className="font-display-italic">bonuses</span>
              </h3>
              <ul className="space-y-4">
                {bonuses.map((b, i) => (
                  <motion.li
                    key={b.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.6 }}
                    data-testid={`offer-bonus-${i}`}
                    className="p-5 bg-[#c8ac82]/[0.04] border border-[#c8ac82]/20"
                  >
                    <div className="flex items-baseline justify-between gap-4 flex-wrap">
                      <div className="font-medium text-[#f4ebe0]">
                        {b.title}
                      </div>
                      <div className="text-[11px] text-[#c8ac82]/70 font-mono whitespace-nowrap">
                        {format(b.value)} value
                      </div>
                    </div>
                    <div className="mt-1.5 text-xs italic text-[#c8ac82]/80 font-display-italic">
                      {b.why}
                    </div>
                    <p className="mt-2 text-sm text-[#a39b92] leading-relaxed font-body">
                      {b.desc}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* RIGHT — Price + Guarantee */}
            <div className="lg:col-span-5 p-8 md:p-12 bg-gradient-to-br from-[#c8ac82]/[0.06] via-transparent to-transparent">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#a39b92] font-mono">
                Total value
              </div>
              <div
                className="mt-3 font-display text-4xl text-[#a39b92]/50 line-through decoration-[#c8ac82]/60 decoration-[1px]"
                data-testid="offer-total-value"
              >
                {format(total)}
              </div>

              <div className="mt-10 text-[10px] uppercase tracking-[0.3em] text-[#c8ac82] font-mono">
                Your price today
              </div>
              <div className="mt-3 flex items-baseline gap-3 flex-wrap">
                <div className="font-display text-7xl champagne-text leading-none">
                  $0
                </div>
                <div className="text-[#a39b92] font-display-italic text-xl">
                  for 14 days
                </div>
              </div>
              <p className="mt-4 text-sm text-[#a39b92] leading-relaxed font-body">
                After your trial:{" "}
                <span className="text-[#f4ebe0] font-semibold">$497/mo</span>{" "}
                — locked in as a founding rate.{" "}
                <span className="text-[#a39b92]/60 line-through">$697/mo</span>{" "}
                starting March 1. Cancel anytime. No contracts. No setup fees.
              </p>

              {/* Guarantee */}
              <div
                data-testid="offer-guarantee"
                className="mt-10 p-6 bg-[#c8ac82]/[0.04] border border-[#c8ac82]/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Shield size={18} className="text-[#c8ac82]" strokeWidth={1.5} />
                  <div className="font-display text-xl text-[#f4ebe0]">
                    The 20-Jobs{" "}
                    <span className="font-display-italic">Guarantee</span>
                  </div>
                </div>
                <p className="text-sm text-[#a39b92] leading-relaxed font-body">
                  Live in 14 days — or your first month is free. Don't see{" "}
                  <span className="text-[#f4ebe0] font-semibold">
                    20 qualified booked jobs in your first 90 days
                  </span>
                  ? We keep working at no charge until you do. Zero risk to
                  you.
                </p>
              </div>

              {/* Urgency bar */}
              <div
                data-testid="offer-urgency"
                className="mt-6 p-5 border border-[#c8ac82]/30 flex items-start gap-3"
              >
                <Clock
                  size={16}
                  className="text-[#c8ac82] mt-0.5 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <div className="text-sm">
                  <div className="text-[#f4ebe0] font-medium">
                    3 of 8 February spots remain
                  </div>
                  <div className="text-[#a39b92] mt-1 font-body">
                    We cap onboarding at 8 businesses/month to keep quality
                    tight. Founding pricing ends Feb 28.
                  </div>
                </div>
              </div>

              <button
                onClick={onBookConsult}
                data-testid="offer-claim-btn"
                className="mt-8 w-full pill-light inline-flex items-center justify-center gap-2 h-14 px-6 text-[13px] font-mono tracking-[0.14em] uppercase group"
              >
                <Sparkles size={16} strokeWidth={1.5} />
                Claim my spot
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
              <p className="mt-4 text-center text-[10px] text-[#a39b92] font-mono tracking-[0.15em] uppercase">
                Takes 20 min · No commitment · Live plan review
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
