import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dipdip-silk.vercel.app"),
  title: {
    default: "DipDip - 훠궈 소스 레시피 모음",
    template: "%s | DipDip",
  },
  description:
    "하이디라오, 두끼훠궈, 해저낙원 등 훠궈 소스 조합을 한곳에서 탐색하세요. 인기 레시피, 맛 프로필, 재료 비율까지!",
  keywords: [
    "훠궈",
    "훠궈 소스",
    "하이디라오",
    "두끼훠궈",
    "해저낙원",
    "마라 소스",
    "훠궈 레시피",
    "소스 조합",
    "DipDip",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DipDip - 훠궈 소스 레시피 모음",
    description:
      "하이디라오, 두끼훠궈 등 훠궈 소스 조합을 한곳에서 탐색하세요.",
    type: "website",
    url: "/",
    siteName: "DipDip",
    locale: "ko_KR",
    images: [{ url: "/logo.png", alt: "DipDip 로고" }],
  },
  twitter: {
    card: "summary",
    title: "DipDip - 훠궈 소스 레시피 모음",
    description:
      "하이디라오, 두끼훠궈 등 훠궈 소스 조합을 한곳에서 탐색하세요.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
