"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";

import { SERVICE_ITEMS, type ServiceItem } from "@/lib/content/services-data";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const BG_TINTS: readonly string[] = [
  "rgba(255,0,138,0.04)",
  "rgba(139,92,246,0.05)",
  "linear-gradient(145deg, rgba(255,0,138,0.045), rgba(139,92,246,0.04))",
  "rgba(255,0,138,0.035)",
  "rgba(139,92,246,0.045)",
  "linear-gradient(160deg, rgba(139,92,246,0.05), rgba(255,0,138,0.03))",
];

const CLIPS: readonly string[] = [
  "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
  "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
  "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  "circle(42% at 50% 50%)",
  "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
  "polygon(30% 0%, 70% 0%, 100% 70%, 70% 100%, 30% 100%, 0% 70%)",
];

function ServiceShape({ index }: { index: number }): ReactElement {
  const clip = CLIPS[index % CLIPS.length] ?? CLIPS[0];
  return (
    <div
      className="service-panel-shape relative flex h-[220px] w-[220px] items-center justify-center md:h-[250px] md:w-[250px]"
      aria-hidden
    >
      <div
        className="absolute inset-0 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,0,138,0.25), transparent 65%)",
        }}
      />
      <div
        className="relative h-[72%] w-[72%]"
        style={{
          clipPath: clip,
          background: "linear-gradient(135deg, #ff008a, #8b5cf6)",
          opacity: 0.85,
        }}
      />
    </div>
  );
}

function ServicePanel({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}): ReactElement {
  const tint = BG_TINTS[index % BG_TINTS.length] ?? BG_TINTS[0];

  return (
    <div className="service-panel relative flex h-[100dvh] w-screen shrink-0 flex-col md:flex-row">
      <div className="flex flex-1 flex-col justify-center px-6 py-16 md:w-1/2 md:px-12 lg:px-16">
        <span
          className="pointer-events-none absolute left-4 top-24 font-heading font-black leading-none text-transparent opacity-[0.15] md:left-10 md:top-32"
          style={{
            fontSize: "8rem",
            backgroundImage: "linear-gradient(135deg, #ff008a, #8b5cf6)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
          aria-hidden
        >
          {service.n}
        </span>
        <div className="relative z-[1] max-w-xl text-left">
          <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.28em] text-pink">
            Service {service.n}
          </p>
          <h2
            className="mt-4 font-heading font-black text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            {service.title}
          </h2>
          <p
            className="mt-6 max-w-[400px] font-dm leading-[1.8] text-[#9CA3AF]"
            style={{ fontSize: "1.05rem" }}
          >
            {service.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.1] px-3 py-1 font-dm text-[0.72rem] tracking-[0.04em] text-white/55 transition-colors hover:border-[rgba(255,0,138,0.35)] hover:text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            href="/contact"
            className="group/lm mt-10 inline-flex items-center gap-2 font-dm text-sm font-semibold text-pink transition-colors hover:text-white"
          >
            Learn more
            <span className="transition-transform duration-300 group-hover/lm:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
      <div
        className="relative flex min-h-[40vh] flex-1 items-center justify-center md:min-h-0 md:w-1/2"
        style={{ background: tint } as CSSProperties}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
          aria-hidden
        />
        <ServiceShape index={index} />
      </div>
    </div>
  );
}

function MobileCardContent({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}): ReactElement {
  return (
    <>
      <span
        className="pointer-events-none absolute left-4 top-20 font-heading font-black leading-none text-transparent opacity-[0.12]"
        style={{
          fontSize: "7rem",
          backgroundImage: "linear-gradient(135deg, #ff008a, #8b5cf6)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        aria-hidden
      >
        {service.n}
      </span>

      <div className={cn(
        "relative z-[1] flex flex-1 flex-col justify-center px-6 py-16",
        index === 0 && "pt-24"
      )}>
        <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.28em] text-pink">
          Service {service.n}
        </p>
        <h2
          className="mt-4 font-heading font-black text-white"
          style={{ fontSize: "clamp(1.75rem, 7vw, 2.5rem)" }}
        >
          {service.title}
        </h2>
        <p className="mt-5 max-w-[400px] font-dm text-[0.95rem] leading-[1.75] text-[#9CA3AF]">
          {service.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.1] px-3 py-1 font-dm text-[0.72rem] tracking-[0.04em] text-white/55"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href="/contact"
          className="group/lm mt-8 inline-flex items-center gap-2 font-dm text-sm font-semibold text-pink transition-colors hover:text-white"
        >
          Learn more
          <span className="transition-transform duration-300 group-hover/lm:translate-x-1">
            →
          </span>
        </Link>
      </div>

      <div className="relative flex h-[28vh] items-center justify-center">
        <ServiceShape index={index} />
      </div>

      {index > 0 && (
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, rgba(255,0,138,0.3) 30%, rgba(139,92,246,0.3) 70%, transparent 95%)",
          }}
          aria-hidden
        />
      )}
    </>
  );
}

