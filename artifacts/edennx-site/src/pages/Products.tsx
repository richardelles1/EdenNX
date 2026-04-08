import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";

const pipelineSteps = [
  {
    step: "01",
    title: "Continuous Monitoring",
    description:
      "EdenRadar's scrapers continuously crawl 300+ university tech transfer offices, government databases, and academic publication feeds. Every asset is collected, timestamped, and queued for analysis the moment it appears.",
    bullets: [
      "300+ TTO portals monitored",
      "Daily refresh on all sources",
      "Patent filing alerts included",
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

const scoutPricing = [
  {
    name: "Individual",
    price: "$1,999",
    period: "/mo",
    description: "1 Primary Intelligence Seat",
  },
  {
    name: "Team 5-Seat",
    price: "$4,999",
    period: "/mo",
    description: "5 seats, shared pipeline",
  },
  {
    name: "Team 10-Seat",
    price: "$8,999",
    period: "/mo",
    description: "10 seats, team reports",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Starting at $50,000",
    period: "/mo",
    description:
      "Unlimited seats, private model tuning, API access, custom integrations, dedicated TAM",
  },
];

export default function Products() {
  useScrollReveal();
  useSEO({
    title: "Products -- EdenNX",
    description:
      "The EdenNX product suite: EdenDiscovery, EdenLab, and EdenScout. Purpose-built for every stakeholder in the biotech licensing ecosystem.",
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
          One platform. Purpose-built for every stakeholder.
        </h1>
        <p
          className="text-lg text-muted-foreground max-w-2xl leading-relaxed reveal"
          style={{ transitionDelay: "0.2s" }}
        >
          Whether you are planting the seed of a concept or closing a licensing
          deal, EdenRadar has a portal built for your workflow.
        </p>
      </section>

      {/* EdenDiscovery */}
      <section
        className="border-t-4 border-amber-400 bg-amber-50/40 dark:bg-amber-950/10 py-20"
        data-testid="product-section-edendiscovery"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 dark:text-amber-400 mb-3 reveal">
                EdenDiscovery
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-2 reveal"
                style={{ transitionDelay: "0.05s" }}
              >
                Creative concept community
              </h2>
              <p
                className="text-muted-foreground mb-6 reveal"
                style={{ transitionDelay: "0.1s" }}
              >
                For: Concept Creators, Early-Stage Innovators
              </p>
              <ul className="space-y-3 mb-8 reveal" style={{ transitionDelay: "0.15s" }}>
                {[
                  "Submit early-stage hypotheses before research begins",
                  "EDEN credibility scoring on a 0-100 scale",
                  "Surface to industry scouts and collaborators",
                  "Graduate promising concepts into EdenLab projects",
                  "Concept registry with timestamped provenance",
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
            <div
              className="rounded-xl border border-amber-200 dark:border-amber-800/40 bg-card p-8 reveal"
              style={{ transitionDelay: "0.15s" }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 dark:text-amber-400 mb-4">
                Vision
              </p>
              <blockquote className="text-base md:text-lg text-foreground/90 italic leading-relaxed">
                "The spark of discovery is often the hardest thing to protect
                and communicate. EdenDiscovery gives every innovator a
                structured place to plant their idea, date-stamp it, and let
                the world know it exists."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* EdenLab */}
      <section
        className="border-t-4 border-violet-400 bg-violet-50/40 dark:bg-violet-950/10 py-20"
        data-testid="product-section-edenlab"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-3 reveal">
                EdenLab
              </p>
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
                For: Academic Researchers, Lab Leaders, PhD Teams
              </p>
              <ul className="space-y-3 mb-8 reveal" style={{ transitionDelay: "0.15s" }}>
                {[
                  "Structured 11-section project canvas",
                  "Literature synthesis across 40+ data sources",
                  "Evidence extraction and citation management",
                  "Visibility to industry partners and collaborators",
                  "Grants discovery matched to your research profile",
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
            <div
              className="rounded-xl border border-violet-200 dark:border-violet-800/40 bg-card p-8 reveal"
              style={{ transitionDelay: "0.15s" }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-4">
                Vision
              </p>
              <blockquote className="text-base md:text-lg text-foreground/90 italic leading-relaxed">
                "EdenLab is built for the scientist who needs to move from
                hypothesis to publication without losing the thread. A workspace
                that organizes the complexity of research while making your work
                visible to the world."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* EdenScout */}
      <section
        className="border-t-4 border-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/10 py-20"
        data-testid="product-section-edenscout"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 mb-16">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3 reveal">
                EdenScout
              </p>
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
                For: BD Teams, Licensing Executives, Pharma Strategy
              </p>
              <ul className="space-y-3 mb-8 reveal" style={{ transitionDelay: "0.15s" }}>
                {[
                  "Continuously refreshed catalog of licensable biotech assets",
                  "Natural language queries via EDEN chat interface",
                  "Competing asset cross-reference by target and modality",
                  "Institution intelligence and researcher profiles",
                  "EDEN-compiled dossiers and board-ready reports",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-xl border border-emerald-200 dark:border-emerald-800/40 bg-card p-8 reveal"
              style={{ transitionDelay: "0.15s" }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-4">
                Vision
              </p>
              <blockquote className="text-base md:text-lg text-foreground/90 italic leading-relaxed">
                "EdenScout is the platform your BD team has always needed.
                Instead of cold calls and conference hallways, you get a
                continuously enriched window into every major TTO on the
                planet."
              </blockquote>
            </div>
          </div>

          {/* Pricing */}
          <div className="reveal">
            <h3 className="text-2xl font-bold text-foreground mb-8">Pricing</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {scoutPricing.map((tier, i) => (
                <div
                  key={tier.name}
                  className={`rounded-xl p-6 border reveal ${
                    tier.featured
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-card"
                  }`}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                  data-testid={`pricing-tier-${i}`}
                >
                  {tier.featured && (
                    <span className="inline-block text-xs font-semibold tracking-wide uppercase text-primary mb-3">
                      Most Popular
                    </span>
                  )}
                  <p className="font-semibold text-foreground mb-1">{tier.name}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {tier.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      {tier.period}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    {tier.description}
                  </p>
                </div>
              ))}
            </div>
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
            href="/contact"
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
