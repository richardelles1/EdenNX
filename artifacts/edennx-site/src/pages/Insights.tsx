import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PORTAL_META } from "@/components/PortalBits";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { ROUTE_META } from "@/lib/routeMeta";
import {
  SORTED_INSIGHTS,
  countBySource,
  formatDate,
  type Insight,
  type InsightSource,
} from "@/lib/insights";

// One reading room for the writing across the suite. EdenNX publishes nothing
// here: every card links out to the product that wrote it, which is the point.
// Filtering is by product, because on this site the product is the subject.

type Filter = "All" | InsightSource;

const FILTERS: Filter[] = ["All", "EdenRadar", "EdenCompliance"];

// EdenRadar is emerald and EdenCompliance is forest green, which are four
// degrees of hue apart and all but identical in a grid of small cards: the one
// cue meant to tell the two sources apart was doing nothing. EdenCompliance is
// forest *and* gold, and gold is the half of it that reads on a light surface,
// so its cards take the gold. Green against amber separates at a glance, and
// neither product has borrowed a colour it does not own.
function accentOf(source: InsightSource) {
  const meta = PORTAL_META[source] ?? PORTAL_META.EdenRadar;
  const token = source === "EdenCompliance" ? "--portal-compliance-gold" : meta.token;
  return { accent: `hsl(var(${token}))`, token, Icon: meta.Icon };
}

function SourceBadge({ source }: { source: InsightSource }) {
  const { accent, Icon } = accentOf(source);
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={2.25} style={{ color: accent }} />
      <span className="text-[13px] font-bold tracking-tight leading-none">
        <span className="text-foreground">Eden</span>
        <span style={{ color: accent }}>{source.slice(4)}</span>
      </span>
    </span>
  );
}

// A bento rather than a uniform grid. Fifteen identical cards reads as an
// archive and a single list reads as a changelog; tiles of four different sizes
// read as a publication that has a view about what matters.
//
// The sizes cycle on a fixed pattern rather than anything derived from the
// posts, because nothing in the data ranks them: they are all just writing, and
// inventing an importance score to drive a layout would be a lie told in CSS.
// The cycle sums to whole rows, so the grid tiles cleanly at any count, and
// dense auto-flow backfills whatever the last partial row leaves.
type Variant = "lead" | "tall" | "wide" | "normal";

const CYCLE: Variant[] = ["tall", "normal", "normal", "wide", "normal", "normal"];

function variantAt(i: number): Variant {
  return i === 0 ? "lead" : CYCLE[(i - 1) % CYCLE.length];
}

const SPAN: Record<Variant, string> = {
  lead: "lg:col-span-2 lg:row-span-2",
  tall: "lg:row-span-2",
  wide: "lg:col-span-2",
  normal: "",
};

const TITLE: Record<Variant, string> = {
  lead: "text-[27px] leading-[1.08] md:text-[38px]",
  tall: "text-[22px] leading-[1.15]",
  wide: "text-[22px] leading-[1.15]",
  normal: "text-[19px] leading-[1.2]",
};

function BentoCard({ post, variant }: { post: Insight; variant: Variant }) {
  const { accent } = accentOf(post.source);
  const big = variant === "lead";
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      // No coloured bar across the top: a tinted strip is the stock way to
      // signal a category, and with a source badge already naming the product
      // it was decoration doing a job that was already done. The card is a
      // plain surface until you touch it, then it takes the colour of whichever
      // product wrote the piece.
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-[0_14px_36px_rgba(15,26,20,0.09)] ${
        big ? "md:p-9" : ""
      } ${SPAN[variant]}`}
      style={{ ["--bloom-color" as string]: accent }}
      data-testid={`insight-${post.source.toLowerCase()}`}
    >
      <span aria-hidden className="bloom" />

      <div className="relative mb-4 flex items-center gap-3">
        <SourceBadge source={post.source} />
        {big && (
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground/35">Latest</span>
        )}
      </div>

      {/* The headline is the page. Everything else is scaffolding around it. */}
      <h2 className={`relative font-bold tracking-tight text-foreground ${TITLE[variant]}`}>{post.title}</h2>

      <p
        className={`relative mt-3 leading-relaxed text-foreground/70 ${
          big ? "max-w-2xl text-base md:text-lg" : "text-[13.5px]"
        }`}
      >
        {post.lede}
      </p>

      <div className="relative mt-auto flex items-center gap-2 pt-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        <span className="whitespace-nowrap">{formatDate(post.date)}</span>
        <span aria-hidden>·</span>
        <span className="whitespace-nowrap">{post.readTime}</span>
        {/* The arrow travels on hover instead of the gap widening. Animating
            gap reflows the row; a transform on the glyph does not. */}
        <ArrowUpRight
          className="ml-auto h-4 w-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: accent }}
        />
      </div>
    </a>
  );
}



export default function Insights() {
  useScrollReveal();
  useSEO(ROUTE_META["/insights"]);

  const [filter, setFilter] = useState<Filter>("All");
  const posts = useMemo(
    () => (filter === "All" ? SORTED_INSIGHTS : SORTED_INSIGHTS.filter((p) => p.source === filter)),
    [filter]
  );

  const counts: Record<Filter, number> = {
    All: SORTED_INSIGHTS.length,
    EdenRadar: countBySource("EdenRadar"),
    EdenCompliance: countBySource("EdenCompliance"),
  };

  return (
    <div className="pt-16">
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 lg:pt-24 pb-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 reveal">
          Insights
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05] mb-6 reveal">
          What we learn, from the data up.
        </h1>
        <p
          className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl reveal"
          style={{ transitionDelay: "0.05s" }}
        >
          The teams behind our platforms write about what the field actually looks
          like from inside the data. Every piece lives on the product that wrote it.
        </p>
      </section>

      {/* Filter by product, which on this site is the subject matter */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-10">
        <div className="flex flex-wrap gap-2 reveal" role="group" aria-label="Filter insights by product">
          {FILTERS.map((f) => {
            const active = filter === f;
            const accent = f === "All" ? "hsl(var(--primary))" : accentOf(f).accent;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={active}
                data-testid={`filter-${f.toLowerCase()}`}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
                style={{
                  borderColor: active ? accent : "hsl(var(--border))",
                  background: active ? accent : "transparent",
                  color: active ? "#fff" : "hsl(var(--foreground) / 0.75)",
                }}
              >
                {f}
                <span className={active ? "opacity-80" : "opacity-55"}>{counts[f]}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Row height is a floor, not a fixture: minmax lets a tile grow past the
          unit if its standfirst runs long, so a two-unit tile is roughly, not
          exactly, twice a one-unit tile. Dense flow backfills the gaps the
          taller tiles leave. Below lg everything collapses to one column and
          the spans stop applying, which is the only sane phone layout. */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8 lg:pb-28">
        <div className="grid gap-5 reveal md:grid-cols-2 lg:grid-cols-3 lg:[grid-auto-flow:dense] lg:[grid-auto-rows:minmax(188px,auto)]">
          {posts.map((post, i) => (
            <BentoCard key={post.url} post={post} variant={variantAt(i)} />
          ))}
        </div>
      </section>
    </div>
  );
}
