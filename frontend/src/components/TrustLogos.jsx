import { Star } from "lucide-react";
import Marquee from "react-fast-marquee";

const logos = [
  "Northwind Clinic",
  "Sushi & Co.",
  "Ironhouse Gym",
  "Lumen Studios",
  "Orbit Realty",
  "Verdant Salon",
  "Brewhouse 47",
  "Apex Dental",
  "Forge Motors",
  "Halo Beauty Bar",
];

export default function TrustLogos() {
  return (
    <section
      data-testid="trust-section"
      className="relative py-16 border-y border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-10 text-center">
        <div className="inline-flex items-center gap-2">
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                size={16}
                className="fill-white text-white"
              />
            ))}
          </div>
          <span
            data-testid="trust-rating"
            className="text-white/90 font-semibold"
          >
            4.9/5
          </span>
          <span className="text-white/50">from 100+ clients</span>
        </div>
      </div>

      <div className="marquee-mask">
        <Marquee speed={32} gradient={false} pauseOnHover>
          {logos.map((l) => (
            <div
              key={l}
              data-testid={`logo-${l.toLowerCase().replace(/\s+/g, "-")}`}
              className="mx-12 flex items-center gap-3 text-white/40 hover:text-white/85 transition-colors"
            >
              <div className="h-5 w-5 rounded-sm border border-white/20" />
              <span className="font-display text-lg tracking-tight whitespace-nowrap">
                {l}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
