import { forwardRef, useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createConsultation } from "@/lib/api";

const services = [
  "Website Development",
  "Ecommerce Development",
  "Landing Pages",
  "Google Ads",
  "Meta Ads",
  "AI Automation",
];

const WHATSAPP_NUMBER = "919229723612";

const Contact = forwardRef(function Contact(_, ref) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: services[0],
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast.error("Please fill in name, WhatsApp, and email");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Enter a valid email");
      return;
    }
    setSubmitting(true);
    try {
      await createConsultation({
        name: form.name,
        email: form.email,
        phone: form.phone,
        business_name: form.service,
        message: form.message,
      });
      setDone(true);
      toast.success("Redirecting you to WhatsApp...");

      const waText =
        `Hi Brandly Systems, I'd like to start a project.\n\n` +
        `• Name: ${form.name}\n` +
        `• WhatsApp: ${form.phone}\n` +
        `• Email: ${form.email}\n` +
        `• Service: ${form.service}\n` +
        (form.message ? `• Requirement: ${form.message}\n` : "");
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;
      setTimeout(() => {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }, 400);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      data-testid="contact-section"
      className="relative py-28 md:py-36"
    >
      <div aria-hidden className="absolute inset-0 accent-glow opacity-60 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <div className="text-[10px] uppercase tracking-[0.35em] text-[#0055fe] font-mono mb-5">
            — Contact Us
          </div>
          <h2
            data-testid="contact-heading"
            className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-[-0.025em] text-[#ffffff] leading-[0.95]"
          >
            Start Your{" "}
            <span className="font-display-italic">Project</span>
          </h2>
          <p className="mt-6 text-[#999999] text-base md:text-lg max-w-xl mx-auto font-body leading-relaxed">
            Tell us a bit about your business and what you're looking to build.
            We'll review your request and get back to you shortly.
          </p>
        </div>

        <div className="surface p-8 md:p-12">
          {done ? (
            <div className="text-center py-12" data-testid="contact-success">
              <div className="font-display text-4xl text-[#ffffff] mb-4">
                Opening <span className="font-display-italic champagne-text">WhatsApp</span>…
              </div>
              <p className="text-[#999999] font-body">
                If it didn't open automatically, tap the button below to chat with us on WhatsApp.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi Brandly Systems, I'd like to start a project.\n\n• Name: ${form.name}\n• WhatsApp: ${form.phone}\n• Email: ${form.email}\n• Service: ${form.service}` +
                    (form.message ? `\n• Requirement: ${form.message}` : "")
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="whatsapp-fallback-link"
                className="pill-light inline-flex items-center gap-2 h-12 px-8 mt-8 text-[12px] font-mono tracking-[0.14em] uppercase"
              >
                Continue on WhatsApp
              </a>
            </div>
          ) : (
            <form
              onSubmit={submit}
              data-testid="contact-form"
              className="space-y-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-[#999999] font-mono mb-3 block">
                    First Name
                  </label>
                  <Input
                    data-testid="contact-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="input-minimal h-11"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-[#999999] font-mono mb-3 block">
                    WhatsApp Number
                  </label>
                  <Input
                    data-testid="contact-phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 90000 00000"
                    className="input-minimal h-11"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-[#999999] font-mono mb-3 block">
                  Email
                </label>
                <Input
                  data-testid="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="hello@yourcompany.com"
                  className="input-minimal h-11"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-[#999999] font-mono mb-3 block">
                  What Service Do You Need?
                </label>
                <select
                  data-testid="contact-service"
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full h-11 bg-transparent border-0 border-b border-[#1f1f1f] text-[#ffffff] px-0 focus:outline-none focus:border-[#0055fe] font-mono text-sm transition-colors"
                >
                  {services.map((s) => (
                    <option key={s} value={s} className="bg-[#0d0d0d]">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-[#999999] font-mono mb-3 block">
                  Tell Us About Your Requirement
                </label>
                <Textarea
                  data-testid="contact-message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  placeholder="What are you trying to build or grow?"
                  className="input-minimal resize-none !border-b !border-[#1f1f1f] focus:!border-[#0055fe]"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                data-testid="contact-submit"
                className="pill-light w-full h-14 py-3.5 px-6 inline-flex items-center justify-center gap-2 disabled:opacity-60 text-[13px] font-mono tracking-[0.14em] uppercase"
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Form <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
});

export default Contact;
