import { useEffect, useState } from "react";
import { PRODUCTS, type Product } from "@/lib/products";
import { DETAIL, type Detail } from "@/lib/productDetail";


// One canvas for the whole suite: a rail of all five products on the left, the
// selected product on the right. Nothing stacks and nothing scrolls between
// products, which is what lets all five sit as peers.
//
// Every panel is the identical shape: photograph, six capabilities, access, and
// a link out. No product gets extra room. Depth lives on each product's own
// site, which is where it is written and maintained.

/* --------------------------------- Panel --------------------------------- */

function Panel({ p, d }: { p: Product; d: Detail }) {
  const accent = `hsl(var(${p.token}))`;

  return (
    <div key={p.name} className="panel-swap">
      {/* Every photograph is cropped to the same 3:2, so switching products
          never moves the content below it. */}
      <div className="overflow-hidden rounded-2xl border" style={{ borderColor: `hsl(var(${p.token}) / 0.25)` }}>
        <img
          src={d.photo}
          alt={d.photoAlt}
          /* Not lazy: only the selected photo is mounted, so lazy loading leaves
             an empty frame on the first view of each product. */
          decoding="async"
          className="aspect-[3/2] w-full max-w-full"
          style={{ objectFit: "cover" }}
        />
      </div>

      <h2 className="mt-8 text-3xl font-bold tracking-tight text-foreground md:text-[2.4rem] md:leading-[1.1]">
        {d.title}
      </h2>
      <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-foreground/70">{d.audience}</p>

      {/* Six capabilities, always six. The grid is fixed so it holds its shape
          where a bullet list would stretch and shrink with the copy, which is
          what made the products look unequal before.
          No boxes: the rail beside this is 27px type with no chrome, and a
          bordered card grid underneath fought it. The accent is a rule across
          the head of each column instead of a bullet, so the colour is doing
          structural work rather than sitting there as decoration. */}
      <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {d.features.map((f) => (
          <div
            key={f.label}
            className="feature-tile"
            style={{ ["--tile-accent" as string]: accent }}
          >
            <div aria-hidden className="feature-rule h-[2px] w-full" />
            <p className="feature-label mt-3.5 text-[16px] font-semibold leading-snug tracking-tight text-foreground">
              {f.label}
            </p>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-foreground/80">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
        <a
          href={d.primary.href}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`visit-${p.name.toLowerCase()}`}
          className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[14.5px] font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: accent }}
        >
          {d.primary.label} →
        </a>
        {/* One terms line. It used to carry an access chip beside the price, so
            EdenRadar read "Paid · From $1,999/mo", which says the same thing
            twice and the weaker way round. */}
        <span
          className="rounded-full px-3 py-1 text-[13px] font-semibold"
          style={{ background: `hsl(var(${p.token}) / 0.12)`, color: accent }}
        >
          {d.term}
        </span>
        <span className="text-[13.5px] text-foreground/70">{d.note}</span>
      </div>

      {/* Straight to the pages each product already maintains, as pills rather
          than a row of small grey text. */}
      {p.links?.length ? (
        <div className="mt-8 border-t border-border pt-7">
          <p className="mb-3.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
            On {p.name}.com
          </p>
          <div className="flex flex-wrap gap-2.5">
            {p.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-pill inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[13.5px] font-semibold text-foreground/75"
                style={{
                  ["--pill-accent" as string]: accent,
                  ["--pill-accent-soft" as string]: `hsl(var(${p.token}) / 0.07)`,
                }}
              >
                {l.label}
                <span aria-hidden className="text-[12px] opacity-60">↗</span>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ---------------------------------- Rail --------------------------------- */

export function ProductCanvas() {
  const [selected, setSelected] = useState(PRODUCTS[0].name);
  const product = PRODUCTS.find((p) => p.name === selected) ?? PRODUCTS[0];
  const detail = DETAIL[product.name];

  // Warm every photograph once the canvas mounts. Only the selected one is in
  // the DOM, so without this each first switch shows an empty frame.
  useEffect(() => {
    for (const d of Object.values(DETAIL)) new Image().src = d.photo;
  }, []);

  return (
    <div className="relative grid gap-10 lg:grid-cols-[292px_1fr] lg:gap-14">
      {/* min-w-0 on both columns. A grid item's automatic minimum is its
          content, so without this the rail's wordmarks set a floor wider than a
          phone, the whole grid grows past the viewport, and everything in the
          panel inherits that width. The photograph is just the widest thing in
          there, which is why it was the part visibly spilling off the right. */}
      <div className="relative min-w-0 lg:sticky lg:top-28 lg:self-start">
        {/* Set as the logo lockup at display size rather than an icon, a label
            and a status chip. Unselected products go flat and lose their colour
            entirely; selection is the moment the two-tone wordmark lights up.
            Colour does one job and the type does the rest. */}
        {/* Wraps on small screens rather than scrolling sideways. The five
            wordmarks measure 527px at mobile size against roughly 342px of
            usable width on a 390px phone, so as a horizontal scroller EdenLab
            and EdenDiscovery sat off the edge with nothing to say they were
            there. Two lines shows all five. */}
        <nav
          aria-label="Products"
          className="flex min-w-0 flex-wrap gap-x-4 gap-y-1.5 lg:flex-col lg:flex-nowrap lg:gap-x-0 lg:gap-y-2.5"
          data-testid="product-rail"
        >
          {PRODUCTS.map((p) => {
            const on = p.name === selected;
            const accent = `hsl(var(${p.token}))`;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => setSelected(p.name)}
                aria-current={on}
                data-testid={`rail-${p.suffix.toLowerCase()}`}
                className="flex-shrink-0 py-1 text-left lg:w-full"
                style={{ ["--rail-accent" as string]: accent }}
              >
                {/* Both halves always render, in both states. Swapping markup
                    between selected and unselected would cut the colour
                    transition off before it could play. */}
                <span
                  data-on={on}
                  className="rail-word block whitespace-nowrap text-[14px] font-bold tracking-tight lg:text-[27px] lg:leading-[1.1]"
                >
                  <span className="rail-eden">Eden</span>
                  <span className="rail-suffix">{p.suffix}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="relative min-w-0">
        <Panel p={product} d={detail} />
      </div>
    </div>
  );
}
