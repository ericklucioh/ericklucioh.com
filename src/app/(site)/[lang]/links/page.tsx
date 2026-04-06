import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Buttons from "@/components/linktree/Buttons";
import * as db from "@/app/linktree/db";
import BaseDecor from "@/components/decorations/BaseDecor";
import DotGrid from "@/components/decorations/DotGrid";
import Square from "@/components/decorations/Square";
import Logo from "@/components/ui/Logo";
import style from "@/app/linktree/page.module.css";

export const dynamicParams = false;

export async function generateMetadata({
	params,
}: {
	params: { lang: "pt" | "en" };
}): Promise<Metadata> {
	const isPt = params.lang === "pt";
	return {
		title: isPt ? "Links | Érick Lúcio" : "Links | Érick Lúcio",
		description: isPt
			? "Links rápidos: portfólio, LinkedIn, GitHub e mais."
			: "Quick links: portfolio, LinkedIn, GitHub, and more.",
		alternates: {
			languages: {
				"pt-BR": "/pt/links",
				"en-US": "/en/links",
			},
		},
	};
}

export default function Page({ params }: { params: { lang: "pt" | "en" } }) {
	if (params.lang === "en") {
		redirect("/pt/links");
	}

	const isPt = params.lang === "pt";

	return (
		<div
			style={{
				width: "100%",
				height: "100dvh",
			}}
			className="flex justify-center items-center h-screen"
		>
			<BaseDecor top left x={1} y={10}>
				<DotGrid rows={4} cols={6} gap={20} />
			</BaseDecor>
			<BaseDecor bottom left x={2} y={18}>
				<DotGrid rows={4} cols={6} gap={23} />
			</BaseDecor>
			<BaseDecor bottom left x={-1} y={5}>
				<Square sizeX={90} sizeY={150} />
			</BaseDecor>
			<BaseDecor bottom right x={-2} y={10}>
				<Square sizeX={90} sizeY={210} />
			</BaseDecor>

			<BaseDecor top right x={0} y={2}>
				<DotGrid rows={6} cols={4} gap={25} />
			</BaseDecor>

			<BaseDecor top right x={5} y={-1}>
				<Square sizeX={160} sizeY={60} />
			</BaseDecor>

			<main
				style={{ width: "100%", maxWidth: "600px", margin: "10%" }}
				className="flex flex-col items-center"
			>
				<article className="flex flex-col justify-center items-center">
					<div className="flex direct-row">
						<Logo size={62} smallSize={0.6} />
						<h1 className={style.name}>Érick Lúcio</h1>
					</div>
					<p
						className={`${style.role} flex justify-center`}
						style={{ color: "var(--color-aux-blue)" }}
					>
						{isPt ? "Desenvolvedor de Software" : "Software Developer"}
					</p>
				</article>

				<article style={{ marginTop: "50px", width: "100%" }}>
					<Buttons items={db.contents} />
				</article>
			</main>
		</div>
	);
}
