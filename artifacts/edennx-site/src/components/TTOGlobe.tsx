import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";

// Real institution coordinates [lat, lng]. Ported from EdenRadar.
const TTO_MARKERS: Array<{ location: [number, number]; size: number }> = [
  // North America (US)
  { location: [42.36, -71.09], size: 0.07 }, // MIT
  { location: [37.43, -122.17], size: 0.07 }, // Stanford
  { location: [42.38, -71.12], size: 0.06 }, // Harvard
  { location: [37.76, -122.46], size: 0.06 }, // UCSF
  { location: [40.81, -73.96], size: 0.06 }, // Columbia
  { location: [39.33, -76.62], size: 0.05 }, // Johns Hopkins
  { location: [44.02, -92.47], size: 0.05 }, // Mayo Clinic
  { location: [39.95, -75.2], size: 0.05 }, // Penn
  { location: [41.32, -72.92], size: 0.05 }, // Yale
  { location: [35.99, -78.94], size: 0.05 }, // Duke
  { location: [38.65, -90.31], size: 0.05 }, // WUSTL
  { location: [42.06, -87.68], size: 0.05 }, // Northwestern
  { location: [34.14, -118.13], size: 0.05 }, // Caltech
  { location: [42.45, -76.48], size: 0.05 }, // Cornell
  { location: [42.28, -83.74], size: 0.05 }, // Michigan
  { location: [43.07, -89.4], size: 0.05 }, // Wisconsin
  { location: [30.28, -97.73], size: 0.05 }, // UT Austin
  { location: [32.88, -117.23], size: 0.05 }, // UC San Diego
  { location: [34.07, -118.44], size: 0.05 }, // UCLA
  { location: [37.87, -122.27], size: 0.06 }, // UC Berkeley
  { location: [40.44, -79.96], size: 0.05 }, // Pittsburgh
  { location: [33.79, -84.32], size: 0.05 }, // Emory
  { location: [47.66, -122.3], size: 0.05 }, // UW Seattle
  { location: [29.72, -95.34], size: 0.05 }, // Houston
  { location: [44.97, -93.23], size: 0.05 }, // Minnesota
  { location: [40.76, -73.96], size: 0.04 }, // Sloan Kettering
  { location: [29.71, -95.4], size: 0.05 }, // MD Anderson
  { location: [29.65, -82.35], size: 0.04 }, // Florida
  { location: [35.9, -79.05], size: 0.04 }, // UNC
  // Canada
  { location: [43.66, -79.4], size: 0.05 }, // Toronto
  { location: [49.27, -123.22], size: 0.05 }, // UBC
  { location: [45.5, -73.58], size: 0.04 }, // McGill
  // UK
  { location: [51.75, -1.25], size: 0.06 }, // Oxford
  { location: [52.21, 0.12], size: 0.06 }, // Cambridge
  { location: [51.5, -0.17], size: 0.05 }, // Imperial
  { location: [51.52, -0.13], size: 0.05 }, // UCL
  { location: [55.95, -3.19], size: 0.04 }, // Edinburgh
  // Western Europe
  { location: [47.38, 8.55], size: 0.06 }, // ETH Zurich
  { location: [46.52, 6.57], size: 0.05 }, // EPFL
  { location: [48.15, 11.57], size: 0.05 }, // TU Munich
  { location: [49.41, 8.71], size: 0.04 }, // Heidelberg
  { location: [50.88, 4.7], size: 0.05 }, // KU Leuven
  { location: [48.85, 2.35], size: 0.05 }, // Paris / Pasteur
  { location: [52.37, 4.9], size: 0.04 }, // Amsterdam
  { location: [59.35, 18.07], size: 0.04 }, // Karolinska
  { location: [55.7, 12.56], size: 0.04 }, // Copenhagen
  { location: [52.52, 13.4], size: 0.04 }, // Berlin Charite
  // Israel
  { location: [32.07, 34.82], size: 0.05 }, // Tel Aviv
  { location: [31.9, 34.8], size: 0.05 }, // Weizmann
  { location: [32.77, 35.02], size: 0.04 }, // Technion
  // Asia-Pacific
  { location: [35.69, 139.69], size: 0.05 }, // Tokyo
  { location: [35.03, 135.78], size: 0.05 }, // Kyoto
  { location: [37.59, 127.02], size: 0.05 }, // Seoul National
  { location: [36.37, 127.36], size: 0.04 }, // KAIST
  { location: [39.99, 116.31], size: 0.05 }, // Peking
  { location: [40.0, 116.33], size: 0.05 }, // Tsinghua
  { location: [31.02, 121.44], size: 0.05 }, // Fudan / Shanghai
  { location: [1.3, 103.78], size: 0.05 }, // NUS Singapore
  { location: [22.28, 114.18], size: 0.04 }, // HKU
  { location: [19.08, 72.88], size: 0.04 }, // IIT Bombay
  { location: [12.91, 77.57], size: 0.04 }, // IISc Bangalore
  // Australia
  { location: [-37.8, 144.96], size: 0.05 }, // Melbourne
  { location: [-33.89, 151.19], size: 0.05 }, // Sydney
  { location: [-27.5, 153.01], size: 0.04 }, // Queensland
];

