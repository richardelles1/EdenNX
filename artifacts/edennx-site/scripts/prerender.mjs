// Prerender every route to static HTML.
//
// Why this exists: the site is a single-page app, so every URL used to serve
// the same shell. Google will eventually run the JS and see the real page, but
// LinkedIn, Slack and iMessage never do, which meant every link anyone shared
// showed the home card no matter which page it pointed at. Search Console
// submissions do not change that; only bytes in the HTML do.
//
// Run after `vite build` (client) and `vite build --ssr` (server). For each
// route this writes <outDir>/<route>/index.html containing the fully rendered
// markup and that route's own title, description, canonical and OG tags.
//
// Vercel checks the filesystem before it applies the catch-all rewrite in
// vercel.json, so these files are served in preference to the SPA shell.

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const siteRoot = path.resolve(import.meta.dirname, "..");
const clientDir = path.join(siteRoot, "dist/public");
const serverEntry = path.join(siteRoot, "dist/server/entry-server.js");

const shellPath = path.join(clientDir, "index.html");
if (!fs.existsSync(shellPath)) {
  console.error("prerender: no client build at", shellPath);
  process.exit(1);
}
if (!fs.existsSync(serverEntry)) {
  console.error("prerender: no server build at", serverEntry);
  process.exit(1);
}

const { render, ROUTE_META, PRERENDER_ROUTES, SITE_ORIGIN, DEFAULT_OG_IMAGE } = await import(
  pathToFileURL(serverEntry).href
);

const shell = fs.readFileSync(shellPath, "utf8");

// This step is not idempotent, and failing silently would be worse than failing
// loudly. The first run overwrites index.html with the rendered home page, so a
// second run without a fresh client build would read that as its template: the
// root div is no longer empty, the content injection quietly does nothing, and
// every route gets correct metadata wrapped around the home page's markup.
// Right title, wrong page, no error. Refuse instead.
const ROOT_EMPTY = '<div id="root"></div>';
if (!shell.includes(ROOT_EMPTY)) {
  console.error(
    "prerender: dist/public/index.html has already been rendered into.\n" +
      "           Run the client build first: pnpm run build:client",
  );
  process.exit(1);
}

const ogImage = SITE_ORIGIN + DEFAULT_OG_IMAGE;

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Swap the value of an existing tag rather than appending a duplicate. */
function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) {
    console.warn("  ! no match for", pattern);
    return html;
  }
  return html.replace(pattern, replacement);
}

function buildPage(route, meta) {
  const url = SITE_ORIGIN + (route === "/" ? "/" : route);
  const title = escape(meta.title);
  const description = escape(meta.description);

  let html = shell;

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  html = replaceTag(
    html,
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${description}" />`,
  );
  html = replaceTag(
    html,
    /<link rel="canonical"[^>]*\/>/,
    `<link rel="canonical" href="${url}" />`,
  );

  html = replaceTag(html, /<meta property="og:title"[\s\S]*?\/>/, `<meta property="og:title" content="${title}" />`);
  html = replaceTag(
    html,
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${description}" />`,
  );
  html = replaceTag(html, /<meta property="og:url"[^>]*\/>/, `<meta property="og:url" content="${url}" />`);
  html = replaceTag(html, /<meta property="og:image"[^>]*\/>/, `<meta property="og:image" content="${ogImage}" />`);

  html = replaceTag(html, /<meta name="twitter:title"[\s\S]*?\/>/, `<meta name="twitter:title" content="${title}" />`);
  html = replaceTag(
    html,
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${description}" />`,
  );

  const markup = render(route);
  if (!markup || markup.length < 200) {
    throw new Error(`rendered markup for ${route} is suspiciously short (${markup.length} chars)`);
  }
  html = html.replace(ROOT_EMPTY, `<div id="root">${markup}</div>`);

  return html;
}

let written = 0;
for (const route of PRERENDER_ROUTES) {
  const meta = ROUTE_META[route];
  if (!meta) {
    console.warn("prerender: no meta for", route, "- skipped");
    continue;
  }

  let html;
  try {
    html = buildPage(route, meta);
  } catch (err) {
    console.error("prerender: failed on", route);
    console.error(err);
    process.exit(1);
  }

  // "/" is the shell itself. Every other route is written twice, as
  // <route>/index.html and as <route>.html, because static hosts disagree about
  // which one a bare "/products" resolves to: some look for the directory
  // index, some for the sibling .html, and anything that finds neither falls
  // straight through to the SPA rewrite and serves the home page's metadata.
  // Both files are a few kB and writing both removes the guess.
  const outFiles =
    route === "/"
      ? [path.join(clientDir, "index.html")]
      : [path.join(clientDir, route, "index.html"), path.join(clientDir, `${route.slice(1)}.html`)];

  for (const outFile of outFiles) {
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html);
  }

  const kb = Math.round(Buffer.byteLength(html) / 1024);
  const names = outFiles.map((f) => path.relative(clientDir, f).replace(/\\/g, "/")).join(", ");
  console.log(`  ${route.padEnd(12)} -> ${names}  ${kb} kB`);
  written++;
}

console.log(`prerender: ${written} route${written === 1 ? "" : "s"} written`);
