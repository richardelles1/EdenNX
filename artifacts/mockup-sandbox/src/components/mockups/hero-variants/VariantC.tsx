import { useState, useEffect, useRef } from "react";
import { BoxGridBackground } from "./_shared/BoxGridBackground";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import "./_shared/_group.css";

const ROTATING_WORDS = [
  "Drug Discovery",
  "Rare Disease Research",
  "Data-Driven Decisions",
  "Early-Stage Research",
  "Biotech Innovation",
  "Collaborative Science",
  "Clinical-Stage Intelligence",
  "Your Pipeline's Future"
];

export default function VariantC() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      fadeTimeout.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setIsAnimating(false);
      }, 400);
    }, 3900);

    return () => {
      clearInterval(timer);
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden flex flex-col justify-center">
      <BoxGridBackground />

      <div className="relative z-10 pointer-events-none w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-24 flex-grow flex items-center">
        <div className="grid lg:grid-cols-[40%_60%] w-full h-full min-h-[60vh] gap-12 lg:gap-24 relative">
          
          {/* Vertical Divider for LG+ */}
          <div className="hidden lg:block absolute left-[40%] top-0 bottom-0 w-px bg-border/60 mix-blend-multiply" />

          {/* Left Column: The Anchor */}
          <div className="flex flex-col justify-center h-full pr-0 lg:pr-8">
            <div className="flex flex-col gap-4">
              <img 
                src="/__mockup/images/eden-logo-icon.png" 
                alt="EdenNX" 
                className="h-20 sm:h-24 w-auto object-contain object-left mb-2"
              />
              <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase pl-1">
                Biotech Intelligence
              </p>
            </div>
          </div>

          {/* Right Column: The Dynamic Claim */}
          <div className="flex flex-col justify-center h-full pl-0 lg:pl-12 pt-8 lg:pt-0 border-t lg:border-t-0 border-border/60">
            <div className="space-y-6 lg:space-y-8 max-w-2xl">
              <p className="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase flex items-center gap-4">
                <span className="w-8 h-px bg-muted-foreground/30 block" />
                Powering
              </p>
              
              <div className="h-[3em] sm:h-[2.5em] lg:h-[2.4em] relative flex items-center">
                <h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight absolute inset-0 flex items-center transition-all duration-400 ease-in-out"
                  style={{
                    color: "hsl(152, 72%, 22%)",
                    opacity: isAnimating ? 0 : 1,
                    transform: isAnimating ? "translateY(10px)" : "translateY(0)"
                  }}
                >
                  {ROTATING_WORDS[currentIndex]}
                </h1>
              </div>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                The intelligence backbone powering every stage of the biotech lifecycle.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <span className="pointer-events-auto w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-[hsl(152,72%,22%)] hover:bg-[hsl(152,72%,18%)] text-white border-none rounded-sm shadow-sm h-12 px-8 text-base group"
                  >
                    Request Demo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </span>
                <span className="pointer-events-auto w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    variant="ghost" 
                    className="w-full sm:w-auto text-foreground hover:bg-foreground/5 hover:text-foreground rounded-sm h-12 px-8 text-base group"
                  >
                    Explore Solutions
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 opacity-70" />
                  </Button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
