import type { ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Lock, Check } from "lucide-react";
import { PORTAL_META } from "@/components/PortalBits";
import { TTO_COUNT_LABEL, ASSET_COUNT_LABEL } from "@/lib/platformStats";

// The home Product Suite as an asymmetric bento with real depth: cards are
// raised paper with layered shadows over a fine data-grid ground; each product's
// real screenshot floats in a clean framed panel lit by a soft accent glow. All
// five read at once, in their fixed order, EdenRadar and EdenCompliance leading
// as equal flagships.

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
    meta: `${TTO_COUNT_LABEL} institutions · ${ASSET_COUNT_LABEL} assets`,
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

// Raised-paper card: subtle top-to-bottom gradient, a 1px inset highlight for a
// bevel, and a three-layer ambient shadow so it sits above the textured ground.
const cardStyle = {
  background: "linear-gradient(180deg, #ffffff 0%, #f6f9f7 100%)",
  border: `1px solid ${HAIR}`,
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 2px rgba(15,26,20,0.04), 0 12px 24px rgba(15,26,20,0.06), 0 34px 60px rgba(15,26,20,0.07)",
} as const;

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-[26px] ${className}`} style={cardStyle}>
      {children}
    </div>
  );
}

function Wordmark({ p }: { p: Product }) {
  const accent = `hsl(var(${p.token}))`;
  const Icon = (PORTAL_META[p.name] ?? PORTAL_META.EdenRadar).Icon;
  const suffix = p.name.slice(4);
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `hsl(var(${p.token}) / 0.1)`, border: `1px solid hsl(var(${p.token}) / 0.18)` }}>
        <Icon className="h-[17px] w-[17px]" strokeWidth={2.25} style={{ color: accent }} />
      </span>
      <span className="text-[15px] font-bold tracking-tight" style={{ color: INK }}>Eden<span style={{ color: accent }}>{suffix}</span></span>
    </span>
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

function Cta({ p }: { p: Product }) {
  const accent = `hsl(var(${p.token}))`;
  const headlineAccent = p.goldToken ? `hsl(var(${p.goldToken}))` : accent;
  return (
    <div className="mt-5 flex items-center gap-3">
      {p.cta.external ? (
        <a href={p.cta.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-[13.5px] font-semibold text-white shadow-sm transition-opacity hover:opacity-90" style={{ background: accent }}>
          {p.cta.label} <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      ) : (
        <Link to={p.cta.href} className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-[13.5px] font-semibold" style={{ color: headlineAccent, border: `1px solid ${HAIR}` }}>
          {p.cta.label} <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
      <span className="font-mono text-[11.5px]" style={{ color: META }}>{p.price ?? p.meta}</span>
    </div>
  );
}

// A real product screenshot, floated in a framed panel over a soft accent glow.
// Top-cropped to a clean edge (no ragged bleed) with depth from a layered shadow.
function ShotPanel({ p }: { p: Product }) {
  const shot = SHOTS[p.name];
  return (
    <div className="relative mt-auto px-7 pb-7 lg:px-9 lg:pb-9">
      <div aria-hidden className="pointer-events-none absolute inset-x-4 bottom-0 top-[-6%]" style={{ background: `radial-gradient(68% 74% at 50% 58%, hsl(var(${p.token}) / 0.22), transparent 72%)`, filter: "blur(30px)" }} />
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ maxHeight: 300, border: "1px solid rgba(15,26,20,0.12)", boxShadow: "0 2px 6px rgba(15,26,20,0.08), 0 22px 44px rgba(15,26,20,0.18)" }}
      >
        <img src={shot} alt="" decoding="async" className="block w-full" style={{ objectFit: "cover", objectPosition: "top" }} />
      </div>
    </div>
  );
}

// Big flagship tile (EdenRadar / EdenCompliance) — equal size, side by side.
function BigTile({ p }: { p: Product }) {
  return (
    <Card className="flex min-h-[540px] flex-col">
      <div className="relative z-10 p-7 pb-0 lg:p-9 lg:pb-0">
        <Wordmark p={p} />
        <div className="mt-5"><Headline p={p} cls="text-[1.9rem] lg:text-[2.35rem] max-w-[16ch]" /></div>
        <p className="mt-4 max-w-[42ch] text-[15.5px] leading-relaxed" style={{ color: SUB }}>{p.sub}</p>
        <Cta p={p} />
      </div>
      <ShotPanel p={p} />
    </Card>
  );
}

// Compact signature visuals for the three smaller products.
function MiniShell({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl p-3" style={{ background: "linear-gradient(180deg, #fbfdfb, #f2f6f3)", border: `1px solid ${HAIR}`, boxShadow: "inset 0 1px 2px rgba(15,26,20,0.03)" }}>
      {children}
    </div>
  );
}

function MiniMarket() {
  const t = "--portal-market";
  const rows = [
    { title: "Pre-clinical oncology asset", tag: "ADC · Pre-clinical" },
    { title: "RNA base-editing platform", tag: "RNA · Discovery" },
  ];
  return (
    <MiniShell>
      <div className="space-y-2" aria-hidden>
        {rows.map((r) => (
          <div key={r.title} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2.5" style={{ border: `1px solid ${HAIR}` }}>
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
    </MiniShell>
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
    <MiniShell>
      <div className="grid grid-cols-2 gap-2" aria-hidden>
        {items.map((s) => (
          <div key={s.l} className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-2" style={{ border: `1px solid ${HAIR}` }}>
            <span className="flex h-[16px] w-[16px] flex-shrink-0 items-center justify-center rounded-full" style={s.d ? { background: `hsl(var(${t}))` } : { border: `1.5px solid ${LABEL}` }}>
              {s.d && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
            </span>
            <span className="text-[12px]" style={{ color: s.d ? INK : LABEL }}>{s.l}</span>
          </div>
        ))}
      </div>
    </MiniShell>
  );
}

function MiniDiscovery() {
  const t = "--portal-discovery";
  const dims = [{ l: "Novelty", v: 92 }, { l: "Feasibility", v: 78 }, { l: "Evidence", v: 84 }];
  return (
    <MiniShell>
      <div className="flex items-center gap-4" aria-hidden>
        <div className="flex flex-shrink-0 flex-col items-center">
          <span className="text-[42px] font-bold leading-none" style={{ color: `hsl(var(${t}))` }}>87</span>
          <span className="font-mono text-[10px]" style={{ color: LABEL }}>/ 100</span>
        </div>
        <div className="flex-1 space-y-2">
          {dims.map((d) => (
            <div key={d.l}>
              <div className="mb-1 flex items-center justify-between text-[11.5px]">
                <span style={{ color: SUB }}>{d.l}</span>
                <span className="tabular-nums" style={{ color: LABEL }}>{d.v}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "#e6ebe7" }}>
                <div className="h-full rounded-full" style={{ width: `${d.v}%`, background: `hsl(var(${t}))` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MiniShell>
  );
}

const MINIS: Record<string, () => ReactElement> = {
  EdenMarket: MiniMarket,
  EdenLab: MiniLab,
  EdenDiscovery: MiniDiscovery,
};

function MiniTile({ p }: { p: Product }) {
  const Mini = MINIS[p.name] ?? MiniMarket;
  return (
    <Card className="flex min-h-[360px] flex-col">
      <div className="relative z-10 p-7">
        <Wordmark p={p} />
        <div className="mt-4"><Headline p={p} cls="text-[1.35rem]" /></div>
        <p className="mt-3 max-w-[34ch] text-[13.5px] leading-relaxed" style={{ color: SUB }}>{p.sub}</p>
        <Cta p={p} />
      </div>
      <div className="mt-auto p-5 pt-0"><Mini /></div>
    </Card>
  );
}

export function ProductShowcase() {
  return (
    <div className="relative">
      {/* Fine data-grid ground, faded toward the edges, for tactile depth. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-8 bottom-0"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(15,26,20,0.05) 1px, transparent 1.5px)",
          backgroundSize: "26px 26px",
          WebkitMaskImage: "radial-gradient(120% 80% at 50% 30%, #000 35%, transparent 82%)",
          maskImage: "radial-gradient(120% 80% at 50% 30%, #000 35%, transparent 82%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="space-y-5 lg:space-y-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
            <BigTile p={PRODUCTS.radar} />
            <BigTile p={PRODUCTS.compliance} />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <MiniTile p={PRODUCTS.market} />
            <MiniTile p={PRODUCTS.lab} />
            <MiniTile p={PRODUCTS.discovery} />
          </div>
        </div>
      </div>
    </div>
  );
}
