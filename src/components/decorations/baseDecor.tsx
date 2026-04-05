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
  lockToInitialPx = false,
  desktopScale = 1,
  mobileScale = 1,
  mobileBreakpoint = 600,
}: {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  x?: number;
  y?: number;
  children: React.ReactNode;
  enableRide?: boolean;
  lockToInitialPx?: boolean;
  desktopScale?: number;
  mobileScale?: number;
  mobileBreakpoint?: number;
}) {
  const [decorScale, setDecorScale] = useState(1);
  const [lockedOffsets, setLockedOffsets] = useState<{ xPx: number; yPx: number } | null>(
    null,
  );

  useEffect(() => {
    const updateScale = () =>
      setDecorScale(window.innerWidth <= mobileBreakpoint ? mobileScale : desktopScale);
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [desktopScale, mobileBreakpoint, mobileScale]);

  useEffect(() => {
    if (!lockToInitialPx) {
      setLockedOffsets(null);
      return;
    }

    setLockedOffsets({
      xPx: (x / 100) * window.innerWidth,
      yPx: (y / 100) * window.innerHeight,
    });
  }, [lockToInitialPx, x, y]);

  const transformOrigin = (() => {
    const vertical = top ? "top" : bottom ? "bottom" : "center";
    const horizontal = left ? "left" : right ? "right" : "center";
    return `${horizontal} ${vertical}`;
  })();

  const xValue = lockToInitialPx
    ? lockedOffsets
      ? `${lockedOffsets.xPx}px`
      : "0px"
    : `${x}%`;
  const yValue = lockToInitialPx
    ? lockedOffsets
      ? `${lockedOffsets.yPx}px`
      : "0px"
    : `${y}%`;

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        visibility: lockToInitialPx && !lockedOffsets ? "hidden" : "visible",
        top: top ? yValue : "auto",
        bottom: bottom ? yValue : "auto",
        left: left ? xValue : "auto",
        right: right ? xValue : "auto",
        transform: `scale(${decorScale})`,
        transformOrigin,
      }}
      className={`${style["baseDecor"]} ${enableRide ? style["rideEnabled"] : ""}`}
    >
      {children}
    </div>
  );
}
