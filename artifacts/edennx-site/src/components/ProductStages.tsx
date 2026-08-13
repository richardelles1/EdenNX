import { useState } from "react";
import { Check } from "lucide-react";

// Staged walkthroughs for the two flagship platforms.
//
// Both EdenRadar and EdenCompliance already publish an authored, numbered,
// screenshot-backed walkthrough on their own sites. Rather than reducing each
// platform to a bullet list here, these components mirror that structure with
// the real product screens, so the parent site describes each product the way
// the product describes itself.
//
// The two use different devices on purpose, matching their sources: EdenRadar's
// walkthrough is a vertical sequence of five capabilities, EdenCompliance's is
// four stages of one record moving through a program. A rail suits the first, a
// stepper the second.
//
// Numbering is real here. Both are sequences a user actually moves through, so
// the numerals carry order rather than decorating a list.

export type Stage = {
  label: string; // short eyebrow, e.g. "SEARCH"
  title: string;
  desc: string;
  points: string[];
  img: string;
  alt: string;
};

const num = (i: number) => String(i + 1).padStart(2, "0");

// Each product's screens share a background color from its own app, so the frame
// is painted to match. Shots have different aspect ratios (a full-width search
// bar, a portrait vendor portal), so they are contained rather than cropped, and
// the matching ground makes the letterboxing invisible instead of gray-barred.
function Screen({ stage, frameBg, token }: { stage: Stage; frameBg: string; token: string }) {
  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{
        background: frameBg,
        borderColor: `hsl(var(${token}) / 0.22)`,
        boxShadow: `0 18px 48px hsl(var(${token}) / 0.14), 0 4px 12px hsl(0 0% 0% / 0.05)`,
      }}
    >
      {/* A fixed aspect rather than a fixed height: the shots range from a
          full-width search bar to a portrait vendor portal, and a ratio near
          their own keeps each one large without the frame resizing between
          stages and shifting the page under the reader. */}
      <div key={stage.img} className="preview-fade flex aspect-[16/9] items-center justify-center p-3 lg:p-4">
        <img
          src={stage.img}
          alt={stage.alt}
          /* Not lazy: only the selected stage is mounted, so lazy loading leaves
             an empty frame on the first visit to each stage. */
          decoding="async"
          className="max-h-full max-w-full rounded-md"
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}

function Points({ points, token }: { points: string[]; token: string }) {
  return (
    <ul className="mt-5 grid gap-2.5 sm:grid-cols-3">
      {points.map((p) => (
        <li key={p} className="flex items-start gap-2 text-[13px] leading-snug text-foreground/75">
          <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" strokeWidth={3} style={{ color: `hsl(var(${token}))` }} />
          {p}
        </li>
      ))}
    </ul>
  );
}

// Preload every screen for a product once its section is on the page, so moving
// between stages never shows an empty frame.
function usePreload(stages: Stage[]) {
  useState(() => {
    if (typeof window !== "undefined") for (const s of stages) new Image().src = s.img;
    return null;
  });
}

/** EdenRadar: five capabilities as a vertical rail beside one large screen. */
export function StageRail({
  stages,
  token,
  frameBg,
}: {
  stages: Stage[];
  token: string;
  frameBg: string;
}) {
  const [active, setActive] = useState(0);
  usePreload(stages);
  const stage = stages[active];
  const accent = `hsl(var(${token}))`;

  return (
    <div className="grid gap-8 lg:grid-cols-[290px_1fr] lg:gap-10">
      <ol className="flex flex-col gap-1" data-testid="stage-rail">
        {stages.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.label}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={on}
                data-testid={`stage-${s.label.toLowerCase()}`}
                className={`relative flex w-full items-baseline gap-3 rounded-lg py-3 pl-4 pr-3 text-left transition-colors ${
                  on ? "bg-foreground/[0.055]" : "hover:bg-foreground/[0.03]"
                }`}
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full transition-opacity"
                  style={{ background: accent, opacity: on ? 1 : 0 }}
                />
                <span
                  className="font-mono text-[11px] tabular-nums transition-colors"
                  style={{ color: on ? accent : "hsl(var(--foreground) / 0.35)" }}
                >
                  {num(i)}
                </span>
                <span className="min-w-0">
                  <span className={`block text-[14.5px] font-semibold leading-snug tracking-tight ${on ? "text-foreground" : "text-foreground/70"}`}>
                    {s.title}
                  </span>
                  <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
                    {s.label}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="min-w-0">
        <Screen stage={stage} frameBg={frameBg} token={token} />
        <p className="mt-5 max-w-2xl text-[14.5px] leading-relaxed text-foreground/75">{stage.desc}</p>
        <Points points={stage.points} token={token} />
      </div>
    </div>
  );
}

/** EdenCompliance: four stages of one record, as a horizontal stepper. */
export function StageStepper({
  stages,
  token,
  frameBg,
}: {
  stages: Stage[];
  token: string;
  frameBg: string;
}) {
  const [active, setActive] = useState(0);
  usePreload(stages);
  const stage = stages[active];
  const accent = `hsl(var(${token}))`;

  return (
    <div>
      <ol className="relative mb-8 grid grid-cols-2 gap-y-5 sm:grid-cols-4" data-testid="stage-stepper">
        {/* The rule runs behind the markers, so the four stages read as one
            record moving through a program rather than four separate features. */}
        <div
          aria-hidden
          className="absolute left-[12.5%] right-[12.5%] top-[13px] hidden h-px sm:block"
          style={{ background: `hsl(var(${token}) / 0.25)` }}
        />
        {stages.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.label} className="relative">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={on}
                data-testid={`stage-${s.label.toLowerCase()}`}
                className="group flex w-full flex-col items-start gap-2 pr-4 text-left sm:items-center sm:pr-0 sm:text-center"
              >
                <span
                  className="flex h-[27px] w-[27px] flex-shrink-0 items-center justify-center rounded-full font-mono text-[11px] tabular-nums ring-4 ring-background transition-colors"
                  style={
                    on
                      ? { background: accent, color: "#fff" }
                      : { background: "hsl(var(--background))", border: `1px solid hsl(var(${token}) / 0.35)`, color: "hsl(var(--foreground) / 0.45)" }
                  }
                >
                  {num(i)}
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">{s.label}</span>
                  <span
                    className={`mt-1 block max-w-[22ch] text-[14px] font-semibold leading-snug tracking-tight transition-colors ${
                      on ? "text-foreground" : "text-foreground/60 group-hover:text-foreground/85"
                    }`}
                  >
                    {s.title}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <Screen stage={stage} frameBg={frameBg} token={token} />
      <p className="mt-5 max-w-2xl text-[14.5px] leading-relaxed text-foreground/75">{stage.desc}</p>
      <Points points={stage.points} token={token} />
    </div>
  );
}
