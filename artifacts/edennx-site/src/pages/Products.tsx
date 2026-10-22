import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { ROUTE_META } from "@/lib/routeMeta";
import { ShieldCheck } from "lucide-react";
import { ProductsIndex } from "@/components/ProductsIndex";
import { ASSET_COUNT_LABEL } from "@/lib/platformStats";
import { ink } from "@/components/PortalBits";

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
        <h1
          className="max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-5xl md:leading-[1.08] reveal"
          style={{ transitionDelay: "0.1s" }}
          data-testid="products-headline"
        >
          Four products, and three more emerging.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground reveal" style={{ transitionDelay: "0.2s" }}>
          EdenNX is the parent company. EdenRadar tracks {ASSET_COUNT_LABEL} university assets for the teams doing biotech deals. EdenCompliance runs vendor qualification and audits for
          regulated teams, on a record an inspector can read. EdenTrials is a live, global clinical trial
          network: every trial the world is running, and everything attached to it. EdenBR, in Beta, tracks where a batch sits and leaves
          the release decision to people. EdenLab, EdenDiscovery, and EdenMarket are emerging.
        </p>
      </section>

      {/* Every product, one section each, in the home page's language. */}
      <section className="pb-12 lg:pb-16" data-testid="product-canvas">
        <ProductsIndex />
      </section>

      {/* How the intelligence products connect */}
      <section id="how-it-connects" className="scroll-mt-28 border-t border-foreground/12 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <h2
              className="text-3xl font-bold tracking-tight text-foreground md:text-4xl reveal"
              style={{ transitionDelay: "0.05s" }}
              data-testid="how-it-connects-headline"
            >
              How it connects.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/75 reveal" style={{ transitionDelay: "0.1s" }}>
              A path for research teams, from first idea to the right buyer. Register an idea, build the project, be
              found by industry teams, and list when you are ready. Each step stands on its own; together they are one path.
            </p>
          </div>

          {/* Reveal sits on the list, not the tiles: .reveal owns the transition
              property, and putting it on a tile would swallow the tile's own
              hover transition. */}
          <ol className="grid gap-x-8 gap-y-10 reveal md:grid-cols-4">
            {path.map((s, i) => (
              <li
                key={s.step}
                className="border-t-2 pt-5"
                style={{ borderColor: ink(s.token) }}
                data-testid={`path-step-${i}`}
              >
                <span aria-hidden className="font-mono text-[13px] text-foreground/60">{String(i + 1).padStart(2, "0")}</span>
                <div className="relative mt-3">
                  <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: ink(s.token) }}>
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
                  ["Hash-chained", "Every entry chained to the one before it, with an integrity check you can run on demand."],
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
      {/* CTA, as the home page closes: one dark green band at the mission's
          width, the ask on the left and every product's site on the right. */}
      <section className="px-4 pb-20 lg:px-6 lg:pb-28">
        <div className="relative mx-auto max-w-[88rem] overflow-hidden rounded-[28px]" style={{ background: "linear-gradient(120deg, hsl(152 40% 16%) 0%, hsl(146 42% 26%) 100%)" }}>
        <div className="relative mx-auto max-w-7xl px-8 py-16 sm:px-12 lg:px-16 lg:py-24">
          <div className="grid gap-10 reveal lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white md:text-[2.4rem] md:leading-[1.12]">
                Tell us what you are working on.
              </h2>
              <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-white/80">
                We will direct you to the right product, or build toward the one you need.
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
                { name: "EdenTrials", host: "edentrials.com", href: "https://edentrials.com", line: "A live, global clinical trial network." },
                { name: "EdenRadar", host: "edenradar.com", href: ER, line: `Biotech BD intelligence across ${ASSET_COUNT_LABEL} university assets.` },
                { name: "EdenCompliance", host: "edencompliance.com", href: EC, line: "Vendor qualification and audits, on a record an inspector can read." },
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
              {/* Beta: listed with the rest, not linked. */}
              <div className="rounded-xl border border-white/15 bg-white/[0.04] p-5">
                <span className="flex items-center justify-between gap-3">
                  <span className="text-[15.5px] font-bold tracking-tight text-white">EdenBR</span>
                  <span className="font-mono text-[12px] uppercase tracking-wider text-white/70">Beta</span>
                </span>
                <span className="mt-1.5 block text-[13px] leading-relaxed text-white/70">Tracks where a batch sits. The release decision stays with your quality unit.</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
