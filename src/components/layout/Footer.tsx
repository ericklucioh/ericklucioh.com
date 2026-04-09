"use client";

import Logo from "../ui/Logo";
import styles from "./Footer.module.css";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles.center}>© {year} Érick Lúcio</div>
			<nav className={styles.right} aria-label="Footer">
				<a className={styles.link} href="mailto:contato@ericklucioh.com">
					Email
				</a>
				<a
					className={styles.link}
					href="https://www.linkedin.com/in/ericklucioh/"
					target="_blank"
					rel="noreferrer"
				>
					LinkedIn
				</a>
				<a
					className={styles.link}
					href="https://github.com/ericklucioh"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</nav>
		</footer>
	);
}
