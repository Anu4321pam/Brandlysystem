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
    { label: "Free Audit", onClick: () => onScrollToAudit("website") },
    { label: "Why Us", href: "#why-us" },
    { label: "Contact", onClick: onScrollToContact },
  ];

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-18 py-4 flex items-center justify-between">
        <a
          href="#"
          data-testid="brand-logo"
          className="flex items-center gap-3 group"
        >
          <img
            src="https://customer-assets.emergentagent.com/job_great-diffie-4/artifacts/vkrazyto_image.png"
            alt="Brandly Systems"
            className="h-10 w-10 rounded-lg object-cover"
          />
          <span className="font-display text-white text-[15px] font-bold tracking-tight group-hover:text-[#0055fe] transition-colors">
            BRANDLY SYSTEMS
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {links.slice(0, 5).map((l) =>
            l.href ? (
              <a
                key={l.label}
                href={l.href}
                data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[14px] font-medium text-white/70 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <button
                key={l.label}
                onClick={l.onClick}
                data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[14px] font-medium text-white/70 hover:text-white transition-colors"
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
            className="hidden md:inline-flex pill-light h-10 px-5 text-[13px]"
          >
            Contact Us
          </button>
          <button
            className="md:hidden text-white p-2"
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl">
          <div className="px-6 py-5 flex flex-col gap-4">
            {links.map((l) =>
              l.href ? (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-[15px] font-medium text-white/80 hover:text-white"
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
                  className="text-[15px] font-medium text-white/80 hover:text-white text-left"
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
              className="pill-light h-11 px-5 w-full text-[13px] mt-2"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
