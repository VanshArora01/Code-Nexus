import type { Metadata } from "next";
import type { ReactElement } from "react";

import { WorkShowcase } from "@/components/work/WorkShowcase";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Built, shipped, live — websites, AI tools, and automation systems engineered and deployed by Code Nexus.",
};

export default function WorkPage(): ReactElement {
  return <WorkShowcase />;
}
