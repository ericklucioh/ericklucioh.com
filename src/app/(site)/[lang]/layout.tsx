import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Menu from "@/components/layout/Menu";

const SUPPORTED_LANGS = ["pt", "en"] as const;
type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export const dynamicParams = false;

export function generateStaticParams() {
	return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

function isSupportedLang(lang: string): lang is SupportedLang {
	return (SUPPORTED_LANGS as readonly string[]).includes(lang);
}

export async function generateMetadata({
	params,
}: {
	params: { lang: string };
}): Promise<Metadata> {
	const lang = params.lang;
	if (!isSupportedLang(lang)) notFound();

	const isPt = lang === "pt";
	const title = isPt
		? "Érick Lúcio | Desenvolvedor Backend"
		: "Érick Lúcio | Backend Developer";
	const description = isPt
		? "Portfólio de Érick Lúcio — backend, APIs, dados e IA aplicada (RAG)."
		: "Érick Lúcio portfolio — backend, APIs, data, and applied AI (RAG).";

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			locale: isPt ? "pt_BR" : "en_US",
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

export default function LangLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { lang: string };
}) {
	const lang = params.lang;
	if (!isSupportedLang(lang)) notFound();

	const labels =
		lang === "pt"
			? { home: "home", about: "sobre", projects: "projetos", links: "links" }
			: { home: "home", about: "about", projects: "projects", links: "links" };

	return (
		<>
			<Menu
				lang={lang}
				labels={labels}
				buttons={[
					{ label: labels.home, href: `/${lang}` },
					{ label: labels.about, href: `/${lang}/about` },
					{ label: labels.projects, href: `/${lang}/projects` },
					{ label: labels.links, href: `/${lang}/links` },
				]}
				cvHref={lang === "pt" ? "/cv/Erick-Lucio-CV-PT.pdf" : "/cv/Erick-Lucio-CV-EN.pdf"}
			/>
			<div style={{ paddingTop: "var(--header-h)" }}>{children}</div>
		</>
	);
}

