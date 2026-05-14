import type { Metadata } from "next";
import type { ReactElement } from "react";

import { ContactClient } from "@/components/sections/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Code Nexus — email thecodenexus7@gmail.com, WhatsApp community, LinkedIn, or send a project brief. We reply within 24 hours.",
};

export default function ContactPage(): ReactElement {
  return <ContactClient />;
}
