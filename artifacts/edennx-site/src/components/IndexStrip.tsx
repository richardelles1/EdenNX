import { useState } from "react";
import { TTO_COUNT_LABEL, ASSET_COUNT_LABEL } from "@/lib/platformStats";

// The band under the hero. It replaced a scrolling ticker that repeated the
// numbers the Coverage band already states; a marquee is motion without
// information, and it read as decoration.
//
// This says what the backbone actually covers, split the way the company is:
// what EdenRadar indexes, and what EdenCompliance controls. The taxonomy is the
// content, so the structure carries meaning rather than dressing it.
//
// Visual grammar is lifted from EdenRadar's own Scout asset card: a tinted chip
// with a stronger left accent bar in a semantic per-category color, blooming
// from its left edge on hover. Category colors are EdenRadar's CATEGORY_BLOOM
// values, so a TTO asset is the same emerald here as it is in the product.

type Chip = { label: string; rgb: string };

const INDEXED: Chip[] = [
  { label: "TTO assets", rgb: "16, 185, 129" },
  { label: "Clinical trials", rgb: "13, 148, 136" },
  { label: "Patents", rgb: "217, 119, 6" },
  { label: "Research papers", rgb: "14, 165, 233" },
];

// EdenCompliance's forest and gold, matching --portal-compliance.
const CONTROLLED: Chip[] = [
  { label: "Vendor records", rgb: "44, 105, 74" },
  { label: "Audit trail", rgb: "168, 133, 62" },
];

function EvidenceChip({ chip }: { chip: Chip }) {
  const [hovered, setHovered] = useState(false);
  const c = chip.rgb;
  return (
    <span
      className="relative inline-flex items-center overflow-hidden rounded-lg py-2 pl-3.5 pr-4 text-[13px] font-semibold motion-reduce:transform-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: "hsl(var(--foreground) / 0.82)",
        background: `rgba(${c}, 0.05)`,
        border: `1px solid rgba(${c}, 0.22)`,
        borderLeft: `3px solid rgba(${c}, 0.9)`,
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 22px rgba(${c}, 0.18)` : "0 1px 2px rgba(15,26,20,0.04)",
        transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s",
      }}
    >
      {/* The Scout card's bloom: a small disc erupting from the accent edge. */}
      <span
        aria-hidden
        className="pointer-events-none absolute motion-reduce:hidden"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: `rgba(${c}, 0.55)`,
          top: -20,
          left: -20,
          transform: hovered ? "scale(18)" : "scale(1)",
          opacity: hovered ? 0.13 : 0,
          transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
        }}
      />
      <span className="relative">{chip.label}</span>
    </span>
  );
}

function Group({ eyebrow, note, chips }: { eyebrow: string; note: string; chips: Chip[] }) {
  return (
    <div className="min-w-0">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {eyebrow}
        <span className="ml-2 font-normal normal-case tracking-normal text-foreground/45">{note}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <EvidenceChip key={chip.label} chip={chip} />
        ))}
      </div>
    </div>
  );
}

export function IndexStrip() {
  return (
    <section
      className="border-y border-border bg-foreground/[0.015]"
      aria-label="What EdenNX covers"
    >
      <div className="mx-auto max-w-7xl px-6 py-9 lg:px-8 lg:py-10">
        {/* Left-aligned and only as wide as the content: a stretched grid left a
            dead gap between the two halves and read as a layout accident. */}
        <div className="flex flex-wrap items-start gap-x-10 gap-y-8 xl:gap-x-14">
          <Group
            eyebrow="Indexed"
            note={`${ASSET_COUNT_LABEL} assets across ${TTO_COUNT_LABEL} institutions`}
            chips={INDEXED}
          />
          <div
            className="hidden self-stretch lg:block"
            aria-hidden
            style={{ width: 1, background: "hsl(var(--foreground) / 0.12)" }}
          />
          <Group eyebrow="Controlled" note="Every change signed and unalterable" chips={CONTROLLED} />
        </div>
      </div>
    </section>
  );
}
