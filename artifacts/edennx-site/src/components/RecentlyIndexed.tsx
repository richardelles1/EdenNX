import { useEffect, useMemo, useRef, useState } from "react";
import { RECENT_ASSETS, type IndexedAsset } from "@/lib/recentAssets";

// The rotating new-arrivals feed from the EdenRadar landing page, restyled for
// the dark Coverage band on EdenNX. Cards flip on their Y axis one at a time,
// each swap pulling a different institution so the grid never repeats a name.
//
// Data: tries EdenRadar's live new-arrivals endpoint, falls back to the
// committed snapshot in lib/recentAssets. The live call is currently blocked by
// that endpoint's same-origin CORP header, so in practice the snapshot renders;
// the fetch stays so the section goes live the moment the origin is allowed.

const FEED_URL = "https://edenradar.com/api/browse/new-arrivals?window=30d&limit=100";
const SLOTS = 6;
const FLIP_HALF = 300;
const EASE_IN = `transform ${FLIP_HALF}ms cubic-bezier(0.4,0,1,1)`;
const EASE_OUT = `transform ${FLIP_HALF}ms cubic-bezier(0,0,0.2,1)`;

const ACCENT = "hsl(142 65% 58%)";

// The API returns "2026-08-12 18:00:57.299796" rather than an ISO string, which
// only some engines parse. Normalize to UTC ISO before constructing a Date.
function toDate(raw: string): Date {
  if (/[TZ]|[+-]\d{2}:\d{2}$/.test(raw)) return new Date(raw);
  return new Date(raw.replace(" ", "T") + "Z");
}

function relativeTime(raw: string): string {
  const diff = Date.now() - toDate(raw).getTime();
  if (!Number.isFinite(diff)) return "";
  const h = Math.floor(diff / 3600000);
  if (h >= 48) return `${Math.floor(h / 24)}d ago`;
  if (h >= 1) return `${h}h ago`;
  const m = Math.floor(diff / 60000);
  return m <= 1 ? "just now" : `${m}m ago`;
}

const clean = (v: string | null) => (v && v !== "unknown" ? v : null);

// Source values are raw database strings: lowercase, sometimes pipe-delimited
// across several categories ("antibacterial|antiviral|antifungal"). Take the
// first category and cap the length so one verbose row can't outrun its card.
function tidy(v: string | null, max = 46): string | null {
  const first = clean(v)?.split("|")[0]?.trim();
  if (!first) return null;
  return first.length > max ? first.slice(0, max - 1).trimEnd() + "…" : first;
}

// "A pre-clinical peptide for COPD. Inhibits MUC1-C..." — the stage, modality,
// and indication carry the emphasis because those are what a BD reader scans.
function buildNarrative(asset: IndexedAsset): Array<{ text: string; bold: boolean }> {
  const stage = tidy(asset.developmentStage, 24);
  const mod = tidy(asset.modality, 28);
  const ind = tidy(asset.indication);
  const moa = clean(asset.mechanismOfAction);

  const parts: Array<{ text: string; bold: boolean }> = [];
  parts.push({ text: mod && /^[aeiou]/i.test(mod) ? "An " : "A ", bold: false });
  if (stage) parts.push({ text: stage.toLowerCase(), bold: true });
  if (mod) parts.push({ text: (stage ? " " : "") + mod, bold: true });
  if (ind) parts.push({ text: " for ", bold: false }, { text: ind, bold: true });
  parts.push({ text: ".", bold: false });

  if (moa) {
    const trimmed = moa.length > 80 ? moa.slice(0, 77).trimEnd() + "…" : moa;
    parts.push({ text: " " + trimmed.charAt(0).toUpperCase() + trimmed.slice(1), bold: false });
  }
  return parts;
}

// Shuffle, then reorder so no two adjacent entries share an institution.
function shuffleDedupe(raw: IndexedAsset[]): IndexedAsset[] {
  const arr = [...raw];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const result: IndexedAsset[] = [];
  const pool = [...arr];
  while (pool.length > 0) {
    const lastInst = result.at(-1)?.institution ?? null;
    const idx = pool.findIndex((a) => a.institution !== lastInst);
    result.push(...pool.splice(idx === -1 ? 0 : idx, 1));
  }
  return result;
}

function pickUnique(pool: IndexedAsset[], count: number): IndexedAsset[] {
  const result: IndexedAsset[] = [];
  const used = new Set<string>();
  for (const a of pool) {
    if (!used.has(a.institution)) {
      result.push(a);
      used.add(a.institution);
    }
    if (result.length >= count) break;
  }
  for (const a of pool) {
    if (result.length >= count) break;
    if (!result.includes(a)) result.push(a);
  }
  return result;
}

