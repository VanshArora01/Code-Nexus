"use client";

import { type ReactElement, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
  onChange: (v: string) => void;
  error?: string;
  optional?: boolean;
}

export function FormSelect({
  id,
  name,
  label,
  value,
  placeholder,
  options,
  onChange,
  error,
  optional,
}: FormSelectProps): ReactElement {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent): void => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={rootRef} className="relative w-full">
      <label
        htmlFor={id}
        className={cn(
          "mb-2 block font-dm text-[0.65rem] font-medium uppercase tracking-[0.2em] transition-colors",
          open || value ? "text-pink" : "text-white/40",
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
      
      <input type="hidden" name={name} value={value} />
      
      <button
        id={id}
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-sm border bg-black/40 px-4 py-3 text-left font-dm text-sm outline-none transition-all",
          error
            ? "border-pink/50 shadow-[0_0_0_1px_rgba(255,0,138,0.1)]"
            : "border-white/[0.08] focus:border-pink/45 focus:shadow-[0_0_0_1px_rgba(255,0,138,0.15)]",
          open && "border-pink/40"
        )}
      >
        <span className={cn("truncate", value ? "text-white" : "text-white/35")}>
          {selected ? selected.label : placeholder}
        </span>
        <span
          className={cn(
            "shrink-0 text-[10px] text-white/45 transition-transform duration-300",
            open ? "rotate-180" : ""
          )}
          aria-hidden
        >
          ▼
        </span>
      </button>

      {open && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[280px] overflow-y-auto overscroll-contain rounded-md border border-white/[0.12] bg-[#0c0c14] py-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-200"
        >
          {options.map((o) => (
            <li key={o.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === o.value}
                className={cn(
                  "group flex w-full items-center gap-3 px-4 py-3 text-left font-dm text-sm transition-colors",
                  value === o.value
                    ? "bg-pink/10 text-white"
                    : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                )}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full transition-all",
                    value === o.value 
                      ? "bg-pink shadow-[0_0_8px_rgba(255,0,138,0.8)]" 
                      : "bg-white/20 opacity-0 group-hover:opacity-100"
                  )}
                  aria-hidden
                />
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="mt-2 font-dm text-xs text-pink animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
