export default function DotGrid({
  rows = 5,
  cols = 5,
  size = 4,
  gap = 10,
  style = {},
  className = "",
}) {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${size}px)`,
        gridTemplateRows: `repeat(${rows}, ${size}px)`,
        gap: `${gap}px`,
        // position: "absolute",
        ...style,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span
          key={i}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: "white",
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
}
