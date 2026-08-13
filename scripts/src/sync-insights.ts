// Regenerates artifacts/edennx-site/src/lib/insights.ts from each product's
// blog registry, so the EdenNX Insights page stays in step with what the
// products have actually published.
//
// EdenNX publishes nothing of its own: every entry links out to the product
// site that wrote it, and the title, standfirst, date, tag, and read time are
// copied verbatim rather than rewritten. This script enforces that by
// construction instead of by discipline.
//
// Run this by hand after a product publishes, then review the diff and commit.
// That is the whole workflow: no schedule, no bot, no branch to babysit.
//
// Each source is read from a git ref rather than a working tree, so the mirror
// reflects a published branch and never picks up a half-finished local edit.
// Refs are tried in order and the first one that actually carries the blog
// registry wins, so a product moving its blog onto main needs no edit here.
//
// Usage, from the repo root:
//   pnpm --filter @workspace/scripts run sync-insights          apply
//   pnpm --filter @workspace/scripts run sync-insights --check  exit 1 on drift
//
// The registries are self-contained TypeScript (no imports), so they are
// written to a temp file and imported directly. That keeps this in step with
// the real types rather than a regex that silently rots.

import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

type Source = {
  /** Label shown on the Insights filter, and the `source` field in the output. */
  name: "EdenRadar" | "EdenCompliance";
  /** Absolute path to the product repo, or set EDENNX_<NAME>_REPO to override. */
  repo: string;
  /**
   * Candidate refs, most-preferred first. The first one that carries the blog
   * registry is used, so a product that later merges its blog to main is picked
   * up without a code change here. Read-only: nothing is ever pushed to these.
   */
  refs: string[];
  /** Path to the blog registry inside that repo. */
  registry: string;
  /** Public base URL; the post slug is appended. */
  baseUrl: string;
};

const HOME = process.env.USERPROFILE ?? process.env.HOME ?? "";

const SOURCES: Source[] = [
  {
    name: "EdenRadar",
    repo: process.env.EDENNX_EDENRADAR_REPO ?? join(HOME, "EdenRadar"),
    refs: ["origin/main"],
    registry: "shared/blogPosts.ts",
    baseUrl: "https://edenradar.com/blog",
  },
  {
    name: "EdenCompliance",
    repo: process.env.EDENNX_EDENCOMPLIANCE_REPO ?? join(HOME, "edencompliance"),
    // Ships its blog from app-polish today. Once that merges, main wins on its
    // own and the fallback can be deleted whenever somebody is passing through.
    refs: ["origin/main", "origin/app-polish"],
    registry: "shared/blogPosts.ts",
    baseUrl: "https://edencompliance.com/blog",
  },
];

type PostMeta = {
  slug: string;
  title: string;
  lede?: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
};

type Insight = {
  source: Source["name"];
  title: string;
  lede: string;
  date: string;
  tag: string;
  readTime: string;
  url: string;
};

function git(repo: string, args: string[], quiet = false): string {
  return execFileSync("git", ["-C", repo, ...args], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
    // Probing a ref that does not carry the registry is expected, so its
    // "fatal: path ... does not exist" goes nowhere rather than looking like
    // a real failure in the output.
    stdio: quiet ? ["ignore", "pipe", "ignore"] : ["ignore", "pipe", "inherit"],
  });
}

