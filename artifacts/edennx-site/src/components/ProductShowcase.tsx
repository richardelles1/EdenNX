import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { PORTAL_META } from "@/components/PortalBits";
import { TTO_COUNT_LABEL, ASSET_COUNT_LABEL } from "@/lib/platformStats";

// The home Product Suite as an asymmetric bento. Each card carries a slight wash
// of its product's accent, presses in on hover like a button, and leads with a
// large wordmark. EdenRadar and EdenCompliance are equal flagships whose real
// screenshots run edge to edge along the card floor (no inner frame); the three
// smaller products lead with a feature checklist.

type Product = {
  name: string;
  token: string;
  goldToken?: string;
  headline: { pre: string; accent: string; post: string };
  sub: string;
  note: string;
  features?: string[];
  cta: { label: string; href: string; external: boolean };
};

const PRODUCTS: Record<string, Product> = {
  radar: {
    name: "EdenRadar", token: "--portal-radar",
    headline: { pre: "The next biotech breakthrough is ", accent: "already published.", post: "" },
    sub: `Real-time monitoring across ${TTO_COUNT_LABEL} tech transfer offices means the right assets find you first.`,
    note: "From $1,999/mo",
    cta: { label: "Explore EdenRadar", href: "https://edenradar.com", external: true },
  },
  compliance: {
    name: "EdenCompliance", token: "--portal-compliance", goldToken: "--portal-compliance-gold",
    headline: { pre: "Vendor quality and audits, on ", accent: "one controlled record.", post: "" },
    sub: "Qualify vendors, run the audit program, and keep every change signed and unalterable.",
    note: "From $299/mo",
    cta: { label: "Explore EdenCompliance", href: "https://edencompliance.com", external: true },
  },
  market: {
    name: "EdenMarket", token: "--portal-market",
    headline: { pre: "From an indexed asset to ", accent: "the first conversation.", post: "" },
    sub: "NDA-gated deal rooms, with your identity revealed only on your terms.",
    note: "Success-fee aligned",
    features: ["NDA-gated deal rooms", "Blind until you both agree", "Structured asset profiles"],
    cta: { label: "Explore EdenMarket", href: "/products#edenmarket", external: false },
  },
  lab: {
    name: "EdenLab", token: "--portal-lab",
    headline: { pre: "First idea to ", accent: "industry", post: ", without losing the thread." },
    sub: "A structured research workspace from hypothesis to publication.",
    note: "Free",
    features: ["11-section project canvas", "40+ integrated data sources", "Grant discovery built in"],
    cta: { label: "Explore EdenLab", href: "/products#edenlab", external: false },
  },
  discovery: {
    name: "EdenDiscovery", token: "--portal-discovery",
    headline: { pre: "Plant an idea, and let ", accent: "the world", post: " know it exists." },
    sub: "Date-stamp an early concept and get an automatic credibility score.",
    note: "Free",
    features: ["Date-stamped concept registry", "Automatic credibility score", "Public community feed"],
    cta: { label: "Explore EdenDiscovery", href: "/products#edendiscovery", external: false },
  },
};

const INK = "#0f1a14";
const BODY = "#374139";
const NOTE = "#525c55";

const SHOTS: Record<string, string> = {
  EdenRadar: "/images/portal-edenradar.png",
  EdenCompliance: "/images/portal-edencompliance.png",
};

// Layered ambient shadow at rest; a shallower shadow plus a downward nudge on
// hover so the whole card reads as a button pressing in.
const PRESS =
  "transition-[transform,box-shadow] duration-200 ease-out will-change-transform " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_4px_rgba(15,26,20,0.05),0_22px_46px_rgba(15,26,20,0.08)] " +
  "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_1px_2px_rgba(15,26,20,0.06),0_6px_14px_rgba(15,26,20,0.05)] " +
  "hover:translate-y-[3px] active:translate-y-[5px]";

