import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BoxGridBackground } from "@/components/BoxGridBackground";
import { AuroraBackground } from "@/components/AuroraBackground";
import { CoverageSection } from "@/components/CoverageSection";
import { PortalEyebrow } from "@/components/PortalBits";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import {
  TTO_COUNT_LABEL,
  ASSET_COUNT_LABEL,
  DATA_SOURCE_LABEL,
} from "@/lib/platformStats";

const FLIP_DURATION = 400;

const flipWords = [
  "Drug Discovery",
  "Rare Disease Research",
  "Data-Driven Decisions",
  "Early-Stage Research",
  "Biotech Innovation",
  "Collaborative Science",
  "Clinical-Stage Intelligence",
  "Licensing Deals",
  "Translational Research",
  "Technology Transfer",
  "Smarter Deal Flow",
  "The Next Breakthrough",
  "Concept to Patient",
  "Your Pipeline's Future",
];

function TextFlip({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout> | undefined;
    let t2: ReturnType<typeof setTimeout> | undefined;
    t1 = setTimeout(function tick() {
      setVisible(false);
      t2 = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
        t1 = setTimeout(tick, 3500);
      }, FLIP_DURATION);
    }, 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [words]);

  return (
    <span
      className="text-primary whitespace-nowrap"
      style={{
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transition: `opacity ${FLIP_DURATION}ms ease`,
      }}
    >
      {words[index]}
    </span>
  );
}

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
  thesis: string;
  access: string;
  token: string; // CSS var name for the portal accent
  anchor: string;
};

// EdenRadar is the flagship: it gets a large card. The other three are
// satellites stacked beside it, so the layout itself encodes the hierarchy.
const flagship: Portal = {
  name: "EdenRadar",
  tagline: "Industry intelligence platform",
  thesis:
    `See the full field before your first move: a continuously enriched window into ${TTO_COUNT_LABEL} tech transfer offices worldwide.`,
  access: "From $1,999/mo",
  token: "--portal-radar",
  anchor: "/products#edenradar",
};

const satellites: Portal[] = [
  {
    name: "EdenLab",
    tagline: "Research workspace",
    thesis: "From hypothesis to publication without losing the thread.",
    access: "Free",
    token: "--portal-lab",
    anchor: "/products#edenlab",
  },
  {
    name: "EdenDiscovery",
    tagline: "Concept registry",
    thesis: "Plant an idea, date-stamp it, and let the world know it exists.",
    access: "Free",
    token: "--portal-discovery",
    anchor: "/products#edendiscovery",
  },
  {
    name: "EdenMarket",
    tagline: "Deal marketplace",
    thesis: "From an indexed asset to the first conversation, on your terms.",
    access: "Success-fee",
    token: "--portal-market",
    anchor: "/products#edenmarket",
  },
];

function FlagshipCard() {
  const accent = `hsl(var(${flagship.token}))`;
  const accentSoft = `hsl(var(${flagship.token}) / 0.08)`;
  return (
    <Link
      to={flagship.anchor}
      className="group lg:row-span-3 rounded-2xl border border-border p-8 flex flex-col hover:shadow-lg transition-shadow reveal"
      style={{ borderTop: `4px solid ${accent}`, background: `linear-gradient(180deg, ${accentSoft} 0%, hsl(var(--card)) 45%)` }}
      data-testid="highlight-edenradar"
    >
      <div className="flex items-center justify-between mb-4">
        <PortalEyebrow name={flagship.name} nameClassName="text-2xl md:text-3xl" iconClassName="h-7 w-7" />
        <span
          className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{ background: accentSoft, color: accent }}
        >
          Flagship
        </span>
      </div>
      <h3 className="text-lg font-semibold text-foreground/90 mb-3">{flagship.tagline}</h3>
      <p className="text-base text-foreground/75 leading-relaxed max-w-md">{flagship.thesis}</p>

      <div className="mt-auto pt-8">
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-foreground/75 mb-6">
          <span><span className="font-bold text-foreground">{TTO_COUNT_LABEL}</span> institutions</span>
          <span><span className="font-bold text-foreground">{ASSET_COUNT_LABEL}</span> assets</span>
          <span><span className="font-bold text-foreground">Scored</span> daily</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ background: accentSoft, color: accent }}>
            {flagship.access}
          </span>
          <span className="text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: accent }}>
            Explore EdenRadar →
          </span>
        </div>
      </div>
    </Link>
  );
}

