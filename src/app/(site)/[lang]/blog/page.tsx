import { notFound } from "next/navigation";
import { Suspense } from "react";
import SiteFrame from "@/components/layout/SiteFrame";
import BlogIndex from "@/components/blog/BlogIndex";
import BlogIndexClient from "@/components/blog/BlogIndexClient";
import { isLang, type Lang } from "@/lib/i18n";
import { getAllPosts } from "@/lib/posts";

export default async function BlogPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLang(lang)) notFound();

	const posts = await getAllPosts();
	const tags = Array.from(new Set(posts.flatMap((post) => post.tags ?? []))).sort();

	return (
		<SiteFrame withDecor={false}>
			<Suspense fallback={<BlogIndex lang={lang as Lang} posts={posts} tags={tags} />}>
				<BlogIndexClient lang={lang as Lang} posts={posts} tags={tags} />
			</Suspense>
		</SiteFrame>
	);
}
