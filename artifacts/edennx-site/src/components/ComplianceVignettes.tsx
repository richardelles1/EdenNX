import { Lock, PenLine } from "lucide-react";

// Two vignettes ported from EdenCompliance's own marketing site
// (src/components/FeatureVignettes.tsx there): the controlled record and the
// vendor register. Its site is built from designed vignettes rather than
// screenshots, so these are what it actually shows, and they render crisply at
// card size instead of scaling a capture down into mush.
//
// Type and spacing are stepped down from the originals to suit a ~470px card
// floor. Palette, status-as-data coloring, and structure are unchanged.

const CARD =
  "border border-[rgba(190,212,196,0.22)] bg-[rgba(21,44,31,0.94)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]";
const HAIR = "border-[rgba(190,212,196,0.14)]";

const T_HEAD = "text-[#f2f5ec]";
const T_BODY = "text-[#dbe2d4]";
const T_SUB = "text-[#c0cabb]";
const T_META = "text-[#9fb2a1]";

const PILL: Record<string, string> = {
  ok: "bg-[rgba(92,186,139,0.16)] text-[#8ddcb0]",
  warn: "bg-[rgba(202,168,95,0.2)] text-[#e7cd91]",
  neutral: "bg-[rgba(190,212,196,0.14)] text-[#c7d1c2]",
  crit: "bg-[rgba(211,119,106,0.2)] text-[#efab9d]",
};

function StatusPill({ tone, children }: { tone: keyof typeof PILL; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium ${PILL[tone]}`}
    >
      {children}
    </span>
  );
}

const TRAIL = [
  { field: "risk_tier", from: "low", to: "high", seal: "2cdabd8a" },
  { field: "next_audit_date", from: "2026-11-15", to: "2026-11-20", seal: "a8043787" },
];

export function RecordLedger() {
  return (
    <div className={`flex h-full w-full flex-col overflow-hidden rounded-2xl ${CARD}`}>
      <div className={`flex items-start justify-between gap-3 border-b px-5 py-3.5 ${HAIR}`}>
        <div className="min-w-0">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#e7cd91]">Controlled record</p>
          <p className={`mt-1.5 text-[15px] font-semibold leading-tight ${T_HEAD}`}>Vertex Contract Labs</p>
          <p className={`mt-0.5 truncate text-[11px] ${T_META}`}>Vendor qualification · ISO 13485</p>
        </div>
        <StatusPill tone="ok">Qualified</StatusPill>
      </div>

      <div className="flex flex-1 flex-col px-5 py-4">
        <div className="flex items-center gap-2.5 rounded-xl border border-[rgba(202,168,95,0.45)] bg-[rgba(202,168,95,0.13)] px-3 py-2.5">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[rgba(202,168,95,0.24)]">
            <PenLine className="h-3 w-3 text-[#e7cd91]" />
          </span>
          <div className="min-w-0">
            <p className={`text-[12px] font-medium ${T_HEAD}`}>Qualification approved</p>
            <p className={`truncate text-[10px] ${T_META}`}>m.reyes@acmetherapeutics.com · re-authenticated</p>
          </div>
          <span className="ml-auto shrink-0 rounded-md bg-[rgba(202,168,95,0.24)] px-1.5 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-wider text-[#ecd39a]">
            Signed
          </span>
        </div>

        <div className="mt-2.5 space-y-1.5">
          {TRAIL.map((e) => (
            <div key={e.field} className="flex items-center gap-2 rounded-lg bg-[rgba(190,212,196,0.09)] px-3 py-2">
              <span className={`font-mono text-[10.5px] ${T_BODY}`}>{e.field}</span>
              <span className={`text-[10.5px] ${T_META}`}>
                <span className="line-through decoration-[#9fb2a1]/50">{e.from}</span>
                <span className="mx-1">→</span>
                <span className={`font-medium ${T_BODY}`}>{e.to}</span>
              </span>
              <span className={`ml-auto shrink-0 font-mono text-[9px] ${T_META}`}>seal {e.seal}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`flex flex-wrap items-center gap-1.5 border-t px-5 py-3 ${HAIR}`}>
        {["Append-only", "Hash-chained", "E-signed"].map((g) => (
          <span
            key={g}
            className={`inline-flex items-center gap-1 rounded-md bg-[rgba(190,212,196,0.1)] px-2 py-1 font-mono text-[9px] uppercase tracking-wider ${T_SUB}`}
          >
            <Lock className="h-2.5 w-2.5 text-[#8ddcb0]" /> {g}
          </span>
        ))}
      </div>
    </div>
  );
}

const VENDORS: { name: string; svc: string; status: string; note?: string; tone: keyof typeof PILL }[] = [
  { name: "Nordic Biologics AS", svc: "CDMO · Drug substance", status: "Qualified", tone: "ok" },
  { name: "Atlas Cold Chain", svc: "Logistics · Cold-chain", status: "Expiring", note: "34d", tone: "warn" },
  { name: "Kestrel Biologics", svc: "CDMO · Fill/finish", status: "Under review", tone: "neutral" },
  { name: "Meridian Analytical", svc: "Contract lab", status: "Disqualified", tone: "crit" },
];

export function VendorRegister() {
  return (
    <div className={`flex h-full w-full flex-col overflow-hidden rounded-2xl ${CARD}`}>
      <div className={`flex items-center justify-between gap-3 border-b px-5 py-3.5 ${HAIR}`}>
        <p className={`font-mono text-[9px] uppercase tracking-[0.16em] ${T_META}`}>Vendor register</p>
        <p className={`truncate font-mono text-[9px] ${T_META}`}>32 vendors · 30 qualified</p>
      </div>
      <ul className={`flex flex-1 flex-col divide-y divide-[rgba(190,212,196,0.12)]`}>
        {VENDORS.map((v) => (
          <li key={v.name} className="flex flex-1 items-center gap-3 px-5">
            <div className="min-w-0 flex-1">
              <p className={`truncate text-[12.5px] font-medium ${T_HEAD}`}>{v.name}</p>
              <p className={`mt-0.5 truncate text-[10.5px] ${T_META}`}>{v.svc}</p>
            </div>
            <StatusPill tone={v.tone}>
              {v.status}
              {v.note && <span className="font-mono text-[9.5px] opacity-80">{v.note}</span>}
            </StatusPill>
          </li>
        ))}
      </ul>
    </div>
  );
}
