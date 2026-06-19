import Link from "next/link";
import type { PostSummary } from "@/lib/posts";
import type { Lang } from "@/lib/i18n";

type BlogIndexProps = {
	lang: Lang;
	posts: PostSummary[];
	tags: string[];
	activeTag?: string;
};

export default function BlogIndex({
	lang,
	posts,
	tags,
	activeTag,
}: BlogIndexProps) {
	const visiblePosts = activeTag
		? posts.filter((post) => (post.tags ?? []).includes(activeTag))
		: posts;

	return (
		<>
			<h1 className="ui-title">Blog</h1>
			<p className="ui-subtitle">
				{lang === "en"
					? "Notes about backend, AI, and software delivery."
					: "Notas sobre backend, IA e entrega de software."}
			</p>

			<div className="ui-pillRow">
				<Link href={`/${lang}/blog`} className="ui-pill">
					{lang === "en" ? "All" : "Todos"}
				</Link>
				{tags.map((tag) => (
					<Link
						key={tag}
						href={`/${lang}/blog?tag=${tag}`}
						className="ui-pill"
					>
						#{tag}
					</Link>
				))}
			</div>

			<section className="space-y-4">
				{visiblePosts.map((post) => (
					<article
						key={post.slug}
						className="ui-card transition hover:border-[var(--color-aux-blue)]"
					>
						<p className="mb-2 text-xs uppercase tracking-widest text-[var(--text-secondary)]">
							{new Date(post.date).toLocaleDateString(
								lang === "en" ? "en-US" : "pt-BR",
							)}
						</p>
						<h2 className="mb-2 text-xl font-semibold">
							{post.title}
						</h2>
						{post.excerpt ? (
							<p className="ui-subtitle" style={{ marginTop: 0 }}>
								{post.excerpt}
							</p>
						) : null}
						<div className="mb-3 flex flex-wrap gap-2 text-xs text-[var(--text-secondary)]">
							{(post.tags ?? []).map((item) => (
								<span key={item}>#{item}</span>
							))}
						</div>
						<Link
							href={`/${lang}/blog/${post.slug}`}
							className="underline"
						>
							{lang === "en" ? "Read post" : "Ler post"}
						</Link>
					</article>
				))}

				{visiblePosts.length === 0 ? (
					<p className="text-sm text-[var(--text-secondary)]">
						{lang === "en"
							? "No posts for this tag yet."
							: "Ainda não há posts para essa tag."}
					</p>
				) : null}
			</section>
		</>
	);
}
