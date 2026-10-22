import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PORTAL_META, ink } from "@/components/PortalBits";
import { MARKS, markStyle } from "@/lib/products";
import { INSTAGRAM, LINKEDIN, SOCIAL_POSTS, type SocialPost } from "@/lib/socialPosts";

// The social feed: the actual posts, set as our own post cards rather than a
// LinkedIn embed (embeds are slow, track visitors and look like someone else's
// site). Three across, and the rest a swipe or an arrow away. Each card wears
// the product it is about where a feed would put the poster: its mark and its
// name, so a visitor meets four products while reading one company's posts.
// Data from socialPosts.ts.

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

function when(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function LinkedInGlyph({ cls = "h-4 w-4" }: { cls?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cls} fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function PostCard({ post }: { post: SocialPost }) {
  const meta = PORTAL_META[post.product];
  const color = meta ? ink(meta.token) : "hsl(var(--primary))";
  const mark = MARKS[post.product];
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="post-card group flex h-full flex-col overflow-hidden rounded-[18px] border border-foreground/[0.08] bg-white"
      style={{ ["--accent" as string]: color }}
    >
      <span className="flex items-center gap-3 px-5 pt-5">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-white">
          {mark ? <img src={mark} alt="" aria-hidden decoding="async" className="object-contain" style={markStyle(post.product, 26)} /> : null}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[14.5px] font-semibold leading-tight text-foreground">
            Eden<span style={{ color }}>{post.product.slice(4)}</span>
          </span>
          <span className="block text-[12px] text-foreground/60">by EdenNX · {when(post.date)}</span>
        </span>
        <span className="text-[#0a66c2]"><LinkedInGlyph /></span>
      </span>
      <span className="post-text mt-4 block px-5 text-[14.5px] leading-[1.55] text-foreground/85">{post.text}</span>
      <span className="mx-5 mt-4 block overflow-hidden rounded-xl border border-foreground/[0.06]">
        <img src={post.image} alt={post.imageAlt} loading="lazy" decoding="async" className="post-image aspect-square w-full" style={{ objectFit: "cover", objectPosition: "top" }} />
      </span>
      <span className="mt-auto flex items-center justify-end px-5 py-4">
        <span className="flex items-center gap-1 text-[13px] font-semibold text-foreground/70 transition-colors group-hover:text-foreground">
          Read the post <ArrowUpRight className="cta-arrow h-4 w-4" />
        </span>
      </span>
    </a>
  );
}

export function FieldNotes() {
  const track = useRef<HTMLOListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [shown, setShown] = useState({ from: 1, to: 3 });
  const total = SOCIAL_POSTS.length;

  // Which cards are in view, for the arrows and the "1-3 of N" count.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const box = el.getBoundingClientRect();
      const visible = ([...el.children] as HTMLElement[])
        .map((c, i) => ({ i, r: c.getBoundingClientRect() }))
        .filter(({ r }) => r.left >= box.left - 4 && r.right <= box.right + 4);
      if (visible.length) setShown({ from: visible[0].i + 1, to: visible[visible.length - 1].i + 1 });
      setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // One card per press, so the move reads as a step rather than a jump.
  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.children[0] as HTMLElement | undefined;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 20;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const arrow = "flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 text-foreground/80 disabled:opacity-30";

  return (
    <section className="border-t border-foreground/10" data-testid="field-notes">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground lg:text-[2.6rem]">
              What we are posting this week.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[14.5px] font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              <LinkedInGlyph /> Follow EdenNX
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-5 py-2.5 text-[14.5px] font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/5">
              Instagram <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Three across on desktop, one and a peek on a phone; the rest scroll in. */}
        <ol
          ref={track}
          aria-label="Recent posts"
          className="no-scrollbar -mx-6 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-2 lg:mx-0 lg:scroll-px-0 lg:px-0"
        >
          {SOCIAL_POSTS.map((post) => (
            <li key={post.date + post.product} className="w-[84%] flex-shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-2.5rem)/3)]">
              <PostCard post={post} />
            </li>
          ))}
        </ol>

        {total > 3 && (
          <div className="mt-8 flex items-center justify-between gap-4">
            {/* Progress: a rule that fills as the reader moves along. */}
            <div className="flex flex-1 items-center gap-4">
              <span className="font-mono text-[12.5px] text-foreground/65">
                {shown.from}–{shown.to} of {total}
              </span>
              <span className="relative h-[2px] max-w-[240px] flex-1 overflow-hidden rounded-full bg-foreground/10">
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-primary"
                  style={{ width: `${(shown.to / total) * 100}%`, transition: `width 0.4s ${EASE}` }}
                />
              </span>
            </div>
            <div className="flex gap-2">
              <button type="button" aria-label="Previous posts" className={arrow} disabled={edge.start} onClick={() => step(-1)}>
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button type="button" aria-label="More posts" className={arrow} disabled={edge.end} onClick={() => step(1)}>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
