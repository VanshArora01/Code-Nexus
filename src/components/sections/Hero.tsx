"use client";

import { type ReactElement, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import * as analytics from "@/lib/analytics";

import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";

type ParticleSpec = {
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
  color: string;
};

const topParticles: ParticleSpec[] = [
  { size: 4, top: "18%", left: "12%", duration: 5, delay: 0, color: "rgba(255,0,138,0.35)" },
  { size: 3, top: "58%", left: "6%", duration: 7, delay: 1, color: "rgba(217,70,239,0.3)" },
  { size: 5, top: "32%", left: "88%", duration: 4, delay: 2, color: "rgba(255,0,138,0.25)" },
  { size: 3, top: "72%", left: "78%", duration: 6, delay: 0.5, color: "rgba(139,92,246,0.35)" },
  { size: 4, top: "44%", left: "94%", duration: 5, delay: 1.5, color: "rgba(255,0,138,0.22)" },
  { size: 3, top: "12%", left: "55%", duration: 8, delay: 0.8, color: "rgba(139,92,246,0.28)" },
];

const bottomParticles: ParticleSpec[] = [
  { size: 3, top: "16%", left: "20%", duration: 6, delay: 0.3, color: "rgba(139,92,246,0.32)" },
  { size: 4, top: "52%", left: "10%", duration: 5, delay: 1.1, color: "rgba(255,0,138,0.28)" },
  { size: 3, top: "28%", left: "82%", duration: 7, delay: 0.5, color: "rgba(255,0,138,0.24)" },
  { size: 5, top: "68%", left: "90%", duration: 4, delay: 1.7, color: "rgba(217,70,239,0.28)" },
  { size: 3, top: "38%", left: "48%", duration: 8, delay: 0.15, color: "rgba(255,0,138,0.22)" },
  { size: 4, top: "10%", left: "68%", duration: 5.5, delay: 0.9, color: "rgba(139,92,246,0.3)" },
];

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const gradientTextStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #ff008a, #d946ef 48%, #8b5cf6)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const ctaPrimaryClass =
  "inline-flex min-h-[48px] min-w-[160px] items-center justify-center rounded-md bg-gradient-to-r from-pink via-fuchsia to-purple px-7 py-3.5 text-center font-dm text-sm font-semibold tracking-wide text-white shadow-glow-pink transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_56px_rgba(255,0,138,0.35)] active:translate-y-0";

const ctaGhostClass =
  "inline-flex min-h-[48px] min-w-[160px] items-center justify-center rounded-md border border-white/[0.14] bg-white/[0.03] px-7 py-3.5 text-center font-dm text-sm font-medium tracking-wide text-white backdrop-blur-sm transition-[border-color,background-color] duration-200 hover:border-pink/40 hover:bg-white/[0.06]";

function HeroGrid({ position }: { position: "top" | "bottom" }): ReactElement {
  return (
    <div
      className="pointer-events-none absolute left-0 right-0 bg-[length:80px_80px]"
      style={{
        height: "200%",
        top: position === "top" ? 0 : undefined,
        bottom: position === "bottom" ? 0 : undefined,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)`,
        backgroundPosition: "0 0",
      }}
    />
  );
}

export default function Hero(): ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    
    const wrapper = wrapperRef.current;
    const topHalf = topHalfRef.current;
    const bottomHalf = bottomHalfRef.current;
    if (!wrapper || !topHalf || !bottomHalf) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=130%",
          scrub: 0.35,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        topHalf,
        { yPercent: -100, ease: "none", duration: 1, force3D: true },
        0,
      );
      tl.to(
        bottomHalf,
        { yPercent: 100, ease: "none", duration: 1, force3D: true },
        0,
      );
    }, wrapper);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="home" className="scroll-mt-0">
      <h1 className="sr-only">
        Build digital systems that scale — AI automation and web solutions for modern
        businesses.
      </h1>

      {/* Split hero (responsive for both desktop and mobile) */}
      <div
        ref={wrapperRef}
        className="relative h-[100dvh] w-full overflow-hidden"
        style={{ position: "relative", height: "100dvh", overflow: "hidden" }}
      >
        <div
          className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-[#0a0a0f] px-6 text-center"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: "#0a0a0f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
          <div
            className="pointer-events-none absolute -right-[5%] -top-[15%] h-[600px] w-[600px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,0,138,0.1) 0%, transparent 65%)",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-[15%] -left-[5%] h-[500px] w-[500px]"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 65%)",
            }}
          />
          <div className="relative z-[1] max-w-[700px] px-4">
            <p className="font-dm text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-pink">
              Next up
            </p>
            <h2
              className="mt-5 font-heading font-black tracking-[-0.02em] text-white"
              style={{ fontSize: "clamp(2rem, 4.2vw, 3.5rem)", lineHeight: 1.08 }}
            >
              Intelligent automation that <span style={gradientTextStyle}>powers your growth</span>
            </h2>
            <p className="mt-5 font-dm text-[1.05rem] leading-relaxed text-[var(--text-body)]">
              AI automation, web development, and digital systems engineered for modern
              businesses.
            </p>
            <Link
              href="/services"
              onClick={() => {
                analytics.event({
                  action: "hero_cta_click",
                  category: "Engagement",
                  label: "Explore Services Main",
                });
              }}
              className="mt-9 inline-block rounded-md bg-gradient-to-r from-pink via-fuchsia to-purple px-9 py-3.5 font-dm text-[0.95rem] font-semibold text-white shadow-glow-pink transition-transform hover:-translate-y-0.5"
            >
              Explore Services →
            </Link>
          </div>
        </div>

        <div
          ref={topHalfRef}
          className="absolute left-0 right-0 top-0 z-10 h-[45%] overflow-hidden md:will-change-transform"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "45%",
            overflow: "hidden",
            zIndex: 10,
            willChange: "transform",
            background: "#0a0a0f",
          }}
        >
          <HeroGrid position="top" />
          <div
            className="pointer-events-none absolute -top-[40%] right-[5%] h-[700px] w-[700px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,0,138,0.09) 0%, transparent 60%)",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-full left-[5%] h-[600px] w-[600px]"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)",
            }}
          />
          {topParticles.map((particle, i) => (
            <div
              key={`tp-${i}`}
              className="hero-split-particle pointer-events-none absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                background: particle.color,
                top: particle.top,
                left: particle.left,
                animation: `floatParticle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
                filter: "blur(1px)",
              }}
            />
          ))}
          <div
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center"
            style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: easeOutExpo }}
              className="mb-3 flex items-center gap-2 md:mb-5 md:gap-3"
            >
              <span className="h-px w-8 bg-white/15 md:w-10" />
              <span className="font-dm text-[0.55rem] uppercase tracking-[0.3em] text-white/35 md:text-[0.62rem] md:tracking-[0.36em]">
                The Code Nexus
              </span>
              <span className="h-px w-8 bg-white/15 md:w-10" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.26, ease: easeOutExpo }}
              className="mb-2 font-dm text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-pink md:mb-4 md:text-[0.68rem] md:tracking-[0.28em]"
            >
              AI automation + web solutions
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.32, ease: easeOutExpo }}
              className="text-center font-heading font-black tracking-[-0.03em] text-white"
              style={{
                fontSize: "clamp(2.75rem, 8vw, 7.5rem)",
                lineHeight: 0.92,
                textShadow: "0 0 100px rgba(255,0,138,0.12)",
                paddingBottom: "0.25rem",
              }}
            >
              BUILD DIGITAL
            </motion.p>
          </div>
        </div>

        <div
          ref={bottomHalfRef}
          className="absolute bottom-0 left-0 right-0 z-10 h-[55%] overflow-hidden md:will-change-transform"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "55%",
            overflow: "hidden",
            zIndex: 10,
            willChange: "transform",
            background: "#0a0a0f",
          }}
        >
          <HeroGrid position="bottom" />
          <div
            className="pointer-events-none absolute -top-full right-[5%] h-[700px] w-[700px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,0,138,0.09) 0%, transparent 60%)",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-[-20%] left-[5%] h-[600px] w-[600px]"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)",
            }}
          />
          {bottomParticles.map((particle, i) => (
            <div
              key={`bp-${i}`}
              className="hero-split-particle pointer-events-none absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                background: particle.color,
                top: particle.top,
                left: particle.left,
                animation: `floatParticle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
                filter: "blur(1px)",
              }}
            />
          ))}
          <div
            className="absolute left-0 right-0 top-0 flex flex-col items-center px-4"
            style={{ position: "absolute", top: 0, left: 0, right: 0 }}
          >
            <motion.p
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.45, ease: easeOutExpo }}
              className="mb-[0.85rem] text-center font-heading font-black tracking-[-0.03em] text-white md:mb-[1.35rem]"
              style={{
                fontSize: "clamp(2.75rem, 8vw, 7.5rem)",
                lineHeight: 0.92,
                textShadow: "0 0 100px rgba(255,0,138,0.12)",
                paddingTop: "0.25rem",
              }}
            >
              SYSTEMS THAT <span style={gradientTextStyle}>SCALE</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.58 }}
              className="max-w-[32rem] text-center font-dm text-[clamp(0.85rem,1.35vw,1.08rem)] leading-snug text-[var(--text-body)] md:leading-relaxed"
            >
              AI automation, web solutions, and intelligent digital systems for modern
              businesses.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.72 }}
              className="mt-4 font-dm text-[0.55rem] uppercase tracking-[0.15em] text-white/25 md:mt-6 md:text-[0.62rem] md:tracking-[0.2em]"
            >
              5+ projects · 2 hackathon wins · AI-first delivery
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2 md:mt-8 md:gap-3"
            >
              <Link 
                href="/contact" 
                onClick={() => {
                  analytics.event({
                    action: "hero_cta_click",
                    category: "Engagement",
                    label: "Book a Consultation",
                  });
                }}
                className={ctaPrimaryClass}
              >
                Book a Consultation
              </Link>
              <Link 
                href="/services" 
                onClick={() => {
                  analytics.event({
                    action: "hero_cta_click",
                    category: "Engagement",
                    label: "Explore Solutions",
                  });
                }}
                className={ctaGhostClass}
              >
                Explore Solutions
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 1.15 }}
              className="absolute bottom-[-3rem] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 md:bottom-[-4.5rem] md:gap-2"
            >
              <span className="font-dm text-[0.5rem] uppercase tracking-[0.32em] text-white/22 md:text-[0.58rem]">
                Scroll
              </span>
              <div
                className="hero-split-scroll-line w-px bg-gradient-to-b from-pink/70 to-transparent"
                style={{
                  height: "30px",
                  animation: "scrollPulse 2s ease-in-out infinite",
                }}
              />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
