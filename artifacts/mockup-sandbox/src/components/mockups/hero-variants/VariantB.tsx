import { useState, useEffect, useRef } from "react";
import { BoxGridBackground } from "./_shared/BoxGridBackground";
import "./_shared/_group.css";

const WORDS = [
  "Drug Discovery",
  "Rare Disease Research",
  "Data-Driven Decisions",
  "Early-Stage Research",
  "Biotech Innovation",
  "Collaborative Science",
  "Clinical-Stage Intelligence",
  "Your Pipeline's Future",
];

export default function VariantB() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      fadeTimeout.current = setTimeout(() => {
        setIndex((current) => (current + 1) % WORDS.length);
        setFade(true);
      }, 400);
    }, 3900);

    return () => {
      clearInterval(interval);
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground flex items-center overflow-hidden font-sans">
      <BoxGridBackground />

      <div className="relative z-10 pointer-events-none w-full">
        <div className="max-w-7xl mx-auto px-8 py-32 md:py-40 flex flex-col items-start justify-center min-h-screen">
          
          <div className="flex items-center gap-3 mb-6">
            <img 
              src="/__mockup/images/eden-logo-icon.png" 
              alt="EdenNX" 
              className="h-7 w-auto object-contain"
            />
          </div>

          <h1 className="flex flex-col gap-4 mb-8">
            <span className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none text-foreground">
              EdenNX
            </span>
            <span className="text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none flex flex-wrap items-baseline gap-x-4">
              <span className="font-light text-foreground/50">Powering</span>
              <span 
                className={`font-bold transition-opacity duration-400 ease-in-out ${
                  fade ? "opacity-100" : "opacity-0"
                }`}
                style={{ color: "hsl(152, 72%, 22%)" }}
              >
                {WORDS[index]}
              </span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            The intelligence backbone of modern biotech, from earliest research hypothesis through commercial licensing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <span className="pointer-events-auto">
              <button 
                className="px-8 py-4 rounded-full text-white font-medium transition-transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: "hsl(152, 72%, 22%)" }}
              >
                Explore Platform
              </button>
            </span>
            <span className="pointer-events-auto">
              <button 
                className="px-8 py-4 rounded-full text-foreground font-medium border border-border bg-card transition-colors hover:bg-muted active:scale-95"
              >
                Talk to Sales
              </button>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
