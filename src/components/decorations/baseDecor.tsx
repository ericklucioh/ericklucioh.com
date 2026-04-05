"use client";
import { useState, useEffect } from "react";
import * as stylesImport from "@/app/styles/baseDecor.module.css";
const style = stylesImport as any;
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
  const [decorScale, setDecorScale] = useState(1);

  useEffect(() => {
    const updateScale = () => setDecorScale(window.innerWidth <= 600 ? 0.1 : 1);
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const transformOrigin = (() => {
    const vertical = top ? "top" : bottom ? "bottom" : "center";
    const horizontal = left ? "left" : right ? "right" : "center";
    return `${horizontal} ${vertical}`;
  })();

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: top ? `${y}%` : "auto",
        bottom: bottom ? `${y}%` : "auto",
        left: left ? `${x}%` : "auto",
        right: right ? `${x}%` : "auto",
        transform: `scale(${decorScale})`,
        transformOrigin,
      }}
      className={`${style["baseDecor"]} ${enableRide ? style["rideEnabled"] : ""}`}
    >
      {children}
    </div>
  );
}
