import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BoxGridBackground } from "@/components/BoxGridBackground";
import { AuroraBackground } from "@/components/AuroraBackground";
import { CoverageSection } from "@/components/CoverageSection";
import { ProductShowcase } from "@/components/ProductShowcase";
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
  "Vendor Qualification",
  "Rare Disease Research",
  "Audit Programs",
  "Data-Driven Decisions",
  "Quality Oversight",
  "Early-Stage Research",
  "Signed Audit Trails",
  "Biotech Innovation",
  "Regulated Quality Teams",
  "Clinical-Stage Intelligence",
  "Licensing Deals",
  "Technology Transfer",
  "Supplier Oversight",
  "Concept to Patient",
  "The Next Breakthrough",
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
  "The biotech landscape, scored daily",
  "EdenRadar by EdenNX",
  "Vendor qualification & audit programs",
  "Every change on a signed, unalterable record",
  "EdenCompliance by EdenNX",
  `${DATA_SOURCE_LABEL} live data sources`,
];

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
              The intelligence backbone of modern biotech, from the earliest research
              hypothesis through commercial licensing and regulated quality.
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

      {/* Product Suite intro */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 lg:pt-24 pb-10 lg:pb-12" data-testid="product-highlights">
        <h2 className="text-3xl md:text-[2.75rem] font-black tracking-tight leading-[1.08] text-foreground mb-5 reveal">
          Five products, one biotech backbone.
        </h2>
        <p
          className="text-lg text-foreground/80 max-w-2xl leading-relaxed reveal"
          style={{ transitionDelay: "0.05s" }}
        >
          From spotting a newly published asset to running a signed, audited vendor
          program, each EdenNX product owns a different part of the field. One company
          behind all five.
        </p>
      </section>

      <ProductShowcase />

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
            Start with the flagship that fits your team.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 reveal" style={{ transitionDelay: "0.1s" }}>
            <a
              href="https://edenradar.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="bottom-cta-edenradar"
              className="inline-flex items-center px-8 py-3.5 rounded-md text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
            >
              Launch EdenRadar
            </a>
            <a
              href="https://edencompliance.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="bottom-cta-edencompliance"
              className="inline-flex items-center px-8 py-3.5 rounded-md text-base font-semibold text-white hover:opacity-90 transition-opacity shadow-sm"
              style={{ background: "hsl(var(--portal-compliance))" }}
            >
              Launch EdenCompliance
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
