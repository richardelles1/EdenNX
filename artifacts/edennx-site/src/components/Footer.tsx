import { Link } from "react-router-dom";
import logoImg from "@assets/EdenNX_Logo_Text_1775676338906.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link to="/">
              <img src={logoImg} alt="EdenNX" className="h-7 w-auto opacity-80" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Accelerating science to patient impact.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-muted-foreground">
            <Link to="/products" className="hover:text-foreground transition-colors" data-testid="footer-products">
              Products
            </Link>
            <Link to="/about" className="hover:text-foreground transition-colors" data-testid="footer-about">
              About
            </Link>
            <Link to="/contact" className="hover:text-foreground transition-colors" data-testid="footer-contact">
              Contact
            </Link>
            <a
              href="https://www.linkedin.com/company/edennx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              data-testid="footer-linkedin"
            >
              LinkedIn
            </a>
            <a
              href="https://edenradar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              data-testid="footer-edenradar"
            >
              EdenRadar.com
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
          2026 EdenNX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
