"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef, useState, type ReactElement, type ReactNode } from "react";

import {
  WORK_BENTO_PROJECTS,
  type WorkBentoProject,
} from "@/lib/content/projects-data";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const featured = WORK_BENTO_PROJECTS.find((p) => p.featured) ?? WORK_BENTO_PROJECTS[0];
const others = WORK_BENTO_PROJECTS.filter((p) => !p.featured);

function ProjectLink({
  project,
  children,
  className,
}: {
  project: WorkBentoProject;
  children: ReactNode;
  className?: string;
}): ReactElement {
  if (project.external) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={project.href} className={className}>
      {children}
    </Link>
  );
}

export function WorkShowcase(): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useGSAP(
    () => {
      registerGsapPlugins();

      gsap.from(".work-hero-eyebrow", {
        opacity: 0,
        y: 22,
        duration: 0.55,
        ease: "power3.out",
      });
      gsap.from(".work-hero-title", {
        opacity: 0,
        y: 48,
        duration: 0.85,
        delay: 0.06,
        ease: "power3.out",
      });
      gsap.from(".work-hero-copy", {
        opacity: 0,
        y: 28,
        duration: 0.65,
        delay: 0.14,
        ease: "power3.out",
      });
      gsap.from(".work-hero-meta", {
        opacity: 0,
        y: 16,
        duration: 0.55,
        delay: 0.22,
        ease: "power3.out",
      });
      gsap.from(".work-hero-chip", {
        opacity: 0,
        y: 14,
        duration: 0.45,
        stagger: 0.07,
        delay: 0.28,
        ease: "power3.out",
      });

      gsap.from(".work-featured-inner", {
        opacity: 0,
        y: 56,
        scale: 0.97,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-featured",
          start: "top 84%",
          toggleActions: "play none none none",
        },
      });

      gsap.utils.toArray<HTMLElement>(".work-row").forEach((row) => {
        const card = row.querySelector(".work-row-card");
        const rail = row.querySelector(".work-row-rail");
        if (card) {
          gsap.fromTo(
            card,
            { y: 72, opacity: 0, rotateX: 4 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 92%",
                end: "top 48%",
                scrub: 0.75,
              },
            },
          );
        }
        if (rail) {
          gsap.fromTo(
            rail,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "top center",
              scrollTrigger: {
                trigger: row,
                start: "top 90%",
                end: "top 52%",
                scrub: 0.55,
              },
            },
          );
        }
      });

      gsap.from(".work-footer", {
        opacity: 0,
        y: 36,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-footer",
          start: "top 93%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="relative bg-[#010108]">
      <section className="work-hero relative md:min-h-[min(72vh,620px)] overflow-hidden border-b border-white/[0.06] px-4 pb-12 pt-28 md:px-8 md:pb-32 md:pt-24">
        <div
          className="pointer-events-none absolute -left-32 top-0 h-[min(100vw,560px)] w-[min(100vw,560px)] rounded-full opacity-50 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,0,138,0.35), rgba(139,92,246,0.12), transparent 68%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full opacity-35 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.35), transparent 65%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.2] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-[1200px]">
          <p className="work-hero-eyebrow font-dm text-[0.7rem] font-medium uppercase tracking-[0.42em] text-pink">
            Selected builds
          </p>
          <h1
            className="work-hero-title mt-5 max-w-[14ch] font-heading font-black tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(2.85rem, 8vw, 5.75rem)", lineHeight: 0.92 }}
          >
            Work with velocity.
          </h1>
          <p className="work-hero-copy mt-8 max-w-2xl font-dm text-base leading-relaxed text-white/55 md:text-lg">
            Production systems we stand behind — web, AI, automation, and growth loops
            running for real users.
          </p>
          <p className="work-hero-meta mt-10 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-white/28">
            Ludhiana · remote-first · detail-obsessed
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Live systems", "AI-native", "Global delivery"].map((t) => (
              <span
                key={t}
                className="work-hero-chip rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 font-dm text-[0.72rem] tracking-wide text-white/55"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="work-featured relative px-4 pt-6 pb-12 md:px-8 md:py-20">
        <div
          className="pointer-events-none absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-pink/40 via-white/10 to-transparent md:block"
          aria-hidden
        />
        <article className="work-featured-inner relative mx-auto max-w-[1200px]">
          <div
            className="relative overflow-hidden rounded-sm border border-white/[0.1] p-px shadow-[0_0_0_1px_rgba(255,0,138,0.08),0_40px_120px_rgba(0,0,0,0.55)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,0,138,0.35), rgba(255,255,255,0.06), rgba(139,92,246,0.35))",
            }}
          >
            <div
              className="relative overflow-hidden bg-[#05050e]"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.85]"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,0,138,0.12) 0%, transparent 42%, rgba(139,92,246,0.1) 100%), repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(255,255,255,0.02) 6px)",
                }}
                aria-hidden
              />
              <div className="relative grid gap-12 p-8 md:grid-cols-[1.05fr_0.95fr] md:gap-14 md:p-12 lg:p-16">
                <div className="text-left">
                  {featured.badge ? (
                    <span className="inline-block w-fit border border-pink/45 bg-pink/10 px-3 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-pink">
                      {featured.badge}
                    </span>
                  ) : null}
                  <h2
                    className="mt-6 font-heading font-black text-white"
                    style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.04 }}
                  >
                    {featured.name}
                  </h2>
                  <p className="mt-6 max-w-xl font-dm text-[0.95rem] leading-[1.75] text-white/62 line-clamp-3 md:line-clamp-none md:text-base">
                    {featured.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {featured.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-white/12 bg-black/40 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/65"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <ProjectLink
                    project={featured}
                    className="group/feat mt-10 inline-flex items-center gap-3 font-heading text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:text-pink md:text-sm"
                  >
                    {featured.external ? "Visit live site" : "Open brief"}
                    <span className="h-px w-12 bg-gradient-to-r from-pink to-purple transition-all group-hover/feat:w-16" />
                    <span className="translate-x-0 transition-transform group-hover/feat:translate-x-1">
                      →
                    </span>
                  </ProjectLink>
                </div>
                <div className="relative flex min-h-[240px] items-center justify-center md:min-h-[300px]">
                  <span
                    className="pointer-events-none select-none font-heading font-black leading-none text-white/[0.06]"
                    style={{ fontSize: "clamp(5.5rem, 20vw, 13rem)" }}
                    aria-hidden
                  >
                    {featured.number}
                  </span>
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    aria-hidden
                  >
                    <div
                      className="work-deco-spin h-44 w-44 rounded-lg border border-pink/25 md:h-52 md:w-52"
                      style={{
                        background:
                          "linear-gradient(145deg, rgba(255,0,138,0.1), rgba(139,92,246,0.06))",
                      }}
                    />
                    <div
                      className="work-deco-spin-reverse absolute h-36 w-36 rounded-lg border border-white/10 md:h-44 md:w-44"
                      style={{
                        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                        background:
                          "linear-gradient(135deg, rgba(255,0,138,0.28), rgba(139,92,246,0.18))",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-pink via-purple/80 to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </article>
      </section>

      <section className="relative mx-auto max-w-[1200px] px-4 pb-28 pt-10 md:px-8 md:pb-36 md:pt-14">
        <div className="mb-12 max-w-2xl text-left">
          <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.32em] text-white/35">
            More work
          </p>
          <p className="mt-3 font-heading text-xl font-semibold text-white md:text-2xl">
            A cross-section of what we have shipped and maintained.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:gap-7">
          {others.map((project) => (
            <div
              key={project.key}
              className="work-row relative [perspective:1200px]"
              onMouseEnter={() => setHovered(project.key)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="work-row-rail pointer-events-none absolute bottom-0 left-5 top-0 hidden w-px origin-top bg-gradient-to-b from-pink/50 via-white/10 to-transparent md:block"
                aria-hidden
              />
              <div className="work-row-card relative md:pl-10" style={{ transformStyle: "preserve-3d" }}>
                <ProjectLink
                  project={project}
                  className={cn(
                    "group/row relative block overflow-hidden rounded-lg border bg-[#070712] p-6 transition-[border-color,box-shadow] duration-500 md:p-8 md:pl-10",
                    hovered === project.key
                      ? "border-pink/30 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
                      : "border-white/[0.07] shadow-[0_12px_48px_rgba(0,0,0,0.25)] hover:border-white/[0.12]",
                  )}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/row:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 60% at 0% 50%, rgba(255,0,138,0.08), transparent 55%)",
                    }}
                    aria-hidden
                  />
                  <div className="relative grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8">
                    <div className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-1">
                      <span className="font-heading text-3xl font-black tabular-nums text-white/[0.12] md:text-4xl">
                        {project.number}
                      </span>
                      <span className="font-dm text-[0.68rem] uppercase tracking-[0.2em] text-white/35 md:max-w-[7rem] md:leading-snug">
                        {project.year ?? "—"}
                      </span>
                    </div>

                    <div className="min-w-0 text-left">
                      <p className="font-dm text-[0.65rem] uppercase tracking-[0.28em] text-pink/85">
                        {project.projectType}
                      </p>
                      <h3
                        className="mt-2 font-heading font-bold tracking-tight text-white"
                        style={{ fontSize: "clamp(1.45rem, 2.6vw, 2.1rem)" }}
                      >
                        {project.name}
                      </h3>
                      <p className="mt-3 max-w-2xl font-dm text-[0.92rem] leading-relaxed text-white/48 line-clamp-2 md:line-clamp-none md:text-[0.95rem]">
                        {project.description}
                      </p>
                      {project.badge ? (
                        <p className="mt-4 font-dm text-[0.8rem] text-white/35">{project.badge}</p>
                      ) : null}
                    </div>

                    <div className="flex items-center justify-start md:justify-end">
                      <span
                        className={cn(
                          "inline-flex h-12 w-12 items-center justify-center rounded-full border text-sm transition-all duration-300 md:h-14 md:w-14",
                          hovered === project.key
                            ? "border-pink/50 bg-pink/10 text-white"
                            : "border-white/[0.1] bg-white/[0.02] text-white/40 group-hover/row:border-pink/35 group-hover/row:text-pink",
                        )}
                        aria-hidden
                      >
                        {project.external ? "↗" : "→"}
                      </span>
                    </div>
                  </div>

                  <div
                    className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-pink via-purple/80 to-transparent transition-transform duration-700 ease-out group-hover/row:scale-x-100"
                    aria-hidden
                  />
                </ProjectLink>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="work-footer border-t border-white/[0.06] bg-[#04040c] px-4 py-24 text-center md:px-8 md:py-28 md:text-left">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-lg">
            <p className="font-dm text-[0.65rem] uppercase tracking-[0.3em] text-pink/90">
              Next build
            </p>
            <p className="mt-4 font-heading text-2xl font-bold leading-tight text-white md:text-4xl">
              If it needs custom logic, AI, and speed — we want in.
            </p>
          </div>
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/contact"
              className="group/end inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-pink to-purple px-7 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_35px_rgba(255,0,138,0.2)] transition-transform hover:-translate-y-0.5"
            >
              Pitch the project
              <span className="transition-transform group-hover/end:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/careers"
              className="inline-flex items-center justify-center rounded-sm border border-white/[0.14] px-7 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-pink/35 hover:text-white"
            >
              Join the team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
