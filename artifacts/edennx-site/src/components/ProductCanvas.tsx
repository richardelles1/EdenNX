import { useState } from "react";
import { Check } from "lucide-react";
import { PRODUCTS, type Product } from "@/lib/products";
import { DETAIL, type Detail, type Stage } from "@/lib/productDetail";

// One canvas for the whole suite: a rail of all five products on the left, the
// selected product on the right. Nothing stacks and nothing scrolls between
// products, which is what lets all five sit as peers instead of a queue with
// two at the front and three trailing behind.
//
// It also removes the machinery the stacked version needed: no scroll-spy, no
// second menu floating under the header, and no rules or colored borders doing
// the work of telling one product from the next. Selection does that.
//
// What each panel shows is decided by what the product has actually published.
// Three have screenshots. Two do not, and those get their facts set as type
// rather than an interface invented to fill the space.

/* -------------------------------- Screen -------------------------------- */

// Screens are contained on the product's own app background rather than cropped
// to fill, so a wide search bar and a portrait vendor portal can share a frame
// without either being sliced.
function Screen({ src, alt, frameBg }: { src: string; alt: string; frameBg?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border" style={{ background: frameBg ?? "hsl(var(--muted))" }}>
      <div key={src} className="preview-fade flex aspect-[16/9] items-center justify-center p-3 lg:p-4">
        <img
          src={src}
          alt={alt}
          /* Not lazy: only the selected screen is mounted, so lazy loading
             leaves an empty frame on first view. */
          decoding="async"
          className="max-h-full max-w-full rounded-md"
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}

/* --------------------------------- Stages -------------------------------- */

function Stages({ stages, token, frameBg }: { stages: Stage[]; token: string; frameBg?: string }) {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  const accent = `hsl(var(${token}))`;

  return (
    <div>
      {/* Horizontal, because the products already own the vertical axis. The
          numbers are real: this is a sequence a user moves through. */}
      <ol className="mb-6 flex flex-wrap gap-x-1 gap-y-2" data-testid="stage-strip">
        {stages.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.label}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={on}
                data-testid={`stage-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={`flex items-baseline gap-2 rounded-lg px-3 py-2 transition-colors ${
                  on ? "bg-foreground/[0.06]" : "hover:bg-foreground/[0.035]"
                }`}
              >
                <span className="font-mono text-[10.5px] tabular-nums" style={{ color: on ? accent : "hsl(var(--foreground) / 0.35)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`text-[13.5px] font-semibold tracking-tight ${on ? "text-foreground" : "text-foreground/60"}`}>
                  {s.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <Screen src={stage.img} alt={stage.alt} frameBg={frameBg} />

      <h3 className="mt-6 text-[19px] font-bold tracking-tight text-foreground">{stage.title}</h3>
      <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-foreground/70">{stage.desc}</p>
      <ul className="mt-5 grid gap-2.5 sm:grid-cols-3">
        {stage.points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-[13px] leading-snug text-foreground/75">
            <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" strokeWidth={3} style={{ color: accent }} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------- Facts --------------------------------- */

// For EdenLab and EdenDiscovery, which have no published screenshot. Setting
// the eleven canvas sections as an index, or the three scoring criteria as
// named columns, says more than a mocked-up window and claims nothing we cannot
// point at.
function FactsPanel({ facts, token }: { facts: NonNullable<Detail["facts"]>; token: string }) {
  const accent = `hsl(var(${token}))`;
  return (
    <div className="rounded-xl border border-border bg-card p-7 lg:p-9">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.18em]" style={{ color: accent }}>
        {facts.eyebrow}
      </p>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-foreground/85">{facts.lead}</p>

      {facts.index && (
        <ol className="mt-8 grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
          {facts.index.map((label, i) => (
            <li key={label} className="flex items-baseline gap-3 border-b border-border py-2.5">
              <span className="font-mono text-[11px] tabular-nums text-foreground/35">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[14.5px] text-foreground/85">{label}</span>
            </li>
          ))}
        </ol>
      )}

      {facts.columns && (
        <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-3">
          {facts.columns.map((c) => (
            <div key={c.label} className="border-t pt-3" style={{ borderColor: accent }}>
              <dt className="text-[15px] font-semibold tracking-tight text-foreground">{c.label}</dt>
              <dd className="mt-1 text-[13.5px] leading-relaxed text-foreground/65">{c.desc}</dd>
            </div>
          ))}
        </dl>
      )}

      {facts.footnote && <p className="mt-7 text-[13px] leading-relaxed text-foreground/55">{facts.footnote}</p>}
    </div>
  );
}

/* --------------------------------- Panel --------------------------------- */

function Panel({ p, d }: { p: Product; d: Detail }) {
  const accent = `hsl(var(${p.token}))`;

  return (
    <div key={p.name} className="preview-fade">
      <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-[2.5rem] md:leading-[1.1]">{d.title}</h2>
      <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-foreground/70">{d.audience}</p>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
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
        {d.secondary && (
          <a
            href={d.secondary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14.5px] font-semibold text-foreground/65 transition-colors hover:text-primary"
          >
            {d.secondary.label}
          </a>
        )}
        {d.access && (
          <span className="rounded-full px-3 py-1 text-[13px] font-semibold" style={{ background: `hsl(var(${p.token}) / 0.12)`, color: accent }}>
            {d.access}
          </span>
        )}
      </div>

      <div className="mt-10">
        {d.stages && <Stages stages={d.stages} token={p.token} frameBg={d.frameBg} />}
        {d.single && <Screen src={d.single.img} alt={d.single.alt} frameBg={d.frameBg} />}
        {d.facts && <FactsPanel facts={d.facts} token={p.token} />}
      </div>

      {d.bullets && (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {d.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-[14px] leading-snug text-foreground/75">
              <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" strokeWidth={3} style={{ color: accent }} />
              {b}
            </li>
          ))}
        </ul>
      )}

      {d.aside && (
        <div className="mt-14 border-t border-border pt-10">
          <h3 className="text-[19px] font-bold tracking-tight text-foreground">{d.aside.heading}</h3>
          <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-foreground/70">{d.aside.lead}</p>
          {d.aside.items && (
            <div className={`mt-7 grid gap-x-10 gap-y-6 ${d.aside.items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
              {d.aside.items.map((item) => (
                <div
                  key={item.label}
                  className={item.own ? "rounded-xl border p-5" : d.aside!.items!.some((x) => x.own) ? "rounded-xl border border-transparent p-5" : ""}
                  style={item.own ? { borderColor: `hsl(var(${p.token}) / 0.4)`, background: `hsl(var(${p.token}) / 0.05)` } : undefined}
                >
                  <p className={`text-[14px] font-semibold ${item.own ? "text-foreground" : "text-foreground/85"}`}>{item.label}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-foreground/65">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {d.pricing && (
        <div className="mt-14 border-t border-border pt-10">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-[19px] font-bold tracking-tight text-foreground">{d.pricing.heading}</h3>
              <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-foreground/65">{d.pricing.note}</p>
            </div>
            <a
              href={d.pricing.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-[13.5px] font-semibold text-primary hover:underline"
            >
              Full pricing on {p.name}.com →
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.pricing.rows.map((row, i) => (
              <div key={row.label} className="rounded-xl border border-border bg-card p-5" data-testid={`pricing-tier-${i}`}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{row.label}</p>
                <p className="mb-2 text-2xl font-bold tracking-tight text-foreground">
                  {row.price}
                  {row.unit && <span className="text-sm font-medium text-foreground/50">{row.unit}</span>}
                </p>
                <p className="text-[13px] leading-relaxed text-foreground/65">{row.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- Rail --------------------------------- */

export function ProductCanvas() {
  const [selected, setSelected] = useState(PRODUCTS[0].name);
  const product = PRODUCTS.find((p) => p.name === selected) ?? PRODUCTS[0];
  const detail = DETAIL[product.name];

  return (
    <div className="grid gap-10 lg:grid-cols-[248px_1fr] lg:gap-14">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <nav aria-label="Products" className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible" data-testid="product-rail">
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
                className={`relative flex flex-shrink-0 items-center gap-2.5 rounded-lg py-2.5 pl-4 pr-3 text-left transition-colors lg:w-full ${
                  on ? "bg-foreground/[0.055]" : "hover:bg-foreground/[0.03]"
                }`}
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full transition-opacity"
                  style={{ background: accent, opacity: on ? 1 : 0 }}
                />
                <p.Icon className="h-[17px] w-[17px] flex-shrink-0" strokeWidth={2.25} style={{ color: accent }} />
                <span className="text-[14.5px] font-semibold tracking-tight">
                  <span className={on ? "text-foreground" : "text-foreground/70"}>Eden</span>
                  <span style={{ color: accent }}>{p.suffix}</span>
                </span>
                <span className="ml-auto hidden text-[10px] font-semibold uppercase tracking-wider text-foreground/40 lg:inline">
                  {p.status}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="min-w-0">
        <Panel p={product} d={detail} />
      </div>
    </div>
  );
}
