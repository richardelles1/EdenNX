import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "react-router-dom";

const edenPrinciples = [
  {
    letter: "E",
    title: "Earn Trust Daily",
    description:
      "Not just at sign-up. Through rigorous data protection, consistent accountability, and following through on our commitments to researchers and industry leaders alike.",
  },
  {
    letter: "D",
    title: "Dignity in Every Interaction",
    description:
      "Behind every asset and dataset is a person. Respect their work, respect their intellectual property, and assume good intent.",
  },
  {
    letter: "E",
    title: "Elevate, Don't Extract",
    description:
      "Build collaborations that lift both sides: academic rigor and commercial speed, without gatekeeping or hidden agendas.",
  },
  {
    letter: "N",
    title: "Never Bend the Truth",
    description:
      "No cherry-picked data. No inflated asset claims. Integrity over short-term wins, always.",
  },
];

export default function About() {
  useScrollReveal();
  useSEO({
    title: "About - EdenNX",
    description:
      "EdenNX is building the intelligence backbone of modern biotech. Our mission, values, and the EDEN framework that guides everything we do.",
  });

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

      {/* Mission panel */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
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

        <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
          {edenPrinciples.map((item, i) => (
            <div
              key={item.letter + item.title}
              className="grid grid-cols-[auto_1fr] gap-5 md:gap-8 items-start bg-background p-6 md:p-8 reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
              data-testid={`eden-${i}`}
            >
              <span
                className="text-5xl md:text-6xl font-bold leading-none select-none w-12 md:w-16 text-center"
                style={{ color: "hsl(var(--primary) / 0.18)" }}
                aria-hidden="true"
              >
                {item.letter}
              </span>
              <div className="pt-1">
                <h3 className="text-base font-bold text-foreground mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
