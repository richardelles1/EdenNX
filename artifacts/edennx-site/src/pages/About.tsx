import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import headshot1 from "@assets/Headshot1_1775676396671.jpg";
import wmPhoto from "@assets/WM_phot_1775790644431.jpg";

const founders = [
  {
    name: "Wafick Mohamed",
    title: "Co-Founder & Chief Executive Officer",
    photo: wmPhoto,
    linkedIn: "https://www.linkedin.com/in/wafickmohamed/",
    bio: [
      "Dr. Wafick Mohamed is a biotech executive, entrepreneur, and educator dedicated to advancing science for patient impact. With extensive experience across global pharma and emerging biotech, he specializes in building quality systems, scaling operations, and leading organizations from the ground up.",
      "As Founder and CEO of WKM Consulting Services LLC, Dr. Mohamed has launched and shaped multiple innovative companies. He also serves as a professor of research and entrepreneurship, mentoring the next generation of scientific and business leaders.",
    ],
    quote:
      "We are extremely proud to be part of an industry that is pushing the boundaries of science to enhance patients' lives. We will help our clients identify gaps and generate new ideas and solutions to improve their processes and products.",
  },
  {
    name: "Richard Elles",
    title: "Co-Founder & Chief Operating Officer",
    photo: headshot1,
    linkedIn: "https://www.linkedin.com/in/richardelles/",
    bio: [
      "Richard Elles is a dynamic healthcare leader with a diverse background in strategy development, corporate leadership, patient advocacy, and process improvement. A dedicated and PMP-certified Project Manager, Rich has deployed extensive management systems across consulting firms, healthtech startups, academic institutions, and research teams.",
      "As the founder of Oriva, Inc., Rich has harnessed the power of cutting-edge technology to redefine philanthropic development. He is a two-time Ironman and leverages his experience in endurance sports to connect with corporate wellness initiatives to power new giving trends. Rich completed his Bachelor's Degree in Business at Drexel University before earning a Master's Degree in Public Administration from Villanova University.",
    ],
    quote:
      "We are thrilled to bring new energy and laser focus to an industry in need of organization as it drives innovation. The opportunity to create in biotech and research spaces is matched only by the promise of what success will unlock for patients and consumers worldwide.",
  },
];

const values = [
  {
    title: "Science First",
    description:
      "Every decision at EdenNX traces back to one question: does this advance the science that helps patients?",
  },
  {
    title: "Built to Scale",
    description:
      "From 300+ tech transfer offices to global research ecosystems, we architect platforms that grow with the industry.",
  },
  {
    title: "People Behind the Science",
    description:
      "We believe the best deals start with relationships. EdenRadar connects the humans behind the discoveries with the teams that can bring them to market.",
  },
  {
    title: "Uncompromising Quality",
    description:
      "Grounded in pharmaceutical-grade operational discipline, our team brings rigorous standards to every layer of the platform.",
  },
];

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.333 6.617c1.326 0 2.598.523 3.536 1.455a4.95 4.95 0 0 1 1.464 3.51v5.794H15v-5.793c0-.44-.176-.86-.488-1.17a1.673 1.673 0 0 0-2.357 0 1.65 1.65 0 0 0-.488 1.17v5.793H8.333v-5.793c0-1.317.527-2.58 1.465-3.511a5.02 5.02 0 0 1 3.535-1.455M5 7.445H1.667v9.932H5zM3.333 4.967C4.253 4.967 5 4.226 5 3.31s-.746-1.655-1.667-1.655A1.66 1.66 0 0 0 1.667 3.31a1.66 1.66 0 0 0 1.666 1.656" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function TeamCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else {
        setVisibleCount(2);
      }
      setStartIndex(0);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, founders.length - visibleCount);
  const visibleMembers = founders.slice(startIndex, startIndex + visibleCount);

  return (
    <div>
      <div className="flex items-start gap-4 md:gap-6">
        <button
          onClick={() => setStartIndex((p) => Math.max(0, p - 1))}
          disabled={startIndex === 0}
          aria-label="Previous"
          className={`mt-28 flex-shrink-0 h-10 w-10 rounded-full border border-border flex items-center justify-center transition-opacity ${
            startIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:border-primary hover:text-primary cursor-pointer"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex gap-5 flex-1 min-w-0">
          {visibleMembers.map((member, i) => (
            <div
              key={startIndex + i}
              className="flex-1 min-w-0 bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-[clamp(200px,40vw,280px)] object-cover object-top rounded-xl mb-5"
              />
              <h3 className="text-lg font-bold text-foreground mb-0.5">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{member.title}</p>
              <div className="space-y-3 mb-5">
                {member.bio.map((para, j) => (
                  <p key={j} className="text-sm text-foreground/75 leading-relaxed">{para}</p>
                ))}
              </div>
              <blockquote className="rounded-xl border border-primary/20 bg-primary/5 p-5 mb-4">
                <p className="text-sm italic text-foreground/80 leading-relaxed">
                  "{member.quote}"
                </p>
              </blockquote>
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </div>
          ))}
        </div>

        <button
          onClick={() => setStartIndex((p) => Math.min(maxIndex, p + 1))}
          disabled={startIndex >= maxIndex}
          aria-label="Next"
          className={`mt-28 flex-shrink-0 h-10 w-10 rounded-full border border-border flex items-center justify-center transition-opacity ${
            startIndex >= maxIndex ? "opacity-30 cursor-not-allowed" : "hover:border-primary hover:text-primary cursor-pointer"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function About() {
  useScrollReveal();
  useSEO({
    title: "About -- EdenNX",
    description:
      "EdenNX is building the intelligence backbone of modern biotech. Meet the founders driving science from earliest discovery to patient impact.",
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
          className="rounded-2xl bg-foreground dark:bg-card dark:border dark:border-border p-10 md:p-14 reveal"
          data-testid="about-mission-panel"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
            Our Mission
          </p>
          <p className="text-2xl md:text-3xl font-bold text-background dark:text-foreground leading-snug max-w-3xl mb-6">
            Accelerate science to patient impact by building the infrastructure
            that biotech needs to discover, develop, and deliver breakthroughs.
          </p>
          <p className="text-base text-background/70 dark:text-muted-foreground leading-relaxed max-w-2xl">
            Thousands of licensable technologies, groundbreaking research
            hypotheses, and critical scientific partnerships remain undiscovered
            each year due to fragmented data and outdated workflows. EdenNX is
            changing that, building the connective tissue between every
            stakeholder in the biotech ecosystem.
          </p>
        </div>
      </section>

      {/* Founders carousel */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <h2
          className="text-3xl md:text-4xl font-bold text-foreground mb-12 reveal"
          data-testid="founders-headline"
        >
          Meet the Founders
        </h2>
        <TeamCarousel />
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
          <div className="grid sm:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
                data-testid={`value-${i}`}
              >
                <h3 className="text-lg font-bold text-foreground mb-2">
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
    </div>
  );
}
