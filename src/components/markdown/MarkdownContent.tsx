	"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";

type MarkdownContentProps = {
	html: string;
	className?: string;
};

function hasMermaidDiagram(html: string) {
	return html.includes('class="mermaid"');
}

export default function MarkdownContent({ html, className }: MarkdownContentProps) {
	const rootRef = useRef<HTMLElement>(null);
	const [mermaidReady, setMermaidReady] = useState(false);
	const needsMermaid = useMemo(() => hasMermaidDiagram(html), [html]);

	useEffect(() => {
		if (!needsMermaid || !mermaidReady) return;

		const root = rootRef.current;
		const mermaid = (window as typeof window & {
			mermaid?: {
				initialize: (options: Record<string, unknown>) => void;
				run: (options: { nodes: Element[] }) => Promise<unknown>;
			};
		}).mermaid;

		if (!root || !mermaid) return;

		mermaid.initialize({
			startOnLoad: false,
			theme: "neutral",
			securityLevel: "strict",
		});

		void mermaid.run({
			nodes: Array.from(root.querySelectorAll(".mermaid")),
		});
	}, [needsMermaid, mermaidReady, html]);

	return (
		<>
			{needsMermaid ? (
				<Script
					src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"
					strategy="afterInteractive"
					onLoad={() => setMermaidReady(true)}
				/>
			) : null}
			<article
				ref={rootRef}
				className={className}
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</>
	);
}
