import Link from "next/link";
import SiteFrame from "@/components/layout/SiteFrame";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "error";

export default async function BlogIndexPage() {
	const posts = await getAllPosts();

	return (
		<SiteFrame>
			<header className="ui-card ui-cardLg">
				<h1 className="ui-title">Blog</h1>
				<p className="ui-subtitle">Posts em Markdown, exportados como HTML estático.</p>
			</header>

			<section className="mt-12 grid gap-4">
				{posts.map((post) => (
					<article key={post.slug} className="ui-card">
						<p className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">
							{new Date(post.date).toLocaleDateString("pt-BR")}
						</p>
						<h2 style={{ marginTop: 10 }} className="text-xl font-semibold">
							<Link href={`/blog/${post.slug}`} className="underline">
								{post.title}
							</Link>
						</h2>
						{post.excerpt ? (
							<p className="ui-subtitle" style={{ marginTop: 10 }}>
								{post.excerpt}
							</p>
						) : null}
					</article>
				))}
			</section>
		</SiteFrame>
	);
}

