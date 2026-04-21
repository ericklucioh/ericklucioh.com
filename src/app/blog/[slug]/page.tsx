import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import MdxContent from "@/components/mdx/MdxContent";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/posts";
import { buildPageMetadata, resolveSocialImage } from "@/lib/metadata";

export const dynamicParams = false;
export const dynamic = "error";

export async function generateStaticParams() {
	const slugs = await getPostSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const posts = await getAllPosts("pt");
	const post = posts.find((item) => item.slug === slug);
	if (!post) notFound();

	return buildPageMetadata({
		lang: "pt",
		title: `${post.title} | Blog`,
		description: post.excerpt,
		path: `/blog/${slug}`,
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
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	let post;
	try {
		post = await getPostBySlug(slug, "pt");
	} catch {
		notFound();
	}

	return (
		<SiteFrame mainClassName="w-full max-w-[980px] mx-auto px-4 md:px-6 py-7 pb-16">
			<p className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">
				{new Date(post.date).toLocaleDateString("pt-BR")}
			</p>
			<h1 className="ui-title">{post.title}</h1>
			{post.excerpt ? <p className="ui-subtitle">{post.excerpt}</p> : null}

			<MdxContent Content={post.Content} className="markdown ui-card ui-cardLg mt-12" />
		</SiteFrame>
	);
}
