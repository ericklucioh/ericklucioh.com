import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import { copy, getLocalizedPath, isLang, type Lang } from "@/lib/i18n";
import { getAllProjects } from "@/lib/projects";

export const dynamic = "error";

export default async function ProjectsPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLang(lang)) notFound();

	const t = copy[lang as Lang].projects;
	const projects = await getAllProjects();

	return (
		<SiteFrame
			withDecor={false}
			mainClassName="w-full max-w-[1180px] mx-auto px-4 md:px-6 py-7 pb-16"
		>
			<h1 className="ui-title">{t.title}</h1>
			<p className="ui-subtitle">{t.subtitle}</p>

			<section className="grid gap-4 md:grid-cols-2">
				{projects.map((item) => (
					<article
						key={item.slug}
						className="ui-card transition hover:-translate-y-0.5 hover:border-[var(--color-aux-blue)]"
					>
						<p className="mb-2 text-xs uppercase tracking-widest text-[var(--text-secondary)]">
							{new Date(item.date).toLocaleDateString(lang === "en" ? "en-US" : "pt-BR")}
						</p>
						<h2 className="mb-2 text-xl font-semibold">{item.title}</h2>
						{item.excerpt ? (
							<p className="ui-subtitle" style={{ marginTop: 10 }}>
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
						<div className="flex items-center justify-end gap-2">
							<Link
								href={getLocalizedPath(lang, "projects", item.slug)}
								className="text-sm underline"
							>
								{lang === "en" ? "Open case study" : "Abrir case study"}
							</Link>
						</div>
					</article>
				))}
			</section>
		</SiteFrame>
	);
}
