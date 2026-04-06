import type { CSSProperties } from "react";

interface LogoProps {
	size?: number;
	smallSize?: number;
}

export default function Logo({ size = 70, smallSize = 1 }: LogoProps) {
	const style = {
		["--ui-logo-size" as any]: `${size}px`,
		["--ui-logo-small-scale" as any]: String(smallSize),
	} as CSSProperties;

	return (
		<>
			<img
				src="/logoDark.svg"
				alt="Logo"
				className="ui-logo dark:hidden"
				style={style}
			/>
			<img
				src="/logoWhite.svg"
				alt="Logo"
				className="ui-logo hidden dark:block"
				style={style}
			/>
		</>
	);
}
