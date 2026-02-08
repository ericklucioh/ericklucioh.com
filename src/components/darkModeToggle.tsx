"use client";
import { useEffect, useState } from "react";
import styleModel from "./logo.module.css";
const style = styleModel as any;

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Inicializa o estado baseado no localStorage ou na classe do html
  useEffect(() => {
    const html = document.documentElement;

    // Lê preferência salva no localStorage
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      html.classList.add("dark");
      setIsDark(true);
    } else if (savedTheme === "light") {
      html.classList.remove("dark");
      setIsDark(false);
    } else {
      // Caso não tenha nada salvo, usa a classe do html (ex: do sistema ou server)
      const currentDark = html.classList.contains("dark");
      setIsDark(currentDark);
    }
  }, []);

  const toggleDark = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    const dark = html.classList.contains("dark");
    setIsDark(dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  };

  return (
    <label className={style.container}>
      <input type="checkbox" checked={isDark} onChange={toggleDark} id="toggle"/>
      <span className={style.slider + " " + style.round}>
        <div className={style.background}></div>
        <div className={style.star}></div>
        <div className={style.star}></div>
      </span>
    </label>
  );
}