export function ServicesHorizontalScroll(): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  // Helper to prevent duplicate state updates
  const safeSetActive = (index: number) => {
    if (index !== activeRef.current) {
      activeRef.current = index;
      setActive(index);
    }
  };

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !containerRef.current ||
      !stickyRef.current
    )
      return;

    registerGsapPlugins();

    const container = containerRef.current;
    const sticky = stickyRef.current;

    const cards = gsap.utils.toArray<HTMLElement>(".svc-card-stack", sticky);
    const totalCards = cards.length;
    if (totalCards < 2) return;

    // SET INITIAL POSITIONS FIRST — before ScrollTrigger exists
    gsap.set(cards[0], { yPercent: 0 });
    for (let i = 1; i < totalCards; i++) {
      gsap.set(cards[i], { yPercent: 100 });
    }

    // Force active to 0 initially
    safeSetActive(0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (totalCards - 1),
            duration: { min: 0.3, max: 0.5 },
            delay: 0.08,
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            // Only update if scroll has actually started
            if (self.progress < 0.001 && self.direction !== 1) {
              safeSetActive(0);
              return;
            }

            const next = Math.min(
              totalCards - 1,
              Math.max(0, Math.round(self.progress * (totalCards - 1)))
            );
            safeSetActive(next);
          },
          onScrubComplete: (self) => {
            const final = Math.min(
              totalCards - 1,
              Math.max(0, Math.round(self.progress * (totalCards - 1)))
            );
            safeSetActive(final);
          },
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        tl.to(cards[i], { yPercent: -62, ease: "none", duration: 1 }, i);
        tl.to(cards[i + 1], { yPercent: 0, ease: "none", duration: 1 }, i);
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#050505]"
      style={{ height: `${SERVICE_ITEMS.length * 100}vh` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
          aria-hidden
        />

        {SERVICE_ITEMS.map((service, index) => (
          <div
            key={service.id}
            className="svc-card-stack absolute inset-0 flex h-full w-full flex-col overflow-hidden bg-[#050505] will-change-transform"
            style={{
              zIndex: index + 1,
              boxShadow:
                index > 0
                  ? "0 -20px 60px rgba(0,0,0,0.85), 0 -4px 20px rgba(0,0,0,0.5)"
                  : "none",
            }}
          >
            {/* On desktop we show the row layout, on mobile the column layout */}
            <div className="hidden md:block h-full w-full">
              <ServicePanel service={service} index={index} />
            </div>
            <div className="block md:hidden h-full w-full">
              <MobileCardContent service={service} index={index} />
            </div>
          </div>
        ))}

        <div
          className="pointer-events-none absolute bottom-8 left-1/2 z-[30] flex -translate-x-1/2 items-center gap-[10px]"
          aria-hidden
        >
          {SERVICE_ITEMS.map((s, i) => (
            <div
              key={s.id}
              style={{
                height: "6px",
                width: active === i ? "28px" : "6px",
                borderRadius: "9999px",
                background:
                  active === i
                    ? "linear-gradient(90deg, #ff008a, #8b5cf6)"
                    : "rgba(255,255,255,0.2)",
                // Spring-like cubic-bezier — fast expand, gentle settle
                transition:
                  "width 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), " +
                  "background 0.3s ease",
                flexShrink: 0,
                willChange: "width",
              }}
            />
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            top: "32px",
            right: "40px",
            zIndex: 30,
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "0.8rem",
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.25)",
            pointerEvents: "none",
          }}
          aria-hidden
        >
          <span
            style={{
              color: "#ff008a",
              fontWeight: 700,
            }}
          >
            {String(active + 1).padStart(2, "0")}
          </span>
          {" / "}
          {String(SERVICE_ITEMS.length).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}
