import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { ROUTE_META } from "@/lib/routeMeta";
import { Link } from "react-router-dom";

const edenPrinciples = [
  {
    letter: "E",
    title: "Expand Understanding",
    description:
      "We design intelligence that helps innovators see patterns, surface insights, and explore the life science landscape with greater clarity and curiosity.",
  },
  {
    letter: "D",
    title: "Design With Respect",
    description:
      "Every dataset, asset, and idea represents someone's work. We approach the ecosystem with appreciation for the people and expertise behind it.",
  },
  {
    letter: "E",
    title: "Elevate the Ecosystem",
    description:
      "Our tools aim to amplify what teams can discover and achieve: accelerating exploration, sharpening decisions, and opening new possibilities.",
  },
  {
    letter: "N",
    title: "Navigate With Integrity",
    description:
      "We value clear thinking, honest signals, and grounded analysis. Our approach is guided by transparency in how insights are surfaced and how intelligence is shaped.",
  },
];

export default function About() {
  useScrollReveal();
  useSEO(ROUTE_META["/about"]);

  return (
    <div className="pt-16">
      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 reveal">
          Founded 2026
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold text-foreground mb-6 reveal"
          style={{ transitionDelay: "0.1s" }}
          data-testid="about-headline"
        >
          Built by industry insiders, for the industry.
        </h1>
        <p
          className="text-lg text-muted-foreground max-w-2xl leading-relaxed reveal"
          style={{ transitionDelay: "0.2s" }}
        >
          EdenNX is building the intelligence backbone of modern biotech.
          From earliest discovery hypothesis through commercial licensing and
          patient delivery, we build the infrastructure that powers every stage
          of the lifecycle.
        </p>
      </section>

      {/* Why now — warm editorial sequence */}
      <section
        className="border-y"
        style={{
          background: "linear-gradient(180deg, hsl(36 40% 96%) 0%, hsl(33 34% 93%) 100%)",
          borderColor: "hsl(33 20% 86%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl mb-12 lg:mb-16 reveal">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-5">
              Why Now
            </p>
            <h2
              className="font-display text-4xl md:text-6xl font-medium tracking-tight mb-6"
              style={{ color: "hsl(25 25% 14%)", lineHeight: 1.05 }}
            >
              The right moment to close the distance.
            </h2>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: "hsl(25 12% 38%)" }}>
              This is the moment to put technology to work across the whole lifecycle, from the
              first hypothesis to the moment a treatment reaches a patient.
            </p>
          </div>

          {/* Four items became three, and they now span the lifecycle rather
              than giving three angles on the same licensing gap. That gap is
              EdenRadar's argument; on the parent site it was one product
              speaking for the company. */}
          <div>
            {[
              {
                t: "The answers already exist.",
                d: "Buried in catalogs, registers and records across thousands of institutions, large and small. It is our job and our responsibility to bring them to light, so we can all benefit.",
              },
              {
                t: "Proof has to travel with the work.",
                d: "A discovery is only worth what you can evidence about it. Quality is not the paperwork that follows the science; it is part of the science, and it should be as easy to keep as it is to claim.",
              },
              {
                t: "AI, with humanity at the heart.",
                d: "We believe in AI and its benefits, and we believe humanity is at the heart of health care. Blending both, we move quickly and carefully to get patients the care they need, when they need it.",
              },
            ].map((item, i, arr) => (
              <div
                key={item.t}
                className={`grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-8 py-10 md:py-11 reveal ${
                  i === arr.length - 1 ? "border-y" : "border-t"
                }`}
                style={{ transitionDelay: `${i * 0.05}s`, borderColor: "hsl(33 20% 86%)" }}
              >
                <div
                  className="font-display leading-none"
                  style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)", fontWeight: 500, color: "hsl(142 52% 36% / 0.22)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3
                    className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-3.5"
                    style={{ color: "hsl(25 25% 14%)" }}
                  >
                    {item.t}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: "hsl(25 12% 38%)" }}>
                    {item.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The mission panel lived here. It was a near-verbatim duplicate of the
          one on the home page, on the two pages a visitor is most likely to
          read back to back, and it still carried the older copy that framed the
          company's mission as the licensing gap. One statement, one home: it
          stays on the home page. */}

      {/* EDEN Acronym */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="mb-12 reveal">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            Our Principles
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The EDEN framework.
          </h2>
        </div>

        {/* The letters carry the framework, so they are set large and faint in
            the corner of each tile rather than boxed in a chip beside the
            title: read across the row they spell EDEN, which a 48px square
            never let them do. Same glass treatment as the four steps on the
            Products page, where the character in the corner also means
            something. Reveal sits on the grid, not the tiles, because .reveal
            owns the transition property and would swallow the tile's own. */}
        <div className="grid gap-4 reveal sm:grid-cols-2">
          {edenPrinciples.map((item, i) => (
            <div
              key={item.letter + item.title}
              className="glass-tile p-7 md:p-8"
              style={{ ["--glass-accent" as string]: "hsl(var(--primary))" }}
              data-testid={`eden-${i}`}
            >
              <span aria-hidden className="glass-mark">{item.letter}</span>
              <div className="relative">
                <h3 className="text-lg font-bold tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-foreground/75">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How we work. Moved here from the Team page, where it sat under a
          heading about who the founders are while saying nothing about them.
          It belongs beside the framework: both are statements of principle. */}
      <section className="border-t border-border py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 max-w-2xl reveal">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              How We Work
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Built by operators, for operators.
            </h2>
            <p className="text-base leading-relaxed text-foreground/75">
              We have built the quality systems and run the deal teams these products are for. That
              shapes how we work.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "Operators, not tourists",
                d: "We design for the people doing the work because we have done it ourselves.",
              },
              {
                t: "Evidence over hype",
                d: "No cherry-picked data, no inflated claims. The intelligence has to earn trust on every screen.",
              },
              {
                t: "Respect the work behind the data",
                d: "Every asset represents someone's years of effort. We treat the ecosystem with that in mind.",
              },
              {
                t: "Science to patients, faster",
                d: "Every feature answers one question: does this help a breakthrough reach patients sooner?",
              },
            ].map((item, i) => (
              // Rule tiles, not glass: four peers, no sequence, and no letter or
              // numeral for a glass tile to carry.
              <div key={item.t} className="reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                <div aria-hidden className="h-[2px] w-full bg-primary" />
                <h3 className="mt-3.5 text-base font-semibold leading-snug tracking-tight text-foreground">
                  {item.t}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-foreground/80">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What the company is. The page used to end on a link to the Team page,
          so a reader could finish About having read about the industry, the
          moment and the framework, but never a plain sentence about EdenNX
          itself. */}
      <section className="border-t border-border py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl reveal">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
              In short
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              EdenNX is the company behind the suite.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/70 md:text-lg">
              We build and run every product in it: EdenRadar for finding science, EdenCompliance
              for proving quality, and EdenMarket, EdenLab and EdenDiscovery for the stretches
              between. Each one is a working product with its own customers and its own site. What
              they share is a company that has done this work, and a belief that the record
              underneath the science matters as much as the science.
            </p>
          </div>
        </div>
      </section>

      {/* Team teaser */}
      <section className="border-t border-border py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-muted-foreground mb-4 text-sm">Curious who's behind EdenNX?</p>
          <Link
            to="/team"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            Meet the Founders
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
