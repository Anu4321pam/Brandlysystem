import { useEffect, useState } from "react";
import { listConsultations, listLeads } from "@/lib/api";
import { Loader2, RefreshCw, MessageCircle, Mail, Phone } from "lucide-react";

const ACCESS_KEY = "brandly2026";
const WHATSAPP_NUMBER = "919229723612";

function Tag({ children }) {
  return (
    <span className="inline-block rounded-full bg-white/[0.06] border border-white/10 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-white/60 font-mono">
      {children}
    </span>
  );
}

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function waHref({ name, phone, email, business_name, service, message }) {
  const svc = business_name || service || "";
  const msg =
    `Hi ${name || "there"},\n\nRegarding your enquiry with Brandly Systems:\n` +
    (svc ? `• Service: ${svc}\n` : "") +
    (email ? `• Email: ${email}\n` : "") +
    (message ? `\nYour message: ${message}\n` : "");
  return `https://wa.me/${(phone || "").replace(/[^0-9]/g, "") || WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function Admin() {
  const [authed, setAuthed] = useState(
    typeof window !== "undefined" &&
      localStorage.getItem("bs_admin_ok") === ACCESS_KEY
  );
  const [pass, setPass] = useState("");

  const [loading, setLoading] = useState(true);
  const [consults, setConsults] = useState([]);
  const [leads, setLeads] = useState([]);
  const [tab, setTab] = useState("consultations");
  const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const [c, l] = await Promise.all([listConsultations(), listLeads()]);
      setConsults(c || []);
      setLeads(l || []);
    } catch (e) {
      setErr(e?.response?.data?.detail || e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) load();
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pass === ACCESS_KEY) {
              localStorage.setItem("bs_admin_ok", ACCESS_KEY);
              setAuthed(true);
            } else {
              setErr("Wrong access key");
            }
          }}
          className="surface w-full max-w-sm p-8 space-y-4"
          data-testid="admin-login-form"
        >
          <div className="font-display text-3xl">Admin</div>
          <p className="text-white/50 text-sm">Enter your access key to view submissions.</p>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Access key"
            data-testid="admin-access-input"
            className="w-full h-12 rounded-md bg-white/[0.03] border border-white/10 text-white px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
          />
          {err && <div className="text-red-400 text-xs">{err}</div>}
          <button
            type="submit"
            data-testid="admin-login-btn"
            className="pill-light w-full h-12"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  const rows = tab === "consultations" ? consults : leads;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6 md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-white/40 font-mono mb-2">
              Brandly Systems
            </div>
            <div className="font-display text-4xl">Admin Dashboard</div>
            <p className="text-white/50 mt-1 text-sm">
              All contact-form submissions are stored here. Click a row to reply on WhatsApp.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={load}
              data-testid="admin-refresh-btn"
              className="pill-light h-10 px-4 inline-flex items-center gap-2 text-sm"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("bs_admin_ok");
                setAuthed(false);
              }}
              className="h-10 px-4 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          {[
            { id: "consultations", label: `Contact Form (${consults.length})` },
            { id: "leads", label: `Audit Leads (${leads.length})` },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              data-testid={`admin-tab-${t.id}`}
              className={`h-10 px-5 rounded-full text-sm border transition-all ${
                tab === t.id
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white/70 border-white/15 hover:border-white/30"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="surface overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-white/50">
              <Loader2 className="animate-spin mr-2" size={18} /> Loading…
            </div>
          ) : err ? (
            <div className="p-8 text-red-400 text-sm">{err}</div>
          ) : rows.length === 0 ? (
            <div className="p-12 text-center text-white/50">
              No submissions yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="admin-table">
                <thead className="text-[11px] uppercase tracking-widest text-white/40 font-mono">
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4">When</th>
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Contact</th>
                    <th className="text-left py-3 px-4">
                      {tab === "consultations" ? "Service" : "Business"}
                    </th>
                    <th className="text-left py-3 px-4">Message / Kind</th>
                    <th className="text-right py-3 px-4">Reply</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-white/5 hover:bg-white/[0.02]"
                    >
                      <td className="py-3 px-4 text-white/60 text-xs whitespace-nowrap">
                        {fmtDate(r.created_at)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{r.name}</div>
                      </td>
                      <td className="py-3 px-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-white/70">
                          <Phone size={12} /> {r.phone}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-white/50">
                          <Mail size={12} /> {r.email}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Tag>{r.business_name || r.kind || "—"}</Tag>
                      </td>
                      <td className="py-3 px-4 text-white/60 max-w-[320px]">
                        <div className="line-clamp-2">
                          {r.message || r.source || "—"}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href={waHref(r)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#25D366] text-white text-xs font-medium hover:opacity-90"
                          data-testid={`wa-reply-${r.id}`}
                        >
                          <MessageCircle size={13} /> WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-white/30 text-xs mt-6">
          Data is stored securely in MongoDB. This page is only visible to whoever has the access key.
        </p>
      </div>
    </div>
  );
}
