import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import headshot1 from "@assets/Headshot1_1775676396671.jpg";
import wmPhoto from "@assets/WM_phot_1775790644431.jpg";

const founders = [
  {
    name: "Wafick Mohamed",
    title: "Co-Founder & Chief Executive Officer",
    photo: wmPhoto,
    linkedIn: "https://www.linkedin.com/in/wafick-mohamed-d-sc-m-sc-cqa-chrc-clssbb-pmp-81643b96",
    bio: [
      "Dr. Wafick Mohamed is a biotech executive, entrepreneur, and educator dedicated to advancing science for patient impact. With extensive experience across global pharma and emerging biotech, he specializes in building quality systems, scaling operations, and leading organizations from the ground up.",
      "As Founder and CEO of WKM Consulting Services LLC, Dr. Mohamed has launched and shaped multiple innovative companies. He also serves as a professor of research and entrepreneurship, mentoring the next generation of scientific and business leaders.",
      "He holds a Doctorate in Science, a Master of Science, and certifications including CQA, PMP, and CLSSBB.",
    ],
    quote:
      "We are extremely proud to be part of an industry that is pushing the boundaries of science to enhance patients' lives. We will help our clients identify gaps and generate new ideas and solutions to improve their processes and products.",
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

function TeamCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
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
              className="flex-1 min-w-0 bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors flex flex-col"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-[clamp(200px,40vw,280px)] object-cover object-[center_15%] rounded-xl mb-5"
              />
              <h3 className="text-lg font-bold text-foreground mb-0.5">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{member.title}</p>
              <div className="flex-1 space-y-3 mb-5">
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

export default function Team() {
  useScrollReveal();
  useSEO({
    title: "Team - EdenNX",
    description:
      "Meet the founders behind EdenNX: industry insiders building the intelligence infrastructure that biotech needs.",
  });

  return (
    <div className="pt-16">
      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 reveal">
          The People
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold text-foreground mb-6 reveal"
          style={{ transitionDelay: "0.1s" }}
          data-testid="team-headline"
        >
          Meet the Founders
        </h1>
        <p
          className="text-lg text-muted-foreground max-w-2xl leading-relaxed reveal"
          style={{ transitionDelay: "0.2s" }}
        >
          EdenNX was built by people who have lived the problem. Two industry veterans who
          understand both the science and the business, and decided to fix the infrastructure
          that connects them.
        </p>
      </section>

      {/* Founders carousel */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <TeamCarousel />
      </section>

      {/* Footer teaser — link back to About */}
      <section className="border-t border-border py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-muted-foreground mb-4 text-sm">Want to understand the thinking behind EdenNX?</p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            Read our story and values
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
