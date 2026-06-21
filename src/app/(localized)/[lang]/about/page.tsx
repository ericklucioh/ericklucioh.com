import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS } from "@/lib/i18n";
import { buildAboutMetadata, renderAboutPage } from "./aboutRoutes";

export const dynamicParams = false;

export function generateStaticParams() {
	return LANGS.map((lang) => ({ lang }));
}

export default async function AboutPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!LANGS.includes(lang as (typeof LANGS)[number])) {
		notFound();
	}

	return renderAboutPage(lang);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;
	return buildAboutMetadata(lang);
}
