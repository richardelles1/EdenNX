import { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { PORTAL_META } from "@/components/PortalBits";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { ROUTE_META } from "@/lib/routeMeta";
import {
  SORTED_INSIGHTS,
  formatDate,
  type Insight,
  type InsightSource,
} from "@/lib/insights";

// One reading room for the writing across the suite. EdenNX publishes nothing
// here: every card links out to the product that wrote it, which is the point.
// The page is grouped by product rather than filtered, so both are always on it.

// Group order matches the product order used everywhere else on the site.
const SOURCES: InsightSource[] = ["EdenRadar", "EdenCompliance"];

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


// Two parallel feeds, one per product, rather than one grid.
//
// A grid of fifteen always ends on a ragged row, and that gap was what read as
// unbalanced. Two columns cannot: each feed simply runs its own length, and the
// nine-against-six difference shows as one column ending sooner, which is true
// rather than broken.
//
// A row, not a card: source mark on the left, headline and standfirst to the
// right, date and read time underneath. No boxes, hairlines between entries.
function FeedRow({ post }: { post: Insight }) {
  const { accent, Icon } = accentOf(post.source);
  return (
    <li>
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex gap-4 overflow-hidden rounded-xl border-b border-border px-4 py-5 transition-colors hover:bg-foreground/[0.015]"
        style={{ ["--bloom-color" as string]: accent }}
        data-testid={`insight-${post.source.toLowerCase()}`}
      >
        <span aria-hidden className="bloom" />

        <Icon
          className="relative mt-[3px] h-[17px] w-[17px] flex-shrink-0"
          strokeWidth={2.25}
          style={{ color: accent }}
        />

        <span className="relative min-w-0 flex-1">
          <span className="block text-[17px] font-bold leading-snug tracking-tight text-foreground">
            {post.title}
          </span>
          <span className="mt-1.5 block text-[13.5px] leading-relaxed text-foreground/65">
            {post.lede}
          </span>
          <span className="mt-2.5 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-foreground/40">
            {formatDate(post.date)} · {post.readTime}
          </span>
        </span>

        <ArrowUpRight
          className="relative mt-[3px] h-4 w-4 flex-shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
          style={{ color: accent }}
        />
      </a>
    </li>
  );
}

export default function Insights() {
  useScrollReveal();
  useSEO(ROUTE_META["/insights"]);

  // Both groups, always. The filter chips are gone: with the page grouped by
  // product they were a control for something the layout already did, and a
  // default of "All" over a mixed stream was the thing that read as random.
  const groups = useMemo(
    () =>
      SOURCES.map((source) => ({
        source,
        posts: SORTED_INSIGHTS.filter((p) => p.source === source),
      })),
    []
  );

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
          The teams behind our platforms write about what the field looks
          like from inside the data. Every piece lives on the product that wrote it.
        </p>
      </section>

      {/* Two feeds side by side. Each column heads with its wordmark and count,
          so the page says two products are writing without a sentence. On
          narrow screens they stack, which is the same reading order. */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8 lg:pb-28">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-2">
          {groups.map(({ source, posts }) => {
            const { accent, Icon } = accentOf(source);
            return (
              <div key={source} data-testid={`insights-group-${source.toLowerCase()}`}>
                <div className="mb-2 flex items-center gap-2.5 border-t-2 pt-5 reveal" style={{ borderColor: accent }}>
                  <Icon className="h-[19px] w-[19px] flex-shrink-0" strokeWidth={2.25} style={{ color: accent }} />
                  <h2 className="text-[19px] font-bold tracking-tight">
                    <span className="text-foreground">Eden</span>
                    <span style={{ color: accent }}>{source.slice(4)}</span>
                  </h2>
                  <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-foreground/40">
                    {posts.length} {posts.length === 1 ? "piece" : "pieces"}
                  </span>
                </div>

                <ul className="reveal">
                  {posts.map((post) => (
                    <FeedRow key={post.url} post={post} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
