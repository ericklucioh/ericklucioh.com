import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import { buildPageMetadata } from "@/lib/metadata";
import { isLang, type Lang } from "@/lib/i18n";

const aboutContent = {
	pt: {
		title: "Sobre",
		intro:
			"Sou Érick Lúcio, desenvolvedor de software e estudante de Ciência da Computação na UNESC. Meu foco principal é backend, com atuação em APIs, integrações, modelagem de dados, autenticação, regras de negócio e organização de sistemas.",
		intro2:
			"Também trabalho com IA aplicada, especialmente em soluções que combinam LLMs, RAG, validação por regras, pré-processamento e integração com fontes estruturadas. Gosto de construir sistemas que não dependem apenas de chamar uma IA, mas que combinam dados bem organizados, código previsível e controle de execução.",
		areasTitle: "Áreas de atuação",
		areas: [
			{
				title: "Backend",
				description:
					"Construção de APIs REST, autenticação, autorização, integrações, validação de entrada, persistência e regras de negócio.",
			},
			{
				title: "IA aplicada",
				description:
					"LLMs conectadas a sistemas reais com RAG, normalização de entrada, validação por regras, dados estruturados e foco em utilidade prática.",
			},
			{
				title: "Dados",
				description:
					"Modelagem, SQL, PostgreSQL, MySQL, MongoDB e preparação de dados para análise, busca e automação.",
			},
			{
				title: "Arquitetura e entrega",
				description:
					"Docker, CI/CD, observabilidade, deploy e experimentos com gRPC, microsserviços, monolito e k3s.",
			},
		],
		experienceTitle: "Experiência e contexto",
		experience: [
			{
				period: "2025 - atual",
				role: "Desenvolvedor Backend + IA",
				company: "UNESC",
				description:
					"Atuação em solução de IA aplicada para análise de custos industriais, envolvendo backend em Python, integração com dados, histórico de conversas, RAG e apoio na evolução técnica do produto.",
			},
			{
				period: "2024 - 2025",
				role: "Desenvolvedor de Software (Realidade Mista)",
				company: "UNESC",
				description:
					"Desenvolvimento de aplicação assistiva com HoloLens 2 para navegação indoor, unindo C#, Unity, interação espacial e recursos de acessibilidade.",
			},
			{
				period: "2022 - 2023",
				role: "COO / Produto e Dados",
				company: "Audite Pro",
				description:
					"Trabalho com estruturação de processos, dados e produto em contexto de negócio, apoiando análises e tomada de decisão.",
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
				items: "PostgreSQL, MySQL, MongoDB, SQL, modelagem e integração com fontes estruturadas",
			},
			{
				title: "Frontend",
				items: "Angular, Next.js, React, Tailwind CSS, shadcn/ui, Material UI",
			},
			{
				title: "Infra e arquitetura",
				items: "Docker, Docker Compose, GitHub Actions, Azure, gRPC, microsserviços, monolito, k3s",
			},
		],
		approachTitle: "Como eu trabalho",
		approach: [
			"Transformo problemas complexos em sistemas compreensíveis, testáveis e úteis.",
			"Prefiro combinar IA com regras, validação e dados estruturados em vez de depender apenas de prompts.",
			"Atuo como full-stack quando necessário, mas meu eixo principal é backend e integração.",
		],
		availabilityTitle: "Disponível para",
		availability: [
			"Trabalho remoto ou híbrido",
			"Projetos de backend, dados e IA aplicada",
			"Times que precisam transformar processos e informações em produto",
		],
	},
	en: {
		title: "About",
		intro:
			"I am Érick Lúcio, a software developer and Computer Science student at UNESC. My main focus is backend, working on APIs, integrations, data modeling, authentication, business rules and system organization.",
		intro2:
			"I also work with applied AI, especially solutions that combine LLMs, RAG, rule-based validation, preprocessing and integration with structured sources. I like building systems that do not rely only on calling an AI model, but combine well-organized data, predictable code and execution control.",
		areasTitle: "Areas of work",
		areas: [
			{
				title: "Backend",
				description:
					"REST APIs, authentication, authorization, integrations, input validation, persistence and business rules.",
			},
			{
				title: "Applied AI",
				description:
					"LLMs connected to real systems with RAG, input normalization, rule-based validation, structured data and practical outcomes.",
			},
			{
				title: "Data",
				description:
					"Modeling, SQL, PostgreSQL, MySQL, MongoDB and data preparation for analysis, retrieval and automation.",
			},
			{
				title: "Architecture and delivery",
				description:
					"Docker, CI/CD, observability, deployment and experiments with gRPC, microservices, monoliths and k3s.",
			},
		],
		experienceTitle: "Experience and context",
		experience: [
			{
				period: "2025 - current",
				role: "Backend + AI Developer",
				company: "UNESC",
				description:
					"Working on an applied AI solution for industrial cost analysis, involving Python backend, data integration, chat history, RAG and technical product evolution.",
			},
			{
				period: "2024 - 2025",
				role: "Software Developer (Mixed Reality)",
				company: "UNESC",
				description:
					"Built an assistive HoloLens 2 application for indoor navigation, combining C#, Unity, spatial interaction and accessibility features.",
			},
			{
				period: "2022 - 2023",
				role: "COO / Product and Data",
				company: "Audite Pro",
				description:
					"Worked on process, data and product structuring in a business context, supporting analysis and decision-making.",
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
				items: "PostgreSQL, MySQL, MongoDB, SQL, modeling and integration with structured sources",
			},
			{
				title: "Frontend",
				items: "Angular, Next.js, React, Tailwind CSS, shadcn/ui, Material UI",
			},
			{
				title: "Infrastructure and architecture",
				items: "Docker, Docker Compose, GitHub Actions, Azure, gRPC, microservices, monoliths, k3s",
			},
		],
		approachTitle: "How I work",
		approach: [
			"I turn complex problems into understandable, testable and useful systems.",
			"I prefer combining AI with rules, validation and structured data instead of relying only on prompts.",
			"I work full-stack when needed, but my main axis is backend and integration.",
		],
		availabilityTitle: "Available for",
		availability: [
			"Remote or hybrid work",
			"Backend, data and applied AI projects",
			"Teams that need to turn processes and information into product",
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
		? "Backend and applied AI engineer focused on reliable systems, integrations, and execution control."
		: "Engenheiro de backend e IA aplicada com foco em sistemas confiáveis, integrações e controle de execução.";

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
		<SiteFrame withDecor={false}>
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
