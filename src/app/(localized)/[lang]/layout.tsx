import type { Metadata, Viewport } from "next";
import { Fira_Code } from "next/font/google";
import { notFound } from "next/navigation";
import Providers from "@/app/providers";
import SiteChrome from "@/components/layout/SiteChrome";
import { copy, getLocalizedPath, isLang, LANGS } from "@/lib/i18n";
import {
	buildPageMetadata,
	SITE_EMAIL,
	SITE_GITHUB,
	SITE_LINKEDIN,
	SITE_NAME,
	SITE_URL,
} from "@/lib/metadata";
import "../../styles/globals.css";
import "../../styles/colors.tokens.css";
import "../../styles/colors.semantic.css";
import "highlight.js/styles/github-dark.css";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
};

const firaCode = Fira_Code({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	display: "swap",
	variable: "--font-fira-code",
});

const structuredData = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Person",
			"@id": `${SITE_URL}#person`,
			name: SITE_NAME,
			url: SITE_URL,
			email: `mailto:${SITE_EMAIL}`,
			jobTitle: "Software Developer",
			sameAs: [SITE_LINKEDIN, SITE_GITHUB],
		},
		{
			"@type": "WebSite",
			"@id": `${SITE_URL}#website`,
			url: SITE_URL,
			name: SITE_NAME,
			publisher: {
				"@id": `${SITE_URL}#person`,
			},
			inLanguage: ["pt-BR", "en-US"],
		},
	],
};

export const dynamicParams = false;

export function generateStaticParams() {
	return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string  }>;
}): Promise<Metadata> {
	const { lang } = await params;
	const safeLang = isLang(lang) ? lang : "pt";

	const isEnglish = safeLang === "en";

	const title = isEnglish
		? "Érick Lúcio | Backend + AI Developer"
		: "Érick Lúcio | Desenvolvedor Backend + IA";
	const description = isEnglish
		? "Backend and applied AI engineer building reliable APIs and production-ready solutions."
		: "Engenheiro de backend e IA aplicada, construindo APIs confiáveis e soluções prontas para produção.";

	return buildPageMetadata({
		lang: isEnglish ? "en" : "pt",
		title,
		description,
		path: `/${safeLang}`,
		image: "/og/default.svg",
		type: "website",
	});
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
		<html
			lang={lang === "en" ? "en-US" : "pt-BR"}
			className={firaCode.variable}
			suppressHydrationWarning
		>
			<head>
				<meta name="color-scheme" content="dark light" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>
			</head>
			<body className={firaCode.className}>
				<Providers>
					<SiteChrome
						buttons={[
							{
								label: nav.home,
								href: getLocalizedPath(lang, "home"),
							},
							{
								label: nav.about,
								href: getLocalizedPath(lang, "about"),
							},
							{
								label: nav.projects,
								href: getLocalizedPath(lang, "projects"),
							},
						]}
					>
						{children}
					</SiteChrome>
				</Providers>
			</body>
		</html>
	);
}
