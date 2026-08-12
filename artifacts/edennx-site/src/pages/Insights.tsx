import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PORTAL_META } from "@/components/PortalBits";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
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

function accentOf(source: InsightSource) {
  const meta = PORTAL_META[source] ?? PORTAL_META.EdenRadar;
  return { accent: `hsl(var(${meta.token}))`, token: meta.token, Icon: meta.Icon };
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

function Card({ post, featured = false }: { post: Insight; featured?: boolean }) {
  const { accent, token } = accentOf(post.source);
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      // No coloured bar across the top: a tinted strip on every card is the
      // stock way to signal a category, and with a source badge already naming
      // the product it was decoration doing a job that was already done. The
      // card is a plain surface; the wordmark carries the colour.
      className={`group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-[0_14px_36px_rgba(15,26,20,0.09)] reveal ${
        featured ? "md:col-span-2 md:p-8" : ""
      }`}
      data-testid={`insight-${post.source.toLowerCase()}`}
    >
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <SourceBadge source={post.source} />
        <span
          className="rounded-full px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider"
          style={{ background: `hsl(var(${token}) / 0.1)`, color: accent }}
        >
          {post.tag}
        </span>
      </div>

      <h2
        className={`font-bold tracking-tight text-foreground ${
          featured ? "text-2xl md:text-3xl leading-tight" : "text-lg leading-snug"
        }`}
      >
        {post.title}
      </h2>

      <p
        className={`mt-3 leading-relaxed text-foreground/70 ${featured ? "text-base md:text-lg max-w-2xl" : "text-sm"}`}
      >
        {post.lede}
      </p>

      {/* The source badge already names the product, so the link stays short
          enough not to wrap in a one-third-width card. */}
      <div className="mt-auto flex items-center gap-2 pt-6 text-xs text-muted-foreground">
        <span className="whitespace-nowrap">{formatDate(post.date)}</span>
        <span aria-hidden>·</span>
        <span className="whitespace-nowrap">{post.readTime}</span>
        <span
          className="ml-auto inline-flex flex-shrink-0 items-center gap-1 text-[13px] font-semibold transition-[gap] group-hover:gap-2"
          style={{ color: accent }}
        >
          Read <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

export default function Insights() {
  useScrollReveal();
  useSEO({
    title: "Insights | Tech transfer and regulated quality",
    description:
      "Writing from across the EdenNX product suite: analysis of academic licensing, tech transfer, and regulated quality from the EdenRadar and EdenCompliance teams.",
  });

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

      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 lg:pb-28">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Card key={post.url} post={post} featured={i === 0 && filter === "All"} />
          ))}
        </div>
      </section>
    </div>
  );
}
