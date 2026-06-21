import { Link } from "react-router-dom";
import { BoxGridBackground } from "@/components/BoxGridBackground";
import { AuroraBackground } from "@/components/AuroraBackground";
import { InstitutionMarquee } from "@/components/InstitutionMarquee";
import { PortalEyebrow } from "@/components/PortalBits";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import {
  TTO_COUNT_LABEL,
  ASSET_COUNT_LABEL,
  DATA_SOURCE_LABEL,
} from "@/lib/platformStats";

const marqueeItems = [
  `${ASSET_COUNT_LABEL} biotech assets indexed`,
  `${TTO_COUNT_LABEL} research institutions monitored`,
  `${DATA_SOURCE_LABEL} live data sources`,
  "The biotech landscape, scored daily",
  "From concept to patient",
  "EdenRadar by EdenNX",
];

type Portal = {
  name: string;
  tagline: string;
  audience: string;
  features: string[];
  access: string;
  token: string; // CSS var name for the portal accent
  anchor: string;
};

const portals: Portal[] = [
  {
    name: "EdenRadar",
    tagline: "Industry intelligence platform",
    audience: "BD teams, licensing executives, pharma strategy, life science investors",
    features: [
      `Continuous monitoring of ${TTO_COUNT_LABEL} TTOs and government databases`,
      "Email alerts for newly published assets in your focus areas",
      "EDEN Chat for natural language search across the catalog",
    ],
    access: "From $1,999/mo",
    token: "--portal-radar",
    anchor: "/products#edenradar",
  },
  {
    name: "EdenLab",
    tagline: "Project-based research workspace",
    audience: "Academic scientists, PhD teams, lab leaders, university research groups",
    features: [
      "11-section project canvas for structured research",
      "Literature synthesis across 40+ academic sources",
      "Published projects visible to EdenRadar industry buyers",
    ],
    access: "Free",
    token: "--portal-lab",
    anchor: "/products#edenlab",
  },
  {
    name: "EdenDiscovery",
    tagline: "Concept registry and community",
    audience: "Early-stage innovators, concept creators, independent researchers",
    features: [
      "Structured concept submission with a timestamped record",
      "Automated EDEN Credibility Score rated 0 to 100",
      "Graduation path from concept to EdenLab project",
    ],
    access: "Free",
    token: "--portal-discovery",
    anchor: "/products#edendiscovery",
  },
  {
    name: "EdenMarket",
    tagline: "Confidential deal marketplace",
    audience: "TTOs, biotechs, and inventors connecting with BD buyers",
    features: [
      "NDA-gated deal rooms for licensable assets",
      "Identity revealed on your terms, not before",
      "Direct line from indexed asset to first conversation",
    ],
    access: "Success-fee",
    token: "--portal-market",
    anchor: "/products#edenmarket",
  },
];

