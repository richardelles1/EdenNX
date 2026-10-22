import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { ink } from "@/components/PortalBits";
import { FRAMES, type Product } from "@/components/ProductShowcase";
import { Cta, Headline, Mark, Name, Terms } from "@/components/ProductCards";
import { FOUR, LOCKUP, ShowcaseStatements } from "@/components/HomeShowcase";

// Three dressed-up versions of the Statements proposal Rich picked. Same idea in
// each: every product is one line of display type, its headline, and one line is
// open at a time. What differs is what the open line gives you. Logos are only
// ever drawn at rest; motion is opacity, colour and layout. Preview only.
//
// Spotlight: the open line lights up and the rest step back; it opens onto the
//   product's own screen beside its capabilities.
// Ledger: numbered like an index, with a rule in the product's colour that grows
//   under the open line, and the terms set in the margin.
// Stage: the lines stay a list on the left; the right is one stage that shows the
//   open product's full logo and capabilities, swapped by cross-fade.

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

// What the product shows of itself: its first screenshot where it markets with
// one, otherwise its full logo, held still.
function Visual({ p }: { p: Product }) {
  const shot = FRAMES[p.name]?.find((f): f is { img: string } => "img" in f);
  if (shot) {
    return (
      <div className="overflow-hidden rounded-xl border border-foreground/10 bg-white shadow-[0_24px_60px_-28px_rgba(15,26,20,0.35)]">
        <img src={shot.img} alt="" decoding="async" loading="lazy" className="block w-full" />
      </div>
    );
  }
  const l = LOCKUP[p.name];
  return (
    <div className="flex aspect-[4/3] items-center justify-center rounded-xl" style={{ background: `hsl(var(${p.token}) / 0.06)` }}>
      <img src={l.src} alt="" decoding="async" loading="lazy" style={{ height: l.h, width: "auto" }} />
    </div>
  );
}

function Panel({ open, id, children }: { open: boolean; id: string; children: ReactNode }) {
  return (
    <div id={id} role="region" className="grid" style={{ gridTemplateRows: open ? "1fr" : "0fr", transition: `grid-template-rows 0.5s ${EASE}` }}>
      <div className="overflow-hidden">
        <div style={{ opacity: open ? 1 : 0, transition: `opacity 0.35s ${EASE}` }}>{children}</div>
      </div>
    </div>
  );
}

