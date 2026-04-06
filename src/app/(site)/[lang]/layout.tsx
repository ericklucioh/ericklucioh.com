import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Menu from "@/components/layout/Menu";
import { copy, isLang, LANGS, type Lang } from "@/lib/i18n";

export function generateStaticParams() {
	return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;
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

	if (!isLang(lang)) {
		notFound();
	}

	const nav = copy[lang as Lang].nav;
	const cvHref = lang === "en" ? "/cv/Erick-Lucio-CV-EN.pdf" : "/cv/Erick-Lucio-CV-PT.pdf";

	return (
		<>
			<Menu
				buttons={[
					{ label: nav.home, href: `/${lang}` },
					{ label: nav.about, href: `/${lang}/about` },
					{ label: nav.projects, href: `/${lang}/projects` },
					{ label: nav.blog, href: `/${lang}/blog` },
					{ label: nav.links, href: `/${lang}/links` },
					{ label: nav.cv, href: cvHref },
				]}
			/>
			<div style={{ paddingTop: "var(--header-h)" }}>{children}</div>
		</>
	);
}
