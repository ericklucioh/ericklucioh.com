import type { Metadata } from "next";
import { Poppins, Roboto, Fira_Code } from "next/font/google";
import "./styles/globals.css";
import "./styles/colors.tokens.css";
import "./styles/colors.semantic.css";
import DarkModeToggle from "@/components/darkModeToggle";
import Menu from "@/components/header/menu";

export const metadata: Metadata = {
  title: "Érick Lúcio | Developer",
  description: "Personal website of Érick Lúcio, a software developer.",
  icons: {
    icon: "/logoWhite.svg",
  },
  openGraph: {
    title: "Érick Lúcio | Developer",
    description: "Personal website of Érick Lúcio, a software developer.",
    url: "https://ericklucioh.com",
    siteName: "Érick Lúcio",
    images: [
      {
        url: "https://ericklucioh.com/foto.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt-BR",
    type: "website",
  },
};

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-fira-code",
});

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html  lang="pt-br" className={`dark ${firaCode.variable}`}>
      <head>
        {/* <link rel="icon" type="image/svg+xml" sizes="32x32" href="" /> */}
      </head>
      <body className={firaCode.className}>
        {/* <Menu isOpen somethingDarkModeToggle /> */}
        {children}</body>
    </html>
  );
}