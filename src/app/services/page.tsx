import type { Metadata } from "next";
import type { ReactElement } from "react";

import { ServicesHorizontalScroll } from "@/components/services/ServicesHorizontalScroll";
import { ServicesScrollOutro } from "@/components/services/ServicesScrollOutro";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom websites, AI chatbots, workflow automation, CRM and email, WhatsApp, and SEO — engineered for modern businesses.",
};

export default function ServicesPage(): ReactElement {
  return (
    <>
      <ServicesHorizontalScroll />
      <ServicesScrollOutro />
    </>
  );
}
