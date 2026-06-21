import { TTOGlobe } from "@/components/TTOGlobe";
import {
  TTO_COUNT_EXACT,
  ASSET_COUNT_LABEL,
  DATA_SOURCE_LABEL,
  TOP_INSTITUTIONS,
} from "@/lib/platformStats";

// The site's one deliberately dark, full-bleed "signature" band: a spinning
// globe of real institutions, the precise coverage figures, and the named
// institutions scrolling beneath. Colors are explicit (light-on-dark) so the
// panel reads the same regardless of the site's light/dark theme.

const ROW_COUNT = 4;
const PER_ROW = Math.ceil(TOP_INSTITUTIONS.length / ROW_COUNT);
const ROWS = Array.from({ length: ROW_COUNT }, (_, i) =>
  TOP_INSTITUTIONS.slice(i * PER_ROW, (i + 1) * PER_ROW)
);

const stats = [
  { value: String(TTO_COUNT_EXACT), label: "research institutions" },
  { value: ASSET_COUNT_LABEL, label: "licensable assets" },
  { value: DATA_SOURCE_LABEL, label: "live data sources" },
];

function NameRow({ names, direction }: { names: readonly string[]; direction: "marquee-left" | "marquee-right" }) {
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
            className="flex-shrink-0 whitespace-nowrap text-sm font-semibold tracking-wide"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            {name}
            <span className="mx-5" style={{ color: "hsl(142 65% 55% / 0.5)" }} aria-hidden="true">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function CoverageSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, hsl(222 47% 7%) 0%, hsl(158 45% 8%) 100%)" }}
      aria-label="Global coverage"
    >
      {/* Soft emerald glow behind the globe */}
      <div
        className="absolute right-0 top-1/4 pointer-events-none"
        style={{ width: 600, height: 600, borderRadius: "9999px", filter: "blur(90px)", background: "hsl(142 65% 40% / 0.18)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Copy + stats */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "hsl(142 65% 58%)" }}>
              Global coverage
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5" style={{ color: "rgba(255,255,255,0.96)" }}>
              Watching every major lab on earth.
            </h2>
            <p className="text-base md:text-lg leading-relaxed max-w-md mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
              EdenRadar continuously monitors university tech transfer offices,
              government labs, and publication feeds across six continents, so the
              next breakthrough surfaces the day it is published.
            </p>
            <div className="flex flex-wrap gap-x-10 gap-y-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-bold tabular-nums" style={{ color: "rgba(255,255,255,0.97)" }}>
                    {s.value}
                  </div>
                  <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Globe */}
          <div className="flex justify-center lg:justify-end">
            <TTOGlobe size={460} isDark />
          </div>
        </div>

        {/* Named institutions */}
        <div className="mt-16 lg:mt-20 pt-10 space-y-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {ROWS.map((names, i) => (
            <NameRow key={i} names={names} direction={i % 2 === 0 ? "marquee-left" : "marquee-right"} />
          ))}
        </div>
      </div>
    </section>
  );
}
