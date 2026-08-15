import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { ROUTE_META } from "@/lib/routeMeta";
import { Link } from "react-router-dom";

// One spacing scale, used by every section on the page.
//
// The page previously took four different section paddings (128, 112, 96, 80),
// and gave the same relationship two different answers: 88px between a heading
// and its content in one section, 48px in another. When the same relationship is
// spaced differently, nothing groups, and the page reads as evenly distributed
// debris rather than as composed blocks. These three values are the whole system:
// content inside a section is visibly tighter than the gap between sections,
// which is the mechanism that makes a page feel deliberate.
const SECTION = "py-16 md:py-24"; //  96px between sections
const HEAD = "mb-10"; //              40px from a heading block to its content
const ROW = "py-7"; //                28px inside a row, so rows read as a list

// Three convictions, not three steps. They carried 01/02/03 before, which
// promised a sequence the content does not have: these are parallel beliefs and
// any of them could come first.
const beliefs = [
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
];

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
      {/* Claim. The headline runs the full measure rather than sitting in a
          half-empty row, and the two supporting paragraphs sit beneath it in
          two columns, so the width is used by content instead of padding. */}
      <section className={`max-w-7xl mx-auto px-6 lg:px-8 ${SECTION}`}>
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-5 reveal">
          Founded 2026
        </p>
        <h1
          className="max-w-4xl text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-foreground reveal"
          style={{ transitionDelay: "0.06s" }}
          data-testid="about-headline"
        >
          Built by industry insiders, for the industry.
        </h1>
        <div
          className="mt-10 grid gap-x-14 gap-y-5 md:grid-cols-2 reveal"
          style={{ transitionDelay: "0.14s" }}
        >
          <p className="text-lg leading-relaxed text-muted-foreground">
            EdenNX is building the intelligence backbone of modern biotech. From the first research
            hypothesis through qualification, quality and release, we build the infrastructure that
            carries a discovery all the way to a patient.
          </p>
          <p className="text-lg leading-relaxed text-foreground/85">
            We have built the quality systems and run the deal teams these products are for.
          </p>
        </div>
      </section>

      {/* Three beliefs. The tan ground is gone: it arrived with an editorial
          serif treatment that has since been removed, tan appears nowhere else
          on this site, and it marked this section as special without any reason
          for it being so. Hairlines and type carry the list instead. */}
      <section className={`max-w-7xl mx-auto px-6 lg:px-8 ${SECTION} border-t border-border`}>
        <div className={`${HEAD} reveal`}>
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            Why Now
          </p>
          <h2 className="max-w-2xl text-3xl md:text-4xl font-bold tracking-tight leading-[1.1] text-foreground">
            The right moment to close the distance.
          </h2>
        </div>
        <div className="reveal" style={{ transitionDelay: "0.06s" }}>
          {beliefs.map((item, i) => (
            <div
              key={item.t}
              className={`grid gap-x-14 gap-y-2 border-t border-border md:grid-cols-[minmax(0,0.72fr)_1.28fr] ${ROW} ${
                i === beliefs.length - 1 ? "border-b" : ""
              }`}
            >
              <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground">
                {item.t}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EDEN, at full scale.
          This is the one thing on the page only this company can say: it is
          named EdenNX and the framework spells EDEN. It used to be four small
          cards at the bottom, sized like a footnote, while a tan band gave the
          page's visual weight to a section that had not earned it. The
          hierarchy is inverted here: one column so the letters read E-D-E-N
          straight down the left edge, at a size that makes the acronym the
          thing you remember, and the page's single change of ground spent on
          it. The tint is the site's own emerald rather than an unrelated
          colour. */}
      <section className="border-y border-primary/10 bg-primary/[0.035]">
        <div className={`max-w-7xl mx-auto px-6 lg:px-8 ${SECTION}`}>
          <div className={`${HEAD} reveal`}>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              Our Principles
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              The EDEN framework.
            </h2>
          </div>

          <div>
            {edenPrinciples.map((item, i) => (
              <div
                key={item.letter + item.title}
                className={`grid items-baseline gap-x-8 gap-y-1 border-t border-primary/15 md:grid-cols-[124px_minmax(0,0.78fr)_1.22fr] ${ROW} reveal ${
                  i === edenPrinciples.length - 1 ? "border-b" : ""
                }`}
                style={{ transitionDelay: `${i * 0.06}s` }}
                data-testid={`eden-${i}`}
              >
                <span
                  aria-hidden
                  className="font-bold leading-[0.8] tracking-[-0.05em] text-primary/[0.28]"
                  style={{ fontSize: "clamp(4rem, 7.5vw, 6.75rem)" }}
                >
                  {item.letter}
                </span>
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
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
      <section className="py-16 md:py-20">
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