function SatelliteCard({ portal }: { portal: Portal }) {
  const accent = `hsl(var(${portal.token}))`;
  return (
    <Link
      to={portal.anchor}
      className="group rounded-2xl border border-border bg-card p-6 flex flex-col justify-center hover:shadow-md transition-shadow reveal"
      style={{ borderLeft: `4px solid ${accent}` }}
      data-testid={`highlight-${portal.name.toLowerCase()}`}
    >
      <div className="flex items-center justify-between mb-2 gap-3">
        <PortalEyebrow name={portal.name} nameClassName="text-lg md:text-xl" iconClassName="h-6 w-6" />
        <span className="text-xs font-medium flex-shrink-0" style={{ color: accent }}>{portal.access}</span>
      </div>
      <p className="text-sm text-foreground/75 leading-relaxed">{portal.thesis}</p>
    </Link>
  );
}

export default function Home() {
  useScrollReveal();
  useSEO({
    title: "EdenNX - Biotech Intelligence Infrastructure",
    description:
      "EdenNX is building the intelligence backbone of modern biotech. From earliest discovery to patient impact, our platform suite powers every stage of the lifecycle.",
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
            {/* Primary headline — EdenNX as the anchor */}
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-none tracking-tight mb-5 reveal"
              data-testid="hero-headline"
              style={{ transitionDelay: "0.1s" }}
            >
              <span className="text-primary">Eden</span>NX
            </h1>

            {/*
              "Powering [word]". The word span is a clipped flex-1 child so the
              rotating words can never change the row's width or height: fixed
              height stops vertical shift, flex-1 + overflow-hidden stops any
              horizontal reflow regardless of word length.
            */}
            <div
              className="flex items-baseline gap-3 mb-8 w-full max-w-full overflow-hidden reveal"
              style={{
                transitionDelay: "0.15s",
                height: "clamp(1.75rem, 4.5vw, 3.25rem)",
              }}
            >
              <span className="text-xl md:text-3xl lg:text-4xl font-light text-foreground/65 leading-none flex-shrink-0">
                Powering
              </span>
              <span className="text-xl md:text-3xl lg:text-4xl font-bold leading-none flex-1 min-w-0 overflow-hidden">
                <TextFlip words={flipWords} />
              </span>
            </div>

            <p
              className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-10 max-w-2xl reveal"
              data-testid="hero-subheadline"
              style={{ transitionDelay: "0.2s" }}
            >
              The intelligence backbone of modern biotech, from earliest research
              hypothesis through commercial licensing.
            </p>

            {/* Re-enable pointer events only on interactive elements */}
            <div
              className="flex flex-wrap gap-4 reveal pointer-events-auto"
              style={{ transitionDelay: "0.3s" }}
            >
              <Link
                to="/products"
                data-testid="hero-cta-products"
                className="inline-flex items-center px-6 py-3 rounded-full text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
              >
                Explore Our Products
              </Link>
              <Link
                to="/team"
                data-testid="hero-cta-team"
                className="inline-flex items-center px-6 py-3 rounded-full text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
              >
                Meet the Team
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
          Four products. One ecosystem.
        </h2>
        <p
          className="text-base text-foreground/70 max-w-2xl leading-relaxed mb-14 reveal"
          style={{ transitionDelay: "0.1s" }}
        >
          EdenNX is the parent company. EdenRadar is our flagship product, joined
          by a product built for every stakeholder, whether you are planting the
          seed of a concept or closing a licensing deal.
        </p>

        {/* Flagship spans all three rows on the right, so its height is
            exactly the three satellite cards plus the two gaps. */}
        <div className="grid lg:grid-cols-2 lg:grid-rows-3 gap-6">
          <FlagshipCard />
          {satellites.map((portal) => (
            <SatelliteCard key={portal.name} portal={portal} />
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

      {/* Global coverage — globe, stats, named institutions */}
      <CoverageSection />

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
