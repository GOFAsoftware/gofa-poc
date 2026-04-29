import type { Metadata, Viewport } from "next";
import { Fraunces, Geist_Mono, Manrope, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const notoSansTc = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GOFA Biz Solution | Preventive Health Engagement for Insurers and Care Providers",
  description:
    "GOFA Biz Solution helps insurers, healthcare groups, and care operators screen risk early, engage members continuously, and coordinate follow-up from one digital health platform.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant-HK"
      className={`${fraunces.variable} ${manrope.variable} ${notoSansTc.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] antialiased">
        {children}
      </body>
    </html>
  );
}
