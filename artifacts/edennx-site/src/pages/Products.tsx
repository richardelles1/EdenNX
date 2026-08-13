import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { PortalEyebrow } from "@/components/PortalBits";
import { ProductCanvas } from "@/components/ProductCanvas";
import { TTO_COUNT_LABEL, ASSET_COUNT_LABEL } from "@/lib/platformStats";

const ER = "https://edenradar.com";
const EC = "https://edencompliance.com";

// How the four intelligence products connect, as EdenRadar describes the path
// on its own research page. This is a workflow that exists today, not a
// roadmap: each step names the product a user is in when they take it.
const path = [
  { step: "Register your idea", product: "EdenDiscovery", token: "--portal-discovery", desc: "Score a concept before the science starts, and keep a dated record of the work." },
  { step: "Build your project", product: "EdenLab", token: "--portal-lab", desc: "A structured workspace for translational research: hypothesis, grants, and IP in one place." },
  { step: "Get discovered", product: "EdenRadar", token: "--portal-radar", desc: "The asset surfaces to the industry teams searching that indication and modality. No pitch required." },
  { step: "Control the deal", product: "EdenMarket", token: "--portal-market", desc: "List when you are ready. Blind by default, with identity revealed only when you agree." },
];

export default function Products() {
  useScrollReveal();
  useSEO({
    title: "Products | EdenRadar, EdenCompliance and the EdenNX suite",
    description:
      "The five EdenNX products: EdenRadar for biotech BD intelligence across 430+ tech transfer offices, EdenCompliance for vendor quality and audits on a controlled record, plus EdenMarket, EdenLab, and EdenDiscovery.",
  });

  return (
    <div className="pt-16">
      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-24 lg:px-8 lg:pb-16 lg:pt-32">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary reveal">The Product Suite</p>
        <h1
          className="max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-5xl md:leading-[1.08] reveal"
          style={{ transitionDelay: "0.1s" }}
          data-testid="products-headline"
        >
          Five products. Five different jobs.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground reveal" style={{ transitionDelay: "0.2s" }}>
          EdenNX is the parent company. EdenRadar tracks {ASSET_COUNT_LABEL} assets across {TTO_COUNT_LABEL}{" "}
          institutions for the teams doing biotech deals, and EdenCompliance runs vendor quality and audits for
          regulated teams, on a record an inspector can read. EdenMarket, EdenLab, and EdenDiscovery each own a
          different stretch of the road between a discovery and the people waiting on it.
        </p>
      </section>

      {/* The canvas: every product on one surface */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8 lg:pb-32" data-testid="product-canvas">
        <ProductCanvas />
      </section>

      {/* How the intelligence products connect */}
      <section id="how-it-connects" className="scroll-mt-28 border-t border-border bg-foreground/[0.015] py-20 dark:bg-white/[0.015] lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary reveal">How It Connects</p>
            <h2
              className="text-3xl font-bold tracking-tight text-foreground md:text-4xl reveal"
              style={{ transitionDelay: "0.05s" }}
              data-testid="how-it-connects-headline"
            >
              One path, from an idea to a deal.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/75 reveal" style={{ transitionDelay: "0.1s" }}>
              Four of the products are one road, not four tools. A concept registered on day one can end as a licensed
              asset without its author ever writing a pitch.
            </p>
          </div>

          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[15px] hidden h-px bg-border md:block" />
            {path.map((s, i) => (
              <li key={s.step} className="relative reveal" style={{ transitionDelay: `${i * 0.08}s` }} data-testid={`path-step-${i}`}>
                <span
                  className="relative z-10 mb-5 flex h-[31px] w-[31px] items-center justify-center rounded-full font-mono text-[11px] font-semibold tabular-nums text-white ring-4 ring-background"
                  style={{ background: `hsl(var(${s.token}))` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-bold tracking-tight text-foreground">{s.step}</h3>
                <p className="mt-1 text-[12.5px] font-semibold" style={{ color: `hsl(var(${s.token}))` }}>{s.product}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{s.desc}</p>
              </li>
            ))}
          </ol>

          {/* EdenCompliance genuinely sits outside that chain, and saying so is
              more useful than implying five products are one funnel. */}
          <div className="mt-14 rounded-2xl border border-border bg-card p-6 reveal lg:p-8">
            <div className="mb-3">
              <PortalEyebrow name="EdenCompliance" />
            </div>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/80">
              EdenCompliance is deliberately not on that road. It serves quality teams rather than deal teams, and it is
              a separate platform with its own customers, its own pricing, and its own site. What it shares with the
              rest is the company building it and the belief that the record underneath the work matters as much as the
              work.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 lg:px-8">
        <div
          className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl p-10 text-center reveal md:p-16"
          style={{ background: "linear-gradient(135deg, hsl(142 52% 36%) 0%, hsl(158 50% 26%) 100%)" }}
        >
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-white md:text-4xl">Tell us what you are working on.</h2>
          <p className="mx-auto mb-8 max-w-xl text-white/80">
            We will point you at the right product, or build toward the one you need.
          </p>
          <Link
            to="/contact"
            data-testid="products-cta"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-primary shadow-sm transition-opacity hover:opacity-90"
          >
            Get in Touch
          </Link>
          {/* Both platforms, weighted the same. The old CTA sent everyone to
              EdenRadar, which made one of two live products the default. */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold text-white/75">
            <a href={ER} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              edenradar.com →
            </a>
            <a href={EC} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              edencompliance.com →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
