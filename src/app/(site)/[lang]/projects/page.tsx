import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import { copy, getLocalizedPath, isLang, type Lang } from "@/lib/i18n";
import { getAllProjects } from "@/lib/projects";
import { buildPageMetadata } from "@/lib/metadata";

export const dynamic = "error";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;
	if (!isLang(lang)) notFound();

	const t = copy[lang as Lang].projects;
	return buildPageMetadata({
		lang: lang as Lang,
		title: `${t.title} | Érick Lúcio`,
		description: t.subtitle,
		path: `/${lang}/${lang === "en" ? "projects" : "projetos"}`,
		image: "/og/projects.svg",
		type: "website",
		alternates: {
			pt: "/pt/projetos",
			en: "/en/projects",
		},
	});
}

export default async function ProjectsPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLang(lang)) notFound();

	const t = copy[lang as Lang].projects;
	const projects = await getAllProjects(lang as Lang);

	return (
		<SiteFrame
			withDecor={false}
			mainClassName="w-full max-w-[1180px] mx-auto px-4 md:px-6 py-7 pb-16"
		>
			<h1 className="ui-title">{t.title}</h1>
			<p className="ui-subtitle">{t.subtitle}</p>

			<section className="space-y-4">
				{projects.map((item) => (
					<article
						key={item.slug}
						className="ui-card transition hover:-translate-y-0.5 hover:border-[var(--color-aux-blue)] md:flex md:gap-5 md:p-4"
					>
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
								{new Date(item.date).toLocaleDateString(lang === "en" ? "en-US" : "pt-BR")}
							</p>
							<h2 className="mb-2 text-xl font-semibold">{item.title}</h2>
							{item.excerpt ? (
								<p className="ui-subtitle max-w-none" style={{ marginTop: 10 }}>
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
							<div className="mt-auto flex items-center justify-end gap-2">
								<Link
									href={getLocalizedPath(lang, "projects", item.slug)}
									className="text-sm underline"
								>
									{lang === "en" ? "Open case study" : "Abrir case study"}
								</Link>
							</div>
						</div>
					</article>
				))}
			</section>
		</SiteFrame>
	);
}
