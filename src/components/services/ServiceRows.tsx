"use client";

import type { MouseEvent, ReactElement } from "react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

function VisualWebsites(): ReactElement {
  return (
    <div
      className="transition-transform duration-[400ms] ease-out group-hover:rotate-[5deg]"
      style={{
        width: "80px",
        height: "80px",
        border: "1.5px solid rgba(255,0,138,0.5)",
        transform: "rotate(15deg)",
        borderRadius: "4px",
        position: "relative",
      }}
      aria-hidden
    >
      <div
        style={{
          position: "absolute",
          inset: "8px",
          border: "1px solid rgba(139,92,246,0.4)",
          borderRadius: "2px",
          transform: "rotate(-8deg)",
        }}
      />
    </div>
  );
}

function VisualChatbots(): ReactElement {
  return (
    <div
      className="relative transition-transform duration-[400ms] ease-out group-hover:rotate-[5deg]"
      style={{ width: "80px", height: "80px" }}
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: `${i * 14}px`,
            borderRadius: "50%",
            border:
              i === 1
                ? "1px solid rgba(255,0,138,0.4)"
                : "1px solid rgba(139,92,246,0.3)",
            background:
              i === 2
                ? "linear-gradient(135deg, #ff008a, #8b5cf6)"
                : "transparent",
          }}
        />
      ))}
    </div>
  );
}

function VisualAutomation(): ReactElement {
  return (
    <div
      className="flex w-[120px] flex-col gap-2 transition-transform duration-[400ms] ease-out group-hover:rotate-[5deg]"
      aria-hidden
    >
      {[100, 70, 45].map((width, i) => (
        <div
          key={i}
          style={{
            height: "3px",
            width: `${width}%`,
            background:
              i === 0
                ? "linear-gradient(90deg, #ff008a, #8b5cf6)"
                : `rgba(${i === 1 ? "255,0,138" : "139,92,246"},${0.5 - i * 0.1})`,
            borderRadius: "9999px",
          }}
        />
      ))}
    </div>
  );
}

function VisualCRM(): ReactElement {
  return (
    <div
      className="transition-transform duration-[400ms] ease-out group-hover:rotate-[5deg]"
      style={{
        width: "70px",
        height: "70px",
        border: "1.5px solid rgba(255,0,138,0.5)",
        transform: "rotate(45deg)",
        borderRadius: "4px",
      }}
      aria-hidden
    />
  );
}

function VisualWhatsApp(): ReactElement {
  return (
    <div
      className="relative transition-transform duration-[400ms] ease-out group-hover:rotate-[5deg]"
      style={{ width: "80px", height: "70px" }}
      aria-hidden
    >
      <div
        style={{
          width: "60px",
          height: "50px",
          border: "1.5px solid rgba(255,0,138,0.5)",
          borderRadius: "10px 10px 10px 0",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <div
        style={{
          width: "60px",
          height: "50px",
          border: "1px solid rgba(139,92,246,0.4)",
          borderRadius: "10px 10px 0 10px",
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      />
    </div>
  );
}

function VisualSEO(): ReactElement {
  return (
    <div
      className="relative transition-transform duration-[400ms] ease-out group-hover:rotate-[5deg]"
      style={{ width: "80px", height: "80px" }}
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: 0,
            left: `${i * 26}px`,
            width: "18px",
            height: `${(i + 1) * 26}px`,
            background:
              i === 2
                ? "linear-gradient(to top, #ff008a, #8b5cf6)"
                : `rgba(255,0,138,${0.2 + i * 0.15})`,
            borderRadius: "2px 2px 0 0",
          }}
        />
      ))}
    </div>
  );
}

function ServiceVisual({ index }: { index: number }): ReactElement {
  switch (index) {
    case 0:
      return <VisualWebsites />;
    case 1:
      return <VisualChatbots />;
    case 2:
      return <VisualAutomation />;
    case 3:
      return <VisualCRM />;
    case 4:
      return <VisualWhatsApp />;
    default:
      return <VisualSEO />;
  }
}

export function ServiceRow({
  index,
  n,
  title,
  description,
  tags,
}: {
  index: number;
  n: string;
  title: string;
  description: string;
  tags: readonly string[];
}): ReactElement {
  const rowRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    const row = rowRef.current;
    const spot = spotlightRef.current;
    if (!row || !spot) {
      return;
    }
    const rect = row.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spot.style.background = `
      radial-gradient(
        600px circle at ${x}px ${y}px,
        rgba(255, 45, 120, 0.06) 0%,
        rgba(139, 47, 212, 0.03) 40%,
        transparent 70%
      )
    `;
  };

  const handleMouseEnter = (): void => {
    const spot = spotlightRef.current;
    const row = rowRef.current;
    if (!spot) {
      return;
    }
    spot.style.opacity = "1";
    const numEl = row?.querySelector(".service-number") as HTMLElement | null;
    if (numEl) {
      numEl.style.opacity = "0.4";
    }
    const borderEl = row?.querySelector(
      ".row-border-accent",
    ) as HTMLElement | null;
    if (borderEl) {
      borderEl.style.height = "100%";
    }
  };

  const handleMouseLeave = (): void => {
    const spot = spotlightRef.current;
    const row = rowRef.current;
    if (!spot) {
      return;
    }
    spot.style.opacity = "0";
    const numEl = row?.querySelector(".service-number") as HTMLElement | null;
    if (numEl) {
      numEl.style.opacity = "0.12";
    }
    const borderEl = row?.querySelector(
      ".row-border-accent",
    ) as HTMLElement | null;
    if (borderEl) {
      borderEl.style.height = "0%";
    }
  };

  return (
    <article
      ref={rowRef}
      className={cn(
        "group relative cursor-default overflow-hidden border-b border-white/[0.06] py-12 md:py-14",
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 ease-out"
        aria-hidden
      />

      <div
        className="row-border-accent pointer-events-none absolute left-0 top-0 z-[1] w-0.5 bg-gradient-to-b from-pink to-purple transition-[height] duration-[400ms] ease-out"
        style={{ height: "0%" }}
        aria-hidden
      />

      <div
        className="service-number pointer-events-none absolute top-1/2 z-[1] -translate-y-1/2 select-none font-heading font-black leading-none text-transparent transition-opacity duration-300 ease-out"
        style={{
          left: "-20px",
          fontSize: "clamp(4rem, 12vw, 8rem)",
          backgroundImage: "linear-gradient(135deg, #ff008a, #8b5cf6)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          opacity: 0.12,
        }}
        aria-hidden
      >
        {n}
      </div>

      <div className="relative z-[2] flex flex-col items-stretch gap-10 pl-24 md:flex-row md:items-center md:gap-10 md:pl-[120px] lg:gap-14">
        <div className="min-w-0 flex-1 text-left">
          <h2
            className="font-heading font-bold text-white transition-colors duration-300"
            style={{ fontSize: "2rem" }}
          >
            {title}
          </h2>
          <p
            className="mt-3 max-w-[420px] font-dm leading-[1.7] text-[#9CA3AF]"
            style={{ fontSize: "1rem" }}
          >
            {description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 font-dm text-[0.75rem] tracking-[0.05em] text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex w-[120px] shrink-0 items-center justify-center md:w-[120px]">
          <ServiceVisual index={index} />
        </div>
      </div>
    </article>
  );
}
