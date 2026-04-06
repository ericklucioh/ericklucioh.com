import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import { isLang, LANGS, type Lang } from "@/lib/i18n";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content";

export function generateStaticParams() {
	return LANGS.flatMap((lang) => getBlogPosts().map((post) => ({ lang, slug: post.slug })));
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ lang: string; slug: string }>;
}) {
	const { lang, slug } = await params;
	if (!isLang(lang)) notFound();

	const post = getBlogPostBySlug(slug);
	if (!post) notFound();

	return (
		<SiteFrame mainClassName="w-full max-w-[780px] mx-auto px-[var(--page-gutter)] py-7 pb-[60px]">
			<p className="mb-2 text-xs uppercase tracking-widest text-[var(--text-secondary)]">
				{new Date(post.publishedAt).toLocaleDateString(lang === "en" ? "en-US" : "pt-BR")}
			</p>
			<h1 className="ui-title">{post.title[lang as Lang]}</h1>
			<p className="ui-subtitle">{post.excerpt[lang as Lang]}</p>

			<article className="ui-card ui-cardLg space-y-4">
				{post.content[lang as Lang].map((paragraph) => (
					<p key={paragraph} className="leading-7 text-[var(--text-primary)]">
						{paragraph}
					</p>
				))}
			</article>
		</SiteFrame>
	);
}
