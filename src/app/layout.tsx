import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DipDip - 훠궈 소스 레시피 모음",
  description:
    "하이디라오, 두끼훠궈, 해저낙원 등 훠궈 소스 조합을 한곳에서 탐색하세요. 인기 레시피, 맛 프로필, 재료 비율까지!",
  openGraph: {
    title: "DipDip - 훠궈 소스 레시피 모음",
    description:
      "하이디라오, 두끼훠궈 등 훠궈 소스 조합을 한곳에서 탐색하세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <div className="mx-auto max-w-[420px] min-h-dvh bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}
