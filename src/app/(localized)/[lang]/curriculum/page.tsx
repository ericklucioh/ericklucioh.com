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
			"Sou desenvolvedor backend, com foco em construir sistemas escaláveis, APIs robustas e soluções orientadas a dados. Trabalho principalmente com Python e TypeScript e venho explorando IA aplicada (RAG), além de já ter desenvolvido soluções em Realidade Mista (HoloLens 2).",
		pills: [
			"Araranguá - SC, Brasil",
			"Backend",
			"APIs",
			"RAG",
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
						body: "Projeto e implemento APIs REST, serviços e integrações, buscando clareza de domínio, observabilidade e evolução segura.",
						list: [
							"Design de sistemas e boas práticas de engenharia",
							"Dados: modelagem, performance e integrações",
							"Docker, Git e automações simples de CI/CD",
						],
					},
					{
						title: "IA aplicada",
						meta: "RAG e pipelines",
						span: 6,
						body: "Desenvolvo agentes e fluxos com RAG para transformar documentos e dados em respostas úteis, com arquitetura e pipelines voltados para produção.",
						list: [
							"Extração, chunking e indexação",
							"Prompting e avaliação de qualidade",
							"Azure AI Foundry",
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
						body: "Concepção e desenvolvimento end-to-end de um agente interno para análise técnica de custos de produção, com liderança técnica e levantamento de requisitos com stakeholders.",
						list: [
							"Arquitetura RAG e processamento de documentos",
							"Pipelines de dados e integrações",
							"Stack: Azure AI Foundry, Python, MongoDB, PostgreSQL, Angular",
						],
					},
					{
						title: "UNESC",
						meta: "Desenvolvedor de Software (Realidade Mista) • Jun 2024 – Jun 2025",
						span: 12,
						body: "Desenvolvimento de uma aplicação assistiva para HoloLens 2 (navegação indoor), implementando interações espaciais e garantindo estabilidade de âncoras.",
						list: [
							"MRTK, rastreamento de mãos e input espacial",
							"World Locking Tools para persistência e redução de drift",
							"Stack: C#, Unity, MRTK, World Locking Tools, HoloLens 2",
						],
					},
					{
						title: "Audite Pro",
						meta: "COO • Jul 2022 – Fev 2023",
						span: 6,
						body: "Estruturei análises financeiras automatizadas via integração com ERP e DREs dinâmicas, além de apoiar decisões com BI.",
					},
					{
						title: "Sebrae • Startup SC",
						meta: "Jul 2022 – Dez 2022",
						span: 6,
						body: "Imersão em arquitetura de dados, cloud e produto, com foco em customer success e métricas.",
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
						body: "APIs REST, Node.js, modelagem, PostgreSQL, MongoDB.",
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
			"I am a backend developer focused on scalable systems, reliable APIs, and data-driven solutions. I primarily work with Python and TypeScript and have been exploring applied AI (RAG), in addition to work I have done in Mixed Reality (HoloLens 2).",
		pills: [
			"Araranguá - SC, Brazil",
			"Backend",
			"APIs",
			"RAG",
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
						body: "I design and build REST APIs, services, and integrations with a focus on domain clarity, observability, and safe evolution.",
						list: [
							"System design and engineering best practices",
							"Data modeling, performance, and integrations",
							"Docker, Git, and lightweight CI/CD automation",
						],
					},
					{
						title: "Applied AI",
						meta: "RAG and pipelines",
						span: 6,
						body: "I develop agents and RAG flows that turn documents and data into useful answers, with architecture and pipelines built for production.",
						list: [
							"Extraction, chunking, and indexing",
							"Prompting and quality evaluation",
							"Azure AI Foundry",
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
						body: "End-to-end design and development of an internal agent for technical production cost analysis, with technical leadership and stakeholder requirement gathering.",
						list: [
							"RAG architecture and document processing",
							"Data pipelines and integrations",
							"Stack: Azure AI Foundry, Python, MongoDB, PostgreSQL, Angular",
						],
					},
					{
						title: "UNESC",
						meta: "Software Developer (Mixed Reality) • Jun 2024 – Jun 2025",
						span: 12,
						body: "Built an assistive HoloLens 2 indoor navigation app, implementing spatial interactions and keeping anchors stable.",
						list: [
							"MRTK, hand tracking, and spatial input",
							"World Locking Tools for persistence and drift reduction",
							"Stack: C#, Unity, MRTK, World Locking Tools, HoloLens 2",
						],
					},
					{
						title: "Audite Pro",
						meta: "COO • Jul 2022 – Feb 2023",
						span: 6,
						body: "Structured automated financial analysis through ERP integration and dynamic income statements, supporting decisions with BI.",
					},
					{
						title: "Sebrae • Startup SC",
						meta: "Jul 2022 – Dec 2022",
						span: 6,
						body: "Immersion in data architecture, cloud, and product, with a focus on customer success and metrics.",
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
						body: "REST APIs, Node.js, modeling, PostgreSQL, MongoDB.",
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
			? "Resume page for Érick Lúcio in English."
			: "Página de currículo de Érick Lúcio em português.";

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
