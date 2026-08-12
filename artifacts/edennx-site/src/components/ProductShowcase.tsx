import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Lock, Check } from "lucide-react";
import { PORTAL_META } from "@/components/PortalBits";
import { TTO_COUNT_LABEL, ASSET_COUNT_LABEL } from "@/lib/platformStats";

// The home Product Suite as an asymmetric bento: all five products visible at
// once (breadth is the message), EdenRadar dominating as the flagship tile. Each
// tile is ink-on-paper with color used only as the product's identity; the real
// screenshot sits straight-on and feathers up from the tile floor (no 3D tilt,
// no device chrome). One radius, one border, one shadow across all five.

type Product = {
  name: string;
  token: string;
  goldToken?: string;
  headline: { pre: string; accent: string; post: string };
  sub: string;
  meta: string;
  price?: string;
  cta: { label: string; href: string; external: boolean };
};

const PRODUCTS: Record<string, Product> = {
  radar: {
    name: "EdenRadar", token: "--portal-radar",
    headline: { pre: "The next biotech breakthrough is ", accent: "already published.", post: "" },
    sub: "Real-time monitoring across 400+ tech transfer offices means the right assets find you first.",
    meta: `${TTO_COUNT_LABEL} institutions · ${ASSET_COUNT_LABEL} assets · scored daily`,
    price: "From $1,999/mo",
    cta: { label: "Explore EdenRadar", href: "https://edenradar.com", external: true },
  },
  compliance: {
    name: "EdenCompliance", token: "--portal-compliance", goldToken: "--portal-compliance-gold",
    headline: { pre: "Vendor quality and audits, on ", accent: "one controlled record.", post: "" },
    sub: "Qualify vendors, run the audit program, and keep every change signed and unalterable.",
    meta: "Append-only record · e-signatures",
    price: "From $299/mo",
    cta: { label: "Explore EdenCompliance", href: "https://edencompliance.com", external: true },
  },
  market: {
    name: "EdenMarket", token: "--portal-market",
    headline: { pre: "From an indexed asset to ", accent: "the first conversation.", post: "" },
    sub: "NDA-gated deal rooms, with your identity revealed only on your terms.",
    meta: "Blind by default",
    cta: { label: "EdenMarket", href: "/products#edenmarket", external: false },
  },
  lab: {
    name: "EdenLab", token: "--portal-lab",
    headline: { pre: "First idea to ", accent: "industry", post: ", without losing the thread." },
    sub: "A structured research workspace from hypothesis to publication.",
    meta: "Free",
    cta: { label: "EdenLab", href: "/products#edenlab", external: false },
  },
  discovery: {
    name: "EdenDiscovery", token: "--portal-discovery",
    headline: { pre: "Plant an idea, and let ", accent: "the world", post: " know it exists." },
    sub: "Date-stamp an early concept and get an automatic credibility score.",
    meta: "Free",
    cta: { label: "EdenDiscovery", href: "/products#edendiscovery", external: false },
  },
};

const INK = "#0f1a14";
const SUB = "#4b554f";
const META = "#6b746e";
const LABEL = "#8a938d";
const HAIR = "rgba(15,26,20,0.09)";
const PANEL = "#f4f7f4";

const SHOTS: Record<string, string> = {
  EdenRadar: "/images/portal-edenradar.png",
  EdenCompliance: "/images/portal-edencompliance.png",
};

type Variant = "hero" | "tall" | "sm";

function Wordmark({ p }: { p: Product }) {
  const accent = `hsl(var(${p.token}))`;
  const Icon = (PORTAL_META[p.name] ?? PORTAL_META.EdenRadar).Icon;
  const suffix = p.name.slice(4);
  return (
    <span className="inline-flex items-center gap-2">
      <Icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={2.25} style={{ color: accent }} />
      <span className="text-[15px] font-bold tracking-tight" style={{ color: INK }}>Eden<span style={{ color: accent }}>{suffix}</span></span>
    </span>
  );
}

