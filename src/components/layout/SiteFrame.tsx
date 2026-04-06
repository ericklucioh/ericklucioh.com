import SiteDecor from "@/components/layout/SiteDecor";

type SiteFrameProps = {
	children: React.ReactNode;
	mainClassName?: string;
	withDecor?: boolean;
};

export default function SiteFrame({
	children,
	mainClassName = "mx-auto max-w-5xl p-6 md:p-10",
	withDecor = true,
}: SiteFrameProps) {
	return (
		<div className="min-h-screen w-full">
			{withDecor ? <SiteDecor /> : null}
			<div className={mainClassName}>
				<main className="site-main">{children}</main>
			</div>
		</div>
	);
}
