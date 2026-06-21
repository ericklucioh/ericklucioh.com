import { redirect } from "next/navigation";
import { DEFAULT_LANG, swapLangPath } from "@/lib/i18n";
import { getPostSlugs } from "@/lib/posts";

export const dynamicParams = false;
export const dynamic = "error";

export async function generateStaticParams() {
	const slugs = await getPostSlugs();
	return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	redirect(swapLangPath(`/blog/${slug}`, DEFAULT_LANG));
}
