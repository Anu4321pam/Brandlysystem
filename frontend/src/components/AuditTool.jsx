import { forwardRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Globe,
  MapPin,
  Loader2,
  Lock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { auditWebsite, auditGmb, createLead } from "@/lib/api";

const ScoreRing = ({ score }) => {
  const circ = 2 * Math.PI * 46;
  const pct = Math.max(0, Math.min(100, score));
  const offset = circ - (pct / 100) * circ;
  const color = pct >= 75 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div className="relative h-36 w-36 flex-shrink-0">
      <svg viewBox="0 0 110 110" className="h-36 w-36 -rotate-90">
        <circle
          cx="55"
          cy="55"
          r="46"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
        />
        <motion.circle
          cx="55"
          cy="55"
          r="46"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-4xl text-[#ffffff]">{pct}</div>
        <div className="text-[10px] uppercase tracking-widest text-[#999999] font-mono">
          / 100
        </div>
      </div>
    </div>
  );
};

const statusStyles = {
  good: {
    Icon: CheckCircle2,
    color: "text-[#0055fe]",
    border: "border-[#0055fe]/20",
    bg: "bg-[#0055fe]/5",
    label: "GOOD",
  },
  warning: {
    Icon: AlertTriangle,
    color: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
    label: "WARNING",
  },
  issue: {
    Icon: XCircle,
    color: "text-red-400",
    border: "border-red-500/20",
    bg: "bg-red-500/5",
    label: "ISSUE",
  },
};

const FindingRow = ({ f }) => {
  const s = statusStyles[f.status];
  return (
    <div
      data-testid={`finding-${f.id}`}
      className={`flex items-start gap-4 rounded-xl border ${s.border} ${s.bg} p-4`}
    >
      <s.Icon size={20} className={`${s.color} mt-0.5 flex-shrink-0`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] tracking-widest font-bold ${s.color} font-mono`}>
            {s.label}
          </span>
          <span className="text-[10px] tracking-widest text-[#999999]/60 font-mono">
            · {f.category}
          </span>
        </div>
        <div className="mt-1 font-semibold text-[#ffffff]">{f.title}</div>
        <div className="mt-1 text-sm text-[#999999] leading-relaxed">
          {f.description}
        </div>
      </div>
    </div>
  );
};

const AuditTool = forwardRef(function AuditTool(
  { initialTab = "website", onScrollToContact },
  ref
) {
  const [tab, setTab] = useState(initialTab);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [unlocked, setUnlocked] = useState(false);

  const [websiteUrl, setWebsiteUrl] = useState("");
  const [gmbUrl, setGmbUrl] = useState("");
  const [gmbBusiness, setGmbBusiness] = useState("");
  const [gmbRating, setGmbRating] = useState("");
  const [gmbReviews, setGmbReviews] = useState("");

  const [lead, setLead] = useState({
    name: "",
    business_name: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setTab(initialTab);
    setReport(null);
    setUnlocked(false);
  }, [initialTab]);

  const runWebsite = async (e) => {
    e?.preventDefault();
    if (!websiteUrl.trim()) {
      toast.error("Enter a website URL");
      return;
    }
    setLoading(true);
    setReport(null);
    setUnlocked(false);
    try {
      const r = await auditWebsite(websiteUrl.trim());
      setReport(r);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not run audit");
    } finally {
      setLoading(false);
    }
  };

  const runGmb = async (e) => {
    e?.preventDefault();
    if (!gmbUrl.trim()) {
      toast.error("Paste your Google Maps / GMB link");
      return;
    }
    setLoading(true);
    setReport(null);
    setUnlocked(false);
    try {
      const r = await auditGmb({
        url: gmbUrl.trim(),
        business_name: gmbBusiness.trim() || null,
        rating: gmbRating ? parseFloat(gmbRating) : null,
        reviews: gmbReviews ? parseInt(gmbReviews, 10) : null,
      });
      setReport(r);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not run audit");
    } finally {
      setLoading(false);
    }
  };

  const submitLead = async (e) => {
    e.preventDefault();
    const missing = ["name", "business_name", "email", "phone"].filter(
      (k) => !lead[k].trim()
    );
    if (missing.length) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(lead.email)) {
      toast.error("Enter a valid email");
      return;
    }
    setSubmitting(true);
    try {
      await createLead({
        ...lead,
        report_id: report?.id,
        kind: report?.kind,
        source: "audit_unlock",
      });
      toast.success("Report unlocked. Scroll to see every finding.");
      setUnlocked(true);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not submit");
    } finally {
      setSubmitting(false);
    }
  };

  const issueCount = report?.findings?.filter((f) => f.status === "issue").length || 0;
  const warnCount = report?.findings?.filter((f) => f.status === "warning").length || 0;
  const goodCount = report?.findings?.filter((f) => f.status === "good").length || 0;
  const previewFindings = report?.findings?.slice(0, 2) || [];
  const lockedFindings = report?.findings?.slice(2) || [];

  return (
    <section
      id="free-tools"
      data-testid="audit-tool-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-[0.3em] text-[#999999] font-mono mb-4">
            Free Lead Magnet Tools
          </div>
          <h2
            data-testid="audit-heading"
            className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight"
          >
            Grade Your Online Presence
          </h2>
          <p className="mt-5 text-[#999999] text-base md:text-lg max-w-xl mx-auto">
            Two free tools. Real scoring. Instant feedback. Pick one to see
            exactly where you're losing leads.
          </p>
        </div>

        {/* Two lead-magnet cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          <button
            onClick={() => {
              setTab("website");
              setReport(null);
              setUnlocked(false);
            }}
            data-testid="magnet-website-card"
            className={`text-left rounded-2xl p-7 transition-all border ${
              tab === "website"
                ? "bg-gradient-to-br from-[#0055fe]/10 via-[#0a0a0a] to-[#0a0a0a] border-[#0055fe]/50"
                : "bg-[#0d0d0d] border-[#1f1f1f] hover:border-[#2a2a2a]"
            }`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`h-11 w-11 rounded-xl flex items-center justify-center ${
                  tab === "website"
                    ? "bg-[#0055fe]/15 border border-[#0055fe]/40 text-[#0055fe]"
                    : "bg-[#0d0d0d] border border-[#1f1f1f] text-[#ffffff]"
                }`}
              >
                <Globe size={20} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-[#0055fe]">
                Free
              </span>
            </div>
            <h3 className="mt-6 font-display text-2xl tracking-tight">
              Website Audit
            </h3>
            <p className="mt-2 text-[#999999] text-sm leading-relaxed">
              24-point scan powered by Google Lighthouse. Performance, SEO, Core
              Web Vitals, accessibility, security, and crawlability.
            </p>
          </button>

          <button
            onClick={() => {
              setTab("gmb");
              setReport(null);
              setUnlocked(false);
            }}
            data-testid="magnet-gmb-card"
            className={`text-left rounded-2xl p-7 transition-all border ${
              tab === "gmb"
                ? "bg-gradient-to-br from-[#0055fe]/10 via-[#0a0a0a] to-[#0a0a0a] border-[#0055fe]/50"
                : "bg-[#0d0d0d] border-[#1f1f1f] hover:border-[#2a2a2a]"
            }`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`h-11 w-11 rounded-xl flex items-center justify-center ${
                  tab === "gmb"
                    ? "bg-[#0055fe]/15 border border-[#0055fe]/40 text-[#0055fe]"
                    : "bg-[#0d0d0d] border border-[#1f1f1f] text-[#ffffff]"
                }`}
              >
                <MapPin size={20} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-[#0055fe]">
                Free
              </span>
            </div>
            <h3 className="mt-6 font-display text-2xl tracking-tight">
              Google Business Profile Audit
            </h3>
            <p className="mt-2 text-[#999999] text-sm leading-relaxed">
              Rating, review volume, category setup, Q&A, posts frequency, and
              local-pack ranking gaps — with a prioritised fix list.
            </p>
          </button>
        </div>

        {/* Input Panel */}
        <div className="surface p-6 md:p-8">
          {tab === "website" ? (
            <form
              onSubmit={runWebsite}
              data-testid="website-audit-form"
              className="flex flex-col md:flex-row gap-3"
            >
              <div className="flex-1 relative">
                <Globe
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]"
                />
                <Input
                  data-testid="website-url-input"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://yourbusiness.com"
                  className="h-13 py-3.5 pl-10 text-base bg-[#0d0d0d] border-[#1f1f1f] text-[#ffffff] placeholder:text-[#999999]/60 focus-visible:ring-[#0055fe]/50 focus-visible:border-[#0055fe]/50"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                data-testid="website-audit-submit-btn"
                className="pill-light h-13 py-3.5 px-8 inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Scanning...
                  </>
                ) : (
                  <>
                    Run audit <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={runGmb} data-testid="gmb-audit-form" className="space-y-3">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <MapPin
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]"
                  />
                  <Input
                    data-testid="gmb-url-input"
                    value={gmbUrl}
                    onChange={(e) => setGmbUrl(e.target.value)}
                    placeholder="https://maps.google.com/?cid=..."
                    className="h-13 py-3.5 pl-10 bg-[#0d0d0d] border-[#1f1f1f] text-[#ffffff] placeholder:text-[#999999]/60 focus-visible:ring-[#0055fe]/50 focus-visible:border-[#0055fe]/50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="gmb-audit-submit-btn"
                  className="pill-light h-13 py-3.5 px-8 inline-flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Scanning...
                    </>
                  ) : (
                    <>
                      Run audit <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                <Input
                  data-testid="gmb-business-input"
                  value={gmbBusiness}
                  onChange={(e) => setGmbBusiness(e.target.value)}
                  placeholder="Business name (optional)"
                  className="h-11 bg-[#0d0d0d] border-[#1f1f1f] text-[#ffffff] placeholder:text-[#999999]/50"
                />
                <Input
                  data-testid="gmb-rating-input"
                  value={gmbRating}
                  onChange={(e) => setGmbRating(e.target.value)}
                  placeholder="Current rating (e.g. 4.3)"
                  className="h-11 bg-[#0d0d0d] border-[#1f1f1f] text-[#ffffff] placeholder:text-[#999999]/50"
                />
                <Input
                  data-testid="gmb-reviews-input"
                  value={gmbReviews}
                  onChange={(e) => setGmbReviews(e.target.value)}
                  placeholder="Review count (e.g. 47)"
                  className="h-11 bg-[#0d0d0d] border-[#1f1f1f] text-[#ffffff] placeholder:text-[#999999]/50"
                />
              </div>
              <p className="text-xs text-[#999999]">
                We enrich the audit with your rating & review count if provided.
              </p>
            </form>
          )}
        </div>

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              data-testid="audit-loading"
              className="surface mt-8 p-10 text-center"
            >
              <Loader2 className="animate-spin mx-auto text-[#0055fe]" size={28} />
              <p className="mt-4 text-[#ffffff] font-medium">
                Running deep scan on your{" "}
                {tab === "website" ? "website" : "Google Business Profile"}...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Report */}
        <AnimatePresence>
          {report && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
              data-testid="audit-report"
            >
              {/* Score header */}
              <div className="surface p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                <ScoreRing score={report.score} />
                <div className="flex-1 text-center md:text-left">
                  <div className="text-xs uppercase tracking-widest text-[#999999] font-mono">
                    {report.kind === "website" ? "Website audit" : "GMB audit"}
                  </div>
                  <div className="mt-1 font-display text-2xl tracking-tight break-all">
                    {report.target}
                  </div>
                  <p className="mt-2 text-[#999999] max-w-xl">{report.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                    <span className="inline-flex items-center gap-2 text-sm px-3 h-8 rounded-full bg-red-500/10 text-red-300 border border-red-500/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      {issueCount} issues
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm px-3 h-8 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      {warnCount} warnings
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm px-3 h-8 rounded-full bg-[#0055fe]/8 text-[#0055fe] border border-[#0055fe]/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0055fe]" />
                      {goodCount} passing
                    </span>
                  </div>
                </div>
              </div>

              {/* Findings */}
              <div className="mt-6 relative">
                <div className="space-y-3">
                  {previewFindings.map((f) => (
                    <FindingRow key={f.id} f={f} />
                  ))}
                </div>

                <div className="mt-3 relative">
                  <div
                    data-testid="locked-findings"
                    className={`space-y-3 transition-all duration-500 ${
                      unlocked ? "" : "blur-md pointer-events-none select-none"
                    }`}
                  >
                    {lockedFindings.map((f) => (
                      <FindingRow key={f.id} f={f} />
                    ))}
                  </div>

                  {!unlocked && lockedFindings.length > 0 && (
                    <div
                      data-testid="lead-capture-overlay"
                      className="absolute inset-0 flex items-start justify-center pt-10 md:pt-16"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="surface p-6 md:p-8 w-full max-w-lg shadow-[0_30px_80px_rgba(0,0,0,0.6)] bg-black/80"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                            <Lock size={16} className="text-black" />
                          </div>
                          <div>
                            <div className="font-display text-lg tracking-tight">
                              Unlock full report
                            </div>
                            <div className="text-xs text-[#999999]">
                              {issueCount + warnCount} more findings + fix priority
                            </div>
                          </div>
                        </div>
                        <form
                          onSubmit={submitLead}
                          className="space-y-3"
                          data-testid="lead-form"
                        >
                          <Input
                            data-testid="lead-form-name"
                            value={lead.name}
                            onChange={(e) => setLead({ ...lead, name: e.target.value })}
                            placeholder="Your name"
                            className="h-11 bg-[#0d0d0d] border-[#1f1f1f] text-[#ffffff] placeholder:text-[#999999]/60"
                          />
                          <Input
                            data-testid="lead-form-business"
                            value={lead.business_name}
                            onChange={(e) => setLead({ ...lead, business_name: e.target.value })}
                            placeholder="Business name"
                            className="h-11 bg-[#0d0d0d] border-[#1f1f1f] text-[#ffffff] placeholder:text-[#999999]/60"
                          />
                          <Input
                            data-testid="lead-form-email"
                            type="email"
                            value={lead.email}
                            onChange={(e) => setLead({ ...lead, email: e.target.value })}
                            placeholder="Work email"
                            className="h-11 bg-[#0d0d0d] border-[#1f1f1f] text-[#ffffff] placeholder:text-[#999999]/60"
                          />
                          <Input
                            data-testid="lead-form-phone"
                            value={lead.phone}
                            onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                            placeholder="Phone / WhatsApp"
                            className="h-11 bg-[#0d0d0d] border-[#1f1f1f] text-[#ffffff] placeholder:text-[#999999]/60"
                          />
                          <button
                            type="submit"
                            disabled={submitting}
                            data-testid="lead-form-submit"
                            className="pill-light w-full h-12 inline-flex items-center justify-center gap-2 disabled:opacity-60"
                          >
                            {submitting ? (
                              <>
                                <Loader2 className="animate-spin" size={16} />
                                Unlocking...
                              </>
                            ) : (
                              "Unlock full report"
                            )}
                          </button>
                          <p className="text-[11px] text-[#999999] text-center">
                            We only use this to send your audit PDF & follow up.
                            No spam.
                          </p>
                        </form>
                      </motion.div>
                    </div>
                  )}
                </div>

                {unlocked && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    data-testid="post-unlock-cta"
                    className="mt-8 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-[#0055fe]/10 via-[#0a0a0a] to-[#0a0a0a] border border-[#0055fe]/40"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
                      <div>
                        <div className="font-display text-xl tracking-tight">
                          Want us to fix all of this for you?
                        </div>
                        <p className="text-[#999999] mt-1 text-sm">
                          Start a project with us — we'll walk through your audit
                          live.
                        </p>
                      </div>
                      <button
                        onClick={onScrollToContact}
                        data-testid="report-contact-btn"
                        className="pill-light h-12 px-6 inline-flex items-center gap-2"
                      >
                        <Sparkles size={16} />
                        Start a project
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
});

export default AuditTool;
