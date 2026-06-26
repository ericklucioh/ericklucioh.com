import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache, type ComponentType } from "react";
import { compileMdxToComponent } from "@/lib/mdx";
import type { Lang } from "@/lib/i18n";

export type CurriculumFrontmatter = {
	name: string;
	role: string;
	subtitle: string;
	pills: string[];
	contact: {
		email: string;
		linkedin: string;
		github: string;
	};
};

export type CurriculumDocument = CurriculumFrontmatter & {
	Content: ComponentType<any>;
};

const curriculumDirectory = path.join(process.cwd(), "content", "curriculum");

function assertFrontmatter(data: unknown, lang: Lang): CurriculumFrontmatter {
	if (!data || typeof data !== "object") {
		throw new Error(`Invalid curriculum frontmatter for "${lang}"`);
	}

	const record = data as Record<string, unknown>;
	const name = record.name;
	const role = record.role;
	const subtitle = record.subtitle;
	const pills = record.pills;
	const contact = record.contact;

	if (typeof name !== "string" || name.trim().length === 0) {
		throw new Error(
			`Missing "name" in curriculum frontmatter for "${lang}"`,
		);
	}

	if (typeof role !== "string" || role.trim().length === 0) {
		throw new Error(
			`Missing "role" in curriculum frontmatter for "${lang}"`,
		);
	}

	if (typeof subtitle !== "string" || subtitle.trim().length === 0) {
		throw new Error(
			`Missing "subtitle" in curriculum frontmatter for "${lang}"`,
		);
	}

	if (
		!Array.isArray(pills) ||
		!pills.every((pill) => typeof pill === "string")
	) {
		throw new Error(
			`Missing "pills" in curriculum frontmatter for "${lang}"`,
		);
	}

	if (!contact || typeof contact !== "object") {
		throw new Error(
			`Missing "contact" in curriculum frontmatter for "${lang}"`,
		);
	}

	const contactRecord = contact as Record<string, unknown>;
	const email = contactRecord.email;
	const linkedin = contactRecord.linkedin;
	const github = contactRecord.github;

	if (typeof email !== "string" || email.trim().length === 0) {
		throw new Error(
			`Missing "contact.email" in curriculum frontmatter for "${lang}"`,
		);
	}
	if (typeof linkedin !== "string" || linkedin.trim().length === 0) {
		throw new Error(
			`Missing "contact.linkedin" in curriculum frontmatter for "${lang}"`,
		);
	}
	if (typeof github !== "string" || github.trim().length === 0) {
		throw new Error(
			`Missing "contact.github" in curriculum frontmatter for "${lang}"`,
		);
	}

	return {
		name,
		role,
		subtitle,
		pills,
		contact: {
			email,
			linkedin,
			github,
		},
	};
}

async function readCurriculumFile(lang: Lang) {
	const fullPath = path.join(curriculumDirectory, `${lang}.mdx`);
	return fs.readFile(fullPath, "utf8");
}

export const getCurriculumByLang = cache(async function getCurriculumByLang(
	lang: Lang,
): Promise<CurriculumDocument> {
	const file = await readCurriculumFile(lang);
	const { data, content } = matter(file);

	const frontmatter = assertFrontmatter(data, lang);
	const Content = await compileMdxToComponent(content);

	return {
		...frontmatter,
		Content,
	};
});
