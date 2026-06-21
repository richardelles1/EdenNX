import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { PortalEyebrow, PortalShowcase } from "@/components/PortalBits";
import { TTO_COUNT_LABEL, ASSET_COUNT_LABEL } from "@/lib/platformStats";

const pipelineSteps = [
  {
    step: "01",
    title: "Continuous Monitoring",
    description:
      `EdenRadar's scrapers continuously crawl ${TTO_COUNT_LABEL} university tech transfer offices, government databases, and academic publication feeds. Every asset is collected, timestamped, and queued for analysis the moment it appears.`,
    bullets: [
      `${TTO_COUNT_LABEL} TTO portals monitored`,
      "Daily refresh on all sources",
      "New asset alerts as sources publish",
    ],
  },
  {
    step: "02",
    title: "EDEN Classification and Enrichment",
    description:
      "Each asset passes through EDEN, which classifies therapy area, disease target, development stage, and modality. EDEN scores each asset 0-100 for licensing readiness, scientific credibility, and commercial potential.",
    bullets: [
      "Therapy area classification",
      "Modality and target extraction",
      "0-100 EDEN readiness score",
    ],
  },
  {
    step: "03",
    title: "Semantic Search Index",
    description:
      "Enriched assets are embedded into a vector search index, enabling natural language queries that match by meaning, not just keyword. Ask EDEN a question in plain English and surface relevant assets instantly.",
    bullets: [
      "Vector embedding search",
      "Natural language queries",
      "Cross-institution matching",
    ],
  },
  {
    step: "04",
    title: "Dossier Generation",
    description:
      "For each asset you want to explore, EdenRadar auto-generates a structured intelligence dossier: competitive landscape, key scientific claims, patent coverage, inventor details, and a deal-readiness summary formatted for BD review.",
    bullets: [
      "Full EDEN-compiled dossier",
      "Competitive cross-reference",
      "Export to PDF or CSV",
    ],
  },
];

const scoutTiers = [
  { name: "Individual", price: "$1,999", desc: "1 intelligence seat" },
  { name: "Team 5-Seat", price: "$8,999", desc: "5 seats, shared pipeline" },
  { name: "Team 10-Seat", price: "$16,999", desc: "10 seats, shared pipeline and team reports" },
  { name: "Enterprise", price: "Custom pricing", desc: "Custom SLA terms, custom data integrations" },
];

