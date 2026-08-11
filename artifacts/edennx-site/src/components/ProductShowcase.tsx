import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Bookmark, TrendingUp } from "lucide-react";
import { PORTAL_META } from "@/components/PortalBits";
import { TTO_COUNT_LABEL, ASSET_COUNT_LABEL } from "@/lib/platformStats";

// The home Product Suite as a single "spotlight" stage: one product at a time,
// its hero wordmark + one-line thesis on the left and its real product surface
// tilted on a shared perspective axis on the right. Light canvas washed with a
// faint tint of the active product's own color.

type Visual = "radar" | "discovery" | { img: string; alt: string };
type Slide = {
  name: string;
  token: string;
  goldToken?: string;
  status: string;
  tagline: string;
  thesis: string;
  meta: string;
  cta: { label: string; href: string; external: boolean };
  visual: Visual;
};

const SLIDES: Slide[] = [
  {
    name: "EdenRadar", token: "--portal-radar", status: "Flagship",
    tagline: "Industry intelligence platform",
    thesis: "See the full field before your first move: a continuously enriched window into 400+ tech transfer offices.",
    meta: `${TTO_COUNT_LABEL} institutions · ${ASSET_COUNT_LABEL} assets · scored daily`,
    cta: { label: "Explore EdenRadar", href: "https://edenradar.com", external: true },
    visual: "radar",
  },
  {
    name: "EdenCompliance", token: "--portal-compliance", goldToken: "--portal-compliance-gold", status: "New",
    tagline: "Vendor quality & audit management",
    thesis: "Qualify vendors, run the audit program, and keep every change on a signed, unalterable record.",
    meta: "Append-only record · e-signatures · From $299/mo",
    cta: { label: "Explore EdenCompliance", href: "https://edencompliance.com", external: true },
    visual: { img: "/images/portal-edencompliance.png", alt: "EdenCompliance dashboard: vendor status, findings, and program health" },
  },
  {
    name: "EdenMarket", token: "--portal-market", status: "Success-fee",
    tagline: "Deal marketplace",
    thesis: "From an indexed asset to the first conversation, on your terms.",
    meta: "NDA-gated deal rooms · identity on your terms",
    cta: { label: "Explore EdenMarket", href: "/products#edenmarket", external: false },
    visual: { img: "/images/portal-edenmarket.png", alt: "EdenMarket: blind, NDA-gated listings for licensable biotech assets" },
  },
  {
    name: "EdenLab", token: "--portal-lab", status: "Free",
    tagline: "Research workspace",
    thesis: "From hypothesis to publication without losing the thread.",
    meta: "11-section project canvas · 40+ data sources",
    cta: { label: "Explore EdenLab", href: "/products#edenlab", external: false },
    visual: { img: "/images/portal-edenlab.png", alt: "EdenLab research workspace: concept-to-project tools for scientists" },
  },
  {
    name: "EdenDiscovery", token: "--portal-discovery", status: "Free",
    tagline: "Concept registry",
    thesis: "Plant an idea, date-stamp it, and let the world know it exists.",
    meta: "EDEN Credibility Score · public community feed",
    cta: { label: "Explore EdenDiscovery", href: "/products#edendiscovery", external: false },
    visual: "discovery",
  },
];

const ROTATE_MS = 6500;

