import type { Metadata } from "next";
import Buttons from "@/components/linktree/Buttons";
import DecorLayer from "@/components/decorations/DecorLayer";
import DecorRenderer from "@/components/decorations/DecorRenderer";
import { linksDecorItems } from "@/components/decorations/decorConfigs";
import Logo from "@/components/ui/Logo";
import style from "./LinksBio.module.css";
import { contents } from "./linksData";

const linksCopy = {
	pt: {
		role: "Desenvolvedor de Software",
	},
	en: {
		role: "Software Developer",
	},
} as const;

export const metadata: Metadata = {
	title: "Links | Érick Lúcio",
	description: "Links rápidos: portfólio, LinkedIn, GitHub e mais.",
};

export default function LinksBio({ lang }: { lang: "pt" | "en" }) {
	const t = linksCopy[lang];

	return (
		<div
			className="relative flex min-h-[100dvh] w-full items-center justify-center px-[var(--page-gutter)]"
			style={{ paddingBlock: "clamp(24px, 8vh, 72px)" }}
		>
			<DecorLayer>
				<DecorRenderer items={linksDecorItems} />
			</DecorLayer>

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
						{t.role}
					</p>
				</article>

				<article style={{ marginTop: "50px", width: "100%" }}>
					<Buttons items={contents} />
				</article>
			</main>
		</div>
	);
}
