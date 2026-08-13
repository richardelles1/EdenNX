import { TTO_COUNT_LABEL } from "@/lib/platformStats";

// Everything the Products canvas shows for each product, in one place.
//
// Two rules run through this file. First, every capability and every price is
// taken from the product's own site, which stays the single source of truth.
// Second, a product shows a real screen or it shows none: three of the five
// have published screenshots, two do not, and the two that do not get their
// facts set as type rather than an interface drawn to look like one.

export type Stage = {
  label: string; // short eyebrow, e.g. "Search"
  title: string;
  desc: string;
  points: string[];
  img: string;
  alt: string;
};

// A typographic panel for the products with no published screenshot. `index` is
// an ordered list that is itself the product (the canvas sections); `columns`
// are named criteria set side by side.
export type Facts = {
  eyebrow: string;
  lead: string;
  index?: string[];
  columns?: { label: string; desc: string }[];
  footnote?: string;
};

export type PriceRow = { label: string; price: string; unit?: string; desc: string };

export type Detail = {
  name: string;
  title: string;
  audience: string;
  /** The product's own app background, painted behind its screens. */
  frameBg?: string;
  stages?: Stage[];
  single?: { img: string; alt: string };
  facts?: Facts;
  bullets?: string[];
  access?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  pricing?: { heading: string; note: string; href: string; rows: PriceRow[] };
  /** Optional closing block, used where a product has a positioning worth stating. */
  aside?: { heading: string; lead: string; items?: { label: string; desc: string; own?: boolean }[]; body?: string };
};

const ER = "https://edenradar.com";
const EC = "https://edencompliance.com";

const RADAR_STAGES: Stage[] = [
  {
    label: "Search",
    title: "The deepest search engine in tech transfer",
    desc: "Search the deepest index of tech transfer assets anywhere, then run the same query across patents, clinical trials, and the literature. Narrow by development stage, modality, and disease biology until only what you are hunting is left.",
    points: [
      `${TTO_COUNT_LABEL} tech transfer offices indexed, with patents, trials, and literature one tab away`,
      "Filter by 6 development stages, 10 modalities, and 32 biology categories",
      "Results ranked by fit to your buyer profile, not just keyword match",
    ],
    img: "/images/shot-radar-search.jpg",
    alt: "EdenRadar search with an active deal focus and matching areas, modalities, and stages",
  },
  {
    label: "Deep dive",
    title: "Every asset, detailed and scored to fit",
    desc: "Open any asset for a structured brief: a match score graded to your search, the commercial thesis, the competitive position, and the licensing and IP picture, each traced back to the evidence it was built from.",
    points: [
      "A match score, graded field by field against your search",
      "Commercial thesis, competitive position, and open questions in plain language",
      "Licensing status, IP, and deal readiness in one view",
    ],
    img: "/images/shot-radar-dossier.jpg",
    alt: "An EdenRadar asset dossier scored 100 out of 100 with its intelligence brief and suggested next step",
  },
  {
    label: "Landscape",
    title: "See the whole board, not one square",
    desc: "Pull back from a single asset to the market around it. The therapeutic whitespace map plots asset density across every biology and modality, so crowded lanes and open territory read at a glance, and any cell opens the programs beneath it.",
    points: [
      "Asset density across every biology and modality, refreshed daily",
      "Spot crowded lanes, open white space, and the modalities gaining momentum",
      "Click any cell to drop into the underlying programs",
    ],
    img: "/images/shot-radar-whitespace.jpg",
    alt: "EdenRadar therapeutic whitespace matrix plotting asset density by biology and modality",
  },
  {
    label: "Pipeline",
    title: "Move a signal all the way to a deal",
    desc: "Saved assets become a working pipeline. Drag each program through your real stages, from Watching to In Discussion, with its score, notes, and licensing status riding on every card. Switch between board, grid, and export views without losing the thread.",
    points: [
      "A board that mirrors your real stages: Watching, Evaluating, In Discussion, On Hold, Passed",
      "Board, grid, and export views for every workflow",
      "Score, notes, and licensing status travel with each asset",
    ],
    img: "/images/shot-radar-board.jpg",
    alt: "EdenRadar pipeline board with assets across Watching, Evaluating, In Discussion, On Hold, and Passed",
  },
  {
    label: "Alerts",
    title: "Real-time alerts, delivered on demand",
    desc: "Turn any saved search into a standing alert. EdenRadar watches for new matches, stage changes, and fresh activity on the programs you track, then tells you the moment something moves.",
    points: [
      "Choose real-time, daily digest, or weekly delivery",
      "Fires on new matches, stage changes, and licensing updates",
      "Email and in-product, with your whole team on the same signals",
    ],
    img: "/images/shot-radar-alerts.jpg",
    alt: "EdenRadar saved alerts watching bispecific antibodies, gene therapy, and CAR-T searches",
  },
];

