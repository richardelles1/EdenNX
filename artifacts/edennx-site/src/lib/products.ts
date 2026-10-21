import { PORTAL_META } from "@/components/PortalBits";
import type { LucideIcon } from "lucide-react";

// Single source of truth for the product suite, driving the nav dropdown (and any
// other product listing). Grouped into "platforms" (available now) and "emerging"
// (in development). EdenRadar and EdenCompliance are the full flagships; EdenMarket
// is the most mature of the emerging set, so it sits with the platforms.
export type ProductTier = "platform" | "emerging";
export type ProductLink = { label: string; href: string };
export type Product = {
  name: string;        // "EdenCompliance"
  suffix: string;      // "Compliance" — the accent-colored half of the wordmark
  tagline: string;     // one line for the dropdown
  status: string;      // "Live" | "New" | "Beta" | "Preview"
  tier: ProductTier;
  token: string;       // portal accent token (the primary brand color)
  goldToken?: string;  // optional secondary accent (EdenCompliance is forest + gold)
  Icon: LucideIcon;
  href: string;        // where the row heading links (learn first, not the app)
  external: boolean;   // true -> opens in a new tab
  links?: ProductLink[];               // per-product info pages (platforms)
  launch?: { label: string; href: string }; // open-the-app CTA (platforms)
};

const meta = (name: string) => PORTAL_META[name] ?? PORTAL_META.EdenRadar;

// Info pages that already live on each product's own site — linked, never copied,
// so each product stays the single source of truth. Only pages that actually exist
// are listed (verified live): EdenRadar has no /features page, so it is omitted there.
const ER = "https://edenradar.com";
const EC = "https://edencompliance.com";
const pages = (base: string, defs: [string, string][]): ProductLink[] => defs.map(([label, slug]) => ({ label, href: `${base}${slug}` }));

export const PRODUCTS: Product[] = [
  {
    name: "EdenRadar", suffix: "Radar", tagline: "Industry BD intelligence across 430+ tech transfer offices.",
    status: "Live", tier: "platform", token: meta("EdenRadar").token, Icon: meta("EdenRadar").Icon,
    href: `${ER}/how-it-works`, external: true, launch: { label: "Launch EdenRadar", href: ER },
    links: pages(ER, [["How it works", "/how-it-works"], ["Pricing", "/pricing"], ["One-pager", "/one-pager"]]),
  },
  {
    name: "EdenCompliance", suffix: "Compliance", tagline: "Vendor qualification & audit management for regulated QA teams.",
    status: "New", tier: "platform", token: meta("EdenCompliance").token, goldToken: "--portal-compliance-gold", Icon: meta("EdenCompliance").Icon,
    href: `${EC}/how-it-works`, external: true, launch: { label: "Open EdenCompliance", href: EC },
    links: pages(EC, [["How it works", "/how-it-works"], ["Features", "/features"], ["Pricing", "/pricing"], ["One-pager", "/one-pager"]]),
  },
  {
    name: "EdenMarket", suffix: "Market", tagline: "NDA-gated marketplace for licensable biotech assets.",
    status: "Beta", tier: "platform", token: meta("EdenMarket").token, Icon: meta("EdenMarket").Icon,
    href: `${ER}/market/preview`, external: true,
  },
  {
    name: "EdenLab", suffix: "Lab", tagline: "Project-based research workspace for scientists.",
    status: "Preview", tier: "emerging", token: meta("EdenLab").token, Icon: meta("EdenLab").Icon,
    href: "/products#edenlab", external: false,
  },
  {
    name: "EdenDiscovery", suffix: "Discovery", tagline: "Concept registry with EDEN credibility scoring.",
    status: "Preview", tier: "emerging", token: meta("EdenDiscovery").token, Icon: meta("EdenDiscovery").Icon,
    href: "/products#edendiscovery", external: false,
  },
];

export const PLATFORM_PRODUCTS = PRODUCTS.filter((p) => p.tier === "platform");
export const EMERGING_PRODUCTS = PRODUCTS.filter((p) => p.tier === "emerging");
