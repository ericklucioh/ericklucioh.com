"use client"; // necessário para usar useState/useEffect no App Router
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Inicializa o estado baseado na classe do html
  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));
  }, []);

  const toggleDark = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setIsDark(html.classList.contains("dark"));
    // opcional: salvar preferência no localStorage
    localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleDark}
      className="fixed top-4 right-4 z-50 p-2 rounded bg-gray-800 text-white dark:bg-gray-200 dark:text-black shadow-lg"
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
