"use client";

import { useState, useRef, useCallback, type ReactElement } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { FormField } from "@/components/forms/FormField";
import { FormSelect } from "@/components/forms/FormSelect";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { Honeypot } from "@/components/forms/Honeypot";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { careersSchema, type CareersFormData } from "@/lib/validators/forms";
import { 
  CAREER_ROLE_OPTIONS, 
  type CareerRoleId 
} from "@/lib/content/careers-data";
import { cn } from "@/lib/utils";
import { UploadStatus } from "@/types/cloudinary";

const YEARS_OPTS = [
  { value: "0–1 years", label: "0–1 years" },
  { value: "1–3 years", label: "1–3 years" },
  { value: "3–5 years", label: "3–5 years" },
  { value: "5+ years", label: "5+ years" },
] as const;

const AVAIL_OPTS = [
  { value: "Immediately", label: "Immediately" },
  { value: "Within 2 weeks", label: "Within 2 weeks" },
  { value: "Within 1 month", label: "Within 1 month" },
  { value: "1–3 months", label: "1–3 months" },
  { value: "Exploring options", label: "Exploring options" },
] as const;

const initialForm: Partial<CareersFormData> = {
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

export function CareersForm(): ReactElement {
  const [form, setForm] = useState(initialForm);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof CareersFormData | "resume", string>>>({});
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [state, handleSubmit] = useForm("mrejwgej");

  const validate = useCallback(() => {
    // Check honeypot
    if (honeypot) return false;

    const result = careersSchema.safeParse({ ...form, resume_url: cloudinaryUrl });
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CareersFormData | "resume", string>> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof CareersFormData;
        if (path) fieldErrors[path] = issue.message;
      });
      // Handle resume error specifically
      if (!cloudinaryUrl) fieldErrors.resume = "Please upload your resume first";
      
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  }, [form, cloudinaryUrl, honeypot]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus("uploading");
    setErrors((prev) => ({ ...prev, resume: undefined }));

    try {
      const url = await uploadToCloudinary(file);
      setCloudinaryUrl(url);
      setForm(prev => ({ ...prev, resume_url: url }));
      setUploadStatus("success");
    } catch (err: any) {
      setUploadStatus("failure");
      setErrors((prev) => ({ ...prev, resume: err.message || "Upload failed" }));
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setUploadStatus("idle");
    setCloudinaryUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate() || state.submitting || uploadStatus === "uploading") return;

    const formData = new FormData(e.currentTarget);
    formData.append("resume_url", cloudinaryUrl);
    
    await handleSubmit(formData);
  };

  if (state.succeeded) {
    return (
      <div className="rounded-sm border border-white/[0.08] bg-[#08080f]/90 p-10 text-center backdrop-blur-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-pink font-dm text-2xl text-pink">
          ✓
        </div>
        <h3 className="font-heading text-2xl font-bold text-white">Application Sent!</h3>
        <p className="mt-2 font-dm text-white/50">
          Thanks for applying. Our team will review your story and get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-10 rounded-sm border border-white/[0.08] bg-[#08080f]/90 p-6 shadow-[0_24px_100px_rgba(0,0,0,0.5)] backdrop-blur-md md:p-10">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <input type="hidden" name="_subject" value={`New Career Application: ${form.fullName}`} />
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-pink via-purple/50 to-transparent opacity-70" aria-hidden />

      <fieldset className="space-y-6">
        <legend className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.15em] text-white/80">
          Personal information
        </legend>
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            id="fullName"
            name="fullName"
            label="Full name"
            value={form.fullName || ""}
            onChange={(v) => setForm(f => ({ ...f, fullName: v }))}
            error={errors.fullName}
            autoComplete="name"
          />
          <FormField
            id="email"
            name="email"
            label="Email address"
            type="email"
            value={form.email || ""}
            onChange={(v) => setForm(f => ({ ...f, email: v }))}
            error={errors.email}
            autoComplete="email"
          />
          <FormField
            id="phone"
            name="phone"
            label="Phone number"
            type="tel"
            value={form.phone || ""}
            onChange={(v) => setForm(f => ({ ...f, phone: v }))}
            error={errors.phone}
            autoComplete="tel"
          />
          <FormField
            id="location"
            name="location"
            label="Location"
            value={form.location || ""}
            onChange={(v) => setForm(f => ({ ...f, location: v }))}
            error={errors.location}
            autoComplete="address-level2"
          />
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.15em] text-white/80">
          Professional links
        </legend>
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            id="linkedin"
            name="linkedin"
            label="LinkedIn URL"
            value={form.linkedin || ""}
            onChange={(v) => setForm(f => ({ ...f, linkedin: v }))}
            error={errors.linkedin}
            optional
          />
          <FormField
            id="github"
            name="github"
            label="GitHub URL"
            value={form.github || ""}
            onChange={(v) => setForm(f => ({ ...f, github: v }))}
            error={errors.github}
            optional
          />
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.15em] text-white/80">
          Application details
        </legend>
        <div className="grid gap-6 md:grid-cols-2">
          <FormSelect
            id="role"
            name="role"
            label="Role"
            value={form.role || ""}
            placeholder="Select a role"
            options={CAREER_ROLE_OPTIONS}
            onChange={(v) => setForm(f => ({ ...f, role: v as CareerRoleId }))}
            error={errors.role}
          />
          <FormSelect
            id="experience"
            name="yearsExperience"
            label="Experience"
            value={form.yearsExperience || ""}
            placeholder="Select range"
            options={YEARS_OPTS}
            onChange={(v) => setForm(f => ({ ...f, yearsExperience: v }))}
            error={errors.yearsExperience}
          />
          <FormSelect
            id="availability"
            name="availability"
            label="Availability"
            value={form.availability || ""}
            placeholder="Select timeline"
            options={AVAIL_OPTS}
            onChange={(v) => setForm(f => ({ ...f, availability: v }))}
            error={errors.availability}
          />
          <FormField
            id="compensation"
            name="compensation"
            label="Expected compensation"
            value={form.compensation || ""}
            onChange={(v) => setForm(f => ({ ...f, compensation: v }))}
            optional
          />
        </div>
      </fieldset>

      <FormField
        id="skills"
        name="skills"
        label="Skills"
        value={form.skills || ""}
        onChange={(v) => setForm(f => ({ ...f, skills: v }))}
        error={errors.skills}
        hint="Comma-separated (e.g. Next.js, AI, Figma)"
      />

      <FormField
        id="about"
        name="about"
        label="About you"
        value={form.about || ""}
        onChange={(v) => setForm(f => ({ ...f, about: v }))}
        error={errors.about}
        multiline
        rows={6}
        hint="Tell us about your background and why Code Nexus."
      />

      <div>
        <label className="mb-2 block font-dm text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/40">
          Resume upload (PDF, DOC, DOCX)
        </label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".pdf,.doc,.docx"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadStatus === "uploading"}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-sm border border-dashed p-8 transition-all",
            uploadStatus === "idle" && "border-white/20 bg-black/30 hover:border-pink/40 hover:bg-black/40",
            uploadStatus === "uploading" && "border-pink/40 bg-pink/5 cursor-wait",
            uploadStatus === "success" && "border-green-500/40 bg-green-500/5",
            uploadStatus === "failure" && "border-pink/60 bg-pink/10"
          )}
        >
          <span className={cn(
            "font-dm text-sm font-medium",
            uploadStatus === "idle" && "text-white/60",
            uploadStatus === "uploading" && "text-pink animate-pulse",
            uploadStatus === "success" && "text-green-400",
            uploadStatus === "failure" && "text-pink"
          )}>
            {uploadStatus === "idle" && "Click to upload resume"}
            {uploadStatus === "uploading" && "Uploading to secure storage..."}
            {uploadStatus === "success" && "✓ Resume uploaded"}
            {uploadStatus === "failure" && "Upload failed. Try again."}
          </span>
        </button>
        {errors.resume && <p className="mt-2 text-xs text-pink">{errors.resume}</p>}
      </div>

      <div className="flex items-center gap-3">
        <input
          id="consent"
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm(f => ({ ...f, consent: e.target.checked }))}
          className="h-4 w-4 rounded border-white/10 bg-black/40 accent-pink"
        />
        <label htmlFor="consent" className="font-dm text-xs text-white/50">
          I agree to the processing of my personal data for recruitment purposes.
        </label>
      </div>
      {errors.consent && <p className="text-xs text-pink">{errors.consent}</p>}

      <div className="flex flex-col gap-4">
        <LoadingButton 
          loading={state.submitting} 
          disabled={uploadStatus === "uploading" || !cloudinaryUrl}
          className="w-full"
        >
          Submit Application
        </LoadingButton>
        
        <button
          type="button"
          onClick={handleReset}
          disabled={state.submitting}
          className="mx-auto text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/20 transition-colors hover:text-pink active:scale-95 disabled:opacity-0"
        >
          Clear form
        </button>
      </div>
      
      {state.errors && (
        <p className="mt-4 text-center text-xs text-pink">
          Submission failed. Please check your network and try again.
        </p>
      )}
    </form>
  );
}
