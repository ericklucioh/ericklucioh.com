"use client";
import { useState, useEffect, use } from "react";

export default function DotGrid({
  rows = 5,
  cols = 5,
  size = 4,
  gap = 10,
  style = {},
  className = "",
}: {
  rows?: number;
  cols?: number;
  size?: number;
  gap?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsSmall(window.innerWidth <= 600);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Valores normais e pequenos
  const finalRows = isSmall ? Math.max(1, rows - 0) : rows;
  const finalCols = isSmall ? Math.max(1, cols - 0) : cols;
  const finalSize = isSmall ? Math.max(1, size - 1) : size;
  const finalGap = isSmall ? Math.max(2, gap - 1) : gap;

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${finalCols}, ${finalSize}px)`,
        gridTemplateRows: `repeat(${finalRows}, ${finalSize}px)`,
        gap: `${finalGap}px`,
        ...style,
      }}
    >
      {Array.from({ length: finalRows * finalCols }).map((_, i) => (
        <span
          key={i}
          style={{
            width: `${finalSize}px`,
            height: `${finalSize}px`,
            background: "white",
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
}
