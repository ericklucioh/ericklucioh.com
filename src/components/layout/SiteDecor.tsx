import BaseDecor from "@/components/decorations/BaseDecor";
import DotGrid from "@/components/decorations/DotGrid";
import Square from "@/components/decorations/Square";

export default function SiteDecor() {
	return (
		<>
			<BaseDecor top left x={1} y={10}>
				<DotGrid rows={4} cols={6} gap={20} />
			</BaseDecor>
			<BaseDecor bottom left x={-1} y={6}>
				<Square sizeX={90} sizeY={150} />
			</BaseDecor>

			<BaseDecor top right x={0} y={2}>
				<DotGrid rows={6} cols={4} gap={25} />
			</BaseDecor>
			<BaseDecor top right x={5} y={-1}>
				<Square sizeX={160} sizeY={60} />
			</BaseDecor>

			<BaseDecor bottom right x={20} y={2}>
				<DotGrid rows={6} cols={8} gap={15} />
			</BaseDecor>
		</>
	);
}