function Cta({ p }: { p: Product }) {
  const accent = `hsl(var(${p.token}))`;
  const headlineAccent = p.goldToken ? `hsl(var(${p.goldToken}))` : accent;
  return (
    <div className="mt-5 flex items-center gap-3">
      {p.cta.external ? (
        <a href={p.cta.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-[13.5px] font-semibold text-white transition-opacity hover:opacity-90" style={{ background: accent }}>
          {p.cta.label} <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      ) : (
        <Link to={p.cta.href} className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-[13.5px] font-semibold" style={{ color: headlineAccent, border: `1px solid ${HAIR}` }}>
          {p.cta.label} <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
      <span className="font-mono text-[11.5px]" style={{ color: META }}>{p.price ?? p.meta}</span>
    </div>
  );
}

function Headline({ p, cls }: { p: Product; cls: string }) {
  const accent = `hsl(var(${p.token}))`;
  const headlineAccent = p.goldToken ? `hsl(var(${p.goldToken}))` : accent;
  return (
    <h3 className={`text-balance font-black leading-[1.08] tracking-tight ${cls}`}>
      <span style={{ color: INK }}>{p.headline.pre}</span>
      <span style={{ color: headlineAccent }}>{p.headline.accent}</span>
      <span style={{ color: INK }}>{p.headline.post}</span>
    </h3>
  );
}

const tileClass =
  "group relative overflow-hidden rounded-[20px] bg-white";
const tileStyle = { border: `1px solid ${HAIR}`, boxShadow: "0 1px 2px rgba(15,26,20,0.04), 0 12px 32px rgba(15,26,20,0.05)" } as const;

function AccentBar({ p }: { p: Product }) {
  const headlineAccent = p.goldToken ? `hsl(var(${p.goldToken}))` : `hsl(var(${p.token}))`;
  return <div aria-hidden className="absolute inset-x-0 top-0 z-20 h-[3px]" style={{ background: headlineAccent, opacity: 0.9 }} />;
}

// Hero: two columns. Copy holds the left; the wide screenshot bleeds off the
// right edge, its top-left corner feathering into the copy gutter.
function HeroTile({ p, className = "" }: { p: Product; className?: string }) {
  const shot = SHOTS[p.name];
  const feather = "radial-gradient(135% 130% at 88% 82%, #000 50%, rgba(0,0,0,0) 100%)";
  return (
    <div className={`${tileClass} grid min-h-[440px] lg:min-h-[520px] lg:grid-cols-[0.92fr_1.08fr] ${className}`} style={tileStyle}>
      <AccentBar p={p} />
      <div className="relative z-10 flex flex-col justify-center p-8 lg:p-10">
        <Wordmark p={p} />
        <div className="mt-5"><Headline p={p} cls="text-[2rem] lg:text-[2.7rem] max-w-[13ch]" /></div>
        <p className="mt-4 max-w-[40ch] text-[16px] leading-relaxed" style={{ color: SUB }}>{p.sub}</p>
        <Cta p={p} />
      </div>
      <div className="relative min-h-[240px] overflow-hidden lg:min-h-0">
        <div aria-hidden className="pointer-events-none absolute bottom-[7%] left-[6%] w-[150%] max-w-none" style={{ WebkitMaskImage: feather, maskImage: feather }}>
          <img src={shot} alt="" decoding="async" className="block w-full rounded-xl" style={{ border: `1px solid ${HAIR}`, filter: "drop-shadow(0 22px 40px rgba(24,44,34,0.18))" }} />
        </div>
      </div>
    </div>
  );
}

// Compact, tile-sized signature visuals for the three smaller products.
function MiniMarket() {
  const t = "--portal-market";
  const rows = [
    { title: "Pre-clinical oncology asset", tag: "ADC · Pre-clinical" },
    { title: "RNA base-editing platform", tag: "RNA · Discovery" },
  ];
  return (
    <div className="space-y-2" aria-hidden>
      {rows.map((r) => (
        <div key={r.title} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5" style={{ background: PANEL, border: `1px solid ${HAIR}` }}>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold" style={{ color: INK }}>{r.title}</p>
            <p className="font-mono text-[10.5px]" style={{ color: LABEL }}>{r.tag}</p>
          </div>
          <span className="flex flex-shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold" style={{ color: `hsl(var(${t}))`, background: `hsl(var(${t}) / 0.12)` }}>
            <Lock className="h-3 w-3" /> BLIND
          </span>
        </div>
      ))}
    </div>
  );
}

function MiniLab() {
  const t = "--portal-lab";
  const items = [
    { l: "Hypothesis", d: true }, { l: "Literature", d: true },
    { l: "Evidence", d: true }, { l: "Methods", d: true },
    { l: "IP position", d: false }, { l: "Grants", d: false },
  ];
  return (
    <div className="grid grid-cols-2 gap-2" aria-hidden>
      {items.map((s) => (
        <div key={s.l} className="flex items-center gap-2 rounded-lg px-2.5 py-2" style={{ background: PANEL, border: `1px solid ${HAIR}` }}>
          <span className="flex h-[16px] w-[16px] flex-shrink-0 items-center justify-center rounded-full" style={s.d ? { background: `hsl(var(${t}))` } : { border: `1.5px solid ${LABEL}` }}>
            {s.d && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
          </span>
          <span className="text-[12px]" style={{ color: s.d ? INK : LABEL }}>{s.l}</span>
        </div>
      ))}
    </div>
  );
}

function MiniDiscovery() {
  const t = "--portal-discovery";
  const dims = [{ l: "Novelty", v: 92 }, { l: "Feasibility", v: 78 }, { l: "Evidence", v: 84 }];
  return (
    <div className="flex items-center gap-4" aria-hidden>
      <div className="flex flex-shrink-0 flex-col items-center">
        <span className="text-[44px] font-bold leading-none" style={{ color: `hsl(var(${t}))` }}>87</span>
        <span className="font-mono text-[10px]" style={{ color: LABEL }}>/ 100</span>
      </div>
      <div className="flex-1 space-y-2">
        {dims.map((d) => (
          <div key={d.l}>
            <div className="mb-1 flex items-center justify-between text-[11.5px]">
              <span style={{ color: SUB }}>{d.l}</span>
              <span className="tabular-nums" style={{ color: LABEL }}>{d.v}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full" style={{ background: PANEL }}>
              <div className="h-full rounded-full" style={{ width: `${d.v}%`, background: `hsl(var(${t}))` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const MINIS: Record<string, () => ReactElement> = {
  EdenMarket: MiniMarket,
  EdenLab: MiniLab,
  EdenDiscovery: MiniDiscovery,
};

// Compliance is tall: real dashboard feathers up from the floor. The three
// smaller products get a compact signature visual pinned to the tile floor.
function StackTile({ p, variant, className = "" }: { p: Product; variant: Variant; className?: string }) {
  const shot = SHOTS[p.name];
  const tall = variant === "tall";
  const Mini = MINIS[p.name];
  const topFade = "linear-gradient(to bottom, transparent 0%, #000 30%)";
  return (
    <div className={`${tileClass} flex flex-col ${tall ? "min-h-[440px] lg:min-h-[520px]" : "min-h-[360px]"} ${className}`} style={tileStyle}>
      <AccentBar p={p} />
      <div className="relative z-10 p-7">
        <Wordmark p={p} />
        <div className="mt-4"><Headline p={p} cls="text-[1.4rem]" /></div>
        <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed" style={{ color: SUB }}>{p.sub}</p>
        <Cta p={p} />
      </div>
      {tall && shot ? (
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 w-[118%] max-w-[600px] -translate-x-1/2 translate-y-[8%]" style={{ WebkitMaskImage: topFade, maskImage: topFade }}>
          <img src={shot} alt="" decoding="async" className="block w-full rounded-xl" style={{ border: `1px solid ${HAIR}`, filter: "drop-shadow(0 16px 30px rgba(24,44,34,0.14))" }} />
        </div>
      ) : Mini ? (
        <div className="relative z-10 mt-auto px-7 pb-7"><Mini /></div>
      ) : null}
    </div>
  );
}

export function ProductShowcase() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <HeroTile p={PRODUCTS.radar} className="lg:col-span-2" />
          <StackTile p={PRODUCTS.compliance} variant="tall" className="lg:col-span-1" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <StackTile p={PRODUCTS.market} variant="sm" />
          <StackTile p={PRODUCTS.lab} variant="sm" />
          <StackTile p={PRODUCTS.discovery} variant="sm" />
        </div>
      </div>
    </div>
  );
}
