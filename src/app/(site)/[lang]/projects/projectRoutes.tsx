import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import MdxContent from "@/components/mdx/MdxContent";
import { copy, getLocalizedPath, isLang, LANGS, type Lang } from "@/lib/i18n";
import {
	getAllProjects,
	getProjectBySlug,
	getProjectSlugs,
} from "@/lib/projects";
import { buildPageMetadata, resolveSocialImage } from "@/lib/metadata";

export function getCanonicalProjectsPath(lang: Lang) {
	return lang === "en" ? "/en/projects" : "/pt/projetos";
}

export function getCanonicalProjectPath(lang: Lang, slug: string) {
	return `${getCanonicalProjectsPath(lang)}/${slug}`;
}

export async function buildProjectsMetadata(lang: string): Promise<Metadata> {
	if (!isLang(lang)) notFound();

	const t = copy[lang].projects;
	return buildPageMetadata({
		lang,
		title: `${t.title} | Érick Lúcio`,
		description: t.subtitle,
		path: getCanonicalProjectsPath(lang),
		image: "/og/projects.svg",
		type: "website",
		alternates: {
			pt: "/pt/projetos",
			en: "/en/projects",
		},
	});
}

export async function renderProjectsPage(lang: string) {
	if (!isLang(lang)) notFound();

	const t = copy[lang].projects;
	const projects = await getAllProjects(lang);

	return (
		<SiteFrame
			withDecor={false}
			mainClassName="w-full max-w-[1180px] mx-auto px-4 md:px-6 py-7 pb-16"
		>
			<h1 className="ui-title">{t.title}</h1>
			<p className="ui-subtitle">{t.subtitle}</p>

			<section className="space-y-4">
				{projects.map((item) => (
					<Link
						key={item.slug}
						href={getLocalizedPath(lang, "projects", item.slug)}
						aria-label={
							lang === "en"
								? `Open case study for ${item.title}`
								: `Abrir case study de ${item.title}`
						}
						className="block"
					>
						<article className="ui-card transition-transform duration-150 hover:-translate-y-0.5 hover:border-[var(--color-aux-blue)] md:flex md:gap-5 md:p-4">
							<div className="relative mb-4 aspect-[16/10] overflow-hidden border border-[color-mix(in_srgb,var(--text-secondary)_25%,transparent)] bg-[color-mix(in_srgb,var(--bg-page)_88%,transparent)] md:mb-0 md:aspect-[4/3] md:w-[220px] md:min-w-[220px] md:shrink-0">
								{item.image ? (
									<Image
										src={item.image}
										alt={item.title}
										fill
										sizes="(max-width: 768px) 100vw, 220px"
										className="object-cover"
									/>
								) : (
									<div
										className="h-full w-full"
										style={{
											background:
												"linear-gradient(135deg, color-mix(in srgb, var(--color-aux-blue) 18%, transparent), color-mix(in srgb, var(--bg-page) 88%, transparent))",
										}}
									/>
								)}
							</div>

							<div className="flex min-w-0 flex-1 flex-col">
								<p className="mb-2 text-xs uppercase tracking-widest text-[var(--text-secondary)]">
									{new Date(item.date).toLocaleDateString(
										lang === "en" ? "en-US" : "pt-BR",
									)}
								</p>
								<h2 className="mb-2 text-xl font-semibold">
									{item.title}
								</h2>
								{item.excerpt ? (
									<p
										className="ui-subtitle max-w-none"
										style={{ marginTop: 10 }}
									>
										{item.excerpt}
									</p>
								) : null}
								<p className="mb-3 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
									Stack: {(item.stack ?? []).join(", ")}
								</p>
								<div className="mb-3 flex flex-wrap gap-2 text-xs text-[var(--text-secondary)]">
									{(item.tags ?? []).map((tag) => (
										<span key={tag}>#{tag}</span>
									))}
								</div>
							</div>
						</article>
					</Link>
				))}
			</section>
		</SiteFrame>
	);
}

export async function generateProjectStaticParams() {
	const slugs = await getProjectSlugs();
	return LANGS.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function buildProjectMetadata(
	lang: string,
	slug: string,
): Promise<Metadata> {
	if (!isLang(lang)) notFound();

	const projects = await getAllProjects(lang);
	const project = projects.find((item) => item.slug === slug);
	if (!project) notFound();

	return buildPageMetadata({
		lang,
		title: `${project.title} | ${lang === "en" ? "Projects" : "Projetos"}`,
		description: project.excerpt,
		path: getCanonicalProjectPath(lang, slug),
		image: resolveSocialImage(project.ogImage, project.image),
		type: "article",
		alternates: {
			pt: `/pt/projetos/${slug}`,
			en: `/en/projects/${slug}`,
		},
	});
}

export async function renderProjectPage(lang: string, slug: string) {
	if (!isLang(lang)) notFound();

	const item = await getProjectBySlug(slug, lang).catch(() => null);
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
			{item.excerpt ? (
				<p className="ui-subtitle">{item.excerpt}</p>
			) : null}

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
				<span>
					{new Date(item.date).toLocaleDateString(
						lang === "en" ? "en-US" : "pt-BR",
					)}
				</span>
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
					<p className="text-sm leading-7 text-[var(--text-primary)]">
						{item.stack?.join(" • ")}
					</p>
				</div>
			) : null}

			<MdxContent
				Content={item.Content}
				className="markdown ui-card ui-cardLg mt-10"
			/>
		</SiteFrame>
	);
}
