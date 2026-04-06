import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

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
	contentHtml: string;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

export async function getPostSlugs() {
	const entries = await fs.readdir(postsDirectory, { withFileTypes: true });
	return entries
		.filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
		.map((entry) => entry.name.replace(/\.md$/, ""));
}

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

async function markdownToHtml(markdown: string) {
	const result = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeHighlight, { detect: true, ignoreMissing: true })
		.use(rehypeStringify)
		.process(markdown);

	return String(result);
}

export async function getPostBySlug(slug: string): Promise<Post> {
	const fullPath = path.join(postsDirectory, `${slug}.md`);
	const file = await fs.readFile(fullPath, "utf8");
	const { data, content } = matter(file);

	const frontmatter = assertFrontmatter(data, slug);
	const contentHtml = await markdownToHtml(content);

	return {
		slug,
		...frontmatter,
		contentHtml,
	};
}

export async function getAllPosts(): Promise<PostSummary[]> {
	const slugs = await getPostSlugs();
	const posts = await Promise.all(
		slugs.map(async (slug) => {
			const fullPath = path.join(postsDirectory, `${slug}.md`);
			const file = await fs.readFile(fullPath, "utf8");
			const { data } = matter(file);
			const frontmatter = assertFrontmatter(data, slug);
			return { slug, ...frontmatter };
		}),
	);

	return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
