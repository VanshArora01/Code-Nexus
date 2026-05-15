"use client";

import type { ReactElement } from "react";

export function ServiceSchema(): ReactElement {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Automation, Web Development & SEO",
    "provider": {
      "@type": "LocalBusiness",
      "name": "The Code Nexus",
      "url": "https://thecodenexus.qzz.io"
    },
    "areaServed": [
      { "@type": "City", "name": "Ludhiana" },
      { "@type": "State", "name": "Punjab" },
      { "@type": "Country", "name": "India" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Solutions Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Website Development",
            "description": "High-performance, SEO-optimized websites built with Next.js."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Automation",
            "description": "Smart business automation systems powered by AI."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Chatbots",
            "description": "Custom AI chatbots for lead generation and customer support."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO Optimization",
            "description": "Advanced SEO strategies to rank higher in search results."
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
