import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PORTAL_META } from "@/components/PortalBits";
import { VIGNETTES } from "@/components/ProductVignettes";
import { TTO_COUNT_LABEL, ASSET_COUNT_LABEL } from "@/lib/platformStats";

// The home Product Suite as a full-scroll sequence: each product is its own hero
// on a light page, given a soft wash of its own accent color (never a dark band),
// with its real product screenshot supersized and feathered in like the
// edencompliance.com hero. Sides alternate for rhythm.

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

const PRODUCTS: Product[] = [
  {
    name: "EdenRadar", token: "--portal-radar",
    headline: { pre: "The next biotech breakthrough is ", accent: "already published.", post: "" },
    sub: "Real-time monitoring across 400+ tech transfer offices means the right assets find you first.",
    meta: `${TTO_COUNT_LABEL} institutions · ${ASSET_COUNT_LABEL} assets · scored daily`,
    price: "Starting at $1,999/mo",
    cta: { label: "Explore EdenRadar", href: "https://edenradar.com", external: true },
  },
  {
    name: "EdenCompliance", token: "--portal-compliance", goldToken: "--portal-compliance-gold",
    headline: { pre: "Vendor quality and audits, on ", accent: "one controlled record.", post: "" },
    sub: "Qualify vendors, run the audit program, and keep every change signed and unalterable.",
    meta: "Append-only record · e-signatures · Regulation Watch",
    price: "Starting at $299/mo",
    cta: { label: "Explore EdenCompliance", href: "https://edencompliance.com", external: true },
  },
  {
    name: "EdenMarket", token: "--portal-market",
    headline: { pre: "From an indexed asset to ", accent: "the first conversation.", post: "" },
    sub: "NDA-gated deal rooms, with your identity revealed only on your terms.",
    meta: "NDA-gated deal rooms · identity on your terms",
    cta: { label: "Explore EdenMarket", href: "/products#edenmarket", external: false },
  },
  {
    name: "EdenLab", token: "--portal-lab",
    headline: { pre: "From first idea to ", accent: "industry", post: ", without losing the thread." },
    sub: "A structured research workspace that carries a project from hypothesis to publication.",
    meta: "11-section project canvas · 40+ data sources · grant discovery",
    cta: { label: "Explore EdenLab", href: "/products#edenlab", external: false },
  },
  {
    name: "EdenDiscovery", token: "--portal-discovery",
    headline: { pre: "Plant an idea, and let ", accent: "the world", post: " know it exists." },
    sub: "Date-stamp an early concept and get an automatic EDEN Credibility Score.",
    meta: "EDEN Credibility Score · public community feed",
    cta: { label: "Explore EdenDiscovery", href: "/products#edendiscovery", external: false },
  },
];

const INK = "#0f1a14";
const SUB = "#4b554f";
const META = "#6b746e";

// Real product screenshots that already exist as clean, light component views.
// Where we don't yet have one, we fall back to a native light vignette.
const SHOTS: Record<string, string> = {
  EdenRadar: "/images/portal-edenradar.png",
  EdenCompliance: "/images/portal-edencompliance.png",
};

// One treatment for every surface: supersized, tilted in 3D on its near
// (text-side) edge so it recedes from the copy, bled off the outer edge, and
// feathered on every edge so it dissolves into the light ground.
function Surface({ p, flip }: { p: Product; flip: boolean }) {
  const shot = SHOTS[p.name];
  const Vignette = VIGNETTES[p.name] ?? VIGNETTES.EdenRadar;
  const feather = "radial-gradient(120% 116% at 50% 50%, #000 60%, rgba(0,0,0,0) 100%)";
  return (
    <div className="relative" style={{ perspective: "2200px" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(60% 62% at ${flip ? "42%" : "58%"} 50%, hsl(var(${p.token}) / 0.18), transparent 72%)` }}
      />
      <div className={`flex ${flip ? "lg:justify-end" : "lg:justify-start"}`}>
        <div
          className="w-full max-w-none lg:w-[124%]"
          style={{
            transformOrigin: flip ? "right center" : "left center",
            transform: `rotateY(${flip ? 11 : -11}deg) rotateX(2.5deg)`,
            backfaceVisibility: "hidden",
            willChange: "transform",
            filter: `drop-shadow(${flip ? "-22px" : "22px"} 34px 60px rgba(24,44,34,0.28))`,
            WebkitMaskImage: feather,
            maskImage: feather,
          }}
        >
          {shot ? (
            <img
              src={shot}
              alt={`${p.name} product view`}
              decoding="async"
              className="block w-full rounded-2xl"
            />
          ) : (
            <Vignette />
          )}
        </div>
      </div>
    </div>
  );
}

function ProductRow({ p, i }: { p: Product; i: number }) {
  const accent = `hsl(var(${p.token}))`;
  const headlineAccent = p.goldToken ? `hsl(var(${p.goldToken}))` : accent;
  const Icon = (PORTAL_META[p.name] ?? PORTAL_META.EdenRadar).Icon;
  const suffix = p.name.slice(4);
  const flip = i % 2 === 1;

  return (
    <section className="relative overflow-hidden">
      {/* Soft accent wash on the light page: a gentle colored ground, never a
          dark band, fading top and bottom so sections blend into each other. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            `radial-gradient(58% 72% at ${flip ? "16%" : "84%"} 40%, hsl(var(${p.token}) / 0.13), transparent 60%),` +
            `linear-gradient(180deg, hsl(var(${p.token}) / 0.06), hsl(var(${p.token}) / 0.025))`,
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
          maskImage: "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
        }}
      />
      <div className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-10 px-6 py-20 sm:px-8 lg:min-h-[70vh] lg:grid-cols-2 lg:gap-14 lg:px-12 lg:py-28">
        {/* Text */}
        <div className={`reveal ${flip ? "lg:order-2" : ""}`}>
          <div className="mb-5 flex items-center gap-3">
            <Icon className="h-8 w-8 flex-shrink-0" strokeWidth={2.25} style={{ color: accent }} />
            <span className="text-2xl font-bold tracking-tight sm:text-3xl">
              <span style={{ color: INK }}>Eden</span>
              <span style={{ color: accent }}>{suffix}</span>
            </span>
          </div>
          <h3 className="text-balance font-black leading-[1.04] tracking-tight text-[2.35rem] sm:text-[3.1rem]">
            <span style={{ color: INK }}>{p.headline.pre}</span>
            <span style={{ color: headlineAccent }}>{p.headline.accent}</span>
            <span style={{ color: INK }}>{p.headline.post}</span>
          </h3>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed" style={{ color: SUB }}>{p.sub}</p>
          <div className="mt-6 space-y-1.5">
            <p className="font-mono text-[12.5px] tracking-wide" style={{ color: META }}>{p.meta}</p>
            {p.price && <p className="text-[15px] font-semibold" style={{ color: headlineAccent }}>{p.price}</p>}
          </div>
          <div className="mt-8">
            {p.cta.external ? (
              <a
                href={p.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: accent }}
              >
                {p.cta.label} <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <Link
                to={p.cta.href}
                className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: accent }}
              >
                {p.cta.label} <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Surface */}
        <div className={`reveal ${flip ? "lg:order-1" : ""}`} style={{ transitionDelay: "0.12s" }}>
          <Surface p={p} flip={flip} />
        </div>
      </div>
    </section>
  );
}

export function ProductShowcase() {
  return (
    <div>
      {PRODUCTS.map((p, i) => (
        <ProductRow key={p.name} p={p} i={i} />
      ))}
    </div>
  );
}
