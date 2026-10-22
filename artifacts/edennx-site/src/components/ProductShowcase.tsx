import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { PORTAL_META, ink } from "@/components/PortalBits";
import { RecordLedger, VendorRegister } from "@/components/ComplianceVignettes";
import { MARKS, markStyle } from "@/lib/products";
import { ASSET_COUNT_LABEL } from "@/lib/platformStats";

// The home Product Suite as an asymmetric bento. Each card carries a slight wash
// of its product's accent, presses in on hover like a button, and leads with a
// large wordmark. EdenRadar and EdenCompliance are equal flagships: the card floor
// carries a 2x2 grid of capability tiles at rest, and the real product screenshot
// cross-fades over them on hover. The three smaller products lead with a checklist.
//
// The screenshot reveal is gated behind `@media (hover: hover)` so it never fires
// on touch, where a :hover state would stick. Nothing load-bearing lives behind
// the hover: the tiles carry the meaning, the screenshot is the reward.

export type Capability = { label: string; detail: string };

export type Product = {
  name: string;
  token: string;
  goldToken?: string;
  headline: { pre: string; accent: string; post: string };
  sub: string;
  note: string;
  features?: string[];
  capabilities?: Capability[];
  cta: { label: string; href: string; external: boolean };
  beta?: boolean; // Beta: no link yet, the card is not clickable
};

