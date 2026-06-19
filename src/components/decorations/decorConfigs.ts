import type { DecorItem } from "@/components/decorations/DecorRenderer";

export const siteDecorItems: DecorItem[] = [
	{ kind: "dotGrid", side: "left", x: 1, y: 6, rows: 4, cols: 6, gap: 20 },
	{ kind: "square", side: "left", x: -1, y: 28, sizeX: 90, sizeY: 150 },
	{ kind: "dotGrid", side: "right", x: 0, y: 4, rows: 6, cols: 4, gap: 25 },
	{ kind: "square", side: "right", x: 5, y: -5, sizeX: 160, sizeY: 60 },
	{ kind: "dotGrid", side: "right", x: 14, y: 54, rows: 6, cols: 8, gap: 15 },

	{ kind: "dotGrid", side: "left", x: 6, y: 92, rows: 5, cols: 5, gap: 18 },
	{ kind: "square", side: "right", x: 10, y: 118, sizeX: 110, sizeY: 110 },
	{ kind: "dotGrid", side: "left", x: -2, y: 148, rows: 7, cols: 4, gap: 16 },
	{ kind: "square", side: "left", x: 8, y: 182, sizeX: 70, sizeY: 180 },
	{ kind: "dotGrid", side: "right", x: 4, y: 210, rows: 4, cols: 7, gap: 17 },

	{ kind: "square", side: "right", x: -2, y: 248, sizeX: 140, sizeY: 70 },
	{ kind: "dotGrid", side: "left", x: 12, y: 286, rows: 6, cols: 6, gap: 14 },
	{ kind: "square", side: "left", x: 0, y: 324, sizeX: 100, sizeY: 100 },
	{ kind: "dotGrid", side: "right", x: 9, y: 356, rows: 5, cols: 8, gap: 15 },
	{ kind: "square", side: "right", x: 3, y: 392, sizeX: 80, sizeY: 160 },

	{ kind: "dotGrid", side: "left", x: 4, y: 428, rows: 4, cols: 4, gap: 22 },
	{ kind: "square", side: "left", x: -3, y: 470, sizeX: 150, sizeY: 65 },
	{
		kind: "dotGrid",
		side: "right",
		x: 13,
		y: 512,
		rows: 6,
		cols: 5,
		gap: 16,
	},
	{ kind: "square", side: "right", x: 7, y: 548, sizeX: 95, sizeY: 140 },
	{ kind: "dotGrid", side: "left", x: 10, y: 590, rows: 7, cols: 6, gap: 13 },

	{ kind: "square", side: "left", x: 2, y: 636, sizeX: 120, sizeY: 80 },
	{ kind: "dotGrid", side: "right", x: 1, y: 684, rows: 5, cols: 5, gap: 19 },
	{ kind: "square", side: "right", x: 12, y: 724, sizeX: 60, sizeY: 170 },
	{ kind: "dotGrid", side: "left", x: -1, y: 770, rows: 6, cols: 7, gap: 14 },
	{ kind: "square", side: "left", x: 9, y: 820, sizeX: 130, sizeY: 90 },

	{ kind: "dotGrid", side: "right", x: 6, y: 866, rows: 4, cols: 8, gap: 16 },
	{ kind: "square", side: "right", x: 0, y: 910, sizeX: 100, sizeY: 150 },
	{ kind: "dotGrid", side: "left", x: 7, y: 950, rows: 5, cols: 4, gap: 20 },
];

export const linksDecorItems: DecorItem[] = [
	{ kind: "dotGrid", side: "left", x: 1, y: 9, rows: 4, cols: 6, gap: 20 },
	{ kind: "square", side: "left", x: 0, y: 80, sizeX: 90, sizeY: 150 },
	{ kind: "dotGrid", side: "left", x: 2, y: 90, rows: 4, cols: 6, gap: 23 },
	{ kind: "dotGrid", side: "right", x: 0, y: 4, rows: 6, cols: 4, gap: 25 },
	{ kind: "square", side: "right", x: 10, y: -1, sizeX: 160, sizeY: 60 },
	{ kind: "square", side: "right", x: -2, y: 48, sizeX: 90, sizeY: 210 },
];
