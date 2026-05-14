export type CareerRoleId =
  | "frontend"
  | "backend"
  | "fullstack"
  | "ai-automation"
  | "ml"
  | "uiux"
  | "seo"
  | "other";

export const CAREER_ROLE_OPTIONS: readonly { value: CareerRoleId; label: string }[] =
  [
    { value: "frontend", label: "Frontend Developer" },
    { value: "backend", label: "Backend Developer" },
    { value: "fullstack", label: "Full Stack Developer" },
    { value: "ai-automation", label: "AI Automation Engineer" },
    { value: "ml", label: "Machine Learning Engineer" },
    { value: "uiux", label: "UI/UX Designer" }
  ] as const;

export const CAREER_FAQ: readonly { q: string; a: string }[] = [
  {
    q: "Do you offer remote opportunities?",
    a: "Yes. We are headquartered in Ludhiana, India, and collaborate with talent worldwide. Time-zone overlap and async communication matter more than location.",
  },
  {
    q: "Are internships available?",
    a: "We open internship windows when project load allows. Mention internship intent in your application and we will route you when a cohort is active.",
  },
  {
    q: "Can freelancers apply?",
    a: "Absolutely. We staff some engagements with trusted collaborators. Be explicit about your availability, rate expectations, and preferred engagement model.",
  },
  {
    q: "What happens after submission?",
    a: "We review applications on a rolling basis. If there is a fit, you will hear from us within a few business days with next steps — usually a short intro call followed by a focused technical or portfolio review.",
  },
] as const;
