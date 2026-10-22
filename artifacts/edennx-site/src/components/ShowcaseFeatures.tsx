import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { ink } from "@/components/PortalBits";
import { SHOT_GROUND, type Product } from "@/components/ProductShowcase";
import { Cta, Headline, Mark, Name, Terms } from "@/components/ProductCards";
import { FOUR } from "@/components/HomeShowcase";

// The Statements dropdown (Rich's pick) with the product page's life in it: each
// line is the product's logo and tagline; opening one shows its features beside
// the product's own high-res screen for whichever feature is chosen. Screens are
// shown whole (contained on the app's own ground), never cropped, and swap by
// cross-fade only. Preview only.

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

// Feature label (as in the product's capabilities) to the screen that shows it.
// EdenTrials and EdenBR have no screens on file yet (asked of Finn and Beth), so
// they show their features alone until they land.
const SHOTS: Record<string, Record<string, string>> = {
  EdenRadar: {
    "Deepest TTO index": "/images/shot-radar-1.jpg", // fills the frame; the search-only shot letterboxed
    "Asset dossiers": "/images/shot-radar-dossier.jpg",
    "Whitespace map": "/images/shot-radar-whitespace.jpg",
    "Pipeline board": "/images/shot-radar-board.jpg",
    "Standing alerts": "/images/shot-radar-alerts.jpg",
  },
  EdenCompliance: {
    "Vendor register": "/images/shot-ec-register.jpg",
    "Qualification tracking": "/images/shot-compliance-1.jpg",
    "Findings management": "/images/shot-ec-findings.jpg",
    "Vendor portal": "/images/shot-ec-portal.jpg",
    "Append-only trail": "/images/shot-ec-record.jpg",
  },
};

function Features({ p }: { p: Product }) {
  const shots = SHOTS[p.name] ?? {};
  // With screens, list the features that have one; without, the first five.
  const caps = (p.capabilities ?? []).filter((c) => !Object.keys(shots).length || shots[c.label]).slice(0, 5);
  const [active, setActive] = useState(caps[0]?.label);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  // Hover intent, so sweeping down the list does not flick through screens.
  const hover = (label: string) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    cancel();
    timer.current = setTimeout(() => setActive(label), 120);
  };
  useEffect(() => cancel, []);
  const color = ink(p.goldToken ?? p.token);
  const hasShots = Object.keys(shots).length > 0;

  return (
    <div className={`grid gap-8 pb-14 ${hasShots ? "lg:grid-cols-[340px_1fr] lg:gap-12" : ""}`}>
      <div>
        <p className="max-w-[46ch] text-[16.5px] leading-[1.6] text-foreground/75">{p.sub}</p>
        <ul className={`mt-6 ${hasShots ? "" : "grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3"}`}>
          {caps.map((c) => {
            const on = hasShots && active === c.label;
            return (
              <li key={c.label}>
                <button
                  type="button"
                  disabled={!hasShots}
                  aria-pressed={hasShots ? on : undefined}
                  onClick={() => setActive(c.label)}
                  onFocus={() => setActive(c.label)}
                  onMouseEnter={() => hover(c.label)}
                  onMouseLeave={cancel}
                  className="block w-full rounded-xl px-4 py-3.5 text-left disabled:cursor-default"
                  style={{ background: on ? `hsl(var(${p.token}) / 0.07)` : "transparent", transition: `background-color 0.25s ${EASE}` }}
                >
                  <span className="block text-[15px] font-semibold" style={{ color: on ? color : undefined }}>{c.label}</span>
                  <span className="mt-0.5 block text-[13.5px] leading-relaxed text-foreground/70">{c.detail}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2 px-4">
          <Cta p={p} />
          <Terms p={p} />
        </div>
      </div>

      {hasShots && (
        <div
          className="relative grid aspect-[16/10] overflow-hidden rounded-2xl border border-foreground/[0.08] shadow-[0_2px_4px_rgba(15,26,20,0.04),0_40px_80px_-40px_rgba(15,26,20,0.35)]"
          style={{ background: SHOT_GROUND[p.name] ?? "#eef2f0" }}
        >
          {caps.map((c) => (
            <img
              key={c.label}
              src={shots[c.label]}
              alt={`${p.name}: ${c.label}`}
              decoding="async"
              loading="lazy"
              className="col-start-1 row-start-1 h-full w-full p-3"
              style={{ objectFit: "contain", opacity: active === c.label ? 1 : 0, transition: `opacity 0.45s ${EASE}` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ShowcaseFeatureDropdown() {
  const [open, setOpen] = useState<string | null>(FOUR[0].name);
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8" data-testid="showcase-features">
      {FOUR.map((p) => {
        const on = open === p.name;
        const id = `feat-${p.name.toLowerCase()}`;
        return (
          <div key={p.name} className="border-t border-foreground/12">
            <button
              type="button"
              aria-expanded={on}
              aria-controls={id}
              onClick={() => setOpen(on ? null : p.name)}
              className="stmt-row grid w-full grid-cols-[1fr_auto] items-center gap-6 py-8 text-left lg:grid-cols-[260px_1fr_auto] lg:py-10"
            >
              <span className="flex items-center gap-3.5">
                <Mark p={p} size={44} />
                <Name p={p} cls="text-[19px]" />
              </span>
              <span className="col-span-2 row-start-2 lg:col-span-1 lg:row-start-auto">
                <Headline p={p} cls="max-w-[26ch] text-[1.7rem] leading-[1.08] tracking-[-0.03em] lg:text-[2.4rem]" />
              </span>
              <span
                aria-hidden
                className="stmt-plus flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground/70"
                style={{ transform: on ? "rotate(45deg)" : "none" }}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <div id={id} role="region" className="stmt-panel grid" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <div style={{ opacity: on ? 1 : 0, transition: `opacity 0.35s ${EASE}` }}><Features p={p} /></div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="border-t border-foreground/12" />
    </div>
  );
}
