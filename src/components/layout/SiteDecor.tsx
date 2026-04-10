import BaseDecor from "@/components/decorations/BaseDecor";
import DotGrid from "@/components/decorations/DotGrid";
import Square from "@/components/decorations/Square";

export default function SiteDecor() {
	return (
		<>
			<BaseDecor position="absolute" top left x={1} y={6}>
				<DotGrid rows={4} cols={6} gap={20} />
			</BaseDecor>
			<BaseDecor position="absolute" top left x={-1} y={28}>
				<Square sizeX={90} sizeY={150} />
			</BaseDecor>

			<BaseDecor position="absolute" top right x={0} y={4}>
				<DotGrid rows={6} cols={4} gap={25} />
			</BaseDecor>
			<BaseDecor position="absolute" top right x={5} y={-5}>
				<Square sizeX={160} sizeY={60} />
			</BaseDecor>

			<BaseDecor position="absolute" top right x={14} y={54}>
				<DotGrid rows={6} cols={8} gap={15} />
			</BaseDecor>
		</>
	);
}