// ── EdenRadar hero surface: scored asset card, ported from the EdenRadar landing
// deck (illustrative sample data, matching the real card language). ──
function RadarCards() {
  return (
    <div className="relative w-full max-w-[430px] mx-auto" aria-hidden>
      <div
        className="absolute left-6 -top-4 right-0 h-full rounded-2xl bg-foreground/[0.04] border border-border"
        style={{ transform: "translateY(14px) scale(0.96)" }}
      />
      <div className="relative rounded-2xl overflow-hidden bg-white border border-border shadow-[0_28px_64px_hsl(var(--portal-radar)/0.22),0_6px_16px_rgba(0,0,0,0.10)]">
        <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: "hsl(var(--portal-radar))" }} />
        <div className="h-[74px] border-b" style={{ background: "hsl(var(--portal-radar) / 0.06)", borderColor: "hsl(var(--portal-radar) / 0.15)" }}>
          <div className="flex items-stretch h-full">
            <div className="flex flex-col items-center justify-center px-4 border-r" style={{ borderColor: "hsl(var(--portal-radar) / 0.15)" }}>
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-400 leading-none">Score</span>
              <span className="font-mono text-[34px] font-bold leading-none mt-0.5 tabular-nums" style={{ color: "hsl(var(--portal-radar))" }}>92</span>
            </div>
            <div className="flex items-center px-4">
              <span className="text-[18px] font-bold uppercase tracking-[0.05em]" style={{ color: "hsl(var(--portal-radar))" }}>TTO Asset</span>
            </div>
            <div className="ml-auto flex items-center pr-3">
              <Bookmark className="h-5 w-5 text-zinc-300" />
            </div>
          </div>
        </div>
        <div className="px-5 pt-4 pb-5">
          <h3 className="text-[17px] font-semibold text-zinc-900 leading-snug">
            Mesothelin-directed CAR-T with reduced off-target activity
          </h3>
          <p className="text-[13px] text-zinc-500 mt-2">Oncology · Pancreatic, ovarian</p>
          <p className="text-[13px] text-zinc-600 leading-relaxed mt-3">
            Novel binder with a clean preclinical package and a defensible IP position; low expression in healthy tissue.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-[12px] font-medium px-2.5 py-1 rounded border-l-2 border-amber-400 bg-amber-50 text-amber-700">Preclinical</span>
            <span className="text-[12px] font-medium px-2.5 py-1 rounded border text-emerald-700 bg-emerald-50 border-emerald-200/70">Cell therapy</span>
            <span className="text-[12px] font-medium px-2.5 py-1 rounded inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200/70">
              <TrendingUp className="h-3 w-3" /> Rising
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── EdenDiscovery: illustrative EDEN Credibility Score panel. ──
function DiscoveryCard() {
  const dims = [
    { label: "Novelty", value: 92 },
    { label: "Feasibility", value: 78 },
    { label: "Evidence", value: 84 },
  ];
  return (
    <div
      className="w-full max-w-[400px] mx-auto rounded-2xl border bg-card p-7"
      style={{ borderColor: "hsl(var(--portal-discovery) / 0.4)", boxShadow: "0 28px 64px hsl(var(--portal-discovery) / 0.2)" }}
      aria-hidden
    >
      <div className="flex items-center justify-between mb-5">
        <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "hsl(var(--portal-discovery))" }}>
          EDEN Credibility Score
        </span>
        <span className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground border border-border rounded-full px-2 py-0.5">Illustrative</span>
      </div>
      <div className="flex items-end gap-2 mb-1">
        <span className="text-[56px] font-bold leading-none" style={{ color: "hsl(var(--portal-discovery))" }}>87</span>
        <span className="text-lg text-muted-foreground mb-1.5">/ 100</span>
      </div>
      <p className="text-sm font-semibold text-foreground">Sample concept submission</p>
      <p className="text-xs text-muted-foreground mb-5">Every concept is auto-scored on submission</p>
      <div className="space-y-4">
        {dims.map((d) => (
          <div key={d.label}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-foreground/80 font-medium">{d.label}</span>
              <span className="text-muted-foreground tabular-nums">{d.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: "hsl(var(--portal-discovery))" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideVisual({ visual, token }: { visual: Visual; token: string }) {
  if (visual === "radar") return <RadarCards />;
  if (visual === "discovery") return <DiscoveryCard />;
  return (
    <div
      className="rounded-2xl overflow-hidden border border-border bg-card"
      style={{ boxShadow: `0 30px 70px hsl(var(${token}) / 0.2), 0 6px 16px rgba(0,0,0,0.10)` }}
    >
      <img src={visual.img} alt={visual.alt} className="w-full block" decoding="async" />
    </div>
  );
}

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Preload every image surface up front so switching a slide never flashes an
  // undecoded frame.
  useEffect(() => {
    SLIDES.forEach((slide) => {
      if (typeof slide.visual === "object") {
        const img = new Image();
        img.src = slide.visual.img;
      }
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % SLIDES.length), ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [active, paused]);

  const s = SLIDES[active];
  const accent = `hsl(var(${s.token}))`;
  const Icon = (PORTAL_META[s.name] ?? PORTAL_META.EdenRadar).Icon;
  const suffix = s.name.slice(4);

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-border transition-[background] duration-700"
      style={{
        background:
          `radial-gradient(85% 85% at 82% 12%, hsl(var(${s.token}) / 0.08), transparent 62%),` +
          `linear-gradient(180deg, hsl(var(${s.token}) / 0.04), hsl(var(--card)) 45%)`,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="grid gap-10 px-7 py-12 sm:px-10 lg:grid-cols-[0.94fr_1.06fr] lg:gap-14 lg:px-14 lg:py-16 items-center">
        {/* Left: the product's hero line */}
        <div>
          <div key={`t-${active}`} className="showcase-in">
            <div className="flex items-center gap-2.5 mb-4">
              <Icon className="h-6 w-6 flex-shrink-0" strokeWidth={2.25} style={{ color: accent }} />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
                style={{ background: `hsl(var(${s.token}) / 0.12)`, color: s.goldToken ? `hsl(var(${s.goldToken}))` : accent }}
              >
                {s.status}
              </span>
            </div>
            <h3 className="font-bold tracking-tight leading-[1.02] text-[2.75rem] sm:text-6xl">
              <span className="text-foreground">Eden</span>
              <span style={{ color: accent }}>{suffix}</span>
            </h3>
            <p className="mt-4 text-xl md:text-2xl font-semibold text-foreground/85">{s.tagline}</p>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-foreground/60">{s.thesis}</p>
            <p className="mt-6 font-mono text-[12px] tracking-wide text-muted-foreground">{s.meta}</p>
            <div className="mt-7">
              {s.cta.external ? (
                <a
                  href={s.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 shadow-sm"
                  style={{ background: accent }}
                >
                  {s.cta.label} <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  to={s.cta.href}
                  className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 shadow-sm"
                  style={{ background: accent }}
                >
                  {s.cta.label} <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Right: the product surface, tilted on the shared axis */}
        <div className="relative flex items-center justify-center" style={{ perspective: "2000px" }}>
          <div
            key={`v-${active}`}
            className="showcase-tilt relative w-full"
            style={{ transform: "rotateY(-13deg) rotateX(4deg)", transformStyle: "preserve-3d" }}
          >
            <SlideVisual visual={s.visual} token={s.token} />
          </div>
        </div>
      </div>

      {/* Rail */}
      <div className="relative border-t border-border px-7 py-5 sm:px-10 lg:px-14">
        <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Product suite">
          {SLIDES.map((slide, i) => {
            const on = i === active;
            const a = `hsl(var(${slide.token}))`;
            const ChipIcon = (PORTAL_META[slide.name] ?? PORTAL_META.EdenRadar).Icon;
            return (
              <button
                key={slide.name}
                role="tab"
                aria-selected={on}
                type="button"
                onClick={(e) => { setActive(i); if (e.detail > 0) e.currentTarget.blur(); }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors"
                style={
                  on
                    ? { borderColor: a, background: `hsl(var(${slide.token}) / 0.1)`, color: "hsl(var(--foreground))" }
                    : { borderColor: "hsl(var(--border))", color: "hsl(var(--muted-foreground))" }
                }
              >
                <ChipIcon className="h-3.5 w-3.5" strokeWidth={2.25} style={{ color: on ? a : "hsl(var(--muted-foreground))" }} />
                <span>{slide.name.slice(4)}</span>
                {on && (
                  <span
                    aria-hidden
                    className="showcase-progress absolute inset-x-0 bottom-0 h-0.5"
                    style={{ background: a, animationDuration: `${ROTATE_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
