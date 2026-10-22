import { ink } from "@/components/PortalBits";
import { PRODUCTS, FRAMES, SHOT_GROUND, type Product } from "@/components/ProductShowcase";
import { Cta, Headline, Name, Terms } from "@/components/ProductBits";
import { FULL } from "@/components/ShowcaseFeatures";
import { DETAIL } from "@/lib/productDetail";

// The Products page suite, in the home page's language: no tinted cards, no
// boxed tiles, no icon squares. Each flagship is a section of its own on a
// hairline: its full logo, headline, line and way in beside the product's own
// screen (or its photograph where it has no screen yet), then every capability
// as a ruled list. The emerging three follow as one row. Same content as the
// cards this replaces; nothing dropped.

const FLAGSHIPS = [PRODUCTS.trials, PRODUCTS.radar, PRODUCTS.compliance, PRODUCTS.br];
const EMERGING = [PRODUCTS.market, PRODUCTS.lab, PRODUCTS.discovery];

function Visual({ p }: { p: Product }) {
  const shot = FRAMES[p.name]?.find((f): f is { img: string } => "img" in f)?.img;
  const d = DETAIL[p.name];
  if (shot) {
    return (
      <div className="overflow-hidden rounded-2xl border border-foreground/[0.08] shadow-[0_2px_4px_rgba(15,26,20,0.04),0_40px_80px_-40px_rgba(15,26,20,0.35)]" style={{ background: SHOT_GROUND[p.name] ?? "#eef2f0" }}>
        <img src={shot} alt={`${p.name} screen`} loading="lazy" decoding="async" className="aspect-[4/3] w-full p-3" style={{ objectFit: "contain" }} />
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-foreground/[0.08]">
      <img src={d.photo} alt={d.photoAlt ?? ""} loading="lazy" decoding="async" className="aspect-[4/3] w-full" style={{ objectFit: "cover", objectPosition: d.photoPosition }} />
    </div>
  );
}

function Flagship({ p }: { p: Product }) {
  const logo = FULL[p.name];
  const color = ink(p.goldToken ?? p.token);
  return (
    <section id={p.name.toLowerCase()} className="reveal scroll-mt-28 border-t border-foreground/12 py-16 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          {logo && <img src={logo.src} alt={p.name} decoding="async" style={{ height: 88, width: "auto" }} />}
          <Headline p={p} cls="mt-8 max-w-[18ch] text-[2rem] leading-[1.06] tracking-[-0.03em] lg:text-[2.6rem]" />
          <p className="mt-5 max-w-[44ch] text-[17px] leading-[1.6] text-foreground/75">{p.sub}</p>
          <div className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2">
            {p.beta ? <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground/65">In Beta</span> : <Cta p={p} />}
            <Terms p={p} />
          </div>
        </div>
        <div className="lg:col-span-7">
          <Visual p={p} />
        </div>
      </div>
      <dl className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
        {(p.capabilities ?? []).map((c) => (
          <div key={c.label} className="border-t py-4" style={{ borderColor: `color-mix(in srgb, ${color} 35%, transparent)` }}>
            <dt className="text-[15px] font-semibold leading-snug text-foreground">{c.label}</dt>
            <dd className="mt-1 text-[14px] leading-relaxed text-foreground/70">{c.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function ProductsIndex() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8" data-testid="products-index">
      {FLAGSHIPS.map((p) => (
        <Flagship key={p.name} p={p} />
      ))}
      <section className="reveal border-t border-foreground/12 py-16 lg:py-24" aria-labelledby="emerging">
        <h2 id="emerging" className="text-[1.6rem] font-bold tracking-[-0.02em] text-foreground lg:text-[2rem]">Emerging</h2>
        <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-10">
          {EMERGING.map((p) => (
            <div key={p.name} id={p.name.toLowerCase()} className="scroll-mt-28 border-t border-foreground/10 pt-6">
              <Name p={p} cls="text-[18px]" />
              <Headline p={p} cls="mt-4 text-[1.35rem] leading-[1.15] tracking-[-0.02em]" />
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/75">{p.sub}</p>
              <ul className="mt-5 space-y-2 text-[14px] text-foreground/75">
                {(p.features ?? []).map((f) => (
                  <li key={f} className="flex items-baseline gap-3">
                    <span aria-hidden className="h-px w-3 flex-shrink-0 translate-y-[-4px]" style={{ background: ink(p.token) }} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <Cta p={p} />
                <Terms p={p} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
