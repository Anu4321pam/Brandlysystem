export default function Footer({ onScrollToContact }) {
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-white/[0.06] bg-black pt-16 pb-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          <div>
            <div className="font-display text-sm tracking-[0.18em] uppercase mb-2">
              BRANDLY SYSTEMS
            </div>
            <p className="text-sm text-white/50 max-w-sm">
              Fast, conversion-focused websites, ads, and AI automation for
              local businesses.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a href="#" className="text-sm text-white/60 hover:text-white">
              Home
            </a>
            <a href="#work" className="text-sm text-white/60 hover:text-white">
              Work
            </a>
            <a href="#services" className="text-sm text-white/60 hover:text-white">
              Services
            </a>
            <a href="#why-us" className="text-sm text-white/60 hover:text-white">
              Why Us
            </a>
            <button
              onClick={onScrollToContact}
              data-testid="footer-contact-btn"
              className="text-sm text-white/60 hover:text-white"
            >
              Contact Us
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-xs text-white/40 font-mono">
            © {new Date().getFullYear()} Brandly Systems. All rights reserved.
          </div>
          <div className="text-xs text-white/40">
            hello@brandly.systems · +91 90000 00000
          </div>
        </div>
      </div>
    </footer>
  );
}
