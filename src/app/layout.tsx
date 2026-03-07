import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import CookieConsentLoader from '@/components/CookieConsentLoader';
import HtmlLangSync from '@/components/HtmlLangSync';
import './globals.css';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'George Valandis — iOS Development',
  description:
    'iOS Developer & Solopreneur. Building apps like Flowa, MoodFlora, GlanceAway and more. Sharing my journey from 5 to 9.',
  keywords: ['iOS developer', 'Swift', 'SwiftUI', 'solopreneur', 'George Valandis', 'app development'],
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      de: '/de',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-gray-950 text-gray-50`}
      >
        <HtmlLangSync />
        {children}
        <CookieConsentLoader />
      </body>
    </html>
  );
}
