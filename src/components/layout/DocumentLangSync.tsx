"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function resolveDocumentLang(pathname: string) {
	return pathname.startsWith("/en") ? "en-US" : "pt-BR";
}

export default function DocumentLangSync() {
	const pathname = usePathname();

	useEffect(() => {
		document.documentElement.lang = resolveDocumentLang(pathname);
	}, [pathname]);

	return null;
}
