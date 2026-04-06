import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/posts";

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
	const posts = await getAllPosts();
	const post = posts.find((item) => item.slug === slug);
	if (!post) notFound();

	return {
		title: `${post.title} | Blog`,
		description: post.excerpt,
	};
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	let post;
	try {
		post = await getPostBySlug(slug);
	} catch {
		notFound();
	}

	return (
		<SiteFrame mainClassName="w-full max-w-[780px] mx-auto px-[var(--page-gutter)] py-7 pb-[60px]">
			<p className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">
				{new Date(post.date).toLocaleDateString("pt-BR")}
			</p>
			<h1 className="ui-title">{post.title}</h1>
			{post.excerpt ? <p className="ui-subtitle">{post.excerpt}</p> : null}

			<article
				className="markdown ui-card ui-cardLg mt-12"
				dangerouslySetInnerHTML={{ __html: post.contentHtml }}
			/>
		</SiteFrame>
	);
}

