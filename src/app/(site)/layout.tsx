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
					{ label: "home", href: "/pt" },
					{ label: "sobre", href: "/pt/about" },
					{ label: "projetos", href: "/pt/projects" },
					{ label: "blog", href: "/pt/blog" },
					{ label: "links", href: "/pt/links" },
				]}
			/>
			<div style={{ paddingTop: "var(--header-h)" }}>{children}</div>
		</>
	);
}
