import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BaseDecor from "@/components/decorations/BaseDecor";
import DotGrid from "@/components/decorations/DotGrid";
import Square from "@/components/decorations/Square";
import Logo from "@/components/ui/Logo";
import { LANGS, type Lang } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
	return LANGS.map((lang) => ({ lang }));
}

type CurriculumContent = {
	title: string;
	subtitle: string;
	pills: string[];
	sections: {
		title: string;
		cards: {
			title: string;
			meta?: string;
			body?: string;
			list?: string[];
			span?: 6 | 12;
		}[];
	}[];
	contact: {
		emailLabel: string;
		linkedinLabel: string;
		githubLabel: string;
	};
};

const curriculumContent: Record<Lang, CurriculumContent> = {
	pt: {
		title: "Currículo",
		subtitle:
			"Desenvolvedor backend focado em APIs, dados e IA aplicada. Prefiro projetos curtos o bastante para serem entendidos rápido e sólidos o bastante para aguentar uso real.",
		pills: [
			"Araranguá - SC, Brasil",
			"Backend",
			"APIs",
			"IA aplicada",
			"Python",
			"TypeScript",
			"Azure",
			"PostgreSQL • MongoDB",
		],
		sections: [
			{
				title: "O que eu faço",
				cards: [
					{
						title: "APIs & Backend",
						meta: "Arquitetura e execução",
						span: 6,
						body: "Projeto e implemento APIs REST, integrações e serviços com foco em clareza de domínio, manutenção e evolução segura.",
						list: [
							"Python, TypeScript, FastAPI, Node.js e Express",
							"Modelagem, autenticação, validação e persistência",
							"Docker, Git e automações simples de CI/CD",
						],
					},
					{
						title: "IA aplicada",
						meta: "RAG e pipelines",
						span: 6,
						body: "Desenvolvo fluxos com RAG quando a IA realmente ajuda. Antes do modelo, eu prefiro organizar dados, regras e validação.",
						list: [
							"Extração, chunking e indexação",
							"Regras de negócio e validação fora do modelo",
							"Azure AI Foundry e integração com dados",
						],
					},
				],
			},
			{
				title: "Experiência",
				cards: [
					{
						title: "UNESC",
						meta: "Desenvolvedor de Software (IA e Backend) • Jul 2025 – Atual",
						span: 12,
						body: "Atuação no desenvolvimento de um agente interno de IA para análise de custos industriais, unindo backend em Python, dados estruturados e RAG.",
						list: [
							"Levantamento de requisitos com stakeholders e apoio à definição técnica",
							"Arquitetura RAG, processamento de documentos e integrações",
							"Stack: Azure AI Foundry, Python, MongoDB, PostgreSQL e Angular",
						],
					},
					{
						title: "UNESC",
						meta: "Desenvolvedor de Software (Realidade Mista) • Jun 2024 – Jun 2025",
						span: 12,
						body: "Desenvolvimento de uma aplicação assistiva para HoloLens 2 com foco em navegação indoor e acessibilidade.",
						list: [
							"C#, Unity, MRTK e interações espaciais",
							"World Locking Tools para persistência e redução de drift",
							"Stack: C#, Unity, MRTK, World Locking Tools e HoloLens 2",
						],
					},
					{
						title: "Audite Pro",
						meta: "COO • Jul 2022 – Fev 2023",
						span: 6,
						body: "Estruturei análises financeiras automatizadas a partir de dados de ERP e DREs dinâmicas.",
						list: [
							"Apoio à tomada de decisão com dados e BI",
							"Automação de processos e consolidação de análises",
						],
					},
					{
						title: "Sebrae • Startup SC",
						meta: "Jul 2022 – Dez 2022",
						span: 6,
						body: "Imersão em arquitetura de dados, cloud e produto, com foco em métricas e resolução de problemas reais.",
						list: [
							"AWS, arquitetura de dados e escalabilidade",
							"Product management, UX/UI e growth",
						],
					},
				],
			},
			{
				title: "Projetos selecionados",
				cards: [
					{
						title: "ericklucioh.com",
						meta: "Portfólio bilíngue",
						span: 6,
						body: "Meu próprio site como projeto de produto + engenharia: conteúdo bilíngue, MDX, SEO básico e export estático com Next.js.",
						list: [
							"Next.js, React, TypeScript e MDX",
							"Arquitetura de conteúdo, i18n e metadata",
						],
					},
					{
						title: "Painel do Lojista",
						meta: "MVP full-stack",
						span: 6,
						body: "MVP para operação de loja com autenticação, estoque, caixa e vendas, entregue como desafio técnico.",
						list: [
							"Next.js, Express, Prisma e MySQL",
							"JWT, refresh token e fluxo de operações",
						],
					},
					{
						title: "Sistema Especialista para Diagnóstico de Turbinas Eólicas",
						meta: "IA simbólica",
						span: 6,
						body: "Protótipo em Python que usa regras SE-ENTÃO para apoiar diagnóstico explicável em manutenção industrial.",
						list: [
							"Regras, justificativa e ação sugerida",
							"Portfólio forte para IA simbólica e raciocínio por regras",
						],
					},
					{
						title: "YTB Superchat",
						meta: "Tempo real",
						span: 6,
						body: "Ferramenta para streamers com dashboard, extensão de navegador e overlay em tempo real para OBS.",
						list: [
							"Extensão, frontend e backend Go",
							"WebSocket e overlay OBS-ready",
						],
					},
				],
			},
			{
				title: "Stack",
				cards: [
					{
						title: "Linguagens",
						span: 6,
						body: "Python, SQL, C#, TypeScript, JavaScript.",
					},
					{
						title: "Backend & Dados",
						span: 6,
						body: "APIs REST, Node.js, FastAPI, modelagem, PostgreSQL e MongoDB.",
					},
					{
						title: "Cloud & DevOps",
						span: 6,
						body: "Azure, Docker, Git, CI/CD.",
					},
					{
						title: "Outros",
						span: 6,
						body: "Engenharia de software, design de sistemas, Unity.",
					},
				],
			},
			{
				title: "Formação",
				cards: [
					{
						title: "Ciência da Computação • UNESC",
						meta: "2023 – 2026",
						span: 12,
						body: "Graduação com foco em fundamentos de computação e aplicação prática em projetos.",
					},
				],
			},
		],
		contact: {
			emailLabel: "E-mail",
			linkedinLabel: "LinkedIn",
			githubLabel: "GitHub",
		},
	},
	en: {
		title: "Resume",
		subtitle:
			"I am a backend developer focused on APIs, data and applied AI. I prefer projects that can be understood quickly and still hold up in real use.",
		pills: [
			"Araranguá - SC, Brazil",
			"Backend",
			"APIs",
			"Applied AI",
			"Python",
			"TypeScript",
			"Azure",
			"PostgreSQL • MongoDB",
		],
		sections: [
			{
				title: "What I do",
				cards: [
					{
						title: "APIs & Backend",
						meta: "Architecture and execution",
						span: 6,
						body: "I design and build REST APIs, services and integrations with a focus on domain clarity, maintainability and safe evolution.",
						list: [
							"Python, TypeScript, FastAPI, Node.js and Express",
							"Modeling, authentication, validation and persistence",
							"Docker, Git and lightweight CI/CD automation",
						],
					},
					{
						title: "Applied AI",
						meta: "RAG and pipelines",
						span: 6,
						body: "I build RAG flows when AI truly helps. Before the model, I prefer to organize data, rules and validation.",
						list: [
							"Extraction, chunking and indexing",
							"Rule-based validation outside the model",
							"Azure AI Foundry and data integration",
						],
					},
				],
			},
			{
				title: "Experience",
				cards: [
					{
						title: "UNESC",
						meta: "Software Developer (AI and Backend) • Jul 2025 – Present",
						span: 12,
						body: "Working on an internal AI agent for industrial cost analysis, connecting a Python backend, structured data and RAG.",
						list: [
							"Stakeholder requirement gathering and technical support",
							"RAG architecture, document processing and integrations",
							"Stack: Azure AI Foundry, Python, MongoDB, PostgreSQL and Angular",
						],
					},
					{
						title: "UNESC",
						meta: "Software Developer (Mixed Reality) • Jun 2024 – Jun 2025",
						span: 12,
						body: "Built an assistive HoloLens 2 app for indoor navigation and accessibility.",
						list: [
							"C#, Unity, MRTK and spatial interactions",
							"World Locking Tools for persistence and drift reduction",
							"Stack: C#, Unity, MRTK, World Locking Tools and HoloLens 2",
						],
					},
					{
						title: "Audite Pro",
						meta: "COO • Jul 2022 – Feb 2023",
						span: 6,
						body: "Structured automated financial analysis from ERP data and dynamic income statements.",
						list: [
							"Decision support with data and BI",
							"Process automation and analysis consolidation",
						],
					},
					{
						title: "Sebrae • Startup SC",
						meta: "Jul 2022 – Dec 2022",
						span: 6,
						body: "Immersion in data architecture, cloud and product, with a focus on metrics and real-world problem solving.",
						list: [
							"AWS, data architecture and scalability",
							"Product management, UX/UI and growth",
						],
					},
				],
			},
			{
				title: "Selected projects",
				cards: [
					{
						title: "ericklucioh.com",
						meta: "Bilingual portfolio",
						span: 6,
						body: "My own site as a product + engineering project: bilingual content, MDX, basic SEO and static export with Next.js.",
						list: [
							"Next.js, React, TypeScript and MDX",
							"Content architecture, i18n and metadata",
						],
					},
					{
						title: "Painel do Lojista",
						meta: "Full-stack MVP",
						span: 6,
						body: "A store operations MVP with authentication, stock, cash register and sales, delivered as a technical challenge.",
						list: [
							"Next.js, Express, Prisma and MySQL",
							"JWT, refresh token and operational flow",
						],
					},
					{
						title: "Expert System for Wind Turbine Diagnostics",
						meta: "Symbolic AI",
						span: 6,
						body: "A Python prototype that uses IF-THEN rules to support explainable maintenance diagnostics.",
						list: [
							"Rules, justification and suggested action",
							"Good fit for symbolic AI and rule-based reasoning",
						],
					},
					{
						title: "YTB Superchat",
						meta: "Real-time",
						span: 6,
						body: "A streamer tool with a dashboard, browser extension and real-time OBS-ready overlay.",
						list: [
							"Extension, frontend and Go backend",
							"WebSocket and OBS-ready overlay",
						],
					},
				],
			},
			{
				title: "Stack",
				cards: [
					{
						title: "Languages",
						span: 6,
						body: "Python, SQL, C#, TypeScript, JavaScript.",
					},
					{
						title: "Backend & Data",
						span: 6,
						body: "REST APIs, Node.js, FastAPI, modeling, PostgreSQL and MongoDB.",
					},
					{
						title: "Cloud & DevOps",
						span: 6,
						body: "Azure, Docker, Git, CI/CD.",
					},
					{
						title: "Other",
						span: 6,
						body: "Software engineering, system design, Unity.",
					},
				],
			},
			{
				title: "Education",
				cards: [
					{
						title: "Computer Science • UNESC",
						meta: "2023 – 2026",
						span: 12,
						body: "Undergraduate degree focused on computing fundamentals and practical project work.",
					},
				],
			},
		],
		contact: {
			emailLabel: "Email",
			linkedinLabel: "LinkedIn",
			githubLabel: "GitHub",
		},
	},
};

