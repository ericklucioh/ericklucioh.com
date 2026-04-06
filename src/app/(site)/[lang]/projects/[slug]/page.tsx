import Image from "next/image";
import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import { isLang, LANGS, type Lang } from "@/lib/i18n";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/content";

export function generateStaticParams() {
	return LANGS.flatMap((lang) => getCaseStudies().map((item) => ({ lang, slug: item.slug })));
}

export default async function ProjectCasePage({
	params,
}: {
	params: Promise<{ lang: string; slug: string }>;
}) {
	const { lang, slug } = await params;
	if (!isLang(lang)) notFound();

	const item = getCaseStudyBySlug(slug);
	if (!item) notFound();

	const localizedSections = item.sections[lang as Lang];

	return (
		<SiteFrame mainClassName="mx-auto max-w-4xl p-6 md:p-10">
			<p className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
				{lang === "en" ? "Case study" : "Estudo de caso"}
			</p>
			<h1 className="mb-3 text-3xl font-semibold">{item.title[lang as Lang]}</h1>
			<p className="mb-6 text-[var(--text-secondary)]">{item.summary[lang as Lang]}</p>

			<div className="mb-8 grid gap-3 sm:grid-cols-3">
				{item.impact.length ? (
					item.impact.map((metric) => (
						<div key={metric.label} className="border border-[var(--text-third)] p-4">
							<p className="text-xs uppercase text-[var(--text-secondary)]">{metric.label}</p>
							<p className="text-lg font-semibold">{metric.value}</p>
						</div>
					))
				) : (
					<p className="text-sm text-[var(--text-secondary)]">
						{lang === "en" ? "Impact metrics will be added soon." : "Métricas de impacto serão adicionadas em breve."}
					</p>
				)}
			</div>

			<figure className="mb-8 border border-[var(--text-third)] p-3">
				<Image
					src={item.image}
					alt={item.title[lang as Lang]}
					width={1200}
					height={500}
					className="h-auto w-full"
				/>
			</figure>

			<section className="space-y-4">
				{localizedSections.length ? (
					localizedSections.map((section) => (
						<article key={section.title} className="border border-[var(--text-third)] p-5">
							<h2 className="mb-2 text-xl font-semibold">{section.title}</h2>
							<p className="text-[var(--text-secondary)]">{section.body}</p>
						</article>
					))
				) : (
					<article className="border border-dashed border-[var(--text-third)] p-5">
						<p className="text-[var(--text-secondary)]">
							{lang === "en"
								? "Detailed sections are being prepared for this case."
								: "As seções detalhadas deste case estão sendo preparadas."}
						</p>
					</article>
				)}
			</section>
		</SiteFrame>
	);
}
