import * as style from "@/app/styles/base-decor.module.css";

export default function BaseDecor({
  top,
  bottom,
  left,
  right,
  x = 40,
  y = 40,
  children,
  enableRide = false,
}:
{
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
    x?: number;
    y?: number;
    children: React.ReactNode;
    enableRide?: boolean;
}

) {
  return (

        <div
            style={{
                position: "absolute",
                pointerEvents: "none",
                top: top ? `${y}%` : "auto",
                bottom: bottom ? `${y}%` : "auto",
                left: left ? `${x}%` : "auto",
                right: right ? `${x}%` : "auto",
                // inset: 0,
            }}
                  className={`${style["base-decor"]} ${enableRide ? style["ride-enabled"] : ""}`}
            >
            {children}
        </div>
  );
}
