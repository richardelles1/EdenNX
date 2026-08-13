import { FlaskConical, Lightbulb, Check, type LucideIcon } from "lucide-react";

// Product surfaces for EdenLab and EdenDiscovery, which have no screenshot: Lab
// only has a marketing page, and Discovery has no public product to shoot.
// Adapted from the vignettes built for the Products page, with illustrative
// sample data and the real layout, so the menu never implies a UI we cannot
// evidence.
//
// Sized to fill the menu's preview box exactly rather than being rendered at
// full size and cropped. The screenshots bleed edge to edge, so these do too:
// an inset card behind a fade read as a different kind of thing sitting in the
// same slot.

const INK = "#0f1a14";
const SUB = "#5b655f";
const LABEL = "#8a938d";
const PANEL = "#f4f7f4";
const HAIR = "rgba(15,26,20,0.08)";

function Frame({ token, children }: { token: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col bg-white" aria-hidden>
      <div style={{ borderTop: `3px solid hsl(var(${token}))` }} />
      {children}
    </div>
  );
}

function Head({
  token,
  Icon,
  label,
  meta,
}: {
  token: string;
  Icon: LucideIcon;
  label: string;
  meta?: React.ReactNode;
}) {
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

const SECTIONS = [
  { label: "Hypothesis", done: true },
  { label: "Literature", done: true },
  { label: "Evidence", done: true },
  { label: "IP position", done: false },
];

export function LabPreview() {
  const t = "--portal-lab";
  return (
    <Frame token={t}>
      <Head
        token={t}
        Icon={FlaskConical}
        label="Project canvas"
        meta={<span className="font-mono text-[10px]" style={{ color: LABEL }}>4 / 11 sections</span>}
      />
      <div className="flex flex-1 flex-col justify-center px-4 py-3">
        <p className="text-[14px] font-semibold leading-tight" style={{ color: INK }}>
          Tumor-targeting ADC linker
        </p>
        <p className="mt-0.5 text-[11px]" style={{ color: LABEL }}>Translational research workspace</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {SECTIONS.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
              style={{ background: PANEL, border: `1px solid ${HAIR}` }}
            >
              <span
                className="flex h-[15px] w-[15px] flex-shrink-0 items-center justify-center rounded-full"
                style={s.done ? { background: `hsl(var(${t}))` } : { border: `1.5px solid ${LABEL}` }}
              >
                {s.done && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
              </span>
              <span className="text-[11.5px]" style={{ color: s.done ? INK : LABEL }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

const DIMS = [
  { label: "Novelty", value: 92 },
  { label: "Feasibility", value: 78 },
  { label: "Evidence", value: 84 },
];

export function DiscoveryPreview() {
  const t = "--portal-discovery";
  return (
    <Frame token={t}>
      <Head
        token={t}
        Icon={Lightbulb}
        label="EDEN credibility score"
        meta={
          <span
            className="rounded-full px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide"
            style={{ color: LABEL, border: `1px solid ${HAIR}` }}
          >
            Illustrative
          </span>
        }
      />
      <div className="flex flex-1 items-center gap-5 px-4 py-3">
        <div className="flex-shrink-0">
          <div className="flex items-end gap-1">
            <span className="text-[42px] font-bold leading-none" style={{ color: `hsl(var(${t}))` }}>87</span>
            <span className="mb-1 text-[13px]" style={{ color: LABEL }}>/ 100</span>
          </div>
          <p className="mt-1.5 max-w-[16ch] text-[11.5px] font-semibold leading-snug" style={{ color: INK }}>
            Bispecific tumor-homing peptide
          </p>
        </div>
        <div className="min-w-0 flex-1 space-y-2.5">
          {DIMS.map((d) => (
            <div key={d.label}>
              <div className="mb-1 flex items-center justify-between text-[11px]">
                <span className="font-medium" style={{ color: SUB }}>{d.label}</span>
                <span className="tabular-nums" style={{ color: LABEL }}>{d.value}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full" style={{ background: PANEL }}>
                <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: `hsl(var(${t}))` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}
