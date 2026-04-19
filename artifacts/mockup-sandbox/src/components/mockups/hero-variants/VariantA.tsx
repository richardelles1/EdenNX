import { useState, useEffect } from "react";
import { BoxGridBackground } from "./_shared/BoxGridBackground";
import "./_shared/_group.css";

const ROTATING_WORDS = [
  "Drug Discovery",
  "Rare Disease Research",
  "Data-Driven Decisions",
  "Early-Stage Research",
  "Biotech Innovation",
  "Collaborative Science",
  "Clinical-Stage Intelligence",
  "Your Pipeline's Future",
];

export function VariantA() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setFade(true);
      }, 400); // fade out duration
    }, 3500); // hold duration

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-slate-50 overflow-hidden flex flex-col items-center justify-center">
      <BoxGridBackground />

      <div className="relative z-10 pointer-events-none flex flex-col items-center justify-center w-full px-6 text-center mt-[-5vh]">
        
        {/* Logo */}
        <div className="mb-12">
          <img 
            src="/__mockup/images/eden-logo-text.png" 
            alt="EdenNX Logo" 
            className="h-20 md:h-24 w-auto"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-slate-200 mb-10"></div>

        {/* Label */}
        <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase mb-4">
          Powering
        </p>

        {/* Rotator */}
        <div className="h-16 md:h-20 mb-12 flex items-center justify-center">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[hsl(152,72%,22%)] transition-opacity duration-400 ease-in-out ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            {ROTATING_WORDS[currentIndex]}
          </h2>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="pointer-events-auto">
            <button className="px-8 py-3 rounded-full bg-[hsl(152,72%,22%)] text-white font-medium hover:bg-[hsl(152,72%,18%)] transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(152,72%,22%)] focus:ring-offset-2">
              Explore Our Products
            </button>
          </span>
          <span className="pointer-events-auto">
            <button className="px-8 py-3 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2">
              Meet the Team
            </button>
          </span>
        </div>

      </div>
    </section>
  );
}
