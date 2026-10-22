import { ASSET_COUNT_LABEL } from "@/lib/platformStats";

// Title and description for every route, in one place.
//
// This exists because the same strings are needed twice: once in the browser,
// where useSEO sets them after the app mounts, and once at build time, where
// the prerenderer writes them into each route's static HTML. Social crawlers
// never run JS, so the build-time copy is the one that decides what a link
// looks like when somebody pastes it into LinkedIn or Slack. Two hand-kept
// copies of the same strings would drift the first time anyone edited a page.

export type RouteMeta = { title: string; description: string };

export const SITE_ORIGIN = "https://edennx.com";
export const DEFAULT_OG_IMAGE = "/og-image.png";

export const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    // The headline no longer spells out the category, so the title and
    // description carry those terms instead. Counts come from platformStats so
    // the meta cannot drift from the figures used on the page.
    title: "EdenNX | Biotech intelligence infrastructure",
    description: `The backbone biotech runs on. EdenNX builds EdenRadar for licensing intelligence across ${ASSET_COUNT_LABEL} university assets, EdenCompliance for vendor qualification and audit records, EdenTrials for trial registry records, and EdenBR in Beta.`,
  },
  "/products": {
    title: "Products | EdenRadar, EdenCompliance and the EdenNX suite",
    description:
      `The EdenNX products: EdenRadar for biotech BD intelligence across ${ASSET_COUNT_LABEL} university assets, EdenCompliance for vendor qualification and audits on a controlled record, EdenTrials for trial registry records in one vocabulary, and EdenBR in Beta. EdenLab, EdenDiscovery and EdenMarket are emerging.`,
  },
  "/about": {
    title: "About EdenNX | The founders, the mission and the EDEN framework",
    description:
      "EdenNX is the intelligence backbone of modern biotech. Meet the founders, and read the mission and the EDEN framework behind the product suite.",
  },
  "/insights": {
    title: "Insights | Tech transfer and regulated quality",
    description:
      "Writing from across the EdenNX product suite: analysis of academic licensing, tech transfer, and regulated quality from the EdenRadar and EdenCompliance teams.",
  },
  "/contact": {
    title: "Contact EdenNX | Demos and partnerships",
    description:
      "Contact EdenNX about a product demo, a partnership, or a question about the product suite. We reply within one to two business days.",
  },
  "/privacy": {
    title: "Privacy Policy - EdenNX",
    description: "How EdenNX collects, uses, and protects the information you share with us.",
  },
  "/terms": {
    title: "Terms of Service - EdenNX",
    description: "The terms that govern your use of the EdenNX website.",
  },
  // Preview only (card placement and directions); never merged to main.
  "/preview/home-cards-a": { title: "Preview: home led by cards, A", description: "Preview." },
  "/preview/home-cards-b": { title: "Preview: home led by cards, B", description: "Preview." },
  "/preview/home-statements": { title: "Preview: home, statements", description: "Preview." },
  "/preview/home-quarters": { title: "Preview: home, four quarters", description: "Preview." },
  "/preview/home-path": { title: "Preview: home, the path", description: "Preview." },
  "/preview/home-spotlight": { title: "Preview: home, statements spotlight", description: "Preview." },
  "/preview/home-ledger": { title: "Preview: home, statements ledger", description: "Preview." },
  "/preview/home-stage": { title: "Preview: home, statements stage", description: "Preview." },
  "/preview/home-features": { title: "Preview: home, dropdown with screens", description: "Preview." },
  "/preview/products-a": { title: "Preview: products, cards A", description: "Preview." },
  "/preview/products-b": { title: "Preview: products, cards B", description: "Preview." },
  "/preview/products-scroller": { title: "Preview: products, scroller", description: "Preview." },
};

/** The routes the build prerenders. 404 is deliberately not one of them. */
export const PRERENDER_ROUTES = Object.keys(ROUTE_META);

export const NOT_FOUND_META: RouteMeta = {
  title: "Page not found - EdenNX",
  description: "The page you are looking for does not exist.",
};
