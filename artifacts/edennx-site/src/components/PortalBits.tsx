import { Radar, FlaskConical, Lightbulb, Store, type LucideIcon } from "lucide-react";

// Portal -> accent token + lucide icon. Single source for the per-portal
// identity used by eyebrows and showcases across Home and Products.
export const PORTAL_META: Record<string, { token: string; Icon: LucideIcon }> = {
  EdenRadar: { token: "--portal-radar", Icon: Radar },
  EdenLab: { token: "--portal-lab", Icon: FlaskConical },
  EdenDiscovery: { token: "--portal-discovery", Icon: Lightbulb },
  EdenMarket: { token: "--portal-market", Icon: Store },
};

// Eyebrow lockup: a portal-colored icon plus the wordmark split two-tone,
// "Eden" in the foreground color and the suffix in the portal accent, echoing
// the EdenNX logo treatment.
export function PortalEyebrow({
  name,
  className = "",
  nameClassName = "text-base",
  iconClassName = "h-5 w-5",
}: {
  name: string;
  className?: string;
  nameClassName?: string;
  iconClassName?: string;
}) {
  const meta = PORTAL_META[name] ?? PORTAL_META.EdenRadar;
  const accent = `hsl(var(${meta.token}))`;
  const suffix = name.startsWith("Eden") ? name.slice(4) : name;
  const { Icon } = meta;
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Icon className={`${iconClassName} flex-shrink-0`} strokeWidth={2.25} style={{ color: accent }} />
      <span className={`font-bold tracking-tight leading-none ${nameClassName}`}>
        <span className="text-foreground">Eden</span>
        <span style={{ color: accent }}>{suffix}</span>
      </span>
    </span>
  );
}

// Clean framed product screenshot, tinted with the portal accent. Replaces the
// old "vision" blockquotes with genuine UI. No fake browser chrome.
export function PortalShowcase({
  src,
  alt,
  token,
}: {
  src: string;
  alt: string;
  token: string;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden border border-border bg-card reveal"
      style={{ boxShadow: `0 18px 48px hsl(var(${token}) / 0.16), 0 4px 12px hsl(0 0% 0% / 0.06)` }}
    >
      <img src={src} alt={alt} className="w-full block" loading="lazy" />
    </div>
  );
}
