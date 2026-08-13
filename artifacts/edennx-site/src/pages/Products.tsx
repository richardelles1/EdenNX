import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Sparkles, Search, Plug, Boxes, Building2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { PortalEyebrow } from "@/components/PortalBits";
import { StageRail, StageStepper, type Stage } from "@/components/ProductStages";
import { LabCanvas, DiscoveryScore } from "@/components/SuiteVignettes";
import { TTO_COUNT_LABEL, ASSET_COUNT_LABEL } from "@/lib/platformStats";

// The page is deliberately two-tiered. EdenRadar and EdenCompliance are full
// platforms in market and get a real walkthrough with their own product screens;
// EdenLab, EdenDiscovery, and EdenMarket are emerging and get a compact three-up.
// The previous version ran the same template five times, which gave five products
// of very different maturity identical weight and told a reader nothing about
// which of them they could buy today.

const ER = "https://edenradar.com";
const EC = "https://edencompliance.com";

/* ------------------------------- EdenRadar ------------------------------- */

// The five capabilities EdenRadar walks through on its own how-it-works page,
// each with the screen that page uses. Wording follows the product's, with its
// legacy "Scout" naming resolved to the current one.
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

const radarTiers = [
  { name: "Individual · 1 seat", price: "$1,999", desc: "For solo dealmakers, licensing executives, and investors." },
  { name: "Team · 5 seats", price: "$8,999", desc: "Shared pipeline lists, saved searches, and a team activity feed." },
  { name: "Team · 10 seats", price: "$16,999", desc: "Advanced org reporting and a dedicated account manager." },
  { name: "Enterprise", price: "Custom", desc: "Custom seat count, SLA terms, and data integrations." },
];

// The ways EdenRadar reaches a team that is not sitting in the product. These
// used to sit at the bottom of the page as if they described the whole suite;
// they describe EdenRadar, so they live under EdenRadar.
const connectItems = [
  { icon: Search, label: "Search engine", desc: "The deepest search index in tech transfer, across patents, trials, and the literature." },
  { icon: Sparkles, label: "EDEN AI query", desc: "Ask in plain English across the catalog and get scored, sourced answers." },
  { icon: Bell, label: "Email alerts", desc: "New matches, stage changes, and licensing updates in your inbox." },
  { icon: Building2, label: "Institutional updates", desc: "New assets from new labs, surfaced as they publish." },
  { icon: Plug, label: "API connection", desc: "Pull assets, scores, and dossiers directly into your own stack." },
  { icon: Boxes, label: "MCP ready", desc: "Connect EDEN to any AI assistant through the MCP server." },
];

/* ----------------------------- EdenCompliance ---------------------------- */

// The four stages EdenCompliance walks through on its own how-it-works page, with
// its own product screens. It describes them as one controlled record moving
// through a program, so they are stepped rather than listed.
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

const complianceSeats = [
  { name: "Base plan", price: "$299", unit: "/mo", desc: "1 admin, full access to every module. About $249/mo billed annually." },
  { name: "Collaborator", price: "$199", unit: "/mo", desc: "A full seat: create, edit, and sign records." },
  { name: "Reviewer", price: "$99", unit: "/mo", desc: "Read-only. Review and export records." },
  { name: "Enterprise", price: "Custom", unit: "", desc: "SSO and SAML, higher volumes, dedicated onboarding and SLA." },
];

/* -------------------------------- Emerging ------------------------------- */

const emerging = [
  {
    name: "EdenLab",
    token: "--portal-lab",
    status: "Preview",
    title: "Project-based research workspace",
    audience: "Built for academic scientists, PhD teams, and university research groups.",
    points: [
      "An eleven-section project canvas, from hypothesis through licensing notes",
      "Literature synthesis across 40+ academic data sources",
      "Grant discovery matched to your research profile",
      "Published projects become visible to EdenRadar's industry buyers",
    ],
    access: "Free for researchers",
    href: `${ER}/research`,
    Visual: LabCanvas,
  },
  {
    name: "EdenDiscovery",
    token: "--portal-discovery",
    status: "Preview",
    title: "Concept registry and community",
    audience: "Built for early-stage innovators, concept creators, and independent researchers.",
    points: [
      "A private, dated record of a concept before formal research begins",
      "An EDEN credibility score on a 0 to 100 scale, on submission",
      "A public, searchable community feed",
      "A graduation path: concepts can be promoted into EdenLab projects",
    ],
    access: "Free for researchers",
    href: `${ER}/research`,
    Visual: DiscoveryScore,
  },
  {
    name: "EdenMarket",
    token: "--portal-market",
    status: "Beta",
    title: "Confidential deal marketplace",
    audience: "Built for TTOs, biotechs, and inventors meeting industry BD buyers.",
    points: [
      "NDA-gated deal rooms for licensable assets",
      "Blind by default: identity revealed on your terms, not before",
      "An expression-of-interest workflow from buyer to seller",
      "A direct line from an indexed asset to the first conversation",
    ],
    access: "Success-fee",
    href: `${ER}/market/preview`,
    img: "/images/shot-market-listings.jpg",
  },
];

