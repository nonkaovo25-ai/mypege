import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUMIÈRE | プレミアムエステサロン",
  description:
    "LUMIÈRE（ルミエール）は、最高峰のフェイシャル・ボディケアをご提供する完全予約制プレミアムエステサロンです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${cormorant.variable} ${notoSerifJP.variable}`}>
      <body>{children}</body>
    </html>
  );
}
