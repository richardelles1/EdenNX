// Aggregated writing from across the product suite. EdenNX does not publish its
// own posts: every entry links out to the product site that wrote it, so the
// canonical URL stays with the product and nothing is duplicated across domains.
//
// Mirrored by hand from each product's `shared/blogPosts.ts`. Titles, standfirsts,
// descriptions, dates, and read times are copied verbatim, never rewritten.
//
// This cannot update itself, and CORS is no longer the reason. Both sites now
// send Access-Control-Allow-Origin: *, but neither publishes anything a machine
// can read: /blog.json, /rss.xml and /feed.xml all fall through to the SPA
// shell, the blog index renders client-side, and every post serves the same
// site-level og:title and og:description rather than its own. There is nothing
// to fetch.
//
// Until one of them ships a real feed, this file only changes when a person
// changes it, which is exactly how five EdenCompliance posts went missing from
// the parent site for a fortnight.
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
    readTime: "4 min read",
    url: `${ER}/what-the-index-is-made-of`,
  },
  {
    source: "EdenCompliance",
    title: "What we mean by a controlled record",
    lede: "A plain account of what a controlled record is: append-only history, what a signature captures, what a hash chain proves, and where the line sits.",
    date: "2026-08-12",
    readTime: "5 min read",
    url: `${EC}/what-we-mean-by-a-controlled-record`,
  },
  {
    source: "EdenRadar",
    title: "The top ten institutions hold less than you would guess",
    lede: "A third of the index sits outside the fifty largest offices, and a tenth of it is federal.",
    date: "2026-08-12",
    readTime: "4 min read",
    url: `${ER}/outside-the-top-tier`,
  },
  {
    source: "EdenRadar",
    title: "What the fit score does not know",
    lede: "A ranked list makes a claim tens of thousands of times a day. Here is where its knowledge stops.",
    date: "2026-08-05",
    readTime: "3 min read",
    url: `${ER}/what-the-fit-score-does-not-know`,
  },
  {
    source: "EdenRadar",
    title: "One office's preclinical is another's discovery",
    lede: "Stage is one of the first fields people filter on, and one of the least reliable fields in a listing.",
    date: "2026-07-30",
    readTime: "4 min read",
    url: `${ER}/stage-language-is-not-standard`,
  },
  {
    source: "EdenRadar",
    title: "What a tech transfer office is actually optimizing for",
    lede: "A licensing office is not a sales organization, and approaching it as one costs deals that were otherwise available.",
    date: "2026-07-17",
    readTime: "5 min read",
    url: `${ER}/what-a-tto-optimizes-for`,
  },
  {
    source: "EdenRadar",
    title: "Four places an asset surfaces before the patent does",
    lede: "The eighteen-month patent lag is real. It is also not the only record a piece of science leaves behind.",
    date: "2026-07-06",
    readTime: "5 min read",
    url: `${ER}/before-the-patent-publishes`,
  },
  {
    source: "EdenRadar",
    title: 'What we mean by "the index"',
    lede: "A plain introduction to what EdenRadar actually measures: what a tech transfer office is, what counts as an asset, and why a live index beats a static one.",
    date: "2026-06-26",
    readTime: "3 min read",
    url: `${ER}/what-we-mean-by-the-index`,
  },
  {
    source: "EdenRadar",
    title: "Why now",
    lede: "For decades, the gap between research and treatment was a structural fact you had to accept. It just became a solvable problem.",
    date: "2026-06-23",
    readTime: "4 min read",
    url: `${ER}/why-now`,
  },
  {
    source: "EdenRadar",
    title: "EdenRadar is live.",
    lede: "See the full field before your first move.",
    date: "2026-06-22",
    readTime: "4 min read",
    url: `${ER}/edenradar-is-live`,
  },
  {
    source: "EdenCompliance",
    title: "EdenCompliance is live.",
    lede: "Vendor qualification, audits, and a two-way vendor portal on one controlled record.",
    date: "2026-08-12",
    readTime: "4 min read",
    url: `${EC}/edencompliance-is-live`,
  },
  {
    source: "EdenCompliance",
    title: "Noticing the cause",
    lede: "When a for cause supplier audit is warranted: the trigger categories worth naming in advance, and the one category attention alone cannot cover.",
    date: "2026-08-10",
    readTime: "5 min read",
    url: `${EC}/for-cause-triggers`,
  },
  {
    source: "EdenCompliance",
    title: "Two questions",
    lede: "An approved vendor list is a document issued from a live register. What it takes to prove any past version of it, and who approved what.",
    date: "2026-08-07",
    readTime: "5 min read",
    url: `${EC}/two-questions`,
  },
  {
    source: "EdenCompliance",
    title: "Nobody's job",
    lede: "Vendor requalification lapses because the follow-up sits between roles. Why reminders do not fix it, and what changes when the request is shared.",
    date: "2026-08-05",
    readTime: "4 min read",
    url: `${EC}/nobodys-job`,
  },
  {
    source: "EdenCompliance",
    title: "What a spreadsheet cannot do",
    lede: "Vendor qualification tracking in a spreadsheet works until somebody asks about the past. The precise point it breaks, and when it is still the right tool.",
    date: "2026-08-03",
    readTime: "4 min read",
    url: `${EC}/what-a-spreadsheet-cannot-do`,
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
