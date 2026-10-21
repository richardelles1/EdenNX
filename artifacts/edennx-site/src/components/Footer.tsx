import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";

const columns: { heading: string; links: { label: string; to?: string; href?: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "EdenRadar", to: "/products#edenradar" },
      { label: "EdenCompliance", to: "/products#edencompliance" },
      { label: "EdenMarket", to: "/products#edenmarket" },
      { label: "EdenLab", to: "/products#edenlab" },
      { label: "EdenDiscovery", to: "/products#edendiscovery" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Insights", to: "/insights" },
      { label: "Team", to: "/team" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
    ],
  },
];

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M13.333 6.617c1.326 0 2.598.523 3.536 1.455a4.95 4.95 0 0 1 1.464 3.51v5.794H15v-5.793c0-.44-.176-.86-.488-1.17a1.673 1.673 0 0 0-2.357 0 1.65 1.65 0 0 0-.488 1.17v5.793H8.333v-5.793c0-1.317.527-2.58 1.465-3.511a5.02 5.02 0 0 1 3.535-1.455M5 7.445H1.667v9.932H5zM3.333 4.967C4.253 4.967 5 4.226 5 3.31s-.746-1.655-1.667-1.655A1.66 1.66 0 0 0 1.667 3.31a1.66 1.66 0 0 0 1.666 1.656" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <Logo iconClassName="h-8 w-auto" wordmarkClassName="text-lg font-bold tracking-tight" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4 max-w-xs">
              The intelligence backbone of modern biotech, from earliest research hypothesis through
              commercial licensing and regulated quality.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.linkedin.com/company/edennx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="EdenNX on LinkedIn"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                data-testid="footer-linkedin"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://edenradar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-primary hover:underline"
                data-testid="footer-edenradar"
              >
                Launch EdenRadar
              </a>
              <a
                href="https://edencompliance.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-primary hover:underline"
                data-testid="footer-edencompliance"
              >
                Launch EdenCompliance
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold tracking-widest uppercase text-foreground/50 mb-4">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link
                        to={l.to}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        data-testid={`footer-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EdenNX. All rights reserved.</p>
          <p>Building the connective tissue of biotech.</p>
        </div>
      </div>
    </footer>
  );
}
