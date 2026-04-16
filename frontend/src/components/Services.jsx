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
  },
  {
    Icon: ShoppingCart,
    title: "Ecommerce Development",
    desc: "An online store should do more than just display products. We build ecommerce stores optimized for conversions, speed, and sales.",
  },
  {
    Icon: Target,
    title: "Landing Pages",
    desc: "Running ads but not getting results? We create landing pages built with conversion strategy so more visitors turn into leads or sales.",
  },
  {
    Icon: Search,
    title: "Google Ads",
    desc: "Capture high-intent buyers the moment they search. We plan, launch, and optimize Google Search, Shopping, and Performance Max campaigns for maximum ROAS.",
  },
  {
    Icon: Facebook,
    title: "Meta Ads",
    desc: "Turn scrolls into sales across Facebook & Instagram. We build creative, targeting, and funnels that consistently bring in leads and customers at a profitable cost.",
  },
  {
    Icon: Cpu,
    title: "AI Automation",
    desc: "We implement AI systems that handle calls, respond to inquiries, and automate repetitive tasks so your business operates faster.",
  },
];

export default function Services({ onScrollToContact }) {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-white/40 font-mono mb-4">
            Our Services
          </div>
          <h2
            data-testid="services-heading"
            className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight"
          >
            What We Help Businesses With
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              data-testid={`service-${i}`}
              className="surface group p-7 flex flex-col gap-5 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="h-11 w-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/80">
                  <s.Icon size={20} />
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-white/20 group-hover:text-white/70 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
              <div>
                <div className="font-display text-xl font-bold tracking-tight">
                  {s.title}
                </div>
                <p className="mt-2 text-white/55 leading-relaxed text-sm">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <button
            onClick={onScrollToContact}
            data-testid="services-contact-btn"
            className="pill-light h-12 px-7"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
