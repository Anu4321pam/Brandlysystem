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
      className="relative py-28 md:py-36"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-20">
          <div className="text-[10px] uppercase tracking-[0.35em] text-[#c8ac82] font-mono mb-5">
            — Why Us
          </div>
          <h2
            data-testid="comparison-heading"
            className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-[-0.025em] text-[#f4ebe0] leading-[0.95]"
          >
            How We Build{" "}
            <span className="font-display-italic">Websites</span> That Actually
            Work
          </h2>
        </div>

        <div className="relative grid md:grid-cols-2 gap-0 border border-[#282522]">
          <div className="hidden md:block absolute top-8 bottom-8 left-1/2 -translate-x-1/2 v-divider" />

          {/* Other Agencies */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            data-testid="col-others"
            className="p-10 md:p-12 border-b md:border-b-0 md:border-r border-[#282522]"
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#a39b92]/60 font-mono mb-4">
              Them
            </div>
            <h3 className="font-display text-4xl text-[#a39b92] mb-10">
              Other <span className="font-display-italic">Agencies</span>
            </h3>
            <ul className="space-y-5">
              {others.map((t, i) => (
                <li
                  key={i}
                  data-testid={`others-item-${i}`}
                  className="flex items-start gap-4 text-[#a39b92]/70"
                >
                  <span className="h-5 w-5 border border-[#282522] text-[#a39b92]/50 flex items-center justify-center flex-shrink-0 mt-1">
                    <X size={11} strokeWidth={1.5} />
                  </span>
                  <span className="leading-relaxed font-body line-through decoration-[#a39b92]/20">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Brandly */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            data-testid="col-us"
            className="relative p-10 md:p-12 bg-[#141211]"
          >
            <div
              aria-hidden
              className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#c8ac82]/10 blur-3xl pointer-events-none"
            />
            <div className="relative">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#c8ac82] font-mono mb-4">
                Us
              </div>
              <h3 className="font-display text-4xl text-[#f4ebe0] mb-10">
                Brandly <span className="font-display-italic">Systems</span>
              </h3>
              <ul className="space-y-5">
                {us.map((t, i) => (
                  <li
                    key={i}
                    data-testid={`us-item-${i}`}
                    className="flex items-start gap-4 text-[#f4ebe0]"
                  >
                    <span className="h-5 w-5 bg-[#c8ac82]/10 border border-[#c8ac82]/50 text-[#c8ac82] flex items-center justify-center flex-shrink-0 mt-1">
                      <Check size={11} strokeWidth={2} />
                    </span>
                    <span className="leading-relaxed font-body">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 flex justify-center">
          <button
            onClick={onScrollToContact}
            data-testid="comparison-contact-btn"
            className="pill-light h-12 px-8 text-[12px] font-mono tracking-[0.14em] uppercase"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