export const PRODUCTS: Record<string, Product> = {
  radar: {
    name: "EdenRadar", token: "--portal-radar",
    headline: { pre: "The next biotech breakthrough is ", accent: "already published.", post: "" },
    sub: "Real-time monitoring of university tech transfer offices means the right assets find you first.",
    note: "$499/seat/mo",
    // Sourced from edenradar.com/how-it-works (HIW_STEPS in the EdenRadar repo).
    capabilities: [
      { label: "Deepest TTO index", detail: `${ASSET_COUNT_LABEL} university assets, plus patents, trials, and literature` },
      { label: "Precision filters", detail: "6 development stages, 10 modalities, 32 biology categories" },
      { label: "Fit scoring", detail: "Ranked against your buyer profile, not keyword match" },
      { label: "Asset dossiers", detail: "Commercial thesis, competitive position, IP and deal readiness" },
      { label: "Whitespace map", detail: "Asset density across every biology and modality, daily" },
      { label: "Pipeline board", detail: "Watching to In Discussion, with score and notes on each card" },
      { label: "Standing alerts", detail: "Real-time, daily, or weekly on matches and stage changes" },
      { label: "EDEN Chat", detail: "Natural language search across the full catalog" },
    ],
    cta: { label: "Explore EdenRadar", href: "https://edenradar.com", external: true },
  },
  compliance: {
    name: "EdenCompliance", token: "--portal-compliance", goldToken: "--portal-compliance-gold",
    headline: { pre: "Vendor qualification and audits, on ", accent: "one controlled record.", post: "" },
    sub: "Qualify vendors, run the audit program, and keep every change signed and unalterable.",
    note: "From $299/mo",
    // Sourced from edencompliance.com/features (shared/capabilities.ts in the
    // EdenCompliance repo), one per pillar: vendor, audit, collaboration,
    // intelligence, platform.
    capabilities: [
      { label: "Vendor register", detail: "Type, service, location, and status at a glance" },
      { label: "Qualification tracking", detail: "Status and expiry per vendor, per framework" },
      { label: "Risk-based planner", detail: "Next audit proposed from risk tier and last audit" },
      { label: "Findings management", detail: "Logged and classified by severity on the record" },
      { label: "Vendor portal", detail: "A private portal per vendor, no account needed" },
      { label: "Regulation Watch", detail: "FDA and MHRA actions matched to your vendors, daily" },
      { label: "Append-only trail", detail: "Who, when, and the before and after, on every change" },
      { label: "Electronic sign-off", detail: "Re-authenticate to approve a vendor or lock an audit" },
    ],
    cta: { label: "Explore EdenCompliance", href: "https://edencompliance.com", external: true },
  },
  trials: {
    name: "EdenTrials", token: "--portal-trials",
    // edentrials.com's own hero (client/src/pages/Landing.tsx in the EdenTrials repo).
    headline: { pre: "A live, global ", accent: "clinical trial network.", post: "" },
    sub: "Every trial the world is running, and everything attached to it.",
    note: "",
    // Sourced from the portal's own navigation and screen copy (PORTAL_NAV in
    // the EdenTrials repo, client/src/components/portal/PortalShell.tsx).
    capabilities: [
      { label: "The Record", detail: "Everything that arrived, and everything that moved" },
      { label: "Changes recorded", detail: "Every difference between one reading of a trial and the next" },
      { label: "Alerts", detail: "Save the question, and a trial that fits later is caught" },
      { label: "Search", detail: "Every captured field, by area, phase, status, country and registry" },
      { label: "Registry", detail: "A page for every company, sponsor, molecule and country" },
      { label: "Insights", detail: "The whole corpus counted, with a live board by term or filter" },
      { label: "Ask Eden", detail: "Questions in words, answered from the corpus, trials cited" },
      { label: "Report", detail: "Name a field once, then read it written up or cut it yourself" },
    ],
    cta: { label: "Explore EdenTrials", href: "https://edentrials.com", external: true },
  },
  br: {
    name: "EdenBR", token: "--portal-br", beta: true,
    headline: { pre: "Where a batch sits, ", accent: "never the release decision.", post: "" },
    sub: "EdenBR tracks where a batch sits. The release decision stays with the people accountable for it.",
    note: "Beta",
    // Sourced from the app's own navigation (PINNED and NAV_GROUPS in the
    // EdenBR repo, src/components/app/AppShell.tsx). Reviewer queue, schedule
    // and tasks are views of the Command Center there, not screens, so they
    // are not listed as separate capabilities.
    capabilities: [
      { label: "Command Center", detail: "A board of every batch and where it stands" },
      { label: "Needs attention", detail: "What is waiting or overdue, surfaced first" },
      { label: "Quality events", detail: "Quality events, on their own screen" },
      { label: "Manufacturers and campaigns", detail: "Batches by manufacturer, campaign, product and component" },
      { label: "History", detail: "A dated record of what happened to each batch" },
      { label: "Reports and brief", detail: "Batch reports, and a monthly brief" },
      { label: "Alerts", detail: "Every alert in one place" },
      { label: "Eden AI", detail: "Narrates only what is in your records" },
    ],
    cta: { label: "In Beta", href: "", external: false },
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

// What each product already shows on its own marketing site, so the card never
// invents a view the product itself does not present.
//
// EdenRadar markets with screenshots: three of the five on its how-it-works page
// are used, matching three of the tiles. EdenCompliance markets with one
// screenshot plus designed vignettes, so its frames mix the two: the program
// dashboard, then its own record and register vignettes, ported in
// ComplianceVignettes.
export type Frame = { img: string } | { node: ReactNode };

export const FRAMES: Record<string, Frame[]> = {
  EdenRadar: [
    { img: "/images/shot-radar-1.jpg" },
    { img: "/images/shot-radar-2.jpg" },
    { img: "/images/shot-radar-3.jpg" },
  ],
  EdenCompliance: [
    { img: "/images/shot-compliance-1.jpg" },
    { node: <RecordLedger /> },
    { node: <VendorRegister /> },
  ],
};

// Shots are shown contained rather than cover-cropped, so a frame is never
// sliced through a chart, a row, or a word. Each sits on the ground its own UI
// uses, so the letterboxing reads as the app's own canvas rather than a gap.
export const SHOT_GROUND: Record<string, string> = {
  EdenRadar: "#eef2f0",
  EdenCompliance: "#0b1a12",
};

const REVEAL_MS = 600; // hold the tiles briefly, so the reveal reads as intent
const CYCLE_MS = 2600; // long enough to take a shot in before the next one

// A cursor merely crossing a card should not strobe the screenshot in and out.
// Hold the tiles for a beat first, so the reveal reads as intent rather than
// an accident; reverting stays instant so leaving the card feels immediate.

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
function CardLink({
  p,
  className = "",
  children,
  onEnter,
  onLeave,
}: {
  p: Product;
  className?: string;
  children: ReactNode;
  onEnter?: () => void;
  onLeave?: () => void;
}) {
  const cls = `group relative flex flex-col overflow-hidden rounded-[26px] ${PRESS} ${className}`;
  // Focus mirrors hover so the reveal is reachable from the keyboard too.
  const handlers = {
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onFocus: onEnter,
    onBlur: onLeave,
  };
  if (p.beta) {
    return <div className={cls.replace(PRESS, "")} style={cardStyle(p)}>{children}</div>;
  }
  return p.cta.external ? (
    <a href={p.cta.href} target="_blank" rel="noopener noreferrer" className={cls} style={cardStyle(p)} {...handlers}>{children}</a>
  ) : (
    <Link to={p.cta.href} className={cls} style={cardStyle(p)} {...handlers}>{children}</Link>
  );
}

function Wordmark({ p }: { p: Product }) {
  const accent = ink(p.token);
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

// The product's mark at the card's top right, where the Preview pill sits.
// Products with a transparent mark show it; the rest keep their existing icon.
function CornerMark({ p }: { p: Product }) {
  const [failed, setFailed] = useState(false);
  const src = MARKS[p.name];
  const accent = ink(p.token);
  const Icon = (PORTAL_META[p.name] ?? PORTAL_META.EdenRadar).Icon;
  if (src && !failed) {
    return <img src={src} alt="" aria-hidden decoding="async" onError={() => setFailed(true)} className="flex-shrink-0 object-contain" style={markStyle(p.name, 56)} />;
  }
  return (
    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: `hsl(var(${p.token}) / 0.12)`, border: `1px solid hsl(var(${p.token}) / 0.2)` }}>
      <Icon className="h-6 w-6" strokeWidth={2.25} style={{ color: accent }} />
    </span>
  );
}

function Headline({ p, cls }: { p: Product; cls: string }) {
  const headlineAccent = ink(p.goldToken ?? p.token);
  return (
    <h3 className={`text-balance font-black leading-[1.08] tracking-tight ${cls}`}>
      <span style={{ color: INK }}>{p.headline.pre}</span>
      <span style={{ color: headlineAccent }}>{p.headline.accent}</span>
      <span style={{ color: INK }}>{p.headline.post}</span>
    </h3>
  );
}

function CtaRow({ p }: { p: Product }) {
  const headlineAccent = ink(p.goldToken ?? p.token);
  if (p.beta) {
    return (
      <div className="mt-5 flex items-center gap-3">
        <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider" style={{ background: `hsl(var(${p.token}) / 0.12)`, color: headlineAccent }}>Beta</span>
      </div>
    );
  }
  return (
    <div className="mt-5 flex items-center gap-3">
      <span className="inline-flex items-center gap-1 text-[14px] font-semibold transition-[gap] group-hover:gap-2" style={{ color: headlineAccent }}>
        {p.cta.label} <ArrowUpRight className="h-4 w-4" />
      </span>
      <span className="font-mono text-[14px] font-medium" style={{ color: BODY }}>{p.note}</span>
    </div>
  );
}

// One capability: a short accent rule, a bold label, a supporting line.
//
// The icons are gone. Each tile used to carry a Lucide glyph in a tinted
// square, which meant sixteen of them across the two flagships, chosen for
// availability rather than meaning: an antenna for the index, a grid for the
// whitespace map, a kanban square for the pipeline. Nobody reads those as
// anything, and at 15px they are a smudge of colour beside the label that does
// the actual work. The rule marks the tile and carries the product's colour,
// which is the same treatment the Products page tiles use, so the two pages
// now describe a capability the same way.
function CapabilityTile({ p, c }: { p: Product; c: Capability }) {
  const rule = p.goldToken ? `hsl(var(${p.goldToken}))` : `hsl(var(${p.token}))`;
  return (
    <div
      className="rounded-xl px-3.5 py-3"
      style={{
        background: `hsl(var(${p.token}) / 0.06)`,
        border: `1px solid hsl(var(${p.token}) / 0.18)`,
      }}
    >
      <span aria-hidden className="mb-2.5 block h-[2px] w-7 rounded-full" style={{ background: rule }} />
      <span className="block text-[12.5px] font-bold leading-tight" style={{ color: INK }}>{c.label}</span>
      <span className="mt-1 block text-[11.5px] leading-snug" style={{ color: NOTE }}>{c.detail}</span>
    </div>
  );
}

// Drives the floor: holds the tiles for REVEAL_MS on hover, then dissolves to the
// screenshots and steps through them. Hover capability is checked at run time
// rather than in CSS because the timer has to be started and stopped too; on
// touch none of this arms, and the tiles simply stay.
export function useShotReveal(count: number) {
  const [revealed, setRevealed] = useState(false);
  const [index, setIndex] = useState(0);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (cycleTimer.current) clearInterval(cycleTimer.current);
    openTimer.current = null;
    cycleTimer.current = null;
  };

  useEffect(() => stop, []);

  const onEnter = () => {
    if (!count) return; // no screenshots to reveal: the tiles stay
    if (!window.matchMedia?.("(hover: hover)").matches) return;
    stop();
    openTimer.current = setTimeout(() => {
      setRevealed(true);
      // Stepping through frames on a timer is motion; honor the preference.
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (count > 1 && !reduced) {
        cycleTimer.current = setInterval(() => setIndex((i) => (i + 1) % count), CYCLE_MS);
      }
    }, REVEAL_MS);
  };

  const onLeave = () => {
    stop();
    setRevealed(false);
    setIndex(0);
  };

  return { revealed, index, onEnter, onLeave };
}

