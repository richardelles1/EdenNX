import { PORTAL_META } from "@/components/PortalBits";
import type { LucideIcon } from "lucide-react";

// Single source of truth for the product suite, driving the nav dropdown (and any
// other product listing). Grouped into "platforms" (available now) and "emerging"
// (in development). EdenRadar and EdenCompliance are the full flagships; EdenMarket
// is the most mature of the emerging set, so it sits with the platforms.
export type ProductTier = "platform" | "emerging";
export type Product = {
  name: string;        // "EdenCompliance"
  suffix: string;      // "Compliance" — the accent-colored half of the wordmark
  tagline: string;     // one line for the dropdown
  status: string;      // "Live" | "New" | "Beta" | "Preview"
  tier: ProductTier;
  token: string;       // portal accent token
  Icon: LucideIcon;
  href: string;        // where the row links
  external: boolean;   // true -> launches the product app in a new tab
};

const meta = (name: string) => PORTAL_META[name] ?? PORTAL_META.EdenRadar;

export const PRODUCTS: Product[] = [
  {
    name: "EdenRadar", suffix: "Radar", tagline: "Industry BD intelligence across 400+ tech transfer offices.",
    status: "Live", tier: "platform", token: meta("EdenRadar").token, Icon: meta("EdenRadar").Icon,
    href: "https://edenradar.com", external: true,
  },
  {
    name: "EdenCompliance", suffix: "Compliance", tagline: "Vendor qualification & audit management for regulated QA teams.",
    status: "New", tier: "platform", token: meta("EdenCompliance").token, Icon: meta("EdenCompliance").Icon,
    href: "https://edencompliance.com", external: true,
  },
  {
    name: "EdenMarket", suffix: "Market", tagline: "NDA-gated marketplace for licensable biotech assets.",
    status: "Beta", tier: "platform", token: meta("EdenMarket").token, Icon: meta("EdenMarket").Icon,
    href: "https://edenradar.com/market/preview", external: true,
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
