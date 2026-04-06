"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import styleModel from "./DarkModeToggle.module.css";
const style = styleModel as any;

export default function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleDark = () => {
    const html = document.documentElement;
    html.classList.add("theme-transition");
    void html.offsetHeight;
    const currentDark = html.classList.contains("dark");
    const next = currentDark ? "light" : "dark";
    setTheme(next);
    window.setTimeout(() => html.classList.remove("theme-transition"), 320);
  };

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <label className={style.container}>
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleDark}
        id="toggle"
        suppressHydrationWarning
      />
      <span className={style.slider + " " + style.round}>
        <div className={style.background}></div>
        <div className={style.star}></div>
        <div className={style.star}></div>
      </span>
    </label>
  );
}
