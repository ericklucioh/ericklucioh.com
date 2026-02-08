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

  // Valores pequenos predefinidos
  const finalSizeX = isSmall ? sizeX * 0.8 : sizeX;
  const finalSizeY = isSmall ? sizeY * 0.8 : sizeY;
  const finalBorder = isSmall ? 0.5 : borderWidth;

  return (
    <div
      className="square"
      style={{
        
        width: `${finalSizeX}px`,
        height: `${finalSizeY}px`,
        border: `${finalBorder}px solid var(--decor)`,
      }}
    />
  );
}