// Illustrative EDEN Credibility Score panel for EdenDiscovery (no public app
// screenshot exists for this portal). Shows the 0-100 scoring mechanic, clearly
// labelled as a sample, not a claim about any real submission.
function CredibilityPanel() {
  const dims = [
    { label: "Novelty", value: 92 },
    { label: "Feasibility", value: 78 },
    { label: "Evidence", value: 84 },
  ];
  return (
    <div
      className="rounded-xl border border-amber-200 dark:border-amber-800/40 bg-card p-8 reveal"
      style={{ transitionDelay: "0.15s", boxShadow: "0 18px 48px hsl(var(--portal-discovery) / 0.16)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 dark:text-amber-400">
          EDEN Credibility Score
        </p>
        <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground border border-border rounded-full px-2 py-0.5">
          Illustrative
        </span>
      </div>
      <div className="flex items-end gap-2 mb-1">
        <span className="text-6xl font-bold leading-none" style={{ color: "hsl(var(--portal-discovery))" }}>87</span>
        <span className="text-lg text-muted-foreground mb-1.5">/ 100</span>
      </div>
      <p className="text-sm font-semibold text-foreground">Sample concept submission</p>
      <p className="text-xs text-muted-foreground mb-6">Every concept is auto-scored on submission</p>
      <div className="space-y-4">
        {dims.map((d) => (
          <div key={d.label}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-foreground/80 font-medium">{d.label}</span>
              <span className="text-muted-foreground tabular-nums">{d.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${d.value}%`, background: "hsl(var(--portal-discovery))" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Products() {
  useScrollReveal();
  useSEO({
    title: "EdenRadar - The EdenNX platform",
    description:
      "The EdenNX product suite: EdenRadar, EdenLab, EdenDiscovery, and EdenMarket, purpose-built for every stakeholder in the biotech licensing ecosystem.",
  });

  return (
    <div className="pt-16">
      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 reveal">
          The Product Suite
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold text-foreground mb-6 reveal"
          style={{ transitionDelay: "0.1s" }}
          data-testid="products-headline"
        >
          One ecosystem. Purpose-built for every stakeholder.
        </h1>
        <p
          className="text-lg text-muted-foreground max-w-2xl leading-relaxed reveal"
          style={{ transitionDelay: "0.2s" }}
        >
          EdenNX is the parent company. EdenRadar is our flagship product,
          tracking {ASSET_COUNT_LABEL} assets across {TTO_COUNT_LABEL}
          {" "}institutions, joined by EdenLab, EdenDiscovery, and EdenMarket.
          Whether you are planting the seed of a concept or closing a licensing
          deal, there is a portal built for your workflow.
        </p>
      </section>

      {/* EdenRadar */}
      <section
        id="edenradar"
        className="border-t-4 border-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/10 py-20"
        data-testid="product-section-edenradar"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 mb-16 items-start">
            <div>
              <div className="mb-3 reveal">
                <PortalEyebrow name="EdenRadar" />
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-2 reveal"
                style={{ transitionDelay: "0.05s" }}
              >
                Industry intelligence platform
              </h2>
              <p
                className="text-muted-foreground mb-6 reveal"
                style={{ transitionDelay: "0.1s" }}
              >
                The flagship BD intelligence product. For: Business Development Teams, Licensing Executives, Pharma Strategy Divisions, Life Science Investors
              </p>
              <ul className="space-y-3 mb-8 reveal" style={{ transitionDelay: "0.15s" }}>
                {[
                  `Continuous monitoring of ${TTO_COUNT_LABEL} TTOs and government databases`,
                  "Instant email alerts for newly published assets matching your focus areas",
                  "EDEN Chat for natural language search across the full asset catalog",
                  "Asset Dossiers with competitive landscape, scientific claims, and patent coverage",
                  "Pipeline tracking with filters by therapy area, stage, and modality, plus export",
                  "Institution profiles and metrics for research institutions and inventors",
                  "Hot Areas sidebar highlighting therapy area convergence signals",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
            <PortalShowcase
              src="/images/portal-edenradar.png"
              alt="EdenRadar asset dossier: EDEN score, key fields, and an auto-generated intelligence brief"
              token="--portal-radar"
            />
          </div>

          {/* Pricing teaser */}
          <div className="reveal border-t border-emerald-200 dark:border-emerald-800/30 pt-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  EdenRadar Pricing
                </h3>
                <p className="text-sm text-muted-foreground">
                  Starting at $1,999/mo. See full pricing on EdenRadar.
                </p>
              </div>
              <a
                href="https://edenradar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline flex-shrink-0"
              >
                Full pricing on EdenRadar.com
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {scoutTiers.map((tier, i) => (
                <div
                  key={tier.name}
                  className="rounded-xl border border-border bg-card p-5 reveal flex flex-col"
                  style={{ transitionDelay: `${i * 0.07}s` }}
                  data-testid={`pricing-tier-${i}`}
                >
                  <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-2">
                    {tier.name}
                  </p>
                  <p className="text-xl font-bold text-foreground mb-1">
                    {tier.price}
                    {!tier.price.startsWith("Custom") && <span className="text-sm font-normal text-muted-foreground">/mo</span>}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">{tier.desc}</p>
                  <a
                    href="https://edenradar.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity w-full"
                  >
                    Launch EdenRadar
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EdenLab */}
      <section
        id="edenlab"
        className="border-t-4 border-violet-400 bg-violet-50/40 dark:bg-violet-950/10 py-20"
        data-testid="product-section-edenlab"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <div className="mb-3 reveal">
                <PortalEyebrow name="EdenLab" />
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-2 reveal"
                style={{ transitionDelay: "0.05s" }}
              >
                Project-based research workspace
              </h2>
              <p
                className="text-muted-foreground mb-6 reveal"
                style={{ transitionDelay: "0.1s" }}
              >
                For: Academic Scientists, PhD Teams, Lab Leaders, University Research Groups
              </p>
              <ul className="space-y-3 mb-8 reveal" style={{ transitionDelay: "0.15s" }}>
                {[
                  "11-section project canvas for structured research management",
                  "Literature synthesis across 40+ academic data sources",
                  "Evidence extraction and citation management",
                  "Published projects visible to EdenRadar industry buyers",
                  "Grant discovery matched to your research profile",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <div
                className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 reveal"
                style={{ transitionDelay: "0.2s" }}
              >
                Access: Free
              </div>
            </div>
            <PortalShowcase
              src="/images/portal-edenlab.png"
              alt="EdenLab research workspace: concept-to-project tools for scientists"
              token="--portal-lab"
            />
          </div>
        </div>
      </section>

      {/* EdenDiscovery */}
      <section
        id="edendiscovery"
        className="border-t-4 border-amber-400 bg-amber-50/40 dark:bg-amber-950/10 py-20"
        data-testid="product-section-edendiscovery"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <div className="mb-3 reveal">
                <PortalEyebrow name="EdenDiscovery" />
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-2 reveal"
                style={{ transitionDelay: "0.05s" }}
              >
                Concept registry and community
              </h2>
              <p
                className="text-muted-foreground mb-6 reveal"
                style={{ transitionDelay: "0.1s" }}
              >
                For: Early-Stage Innovators, Concept Creators, Independent Researchers
              </p>
              <ul className="space-y-3 mb-8 reveal" style={{ transitionDelay: "0.15s" }}>
                {[
                  "Structured concept submission forms to document early-stage hypotheses",
                  "Automated EDEN Credibility Score rated 0 to 100",
                  "Public searchable community feed",
                  "Timestamped submission record (not a patent or legal filing)",
                  "Graduation path: concepts can be promoted into EdenLab projects",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <div
                className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 reveal"
                style={{ transitionDelay: "0.2s" }}
              >
                Access: Free
              </div>
            </div>
            <CredibilityPanel />
          </div>
        </div>
      </section>

      {/* EdenMarket */}
      <section
        id="edenmarket"
        className="border-t-4 border-indigo-400 bg-indigo-50/40 dark:bg-indigo-950/10 py-20"
        data-testid="product-section-edenmarket"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <div className="mb-3 reveal">
                <PortalEyebrow name="EdenMarket" />
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-2 reveal"
                style={{ transitionDelay: "0.05s" }}
              >
                Confidential deal marketplace
              </h2>
              <p
                className="text-muted-foreground mb-6 reveal"
                style={{ transitionDelay: "0.1s" }}
              >
                For: TTOs, biotechs, and inventors connecting with industry BD buyers
              </p>
              <ul className="space-y-3 mb-8 reveal" style={{ transitionDelay: "0.15s" }}>
                {[
                  "NDA-gated deal rooms for licensable assets",
                  "Identity revealed on your terms, not before",
                  "Expression-of-interest workflow from buyer to seller",
                  "A direct line from an indexed asset to the first conversation",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <div
                className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 reveal"
                style={{ transitionDelay: "0.2s" }}
              >
                Access: Success-fee
              </div>
            </div>
            <PortalShowcase
              src="/images/portal-edenmarket.png"
              alt="EdenMarket: blind, NDA-gated listings for licensable biotech assets"
              token="--portal-market"
            />
          </div>
        </div>
      </section>

      {/* Data Pipeline */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 reveal">
            How It Works
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground reveal"
            style={{ transitionDelay: "0.1s" }}
            data-testid="pipeline-headline"
          >
            The EDEN data pipeline.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {pipelineSteps.map((step, i) => (
            <div
              key={step.step}
              className="rounded-xl border border-border bg-card p-8 reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
              data-testid={`pipeline-step-${i}`}
            >
              <p className="text-sm font-bold text-primary mb-3">
                Step {step.step}
              </p>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {step.description}
              </p>
              <ul className="space-y-2">
                {step.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 reveal">
            Ready to connect with the right science?
          </h2>
          <Link
            to="/contact"
            data-testid="products-cta"
            className="inline-flex items-center px-8 py-3.5 rounded-md text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm reveal"
            style={{ transitionDelay: "0.1s" }}
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
