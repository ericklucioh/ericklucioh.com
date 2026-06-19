import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import { getLocalizedPath, isLang, type Lang } from "@/lib/i18n";

const homeContent = {
	pt: {
		eyebrow: "Backend, IA aplicada e dados",
		title: "Desenvolvedor de Software",
		intro:
			"Construo APIs, integrações e aplicações que conectam regras de negócio, bancos de dados, modelos de IA e interfaces web.",
		subtitle:
			"Meu foco principal é backend, com experiência prática em Python, TypeScript, C#, Go, Docker, Azure, PostgreSQL, MongoDB e projetos envolvendo RAG, automação, análise de dados, realidade mista e sistemas distribuídos.",
		pillars: [
			{
				title: "Backend",
				bullets: [
					"APIs REST, autenticação, integrações e regras de negócio",
					"FastAPI, Node.js, Express, Prisma e bancos relacionais",
					"Fluxos pensados para manutenção, previsibilidade e execução",
				],
			},
			{
				title: "IA aplicada",
				bullets: [
					"LLMs integradas a sistemas reais, não só demos isoladas",
					"RAG, pré-processamento, validação por regras e dados estruturados",
					"Uso pragmático de IA com foco em utilidade e controle",
				],
			},
			{
				title: "Dados e arquitetura",
				bullets: [
					"PostgreSQL, MySQL, MongoDB, SQL e organização de pipelines",
					"gRPC, microsserviços, monolito, k3s e observabilidade",
					"Aplicações que conectam backend, dados, frontend e cloud",
				],
			},
		],
		featuredTitle: "Projetos em destaque",
		featured: [
			{
				title: "Agente de IA para análise de custos industriais",
				description:
					"Solução com backend em Python, integração com dados, histórico de conversas, RAG, validação de respostas e uso de Azure AI Foundry.",
			},
			{
				title: "Painel do Lojista",
				description:
					"MVP full-stack com autenticação, controle de acesso, CRUDs, estoque, caixa, vendas e recibo usando Node.js, TypeScript, Prisma, MySQL e Next.js.",
			},
			{
				title: "TCC: Monolito vs Microsserviços",
				description:
					"Estudo comparando arquiteturas em servidor limitado com Go, Docker, k3s, PostgreSQL e gRPC, avaliando latência, erro e consumo de recursos.",
			},
		],
		closing:
			"Meu trabalho fica entre produto e engenharia: transformar problemas complexos em sistemas compreensíveis, testáveis e úteis.",
		projectsCta: "Ver projetos",
		aboutCta: "Ler sobre mim",
	},
	en: {
		eyebrow: "Backend, applied AI and data",
		title: "Software Developer",
		intro:
			"I build APIs, integrations and applications that connect business rules, databases, AI models and web interfaces.",
		subtitle:
			"My main focus is backend, with hands-on experience in Python, TypeScript, C#, Go, Docker, Azure, PostgreSQL, MongoDB and projects involving RAG, automation, data analysis, mixed reality and distributed systems.",
		pillars: [
			{
				title: "Backend",
				bullets: [
					"REST APIs, authentication, integrations and business rules",
					"FastAPI, Node.js, Express, Prisma and relational databases",
					"Systems built for maintainability, predictability and execution",
				],
			},
			{
				title: "Applied AI",
				bullets: [
					"LLMs integrated into real systems, not isolated demos",
					"RAG, preprocessing, rule-based validation and structured data",
					"Pragmatic AI focused on usefulness and operational control",
				],
			},
			{
				title: "Data and architecture",
				bullets: [
					"PostgreSQL, MySQL, MongoDB, SQL and lean pipeline design",
					"gRPC, microservices, monoliths, k3s and observability",
					"Applications that connect backend, data, frontend and cloud",
				],
			},
		],
		featuredTitle: "Featured work",
		featured: [
			{
				title: "AI agent for industrial cost analysis",
				description:
					"Solution built with Python backend, data integration, chat history, RAG, response validation and Azure AI Foundry.",
			},
			{
				title: "Retailer Dashboard",
				description:
					"Full-stack MVP with authentication, role-based access, CRUD flows, stock, cash register, sales and receipts using Node.js, TypeScript, Prisma, MySQL and Next.js.",
			},
			{
				title: "Thesis: Monolith vs Microservices",
				description:
					"Architecture comparison on a resource-constrained server using Go, Docker, k3s, PostgreSQL and gRPC, measuring latency, error rate and resource usage.",
			},
		],
		closing:
			"My work sits between product and engineering: turning complex problems into understandable, testable and useful systems.",
		projectsCta: "View projects",
		aboutCta: "Read about me",
	},
} as const;

export default async function HomePage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLang(lang)) notFound();

	const t = homeContent[lang as Lang];

	return (
		<SiteFrame withDecor={false}>
			<section className="ui-card ui-cardLg mb-10">
				<p className="mb-3 text-sm uppercase tracking-widest text-[var(--text-secondary)]">
					{t.eyebrow}
				</p>
				<h1 className="ui-title">{t.title}</h1>
				<p className="ui-subtitle">{t.intro}</p>
				<p className="ui-subtitle mt-4">{t.subtitle}</p>
				<div className="mt-8 flex flex-wrap gap-3">
					<Link
						href={getLocalizedPath(lang, "projects")}
						className="ui-card px-4 py-3 text-sm font-medium transition hover:border-[var(--color-aux-blue)]"
					>
						{t.projectsCta}
					</Link>
					<Link
						href={getLocalizedPath(lang, "about")}
						className="ui-card px-4 py-3 text-sm font-medium transition hover:border-[var(--color-aux-blue)]"
					>
						{t.aboutCta}
					</Link>
				</div>
			</section>

			<section className="grid gap-4 md:grid-cols-3">
				{t.pillars.map((item) => (
					<article key={item.title} className="ui-card">
						<h2 className="mb-3 text-xl font-semibold">
							{item.title}
						</h2>
						<ul className="ui-list text-sm">
							{item.bullets.map((bullet) => (
								<li key={bullet}>{bullet}</li>
							))}
						</ul>
					</article>
				))}
			</section>

			<section className="mt-12">
				<h2 className="ui-sectionTitle">{t.featuredTitle}</h2>
				<div className="mt-4 grid gap-4 md:grid-cols-3">
					{t.featured.map((item) => (
						<article key={item.title} className="ui-card">
							<h3 className="text-lg font-semibold">
								{item.title}
							</h3>
							<p className="ui-subtitle mt-3 max-w-none">
								{item.description}
							</p>
						</article>
					))}
				</div>
			</section>

			<section className="mt-12">
				<article className="ui-card">
					<p className="ui-subtitle max-w-none">{t.closing}</p>
				</article>
			</section>
		</SiteFrame>
	);
}
