// Builds public/images/marks/mark-radar.svg: the EdenRadar dot globe (a top and
// a bottom dome of dots, as in the brand kit lockup kAHTU17Veao) without the
// wordmark band, so the mark reads as a sphere at card size rather than as a
// single arc of dots. Run: node scripts/make-radar-mark.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const GREEN = "#26744a"; // --radar-primary
const R = 46;            // sphere radius in a 100 x 100 box
const TILT = (10 * Math.PI) / 180; // seen from slightly above
const LATS = [17, 27, 37, 47, 57, 67, 77];  // degrees, mirrored below the equator
const STEP = 0.27;       // spacing between dots on the sphere, in radius units

const dots = [];
// The top dome is projected, then mirrored, so the two domes match as they do
// in the lockup (a tilted sphere would hide the lower pole).
for (const sign of [1]) {
  LATS.forEach((deg, j) => {
    const phi = (sign * deg * Math.PI) / 180;
    const ring = Math.cos(phi);
    const n = Math.max(4, Math.round((2 * Math.PI * ring) / STEP));
    for (let i = 0; i < n; i++) {
      const th = (2 * Math.PI * (i + (j % 2) * 0.5)) / n; // alternate rows staggered
      const x = ring * Math.sin(th);
      const y = Math.sin(phi);
      const z = ring * Math.cos(th);
      const y2 = y * Math.cos(TILT) - z * Math.sin(TILT);
      const z2 = y * Math.sin(TILT) + z * Math.cos(TILT);
      if (z2 < 0.08) continue; // back of the sphere
      // Halftone: dots grow toward the viewer and toward the equator.
      const r = 0.55 + 1.9 * z2 * ring;
      dots.push([50 + R * x, 50 - R * y2, r], [50 + R * x, 50 + R * y2, r]);
    }
  });
}

const body = dots.map(([x, y, r]) => `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${r.toFixed(2)}"/>`).join("");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="EdenRadar"><g fill="${GREEN}">${body}</g></svg>\n`;
const out = fileURLToPath(new URL("../public/images/marks/mark-radar.svg", import.meta.url));
writeFileSync(out, svg);
console.log(`${dots.length} dots -> ${out}`);
