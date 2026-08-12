import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PORTAL_META } from "@/components/PortalBits";
import { VIGNETTES } from "@/components/ProductVignettes";
import { TTO_COUNT_LABEL, ASSET_COUNT_LABEL } from "@/lib/platformStats";

// The home Product Suite as a rotator: named product tabs across the top switch
// between full-size hero slides (each on a soft wash of its own accent color,
// with its real screenshot feathered in like the edencompliance.com hero). It
// auto-advances, pauses on hover, and stops once the visitor takes control.

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
const DURATION = 7000;

const SHOTS: Record<string, string> = {
  EdenRadar: "/images/portal-edenradar.png",
  EdenCompliance: "/images/portal-edencompliance.png",
};

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
}

// One treatment for every surface: supersized, tilted in 3D on its near
// (text-side) edge, bled off the outer edge, and feathered into the light ground.
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
            <img src={shot} alt={`${p.name} product view`} decoding="async" className="block w-full rounded-2xl" />
          ) : (
            <Vignette />
          )}
        </div>
      </div>
    </div>
  );
}

function Slide({ p, flip, active }: { p: Product; flip: boolean; active: boolean }) {
  const accent = `hsl(var(${p.token}))`;
  const headlineAccent = p.goldToken ? `hsl(var(${p.goldToken}))` : accent;

  return (
    <div
      aria-hidden={!active}
      className="overflow-hidden transition-[opacity,transform] duration-500 ease-out"
      style={{
        gridArea: "1 / 1",
        opacity: active ? 1 : 0,
        transform: active ? "translateX(0)" : `translateX(${flip ? "3%" : "-3%"})`,
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <div className="relative overflow-hidden">
        {/* Soft accent wash on the light page. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              `radial-gradient(58% 72% at ${flip ? "16%" : "84%"} 40%, hsl(var(${p.token}) / 0.13), transparent 60%),` +
              `linear-gradient(180deg, hsl(var(${p.token}) / 0.06), hsl(var(${p.token}) / 0.025))`,
            WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)",
            maskImage: "linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)",
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-10 px-6 py-16 sm:px-8 lg:min-h-[64vh] lg:grid-cols-2 lg:gap-14 lg:px-12 lg:py-20">
          {/* Text */}
          <div className={flip ? "lg:order-2" : ""}>
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
                  tabIndex={active ? 0 : -1}
                  className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: accent }}
                >
                  {p.cta.label} <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  to={p.cta.href}
                  tabIndex={active ? 0 : -1}
                  className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: accent }}
                >
                  {p.cta.label} <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Surface */}
          <div className={flip ? "lg:order-1" : ""}>
            <Surface p={p} flip={flip} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [locked, setLocked] = useState(false);
  const pausedRef = useRef(false);
  const reduce = usePrefersReducedMotion();

  // Auto-advance driven by a rAF loop so hover can freeze both the timer and the
  // progress bar in lockstep. Stops entirely once locked or reduced-motion.
  useEffect(() => {
    if (reduce || locked) {
      setProgress(0);
      return;
    }
    let raf = 0;
    let last: number | null = null;
    let acc = 0;
    const tick = (ts: number) => {
      if (last === null) last = ts;
      const dt = ts - last;
      last = ts;
      if (!pausedRef.current) {
        acc += dt;
        const p = Math.min(1, acc / DURATION);
        setProgress(p);
        if (p >= 1) {
          setActive((a) => (a + 1) % PRODUCTS.length);
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, locked, reduce]);

  const goTo = (i: number) => {
    setLocked(true);
    setActive(i);
    setProgress(0);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo((active + 1) % PRODUCTS.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo((active - 1 + PRODUCTS.length) % PRODUCTS.length);
    }
  };

  const autoRunning = !reduce && !locked;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="EdenNX product suite"
      onKeyDown={onKeyDown}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onFocusCapture={() => (pausedRef.current = true)}
      onBlurCapture={() => (pausedRef.current = false)}
    >
      {/* Tabs */}
      <div role="tablist" aria-label="Products" className="mx-auto mb-2 flex max-w-[1240px] flex-wrap items-stretch justify-center gap-1 px-4 sm:gap-2">
        {PRODUCTS.map((p, i) => {
          const isActive = i === active;
          const accent = `hsl(var(${p.token}))`;
          const Icon = (PORTAL_META[p.name] ?? PORTAL_META.EdenRadar).Icon;
          const suffix = p.name.slice(4);
          const fill = isActive ? (autoRunning ? progress : 1) : 0;
          return (
            <button
              key={p.name}
              role="tab"
              aria-selected={isActive}
              aria-label={p.name}
              onClick={() => goTo(i)}
              className="relative flex items-center gap-2 rounded-lg px-3.5 py-3 text-[15px] font-semibold transition-colors sm:px-5"
              style={{ color: isActive ? INK : "rgba(15,26,20,0.42)" }}
            >
              <Icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={2.25} style={{ color: isActive ? accent : "rgba(15,26,20,0.32)" }} />
              <span className="hidden sm:inline">
                Eden<span style={{ color: isActive ? accent : "inherit" }}>{suffix}</span>
              </span>
              <span className="sm:hidden">{suffix}</span>
              {/* progress / active underline */}
              <span aria-hidden className="pointer-events-none absolute inset-x-2 bottom-0 h-[2px] overflow-hidden rounded-full" style={{ background: isActive ? "rgba(15,26,20,0.08)" : "transparent" }}>
                <span
                  className="block h-full origin-left rounded-full"
                  style={{ background: accent, transform: `scaleX(${fill})`, transition: autoRunning ? "transform 80ms linear" : "transform 300ms ease-out" }}
                />
              </span>
            </button>
          );
        })}
      </div>

      {/* Slides (stacked, crossfade) */}
      <div className="grid overflow-hidden">
        {PRODUCTS.map((p, i) => (
          <Slide key={p.name} p={p} flip={i % 2 === 1} active={i === active} />
        ))}
      </div>
    </div>
  );
}
