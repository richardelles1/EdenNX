import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FieldNotes } from "@/components/FieldNotes";
import { ShowcaseFeatureDropdown } from "@/components/ShowcaseFeatures";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { ROUTE_META } from "@/lib/routeMeta";

// The mark, cropped tight to its artwork so a height percentage means the
// mark's real height rather than mostly white padding.
const MARK = "/images/eden-mark-hero.jpg";

// The mission's photograph: a mother and daughter (Pexels 6182919, chosen by
// Rich; Pexels licence, free to use, no attribution required).
const MISSION_PHOTO = "/images/mission-family.jpg";

export default function Home() {
  useScrollReveal();
  // The mark drifts at a fifth of the scroll speed while the hero is on screen,
  // so it sits a layer behind the copy. Desktop with motion allowed only.
  const [drift, setDrift] = useState(0);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      setDrift(Math.min(window.scrollY, window.innerHeight * 1.2) * 0.2);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  useSEO(ROUTE_META["/"]);

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
        // 112vh is sized around the desktop mark. On mobile the mark is a
        // 300px block in normal flow, so the same height would leave the stack
        // floating in a screen and a bit of empty space.
        className="relative flex min-h-0 flex-col justify-center overflow-hidden pb-10 pt-16 lg:block lg:min-h-[112vh] lg:pb-0 lg:pt-0"
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
          // translate, not transform: the entrance keyframe owns transform, and
          // the two compose, so the scroll drift never fights the settle.
          style={{ objectFit: "contain", mixBlendMode: "multiply", translate: `0 ${drift}px` }}
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

        <div className="relative mx-auto flex w-full max-w-7xl items-center px-6 pb-20 lg:min-h-[112vh] lg:py-20 lg:px-8">
          <div className="max-w-full lg:max-w-[50%]">
            {/* The company name set to the width of the text column, above the
                claim rather than instead of it. It is a div, not a heading, so
                the h1 stays the claim: the old hero made the name the h1, which
                spent the page's most valuable line on something the visitor
                already knew from the URL. */}
            <div
              className="hero-wordmark hero-rise font-bold leading-[0.86] tracking-[-0.045em]"
              data-testid="hero-wordmark"
              style={{ animationDelay: "0.1s" }}
            >
              {/* Letters settle in sequence on arrival; the name reads whole to
                  assistive tech through the label. */}
              <span aria-label="EdenNX" role="img">
                {"EdenNX".split("").map((ch, i) => (
                  <span key={i} aria-hidden className={`hero-letter ${i < 4 ? "text-primary" : "text-foreground"}`} style={{ animationDelay: `${0.05 + i * 0.04}s` }}>
                    {ch}
                  </span>
                ))}
              </span>
            </div>

            {/* A full headline line of air between the name and the claim, so
                they read as two separate statements rather than one stack. */}
            <h1
              className="hero-rise mt-10 font-bold text-foreground lg:mt-24"
              data-testid="hero-headline"
              style={{
                // A word longer than the line it replaced, so it steps down a
                // little to keep the same two-line set on desktop.
                fontSize: "clamp(2.4rem,4.6vw,4.05rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.034em",
                animationDelay: "0.24s",
              }}
            >
              The <span className="text-primary">intelligence backbone</span> of modern biotech
            </h1>

            {/* The accent lands on the three nouns only: discovery, quality,
                visibility. One per product family, and the verbs around them
                stay in body ink so the three outcomes are what the eye picks
                up rather than most of the sentence. */}
            <p
              className="hero-rise mt-7 max-w-[44ch] text-[21px] leading-[1.5] text-foreground/85 md:text-[24px]"
              data-testid="hero-subheadline"
              style={{ animationDelay: "0.38s" }}
            >
              Transforming <span className="font-semibold text-primary">discovery</span>, elevating{" "}
              <span className="font-semibold text-primary">quality</span>, and delivering end-to-end{" "}
              <span className="font-semibold text-primary">visibility</span> through intelligent
              tracking.
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
              {/* The secondary action is an outline, so "Our products" is the
                  one the eye goes to. */}
              <Link
                to="/contact"
                data-testid="hero-cta-contact"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-7 py-3.5 text-[16px] font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/5"
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
            hero's three beats to show how the products deliver them. */}
        <h2 className="text-3xl md:text-[2.75rem] font-black tracking-tight leading-[1.08] text-foreground mb-5 reveal">
          Built for every step that slows science down.
        </h2>
        <p
          className="text-lg text-foreground/80 max-w-2xl leading-relaxed reveal"
          style={{ transitionDelay: "0.05s" }}
        >
          EdenRadar finds the asset. EdenCompliance qualifies the vendors and runs the audits
          behind it. EdenTrials is a live, global clinical trial network. EdenBR
          (Beta) tracks where a batch sits. EdenLab, EdenDiscovery and EdenMarket are emerging.
        </p>
      </section>

      <section className="pb-12 lg:pb-16" data-testid="product-showcase">
        <ShowcaseFeatureDropdown />
      </section>

      {/* Mission, as the page's one full-bleed moment, with no eyebrow label:
          the statement says what it is. It is the section's heading (h2).
          The photograph is of patients and families, who are who it is for. Until the
          licensed photo lands (Cleo, MISSION_PHOTO), a deep green field. The
          scrim darkens the left, where the type sits, and lets the photo
          breathe on the right. */}
      <section className="px-4 pb-20 lg:px-6 lg:pb-28" data-testid="mission-panel">
        <div className="reveal relative mx-auto max-w-[88rem] overflow-hidden rounded-[28px]" style={{ background: "linear-gradient(120deg, hsl(152 40% 16%) 0%, hsl(146 42% 26%) 100%)" }}>
          {MISSION_PHOTO && (
            <img
              src={MISSION_PHOTO}
              alt=""
              aria-hidden
              decoding="async"
              loading="lazy"
              // The right side of the band, fading in from the green so the
              // photograph sits behind the statement rather than beside it.
              className="absolute inset-y-0 right-0 h-full w-full lg:w-[54%]"
              style={{
                objectFit: "cover",
                // The photo only ever fills the right 54%, and the text column
                // stops at 46%, so the faces never sit under the type at any
                // width (Rich: the text was over the girl's face).
                objectPosition: "45% 30%",
                WebkitMaskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.6) 18%, #000 40%)",
                maskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.6) 18%, #000 40%)",
              }}
            />
          )}
          {/* Keeps the type legible where it crosses the photo, and gives the
              photo a light green cast so it belongs to the band. */}
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,20,14,0.7) 0%, rgba(8,20,14,0.35) 50%, rgba(20,60,38,0.18) 100%)" }} />
          <div className="relative flex min-h-[520px] flex-col justify-center px-8 py-16 sm:px-12 lg:min-h-[620px] lg:w-[48%] lg:px-16 xl:px-20">
            {/* The old version framed the mission entirely as the licensing gap,
                which is EdenRadar's problem rather than the company's. This spans
                the lifecycle: discovery, then quality, then release. */}
            <h2 className="max-w-[16ch] text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] text-white sm:text-[3.4rem] lg:text-[clamp(2.4rem,3.6vw,4rem)]">
              Accelerate science to{" "}
              {/* One line, always (Rich): the phrase the statement lands on. */}
              <span className="whitespace-nowrap text-[#9fdcb4]">patient impact.</span>
            </h2>
            <p className="mt-8 max-w-[52ch] text-[17px] leading-[1.65] text-white/85 lg:text-[18px]">
              Discover smarter, qualify faster, and track every step across the biotech lifecycle.
              From opportunities at university tech transfer offices, to audit-ready vendor
              management, to release into clinic and market. Every stakeholder, every stage.
            </p>
          </div>
        </div>
      </section>

      {/* The global coverage section lived here: the institution counts, the
          indexed-asset totals and the named universities. All of it is
          EdenRadar's, and on the parent site it made one product speak for the
          company. It belongs on edenradar.com, which already carries it. */}

      <FieldNotes />

      {/* Bottom CTA */}
      <section className="bg-primary/5 border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 text-center">
          {/* One action, and not a product launch. This used to read "Start with
              the flagship that fits your team" over two buttons, which made two
              of the products stand in for the company on the last thing anyone
              reads. Sending people to us keeps the parent site introducing the
              suite rather than routing traffic to one half of it. */}
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground mb-3 reveal"
            data-testid="bottom-cta-headline"
          >
            Tell us what you are working on.
          </h2>
          <p
            className="mx-auto mb-7 max-w-xl text-base leading-relaxed text-foreground/70 reveal"
            style={{ transitionDelay: "0.05s" }}
          >
            We will direct you to the right product across the suite, or build toward the one you
            need.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 reveal" style={{ transitionDelay: "0.1s" }}>
            <Link
              to="/contact"
              data-testid="bottom-cta-contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
