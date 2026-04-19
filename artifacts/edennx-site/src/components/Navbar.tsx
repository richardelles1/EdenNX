import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImgDark from "@assets/EdenNX_Logo_Text_T_1775676326136.png";
import logoImgLight from "@assets/EdenNX_Logo_Text_1775676338906.png";

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
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

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
            maxWidth: scrolled ? "900px" : "100%",
            marginTop: scrolled ? "16px" : "0",
            marginLeft: scrolled ? "1rem" : "0",
            marginRight: scrolled ? "1rem" : "0",
          }}
        >
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled ? "h-14 px-6" : "h-16 px-6 lg:px-10"
            }`}
          >
            <Link to="/" data-testid="nav-logo" className="flex-shrink-0">
              {/* Light mode logo — mix-blend-mode:multiply knocks out the opaque white background */}
              <img
                src={logoImgLight}
                alt="EdenNX"
                className={`w-auto transition-all duration-500 block dark:hidden ${
                  scrolled ? "h-8" : "h-11"
                }`}
                style={{ mixBlendMode: "multiply" }}
              />
              {/* Dark mode logo — already has transparent background */}
              <img
                src={logoImgDark}
                alt="EdenNX"
                className={`w-auto transition-all duration-500 hidden dark:block ${
                  scrolled ? "h-8" : "h-11"
                }`}
              />
            </Link>

            <nav
              className="hidden md:flex items-center gap-8"
              aria-label="Main navigation"
            >
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

            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://edenradar.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="nav-launch-edenradar"
                className={`inline-flex items-center font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 text-sm ${
                  scrolled
                    ? "px-4 py-1.5 rounded-full"
                    : "px-5 py-2 rounded-md"
                }`}
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
            className="absolute top-full left-4 right-4 mt-2 rounded-2xl bg-background/98 backdrop-blur-md border border-border shadow-lg overflow-hidden"
            data-testid="nav-mobile-menu"
          >
            <div className="px-5 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  data-testid={`nav-mobile-link-${link.label.toLowerCase()}`}
                  className={`text-base font-medium py-1.5 transition-colors ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-foreground/70"
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
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity mt-1"
              >
                Launch EdenRadar
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
