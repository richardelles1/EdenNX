import { renderToString } from "react-dom/server";
// v7 folds react-router's exports through the main entry, so StaticRouter comes
// from here rather than the v6-era "react-router-dom/server" subpath.
import { StaticRouter } from "react-router-dom";
import { AppShell } from "./App";
import { ROUTE_META, PRERENDER_ROUTES, SITE_ORIGIN, DEFAULT_OG_IMAGE } from "@/lib/routeMeta";

// Build-time only. `scripts/prerender.mjs` imports this from the SSR bundle,
// renders each route to HTML, and writes the result into the client build.
//
// Nothing here runs in the browser, and nothing in the app touches window or
// document during render, so the same component tree serves both.

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>,
  );
}

export { ROUTE_META, PRERENDER_ROUTES, SITE_ORIGIN, DEFAULT_OG_IMAGE };
