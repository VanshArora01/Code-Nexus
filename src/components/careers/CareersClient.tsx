"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useForm, ValidationError } from "@formspree/react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactElement,
} from "react";

import {
  CAREER_FAQ,
  CAREER_ROLE_OPTIONS,
  type CareerRoleId,
} from "@/lib/content/careers-data";
import { registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { UploadStatus } from "@/types/cloudinary";
import { trackCareerFormSubmit } from "@/lib/analytics";

const ease = [0.22, 1, 0.36, 1] as const;
const view = {
  once: true,
  margin: "-12% 0px -8% 0px",
  amount: 0.2,
} as const;

const FOCUS_AREAS = [
  "AI automation",
  "Custom web development",
  "Chatbot integrations",
  "Workflow automation",
  "Machine learning solutions",
  "SEO & digital growth",
] as const;

const YEARS_OPTS = [
  "0–1 years",
  "1–3 years",
  "3–5 years",
  "5+ years",
] as const;

const AVAIL_OPTS = [
  "Immediately",
  "Within 2 weeks",
  "Within 1 month",
  "1–3 months",
  "Exploring options",
] as const;

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  role: CareerRoleId | "";
  yearsExperience: (typeof YEARS_OPTS)[number] | "";
  availability: (typeof AVAIL_OPTS)[number] | "";
  compensation: string;
  skills: string;
  about: string;
  coverMessage: string;
  consent: boolean;
  resume_url?: string;
};

type FieldErrors = Partial<Record<keyof FormState | "resume", string>>;

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  portfolio: "",
  role: "",
  yearsExperience: "",
  availability: "",
  compensation: "",
  skills: "",
  about: "",
  coverMessage: "",
  consent: false,
};

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  optional,
  autoComplete,
  error,
  name,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  optional?: boolean;
  autoComplete?: string;
  error?: string;
  name?: string;
  placeholder?: string;
}): ReactElement {
  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className="mb-2 block font-dm text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/40 transition-colors group-focus-within:text-pink"
      >
        {label}
        {optional ? (
          <span className="ml-1 font-normal normal-case tracking-normal text-white/30">
            (optional)
          </span>
        ) : null}
      </label>
      <input
        id={id}
        name={name || id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className={cn(
          "w-full rounded-sm border bg-black/40 px-4 py-3 font-dm text-sm text-white outline-none transition-[border-color,box-shadow] placeholder:text-white/25 focus:shadow-[0_0_0_1px_rgba(255,0,138,0.15)]",
          error ? "border-pink/50" : "border-white/[0.08] focus:border-pink/45",
        )}
        placeholder={placeholder || " "}
      />
      {error ? <p className="mt-2 font-dm text-xs text-pink">{error}</p> : null}
    </div>
  );
}

function TextAreaField({
  id,
  label,
  value,
  onChange,
  rows,
  optional,
  hint,
  error,
  name,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows: number;
  optional?: boolean;
  hint?: string;
  error?: string;
  name?: string;
}): ReactElement {
  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className="mb-2 block font-dm text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/40 transition-colors group-focus-within:text-pink"
      >
        {label}
        {optional ? (
          <span className="ml-1 font-normal normal-case tracking-normal text-white/30">
            (optional)
          </span>
        ) : null}
      </label>
      <textarea
        id={id}
        name={name || id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={cn(
          "w-full resize-y rounded-sm border bg-black/40 px-4 py-3 font-dm text-sm leading-relaxed text-white outline-none transition-[border-color,box-shadow] placeholder:text-white/25 focus:shadow-[0_0_0_1px_rgba(255,0,138,0.15)]",
          error ? "border-pink/50" : "border-white/[0.08] focus:border-pink/45",
        )}
        placeholder=" "
      />
      {error ? <p className="mt-2 font-dm text-xs text-pink">{error}</p> : null}
      {!error && hint ? (
        <p className="mt-1.5 font-dm text-xs leading-relaxed text-white/35">{hint}</p>
      ) : null}
    </div>
  );
}