const COMPLIANCE_STAGES: Stage[] = [
  {
    label: "Register",
    title: "The color-coded vendor register",
    desc: "Every vendor with its type, service, location, risk tier, and current qualification status on one sortable, filterable register. Import the spreadsheet you keep today and this is live in minutes.",
    points: [
      "Type, service, location, risk tier, and status on every row",
      "Sort, filter, and search across your whole vendor base",
      "Color-coded status, so what needs attention reads at a glance",
    ],
    img: "/images/shot-ec-register.jpg",
    alt: "The EdenCompliance vendor register: 32 vendors with type, service, location, contact, and qualification status",
  },
  {
    label: "Audit",
    title: "Findings, logged and classified by severity",
    desc: "You conduct the audit; log and classify each finding by severity, kept on the audit record. Attach your finished audit report and it stays with the findings it came from.",
    points: [
      "Log findings by severity as you go",
      "Classify each finding and keep it on the record",
      "Attach your finished audit report to the audit",
    ],
    img: "/images/shot-ec-findings.jpg",
    alt: "An EdenCompliance audit with findings classified as major, minor, and recommendation",
  },
  {
    label: "Portal",
    title: "The vendor's own portal",
    desc: "Each vendor opens a private link, no account required, sees their standing and expiry with you, and uploads documents the system reads for them. The follow-up runs itself.",
    points: [
      "A private link, with no account for the vendor to create",
      "They see their standing, expiry, and your requests",
      "Uploads are read and filed automatically",
    ],
    img: "/images/shot-ec-portal.jpg",
    alt: "The EdenCompliance vendor portal showing a vendor's qualification standing and document upload",
  },
  {
    label: "Record",
    title: "Signed, and kept on the record",
    desc: "Every change lands on an append-only, hash-chained trail: who, when, and the before and after, each entry sealed. This is the artifact you hand an inspector.",
    points: [
      "Append-only: entries cannot be edited or deleted",
      "Each entry SHA-256 sealed and hash-chained",
      "Print the whole record as the inspection packet",
    ],
    img: "/images/shot-ec-record.jpg",
    alt: "An EdenCompliance record history with electronic signatures and a sealed, append-only change log",
  },
];

