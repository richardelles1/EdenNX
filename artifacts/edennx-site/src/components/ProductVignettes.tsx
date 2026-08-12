import type { ReactNode, FC } from "react";
import { Radar, Store, FlaskConical, Lightbulb, Lock, Check, TrendingUp } from "lucide-react";

// Native, dark-themed product surfaces (not screenshots) so each one lives inside
// the product's accent ground instead of reading as a pasted white cutout. Each
// is illustrative sample data, sized to anchor a home hero section.

function VCard({ token, children }: { token: string; children: ReactNode }) {
  return (
    <div
      className="w-full max-w-[470px] overflow-hidden rounded-2xl border"
      style={{
        borderColor: `hsl(var(${token}) / 0.42)`,
        background: "linear-gradient(180deg, rgba(23,30,27,0.94), rgba(10,15,13,0.96))",
        boxShadow: `0 36px 90px rgba(0,0,0,0.62), 0 0 0 1px hsl(var(${token}) / 0.16), inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}
      aria-hidden
    >
      {children}
    </div>
  );
}

function VHeader({ token, Icon, label, meta }: { token: string; Icon: typeof Radar; label: string; meta?: ReactNode }) {
  const accent = `hsl(var(${token}))`;
  return (
    <div className="flex items-center justify-between border-b px-5 py-3.5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <span className="flex items-center gap-2">
        <Icon className="h-4 w-4" strokeWidth={2.25} style={{ color: accent }} />
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">{label}</span>
      </span>
      {meta}
    </div>
  );
}

const PILL = "text-[11.5px] font-medium px-2 py-0.5 rounded-md";

// ── EdenRadar: scored TTO assets ──────────────────────────────────────────
export function RadarVignette() {
  const t = "--portal-radar";
  const assets = [
    { score: 92, name: "Mesothelin-directed CAR-T", area: "Oncology · pancreatic", stage: "Preclinical" },
    { score: 87, name: "Selective KRAS G12C inhibitor", area: "NSCLC", stage: "Phase 1" },
    { score: 79, name: "RNA base-editing platform", area: "CNS", stage: "Discovery" },
  ];
  return (
    <VCard token={t}>
      <VHeader token={t} Icon={Radar} label="Landscape Intelligence"
        meta={<span className="flex items-center gap-1.5 font-mono text-[10.5px] text-white/45"><span className="h-1.5 w-1.5 rounded-full" style={{ background: `hsl(var(${t}))` }} /> 34,281 indexed</span>} />
      <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        {assets.map((a, i) => (
          <div key={a.name} className="flex items-center gap-4 px-5 py-3.5" style={i > 0 ? { borderTop: "1px solid rgba(255,255,255,0.06)" } : undefined}>
            <div className="flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center rounded-lg" style={{ background: `hsl(var(${t}) / 0.14)` }}>
              <span className="font-mono text-[18px] font-bold leading-none" style={{ color: `hsl(var(${t}))` }}>{a.score}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-white/90">{a.name}</p>
              <p className="text-[12px] text-white/45">{a.area}</p>
            </div>
            <span className={PILL} style={{ color: `hsl(var(${t}))`, background: `hsl(var(${t}) / 0.14)` }}>{a.stage}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 px-5 py-3 text-[11.5px] text-white/45" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <TrendingUp className="h-3.5 w-3.5" style={{ color: `hsl(var(${t}))` }} /> 147 rising this week
      </div>
    </VCard>
  );
}

// ── EdenMarket: NDA-gated listing ─────────────────────────────────────────
export function MarketVignette() {
  const t = "--portal-market";
  return (
    <VCard token={t}>
      <VHeader token={t} Icon={Store} label="EdenMarket"
        meta={<span className={PILL} style={{ color: `hsl(var(${t}))`, background: `hsl(var(${t}) / 0.16)` }}>NDA-GATED</span>} />
      <div className="px-5 py-4">
        <p className="text-[15px] font-semibold text-white/90">Pre-clinical oncology asset</p>
        <p className="text-[12.5px] text-white/45">Solid-tumor indication · IND-enabling studies underway</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[["Modality", "ADC"], ["Stage", "Pre-clinical"], ["IP", "PCT filed"]].map(([k, v]) => (
            <div key={k} className="rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.04)" }}>
              <p className="font-mono text-[9.5px] uppercase tracking-wide text-white/40">{k}</p>
              <p className="mt-0.5 text-[13px] font-medium text-white/85">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2.5 rounded-lg px-3.5 py-2.5" style={{ background: `hsl(var(${t}) / 0.1)`, border: `1px solid hsl(var(${t}) / 0.24)` }}>
          <Lock className="h-4 w-4 flex-shrink-0" style={{ color: `hsl(var(${t}))` }} />
          <span className="text-[12.5px] text-white/70">Seller identity revealed after NDA</span>
        </div>
      </div>
    </VCard>
  );
}

// ── EdenLab: project canvas ───────────────────────────────────────────────
export function LabVignette() {
  const t = "--portal-lab";
  const sections = [
    { label: "Hypothesis", done: true },
    { label: "Literature", done: true },
    { label: "Evidence", done: true },
    { label: "IP position", done: false },
    { label: "Grants", done: false },
    { label: "Partners", done: false },
  ];
  return (
    <VCard token={t}>
      <VHeader token={t} Icon={FlaskConical} label="Project canvas"
        meta={<span className="font-mono text-[10.5px] text-white/45">3 / 11 sections</span>} />
      <div className="px-5 py-4">
        <p className="text-[15px] font-semibold text-white/90">Tumor-targeting ADC linker</p>
        <p className="text-[12.5px] text-white/45">Translational research workspace</p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {sections.map((s) => (
            <div key={s.label} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                style={s.done ? { background: `hsl(var(${t}))` } : { border: "1.5px solid rgba(255,255,255,0.25)" }}>
                {s.done && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
              </span>
              <span className={`text-[12.5px] ${s.done ? "text-white/85" : "text-white/45"}`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </VCard>
  );
}

// ── EdenDiscovery: EDEN Credibility Score ─────────────────────────────────
export function DiscoveryVignette() {
  const t = "--portal-discovery";
  const dims = [
    { label: "Novelty", value: 92 },
    { label: "Feasibility", value: 78 },
    { label: "Evidence", value: 84 },
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
        <p className="mt-1 text-[13px] font-semibold text-white/85">Sample concept submission</p>
        <p className="text-[11.5px] text-white/45">Every concept is auto-scored on submission</p>
        <div className="mt-4 space-y-3.5">
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
    </VCard>
  );
}

export const VIGNETTES: Record<string, FC> = {
  EdenRadar: RadarVignette,
  EdenMarket: MarketVignette,
  EdenLab: LabVignette,
  EdenDiscovery: DiscoveryVignette,
};
