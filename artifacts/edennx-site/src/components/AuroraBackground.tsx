// Drifting aurora blobs in emerald brand tones. Sits behind hero
// content as a soft, premium ambient layer (ported from EdenRadar). Decorative
// only; honors prefers-reduced-motion via the .aurora-blob-* classes in CSS.
export function AuroraBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="aurora-blob aurora-blob-1"
        style={{ width: 420, height: 420, top: "-8%", left: "-6%", background: "hsl(var(--portal-radar) / 0.28)" }}
      />
      <div
        className="aurora-blob aurora-blob-2"
        style={{ width: 360, height: 360, top: "20%", right: "-8%", background: "hsl(142 60% 45% / 0.16)" }}
      />
      <div
        className="aurora-blob aurora-blob-3"
        style={{ width: 380, height: 380, bottom: "-12%", left: "30%", background: "hsl(160 55% 38% / 0.14)" }}
      />
    </div>
  );
}
