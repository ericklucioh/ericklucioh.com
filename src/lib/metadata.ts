import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n";

export const SITE_URL = "https://ericklucioh.com";
export const SITE_NAME = "Érick Lúcio";
export const DEFAULT_OG_IMAGE = "/og/default.svg";
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

const LOCALE_BY_LANG: Record<Lang, string> = {
	pt: "pt_BR",
	en: "en_US",
};

const LANGUAGE_BY_LANG: Record<Lang, string> = {
	pt: "pt-BR",
	en: "en-US",
};

export type PageMetadataInput = {
	lang: Lang;
	title: string;
	description?: string;
	path: string;
	image?: string;
	type?: "website" | "article";
	siteName?: string;
	alternates?: Partial<Record<Lang, string>>;
};

export function buildPageMetadata({
	lang,
	title,
	description,
	path,
	image,
	type = "website",
	siteName = SITE_NAME,
	alternates,
}: PageMetadataInput): Metadata {
	const socialImage = image ?? DEFAULT_OG_IMAGE;
	const languages = alternates
		? Object.fromEntries(
				Object.entries(alternates).flatMap(([locale, href]) => {
					if (!href) return [];
					return [[LANGUAGE_BY_LANG[locale as Lang], href]];
				}),
			)
		: undefined;

	return {
		metadataBase: new URL(SITE_URL),
		title,
		description,
		alternates: languages
			? {
					canonical: path,
					languages,
				}
			: undefined,
		openGraph: {
			title,
			description,
			url: path,
			siteName,
			images: [
				{
					url: socialImage,
					width: DEFAULT_OG_IMAGE_WIDTH,
					height: DEFAULT_OG_IMAGE_HEIGHT,
					alt: title,
				},
			],
			locale: LOCALE_BY_LANG[lang],
			type,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [socialImage],
		},
	};
}

export function buildRootMetadata() {
	return buildPageMetadata({
		lang: "pt",
		title: "Érick Lúcio | Developer",
		description: "Personal website of Érick Lúcio, a software developer.",
		path: "/",
		image: DEFAULT_OG_IMAGE,
		type: "website",
	});
}

export function resolveSocialImage(primary?: string, fallback?: string) {
	return primary ?? fallback ?? DEFAULT_OG_IMAGE;
}
