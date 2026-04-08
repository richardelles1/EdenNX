import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "@assets/EdenNX_Logo_Text_1775676338906.png";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link to="/" data-testid="nav-logo">
            <img
              src={logoImg}
              alt="EdenNX"
              className="h-9 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://edenradar.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="nav-launch-edenradar"
              className="inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Launch EdenRadar
            </a>
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
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="md:hidden bg-background/98 backdrop-blur-md border-b border-border"
          data-testid="nav-mobile-menu"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-testid={`nav-mobile-link-${link.label.toLowerCase()}`}
                className={`text-base font-medium py-2 transition-colors ${
                  location.pathname === link.href ? "text-primary" : "text-foreground/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://edenradar.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="nav-mobile-launch"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity mt-2"
            >
              Launch EdenRadar
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
