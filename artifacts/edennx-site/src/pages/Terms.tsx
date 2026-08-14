import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { ROUTE_META } from "@/lib/routeMeta";

const LAST_UPDATED = "June 21, 2026";
const CONTACT_EMAIL = "info@edennx.com";

const sections = [
  {
    h: "Acceptance",
    p: [
      "By accessing this website, you agree to these terms. If you do not agree, please do not use the site.",
    ],
  },
  {
    h: "Use of the site",
    p: [
      "This site is provided for informational purposes about EdenNX and its products. You agree to use it lawfully and not to attempt to disrupt, reverse engineer, or gain unauthorized access to it.",
    ],
  },
  {
    h: "Intellectual property",
    p: [
      "The EdenNX name, logo, product names, copy, and design are the property of EdenNX. You may not reproduce or reuse them without permission, except for ordinary fair use such as linking to the site.",
    ],
  },
  {
    h: "Products and external links",
    p: [
      "Our products, including EdenRadar, are governed by their own terms presented at the point of access. This site may link to external sites, including edenradar.com, which have their own terms and policies that we do not control.",
    ],
  },
  {
    h: "No warranties",
    p: [
      "This site is provided on an as-is basis. While we work to keep information accurate and current, we make no warranties about its completeness or fitness for a particular purpose.",
    ],
  },
  {
    h: "Limitation of liability",
    p: [
      "To the extent permitted by law, EdenNX is not liable for any indirect or consequential damages arising from your use of this site.",
    ],
  },
  {
    h: "Changes",
    p: [
      "We may update these terms from time to time. Continued use of the site after changes means you accept the updated terms.",
    ],
  },
];

export default function Terms() {
  useScrollReveal();
  useSEO(ROUTE_META["/terms"]);

  return (
    <div className="pt-16">
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Legal</p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3" data-testid="terms-headline">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated {LAST_UPDATED}</p>

        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-xl font-bold text-foreground mb-3">{s.h}</h2>
              {s.p.map((para, i) => (
                <p key={i} className="text-base text-foreground/75 leading-relaxed mb-3">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-base text-foreground/75 leading-relaxed">
            Questions about these terms? Email us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
