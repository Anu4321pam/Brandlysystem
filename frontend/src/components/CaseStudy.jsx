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
      className="relative py-28 md:py-36"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#c8ac82] font-mono">
              — Results
            </span>
            <h2 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl tracking-[-0.025em] text-[#f4ebe0] leading-[0.92]">
              Before{" "}
              <span className="font-display-italic text-[#a39b92]">vs</span>{" "}
              <br />
              after.
            </h2>
            <p className="mt-6 text-[#a39b92] text-lg leading-relaxed font-body">
              A 4-location dental group in Mumbai. 90 days after switching to
              Brandly's growth system.
            </p>
            <div className="mt-10 surface p-6 flex items-center gap-5">
              <div className="h-12 w-12 border border-[#c8ac82]/40 flex items-center justify-center text-[#c8ac82]">
                <TrendingUp size={18} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#a39b92]">
                  Net New Revenue
                </div>
                <div className="font-display text-3xl text-[#f4ebe0] mt-1">
                  +₹47L{" "}
                  <span className="font-display-italic text-[#c8ac82] text-xl">
                    in 90 days
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-0 border border-[#282522]">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                data-testid={`metric-${i}`}
                className={`p-8 hover:bg-[#141211] transition-colors duration-500 group ${
                  i % 2 === 0 ? "sm:border-r" : ""
                } ${i < 2 ? "border-b" : ""} border-[#282522]`}
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#a39b92] font-mono">
                  {m.label}
                </div>
                <div className="mt-6 flex items-end gap-3">
                  <div className="text-[#a39b92]/40 line-through font-display text-2xl">
                    {m.before}
                  </div>
                  <ArrowRight size={14} className="text-[#a39b92]/40 mb-2" />
                  <div className="font-display text-5xl text-[#f4ebe0]">
                    {m.after}
                  </div>
                </div>
                <div className="mt-5 inline-flex items-center gap-1 px-3 py-1 bg-[#c8ac82]/10 border border-[#c8ac82]/30 text-[#c8ac82] text-[10px] font-mono tracking-[0.15em] uppercase">
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
