import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import { getLocalizedPath, isLang, LANGS, type Lang } from "@/lib/i18n";

const homeContent = {
	pt: {
		eyebrow: "Backend, dados e IA aplicada",
		title: "Desenvolvedor de Software",
		intro: "Construo APIs e sistemas que saem do rascunho e chegam em uso real.",
		subtitle:
			"Meu foco é backend: regra, integração e previsibilidade. IA entra quando reduz trabalho, melhora decisão ou organiza informação.",
		pillars: [
			{
				title: "Backend",
				bullets: [
					"APIs REST, autenticação e integrações com domínio claro",
					"Python, TypeScript, FastAPI, Node.js, Prisma e SQL",
				],
			},
			{
				title: "IA aplicada",
				bullets: [
					"RAG, validação e pré-processamento antes da LLM",
					"IA para consulta, automação e apoio operacional",
				],
			},
			{
				title: "Dados e entrega",
				bullets: [
					"PostgreSQL, MySQL, MongoDB e modelagem simples de manter",
					"Docker, Azure, observabilidade e deploy sem ritual",
				],
			},
		],
		featuredTitle: "Projetos que mostram o que entrego",
		featured: [
			{
				title: "Agente de IA para análise de custos industriais",
				description:
					"Backend em Python com dados estruturados, histórico de conversas, RAG e validação para apoiar análise de custos.",
			},
			{
				title: "Painel do Lojista",
				description:
					"MVP full-stack com autenticação, acesso por perfil, estoque, caixa, vendas e recibo usando Node.js, TypeScript, Prisma e MySQL.",
			},
			{
				title: "TCC: Monolito vs Microsserviços",
				description:
					"Estudo comparando arquiteturas em servidor limitado com Go, Docker, k3s, PostgreSQL e gRPC, medindo latência e consumo.",
			},
		],
		closing:
			"Se o problema pede backend, dados e IA com controle, é nessa faixa que eu trabalho melhor.",
		projectsCta: "Ver projetos",
		aboutCta: "Sobre mim",
	},
	en: {
		eyebrow: "Backend, data and applied AI",
		title: "Software Developer",
		intro: "I build APIs and systems that move from draft to real use.",
		subtitle:
			"My focus is backend: rules, integrations and predictability. I use AI when it saves time, improves decisions, or helps organize information.",
		pillars: [
			{
				title: "Backend",
				bullets: [
					"REST APIs, authentication and domain-aware integrations",
					"Python, TypeScript, FastAPI, Node.js, Prisma and SQL",
				],
			},
			{
				title: "Applied AI",
				bullets: [
					"RAG, validation and preprocessing before the LLM",
					"AI for lookup, automation and operational support",
				],
			},
			{
				title: "Data and delivery",
				bullets: [
					"PostgreSQL, MySQL, MongoDB and maintainable data models",
					"Docker, Azure, observability and deployment without ceremony",
				],
			},
		],
		featuredTitle: "Projects that show what I deliver",
		featured: [
			{
				title: "AI agent for industrial cost analysis",
				description:
					"Python backend with structured data, chat history, RAG and validation to support cost analysis.",
			},
			{
				title: "Retailer Dashboard",
				description:
					"Full-stack MVP with authentication, role-based access, stock, cash register, sales and receipts using Node.js, TypeScript, Prisma and MySQL.",
			},
			{
				title: "Thesis: Monolith vs Microservices",
				description:
					"Architecture comparison on a resource-constrained server using Go, Docker, k3s, PostgreSQL and gRPC, measuring latency and usage.",
			},
		],
		closing:
			"I do my best work on problems that need backend, data and AI with control.",
		projectsCta: "View projects",
		aboutCta: "About me",
	},
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
	return LANGS.map((lang) => ({ lang }));
}

export default async function HomePage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLang(lang)) notFound();

	const t = homeContent[lang as Lang];

	return (
		<SiteFrame
			withDecor={false}
			mainClassName="w-full max-w-[1180px] mx-auto px-4 md:px-6 py-7 pb-16"
		>
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
