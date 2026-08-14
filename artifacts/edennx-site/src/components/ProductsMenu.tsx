import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, type Product } from "@/lib/products";
import { DETAIL } from "@/lib/productDetail";

// The products mega-menu: a quiet list on the left, a preview of the selected
// product on the right. Hovering or focusing a row swaps the preview.
//
// The list is deliberately plain. The previous version gave every product its
// own tinted card, which spent colour on decoration and made five products of
// very different maturity look identical. Here accent colour does one job:
// showing which row is selected. The preview carries the interest.

/* Every product now has a photograph, so the menu shows the same one the
   Products page does. Hovering a row previews exactly what you land on, and
   there is no special case for the products without a screenshot. */
const ALL = PRODUCTS;

function Row({
  p,
  selected,
  onSelect,
  onNavigate,
}: {
  p: Product;
  selected: boolean;
  onSelect: () => void;
  onNavigate: () => void;
}) {
  const accent = `hsl(var(${p.token}))`;
  const inner = (
    <>
      <span
        aria-hidden
        className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full transition-opacity"
        style={{ background: accent, opacity: selected ? 1 : 0 }}
      />
      <p.Icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={2.25} style={{ color: accent }} />
      <span className="text-[14.5px] font-semibold tracking-tight">
        <span className="text-foreground">Eden</span>
        <span style={{ color: accent }}>{p.suffix}</span>
      </span>
    </>
  );

  const cls = `relative flex w-full items-center gap-3 rounded-lg py-2.5 pl-4 pr-3 text-left transition-colors ${
    selected ? "bg-foreground/[0.055]" : "hover:bg-foreground/[0.035]"
  }`;
  const testid = `nav-product-${p.suffix.toLowerCase()}`;

  return p.external ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className={cls} data-testid={testid}
       onMouseEnter={onSelect} onFocus={onSelect} onClick={onNavigate}>{inner}</a>
  ) : (
    <Link to={p.href} className={cls} data-testid={testid}
          onMouseEnter={onSelect} onFocus={onSelect} onClick={onNavigate}>{inner}</Link>
  );
}

function PreviewPanel({ p, onNavigate }: { p: Product; onNavigate: () => void }) {
  const accent = `hsl(var(${p.token}))`;
  const detail = DETAIL[p.name];

  return (
    <div className="flex h-full flex-col">
      <div className="relative h-[214px] overflow-hidden rounded-xl border border-border bg-muted">
        <img
          src={detail.photo}
          alt=""
          aria-hidden
          /* Not lazy: only the selected preview is mounted, so lazy just leaves
             the panel empty on the first hover of each product. */
          decoding="async"
          className="h-full w-full"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      <p className="mt-4 text-[14px] leading-relaxed text-foreground/75">{p.tagline}</p>

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 text-[12.5px]">
        {p.links?.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate}
             className="font-medium text-foreground/65 transition-colors hover:text-primary">{l.label}</a>
        ))}
        {p.launch && (
          <a href={p.launch.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate}
             className="font-semibold hover:underline" style={{ color: accent }}>{p.launch.label} →</a>
        )}
        {!p.links?.length && !p.launch && (
          <Link to={p.href} onClick={onNavigate} className="font-semibold hover:underline" style={{ color: accent }}>
            Learn more →
          </Link>
        )}
      </div>
    </div>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 pb-1.5 pt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/40">
      {children}
    </p>
  );
}

export function ProductsMenu({ onNavigate }: { onNavigate: () => void }) {
  const [selectedName, setSelectedName] = useState(ALL[0].name);
  const selected = ALL.find((p) => p.name === selectedName) ?? ALL[0];

  // Warm every preview as soon as the menu opens. Only the selected one is
  // mounted, so without this the first hover of each product shows an empty
  // panel while its image fetches. The cost lands on opening the menu, not on
  // page load, since this component only mounts when the menu is open.
  useEffect(() => {
    for (const d of Object.values(DETAIL)) new Image().src = d.photo;
  }, []);

  return (
    <div className="w-[860px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
      <div className="grid grid-cols-[300px_1fr]">
        {/* One list. Splitting it into "Platforms" and "Emerging" sorted the
            suite into a queue with two at the front and three trailing, which
            is a roadmap rather than a description. Each row carries its own
            status, which is the current state without the narrative. */}
        <div className="border-r border-border py-3">
          <GroupLabel>The suite</GroupLabel>
          <div className="flex flex-col px-1.5">
            {ALL.map((p) => (
              <Row key={p.name} p={p} selected={p.name === selectedName}
                   onSelect={() => setSelectedName(p.name)} onNavigate={onNavigate} />
            ))}
          </div>
        </div>

        {/* Keyed on the product so switching rows re-mounts and replays the
            fade. A hard cut was the one thing left that read as unfinished. */}
        <div className="p-5">
          <div key={selected.name} className="preview-fade h-full">
            <PreviewPanel p={selected} onNavigate={onNavigate} />
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-foreground/[0.02] px-5 py-3">
        <Link to="/products" onClick={onNavigate} data-testid="nav-products-all"
              className="flex items-center justify-between text-[13.5px] font-semibold text-primary hover:underline">
          Compare the full suite
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
