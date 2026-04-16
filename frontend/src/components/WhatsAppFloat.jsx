import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const WHATSAPP_NUMBER = "919229723612";
const DEFAULT_TEXT = "Hi Brandly Systems, I'd like to know more about your services.";

export default function WhatsAppFloat() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return null;
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_TEXT)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      data-testid="whatsapp-float-btn"
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[60] group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" aria-hidden />
      <span className="relative flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_40px_rgba(37,211,102,0.55)] ring-2 ring-white/10 transition-transform group-hover:scale-110">
        <svg
          viewBox="0 0 32 32"
          className="h-7 w-7 md:h-8 md:w-8 fill-current"
          aria-hidden
        >
          <path d="M19.11 17.53c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.61.14-.18.27-.7.89-.86 1.07-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.36-1.62-1.52-1.89-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.66.21 1.25.18 1.72.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.12-.25-.18-.52-.32zM16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.46 1.66 6.34L3 29l6.83-1.78A12.95 12.95 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.63a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.05 1.06 1.08-3.95-.25-.4A10.6 10.6 0 1 1 16 26.63z" />
        </svg>
      </span>
    </a>
  );
}
