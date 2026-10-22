import { ArrowUpRight } from "lucide-react";
import { PORTAL_META } from "@/components/PortalBits";
import { INSTAGRAM, LINKEDIN, SOCIAL_POSTS } from "@/lib/socialPosts";

// The social feed, as field notes rather than a LinkedIn widget: a dark band
// where each recent post is a dated card, stamped with the product it is about,
// laid out a little off-square like notes pinned to a board. Hover squares a
// card up and lifts it. No embed: embeds are slow, track visitors and look like
// someone else's site. Data from socialPosts.ts.

const TILT = [-1.2, 0.8, -0.6, 1.1];

function stamp(date: string) {
  const d = new Date(`${date}T12:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();
}

export function FieldNotes() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0f2219" }} data-testid="field-notes">
      {/* Faint grid, the same ground as the hero, here in light on dark. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.07) 1px, transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8fd3a8]">From the field</p>
            <h2 className="mt-4 font-display text-[2.4rem] italic leading-[1.05] text-white lg:text-[3.4rem]">
              What we are seeing this week.
            </h2>
          </div>
          <div className="flex gap-3">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[14.5px] font-semibold text-[#0f2219] transition-opacity hover:opacity-90">
              Follow on LinkedIn <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-5 py-2.5 text-[14.5px] font-semibold text-white transition-colors hover:border-white/70">
              Instagram <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* A row on desktop; on a phone, a sideways swipe with each card snapping. */}
        <ol className="-mx-6 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {SOCIAL_POSTS.slice(0, 4).map((post, i) => {
            const meta = PORTAL_META[post.product];
            const color = meta ? `hsl(var(${meta.token}))` : "#8fd3a8";
            return (
              <li key={post.date + post.title} className="w-[78%] flex-shrink-0 snap-start sm:w-[46%] lg:w-auto">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="field-note group flex h-full min-h-[260px] flex-col rounded-[18px] bg-[#f6f3ea] p-6 text-[#13201a]"
                  style={{ ["--tilt" as string]: `${TILT[i % TILT.length]}deg` }}
                >
                  <span className="flex items-center justify-between font-mono text-[12px] tracking-[0.12em] text-[#13201a]/60">
                    <span>{stamp(post.date)}</span>
                    <span className="flex items-center gap-1.5">
                      <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: color }} />
                      {post.product}
                    </span>
                  </span>
                  <span className="mt-6 block font-display text-[1.7rem] leading-[1.1]">{post.title}</span>
                  {post.line && <span className="mt-3 block text-[14.5px] leading-relaxed text-[#13201a]/70">{post.line}</span>}
                  <span className="mt-auto flex items-center gap-1 pt-8 text-[13.5px] font-semibold text-[#13201a]/70 transition-colors group-hover:text-[#13201a]">
                    Read on LinkedIn <ArrowUpRight className="cta-arrow h-4 w-4" />
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
