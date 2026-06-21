import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BoxGridBackground } from "@/components/BoxGridBackground";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";

const FLIP_DURATION = 400;

const flipWords = [
  "Drug Discovery",
  "Rare Disease Research",
  "Data-Driven Decisions",
  "Early-Stage Research",
  "Biotech Innovation",
  "Collaborative Science",
  "Clinical-Stage Intelligence",
  "Your Pipeline's Future",
];

const marqueeItems = [
  "30,000+ Biotech Assets Indexed",
  "300+ Tech Transfer Offices Monitored",
  "From Concept to Patient",
  "Intelligence for Every Stakeholder",
  "Biotech's Operating System",
  "Science Without Silos",
  "Drug Discovery Intelligence",
  "EdenRadar by EdenNX",
  "30,000+ Biotech Assets Indexed",
  "300+ Tech Transfer Offices Monitored",
  "From Concept to Patient",
  "Intelligence for Every Stakeholder",
  "Biotech's Operating System",
  "Science Without Silos",
  "Drug Discovery Intelligence",
  "EdenRadar by EdenNX",
];

function TextFlip({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timeoutRef = { t1: 0 as ReturnType<typeof setTimeout>, t2: 0 as ReturnType<typeof setTimeout> };

  useEffect(() => {
    timeoutRef.t1 = setTimeout(function tick() {
      setVisible(false);
      timeoutRef.t2 = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
        timeoutRef.t1 = setTimeout(tick, 3500);
      }, FLIP_DURATION);
    }, 3500);
    return () => {
      clearTimeout(timeoutRef.t1);
      clearTimeout(timeoutRef.t2);
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
              "Powering [word]" — w-full + overflow-hidden clips long words on narrow
              viewports. Fixed height prevents layout shift when words swap.
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
              <span className="text-xl md:text-3xl lg:text-4xl font-bold leading-none min-w-0">
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
          {marqueeItems.flatMap((item, i) => [
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

      {/* Product Highlights */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20" data-testid="product-highlights">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 reveal">
          The Product Suite
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-foreground mb-4 reveal"
          style={{ transitionDelay: "0.05s" }}
        >
          Three portals. One ecosystem.
        </h2>
        <p
          className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-14 reveal"
          style={{ transitionDelay: "0.1s" }}
        >
          Whether you are planting the seed of a concept or closing a licensing deal, EdenNX has a portal built for your workflow.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* EdenScout */}
          <Link
            to="/products#edenscout"
            className="group rounded-xl border-t-4 border-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-800/40 p-7 flex flex-col hover:shadow-md transition-shadow reveal"
            style={{ transitionDelay: "0.1s" }}
            data-testid="highlight-edenscout"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2">
              EdenScout
            </p>
            <h3 className="text-xl font-bold text-foreground mb-1">Industry intelligence platform</h3>
            <p className="text-sm text-muted-foreground mb-5">
              For: BD Teams, Licensing Executives, Pharma Strategy, Life Science Investors
            </p>
            <ul className="space-y-2.5 flex-1 mb-6">
              {[
                "Continuous monitoring of 300+ TTOs and government databases",
                "Instant email alerts for newly published assets matching your focus areas",
                "EDEN Chat for natural language search across the full asset catalog",
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                From $1,999/mo
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                Learn more →
              </span>
            </div>
          </Link>

          {/* EdenLab */}
          <Link
            to="/products#edenlab"
            className="group rounded-xl border-t-4 border-violet-400 bg-violet-50/40 dark:bg-violet-950/10 border border-violet-200 dark:border-violet-800/40 p-7 flex flex-col hover:shadow-md transition-shadow reveal"
            style={{ transitionDelay: "0.15s" }}
            data-testid="highlight-edenlab"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-2">
              EdenLab
            </p>
            <h3 className="text-xl font-bold text-foreground mb-1">Project-based research workspace</h3>
            <p className="text-sm text-muted-foreground mb-5">
              For: Academic Scientists, PhD Teams, Lab Leaders, University Research Groups
            </p>
            <ul className="space-y-2.5 flex-1 mb-6">
              {[
                "11-section project canvas for structured research management",
                "Literature synthesis across 40+ academic data sources",
                "Published projects visible to EdenScout industry buyers",
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300">
                Free
              </span>
              <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 group-hover:underline">
                Learn more →
              </span>
            </div>
          </Link>

          {/* EdenDiscovery */}
          <Link
            to="/products#edendiscovery"
            className="group rounded-xl border-t-4 border-amber-400 bg-amber-50/40 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-800/40 p-7 flex flex-col hover:shadow-md transition-shadow reveal"
            style={{ transitionDelay: "0.2s" }}
            data-testid="highlight-edendiscovery"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 dark:text-amber-400 mb-2">
              EdenDiscovery
            </p>
            <h3 className="text-xl font-bold text-foreground mb-1">Concept registry & community</h3>
            <p className="text-sm text-muted-foreground mb-5">
              For: Early-Stage Innovators, Concept Creators, Independent Researchers
            </p>
            <ul className="space-y-2.5 flex-1 mb-6">
              {[
                "Structured concept submission with a timestamped record",
                "Automated EDEN Credibility Score rated 0 to 100",
                "Graduation path from concept to EdenLab project",
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                Free
              </span>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:underline">
                Learn more →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Mission — light emerald tinted panel */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
        <div
          className="rounded-2xl border border-primary/20 p-10 md:p-14 reveal"
          data-testid="mission-panel"
          style={{
            background:
              "linear-gradient(135deg, hsl(152 72% 22% / 0.06) 0%, hsl(152 72% 22% / 0.10) 100%)",
          }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
            Our Mission
          </p>
          <p className="text-2xl md:text-3xl font-bold text-foreground leading-snug max-w-3xl mb-6">
            Accelerate science to patient impact by building the infrastructure
            that biotech needs to discover, develop, and deliver breakthroughs.
          </p>
          <p className="text-base text-foreground/65 leading-relaxed max-w-2xl">
            Thousands of licensable technologies, groundbreaking research
            hypotheses, and critical scientific partnerships remain undiscovered
            each year due to fragmented data and outdated workflows. EdenNX is
            changing that, building the connective tissue between every
            stakeholder in the biotech ecosystem.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-primary/5 border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground mb-6 reveal"
            data-testid="bottom-cta-headline"
          >
            The intelligence infrastructure biotech has been waiting for.
          </h2>
          <Link
            to="/products"
            data-testid="bottom-cta-products"
            className="inline-flex items-center px-8 py-3.5 rounded-md text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm reveal"
            style={{ transitionDelay: "0.1s" }}
          >
            Explore Our Products
          </Link>
        </div>
      </section>
    </div>
  );
}
