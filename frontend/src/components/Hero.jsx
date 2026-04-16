import { motion } from "framer-motion";
import { Users } from "lucide-react";

export default function Hero({ onScrollToContact, onScrollToAudit }) {
  return (
    <section
      data-testid="hero-section"
      className="relative pt-32 pb-28 md:pt-44 md:pb-40 overflow-hidden text-center"
    >
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 accent-glow pointer-events-none" />
      <div aria-hidden className="absolute inset-0 rain-lines pointer-events-none" />
      <div aria-hidden className="floor-grid" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-black/70 border border-white/15 px-4 py-1.5 mb-8"
          data-testid="hero-eyebrow"
        >
          <Users size={13} className="text-white/80" />
          <span className="text-xs text-white/85 font-medium">
            100+ Happy Clients
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          data-testid="hero-headline"
          className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-white mx-auto max-w-3xl"
        >
          Websites Built to
          <br />
          Bring You More Customers
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed"
          data-testid="hero-subheadline"
        >
          We build fast, conversion-focused websites, run your ads, and automate
          your follow-ups — designed to grow your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-9 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={onScrollToContact}
            data-testid="hero-contact-btn"
            className="pill-light h-12 px-7"
          >
            Contact Us
          </button>
          <button
            onClick={() => onScrollToAudit("website")}
            data-testid="hero-audit-btn"
            className="pill-outline h-12 px-7 text-sm"
          >
            Get Free Audit
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-14 text-xs uppercase tracking-[0.3em] text-white/40 font-mono"
        >
          See How We Can Help You
        </motion.div>
      </div>
    </section>
  );
}
