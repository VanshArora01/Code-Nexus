import type { Metadata } from "next";
import type { ReactElement } from "react";

import Hero from "@/components/sections/Hero";
import { HomeTrustMarquee, HomeServicesShowcase } from "@/components/sections/HomePageContent";
import { HomeHowItWorks, HomeTechApproach } from "@/components/sections/HomeExtraSections";
import { HomeCTA } from "@/components/sections/HomeCTA";

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
