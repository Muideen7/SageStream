import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  title: {
    default: 'SageStream — Where Every Arc Begins.',
    template: '%s | SageStream',
  },
  description: 'Stream thousands of anime titles. New simulcasts every week. Free to start.',
  keywords: ['anime', 'streaming', 'simulcast', 'manga', 'SageStream'],
  openGraph: {
    siteName: 'SageStream',
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[--bg-base] transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
