import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "react-router-dom";

const values = [
  {
    title: "Integrity First",
    description:
      "We protect your IP, honor your data, and never compromise on truth—even when it's inconvenient.",
  },
  {
    title: "Collaboration Over Ego",
    description:
      "Great science and smart deals happen when trust, respect, and openness lead.",
  },
  {
    title: "Speed with Substance",
    description:
      "Move fast, but never at the expense of rigor or honesty.",
  },
  {
    title: "Human-Centric Always",
    description:
      "Behind every asset and dataset are real people. We build for their success, safety, and dignity.",
  },
  {
    title: "Transparency as Default",
    description:
      "No hidden agendas. Clear rules. Fair credit for every contribution.",
  },
];

const edenPrinciples = [
  {
    letter: "E",
    title: "Earn Trust Daily",
    description:
      "Not just at sign-up. Through data protection, honest failures, and keeping promises to researchers and industry leaders alike.",
  },
  {
    letter: "D",
    title: "Dignity in Every Interaction",
    description:
      "Behind every asset and dataset is a person. Respect their work, protect their IP, and assume good intent.",
  },
  {
    letter: "E",
    title: "Elevate, Don't Extract",
    description:
      "Build collaborations that lift both sides—academic rigor and commercial speed—without gatekeeping or hidden agendas.",
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

        <div className="grid md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {edenPrinciples.map((item, i) => (
            <div
              key={item.letter + item.title}
              className="bg-background p-8 md:p-10 flex gap-6 items-start reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
              data-testid={`eden-${i}`}
            >
              <span
                className="flex-shrink-0 text-6xl md:text-7xl font-bold leading-none select-none"
                style={{ color: "hsl(152 72% 22% / 0.18)" }}
                aria-hidden="true"
              >
                {item.letter}
              </span>
              <div className="pt-1">
                <h3 className="text-base font-bold text-foreground mb-2">
                  {item.letter} – {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-foreground/[0.02] dark:bg-white/[0.02] border-y border-border py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-14 reveal"
            data-testid="values-headline"
          >
            What we stand for.
          </h2>

          {/* 3-col top row + 2-col bottom row — avoids single orphaned card */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {values.slice(0, 3).map((value, i) => (
              <div
                key={value.title}
                className="border-l-2 border-primary/30 pl-5 reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
                data-testid={`value-${i}`}
              >
                <h3 className="text-base font-bold text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-6 lg:w-2/3">
            {values.slice(3).map((value, i) => (
              <div
                key={value.title}
                className="border-l-2 border-primary/30 pl-5 reveal"
                style={{ transitionDelay: `${(i + 3) * 0.08}s` }}
                data-testid={`value-${i + 3}`}
              >
                <h3 className="text-base font-bold text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
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
