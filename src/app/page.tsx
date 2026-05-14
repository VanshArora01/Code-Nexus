import type { Metadata } from "next";
import type { ReactElement } from "react";

import Hero from "@/components/sections/Hero";
import { HomeCTA } from "@/components/sections/HomeCTA";
import {
  HomeFeaturedWork,
  HomeServicesShowcase,
  HomeTrustMarquee,
} from "@/components/sections/HomePageContent";
import {
  HomeHowItWorks,
  HomeTechApproach,
} from "@/components/sections/HomeExtraSections";

export const metadata: Metadata = {
  title: "Automate. Build. Scale.",
  description:
    "Code Nexus builds Next.js websites, AI chatbots, and automation systems for modern businesses — engineered in Ludhiana, India.",
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
