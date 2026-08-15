import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { ROUTE_META } from "@/lib/routeMeta";
import { Link } from "react-router-dom";

const edenPrinciples = [
  {
    letter: "E",
    title: "Expand Understanding",
    description:
      "We design intelligence that helps teams see the whole picture: what is being discovered, what is being qualified, and what is ready to move. Clarity at every stage, not only the first.",
  },
  {
    letter: "D",
    title: "Design With Respect",
    description:
      "Every dataset, every record, and every audit represents someone's work. We approach the ecosystem with appreciation for the people and expertise behind it.",
  },
  {
    letter: "E",
    title: "Elevate the Ecosystem",
    description:
      "Our tools amplify what teams can achieve: finding the science faster, proving the quality with less friction, and reaching release with confidence.",
  },
  {
    letter: "N",
    title: "Navigate With Integrity",
    description:
      "We value clear thinking, honest signals, and grounded analysis, with transparency in how insights are surfaced and in how every record is kept.",
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
          EdenNX is building the intelligence backbone of modern biotech. From
          the first research hypothesis through qualification, quality and
          release, we build the infrastructure that carries a discovery all the
          way to a patient.
        </p>
        <p
          className="mt-5 text-lg text-foreground/80 max-w-2xl leading-relaxed reveal"
          style={{ transitionDelay: "0.28s" }}
        >
          We have built the quality systems and run the deal teams these products are for.
        </p>
      </section>

      {/* Why now — warm band. Type is the site's own (DM Sans bold, section
          scale); only the ground is different, so the section reads as a change
          of pace rather than as a page from another site. */}
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
              className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
              style={{ color: "hsl(25 25% 14%)", lineHeight: 1.1 }}
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
                d: "Scattered across the institutions that made them, the vendors who supply them, and the records that prove them. Bringing those together is the work, and it is our job and our responsibility to do it.",
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
                  className="leading-none"
                  style={{ fontSize: "clamp(2.75rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "hsl(142 52% 36% / 0.22)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3
                    className="text-xl md:text-2xl font-bold tracking-tight mb-3.5"
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
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-24 lg:pt-28">
        <div className="mb-12 reveal">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            Our Principles
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The EDEN framework.
          </h2>
        </div>

        {/* The letters carry the framework, so they are set large and faint at
            the top of each tile rather than boxed in a chip beside the title:
            read across the row they spell EDEN, which a 48px square never let
            them do. Top left, not right: the letter is a marker for what
            follows, so it sits where the eye starts rather than in the opposite
            corner from the words it labels. Reveal sits on the grid, not the
            tiles, because .reveal owns the transition property and would
            swallow the tile's own. */}
        <div className="grid gap-4 reveal sm:grid-cols-2">
          {edenPrinciples.map((item, i) => (
            <div
              key={item.letter + item.title}
              className="glass-tile p-7 md:p-8"
              style={{ ["--glass-accent" as string]: "hsl(var(--primary))" }}
              data-testid={`eden-${i}`}
            >
              <span aria-hidden className="glass-mark glass-mark-left">{item.letter}</span>
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

      {/* The "How we work" grid lived here: four values under "Built by
          operators, for operators". Removed as redundant. "Respect the work
          behind the data" restated Design With Respect almost word for word,
          "Evidence over hype" restated Navigate With Integrity, "Science to
          patients, faster" restated the home-page mission, and "Operators, not
          tourists" restated this page's own headline and the whole Team page.
          Its one piece of evidence, that we have built these systems and run
          these deal teams ourselves, is now the second line of the intro. */}

      {/* An "In short" section closed the page here: a heading saying EdenNX is
          the company behind the suite, over a paragraph naming all five
          products. Cut. The label apologised for the page's own length, and the
          product list was an inventory that /products does properly. What the
          company is belongs at the top, so the one sentence worth keeping moved
          into the intro. */}

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
