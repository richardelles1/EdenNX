import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";

const LAST_UPDATED = "June 21, 2026";
const CONTACT_EMAIL = "info@edennx.com";

const sections = [
  {
    h: "Information we collect",
    p: [
      "When you submit our contact form, we collect the information you provide: your name, email address, company (optional), the subject you select, and your message. We do not require you to create an account to browse this site.",
      "We do not use advertising or cross-site tracking cookies. Our hosting provider may collect standard, aggregated server logs (such as IP address and browser type) for security and reliability.",
    ],
  },
  {
    h: "How we use it",
    p: [
      "We use the information you submit only to respond to your inquiry and to follow up about the products or partnership you asked about. We do not sell your personal information, and we do not share it except with the service providers below that help us operate the site.",
    ],
  },
  {
    h: "Service providers",
    p: [
      "Contact form submissions are processed by Web3Forms, which delivers them to our team inbox. This site is hosted on Vercel. These providers process data on our behalf under their own terms and security practices.",
    ],
  },
  {
    h: "Data retention",
    p: [
      "We keep contact inquiries for as long as needed to respond and maintain a record of our correspondence, then delete them when they are no longer needed.",
    ],
  },
  {
    h: "Your choices",
    p: [
      `You can ask us to access, correct, or delete the personal information you have shared with us by emailing ${CONTACT_EMAIL}. We will respond within a reasonable timeframe.`,
    ],
  },
  {
    h: "Changes to this policy",
    p: [
      "We may update this policy as our practices evolve. When we do, we will revise the date at the top of this page.",
    ],
  },
];

export default function Privacy() {
  useScrollReveal();
  useSEO({
    title: "Privacy Policy - EdenNX",
    description: "How EdenNX collects, uses, and protects the information you share with us.",
  });

  return (
    <div className="pt-16">
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Legal</p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3" data-testid="privacy-headline">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated {LAST_UPDATED}</p>

        <p className="text-base text-foreground/75 leading-relaxed mb-12">
          EdenNX respects your privacy. This policy explains what we collect through this website,
          how we use it, and the choices you have.
        </p>

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
            Questions about this policy? Email us at{" "}
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
