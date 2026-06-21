import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SiteFrame from "@/components/layout/SiteFrame";
import BlogIndex from "@/components/blog/BlogIndex";
import BlogIndexClient from "@/components/blog/BlogIndexClient";
import { isLang, LANGS, type Lang } from "@/lib/i18n";
import { getAllPosts } from "@/lib/posts";
import { buildPageMetadata } from "@/lib/metadata";

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
	if (!isLang(lang)) notFound();

	const title = lang === "en" ? "Blog | Érick Lúcio" : "Blog | Érick Lúcio";
	const description =
		lang === "en"
			? "MDX posts about backend, AI, and software delivery."
			: "Posts em MDX sobre backend, IA e entrega de software.";

	return buildPageMetadata({
		lang: lang as Lang,
		title,
		description,
		path: `/${lang}/blog`,
		image: "/og/blog.svg",
		type: "website",
		alternates: {
			pt: "/pt/blog",
			en: "/en/blog",
		},
	});
}

export default async function BlogPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLang(lang)) notFound();

	const posts = await getAllPosts(lang as Lang);
	const tags = Array.from(
		new Set(posts.flatMap((post) => post.tags ?? [])),
	).sort();

	return (
		<SiteFrame withDecor={false}>
			<Suspense
				fallback={
					<BlogIndex lang={lang as Lang} posts={posts} tags={tags} />
				}
			>
				<BlogIndexClient
					lang={lang as Lang}
					posts={posts}
					tags={tags}
				/>
			</Suspense>
		</SiteFrame>
	);
}
