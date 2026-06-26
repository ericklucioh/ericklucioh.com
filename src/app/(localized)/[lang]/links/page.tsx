import type { Metadata } from "next";
import LinksBio from "@/components/links/LinksBio";
import { LANGS } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
	return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: "pt" | "en" }>;
}): Promise<Metadata> {
	const { lang } = await params;
	const isPt = lang === "pt";
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

export default async function Page({
	params,
}: {
	params: Promise<{ lang: "pt" | "en" }>;
}) {
	const { lang } = await params;
	return <LinksBio lang={lang} />;
}
