import { ASSET_COUNT_LABEL } from "@/lib/platformStats";

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
  photo?: string; // without one, the panel shows the mark instead
  photoAlt?: string;
  // CSS object-position for the 3:2 crop; centre when absent. The EdenTrials
  // photo is a 2:3 portrait, so a centred crop cut the face out.
  photoPosition?: string;
  title: string;
  audience: string;
  features: Feature[]; // six where the claims register supports six
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
      { label: "The deepest index", desc: `${ASSET_COUNT_LABEL} university assets, with patents, trials, and the literature alongside.` },
      { label: "Fit scoring", desc: "Ranked against your buyer profile, not keyword match." },
      { label: "Scored dossiers", desc: "Commercial thesis, competitive position, IP and licensing, each traced to its evidence." },
      { label: "Standing alerts", desc: "Real-time, daily, or weekly on new matches, stage changes, and licensing updates." },
      { label: "Precise filtering", desc: "Six development stages, ten modalities, and thirty-two biology categories." },
      { label: "Whitespace map", desc: "Asset density across every biology and modality, refreshed daily." },
    ],
    // Per-seat as of this revision. edenradar.com still publishes the older
    // tiered pricing ($1,999 for one seat, $8,999 for five); it is being
    // corrected there separately, so the two sites disagree until it lands.
    term: "From $299/seat/mo", // decision 0135; $499 is EdenTrials'
    note: "Every paid plan starts with a 3-day free trial.",
    primary: { label: "Launch EdenRadar", href: ER },
  },

  EdenCompliance: {
    photo: "/images/photo-compliance.jpg",
    photoPosition: "50% 4%",
    photoAlt: "Two colleagues reviewing a document together by a window",
    title: "Vendor qualification and audit management",
    audience:
      "For quality and compliance teams who qualify vendors and run the audit program.",
    features: [
      { label: "Vendor register", desc: "Type, service, location, risk tier, and qualification status, colour-coded on one sortable list." },
      { label: "Audit program", desc: "Risk-based scheduling, with findings logged and classified by severity." },
      { label: "Vendor portal", desc: "A private link with no account to create, and uploads read and filed automatically." },
      { label: "Controlled record", desc: "Append-only, hash-chained, and signed off by re-authentication." },
      { label: "Electronic sign-off", desc: "Re-authenticated signatures on every qualification and audit closure." },
      { label: "Regulation Watch", desc: "FDA and MHRA recall and enforcement actions matched to your vendors, checked daily." },
    ],
    term: "From $299/mo",
    note: "Additional seats from $99. No setup fee.",
    primary: { label: "Open EdenCompliance", href: EC },
  },

  EdenTrials: {
    // The photograph from edentrials.com/login.
    photo: "/images/photo-trials.jpg",
    photoAlt: "A smiling lab technician in a mask and hairnet holding a sample rack",
    photoPosition: "50% 12%",
    title: "A live, global clinical trial network",
    audience: "Every trial the world is running, and everything attached to it.",
    // Six, like every panel, in edentrials.com's live wording (its hero and
    // meta description), the claims register, and the portal's own screens.
    // Tex measured 215 (ceiling 219) on 21 Oct 2026 and gives "210+" as the
    // safe wording, matching edentrials.com.
    features: [
      { label: "National registries", desc: "National clinical trial registries from around the world, read on a schedule." },
      { label: "210+ countries and territories", desc: "Coverage, not completeness: how complete each register is varies." },
      { label: "One vocabulary", desc: "Trial registry records from many registers, resolved into a single vocabulary." },
      { label: "Every version kept", desc: "Every version of every record kept." },
      { label: "Alerts", desc: "Save the question once. A trial registered later that fits it is caught." },
      { label: "Ask Eden", desc: "Ask the record in words. Every answer cites the trials it used." },
    ],
    term: "$499/seat/mo", // Rich via Cleo, 22 Oct
    note: "Sign up at edentrials.com.",
    primary: { label: "Visit EdenTrials", href: "https://edentrials.com" },
  },

  EdenBR: {
    // The photograph from EdenBR's login page.
    photo: "/images/photo-br.jpg",
    photoAlt: "Rows of blue batch-record binders on a shelf",
    title: "Batch tracking that leaves the release decision to people",
    audience: "For manufacturing and quality teams that need to see where every batch sits, and why it is waiting.",
    // Cleo's final lines, 22 Oct 2026.
    features: [
      { label: "Command Center", desc: "A board of every batch and where it stands, with what needs attention first." },
      { label: "Why it is waiting", desc: "The reason a batch has not moved, shown next to the batch." },
      { label: "Quality events", desc: "On their own screen, beside the batches they touch." },
      { label: "The decision stays human", desc: "The release decision stays with your quality unit. EdenBR never makes or records it." },
      { label: "Tracks where every batch sits", desc: "The position of each batch, at a glance." },
      { label: "History", desc: "A dated record of what happened to each batch." },
    ],
    term: "Beta",
    note: "Not open for sign-up yet.",
    primary: { label: "", href: "" },
  },

  EdenMarket: {
    photo: "/images/photo-market.jpg",
    photoAlt: "Two people shaking hands over a laptop during a meeting",
    photoPosition: "50% 0%",
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
    photoPosition: "50% 0%",
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
