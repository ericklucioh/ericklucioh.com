import type { ComponentType } from "react";
import { projectMdxComponents } from "@/components/projects/mdx-components";

type MdxContentComponent = ComponentType<any>;

type ProjectMdxContentProps = {
	Content: MdxContentComponent;
	className?: string;
};

export default function ProjectMdxContent({ Content, className }: ProjectMdxContentProps) {
	return (
		<article className={className}>
			<Content components={projectMdxComponents} />
		</article>
	);
}
