import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache, type ComponentType } from "react";
import { compileMdxToComponent } from "@/lib/mdx";
import type { Lang } from "@/lib/i18n";

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
const supportedLocales: readonly Lang[] = ["pt", "en"];

async function readPostDirectoryNames() {
	const entries = await fs.readdir(postsDirectory, { withFileTypes: true });
	return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

async function hasLocaleFile(slug: string, lang: Lang) {
	try {
		await fs.access(path.join(postsDirectory, slug, `${lang}.mdx`));
		return true;
	} catch {
		return false;
	}
}

async function readPostLocaleFile(slug: string, lang: Lang) {
	const fullPath = path.join(postsDirectory, slug, `${lang}.mdx`);
	return fs.readFile(fullPath, "utf8");
}

function assertFrontmatter(data: unknown, slug: string, lang?: Lang): PostFrontmatter {
	const suffix = lang ? `/${lang}` : "";
	if (!data || typeof data !== "object") {
		throw new Error(`Invalid frontmatter for "${slug}${suffix}"`);
	}

	const record = data as Record<string, unknown>;
	const title = record.title;
	const date = record.date;

	if (typeof title !== "string" || title.trim().length === 0) {
		throw new Error(`Missing "title" in frontmatter for "${slug}${suffix}"`);
	}
	if (typeof date !== "string" || date.trim().length === 0) {
		throw new Error(`Missing "date" in frontmatter for "${slug}${suffix}"`);
	}

	const excerpt = typeof record.excerpt === "string" ? record.excerpt : undefined;
	const tags = Array.isArray(record.tags) ? record.tags.filter((t) => typeof t === "string") : undefined;

	return { title, date, excerpt, tags };
}

export const getPostSlugs = cache(async function getPostSlugs() {
	const slugs = await readPostDirectoryNames();
	const completeSlugs = await Promise.all(
		slugs.map(async (slug) => {
			const checks = await Promise.all(supportedLocales.map((lang) => hasLocaleFile(slug, lang)));
			return checks.every(Boolean) ? slug : null;
		}),
	);

	return completeSlugs.filter((slug): slug is string => Boolean(slug)).sort();
});

export const getPostBySlug = cache(async function getPostBySlug(slug: string, lang: Lang): Promise<Post> {
	const file = await readPostLocaleFile(slug, lang);
	const { data, content } = matter(file);

	const frontmatter = assertFrontmatter(data, slug, lang);
	const Content = await compileMdxToComponent(content);

	return {
		slug,
		...frontmatter,
		Content,
	};
});

export const getAllPosts = cache(async function getAllPosts(lang: Lang): Promise<PostSummary[]> {
	const slugs = await getPostSlugs();
	const posts = await Promise.all(
		slugs.map(async (slug) => {
			const file = await readPostLocaleFile(slug, lang);
			const { data } = matter(file);
			const frontmatter = assertFrontmatter(data, slug, lang);
			return { slug, ...frontmatter };
		}),
	);

	return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
});
