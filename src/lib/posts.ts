import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache, type ComponentType } from "react";
import { compileMdxToComponent } from "@/lib/mdx";

export type PostFrontmatter = {
	title: string;
	date: string; // YYYY-MM-DD (string to keep build deterministic)
	excerpt?: string;
	tags?: string[];
};

export type PostSummary = PostFrontmatter & {
	slug: string;
};

export type Post = PostSummary & {
	Content: ComponentType<any>;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

export const getPostSlugs = cache(async function getPostSlugs() {
	const entries = await fs.readdir(postsDirectory, { withFileTypes: true });
	return entries
		.filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
		.map((entry) => entry.name.replace(/\.mdx$/, ""));
});

function assertFrontmatter(data: unknown, slug: string): PostFrontmatter {
	if (!data || typeof data !== "object") {
		throw new Error(`Invalid frontmatter for "${slug}"`);
	}

	const record = data as Record<string, unknown>;
	const title = record.title;
	const date = record.date;

	if (typeof title !== "string" || title.trim().length === 0) {
		throw new Error(`Missing "title" in frontmatter for "${slug}"`);
	}
	if (typeof date !== "string" || date.trim().length === 0) {
		throw new Error(`Missing "date" in frontmatter for "${slug}"`);
	}

	const excerpt = typeof record.excerpt === "string" ? record.excerpt : undefined;
	const tags = Array.isArray(record.tags) ? record.tags.filter((t) => typeof t === "string") : undefined;

	return { title, date, excerpt, tags };
}

export const getPostBySlug = cache(async function getPostBySlug(slug: string): Promise<Post> {
	const fullPath = path.join(postsDirectory, `${slug}.mdx`);
	const file = await fs.readFile(fullPath, "utf8");
	const { data, content } = matter(file);

	const frontmatter = assertFrontmatter(data, slug);
	const Content = await compileMdxToComponent(content);

	return {
		slug,
		...frontmatter,
		Content,
	};
});

export const getAllPosts = cache(async function getAllPosts(): Promise<PostSummary[]> {
	const slugs = await getPostSlugs();
	const posts = await Promise.all(
		slugs.map(async (slug) => {
			const fullPath = path.join(postsDirectory, `${slug}.mdx`);
			const file = await fs.readFile(fullPath, "utf8");
			const { data } = matter(file);
			const frontmatter = assertFrontmatter(data, slug);
			return { slug, ...frontmatter };
		}),
	);

	return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
});
