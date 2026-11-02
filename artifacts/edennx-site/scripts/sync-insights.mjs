// Re-mirror src/lib/insights.ts from each product's shared/blogPosts.ts.
//
// The product sites publish no feed this site can fetch at build time (only
// edentrials.com serves a real /rss.xml), so the mirror is still made by a
// person. This script makes it one command instead of a hand copy, and copies
// title, lede, date and read time verbatim: nothing is rewritten here.
//
// Reads origin/main of the local clones (~/eden/<Repo>, or EDEN_REPOS=<dir>).
// Run: node scripts/sync-insights.mjs   (then review the diff; fetch first)
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = process.env.EDEN_REPOS || join(homedir(), "eden");
const OUT = join(dirname(fileURLToPath(import.meta.url)), "../src/lib/insights.ts");
const SOURCES = [
  ["EdenTrials", "https://edentrials.com/blog"],
  ["EdenRadar", "https://edenradar.com/blog"],
  ["EdenCompliance", "https://edencompliance.com/blog"],
];

const field = (blk, k) => {
  const m = blk.match(new RegExp(`\\b${k}:\\s*\\n?\\s*(["'\`])((?:\\\\.|(?!\\1).)*)\\1`, "s"));
  return m ? m[2].replace(/\\(["'])/g, "$1") : null;
};

const rows = [];
for (const [repo, base] of SOURCES) {
  const src = execFileSync("git", ["-C", join(ROOT, repo), "show", "origin/main:shared/blogPosts.ts"], { encoding: "utf8" });
  for (const blk of src.split(/\n\s*\{\s*\n/).slice(1)) {
    const slug = field(blk, "slug"), title = field(blk, "title"), date = field(blk, "date");
    if (!slug || !title || !date) continue;
    rows.push({
      source: repo, title, lede: field(blk, "lede") ?? field(blk, "description") ?? "",
      date, readTime: field(blk, "readTime") ?? "", url: `${base}/${slug}`,
    });
  }
}

const body = rows
  .map((r) => `  {\n${Object.entries(r).map(([k, v]) => `    ${k}: ${JSON.stringify(v)},`).join("\n")}\n  },`)
  .join("\n");
const file = readFileSync(OUT, "utf8");
const next = file.replace(/(\/\/ <sync-insights>\n)[\s\S]*?([ \t]*\/\/ <\/sync-insights>)/, (_, a, b) => `${a}${body}\n${b}`);
if (next === file) console.log("insights.ts: no change");
else { writeFileSync(OUT, next); console.log(`insights.ts: ${rows.length} posts written`); }
