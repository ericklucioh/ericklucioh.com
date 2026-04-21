import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import MdxContent from "@/components/mdx/MdxContent";
import { isLang, LANGS } from "@/lib/i18n";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

export async function generateStaticParams() {
	const slugs = await getPostSlugs();
	return LANGS.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
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
		post = await getPostBySlug(slug);
	} catch {
		notFound();
	}

	return (
		<SiteFrame
			withDecor={false}
			mainClassName="w-full max-w-[980px] mx-auto px-4 md:px-6 py-7 pb-16"
		>
			<p className="mb-2 text-xs uppercase tracking-widest text-[var(--text-secondary)]">
				{new Date(post.date).toLocaleDateString(lang === "en" ? "en-US" : "pt-BR")}
			</p>
			<h1 className="ui-title">{post.title}</h1>
			{post.excerpt ? <p className="ui-subtitle">{post.excerpt}</p> : null}

			<MdxContent Content={post.Content} className="markdown ui-card ui-cardLg mt-12" />
		</SiteFrame>
	);
}