function CapList({ p, cols }: { p: Product; cols: string }) {
  return (
    <dl className={`grid gap-x-8 ${cols}`}>
      {(p.capabilities ?? []).map((c) => (
        <div key={c.label} className="border-t border-foreground/10 py-3">
          <dt className="text-[14.5px] font-semibold text-foreground">{c.label}</dt>
          <dd className="mt-0.5 text-[13.5px] leading-relaxed text-foreground/70">{c.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

/* -------------------------------- Spotlight ------------------------------- */

export function StatementsSpotlight() {
  const [open, setOpen] = useState<string>(FOUR[0].name);
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8" data-testid="statements-spotlight">
      {FOUR.map((p) => {
        const on = open === p.name;
        const id = `spot-${p.name.toLowerCase()}`;
        return (
          <div key={p.name} className="border-t border-foreground/12 last:border-b">
            <button
              type="button"
              aria-expanded={on}
              aria-controls={id}
              onClick={() => setOpen(p.name)}
              onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setOpen(p.name)}
              className="grid w-full items-center gap-4 py-7 text-left lg:grid-cols-[200px_1fr] lg:py-9"
              style={{ opacity: on ? 1 : 0.38, transition: `opacity 0.3s ${EASE}` }}
            >
              <span className="flex items-center gap-3">
                <Mark p={p} size={30} />
                <Name p={p} cls="text-[16px]" />
              </span>
              <Headline p={p} cls="max-w-[26ch] text-[1.75rem] leading-[1.08] tracking-[-0.03em] lg:text-[2.75rem]" />
            </button>
            <Panel open={on} id={id}>
              <div className="grid gap-10 pb-12 lg:grid-cols-[200px_1fr_1fr] lg:gap-12">
                <div className="lg:col-start-2">
                  <p className="text-[17px] leading-[1.6] text-foreground/75">{p.sub}</p>
                  <div className="mt-6"><CapList p={p} cols="sm:grid-cols-2" /></div>
                  <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2"><Cta p={p} /><Terms p={p} /></div>
                </div>
                <Visual p={p} />
              </div>
            </Panel>
          </div>
        );
      })}
    </div>
  );
}

/* --------------------------------- Ledger --------------------------------- */

export function StatementsLedger() {
  const [open, setOpen] = useState<string | null>(FOUR[0].name);
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8" data-testid="statements-ledger">
      {FOUR.map((p, i) => {
        const on = open === p.name;
        const id = `ledger-${p.name.toLowerCase()}`;
        const color = ink(p.goldToken ?? p.token);
        return (
          <div key={p.name} className="relative border-t border-foreground/12">
            {/* The product's rule, drawn across the top of the open line. */}
            <span
              aria-hidden
              className="absolute -top-px left-0 h-[2px] w-full origin-left"
              style={{ background: color, transform: on ? "scaleX(1)" : "scaleX(0)", transition: `transform 0.7s ${EASE}` }}
            />
            <button
              type="button"
              aria-expanded={on}
              aria-controls={id}
              onClick={() => setOpen(on ? null : p.name)}
              className="group grid w-full grid-cols-[48px_1fr] items-baseline gap-x-4 py-8 text-left lg:grid-cols-[88px_1fr_220px] lg:py-10"
            >
              <span className="font-mono text-[15px] text-foreground/55 lg:text-[18px]" style={{ color: on ? color : undefined }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <Headline p={p} cls="max-w-[24ch] text-[1.8rem] leading-[1.06] tracking-[-0.035em] lg:text-[3.1rem]" />
              <span className="col-start-2 mt-4 flex items-center gap-3 lg:col-start-3 lg:mt-0 lg:justify-end">
                <Name p={p} cls="text-[15px]" />
                <Mark p={p} size={28} />
              </span>
            </button>
            <Panel open={on} id={id}>
              <div className="grid gap-8 pb-12 lg:grid-cols-[88px_1fr_220px] lg:gap-x-4">
                <div className="lg:col-start-2 lg:pr-12">
                  <p className="max-w-[60ch] text-[17px] leading-[1.6] text-foreground/75">{p.sub}</p>
                  <div className="mt-6"><CapList p={p} cols="sm:grid-cols-2 lg:grid-cols-4" /></div>
                </div>
                {/* The margin: terms and the way in, set apart like a ledger's totals. */}
                <div className="flex flex-col gap-3 border-t border-foreground/10 pt-3 lg:items-end lg:border-t-0 lg:pt-1 lg:text-right">
                  <Terms p={p} />
                  <Cta p={p} />
                </div>
              </div>
            </Panel>
          </div>
        );
      })}
      <div className="border-t border-foreground/12" />
    </div>
  );
}

/* ---------------------------------- Stage --------------------------------- */

// Desktop only; below lg there is no room beside the list, so phones and
// tablets get the original Statements.
export function StatementsStage() {
  return (
    <>
      <div className="lg:hidden"><ShowcaseStatements /></div>
      <div className="hidden lg:block"><Stage /></div>
    </>
  );
}

function Stage() {
  const [open, setOpen] = useState<string>(FOUR[0].name);
  // Hover intent: a pointer crossing other lines on its way to the card should
  // not swap the product, so a hover only takes after it rests for 140ms.
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  const hover = (name: string) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    cancel();
    timer.current = setTimeout(() => setOpen(name), 140);
  };
  useEffect(() => cancel, []);
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-[1.1fr_1fr] gap-16 px-8" data-testid="statements-stage">
      <div>
        {FOUR.map((p) => {
          const on = open === p.name;
          return (
            <button
              key={p.name}
              type="button"
              aria-pressed={on}
              onClick={() => setOpen(p.name)}
              onMouseEnter={() => hover(p.name)}
              onMouseLeave={cancel}
              onFocus={() => setOpen(p.name)}
              className="block w-full border-t border-foreground/12 py-7 text-left last:border-b"
            >
              <span className="flex items-center gap-3" style={{ opacity: on ? 1 : 0.5, transition: `opacity 0.3s ${EASE}` }}>
                <Name p={p} cls="text-[15px]" />
                <ArrowUpRight aria-hidden className="ml-auto h-4 w-4 text-foreground/60" style={{ opacity: on ? 1 : 0, transition: `opacity 0.3s ${EASE}` }} />
              </span>
              <span className="mt-3 block" style={{ opacity: on ? 1 : 0.38, transition: `opacity 0.3s ${EASE}` }}>
                <Headline p={p} cls="max-w-[22ch] text-[1.6rem] leading-[1.08] tracking-[-0.03em] lg:text-[2.3rem]" />
              </span>
            </button>
          );
        })}
      </div>

      {/* One stage, every product layered in it; the open one is shown. Each
          layer is in the page, so the stage never jumps in height. */}
      <div className="grid self-start" aria-live="polite">
        {FOUR.map((p) => {
          const on = open === p.name;
          const l = LOCKUP[p.name];

          return (
            <div
              key={p.name}
              aria-hidden={!on}
              className="col-start-1 row-start-1 overflow-hidden rounded-[22px] border border-foreground/[0.08] bg-white shadow-[0_1px_2px_rgba(15,26,20,0.04),0_30px_60px_-30px_rgba(15,26,20,0.25)]"
              style={{
                opacity: on ? 1 : 0,
                transform: on ? "none" : "translateY(6px)",
                visibility: on ? "visible" : "hidden",
                transition: `opacity 0.4s ${EASE}, transform 0.4s ${EASE}, visibility 0.4s`,
              }}
            >
              {/* Still: it sits centred against the list rather than following
                  the scroll. The logo has its own band, faintly in the
                  product's colour, so the card reads as that product's page. */}
              <div className="flex h-[200px] items-center justify-center border-b border-foreground/[0.06]" style={{ background: `hsl(var(${p.token}) / 0.05)` }}>
                <img src={l.src} alt={p.name} decoding="async" style={{ height: Math.round(l.h * 0.78), width: "auto" }} />
              </div>
              <div className="p-9">
                <p className="text-[16px] leading-[1.6] text-foreground/75">{p.sub}</p>
                <ol className="mt-7 space-y-4">
                  {(p.capabilities ?? []).slice(0, 4).map((c, k) => (
                    <li key={c.label} className="grid grid-cols-[28px_1fr] gap-x-2">
                      <span className="pt-0.5 font-mono text-[12px]" style={{ color: ink(p.goldToken ?? p.token) }}>{String(k + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="block text-[15px] font-semibold text-foreground">{c.label}</span>
                        <span className="mt-0.5 block text-[13.5px] leading-relaxed text-foreground/70">{c.detail}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-foreground/[0.07] pt-6">
                  <Cta p={p} />
                  <Terms p={p} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
