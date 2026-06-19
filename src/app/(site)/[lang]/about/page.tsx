import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import {
	buildAboutMetadata,
	getCanonicalAboutPath,
	renderAboutPage,
} from "./aboutRoutes";

export default async function AboutPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (lang !== "en") {
		permanentRedirect(getCanonicalAboutPath("pt"));
	}

	return renderAboutPage(lang);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;
	const metadata = await buildAboutMetadata(lang);
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
