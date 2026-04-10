import type { Metadata } from "next";
import Buttons from "@/components/linktree/Buttons";
import * as db from "@/app/linktree/db";
import BaseDecor from "@/components/decorations/BaseDecor";
import DotGrid from "@/components/decorations/DotGrid";
import Square from "@/components/decorations/Square";
import Logo from "@/components/ui/Logo";
import style from "@/app/linktree/page.module.css";

export const metadata: Metadata = {
	title: "Links | Érick Lúcio",
	description: "Links rápidos: portfólio, LinkedIn, GitHub e mais.",
};

export default function LinksBio() {
	return (
		<div
			className="relative flex min-h-[100dvh] w-full items-center justify-center px-[var(--page-gutter)]"
			style={{ paddingBlock: "clamp(24px, 8vh, 72px)" }}
		>
			<div
				aria-hidden="true"
				style={{
					position: "absolute",
					inset: 0,
					overflow: "clip",
					pointerEvents: "none",
				}}
			>
				<BaseDecor position="absolute" top left x={1} y={9}>
					<DotGrid rows={4} cols={6} gap={20} />
				</BaseDecor>
				<BaseDecor position="absolute" top left x={0} y={80}>
					<Square sizeX={90} sizeY={150} />
				</BaseDecor>
				<BaseDecor position="absolute" top left x={2} y={90}>
					<DotGrid rows={4} cols={6} gap={23} />
				</BaseDecor>
				<BaseDecor position="absolute" top right x={0} y={4}>
					<DotGrid rows={6} cols={4} gap={25} />
				</BaseDecor>
				<BaseDecor position="absolute" top right x={10} y={-1}>
					<Square sizeX={160} sizeY={60} />
				</BaseDecor>
				<BaseDecor position="absolute" top right x={-2} y={48}>
					<Square sizeX={90} sizeY={210} />
				</BaseDecor>
			</div>

			<main
				style={{ width: "100%", maxWidth: "600px" }}
				className="site-main relative z-10 flex flex-col items-center"
			>
				<article className="flex flex-col justify-center items-center">
					<div className="flex flex-row items-center gap-3">
						<Logo size={62} smallSize={0.6} />
						<h1 className={style.name}>Érick Lúcio</h1>
					</div>
					<p
						className={`${style.role} flex justify-center`}
						style={{ color: "var(--color-aux-blue)" }}
					>
						Desenvolvedor de Software
					</p>
				</article>

				<article style={{ marginTop: "50px", width: "100%" }}>
					<Buttons items={db.contents} />
				</article>
			</main>
		</div>
	);
}
