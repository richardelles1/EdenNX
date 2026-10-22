import { PORTAL_META } from "@/components/PortalBits";
import type { LucideIcon } from "lucide-react";

// Single source of truth for the product suite, driving the nav dropdown (and any
// other product listing). Grouped into "platforms" (available now) and "emerging"
// (in development). EdenRadar and EdenCompliance are the full flagships; EdenMarket
// is the most mature of the emerging set, so it sits with the platforms.
export type ProductLink = { label: string; href: string };
export type Product = {
  name: string;        // "EdenCompliance"
  suffix: string;      // "Compliance" — the accent-colored half of the wordmark
  tagline: string;     // one line for the dropdown
  token: string;       // portal accent token (the primary brand color)
  goldToken?: string;  // optional secondary accent (EdenCompliance is forest + gold)
  Icon: LucideIcon;
  href: string;        // where the row heading links (learn first, not the app)
  external: boolean;   // true -> opens in a new tab
  links?: ProductLink[];               // per-product info pages (platforms)
  launch?: { label: string; href: string }; // open-the-app CTA (platforms)
  beta?: boolean;      // Beta: listed, not linked
};

const meta = (name: string) => PORTAL_META[name] ?? PORTAL_META.EdenRadar;

// Info pages that already live on each product's own site — linked, never copied,
// so each product stays the single source of truth. Only pages that actually exist
// are listed (verified live): EdenRadar has no /features page, so it is omitted there.
const ER = "https://edenradar.com";
const EC = "https://edencompliance.com";
const ET = "https://edentrials.com";
const pages = (base: string, defs: [string, string][]): ProductLink[] => defs.map(([label, slug]) => ({ label, href: `${base}${slug}` }));

export const PRODUCTS: Product[] = [
  {
    name: "EdenRadar", suffix: "Radar", tagline: "Industry BD intelligence from university tech transfer offices.",
    token: meta("EdenRadar").token, Icon: meta("EdenRadar").Icon,
    href: `${ER}/how-it-works`, external: true, launch: { label: "Launch EdenRadar", href: ER },
    links: pages(ER, [["How it works", "/how-it-works"], ["Pricing", "/pricing"], ["One-pager", "/one-pager"]]),
  },
  {
    name: "EdenCompliance", suffix: "Compliance", tagline: "Vendor qualification & audit management for regulated QA teams.",
    token: meta("EdenCompliance").token, goldToken: "--portal-compliance-gold", Icon: meta("EdenCompliance").Icon,
    href: `${EC}/how-it-works`, external: true, launch: { label: "Open EdenCompliance", href: EC },
    links: pages(EC, [["How it works", "/how-it-works"], ["Features", "/features"], ["Pricing", "/pricing"], ["One-pager", "/one-pager"]]),
  },
  {
    name: "EdenMarket", suffix: "Market", tagline: "NDA-gated marketplace for licensable biotech assets.",
    token: meta("EdenMarket").token, Icon: meta("EdenMarket").Icon,
    href: `${ER}/market/preview`, external: true,
  },
  {
    name: "EdenLab", suffix: "Lab", tagline: "Project-based research workspace for scientists.",
    token: meta("EdenLab").token, Icon: meta("EdenLab").Icon,
    href: "/products#edenlab", external: false,
  },
  {
    name: "EdenDiscovery", suffix: "Discovery", tagline: "Concept registry with EDEN credibility scoring.",
    token: meta("EdenDiscovery").token, Icon: meta("EdenDiscovery").Icon,
    href: "/products#edendiscovery", external: false,
  },
];

// EdenTrials and EdenBR (Beta, no link yet). SUITE below is the whole suite in
// display order, and is what the menus, canvas and cards list.
export const BETA_PRODUCTS: Product[] = [
  {
    name: "EdenTrials", suffix: "Trials", tagline: "Trial registry records in one vocabulary, with the change record kept.",
    token: meta("EdenTrials").token, Icon: meta("EdenTrials").Icon,
    href: `${ET}/how-it-works`, external: true, launch: { label: "Launch EdenTrials", href: ET },
    links: pages(ET, [["How it works", "/how-it-works"], ["Pricing", "/pricing"], ["One-pager", "/one-pager"]]),
  },
  {
    name: "EdenBR", suffix: "BR", tagline: "Tracks where a batch sits. Never makes the release decision.",
    token: meta("EdenBR").token, Icon: meta("EdenBR").Icon,
    href: "/products#edenbr", external: false, beta: true,
  },
];

export const SUITE: Product[] = [PRODUCTS[0], PRODUCTS[1], ...BETA_PRODUCTS, ...PRODUCTS.slice(2)];

// Marks are cropped to their ink and square. The Radar mark is the dot globe from
// the EdenRadar lockup, without the wordmark band.
export function markStyle(_name: string, size: number): { width: number; height: number } {
  return { width: size, height: size };
}

export const MARKS: Record<string, string> = {
  EdenRadar: "/images/marks/mark-radar.svg",
  EdenCompliance: "/images/marks/mark-compliance.png",
  EdenTrials: "/images/marks/mark-trials.svg", // edentrials.com's own nav mark: the pulse line on its blue square
  EdenBR: "/images/marks/mark-br.png",
};

