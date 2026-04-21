import Image from "next/image";
import type { ReactNode } from "react";
import Mermaid from "@/components/mdx/Mermaid";

type Tone = "info" | "success" | "warning";

type CalloutProps = {
	title?: string;
	tone?: Tone;
	children: ReactNode;
};

type MetricCardProps = {
	label: string;
	value: string;
	detail?: string;
};

type MetricGridProps = {
	children: ReactNode;
};

type FigureProps = {
	src: string;
	alt: string;
	caption?: string;
	width?: number;
	height?: number;
};

type SectionHeaderProps = {
	eyebrow?: string;
	title: string;
	description?: string;
};

const toneStyles: Record<Tone, { border: string; background: string; accent: string }> = {
	info: {
		border: "color-mix(in srgb, var(--color-aux-blue) 55%, transparent)",
		background: "color-mix(in srgb, var(--bg-page) 88%, transparent)",
		accent: "var(--color-aux-blue)",
	},
	success: {
		border: "color-mix(in srgb, #2f8f57 55%, transparent)",
		background: "color-mix(in srgb, #173526 88%, transparent)",
		accent: "#6bde92",
	},
	warning: {
		border: "color-mix(in srgb, #b45f06 55%, transparent)",
		background: "color-mix(in srgb, #2a1d10 88%, transparent)",
		accent: "#f6b26b",
	},
};

export function Callout({ title, tone = "info", children }: CalloutProps) {
	const style = toneStyles[tone];

	return (
		<section
			className="ui-card my-6"
			style={{
				borderColor: style.border,
				background: style.background,
			}}
		>
			{title ? (
				<p className="mb-2 text-xs uppercase tracking-[0.2em]" style={{ color: style.accent }}>
					{title}
				</p>
			) : null}
			<div className="markdown" style={{ marginTop: 0 }}>
				{children}
			</div>
		</section>
	);
}

export function MetricGrid({ children }: MetricGridProps) {
	return <div className="my-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{children}</div>;
}

export function MetricCard({ label, value, detail }: MetricCardProps) {
	return (
		<div className="ui-card">
			<p className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">{label}</p>
			<p className="mt-2 text-2xl font-semibold">{value}</p>
			{detail ? <p className="mt-2 text-sm text-[var(--text-secondary)]">{detail}</p> : null}
		</div>
	);
}

export function Figure({ src, alt, caption, width = 1200, height = 675 }: FigureProps) {
	return (
		<figure className="ui-card my-6 p-3">
			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
				className="h-auto w-full rounded-[0.35rem]"
			/>
			{caption ? <figcaption className="mt-3 text-sm text-[var(--text-secondary)]">{caption}</figcaption> : null}
		</figure>
	);
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
	return (
		<header className="my-8">
			{eyebrow ? (
				<p className="text-xs uppercase tracking-[0.22em] text-[var(--text-secondary)]">{eyebrow}</p>
			) : null}
			<h2 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h2>
			{description ? <p className="ui-subtitle mt-3">{description}</p> : null}
		</header>
	);
}

export const mdxComponents = {
	Callout,
	MetricGrid,
	MetricCard,
	Figure,
	SectionHeader,
	Mermaid,
};
