// Optimized transparent mark (192px, ~23KB) served from /public.
const logoIcon = "/eden-mark.png";

// EdenNX brand lockup. Uses the transparent (alpha) icon mark plus a CSS
// wordmark so it adapts to light and dark surfaces with no white background
// and no color-inverting hacks. "Eden" takes the foreground color, "NX" the
// emerald primary, matching the brand kit.
export function Logo({
  iconClassName = "h-9 w-auto",
  wordmark = true,
  wordmarkClassName = "text-xl font-bold tracking-tight",
}: {
  iconClassName?: string;
  wordmark?: boolean;
  wordmarkClassName?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <img src={logoIcon} alt="EdenNX" className={iconClassName} draggable={false} />
      {wordmark && (
        <span className={wordmarkClassName}>
          <span className="text-foreground">Eden</span>
          <span className="text-primary">NX</span>
        </span>
      )}
    </span>
  );
}
