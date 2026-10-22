import { useState } from "react";
import { Plus } from "lucide-react";
import { ink } from "@/components/PortalBits";
import { type Product } from "@/components/ProductShowcase";
import { DETAIL } from "@/lib/productDetail";
import { Cta, FOUR, Headline, Mark, Name, Terms } from "@/components/ProductBits";

// The Statements dropdown (Rich's pick) with the slider's photographs: each line
// is the product's logo and tagline, and opening one shows its capabilities
// beside its photograph. On the home page.

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

// Opening a line shows the product's photograph beside four of its
// capabilities (DETAIL). A product without a photograph shows a tinted field
// with its mark.
function Features({ p, on }: { p: Product; on: boolean }) {
  const d = DETAIL[p.name];
  const accent = ink(p.goldToken ?? p.token);
  return (
    <div className="grid gap-10 pb-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
      <div className="lg:order-2">
        <div className="relative overflow-hidden rounded-2xl border" style={{ borderColor: `hsl(var(${p.token}) / 0.2)` }}>
          {d.photo ? (
            <img
              src={d.photo}
              alt={d.photoAlt}
              decoding="async"
              loading="lazy"
              className="aspect-[3/2] w-full"
              // Settles once as the line opens, then holds still.
              style={{
                objectFit: "cover",
                objectPosition: d.photoPosition,
                opacity: on ? 1 : 0,
                transform: on ? "scale(1)" : "scale(1.03)",
                transition: `opacity 0.6s ${EASE} 0.1s, transform 0.9s ${EASE} 0.1s`,
              }}
            />
          ) : (
            <div className="flex aspect-[3/2] w-full items-center justify-center" style={{ background: `hsl(var(${p.token}) / 0.07)` }}>
              <Mark p={p} size={96} />
            </div>
          )}
        </div>
      </div>
      <div className="lg:order-1">
        <p className="max-w-[48ch] text-[17px] leading-[1.6] text-foreground/75">{d.audience}</p>
        <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* Four, not six, so an open product leaves the others in view. */}
          {d.features.slice(0, 4).map((f) => (
            <div key={f.label}>
              <div aria-hidden className="h-[2px] w-8 rounded-full" style={{ background: accent }} />
              <dt className="mt-3 text-[15px] font-semibold text-foreground">{f.label}</dt>
              <dd className="mt-1 text-[13.5px] leading-relaxed text-foreground/70">{f.desc}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <Cta p={p} />
          <Terms p={p} />
        </div>
      </div>
    </div>
  );
}

// The full logos where the name is part of the artwork (Rich): EdenRadar's name
// over its dot globe, and EdenTrials' globe with the name through it. The
// others keep the mark beside the name.
const FULL: Record<string, { src: string; h: number }> = {
  EdenRadar: { src: "/images/logos/edenradar.png", h: 96 },
  EdenTrials: { src: "/images/logos/edentrials.png", h: 96 },
  EdenCompliance: { src: "/images/logos/edencompliance.png", h: 96 },
  EdenBR: { src: "/images/logos/edenbr.png", h: 96 },
};

export function ShowcaseFeatureDropdown() {
  const [open, setOpen] = useState<string | null>(null);
  // On a phone the opened line can start above the fold once the one above it
  // closes, so bring its headline to the top after the panels settle.
  const toggle = (name: string, on: boolean) => {
    setOpen(on ? null : name);
    if (on || !window.matchMedia("(max-width: 1023px)").matches) return;
    setTimeout(() => document.getElementById(`row-${name.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 480);
  };
  return (
    <div className="feat-list mx-auto max-w-7xl px-6 lg:px-8" data-testid="showcase-features">
      {/* Opens on click or tap only. Hover only lights a line: it takes its
          colour and the other closed lines step back, so the page never moves
          unless the reader asks it to (Rich, after trying scroll-open). */}
      {FOUR.map((p) => {
        const on = open === p.name;
        const id = `feat-${p.name.toLowerCase()}`;
        return (
          <div key={p.name} id={`row-${p.name.toLowerCase()}`} className="feat-row relative scroll-mt-24 border-t border-foreground/12" style={{ ["--accent" as string]: ink(p.goldToken ?? p.token) }}>
            {/* The open line carries its product's colour along its top edge. */}
            <span aria-hidden className="absolute -top-px left-0 h-[2px] w-full origin-left" style={{ background: "var(--accent)", transform: on ? "scaleX(1)" : "scaleX(0)", transition: `transform 0.7s ${EASE}` }} />
            <button
              type="button"
              aria-expanded={on}
              aria-controls={id}
              onClick={() => toggle(p.name, on)}
              className="stmt-row grid w-full grid-cols-[1fr_auto] items-center gap-6 py-8 text-left lg:min-h-[164px] lg:grid-cols-[260px_1fr_auto] lg:py-0"
            >
              <span className="flex h-[100px] items-center gap-3.5 lg:justify-center lg:pr-10">
                {FULL[p.name] ? (
                  <img src={FULL[p.name].src} alt={p.name} decoding="async" style={{ height: FULL[p.name].h, width: "auto" }} />
                ) : (
                  <>
                    <Mark p={p} size={p.name === "EdenCompliance" ? 56 : 44} />
                    <Name p={p} cls="text-[19px]" />
                  </>
                )}
              </span>
              <span className="col-span-2 row-start-2 lg:col-span-1 lg:row-start-auto">
                <Headline p={p} cls="max-w-[26ch] text-[1.7rem] leading-[1.08] tracking-[-0.03em] lg:text-[2.4rem]" />
              </span>
              <span
                aria-hidden
                className="feat-plus flex h-10 w-10 items-center justify-center rounded-full border"
                data-on={on}
                style={{ transform: on ? "rotate(45deg)" : "none" }}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <div id={id} role="region" className="stmt-panel grid" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <div style={{ opacity: on ? 1 : 0, transition: `opacity 0.35s ${EASE}` }}><Features p={p} on={on} /></div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="border-t border-foreground/12" />
    </div>
  );
}
