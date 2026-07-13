import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "react-router-dom";
import { TTO_COUNT_LABEL, ASSET_COUNT_LABEL } from "@/lib/platformStats";

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

      {/* Founding story */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16">
          <div className="reveal">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              Our Story
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Most breakthrough science never leaves the university.
            </h2>
          </div>
          <div className="space-y-5 reveal" style={{ transitionDelay: "0.1s" }}>
            <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
              EdenNX started with a problem both founders kept running into from
              opposite ends of the same industry. Inside research institutions,
              breakthrough science was being discovered faster than it could ever
              be licensed. Inside industry, business development teams were spending
              months and millions hunting for those same assets through cold calls
              and fragmented databases.
            </p>
            <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
              Wafick Mohamed spent his career building quality systems and scaling
              operations across global pharma and emerging biotech. Richard Elles
              spent his deploying strategy and management systems across healthtech,
              consulting, and research teams. One watched the science struggle to
              reach the market. The other watched the market struggle to find the
              science. They were describing the same gap from two sides.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-medium">
              EdenNX is what they built to close it: the connective tissue between
              the people who create breakthrough science and the people who can
              carry it to patients.
            </p>
          </div>
        </div>
      </section>

      {/* Why now */}
      <section className="border-y border-border bg-foreground/[0.015] dark:bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl mb-14 reveal">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              Why Now
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              The moment to build the connective tissue.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {[
              {
                t: "The data finally exists.",
                d: `${TTO_COUNT_LABEL} institutions and ${ASSET_COUNT_LABEL} assets, scattered across hundreds of portals, patents, trials, and papers. The raw material for intelligence was already there. Nobody had assembled it.`,
              },
              {
                t: "AI can finally read it.",
                d: "Modern models can classify, score, and connect assets at a scale and nuance that was out of reach a few years ago. EDEN turns scattered signals into structured intelligence.",
              },
              {
                t: "The market is ready to move faster.",
                d: "Licensing still runs on relationships and guesswork. The teams that see the whole field first will win the next decade of deals.",
              },
            ].map((item, i) => (
              <div key={item.t} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="h-0.5 w-10 bg-primary mb-5" />
                <h3 className="text-lg font-bold text-foreground mb-2">{item.t}</h3>
                <p className="text-sm text-foreground/75 leading-relaxed">{item.d}</p>
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

        <div className="grid sm:grid-cols-2 gap-5">
          {edenPrinciples.map((item, i) => (
            <div
              key={item.letter + item.title}
              className="group rounded-2xl border border-border bg-card p-7 md:p-8 hover:border-primary/30 transition-colors reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
              data-testid={`eden-${i}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <span
                  className="h-12 w-12 flex-shrink-0 rounded-xl bg-primary/10 text-primary text-2xl font-bold flex items-center justify-center"
                  aria-hidden="true"
                >
                  {item.letter}
                </span>
                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed">
                {item.description}
              </p>
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
