import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import {
	buildAboutMetadata,
	getCanonicalAboutPath,
	renderAboutPage,
} from "../about/aboutRoutes";

export default async function SobrePage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (lang !== "pt") {
		permanentRedirect(getCanonicalAboutPath("en"));
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
