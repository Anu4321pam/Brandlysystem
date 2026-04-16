import { motion } from "framer-motion";
import { PhoneCall, Hammer, Activity, ArrowRight } from "lucide-react";

const steps = [
  {
    n: "01",
    Icon: PhoneCall,
    title: "Book a Call",
    desc: "We start with a short call to learn about your business, your goals, and what a stronger online presence should do for you.",
  },
  {
    n: "02",
    Icon: Hammer,
    title: "We Build Your System",
    desc: "Our team builds a conversion-focused website, launches your ads, and wires up the AI automation — tailored to your brand and market.",
  },
  {
    n: "03",
    Icon: Activity,
    title: "Ongoing Management",
    desc: "We manage and update everything as your business grows — keeping your site, ads, and profiles optimized as search and AI continue to evolve.",
  },
];

export default function HowItWorks({ onBookConsult }) {
  return (
    <section
      id="how-it-works"
      data-testid="how-it-works-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-violet-300 font-mono">
              How it works
            </span>
            <h2 className="mt-3 font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter">
              Three steps. <span className="text-white/40">No fluff.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-white/55">
            From first call to fully managed growth system — here's exactly how
            we work with you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl p-7 bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all group"
              data-testid={`step-${s.n}`}
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 border border-violet-400/20 flex items-center justify-center">
                  <s.Icon size={20} className="text-violet-300" />
                </div>
                <span className="font-display font-black text-5xl text-white/[0.06] group-hover:text-white/10 transition-colors">
                  {s.n}
                </span>
              </div>
              <div className="mt-8 font-display font-bold text-xl">
                {s.title}
              </div>
              <p className="mt-2 text-white/55 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {onBookConsult && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={onBookConsult}
              data-testid="how-book-call-btn"
              className="group inline-flex items-center gap-2 rounded-full h-12 px-6 bg-white text-black font-semibold hover:bg-white/90 transition-all"
            >
              Book a call
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