function getCurriculumMetadata(lang: Lang): Metadata {
	const title = lang === "en" ? "Resume | Érick Lúcio" : "Currículo | Érick Lúcio";
	const description =
		lang === "en"
			? "Resume for Érick Lúcio focused on backend, data and applied AI."
			: "Currículo de Érick Lúcio com foco em backend, dados e IA aplicada.";

	return buildPageMetadata({
		lang,
		title,
		description,
		path: `/${lang}/curriculum`,
		image: "/og/default.svg",
		type: "website",
		alternates: {
			pt: "/pt/curriculum",
			en: "/en/curriculum",
		},
	});
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;
	if (!LANGS.includes(lang as (typeof LANGS)[number])) {
		notFound();
	}

	return getCurriculumMetadata(lang as Lang);
}

export default async function Page({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!LANGS.includes(lang as (typeof LANGS)[number])) {
		notFound();
	}

	const t = curriculumContent[lang as Lang];

	return (
		<div className={styles.page}>
			<main className={styles.container}>
				<header className={styles.hero}>
					<div>
						<div className="flex items-center gap-3">
							<Logo size={46} />
							<h1 className={styles.title}>{t.title}</h1>
						</div>
						<p className={styles.subtitle}>{t.subtitle}</p>
						<div className={styles.pillRow}>
							{t.pills.map((pill) => (
								<span key={pill} className={styles.pill}>
									{pill}
								</span>
							))}
						</div>
					</div>
				</header>

				{t.sections.map((section) => (
					<section key={section.title} className={styles.section}>
						<h2 className={styles.sectionTitle}>{section.title}</h2>
						<div className={styles.grid}>
							{section.cards.map((card) => (
								<article
									key={`${section.title}-${card.title}`}
									className={`${styles.card} ${
										card.span === 6 ? styles.span6 : ""
									}`}
								>
									<div className={styles.cardTitle}>
										<span>{card.title}</span>
										{card.meta ? (
											<span className={styles.cardMeta}>
												{card.meta}
											</span>
										) : null}
									</div>
									{card.body ? (
										<p className={styles.cardBody}>{card.body}</p>
									) : null}
									{card.list ? (
										<ul className={styles.list}>
											{card.list.map((item) => (
												<li key={item}>{item}</li>
											))}
										</ul>
									) : null}
								</article>
							))}
						</div>
					</section>
				))}

				<footer className={styles.section}>
					<h2 className={styles.sectionTitle}>
						{lang === "en" ? "Contact" : "Contato"}
					</h2>
					<div className={styles.grid}>
						<div className={styles.card}>
							<p className={styles.cardBody}>
								{t.contact.emailLabel}:{" "}
								<a
									className="underline"
									href="mailto:contato@ericklucioh.com"
									style={{ color: "var(--text-secondary)" }}
								>
									contato@ericklucioh.com
								</a>
							</p>
							<p className={styles.cardBody}>
								{t.contact.linkedinLabel}:{" "}
								<a
									className="underline"
									href="https://www.linkedin.com/in/ericklucioh"
									style={{ color: "var(--text-secondary)" }}
								>
									/in/ericklucioh
								</a>
							</p>
							<p className={styles.cardBody}>
								{t.contact.githubLabel}:{" "}
								<a
									className="underline"
									href="https://github.com/ericklucioh"
									style={{ color: "var(--text-secondary)" }}
								>
									@ericklucioh
								</a>
							</p>
						</div>
					</div>
				</footer>
			</main>
		</div>
	);
}
