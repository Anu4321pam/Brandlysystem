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
      className="relative py-20 border-y border-[#282522]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-3">
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                size={14}
                className="fill-[#c8ac82] text-[#c8ac82]"
              />
            ))}
          </div>
          <span
            data-testid="trust-rating"
            className="text-[#f4ebe0] font-display text-xl"
          >
            4.9
          </span>
          <span className="text-[#a39b92] text-[11px] font-mono tracking-[0.2em] uppercase">
            From 100+ Clients
          </span>
        </div>
      </div>

      <div className="marquee-mask">
        <Marquee speed={28} gradient={false} pauseOnHover>
          {logos.map((l) => (
            <div
              key={l}
              data-testid={`logo-${l.toLowerCase().replace(/\s+/g, "-")}`}
              className="mx-14 flex items-center gap-3 text-[#a39b92]/50 hover:text-[#c8ac82] transition-colors duration-500"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-current" />
              <span className="font-display text-xl tracking-[0.04em] whitespace-nowrap">
                {l}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
