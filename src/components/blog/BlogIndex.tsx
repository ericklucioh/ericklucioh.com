import Link from "next/link";
import type { BlogPost } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

type BlogIndexProps = {
	lang: Lang;
	posts: BlogPost[];
	tags: string[];
	activeTag?: string;
};

export default function BlogIndex({ lang, posts, tags, activeTag }: BlogIndexProps) {
	const visiblePosts = activeTag ? posts.filter((post) => post.tags.includes(activeTag)) : posts;

	return (
		<main className="mx-auto max-w-5xl p-6 md:p-10">
			<h1 className="mb-3 text-3xl font-semibold">Blog</h1>
			<p className="mb-6 text-[var(--text-secondary)]">
				{lang === "en"
					? "Notes about backend, AI, and software delivery."
					: "Notas sobre backend, IA e entrega de software."}
			</p>

			<div className="mb-8 flex flex-wrap gap-2">
				<Link href={`/${lang}/blog`} className="rounded-full border border-[var(--text-third)] px-3 py-1 text-sm">
					{lang === "en" ? "All" : "Todos"}
				</Link>
				{tags.map((tag) => (
					<Link
						key={tag}
						href={`/${lang}/blog?tag=${tag}`}
						className="rounded-full border border-[var(--text-third)] px-3 py-1 text-sm"
					>
						#{tag}
					</Link>
				))}
			</div>

			<section className="space-y-4">
				{visiblePosts.map((post) => (
					<article
						key={post.slug}
						className="rounded-2xl border border-[var(--text-third)] p-5 transition hover:border-[var(--color-aux-blue)]"
					>
						<p className="mb-2 text-xs uppercase tracking-widest text-[var(--text-secondary)]">
							{new Date(post.publishedAt).toLocaleDateString(lang === "en" ? "en-US" : "pt-BR")}
						</p>
						<h2 className="mb-2 text-xl font-semibold">{post.title[lang]}</h2>
						<p className="mb-4 text-[var(--text-secondary)]">{post.excerpt[lang]}</p>
						<div className="mb-3 flex flex-wrap gap-2 text-xs text-[var(--text-secondary)]">
							{post.tags.map((item) => (
								<span key={item}>#{item}</span>
							))}
						</div>
						<Link href={`/${lang}/blog/${post.slug}`} className="underline">
							{lang === "en" ? "Read post" : "Ler post"}
						</Link>
					</article>
				))}

				{visiblePosts.length === 0 ? (
					<p className="text-sm text-[var(--text-secondary)]">
						{lang === "en" ? "No posts for this tag yet." : "Ainda não há posts para essa tag."}
					</p>
				) : null}
			</section>
		</main>
	);
}
