import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteChrome from "@/components/layout/SiteChrome";
import { copy, getLocalizedPath, isLang, LANGS } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
	return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;
	if (!isLang(lang)) notFound();

	const isEnglish = lang === "en";
	const title = isEnglish
		? "Érick Lúcio | Backend + AI Developer"
		: "Érick Lúcio | Desenvolvedor Backend + IA";
	const description = isEnglish
		? "Backend and applied AI engineer building reliable APIs and production-ready solutions."
		: "Engenheiro de backend e IA aplicada, construindo APIs confiáveis e soluções prontas para produção.";

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: `https://ericklucioh.com/${lang}`,
			siteName: "Érick Lúcio",
			images: [
				{
					url: "https://ericklucioh.com/foto.png",
					width: 1200,
					height: 630,
				},
			],
			locale: isEnglish ? "en_US" : "pt_BR",
			type: "website",
		},
		alternates: {
			languages: {
				"pt-BR": "/pt",
				"en-US": "/en",
			},
		},
	};
}

export default async function LangLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLang(lang)) notFound();

	const nav = copy[lang].nav;

	return (
		<SiteChrome
			buttons={[
				{ label: nav.home, href: getLocalizedPath(lang, "home") },
				{ label: nav.about, href: getLocalizedPath(lang, "about") },
				{ label: nav.projects, href: getLocalizedPath(lang, "projects") },
			]}
		>
			{children}
		</SiteChrome>
	);
}
