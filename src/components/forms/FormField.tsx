"use client";

import { type ReactElement, useState } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  optional?: boolean;
  autoComplete?: string;
  multiline?: boolean;
  rows?: number;
  hint?: string;
}

export function FormField({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  placeholder = " ",
  error,
  optional,
  autoComplete,
  multiline,
  rows = 4,
  hint,
}: FormFieldProps): ReactElement {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="group relative w-full">
      <label
        htmlFor={id}
        className={cn(
          "mb-2 block font-dm text-[0.65rem] font-medium uppercase tracking-[0.2em] transition-colors",
          active || focused ? "text-pink" : "text-white/40",
          error && "text-pink/80"
        )}
      >
        {label}
        {optional && (
          <span className="ml-1 font-normal normal-case tracking-normal text-white/30">
            (optional)
          </span>
        )}
      </label>
      
      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={rows}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cn(
            "w-full rounded-sm border bg-black/40 px-4 py-3 font-dm text-sm text-white outline-none transition-all placeholder:text-white/25",
            error 
              ? "border-pink/50 shadow-[0_0_0_1px_rgba(255,0,138,0.1)]" 
              : "border-white/[0.08] focus:border-pink/45 focus:shadow-[0_0_0_1px_rgba(255,0,138,0.15)]"
          )}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cn(
            "w-full rounded-sm border bg-black/40 px-4 py-3 font-dm text-sm text-white outline-none transition-all placeholder:text-white/25",
            error 
              ? "border-pink/50 shadow-[0_0_0_1px_rgba(255,0,138,0.1)]" 
              : "border-white/[0.08] focus:border-pink/45 focus:shadow-[0_0_0_1px_rgba(255,0,138,0.15)]"
          )}
        />
      )}

      {error ? (
        <p className="mt-2 font-dm text-xs text-pink animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 font-dm text-xs leading-relaxed text-white/35">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
