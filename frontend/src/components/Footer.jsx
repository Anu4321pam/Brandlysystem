export default function Footer({ onScrollToContact }) {
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-[#1f1f1f] bg-[#000000] pt-20 pb-12"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-5">
            <div className="font-display text-[#ffffff] text-lg tracking-[0.22em] uppercase mb-4">
              Brandly <span className="font-display-italic normal-case tracking-normal">Systems</span>
            </div>
            <p className="text-sm text-[#999999] max-w-sm font-body leading-relaxed">
              Fast, conversion-focused websites, ads, and AI automation for
              local businesses.
            </p>
          </div>

          <div className="md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#0055fe] font-mono mb-5">
              — Navigate
            </div>
            <nav className="flex flex-col gap-3">
              <a
                href="#"
                className="text-sm text-[#999999] hover:text-[#0055fe] transition-colors w-fit"
              >
                Home
              </a>
              <a
                href="#work"
                className="text-sm text-[#999999] hover:text-[#0055fe] transition-colors w-fit"
              >
                Work
              </a>
              <a
                href="#services"
                className="text-sm text-[#999999] hover:text-[#0055fe] transition-colors w-fit"
              >
                Services
              </a>
              <a
                href="#why-us"
                className="text-sm text-[#999999] hover:text-[#0055fe] transition-colors w-fit"
              >
                Why Us
              </a>
              <button
                onClick={onScrollToContact}
                data-testid="footer-contact-btn"
                className="text-sm text-[#999999] hover:text-[#0055fe] transition-colors w-fit text-left"
              >
                Contact Us
              </button>
            </nav>
          </div>

          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#0055fe] font-mono mb-5">
              — Get In Touch
            </div>
            <a
              href="mailto:hello@brandly.systems"
              className="block text-sm text-[#ffffff] hover:text-[#0055fe] transition-colors mb-2 font-body"
            >
              hello@brandly.systems
            </a>
            <a
              href="https://wa.me/919229723612"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-[#ffffff] hover:text-[#0055fe] transition-colors font-mono"
            >
              +91 92297 23612
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1f1f1f] flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-[#999999]/60 font-mono tracking-[0.1em]">
            © {new Date().getFullYear()} Brandly Systems. All rights reserved.
          </div>
          <div className="text-[11px] text-[#999999]/60 font-mono tracking-[0.15em] uppercase">
            Crafted with precision
          </div>
        </div>
      </div>
    </footer>
  );
}
