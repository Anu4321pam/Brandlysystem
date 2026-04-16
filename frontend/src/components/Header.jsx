import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header({ onScrollToAudit, onScrollToContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "#" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Free Tools", onClick: () => onScrollToAudit("website") },
    { label: "Why Us", href: "#why-us" },
    { label: "Contact", onClick: onScrollToContact },
  ];

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0909]/80 backdrop-blur-xl border-b border-[#282522]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a
          href="#"
          data-testid="brand-logo"
          className="flex items-center gap-2 group"
        >
          <span className="font-display text-[#f4ebe0] text-[15px] uppercase tracking-[0.28em] font-medium group-hover:text-[#c8ac82] transition-colors">
            Brandly <span className="font-display-italic">Systems</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
          {links.slice(0, 5).map((l) =>
            l.href ? (
              <a
                key={l.label}
                href={l.href}
                data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[12px] font-mono tracking-[0.2em] uppercase text-[#a39b92] hover:text-[#c8ac82] transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <button
                key={l.label}
                onClick={l.onClick}
                data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[12px] font-mono tracking-[0.2em] uppercase text-[#a39b92] hover:text-[#c8ac82] transition-colors"
              >
                {l.label}
              </button>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onScrollToContact}
            data-testid="header-contact-btn"
            className="hidden md:inline-flex pill-light h-10 px-6 text-[12px] font-mono tracking-[0.14em] uppercase"
          >
            Contact Us
          </button>
          <button
            className="md:hidden text-[#f4ebe0] p-2"
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#282522] bg-[#0a0909]/95 backdrop-blur-xl">
          <div className="px-6 py-5 flex flex-col gap-4">
            {links.map((l) =>
              l.href ? (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-[13px] font-mono tracking-[0.2em] uppercase text-[#a39b92] hover:text-[#c8ac82]"
                >
                  {l.label}
                </a>
              ) : (
                <button
                  key={l.label}
                  onClick={() => {
                    l.onClick?.();
                    setOpen(false);
                  }}
                  className="text-[13px] font-mono tracking-[0.2em] uppercase text-[#a39b92] hover:text-[#c8ac82] text-left"
                >
                  {l.label}
                </button>
              )
            )}
            <button
              onClick={() => {
                onScrollToContact();
                setOpen(false);
              }}
              data-testid="mobile-contact-btn"
              className="pill-light h-11 px-5 w-full text-[12px] font-mono tracking-[0.14em] uppercase mt-3"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
