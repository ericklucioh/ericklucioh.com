import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache, type ComponentType } from "react";
import { compileMdxToComponent } from "@/lib/mdx";

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
	Content: ComponentType<any>;
};

const projectsDirectory = path.join(process.cwd(), "content", "projects");

async function readProjectFile(slug: string) {
	const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
	return fs.readFile(fullPath, "utf8");
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

export const getProjectSlugs = cache(async function getProjectSlugs() {
	const entries = await fs.readdir(projectsDirectory, { withFileTypes: true });
	return entries
		.filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
		.map((entry) => entry.name.replace(/\.mdx$/, ""));
});

export const getProjectBySlug = cache(async function getProjectBySlug(slug: string): Promise<Project> {
	const file = await readProjectFile(slug);
	const { data, content } = matter(file);

	const frontmatter = assertFrontmatter(data, slug);
	const Content = await compileMdxToComponent(content);

	return {
		slug,
		...frontmatter,
		Content,
	};
});

export const getAllProjects = cache(async function getAllProjects(): Promise<ProjectSummary[]> {
	const slugs = await getProjectSlugs();
	const projects = await Promise.all(
		slugs.map(async (slug) => {
			const file = await readProjectFile(slug);
			const { data } = matter(file);
			const frontmatter = assertFrontmatter(data, slug);
			return { slug, ...frontmatter };
		}),
	);

	return projects.sort((a, b) => (a.date < b.date ? 1 : -1));
});
