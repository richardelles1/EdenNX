import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { ROUTE_META } from "@/lib/routeMeta";
import { Link } from "react-router-dom";
import headshot1 from "@assets/Headshot_1776710302062.jfif";
import wmPhoto from "@assets/WM_phot_1775790644431.jpg";
import marquisLogo from "@assets/marquis-whos-who.png";

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

// One measure for the whole page. This is prose, not a dashboard: set across a
// 1280px container it needed two and three column tracks to fill the width, and
// those tracks went ragged the moment two items were not the same length. A
// single 768px column removes both problems at once, and the section grounds
// still run full bleed so the page reads wide even though the reading does not.
const COL = "mx-auto w-full max-w-3xl";

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
    t: "AI does the reading. People make the call.",
    d: "AI does real work in these products: it reads the documents, ranks the exposures, and answers the questions. Every consequential decision still passes through a person, because that is what the work requires.",
  },
];


// The founders, moved here from /team. The page claims the company is built by
// industry insiders; these two CVs are the evidence for that claim, and keeping
// the claim and its proof on separate pages weakened both. /team now redirects
// here so no existing link or ranking breaks.
const founders = [
  {
    name: "Wafick Mohamed, D.Sc.",
    title: "Co-Founder & Chief Executive Officer",
    photo: wmPhoto,
    linkedIn: "https://www.linkedin.com/in/wafick-mohamed-d-sc-m-sc-cqa-chrc-clssbb-pmp-81643b96",
    bio: [
      "Dr. Wafick Mohamed is a biotech executive, entrepreneur, and educator dedicated to advancing science for patient impact. With extensive experience across global pharma and emerging biotech, he specializes in building quality systems, scaling operations, and leading organizations from the ground up.",
      "As Founder and CEO of WKM Consulting Services LLC, Dr. Mohamed has launched and shaped multiple innovative companies. He also serves as a professor of research and entrepreneurship, mentoring the next generation of scientific and business leaders.",
      "He holds a Doctorate in Science, a Master of Science, and certifications including CQA, PMP, and CLSSBB.",
    ],
    // Wording taken from the EdenNX announcement of the recognition and Dr Mohamed's own quote in
    // it, not composed here. A claim about a named person needs a source: RICO marketing/CLAIMS.md.
    recognition: {
      logo: marquisLogo,
      alt: "Marquis Who's Who",
      note: "Selected for inclusion in Marquis Who's Who in America, recognizing a career advancing science and innovation across the biotechnology and pharmaceutical sectors.",
    },
    quote:
      "We're proud to stand with an industry that pushes the boundaries of science to improve patients' lives. Our mission is to lead this transformation by delivering intelligent, scalable solutions that help the life science ecosystem discover more, decide faster, and create impact with clarity and confidence.",
  },
  {
    name: "Richard Elles",
    title: "Co-Founder & Chief Operating Officer",
    photo: headshot1,
    linkedIn: "https://www.linkedin.com/in/richard-elles-pmp",
    bio: [
      "Richard Elles is a dynamic healthcare leader with a diverse background in strategy development, corporate leadership, patient advocacy, and process improvement. A dedicated and PMP-certified Project Manager, Rich has deployed extensive management systems across consulting firms, healthtech startups, academic institutions, and research teams.",
      "As the founder of Oriva, Inc., Rich has harnessed the power of cutting-edge technology to redefine philanthropic development. He is a two-time Ironman and leverages his experience in endurance sports to connect with corporate wellness initiatives to power new giving trends. Rich completed his Bachelor's Degree in Business at Drexel University before earning a Master's Degree in Public Administration from Villanova University.",
    ],
    quote:
      "We are thrilled to bring new energy and laser focus to an industry in need of organization as it drives innovation. The opportunity to create in biotech and research spaces is matched only by the promise of what success will unlock for patients and consumers worldwide.",
  },
];

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.333 6.617c1.326 0 2.598.523 3.536 1.455a4.95 4.95 0 0 1 1.464 3.51v5.794H15v-5.793c0-.44-.176-.86-.488-1.17a1.673 1.673 0 0 0-2.357 0 1.65 1.65 0 0 0-.488 1.17v5.793H8.333v-5.793c0-1.317.527-2.58 1.465-3.511a5.02 5.02 0 0 1 3.535-1.455M5 7.445H1.667v9.932H5zM3.333 4.967C4.253 4.967 5 4.226 5 3.31s-.746-1.655-1.667-1.655A1.66 1.66 0 0 0 1.667 3.31a1.66 1.66 0 0 0 1.666 1.656" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

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
      <section className={`px-6 lg:px-8 ${SECTION}`}>
        <div className={COL}>
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-5 reveal">
            Founded 2026
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] text-foreground reveal"
            style={{ transitionDelay: "0.06s" }}
            data-testid="about-headline"
          >
            Built by industry insiders, for the industry.
          </h1>
          <p
            className="mt-8 text-lg leading-relaxed text-muted-foreground reveal"
            style={{ transitionDelay: "0.14s" }}
          >
            EdenNX is the intelligence backbone of modern biotech. Our products cover the full
            lifecycle: research, qualification, quality, and release.
          </p>
          <p
            className="mt-5 text-lg leading-relaxed text-muted-foreground reveal"
            style={{ transitionDelay: "0.2s" }}
          >
            That lifecycle runs on disconnected systems. A programme is assessed in one, qualified
            in another, and released through a third, and none of them share a record. Teams
            reconstruct the same evidence at every stage.
          </p>
          <p
            className="mt-5 text-lg leading-relaxed text-foreground/85 reveal"
            style={{ transitionDelay: "0.26s" }}
          >
            We have built the quality systems and run the deal teams these products are for.
          </p>
        </div>
      </section>

      {/* The people, directly under the claim they are the evidence for. The
          headline says the company is built by industry insiders; putting the
          two CVs immediately beneath it means the reader meets the proof before
          the argument rather than three sections after it. */}
      <section id="people" className={`px-6 lg:px-8 ${SECTION} border-t border-border scroll-mt-24`}>
        <div className={COL}>
          <div className={`${HEAD} reveal`}>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              The People
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Meet the founders.
            </h2>
          </div>

          <div>
            {founders.map((f, i) => (
              <article
                key={f.name}
                className={`border-t border-border ${ROW} reveal`}
                style={{ transitionDelay: `${i * 0.08}s` }}
                data-testid={`founder-${i}`}
              >
                <div className="flex items-start gap-5 sm:gap-6">
                  <img
                    src={f.photo}
                    alt={f.name}
                    loading="lazy"
                    className="h-36 w-32 flex-shrink-0 rounded-xl border border-border object-cover object-top sm:h-44 sm:w-36"
                  />
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold tracking-tight text-foreground">{f.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-primary">{f.title}</p>
                    <a
                      href={f.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <LinkedInIcon />
                      LinkedIn
                    </a>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {f.bio.map((para, j) => (
                    <p key={j} className="text-base leading-relaxed text-muted-foreground">
                      {para}
                    </p>
                  ))}
                </div>

                {/* The supplied artwork is black on opaque white with no alpha, so it gets its own
                    white card rather than a filter. A third-party mark belongs on its own ground,
                    and this way it survives a dark surface without inverting someone's logo. */}
                {f.recognition && (
                  <div className="mt-6 flex items-start gap-4 border-t border-border pt-5">
                    <span className="inline-flex shrink-0 items-center rounded-lg border border-border bg-white px-3 py-2">
                      <img src={f.recognition.logo} alt={f.recognition.alt} loading="lazy" className="h-6 w-auto" />
                    </span>
                    <p className="text-[13.5px] leading-relaxed text-muted-foreground">{f.recognition.note}</p>
                  </div>
                )}

                {/* A hairline and a size change, not a tinted box with a fat
                    left border: the type carries it. */}
                <blockquote className="mt-6 border-t border-border pt-5">
                  <p className="text-[17px] leading-relaxed tracking-tight text-foreground/90">
                    <span aria-hidden className="mr-0.5 font-bold text-primary">&ldquo;</span>
                    {f.quote}
                    <span aria-hidden className="ml-0.5 font-bold text-primary">&rdquo;</span>
                  </p>
                  <footer className="mt-3 text-[12.5px] font-semibold text-foreground/45">
                    {f.name.split(",")[0]}
                  </footer>
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Three beliefs. The tan ground is gone: it arrived with an editorial
          serif treatment that has since been removed, tan appears nowhere else
          on this site, and it marked this section as special without any reason
          for it being so. Hairlines and type carry the list instead. */}
      <section className={`px-6 lg:px-8 ${SECTION} border-t border-border`}>
        <div className={COL}>
          <div className={`${HEAD} reveal`}>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              Why Now
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.1] text-foreground">
              The right moment to close the distance.
            </h2>
          </div>
          <div className="reveal" style={{ transitionDelay: "0.06s" }}>
            {beliefs.map((item, i) => (
              <div
                key={item.t}
                className={`border-t border-border ${ROW} ${i === beliefs.length - 1 ? "border-b" : ""}`}
              >
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground">
                  {item.t}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
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
        <div className={`px-6 lg:px-8 ${SECTION}`}>
          <div className={COL}>
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
                  className={`grid grid-cols-[64px_1fr] gap-x-6 border-t border-primary/15 sm:grid-cols-[92px_1fr] ${ROW} reveal ${
                    i === edenPrinciples.length - 1 ? "border-b" : ""
                  }`}
                  style={{ transitionDelay: `${i * 0.06}s` }}
                  data-testid={`eden-${i}`}
                >
                  <span
                    aria-hidden
                    className="font-bold leading-[0.78] tracking-[-0.05em] text-primary/[0.28]"
                    style={{ fontSize: "clamp(3.25rem, 8vw, 4.75rem)" }}
                  >
                    {item.letter}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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

      {/* A quiet close. The page used to end on a teaser to /team; with that
          merged in, it ran off the framework straight into the footer with
          nothing to do next. One line and one link, deliberately lighter than
          the CTAs on the home and products pages: this is the About page, and
          the reader is here to understand the company, not to be sold. */}
      <section className={`px-6 lg:px-8 ${SECTION} border-t border-border`}>
        <div className={`${COL} text-center reveal`}>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Talk to us.</h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            Tell us what you are working on and we will direct you to the right product across the
            suite, or build toward the one you need.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-[15px] font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            Contact us
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* The team teaser lived here, pointing at /team. Both pages used to end
          by linking to the other, which is how you can tell neither stood on
          its own: they were one page's worth of content split in half. */}
    </div>
  );
}
