import { useEffect, useRef } from "react";
import createGlobe from "cobe";

// Real institution / research-hub coordinates [lat, lng], spread across six
// continents so the globe reads as genuinely global with no large blank zones.
const TTO_MARKERS: Array<{ location: [number, number]; size: number }> = [
  // North America — US
  { location: [42.36, -71.09], size: 0.06 }, // MIT
  { location: [37.43, -122.17], size: 0.06 }, // Stanford
  { location: [42.38, -71.12], size: 0.05 }, // Harvard
  { location: [37.76, -122.46], size: 0.05 }, // UCSF
  { location: [40.81, -73.96], size: 0.05 }, // Columbia
  { location: [39.33, -76.62], size: 0.05 }, // Johns Hopkins
  { location: [44.02, -92.47], size: 0.04 }, // Mayo Clinic
  { location: [39.95, -75.2], size: 0.04 }, // Penn
  { location: [41.32, -72.92], size: 0.04 }, // Yale
  { location: [35.99, -78.94], size: 0.04 }, // Duke
  { location: [38.65, -90.31], size: 0.04 }, // WUSTL
  { location: [42.06, -87.68], size: 0.04 }, // Northwestern
  { location: [42.45, -76.48], size: 0.04 }, // Cornell
  { location: [42.28, -83.74], size: 0.04 }, // Michigan
  { location: [43.07, -89.4], size: 0.04 }, // Wisconsin
  { location: [30.28, -97.73], size: 0.04 }, // UT Austin
  { location: [32.88, -117.23], size: 0.04 }, // UC San Diego
  { location: [34.07, -118.44], size: 0.05 }, // UCLA
  { location: [37.87, -122.27], size: 0.05 }, // UC Berkeley
  { location: [40.44, -79.96], size: 0.04 }, // Pittsburgh
  { location: [33.79, -84.32], size: 0.04 }, // Emory
  { location: [47.66, -122.3], size: 0.04 }, // UW Seattle
  { location: [29.72, -95.34], size: 0.04 }, // Houston
  { location: [44.97, -93.23], size: 0.04 }, // Minnesota
  { location: [40.0, -105.27], size: 0.04 }, // Colorado Boulder
  { location: [35.08, -106.65], size: 0.03 }, // New Mexico
  { location: [29.65, -82.35], size: 0.04 }, // Florida
  { location: [35.9, -79.05], size: 0.04 }, // UNC
  // Canada
  { location: [43.66, -79.4], size: 0.04 }, // Toronto
  { location: [49.27, -123.22], size: 0.04 }, // UBC
  { location: [45.5, -73.58], size: 0.04 }, // McGill
  { location: [43.47, -80.52], size: 0.03 }, // Waterloo
  { location: [51.08, -114.13], size: 0.03 }, // Calgary
  // South America
  { location: [-23.56, -46.73], size: 0.05 }, // USP Sao Paulo
  { location: [-22.91, -43.17], size: 0.04 }, // Rio de Janeiro
  { location: [-34.6, -58.38], size: 0.04 }, // Buenos Aires
  { location: [-33.46, -70.66], size: 0.04 }, // Santiago
  { location: [4.71, -74.07], size: 0.03 }, // Bogota
  { location: [-12.05, -77.04], size: 0.03 }, // Lima
  // UK & Ireland
  { location: [51.75, -1.25], size: 0.05 }, // Oxford
  { location: [52.21, 0.12], size: 0.05 }, // Cambridge
  { location: [51.5, -0.17], size: 0.04 }, // Imperial
  { location: [51.52, -0.13], size: 0.04 }, // UCL
  { location: [55.95, -3.19], size: 0.04 }, // Edinburgh
  { location: [53.35, -6.26], size: 0.03 }, // Trinity Dublin
  // Western & Southern Europe
  { location: [47.38, 8.55], size: 0.05 }, // ETH Zurich
  { location: [46.52, 6.57], size: 0.04 }, // EPFL
  { location: [48.15, 11.57], size: 0.04 }, // TU Munich
  { location: [49.41, 8.71], size: 0.04 }, // Heidelberg
  { location: [50.88, 4.7], size: 0.04 }, // KU Leuven
  { location: [48.85, 2.35], size: 0.05 }, // Paris / Pasteur
  { location: [52.37, 4.9], size: 0.04 }, // Amsterdam
  { location: [41.9, 12.5], size: 0.04 }, // Rome
  { location: [45.46, 9.19], size: 0.03 }, // Milan
  { location: [40.41, -3.7], size: 0.04 }, // Madrid
  { location: [41.39, 2.15], size: 0.03 }, // Barcelona
  { location: [38.72, -9.14], size: 0.03 }, // Lisbon
  // Northern Europe
  { location: [59.35, 18.07], size: 0.04 }, // Karolinska
  { location: [55.7, 12.56], size: 0.04 }, // Copenhagen
  { location: [60.19, 24.83], size: 0.03 }, // Helsinki
  { location: [59.91, 10.74], size: 0.03 }, // Oslo
  // Central & Eastern Europe + Russia
  { location: [52.52, 13.4], size: 0.04 }, // Berlin
  { location: [48.21, 16.37], size: 0.03 }, // Vienna
  { location: [50.08, 14.44], size: 0.03 }, // Prague
  { location: [52.23, 21.01], size: 0.03 }, // Warsaw
  { location: [47.5, 19.04], size: 0.03 }, // Budapest
  { location: [37.98, 23.73], size: 0.03 }, // Athens
  { location: [55.75, 37.62], size: 0.04 }, // Moscow
  { location: [59.93, 30.34], size: 0.03 }, // St Petersburg
  // Middle East
  { location: [32.07, 34.82], size: 0.04 }, // Tel Aviv
  { location: [31.9, 34.8], size: 0.04 }, // Weizmann
  { location: [32.77, 35.02], size: 0.03 }, // Technion
  { location: [22.3, 39.1], size: 0.04 }, // KAUST
  { location: [24.47, 54.37], size: 0.03 }, // Abu Dhabi
  { location: [25.28, 51.49], size: 0.03 }, // Doha
  { location: [41.01, 28.98], size: 0.04 }, // Istanbul
  { location: [35.7, 51.42], size: 0.03 }, // Tehran
  // Africa
  { location: [-33.96, 18.46], size: 0.04 }, // Cape Town
  { location: [-26.19, 28.03], size: 0.03 }, // Johannesburg
  { location: [-25.74, 28.24], size: 0.03 }, // Pretoria
  { location: [30.04, 31.24], size: 0.04 }, // Cairo
  { location: [-1.29, 36.82], size: 0.03 }, // Nairobi
  { location: [6.52, 3.38], size: 0.03 }, // Lagos
  { location: [5.6, -0.19], size: 0.03 }, // Accra
  // South Asia
  { location: [19.08, 72.88], size: 0.04 }, // IIT Bombay
  { location: [12.91, 77.57], size: 0.04 }, // IISc Bangalore
  { location: [28.54, 77.19], size: 0.04 }, // IIT Delhi
  { location: [13.08, 80.27], size: 0.03 }, // IIT Madras
  { location: [17.39, 78.49], size: 0.03 }, // Hyderabad
  { location: [23.81, 90.41], size: 0.03 }, // Dhaka
  // Southeast Asia
  { location: [1.3, 103.78], size: 0.05 }, // NUS Singapore
  { location: [13.74, 100.52], size: 0.03 }, // Bangkok
  { location: [-6.21, 106.85], size: 0.03 }, // Jakarta
  { location: [3.14, 101.69], size: 0.03 }, // Kuala Lumpur
  { location: [14.6, 120.98], size: 0.03 }, // Manila
  // East Asia
  { location: [35.69, 139.69], size: 0.05 }, // Tokyo
  { location: [35.03, 135.78], size: 0.04 }, // Kyoto
  { location: [37.59, 127.02], size: 0.04 }, // Seoul National
  { location: [36.37, 127.36], size: 0.03 }, // KAIST
  { location: [39.99, 116.31], size: 0.05 }, // Peking
  { location: [40.0, 116.33], size: 0.04 }, // Tsinghua
  { location: [31.02, 121.44], size: 0.04 }, // Fudan / Shanghai
  { location: [22.54, 114.06], size: 0.03 }, // Shenzhen
  { location: [30.59, 114.31], size: 0.03 }, // Wuhan
  { location: [25.03, 121.57], size: 0.03 }, // Taipei
  { location: [22.28, 114.18], size: 0.03 }, // HKU
  // Oceania
  { location: [-37.8, 144.96], size: 0.04 }, // Melbourne
  { location: [-33.89, 151.19], size: 0.04 }, // Sydney
  { location: [-27.5, 153.01], size: 0.03 }, // Queensland
  { location: [-31.95, 115.86], size: 0.03 }, // Perth
  { location: [-34.93, 138.6], size: 0.03 }, // Adelaide
  { location: [-36.85, 174.76], size: 0.03 }, // Auckland
  { location: [-43.53, 172.64], size: 0.03 }, // Christchurch
  // Fill — additional research hubs to even out coverage
  { location: [19.43, -99.13], size: 0.03 }, // Mexico City
  { location: [25.65, -100.29], size: 0.03 }, // Monterrey
  { location: [-19.92, -43.94], size: 0.03 }, // Belo Horizonte
  { location: [-34.9, -56.16], size: 0.03 }, // Montevideo
  { location: [-0.18, -78.47], size: 0.03 }, // Quito
  { location: [40.0, -83.02], size: 0.03 }, // Ohio State
  { location: [33.42, -111.93], size: 0.03 }, // Arizona State
  { location: [36.16, -86.78], size: 0.03 }, // Nashville
  { location: [40.1, -88.23], size: 0.03 }, // Illinois
  { location: [45.42, -75.7], size: 0.03 }, // Ottawa
  { location: [53.52, -113.52], size: 0.03 }, // Edmonton
  { location: [50.11, 8.68], size: 0.03 }, // Frankfurt
  { location: [46.2, 6.14], size: 0.03 }, // Geneva
  { location: [57.71, 11.97], size: 0.03 }, // Gothenburg
  { location: [53.47, -2.23], size: 0.03 }, // Manchester
  { location: [55.86, -4.25], size: 0.03 }, // Glasgow
  { location: [24.71, 46.68], size: 0.03 }, // Riyadh
  { location: [33.89, 35.5], size: 0.03 }, // Beirut
  { location: [9.03, 38.74], size: 0.03 }, // Addis Ababa
  { location: [14.69, -17.45], size: 0.03 }, // Dakar
  { location: [34.02, -6.83], size: 0.03 }, // Rabat
  { location: [33.68, 73.04], size: 0.03 }, // Islamabad
  { location: [31.55, 74.34], size: 0.03 }, // Lahore
  { location: [43.24, 76.89], size: 0.03 }, // Almaty
  { location: [41.3, 69.24], size: 0.03 }, // Tashkent
  { location: [10.82, 106.63], size: 0.03 }, // Ho Chi Minh City
  { location: [23.13, 113.26], size: 0.03 }, // Guangzhou
  { location: [30.57, 104.07], size: 0.03 }, // Chengdu
  { location: [35.18, 129.08], size: 0.03 }, // Busan
  { location: [35.18, 136.91], size: 0.03 }, // Nagoya
  // More US tech transfer offices (where most of our 400+ are)
  { location: [40.5, -74.45], size: 0.03 }, // Rutgers
  { location: [40.8, -77.86], size: 0.03 }, // Penn State
  { location: [40.43, -86.91], size: 0.03 }, // Purdue
  { location: [34.02, -118.29], size: 0.03 }, // USC
  { location: [33.64, -117.84], size: 0.03 }, // UC Irvine
  { location: [34.41, -119.85], size: 0.03 }, // UC Santa Barbara
  { location: [40.91, -73.12], size: 0.03 }, // Stony Brook
  { location: [30.62, -96.34], size: 0.03 }, // Texas A&M
  { location: [33.78, -84.4], size: 0.03 }, // Georgia Tech
  { location: [38.03, -78.51], size: 0.03 }, // Virginia
  { location: [38.99, -76.94], size: 0.03 }, // Maryland
  { location: [42.7, -84.48], size: 0.03 }, // Michigan State
  { location: [41.66, -91.54], size: 0.03 }, // Iowa
  { location: [38.95, -92.33], size: 0.03 }, // Missouri
  { location: [38.96, -95.25], size: 0.03 }, // Kansas
  { location: [40.81, -96.7], size: 0.03 }, // Nebraska
  { location: [35.21, -97.45], size: 0.03 }, // Oklahoma
  { location: [44.05, -123.07], size: 0.03 }, // Oregon
  { location: [38.04, -84.5], size: 0.03 }, // Kentucky
  { location: [35.95, -83.93], size: 0.03 }, // Tennessee
  { location: [34.0, -81.03], size: 0.03 }, // South Carolina
  { location: [41.8, -72.25], size: 0.03 }, // UConn
  { location: [40.76, -111.84], size: 0.03 }, // Utah
  { location: [33.21, -87.54], size: 0.03 }, // Alabama
  // More international TTOs
  { location: [43.77, 11.26], size: 0.03 }, // Florence
  { location: [45.19, 5.72], size: 0.03 }, // Grenoble
  { location: [43.6, 1.44], size: 0.03 }, // Toulouse
  { location: [53.81, -1.55], size: 0.03 }, // Leeds
  { location: [50.94, 6.96], size: 0.03 }, // Cologne
  { location: [59.4, 24.74], size: 0.03 }, // Tallinn
  { location: [1.35, 103.68], size: 0.03 }, // NTU Singapore
  { location: [37.34, 126.73], size: 0.03 }, // Seoul (Yonsei)
  { location: [31.23, 121.47], size: 0.03 }, // Shanghai Jiao Tong
];

// Shrink every marker uniformly so the globe reads as densely covered.
const SIZE_SCALE = 0.5;
const SCALED_MARKERS = TTO_MARKERS.map((m) => ({
  location: m.location,
  size: m.size * SIZE_SCALE,
}));

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

  useEffect(() => {
    if (!canvasRef.current) return;

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
      markers: SCALED_MARKERS,
    } as Parameters<typeof createGlobe>[1]);

    let rafId: number;
    const animate = () => {
      phiRef.current += 0.003;
      globe.update({ phi: phiRef.current } as Parameters<typeof globe.update>[0]);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
    };
  }, [size, isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, maxWidth: "100%", aspectRatio: "1" }}
      className={className}
      aria-hidden="true"
    />
  );
}
