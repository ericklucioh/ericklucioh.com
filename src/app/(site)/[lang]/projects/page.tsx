import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import { copy, getLocalizedPath, isLang, type Lang } from "@/lib/i18n";
import { getCaseStudies } from "@/lib/content";

export default async function ProjectsPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLang(lang)) notFound();

	const t = copy[lang as Lang].projects;
	const cases = getCaseStudies();

	return (
		<SiteFrame withDecor={false}>
			<h1 className="ui-title">{t.title}</h1>
			<p className="ui-subtitle">{t.subtitle}</p>

			<section className="grid gap-4 md:grid-cols-2">
				{cases.map((item) => (
					<article
						key={item.slug}
						className="ui-card transition hover:-translate-y-0.5 hover:border-[var(--color-aux-blue)]"
					>
						<h2 className="mb-2 text-xl font-semibold">{item.title[lang as Lang]}</h2>
						<p className="ui-subtitle" style={{ marginTop: 10 }}>
							{item.problem[lang as Lang]}
						</p>
						<p className="mb-3 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
							Stack: {item.stack.join(", ")}
						</p>
						<div className="flex items-center justify-between gap-2">
							<span className="ui-pill">
								{item.status === "active" ? (lang === "en" ? "active" : "ativo") : t.soon}
							</span>
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
