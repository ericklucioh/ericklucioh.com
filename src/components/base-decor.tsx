"use client";
import { useState, useEffect } from "react";
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
}: {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  x?: number;
  y?: number;
  children: React.ReactNode;
  enableRide?: boolean;
}) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => setScale(window.innerWidth <= 600 ? 0.1 : 1);
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: top ? `${y * scale}%` : "auto",
        bottom: bottom ? `${y * scale}%` : "auto",
        left: left ? `${x * scale}%` : "auto",
        right: right ? `${x * scale}%` : "auto",
      }}
      className={`${style["base-decor"]} ${enableRide ? style["ride-enabled"] : ""}`}
    >
      {children}
    </div>
  );
}
