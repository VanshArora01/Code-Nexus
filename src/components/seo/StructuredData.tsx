import type { ReactElement } from "react";

export function StructuredData(): ReactElement {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://thecodenexus.qzz.io/#organization",
        "name": "The Code Nexus",
        "url": "https://thecodenexus.qzz.io",
        "logo": {
          "@type": "ImageObject",
          "url": "https://thecodenexus.qzz.io/image.png",
          "width": "512",
          "height": "512"
        },
        "sameAs": [
          "https://www.linkedin.com/company/the-code-nexuss",
          "https://www.instagram.com/the.codenexus/"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://thecodenexus.qzz.io/#website",
        "url": "https://thecodenexus.qzz.io",
        "name": "The Code Nexus",
        "publisher": { "@id": "https://thecodenexus.qzz.io/#organization" },
        "inLanguage": "en-IN"
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://thecodenexus.qzz.io/#localbusiness",
        "name": "The Code Nexus",
        "image": "https://thecodenexus.qzz.io/image.png",
        "url": "https://thecodenexus.qzz.io",
        "telephone": "+91-1234567890", // Placeholder if not provided
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ludhiana, Punjab",
          "addressLocality": "Ludhiana",
          "addressRegion": "Punjab",
          "postalCode": "141001",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "30.9010",
          "longitude": "75.8573"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        },
        "areaServed": [
          { "@type": "City", "name": "Ludhiana" },
          { "@type": "State", "name": "Punjab" },
          { "@type": "Country", "name": "India" }
        ],
        "priceRange": "$$"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
