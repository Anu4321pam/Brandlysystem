import { forwardRef, useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createConsultation } from "@/lib/api";

const services = [
  "Website Development",
  "Landing Pages",
  "Ecommerce",
  "SEO Optimization",
  "Local Ranking Optimization",
  "Conversion Rate Optimization (CRO)",
  "Website Audit",
  "AI Automation",
  "MVP Development",
];

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
      toast.success("Thanks! We'll reach out within 24 hours.");
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
      className="relative py-24 md:py-32"
    >
      <div aria-hidden className="absolute inset-0 accent-glow opacity-60 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-white/40 font-mono mb-4">
            Contact Us
          </div>
          <h2
            data-testid="contact-heading"
            className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight"
          >
            Start Your Project
          </h2>
          <p className="mt-5 text-white/60 text-base md:text-lg max-w-xl mx-auto">
            Tell us a bit about your business and what you're looking to build.
            We'll review your request and get back to you shortly.
          </p>
        </div>

        <div className="surface p-6 md:p-10">
          {done ? (
            <div className="text-center py-10" data-testid="contact-success">
              <div className="font-display text-3xl mb-3">We're on it.</div>
              <p className="text-white/60">
                Your request is in. We'll reach out within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={submit}
              data-testid="contact-form"
              className="space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 font-mono mb-2 block">
                    First Name
                  </label>
                  <Input
                    data-testid="contact-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="h-12 bg-white/[0.03] border-white/10 text-white placeholder:text-white/30 focus-visible:ring-indigo-400/40 focus-visible:border-indigo-400/40"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 font-mono mb-2 block">
                    WhatsApp Number
                  </label>
                  <Input
                    data-testid="contact-phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 90000 00000"
                    className="h-12 bg-white/[0.03] border-white/10 text-white placeholder:text-white/30 focus-visible:ring-indigo-400/40 focus-visible:border-indigo-400/40"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 font-mono mb-2 block">
                  Email
                </label>
                <Input
                  data-testid="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="hello@yourcompany.com"
                  className="h-12 bg-white/[0.03] border-white/10 text-white placeholder:text-white/30 focus-visible:ring-indigo-400/40 focus-visible:border-indigo-400/40"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 font-mono mb-2 block">
                  What Service Do You Need?
                </label>
                <select
                  data-testid="contact-service"
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full h-12 rounded-md bg-white/[0.03] border border-white/10 text-white px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400/40"
                >
                  {services.map((s) => (
                    <option key={s} value={s} className="bg-black">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 font-mono mb-2 block">
                  Tell Us About Your Requirement
                </label>
                <Textarea
                  data-testid="contact-message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  placeholder="What are you trying to build or grow?"
                  className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/30 focus-visible:ring-indigo-400/40 focus-visible:border-indigo-400/40 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                data-testid="contact-submit"
                className="pill-light w-full h-13 py-3.5 px-6 inline-flex items-center justify-center gap-2 disabled:opacity-60"
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
