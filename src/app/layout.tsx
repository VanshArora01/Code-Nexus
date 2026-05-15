import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Space_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { StructuredData } from "@/components/seo/StructuredData";

import { GA_ID } from "@/lib/analytics";

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
    google: "X5N5AYqIyLKar8XLJQRIJM8T1hWZXozKvrYhSOheOI4",
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
      </head>
      <body className="min-h-full bg-bg font-dm text-white antialiased">
        <SmoothScroll>
          <div className="flex min-h-screen flex-col bg-bg">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SmoothScroll>
        <StructuredData />
        {/* Google Analytics 4 — loads only in production via @next/third-parties */}
        {process.env.NODE_ENV === "production" && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
