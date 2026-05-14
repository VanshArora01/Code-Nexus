import type { ReactElement } from "react";

import { AnimatedBg } from "@/components/ui/AnimatedBg";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  minHeightClass?: string;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  minHeightClass = "min-h-[50vh]",
}: PageHeroProps): ReactElement {
  return (
    <header
      className={cn(
        "relative overflow-hidden border-b border-white/[0.06] bg-bg",
        minHeightClass,
      )}
    >
      <AnimatedBg />
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(45% 40% at 20% 0%, rgba(255,0,138,0.12), transparent 55%), radial-gradient(40% 35% at 85% 20%, rgba(139,92,246,0.12), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col px-4 pb-16 pt-36 md:px-6 md:pt-44 lg:px-8">
        {eyebrow ? (
          <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.35em] text-[var(--text-muted)]">
            {eyebrow}
          </p>
        ) : null}
        <h1
          className="mt-4 max-w-[18ch] text-left font-heading font-black tracking-tight text-white"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        >
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-left font-dm text-base leading-relaxed text-[var(--text-body)] md:text-[1.05rem]">
          {subtitle}
        </p>
      </div>
    </header>
  );
}
