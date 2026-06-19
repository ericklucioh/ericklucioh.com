import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import {
	buildProjectsMetadata,
	getCanonicalProjectsPath,
	renderProjectsPage,
} from "../projects/projectRoutes";

export const dynamic = "error";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;
	const metadata = await buildProjectsMetadata(lang);
	if (lang !== "pt") {
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

export default async function ProjetosPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (lang !== "pt") {
		permanentRedirect(getCanonicalProjectsPath("en"));
	}

	return renderProjectsPage(lang);
}
