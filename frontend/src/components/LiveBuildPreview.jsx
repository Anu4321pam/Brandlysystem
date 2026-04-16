import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const fields = [
  { label: "Business name", value: "Fresh Lawn Pros" },
  { label: "Industry", value: "Landscaping" },
  { label: "Services", value: "Lawn care, mulching, weekly maintenance" },
  { label: "City", value: "Austin, TX" },
  { label: "Phone", value: "(512) 555-0182" },
  { label: "Email", value: "info@freshlawnpros.com" },
  { label: "Service area", value: "Austin metro, Round Rock, Cedar Park" },
  { label: "Primary goal", value: "Get more calls" },
  { label: "Style preference", value: "Modern and clean" },
  { label: "Business hours", value: "Mon–Sat 7am–6pm" },
];

export default function LiveBuildPreview({ onBookConsult }) {
  const [active, setActive] = useState(2);

  return (
    <section
      data-testid="live-build-preview-section"
      className="relative py-24 md:py-32 bg-orb-subtle"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="max-w-2xl mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-violet-300 font-mono">
            Live build preview
          </span>
          <h2 className="mt-3 font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter">
            Onboarding <span className="gradient-text">in minutes.</span>
          </h2>
          <p className="mt-5 text-white/55 text-lg">
            Tell us about your business once. We handle everything that comes
            after — copy, design, SEO, ads, automation.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative glass-strong rounded-2xl p-6 md:p-10 max-w-3xl mx-auto"
        >
          <div
            aria-hidden
            className="absolute -inset-8 bg-gradient-to-br from-violet-600/15 via-transparent to-fuchsia-500/10 blur-3xl pointer-events-none"
          />
          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-[10px] tracking-widest uppercase text-white/40 font-mono">
                brandly.onboarding
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">
              {fields.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  onMouseEnter={() => setActive(i)}
                  data-testid={`preview-field-${i}`}
                  className={`flex flex-col gap-1 pb-4 border-b border-white/[0.06] transition-colors ${
                    active === i ? "border-violet-500/40" : ""
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
                    {f.label}
                  </span>
                  <span className="text-white/90 font-medium">{f.value}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={onBookConsult}
                data-testid="preview-build-btn"
                className="group inline-flex items-center gap-2 rounded-full h-11 px-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 font-semibold shadow-[0_8px_30px_rgba(139,92,246,0.3)] text-white"
              >
                Build my system
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
