import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const others = [
  "Start designing without real strategy",
  "Projects take months to complete",
  "Focus mostly on visuals, not conversions",
  "Complicated process and slow communication",
  "Outdated tools and heavy websites",
  "Websites that look nice but don't perform",
];

const us = [
  "Clear strategy before anything is built",
  "Fast delivery — most projects launch within 7 days",
  "Websites built for conversions, not just design",
  "Simple process with clear communication",
  "Modern stack — React, Next.js, Shopify, Framer",
  "Focused on helping your business get customers",
];

export default function Comparison({ onScrollToContact }) {
  return (
    <section
      id="why-us"
      data-testid="comparison-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-white/40 font-mono mb-4">
            Comparison
          </div>
          <h2
            data-testid="comparison-heading"
            className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight"
          >
            How We Build Websites That Actually Work
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Other Agencies */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            data-testid="col-others"
            className="surface p-8 md:p-10"
          >
            <div className="text-xs uppercase tracking-[0.25em] text-white/35 font-mono mb-3">
              Them
            </div>
            <h3 className="font-display text-3xl text-white/60 mb-8">
              Other Agencies
            </h3>
            <ul className="space-y-4">
              {others.map((t, i) => (
                <li
                  key={i}
                  data-testid={`others-item-${i}`}
                  className="flex items-start gap-3 text-white/55"
                >
                  <span className="h-5 w-5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X size={12} />
                  </span>
                  <span className="leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Brandly */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            data-testid="col-us"
            className="relative overflow-hidden rounded-2xl p-8 md:p-10 bg-gradient-to-br from-indigo-500/15 via-[#0a0a0a] to-[#0a0a0a] border border-indigo-400/30"
          >
            <div
              aria-hidden
              className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"
            />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.25em] text-indigo-300 font-mono mb-3">
                Us
              </div>
              <h3 className="font-display text-3xl text-white mb-8">
                Brandly Systems
              </h3>
              <ul className="space-y-4">
                {us.map((t, i) => (
                  <li
                    key={i}
                    data-testid={`us-item-${i}`}
                    className="flex items-start gap-3 text-white/85"
                  >
                    <span className="h-5 w-5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} />
                    </span>
                    <span className="leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 flex justify-center">
          <button
            onClick={onScrollToContact}
            data-testid="comparison-contact-btn"
            className="pill-light h-12 px-7"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
