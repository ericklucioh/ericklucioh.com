"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import styles from "./Menu.module.css";

type MenuProps = {
	lang?: "pt" | "en";
	labels?: {
		home: string;
		about: string;
		projects: string;
		links: string;
	};
	buttons: { label: string; href: string }[];
	cvHref?: string;
};

export default function Menu(props: MenuProps) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const pathname = usePathname();

	const { buttons, lang, cvHref } = props;
	const showLangToggle = lang === "pt" || lang === "en";

	const otherLang = lang === "pt" ? "en" : "pt";
	const otherLangLabel = otherLang.toUpperCase();
	const currentLangLabel = lang?.toUpperCase();

	const langSwitchHref = (() => {
		if (!showLangToggle) return "/";
		const prefix = `/${lang}`;
		if (pathname && pathname.startsWith(prefix)) {
			const rest = pathname.slice(prefix.length) || "";
			return `/${otherLang}${rest}`;
		}
		return `/${otherLang}`;
	})();

	return (
		<>
			<header className={styles.header}>
				<div className={styles.left}>
					<Logo size={30} />
					<span className={styles.brand}>Érick Lúcio</span>
				</div>

				<nav className={styles.navDesktop} aria-label="Primary">
					{buttons.map((btn, index) => (
						<Link
							key={index}
							href={btn.href}
							className={styles.link}
						>
							<span className={styles.hash}>#</span>
							{btn.label}
						</Link>
					))}
				</nav>

				<div className={styles.right}>
					{cvHref ? (
						<a
							className={styles.action}
							href={cvHref}
							target="_blank"
							rel="noreferrer"
						>
							CV
						</a>
					) : null}

					{showLangToggle ? (
						<Link className={styles.action} href={langSwitchHref}>
							{currentLangLabel} → {otherLangLabel}
						</Link>
					) : null}

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
						{cvHref ? (
							<a
								className={styles.action}
								href={cvHref}
								target="_blank"
								rel="noreferrer"
								onClick={() => setMobileOpen(false)}
							>
								CV
							</a>
						) : null}

						{showLangToggle ? (
							<Link
								className={styles.action}
								href={langSwitchHref}
								onClick={() => setMobileOpen(false)}
							>
								{currentLangLabel} → {otherLangLabel}
							</Link>
						) : null}

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
