import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { ROUTE_META } from "@/lib/routeMeta";
import { ShieldCheck } from "lucide-react";
import { ProductCanvas } from "@/components/ProductCanvas";
import { TTO_COUNT_LABEL, ASSET_COUNT_LABEL } from "@/lib/platformStats";

const ER = "https://edenradar.com";
const EC = "https://edencompliance.com";

// EdenCompliance is forest green plus gold. On a dark panel the gold is the
// half that reads.
const GOLD = "hsl(var(--portal-compliance-gold))";

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
  useSEO(ROUTE_META["/products"]);

  return (
    // overflow-x-clip as a backstop: nothing on this page should ever be able
    // to scroll the body sideways on a phone, whatever a future edit adds.
    <div className="overflow-x-clip pt-16">
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
              A connected path, in service of our mission and our people.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/75 reveal" style={{ transitionDelay: "0.1s" }}>
              Four of the products are one road, not four tools. A concept registered on day one can end as a licensed
              asset without its author ever writing a pitch.
            </p>
          </div>

          {/* Reveal sits on the list, not the tiles: .reveal owns the transition
              property, and putting it on a tile would swallow the tile's own
              hover transition. */}
          <ol className="grid gap-4 reveal md:grid-cols-4">
            {path.map((s, i) => (
              <li
                key={s.step}
                className="glass-tile p-6"
                style={{ ["--glass-accent" as string]: `hsl(var(${s.token}))` }}
                data-testid={`path-step-${i}`}
              >
                <span aria-hidden className="glass-mark">{String(i + 1).padStart(2, "0")}</span>
                <div className="relative">
                  <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em]" style={{ color: `hsl(var(${s.token}))` }}>
                    {s.product}
                  </p>
                  <h3 className="mt-3 text-[17px] font-bold leading-snug tracking-tight text-foreground">{s.step}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-foreground/80">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* EdenCompliance genuinely sits outside that chain, and saying so is
              more useful than implying five products are one funnel.
              Dark, because the panel should carry the weight the product does:
              this is the thing running underneath the work. The ruling is a
              ledger, which is what an append-only record is. */}
          <div
            className="relative mt-14 overflow-hidden rounded-2xl reveal"
            style={{ background: "linear-gradient(120deg, hsl(147 34% 24%) 0%, hsl(152 36% 17%) 100%)" }}
          >
            <div className="grid gap-9 p-7 lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:p-10">
              <div>
                <span className="mb-4 flex items-center gap-2.5">
                  <ShieldCheck className="h-[22px] w-[22px]" strokeWidth={2.25} style={{ color: GOLD }} />
                  <span className="text-lg font-bold tracking-tight">
                    <span className="text-white">Eden</span>
                    <span style={{ color: GOLD }}>Compliance</span>
                  </span>
                </span>
                <p className="text-[15.5px] leading-relaxed text-white/85">
                  EdenCompliance is deliberately not on that road. It serves quality teams rather than deal teams, and
                  it is a separate platform with its own customers, its own pricing, and its own site. What it shares
                  with the rest is the company building it and the belief that the record underneath the work matters
                  as much as the work.
                </p>
              </div>

              {/* The three properties of that record, which are the presence the
                  product brings. Its own three claims, verbatim. */}
              <dl className="grid gap-5 self-center">
                {[
                  ["Append-only", "Entries cannot be edited or deleted, ever."],
                  ["Hash-chained", "Every entry SHA-256 sealed to the one before it."],
                  ["E-signed", "Re-authenticated signatures on each approval and sign-off."],
                ].map(([term, def]) => (
                  <div key={term} className="border-l-2 pl-4" style={{ borderColor: GOLD }}>
                    <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
                      {term}
                    </dt>
                    <dd className="mt-1.5 text-[13.5px] leading-relaxed text-white/75">{def}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* CTA. Centred copy in a wide box left most of it empty, so the two
          platforms move out of a footnote and become the right-hand column,
          which is also where someone who already knows what they want goes. */}
      <section className="relative overflow-hidden bg-foreground/[0.015] dark:bg-white/[0.015]">
        {/* No card. A rounded box directly under the EdenCompliance box was two
            boxes stacked, and its edges sat wider than the content above it
            because a max-width box and a max-width column with padding are not
            the same width. This is a full-bleed band that rises out of the
            section above it, so there is no edge to mismatch.
            The first stop carries the green at zero alpha rather than
            `transparent`, which some engines interpolate through transparent
            black and haze grey on the way down. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(180deg,",
              // Eased rather than linear. A straight two-stop alpha ramp reads
              // as a visible edge, because the eye is far more sensitive to the
              // first few percent of opacity than to the last few. These stops
              // approximate a smoothstep, so the green arrives without a line.
              "hsl(146 46% 38% / 0) 0px,",
              "hsl(146 46% 38% / 0.02) 22px,",
              "hsl(146 46% 38% / 0.08) 44px,",
              "hsl(146 46% 38% / 0.20) 66px,",
              "hsl(146 46% 38% / 0.40) 88px,",
              "hsl(146 46% 38% / 0.62) 108px,",
              "hsl(146 46% 38% / 0.81) 126px,",
              "hsl(146 46% 38% / 0.94) 142px,",
              "hsl(146 46% 38%) 156px,",
              // Fixed lengths, not percentages: the band is far taller when the
              // two columns stack, and a percentage fade would stretch down over
              // the copy on narrow screens.
              "hsl(152 49% 31%) 62%,",
              "hsl(158 52% 23%) 100%)",
            ].join(" "),
          }}
        />
        {/* The same dot grid the home hero uses, so the two greens read as one
            surface rather than two flat gradients. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.10) 1px, transparent 1.5px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(120% 80% at 20% 62%, #000 15%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(120% 80% at 20% 62%, #000 15%, transparent 80%)",
          }}
        />

        {/* Top padding clears the 156px fade, so the copy always lands on solid
            green rather than part way through the transition. */}
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-40 lg:px-8 lg:pb-28 lg:pt-44">
          <div className="grid gap-10 reveal lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white md:text-[2.4rem] md:leading-[1.12]">
                Tell us what you are working on.
              </h2>
              <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-white/80">
                We will point you at the right product, or build toward the one you need.
              </p>
              <Link
                to="/contact"
                data-testid="products-cta"
                className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-[15px] font-semibold text-primary shadow-sm transition-opacity hover:opacity-90"
              >
                Get in Touch
              </Link>
            </div>

            {/* Both platforms, weighted the same. The old CTA sent everyone to
                EdenRadar, which made one of two live products the default. */}
            <div className="grid gap-3">
              {[
                { name: "EdenRadar", host: "edenradar.com", href: ER, line: `Biotech BD intelligence across ${TTO_COUNT_LABEL} tech transfer offices.` },
                { name: "EdenCompliance", host: "edencompliance.com", href: EC, line: "Vendor quality and audits, on a record an inspector can read." },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-white/15 bg-white/[0.07] p-5 transition-colors hover:border-white/35 hover:bg-white/[0.12]"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[15.5px] font-bold tracking-tight text-white">{s.name}</span>
                    <span className="font-mono text-[11px] text-white/55 transition-colors group-hover:text-white/85">
                      {s.host} ↗
                    </span>
                  </span>
                  <span className="mt-1.5 block text-[13px] leading-relaxed text-white/70">{s.line}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
