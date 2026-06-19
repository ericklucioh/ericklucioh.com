import { compile, run } from "@mdx-js/mdx";
import type { ComponentType } from "react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import * as jsxRuntime from "react/jsx-runtime";

export type MdxContentComponent = ComponentType<any>;

export async function compileMdxToComponent(
	source: string,
): Promise<MdxContentComponent> {
	const compiled = await compile(source, {
		outputFormat: "function-body",
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			[rehypeHighlight, { detect: true, ignoreMissing: true }],
		],
	});

	const mdxModule = await run(String(compiled), {
		...jsxRuntime,
		baseUrl: import.meta.url,
	});

	return mdxModule.default as MdxContentComponent;
}
