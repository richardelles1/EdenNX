import { FlaskConical, Lightbulb, Check, type LucideIcon } from "lucide-react";

// Product surfaces for EdenLab and EdenDiscovery, which have no app screenshot:
// Lab's only capture is a marketing page, and Discovery has no public product to
// shoot.
//
// The layout and every value here are taken from how each product presents
// itself on edenradar.com/research, which is their canonical surface: the
// eleven-section project canvas with its completeness meter, and the concept
// card with its 0-100 EDEN score graded on novelty, feasibility, and relevance.
// The sample concept is the one that product uses. Nothing is invented, and the
// qualitative grades are left qualitative rather than given numbers we cannot
// evidence.
//
// Two scales: the compact pair fills the nav menu's preview box edge to edge,
// and the larger pair sits in the Products page cards.

const INK = "#0f1a14";
const SUB = "#5b655f";
const LABEL = "#8a938d";
const PANEL = "#f4f7f4";
const HAIR = "rgba(15,26,20,0.08)";

const LAB_TOKEN = "--portal-lab";
const DISC_TOKEN = "--portal-discovery";

// The eleven sections of the EdenLab project canvas, in order, with the five
// marked complete on the product's own example.
const CANVAS = [
  "Hypothesis",
  "Prior Art",
  "Mechanism",
  "Study Design",
  "Literature",
  "IP Strategy",
  "Grants",
  "Collaborators",
  "Timeline",
  "Industry Signal",
  "Licensing Notes",
];
const DONE = 5;
const COMPLETENESS = 45;

const CONCEPT = "Orally bioavailable KRAS G12D degrader for pancreatic adenocarcinoma";
const SCORE = 78;
const DIMS: [string, string][] = [
  ["Novelty", "High"],
  ["Feasibility", "Moderate"],
  ["Relevance", "High"],
];

function Frame({ token, children }: { token: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col bg-white" aria-hidden>
      <div style={{ borderTop: `3px solid hsl(var(${token}))` }} />
      {children}
    </div>
  );
}

function Head({ token, Icon, label, meta }: { token: string; Icon: LucideIcon; label: string; meta?: React.ReactNode }) {
  return (
    <div className="flex flex-shrink-0 items-center justify-between border-b px-4 py-2.5" style={{ borderColor: HAIR }}>
      <span className="flex items-center gap-2">
        <Icon className="h-[15px] w-[15px]" strokeWidth={2.25} style={{ color: `hsl(var(${token}))` }} />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: SUB }}>{label}</span>
      </span>
      {meta}
    </div>
  );
}

function Illustrative() {
  return (
    <span
      className="rounded-full px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide"
      style={{ color: LABEL, border: `1px solid ${HAIR}` }}
    >
      Illustrative
    </span>
  );
}

function CompletenessBar({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "mt-2.5" : "mt-4"}>
      <div className="mb-1 flex items-center justify-between text-[10.5px]">
        <span style={{ color: SUB }}>Project completeness</span>
        <span className="font-mono tabular-nums" style={{ color: `hsl(var(${LAB_TOKEN}))` }}>{COMPLETENESS}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full" style={{ background: PANEL }}>
        <div className="h-full rounded-full" style={{ width: `${COMPLETENESS}%`, background: `hsl(var(${LAB_TOKEN}))` }} />
      </div>
    </div>
  );
}

// Section chip. Complete sections carry the accent check; the rest stay outlined,
// which is what makes "5 of 11" legible without reading the count.
function SectionChip({ name, done, i }: { name: string; done: boolean; i: number }) {
  return (
    <div
      className="flex items-center gap-1.5 rounded-md px-1.5 py-1"
      style={{ background: done ? PANEL : "transparent", border: `1px solid ${done ? HAIR : "transparent"}` }}
    >
      <span
        className="flex h-[13px] w-[13px] flex-shrink-0 items-center justify-center rounded-full"
        style={done ? { background: `hsl(var(${LAB_TOKEN}))` } : { border: `1.5px solid ${LABEL}` }}
      >
        {done && <Check className="h-2 w-2 text-white" strokeWidth={3.5} />}
      </span>
      <span className="font-mono text-[9px] tabular-nums" style={{ color: LABEL }}>
        {String(i + 1).padStart(2, "0")}
      </span>
      <span className="truncate text-[10.5px]" style={{ color: done ? INK : LABEL }}>{name}</span>
    </div>
  );
}

