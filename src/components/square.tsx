"use client";
import { useState, useEffect } from "react";

type SquareProps = {
  sizeX?: number;
  sizeY?: number;
  borderWidth?: number;
};

export default function Square({
  sizeX = 100,
  sizeY = 100,
  borderWidth = 1,
}: SquareProps) {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsSmall(window.innerWidth <= 600);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const finalSizeX = isSmall ? sizeX * 0.8 : sizeX;
  const finalSizeY = isSmall ? sizeY * 0.8 : sizeY;
  const finalBorder = isSmall ? 0.5 : borderWidth;

  return (
    <>
      <style>{`
        @keyframes sambaSquare {
          0%   { transform: rotate(0deg) translate(0px,0px); }
          25%  { transform: rotate(0.8deg) translate(1px,-1px); }
          50%  { transform: rotate(0deg) translate(0px,1px); }
          75%  { transform: rotate(-0.8deg) translate(-1px,-1px); }
          100% { transform: rotate(0deg) translate(0px,0px); }
        }
      `}</style>

      <div
        className="square"
        style={{
          width: `${finalSizeX}px`,
          height: `${finalSizeY}px`,
          border: `${finalBorder}px solid var(--decor)`,
          animation: "sambaSquare 4s ease-in-out infinite",
        }}
      />
    </>
  );
}
