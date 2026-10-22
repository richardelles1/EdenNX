import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ink } from "@/components/PortalBits";
import { MARKS, markStyle } from "@/lib/products";
import { LOCKUP_VIEWBOX, RADAR_TOP, RADAR_BOTTOM, WORDMARK_EDEN, WORDMARK_RADAR, TAGLINE } from "@/lib/radarLockup";
import { PRODUCTS, FRAMES, SHOT_GROUND, useShotReveal, type Product } from "@/components/ProductShowcase";

// Two redesigns of the product cards, same content as ProductShowcase (headline,
// sub, CTA, terms, eight capabilities, three emerging products). Preview only:
// Rich picks one, and the winner replaces ProductShowcase.
//
// What both drop from the current cards: the tinted wash on every card and
// tile, the boxed capability tiles inside the box of the card, the icon in a
// tinted rounded square beside a second mark at the top right, the press-in
// hover, and the dot-grid ground. Colour is kept to the mark and the accent
// words of each headline, so it means "this product" rather than decoration.
//
// A, Index: no cards at all. Each product is a row of an index, divided by one
// hairline, with the copy on the left and the capabilities as a definition list.
// B, Sheet: one quiet white surface per product, a single border, the
// capabilities as a numbered list, and the product's own screens on hover.

const FLAGSHIPS = [PRODUCTS.radar, PRODUCTS.compliance, PRODUCTS.trials, PRODUCTS.br];
const EMERGING = [PRODUCTS.market, PRODUCTS.lab, PRODUCTS.discovery];

function Mark({ p, size }: { p: Product; size: number }) {
  const [failed, setFailed] = useState(false);
  const src = MARKS[p.name];
  if (!src || failed) return null;
  return (
    <img src={src} alt="" aria-hidden decoding="async" onError={() => setFailed(true)} className="flex-shrink-0 object-contain" style={markStyle(p.name, size)} />
  );
}

function Name({ p, cls }: { p: Product; cls: string }) {
  return (
    <span className={`font-semibold tracking-tight text-foreground ${cls}`}>
      Eden<span style={{ color: ink(p.token) }}>{p.name.slice(4)}</span>
    </span>
  );
}

function Headline({ p, cls }: { p: Product; cls: string }) {
  return (
    <h3 className={`text-balance font-bold text-foreground ${cls}`}>
      {p.headline.pre}
      <span style={{ color: ink(p.goldToken ?? p.token) }}>{p.headline.accent}</span>
      {p.headline.post}
    </h3>
  );
}

// The CTA as a text link, not a pill: the card is no longer one big button, so
// the action is the one thing on it that moves.
function Cta({ p }: { p: Product }) {
  const color = ink(p.goldToken ?? p.token);
  if (p.beta) {
    return <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground/65">In Beta</span>;
  }
  const inner = (
    <>
      {p.cta.label}
      <ArrowUpRight aria-hidden className="cta-arrow h-4 w-4" />
    </>
  );
  const cls = "cta-link inline-flex items-center gap-1 text-[15px] font-semibold";
  return p.cta.external ? (
    <a href={p.cta.href} target="_blank" rel="noopener noreferrer" className={cls} style={{ color }}>{inner}</a>
  ) : (
    <Link to={p.cta.href} className={cls} style={{ color }}>{inner}</Link>
  );
}

function Terms({ p }: { p: Product }) {
  if (!p.note || p.beta) return null;
  return <span className="font-mono text-[13.5px] text-foreground/65">{p.note}</span>;
}

/* ------------------------------- A: Index -------------------------------- */

