export const LANGS = ["pt", "en"] as const;
export const DEFAULT_LANG = "pt" as const;

export type Lang = (typeof LANGS)[number];

export function isLang(value: string): value is Lang {
	return LANGS.includes(value as Lang);
}

export function generateLangStaticParams() {
	return LANGS.map((lang) => ({ lang }));
}

export function hasLangPrefix(pathname: string) {
	const [firstSegment = ""] = pathname.split("/").filter(Boolean);
	return isLang(firstSegment);
}

export const localizedRouteSegments = {
	pt: {
		home: "",
		about: "about",
		projects: "projects",
		blog: "blog",
		links: "links",
		curriculum: "curriculum",
	},
	en: {
		home: "",
		about: "about",
		projects: "projects",
		blog: "blog",
		links: "links",
		curriculum: "curriculum",
	},
} as const;

export type LocalizedRouteKey = keyof (typeof localizedRouteSegments)["en"];

const routeAliases: Record<LocalizedRouteKey, readonly string[]> = {
	home: [],
	about: ["about"],
	projects: ["projects"],
	blog: ["blog"],
	links: ["links"],
	curriculum: ["curriculum"],
};

export function getLocalizedPath(
	lang: Lang,
	route: LocalizedRouteKey,
	...segments: string[]
) {
	const baseSegment = localizedRouteSegments[lang][route];
	const pathSegments = baseSegment ? [baseSegment, ...segments] : segments;
	return `/${lang}${pathSegments.length ? `/${pathSegments.join("/")}` : ""}`;
}

function getRouteKeyFromSegment(segment: string): LocalizedRouteKey | null {
	for (const [route, aliases] of Object.entries(routeAliases) as Array<
		[LocalizedRouteKey, readonly string[]]
	>) {
		if (aliases.includes(segment)) {
			return route;
		}
	}

	return null;
}

export function swapLangPath(pathname: string, target: Lang) {
	const segments = pathname.split("/").filter(Boolean);
	const hasLangPrefix = isLang(segments[0] ?? "");
	const currentSegments = hasLangPrefix ? segments.slice(1) : segments;

	if (!currentSegments.length) {
		return `/${target}`;
	}

	const route = getRouteKeyFromSegment(currentSegments[0]);
	if (!route) {
		return `/${target}/${currentSegments.join("/")}`;
	}

	return getLocalizedPath(target, route, ...currentSegments.slice(1));
}

export const copy = {
	pt: {
			nav: {
				home: "home",
				about: "sobre",
				projects: "projetos",
				blog: "blog",
			},
			home: {
				targetRole: "Backend",
				headline: "Desenvolvedor de Software",
			subheadline:
				"Transformação de texto em dados estruturados com pré-processamento, regras e LLM quando necessário.",
			highlights: [
				{
					title: "Interpretação",
					bullets: [
						"Regex e heurística antes da LLM",
						"Normalização de termos e aliases",
						"Redução de ambiguidade na entrada",
					],
				},
				{
					title: "Estruturação",
					bullets: [
						"Geração de JSON intermediário",
						"Validação e correção fora da LLM",
						"Regras de negócio aplicadas por código",
					],
				},
				{
					title: "Execução",
					bullets: [
						"APIs em Node.js + TypeScript",
						"Integração com banco e pipelines",
						"Controle de fluxo e observabilidade",
					],
				},
			],
		},
		about: {
			title: "Sobre",
			description:
				"Construção de backend e IA aplicada com foco em controle de execução, previsibilidade e redução de custo de inferência.",
			skillsTitle: "Skills",
			skills: {
				backend: "Node.js, TypeScript, APIs REST, arquitetura",
				data: "PostgreSQL, MongoDB, SQL, pipelines",
				cloud: "Azure, deploy e custos",
				devops: "Docker, CI/CD, monitoramento",
			},
			availableTitle: "Disponível para",
			available: [
				"Remoto ou híbrido",
				"Brasil (SC) UTC-3",
				"Backend ou Backend + IA",
			],
		},
		projects: {
			title: "Projetos",
			subtitle: "Casos reais e experimentos.",
			soon: "em breve",
			cards: [
				"NL2SQL com validação por regras",
				"RAG com pré-processamento determinístico",
				"Integração ERP com camada semântica",
				"Pipeline de análise de custos",
			],
		},
	},
		en: {
		nav: {
			home: "home",
			about: "about",
			projects: "projects",
			links: "links",
			blog: "blog",
		},
			home: {
				targetRole: "Backend + AI",
				headline: "Software developer",
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
			available: [
				"Remote or hybrid",
				"Brazil (SC), UTC-3",
				"Backend or Backend + AI roles",
			],
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
