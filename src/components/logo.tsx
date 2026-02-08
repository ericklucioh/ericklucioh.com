"use client";
import { useEffect, useState } from "react";

interface LogoProps {
  size?: number;
}

export default function Logo({ size = 70 }: LogoProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;

    // Inicializa o estado
    setDarkMode(html.classList.contains("dark"));

    // Cria o observer para escutar mudanças de classe
    const observer = new MutationObserver(() => {
      setDarkMode(html.classList.contains("dark"));
    });

    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    // Cleanup ao desmontar
    return () => observer.disconnect();
  }, []);

  const src = darkMode ? "/logoWhite.svg" : "/logoDark.svg";
  const alt = darkMode ? "Logo Dark" : "Logo Light";

  return <img id="logo" width={size} src={src} alt={alt} />;
}
