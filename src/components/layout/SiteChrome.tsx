"use client";

import { usePathname } from "next/navigation";
import Menu from "@/components/layout/Menu";

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
	return normalized === "/pt/links" || normalized === "/en/links";
}

export default function SiteChrome({ buttons, actions, children }: SiteChromeProps) {
	const pathname = usePathname() ?? "";

	if (isLinksRoute(pathname)) {
		return <>{children}</>;
	}

	return (
		<>
			<Menu buttons={buttons} actions={actions} />
			<div style={{ paddingTop: "var(--header-h)" }}>{children}</div>
		</>
	);
}

