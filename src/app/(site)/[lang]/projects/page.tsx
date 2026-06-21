import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { LANGS } from "@/lib/i18n";
import {
	buildProjectsMetadata,
	getCanonicalProjectsPath,
	renderProjectsPage,
} from "./projectRoutes";

export const dynamic = "error";
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
	const metadata = await buildProjectsMetadata(lang);
	if (lang !== "en") {
		return {
			...metadata,
			robots: {
				index: false,
				follow: false,
			},
		};
	}

	return metadata;
}

export default async function ProjectsPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (lang !== "en") {
		permanentRedirect(getCanonicalProjectsPath("pt"));
	}

	return renderProjectsPage(lang);
}
