import { Fragment } from "react";
import type { ReactNode, FC } from "react";
import { Radar, Store, FlaskConical, Lightbulb, Lock, Check, TrendingUp, Users, FileText, ArrowUpRight } from "lucide-react";

// Native, light product surfaces (ink-on-paper, matching the real Landscape
// Intelligence screenshot) that recreate each product's signature view with
// illustrative sample data. Used where we don't yet have a clean screenshot.

const INK = "#0f1a14";
const SUB = "#5b655f";
const LABEL = "#8a938d";
const PANEL = "#f4f7f4";
const HAIR = "rgba(15,26,20,0.08)";

function VCard({ token, children }: { token: string; children: ReactNode }) {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl bg-white"
      style={{ border: `1px solid ${HAIR}`, boxShadow: "0 1px 2px rgba(15,26,20,0.04)" }}
      aria-hidden
    >
      <div style={{ borderTop: `3px solid hsl(var(${token}))` }}>{children}</div>
    </div>
  );
}

function VHeader({ token, Icon, label, meta }: { token: string; Icon: typeof Radar; label: string; meta?: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: HAIR }}>
      <span className="flex items-center gap-2.5">
        <Icon className="h-[18px] w-[18px]" strokeWidth={2.25} style={{ color: `hsl(var(${token}))` }} />
        <span className="font-mono text-[12px] uppercase tracking-[0.14em]" style={{ color: SUB }}>{label}</span>
      </span>
      {meta}
    </div>
  );
}

const rowline = { borderTop: `1px solid ${HAIR}` };

