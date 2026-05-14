import type { Metadata } from "next";
import type { ReactElement } from "react";

import { CareersClient } from "@/components/sections/careers/CareersClient";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Code Nexus — open roles in engineering, AI automation, design, and growth. Remote-friendly. Apply with your story.",
};

export default function CareersPage(): ReactElement {
  return <CareersClient />;
}
