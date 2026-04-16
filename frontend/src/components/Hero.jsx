import { motion } from "framer-motion";

export default function Hero({ onScrollToContact, onScrollToAudit }) {
  return (
    <section
      data-testid="hero-section"
      className="relative pt-36 pb-32 md:pt-48 md:pb-44 overflow-hidden text-center noise"
    >
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 hero-backdrop pointer-events-none" />
      <div aria-hidden className="absolute inset-0 rain-lines pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-12"
          data-testid="hero-eyebrow"
        >
          <div className="flex -space-x-2">
            {[
              "bg-[#c8ac82]",
              "bg-[#a39b92]",
              "bg-[#e8d2a8]",
            ].map((c, i) => (
              <div
                key={i}
                className={`h-6 w-6 rounded-full ${c} border border-[#0a0909]`}
              />
            ))}
          </div>
          <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#c8ac82]">
            100+ Happy Clients
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          data-testid="hero-headline"
          className="font-display text-[3.25rem] sm:text-7xl lg:text-[6rem] leading-[0.95] tracking-[-0.03em] text-[#f4ebe0] mx-auto max-w-4xl"
        >
          Websites Built to Bring You More{" "}
          <span className="font-display-italic champagne-text">
            Customers
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 text-base md:text-lg text-[#a39b92] max-w-xl mx-auto leading-relaxed font-body"
          data-testid="hero-subheadline"
        >
          We build fast, conversion-focused websites, run your ads, and automate
          your follow-ups — designed to grow your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-11 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={onScrollToContact}
            data-testid="hero-contact-btn"
            className="pill-light h-13 px-8 py-3.5"
          >
            Contact Us
          </button>
          <button
            onClick={() => onScrollToAudit("website")}
            data-testid="hero-audit-btn"
            className="pill-outline h-13 px-8 py-3.5 text-sm"
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
          <div className="h-px w-12 bg-[#c8ac82]/30" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#a39b92] font-mono">
            See How We Can Help You
          </span>
          <div className="h-px w-12 bg-[#c8ac82]/30" />
        </motion.div>
      </div>
    </section>
  );
}
