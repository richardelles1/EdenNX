import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CoverageSection } from "@/components/CoverageSection";
import { ProductShowcase } from "@/components/ProductShowcase";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { TTO_COUNT_LABEL, ASSET_COUNT_LABEL } from "@/lib/platformStats";

// The mark, cropped tight to its artwork so a height percentage means the
// mark's real height rather than mostly white padding.
const MARK = "/images/eden-mark-hero.jpg";

export default function Home() {
  useScrollReveal();
  useSEO({
    // The headline no longer spells out the category, so the title and
    // description carry those terms instead. Counts come from platformStats so
    // the meta cannot drift from the figures used on the page.
    title: "EdenNX | Biotech intelligence infrastructure",
    description:
      `The backbone biotech runs on. EdenNX builds EdenRadar for licensing intelligence across ${TTO_COUNT_LABEL} research institutions and ${ASSET_COUNT_LABEL} assets, and EdenCompliance for vendor quality and audit records.`,
  });

  return (
    <div className="pt-16">
      {/*
        Hero. The mark takes the right of the frame, cropped by it, so it reads
        as architecture rather than logo placement. It is blended with multiply,
        which returns the backdrop wherever the artwork is white: that removes
        the white card baked into the logo and lets it sit on the page tint
        without keying the asset.

        One statement, one action. The rotating "Powering" word and the scrolling
        fact ticker that used to sit here are both gone: the statement carries
        the page, and the ticker repeated figures the Coverage band already
        states further down.
      */}
      {/* Column on mobile so the mark can lead the stack in normal flow, and a
          single centred row on desktop where the mark is absolutely placed. */}
      <section
        className="relative flex min-h-[96vh] flex-col justify-center overflow-hidden pt-10 lg:block lg:pt-0"
        style={{
          // Green radiating out of the mark, plus a gentle wash across the page
          // from right to left. The previous version was faint enough to be
          // invisible, which is the same as not being there.
          background:
            "radial-gradient(56% 76% at 73% 48%, rgba(47,143,78,0.20) 0%, rgba(47,143,78,0.09) 42%, rgba(47,143,78,0) 74%)," +
            "linear-gradient(105deg, #FFFFFF 38%, rgba(47,143,78,0.07) 100%)," +
            "#FFFFFF",
        }}
      >
        <img
          src={MARK}
          alt=""
          aria-hidden
          /* No -translate-y-1/2 here: Tailwind emits that as the standalone
             `translate` property, which composes with the `transform` in the
             entrance keyframe instead of overriding it, centring the mark twice.
             The keyframe owns the vertical offset. */
          className="hero-mark hero-mark-in pointer-events-none absolute top-1/2 w-auto select-none"
          style={{ objectFit: "contain", mixBlendMode: "multiply" }}
        />

        {/* The same fine data grid the product bento stands on, so the hero and
            the section below it share one ground rather than each inventing a
            texture. Faded at the edges so it never reads as a pattern. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(15,26,20,0.055) 1px, transparent 1.5px)",
            backgroundSize: "26px 26px",
            WebkitMaskImage: "radial-gradient(115% 85% at 30% 45%, #000 20%, transparent 78%)",
            maskImage: "radial-gradient(115% 85% at 30% 45%, #000 20%, transparent 78%)",
          }}
        />

        {/* Settles the hero into the section below instead of ending on a hard
            edge between the white ground and the page tint. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, hsl(var(--background) / 0.55) 62%, hsl(var(--background)) 100%)",
          }}
        />

        <div className="relative mx-auto flex w-full max-w-7xl items-center px-6 pb-20 lg:min-h-[96vh] lg:py-20 lg:px-8">
          <div className="max-w-full lg:max-w-[50%]">
            {/* The company name set to the width of the text column, above the
                claim rather than instead of it. It is a div, not a heading, so
                the h1 stays the claim: the old hero made the name the h1, which
                spent the page's most valuable line on something the visitor
                already knew from the URL. */}
            <div
              className="hero-rise font-bold leading-[0.86] tracking-[-0.045em]"
              data-testid="hero-wordmark"
              style={{ fontSize: "clamp(3.2rem,11vw,10.5rem)", animationDelay: "0.1s" }}
            >
              <span className="text-primary">Eden</span>
              <span className="text-foreground">NX</span>
            </div>

            {/* A full headline line of air between the name and the claim, so
                they read as two separate statements rather than one stack. */}
            <h1
              className="hero-rise mt-10 font-bold text-foreground lg:mt-24"
              data-testid="hero-headline"
              style={{
                // Sized so the line breaks after "backbone" and sets as two
                // lines. Any larger and "on." is orphaned on a third.
                fontSize: "clamp(2.6rem,5.2vw,4.6rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.034em",
                animationDelay: "0.24s",
              }}
            >
              The <span className="text-primary">backbone</span> biotech runs on.
            </h1>

            {/* Sized and weighted to be read, not skimmed past. The accents are
                the three words the sentence turns on: the two outcomes and the
                payoff. Kept to three so they stay emphasis rather than pattern. */}
            <p
              className="hero-rise mt-7 max-w-[40ch] text-[22px] leading-[1.5] text-foreground/85 md:text-[25px]"
              data-testid="hero-subheadline"
              style={{ animationDelay: "0.38s" }}
            >
              <span className="font-semibold text-primary">Findable</span> science.{" "}
              <span className="font-semibold text-primary">Provable</span> quality.{" "}
              <span className="font-semibold text-primary">Less time</span> between a
              discovery and the people waiting on it.
            </p>

            {/* Two actions, weighted rather than matched: the primary carries
                you down to the suite on this page, the secondary leaves it.
                The old hero ran two identical solid greens with no hierarchy. */}
            <div
              className="hero-rise mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "0.5s" }}
            >
              <a
                href="#suite"
                data-testid="hero-cta-products"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[16px] font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
              >
                Our products <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                data-testid="hero-cta-contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[16px] font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
              >
                Contact us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Suite intro */}
      {/* scroll-mt clears the fixed navbar when the hero CTA jumps here. */}
      <section
        id="suite"
        className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 lg:pt-24 pb-10 lg:pb-12 scroll-mt-24"
        data-testid="product-highlights"
      >
        {/* "Backbone" belongs to the hero now, so this heading leads with the
            problem instead of repeating the metaphor, and the body picks up the
            hero's three beats to show how the five products deliver them. */}
        <h2 className="text-3xl md:text-[2.75rem] font-black tracking-tight leading-[1.08] text-foreground mb-5 reveal">
          Built for every step that slows science down.
        </h2>
        <p
          className="text-lg text-foreground/80 max-w-2xl leading-relaxed reveal"
          style={{ transitionDelay: "0.05s" }}
        >
          Find the science. Prove the quality. Move it to market. Each product owns a
          different stretch of the same road, and one company builds all five.
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
