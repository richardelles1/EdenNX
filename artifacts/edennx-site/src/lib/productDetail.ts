import { TTO_COUNT_LABEL } from "@/lib/platformStats";

// One standardized record per product. Every product gets exactly the same
// shape: a photograph, six capabilities, an access line, and links out. Nothing
// has more slots than anything else, because the previous version let EdenRadar
// run five times the length of EdenDiscovery, and that inequality said "these
// three are lesser" more loudly than any label.
//
// Depth is deliberately not here. Each product's own site already carries its
// walkthrough, its full feature list, and its pricing, written by the people who
// own it. This page is the directory.

export type Feature = { label: string; desc: string };

export type Detail = {
  photo: string;
  photoAlt: string;
  title: string;
  audience: string;
  features: Feature[]; // always six
  /** The headline commercial term, shown as a pill. */
  term: string;
  /** The qualifier beside it. Never restates the term. */
  note: string;
  primary: { label: string; href: string };
};

const ER = "https://edenradar.com";
const EC = "https://edencompliance.com";

export const DETAIL: Record<string, Detail> = {
  EdenRadar: {
    photo: "/images/photo-radar.jpg",
    photoAlt: "Two researchers working in a plant-filled laboratory",
    title: "Industry intelligence platform",
    audience:
      "For business development teams, licensing executives, pharma strategy divisions, and life science investors who need to know what is available before their competitors do.",
    features: [
      { label: "The deepest index", desc: `${TTO_COUNT_LABEL} tech transfer offices, with patents, trials, and the literature one tab away.` },
      { label: "Precise filtering", desc: "Six development stages, ten modalities, and thirty-two biology categories." },
      { label: "Scored dossiers", desc: "Commercial thesis, competitive position, IP and licensing, each traced to its evidence." },
      { label: "Whitespace map", desc: "Asset density across every biology and modality, refreshed daily." },
      { label: "Deal pipeline", desc: "Watching through In Discussion, in board, grid, and export views." },
      { label: "Standing alerts", desc: "Real-time, daily, or weekly on new matches, stage changes, and licensing updates." },
    ],
    // Per-seat as of this revision. edenradar.com still publishes the older
    // tiered pricing ($1,999 for one seat, $8,999 for five); it is being
    // corrected there separately, so the two sites disagree until it lands.
    term: "$499/seat/mo",
    note: "Every paid plan starts with a 3-day free trial.",
    primary: { label: "Launch EdenRadar", href: ER },
  },

  EdenCompliance: {
    photo: "/images/photo-compliance.jpg",
    photoAlt: "Two colleagues reviewing a document together by a window",
    title: "Vendor quality and audit management",
    audience:
      "For QA and compliance leaders in pharma, biotech, medical device, and food and beverage who need the rigor of an eQMS without the year of configuration.",
    features: [
      { label: "Vendor register", desc: "Type, service, location, risk tier, and qualification status, colour-coded on one sortable list." },
      { label: "Audit program", desc: "Risk-based scheduling, with findings logged and classified by severity." },
      { label: "Vendor portal", desc: "A private link with no account to create, and uploads read and filed automatically." },
      { label: "Controlled record", desc: "Append-only and hash-chained, with every entry SHA-256 sealed." },
      { label: "Electronic sign-off", desc: "Re-authenticated signatures on every qualification and audit closure." },
      { label: "Regulation Watch", desc: "FDA and MHRA recall and enforcement actions matched to your vendors, checked daily." },
    ],
    term: "From $299/mo",
    note: "Additional seats from $99. No setup fee.",
    primary: { label: "Open EdenCompliance", href: EC },
  },

  EdenMarket: {
    photo: "/images/photo-market.jpg",
    photoAlt: "Two people shaking hands over a laptop during a meeting",
    title: "Confidential deal marketplace",
    audience: "For TTOs, biotechs, and inventors meeting industry BD buyers, on terms the seller sets.",
    features: [
      { label: "Blind listings", desc: "Modality, stage, and IP profile are public. The seller is not." },
      { label: "NDA-gated deal rooms", desc: "Documents, messages, and an audit trail, opened once an NDA is signed." },
      { label: "Identity on your terms", desc: "Revealed when both sides agree, and not a moment before." },
      { label: "Expression of interest", desc: "A structured workflow that runs from buyer to seller." },
      { label: "Straight from the index", desc: "A direct line from an indexed asset to the first conversation." },
      { label: "Aligned incentives", desc: "Success-fee only, so nobody pays to list." },
    ],
    term: "Success-fee",
    note: "Nobody pays to list. You pay when a deal closes.",
    primary: { label: "Visit EdenMarket", href: `${ER}/market/preview` },
  },

  EdenLab: {
    photo: "/images/photo-lab.jpg",
    photoAlt: "A researcher working at a laptop beside a handwritten planning sheet",
    title: "Project-based research workspace",
    audience: "For academic scientists, PhD teams, lab leaders, and university research groups.",
    // Taken from the running product rather than the marketing page, which still
    // describes an older eleven-section canvas that no longer exists.
    features: [
      { label: "A 13-section canvas", desc: "Define, Search, Evidence, Analyze, and Translate, in order, on every project." },
      { label: "Search and screening", desc: "Search strategy and PRISMA screening kept on the record." },
      { label: "Risk of bias", desc: "Appraisal stored beside the evidence it judges." },
      { label: "Evidence synthesis", desc: "Data extraction through to results and conclusions." },
      { label: "Discovery Card", desc: "Packages a project for industry visibility. The product calls it the highest-impact section." },
      { label: "Literature and grants", desc: "Forty-plus academic sources, with NIH, NSF, SBIR and foundation matching." },
    ],
    term: "Free",
    note: "For researchers, always. No card required.",
    primary: { label: "Visit EdenLab", href: `${ER}/research` },
  },

  EdenDiscovery: {
    photo: "/images/photo-discovery.jpg",
    photoAlt: "Three colleagues sketching an idea on a glass wall",
    title: "Concept registry and community",
    audience: "For early-stage innovators, concept creators, and independent researchers.",
    features: [
      { label: "Concept registry", desc: "A private, dated record of an idea before formal research begins." },
      { label: "EDEN credibility score", desc: "Zero to one hundred, scored automatically on submission." },
      { label: "Three criteria", desc: "Scientific plausibility, feasibility, and biotech relevance." },
      { label: "Public community feed", desc: "Searchable, and open without an account." },
      { label: "Signal to industry", desc: "Strong concepts surface to the teams already searching that space." },
      { label: "Graduation path", desc: "Promote a concept into a full EdenLab project when the work begins." },
    ],
    term: "Free",
    note: "For researchers, always. No card required.",
    primary: { label: "Visit EdenDiscovery", href: `${ER}/research` },
  },
};
