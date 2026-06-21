import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import MdxContent from "@/components/mdx/MdxContent";
import { isLang, LANGS, type Lang } from "@/lib/i18n";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/posts";
import { buildPageMetadata, resolveSocialImage } from "@/lib/metadata";

export async function generateStaticParams() {
	const slugs = await getPostSlugs();
	return LANGS.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
	const { lang, slug } = await params;
	if (!isLang(lang)) notFound();

	const posts = await getAllPosts(lang as Lang);
	const post = posts.find((item) => item.slug === slug);
	if (!post) notFound();

	return buildPageMetadata({
		lang: lang as Lang,
		title: `${post.title} | Blog`,
		description: post.excerpt,
		path: `/${lang}/blog/${slug}`,
		image: resolveSocialImage(post.ogImage),
		type: "article",
		alternates: {
			pt: `/pt/blog/${slug}`,
			en: `/en/blog/${slug}`,
		},
	});
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ lang: string; slug: string }>;
}) {
	const { lang, slug } = await params;
	if (!isLang(lang)) notFound();

	let post;
	try {
		post = await getPostBySlug(slug, lang as Lang);
	} catch {
		notFound();
	}

	return (
		<SiteFrame
			withDecor={false}
			mainClassName="w-full max-w-[980px] mx-auto px-4 md:px-6 py-7 pb-16"
		>
			<p className="mb-2 text-xs uppercase tracking-widest text-[var(--text-secondary)]">
				{new Date(post.date).toLocaleDateString(
					lang === "en" ? "en-US" : "pt-BR",
				)}
			</p>
			<h1 className="ui-title">{post.title}</h1>
			{post.excerpt ? (
				<p className="ui-subtitle">{post.excerpt}</p>
			) : null}

			<MdxContent
				Content={post.Content}
				className="markdown ui-card ui-cardLg mt-12"
			/>
		</SiteFrame>
	);
}
