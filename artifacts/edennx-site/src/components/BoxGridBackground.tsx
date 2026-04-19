import { useState, useRef, useCallback, useEffect } from "react";

const CELL_SIZE = 54;

interface Cell {
  col: number;
  row: number;
}

export function BoxGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(24);
  const [rows, setRows] = useState(12);
  const [hoveredCell, setHoveredCell] = useState<Cell | null>(null);
  const [activeCells, setActiveCells] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    function updateSize() {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setCols(Math.ceil(width / CELL_SIZE) + 1);
      setRows(Math.ceil(height / CELL_SIZE) + 1);
    }
    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const getCellAt = useCallback((clientX: number, clientY: number): Cell | null => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const col = Math.floor((clientX - rect.left) / CELL_SIZE);
    const row = Math.floor((clientY - rect.top) / CELL_SIZE);
    if (col < 0 || row < 0) return null;
    return { col, row };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredCell(getCellAt(e.clientX, e.clientY));
  }, [getCellAt]);

  const handleMouseLeave = useCallback(() => {
    setHoveredCell(null);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const origin = getCellAt(e.clientX, e.clientY);
    if (!origin || !containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const currentCols = Math.ceil(width / CELL_SIZE) + 1;
    const currentRows = Math.ceil(height / CELL_SIZE) + 1;

    const MAX_RING = Math.ceil(Math.sqrt(currentCols ** 2 + currentRows ** 2));
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let ring = 0; ring <= MAX_RING; ring++) {
      const ringCells: string[] = [];
      for (let dc = -ring; dc <= ring; dc++) {
        const absDr = ring - Math.abs(dc);
        const deltas = absDr === 0 ? [0] : [-absDr, absDr];
        for (const dr of deltas) {
          const nc = origin.col + dc;
          const nr = origin.row + dr;
          if (nc >= 0 && nc < currentCols && nr >= 0 && nr < currentRows) {
            ringCells.push(`${nc},${nr}`);
          }
        }
      }
      if (ringCells.length === 0) continue;

      const t1 = setTimeout(() => {
        setActiveCells(prev => {
          const next = new Map(prev);
          ringCells.forEach(k => next.set(k, (next.get(k) ?? 0) + 1));
          return next;
        });
        const t2 = setTimeout(() => {
          setActiveCells(prev => {
            const next = new Map(prev);
            ringCells.forEach(k => {
              const count = (next.get(k) ?? 0) - 1;
              if (count <= 0) next.delete(k);
              else next.set(k, count);
            });
            return next;
          });
        }, 480);
        timers.push(t2);
      }, ring * 65);
      timers.push(t1);
    }
  }, [getCellAt]);

  const totalCells = cols * rows;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        maskImage:
          "radial-gradient(ellipse 80% 85% at 35% 50%, black 15%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 85% at 35% 50%, black 15%, transparent 80%)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${rows}, ${CELL_SIZE}px)`,
          width: `${cols * CELL_SIZE}px`,
          height: `${rows * CELL_SIZE}px`,
        }}
      >
        {Array.from({ length: totalCells }, (_, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const key = `${col},${row}`;

          const isActive = activeCells.has(key);

          // Euclidean distance for circular glow — not Manhattan (which gives a cross/plus shape)
          const euclidDist = hoveredCell
            ? Math.sqrt(
                (hoveredCell.col - col) ** 2 + (hoveredCell.row - row) ** 2
              )
            : Infinity;
          const isNear = euclidDist <= 1.5;
          const isMid = euclidDist <= 2.8 && !isNear;

          const pulseDuration = 3.5 + ((i * 17) % 8) * 0.4;
          const pulseDelay = ((i * 41 + 7) % 31) * 0.35;

          let bg: string | undefined;
          if (isActive) {
            bg = "hsl(152 72% 22% / 0.50)";
          } else if (isNear) {
            bg = "hsl(152 72% 22% / 0.28)";
          } else if (isMid) {
            bg = "hsl(152 72% 22% / 0.13)";
          }

          return (
            <div
              key={key}
              style={{
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                border: "1px solid hsl(152 72% 22% / 0.11)",
                backgroundColor: bg,
                transition: isActive || isNear || isMid
                  ? "background-color 0.18s ease"
                  : "background-color 0.4s ease",
                ...(bg == null && {
                  animationDelay: `${pulseDelay}s`,
                  animationDuration: `${pulseDuration}s`,
                  animationName: "boxPulse",
                  animationIterationCount: "infinite",
                  animationTimingFunction: "ease-in-out",
                }),
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
