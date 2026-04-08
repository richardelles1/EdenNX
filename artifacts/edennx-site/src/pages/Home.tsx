import { Link } from "react-router-dom";
import { RadarBackground } from "@/components/RadarBackground";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";

const stats = [
  { value: "30,000+", label: "Biotech Assets Indexed" },
  { value: "300+", label: "TTO Sources Monitored" },
  { value: "3", label: "Purpose-Built Portals" },
  { value: "2026", label: "Founded" },
];

const products = [
  {
    name: "EdenDiscovery",
    tagline: "Creative concept community.",
    description:
      "For concept creators and early-stage innovators. Submit, date-stamp, and surface early-stage hypotheses before research begins.",
    color: "hsl(38, 92%, 50%)",
    colorDark: "hsl(38, 92%, 55%)",
    borderClass: "border-amber-400",
    bgClass: "bg-amber-50 dark:bg-amber-950/20",
    textClass: "text-amber-600 dark:text-amber-400",
    href: "/products",
  },
  {
    name: "EdenLab",
    tagline: "Project-based research workspace.",
    description:
      "For academic researchers and lab teams. Organize your science, synthesize literature, track grants, and gain visibility with industry partners.",
    color: "hsl(265, 60%, 60%)",
    colorDark: "hsl(265, 60%, 70%)",
    borderClass: "border-violet-400",
    bgClass: "bg-violet-50 dark:bg-violet-950/20",
    textClass: "text-violet-600 dark:text-violet-400",
    href: "/products",
  },
  {
    name: "EdenScout",
    tagline: "Industry intelligence platform.",
    description:
      "For BD teams and licensing executives. A continuously enriched window into every major TTO, with EDEN-compiled dossiers and natural language asset search. Starting at $1,999/month.",
    color: "hsl(142, 65%, 48%)",
    colorDark: "hsl(142, 65%, 55%)",
    borderClass: "border-emerald-400",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/20",
    textClass: "text-emerald-600 dark:text-emerald-400",
    href: "/products",
  },
];

export default function Home() {
  useScrollReveal();
  useSEO({
    title: "EdenNX -- Biotech Intelligence Infrastructure",
    description:
      "EdenNX builds the intelligence infrastructure that accelerates science from university discovery to industry development. Our product suite spans concept formation, structured research, and commercial asset scouting across 300+ technology transfer offices worldwide.",
  });

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative radar-bg min-h-[92vh] flex items-center overflow-hidden">
        <RadarBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-28 lg:py-36">
          <div className="max-w-3xl">
            <p
              className="inline-block text-xs font-semibold tracking-widest uppercase text-primary border border-primary/30 bg-primary/5 px-3 py-1.5 rounded-full mb-8 reveal"
              data-testid="hero-eyebrow"
            >
              Biotech Intelligence Infrastructure
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 reveal"
              data-testid="hero-headline"
              style={{ transitionDelay: "0.1s" }}
            >
              Connecting university science to the industry ready to build it.
            </h1>
            <p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl reveal"
              data-testid="hero-subheadline"
              style={{ transitionDelay: "0.2s" }}
            >
              EdenNX builds the intelligence infrastructure that accelerates
              science from university discovery to industry development. Our
              product suite spans concept formation, structured research, and
              commercial asset scouting across 300+ technology transfer offices
              worldwide.
            </p>
            <div
              className="flex flex-wrap gap-4 reveal"
              style={{ transitionDelay: "0.3s" }}
            >
              <Link
                to="/products"
                data-testid="hero-cta-products"
                className="inline-flex items-center px-6 py-3 rounded-md text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
              >
                Explore Our Products
              </Link>
              <Link
                to="/about"
                data-testid="hero-cta-team"
                className="inline-flex items-center px-6 py-3 rounded-md text-base font-semibold border-2 border-foreground/20 text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                Meet the Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-foreground/[0.02] dark:bg-white/[0.02] border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
                data-testid={`stat-${i}`}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products preview */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 reveal">
            The Product Suite
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground reveal"
            style={{ transitionDelay: "0.1s" }}
          >
            Purpose-built for every stakeholder.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <Link
              key={product.name}
              to={product.href}
              data-testid={`product-card-${product.name.toLowerCase()}`}
              className={`group block rounded-xl border-t-4 ${product.borderClass} ${product.bgClass} bg-card border border-border p-8 hover:shadow-md transition-all duration-300 reveal`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <p className={`text-xs font-semibold tracking-widest uppercase ${product.textClass} mb-3`}>
                {product.name}
              </p>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {product.tagline}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {product.description}
              </p>
              <div className={`mt-6 text-sm font-semibold ${product.textClass} group-hover:underline`}>
                Learn more
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24 lg:pb-32">
        <div
          className="rounded-2xl bg-foreground dark:bg-card dark:border dark:border-border p-10 md:p-14 reveal"
          data-testid="mission-panel"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
            Our Mission
          </p>
          <p className="text-2xl md:text-3xl font-bold text-background dark:text-foreground leading-snug max-w-3xl mb-6">
            Accelerate science to patient impact by eliminating the discovery
            gap between university research and industry development.
          </p>
          <p className="text-base text-background/70 dark:text-muted-foreground leading-relaxed max-w-2xl">
            Every year, thousands of licensable technologies sit quietly inside
            research institutions while industry teams spend months and millions
            searching through fragmented databases and cold calls. We built
            EdenNX to change that.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-primary/5 border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground mb-6 reveal"
            data-testid="bottom-cta-headline"
          >
            Ready to see what we've built?
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
