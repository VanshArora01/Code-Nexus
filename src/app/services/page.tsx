import type { Metadata } from "next";
import type { ReactElement } from "react";

import { ServicesHorizontalScroll } from "@/components/services/ServicesHorizontalScroll";
import { ServicesScrollOutro } from "@/components/services/ServicesScrollOutro";

import { ServiceSchema } from "@/components/seo/ServiceSchema";

export const metadata: Metadata = {
  title: "AI Automation, Website Development & SEO Services",
  description:
    "Explore our premium AI automation, custom website development, and SEO services in Ludhiana. We engineer scalable digital solutions for modern businesses.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage(): ReactElement {
  return (
    <>
      <ServiceSchema />
      <ServicesHorizontalScroll />
      <ServicesScrollOutro />
    </>
  );
}
