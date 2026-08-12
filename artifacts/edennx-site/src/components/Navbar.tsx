import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Logo } from "@/components/Logo";
import { PLATFORM_PRODUCTS, EMERGING_PRODUCTS, type Product } from "@/lib/products";

const otherLinks = [
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

// Status pill: "New" and "Live" carry the product accent (available now); the rest
// read as quiet, in-development labels.
function StatusPill({ status, accent }: { status: string; accent: string }) {
  const lit = status === "New" || status === "Live";
  return (
    <span
      className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
      style={lit ? { background: `${accent.replace(")", " / 0.12)")}`, color: accent } : undefined}
    >
      <span className={lit ? "" : "text-foreground/45"}>{status}</span>
    </span>
  );
}

function ProductRow({ p, onNavigate }: { p: Product; onNavigate: () => void }) {
  const accent = `hsl(var(${p.token}))`;
  const heading = (
    <>
      <span
        className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
        style={{ background: `hsl(var(${p.token}) / 0.1)` }}
      >
        <p.Icon className="h-5 w-5" strokeWidth={2.25} style={{ color: accent }} />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-tight leading-none">
            <span className="text-foreground">Eden</span>
            <span style={{ color: accent }}>{p.suffix}</span>
          </span>
          <StatusPill status={p.status} accent={p.goldToken ? `hsl(var(${p.goldToken}))` : accent} />
        </span>
        <span className="mt-1 block text-xs leading-snug text-foreground/60">{p.tagline}</span>
      </span>
    </>
  );
  const testid = `nav-product-${p.suffix.toLowerCase()}`;
  const headLink = p.external ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3" onClick={onNavigate} data-testid={testid}>{heading}</a>
  ) : (
    <Link to={p.href} className="flex items-start gap-3" onClick={onNavigate} data-testid={testid}>{heading}</Link>
  );

  // Full products expose their info pages (how it works / features / pricing / one-pager),
  // linked to each product's own site and opened in a new tab; the app launch sits at the end.
  if (p.links?.length) {
    return (
      <div className="rounded-lg p-2.5 transition-colors hover:bg-muted/60">
        {headLink}
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 pl-12 text-xs">
          {p.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className="text-foreground/55 transition-colors hover:text-primary">{l.label}</a>
          ))}
          {p.launch && (
            <>
              <span className="text-foreground/20" aria-hidden>·</span>
              <a href={p.launch.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className="font-semibold hover:underline" style={{ color: accent }}>{p.launch.label} →</a>
            </>
          )}
        </div>
      </div>
    );
  }
  return <div className="rounded-lg p-2.5 transition-colors hover:bg-muted">{headLink}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="px-2.5 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wider text-foreground/40">{children}</p>;
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
              {/* Products mega-menu */}
              <div className="relative" onMouseEnter={openProducts} onMouseLeave={scheduleClose}>
                <button
                  type="button"
                  onClick={() => setProductsOpen((v) => !v)}
                  aria-expanded={productsOpen}
                  aria-haspopup="true"
                  data-testid="nav-products-trigger"
                  className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${isProductsRoute || productsOpen ? "text-primary" : "text-foreground/70"}`}
                >
                  Products
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} />
                </button>

                {productsOpen && (
                  <div className="absolute left-0 top-full pt-3" data-testid="nav-products-menu">
                    <div className="w-[560px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-background/98 backdrop-blur-xl shadow-xl p-3">
                      <SectionLabel>Platforms</SectionLabel>
                      <div className="flex flex-col">
                        {PLATFORM_PRODUCTS.map((p) => <ProductRow key={p.name} p={p} onNavigate={() => setProductsOpen(false)} />)}
                      </div>
                      <div className="my-2 border-t border-border" />
                      <SectionLabel>Emerging</SectionLabel>
                      <div className="flex flex-col">
                        {EMERGING_PRODUCTS.map((p) => <ProductRow key={p.name} p={p} onNavigate={() => setProductsOpen(false)} />)}
                      </div>
                      <div className="mt-2 border-t border-border pt-2">
                        <Link to="/products" onClick={() => setProductsOpen(false)} className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-muted" data-testid="nav-products-all">
                          Compare the full suite
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {otherLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  data-testid={`nav-link-${link.label.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.href ? "text-primary" : "text-foreground/70"}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/products"
                data-testid="nav-explore-products"
                className={`inline-flex items-center font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 text-sm ${scrolled ? "px-4 py-1.5 rounded-full" : "px-5 py-2 rounded-md"}`}
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
              <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-foreground/40">Platforms</p>
              {PLATFORM_PRODUCTS.map((p) => <ProductRow key={p.name} p={p} onNavigate={() => setMenuOpen(false)} />)}
              <p className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-foreground/40">Emerging</p>
              {EMERGING_PRODUCTS.map((p) => <ProductRow key={p.name} p={p} onNavigate={() => setMenuOpen(false)} />)}
              <Link to="/products" className="mt-1 rounded-lg px-2.5 py-2 text-sm font-semibold text-primary" onClick={() => setMenuOpen(false)}>Compare the full suite →</Link>
              <div className="my-1 border-t border-border" />
              {otherLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  data-testid={`nav-mobile-link-${link.label.toLowerCase()}`}
                  className={`rounded-lg px-2.5 py-2 text-base font-medium transition-colors ${location.pathname === link.href ? "text-primary" : "text-foreground/70"}`}
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
