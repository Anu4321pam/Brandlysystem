import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";

const metrics = [
  {
    label: "Conversion rate",
    before: "1.2%",
    after: "4.5%",
    delta: "+275%",
  },
  {
    label: "Qualified leads / month",
    before: "14",
    after: "91",
    delta: "+550%",
  },
  {
    label: "Cost per lead",
    before: "₹1,240",
    after: "₹318",
    delta: "-74%",
  },
  {
    label: "Google Maps ranking",
    before: "#12",
    after: "#2",
    delta: "Top 3-pack",
  },
];

export default function CaseStudy() {
  return (
    <section
      id="case-study"
      data-testid="case-study-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.25em] text-violet-300 font-mono">
              Results
            </span>
            <h2 className="mt-3 font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter">
              Before <span className="text-white/30">vs</span>{" "}
              <span className="gradient-text">after.</span>
            </h2>
            <p className="mt-5 text-white/55 text-lg leading-relaxed">
              A 4-location dental group in Mumbai. 90 days after switching to
              Brandly's growth system.
            </p>
            <div className="mt-8 glass-strong rounded-2xl p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-400/10 border border-emerald-400/30 flex items-center justify-center">
                <TrendingUp size={16} className="text-emerald-300" />
              </div>
              <div>
                <div className="text-sm text-white/50">Net new revenue</div>
                <div className="font-display font-bold text-xl">
                  +₹47L in 90 days
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                data-testid={`metric-${i}`}
                className="rounded-2xl p-6 bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all"
              >
                <div className="text-xs uppercase tracking-widest text-white/40 font-mono">
                  {m.label}
                </div>
                <div className="mt-5 flex items-end gap-3">
                  <div className="text-white/35 line-through font-display font-bold text-xl">
                    {m.before}
                  </div>
                  <ArrowRight size={14} className="text-white/30 mb-2" />
                  <div className="font-display font-black text-3xl gradient-text">
                    {m.after}
                  </div>
                </div>
                <div className="mt-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                  {m.delta}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