// Big flagship tile: copy on top, capability grid along the floor, and the real
// screenshots cross-fading over that grid on hover. Both tiles are the same
// height so both floors start at the same line.
function BigTile({ p }: { p: Product }) {
  const caps = p.capabilities ?? [];
  const shots = FRAMES[p.name] ?? [];
  const { revealed, index, onEnter, onLeave } = useShotReveal(shots.length);
  return (
    <CardLink p={p} className="lg:min-h-[680px]" onEnter={onEnter} onLeave={onLeave}>
      <div className="relative z-10 p-8 lg:p-9">
        <div className="flex items-center justify-between gap-4">
          <Wordmark p={p} />
          <CornerMark p={p} />
        </div>
        <div className="mt-6"><Headline p={p} cls="text-[1.9rem] lg:text-[2.35rem] max-w-[16ch]" /></div>
        <p className="mt-4 max-w-[42ch] text-[16px] leading-relaxed" style={{ color: BODY }}>{p.sub}</p>
        <CtaRow p={p} />
      </div>

      <div
        // Fixed height on desktop so both flagship floors start on the same
        // line. On mobile the column is half the width, so a fixed height
        // squeezes eight tiles into a space built for a wider grid: let it grow
        // to its content there instead.
        className="relative mt-auto h-auto w-full overflow-hidden lg:h-[404px]"
        style={{ borderTop: "1px solid rgba(15,26,20,0.08)", background: `hsl(var(${p.token}) / 0.03)` }}
      >
        {/* Rest state: what the product actually does. Clears a little faster
            than the shot arrives, so the two states cross-dissolve instead of
            both sitting at half opacity. */}
        <div
          // Four fixed rows only at the width they were drawn for. Narrower than
          // that, the rows stay a fixed height while the wrapped text needs
          // more, so every tile spills over the one beneath it. One column on a
          // phone, two from sm, and the fixed 2x4 grid only from lg.
          className="grid h-full grid-cols-1 gap-2.5 p-5 transition-[opacity,transform] duration-[380ms] ease-out sm:grid-cols-2 lg:grid-rows-4"
          style={{ opacity: revealed ? 0 : 1, transform: revealed ? "scale(0.985)" : "scale(1)" }}
        >
          {caps.map((c) => (
            <CapabilityTile key={c.label} p={p} c={c} />
          ))}
        </div>

        {/* Hover state: the product's own screenshots, stacked and cross-faded.
            Each settles from a slight overscale so a step reads as a dissolve
            rather than a cut. */}
        {shots.map((frame, i) => (
          <div
            key={i}
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-500 ease-out"
            style={{
              opacity: revealed && i === index ? 1 : 0,
              transform: revealed && i === index ? "scale(1)" : "scale(1.04)",
              background: SHOT_GROUND[p.name] ?? "#eef2f0",
              // Vignettes are laid out, not scaled, so they need room to breathe.
              padding: "img" in frame ? 0 : 18,
            }}
          >
            {"img" in frame ? (
              <img
                src={frame.img}
                alt=""
                decoding="async"
                /* The first frame is never lazy: a lazy image that starts
                   fetching on hover reveals an empty floor. Later frames have
                   the reveal delay plus a full cycle before they are needed. */
                loading={i === 0 ? "eager" : "lazy"}
                /* Contained, not cropped: the whole frame is always visible. */
                className="max-h-full max-w-full"
                style={{ objectFit: "contain" }}
              />
            ) : (
              frame.node
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(118% 92% at 50% 38%, transparent 52%, rgba(6,16,11,0.30) 100%)",
              }}
            />
          </div>
        ))}

        {/* Which frame, of how many. Only earns its place when there is more
            than one shot to step through. */}
        {shots.length > 1 && (
          <div
            className="pointer-events-none absolute bottom-3.5 left-1/2 flex -translate-x-1/2 gap-1.5 transition-opacity duration-300"
            style={{ opacity: revealed ? 1 : 0 }}
          >
            {shots.map((_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 16 : 6,
                  background: i === index ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </CardLink>
  );
}

// Smaller product: leads with a feature checklist instead of a screenshot.
function MiniTile({ p }: { p: Product }) {
  const accent = ink(p.token);
  return (
    <CardLink p={p} className="min-h-[360px]">
      <div className="relative z-10 flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between gap-4">
          <Wordmark p={p} />
          <CornerMark p={p} />
        </div>
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
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
            <BigTile p={PRODUCTS.trials} />
            <BigTile p={PRODUCTS.br} />
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
