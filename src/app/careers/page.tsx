import type { Metadata } from "next";
import type { ReactElement } from "react";

import { CareersClient } from "@/components/sections/careers/CareersClient";

export const metadata: Metadata = {
  title: "Careers | Join Our AI & Web Team",
  description:
    "Join The Code Nexus — open roles in engineering, AI automation, design, and growth. Build the future stack with us in Ludhiana or remote.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage(): ReactElement {
  return <CareersClient />;
}
