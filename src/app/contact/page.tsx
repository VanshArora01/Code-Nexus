import type { Metadata } from "next";
import type { ReactElement } from "react";

import { ContactClient } from "@/components/sections/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact | AI & Digital Solutions Agency in Ludhiana",
  description:
    "Get in touch with The Code Nexus in Ludhiana for AI automation, custom web development, and SEO services. Let's build your next digital system together.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage(): ReactElement {
  return <ContactClient />;
}
