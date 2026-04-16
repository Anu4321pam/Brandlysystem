import { ArrowRight, Shield, Flame } from "lucide-react";

export default function CtaSection({ onBookConsult }) {
  return (
    <section
      data-testid="cta-section"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-fuchsia-500/5 to-blue-600/15 pointer-events-none"
      />
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6 md:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/30 px-3 py-1.5 mb-6">
          <Flame size={12} className="text-red-400" />
          <span className="text-[10px] uppercase tracking-widest text-red-300 font-mono font-semibold">
            3 spots left · Founding price ends Feb 28
          </span>
        </div>
        <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl tracking-tighter">
          Worst case you get
          <br />
          <span className="gradient-text">20 booked jobs.</span>
        </h2>
        <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
          Best case you get a fully managed growth system for $0 today. Either
          way — you can't lose. That's the whole point of the 20-Jobs Guarantee.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onBookConsult}
            data-testid="cta-start-build-btn"
            className="group inline-flex items-center justify-center gap-2 rounded-full h-14 px-8 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white font-semibold shadow-[0_12px_40px_rgba(139,92,246,0.35)] transition-all text-base"
          >
            Claim my spot
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>
        <div className="mt-6 inline-flex items-center gap-2 text-sm text-white/50">
          <Shield size={14} className="text-emerald-400" />
          20-Jobs Guarantee · No contracts · Cancel anytime
        </div>
      </div>
    </section>
  );
}
