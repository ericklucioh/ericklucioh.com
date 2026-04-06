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
			<section className="mb-10 border border-[var(--text-third)] p-6 md:p-8">
				<p className="mb-3 text-sm uppercase tracking-widest text-[var(--text-secondary)]">
					{t.targetRole}
				</p>
				<h1 className="mb-4 text-3xl font-semibold md:text-5xl">{t.headline}</h1>
				<p className="max-w-3xl text-lg text-[var(--text-secondary)]">{t.subheadline}</p>
			</section>

			<section className="grid gap-4 md:grid-cols-3">
				{t.highlights.map((item) => (
					<article
						key={item.title}
						className="border border-[var(--text-third)] p-5"
					>
						<h2 className="mb-3 text-xl font-semibold">{item.title}</h2>
						<ul className="list-disc space-y-2 pl-5 text-sm text-[var(--text-secondary)]">
							{item.bullets.map((bullet) => (
								<li key={bullet}>{bullet}</li>
							))}
						</ul>
					</article>
				))}
			</section>

			<footer className="mt-10 bg-[var(--color-aux-blue)] p-6 text-white">
				<p className="mb-4 text-xl font-semibold">{t.cta}</p>
				<div className="flex flex-wrap gap-3">
					<a className="rounded-none bg-white px-4 py-2 text-black" href="mailto:contato@ericklucioh.com">
						Email
					</a>
					<a
						className="rounded-none border border-white px-4 py-2"
						href="https://www.linkedin.com/in/ericklucioh/"
					>
						LinkedIn
					</a>
					<Link className="rounded-none border border-white px-4 py-2" href={`/${lang}/links`}>
						GitHub
					</Link>
				</div>
			</footer>
		</SiteFrame>
	);
}
