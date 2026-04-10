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
  const [activeCells, setActiveCells] = useState<Set<string>>(new Set());
  const nextId = useRef(0);

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
    if (!origin) return;
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const currentCols = Math.ceil(width / CELL_SIZE) + 1;
    const currentRows = Math.ceil(height / CELL_SIZE) + 1;

    const MAX_RING = 5;
    const rippleId = nextId.current++;

    for (let ring = 0; ring <= MAX_RING; ring++) {
      const ring_cells: string[] = [];
      for (let dc = -ring; dc <= ring; dc++) {
        const absDr = ring - Math.abs(dc);
        const deltas = absDr === 0 ? [0] : [-absDr, absDr];
        for (const dr of deltas) {
          const nc = origin.col + dc;
          const nr = origin.row + dr;
          if (nc >= 0 && nc < currentCols && nr >= 0 && nr < currentRows) {
            ring_cells.push(`${rippleId}:${nc},${nr}`);
          }
        }
      }
      const delay = ring * 65;
      setTimeout(() => {
        setActiveCells(prev => {
          const next = new Set(prev);
          ring_cells.forEach(k => next.add(k));
          return next;
        });
        setTimeout(() => {
          setActiveCells(prev => {
            const next = new Set(prev);
            ring_cells.forEach(k => next.delete(k));
            return next;
          });
        }, 480);
      }, delay);
    }
  }, [getCellAt]);

  const totalCells = cols * rows;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden cursor-crosshair"
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

          const isActive = Array.from(activeCells).some(k => k.endsWith(`:${col},${row}`));
          const dist = hoveredCell
            ? Math.abs(hoveredCell.col - col) + Math.abs(hoveredCell.row - row)
            : Infinity;
          const isNear = dist <= 1;
          const isMid = dist === 2;

          const pulseDuration = 3.5 + ((i * 17) % 8) * 0.4;
          const pulseDelay = ((i * 41 + 7) % 31) * 0.35;

          let bg: string | undefined;
          if (isActive) {
            bg = "hsl(152 72% 22% / 0.50)";
          } else if (isNear) {
            bg = "hsl(152 72% 22% / 0.28)";
          } else if (isMid) {
            bg = "hsl(152 72% 22% / 0.14)";
          }

          return (
            <div
              key={`${col},${row}`}
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
