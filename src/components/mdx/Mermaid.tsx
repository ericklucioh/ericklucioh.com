"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

type MermaidProps = {
	chart: string;
	title?: string;
};

export default function Mermaid({ chart, title }: MermaidProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		mermaid.initialize({
			startOnLoad: false,
			securityLevel: "strict",
			theme: "neutral",
		});

		const id = `mermaid-${crypto.randomUUID()}`;

		void mermaid.render(id, chart).then(({ svg, bindFunctions }) => {
			if (!ref.current) return;
			ref.current.innerHTML = svg;
			bindFunctions?.(ref.current);
		});
	}, [chart]);

	return <div ref={ref} className="mermaid" aria-label={title} />;
}
