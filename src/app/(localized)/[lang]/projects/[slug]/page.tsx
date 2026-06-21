import type { Metadata } from "next";
import {
	buildProjectMetadata,
	generateProjectStaticParams,
	renderProjectPage,
} from "../projectRoutes";

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
	return buildProjectMetadata(lang, slug);
}

export default async function ProjectCasePage({
	params,
}: {
	params: Promise<{ lang: string; slug: string }>;
}) {
	const { lang, slug } = await params;
	return renderProjectPage(lang, slug);
}
