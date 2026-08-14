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
              The right moment to close the gap.
            </h2>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: "hsl(25 12% 38%)" }}>
              This is the moment to put technology to work closing the distance between
              research and treatment, with humanity at the heart of every decision.
            </p>
          </div>

          <div>
            {[
              {
                t: "The technology is finally ready.",
                d: "This is the perfect time to leverage technology to close the gap between research and treatment development.",
              },
              {
                t: "AI, with humanity at the heart.",
                d: "We believe in AI and its benefits, and we believe humanity is at the heart of health care. Blending both, we move quickly and carefully to get patients the care they need, when they need it.",
              },
              {
                t: "The answers already exist.",
                d: "So many answers are buried in the catalogs of the largest institutions in the world and the smallest. It is our job and our responsibility to bring them to light, so we can all benefit.",
              },
              {
                t: "Scattered data, one unified source.",
                d: "Great technology everywhere also means data is scattered everywhere. This is our opportunity to bring together dozens of different output styles, formats, and distribution methods into one unified source, so we can advance together.",
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

      {/* Mission panel */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div
          className="rounded-2xl border border-primary/20 p-10 md:p-14 reveal"
          data-testid="about-mission-panel"
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
            searching through fragmented databases and cold calls. EdenNX is
            changing that, building the connective tissue between every
            stakeholder in the biotech ecosystem.
          </p>
        </div>
      </section>

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
