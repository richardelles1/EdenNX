import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { TTO_COUNT_LABEL, ASSET_COUNT_LABEL } from "@/lib/platformStats";

// The home Product Suite as a single spotlight stage: one product at a time, its
// big hero wordmark + one-line thesis on the left, and its product surface large
// and bleeding into a light canvas washed with a faint tint of the product's own
// color. Surfaces float frameless with an accent glow (no small "windows").

type Visual = "discovery" | { img: string; alt: string };
type Slide = {
  name: string;
  token: string;
  goldToken?: string;
  headline: { pre: string; accent: string; post: string };
  sub: string;
  meta: string;
  price?: string;
  cta: { label: string; href: string; external: boolean };
  visual: Visual;
};

const SLIDES: Slide[] = [
  {
    name: "EdenRadar", token: "--portal-radar",
    headline: { pre: "The next biotech breakthrough is ", accent: "already published.", post: "" },
    sub: "Real-time monitoring across 400+ tech transfer offices means the right assets find you first.",
    meta: `${TTO_COUNT_LABEL} institutions · ${ASSET_COUNT_LABEL} assets · scored daily`,
    price: "Starting at $1,999/mo",
    cta: { label: "Explore EdenRadar", href: "https://edenradar.com", external: true },
    visual: { img: "/images/portal-edenradar.png", alt: "EdenRadar Landscape Intelligence: pre-commercial pipeline, white-space finder, and therapeutic whitespace grid" },
  },
  {
    name: "EdenCompliance", token: "--portal-compliance", goldToken: "--portal-compliance-gold",
    headline: { pre: "Vendor quality and audits, on ", accent: "one controlled record.", post: "" },
    sub: "Qualify vendors, run the audit program, and keep every change signed and unalterable.",
    meta: "Append-only record · e-signatures · Regulation Watch",
    price: "Starting at $299/mo",
    cta: { label: "Explore EdenCompliance", href: "https://edencompliance.com", external: true },
    visual: { img: "/images/portal-edencompliance.png", alt: "EdenCompliance dashboard: vendor status, findings, and program health" },
  },
  {
    name: "EdenMarket", token: "--portal-market",
    headline: { pre: "From an indexed asset to ", accent: "the first conversation.", post: "" },
    sub: "NDA-gated deal rooms, with your identity revealed only on your terms.",
    meta: "NDA-gated deal rooms · identity on your terms",
    cta: { label: "Explore EdenMarket", href: "/products#edenmarket", external: false },
    visual: { img: "/images/portal-edenmarket.png", alt: "EdenMarket: blind, NDA-gated listings for licensable biotech assets" },
  },
  {
    name: "EdenLab", token: "--portal-lab",
    headline: { pre: "From first idea to ", accent: "industry", post: ", without losing the thread." },
    sub: "A structured research workspace that carries a project from hypothesis to publication.",
    meta: "11-section project canvas · 40+ data sources · grant discovery",
    cta: { label: "Explore EdenLab", href: "/products#edenlab", external: false },
    visual: { img: "/images/portal-edenlab.png", alt: "EdenLab research workspace: concept-to-project tools for scientists" },
  },
  {
    name: "EdenDiscovery", token: "--portal-discovery",
    headline: { pre: "Plant an idea, and let ", accent: "the world", post: " know it exists." },
    sub: "Date-stamp an early concept and get an automatic EDEN Credibility Score.",
    meta: "EDEN Credibility Score · public community feed",
    cta: { label: "Explore EdenDiscovery", href: "/products#edendiscovery", external: false },
    visual: "discovery",
  },
];

const ROTATE_MS = 6500;

