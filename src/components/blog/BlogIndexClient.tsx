"use client";

import { useSearchParams } from "next/navigation";
import type { BlogPost } from "@/lib/content";
import type { Lang } from "@/lib/i18n";
import BlogIndex from "@/components/blog/BlogIndex";

type BlogIndexClientProps = {
	lang: Lang;
	posts: BlogPost[];
	tags: string[];
};

export default function BlogIndexClient({ lang, posts, tags }: BlogIndexClientProps) {
	const searchParams = useSearchParams();
	const activeTag = searchParams.get("tag") ?? undefined;

	return <BlogIndex lang={lang} posts={posts} tags={tags} activeTag={activeTag} />;
}

