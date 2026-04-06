"use client";
import type { CSSProperties } from "react";

export default function DotGrid({
	rows = 5,
	cols = 5,
	size = 4,
	gap = 10,
	style = {},
	className = "",
}: {
	rows?: number;
	cols?: number;
	size?: number;
	gap?: number;
	style?: React.CSSProperties;
	className?: string;
}) {
	const cssVars = {
		["--ui-dot-size-base" as any]: `${size}px`,
		["--ui-dot-gap-base" as any]: `${gap}px`,
	} as CSSProperties;

	return (
		<div
			className={`ui-dotgrid ${className}`}
			style={{
				...cssVars,
				...style,
				gridTemplateColumns: `repeat(${cols}, var(--ui-dot-size))`,
				gridTemplateRows: `repeat(${rows}, var(--ui-dot-size))`,
				gap: "var(--ui-dot-gap)",
			}}
		>
			<style>{`
        @keyframes floatDot {
          0%   { transform: scale(1.2) translate(0px,0px); }
          50%  { transform: scale(1.3) translate(2px,-1px); }
          100% { transform: scale(1) translate(0px,0px); }
        }
      `}</style>

			{Array.from({ length: rows * cols }).map((_, i) => (
				<span
					key={i}
					className="ui-dotgrid__dot"
					style={{
						animation: `floatDot ${2 + (i % 5)}s ease-in-out infinite`,
						animationDelay: `${i * 0.15}s`,
					}}
				/>
			))}
		</div>
	);
}
