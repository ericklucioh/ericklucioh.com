import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import MdxContent from "@/components/mdx/MdxContent";
import { LANGS, type Lang, isLang } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import { getCurriculumByLang } from "@/lib/curriculum";
import styles from "./page.module.css";
import CurriculumToolbar from "./CurriculumToolbar";

export const dynamicParams = false;

export function generateStaticParams() {
	return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;
	const safeLang = isLang(lang) ? lang : "pt";
	const title = safeLang === "en" ? "Resume | Érick Lúcio" : "Currículo | Érick Lúcio";
	const description =
		safeLang === "en"
			? "Resume for Érick Lúcio focused on backend, data and applied AI."
			: "Currículo de Érick Lúcio com foco em backend, dados e IA aplicada.";

	return buildPageMetadata({
		lang: safeLang,
		title,
		description,
		path: `/${safeLang}/curriculum`,
		image: "/og/default.svg",
		type: "website",
		alternates: {
			pt: "/pt/curriculum",
			en: "/en/curriculum",
		},
	});
}

export default async function Page({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLang(lang)) notFound();

	const t = await getCurriculumByLang(lang as Lang);

	return (
		<SiteFrame withDecor={false} mainClassName="w-full">
			<main className={styles.page}>
				<div className={styles.container}>
					<CurriculumToolbar lang={lang as Lang} />

					<header className={styles.hero}>
						<div>
							<p className={styles.kicker}>{t.role}</p>
							<h1 className={styles.title}>{t.name}</h1>
							<p className={styles.subtitle}>{t.subtitle}</p>
							<div className={styles.pillRow}>
								{t.pills.map((pill) => (
									<span key={pill} className={styles.pill}>
										{pill}
									</span>
								))}
							</div>
						</div>

						<div className={styles.contactBlock}>
							<a className={styles.contactLink} href={`mailto:${t.contact.email}`}>
								<span>E-mail</span>
								<strong>{t.contact.email}</strong>
							</a>
							<a
								className={styles.contactLink}
								href={t.contact.linkedin}
								target="_blank"
								rel="noreferrer"
							>
								<span>LinkedIn</span>
								<strong>/in/ericklucioh</strong>
							</a>
							<a
								className={styles.contactLink}
								href={t.contact.github}
								target="_blank"
								rel="noreferrer"
							>
								<span>GitHub</span>
								<strong>@ericklucioh</strong>
							</a>
						</div>
					</header>

					<section className={styles.content}>
						<MdxContent Content={t.Content} className="markdown" />
					</section>
				</div>
			</main>
		</SiteFrame>
	);
}
