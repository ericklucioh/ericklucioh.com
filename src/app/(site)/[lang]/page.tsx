import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFrame from "@/components/layout/SiteFrame";
import { copy, isLang, type Lang } from "@/lib/i18n";

export default async function HomePage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLang(lang)) notFound();

	const t = copy[lang as Lang].home;

	return (
		<SiteFrame>
			<section className="ui-card ui-cardLg mb-10">
				<p className="mb-3 text-sm uppercase tracking-widest text-[var(--text-secondary)]">
					{t.targetRole}
				</p>
				<h1 className="ui-title">{t.headline}</h1>
				<p className="ui-subtitle">{t.subheadline}</p>
			</section>

			<section className="grid gap-4 md:grid-cols-3">
				{t.highlights.map((item) => (
					<article
						key={item.title}
						className="ui-card"
					>
						<h2 className="mb-3 text-xl font-semibold">{item.title}</h2>
						<ul className="ui-list text-sm">
							{item.bullets.map((bullet) => (
								<li key={bullet}>{bullet}</li>
							))}
						</ul>
					</article>
				))}
			</section>
		</SiteFrame>
	);
}
