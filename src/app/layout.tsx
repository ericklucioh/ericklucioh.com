import type { Metadata } from "next";
import { Poppins, Roboto, Fira_Code } from "next/font/google";
import "./styles/globals.css";
import "./styles/colors.tokens.css";
import "./styles/colors.semantic.css";

export const metadata: Metadata = {
  title: "Érick Lúcio | Developer",
  description: "Personal website of Érick Lúcio, a software developer.",
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
    <html lang="pt-br" className={`${firaCode.variable}`}>
      <body className={firaCode.className}>{children}</body>
    </html>
  );
}