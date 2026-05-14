export type ServiceItem = {
  readonly id: string;
  readonly n: "01" | "02" | "03" | "04" | "05" | "06";
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
};

export const SERVICE_ITEMS: readonly ServiceItem[] = [
  {
    id: "custom-websites",
    n: "01",
    title: "Custom Websites",
    description:
      "High-performance sites with conversion-led UX, SEO-ready structure, and a presence that feels intentional.",
    tags: ["Next.js", "React", "TypeScript", "SEO-Ready"],
  },
  {
    id: "ai-chatbots",
    n: "02",
    title: "AI Chatbots",
    description:
      "Intelligent assistants trained on your workflows — support, sales, and FAQs handled around the clock.",
    tags: ["Groq", "Gemini", "RAG", "APIs"],
  },
  {
    id: "workflow-automation",
    n: "03",
    title: "Workflow Automation",
    description:
      "End-to-end systems that eliminate repetitive tasks. Connect any tool, any platform, any process.",
    tags: ["n8n", "Zapier", "REST APIs", "Webhooks"],
  },
  {
    id: "crm-email",
    n: "04",
    title: "CRM & Email Automation",
    description:
      "Smart pipelines that nurture leads, send the right message at the right time, automatically.",
    tags: ["Brevo", "HubSpot", "Email", "Sequences"],
  },
  {
    id: "whatsapp",
    n: "05",
    title: "WhatsApp Automation",
    description:
      "WhatsApp Business API integrations for automated customer communication at scale.",
    tags: ["WhatsApp API", "Chatbots", "Broadcasts", "CRM Sync"],
  },
  {
    id: "seo-growth",
    n: "06",
    title: "SEO & Digital Growth",
    description:
      "Data-driven SEO and content strategies that compound your organic visibility over time.",
    tags: ["Technical SEO", "Content", "Analytics", "Core Web Vitals"],
  },
] as const;
