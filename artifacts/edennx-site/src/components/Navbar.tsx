import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ProductsMenu } from "@/components/ProductsMenu";
import { PRODUCTS, type Product } from "@/lib/products";

const otherLinks = [
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

// Product entry for the mobile sheet: a tinted card carrying the product's own
// accent, the way the home bento does, so the menu and the page describe the
// suite the same way.
function ProductRow({
  p,
  onNavigate,
  compact = false,
}: {
  p: Product;
  onNavigate: () => void;
  compact?: boolean;
}) {
  const accent = `hsl(var(${p.token}))`;
  const testid = `nav-product-${p.suffix.toLowerCase()}`;

  const heading = (
    <>
      <span
        className="flex flex-shrink-0 items-center justify-center rounded-xl"
        style={{
          background: `hsl(var(${p.token}) / 0.12)`,
          border: `1px solid hsl(var(${p.token}) / 0.18)`,
          height: compact ? 32 : 38,
          width: compact ? 32 : 38,
        }}
      >
        <p.Icon className={compact ? "h-4 w-4" : "h-[18px] w-[18px]"} strokeWidth={2.25} style={{ color: accent }} />
      </span>
      <span className="min-w-0">
        <span className={`block font-bold tracking-tight leading-none ${compact ? "text-[14px]" : "text-[15.5px]"}`}>
          <span className="text-foreground">Eden</span>
          <span style={{ color: accent }}>{p.suffix}</span>
        </span>
        <span className={`mt-1.5 block leading-snug text-foreground/70 ${compact ? "text-[12px]" : "text-[12.5px]"}`}>
          {p.tagline}
        </span>
      </span>
    </>
  );

  const headLink = p.external ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3" onClick={onNavigate} data-testid={testid}>{heading}</a>
  ) : (
    <Link to={p.href} className="flex items-start gap-3" onClick={onNavigate} data-testid={testid}>{heading}</Link>
  );

  const shell = {
    background: `hsl(var(${p.token}) / 0.045)`,
    border: `1px solid hsl(var(${p.token}) / 0.16)`,
  };

  // Full products expose their info pages (how it works / features / pricing /
  // one-pager), linked to each product's own site and opened in a new tab; the
  // app launch sits at the end.
  if (p.links?.length && !compact) {
    return (
      <div className="rounded-xl p-3.5 transition-shadow hover:shadow-md" style={shell}>
        {headLink}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]">
          {p.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className="font-medium text-foreground/65 transition-colors hover:text-primary">{l.label}</a>
          ))}
          {p.launch && (
            <>
              <span className="text-foreground/25" aria-hidden>·</span>
              <a href={p.launch.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className="font-semibold hover:underline" style={{ color: accent }}>{p.launch.label} →</a>
            </>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-xl p-3 transition-shadow hover:shadow-md" style={shell}>
      {headLink}
    </div>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close both menus on navigation.
  useEffect(() => { setMenuOpen(false); setProductsOpen(false); }, [location.pathname, location.hash]);

  // Escape closes the products dropdown.
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setProductsOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  // Hover intent: a small close delay so moving from the trigger to the panel does not dismiss it.
  const openProducts = () => { window.clearTimeout(closeTimer.current); setProductsOpen(true); };
  const scheduleClose = () => { window.clearTimeout(closeTimer.current); closeTimer.current = window.setTimeout(() => setProductsOpen(false), 120); };

  const isProductsRoute = location.pathname === "/products";

  return (
    <>
      <header className="fixed z-50 top-0 left-0 right-0 flex justify-center">
        <div
          className={`w-full transition-[max-width,margin,border-radius,background-color,box-shadow,border-color,padding] duration-500 ease-in-out ${
            scrolled
              ? "rounded-full bg-background/95 backdrop-blur-xl border border-border shadow-xl"
              : "bg-transparent border-transparent"
          }`}
          style={{
            maxWidth: scrolled ? "960px" : "100%",
            marginTop: scrolled ? "16px" : "0",
            marginLeft: scrolled ? "1rem" : "0",
            marginRight: scrolled ? "1rem" : "0",
          }}
        >
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-14 px-6" : "h-16 px-6 lg:px-10"}`}>
            <Link to="/" data-testid="nav-logo" className="flex-shrink-0">
              <Logo
                iconClassName={`w-auto transition-all duration-500 ${scrolled ? "h-8" : "h-10"}`}
                wordmarkClassName={`font-bold tracking-tight transition-all duration-500 ${scrolled ? "text-lg" : "text-xl"}`}
              />
            </Link>

            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {/* Products mega-menu. The trigger is a link, not a toggle: a
                  click goes to the page and hover opens the menu, so the two
                  intentions stop competing for the same gesture.
                  Focus opens it too, and focus leaving the group closes it, so
                  the menu is still reachable without a mouse. */}
              <div
                className="relative"
                onMouseEnter={openProducts}
                onMouseLeave={scheduleClose}
                onFocus={openProducts}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setProductsOpen(false);
                }}
              >
                <Link
                  to="/products"
                  onClick={() => setProductsOpen(false)}
                  aria-expanded={productsOpen}
                  aria-haspopup="true"
                  data-testid="nav-products-trigger"
                  className={`flex items-center gap-1 text-[15px] font-semibold tracking-tight transition-colors hover:text-primary ${isProductsRoute || productsOpen ? "text-primary" : "text-foreground/85"}`}
                >
                  Products
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} />
                </Link>

                {productsOpen && (
                  <div className="absolute left-0 top-full pt-3" data-testid="nav-products-menu">
                    <ProductsMenu onNavigate={() => setProductsOpen(false)} />
                  </div>
                )}
              </div>

              {otherLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  data-testid={`nav-link-${link.label.toLowerCase()}`}
                  className={`text-[15px] font-semibold tracking-tight transition-colors hover:text-primary ${location.pathname === link.href ? "text-primary" : "text-foreground/85"}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/products"
                data-testid="nav-explore-products"
                // Pill at both sizes: the hero's buttons are pills, and a square
                // corner up here that rounds off on scroll read as two designs.
                className={`inline-flex items-center rounded-full bg-primary font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:opacity-90 ${scrolled ? "px-4 py-1.5 text-[14px]" : "px-5 py-2.5 text-[15px]"}`}
              >
                Explore Products
              </Link>
            </div>

            <button
              className="md:hidden p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              data-testid="nav-mobile-toggle"
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1.5 w-5">
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute top-full left-4 right-4 mt-2 max-h-[80vh] overflow-y-auto rounded-2xl bg-background/98 backdrop-blur-md border border-border shadow-lg" data-testid="nav-mobile-menu">
            <div className="px-4 py-4 flex flex-col gap-1">
              {/* One list, matching the desktop menu: each row carries its own
                  status instead of being filed under a roadmap heading. */}
              <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-foreground/40">The suite</p>
              {PRODUCTS.map((p) => <ProductRow key={p.name} p={p} onNavigate={() => setMenuOpen(false)} />)}
              <Link to="/products" className="mt-1 rounded-lg px-2.5 py-2 text-sm font-semibold text-primary" onClick={() => setMenuOpen(false)}>Compare the full suite →</Link>
              <div className="my-1 border-t border-border" />
              {otherLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  data-testid={`nav-mobile-link-${link.label.toLowerCase()}`}
                  className={`rounded-lg px-2.5 py-2 text-base font-semibold transition-colors ${location.pathname === link.href ? "text-primary" : "text-foreground/85"}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/products"
                onClick={() => setMenuOpen(false)}
                data-testid="nav-mobile-explore-products"
                className="mt-1 inline-flex items-center justify-center px-4 py-2.5 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Explore Products
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
