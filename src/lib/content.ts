import caseStudies from "@/data/case-studies.json";
import blogPosts from "@/data/blog-posts.json";
import type { Lang } from "@/lib/i18n";

type LocalizedText = Record<Lang, string>;
type LocalizedSections = Record<Lang, { title: string; body: string }[]>;

export type CaseStudy = {
	slug: string;
	title: LocalizedText;
	summary: LocalizedText;
	problem: LocalizedText;
	stack: string[];
	status: "active" | "coming_soon";
	tags: string[];
	impact: { label: string; value: string }[];
	sections: LocalizedSections;
	image: string;
};

export type BlogPost = {
	slug: string;
	title: LocalizedText;
	excerpt: LocalizedText;
	content: Record<Lang, string[]>;
	publishedAt: string;
	tags: string[];
};

const typedCaseStudies = caseStudies as CaseStudy[];
const typedBlogPosts = blogPosts as BlogPost[];

export function getCaseStudies() {
	return typedCaseStudies;
}

export function getCaseStudyBySlug(slug: string) {
	return typedCaseStudies.find((item) => item.slug === slug);
}

export function getBlogPosts() {
	return [...typedBlogPosts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getBlogPostBySlug(slug: string) {
	return typedBlogPosts.find((item) => item.slug === slug);
}

export function getAllTags() {
	return Array.from(new Set(typedBlogPosts.flatMap((post) => post.tags))).sort();
}
