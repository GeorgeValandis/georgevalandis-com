import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "George Valandis — Creative Developer",
  description:
    "Portfolio & personal website of George Valandis. Modern web experiences crafted with precision.",
  keywords: ["developer", "portfolio", "web development", "George Valandis"],
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
        {children}
      </body>
    </html>
  );
}
