import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";
import { ROUTE_META } from "@/lib/routeMeta";
import headshot1 from "@assets/Headshot_1776710302062.jfif";
import wmPhoto from "@assets/WM_phot_1775790644431.jpg";

const founders = [
  {
    name: "Wafick Mohamed, D.Sc.",
    title: "Co-Founder & Chief Executive Officer",
    photo: wmPhoto,
    linkedIn: "https://www.linkedin.com/in/wafick-mohamed-d-sc-m-sc-cqa-chrc-clssbb-pmp-81643b96",
    bio: [
      "Dr. Wafick Mohamed is a biotech executive, entrepreneur, and educator dedicated to advancing science for patient impact. With extensive experience across global pharma and emerging biotech, he specializes in building quality systems, scaling operations, and leading organizations from the ground up.",
      "As Founder and CEO of WKM Consulting Services LLC, Dr. Mohamed has launched and shaped multiple innovative companies. He also serves as a professor of research and entrepreneurship, mentoring the next generation of scientific and business leaders.",
      "He holds a Doctorate in Science, a Master of Science, and certifications including CQA, PMP, and CLSSBB.",
    ],
    quote:
      "We're proud to stand with an industry that pushes the boundaries of science to improve patients' lives. Our mission is to lead this transformation by delivering intelligent, scalable solutions that help the life science ecosystem discover more, decide faster, and create impact with clarity and confidence.",
  },
  {
    name: "Richard Elles",
    title: "Co-Founder & Chief Operating Officer",
    photo: headshot1,
    linkedIn: "https://www.linkedin.com/in/richard-elles-pmp",
    bio: [
      "Richard Elles is a dynamic healthcare leader with a diverse background in strategy development, corporate leadership, patient advocacy, and process improvement. A dedicated and PMP-certified Project Manager, Rich has deployed extensive management systems across consulting firms, healthtech startups, academic institutions, and research teams.",
      "As the founder of Oriva, Inc., Rich has harnessed the power of cutting-edge technology to redefine philanthropic development. He is a two-time Ironman and leverages his experience in endurance sports to connect with corporate wellness initiatives to power new giving trends. Rich completed his Bachelor's Degree in Business at Drexel University before earning a Master's Degree in Public Administration from Villanova University.",
    ],
    quote:
      "We are thrilled to bring new energy and laser focus to an industry in need of organization as it drives innovation. The opportunity to create in biotech and research spaces is matched only by the promise of what success will unlock for patients and consumers worldwide.",
  },
];

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.333 6.617c1.326 0 2.598.523 3.536 1.455a4.95 4.95 0 0 1 1.464 3.51v5.794H15v-5.793c0-.44-.176-.86-.488-1.17a1.673 1.673 0 0 0-2.357 0 1.65 1.65 0 0 0-.488 1.17v5.793H8.333v-5.793c0-1.317.527-2.58 1.465-3.511a5.02 5.02 0 0 1 3.535-1.455M5 7.445H1.667v9.932H5zM3.333 4.967C4.253 4.967 5 4.226 5 3.31s-.746-1.655-1.667-1.655A1.66 1.66 0 0 0 1.667 3.31a1.66 1.66 0 0 0 1.666 1.656" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Team() {
  useScrollReveal();
  useSEO(ROUTE_META["/team"]);

  return (
    <div className="pt-16">
      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 reveal">
          The People
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold text-foreground mb-6 reveal"
          style={{ transitionDelay: "0.1s" }}
          data-testid="team-headline"
        >
          Meet the Founders
        </h1>
        <p
          className="text-lg text-muted-foreground max-w-2xl leading-relaxed reveal"
          style={{ transitionDelay: "0.2s" }}
        >
          EdenNX was built by people who have lived the problem. Two industry veterans who
          understand both the science and the business, and decided to fix the infrastructure
          that connects them.
        </p>
      </section>

      {/* Founders — two-up */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {founders.map((member, i) => (
            <article
              key={member.name}
              className="bg-card border border-border rounded-2xl p-7 lg:p-8 flex flex-col hover:border-primary/30 transition-colors reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-5 mb-6">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-24 w-24 rounded-2xl object-cover object-top flex-shrink-0 border border-border"
                />
                <div>
                  <h2 className="text-2xl font-bold text-foreground leading-tight">{member.name}</h2>
                  <p className="text-sm font-semibold text-primary mt-1">{member.title}</p>
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mt-2"
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {member.bio.map((para, j) => (
                  <p key={j} className="text-sm text-foreground/75 leading-relaxed">{para}</p>
                ))}
              </div>

              {/* A hairline and a size change, not a tinted box with a fat left
                  border. The old treatment was the stock pull-quote: four
                  pixels of colour and a wash of the same colour behind it,
                  which announces "this is a quote" twice while making the words
                  harder to read than the body copy above them. Here the type
                  does it. */}
              <blockquote className="mt-auto border-t border-border pt-6">
                <p className="text-[17px] leading-relaxed tracking-tight text-foreground/90">
                  <span aria-hidden className="mr-0.5 font-bold text-primary">&ldquo;</span>
                  {member.quote}
                  <span aria-hidden className="ml-0.5 font-bold text-primary">&rdquo;</span>
                </p>
                <footer className="mt-3 text-[12.5px] font-semibold text-foreground/45">
                  {member.name.split(",")[0]}
                </footer>
              </blockquote>
            </article>
          ))}
        </div>
      </section>

      {/* "Our Story" lived here: four paragraphs of biography that the founder
          cards, their LinkedIn profiles and the About page all already cover.
          Removed for duplication, not because the writing was weak. */}

      {/* "How we work" moved to About, next to the EDEN framework: both are
          statements of principle, and neither is about who the founders are. */}

      {/* Footer teaser — link back to About */}
      <section className="border-t border-border py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-muted-foreground mb-4 text-sm">Want to understand the thinking behind EdenNX?</p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            Read our story and values
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