function CareersDarkSelect({
  id,
  label,
  value,
  placeholder,
  options,
  onChange,
  error,
  name,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
  onChange: (v: string) => void;
  error?: string;
  name?: string;
}): ReactElement {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use `click` (not `mousedown`) so scrollbar drags on the listbox are not
    // mistaken for outside clicks — a common Windows/Chromium issue.
    const onDoc = (e: MouseEvent): void => {
      const t = e.target as Node | null;
      if (!t || !rootRef.current) return;
      if (!rootRef.current.contains(t)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={rootRef} className="relative">
      <label
        htmlFor={id}
        className="mb-2 block font-dm text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/40"
      >
        {label}
      </label>
      <input type="hidden" name={name || id} value={value} />
      <button
        id={id}
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-sm border bg-black/40 px-4 py-3 text-left font-dm text-sm outline-none transition-[border-color,box-shadow]",
          error
            ? "border-pink/50"
            : "border-white/[0.08] focus:border-pink/45 focus:shadow-[0_0_0_1px_rgba(255,0,138,0.15)]",
        )}
      >
        <span className={value ? "text-white" : "text-white/35"}>
          {selected ? selected.label : placeholder}
        </span>
        <span
          className={cn(
            "shrink-0 text-xs text-white/45 transition-transform duration-200",
            open ? "rotate-180" : "",
          )}
          aria-hidden
        >
          ▾
        </span>
      </button>
      {open ? (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[min(50vh,280px)] overflow-y-auto overscroll-contain rounded-md border border-white/[0.12] bg-[#0c0c14] py-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/[0.03] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
        >
          <li role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={value === ""}
              className="flex w-full items-center gap-3 px-4 py-3 text-left font-dm text-sm text-white/40 transition-colors hover:bg-white/[0.04] hover:text-white"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
            >
              {placeholder}
            </button>
          </li>
          {options.map((o) => (
            <li key={o.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === o.value}
                className={cn(
                  "group/opt flex w-full items-center gap-3 px-4 py-3 text-left font-dm text-sm transition-colors",
                  value === o.value
                    ? "bg-pink/10 text-white"
                    : "text-white/80 hover:bg-[rgba(255,0,138,0.08)] hover:text-white",
                )}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-200",
                    value === o.value ? "bg-pink shadow-[0_0_8px_rgba(255,0,138,0.8)]" : "bg-white/20 opacity-0 group-hover/opt:opacity-100"
                  )}
                  aria-hidden
                />
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {error ? <p className="mt-2 font-dm text-xs text-pink">{error}</p> : null}
    </div>
  );
}

export function CareersClient(): ReactElement {
  const formId = useId();
  const applyRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [state, handleSubmit] = useForm("mrejwgej");
  
  // Cloudinary States
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Persistence: Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("careers-form");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setForm((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to load saved form", e);
      }
    }
  }, []);

  // Persistence: Save to localStorage
  useEffect(() => {
    localStorage.setItem("careers-form", JSON.stringify(form));
  }, [form]);

  // Clear on success + fire GA4 event
  useEffect(() => {
    if (state.succeeded) {
      localStorage.removeItem("careers-form");
      trackCareerFormSubmit(form.role || undefined);
    }
  }, [state.succeeded]);

  // Fix scrolling issues when layout changes
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [errors, cloudinaryUrl, state.succeeded]);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const scrollToApply = useCallback((roleId: CareerRoleId): void => {
    setForm((f) => ({ ...f, role: roleId }));
    requestAnimationFrame(() => {
      applyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const validate = useCallback((): boolean => {
    const next: FieldErrors = {};
    if (!form.fullName.trim()) next.fullName = "Required.";
    if (!form.email.trim()) next.email = "Required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email.";
    }
    if (!form.phone.trim()) next.phone = "Required.";
    if (!form.location.trim()) next.location = "Required.";
    if (!form.role) next.role = "Select a role.";
    if (!form.yearsExperience) next.yearsExperience = "Select experience range.";
    if (!form.availability) next.availability = "Select availability.";
    if (!form.skills.trim()) next.skills = "Add at least one skill.";
    if (!form.about.trim() || form.about.trim().length < 5) {
      next.about = "Please share a bit about yourself.";
    }
    if (!form.consent) next.consent = "Consent is required to submit.";
    
    if (!cloudinaryUrl) {
      next.resume = "Please upload your resume to Cloudinary first.";
    }
    
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [form, cloudinaryUrl]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus("uploading");
    setUploadError("");
    setErrors((prev) => ({ ...prev, resume: undefined }));

    try {
      const url = await uploadToCloudinary(file);
      setCloudinaryUrl(url);
      setUploadStatus("success");
    } catch (err: any) {
      console.error("Cloudinary upload failed:", err);
      setUploadError(err.message || "Upload failed. Please try again.");
      setUploadStatus("failure");
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validate() || state.submitting || uploadStatus === "uploading") return;

    const formData = new FormData(e.currentTarget);
    formData.append("resume_url", cloudinaryUrl);
    
    await handleSubmit(formData);
  };

  return (
    <div className="relative overflow-x-clip bg-bg">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35] careers-aurora"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.12] careers-grid-drift"
        aria-hidden
      />

      {/* Hero */}
      <section className="relative min-h-[88vh] border-b border-white/[0.06] px-4 pb-24 pt-28 md:px-6 lg:px-8 lg:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-24 h-[min(70vw,480px)] w-[min(70vw,480px)] -translate-x-1/2 rounded-full blur-[120px] careers-orb" />
        <div className="relative mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease }}
            className="relative overflow-hidden rounded-sm border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-px"
          >
            <div className="relative bg-[#06060f]/90 px-6 py-16 backdrop-blur-xl md:px-14 md:py-20">
              <div className="careers-scanline pointer-events-none absolute inset-0 opacity-30" aria-hidden />
              <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.38em] text-pink">
                Careers
              </p>
              <h1
                className="mt-6 max-w-[16ch] font-heading font-black tracking-tight text-white"
                style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.75rem)", lineHeight: 1.02 }}
              >
                Build the{" "}
                <span className="bg-gradient-to-r from-pink via-white to-purple bg-clip-text text-transparent">
                  future stack
                </span>{" "}
                with us.
              </h1>
              <p className="mt-8 max-w-2xl font-dm text-base leading-relaxed text-white/55 md:text-lg">
                The Code Nexus is a startup team obsessed with AI automation, custom web
                builds, chatbots, workflows, machine learning, and SEO-led growth.
                Use the form below to introduce yourself — we read every submission.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                {FOCUS_AREAS.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.4, ease }}
                    className="rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-1.5 font-dm text-[0.72rem] tracking-wide text-white/60"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              <div className="mt-12 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => applyRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="group inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-pink to-purple px-6 py-3 font-heading text-sm font-semibold text-white shadow-[0_0_40px_rgba(255,0,138,0.25)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(255,0,138,0.35)]"
                >
                  Start application
                  <span className="transition-transform group-hover:translate-x-0.5">↓</span>
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-sm border border-white/[0.14] bg-white/[0.03] px-6 py-3 font-heading text-sm font-semibold text-white/90 transition-colors hover:border-pink/40 hover:text-white"
                >
                  Partner inquiry
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section
        ref={applyRef}
        id="application"
        className="scroll-mt-24 border-b border-white/[0.06] px-4 py-24 md:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-[800px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={view}
            transition={{ duration: 0.6, ease }}
          >
            <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.35em] text-pink">
              Application
            </p>
            <h2
              className="mt-3 font-heading font-black text-white"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
            >
              Tell us who you are.
            </h2>
            <p className="mt-3 font-dm text-sm leading-relaxed text-white/45">
              This application will be sent directly to our hiring team.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!state.succeeded ? (
              <motion.form
                key="careers-form"
                id={`${formId}-careers`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease }}
                onSubmit={onSubmit}
                method="POST"
                action="https://formspree.io/f/mrejwgej"
                encType="multipart/form-data"
                className="relative mt-12 space-y-10 rounded-sm border border-white/[0.08] bg-[#08080f]/90 p-6 shadow-[0_24px_100px_rgba(0,0,0,0.5)] backdrop-blur-md md:p-10"
              >
                <input type="hidden" name="_subject" value={`New Career Application: ${form.fullName}`} />
                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-pink via-purple/50 to-transparent opacity-70" aria-hidden />

                <fieldset className="space-y-5">
                  <legend className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.15em] text-white/80">
                    Personal information
                  </legend>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      id={`${formId}-name`}
                      name="name"
                      label="Full name"
                      value={form.fullName}
                      onChange={(fullName) => setForm((f) => ({ ...f, fullName }))}
                      autoComplete="name"
                      error={errors.fullName}
                    />
                    <Field
                      id={`${formId}-email`}
                      name="email"
                      label="Email address"
                      type="email"
                      value={form.email}
                      onChange={(email) => setForm((f) => ({ ...f, email }))}
                      autoComplete="email"
                      error={errors.email}
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-pink text-xs" />
                    <Field
                      id={`${formId}-phone`}
                      name="phone"
                      label="Phone number"
                      type="tel"
                      value={form.phone}
                      onChange={(phone) => setForm((f) => ({ ...f, phone }))}
                      autoComplete="tel"
                      error={errors.phone}
                    />
                    <Field
                      id={`${formId}-loc`}
                      name="location"
                      label="Location"
                      value={form.location}
                      onChange={(location) => setForm((f) => ({ ...f, location }))}
                      autoComplete="address-level2"
                      error={errors.location}
                    />
                  </div>
                </fieldset>

                <fieldset className="space-y-5">
                  <legend className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.15em] text-white/80">
                    Professional links
                  </legend>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      id={`${formId}-li`}
                      name="linkedin"
                      label="LinkedIn profile URL"
                      type="url"
                      value={form.linkedin}
                      onChange={(linkedin) => setForm((f) => ({ ...f, linkedin }))}
                      optional
                    />
                    <Field
                      id={`${formId}-gh`}
                      name="github"
                      label="GitHub profile URL"
                      type="url"
                      value={form.github}
                      onChange={(github) => setForm((f) => ({ ...f, github }))}
                      optional
                    />
                    <div className="md:col-span-2">
                      <Field
                        id={`${formId}-port`}
                        label="Portfolio website URL"
                        type="url"
                        value={form.portfolio}
                        onChange={(portfolio) => setForm((f) => ({ ...f, portfolio }))}
                        optional
                      />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="space-y-5">
                  <legend className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.15em] text-white/80">
                    Application details
                  </legend>
                  <div className="grid gap-5 md:grid-cols-2">
                    <CareersDarkSelect
                      id={`${formId}-role`}
                      name="role"
                      label="Role applying for"
                      value={form.role}
                      placeholder="Select a role"
                      options={CAREER_ROLE_OPTIONS.map((o) => ({
                        value: o.value,
                        label: o.label,
                      }))}
                      onChange={(v) =>
                        setForm((f) => ({
                          ...f,
                          role: v as CareerRoleId | "",
                        }))
                      }
                      error={errors.role}
                    />
                    <CareersDarkSelect
                      id={`${formId}-yrs`}
                      name="experience"
                      label="Years of experience"
                      value={form.yearsExperience}
                      placeholder="Select range"
                      options={YEARS_OPTS.map((y) => ({ value: y, label: y }))}
                      onChange={(v) =>
                        setForm((f) => ({
                          ...f,
                          yearsExperience: v as FormState["yearsExperience"],
                        }))
                      }
                      error={errors.yearsExperience}
                    />
                    <CareersDarkSelect
                      id={`${formId}-avail`}
                      name="availability"
                      label="Availability / joining timeline"
                      value={form.availability}
                      placeholder="Select timeline"
                      options={AVAIL_OPTS.map((a) => ({ value: a, label: a }))}
                      onChange={(v) =>
                        setForm((f) => ({
                          ...f,
                          availability: v as FormState["availability"],
                        }))
                      }
                      error={errors.availability}
                    />
                    <Field
                      id={`${formId}-comp`}
                      name="expected_compensation"
                      label="Expected compensation"
                      value={form.compensation}
                      onChange={(compensation) => setForm((f) => ({ ...f, compensation }))}
                      optional
                    />
                  </div>
                </fieldset>

                <Field
                  id={`${formId}-skills`}
                  name="skills"
                  label="Skills"
                  value={form.skills}
                  onChange={(skills) => setForm((f) => ({ ...f, skills }))}
                  error={errors.skills}
                />
                {!errors.skills ? (
                  <p className="-mt-4 font-dm text-xs text-white/35">
                    Comma-separated is fine — e.g. Next.js, n8n, Figma.
                  </p>
                ) : null}

                <TextAreaField
                  id={`${formId}-about`}
                  name="about"
                  label="About you"
                  rows={6}
                  value={form.about}
                  onChange={(about) => setForm((f) => ({ ...f, about }))}
                  hint="Background, standout projects, strengths, and why The Code Nexus."
                  error={errors.about}
                />

                <TextAreaField
                  id={`${formId}-cover`}
                  name="cover_message"
                  label="Cover message"
                  rows={3}
                  optional
                  value={form.coverMessage}
                  onChange={(coverMessage) => setForm((f) => ({ ...f, coverMessage }))}
                />

                <div>
                  <p className="mb-4 font-heading text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/40 transition-colors group-focus-within:text-pink">
                    Resume upload
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadStatus === "uploading"}
                      className={cn(
                        "flex w-full items-center justify-center gap-3 rounded-sm border border-dashed px-4 py-8 transition-all duration-300",
                        uploadStatus === "idle" && "border-white/20 bg-black/30 hover:border-pink/40 hover:bg-black/40",
                        uploadStatus === "uploading" && "border-pink/40 bg-pink/5 cursor-wait",
                        uploadStatus === "success" && "border-green-500/40 bg-green-500/5",
                        uploadStatus === "failure" && "border-pink/60 bg-pink/10"
                      )}
                    >
                      <span className={cn(
                        "font-dm text-sm font-medium tracking-wide",
                        uploadStatus === "idle" && "text-white/60",
                        uploadStatus === "uploading" && "text-pink animate-pulse",
                        uploadStatus === "success" && "text-green-400",
                        uploadStatus === "failure" && "text-pink"
                      )}>
                        {uploadStatus === "idle" && "Upload Resume"}
                        {uploadStatus === "uploading" && "Uploading Resume..."}
                        {uploadStatus === "success" && "Resume Uploaded Successfully"}
                        {uploadStatus === "failure" && "Resume Upload Failed. Please Try Again."}
                      </span>
                    </button>

                    {uploadStatus === "success" && (
                      <div className="flex items-center justify-center gap-3">
                        <a 
                          href={cloudinaryUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-dm text-xs font-medium text-pink underline-offset-4 hover:underline"
                        >
                          View Uploaded Resume
                        </a>
                      </div>
                    )}

                    {uploadStatus === "failure" && uploadError && (
                      <p className="text-center font-dm text-xs text-pink">{uploadError}</p>
                    )}

                    {errors.resume && (
                      <p className="text-center font-dm text-xs text-pink">{errors.resume}</p>
                    )}
                  </div>
                </div>

                <label className="flex cursor-pointer items-start gap-3 font-dm text-sm text-white/55">
                  <input
                    type="checkbox"
                    name="consent"
                    value="given"
                    checked={form.consent}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, consent: e.target.checked }))
                    }
                    className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-black/50 accent-pink"
                  />
                  <span>
                    I consent to Code Nexus storing and reviewing the details in this
                    application for hiring purposes.
                  </span>
                </label>
                {errors.consent ? (
                  <p className="-mt-6 font-dm text-xs text-pink">{errors.consent}</p>
                ) : null}

                  <div className="flex flex-col gap-4">
                    {state.errors && (
                      <p className="font-dm text-xs text-pink">
                        Submission failed. Please try again.
                      </p>
                    )}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={state.submitting || uploadStatus === "uploading"}
                        className={cn(
                          "relative inline-flex min-w-[200px] items-center justify-center overflow-hidden rounded-sm border-0 bg-gradient-brand py-4 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white shadow-glow-pink transition-[transform,opacity] hover:-translate-y-0.5 disabled:cursor-wait",
                          (state.submitting || uploadStatus === "uploading") && "contact-submit-loading",
                        )}
                      >
                        {uploadStatus === "uploading" 
                          ? "Uploading resume..." 
                          : state.submitting 
                            ? "Submitting application..." 
                            : "Submit application"}
                      </button>
                    </div>
                  </div>
              </motion.form>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 rounded-sm border border-white/[0.1] bg-[#0c0c16] px-8 py-14 text-center"
              >
                <p className="font-heading text-2xl font-bold text-white">
                  Application submitted successfully.
                </p>
                <p className="mt-3 font-dm text-sm text-white/50">
                  We&apos;ll review your profile and get in touch.
                </p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-8 font-dm text-sm text-pink underline-offset-4 hover:underline"
                >
                  Submit another
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-white/[0.06] px-4 py-24 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[800px]">
          <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.35em] text-pink">
            FAQ
          </p>
          <h2
            className="mt-3 font-heading font-black text-white"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            Hiring questions, answered.
          </h2>
          <div className="mt-10 space-y-2">
            {CAREER_FAQ.map((item, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={item.q}
                  className="rounded-sm border border-white/[0.06] bg-[#0a0a12]/80"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-heading text-sm font-semibold text-white transition-colors hover:text-pink md:text-base"
                  >
                    {item.q}
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      className="shrink-0 text-white/40"
                    >
                      <ChevronDownIcon />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-white/[0.06] px-5 pb-4 pt-0 font-dm text-sm leading-relaxed text-white/55 md:px-5 md:pb-5">
                          {item.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* General CTA */}
      <section className="px-4 py-24 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.65, ease }}
          className="relative mx-auto max-w-[1200px] overflow-hidden rounded-sm border border-white/[0.08] p-10 md:p-14"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background:
                "linear-gradient(120deg, rgba(255,0,138,0.14), transparent 40%, rgba(139,92,246,0.12))",
            }}
            aria-hidden
          />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl text-left">
              <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.35em] text-pink">
                No perfect title?
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-white md:text-3xl">
                Send a general application anyway.
              </h2>
              <p className="mt-4 font-dm text-sm leading-relaxed text-white/55 md:text-base">
                If your craft sits between roles — research, developer relations,
                growth experiments — we still want the signal. Choose &quot;Other /
                General Application&quot; and make the case in your story.
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToApply("other")}
              className="group relative shrink-0 overflow-hidden rounded-sm border border-white/[0.12] bg-white/[0.06] px-8 py-4 font-heading text-sm font-bold uppercase tracking-[0.15em] text-white transition-[border-color,transform] hover:-translate-y-0.5 hover:border-pink/40"
            >
              <span className="relative z-10">Submit profile</span>
              <span
                className="pointer-events-none absolute inset-0 translate-y-full bg-gradient-to-r from-pink/30 to-purple/20 transition-transform duration-500 group-hover:translate-y-0"
                aria-hidden
              />
            </button>
          </div>
        </motion.div>

        <p className="mx-auto mt-16 max-w-lg text-center font-dm text-sm text-white/40">
          Prefer email? Reach us on the{" "}
          <Link href="/contact" className="text-pink hover:underline">
            contact page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}

function ChevronDownIcon(): ReactElement {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