function cardStyle(p: Product) {
  return {
    background: `linear-gradient(180deg, color-mix(in srgb, hsl(var(${p.token})) 6%, #ffffff), color-mix(in srgb, hsl(var(${p.token})) 2%, #ffffff))`,
    border: `1px solid hsl(var(${p.token}) / 0.16)`,
  } as const;
}

// The whole card is the link, so it can press in like a button.
function CardLink({ p, className = "", children }: { p: Product; className?: string; children: ReactNode }) {
  const cls = `group relative flex flex-col overflow-hidden rounded-[26px] ${PRESS} ${className}`;
  return p.cta.external ? (
    <a href={p.cta.href} target="_blank" rel="noopener noreferrer" className={cls} style={cardStyle(p)}>{children}</a>
  ) : (
    <Link to={p.cta.href} className={cls} style={cardStyle(p)}>{children}</Link>
  );
}

function Wordmark({ p }: { p: Product }) {
  const accent = `hsl(var(${p.token}))`;
  const Icon = (PORTAL_META[p.name] ?? PORTAL_META.EdenRadar).Icon;
  const suffix = p.name.slice(4);
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `hsl(var(${p.token}) / 0.12)`, border: `1px solid hsl(var(${p.token}) / 0.2)` }}>
        <Icon className="h-[22px] w-[22px]" strokeWidth={2.25} style={{ color: accent }} />
      </span>
      <span className="text-[22px] font-bold tracking-tight" style={{ color: INK }}>Eden<span style={{ color: accent }}>{suffix}</span></span>
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

function CtaRow({ p }: { p: Product }) {
  const headlineAccent = p.goldToken ? `hsl(var(${p.goldToken}))` : `hsl(var(${p.token}))`;
  return (
    <div className="mt-5 flex items-center gap-3">
      <span className="inline-flex items-center gap-1 text-[14px] font-semibold transition-[gap] group-hover:gap-2" style={{ color: headlineAccent }}>
        {p.cta.label} <ArrowUpRight className="h-4 w-4" />
      </span>
      <span className="font-mono text-[11.5px]" style={{ color: NOTE }}>{p.note}</span>
    </div>
  );
}

// Big flagship tile: copy on top, real screenshot running edge to edge along the
// floor, both tiles the same height so both images start at the same line.
function BigTile({ p }: { p: Product }) {
  return (
    <CardLink p={p} className="min-h-[560px]">
      <div className="relative z-10 p-8 lg:p-9">
        <Wordmark p={p} />
        <div className="mt-6"><Headline p={p} cls="text-[1.9rem] lg:text-[2.35rem] max-w-[16ch]" /></div>
        <p className="mt-4 max-w-[42ch] text-[16px] leading-relaxed" style={{ color: BODY }}>{p.sub}</p>
        <CtaRow p={p} />
      </div>
      <div className="mt-auto h-[300px] w-full overflow-hidden lg:h-[340px]" style={{ borderTop: "1px solid rgba(15,26,20,0.08)" }}>
        <img src={SHOTS[p.name]} alt="" decoding="async" className="h-full w-full" style={{ objectFit: "cover", objectPosition: "top" }} />
      </div>
    </CardLink>
  );
}

// Smaller product: leads with a feature checklist instead of a screenshot.
function MiniTile({ p }: { p: Product }) {
  const accent = `hsl(var(${p.token}))`;
  return (
    <CardLink p={p} className="min-h-[360px]">
      <div className="relative z-10 flex flex-1 flex-col p-7">
        <Wordmark p={p} />
        <div className="mt-5"><Headline p={p} cls="text-[1.4rem]" /></div>
        <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed" style={{ color: BODY }}>{p.sub}</p>
        <ul className="mt-5 space-y-2.5">
          {(p.features ?? []).map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-[13.5px]" style={{ color: INK }}>
              <span className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full" style={{ background: `hsl(var(${p.token}) / 0.14)` }}>
                <Check className="h-3 w-3" strokeWidth={3} style={{ color: accent }} />
              </span>
              {f}
            </li>
          ))}
        </ul>
        <CtaRow p={p} />
      </div>
    </CardLink>
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
