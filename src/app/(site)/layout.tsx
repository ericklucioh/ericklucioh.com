import Menu from "@/components/layout/Menu";

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Menu
				buttons={[
					{ label: "home", href: "/linktree" },
					{ label: "sobre", href: "/about" },
					{ label: "blog", href: "/blog" },
					{ label: "contato", href: "/contato" },
				]}
			/>
			<div style={{ paddingTop: "var(--header-h)" }}>{children}</div>
		</>
	);
}