// ── EdenDiscovery: illustrative EDEN Credibility Score panel. ──
function DiscoveryCard() {
  const dims = [
    { label: "Novelty", value: 92 },
    { label: "Feasibility", value: 78 },
    { label: "Evidence", value: 84 },
  ];
  return (
    <div
      className="w-full max-w-[420px] rounded-2xl border bg-card p-8"
      style={{ borderColor: "hsl(var(--portal-discovery) / 0.35)", boxShadow: "0 40px 90px hsl(var(--portal-discovery) / 0.24)" }}
      aria-hidden
    >
      <div className="flex items-center justify-between mb-5">
        <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "hsl(var(--portal-discovery))" }}>
          EDEN Credibility Score
        </span>
        <span className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground border border-border rounded-full px-2 py-0.5">Illustrative</span>
      </div>
      <div className="flex items-end gap-2 mb-1">
        <span className="text-[60px] font-bold leading-none" style={{ color: "hsl(var(--portal-discovery))" }}>87</span>
        <span className="text-lg text-muted-foreground mb-2">/ 100</span>
      </div>
      <p className="text-sm font-semibold text-foreground">Sample concept submission</p>
      <p className="text-xs text-muted-foreground mb-6">Every concept is auto-scored on submission</p>
      <div className="space-y-4">
        {dims.map((d) => (
          <div key={d.label}>
            <div className="flex items-center justify-between text-[13px] mb-1.5">
              <span className="text-foreground/85 font-medium">{d.label}</span>
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

// A large product surface that bleeds and feathers into the canvas, floated on an
// accent glow. Subtle tilt with GPU hints so images stay crisp.
function SlideVisual({ visual, token }: { visual: Visual; token: string }) {
  const card = visual === "discovery" ? <DiscoveryCard /> : null;
  return (
    <div className="relative flex items-center justify-center lg:justify-end">
      {/* accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-[background] duration-700"
        style={{ background: `radial-gradient(58% 60% at 55% 45%, hsl(var(${token}) / 0.28), transparent 72%)` }}
      />
      <div
        className="relative w-full"
        style={{ transform: "perspective(2600px) rotateY(-9deg) rotateX(2.5deg)", transformStyle: "preserve-3d", backfaceVisibility: "hidden", willChange: "transform" }}
      >
        {card ? (
          <div className="flex justify-center lg:justify-end lg:pr-12">{card}</div>
        ) : (
          <img
            src={(visual as { img: string }).img}
            alt={(visual as { alt: string }).alt}
            decoding="async"
            className="w-full block rounded-xl"
            style={{
              boxShadow: `0 44px 100px hsl(var(${token}) / 0.26), 0 12px 30px rgba(0,0,0,0.12)`,
              WebkitMaskImage: "linear-gradient(to bottom, #000 82%, transparent), linear-gradient(to right, #000 88%, transparent)",
              WebkitMaskComposite: "source-in",
              maskImage: "linear-gradient(to bottom, #000 82%, transparent), linear-gradient(to right, #000 88%, transparent)",
              maskComposite: "intersect",
            }}
          />
        )}
      </div>
    </div>
  );
}

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

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
  const suffix = s.name.slice(4);

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-border transition-[background] duration-700"
      style={{
        background:
          `radial-gradient(80% 90% at 88% 10%, hsl(var(${s.token}) / 0.09), transparent 60%),` +
          `linear-gradient(180deg, hsl(var(${s.token}) / 0.045), hsl(var(--card)) 50%)`,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="grid items-center gap-8 px-7 py-11 sm:px-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10 lg:pl-14 lg:pr-0 lg:py-12">
        {/* Left: the product's hero line */}
        <div key={`t-${active}`} className="showcase-in">
          <p className="text-lg font-bold tracking-tight mb-4">
            <span className="text-foreground/60">Eden</span>
            <span style={{ color: accent }}>{suffix}</span>
          </p>
          <h3 className="font-black tracking-tight leading-[1.05] text-balance text-[2.15rem] sm:text-[2.9rem]">
            <span className="text-foreground">{s.headline.pre}</span>
            <span style={{ color: s.goldToken ? `hsl(var(${s.goldToken}))` : accent }}>{s.headline.accent}</span>
            <span className="text-foreground">{s.headline.post}</span>
          </h3>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-foreground/70">{s.sub}</p>
          <div className="mt-6 space-y-1.5">
            <p className="font-mono text-[12.5px] tracking-wide text-foreground/55">{s.meta}</p>
            {s.price && (
              <p className="text-[15px] font-semibold" style={{ color: s.goldToken ? `hsl(var(${s.goldToken}))` : accent }}>{s.price}</p>
            )}
          </div>
          <div className="mt-7">
            {s.cta.external ? (
              <a
                href={s.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 shadow-sm"
                style={{ background: accent }}
              >
                {s.cta.label} <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <Link
                to={s.cta.href}
                className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 shadow-sm"
                style={{ background: accent }}
              >
                {s.cta.label} <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Right: the product surface, large and bleeding into the canvas */}
        <div key={`v-${active}`} className="showcase-tilt min-w-0">
          <SlideVisual visual={s.visual} token={s.token} />
        </div>
      </div>

      {/* Rail */}
      <div className="relative border-t border-border px-5 py-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2.5" role="tablist" aria-label="Product suite">
          {SLIDES.map((slide, i) => {
            const on = i === active;
            const a = `hsl(var(${slide.token}))`;
            const sfx = slide.name.slice(4);
            return (
              <button
                key={slide.name}
                role="tab"
                aria-selected={on}
                type="button"
                onClick={(e) => { setActive(i); if (e.detail > 0) e.currentTarget.blur(); }}
                className="group relative overflow-hidden rounded-xl border px-5 py-2.5 text-[15px] font-bold tracking-tight transition-all"
                style={
                  on
                    ? { borderColor: a, background: `hsl(var(${slide.token}) / 0.1)` }
                    : { borderColor: "hsl(var(--border))" }
                }
              >
                <span className={on ? "text-foreground" : "text-foreground/45 group-hover:text-foreground/70"}>Eden</span>
                <span style={{ color: on ? a : undefined }} className={on ? "" : "text-foreground/45 group-hover:text-foreground/70"}>{sfx}</span>
                {on && (
                  <span
                    aria-hidden
                    className="showcase-progress absolute inset-x-0 bottom-0 h-[3px]"
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
