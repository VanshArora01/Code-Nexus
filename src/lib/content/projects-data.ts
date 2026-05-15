export type WorkBentoProject = {
  readonly key: string;
  readonly number: string;
  readonly name: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly projectType: string;
  readonly badge?: string;
  readonly year?: string;
  readonly href: string;
  readonly external?: boolean;
  readonly featured?: boolean;
  readonly gridClass: string;
  readonly minHeightClass: string;
  readonly topLineClass: string;
};

export const WORK_BENTO_PROJECTS: readonly WorkBentoProject[] = [
  {
    key: "khudkojano",
    number: "01",
    featured: true,
    name: "Khud Ko Jaano",
    description:
      "Live Vedic AI platform — cosmic reports, secure payments, and guided journeys with privacy-first delivery.",
    tags: ["Next.js", "AI", "Payments"],
    projectType: "Live product",
    badge: "Live on Render",
    year: "2025",
    href: "https://khudkojano.onrender.com/",
    external: true,
    gridClass: "col-span-12 md:col-span-8",
    minHeightClass: "min-h-[360px] md:min-h-[400px]",
    topLineClass: "opacity-100",
  },
  {
    key: "disaster",
    number: "02",
    name: "Disaster Management Portal",
    description:
      "Real-time coordination platform built in 48 hours. Live alerts, resource routing, and dashboards built for pressure — not prototypes.",
    tags: ["React", "Node.js", "WebSockets", "MongoDB"],
    projectType: "Live Product",
    badge: "Coordination Platform 2025",
    year: "2025",
    href: "/contact",
    external: false,
    gridClass: "col-span-12 md:col-span-4",
    minHeightClass: "min-h-[320px] md:min-h-[400px]",
    topLineClass: "opacity-30",
  },
  {
    key: "kr-heat",
    number: "03",
    name: "KR Heat Treatment",
    description:
      "Full-stack business website with a custom admin portal for listings, enquiries, and client data.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Admin Dashboard"],
    projectType: "Client Project",
    badge: "Live Client Site + Admin Portal",
    year: "2024",
    href: "https://kr-heat-treatment.vercel.app/",
    external: true,
    gridClass: "col-span-12 md:col-span-4",
    minHeightClass: "min-h-[280px] md:min-h-[300px]",
    topLineClass: "opacity-30",
  },
  {
    key: "rangla-punjab",
    number: "04",
    name: "Rangla Punjab Society",
    description:
      "Digital presence for a Punjab NGO — events, donations, volunteers, and multilingual content.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    projectType: "NGO Website",
    badge: "Live — Punjab NGO",
    year: "2024",
    href: "https://rangla-punjab-society-front.onrender.com/",
    external: true,
    gridClass: "col-span-12 md:col-span-4",
    minHeightClass: "min-h-[280px] md:min-h-[300px]",
    topLineClass: "opacity-30",
  },
  {
    key: "ecoexchange",
    number: "05",
    name: "EcoExchange AI",
    description:
      "ML-powered sustainability marketplace with retrieval-augmented search and explainable recommendations.",
    tags: ["Python", "FastAPI", "RAG"],
    projectType: "AI Project",
    year: "2024",
    href: "/contact",
    external: false,
    gridClass: "col-span-12 md:col-span-4",
    minHeightClass: "min-h-[280px] md:min-h-[300px]",
    topLineClass: "opacity-30",
  },
] as const;
