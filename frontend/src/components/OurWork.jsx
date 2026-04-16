import Marquee from "react-fast-marquee";

const projects = [
  {
    name: "Bella Aesthetics",
    tag: "Beauty & Aesthetics",
    img: "https://customer-assets.emergentagent.com/job_audit-brandly/artifacts/8zhddok3_portfolio-bellaaesthetics-Ft92kAUD.png",
  },
  {
    name: "MuscleRise",
    tag: "Fitness · Supplements",
    img: "https://customer-assets.emergentagent.com/job_audit-brandly/artifacts/mjod8n10_portfolio-musclerise-x723DPNM.png",
  },
  {
    name: "Delivra",
    tag: "Freight & Logistics",
    img: "https://customer-assets.emergentagent.com/job_audit-brandly/artifacts/kvd0b4j6_portfolio-freight-DzHDFTMz.png",
  },
  {
    name: "Protecor",
    tag: "Cybersecurity",
    img: "https://customer-assets.emergentagent.com/job_audit-brandly/artifacts/cw483s6c_portfolio-security1-S3qGcw4a.png",
  },
  {
    name: "Sunergy",
    tag: "Renewable Energy",
    img: "https://customer-assets.emergentagent.com/job_audit-brandly/artifacts/cj2gr0up_portfolio-energy-DX6Dz4ZQ.png",
  },
  {
    name: "Academix",
    tag: "University · Education",
    img: "https://customer-assets.emergentagent.com/job_great-diffie-4/artifacts/banbbjdl_portfolio-university-CN7OsCkM.png",
  },
  {
    name: "iDemy",
    tag: "Online Learning",
    img: "https://customer-assets.emergentagent.com/job_great-diffie-4/artifacts/brwhrnwn_portfolio-education-nWJHKcVT.png",
  },
  {
    name: "FoodNook",
    tag: "Restaurant · Food",
    img: "https://customer-assets.emergentagent.com/job_great-diffie-4/artifacts/dbe5cxr3_portfolio-food-BpNmTFCB.png",
  },
  {
    name: "Realest",
    tag: "Real Estate",
    img: "https://customer-assets.emergentagent.com/job_great-diffie-4/artifacts/injjc6ms_portfolio-realestate-yKv3XsLI.png",
  },
  {
    name: "Dentreat",
    tag: "Dental · Healthcare",
    img: "https://customer-assets.emergentagent.com/job_great-diffie-4/artifacts/8wjam3g3_portfolio-dental-Da_jvaPB.png",
  },
];

const Card = ({ p }) => (
  <div
    data-testid={`work-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
    className="group relative mx-4 w-[360px] h-[400px] bg-[#141211] border border-[#282522] overflow-hidden flex-shrink-0 shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:border-[#c8ac82] transition-all duration-500"
  >
    <img
      src={p.img}
      alt={`${p.name} — ${p.tag}`}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover grayscale-hover group-hover:scale-[1.04]"
    />
    <div
      aria-hidden
      className="absolute inset-0 bg-gradient-to-t from-[#0a0909] via-[#0a0909]/40 to-transparent"
    />
    <div className="relative z-10 h-full flex flex-col justify-end p-6">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[#c8ac82] font-mono mb-2">
        {p.tag}
      </div>
      <div className="font-display text-3xl text-[#f4ebe0] tracking-tight leading-none">
        {p.name}
      </div>
    </div>
  </div>
);

export default function OurWork() {
  return (
    <section
      id="work"
      data-testid="our-work-section"
      className="relative py-24 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-16 text-center">
        <div className="text-[10px] uppercase tracking-[0.35em] text-[#c8ac82] font-mono mb-5">
          — Selected Work
        </div>
        <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-[-0.025em] text-[#f4ebe0] leading-none">
          Our <span className="font-display-italic">Work</span>
        </h2>
        <p className="mt-6 text-[#a39b92] max-w-xl mx-auto font-body leading-relaxed">
          A few recent builds across beauty, fitness, logistics, cybersecurity,
          renewable energy, education, food, real estate, and healthcare.
        </p>
      </div>

      <div className="marquee-mask space-y-6">
        <Marquee speed={36} gradient={false} pauseOnHover>
          {[...projects.slice(0, 5), ...projects.slice(0, 5)].map((p, i) => (
            <Card key={`row1-${p.name}-${i}`} p={p} />
          ))}
        </Marquee>
        <Marquee speed={32} gradient={false} pauseOnHover direction="right">
          {[...projects.slice(5), ...projects.slice(5)].map((p, i) => (
            <Card key={`row2-${p.name}-${i}`} p={p} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
