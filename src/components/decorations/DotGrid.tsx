"use client";
import { useState, useEffect } from "react";

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

  const finalRows = isSmall ? Math.max(1, rows) : rows;
  const finalCols = isSmall ? Math.max(1, cols) : cols;
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
      <style>{`
        @keyframes floatDot {
          0%   { transform: scale(1.2) translate(0px,0px); }
          50%  { transform: scale(1.3) translate(2px,-1px); }
          100% { transform: scale(1) translate(0px,0px); }
        }
      `}</style>

      {Array.from({ length: finalRows * finalCols }).map((_, i) => (
        <span
          key={i}
          style={{
            width: `${finalSize}px`,
            height: `${finalSize}px`,
            background: "var(--decor)",
            borderRadius: "50%",
            animation: `floatDot ${2 + (i % 5)}s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