function FeedCard({
  asset,
  slotRef,
}: {
  asset: IndexedAsset;
  slotRef: (el: HTMLDivElement | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const parts = buildNarrative(asset);
  const inst = clean(asset.institution) ?? "Unknown institution";

  return (
    <div ref={slotRef} style={{ perspective: "900px" }}>
      <div
        className="relative flex h-[132px] flex-col overflow-hidden rounded-xl"
        style={{
          border: `1px solid ${hovered ? "hsl(142 65% 58% / 0.34)" : "rgba(255,255,255,0.10)"}`,
          background: "linear-gradient(175deg, hsl(142 65% 48% / 0.07) 0%, rgba(255,255,255,0.035) 55%)",
          boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.35)" : "0 2px 10px rgba(0,0,0,0.18)",
          transition: "border-color 0.25s, box-shadow 0.3s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="flex shrink-0 items-center justify-between px-3.5 py-2.5"
          style={{
            background: "hsl(142 65% 48% / 0.08)",
            borderBottom: "1px solid hsl(142 65% 48% / 0.14)",
          }}
        >
          <span className="truncate pr-3 text-[13.5px] font-semibold leading-tight" style={{ color: ACCENT }}>
            {inst}
          </span>
          <span className="shrink-0 text-[10px] tabular-nums" style={{ color: "rgba(255,255,255,0.42)" }}>
            {relativeTime(asset.firstSeenAt)}
          </span>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden px-3.5 py-2.5">
          <p
            className="line-clamp-4 break-words text-[12.5px] leading-[1.6]"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            {parts.map((p, i) =>
              p.bold ? (
                <strong key={i} style={{ fontWeight: 600, color: "rgba(255,255,255,0.92)" }}>
                  {p.text}
                </strong>
              ) : (
                <span key={i}>{p.text}</span>
              )
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export function RecentlyIndexed() {
  const [pool, setPool] = useState<IndexedAsset[]>(RECENT_ASSETS);

  // Upgrade to live data when the origin is allowed; stay on the snapshot otherwise.
  useEffect(() => {
    let cancelled = false;
    fetch(FEED_URL)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d?.assets?.length) setPool(d.assets as IndexedAsset[]);
      })
      .catch(() => {
        /* CORS or offline: the committed snapshot already covers this. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const all = useMemo(() => shuffleDedupe(pool), [pool]);
  const [visible, setVisible] = useState<IndexedAsset[]>(() => pickUnique(shuffleDedupe(RECENT_ASSETS), SLOTS));

  const slotRefs = useRef<(HTMLDivElement | null)[]>(Array(SLOTS).fill(null));
  const allRef = useRef<IndexedAsset[]>(all);
  const visRef = useRef<IndexedAsset[]>(visible);
  const poolIdx = useRef(0);
  const flipPos = useRef(0);
  const cooldown = useRef<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    allRef.current = all;
  }, [all]);
  useEffect(() => {
    visRef.current = visible;
  }, [visible]);

  useEffect(() => {
    // A card flipping every few seconds is exactly what reduced-motion is for.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const start = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        const pos = flipPos.current++ % SLOTS;
        const slot = slotRefs.current[pos];
        const list = allRef.current;
        if (!slot || !list.length) return;

        const shownInsts = new Set(visRef.current.map((a) => a.institution));
        const shownIds = new Set(visRef.current.map((a) => a.id));
        const excluded = new Set([...shownIds, ...cooldown.current]);

        const find = (pred: (a: IndexedAsset) => boolean) => {
          const from = poolIdx.current;
          for (let i = 0; i < list.length; i++) {
            const c = list[(from + i) % list.length];
            if (pred(c)) {
              poolIdx.current = (from + i + 1) % list.length;
              return c;
            }
          }
          return null;
        };

        const next =
          find((c) => !shownInsts.has(c.institution) && !excluded.has(c.id)) ??
          find((c) => !excluded.has(c.id)) ??
          find((c) => !shownIds.has(c.id)) ??
          list[poolIdx.current++ % list.length];
        if (!next) return;

        const evicted = visRef.current[pos]?.id;
        slot.style.transition = EASE_IN;
        slot.style.transform = "rotateY(90deg)";

        setTimeout(() => {
          if (evicted != null) cooldown.current = [evicted, ...cooldown.current].slice(0, SLOTS * 2);
          setVisible((prev) => {
            const u = [...prev];
            u[pos] = next;
            return u;
          });
          slot.style.transition = "none";
          slot.style.transform = "rotateY(-90deg)";
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              slot.style.transition = EASE_OUT;
              slot.style.transform = "rotateY(0deg)";
            })
          );
        }, FLIP_HALF + 12);
      }, 3200);
    }, 2000);

    return () => {
      clearTimeout(start);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {visible.map((asset, i) => (
        <FeedCard
          key={i}
          asset={asset}
          slotRef={(el) => {
            slotRefs.current[i] = el;
          }}
        />
      ))}
    </div>
  );
}