const ARC_PAIRS: Array<[[number, number], [number, number]]> = [
  [[42.36, -71.09], [37.43, -122.17]], // MIT -> Stanford
  [[42.36, -71.09], [51.75, -1.25]], // MIT -> Oxford
  [[40.81, -73.96], [48.85, 2.35]], // Columbia -> Paris
  [[37.43, -122.17], [35.69, 139.69]], // Stanford -> Tokyo
  [[47.38, 8.55], [31.9, 34.8]], // ETH -> Weizmann
  [[51.75, -1.25], [47.38, 8.55]], // Oxford -> ETH
  [[37.43, -122.17], [-37.8, 144.96]], // Stanford -> Melbourne
  [[37.87, -122.27], [39.99, 116.31]], // Berkeley -> Peking
  [[42.36, -71.09], [43.66, -79.4]], // MIT -> Toronto
  [[29.71, -95.4], [59.35, 18.07]], // MD Anderson -> Karolinska
  [[51.5, -0.17], [35.69, 139.69]], // Imperial -> Tokyo
  [[35.69, 139.69], [1.3, 103.78]], // Tokyo -> NUS
];

interface ArcState {
  idx: number;
  alpha: number;
  phase: "in" | "hold" | "out";
  holdFrames: number;
}

const FADE_IN_SPEED = 0.012;
const FADE_OUT_SPEED = 0.01;
const HOLD_FRAMES = 200;
const EMERALD: [number, number, number] = [0.24, 0.9, 0.52];

export function TTOGlobe({
  size = 480,
  isDark = true,
  className = "",
}: {
  size?: number;
  isDark?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0.4);
  const arcStatesRef = useRef<ArcState[]>([]);

  const pickFreshIdx = useCallback((usedIndices: number[]): number => {
    const available = ARC_PAIRS.map((_, i) => i).filter((i) => !usedIndices.includes(i));
    if (available.length === 0) return Math.floor(Math.random() * ARC_PAIRS.length);
    return available[Math.floor(Math.random() * available.length)];
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    arcStatesRef.current = [0, 3, 6, 9].map((idx) => ({
      idx,
      alpha: 0,
      phase: "in" as const,
      holdFrames: 0,
    }));

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: phiRef.current,
      theta: 0.25,
      dark: isDark ? 1 : 0,
      diffuse: 1.1,
      mapSamples: 22000,
      mapBrightness: isDark ? 6.5 : 3,
      mapBaseBrightness: isDark ? 0.12 : 0.1,
      // baseColor is the land-dot color; keep it bright enough that the
      // continents read clearly against the dark sphere.
      baseColor: isDark ? [0.26, 0.55, 0.4] : [0.86, 0.93, 0.88],
      markerColor: [0.4, 1, 0.62],
      glowColor: isDark ? [0.12, 0.4, 0.28] : [0.12, 0.55, 0.3],
      markers: TTO_MARKERS,
      arcs: [],
      arcColor: EMERALD,
      arcWidth: 2,
      arcHeight: 0.2,
    } as Parameters<typeof createGlobe>[1]);

    let rafId: number;

    const animate = () => {
      phiRef.current += 0.003;

      const states = arcStatesRef.current.map((arc) => {
        let { idx, alpha, phase, holdFrames } = arc;
        if (phase === "in") {
          alpha = Math.min(1, alpha + FADE_IN_SPEED);
          if (alpha >= 1) { alpha = 1; phase = "hold"; holdFrames = 0; }
        } else if (phase === "hold") {
          holdFrames += 1;
          if (holdFrames >= HOLD_FRAMES) phase = "out";
        } else {
          alpha = Math.max(0, alpha - FADE_OUT_SPEED);
          if (alpha <= 0) {
            idx = pickFreshIdx(arcStatesRef.current.map((a) => a.idx));
            alpha = 0;
            phase = "in";
            holdFrames = 0;
          }
        }
        return { idx, alpha, phase, holdFrames } as ArcState;
      });

      arcStatesRef.current = states;

      const computedArcs = states.map(({ idx, alpha }) => ({
        from: ARC_PAIRS[idx][0],
        to: ARC_PAIRS[idx][1],
        color: [EMERALD[0] * alpha, EMERALD[1] * alpha, EMERALD[2] * alpha] as [number, number, number],
      }));

      globe.update({ phi: phiRef.current, arcs: computedArcs } as Parameters<typeof globe.update>[0]);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
    };
  }, [size, isDark, pickFreshIdx]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, maxWidth: "100%", aspectRatio: "1" }}
      className={className}
      aria-hidden="true"
    />
  );
}
