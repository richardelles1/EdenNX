import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ink } from "@/components/PortalBits";
import { MARKS, markStyle } from "@/lib/products";
import { PRODUCTS, type Product } from "@/components/ProductShowcase";

// The pieces a product line is built from: its mark, its two-tone name, its
// headline with the accent words in its colour, its way in, and its terms.

// The four products, in the order the home page lists them.
export const FOUR = [PRODUCTS.trials, PRODUCTS.radar, PRODUCTS.compliance, PRODUCTS.br];

export function Mark({ p, size }: { p: Product; size: number }) {
  const [failed, setFailed] = useState(false);
  const src = MARKS[p.name];
  if (!src || failed) return null;
  return (
    <img src={src} alt="" aria-hidden decoding="async" onError={() => setFailed(true)} className="flex-shrink-0 object-contain" style={markStyle(p.name, size)} />
  );
}

export function Name({ p, cls }: { p: Product; cls: string }) {
  return (
    <span className={`font-semibold tracking-tight text-foreground ${cls}`}>
      Eden<span style={{ color: ink(p.token) }}>{p.name.slice(4)}</span>
    </span>
  );
}

export function Headline({ p, cls }: { p: Product; cls: string }) {
  return (
    <h3 className={`text-balance font-bold text-foreground ${cls}`}>
      {p.headline.pre}
      <span style={{ color: ink(p.goldToken ?? p.token) }}>{p.headline.accent}</span>
      {p.headline.post}
    </h3>
  );
}

// The CTA as a text link, not a pill: the card is no longer one big button, so
// the action is the one thing on it that moves.
export function Cta({ p }: { p: Product }) {
  const color = ink(p.goldToken ?? p.token);
  if (p.beta) {
    return <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground/65">In Beta</span>;
  }
  const inner = (
    <>
      {p.cta.label}
      <ArrowUpRight aria-hidden className="cta-arrow h-4 w-4" />
    </>
  );
  const cls = "cta-link inline-flex min-h-[24px] items-center gap-1 py-0.5 text-[15px] font-semibold";
  return p.cta.external ? (
    <a href={p.cta.href} target="_blank" rel="noopener noreferrer" className={cls} style={{ color }}>{inner}</a>
  ) : (
    <Link to={p.cta.href} className={cls} style={{ color }}>{inner}</Link>
  );
}

export function Terms({ p }: { p: Product }) {
  if (!p.note || p.beta) return null;
  return <span className="font-mono text-[13.5px] text-foreground/65">{p.note}</span>;
}
