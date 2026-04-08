export function RadarBackground() {
  return (
    <div className="radar-rings" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.045 }}
      >
        <defs>
          <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(142,52%,36%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(142,52%,36%)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50%" cy="50%" r="15%" fill="none" stroke="hsl(142,52%,36%)" strokeWidth="1" />
        <circle cx="50%" cy="50%" r="25%" fill="none" stroke="hsl(142,52%,36%)" strokeWidth="1" />
        <circle cx="50%" cy="50%" r="35%" fill="none" stroke="hsl(142,52%,36%)" strokeWidth="1" />
        <circle cx="50%" cy="50%" r="45%" fill="none" stroke="hsl(142,52%,36%)" strokeWidth="1" />
        <circle cx="50%" cy="50%" r="55%" fill="none" stroke="hsl(142,52%,36%)" strokeWidth="1" />
        <circle cx="50%" cy="50%" r="65%" fill="none" stroke="hsl(142,52%,36%)" strokeWidth="1" />
        <circle cx="50%" cy="50%" r="75%" fill="none" stroke="hsl(142,52%,36%)" strokeWidth="1" />
        <circle cx="50%" cy="50%" r="85%" fill="none" stroke="hsl(142,52%,36%)" strokeWidth="0.5" />
        <circle cx="50%" cy="50%" r="95%" fill="none" stroke="hsl(142,52%,36%)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
