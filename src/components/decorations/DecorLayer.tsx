"use client";

type DecorLayerProps = {
	children: React.ReactNode;
	canvasHeightVh?: number;
	inset?: string;
	zIndex?: number;
};

export default function DecorLayer({
	children,
	canvasHeightVh = 1000,
	inset = "0",
	zIndex = 0,
}: DecorLayerProps) {
	return (
		<div
			aria-hidden="true"
			style={{
				position: "absolute",
				inset,
				overflow: "clip",
				pointerEvents: "none",
				zIndex,
			}}
		>
			<div
				style={{
					position: "absolute",
					inset: "0 0 auto 0",
					height: `${canvasHeightVh}vh`,
				}}
			>
				{children}
			</div>
		</div>
	);
}
