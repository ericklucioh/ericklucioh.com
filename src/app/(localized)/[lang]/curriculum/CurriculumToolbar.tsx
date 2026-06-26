"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import { swapLangPath, type Lang } from "@/lib/i18n";
import styles from "./page.module.css";

type CurriculumToolbarProps = {
	lang: Lang;
};

export default function CurriculumToolbar({ lang }: CurriculumToolbarProps) {
	const pathname = usePathname() ?? `/${lang}/curriculum`;
	const otherLang = lang === "pt" ? "en" : "pt";
	const otherHref = swapLangPath(pathname, otherLang);
	const currentHref = swapLangPath(pathname, lang);

	return (
		<div className={styles.toolbar}>
			<div className={styles.toolbarGroup}>
				<Link
					href={currentHref}
					className={`${styles.toolbarButton} ${styles.toolbarButtonActive}`}
				>
					{lang.toUpperCase()}
				</Link>
				<Link href={otherHref} className={styles.toolbarButton}>
					{otherLang.toUpperCase()}
				</Link>
			</div>
			<div className={styles.toolbarGroup}>
				<button
					type="button"
					className={styles.toolbarButton}
					onClick={() => window.print()}
				>
					Imprimir
				</button>
				<DarkModeToggle />
			</div>
		</div>
	);
}
