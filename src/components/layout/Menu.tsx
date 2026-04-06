"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import styles from "./Menu.module.css";

type MenuItem = {
	label: string;
	href: string;
	external?: boolean;
};

type MenuProps = {
	buttons: MenuItem[];
	actions?: MenuItem[];
};

function swapLang(pathname: string, target: "pt" | "en") {
	const segments = pathname.split("/").filter(Boolean);
	if (segments[0] === "pt" || segments[0] === "en") {
		segments[0] = target;
		return `/${segments.join("/")}`;
	}
	return `/${target}`;
}

function isExternalLink(item: MenuItem) {
	return item.external ?? (item.href.startsWith("http") || item.href.endsWith(".pdf"));
}

export default function Menu(props: MenuProps) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const { buttons, actions } = props;
	const pathname = usePathname();

	const languageLinks = useMemo(
		() => ({
			pt: swapLang(pathname, "pt"),
			en: swapLang(pathname, "en"),
		}),
		[pathname],
	);

	function renderItem(item: MenuItem, className: string) {
		if (isExternalLink(item)) {
			return (
				<a
					key={`${item.label}-${item.href}`}
					className={className}
					href={item.href}
					target="_blank"
					rel="noreferrer"
				>
					{item.label}
				</a>
			);
		}

		return (
			<Link
				key={`${item.label}-${item.href}`}
				href={item.href}
				className={className}
			>
				{item.label}
			</Link>
		);
	}

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
					{actions?.map((item) => renderItem(item, styles.action))}

					<Link href={languageLinks.pt} className={styles.action}>
						PT
					</Link>
					<Link href={languageLinks.en} className={styles.action}>
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
						{actions?.map((item) =>
							isExternalLink(item) ? (
								<a
									key={`${item.label}-${item.href}`}
									className={styles.action}
									href={item.href}
									target="_blank"
									rel="noreferrer"
									onClick={() => setMobileOpen(false)}
								>
									{item.label}
								</a>
							) : (
								<Link
									key={`${item.label}-${item.href}`}
									className={styles.action}
									href={item.href}
									onClick={() => setMobileOpen(false)}
								>
									{item.label}
								</Link>
							),
						)}

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
							</Link>{" "}
							/{" "}
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
