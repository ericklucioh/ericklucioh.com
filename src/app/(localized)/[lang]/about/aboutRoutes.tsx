import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import { buildPageMetadata } from "@/lib/metadata";
import { isLang, type Lang } from "@/lib/i18n";

const aboutContent = {
	pt: {
		title: "Sobre",
		intro: "Sou Érick Lúcio, Desenvolvedor de Software e estudante de Ciência da Computação na UNESC. Trabalho com APIs, dados e sistemas que precisam sair do texto e virar operação.",
		intro2: "Também trabalho com IA aplicada quando ela traz ganho claro. Prefiro combinar modelo, regra e validação do que depender só de prompt.",
		areasTitle: "Áreas de atuação",
		areas: [
			{
				title: "Backend",
				description:
					"APIs REST, autenticação, autorização, integrações e persistência com foco em manutenção.",
			},
			{
				title: "IA aplicada",
				description:
					"LLMs conectadas a sistemas reais com RAG, normalização e validação por regras.",
			},
			{
				title: "Dados",
				description:
					"Modelagem, SQL, PostgreSQL, MySQL, MongoDB e preparação de dados para análise e automação.",
			},
			{
				title: "Entrega",
				description:
					"Docker, CI/CD, observabilidade, deploy e decisões de arquitetura com custo e operação em mente.",
			},
		],
		experienceTitle: "Experiência",
		experience: [
			{
				period: "2025 - atual",
				role: "Desenvolvedor de Software + IA",
				company: "UNESC",
				description:
					"Atuo em uma solução de IA para análise de custos industriais, conectando backend em Python, dados estruturados, histórico de conversas e RAG.",
			},
			{
				period: "2024 - 2025",
				role: "Desenvolvedor de Software (Realidade Mista)",
				company: "UNESC",
				description:
					"Desenvolvi uma aplicação assistiva com HoloLens 2 para navegação indoor, unindo C#, Unity e interação espacial.",
			},
			{
				period: "2022 - 2023",
				role: "COO / Produto e Dados",
				company: "Audite Pro",
				description:
					"Ajudei a estruturar processos, dados e produto em um contexto de operação e decisão de negócio.",
			},
		],
		stackTitle: "Stack",
		stackGroups: [
			{
				title: "Backend",
				items: "Python, FastAPI, TypeScript, Node.js, Express, C#, Go, Prisma",
			},
			{
				title: "Dados",
				items: "PostgreSQL, MySQL, MongoDB, SQL e modelagem",
			},
			{
				title: "Frontend",
				items: "Angular, Next.js, React, Tailwind CSS, shadcn/ui e Material UI",
			},
			{
				title: "Infra e arquitetura",
				items: "Docker, Docker Compose, GitHub Actions, Azure, gRPC e k3s",
			},
		],
		approachTitle: "Como eu trabalho",
		approach: [
			"Eu corto o que é bonito no texto e fraco na prática.",
			"Se a IA entra, ela precisa de regra, validação e fonte.",
			"Quando preciso, trabalho full-stack; meu eixo continua sendo backend.",
		],
		availabilityTitle: "Disponível para",
		availability: [
			"Trabalho remoto ou híbrido",
			"Projetos de backend, dados e IA aplicada",
			"Times que precisam transformar processo em produto",
		],
	},
	en: {
		title: "About",
		intro: "I am Érick Lúcio, a Software Developer and Computer Science student at UNESC. I work on APIs, data and systems that need to move from text to operation.",
		intro2: "I also work with applied AI when it brings clear value. I prefer combining model, rules and validation instead of relying on prompts alone.",
		areasTitle: "Areas of work",
		areas: [
			{
				title: "Backend",
				description:
					"REST APIs, authentication, authorization, integrations and persistence with maintainability in mind.",
			},
			{
				title: "Applied AI",
				description:
					"LLMs connected to real systems with RAG, normalization and rule-based validation.",
			},
			{
				title: "Data",
				description:
					"Modeling, SQL, PostgreSQL, MySQL, MongoDB and data preparation for analysis and automation.",
			},
			{
				title: "Delivery",
				description:
					"Docker, CI/CD, observability, deployment and architecture decisions with cost and operations in mind.",
			},
		],
		experienceTitle: "Experience",
		experience: [
			{
				period: "2025 - current",
				role: "Backend + AI Developer",
				company: "UNESC",
				description:
					"I work on an AI solution for industrial cost analysis, connecting a Python backend, structured data, chat history and RAG.",
			},
			{
				period: "2024 - 2025",
				role: "Software Developer (Mixed Reality)",
				company: "UNESC",
				description:
					"I built an assistive HoloLens 2 application for indoor navigation, combining C#, Unity and spatial interaction.",
			},
			{
				period: "2022 - 2023",
				role: "COO / Product and Data",
				company: "Audite Pro",
				description:
					"I helped structure processes, data and product in a business operation and decision-making context.",
			},
		],
		stackTitle: "Stack",
		stackGroups: [
			{
				title: "Backend",
				items: "Python, FastAPI, TypeScript, Node.js, Express, C#, Go, Prisma",
			},
			{
				title: "Data",
				items: "PostgreSQL, MySQL, MongoDB, SQL and modeling",
			},
			{
				title: "Frontend",
				items: "Angular, Next.js, React, Tailwind CSS, shadcn/ui and Material UI",
			},
			{
				title: "Infrastructure and architecture",
				items: "Docker, Docker Compose, GitHub Actions, Azure, gRPC and k3s",
			},
		],
		approachTitle: "How I work",
		approach: [
			"I cut what sounds good on paper but fails in practice.",
			"When AI is involved, it needs rules, validation and a source.",
			"I can work full-stack when needed, but backend stays my core.",
		],
		availabilityTitle: "Available for",
		availability: [
			"Remote or hybrid work",
			"Backend, data and applied AI projects",
			"Teams that need to turn process into product",
		],
	},
} as const;

