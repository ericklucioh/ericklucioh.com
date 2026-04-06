import { notFound } from "next/navigation";
import { Suspense } from "react";
import BlogIndex from "@/components/blog/BlogIndex";
import BlogIndexClient from "@/components/blog/BlogIndexClient";
import { isLang, type Lang } from "@/lib/i18n";
import { getAllTags, getBlogPosts } from "@/lib/content";

export default async function BlogPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLang(lang)) notFound();

	const posts = getBlogPosts();
	const tags = getAllTags();

	return (
		<Suspense fallback={<BlogIndex lang={lang as Lang} posts={posts} tags={tags} />}>
			<BlogIndexClient lang={lang as Lang} posts={posts} tags={tags} />
		</Suspense>
	);
}
