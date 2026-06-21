// Single source of truth for platform-scale figures shown in user-facing copy.
// Mirrors the canonical values in the EdenRadar repo (shared/platformStats.ts)
// so the parent-company site and the product never drift. Update here when the
// EdenRadar canon changes.
//
//   TTO_COUNT_EXACT     412 institutions monitored (exact)
//   TTO_COUNT_LABEL     "400+" — always-safe display range
//   ASSET_COUNT_LABEL   rounded-down display for the live asset total (~35,582)
//   ASSET_COUNT_EXACT   most recent exact reading from the EdenRadar database
//   DATA_SOURCE_LABEL   live data-source families feeding the pipeline

export const TTO_COUNT_EXACT = 412;
export const TTO_COUNT_LABEL = "400+";
export const ASSET_COUNT_EXACT = 35582;
export const ASSET_COUNT_LABEL = "35,000+";
export const DATA_SOURCE_LABEL = "40+";

// Marquee-ready institution credibility list, ordered by asset volume in the
// live database (eden-scout). Real institutions only, no invented names.
export const TOP_INSTITUTIONS = [
  "Johns Hopkins",
  "NIH",
  "Stanford",
  "UCLA",
  "Pittsburgh",
  "KAIST",
  "Wisconsin",
  "Arizona",
  "MIT",
  "Inserm",
  "UC San Diego",
  "Cornell",
  "WashU St. Louis",
  "Purdue",
  "Duke",
  "Columbia",
  "Northwestern",
  "Michigan",
  "Emory",
  "Arizona State",
  "Rutgers",
  "UCSF",
  "Florida",
  "South Florida",
  "Minnesota",
  "SUNY",
  "Penn",
  "UC Davis",
  "UConn",
  "UAB",
  "Ohio State",
  "UT Austin",
  "Weill Cornell",
  "Indiana",
  "Beth Israel",
  "UC Berkeley",
  "NYU Langone",
  "New Mexico",
  "Chicago",
  "Technion",
  "Lawrence Berkeley Lab",
  "Georgia",
  "Penn State",
  "Louisville",
  "South Carolina",
  "Hong Kong UST",
] as const;
