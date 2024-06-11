import { ReactNode } from 'react';
import Link from 'next/link';
import localFont from "next/font/local"
import './globals.css';

const pretendard = localFont({
  src: "../font/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata = {
  title: 'Beach Wind Info',
  description: '해변 풍향 정보',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <nav className="bg-gray-800 p-4">
          <Link href="/main" className="text-white text-2xl">
            해변 풍향 정보
          </Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