// ── EdenRadar: Landscape Intelligence (pipeline + therapeutic-whitespace heat map)
const HEAT = [
  { bio: "Oncology", cells: [4800, 3936, 1968, 864, 2640] },
  { bio: "Immunology", cells: [3552, 4320, 1824, 384, 1056] },
  { bio: "Neuroscience", cells: [2928, 2256, 576, 1440, 0] },
  { bio: "Rare disease", cells: [1056, 864, 0, 2016, 0] },
];
const HEAT_COLS = ["Sm mol", "Biologic", "Cell", "Gene", "ADC"];
const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`);

export function RadarVignette() {
  const t = "--portal-radar";
  const pipeline = [
    { label: "Discovery", n: "9,842", pct: 31 },
    { label: "Early stage", n: "7,621", pct: 24 },
    { label: "Preclinical", n: "7,104", pct: 22 },
    { label: "Phase 1", n: "3,984", pct: 13 },
  ];
  return (
    <VCard token={t}>
      <VHeader token={t} Icon={Radar} label="Landscape Intelligence"
        meta={<span className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: LABEL }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: `hsl(var(${t}))` }} /> 34,281 indexed</span>} />
      <div className="px-6 py-4">
        <p className="mb-3 flex items-center justify-between text-[13px] font-semibold" style={{ color: INK }}>Pre-commercial pipeline <span className="font-mono text-[11px] font-normal" style={{ color: LABEL }}>all TTOs</span></p>
        <div className="space-y-2">
          {pipeline.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="w-[74px] flex-shrink-0 text-right font-mono text-[11.5px]" style={{ color: SUB }}>{s.label}</span>
              <div className="relative h-[24px] flex-1 overflow-hidden rounded-md" style={{ background: PANEL }}>
                <div className="flex h-full items-center rounded-md px-2.5" style={{ width: `${Math.round((s.pct / 31) * 100)}%`, background: `hsl(var(${t}))`, minWidth: "48px" }}>
                  <span className="font-mono text-[11.5px] font-semibold text-white">{s.n}</span>
                </div>
              </div>
              <span className="w-7 flex-shrink-0 text-right font-mono text-[11.5px]" style={{ color: LABEL }}>{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-4" style={rowline}>
        <p className="mb-2.5 flex items-center justify-between text-[13px] font-semibold" style={{ color: INK }}>Therapeutic whitespace <span className="font-mono text-[10.5px] font-normal" style={{ color: LABEL }}>darker = more assets · gaps = opportunity</span></p>
        <div className="grid gap-1" style={{ gridTemplateColumns: "78px repeat(5, 1fr)" }}>
          <span />
          {HEAT_COLS.map((c) => <span key={c} className="text-center font-mono text-[9.5px] uppercase tracking-wide" style={{ color: LABEL }}>{c}</span>)}
          {HEAT.map((r) => (
            <Fragment key={r.bio}>
              <span className="flex items-center justify-end pr-2 font-mono text-[10.5px]" style={{ color: SUB }}>{r.bio}</span>
              {r.cells.map((v, ci) => (
                <div key={`${r.bio}-${ci}`} className="flex h-8 items-center justify-center rounded"
                  style={v > 0
                    ? { background: `hsl(var(${t}) / ${(0.14 + (v / 4800) * 0.72).toFixed(2)})` }
                    : { border: `1px dashed ${HAIR}` }}>
                  <span className="font-mono text-[10px] font-medium" style={{ color: v > 2400 ? "#fff" : SUB }}>{v > 0 ? fmt(v) : ""}</span>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5 px-6 py-3.5 text-[12px]" style={{ ...rowline, color: SUB }}>
        <TrendingUp className="h-3.5 w-3.5" style={{ color: `hsl(var(${t}))` }} /> 147 new assets matched your focus this week
      </div>
    </VCard>
  );
}

// ── EdenMarket: blind deal marketplace ────────────────────────────────────
export function MarketVignette() {
  const t = "--portal-market";
  const listings = [
    { title: "Pre-clinical oncology asset", sub: "ADC platform · solid tumor", mod: "ADC", stage: "Pre-clinical", ip: "PCT filed" },
    { title: "RNA base-editing platform", sub: "CNS indication", mod: "RNA", stage: "Discovery", ip: "Provisional" },
  ];
  return (
    <VCard token={t}>
      <VHeader token={t} Icon={Store} label="EdenMarket"
        meta={<span className="rounded-md px-2.5 py-0.5 text-[11.5px] font-semibold" style={{ color: `hsl(var(${t}))`, background: `hsl(var(${t}) / 0.12)` }}>NDA-GATED</span>} />
      <div className="space-y-3 px-6 py-4">
        {listings.map((l) => (
          <div key={l.title} className="rounded-xl p-4" style={{ background: PANEL, border: `1px solid ${HAIR}` }}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[15px] font-semibold" style={{ color: INK }}>{l.title}</p>
                <p className="text-[12px]" style={{ color: LABEL }}>{l.sub}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 flex-shrink-0" style={{ color: LABEL }} />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {[["Modality", l.mod], ["Stage", l.stage], ["IP", l.ip]].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-white px-3 py-2" style={{ border: `1px solid ${HAIR}` }}>
                  <p className="font-mono text-[9.5px] uppercase tracking-wide" style={{ color: LABEL }}>{k}</p>
                  <p className="mt-0.5 text-[13px] font-medium" style={{ color: INK }}>{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[12px]" style={{ color: SUB }}>
              <Lock className="h-3.5 w-3.5" style={{ color: `hsl(var(${t}))` }} /> Seller identity revealed after NDA
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-6 py-3.5 font-mono text-[11px]" style={{ ...rowline, color: LABEL }}>
        <span>Blind by default</span><span>Success-fee aligned</span>
      </div>
    </VCard>
  );
}

// ── EdenLab: research project canvas ──────────────────────────────────────
export function LabVignette() {
  const t = "--portal-lab";
  const sections = [
    { label: "Hypothesis", done: true }, { label: "Literature", done: true },
    { label: "Evidence", done: true }, { label: "Methods", done: true },
    { label: "IP position", done: false }, { label: "Grants", done: false },
  ];
  return (
    <VCard token={t}>
      <VHeader token={t} Icon={FlaskConical} label="Project canvas"
        meta={<span className="font-mono text-[11px]" style={{ color: LABEL }}>4 / 11 sections</span>} />
      <div className="px-6 py-4">
        <p className="text-[16px] font-semibold" style={{ color: INK }}>Tumor-targeting ADC linker</p>
        <p className="text-[12px]" style={{ color: LABEL }}>Translational research workspace</p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {sections.map((s) => (
            <div key={s.label} className="flex items-center gap-2.5 rounded-lg px-3.5 py-2.5" style={{ background: PANEL, border: `1px solid ${HAIR}` }}>
              <span className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full"
                style={s.done ? { background: `hsl(var(${t}))` } : { border: `1.5px solid ${LABEL}` }}>
                {s.done && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
              </span>
              <span className="text-[13px]" style={{ color: s.done ? INK : LABEL }}>{s.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-lg px-4 py-3" style={{ background: `hsl(var(${t}) / 0.08)`, border: `1px solid hsl(var(${t}) / 0.2)` }}>
          <FileText className="h-4 w-4 flex-shrink-0" style={{ color: `hsl(var(${t}))` }} />
          <span className="text-[12.5px]" style={{ color: SUB }}>40+ sources synthesized · citations tracked</span>
        </div>
      </div>
      <div className="flex items-center gap-2 px-6 py-3.5 text-[12px]" style={{ ...rowline, color: SUB }}>
        <Users className="h-3.5 w-3.5" style={{ color: `hsl(var(${t}))` }} /> Published · surfaced to 12 BD teams searching your area
      </div>
    </VCard>
  );
}

// ── EdenDiscovery: credibility score + community feed ─────────────────────
export function DiscoveryVignette() {
  const t = "--portal-discovery";
  const dims = [
    { label: "Novelty", value: 92 },
    { label: "Feasibility", value: 78 },
    { label: "Evidence", value: 84 },
  ];
  const feed = [
    { name: "Microbiome-derived vaccine adjuvant", score: 81 },
    { name: "Photoswitchable enzyme therapeutic", score: 74 },
  ];
  return (
    <VCard token={t}>
      <VHeader token={t} Icon={Lightbulb} label="EDEN Credibility Score"
        meta={<span className="rounded-full px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wide" style={{ color: LABEL, border: `1px solid ${HAIR}` }}>Illustrative</span>} />
      <div className="px-6 py-4">
        <div className="flex items-end gap-2.5">
          <span className="text-[58px] font-bold leading-none" style={{ color: `hsl(var(${t}))` }}>87</span>
          <span className="mb-2 text-lg" style={{ color: LABEL }}>/ 100</span>
        </div>
        <p className="mt-1.5 text-[14px] font-semibold" style={{ color: INK }}>Bispecific tumor-homing peptide</p>
        <div className="mt-4 space-y-3.5">
          {dims.map((d) => (
            <div key={d.label}>
              <div className="mb-1.5 flex items-center justify-between text-[13px]">
                <span className="font-medium" style={{ color: SUB }}>{d.label}</span>
                <span className="tabular-nums" style={{ color: LABEL }}>{d.value}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full" style={{ background: PANEL }}>
                <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: `hsl(var(${t}))` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-4" style={rowline}>
        <p className="mb-3 text-[11.5px] font-semibold uppercase tracking-wide" style={{ color: LABEL }}>Community feed</p>
        <div className="space-y-2.5">
          {feed.map((c) => (
            <div key={c.name} className="flex items-center justify-between gap-3">
              <span className="truncate text-[13px]" style={{ color: SUB }}>{c.name}</span>
              <span className="flex-shrink-0 font-mono text-[13px] font-semibold" style={{ color: `hsl(var(${t}))` }}>{c.score}</span>
            </div>
          ))}
        </div>
      </div>
    </VCard>
  );
}

export const VIGNETTES: Record<string, FC> = {
  EdenRadar: RadarVignette,
  EdenMarket: MarketVignette,
  EdenLab: LabVignette,
  EdenDiscovery: DiscoveryVignette,
};
