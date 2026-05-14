import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

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
  title: {
    default: "Code Nexus | Automate. Build. Scale.",
    template: "%s | Code Nexus",
  },
  description:
    "AI automation and web solutions for modern businesses — Next.js sites, chatbots, and workflow systems engineered in Ludhiana, India.",
  keywords: [
    "AI automation",
    "web development",
    "Next.js",
    "Code Nexus",
    "Ludhiana",
    "n8n",
  ],
  openGraph: {
    title: "Code Nexus",
    description:
      "AI automation and web solutions for modern businesses — engineered for performance.",
    type: "website",
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
      <body className="min-h-full bg-bg font-dm text-white antialiased">
        <SmoothScroll>
          <div className="flex min-h-screen flex-col bg-bg">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
