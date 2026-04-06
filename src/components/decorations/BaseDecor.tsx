"use client";
import { useState, useLayoutEffect } from "react";
import * as stylesImport from "@/app/styles/baseDecor.module.css";
const style = stylesImport as any;
export default function BaseDecor({
  top,
  bottom,
  left,
  right,
  x = 40,
  y = 40,
  xMobile,
  yMobile,
  children,
  enableRide = false,
  lockToInitialPx = false,
  zIndex = 0,
  desktopScale = 1,
  mobileScale = 1,
}: {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  x?: number;
  y?: number;
  xMobile?: number;
  yMobile?: number;
  children: React.ReactNode;
  enableRide?: boolean;
  lockToInitialPx?: boolean;
  zIndex?: number;
  desktopScale?: number;
  mobileScale?: number;
}) {
  const [lockedOffsets, setLockedOffsets] = useState<{ xPx: number; yPx: number } | null>(
    null,
  );

  useLayoutEffect(() => {
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
    : "var(--decor-x-current)";
  const yValue = lockToInitialPx
    ? lockedOffsets
      ? `${lockedOffsets.yPx}px`
      : "0px"
    : "var(--decor-y-current)";

  const cssVars = {
    "--decor-scale": `${desktopScale}`,
    "--decor-scale-mobile": `${mobileScale}`,
    "--decor-x": `${x}%`,
    ...(typeof xMobile === "number" ? { "--decor-x-mobile": `${xMobile}%` } : null),
    "--decor-y": `${y}%`,
    ...(typeof yMobile === "number" ? { "--decor-y-mobile": `${yMobile}%` } : null),
  } as any;

  return (
    <div
      data-decor
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex,
        visibility: lockToInitialPx && !lockedOffsets ? "hidden" : "visible",
        top: top ? yValue : "auto",
        bottom: bottom ? yValue : "auto",
        left: left ? xValue : "auto",
        right: right ? xValue : "auto",
        transform: "scale(var(--decor-scale-current))",
        transformOrigin,
        ...cssVars,
      }}
      className={`${style["baseDecor"]} ${enableRide ? style["rideEnabled"] : ""}`}
    >
      {children}
    </div>
  );
}
