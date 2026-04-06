"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import styles from "./Menu.module.css";

type MenuProps = {
  buttons: { label: string; href: string }[];
};

export default function Menu(props: MenuProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { buttons } = props;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Logo size={30} />
          <span className={styles.brand}>Érick Lúcio</span>
        </div>

        <nav className={styles.navDesktop} aria-label="Primary">
          {buttons.map((btn, index) => (
            <Link key={index} href={btn.href} className={styles.link}>
              <span className={styles.hash}>#</span>
              {btn.label}
            </Link>
          ))}
        </nav>

        <div className={styles.right}>
          <button
            type="button"
            className={styles.navMobileButton}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "×" : "≡"}
          </button>
          <DarkModeToggle />
        </div>
      </header>

      {mobileOpen ? (
        <div className={styles.panel} aria-label="Mobile menu">
          <nav className={styles.panelList}>
            {buttons.map((btn, index) => (
              <Link
                key={index}
                href={btn.href}
                className={styles.link}
                onClick={() => setMobileOpen(false)}
              >
                <span className={styles.hash}>#</span>
                {btn.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
