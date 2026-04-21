import type { MdxContentComponent } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/mdx-components";

type MdxContentProps = {
	Content: MdxContentComponent;
	className?: string;
};

export default function MdxContent({ Content, className }: MdxContentProps) {
	return (
		<article className={className}>
			<Content components={mdxComponents} />
		</article>
	);
}
