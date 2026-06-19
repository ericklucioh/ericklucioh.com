"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import styleModel from "./DarkModeToggle.module.css";
const style = styleModel as any;
const THEME_FADE_IN_MS = 120;
const THEME_FADE_OUT_MS = 120;
const THEME_TRANSITION_TOTAL_MS = THEME_FADE_IN_MS + THEME_FADE_OUT_MS;

export default function DarkModeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [isSpinning, setIsSpinning] = useState(false);
	const transitionTimersRef = useRef<number[]>([]);

	const isDark = resolvedTheme === "dark";

	useEffect(() => {
		return () => {
			transitionTimersRef.current.forEach((timerId) =>
				window.clearTimeout(timerId),
			);
		};
	}, []);

	const toggleTheme = () => {
		const currentlyDark =
			document.documentElement.classList.contains("dark");
		const targetMode = currentlyDark ? "light" : "dark";
		const html = document.documentElement;
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		transitionTimersRef.current.forEach((timerId) =>
			window.clearTimeout(timerId),
		);
		transitionTimersRef.current = [];

		if (prefersReducedMotion) {
			setTheme(targetMode);
			return;
		}

		html.classList.add("theme-transition");
		setIsSpinning(false);
		window.requestAnimationFrame(() => setIsSpinning(true));

		window.requestAnimationFrame(() => {
			html.classList.add("theme-transition-active");
		});

		transitionTimersRef.current.push(
			window.setTimeout(() => {
				setTheme(targetMode);
				html.classList.remove("theme-transition-active");
			}, THEME_FADE_IN_MS),
		);

		transitionTimersRef.current.push(
			window.setTimeout(() => {
				html.classList.remove("theme-transition");
				transitionTimersRef.current = [];
			}, THEME_TRANSITION_TOTAL_MS),
		);
	};

	return (
		<button
			type="button"
			className={style.button}
			onClick={toggleTheme}
			aria-label="Alternar tema"
			aria-pressed={isDark}
			suppressHydrationWarning
		>
			<span
				className={`${style.iconWrap} ${isSpinning ? style.spinning : ""}`}
				aria-hidden="true"
				onAnimationEnd={() => setIsSpinning(false)}
			>
				<svg className={style.sun} viewBox="0 0 24 24">
					<path d="M12 4V2m0 20v-2m8-8h2M2 12h2m14.95-6.95 1.41-1.41M3.64 20.36l1.41-1.41m0-13.9L3.64 3.64m16.72 16.72-1.41-1.41M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
				</svg>
				<svg className={style.moon} viewBox="0 0 24 24">
					<path d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5z" />
				</svg>
			</span>
		</button>
	);
}
