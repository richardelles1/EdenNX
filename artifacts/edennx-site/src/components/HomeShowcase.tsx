import { useState } from "react";
import { Plus } from "lucide-react";
import { ink } from "@/components/PortalBits";
import { PRODUCTS, type Product } from "@/components/ProductShowcase";
import { Cta, Headline, Mark, Name, Terms } from "@/components/ProductCards";

// Three proposals for showing the four products on the home page, after the
// scroll-linked logo reveal (soft while it moved, because large logos were being
// scaled and shifted every frame). None of these transforms a logo: logos are
// drawn at rest, at their own resolution, and motion is kept to layout and
// opacity. Preview only; Rich picks one.
//
// 1, Statements: each product is one line of display type, its headline. One
//    is open at a time; opening a line shows its capabilities.
// 2, Four quarters: the four products as equal quarters of one square, divided
//    by hairlines, each with its full logo, held still.
// 3, The path: the products placed along the work they serve, from finding an
//    asset to releasing a batch, on one line.

const FOUR = [PRODUCTS.radar, PRODUCTS.trials, PRODUCTS.compliance, PRODUCTS.br];
const LOCKUP: Record<string, { src: string; h: number }> = {
  EdenRadar: { src: "/images/lockups/edenradar.svg", h: 150 },
  EdenCompliance: { src: "/images/lockups/edencompliance.svg", h: 176 },
  EdenTrials: { src: "/images/lockups/edentrials.svg", h: 188 },
  EdenBR: { src: "/images/lockups/edenbr.svg", h: 168 },
};

/* ----------------------------- 1, Statements ----------------------------- */

function Statement({ p, open, onToggle }: { p: Product; open: boolean; onToggle: () => void }) {
  const id = `stmt-${p.name.toLowerCase()}`;
  return (
    <div className="border-t border-foreground/12">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="stmt-row group grid w-full grid-cols-[1fr_auto] items-center gap-6 py-8 text-left lg:grid-cols-[220px_1fr_auto] lg:py-10"
      >
        <span className="flex items-center gap-3">
          <Mark p={p} size={30} />
          <Name p={p} cls="text-[16px]" />
        </span>
        <span className="col-span-2 row-start-2 lg:col-span-1 lg:row-start-auto">
          <Headline p={p} cls="max-w-[24ch] text-[1.75rem] leading-[1.08] tracking-[-0.03em] lg:text-[2.6rem]" />
        </span>
        <span
          aria-hidden
          className="stmt-plus flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground/70"
          style={{ transform: open ? "rotate(45deg)" : "none" }}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <div id={id} role="region" className="stmt-panel grid" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <div className="grid gap-8 pb-12 lg:grid-cols-[220px_1fr]" style={{ opacity: open ? 1 : 0, transition: "opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1)" }}>
            <div className="lg:col-start-2">
              <p className="max-w-[56ch] text-[17px] leading-[1.6] text-foreground/75">{p.sub}</p>
              <dl className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
                {(p.capabilities ?? []).map((c) => (
                  <div key={c.label} className="border-t border-foreground/10 py-3.5">
                    <dt className="text-[14.5px] font-semibold text-foreground">{c.label}</dt>
                    <dd className="mt-1 text-[13.5px] leading-relaxed text-foreground/70">{c.detail}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <Cta p={p} />
                <Terms p={p} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShowcaseStatements() {
  const [open, setOpen] = useState<string | null>(PRODUCTS.radar.name);
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8" data-testid="showcase-statements">
      {FOUR.map((p) => (
        <Statement key={p.name} p={p} open={open === p.name} onToggle={() => setOpen(open === p.name ? null : p.name)} />
      ))}
      <div className="border-t border-foreground/12" />
    </div>
  );
}

/* ---------------------------- 2, Four quarters ---------------------------- */

export function ShowcaseQuarters() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8" data-testid="showcase-quarters">
      <div className="grid border-y border-foreground/12 lg:grid-cols-2">
        {FOUR.map((p, i) => (
          <article
            key={p.name}
            className={`reveal flex flex-col px-2 py-12 lg:px-14 lg:py-16 ${i % 2 === 0 ? "lg:border-r lg:border-foreground/12" : ""} ${i > 0 ? "border-t border-foreground/12" : ""} ${i === 1 ? "lg:border-t-0" : ""}`}
            style={{ transitionDelay: `${(i % 2) * 0.06}s` }}
          >
            <div className="flex h-[200px] items-center">
              <img src={LOCKUP[p.name].src} alt={p.name} decoding="async" style={{ height: LOCKUP[p.name].h, width: "auto" }} />
            </div>
            <Headline p={p} cls="mt-8 max-w-[20ch] text-[1.6rem] leading-[1.1] tracking-[-0.025em] lg:text-[1.9rem]" />
            <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-foreground/75">{p.sub}</p>
            <ul className="mt-6 space-y-2 text-[14.5px] text-foreground/80">
              {(p.capabilities ?? []).slice(0, 3).map((c) => (
                <li key={c.label} className="flex items-baseline gap-3">
                  <span aria-hidden className="h-px w-3 flex-shrink-0 translate-y-[-4px]" style={{ background: ink(p.goldToken ?? p.token) }} />
                  {c.label}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-baseline gap-x-5 gap-y-2 pt-8">
              <Cta p={p} />
              <Terms p={p} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- 3, The path ------------------------------ */

// Stage names are new copy and need Cleo's sourcing before they ship.
const STAGES: [Product, string][] = [
  [PRODUCTS.radar, "Find the asset"],
  [PRODUCTS.trials, "Follow the trial"],
  [PRODUCTS.compliance, "Qualify the vendors"],
  [PRODUCTS.br, "Track the batch"],
];

export function ShowcasePath() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8" data-testid="showcase-path">
      <ol className="path-line reveal relative grid gap-12 lg:grid-cols-4 lg:gap-8">
        {STAGES.map(([p, stage], i) => (
          <li key={p.name} className="relative pl-8 lg:pl-0 lg:pt-14">
            {/* The stop on the line: the product's colour, nothing else. */}
            <span
              aria-hidden
              className="path-stop absolute left-0 top-1.5 h-3 w-3 rounded-full lg:top-0"
              style={{ background: ink(p.goldToken ?? p.token), transitionDelay: `${0.25 + i * 0.18}s` }}
            />
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-foreground/65">
              {String(i + 1).padStart(2, "0")} · {stage}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Mark p={p} size={34} />
              <Name p={p} cls="text-[17px]" />
            </div>
            <Headline p={p} cls="mt-5 text-[1.5rem] leading-[1.1] tracking-[-0.02em]" />
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/75">{p.sub}</p>
            <ul className="mt-5 space-y-2 text-[14px] text-foreground/75">
              {(p.capabilities ?? []).slice(0, 3).map((c) => (
                <li key={c.label}>{c.label}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <Cta p={p} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
