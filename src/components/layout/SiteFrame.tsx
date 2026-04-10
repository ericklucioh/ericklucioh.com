import SiteDecor from "@/components/layout/SiteDecor";

type SiteFrameProps = {
	children: React.ReactNode;
	mainClassName?: string;
	withDecor?: boolean;
};

export default function SiteFrame({
	children,
	mainClassName = "w-full max-w-[980px] mx-auto px-[var(--page-gutter)] py-7 pb-16",
	withDecor = true,
}: SiteFrameProps) {
	return (
		<div className="min-h-full w-full relative">
			{withDecor ? (
				<div
					aria-hidden="true"
					style={{
						position: "absolute",
						inset: 0,
						overflow: "clip",
						pointerEvents: "none",
						zIndex: 0,
					}}
				>
					<SiteDecor />
				</div>
			) : null}
			<div className={`${mainClassName} relative z-10`}>
				<main className="site-main">{children}</main>
			</div>
		</div>
	);
}
