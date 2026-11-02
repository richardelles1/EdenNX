// Aggregated writing from across the product suite. EdenNX does not publish its
// own posts: every entry links out to the product site that wrote it, so the
// canonical URL stays with the product and nothing is duplicated across domains.
//
// The block between the sync-insights markers is generated, verbatim, from each
// product's `shared/blogPosts.ts` by `node scripts/sync-insights.mjs`. Do not
// edit it by hand: the hand copy is how this page drifted (two EdenRadar titles
// renamed, EdenCompliance's launch post redated, both EdenTrials posts missing).
// Re-run the script when any product publishes.

export type InsightSource = "EdenTrials" | "EdenRadar" | "EdenCompliance" | "EdenBR";

export type Insight = {
  source: InsightSource;
  title: string;
  /** The standfirst if the post has one, else its card description. */
  lede: string;
  /** ISO date, drives newest-first order. */
  date: string;
  readTime: string;
  url: string;
};

/** Each product's blog: its name and index page. EdenBR has not published. */
export const BLOGS: Record<InsightSource, { name: string | null; home: string; site: string }> = {
  EdenTrials: { name: "Field Notes", home: "https://edentrials.com/blog", site: "edentrials.com" },
  EdenRadar: { name: "Line of Sight", home: "https://edenradar.com/blog", site: "edenradar.com" },
  EdenCompliance: { name: "On the Record", home: "https://edencompliance.com/blog", site: "edencompliance.com" },
  EdenBR: { name: null, home: "https://edenbr.com", site: "edenbr.com" },
};

export const INSIGHTS: Insight[] = [
  // <sync-insights>
  {
    source: "EdenTrials",
    title: "What we write down",
    lede: "Registries publish today and overwrite yesterday. The overwritten part is the part worth having.",
    date: "2026-08-20",
    readTime: "3 min read",
    url: "https://edentrials.com/blog/what-we-write-down",
  },
  {
    source: "EdenTrials",
    title: "A pipeline that reported success 136,000 times",
    lede: "Inserting a duplicate is a successful insert. Every run was green while the corpus quietly doubled.",
    date: "2026-08-20",
    readTime: "4 min read",
    url: "https://edentrials.com/blog/a-pipeline-that-reported-success",
  },
  {
    source: "EdenRadar",
    title: "What 34,186 academic assets are actually made of",
    lede: "Diagnostics and devices outnumber small molecules and antibodies. The field talks about the other half.",
    date: "2026-08-12",
    readTime: "4 min read",
    url: "https://edenradar.com/blog/what-the-index-is-made-of",
  },
  {
    source: "EdenRadar",
    title: "Where the other 71 percent of the index sits",
    lede: "A third of the index sits beyond the fifty largest offices, and a tenth of it is federal.",
    date: "2026-08-12",
    readTime: "4 min read",
    url: "https://edenradar.com/blog/outside-the-top-tier",
  },
  {
    source: "EdenRadar",
    title: "What the fit score is comparing",
    lede: "A ranked list makes a claim tens of thousands of times a day. Here is what stands behind it.",
    date: "2026-08-05",
    readTime: "3 min read",
    url: "https://edenradar.com/blog/what-the-fit-score-does-not-know",
  },
  {
    source: "EdenRadar",
    title: "One office's preclinical is another's discovery",
    lede: "Stage is one of the first fields people filter on, and the one that most rewards normalizing.",
    date: "2026-07-30",
    readTime: "4 min read",
    url: "https://edenradar.com/blog/stage-language-is-not-standard",
  },
  {
    source: "EdenRadar",
    title: "What a tech transfer office is actually optimizing for",
    lede: "A licensing office runs on a scoreboard of its own, and reading it wins deals a term sheet alone will not.",
    date: "2026-07-17",
    readTime: "5 min read",
    url: "https://edenradar.com/blog/what-a-tto-optimizes-for",
  },
  {
    source: "EdenRadar",
    title: "Four places an asset surfaces before the patent does",
    lede: "The eighteen-month patent lag is real. Four other records arrive well ahead of it.",
    date: "2026-07-06",
    readTime: "5 min read",
    url: "https://edenradar.com/blog/before-the-patent-publishes",
  },
  {
    source: "EdenRadar",
    title: "EdenRadar is live.",
    lede: "See the full field before your first move.",
    date: "2026-06-22",
    readTime: "4 min read",
    url: "https://edenradar.com/blog/edenradar-is-live",
  },
  {
    source: "EdenRadar",
    title: "Why now",
    lede: "For decades, the gap between research and treatment was a structural fact you had to accept. It just became a solvable problem.",
    date: "2026-06-23",
    readTime: "4 min read",
    url: "https://edenradar.com/blog/why-now",
  },
  {
    source: "EdenRadar",
    title: "What we mean by \"the index\"",
    lede: "A plain introduction to what EdenRadar actually measures: what a tech transfer office is, what counts as an asset, and why a live index beats a static one.",
    date: "2026-06-26",
    readTime: "3 min read",
    url: "https://edenradar.com/blog/what-we-mean-by-the-index",
  },
  {
    source: "EdenCompliance",
    title: "EdenCompliance is live",
    lede: "The tool we kept waiting for somebody to build. Vendor qualification, audits, and your vendors themselves, on one controlled record.",
    date: "2026-09-25",
    readTime: "4 min read",
    url: "https://edencompliance.com/blog/edencompliance-is-live",
  },
  {
    source: "EdenCompliance",
    title: "What we mean by a controlled record",
    lede: "Nothing is deleted, everything is attributable, and the history is checkable. Here is what each of those actually means.",
    date: "2026-08-12",
    readTime: "5 min read",
    url: "https://edencompliance.com/blog/what-we-mean-by-a-controlled-record",
  },
  {
    source: "EdenCompliance",
    title: "Noticing the cause",
    lede: "Interval-based scheduling is the right backbone. It is also indifferent to news.",
    date: "2026-08-10",
    readTime: "5 min read",
    url: "https://edencompliance.com/blog/for-cause-triggers",
  },
  {
    source: "EdenCompliance",
    title: "Two questions",
    lede: "Nobody asks to see your software. They ask what the list said in March, and who signed it.",
    date: "2026-08-07",
    readTime: "5 min read",
    url: "https://edencompliance.com/blog/two-questions",
  },
  {
    source: "EdenCompliance",
    title: "Nobody's job",
    lede: "Requalification does not lapse through carelessness. It lapses because the chasing has no owner.",
    date: "2026-08-05",
    readTime: "4 min read",
    url: "https://edencompliance.com/blog/nobodys-job",
  },
  {
    source: "EdenCompliance",
    title: "What a spreadsheet cannot do",
    lede: "A workbook holds the current state perfectly well. That is not the part that fails.",
    date: "2026-08-03",
    readTime: "4 min read",
    url: "https://edencompliance.com/blog/what-a-spreadsheet-cannot-do",
  },
  // </sync-insights>
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
