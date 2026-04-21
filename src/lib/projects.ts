import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache, type ComponentType } from "react";
import { compileMdxToComponent } from "@/lib/mdx";
import type { Lang } from "@/lib/i18n";

export type ProjectFrontmatter = {
	title: string;
	date: string;
	excerpt?: string;
	tags?: string[];
	stack?: string[];
	image?: string;
};

export type ProjectSummary = ProjectFrontmatter & {
	slug: string;
};

export type Project = ProjectSummary & {
	Content: ComponentType<any>;
};

const projectsDirectory = path.join(process.cwd(), "content", "projects");
const supportedLocales: readonly Lang[] = ["pt", "en"];

async function readProjectLocaleFile(slug: string, lang: Lang) {
	const fullPath = path.join(projectsDirectory, slug, `${lang}.mdx`);
	return fs.readFile(fullPath, "utf8");
}

function assertFrontmatter(data: unknown, slug: string, lang: Lang): ProjectFrontmatter {
	if (!data || typeof data !== "object") {
		throw new Error(`Invalid frontmatter for "${slug}/${lang}"`);
	}

	const record = data as Record<string, unknown>;
	const title = record.title;
	const date = record.date;

	if (typeof title !== "string" || title.trim().length === 0) {
		throw new Error(`Missing "title" in frontmatter for "${slug}/${lang}"`);
	}
	if (typeof date !== "string" || date.trim().length === 0) {
		throw new Error(`Missing "date" in frontmatter for "${slug}/${lang}"`);
	}

	const excerpt = typeof record.excerpt === "string" ? record.excerpt : undefined;
	const tags = Array.isArray(record.tags)
		? record.tags.filter((tag): tag is string => typeof tag === "string")
		: undefined;
	const stack = Array.isArray(record.stack)
		? record.stack.filter((item): item is string => typeof item === "string")
		: undefined;
	const image = typeof record.image === "string" ? record.image : undefined;

	return { title, date, excerpt, tags, stack, image };
}

async function readProjectDirectoryNames() {
	const entries = await fs.readdir(projectsDirectory, { withFileTypes: true });
	return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

async function hasLocaleFile(slug: string, lang: Lang) {
	try {
		await fs.access(path.join(projectsDirectory, slug, `${lang}.mdx`));
		return true;
	} catch {
		return false;
	}
}

export const getProjectSlugs = cache(async function getProjectSlugs() {
	const slugs = await readProjectDirectoryNames();
	const completeSlugs = await Promise.all(
		slugs.map(async (slug) => {
			const checks = await Promise.all(supportedLocales.map((lang) => hasLocaleFile(slug, lang)));
			if (checks.every(Boolean)) {
				return slug;
			}

			const missing = supportedLocales.filter((_, index) => !checks[index]).join(", ");
			throw new Error(`Missing locale file(s) for project "${slug}": ${missing}`);
		}),
	);

	return completeSlugs.sort();
});

export const getProjectBySlug = cache(async function getProjectBySlug(slug: string, lang: Lang): Promise<Project> {
	const file = await readProjectLocaleFile(slug, lang);
	const { data, content } = matter(file);

	const frontmatter = assertFrontmatter(data, slug, lang);
	const Content = await compileMdxToComponent(content);

	return {
		slug,
		...frontmatter,
		Content,
	};
});

export const getAllProjects = cache(async function getAllProjects(lang: Lang): Promise<ProjectSummary[]> {
	const slugs = await getProjectSlugs();
	const projects = await Promise.all(
		slugs.map(async (slug) => {
			const file = await readProjectLocaleFile(slug, lang);
			const { data } = matter(file);
			const frontmatter = assertFrontmatter(data, slug, lang);
			return { slug, ...frontmatter };
		}),
	);

	return projects.sort((a, b) => (a.date < b.date ? 1 : -1));
});
