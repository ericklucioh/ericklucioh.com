"use client";
import BaseDecor from "@/components/decorations/BaseDecor";
import DotGrid from "@/components/decorations/DotGrid";
import Square from "@/components/decorations/Square";
import { DEFAULT_LANG, hasLangPrefix, swapLangPath } from "@/lib/i18n";
import { Button } from "@mui/material";
import styles from "@/app/styles/not-found.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function isPagePath(pathname: string) {
	if (!pathname.startsWith("/")) {
		return false;
	}

	const segments = pathname.split("/").filter(Boolean);
	const firstSegment = segments[0] ?? "";
	if (firstSegment === "_next" || firstSegment === "api") {
		return false;
	}

	return !firstSegment.includes(".") && !pathname.endsWith(".txt");
}

export default function NotFound() {
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (!pathname || hasLangPrefix(pathname) || !isPagePath(pathname)) {
			return;
		}

		router.replace(swapLangPath(pathname, DEFAULT_LANG));
	}, [pathname, router]);

	return (
		<>
			<BaseDecor bottom left x={6} y={9}>
				<Square sizeX={150} sizeY={110} />
			</BaseDecor>
			<BaseDecor top right x={10} y={-1}>
				<Square sizeX={200} sizeY={25} />
			</BaseDecor>
			<BaseDecor bottom right x={20} y={2}>
				<DotGrid rows={6} cols={8} gap={15} />
			</BaseDecor>
			<BaseDecor bottom right x={0} y={35} enableRide={true}>
				<DotGrid rows={6} cols={4} gap={15} size={3} />
			</BaseDecor>
			<BaseDecor top left x={7} y={2}>
				<DotGrid />
			</BaseDecor>

			<div className="flex min-h-screen w-full items-center justify-center p-6">
				<main className="site-main">
					<div className={styles.shell}>
						<section className={styles.kicker}>
							<p>
								<span className={styles.hash}>#</span>
								Sorry!
							</p>
						</section>

						<section className={styles["section-404"]}>
							<article className={styles.main}>
								<p className={styles["big-number"]}>
									<span>/</span>404
								</p>
								<p className={styles["small-text"]}>
									Page not Found
								</p>
							</article>
							<article className={styles["button-container"]}>
								<Button
									onClick={() => router.push(`/${DEFAULT_LANG}`)}
									className={styles["go-home-button"]}
								>
									Go home
								</Button>
							</article>
						</section>
					</div>
				</main>
			</div>
		</>
	);
}
