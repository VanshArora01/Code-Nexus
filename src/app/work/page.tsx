import type { Metadata } from "next";
import type { ReactElement } from "react";

import { WorkShowcase } from "@/components/work/WorkShowcase";

export const metadata: Metadata = {
  title: "Our Work | AI Projects & Web Development Portfolio",
  description:
    "Explore our portfolio of AI-powered websites, automation pipelines, and digital solutions. Built, shipped, and live — engineered by The Code Nexus.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage(): ReactElement {
  return <WorkShowcase />;
}
