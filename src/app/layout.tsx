import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

import GoogleAnalytics from "@/components/seo/GoogleAnalytics";
import { StructuredData } from "@/components/seo/StructuredData";
import { Suspense } from "react";

import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thecodenexus.qzz.io"),
  title: {
    default: "The Code Nexus | AI Automation, Website Development & SEO in Ludhiana",
    template: "%s | The Code Nexus",
  },
  description:
    "The Code Nexus helps businesses in Ludhiana and across India with AI automation, custom websites, SEO optimization, and scalable digital solutions.",
  keywords: [
    "AI automation company Ludhiana",
    "website development company Ludhiana",
    "SEO agency Ludhiana",
    "web design Ludhiana",
    "digital solutions Punjab",
    "automation agency India",
    "The Code Nexus",
    "Next.js development India",
  ],
  authors: [{ name: "The Code Nexus Team" }],
  creator: "The Code Nexus",
  publisher: "The Code Nexus",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: "/image.png",
    shortcut: "/image.png",
    apple: "/image.png",
  },
  openGraph: {
    title: "The Code Nexus | AI & Web Solutions",
    description:
      "Expert AI automation and premium web development for global businesses. Engineered for scale.",
    url: "https://thecodenexus.qzz.io",
    siteName: "The Code Nexus",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Code Nexus | AI & Web Solutions",
    description:
      "Expert AI automation and premium web development for global businesses.",
    creator: "@thecodenexus",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html
      lang="en"
      className={`dark ${dmSans.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="preconnect" href="https://www.google-analytics.com" />
          </>
        )}
      </head>
      <body className="min-h-full bg-bg font-dm text-white antialiased">
        <SmoothScroll>
          <div className="flex min-h-screen flex-col bg-bg">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SmoothScroll>
        <Suspense>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        </Suspense>
        <StructuredData />
      </body>
    </html>
  );
}