async function readSource(source: Source): Promise<Insight[]> {
  if (!existsSync(source.repo)) {
    throw new Error(
      `${source.name}: repo not found at ${source.repo}. Set EDENNX_${source.name.toUpperCase()}_REPO to its path.`
    );
  }

  // Refresh so a post published since the last run is visible. A fetch failure
  // (offline, no credentials) is survivable: fall back to whatever is local.
  try {
    git(source.repo, ["fetch", "--quiet", "origin"]);
  } catch {
    console.warn(`  ${source.name}: fetch failed, reading the local copy`);
  }

  // First ref that actually carries the registry wins.
  let registry = "";
  let usedRef = "";
  for (const ref of source.refs) {
    try {
      registry = git(source.repo, ["show", `${ref}:${source.registry}`], true);
      usedRef = ref;
      break;
    } catch {
      // This ref does not have the blog yet; try the next one.
    }
  }
  if (!registry) {
    throw new Error(
      `${source.name}: ${source.registry} not found on any of ${source.refs.join(", ")}`
    );
  }

  const dir = mkdtempSync(join(tmpdir(), "edennx-insights-"));
  const file = join(dir, "registry.ts");
  writeFileSync(file, registry, "utf8");

  const mod = (await import(pathToFileURL(file).href)) as { BLOG_POSTS?: PostMeta[] };
  const posts = mod.BLOG_POSTS;
  if (!Array.isArray(posts) || posts.length === 0) {
    throw new Error(`${source.name}: no BLOG_POSTS found in ${usedRef}:${source.registry}`);
  }

  console.log(`  ${source.name}: ${posts.length} posts from ${usedRef}`);

  return posts.map((p) => ({
    source: source.name,
    title: p.title,
    // The contract: the standfirst if the post has one, else its card description.
    lede: p.lede ?? p.description,
    date: p.date,
    tag: p.tags[0] ?? "",
    readTime: p.readTime,
    url: `${source.baseUrl}/${p.slug}`,
  }));
}

/** Newest first; ties broken by source then title so the output is stable. */
function sortInsights(list: Insight[]): Insight[] {
  return [...list].sort(
    (a, b) =>
      (a.date < b.date ? 1 : a.date > b.date ? -1 : 0) ||
      a.source.localeCompare(b.source) ||
      a.title.localeCompare(b.title)
  );
}

const q = (s: string) => JSON.stringify(s);

function render(insights: Insight[]): string {
  const bases = SOURCES.map((s) => `const ${s.name === "EdenRadar" ? "ER" : "EC"} = ${q(s.baseUrl)};`);
  const constName = (url: string) =>
    url.startsWith(SOURCES[0].baseUrl)
      ? `\`\${ER}/${url.slice(SOURCES[0].baseUrl.length + 1)}\``
      : `\`\${EC}/${url.slice(SOURCES[1].baseUrl.length + 1)}\``;

  const entries = insights
    .map(
      (i) => `  {
    source: ${q(i.source)},
    title: ${q(i.title)},
    lede: ${q(i.lede)},
    date: ${q(i.date)},
    tag: ${q(i.tag)},
    readTime: ${q(i.readTime)},
    url: ${constName(i.url)},
  },`
    )
    .join("\n");

  return `// GENERATED FILE. Do not edit by hand.
//
// Regenerated by scripts/src/sync-insights.ts from each product's blog
// registry. Run \`pnpm --filter @workspace/scripts run sync-insights\` after a
// product publishes, or let the weekly job do it.
//
// Aggregated writing from across the product suite. EdenNX does not publish its
// own posts: every entry links out to the product site that wrote it, so the
// canonical URL stays with the product and nothing is duplicated across domains.
// Titles, standfirsts, dates, tags, and read times are copied verbatim.

export type InsightSource = ${SOURCES.map((s) => q(s.name)).join(" | ")};

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

${bases.join("\n")}

export const INSIGHTS: Insight[] = [
${entries}
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
`;
}

async function main() {
  const check = process.argv.includes("--check");
  const here = dirname(fileURLToPath(import.meta.url));

  const out = resolve(here, "../../artifacts/edennx-site/src/lib/insights.ts");

  const all: Insight[] = [];
  for (const source of SOURCES) {
    all.push(...(await readSource(source)));
  }

  const next = render(sortInsights(all));
  const current = existsSync(out) ? readFileSync(out, "utf8") : "";

  if (current === next) {
    console.log(`insights.ts is current (${all.length} entries).`);
    return;
  }

  if (check) {
    console.error("insights.ts is out of date. Run sync-insights to regenerate it.");
    process.exit(1);
  }

  writeFileSync(out, next, "utf8");
  console.log(`Wrote ${out} (${all.length} entries).`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