/* --------------------------------- Spine --------------------------------- */

// How the four intelligence products connect, as EdenRadar itself describes the
// path on its research page. This replaces a four-stage "EDEN data pipeline"
// that only ever described EdenRadar while sitting at the bottom of the page as
// though it explained the suite.
const spine = [
  { step: "Register your idea", product: "EdenDiscovery", token: "--portal-discovery", desc: "Score a concept before the science starts, and keep a dated record of the work." },
  { step: "Build your project", product: "EdenLab", token: "--portal-lab", desc: "A structured workspace for translational research: hypothesis, grants, and IP in one place." },
  { step: "Get discovered", product: "EdenRadar", token: "--portal-radar", desc: "The asset surfaces to the industry teams searching that indication and modality. No pitch required." },
  { step: "Control the deal", product: "EdenMarket", token: "--portal-market", desc: "List when you are ready. Blind by default, with identity revealed only when you agree." },
];

/* ------------------------------- Section nav ------------------------------ */

const SECTIONS: [string, string][] = [
  ["EdenRadar", "edenradar"],
  ["EdenCompliance", "edencompliance"],
  ["Emerging", "emerging"],
  ["How it connects", "how-it-connects"],
];

// Sticky below the header, tracking which section the reader is in. It sits at
// the height the header's scrolled pill clears, so the two never overlap.
function SectionNav() {
  const [active, setActive] = useState("edenradar");

  useEffect(() => {
    // A callback only carries the sections whose visibility just changed, so the
    // running state of every section is kept here and the highest one still on
    // screen wins. Reading only the entries would leave the pill stuck on the
    // previous section whenever a jump fires a single "left the screen" event.
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        const first = SECTIONS.find(([, id]) => visible.has(id));
        if (first) setActive(first[1]);
      },
      { rootMargin: "-140px 0px -55% 0px" }
    );
    for (const [, id] of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-[84px] z-30 flex justify-center px-4">
      <nav
        aria-label="Product sections"
        className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-border bg-background/95 p-1 shadow-lg backdrop-blur-xl"
      >
        {SECTIONS.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            data-testid={`section-nav-${id}`}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold tracking-tight transition-colors ${
              active === id ? "bg-primary text-primary-foreground" : "text-foreground/65 hover:text-foreground"
            }`}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}

/* -------------------------------- Helpers -------------------------------- */

function SectionHead({
  name,
  title,
  audience,
  children,
}: {
  name: string;
  title: string;
  audience: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-10 max-w-3xl lg:mb-12">
      <div className="mb-3 reveal">
        <PortalEyebrow name={name} nameClassName="text-lg" iconClassName="h-[22px] w-[22px]" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-[2.6rem] md:leading-[1.1] reveal" style={{ transitionDelay: "0.05s" }}>
        {title}
      </h2>
      <p className="mt-3 text-[17px] leading-relaxed text-foreground/70 reveal" style={{ transitionDelay: "0.1s" }}>
        {audience}
      </p>
      {children}
    </div>
  );
}

function AccentButton({ href, token, children, testid }: { href: string; token: string; children: React.ReactNode; testid?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testid}
      className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[14.5px] font-semibold text-white transition-opacity hover:opacity-90"
      style={{ background: `hsl(var(${token}))` }}
    >
      {children}
    </a>
  );
}

export default function Products() {
  useScrollReveal();
  useSEO({
    title: "Products | EdenRadar, EdenCompliance and the EdenNX suite",
    description:
      "Two platforms in market: EdenRadar, biotech BD intelligence across 430+ tech transfer offices, and EdenCompliance, vendor quality and audit management on a controlled record. Plus EdenLab, EdenDiscovery, and EdenMarket.",
  });

  return (
    <div className="pt-16">
      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 pb-14 pt-24 lg:px-8 lg:pb-16 lg:pt-32">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary reveal">The Product Suite</p>
        <h1
          className="max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-5xl md:leading-[1.08] reveal"
          style={{ transitionDelay: "0.1s" }}
          data-testid="products-headline"
        >
          Two platforms in market. Three more on the way.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground reveal" style={{ transitionDelay: "0.2s" }}>
          EdenNX is the parent company. <strong className="font-semibold text-foreground/85">EdenRadar</strong> tracks{" "}
          {ASSET_COUNT_LABEL} assets across {TTO_COUNT_LABEL} institutions for the teams doing biotech deals.{" "}
          <strong className="font-semibold text-foreground/85">EdenCompliance</strong> runs vendor quality and audits for
          regulated teams, on a record an inspector can read. Different jobs, one company behind them, with EdenLab,
          EdenDiscovery, and EdenMarket coming up behind.
        </p>
      </section>

      <SectionNav />

      {/* ------------------------------ EdenRadar ----------------------------- */}
      <section
        id="edenradar"
        className="scroll-mt-32 border-t-4 py-20 lg:py-24"
        style={{ borderColor: "hsl(var(--portal-radar))", background: "hsl(var(--portal-radar) / 0.045)" }}
        data-testid="product-section-edenradar"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHead
            name="EdenRadar"
            title="Industry intelligence platform"
            audience="For business development teams, licensing executives, pharma strategy divisions, and life science investors who need to know what is available before their competitors do."
          >
            <div className="mt-6 flex flex-wrap items-center gap-3 reveal" style={{ transitionDelay: "0.15s" }}>
              <AccentButton href={ER} token="--portal-radar" testid="visit-edenradar">
                Launch EdenRadar →
              </AccentButton>
              <a
                href={`${ER}/how-it-works`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14.5px] font-semibold text-foreground/65 transition-colors hover:text-primary"
              >
                Full walkthrough
              </a>
            </div>
          </SectionHead>

          <div className="reveal">
            <StageRail stages={RADAR_STAGES} token="--portal-radar" frameBg="#F8F9FB" />
          </div>

          {/* Reach: how EdenRadar meets a team that is not in the product */}
          <div className="mt-16 border-t pt-12 reveal" style={{ borderColor: "hsl(var(--portal-radar) / 0.2)" }}>
            <h3 className="text-xl font-bold tracking-tight text-foreground">Always connected to what is next.</h3>
            <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-foreground/70">
              However your team works, EdenRadar meets you there: alerts in your inbox, answers in plain English, and the
              full asset graph available to your own tools.
            </p>
            <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {connectItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3" data-testid={`connect-${item.label}`}>
                  <item.icon className="mt-0.5 h-[18px] w-[18px] flex-shrink-0" strokeWidth={2.25} style={{ color: "hsl(var(--portal-radar))" }} />
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-foreground">{item.label}</p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-foreground/65">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="mt-16 border-t pt-12 reveal" style={{ borderColor: "hsl(var(--portal-radar) / 0.2)" }}>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">EdenRadar pricing</h3>
                <p className="mt-1.5 text-sm text-foreground/65">
                  Every paid plan starts with a 3-day free trial. EdenLab and EdenDiscovery are free for researchers, always.
                </p>
              </div>
              <a
                href={`${ER}/pricing`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-sm font-semibold text-primary hover:underline"
              >
                Full pricing on EdenRadar.com →
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {radarTiers.map((tier, i) => (
                <div
                  key={tier.price}
                  className="flex flex-col rounded-xl border border-border bg-card p-5"
                  data-testid={`pricing-tier-${i}`}
                >
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{tier.name}</p>
                  <p className="mb-2 text-2xl font-bold tracking-tight text-foreground">
                    {tier.price}
                    {tier.price !== "Custom" && <span className="text-sm font-medium text-foreground/50">/mo</span>}
                  </p>
                  <p className="mb-5 flex-1 text-[13px] leading-relaxed text-foreground/65">{tier.desc}</p>
                  <a
                    href={`${ER}/pricing`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    {tier.price === "Custom" ? "Contact sales" : "Start free trial"}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- EdenCompliance --------------------------- */}
      <section
        id="edencompliance"
        className="scroll-mt-32 border-t-4 py-20 lg:py-24"
        style={{ borderColor: "hsl(var(--portal-compliance))", background: "hsl(var(--portal-compliance) / 0.05)" }}
        data-testid="product-section-edencompliance"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHead
            name="EdenCompliance"
            title="Vendor quality and audit management"
            audience="For QA and compliance leaders in pharma, biotech, medical device, and food and beverage who need the rigor of an eQMS without the year of configuration."
          >
            <div className="mt-6 flex flex-wrap items-center gap-3 reveal" style={{ transitionDelay: "0.15s" }}>
              <AccentButton href={EC} token="--portal-compliance" testid="visit-edencompliance">
                Open EdenCompliance →
              </AccentButton>
              <a
                href={`${EC}/how-it-works`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14.5px] font-semibold text-foreground/65 transition-colors hover:text-primary"
              >
                Full walkthrough
              </a>
            </div>
          </SectionHead>

          <div className="reveal">
            <StageStepper stages={COMPLIANCE_STAGES} token="--portal-compliance" frameBg="#F0ECE1" />
          </div>

          {/* Positioning: the gap it is built for */}
          <div className="mt-16 border-t pt-12 reveal" style={{ borderColor: "hsl(var(--portal-compliance) / 0.22)" }}>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              The space between a spreadsheet and an enterprise QMS.
            </h3>
            <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-foreground/70">
              Three workflows, not twenty modules. Vendor quality, audits, and vendor collaboration are the whole product,
              and it runs alongside whatever else your quality system already uses.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Spreadsheets and point tools", "Already there, and no trail underneath. Nothing signed, nothing versioned, nothing an inspector can follow."],
                ["EdenCompliance", "Live in minutes, on one append-only, hash-chained record, with electronic sign-off and organization isolation."],
                ["Enterprise QMS", "Weeks to months to stand up, and a configuration project before a vendor is qualified."],
              ].map(([label, desc], i) => {
                const mid = i === 1;
                return (
                  <div
                    key={label}
                    className="rounded-xl border p-5"
                    style={
                      mid
                        ? { borderColor: "hsl(var(--portal-compliance) / 0.4)", background: "hsl(var(--background))", boxShadow: "0 10px 30px hsl(var(--portal-compliance) / 0.12)" }
                        : { borderColor: "hsl(var(--border))", background: "transparent" }
                    }
                  >
                    <p className={`text-[14px] font-bold ${mid ? "text-foreground" : "text-foreground/55"}`}>{label}</p>
                    <p className={`mt-1.5 text-[13px] leading-relaxed ${mid ? "text-foreground/75" : "text-foreground/50"}`}>{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing */}
          <div className="mt-16 border-t pt-12 reveal" style={{ borderColor: "hsl(var(--portal-compliance) / 0.22)" }}>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">EdenCompliance pricing</h3>
                <p className="mt-1.5 text-sm text-foreground/65">
                  One plan, the whole platform, priced per seat. No setup fee and no multi-year contract. Vendors and
                  auditors connect by secure portal link, so they never need a seat.
                </p>
              </div>
              <a
                href={`${EC}/pricing`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-sm font-semibold text-primary hover:underline"
              >
                Full pricing on EdenCompliance.com →
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {complianceSeats.map((seat) => (
                <div key={seat.name} className="flex flex-col rounded-xl border border-border bg-card p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{seat.name}</p>
                  <p className="mb-2 text-2xl font-bold tracking-tight text-foreground">
                    {seat.price}
                    {seat.unit && <span className="text-sm font-medium text-foreground/50">{seat.unit}</span>}
                  </p>
                  <p className="text-[13px] leading-relaxed text-foreground/65">{seat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------- Emerging ------------------------------ */}
      <section id="emerging" className="scroll-mt-32 border-t border-border py-20 lg:py-24" data-testid="product-section-emerging">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary reveal">Emerging</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl reveal" style={{ transitionDelay: "0.05s" }}>
              Three more, earlier in their lives.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/70 reveal" style={{ transitionDelay: "0.1s" }}>
              EdenMarket is in beta, and EdenLab and EdenDiscovery are in preview and free for researchers. They are
              shown here as they exist, not as a roadmap.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {emerging.map((p, i) => (
              <article
                key={p.name}
                id={p.name.toLowerCase()}
                className="flex scroll-mt-32 flex-col overflow-hidden rounded-2xl border bg-card reveal"
                style={{ borderColor: `hsl(var(${p.token}) / 0.28)`, transitionDelay: `${i * 0.07}s` }}
                data-testid={`product-card-${p.name.toLowerCase()}`}
              >
                {/* Real surface up top, at the same size for all three, so nothing
                    reads as more finished than it is. */}
                <div
                  className="flex h-[292px] items-center justify-center overflow-hidden border-b"
                  style={{ borderColor: `hsl(var(${p.token}) / 0.2)`, background: p.Visual ? "hsl(var(--muted) / 0.4)" : "#F8F9FB" }}
                >
                  {p.Visual ? (
                    <p.Visual />
                  ) : (
                    /* Contained on the shot's own ground rather than cropped to
                       fill: cropping cut the third listing in half, and a card
                       sliced through its own header reads as a mistake. */
                    <img
                      src={p.img}
                      alt="EdenMarket blind listings: modality, stage, and IP profile with the seller identity withheld until an NDA is signed"
                      decoding="async"
                      className="max-h-full max-w-full p-3"
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <PortalEyebrow name={p.name} />
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                      style={{ background: `hsl(var(${p.token}) / 0.12)`, color: `hsl(var(${p.token}))` }}
                    >
                      {p.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{p.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-foreground/65">{p.audience}</p>
                  <ul className="mt-5 space-y-2.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-[13px] leading-snug text-foreground/75">
                        <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: `hsl(var(${p.token}))` }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                    <span
                      className="rounded-full px-3 py-1 text-[12.5px] font-semibold"
                      style={{ background: `hsl(var(${p.token}) / 0.12)`, color: `hsl(var(${p.token}))` }}
                    >
                      {p.access}
                    </span>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`visit-${p.name.toLowerCase()}`}
                      className="text-[13.5px] font-semibold hover:underline"
                      style={{ color: `hsl(var(${p.token}))` }}
                    >
                      Visit {p.name} →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- How it connects ---------------------------- */}
      <section id="how-it-connects" className="scroll-mt-32 border-t border-border bg-foreground/[0.015] py-20 dark:bg-white/[0.015] lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary reveal">How It Connects</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl reveal" style={{ transitionDelay: "0.05s" }} data-testid="how-it-connects-headline">
              One path, from an idea to a deal.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/75 reveal" style={{ transitionDelay: "0.1s" }}>
              The four intelligence products are one road, not four tools. A concept registered on day one can end as a
              licensed asset without its author ever writing a pitch.
            </p>
          </div>

          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[15px] hidden h-px bg-border md:block" />
            {spine.map((s, i) => (
              <li key={s.step} className="relative reveal" style={{ transitionDelay: `${i * 0.08}s` }} data-testid={`spine-step-${i}`}>
                <span
                  className="relative z-10 mb-5 flex h-[31px] w-[31px] items-center justify-center rounded-full font-mono text-[11px] font-semibold tabular-nums text-white ring-4 ring-background"
                  style={{ background: `hsl(var(${s.token}))` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-bold tracking-tight text-foreground">{s.step}</h3>
                <p className="mt-1 text-[12.5px] font-semibold" style={{ color: `hsl(var(${s.token}))` }}>{s.product}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{s.desc}</p>
              </li>
            ))}
          </ol>

          {/* Compliance genuinely sits outside that chain, and saying so is more
              useful than pretending all five products are one funnel. */}
          <div
            className="mt-14 rounded-2xl border p-6 reveal lg:p-8"
            style={{ borderColor: "hsl(var(--portal-compliance) / 0.3)", background: "hsl(var(--portal-compliance) / 0.05)" }}
          >
            <div className="mb-3">
              <PortalEyebrow name="EdenCompliance" />
            </div>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/80">
              EdenCompliance is deliberately not on that road. It serves quality teams rather than deal teams, and it is a
              separate platform with its own customers, its own pricing, and its own site. What it shares with the rest is
              the company building it and the belief that the record underneath the work matters as much as the work.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 lg:px-8">
        <div
          className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl p-10 text-center reveal md:p-16"
          style={{ background: "linear-gradient(135deg, hsl(142 52% 36%) 0%, hsl(158 50% 26%) 100%)" }}
        >
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-white md:text-4xl">Ready to connect with the right science?</h2>
          <p className="mx-auto mb-8 max-w-xl text-white/80">
            Tell us what you are looking for, or jump straight into either platform.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              data-testid="products-cta"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-primary shadow-sm transition-opacity hover:opacity-90"
            >
              Get in Touch
            </Link>
            <a
              href={ER}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Launch EdenRadar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
