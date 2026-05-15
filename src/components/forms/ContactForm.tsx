"use client";

import { useState, useCallback, type ReactElement } from "react";
import { useForm } from "@formspree/react";
import { FormField } from "@/components/forms/FormField";
import { FormSelect } from "@/components/forms/FormSelect";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { Honeypot } from "@/components/forms/Honeypot";
import { contactSchema, type ContactFormData } from "@/lib/validators/forms";
import { motion, AnimatePresence } from "framer-motion";

const NEED_OPTIONS = [
  { value: "A custom website", label: "A custom website" },
  { value: "AI chatbot integration", label: "AI chatbot integration" },
  { value: "Workflow automation", label: "Workflow automation" },
  { value: "CRM / email setup", label: "CRM / email setup" },
  { value: "SEO & digital growth", label: "SEO & digital growth" },
  { value: "Multiple services", label: "Multiple services" },
  { value: "Not sure yet", label: "Not sure yet — let’s talk" },
] as const;

import * as analytics from "@/lib/analytics";

const initialForm: ContactFormData = {
  name: "",
  email: "",
  need: "",
  details: "",
};

export function ContactForm(): ReactElement {
  const [form, setForm] = useState(initialForm);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [state, handleSubmit] = useForm("xojroqjw");

  const validate = useCallback(() => {
    if (honeypot) return false;

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof ContactFormData;
        if (path) fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  }, [form, honeypot]);

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate() || state.submitting) return;
    
    analytics.event({
      action: "contact_form_submission",
      category: "Lead Generation",
      label: form.need || "General Inquiry",
    });

    await handleSubmit(e);
  };

  if (state.succeeded) {
    return (
      <div className="rounded-sm border border-white/[0.08] bg-[#0a0a0f]/85 px-8 py-12 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-pink font-dm text-2xl text-pink">
          ✓
        </div>
        <h3 className="font-heading text-2xl font-bold text-white">Message received.</h3>
        <p className="mt-2 font-dm text-[#9CA3AF]">
          We’ll get back to you soon. Usually within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative z-[1] mx-auto w-full max-w-md rounded-sm border border-white/[0.08] bg-[#0a0a0f]/80 p-8 shadow-[0_0_0_1px_rgba(255,0,138,0.06),0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-10"
    >
      <Honeypot value={honeypot} onChange={setHoneypot} />
      
      <div className="space-y-8">
        <FormField
          id="name"
          name="name"
          label="Your name"
          value={form.name}
          onChange={(v) => setForm(f => ({ ...f, name: v }))}
          error={errors.name}
          autoComplete="name"
        />
        
        <FormField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => setForm(f => ({ ...f, email: v }))}
          error={errors.email}
          autoComplete="email"
        />
        
        <FormSelect
          id="need"
          name="need"
          label="What do you need?"
          value={form.need}
          placeholder="Pick an option"
          options={NEED_OPTIONS}
          onChange={(v) => setForm(f => ({ ...f, need: v }))}
          error={errors.need}
        />
        
        <FormField
          id="details"
          name="details"
          label="Project details"
          value={form.details}
          onChange={(v) => setForm(f => ({ ...f, details: v }))}
          error={errors.details}
          multiline
          rows={4}
          hint="Tell us what you’re building, your timeline, budget..."
        />

        <div className="flex flex-col gap-4">
          <LoadingButton loading={state.submitting} className="w-full">
            Send message
          </LoadingButton>

          <button
            type="button"
            onClick={handleReset}
            disabled={state.submitting}
            className="mx-auto text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/20 transition-colors hover:text-pink active:scale-95 disabled:opacity-0"
          >
            Clear form
          </button>
        </div>
      </div>

      {state.errors && (
        <p className="mt-4 text-center text-xs text-pink">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
