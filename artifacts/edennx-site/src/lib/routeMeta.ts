import { TTO_COUNT_LABEL, ASSET_COUNT_LABEL } from "@/lib/platformStats";

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
    description: `The backbone biotech runs on. EdenNX builds EdenRadar for licensing intelligence across ${TTO_COUNT_LABEL} research institutions and ${ASSET_COUNT_LABEL} assets, and EdenCompliance for vendor quality and audit records.`,
  },
  "/products": {
    title: "Products | EdenRadar, EdenCompliance and the EdenNX suite",
    description:
      "The five EdenNX products: EdenRadar for biotech BD intelligence across 430+ tech transfer offices, EdenCompliance for vendor quality and audits on a controlled record, plus EdenMarket, EdenLab, and EdenDiscovery.",
  },
  "/about": {
    title: "About EdenNX | Mission and the EDEN framework",
    description:
      "EdenNX is building the intelligence backbone of modern biotech. Our mission, values, and the EDEN framework that guides everything we do.",
  },
  "/team": {
    title: "Team | The founders behind EdenNX",
    description:
      "Meet the founders behind EdenNX: industry insiders building the intelligence infrastructure that biotech needs.",
  },
  "/insights": {
    title: "Insights | Tech transfer and regulated quality",
    description:
      "Writing from across the EdenNX product suite: analysis of academic licensing, tech transfer, and regulated quality from the EdenRadar and EdenCompliance teams.",
  },
  "/contact": {
    title: "Contact EdenNX | Demos and partnerships",
    description:
      "Get in touch with EdenNX. Whether you're interested in a product demo, a partnership, or just want to learn more, we'd love to hear from you.",
  },
  "/privacy": {
    title: "Privacy Policy - EdenNX",
    description: "How EdenNX collects, uses, and protects the information you share with us.",
  },
  "/terms": {
    title: "Terms of Service - EdenNX",
    description: "The terms that govern your use of the EdenNX website.",
  },
};

/** The routes the build prerenders. 404 is deliberately not one of them. */
export const PRERENDER_ROUTES = Object.keys(ROUTE_META);

export const NOT_FOUND_META: RouteMeta = {
  title: "Page not found - EdenNX",
  description: "The page you are looking for does not exist.",
};
