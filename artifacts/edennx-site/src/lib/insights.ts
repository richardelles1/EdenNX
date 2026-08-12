// Aggregated writing from across the product suite. EdenNX does not publish its
// own posts: every entry links out to the product site that wrote it, so the
// canonical URL stays with the product and nothing is duplicated across domains.
//
// Mirrored by hand from each product's `shared/blogPosts.ts`. Titles, standfirsts,
// descriptions, tags, dates, and read times are copied verbatim, never rewritten.
//
// A browser fetch from edennx.com to either product's site is blocked by their
// CORS policy, so this cannot be live today. If each product exposes a
// /blog.json with Access-Control-Allow-Origin for edennx.com, this file becomes
// the fallback and the page updates itself.
//
// Refresh: re-mirror when either product publishes.

export type InsightSource = "EdenRadar" | "EdenCompliance";

export type Insight = {
  source: InsightSource;
  title: string;
  /** The standfirst if the post has one, else its card description. */
  lede: string;
  /** ISO date, drives newest-first order. */
  date: string;
  tag: string;
  readTime: string;
  url: string;
};

const ER = "https://edenradar.com/blog";
const EC = "https://edencompliance.com/blog";

export const INSIGHTS: Insight[] = [
  {
    source: "EdenRadar",
    title: "What 34,186 academic assets are actually made of",
    lede: "Diagnostics and devices outnumber small molecules and antibodies. The field talks about the other half.",
    date: "2026-08-12",
    tag: "Data",
    readTime: "4 min read",
    url: `${ER}/what-the-index-is-made-of`,
  },
  {
    source: "EdenCompliance",
    title: "What we mean by a controlled record",
    lede: "Nothing is deleted, everything is attributable, and the history is checkable. Here is what each of those actually means.",
    date: "2026-08-12",
    tag: "Platform",
    readTime: "5 min read",
    url: `${EC}/what-we-mean-by-a-controlled-record`,
  },
  {
    source: "EdenRadar",
    title: "The top ten institutions hold less than you would guess",
    lede: "A third of the index sits outside the fifty largest offices, and a tenth of it is federal.",
    date: "2026-08-12",
    tag: "Data",
    readTime: "4 min read",
    url: `${ER}/outside-the-top-tier`,
  },
  {
    source: "EdenRadar",
    title: "What the fit score does not know",
    lede: "A ranked list makes a claim tens of thousands of times a day. Here is where its knowledge stops.",
    date: "2026-08-05",
    tag: "Product",
    readTime: "3 min read",
    url: `${ER}/what-the-fit-score-does-not-know`,
  },
  {
    source: "EdenRadar",
    title: "One office's preclinical is another's discovery",
    lede: "Stage is one of the first fields people filter on, and one of the least reliable fields in a listing.",
    date: "2026-07-30",
    tag: "Explainer",
    readTime: "4 min read",
    url: `${ER}/stage-language-is-not-standard`,
  },
  {
    source: "EdenRadar",
    title: "What a tech transfer office is actually optimizing for",
    lede: "A licensing office is not a sales organization, and approaching it as one costs deals that were otherwise available.",
    date: "2026-07-17",
    tag: "Explainer",
    readTime: "5 min read",
    url: `${ER}/what-a-tto-optimizes-for`,
  },
  {
    source: "EdenRadar",
    title: "Four places an asset surfaces before the patent does",
    lede: "The eighteen-month patent lag is real. It is also not the only record a piece of science leaves behind.",
    date: "2026-07-06",
    tag: "Explainer",
    readTime: "5 min read",
    url: `${ER}/before-the-patent-publishes`,
  },
  {
    source: "EdenRadar",
    title: 'What we mean by "the index"',
    lede: "A plain introduction to what EdenRadar actually measures: what a tech transfer office is, what counts as an asset, and why a live index beats a static one.",
    date: "2026-06-26",
    tag: "Data",
    readTime: "3 min read",
    url: `${ER}/what-we-mean-by-the-index`,
  },
  {
    source: "EdenRadar",
    title: "Why now",
    lede: "For decades, the gap between research and treatment was a structural fact you had to accept. It just became a solvable problem.",
    date: "2026-06-23",
    tag: "Perspective",
    readTime: "4 min read",
    url: `${ER}/why-now`,
  },
  {
    source: "EdenRadar",
    title: "EdenRadar is live.",
    lede: "See the full field before your first move.",
    date: "2026-06-22",
    tag: "Announcement",
    readTime: "4 min read",
    url: `${ER}/edenradar-is-live`,
  },
];

export const SORTED_INSIGHTS: Insight[] = [...INSIGHTS].sort((a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0
);

export function countBySource(source: InsightSource): number {
  return INSIGHTS.filter((i) => i.source === source).length;
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
