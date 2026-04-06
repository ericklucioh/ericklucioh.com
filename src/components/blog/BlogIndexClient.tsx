"use client";

import { useSearchParams } from "next/navigation";
import type { PostSummary } from "@/lib/posts";
import type { Lang } from "@/lib/i18n";
import BlogIndex from "@/components/blog/BlogIndex";

type BlogIndexClientProps = {
	lang: Lang;
	posts: PostSummary[];
	tags: string[];
};

export default function BlogIndexClient({ lang, posts, tags }: BlogIndexClientProps) {
	const searchParams = useSearchParams();
	const activeTag = searchParams.get("tag") ?? undefined;

	return <BlogIndex lang={lang} posts={posts} tags={tags} activeTag={activeTag} />;
}
