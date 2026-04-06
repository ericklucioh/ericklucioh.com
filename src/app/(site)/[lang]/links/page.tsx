import Buttons from "@/components/linktree/Buttons";
import Logo from "@/components/ui/Logo";
import * as db from "@/app/linktree/db";

export default async function LinksPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	const role = lang === "en" ? "Software Developer" : "Desenvolvedor de Software";

	return (
		<main className="mx-auto flex min-h-[80vh] w-full max-w-2xl flex-col items-center justify-center p-6">
			<div className="mb-6 flex items-center gap-3">
				<Logo size={54} smallSize={0.6} />
				<h1 className="text-3xl font-semibold">Érick Lúcio</h1>
			</div>
			<p className="mb-10 text-[var(--color-aux-blue)]">{role}</p>
			<div className="w-full">
				<Buttons items={db.contents} />
			</div>
		</main>
	);
}
