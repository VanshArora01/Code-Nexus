import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type GlowButtonVariant = "solid" | "outline";

type GlowButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: GlowButtonVariant;
} & (
  | (Omit<ComponentProps<typeof Link>, "href"> & { href: string })
  | (ComponentProps<"button"> & { href?: undefined })
);

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink active:scale-[0.98] md:text-base";

const variants: Record<GlowButtonVariant, string> = {
  solid:
    "bg-gradient-brand text-white shadow-glow-pink hover:shadow-[0_0_48px_rgba(255,0,138,0.45)]",
  outline:
    "border border-white/25 bg-transparent text-white hover:border-pink/60 hover:bg-white/5 hover:shadow-glow-purple",
};

export function GlowButton(props: GlowButtonProps): React.ReactElement {
  const { children, className, variant = "solid", ...rest } = props;

  const styles = cn(base, variants[variant], className);

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...linkRest } = rest;
    return (
      <Link href={href} className={styles} {...linkRest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as ComponentProps<"button">;
  return (
    <button type={type} className={styles} {...buttonRest}>
      {children}
    </button>
  );
}
