"use client";

import { usePathname } from "next/navigation";
import Menu from "@/components/layout/Menu";
import Footer from "@/components/layout/Footer";

type MenuItem = {
	label: string;
	href: string;
	external?: boolean;
};

type SiteChromeProps = {
	buttons: MenuItem[];
	actions?: MenuItem[];
	children: React.ReactNode;
};

function isLinksRoute(pathname: string) {
	const normalized = pathname.replace(/\/$/, "");
	return normalized === "/links" || normalized === "/pt/links" || normalized === "/en/links";
}

export default function SiteChrome({ buttons, actions, children }: SiteChromeProps) {
	const pathname = usePathname() ?? "";

	if (isLinksRoute(pathname)) {
		return <>{children}</>;
	}

	return (
		<div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
			<Menu buttons={buttons} actions={actions} />
			<div style={{ paddingTop: "var(--header-h)", flex: "1 0 auto" }}>{children}</div>
			<Footer />
		</div>
	);
}
