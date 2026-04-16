import { motion } from "framer-motion";
import {
  Globe,
  ShoppingCart,
  Target,
  Search,
  Facebook,
  Cpu,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    Icon: Globe,
    title: "Website Development",
    desc: "We don't just design pages. We build websites with the right structure, messaging, and conversion strategy to turn visitors into customers.",
    span: "md:col-span-2",
    index: "01",
  },
  {
    Icon: ShoppingCart,
    title: "Ecommerce Development",
    desc: "An online store should do more than just display products. We build ecommerce stores optimized for conversions, speed, and sales.",
    span: "md:col-span-1",
    index: "02",
  },
  {
    Icon: Target,
    title: "Landing Pages",
    desc: "Running ads but not getting results? We create landing pages built with conversion strategy so more visitors turn into leads or sales.",
    span: "md:col-span-1",
    index: "03",
  },
  {
    Icon: Search,
    title: "Google Ads",
    desc: "Capture high-intent buyers the moment they search. We plan, launch, and optimize Google Search, Shopping, and Performance Max campaigns for maximum ROAS.",
    span: "md:col-span-2",
    index: "04",
  },
  {
    Icon: Facebook,
    title: "Meta Ads",
    desc: "Turn scrolls into sales across Facebook & Instagram. We build creative, targeting, and funnels that consistently bring in leads and customers at a profitable cost.",
    span: "md:col-span-2",
    index: "05",
  },
  {
    Icon: Cpu,
    title: "AI Automation",
    desc: "We implement AI systems that handle calls, respond to inquiries, and automate repetitive tasks so your business operates faster.",
    span: "md:col-span-1",
    index: "06",
  },
];

export default function Services({ onScrollToContact }) {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative py-28 md:py-36"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-20">
          <div className="text-[10px] uppercase tracking-[0.35em] text-[#c8ac82] font-mono mb-5">
            — Our Services
          </div>
          <h2
            data-testid="services-heading"
            className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-[-0.025em] text-[#f4ebe0] leading-[0.95]"
          >
            What We Help{" "}
            <span className="font-display-italic">Businesses</span> With
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              data-testid={`service-${i}`}
              className={`surface group p-8 md:p-10 flex flex-col gap-6 min-h-[240px] relative overflow-hidden ${s.span}`}
            >
              <div className="absolute top-6 right-6 text-[11px] font-mono tracking-[0.2em] text-[#a39b92]/40 group-hover:text-[#c8ac82]/70 transition-colors">
                {s.index}
              </div>

              <div className="flex items-start justify-between">
                <div className="h-12 w-12 border border-[#282522] group-hover:border-[#c8ac82] transition-colors flex items-center justify-center text-[#c8ac82]">
                  <s.Icon size={18} strokeWidth={1.5} />
                </div>
                <ArrowUpRight
                  size={22}
                  strokeWidth={1}
                  className="text-[#a39b92]/40 group-hover:text-[#c8ac82] transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>
              <div className="mt-auto">
                <div className="font-display text-2xl md:text-3xl text-[#f4ebe0] tracking-[-0.01em] leading-tight">
                  {s.title}
                </div>
                <p className="mt-3 text-[#a39b92] leading-relaxed text-[14px] md:text-[15px] font-body max-w-xl">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button
            onClick={onScrollToContact}
            data-testid="services-contact-btn"
            className="pill-light h-12 px-8 text-[12px] font-mono tracking-[0.14em] uppercase"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
