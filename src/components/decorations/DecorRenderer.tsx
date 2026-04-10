"use client";

import BaseDecor from "@/components/decorations/BaseDecor";
import DotGrid from "@/components/decorations/DotGrid";
import Square from "@/components/decorations/Square";

type DecorPlacement = {
	side: "left" | "right";
	x: number;
	y: number;
	xMobile?: number;
	yMobile?: number;
	zIndex?: number;
	desktopScale?: number;
	mobileScale?: number;
};

type DotGridDecor = DecorPlacement & {
	kind: "dotGrid";
	rows?: number;
	cols?: number;
	size?: number;
	gap?: number;
};

type SquareDecor = DecorPlacement & {
	kind: "square";
	sizeX?: number;
	sizeY?: number;
	borderWidth?: number;
};

export type DecorItem = DotGridDecor | SquareDecor;

type DecorRendererProps = {
	items: DecorItem[];
};

export default function DecorRenderer({ items }: DecorRendererProps) {
	return (
		<>
			{items.map((item, index) => (
				<BaseDecor
					key={getDecorKey(item, index)}
					position="absolute"
					top
					left={item.side === "left"}
					right={item.side === "right"}
					x={item.x}
					y={item.y}
					xMobile={item.xMobile}
					yMobile={item.yMobile}
					zIndex={item.zIndex ?? 0}
					desktopScale={item.desktopScale ?? 1}
					mobileScale={item.mobileScale ?? 1}
				>
					{renderDecorShape(item)}
				</BaseDecor>
			))}
		</>
	);
}

function renderDecorShape(item: DecorItem) {
	if (item.kind === "dotGrid") {
		return (
			<DotGrid
				rows={item.rows}
				cols={item.cols}
				size={item.size}
				gap={item.gap}
			/>
		);
	}

	return (
		<Square
			sizeX={item.sizeX}
			sizeY={item.sizeY}
			borderWidth={item.borderWidth}
		/>
	);
}

function getDecorKey(item: DecorItem, index: number) {
	return `${item.kind}-${item.side}-${item.x}-${item.y}-${index}`;
}
