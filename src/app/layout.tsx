import type { Metadata, Viewport } from "next";
import { Poppins, Roboto, Fira_Code } from "next/font/google";
import Providers from "./providers";
import { buildRootMetadata, SITE_URL } from "@/lib/metadata";
import "./styles/globals.css";
import "./styles/colors.tokens.css";
import "./styles/colors.semantic.css";
import "highlight.js/styles/github-dark.css";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
};

export const metadataBase = new URL(SITE_URL);

export const metadata: Metadata = {
	...buildRootMetadata(),
	icons: {
		icon: "/logoWhite.svg",
	},
};

const firaCode = Fira_Code({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	display: "swap",
	variable: "--font-fira-code",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="pt-br"
			className={firaCode.variable}
			suppressHydrationWarning
		>
			<head>
				<meta name="color-scheme" content="dark light" />
				{/* <link rel="icon" type="image/svg+xml" sizes="32x32" href="" /> */}
			</head>
			<body className={firaCode.className}>
				{/* <Menu isOpen somethingDarkModeToggle /> */}
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
