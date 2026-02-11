"use client";
import { useEffect, useState } from "react";

interface LogoProps {
  size?: number;
}

export default function Logo({ size = 70 }: LogoProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [finalSize, setFinalSize] = useState(size);

  // Detecta dark mode
  useEffect(() => {
    const html = document.documentElement;

    setDarkMode(html.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setDarkMode(html.classList.contains("dark"));
    });

    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  // Detecta largura da tela
  useEffect(() => {
    function updateSize() {
      if (window.innerWidth < 650) {
        setFinalSize(size * 0.6);
      } else {
        setFinalSize(size);
      }
    }

    updateSize(); // roda ao montar
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [size]);

  const src = darkMode ? "/logoWhite.svg" : "/logoDark.svg";
  const alt = darkMode ? "Logo Dark" : "Logo Light";

  return <img id="logo" width={finalSize} src={src} alt={alt} />;
}