function Capabilities({ p }: { p: Product }) {
  return (
    <dl className="grid gap-x-10 sm:grid-cols-2">
      {(p.capabilities ?? []).map((c) => (
        <div key={c.label} className="border-t border-foreground/10 py-4">
          <dt className="text-[15px] font-semibold leading-snug text-foreground">{c.label}</dt>
          <dd className="mt-1 text-[14px] leading-relaxed text-foreground/70">{c.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

// `pinned` rows mount after the page's scroll-reveal observer has run, so they
// are drawn visible rather than waiting for a reveal that never comes.
function IndexRow({ p, right, pinned = false }: { p: Product; right?: ReactNode; pinned?: boolean }) {
  return (
    <article className={`ix-row ${pinned ? "visible" : "reveal"} grid gap-10 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20`} data-testid={`ix-${p.name.toLowerCase()}`}>
      <div className="lg:col-span-5">
        <div className="flex items-center gap-3">
          <Mark p={p} size={40} />
          <Name p={p} cls="text-[18px]" />
        </div>
        <Headline p={p} cls="mt-7 max-w-[17ch] text-[2rem] leading-[1.06] tracking-[-0.03em] lg:text-[2.55rem]" />
        <p className="mt-5 max-w-[42ch] text-[17px] leading-[1.6] text-foreground/75">{p.sub}</p>
        <div className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <Cta p={p} />
          <Terms p={p} />
        </div>
      </div>
      <div className="relative lg:col-span-7 lg:pt-2">{right ?? <Capabilities p={p} />}</div>
    </article>
  );
}

/* ---------------------- A: EdenRadar lockup reveal ----------------------- */

// The EdenRadar lockup, drawn live so each part can move on its own: the dot
// globe's two domes, the wordmark, and the line under it, from Amelia's layered
// lockup (generated into radarLockup.ts by scripts/make-radar-dots.mjs).
// `t` runs 0 (lockup whole) to 1 (lockup gone): the domes part up and down, and
// the wordmark fades and settles, opening the way the features come in.
function RadarLockup({ t }: { t: number }) {
  const part = t * 270;
  // The wordmark is gone before the features are legible, so the two never sit
  // on top of each other at half strength.
  const fade = Math.max(0, 1 - t * 3);
  const domes = Math.max(0, 1 - t * 1.25);
  const dome = (dots: [number, number, number][]) => dots.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} />);
  return (
    <svg viewBox={LOCKUP_VIEWBOX} className="pointer-events-none absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 overflow-visible" aria-hidden>
      <g fill="#257349">
        <g style={{ transform: `translateY(${-part}px)`, opacity: domes }}>{dome(RADAR_TOP)}</g>
        <g style={{ transform: `translateY(${part}px)`, opacity: domes }}>{dome(RADAR_BOTTOM)}</g>
      </g>
      <g style={{ opacity: fade, transform: `scale(${1 - t * 0.06})`, transformOrigin: "1000px 1000px" }}>
        <path fill="#222222" d={WORDMARK_EDEN} />
        <path fill="#257349" d={WORDMARK_RADAR} />
        <path fill="#257349" d={TAGLINE} />
      </g>
    </svg>
  );
}

// Pins the EdenRadar row while the page scrolls through 130% of a screen, and
// maps that scroll to the reveal. Scroll-linked rather than timed, so the reader
// drives it and can stop or reverse it. Desktop with motion allowed only: on a
// phone, or with reduced motion, it is the plain row. The features are in the
// page throughout (only clipped), so assistive tech reads them at any point.
function RadarRevealRow({ p }: { p: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [t, setT] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setOn(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!on) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      // Hold the whole lockup for the first 15% of the pin, open across the
      // next 60%, then hold the features before the row lets go.
      const raw = Math.min(1, Math.max(0, (-r.top / span - 0.15) / 0.6));
      setT(raw * raw * (3 - 2 * raw));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [on]);

  if (!on) return <IndexRow p={p} />;
  const open = 50 * (1 - t);
  return (
    <div ref={ref} style={{ height: "230vh" }} data-testid="radar-reveal">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="w-full">
          <IndexRow
            p={p}
            pinned
            right={
              <>
                <div style={{ clipPath: `inset(${open}% 0 ${open}% 0)`, opacity: Math.min(1, Math.max(0, (t - 0.3) / 0.5)) }}>
                  <Capabilities p={p} />
                </div>
                <RadarLockup t={t} />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}

function IndexEmerging() {
  return (
    <section className="ix-row reveal py-14 lg:py-20" aria-labelledby="ix-emerging">
      <h3 id="ix-emerging" className="text-[12px] font-semibold uppercase tracking-[0.16em] text-foreground/65">Emerging</h3>
      <div className="mt-8 grid gap-12 md:grid-cols-3 md:gap-10">
        {EMERGING.map((p) => (
          <div key={p.name}>
            <Name p={p} cls="text-[17px]" />
            <Headline p={p} cls="mt-4 text-[1.4rem] leading-[1.15] tracking-[-0.02em]" />
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/75">{p.sub}</p>
            <ul className="mt-5 space-y-2 text-[14px] text-foreground/75">
              {(p.features ?? []).map((f) => (
                <li key={f} className="flex items-baseline gap-3">
                  <span aria-hidden className="h-px w-3 flex-shrink-0 translate-y-[-4px]" style={{ background: ink(p.token) }} />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <Cta p={p} />
              <Terms p={p} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProductCardsA() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8" data-testid="cards-a">
      {FLAGSHIPS.map((p) => (p === PRODUCTS.radar ? <RadarRevealRow key={p.name} p={p} /> : <IndexRow key={p.name} p={p} />))}
      <IndexEmerging />
    </div>
  );
}

/* ------------------------------- B: Sheet -------------------------------- */

function SheetCard({ p }: { p: Product }) {
  const caps = p.capabilities ?? [];
  const shots = FRAMES[p.name] ?? [];
  const { revealed, index, onEnter, onLeave } = useShotReveal(shots.length);
  return (
    <article
      className="sheet-card flex flex-col overflow-hidden rounded-[20px] border bg-white"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      data-testid={`sheet-${p.name.toLowerCase()}`}
    >
      <div className="p-8 lg:p-10">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-3">
            <Mark p={p} size={36} />
            <Name p={p} cls="text-[17px]" />
          </span>
          {p.beta ? (
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground/65">Beta</span>
          ) : (
            <Terms p={p} />
          )}
        </div>
        <Headline p={p} cls="mt-8 max-w-[18ch] text-[1.85rem] leading-[1.08] tracking-[-0.028em] lg:text-[2.2rem]" />
        <p className="mt-4 max-w-[44ch] text-[16px] leading-[1.6] text-foreground/75">{p.sub}</p>
        {!p.beta && (
          <div className="mt-6">
            <Cta p={p} />
          </div>
        )}
      </div>

      {/* Fixed height on desktop so the two floors in a row start on one line. */}
      <div className="relative mt-auto border-t border-foreground/[0.08] lg:h-[372px]">
        <ol
          className="grid h-full gap-x-8 px-8 py-6 transition-opacity duration-300 sm:grid-cols-2 lg:px-10"
          style={{ opacity: revealed ? 0 : 1, transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
        >
          {caps.map((c, i) => (
            <li key={c.label} className="flex gap-3 border-b border-foreground/[0.07] py-3 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0">
              <span className="w-5 flex-shrink-0 pt-px font-mono text-[12px] text-foreground/65">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="block text-[14.5px] font-semibold leading-snug text-foreground">{c.label}</span>
                <span className="mt-0.5 block text-[13.5px] leading-snug text-foreground/70">{c.detail}</span>
              </span>
            </li>
          ))}
        </ol>

        {/* The product's own screens, on hover only, over the list. */}
        {shots.map((frame, i) => (
          <div
            key={i}
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500"
            style={{
              opacity: revealed && i === index ? 1 : 0,
              background: SHOT_GROUND[p.name] ?? "#eef2f0",
              padding: "img" in frame ? 0 : 18,
              transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            {"img" in frame ? (
              <img src={frame.img} alt="" decoding="async" loading={i === 0 ? "eager" : "lazy"} className="max-h-full max-w-full" style={{ objectFit: "contain" }} />
            ) : (
              frame.node
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

function SheetEmerging() {
  return (
    <section className="rounded-[20px] border border-foreground/[0.09] bg-white" aria-labelledby="sheet-emerging">
      <h3 id="sheet-emerging" className="px-8 pt-7 text-[12px] font-semibold uppercase tracking-[0.16em] text-foreground/65 lg:px-10">
        Emerging
      </h3>
      <div className="grid divide-y divide-foreground/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
        {EMERGING.map((p) => (
          <div key={p.name} className="px-8 py-7 lg:px-10 lg:pb-9">
            <Name p={p} cls="text-[16px]" />
            <Headline p={p} cls="mt-3 text-[1.3rem] leading-[1.15] tracking-[-0.02em]" />
            <p className="mt-3 text-[14.5px] leading-relaxed text-foreground/75">{p.sub}</p>
            <p className="mt-4 text-[13.5px] leading-relaxed text-foreground/70">{(p.features ?? []).join(". ")}.</p>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <Cta p={p} />
              <Terms p={p} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProductCardsB() {
  return (
    <div className="mx-auto max-w-7xl space-y-5 px-6 lg:space-y-6 lg:px-8" data-testid="cards-b">
      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        <SheetCard p={PRODUCTS.radar} />
        <SheetCard p={PRODUCTS.compliance} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        <SheetCard p={PRODUCTS.trials} />
        <SheetCard p={PRODUCTS.br} />
      </div>
      <SheetEmerging />
    </div>
  );
}
