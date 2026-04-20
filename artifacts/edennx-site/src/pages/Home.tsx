import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BoxGridBackground } from "@/components/BoxGridBackground";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";

const FLIP_DURATION = 400;

const flipWords = [
  "Drug Discovery",
  "Rare Disease Research",
  "Data-Driven Decisions",
  "Early-Stage Research",
  "Biotech Innovation",
  "Collaborative Science",
  "Clinical-Stage Intelligence",
  "Your Pipeline's Future",
];

const marqueeItems = [
  "30,000+ Biotech Assets Indexed",
  "300+ Tech Transfer Offices Monitored",
  "From Concept to Patient",
  "Intelligence for Every Stakeholder",
  "Biotech's Operating System",
  "Science Without Silos",
  "Drug Discovery Intelligence",
  "EdenRadar by EdenNX",
  "30,000+ Biotech Assets Indexed",
  "300+ Tech Transfer Offices Monitored",
  "From Concept to Patient",
  "Intelligence for Every Stakeholder",
  "Biotech's Operating System",
  "Science Without Silos",
  "Drug Discovery Intelligence",
  "EdenRadar by EdenNX",
];

const testimonials = [
  {
    quote:
      "The biotech licensing process has always been fragmented. EdenNX changes that by bringing structure and intelligence to an industry that has operated on relationships and guesswork for decades.",
    name: "Dr. Sarah Chen",
    role: "VP Business Development, Global Pharma",
    initials: "SC",
  },
  {
    quote:
      "We identified three promising clinical-stage assets in our target indication within days. What used to take months of conference attendance and cold calls now happens before morning standup.",
    name: "Marcus Webb",
    role: "Director of Licensing, Mid-Size Biotech",
    initials: "MW",
  },
  {
    quote:
      "EdenNX is exactly what the technology transfer community has needed. Finally, a platform that takes our work seriously and connects us with the right industry partners.",
    name: "Prof. James Okafor",
    role: "Director, University Technology Transfer Office",
    initials: "JO",
  },
];

function TextFlip({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timeoutRef = { t1: 0 as ReturnType<typeof setTimeout>, t2: 0 as ReturnType<typeof setTimeout> };

  useEffect(() => {
    timeoutRef.t1 = setTimeout(function tick() {
      setVisible(false);
      timeoutRef.t2 = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
        timeoutRef.t1 = setTimeout(tick, 3500);
      }, FLIP_DURATION);
    }, 3500);
    return () => {
      clearTimeout(timeoutRef.t1);
      clearTimeout(timeoutRef.t2);
    };
  }, [words]);

  return (
    <span
      className="text-primary whitespace-nowrap"
      style={{
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transition: `opacity ${FLIP_DURATION}ms ease`,
      }}
    >
      {words[index]}
    </span>
  );
}

function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  function goTo(i: number) {
    if (i === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(i);
      setFading(false);
    }, 280);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((p) => (p + 1) % testimonials.length);
        setFading(false);
      }, 280);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[active];

  return (
    <div className="max-w-3xl mx-auto text-center">
      <div
        style={{
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 0.28s ease, transform 0.28s ease",
        }}
      >
        <svg
          className="h-8 w-8 mx-auto mb-6 text-primary-foreground/40"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <p className="text-lg md:text-xl text-primary-foreground leading-relaxed mb-8 font-light">
          {t.quote}
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm font-bold text-primary-foreground">
            {t.initials}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-primary-foreground">{t.name}</p>
            <p className="text-xs text-primary-foreground/60">{t.role}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Testimonial ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active
                ? "w-6 bg-primary-foreground"
                : "w-2 bg-primary-foreground/30 hover:bg-primary-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  useScrollReveal();
  useSEO({
    title: "EdenNX - Biotech Intelligence Infrastructure",
    description:
      "EdenNX is building the intelligence backbone of modern biotech. From earliest discovery to patient impact, our platform suite powers every stage of the lifecycle.",
  });

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[72vh] flex items-center overflow-hidden bg-background">
        <BoxGridBackground />

        {/* Content layer — pointer-events-none lets background grid receive mouse events */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 pointer-events-none">
          <div className="max-w-4xl">

            {/* Primary headline — EdenNX as the anchor */}
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-none tracking-tight mb-5 reveal"
              data-testid="hero-headline"
              style={{ transitionDelay: "0.1s" }}
            >
              <span className="text-primary">Eden</span>NX
            </h1>

            {/*
              "Powering [word]" — fixed-height container reserves exactly one line of space
              so the layout never shifts when the rotating word changes.
              overflow-hidden + whitespace-nowrap on the word prevent any reflow.
            */}
            <div
              className="flex items-baseline gap-3 mb-8 overflow-hidden reveal"
              style={{
                transitionDelay: "0.15s",
                height: "clamp(2rem, 4.5vw, 3.25rem)",
              }}
            >
              <span className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground/65 leading-none flex-shrink-0">
                Powering
              </span>
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold leading-none">
                <TextFlip words={flipWords} />
              </span>
            </div>

            <p
              className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-10 max-w-2xl reveal"
              data-testid="hero-subheadline"
              style={{ transitionDelay: "0.2s" }}
            >
              The intelligence backbone of modern biotech, from earliest research
              hypothesis through commercial licensing.
            </p>

            {/* Re-enable pointer events only on interactive elements */}
            <div
              className="flex flex-wrap gap-4 reveal pointer-events-auto"
              style={{ transitionDelay: "0.3s" }}
            >
              <Link
                to="/products"
                data-testid="hero-cta-products"
                className="inline-flex items-center px-6 py-3 rounded-full text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
              >
                Explore Our Products
              </Link>
              <Link
                to="/team"
                data-testid="hero-cta-team"
                className="inline-flex items-center px-6 py-3 rounded-full text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
              >
                Meet the Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee ticker strip */}
      <section
        className="border-y border-border bg-foreground/[0.02] dark:bg-white/[0.02] py-5 overflow-hidden"
        aria-label="Key facts"
      >
        <div className="marquee-track select-none">
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-4 px-8 text-sm font-medium text-muted-foreground whitespace-nowrap"
            >
              {item}
              <span className="block h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 self-center" />
            </span>
          ))}
        </div>
      </section>

      {/* Mission — light emerald tinted panel */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div
          className="rounded-2xl border border-primary/20 p-10 md:p-14 reveal"
          data-testid="mission-panel"
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

      {/* Testimonials */}
      <section
        className="py-24"
        style={{ background: "hsl(var(--primary))" }}
        data-testid="testimonials-section"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary-foreground/60 text-center mb-4">
            What People Are Saying
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center mb-14">
            Trusted by the biotech community.
          </h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-primary/5 border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground mb-6 reveal"
            data-testid="bottom-cta-headline"
          >
            The intelligence infrastructure biotech has been waiting for.
          </h2>
          <Link
            to="/products"
            data-testid="bottom-cta-products"
            className="inline-flex items-center px-8 py-3.5 rounded-md text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm reveal"
            style={{ transitionDelay: "0.1s" }}
          >
            Explore Our Products
          </Link>
        </div>
      </section>
    </div>
  );
}
