import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import {
	buildProjectMetadata,
	generateProjectStaticParams,
	getCanonicalProjectPath,
	renderProjectPage,
} from "../../projects/projectRoutes";

export const dynamic = "error";
export const dynamicParams = false;

export async function generateStaticParams() {
	return generateProjectStaticParams();
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
	const { lang, slug } = await params;
	const metadata = await buildProjectMetadata(lang, slug);
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

export default async function ProjetoPage({
	params,
}: {
	params: Promise<{ lang: string; slug: string }>;
}) {
	const { lang, slug } = await params;
	if (lang !== "pt") {
		permanentRedirect(getCanonicalProjectPath("en", slug));
	}

	return renderProjectPage(lang, slug);
}
