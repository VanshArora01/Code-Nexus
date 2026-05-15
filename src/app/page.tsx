import type { Metadata } from "next";
import type { ReactElement } from "react";

import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const HomeTrustMarquee = dynamic(() => import("@/components/sections/HomePageContent").then(mod => mod.HomeTrustMarquee));
const HomeServicesShowcase = dynamic(() => import("@/components/sections/HomePageContent").then(mod => mod.HomeServicesShowcase));
const HomeHowItWorks = dynamic(() => import("@/components/sections/HomeExtraSections").then(mod => mod.HomeHowItWorks));
const HomeTechApproach = dynamic(() => import("@/components/sections/HomeExtraSections").then(mod => mod.HomeTechApproach));
const HomeCTA = dynamic(() => import("@/components/sections/HomeCTA").then(mod => mod.HomeCTA));

export const metadata: Metadata = {
  title: "The Code Nexus | AI Automation, Website Development & SEO Solutions in Ludhiana",
  description:
    "The Code Nexus helps businesses in Ludhiana and across India with AI automation, custom websites, SEO optimization, and scalable digital solutions. Engineered for performance and growth.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage(): ReactElement {
  return (
    <>
      <Hero />
      <div id="after-hero">
        <HomeTrustMarquee />
      </div>
      <HomeServicesShowcase />
      {/* <HomeFeaturedWork /> */}
      <HomeHowItWorks />
      <HomeTechApproach />
      <HomeCTA />
    </>
  );
}
