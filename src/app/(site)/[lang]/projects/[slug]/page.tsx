import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import MdxContent from "@/components/mdx/MdxContent";
import { isLang, LANGS, type Lang } from "@/lib/i18n";
import { getAllProjects, getProjectBySlug, getProjectSlugs } from "@/lib/projects";

export const dynamic = "error";
export const dynamicParams = false;

export async function generateStaticParams() {
	const slugs = await getProjectSlugs();
	return LANGS.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
	const { lang, slug } = await params;
	if (!isLang(lang)) notFound();

	const projects = await getAllProjects(lang as Lang);
	const project = projects.find((item) => item.slug === slug);
	if (!project) notFound();

	return {
		title: `${project.title} | ${lang === "en" ? "Projects" : "Projetos"}`,
		description: project.excerpt,
	};
}

export default async function ProjectCasePage({
	params,
}: {
	params: Promise<{ lang: string; slug: string }>;
}) {
	const { lang, slug } = await params;
	if (!isLang(lang)) notFound();

	const item = await getProjectBySlug(slug, lang as Lang).catch(() => null);
	if (!item) notFound();

	return (
		<SiteFrame
			withDecor={false}
			mainClassName="w-full max-w-[1180px] mx-auto px-4 md:px-6 py-7 pb-16"
		>
			<p className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
				{lang === "en" ? "Project" : "Projeto"}
			</p>
			<h1 className="ui-title">{item.title}</h1>
			{item.excerpt ? <p className="ui-subtitle">{item.excerpt}</p> : null}

			{item.image ? (
				<figure className="ui-card mt-8 p-3">
					<div className="relative aspect-[16/9] overflow-hidden">
						<Image
							src={item.image}
							alt={item.title}
							fill
							sizes="(max-width: 980px) 100vw, 980px"
							className="object-cover"
						/>
					</div>
				</figure>
			) : null}

			<div className="mb-6 flex flex-wrap gap-2 text-xs text-[var(--text-secondary)]">
				<span>{new Date(item.date).toLocaleDateString(lang === "en" ? "en-US" : "pt-BR")}</span>
				{(item.tags ?? []).length ? <span>•</span> : null}
				{(item.tags ?? []).map((tag) => (
					<span key={tag}>#{tag}</span>
				))}
			</div>

			{(item.stack ?? []).length ? (
				<div className="ui-card mb-8">
					<p className="mb-2 text-xs uppercase tracking-widest text-[var(--text-secondary)]">
						Stack
					</p>
					<p className="text-sm leading-7 text-[var(--text-primary)]">{item.stack?.join(" • ")}</p>
				</div>
			) : null}

			<MdxContent
				Content={item.Content}
				className="markdown ui-card ui-cardLg mt-10"
			/>
		</SiteFrame>
	);
}
