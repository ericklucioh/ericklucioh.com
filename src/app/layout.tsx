import type { Metadata, Viewport } from "next";
import { Fira_Code } from "next/font/google";
import Providers from "./providers";
import {
	buildRootMetadata,
	SITE_EMAIL,
	SITE_GITHUB,
	SITE_LINKEDIN,
	SITE_NAME,
	SITE_URL,
} from "@/lib/metadata";
import "./styles/globals.css";
import "./styles/colors.tokens.css";
import "./styles/colors.semantic.css";
import "highlight.js/styles/github-dark.css";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
};

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

const structuredData = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Person",
			"@id": `${SITE_URL}#person`,
			name: SITE_NAME,
			url: SITE_URL,
			email: `mailto:${SITE_EMAIL}`,
			jobTitle: "Software Developer",
			sameAs: [SITE_LINKEDIN, SITE_GITHUB],
		},
		{
			"@type": "WebSite",
			"@id": `${SITE_URL}#website`,
			url: SITE_URL,
			name: SITE_NAME,
			publisher: {
				"@id": `${SITE_URL}#person`,
			},
			inLanguage: ["pt-BR", "en-US"],
		},
	],
};

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
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>
				{/* <link rel="icon" type="image/svg+xml" sizes="32x32" href="" /> */}
			</head>
			<body className={firaCode.className}>
				{/* <Menu isOpen somethingDarkModeToggle /> */}
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
