import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "What exactly is included in the $0 trial?",
    a: "Everything. Your new website, Google Business Profile optimization, Meta & Google Ads launch, AI WhatsApp/Instagram auto-reply, 90-day review engine, hosting, security, and weekly reports — all live within 14 days. No 'setup fees', no 'add-ons', no 'upsells'. If it's not in the offer list, you're not paying for it.",
  },
  {
    q: "What's the 20-Jobs Guarantee?",
    a: "If your system isn't live in 14 days, your first month is free. If you don't see 20 qualified booked jobs in the first 90 days, we keep working at no charge until you do. The only way you lose is if we don't perform — which is exactly how we've designed it.",
  },
  {
    q: "How does the process start?",
    a: "Book a short discovery call. We'll ask about your business, what's working, what isn't, and what growth would look like for you over the next 90 days. No pitch, no pressure — you walk away with a clear plan either way.",
  },
  {
    q: "What happens on the call?",
    a: "We review your current website (or lack of one), your Google Business Profile, your ad spend, and the competitors ranking above you. You leave the call knowing exactly what needs to change and what it'll cost to get there.",
  },
  {
    q: "Do you only build the site, or manage it too?",
    a: "We manage everything. Hosting, updates, security, copy tweaks, SEO, ad campaigns, and your automation flows. You focus on your business — we keep the engine running.",
  },
  {
    q: "How do you help with SEO and AI search visibility?",
    a: "We build every page to be crawled, parsed, and cited — by Google, ChatGPT, Perplexity, and Gemini. Structured data, semantic HTML, content optimized for AI answers, and ongoing Core Web Vitals improvements.",
  },
  {
    q: "How fast can a site go live?",
    a: "Most sites go live in 7–14 days from your onboarding call. Ad campaigns launch within the first week after approval.",
  },
  {
    q: "Can you improve an existing site, or do you rebuild from scratch?",
    a: "Both. If your current site has brand equity and content worth keeping, we'll optimize it. If it's dragging you down, we rebuild — often faster than it would take to fix.",
  },
  {
    q: "What kinds of businesses work with Brandly Systems?",
    a: "Local service businesses and multi-location operators — clinics, law firms, contractors, gyms, salons, restaurants, dental practices, real estate agents. Anyone who wins when the phone rings.",
  },
  {
    q: "How do you turn traffic into leads?",
    a: "Every page has a clear goal and a measurable CTA. We pair the site with Meta ads, WhatsApp automation, and review generation so leads come in from multiple channels — and actually get followed up.",
  },
  {
    q: "Why only 8 clients per month?",
    a: "Because we actually do the work. Each onboarding needs our design team, ads team, and automation team together for 2 weeks. Cap the intake — keep the quality. No exceptions, even when it costs us revenue.",
  },
  {
    q: "What happens after my trial ends?",
    a: "You keep the system for $497/mo — locked in as a founding rate. Price goes to $697/mo for new clients starting March 1. You can cancel at any time with 30 days notice. No contracts, no termination fees, and you own all your assets.",
  },
];

function Row({ item, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: i * 0.03 }}
      className="border-b border-white/[0.06]"
      data-testid={`faq-item-${i}`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        data-testid={`faq-toggle-${i}`}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className="font-display font-semibold text-lg md:text-xl text-white group-hover:text-violet-200 transition-colors">
          {item.q}
        </span>
        <span
          className={`h-8 w-8 rounded-full border border-white/15 flex items-center justify-center flex-shrink-0 transition-all ${
            open ? "bg-violet-500/20 border-violet-400/40 rotate-45" : ""
          }`}
        >
          <Plus size={14} className="text-white/70" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-12 text-white/60 leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-violet-300 font-mono">
            FAQ
          </span>
          <h2 className="mt-3 font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter">
            Frequently asked <span className="gradient-text">questions.</span>
          </h2>
        </div>

        <div className="rounded-2xl glass-strong px-6 md:px-10">
          {faqs.map((f, i) => (
            <Row key={f.q} item={f} i={i} />
          ))}
        </div>

        <p className="mt-8 text-center text-white/50 text-sm">
          Still have questions? Email us at{" "}
          <a
            href="mailto:hello@brandly.systems"
            className="text-violet-300 hover:text-violet-200 underline underline-offset-4"
          >
            hello@brandly.systems
          </a>
        </p>
      </div>
    </section>
  );
}
