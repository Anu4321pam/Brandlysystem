import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createConsultation } from "@/lib/api";

export default function ConsultationModal({ open, onOpenChange }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business_name: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const required = ["name", "email", "phone"];
    if (required.some((k) => !form[k].trim())) {
      toast.error("Please fill in name, email, and phone");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Enter a valid email");
      return;
    }
    setSubmitting(true);
    try {
      await createConsultation(form);
      setDone(true);
      toast.success("We'll reach out within 24 hours.");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not submit");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm({ name: "", email: "", phone: "", business_name: "", message: "" });
    setDone(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setTimeout(reset, 300);
      }}
    >
      <DialogContent
        data-testid="consult-modal"
        className="bg-[#0a0a0a] border border-white/[0.08] text-[#f4ebe0] max-w-md p-0 overflow-hidden"
      >
        <div className="relative p-6 pb-4">
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-violet-600/15 via-transparent to-fuchsia-600/10 pointer-events-none"
          />
          <DialogHeader className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#141211] border border-[#282522] px-3 py-1 w-fit mb-3">
              <Sparkles size={12} className="text-[#c8ac82]" />
              <span className="text-[10px] uppercase tracking-widest text-[#a39b92] font-mono">
                Free · 20 minutes
              </span>
            </div>
            <DialogTitle className="font-display font-bold text-2xl text-[#f4ebe0]">
              {done ? "We're on it." : "Book free consultation"}
            </DialogTitle>
            <DialogDescription className="text-[#a39b92]">
              {done
                ? "Your request is in. We'll reach out within 24 hours with a calendar link."
                : "Tell us about your business. We'll walk through your audit live and ship a 90-day growth plan."}
            </DialogDescription>
          </DialogHeader>
        </div>

        {!done && (
          <form
            onSubmit={submit}
            className="px-6 pb-6 space-y-3"
            data-testid="consult-form"
          >
            <Input
              data-testid="consult-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="h-11 bg-[#141211] border-[#282522] text-[#f4ebe0] placeholder:text-[#a39b92]/60"
            />
            <Input
              data-testid="consult-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Work email"
              className="h-11 bg-[#141211] border-[#282522] text-[#f4ebe0] placeholder:text-[#a39b92]/60"
            />
            <Input
              data-testid="consult-phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone / WhatsApp"
              className="h-11 bg-[#141211] border-[#282522] text-[#f4ebe0] placeholder:text-[#a39b92]/60"
            />
            <Input
              data-testid="consult-business"
              value={form.business_name}
              onChange={(e) =>
                setForm({ ...form, business_name: e.target.value })
              }
              placeholder="Business name (optional)"
              className="h-11 bg-[#141211] border-[#282522] text-[#f4ebe0] placeholder:text-[#a39b92]/60"
            />
            <Textarea
              data-testid="consult-message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="What are you trying to grow? (optional)"
              rows={3}
              className="bg-[#141211] border-[#282522] text-[#f4ebe0] placeholder:text-[#a39b92]/60 resize-none"
            />
            <Button
              type="submit"
              disabled={submitting}
              data-testid="consult-submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-[#c8ac82] to-[#d7c19d] hover:from-[#c8ac82] hover:to-[#d7c19d] font-semibold shadow-[0_8px_30px_rgba(139,92,246,0.3)]"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Sending...
                </>
              ) : (
                <>Request consultation</>
              )}
            </Button>
          </form>
        )}

        {done && (
          <div className="px-6 pb-6">
            <Button
              onClick={() => onOpenChange(false)}
              data-testid="consult-done-close"
              className="w-full h-11 rounded-xl bg-white text-black hover:bg-white/90 font-semibold"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
