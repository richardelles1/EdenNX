import type { ReactNode, FC } from "react";
import { Radar, Store, FlaskConical, Lightbulb, Lock, Check, TrendingUp, Users, FileText, ArrowUpRight } from "lucide-react";

// Native, dark-themed product surfaces (not screenshots) so each one lives inside
// the product's ground instead of reading as a pasted white cutout. Each recreates
// the real product's most compelling view, with illustrative sample data.

function VCard({ token, children }: { token: string; children: ReactNode }) {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl"
      style={{
        background: "linear-gradient(180deg, #171f1b, #0b100e)",
        border: `1px solid hsl(var(${token}) / 0.16)`,
      }}
      aria-hidden
    >
      {children}
    </div>
  );
}

function VHeader({ token, Icon, label, meta }: { token: string; Icon: typeof Radar; label: string; meta?: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b px-5 py-3.5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <span className="flex items-center gap-2">
        <Icon className="h-4 w-4" strokeWidth={2.25} style={{ color: `hsl(var(${token}))` }} />
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/65">{label}</span>
      </span>
      {meta}
    </div>
  );
}

const PILL = "text-[11px] font-semibold px-2 py-0.5 rounded-md";
const STAT = "rounded-lg px-3 py-2";
const rowline = { borderTop: "1px solid rgba(255,255,255,0.06)" };

// ── EdenRadar: Landscape Intelligence ─────────────────────────────────────
export function RadarVignette() {
  const t = "--portal-radar";
  const pipeline = [
    { label: "Discovery", n: "9,842", pct: 31 },
    { label: "Early stage", n: "7,621", pct: 24 },
    { label: "Preclinical", n: "7,104", pct: 22 },
    { label: "Phase 1", n: "3,984", pct: 13 },
    { label: "Phase 2", n: "2,107", pct: 7 },
  ];
  const whitespace = [
    { area: "Rare disease", signal: "High opp", assets: "203" },
    { area: "Gene therapy", signal: "Growing", assets: "512" },
  ];
  return (
    <VCard token={t}>
      <VHeader token={t} Icon={Radar} label="Landscape Intelligence"
        meta={<span className="flex items-center gap-1.5 font-mono text-[10.5px] text-white/45"><span className="h-1.5 w-1.5 rounded-full" style={{ background: `hsl(var(${t}))` }} /> 34,281 indexed</span>} />
      <div className="px-5 py-4">
        <p className="mb-3 flex items-center justify-between text-[12px] font-semibold text-white/85">Pre-commercial pipeline <span className="font-mono text-[10.5px] font-normal text-white/40">all TTOs</span></p>
        <div className="space-y-2">
          {pipeline.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="w-[68px] flex-shrink-0 text-right font-mono text-[11px] text-white/50">{s.label}</span>
              <div className="relative h-[22px] flex-1 overflow-hidden rounded-md" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div className="flex h-full items-center rounded-md px-2" style={{ width: `${Math.round((s.pct / 31) * 100)}%`, background: `hsl(var(${t}) / 0.85)`, minWidth: "44px" }}>
                  <span className="font-mono text-[11px] font-semibold text-[#06110b]">{s.n}</span>
                </div>
              </div>
              <span className="w-7 flex-shrink-0 text-right font-mono text-[11px] text-white/40">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 py-3.5" style={rowline}>
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-white/45">White space finder</p>
        <div className="space-y-2">
          {whitespace.map((w) => (
            <div key={w.area} className="flex items-center justify-between">
              <span className="text-[13px] text-white/85">{w.area}</span>
              <span className="flex items-center gap-2.5">
                <span className="font-mono text-[11px] text-white/40">{w.assets} assets</span>
                <span className={PILL} style={{ color: `hsl(var(${t}))`, background: `hsl(var(${t}) / 0.14)` }}>{w.signal}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5 px-5 py-3 text-[11.5px] text-white/45" style={rowline}>
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
        meta={<span className={PILL} style={{ color: `hsl(var(${t}))`, background: `hsl(var(${t}) / 0.16)` }}>NDA-GATED</span>} />
      <div className="space-y-2.5 px-5 py-4">
        {listings.map((l) => (
          <div key={l.title} className="rounded-xl p-3.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[14px] font-semibold text-white/90">{l.title}</p>
                <p className="text-[11.5px] text-white/45">{l.sub}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-white/30" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[["Modality", l.mod], ["Stage", l.stage], ["IP", l.ip]].map(([k, v]) => (
                <div key={k} className={STAT} style={{ background: "rgba(255,255,255,0.035)" }}>
                  <p className="font-mono text-[9px] uppercase tracking-wide text-white/40">{k}</p>
                  <p className="mt-0.5 text-[12.5px] font-medium text-white/85">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-2.5 flex items-center gap-1.5 text-[11.5px] text-white/50">
              <Lock className="h-3 w-3" style={{ color: `hsl(var(${t}))` }} /> Seller identity revealed after NDA
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-5 py-3 font-mono text-[10.5px] text-white/40" style={rowline}>
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
        meta={<span className="font-mono text-[10.5px] text-white/45">4 / 11 sections</span>} />
      <div className="px-5 py-4">
        <p className="text-[15px] font-semibold text-white/90">Tumor-targeting ADC linker</p>
        <p className="text-[11.5px] text-white/45">Translational research workspace</p>
        <div className="mt-3.5 grid grid-cols-2 gap-2">
          {sections.map((s) => (
            <div key={s.label} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                style={s.done ? { background: `hsl(var(${t}))` } : { border: "1.5px solid rgba(255,255,255,0.22)" }}>
                {s.done && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
              </span>
              <span className={`text-[12.5px] ${s.done ? "text-white/85" : "text-white/45"}`}>{s.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-3.5 flex items-center gap-3 rounded-lg px-3.5 py-2.5" style={{ background: `hsl(var(${t}) / 0.1)`, border: `1px solid hsl(var(${t}) / 0.24)` }}>
          <FileText className="h-4 w-4 flex-shrink-0" style={{ color: `hsl(var(${t}))` }} />
          <span className="text-[12px] text-white/70">40+ sources synthesized · citations tracked</span>
        </div>
      </div>
      <div className="flex items-center gap-2 px-5 py-3 text-[11.5px] text-white/55" style={rowline}>
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
        meta={<span className="rounded-full border border-white/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-white/45">Illustrative</span>} />
      <div className="px-5 py-4">
        <div className="flex items-end gap-2">
          <span className="text-[52px] font-bold leading-none" style={{ color: `hsl(var(${t}))` }}>87</span>
          <span className="mb-1.5 text-base text-white/45">/ 100</span>
        </div>
        <p className="mt-1 text-[13px] font-semibold text-white/85">Bispecific tumor-homing peptide</p>
        <div className="mt-3.5 space-y-3">
          {dims.map((d) => (
            <div key={d.label}>
              <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                <span className="font-medium text-white/80">{d.label}</span>
                <span className="tabular-nums text-white/45">{d.value}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: `hsl(var(${t}))` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 py-3.5" style={rowline}>
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-white/45">Community feed</p>
        <div className="space-y-2">
          {feed.map((c) => (
            <div key={c.name} className="flex items-center justify-between gap-3">
              <span className="truncate text-[12.5px] text-white/80">{c.name}</span>
              <span className="flex-shrink-0 font-mono text-[12px] font-semibold" style={{ color: `hsl(var(${t}))` }}>{c.score}</span>
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
