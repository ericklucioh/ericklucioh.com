export default function BaseDecor({
  top,
  bottom,
  left,
  right,
  x = 40,
  y = 40,
  children,
}:
{
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
    x?: number;
    y?: number;
    children: React.ReactNode;
}

) {
  return (

        <div
            style={{
                position: "fixed",
                pointerEvents: "none",
                top: top ? `${y}px` : "auto",
                bottom: bottom ? `${y}px` : "auto",
                left: left ? `${x}px` : "auto",
                right: right ? `${x}px` : "auto",
                // inset: 0,
            }}
            >
            {children}
        </div>
  );
}
