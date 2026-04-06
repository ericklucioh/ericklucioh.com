import { notFound } from "next/navigation";
import { copy, isLang, type Lang } from "@/lib/i18n";

const experience = {
	pt: [
		{ period: "2025 - atual", role: "Desenvolvedor Backend + IA", company: "UNESC" },
		{ period: "2024 - 2025", role: "Desenvolvedor de Software (MR)", company: "UNESC" },
		{ period: "2022 - 2023", role: "COO / Produto e Dados", company: "Audite Pro" },
	],
	en: [
		{ period: "2025 - current", role: "Backend + AI Developer", company: "UNESC" },
		{ period: "2024 - 2025", role: "Software Developer (MR)", company: "UNESC" },
		{ period: "2022 - 2023", role: "COO / Product and Data", company: "Audite Pro" },
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
		<main className="mx-auto max-w-5xl p-6 md:p-10">
			<section className="mb-8 rounded-2xl border border-[var(--text-third)] p-6">
				<h1 className="mb-4 text-3xl font-semibold">{t.title}</h1>
				<p className="text-[var(--text-secondary)]">{t.description}</p>
			</section>

			<section className="mb-8">
				<h2 className="mb-4 text-2xl font-semibold">{t.skillsTitle}</h2>
				<div className="grid gap-4 md:grid-cols-2">
					<article className="rounded-2xl border border-[var(--text-third)] p-4">
						<h3 className="mb-2 font-semibold">Backend</h3>
						<p className="text-sm text-[var(--text-secondary)]">{t.skills.backend}</p>
					</article>
					<article className="rounded-2xl border border-[var(--text-third)] p-4">
						<h3 className="mb-2 font-semibold">Dados</h3>
						<p className="text-sm text-[var(--text-secondary)]">{t.skills.data}</p>
					</article>
					<article className="rounded-2xl border border-[var(--text-third)] p-4">
						<h3 className="mb-2 font-semibold">Cloud</h3>
						<p className="text-sm text-[var(--text-secondary)]">{t.skills.cloud}</p>
					</article>
					<article className="rounded-2xl border border-[var(--text-third)] p-4">
						<h3 className="mb-2 font-semibold">Observabilidade / DevOps</h3>
						<p className="text-sm text-[var(--text-secondary)]">{t.skills.devops}</p>
					</article>
				</div>
			</section>

			<section className="mb-8 rounded-2xl border border-[var(--text-third)] p-6">
				<h2 className="mb-4 text-2xl font-semibold">{lang === "en" ? "Experience" : "Experiência"}</h2>
				<div className="space-y-3">
					{experience[lang as Lang].map((item) => (
						<div key={`${item.period}-${item.role}`} className="rounded-xl border border-[var(--text-third)] p-4">
							<p className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">
								{item.period}
							</p>
							<p className="font-semibold">{item.role}</p>
							<p className="text-sm text-[var(--text-secondary)]">{item.company}</p>
						</div>
					))}
				</div>
			</section>

			<section className="mb-8 rounded-2xl border border-[var(--text-third)] p-6">
				<h2 className="mb-4 text-2xl font-semibold">Stack (real use)</h2>
				<ul className="grid gap-2 text-sm text-[var(--text-secondary)] md:grid-cols-2">
					{stackLevel.map((item) => (
						<li key={item} className="rounded-lg border border-[var(--text-third)] p-3">
							{item}
						</li>
					))}
				</ul>
			</section>

			<section className="rounded-2xl border border-[var(--text-third)] p-6">
				<h2 className="mb-3 text-2xl font-semibold">{t.availableTitle}</h2>
				<ul className="list-disc space-y-2 pl-5 text-[var(--text-secondary)]">
					{t.available.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</section>
		</main>
	);
}
