const COLS = 22;
const ROWS = 9;
const CELLS = COLS * ROWS;

export function BoxGridBackground() {
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{
        maskImage:
          "radial-gradient(ellipse 75% 80% at 30% 50%, black 20%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 75% 80% at 30% 50%, black 20%, transparent 80%)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          width: "100%",
          height: "100%",
        }}
      >
        {Array.from({ length: CELLS }, (_, i) => {
          const delay = ((i * 41 + 7) % 31) * 0.35;
          const duration = 3.5 + ((i * 17) % 8) * 0.4;
          return (
            <div
              key={i}
              style={{
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                animationName: "boxPulse",
                animationIterationCount: "infinite",
                animationTimingFunction: "ease-in-out",
                border: "1px solid hsl(142 52% 36% / 0.10)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
