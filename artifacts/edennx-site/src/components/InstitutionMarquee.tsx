import { TOP_INSTITUTIONS, TTO_COUNT_LABEL } from "@/lib/platformStats";

// Two counter-scrolling rows of real institutions (sourced from the live
// EdenRadar database, ordered by asset volume). Replaces invented testimonials
// with verifiable credibility. No logos, no fabricated names.
const HALF = Math.ceil(TOP_INSTITUTIONS.length / 2);
const ROWS = [TOP_INSTITUTIONS.slice(0, HALF), TOP_INSTITUTIONS.slice(HALF)];

function Row({ names, direction }: { names: readonly string[]; direction: "marquee-left" | "marquee-right" }) {
  const doubled = [...names, ...names];
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div className={`flex w-max ${direction}`}>
        {doubled.map((name, i) => (
          <span
            key={i}
            className="flex-shrink-0 whitespace-nowrap text-sm font-semibold tracking-wide text-foreground/70"
          >
            {name}
            <span className="mx-5 text-primary/40" aria-hidden="true">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function InstitutionMarquee() {
  return (
    <section className="py-14 border-y border-border bg-foreground/[0.015] dark:bg-white/[0.015]" aria-label="Institutions monitored">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">
          Coverage you can verify
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Monitoring {TTO_COUNT_LABEL} research institutions worldwide.
        </h2>
      </div>
      <div className="space-y-3">
        <Row names={ROWS[0]} direction="marquee-left" />
        <Row names={ROWS[1]} direction="marquee-right" />
      </div>
    </section>
  );
}