/* ---------------- compact pair: the nav menu preview box ---------------- */

export function LabPreview() {
  return (
    <Frame token={LAB_TOKEN}>
      <Head
        token={LAB_TOKEN}
        Icon={FlaskConical}
        label="Project canvas"
        meta={<span className="font-mono text-[10px]" style={{ color: LABEL }}>{DONE} / {CANVAS.length} sections</span>}
      />
      <div className="flex flex-1 flex-col justify-center px-3.5 py-2.5">
        <p className="text-[12.5px] font-semibold leading-tight" style={{ color: INK }}>
          KRAS G12D Degrader Project
        </p>
        <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-0.5">
          {CANVAS.slice(0, 8).map((s, i) => (
            <SectionChip key={s} name={s} done={i < DONE} i={i} />
          ))}
        </div>
        <CompletenessBar compact />
      </div>
    </Frame>
  );
}

export function DiscoveryPreview() {
  return (
    <Frame token={DISC_TOKEN}>
      <Head token={DISC_TOKEN} Icon={Lightbulb} label="EDEN score" meta={<Illustrative />} />
      <div className="flex flex-1 items-center gap-5 px-4 py-3">
        <div className="flex-shrink-0">
          <div className="flex items-end gap-1">
            <span className="text-[42px] font-bold leading-none" style={{ color: `hsl(var(${DISC_TOKEN}))` }}>{SCORE}</span>
            <span className="mb-1 text-[13px]" style={{ color: LABEL }}>/ 100</span>
          </div>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em]" style={{ color: LABEL }}>
            Concept #247 · Oncology
          </p>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold leading-snug" style={{ color: INK }}>{CONCEPT}</p>
          <div className="mt-2 space-y-1">
            {DIMS.map(([label, grade]) => (
              <div key={label} className="flex items-center justify-between text-[10.5px]">
                <span style={{ color: SUB }}>{label}</span>
                <span className="font-semibold" style={{ color: `hsl(var(${DISC_TOKEN}))` }}>{grade}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ---------------- larger pair: the Products page cards ---------------- */

export function LabCanvas() {
  return (
    <Frame token={LAB_TOKEN}>
      <Head
        token={LAB_TOKEN}
        Icon={FlaskConical}
        label="Project canvas"
        meta={<span className="font-mono text-[10px]" style={{ color: LABEL }}>{DONE} / {CANVAS.length} complete</span>}
      />
      <div className="flex flex-1 flex-col px-4 py-3.5">
        <p className="text-[13.5px] font-semibold leading-tight" style={{ color: INK }}>
          KRAS G12D Degrader Project
        </p>
        <div className="mt-2.5 grid grid-cols-2 gap-x-2.5 gap-y-0.5">
          {CANVAS.map((s, i) => (
            <SectionChip key={s} name={s} done={i < DONE} i={i} />
          ))}
        </div>
        <div className="mt-auto">
          <CompletenessBar />
        </div>
      </div>
    </Frame>
  );
}

export function DiscoveryScore() {
  return (
    <Frame token={DISC_TOKEN}>
      <Head token={DISC_TOKEN} Icon={Lightbulb} label="EDEN credibility score" meta={<Illustrative />} />
      <div className="flex flex-1 flex-col px-4 py-3.5">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.14em]" style={{ color: LABEL }}>
          Concept #247 · Oncology
        </p>
        <p className="mt-1.5 text-[12.5px] font-semibold leading-snug" style={{ color: INK }}>{CONCEPT}</p>
        <div className="mt-auto flex items-end gap-6 pt-4">
          <div className="flex-shrink-0">
            <div className="flex items-end gap-1">
              <span className="text-[52px] font-bold leading-none" style={{ color: `hsl(var(${DISC_TOKEN}))` }}>{SCORE}</span>
              <span className="mb-1.5 text-[14px]" style={{ color: LABEL }}>/ 100</span>
            </div>
            <p className="mt-1 text-[10.5px]" style={{ color: LABEL }}>Scored on submission</p>
          </div>
          <div className="min-w-0 flex-1 space-y-1.5 pb-1">
            {DIMS.map(([label, grade]) => (
              <div key={label} className="flex items-center justify-between border-b pb-1 text-[11.5px]" style={{ borderColor: HAIR }}>
                <span style={{ color: SUB }}>{label}</span>
                <span className="font-semibold" style={{ color: `hsl(var(${DISC_TOKEN}))` }}>{grade}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
