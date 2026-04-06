"use client";
import { useEffect, useState } from "react";

interface LogoProps {
  size?: number;
  smallSize?: number;
}

export default function Logo({ size = 70, smallSize = 1 }: LogoProps) {
  const [finalSize, setFinalSize] = useState(size);

  // Detecta largura da tela
  useEffect(() => {
    function updateSize() {
      if (window.innerWidth < 600) {
        setFinalSize(size * smallSize);
      } else {
        setFinalSize(size);
      }
    }

    updateSize(); // roda ao montar
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [size, smallSize]);

  return (
    <>
      <img
        id="logo"
        width={finalSize}
        src="/logoDark.svg"
        alt="Logo"
        className="dark:hidden"
      />
      <img
        id="logo"
        width={finalSize}
        src="/logoWhite.svg"
        alt="Logo"
        className="hidden dark:block"
      />
    </>
  );
}
