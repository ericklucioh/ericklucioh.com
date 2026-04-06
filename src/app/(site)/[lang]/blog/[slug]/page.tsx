import { notFound } from "next/navigation";
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
		<main className="mx-auto max-w-3xl p-6 md:p-10">
			<p className="mb-2 text-xs uppercase tracking-widest text-[var(--text-secondary)]">
				{new Date(post.publishedAt).toLocaleDateString(lang === "en" ? "en-US" : "pt-BR")}
			</p>
			<h1 className="mb-4 text-3xl font-semibold">{post.title[lang as Lang]}</h1>
			<p className="mb-8 text-[var(--text-secondary)]">{post.excerpt[lang as Lang]}</p>

			<article className="space-y-4 rounded-2xl border border-[var(--text-third)] p-6">
				{post.content[lang as Lang].map((paragraph) => (
					<p key={paragraph} className="leading-7 text-[var(--text-secondary)]">
						{paragraph}
					</p>
				))}
			</article>
		</main>
	);
}