function PortalCard({ portal, delay }: { portal: Portal; delay: number }) {
  const accent = `hsl(var(${portal.token}))`;
  const accentSoft = `hsl(var(${portal.token}) / 0.08)`;
  return (
    <Link
      to={portal.anchor}
      className="group rounded-xl border border-border bg-card p-6 flex flex-col hover:shadow-md transition-shadow reveal"
      style={{ transitionDelay: `${delay}s`, borderTop: `4px solid ${accent}`, background: `linear-gradient(180deg, ${accentSoft} 0%, hsl(var(--card)) 40%)` }}
      data-testid={`highlight-${portal.name.toLowerCase()}`}
    >
      <PortalEyebrow name={portal.name} className="mb-3" />
      <h3 className="text-lg font-bold text-foreground mb-1">{portal.tagline}</h3>
      <p className="text-xs text-muted-foreground mb-5">For: {portal.audience}</p>
      <ul className="space-y-2.5 flex-1 mb-6">
        {portal.features.map((feat) => (
          <li key={feat} className="flex items-start gap-2.5 text-sm text-foreground/80">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
            {feat}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: accentSoft, color: accent }}
        >
          {portal.access}
        </span>
        <span className="text-xs font-semibold group-hover:underline" style={{ color: accent }}>
          Learn more →
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  useScrollReveal();
  useSEO({
    title: "EdenNX - The intelligence backbone of modern biotech",
    description:
      "EdenNX builds EdenRadar, the flagship platform that scores the biotech landscape daily across 400+ research institutions and 35,000+ licensable assets, from earliest research hypothesis to commercial licensing.",
  });

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[72vh] flex items-center overflow-hidden bg-background">
        <BoxGridBackground />
        <AuroraBackground />

        {/* Content layer — pointer-events-none lets background grid receive mouse events */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 pointer-events-none">
          <div className="max-w-4xl">
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-none tracking-tight mb-6 reveal"
              data-testid="hero-headline"
              style={{ transitionDelay: "0.1s" }}
            >
              <span className="text-primary">Eden</span>NX
            </h1>

            <p
              className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-7 reveal"
              style={{ transitionDelay: "0.15s" }}
            >
              The <span className="gradient-text">intelligence backbone</span> of modern biotech.
            </p>

            <p
              className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-10 max-w-2xl reveal"
              data-testid="hero-subheadline"
              style={{ transitionDelay: "0.2s" }}
            >
              EdenNX builds EdenRadar, the flagship platform that scores the
              biotech landscape daily across {TTO_COUNT_LABEL} research
              institutions and {ASSET_COUNT_LABEL} licensable assets. From
              earliest research hypothesis to commercial licensing.
            </p>

            {/* Re-enable pointer events only on interactive elements */}
            <div
              className="flex flex-wrap gap-4 reveal pointer-events-auto"
              style={{ transitionDelay: "0.3s" }}
            >
              <a
                href="https://edenradar.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-cta-edenradar"
                className="inline-flex items-center px-6 py-3 rounded-full text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
              >
                Launch EdenRadar
              </a>
              <Link
                to="/products"
                data-testid="hero-cta-products"
                className="inline-flex items-center px-6 py-3 rounded-full text-base font-semibold border border-primary/40 text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                Explore the Platform
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee ticker strip */}
      <section
        className="border-y border-border bg-foreground/[0.02] dark:bg-white/[0.02] py-5 overflow-hidden"
        aria-label="Key facts"
      >
        <div className="marquee-track select-none">
          {[...marqueeItems, ...marqueeItems].flatMap((item, i) => [
            <span
              key={`item-${i}`}
              className="px-6 text-sm font-medium text-muted-foreground whitespace-nowrap"
            >
              {item}
            </span>,
            <span
              key={`dot-${i}`}
              className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-primary"
              aria-hidden="true"
            />,
          ])}
        </div>
      </section>

      {/* Product Suite — EdenRadar's four portals */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20" data-testid="product-highlights">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 reveal">
          The Product Suite
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-foreground mb-4 reveal"
          style={{ transitionDelay: "0.05s" }}
        >
          Four portals. One ecosystem.
        </h2>
        <p
          className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-14 reveal"
          style={{ transitionDelay: "0.1s" }}
        >
          EdenNX is the parent company. EdenRadar is our flagship product, joined
          by a portal built for every stakeholder, whether you are planting the
          seed of a concept or closing a licensing deal.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portals.map((portal, i) => (
            <PortalCard key={portal.name} portal={portal} delay={0.1 + i * 0.05} />
          ))}
        </div>
      </section>

      {/* Mission — light emerald tinted panel */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
        <div
          className="rounded-2xl border border-primary/20 p-10 md:p-14 reveal"
          data-testid="mission-panel"
          style={{
            background:
              "linear-gradient(135deg, hsl(142 52% 36% / 0.06) 0%, hsl(142 52% 36% / 0.10) 100%)",
          }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
            Our Mission
          </p>
          <p className="text-2xl md:text-3xl font-bold text-foreground leading-snug max-w-3xl mb-6">
            Accelerate science to patient impact by eliminating the discovery gap
            between university research and industry development.
          </p>
          <p className="text-base text-foreground/65 leading-relaxed max-w-2xl">
            Every year, thousands of licensable technologies sit quietly inside
            research institutions while industry teams spend months and millions
            searching through fragmented databases and cold calls. EdenNX changes
            that, building the connective tissue between every stakeholder in the
            biotech ecosystem.
          </p>
        </div>
      </section>

      {/* Real institution credibility */}
      <InstitutionMarquee />

      {/* Bottom CTA */}
      <section className="bg-primary/5 border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground mb-6 reveal"
            data-testid="bottom-cta-headline"
          >
            See the full field before your first move.
          </h2>
          <a
            href="https://edenradar.com"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="bottom-cta-edenradar"
            className="inline-flex items-center px-8 py-3.5 rounded-md text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm reveal"
            style={{ transitionDelay: "0.1s" }}
          >
            Launch EdenRadar
          </a>
        </div>
      </section>
    </div>
  );
}
