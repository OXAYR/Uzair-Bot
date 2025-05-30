/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import InteractiveBackground from "./components/InteractiveBackground";
import ChatInterface from "./components/ChatInterface";
import Portfolio from "./components/Portfolio";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uzair Maqsood | Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in React, Next.js, and AI integration. Building scalable web applications and mobile experiences with modern technologies. Available for hire.",
  keywords: [
    "Full-Stack Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "React Native",
    "Node.js",
    "AI Integration",
    "Web Development",
    "Mobile Development",
    "Portfolio",
  ],
  authors: [{ name: "Uzair Maqsood" }],
  openGraph: {
    title: "Uzair Maqsood | Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in React, Next.js, and AI integration. Building scalable web applications and mobile experiences with modern technologies. Available for hire.",
    url: "https://uzair.dev",
    siteName: "Uzair's Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Uzair Maqsood - Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uzair Maqsood | Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in React, Next.js, and AI integration. Building scalable web applications and mobile experiences with modern technologies. Available for hire.",
    images: ["/og-image.jpg"],
    creator: "@uzairmaqsood",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Portfolio />
      </body>
    </html>
  );
}
