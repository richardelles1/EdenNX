import { ArrowUpRight } from "lucide-react";
import { PORTAL_META, ink } from "@/components/PortalBits";
import { INSTAGRAM, LINKEDIN, SOCIAL_POSTS } from "@/lib/socialPosts";

// The social feed: the actual posts, set as our own post cards rather than a
// LinkedIn embed (embeds are slow, track visitors and look like someone else's
// site). Each card is what the post is: who posted, when, its opening words,
// its graphic, and the product it is about, linking out to read it whole.
// Data from socialPosts.ts.

function when(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function LinkedInGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function FieldNotes() {
  return (
    <section className="border-t border-foreground/10" data-testid="field-notes">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">From the field</p>
            <h2 className="mt-4 text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground lg:text-[2.6rem]">
              What we are posting this week.
            </h2>
          </div>
          <div className="flex gap-3">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[14.5px] font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              <LinkedInGlyph /> Follow EdenNX
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-5 py-2.5 text-[14.5px] font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/5">
              Instagram <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* A row of four on desktop; on a phone, a sideways swipe that snaps. */}
        <ol className="-mx-6 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {SOCIAL_POSTS.slice(0, 4).map((post) => {
            const meta = PORTAL_META[post.product];
            const color = meta ? ink(meta.token) : "hsl(var(--primary))";
            return (
              <li key={post.date + post.product} className="w-[82%] flex-shrink-0 snap-start sm:w-[46%] lg:w-auto">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="post-card group flex h-full flex-col overflow-hidden rounded-[18px] border border-foreground/[0.08] bg-white"
                  style={{ ["--accent" as string]: color }}
                >
                  {/* Who and when, as the post shows it. */}
                  <span className="flex items-center gap-3 px-5 pt-5">
                    <img src="/eden-mark.png" alt="" aria-hidden className="h-9 w-9 rounded-full border border-foreground/10 bg-white object-contain p-1" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-semibold leading-tight text-foreground">EdenNX</span>
                      <span className="block text-[12px] text-foreground/60">{when(post.date)} · LinkedIn</span>
                    </span>
                    <span className="text-[#0a66c2]"><LinkedInGlyph /></span>
                  </span>
                  <span className="post-text mt-4 block px-5 text-[14px] leading-[1.55] text-foreground/85">{post.text}</span>
                  <span className="mx-5 mt-4 block overflow-hidden rounded-xl border border-foreground/[0.06]">
                    <img src={post.image} alt={post.imageAlt} loading="lazy" decoding="async" className="post-image aspect-square w-full" style={{ objectFit: "cover", objectPosition: "top" }} />
                  </span>
                  <span className="mt-auto flex items-center justify-between px-5 py-4">
                    <span className="flex items-center gap-1.5 text-[12.5px] font-semibold" style={{ color }}>
                      <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: color }} />
                      {post.product}
                    </span>
                    <span className="flex items-center gap-1 text-[13px] font-semibold text-foreground/70 transition-colors group-hover:text-foreground">
                      Read the post <ArrowUpRight className="cta-arrow h-4 w-4" />
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
