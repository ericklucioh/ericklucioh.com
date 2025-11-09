import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Érick Lúcio | Developer",
  description: "Personal website of Érick Lúcio, a software developer.",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-poppins", // opcional: para usar como variável CSS
});


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="pt-br" className={`${poppins.variable} ${roboto.variable}`}>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}