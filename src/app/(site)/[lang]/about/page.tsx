import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import { copy, isLang, type Lang } from "@/lib/i18n";

const experience = {
	pt: [
		{
			period: "2025 - atual",
			role: "Desenvolvedor Backend + IA",
			company: "UNESC",
		},
		{
			period: "2024 - 2025",
			role: "Desenvolvedor de Software (MR)",
			company: "UNESC",
		},
		{
			period: "2022 - 2023",
			role: "COO / Produto e Dados",
			company: "Audite Pro",
		},
	],
	en: [
		{
			period: "2025 - current",
			role: "Backend + AI Developer",
			company: "UNESC",
		},
		{
			period: "2024 - 2025",
			role: "Software Developer (MR)",
			company: "UNESC",
		},
		{
			period: "2022 - 2023",
			role: "COO / Product and Data",
			company: "Audite Pro",
		},
	],
} as const;

const stackLevel = [
	"TypeScript — advanced",
	"Python — advanced",
	"Node.js — advanced",
	"PostgreSQL — intermediate/advanced",
	"MongoDB — intermediate",
	"Azure — intermediate",
	"Docker — intermediate",
	"CI/CD — intermediate",
];

export default async function AboutPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLang(lang)) notFound();

	const t = copy[lang as Lang].about;

	return (
		<SiteFrame withDecor={false}>
			<section className="ui-card ui-cardLg">
				<h1 className="ui-title">{t.title}</h1>
				<p className="ui-subtitle">{t.description}</p>
			</section>

			<section className="mt-12">
				<h2 className="ui-sectionTitle">{t.skillsTitle}</h2>
				<div className="grid gap-4 md:grid-cols-2">
					<article className="ui-card">
						<h3 className="font-semibold">Backend</h3>
						<p className="ui-subtitle" style={{ marginTop: 10 }}>
							{t.skills.backend}
						</p>
					</article>
					<article className="ui-card">
						<h3 className="font-semibold">Dados</h3>
						<p className="ui-subtitle" style={{ marginTop: 10 }}>
							{t.skills.data}
						</p>
					</article>
					<article className="ui-card">
						<h3 className="font-semibold">Cloud</h3>
						<p className="ui-subtitle" style={{ marginTop: 10 }}>
							{t.skills.cloud}
						</p>
					</article>
					<article className="ui-card">
						<h3 className="font-semibold">
							Observabilidade / DevOps
						</h3>
						<p className="ui-subtitle" style={{ marginTop: 10 }}>
							{t.skills.devops}
						</p>
					</article>
				</div>
			</section>

			<section className="mt-12">
				<h2 className="ui-sectionTitle">
					{lang === "en" ? "Experience" : "Experiência"}
				</h2>
				<div className="mt-4 grid gap-4 md:grid-cols-2">
					{experience[lang as Lang].map((item) => (
						<article
							key={`${item.period}-${item.role}`}
							className="ui-card"
						>
							<p className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">
								{item.period}
							</p>
							<p
								style={{ marginTop: 10 }}
								className="font-semibold"
							>
								{item.role}
							</p>
							<p
								style={{ marginTop: 10 }}
								className="text-sm text-[var(--text-secondary)]"
							>
								{item.company}
							</p>
						</article>
					))}
				</div>
			</section>

			<section className="mt-12">
				<h2 className="ui-sectionTitle">Stack</h2>
				<ul className="mt-4 grid gap-4 md:grid-cols-2">
					{stackLevel.map((item) => (
						<li key={item} className="ui-card">
							{item}
						</li>
					))}
				</ul>
			</section>

			<section className="mt-12">
				<h2 className="ui-sectionTitle">{t.availableTitle}</h2>
				<ul className="ui-list">
					{t.available.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</section>
		</SiteFrame>
	);
}
