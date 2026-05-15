"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useForm } from "@formspree/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactElement,
} from "react";

import { SITE_EMAIL, SITE_SOCIAL } from "@/lib/site-social";
import { trackContactFormSubmit } from "@/lib/analytics";

const ease = [0.22, 1, 0.36, 1] as const;

const NEED_OPTIONS = [
  "A custom website",
  "AI chatbot integration",
  "Workflow automation",
  "CRM / email setup",
  "SEO & digital growth",
  "Multiple services",
  "Not sure yet — let\u2019s talk",
] as const;

type NeedOption = (typeof NEED_OPTIONS)[number];

type FormState = {
  name: string;
  email: string;
  need: NeedOption | "";
  details: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  email: "",
  need: "",
  details: "",
};

function useFloatingActive(value: string, focused: boolean): boolean {
  return focused || value.length > 0;
}

function FieldText({
  id,
  label,
  value,
  onChange,
  type = "text",
  error,
  name,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "email";
  error?: string;
  name?: string;
}): ReactElement {
  const [focused, setFocused] = useState(false);
  const active = useFloatingActive(value, focused);

  return (
    <div className="relative mb-8">
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 font-dm uppercase tracking-[0.15em] text-[rgba(255,255,255,0.3)] transition-all duration-200 ease-out"
        style={{
          top: active ? "-4px" : "16px",
          fontSize: active ? "0.65rem" : "0.8rem",
          color: active ? "#ff008a" : "rgba(255,255,255,0.3)",
        }}
      >
        {label}
      </label>
      <input
        id={id}
        name={name || id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        autoComplete={type === "email" ? "email" : "name"}
        className="w-full border-0 border-b bg-transparent py-3 pb-3 pt-5 font-dm text-base text-white outline-none transition-[border-color] duration-200 ease-out"
        style={{
          borderBottomColor: active
            ? "rgba(255,0,138,0.6)"
            : "rgba(255,255,255,0.12)",
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
        }}
      />
      {error ? (
        <p className="mt-2 font-dm text-xs text-pink">{error}</p>
      ) : null}
    </div>
  );
}

function FieldTextarea({
  id,
  label,
  value,
  onChange,
  error,
  name,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  name?: string;
}): ReactElement {
  const [focused, setFocused] = useState(false);
  const active = useFloatingActive(value, focused);

  return (
    <div className="relative mb-8">
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 font-dm uppercase tracking-[0.15em] text-[rgba(255,255,255,0.3)] transition-all duration-200 ease-out"
        style={{
          top: active ? "-4px" : "16px",
          fontSize: active ? "0.65rem" : "0.8rem",
          color: active ? "#ff008a" : "rgba(255,255,255,0.3)",
        }}
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name || id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
        placeholder=" "
        className="min-h-[120px] w-full resize-none border-0 border-b bg-transparent py-3 pb-3 pt-5 font-dm text-base text-white outline-none transition-[border-color] duration-200 ease-out"
        style={{
          borderBottomColor: active
            ? "rgba(255,0,138,0.6)"
            : "rgba(255,255,255,0.12)",
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
        }}
      />
      <p className="mt-2 font-dm text-xs leading-relaxed text-white/35">
        Tell us what you&apos;re building, your timeline, budget range…
      </p>
      {error ? (
        <p className="mt-2 font-dm text-xs text-pink">{error}</p>
      ) : null}
    </div>
  );
}

function CustomNeedSelect({
  value,
  onChange,
  error,
  name,
  id,
}: {
  value: FormState["need"];
  onChange: (v: NeedOption) => void;
  error?: string;
  name?: string;
  id?: string;
}): ReactElement {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useFloatingActive(value, focused || open);

  useEffect(() => {
    const onDoc = (e: MouseEvent): void => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={rootRef} className="relative mb-8">
      <label
        className="pointer-events-none absolute left-0 font-dm uppercase tracking-[0.15em] transition-all duration-200 ease-out"
        style={{
          top: active ? "-4px" : "16px",
          fontSize: active ? "0.65rem" : "0.8rem",
          color: active ? "#ff008a" : "rgba(255,255,255,0.3)",
        }}
      >
        What do you need?
      </label>
      <input type="hidden" name={name || id} value={value} />
      <button
        type="button"
        className="flex w-full items-center justify-between border-0 border-b bg-transparent py-3 pb-3 pt-5 text-left font-dm text-base text-white outline-none transition-[border-color] duration-200 ease-out"
        style={{
          borderBottomColor: active
            ? "rgba(255,0,138,0.6)"
            : "rgba(255,255,255,0.12)",
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
        }}
        onClick={() => setOpen((o) => !o)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className={value ? "text-white" : "text-transparent"}>
          {value || "\u00a0"}
        </span>
        <span className="text-white/40" aria-hidden>
          ▾
        </span>
      </button>
      {open ? (
        <ul
          className="absolute left-0 right-0 top-full z-30 mt-1 border border-white/[0.08] bg-[#12121c] py-1 shadow-xl"
          role="listbox"
        >
          {NEED_OPTIONS.map((opt) => (
            <li key={opt} role="presentation">
              <button
                type="button"
                className="group/opt flex w-full items-center gap-2 px-4 py-2.5 text-left font-dm text-sm text-white/80 transition-colors hover:bg-[rgba(255,0,138,0.08)] hover:text-white"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full opacity-0 transition-opacity group-hover/opt:opacity-100"
                  style={{ background: "#ff008a" }}
                  aria-hidden
                />
                {opt}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {error ? (
        <p className="mt-2 font-dm text-xs text-pink">{error}</p>
      ) : null}
    </div>
  );
}

export default function ContactPageClient(): ReactElement {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, handleSubmit] = useForm("xojroqjw");

  // Persistence: Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("contact-form");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setForm((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to load saved contact form", e);
      }
    }
  }, []);

  // Persistence: Save to localStorage
  useEffect(() => {
    localStorage.setItem("contact-form", JSON.stringify(form));
  }, [form]);

  // Clear on success + fire GA4 event
  useEffect(() => {
    if (state.succeeded) {
      localStorage.removeItem("contact-form");
      trackContactFormSubmit();
    }
  }, [state.succeeded]);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const validate = useCallback((): boolean => {
    const next: FieldErrors = {};
    if (!form.name.trim()) {
      next.name = "Please add your name.";
    }
    if (!form.email.trim()) {
      next.email = "Please add your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email.";
    }
    if (!form.need) {
      next.need = "Pick an option.";
    }
    if (!form.details.trim()) {
      next.details = "A few lines help us respond faster.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [form]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validate() || state.submitting) {
      return;
    }
    await handleSubmit(e);
  };

  const socialRow = (
    [
      { label: "LinkedIn", href: SITE_SOCIAL.linkedin },
      { label: "Instagram", href: SITE_SOCIAL.instagram },
      { label: "WhatsApp", href: SITE_SOCIAL.whatsappCommunity },
    ] as const
  ).map((s) => (
    <Link
      key={s.label}
      href={s.href}
      target="_blank"
      rel="noreferrer"
      className="group/soc inline-flex items-center gap-1 font-dm text-sm text-white transition-colors hover:text-pink"
    >
      {s.label}
      <span className="transition-transform duration-300 group-hover/soc:translate-x-0.5">
        ↗
      </span>
    </Link>
  ));

  // No useId here, we'll use static IDs for Formspree mapping consistency if needed, 
  // but keeping dynamic for accessibility where possible.
  const formId = "contact"; 

  return (
    <div className="relative flex min-h-[calc(100dvh-4rem)] flex-col md:flex-row">
      <div
        className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-pink/60 via-purple/40 to-transparent md:block"
        style={{ left: "50%" }}
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col justify-center overflow-hidden bg-[#050505] px-6 py-20 md:px-12 lg:px-20 lg:py-24">
        <div
          className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,0,138,0.18), transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.14), transparent 70%)",
          }}
          aria-hidden
        />
        <p className="relative font-dm text-[0.7rem] font-medium uppercase tracking-[0.35em] text-pink">
          Get in touch
        </p>
        <h1
          className="relative mt-6 font-heading font-black leading-[1.05] text-white"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          Let&apos;s build something together.
        </h1>
        <p className="relative mt-4 max-w-md font-dm text-base leading-[1.7] text-[#9CA3AF]">
          Tell us what you&apos;re building. No long forms, no automated
          responses — just a real conversation about your project.
        </p>

        <div className="relative mt-14 flex flex-col gap-10">
          <div>
            <p className="font-dm text-[0.65rem] uppercase tracking-[0.2em] text-[#9CA3AF]">
              Email
            </p>
            <a
              href={SITE_SOCIAL.email}
              className="group/gl relative mt-2 inline-block font-dm text-[1.1rem] font-medium text-white transition-[color,background-image] duration-300"
            >
              <span className="group-hover/gl:bg-gradient-to-r group-hover/gl:from-[#ff008a] group-hover/gl:to-[#8b5cf6] group-hover/gl:bg-clip-text group-hover/gl:text-transparent">
                {SITE_EMAIL}
              </span>
              <span
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#ff008a] to-[#8b5cf6] transition-transform duration-300 group-hover/gl:scale-x-100"
                aria-hidden
              />
            </a>
          </div>
          <div>
            <p className="font-dm text-[0.65rem] uppercase tracking-[0.2em] text-[#9CA3AF]">
              Community
            </p>
            <a
              href={SITE_SOCIAL.whatsappCommunity}
              target="_blank"
              rel="noreferrer"
              className="group/wa relative mt-2 inline-block font-dm text-[1.05rem] font-medium text-white transition-[color] duration-300"
            >
              <span className="group-hover/wa:bg-gradient-to-r group-hover/wa:from-[#ff008a] group-hover/wa:to-[#8b5cf6] group-hover/wa:bg-clip-text group-hover/wa:text-transparent">
                Join the Code Nexus WhatsApp
              </span>
              <span
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#ff008a] to-[#8b5cf6] transition-transform duration-300 group-hover/wa:scale-x-100"
                aria-hidden
              />
            </a>
          </div>
          <div>
            <p className="font-dm text-[0.65rem] uppercase tracking-[0.2em] text-[#9CA3AF]">
              Based in
            </p>
            <p className="mt-2 font-dm text-[1.1rem] text-white">
              Ludhiana, India · Available Worldwide
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-2">
          <div
            className="pulse-green-dot h-2 w-2 shrink-0 rounded-full bg-[#22c55e]"
            aria-hidden
          />
          <span className="font-dm text-[0.8rem] uppercase tracking-[0.15em] text-white/50">
            Currently taking new projects
          </span>
        </div>

        <div className="mt-auto pt-20">
          <p className="font-dm text-[0.65rem] uppercase tracking-[0.2em] text-[#9CA3AF]">
            Follow the build
          </p>
          <div className="mt-4 flex flex-wrap gap-6">{socialRow}</div>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col justify-center border-t border-white/[0.06] bg-[#0b0b14] px-6 py-20 md:border-t-0 md:px-12 lg:px-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />
        <AnimatePresence mode="wait">
          {!state.succeeded ? (
            <motion.form
              key="form"
              id={formId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease }}
              onSubmit={onSubmit}
              className="relative z-[1] mx-auto w-full max-w-md rounded-sm border border-white/[0.08] bg-[#0a0a0f]/80 p-8 shadow-[0_0_0_1px_rgba(255,0,138,0.06),0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-10"
            >
              <FieldText
                id={`${formId}-name`}
                name="name"
                label="Your name"
                value={form.name}
                onChange={(name) => setForm((f) => ({ ...f, name }))}
                error={errors.name}
              />
              <FieldText
                id={`${formId}-email`}
                name="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={(email) => setForm((f) => ({ ...f, email }))}
                error={errors.email}
              />
              <CustomNeedSelect
                name="subject"
                value={form.need}
                onChange={(need) => setForm((f) => ({ ...f, need }))}
                error={errors.need}
              />
              <FieldTextarea
                id={`${formId}-details`}
                name="message"
                label="Project details"
                value={form.details}
                onChange={(details) => setForm((f) => ({ ...f, details }))}
                error={errors.details}
              />
              {state.errors && (
                <p className="mb-4 font-dm text-xs text-pink">
                  Something went wrong. Please try again.
                </p>
              )}
              <button
                type="submit"
                disabled={state.submitting}
                className={`contact-submit-btn relative mt-4 w-full cursor-pointer overflow-hidden border-0 py-[18px] font-dm text-base font-semibold tracking-[0.05em] text-white transition-[opacity,transform,box-shadow] duration-200 hover:-translate-y-px hover:opacity-92 hover:shadow-[0_8px_30px_rgba(255,0,138,0.3)] disabled:cursor-wait disabled:opacity-90 ${
                  state.submitting ? "contact-submit-loading" : ""
                }`}
                style={{
                  background: "linear-gradient(135deg, #ff008a, #8b5cf6)",
                  borderRadius: 2,
                }}
              >
                {state.submitting ? "Sending..." : "Send message"}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
              className="relative z-[1] mx-auto w-full max-w-md rounded-sm border border-white/[0.08] bg-[#0a0a0f]/85 px-8 py-12 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md md:px-10"
            >
              <div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#ff008a] font-dm text-2xl text-[#ff008a]"
                aria-hidden
              >
                ✓
              </div>
              <h3 className="font-heading text-[1.8rem] font-bold text-white">
                Message received.
              </h3>
              <p className="mt-2 font-dm text-base text-[#9CA3AF]">
                Message sent successfully. We&apos;ll get back to you soon.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
