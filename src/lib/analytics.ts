/**
 * Google Analytics 4 event tracking helpers.
 * Uses window.gtag injected by @next/third-parties/google.
 * Only fires in production; silently no-ops in development.
 */

const GA_ID = "G-9WVWPBCZEB";

// ─── Low-level gtag wrapper ─────────────────────────────────────────────────

function gtag(...args: unknown[]): void {
  if (
    typeof window === "undefined" ||
    typeof (window as any).gtag !== "function"
  ) {
    return;
  }
  (window as any).gtag(...args);
}

// ─── Generic event helper (kept for backward compat) ────────────────────────

export function event({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}): void {
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

// ─── Specific event helpers ──────────────────────────────────────────────────

/** Fired when the contact form submits successfully */
export function trackContactFormSubmit(): void {
  gtag("event", "contact_form_submit", {
    event_category: "Forms",
    event_label: "Contact Page",
  });
}

/** Fired when the careers application submits successfully */
export function trackCareerFormSubmit(role?: string): void {
  gtag("event", "career_form_submit", {
    event_category: "Forms",
    event_label: role ?? "General Application",
  });
}

/** Fired when a user clicks a WhatsApp link */
export function trackWhatsAppClick(source: string): void {
  gtag("event", "whatsapp_click", {
    event_category: "Engagement",
    event_label: source,
  });
}

/** Fired when a user clicks an email link */
export function trackEmailClick(source: string): void {
  gtag("event", "email_click", {
    event_category: "Engagement",
    event_label: source,
  });
}

/** Fired when a user clicks a Call / Phone link */
export function trackCallClick(source: string): void {
  gtag("event", "call_click", {
    event_category: "Engagement",
    event_label: source,
  });
}

/** Fired when a CTA like "Book Consultation" is clicked */
export function trackConsultationCTA(label: string): void {
  gtag("event", "consultation_cta_click", {
    event_category: "CTA",
    event_label: label,
  });
}

/** Fired when a service-specific CTA is clicked */
export function trackServiceCTA(label: string): void {
  gtag("event", "service_cta_click", {
    event_category: "CTA",
    event_label: label,
  });
}

export { GA_ID };
