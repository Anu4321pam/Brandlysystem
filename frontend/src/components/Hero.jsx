import { motion } from "framer-motion";

export default function Hero({ onScrollToContact, onScrollToAudit }) {
  return (
    <section
      data-testid="hero-section"
      className="relative pt-36 pb-28 md:pt-44 md:pb-40 overflow-hidden text-center noise"
    >
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 hero-backdrop pointer-events-none" />
      <div aria-hidden className="absolute inset-0 rain-lines pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-10"
          data-testid="hero-eyebrow"
        >
          <span className="chip-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0055fe] animate-pulse" />
            100+ Happy Clients
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          data-testid="hero-headline"
          className="font-display text-5xl sm:text-6xl lg:text-[5.5rem] leading-[1.02] tracking-[-0.035em] text-white mx-auto max-w-4xl font-bold"
        >
          Websites Built to Bring You{" "}
          <span className="font-display-italic champagne-text">
            More Customers
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-base md:text-lg text-[#999] max-w-xl mx-auto leading-relaxed font-body"
          data-testid="hero-subheadline"
        >
          We build fast, conversion-focused websites, run your ads, and automate
          your follow-ups — designed to grow your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={onScrollToContact}
            data-testid="hero-contact-btn"
            className="pill-light h-13 px-8 py-3.5 text-[15px]"
          >
            Contact Us
          </button>
          <button
            onClick={() => onScrollToAudit("website")}
            data-testid="hero-audit-btn"
            className="pill-outline h-13 px-8 py-3.5 text-[15px]"
          >
            Get Free Audit
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-20 flex items-center justify-center gap-4"
        >
          <div className="h-px w-12 bg-[#0055fe]/30" />
          <span className="text-[11px] uppercase tracking-[0.28em] text-white/50 font-mono">
            See How We Can Help You
          </span>
          <div className="h-px w-12 bg-[#0055fe]/30" />
        </motion.div>
      </div>
    </section>
  );
}
