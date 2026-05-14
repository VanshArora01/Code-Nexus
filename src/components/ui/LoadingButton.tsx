"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LoadingButtonProps {
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "submit" | "button";
  onClick?: () => void;
  variant?: "primary" | "ghost";
}

export function LoadingButton({
  children,
  loading,
  disabled,
  className,
  type = "submit",
  onClick,
  variant = "primary",
}: LoadingButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      className={cn(
        "group relative flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 font-heading text-sm font-semibold transition-all duration-300",
        isPrimary 
          ? "bg-gradient-to-r from-pink to-purple text-white shadow-[0_0_40px_rgba(255,0,138,0.2)] hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(255,0,138,0.35)] active:translate-y-0"
          : "border border-white/[0.14] bg-white/[0.03] text-white/90 hover:border-pink/40 hover:text-white",
        (loading || disabled) && "cursor-not-allowed opacity-60",
        className
      )}
    >
      {loading ? (
        <>
          <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
