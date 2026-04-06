"use client";
import type { CSSProperties } from "react";

type SquareProps = {
	sizeX?: number;
	sizeY?: number;
	borderWidth?: number;
};

export default function Square({
	sizeX = 100,
	sizeY = 100,
	borderWidth = 1,
}: SquareProps) {
	const cssVars = {
		["--ui-square-x-base" as any]: `${sizeX}px`,
		["--ui-square-y-base" as any]: `${sizeY}px`,
		["--ui-square-border-base" as any]: `${borderWidth}px`,
	} as CSSProperties;

	return (
		<>
			<style>{`
        @keyframes sambaSquare {
          0%   { transform: translate(0px,0px) scale(1); }
          20%  { transform: translate(1px,-1px) scale(1.02); }
          50%  { transform: translate(0px,1px) scale(1); }
          80%  { transform: translate(-1px,-1px) scale(1.02); }
          100% { transform: translate(0px,0px) scale(1); }
        }
      `}</style>

			<div
				className="ui-square"
				style={{
					...cssVars,
					animation: "sambaSquare 4s ease-in-out infinite",
				}}
			/>
		</>
	);
}
