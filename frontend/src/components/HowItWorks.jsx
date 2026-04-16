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
      className="relative py-28 md:py-36"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#c8ac82] font-mono">
              — How It Works
            </span>
            <h2 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl tracking-[-0.025em] text-[#f4ebe0] leading-[0.95]">
              Three steps.{" "}
              <span className="font-display-italic text-[#a39b92]">
                No fluff.
              </span>
            </h2>
          </div>
          <p className="md:max-w-sm text-[#a39b92] font-body leading-relaxed">
            From first call to fully managed growth system — here's exactly how
            we work with you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border-t border-[#282522]">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`relative p-10 md:p-12 border-b border-[#282522] ${
                i < steps.length - 1 ? "md:border-r" : ""
              } group hover:bg-[#141211] transition-colors duration-500`}
              data-testid={`step-${s.n}`}
            >
              <div className="stroke-num text-[10rem] absolute -top-4 right-6 opacity-60 group-hover:opacity-100 transition-opacity">
                {s.n}
              </div>
              <div className="relative">
                <div className="h-12 w-12 border border-[#282522] group-hover:border-[#c8ac82] transition-colors flex items-center justify-center text-[#c8ac82]">
                  <s.Icon size={18} strokeWidth={1.5} />
                </div>
                <div className="mt-10 font-display text-3xl text-[#f4ebe0] tracking-tight leading-tight">
                  {s.title}
                </div>
                <p className="mt-4 text-[#a39b92] leading-relaxed font-body max-w-sm">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {onBookConsult && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={onBookConsult}
              data-testid="how-book-call-btn"
              className="group pill-light inline-flex items-center gap-2 h-12 px-8 text-[12px] font-mono tracking-[0.14em] uppercase"
            >
              Book a call
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
