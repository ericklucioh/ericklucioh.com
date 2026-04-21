import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

export type ProjectFrontmatter = {
	title: string;
	date: string;
	excerpt?: string;
	tags?: string[];
	stack?: string[];
};

export type ProjectSummary = ProjectFrontmatter & {
	slug: string;
};

export type Project = ProjectSummary & {
	contentHtml: string;
};

const projectsDirectory = path.join(process.cwd(), "content", "projects");

export async function getProjectSlugs() {
	const entries = await fs.readdir(projectsDirectory, { withFileTypes: true });
	return entries
		.filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
		.map((entry) => entry.name.replace(/\.md$/, ""));
}

function assertFrontmatter(data: unknown, slug: string): ProjectFrontmatter {
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
	const tags = Array.isArray(record.tags)
		? record.tags.filter((tag): tag is string => typeof tag === "string")
		: undefined;
	const stack = Array.isArray(record.stack)
		? record.stack.filter((item): item is string => typeof item === "string")
		: undefined;

	return { title, date, excerpt, tags, stack };
}

async function markdownToHtml(markdown: string) {
	const result = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeHighlight, { detect: true, ignoreMissing: true })
		.use(rehypeStringify)
		.process(markdown);

	return String(result)
		.replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g, (_match, code) => {
			const decoded = code
				.replace(/&amp;/g, "&")
				.replace(/&lt;/g, "<")
				.replace(/&gt;/g, ">")
				.replace(/&quot;/g, '"')
				.replace(/&#39;/g, "'");

			return `<div class="mermaid">${decoded}</div>`;
		});
}

export async function getProjectBySlug(slug: string): Promise<Project> {
	const fullPath = path.join(projectsDirectory, `${slug}.md`);
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

export async function getAllProjects(): Promise<ProjectSummary[]> {
	const slugs = await getProjectSlugs();
	const projects = await Promise.all(
		slugs.map(async (slug) => {
			const fullPath = path.join(projectsDirectory, `${slug}.md`);
			const file = await fs.readFile(fullPath, "utf8");
			const { data } = matter(file);
			const frontmatter = assertFrontmatter(data, slug);
			return { slug, ...frontmatter };
		}),
	);

	return projects.sort((a, b) => (a.date < b.date ? 1 : -1));
}