export function getCanonicalAboutPath(lang: Lang) {
	return `/${lang}/about`;
}

export async function buildAboutMetadata(lang: string): Promise<Metadata> {
	if (!isLang(lang)) notFound();

	const isEnglish = lang === "en";
	const title = isEnglish ? "About | Érick Lúcio" : "Sobre | Érick Lúcio";
	const description = isEnglish
		? "Software Developer focused on APIs, data and practical delivery."
		: "Desenvolvedor de Software focado em APIs, dados e entrega prática.";

	return buildPageMetadata({
		lang,
		title,
		description,
		path: getCanonicalAboutPath(lang),
		image: "/og/default.svg",
		type: "website",
		alternates: {
			pt: "/pt/about",
			en: "/en/about",
		},
	});
}

export async function renderAboutPage(lang: string) {
	if (!isLang(lang)) notFound();

	const t = aboutContent[lang];

	return (
		<SiteFrame
			withDecor={false}
			mainClassName="w-full max-w-[1180px] mx-auto px-4 md:px-6 py-7 pb-16"
		>
			<section className="ui-card ui-cardLg">
				<h1 className="ui-title">{t.title}</h1>
				<p className="ui-subtitle">{t.intro}</p>
				<p className="ui-subtitle mt-4">{t.intro2}</p>
			</section>

			<section className="mt-12">
				<h2 className="ui-sectionTitle">{t.areasTitle}</h2>
				<div className="mt-4 grid gap-4 md:grid-cols-2">
					{t.areas.map((item) => (
						<article key={item.title} className="ui-card">
							<h3 className="font-semibold">{item.title}</h3>
							<p className="ui-subtitle mt-3 max-w-none">
								{item.description}
							</p>
						</article>
					))}
				</div>
			</section>

			<section className="mt-12">
				<h2 className="ui-sectionTitle">{t.experienceTitle}</h2>
				<div className="mt-4 grid gap-4 md:grid-cols-2">
					{t.experience.map((item) => (
						<article
							key={`${item.period}-${item.role}`}
							className="ui-card"
						>
							<p className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">
								{item.period}
							</p>
							<p className="mt-3 font-semibold">{item.role}</p>
							<p className="mt-1 text-sm text-[var(--text-secondary)]">
								{item.company}
							</p>
							<p className="ui-subtitle mt-4 max-w-none">
								{item.description}
							</p>
						</article>
					))}
				</div>
			</section>

			<section className="mt-12">
				<h2 className="ui-sectionTitle">{t.stackTitle}</h2>
				<div className="mt-4 grid gap-4 md:grid-cols-2">
					{t.stackGroups.map((item) => (
						<article key={item.title} className="ui-card">
							<h3 className="font-semibold">{item.title}</h3>
							<p className="ui-subtitle mt-3 max-w-none">
								{item.items}
							</p>
						</article>
					))}
				</div>
			</section>

			<section className="mt-12">
				<h2 className="ui-sectionTitle">{t.approachTitle}</h2>
				<ul className="ui-list">
					{t.approach.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</section>

			<section className="mt-12">
				<h2 className="ui-sectionTitle">{t.availabilityTitle}</h2>
				<ul className="ui-list">
					{t.availability.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</section>
		</SiteFrame>
	);
}
