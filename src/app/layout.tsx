import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Remify - Decentralized Remittance Platform",
  description: "A decentralized remittance platform built on Moonbeam",
  icons: {
    icon: [
      { url: '/moonbeam network.jpg', type: 'image/jpeg' },
      { url: '/moonbeam network.jpg', type: 'image/jpeg', sizes: '32x32' },
      { url: '/moonbeam network.jpg', type: 'image/jpeg', sizes: '16x16' },
    ],
    shortcut: '/moonbeam network.jpg',
    apple: '/moonbeam network.jpg',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Remify - Decentralized Remittance Platform',
    description: 'A decentralized remittance platform built on Moonbeam',
    images: [
      {
        url: '/remifylogo.png',
        width: 1200,
        height: 630,
        alt: 'Remify Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remify - Decentralized Remittance Platform',
    description: 'A decentralized remittance platform built on Moonbeam',
    images: ['/remifylogo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="pt-24">{/* Spacer for fixed navbar */}
        {children}
        </div>
      </body>
    </html>
  );
}
