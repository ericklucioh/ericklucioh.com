import BaseDecor from "@/components/decorations/BaseDecor";
import DotGrid from "@/components/decorations/DotGrid";
import Square from "@/components/decorations/Square";
import Logo from "@/components/ui/Logo";
import styles from "./page.module.css";

export default function Page() {
	return (
		<div className={styles.page}>
			<BaseDecor top left x={2} y={10}>
				<DotGrid rows={4} cols={6} gap={18} />
			</BaseDecor>
			<BaseDecor top right x={6} y={4}>
				<Square sizeX={160} sizeY={60} />
			</BaseDecor>
			<BaseDecor bottom left x={2} y={8}>
				<Square sizeX={120} sizeY={120} />
			</BaseDecor>
			<BaseDecor bottom right x={2} y={16}>
				<DotGrid rows={4} cols={4} gap={16} />
			</BaseDecor>

			<main className={styles.container}>
				<header className={styles.hero}>
					<div>
						<div className="flex items-center gap-3">
							<Logo size={46} />
							<h1 className={styles.title}>Sobre</h1>
						</div>
						<p className={styles.subtitle}>
							Sou desenvolvedor backend, com foco em construir
							sistemas escaláveis, APIs robustas e soluções
							orientadas a dados. Trabalho principalmente com
							Python e TypeScript e venho explorando IA aplicada
							(RAG), além de já ter desenvolvido soluções em
							Realidade Mista (HoloLens 2).
						</p>
						<div className={styles.pillRow}>
							<span className={styles.pill}>
								Araranguá - SC, Brasil
							</span>
							<span className={styles.pill}>Backend</span>
							<span className={styles.pill}>APIs</span>
							<span className={styles.pill}>RAG</span>
							<span className={styles.pill}>Azure</span>
							<span className={styles.pill}>
								PostgreSQL • MongoDB
							</span>
						</div>
					</div>
				</header>

				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>O que eu faço</h2>
					<div className={styles.grid}>
						<div className={`${styles.card} ${styles.span6}`}>
							<div className={styles.cardTitle}>
								<span>APIs & Backend</span>
								<span className={styles.cardMeta}>
									Arquitetura e execução
								</span>
							</div>
							<p className={styles.cardBody}>
								Projeto e implemento APIs REST, serviços e
								integrações, buscando clareza de domínio,
								observabilidade e evolução segura.
							</p>
							<ul className={styles.list}>
								<li>
									Design de sistemas e boas práticas de
									engenharia
								</li>
								<li>
									Dados: modelagem, performance e integrações
								</li>
								<li>
									Docker, Git e automações simples de CI/CD
								</li>
							</ul>
						</div>
						<div className={`${styles.card} ${styles.span6}`}>
							<div className={styles.cardTitle}>
								<span>IA aplicada</span>
								<span className={styles.cardMeta}>
									RAG e pipelines
								</span>
							</div>
							<p className={styles.cardBody}>
								Desenvolvo agentes e fluxos com RAG para
								transformar documentos e dados em respostas
								úteis, com arquitetura e pipelines voltados para
								produção.
							</p>
							<ul className={styles.list}>
								<li>Extração, chunking e indexação</li>
								<li>Prompting e avaliação de qualidade</li>
								<li>Azure AI Foundry</li>
							</ul>
						</div>
					</div>
				</section>

				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>Experiência</h2>
					<div className={styles.grid}>
						<article className={styles.card}>
							<div className={styles.cardTitle}>
								<span>UNESC</span>
								<span className={styles.cardMeta}>
									Desenvolvedor de Software (IA e Backend) •
									Jul 2025 – Atual
								</span>
							</div>
							<p className={styles.cardBody}>
								Concepção e desenvolvimento end-to-end de um
								agente interno para análise técnica de custos de
								produção, com liderança técnica e levantamento
								de requisitos com stakeholders.
							</p>
							<ul className={styles.list}>
								<li>
									Arquitetura RAG e processamento de
									documentos
								</li>
								<li>Pipelines de dados e integrações</li>
								<li>
									Stack: Azure AI Foundry, Python, MongoDB,
									PostgreSQL, Angular
								</li>
							</ul>
						</article>

						<article className={styles.card}>
							<div className={styles.cardTitle}>
								<span>UNESC</span>
								<span className={styles.cardMeta}>
									Desenvolvedor de Software (Realidade Mista)
									• Jun 2024 – Jun 2025
								</span>
							</div>
							<p className={styles.cardBody}>
								Desenvolvimento de uma aplicação assistiva para
								HoloLens 2 (navegação indoor), implementando
								interações espaciais e garantindo estabilidade
								de âncoras.
							</p>
							<ul className={styles.list}>
								<li>
									MRTK, rastreamento de mãos e input espacial
								</li>
								<li>
									World Locking Tools para persistência e
									redução de drift
								</li>
								<li>
									Stack: C#, Unity, MRTK, World Locking Tools,
									HoloLens 2
								</li>
							</ul>
						</article>

						<article className={`${styles.card} ${styles.span6}`}>
							<div className={styles.cardTitle}>
								<span>Audite Pro</span>
								<span className={styles.cardMeta}>
									COO • Jul 2022 – Fev 2023
								</span>
							</div>
							<p className={styles.cardBody}>
								Estruturei análises financeiras automatizadas
								via integração com ERP e DREs dinâmicas, além de
								apoiar decisões com BI.
							</p>
						</article>

						<article className={`${styles.card} ${styles.span6}`}>
							<div className={styles.cardTitle}>
								<span>Sebrae • Startup SC</span>
								<span className={styles.cardMeta}>
									Jul 2022 – Dez 2022
								</span>
							</div>
							<p className={styles.cardBody}>
								Imersão em arquitetura de dados, cloud e
								produto, com foco em customer success e
								métricas.
							</p>
						</article>
					</div>
				</section>

				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>Stack</h2>
					<div className={styles.grid}>
						<div className={`${styles.card} ${styles.span6}`}>
							<div className={styles.cardTitle}>
								<span>Linguagens</span>
							</div>
							<p className={styles.cardBody}>
								Python, SQL, C#, TypeScript, JavaScript.
							</p>
						</div>
						<div className={`${styles.card} ${styles.span6}`}>
							<div className={styles.cardTitle}>
								<span>Backend & Dados</span>
							</div>
							<p className={styles.cardBody}>
								APIs REST, Node.js, modelagem, PostgreSQL,
								MongoDB.
							</p>
						</div>
						<div className={`${styles.card} ${styles.span6}`}>
							<div className={styles.cardTitle}>
								<span>Cloud & DevOps</span>
							</div>
							<p className={styles.cardBody}>
								Azure, Docker, Git, CI/CD.
							</p>
						</div>
						<div className={`${styles.card} ${styles.span6}`}>
							<div className={styles.cardTitle}>
								<span>Outros</span>
							</div>
							<p className={styles.cardBody}>
								Engenharia de software, design de sistemas,
								Unity.
							</p>
						</div>
					</div>
				</section>

				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>Formação</h2>
					<div className={styles.grid}>
						<div className={styles.card}>
							<div className={styles.cardTitle}>
								<span>Ciência da Computação • UNESC</span>
								<span className={styles.cardMeta}>
									2023 – 2026
								</span>
							</div>
							<p className={styles.cardBody}>
								Graduação com foco em fundamentos de computação
								e aplicação prática em projetos.
							</p>
						</div>
					</div>
				</section>

				<footer className={styles.section}>
					<h2 className={styles.sectionTitle}>Contato</h2>
					<div className={styles.grid}>
						<div className={styles.card}>
							<p className={styles.cardBody}>
								E-mail:{" "}
								<a
									className="underline"
									href="mailto:contato@ericklucioh.com"
									style={{ color: "var(--text-secondary)" }}
								>
									contato@ericklucioh.com
								</a>
							</p>
							<p className={styles.cardBody}>
								LinkedIn:{" "}
								<a
									className="underline"
									href="https://www.linkedin.com/in/ericklucioh"
									style={{ color: "var(--text-secondary)" }}
								>
									/in/ericklucioh
								</a>
							</p>
							<p className={styles.cardBody}>
								GitHub:{" "}
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
