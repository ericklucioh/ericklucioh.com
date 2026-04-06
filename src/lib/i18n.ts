export const LANGS = ["pt", "en"] as const;

export type Lang = (typeof LANGS)[number];

export function isLang(value: string): value is Lang {
	return LANGS.includes(value as Lang);
}

export const copy = {
	pt: {
		nav: {
			home: "home",
			about: "sobre",
			projects: "projetos",
			cv: "Baixar CV",
			blog: "blog",
		},
		home: {
			targetRole: "Backend + IA",
			headline: "Eu construo backends e produtos com IA que viram entrega real.",
			subheadline:
				"API sólida, dados organizados e IA aplicada com foco em produção, custo e resultado.",
			highlights: [
				{
					title: "Backend / APIs",
					bullets: [
						"Node.js + TypeScript para APIs REST",
						"Modelagem de domínio e integrações",
						"Observabilidade e manutenção",
					],
				},
				{
					title: "Dados",
					bullets: [
						"PostgreSQL e MongoDB em cenários reais",
						"Pipelines simples com foco em valor",
						"Consultas e estrutura para escala",
					],
				},
				{
					title: "IA / RAG",
					bullets: [
						"Ingestão, chunking e indexação",
						"Assistentes orientados a contexto",
						"Fluxos com Azure AI Foundry",
					],
				},
			],
			cta: "Vamos conversar sobre seu projeto",
		},
		about: {
			title: "Sobre",
			description:
				"Atuo na construção de soluções backend e IA aplicada para gerar resultado mensurável: menos retrabalho, mais previsibilidade e melhor tomada de decisão.",
			skillsTitle: "Skills",
			skills: {
				backend: "Node.js, TypeScript, APIs REST, arquitetura",
				data: "PostgreSQL, MongoDB, SQL, pipelines",
				cloud: "Azure, deploy, custos e segurança básica",
				devops: "Docker, CI/CD, monitoramento e logs",
			},
			availableTitle: "Disponível para",
			available: ["Remoto ou híbrido", "Brasil (SC) e fuso UTC-3", "Vagas Backend ou Backend + IA"],
		},
		projects: {
			title: "Projetos",
			subtitle: "Página preparada para receber os cases reais.",
			soon: "em breve",
			cards: [
				"Plataforma de análise de custos com IA",
				"RAG para documentos técnicos",
				"API de integração ERP + BI",
				"Dashboard operacional com alertas",
			],
		},
	},
	en: {
		nav: {
			home: "home",
			about: "about",
			projects: "projects",
			links: "links",
			cv: "Download CV",
			blog: "blog",
		},
		home: {
			targetRole: "Backend + AI",
			headline: "I build backend and AI products that ship real outcomes.",
			subheadline:
				"Reliable APIs, clean data foundations, and practical AI focused on production value.",
			highlights: [
				{
					title: "Backend / APIs",
					bullets: [
						"Node.js + TypeScript REST APIs",
						"Domain modeling and integrations",
						"Observability and maintainability",
					],
				},
				{
					title: "Data",
					bullets: [
						"PostgreSQL and MongoDB in real products",
						"Lean pipelines focused on outcomes",
						"Queries and structures for scale",
					],
				},
				{
					title: "AI / RAG",
					bullets: [
						"Ingestion, chunking and indexing",
						"Context-aware assistants",
						"Azure AI Foundry workflows",
					],
				},
			],
			cta: "Let’s talk about your project",
		},
		about: {
			title: "About",
			description:
				"I build backend and applied AI solutions focused on measurable outcomes: less rework, better predictability, and improved decision-making.",
			skillsTitle: "Skills",
			skills: {
				backend: "Node.js, TypeScript, REST APIs, architecture",
				data: "PostgreSQL, MongoDB, SQL, pipelines",
				cloud: "Azure, deployment, costs and baseline security",
				devops: "Docker, CI/CD, monitoring and logs",
			},
			availableTitle: "Available for",
			available: ["Remote or hybrid", "Brazil (SC), UTC-3", "Backend or Backend + AI roles"],
		},
		projects: {
			title: "Projects",
			subtitle: "This page is ready for real case studies.",
			soon: "coming soon",
			cards: [
				"AI-powered production cost analysis platform",
				"Technical document RAG assistant",
				"ERP + BI integration API",
				"Operational dashboard with alerting",
			],
		},
	},
} as const;