export const DETAIL: Record<string, Detail> = {
  EdenRadar: {
    name: "EdenRadar",
    title: "Industry intelligence platform",
    audience:
      "For business development teams, licensing executives, pharma strategy divisions, and life science investors who need to know what is available before their competitors do.",
    frameBg: "#F8F9FB",
    stages: RADAR_STAGES,
    primary: { label: "Launch EdenRadar", href: ER },
    secondary: { label: "Full walkthrough", href: `${ER}/how-it-works` },
    pricing: {
      heading: "Pricing",
      note: "Every paid plan starts with a 3-day free trial. EdenLab and EdenDiscovery are free for researchers, always.",
      href: `${ER}/pricing`,
      rows: [
        { label: "Individual · 1 seat", price: "$1,999", unit: "/mo", desc: "For solo dealmakers, licensing executives, and investors." },
        { label: "Team · 5 seats", price: "$8,999", unit: "/mo", desc: "Shared pipeline lists, saved searches, and a team activity feed." },
        { label: "Team · 10 seats", price: "$16,999", unit: "/mo", desc: "Advanced org reporting and a dedicated account manager." },
        { label: "Enterprise", price: "Custom", desc: "Custom seat count, SLA terms, and data integrations." },
      ],
    },
    aside: {
      heading: "Always connected to what is next.",
      lead: "However your team works, EdenRadar meets you there: alerts in your inbox, answers in plain English, and the full asset graph available to your own tools.",
      items: [
        { label: "Search engine", desc: "The deepest search index in tech transfer, across patents, trials, and the literature." },
        { label: "EDEN AI query", desc: "Ask in plain English across the catalog and get scored, sourced answers." },
        { label: "Email alerts", desc: "New matches, stage changes, and licensing updates in your inbox." },
        { label: "Institutional updates", desc: "New assets from new labs, surfaced as they publish." },
        { label: "API connection", desc: "Pull assets, scores, and dossiers directly into your own stack." },
        { label: "MCP ready", desc: "Connect EDEN to any AI assistant through the MCP server." },
      ],
    },
  },

  EdenCompliance: {
    name: "EdenCompliance",
    title: "Vendor quality and audit management",
    audience:
      "For QA and compliance leaders in pharma, biotech, medical device, and food and beverage who need the rigor of an eQMS without the year of configuration.",
    frameBg: "#F0ECE1",
    stages: COMPLIANCE_STAGES,
    primary: { label: "Open EdenCompliance", href: EC },
    secondary: { label: "Full walkthrough", href: `${EC}/how-it-works` },
    pricing: {
      heading: "Pricing",
      note: "One plan, the whole platform, priced per seat. No setup fee and no multi-year contract. Vendors and auditors connect by secure portal link, so they never need a seat.",
      href: `${EC}/pricing`,
      rows: [
        { label: "Base plan", price: "$299", unit: "/mo", desc: "1 admin, full access to every module. About $249/mo billed annually." },
        { label: "Collaborator", price: "$199", unit: "/mo", desc: "A full seat: create, edit, and sign records." },
        { label: "Reviewer", price: "$99", unit: "/mo", desc: "Read-only. Review and export records." },
        { label: "Enterprise", price: "Custom", desc: "SSO and SAML, higher volumes, dedicated onboarding and SLA." },
      ],
    },
    aside: {
      heading: "The space between a spreadsheet and an enterprise QMS.",
      lead: "Three workflows, not twenty modules. Vendor quality, audits, and vendor collaboration are the whole product, and it runs alongside whatever else your quality system already uses.",
      items: [
        { label: "Spreadsheets and point tools", desc: "Already there, and no trail underneath. Nothing signed, nothing versioned, nothing an inspector can follow." },
        { label: "EdenCompliance", desc: "Live in minutes, on one append-only, hash-chained record, with electronic sign-off and organization isolation.", own: true },
        { label: "Enterprise QMS", desc: "Weeks to months to stand up, and a configuration project before a vendor is qualified." },
      ],
    },
  },

  EdenMarket: {
    name: "EdenMarket",
    title: "Confidential deal marketplace",
    audience: "For TTOs, biotechs, and inventors meeting industry BD buyers, on terms the seller sets.",
    frameBg: "#F8F9FB",
    single: {
      img: "/images/shot-market-listings.jpg",
      alt: "EdenMarket blind listings: modality, stage, and IP profile with the seller identity withheld until an NDA is signed",
    },
    bullets: [
      "NDA-gated deal rooms for licensable assets",
      "Blind by default: modality, stage, and IP profile are public, the seller is not",
      "Identity revealed on your terms, and not before",
      "An expression-of-interest workflow that runs from buyer to seller",
      "A direct line from an indexed asset to the first conversation",
    ],
    access: "Success-fee",
    primary: { label: "Visit EdenMarket", href: `${ER}/market/preview` },
  },

  EdenLab: {
    name: "EdenLab",
    title: "Project-based research workspace",
    audience: "For academic scientists, PhD teams, lab leaders, and university research groups.",
    // No screenshot is published for EdenLab, so the canvas is set as an index
    // rather than drawn as an interface. The eleven sections are the product.
    facts: {
      eyebrow: "The project canvas · 11 sections",
      lead: "Research is non-linear but funding is not. Every translational project gets the same structure, from the first hypothesis through the licensing notes.",
      index: [
        "Hypothesis",
        "Prior art",
        "Mechanism",
        "Study design",
        "Literature",
        "IP strategy",
        "Grants",
        "Collaborators",
        "Timeline",
        "Industry signal",
        "Licensing notes",
      ],
      footnote: "Structured, versioned, and shareable with collaborators. Completeness is scored as you fill it in.",
    },
    bullets: [
      "Literature synthesis across 40+ academic data sources",
      "Evidence extraction and citation management",
      "Grant discovery matched to your research profile, across NIH, NSF, SBIR, and foundations",
      "Published projects become visible to the industry teams searching in EdenRadar",
    ],
    access: "Free for researchers",
    primary: { label: "Visit EdenLab", href: `${ER}/research` },
  },

  EdenDiscovery: {
    name: "EdenDiscovery",
    title: "Concept registry and community",
    audience: "For early-stage innovators, concept creators, and independent researchers.",
    // No screenshot is published for EdenDiscovery either. What the product
    // actually does is score a concept on three named criteria, so those are
    // the content.
    facts: {
      eyebrow: "The EDEN credibility score · 0 to 100",
      lead: "Most research begins long before there is funding, a lab, or a team. A concept registered here is dated, kept, and scored on submission.",
      columns: [
        { label: "Scientific plausibility", desc: "Whether the underlying science holds up." },
        { label: "Feasibility", desc: "Whether it can realistically be built and tested." },
        { label: "Biotech relevance", desc: "Whether industry is looking for this kind of science." },
      ],
      footnote: "A provenance marker for your own files. Not a patent filing, and not a substitute for one.",
    },
    bullets: [
      "A private, dated record of a concept before formal research begins",
      "Every concept scored automatically on submission",
      "A public, searchable community feed",
      "A graduation path: concepts can be promoted into EdenLab projects",
    ],
    access: "Free for researchers",
    primary: { label: "Visit EdenDiscovery", href: `${ER}/research` },
  },
};
