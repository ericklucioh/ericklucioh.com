"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import styles from "./Menu.module.css";

type MenuProps = {
	buttons: { label: string; href: string }[];
};

function swapLang(pathname: string, target: "pt" | "en") {
	const segments = pathname.split("/").filter(Boolean);
	if (segments[0] === "pt" || segments[0] === "en") {
		segments[0] = target;
		return `/${segments.join("/")}`;
	}
	return `/${target}`;
}

export default function Menu(props: MenuProps) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const { buttons } = props;
	const pathname = usePathname();

	const languageLinks = useMemo(
		() => ({
			pt: swapLang(pathname, "pt"),
			en: swapLang(pathname, "en"),
		}),
		[pathname],
	);

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
					<Link href={languageLinks.pt} className={styles.link}>
						PT
					</Link>
					<Link href={languageLinks.en} className={styles.link}>
						EN
					</Link>
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
						<div className={styles.link}>
							<Link href={languageLinks.pt} onClick={() => setMobileOpen(false)}>
								PT
							</Link>
							{" / "}
							<Link href={languageLinks.en} onClick={() => setMobileOpen(false)}>
								EN
							</Link>
						</div>
					</nav>
				</div>
			) : null}
		</>
	);
}
